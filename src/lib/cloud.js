import { supabase, PHOTO_BUCKET } from './supabase';
import { board, update, defaults, loadGuest, starterPrizes, newKid, setSync } from './board';
import { PAINTS, ICONS, KID_PAINTS, MAX_KIDS, MAX_PRIZES, MIN_PRIZES, NAME_MAX, clamp, uid, isUuid } from './constants';

const SIGNED_URL_TTL = 60 * 60 * 24 * 7;

/** Board state -> the rows we keep in Postgres. Key order matters: rows are compared as JSON. */
function toRows(userId, s) {
  return {
    board: { user_id: userId, per_spin: s.perSpin, free_spins: s.free, sound: s.sound, active_kid: isUuid(s.active) ? s.active : null },
    kids: s.kids.map((k, i) => ({ id: k.id, user_id: userId, position: i, name: k.name, color: k.color, stars: k.stars, spent: k.spent, won: k.won })),
    prizes: s.prizes.map((p, i) => ({ id: p.id, user_id: userId, position: i, name: p.name, icon: p.icon, color: p.color, image_path: p.imagePath || null })),
  };
}

function baseFrom(rows) {
  return {
    board: rows.board ? JSON.stringify(rows.board) : null,
    kids: new Map(rows.kids.map(k => [k.id, JSON.stringify(k)])),
    prizes: new Map(rows.prizes.map(p => [p.id, { json: JSON.stringify(p), path: p.image_path }])),
  };
}

/** A guest board from this browser, with fresh uuids so it can move into the cloud. */
function adoptGuestBoard(local) {
  const ids = new Map();
  const fresh = id => { if (isUuid(id)) return id; if (!ids.has(id)) ids.set(id, uid()); return ids.get(id); };
  return {
    ...local,
    kids: local.kids.map(k => ({ ...k, id: fresh(k.id) })),
    prizes: local.prizes.map(p => ({ ...p, id: fresh(p.id), imagePath: null })),
    active: local.active ? fresh(local.active) : null,
  };
}

/** Load the signed-in teacher's board. Returns { state, base } where base is what the database already holds. */
export async function loadCloud(user) {
  const [b, k, p] = await Promise.all([
    supabase.from('boards').select('user_id, per_spin, free_spins, sound, active_kid').eq('user_id', user.id).maybeSingle(),
    supabase.from('kids').select('id, user_id, position, name, color, stars, spent, won').eq('user_id', user.id).order('position'),
    supabase.from('prizes').select('id, user_id, position, name, icon, color, image_path').eq('user_id', user.id).order('position'),
  ]);
  for (const r of [b, k, p]) if (r.error) throw r.error;

  // Brand-new teacher: start from this browser's guest board if there is one, otherwise the starter board.
  if (!b.data && !k.data.length && !p.data.length) {
    const local = loadGuest();
    return { state: local ? adoptGuestBoard(local) : defaults(), base: baseFrom({ board: null, kids: [], prizes: [] }), fresh: true };
  }

  const paths = p.data.map(r => r.image_path).filter(Boolean);
  const signed = new Map();
  if (paths.length) {
    const { data, error } = await supabase.storage.from(PHOTO_BUCKET).createSignedUrls(paths, SIGNED_URL_TTL);
    if (!error) data.forEach(d => { if (d.signedUrl) signed.set(d.path, d.signedUrl); });
  }

  const state = {
    kids: k.data.slice(0, MAX_KIDS).map((r, i) => ({
      id: r.id, name: (r.name || `Kid ${i + 1}`).slice(0, NAME_MAX), color: PAINTS[r.color] ? r.color : KID_PAINTS[i % KID_PAINTS.length],
      stars: Math.max(0, r.stars | 0), spent: Math.max(0, r.spent | 0), won: Math.max(0, r.won | 0),
    })),
    prizes: p.data.slice(0, MAX_PRIZES).map(r => ({
      id: r.id, name: (r.name ?? '').slice(0, NAME_MAX), icon: ICONS[r.icon] ? r.icon : 'star', color: PAINTS[r.color] ? r.color : 'yellow',
      img: r.image_path ? signed.get(r.image_path) || null : null, imagePath: r.image_path || null,
    })),
    perSpin: clamp(b.data?.per_spin || 5, 1, 10),
    free: !!b.data?.free_spins,
    sound: b.data ? b.data.sound !== false : true,
    active: b.data?.active_kid || null,
  };
  // What the database holds right now, in toRows() shape; anything we normalised above differs and gets re-saved.
  const base = baseFrom({
    board: b.data && { user_id: b.data.user_id, per_spin: b.data.per_spin, free_spins: b.data.free_spins, sound: b.data.sound, active_kid: b.data.active_kid },
    kids: k.data.map(r => ({ id: r.id, user_id: r.user_id, position: r.position, name: r.name, color: r.color, stars: r.stars, spent: r.spent, won: r.won })),
    prizes: p.data.map(r => ({ id: r.id, user_id: r.user_id, position: r.position, name: r.name, icon: r.icon, color: r.color, image_path: r.image_path })),
  });
  if (!state.kids.length) state.kids = [newKid('Superstar', 0)];
  if (state.prizes.length < MIN_PRIZES) state.prizes = starterPrizes();
  return { state, base, fresh: false };
}

