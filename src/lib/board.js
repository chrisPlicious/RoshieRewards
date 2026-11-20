import { createStore } from './store';
import {
  PAINTS, ICONS, STARTER, KID_PAINTS, PAINT_KEYS, ICON_KEYS,
  MAX_KIDS, MAX_PRIZES, MIN_PRIZES, NAME_MAX, clamp, uid,
} from './constants';

/**
 * The board the teacher sees and edits.
 * { kids:[{id,name,color,stars,spent,won}], prizes:[{id,name,icon,color,img,imagePath}], perSpin, free, sound, active }
 * `img` is what we display (a data: URL for a fresh photo, or a signed URL from cloud storage);
 * `imagePath` is the photo's location in Supabase Storage once uploaded (cloud mode only).
 */
export const board = createStore(null);

/** Screen-level notes: drawer message + cloud save status ('idle' | 'saving' | 'saved' | 'error'). */
export const ui = createStore({ note: null, sync: 'idle' });
export const setNote = (msg, warn = false) => ui.set(u => ({ ...u, note: msg ? { msg, warn } : null }));
export const setSync = sync => ui.set(u => (u.sync === sync ? u : { ...u, sync }));

/** Mutate a shallow copy of the board (kids and prizes are copied too), then publish it. */
export function update(fn) {
  board.set(s => {
    if (!s) return s;
    const d = { ...s, kids: s.kids.map(k => ({ ...k })), prizes: s.prizes.map(p => ({ ...p })) };
    fn(d);
    return d;
  });
}

export function starterPrizes() {
  return STARTER.map(p => ({ ...p, id: uid(), img: null, imagePath: null }));
}
export function newKid(name, i) {
  return { id: uid(), name, color: KID_PAINTS[i % KID_PAINTS.length], stars: 0, spent: 0, won: 0 };
}
export function defaults() {
  return { kids: [newKid('Superstar', 0)], prizes: starterPrizes(), perSpin: 5, free: false, sound: true, active: null };
}

/* ---------- derived ---------- */
export const spinsLeft = (s, k) => (s.free ? Infinity : Math.max(0, Math.floor(k.stars / s.perSpin) - k.spent));
export const needFor = (s, k) => Math.max(1, (k.spent + 1) * s.perSpin - k.stars);
export const canUndo = (s, k) => k.stars > (s.free ? 0 : k.spent * s.perSpin);
export const canSpin = (s, k) => !!k && spinsLeft(s, k) > 0 && s.prizes.length >= MIN_PRIZES;
export function railOf(s, k) {
  const n = s.free ? 10 : s.perSpin;
  let filled = k.stars % n;
  if (s.free && k.stars > 0 && filled === 0) filled = n;
  return { n, filled };
}
export function activeIndex(s) {
  let i = s.kids.findIndex(k => k.id === s.active);
  if (i < 0) i = s.kids.findIndex(k => spinsLeft(s, k) > 0);
  return i < 0 ? 0 : i;
}
export const kidVars = k => {
  const p = PAINTS[k.color];
  return { '--kid': p.c, '--kid-lo': p.lo, '--kid-t': p.t };
};

/* ---------- board edits shared by the drawer and the lanes ---------- */
export function addKid() {
  const s = board.get();
  if (s.kids.length >= MAX_KIDS) return null;
  const used = new Set(s.kids.map(k => k.color));
  const kid = newKid(`Kid ${s.kids.length + 1}`, s.kids.length);
  kid.color = KID_PAINTS.find(c => !used.has(c)) || kid.color;
  update(d => { d.kids.push(kid); });
  return kid;
}
export function renameKid(id, name) {
  const v = name.trim().slice(0, NAME_MAX);
  if (!v) return;
  update(d => { const k = d.kids.find(x => x.id === id); if (k) k.name = v; });
}
export function freshPrizeLook(prizes) {
  const used = prizes.map(p => p.color);
  const color = PAINT_KEYS.find(c => !used.includes(c)) || PAINT_KEYS[prizes.length % PAINT_KEYS.length];
  const icon = ICON_KEYS.find(ic => !prizes.some(p => p.icon === ic)) || 'star';
  return { color, icon };
}
export function addPrize() {
  const s = board.get();
  if (s.prizes.length >= MAX_PRIZES) return null;
  const { color, icon } = freshPrizeLook(s.prizes);
  const prize = { id: uid(), name: 'New prize', icon, color, img: null, imagePath: null };
  update(d => { d.prizes.push(prize); });
  return prize;
}

/* ---------- guest mode: the board lives in this browser only (same format as the old single-file app) ---------- */
const GUEST_KEY = 'roshie-rewards-v1';
const validImg = s => typeof s === 'string' && /^data:image\/(webp|jpeg|png);base64,/.test(s) && s.length < 700000;

export function loadGuest() {
  try {
    const raw = localStorage.getItem(GUEST_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    const d = defaults();
    const kids = Array.isArray(s.kids) ? s.kids.filter(k => k && typeof k.name === 'string').slice(0, MAX_KIDS).map((k, i) => ({
      id: String(k.id || uid()), name: k.name.slice(0, NAME_MAX) || `Kid ${i + 1}`,
      color: PAINTS[k.color] ? k.color : KID_PAINTS[i % KID_PAINTS.length],
      stars: Math.max(0, parseInt(k.stars, 10) || 0), spent: Math.max(0, parseInt(k.spent, 10) || 0), won: Math.max(0, parseInt(k.won, 10) || 0),
    })) : [];
    const prizes = Array.isArray(s.prizes) ? s.prizes.filter(p => p && typeof p.name === 'string').slice(0, MAX_PRIZES).map(p => ({
      id: String(p.id || uid()), name: p.name.slice(0, NAME_MAX), icon: ICONS[p.icon] ? p.icon : 'star', color: PAINTS[p.color] ? p.color : 'yellow',
      img: validImg(p.img) ? p.img : null, imagePath: null,
    })) : [];
    return {
      kids: kids.length ? kids : d.kids,
      prizes: prizes.length >= MIN_PRIZES ? prizes : d.prizes,
      perSpin: clamp(parseInt(s.perSpin, 10) || 5, 1, 10),
      free: !!s.free, sound: s.sound !== false, active: s.active || null,
    };
  } catch {
    return null;
  }
}

/** Save the guest board to localStorage whenever it changes. Returns a stop function. */
export function startGuestSave() {
  let t = 0, failed = false;
  const write = () => {
    const s = board.get();
    if (!s) return;
    try {
      const { kids, prizes, perSpin, free, sound, active } = s;
      localStorage.setItem(GUEST_KEY, JSON.stringify({ kids, prizes: prizes.map(({ imagePath, ...p }) => p), perSpin, free, sound, active }));
      if (failed) { failed = false; setNote(''); }
    } catch (e) {
      const full = e && (e.name === 'QuotaExceededError' || e.code === 22);
      if (full && !failed) {
        failed = true;
        setNote('Too many photos to remember. They work now, but remove a photo or two so your wheel is saved for next time. Or sign in to save them online.', true);
      }
    }
  };
  const unsub = board.subscribe(() => { clearTimeout(t); t = setTimeout(write, 120); });
  return () => { unsub(); clearTimeout(t); write(); };
}