async function uploadPhoto(userId, prizeId, dataUrl) {
  const blob = await (await fetch(dataUrl)).blob();
  const ext = blob.type === 'image/webp' ? 'webp' : blob.type === 'image/png' ? 'png' : 'jpg';
  const path = `${userId}/${prizeId}-${Date.now().toString(36)}.${ext}`;
  const { error } = await supabase.storage.from(PHOTO_BUCKET).upload(path, blob, { contentType: blob.type, cacheControl: '31536000', upsert: false });
  if (error) throw error;
  return path;
}
function removePhotos(paths) {
  if (paths.length) supabase.storage.from(PHOTO_BUCKET).remove(paths).catch(() => {});
}

/**
 * Keep the database in step with the board: after each change, upsert the rows that changed,
 * delete the rows that are gone, and upload new prize photos. Failed saves retry with backoff,
 * so a wobbly classroom connection never loses a star.
 */
export function startCloudSync(user, base) {
  const userId = user.id;
  let timer = 0, running = false, again = false, stopped = false, delay = 1500, lastError = null;
  const uploading = new Map(); // prizeId -> data URL being uploaded

  const status = () => setSync(lastError ? 'error' : timer || running || uploading.size ? 'saving' : 'saved');
  const schedule = ms => { if (stopped) return; clearTimeout(timer); timer = setTimeout(run, ms); status(); };

  function startUploads(s) {
    for (const p of s.prizes) {
      if (!p.img || !p.img.startsWith('data:') || p.imagePath || uploading.get(p.id) === p.img) continue;
      const img = p.img, id = p.id;
      uploading.set(id, img);
      uploadPhoto(userId, id, img).then(path => {
        uploading.delete(id);
        const cur = board.get()?.prizes.find(x => x.id === id);
        if (stopped || !cur || cur.img !== img) { removePhotos([path]); status(); return; }
        update(d => { const q = d.prizes.find(x => x.id === id); if (q) q.imagePath = path; });
      }, err => {
        uploading.delete(id);
        console.warn('[rewards] photo upload failed', err);
        lastError = err; schedule(delay); delay = Math.min(delay * 2, 30000);
      });
    }
  }

  async function run() {
    if (stopped) return;
    if (running) { again = true; return; }
    clearTimeout(timer); timer = 0; running = true; status();
    try {
      const s = board.get();
      if (!s) return;
      startUploads(s);
      const r = toRows(userId, s);
      const gone = [];

      const kidUp = r.kids.filter(k => base.kids.get(k.id) !== JSON.stringify(k));
      const kidDel = [...base.kids.keys()].filter(id => !r.kids.some(k => k.id === id));
      if (kidUp.length) {
        const { error } = await supabase.from('kids').upsert(kidUp); if (error) throw error;
        kidUp.forEach(k => base.kids.set(k.id, JSON.stringify(k)));
      }
      if (kidDel.length) {
        const { error } = await supabase.from('kids').delete().in('id', kidDel); if (error) throw error;
        kidDel.forEach(id => base.kids.delete(id));
      }

      const prizeUp = r.prizes.filter(p => base.prizes.get(p.id)?.json !== JSON.stringify(p));
      const prizeDel = [...base.prizes.keys()].filter(id => !r.prizes.some(p => p.id === id));
      if (prizeUp.length) {
        const { error } = await supabase.from('prizes').upsert(prizeUp); if (error) throw error;
        prizeUp.forEach(p => {
          const old = base.prizes.get(p.id)?.path;
          if (old && old !== p.image_path) gone.push(old);
          base.prizes.set(p.id, { json: JSON.stringify(p), path: p.image_path });
        });
      }
      if (prizeDel.length) {
        const { error } = await supabase.from('prizes').delete().in('id', prizeDel); if (error) throw error;
        prizeDel.forEach(id => { const old = base.prizes.get(id)?.path; if (old) gone.push(old); base.prizes.delete(id); });
      }

      const bj = JSON.stringify(r.board);
      if (bj !== base.board) {
        const { error } = await supabase.from('boards').upsert(r.board); if (error) throw error;
        base.board = bj;
      }
      removePhotos(gone);
      lastError = null; delay = 1500;
    } catch (e) {
      console.warn('[rewards] save failed, will retry', e);
      lastError = e;
      timer = setTimeout(run, delay); delay = Math.min(delay * 2, 30000);
    } finally {
      running = false;
      if (again && !stopped) { again = false; run(); } else status();
    }
  }

  const unsub = board.subscribe(() => schedule(400));
  const onHide = () => { if (document.visibilityState === 'hidden' && timer) run(); };
  const onOnline = () => { if (lastError) run(); };
  const onLeave = e => { if (lastError || timer || running || uploading.size) { e.preventDefault(); e.returnValue = ''; } };
  document.addEventListener('visibilitychange', onHide);
  addEventListener('online', onOnline);
  addEventListener('beforeunload', onLeave);
  schedule(0);

  return {
    /** Save now and resolve true once everything is in the database. */
    async flush() {
      for (let i = 0; i < 20; i++) {
        if (!timer && !running && !uploading.size) return !lastError;
        if (timer) run();
        await new Promise(r => setTimeout(r, 150));
      }
      return false;
    },
    stop() {
      stopped = true; unsub(); clearTimeout(timer);
      document.removeEventListener('visibilitychange', onHide);
      removeEventListener('online', onOnline);
      removeEventListener('beforeunload', onLeave);
      setSync('idle');
    },
  };
}
