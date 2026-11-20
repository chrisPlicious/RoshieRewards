import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PAINTS, PAINT_KEYS, clamp, reducedMotion } from './lib/constants';
import {
  board, ui, update, renameKid,
  spinsLeft, canUndo, canSpin, railOf, activeIndex,
} from './lib/board';
import { useStore } from './lib/store';
import { Sound } from './lib/sound';
import { confetti, attach as attachConfetti } from './lib/confetti';
import { announce, attachLive } from './lib/announce';
import { addPhotoPrizes } from './lib/prizePhotos';
import Lane from './components/Lane';
import WheelSvg from './components/WheelSvg';
import Workshop from './components/Workshop';
import { RewardPrompt, WinSign } from './components/Cards';
import { Icon, Title } from './components/Bits';

const DENSITY = ['roomy', 'compact', 'tight'];
const NO_FX = { seq: 0 };
const hasFiles = e => e.dataTransfer && [...e.dataTransfer.types].includes('Files');
const canFullscreen = typeof document !== 'undefined' && !!document.documentElement.requestFullscreen;

/** State that handlers must read synchronously (like the old DOM classes), mirrored into React state for rendering. */
function useRefState(initial) {
  const [value, setValue] = useState(initial);
  const ref = useRef(initial);
  const set = useCallback(next => {
    ref.current = typeof next === 'function' ? next(ref.current) : next;
    setValue(ref.current);
  }, []);
  return [value, set, ref];
}

/** The star board: kid strips, reward prompt, prize wheel, win sign and the editing drawer. */
export default function App({ mode, user, onSignIn, onSignOut }) {
  const s = useStore(board);
  const { sync } = useStore(ui);

  const [fx, setFx] = useState({});
  const [prompt, setPrompt, promptR] = useRefState({ show: false, kidId: null });
  const [sign, setSign, signR] = useRefState({ show: false, kidId: null, prize: null });
  const [wheelOpen, setWheelOpen, wheelR] = useRefState(false);
  const [drawerOpen, setDrawerOpen, drawerR] = useRefState(false);
  const [pop, setPop, popR] = useRefState(null);
  const [spinning, setSpinning, spinningR] = useRefState(false);
  const [won, setWon] = useState(false);
  const [winSlice, setWinSlice] = useState(-1);
  const [wide, setWide] = useState(() => innerWidth >= 900);
  const [praises, setPraises] = useState([]);
  const [isFull, setIsFull] = useState(() => !!document.fullscreenElement);

  const lanesRef = useRef(null), rotorRef = useRef(null), pointerRef = useRef(null), hubRef = useRef(null);
  const closeWheelRef = useRef(null), claimRef = useRef(null), laterRef = useRef(null), againRef = useRef(null), backRef = useRef(null);
  const editRef = useRef(null), wsRef = useRef(null), canvasRef = useRef(null), liveRef = useRef(null);
  const rotation = useRef(0), flap = useRef(0), pending = useRef(new Map()), lastPaint = useRef(''), spaceTaken = useRef(false);
  const praiseSeq = useRef(0);

  const modalOpen = () => promptR.current.show || signR.current.show || wheelR.current;
  const laneEl = i => lanesRef.current?.querySelector(`.lane[data-i="${i}"]`);
  const indexOf = id => board.get().kids.findIndex(k => k.id === id);

  /** Replay a lane animation: every call bumps `seq` so one-shot CSS animations restart. */
  const bumpFx = (id, o = {}, keepPending = false) => {
    if (!keepPending) { const t = pending.current.get(id); if (t) { clearTimeout(t); pending.current.delete(id); } }
    setFx(f => ({ ...f, [id]: { ...o, seq: (f[id]?.seq || 0) + 1 } }));
  };

  /* ---------- praise ---------- */
  const praise = i => {
    const lane = laneEl(i); if (!lane) return;
    const r = (lane.querySelector('.count') || lane).getBoundingClientRect();
    const k = board.get().kids[i];
    const word = k.name.length <= 12 ? `Good job, ${k.name}!` : 'Good job!';
    let pk;
    do { pk = PAINT_KEYS[Math.floor(Math.random() * PAINT_KEYS.length)]; } while (pk === lastPaint.current || pk === k.color);
    lastPaint.current = pk;
    const p = PAINTS[pk], id = ++praiseSeq.current;
    const item = { id, word, x: clamp(r.left + r.width / 2, 160, innerWidth - 160), y: Math.max(110, r.top), c: p.c, t: p.t, r: (Math.random() * 10 - 5).toFixed(1) };
    setPraises(list => [...list, item]);
    setTimeout(() => setPraises(list => list.filter(q => q.id !== id)), 1500);
  };

  /* ---------- stars ---------- */
  const addStar = i => {
    const k0 = board.get().kids[i];
    if (!k0 || spinningR.current || modalOpen()) return;
    update(d => { d.kids[i].stars++; d.active = d.kids[i].id; });
    const st = board.get(), k = st.kids[i];
    const { n, filled } = railOf(st, k);
    const completed = !st.free && k.stars % n === 0;
    const slotIdx = completed ? n - 1 : filled - 1;
    if (completed) {
      Sound.earned();
      bumpFx(k.id, { completed: true, newStar: slotIdx, bump: true });
      const t = setTimeout(() => {
        pending.current.delete(k.id);
        bumpFx(k.id, { claimPop: true });
        showPrompt(k.id);
      }, reducedMotion() ? 250 : 950);
      pending.current.set(k.id, t);
    } else {
      Sound.star(slotIdx);
      bumpFx(k.id, { newStar: slotIdx, bump: true });
    }
    praise(i);
    const slot = lanesRef.current?.querySelectorAll(`.lane[data-i="${i}"] .slot`)[slotIdx];
    if (slot) { const r = slot.getBoundingClientRect(); confetti.pop(r.left + r.width / 2, r.top + r.height / 2, completed ? 60 : 34); }
    announce(`Good job, ${k.name}! ${k.stars} ${k.stars === 1 ? 'star' : 'stars'}.${completed ? ' Reward time!' : ''}`);
  };
  const undoStar = i => {
    const st0 = board.get(), k0 = st0.kids[i];
    if (!k0 || spinningR.current || modalOpen() || !canUndo(st0, k0)) return;
    update(d => { d.kids[i].stars--; });
    Sound.undo();
    bumpFx(k0.id, { bump: true });
    const st = board.get(), k = st.kids[i];
    announce(`${k.name}: ${k.stars} ${k.stars === 1 ? 'star' : 'stars'}`);
    const lane = laneEl(i);
    if (!canUndo(st, k) && lane?.contains(document.activeElement)) {
      requestAnimationFrame(() => lane.querySelector('.btn-star')?.focus({ preventScroll: true }));
    }
  };
  const nudgeLane = i => {
    Sound.bonk();
    const k = board.get().kids[i];
    if (k) bumpFx(k.id, { nudge: true }, true);
  };

  /* ---------- reward prompt ---------- */
  const showPrompt = kidId => {
    if (wheelR.current || signR.current.show) return;
    if (indexOf(kidId) < 0) return;
    update(d => { d.active = kidId; });
    setPrompt({ show: true, kidId });
    confetti.burst(140);
    setTimeout(() => claimRef.current?.focus({ preventScroll: true }), 80);
  };
  const hidePrompt = () => setPrompt(p => ({ ...p, show: false }));
  const onClaim = () => { const id = promptR.current.kidId; hidePrompt(); openWheel(indexOf(id)); };
  const onLater = () => {
    const i = indexOf(promptR.current.kidId);
    hidePrompt();
    laneEl(i)?.querySelector('.claim')?.focus({ preventScroll: true });
  };

  /* ---------- wheel ---------- */
  const openWheel = i => {
    const st = board.get(), k = st.kids[i];
    if (!k) return;
    if (!canSpin(st, k)) { nudgeLane(i); return; }
    if (drawerR.current) closeDrawer();
    update(d => { d.active = k.id; });
    setWon(false);
    setWheelOpen(true);
    Sound.whoosh();
    setTimeout(() => hubRef.current?.focus({ preventScroll: true }), 120);
  };
  const closeWheel = () => {
    if (spinningR.current) return;
    setWheelOpen(false); setWon(false); setWinSlice(-1);
    const lane = laneEl(activeIndex(board.get()));
    (lane?.querySelector('.claim') || lane?.querySelector('.btn-star'))?.focus({ preventScroll: true });
  };
  const spin = () => {
    if (spinningR.current) return;
    const st = board.get(), ai = activeIndex(st), k = st.kids[ai];
    if (!canSpin(st, k)) { Sound.bonk(); return; }
    setSpinning(true);
    setSign(v => ({ ...v, show: false }));
    setWinSlice(-1);
    if (!st.free) update(d => { d.kids[ai].spent++; });
    bumpFx(k.id, {});
    Sound.pop(0.4);

    const n = st.prizes.length, a = 360 / n;
    const w = Math.floor(Math.random() * n);
    const prize = { ...st.prizes[w] };
    const theta = w * a + a * (0.16 + 0.68 * Math.random());
    const start = rotation.current;
    const base = (((-theta - start) % 360) + 360) % 360;
    const rm = reducedMotion();
    const target = start + (rm ? 360 : 360 * 6) + base;
    const dur = rm ? 1600 : 6000 + Math.random() * 600;
    const rotor = rotorRef.current, pointer = pointerRef.current;
    rotor.style.willChange = 'transform';
    let t0 = 0, lastPeg = Math.floor(start / a), prevR = start, prevT = 0;
    const frame = now => {
      if (!t0) { t0 = now; prevT = now; }
      const t = clamp((now - t0) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3.4);
      rotation.current = start + (target - start) * eased;
      rotor.style.transform = `rotate(${rotation.current}deg)`;
      const v = (rotation.current - prevR) / Math.max(1, now - prevT); prevR = rotation.current; prevT = now;
      const peg = Math.floor(rotation.current / a);
      if (peg !== lastPeg) { lastPeg = peg; flap.current = -clamp(9 + v * 26, 9, 30); Sound.tick(clamp(0.14 + v * 0.35, 0.14, 0.42)); }
      flap.current *= 0.8;
      pointer.style.setProperty('--flap', `${flap.current.toFixed(2)}deg`);
      if (t < 1) requestAnimationFrame(frame);
      else {
        rotation.current = target % 360;
        rotor.style.transform = `rotate(${rotation.current}deg)`; rotor.style.willChange = '';
        pointer.style.setProperty('--flap', '0deg');
        landed(k.id, w, prize);
      }
    };
    requestAnimationFrame(frame);
  };
  const landed = (kidId, w, prize) => {
    update(d => { const kk = d.kids.find(x => x.id === kidId); if (kk) kk.won = (kk.won || 0) + 1; });
    bumpFx(kidId, { giftNew: true });
    setWinSlice(w);
    Sound.win(); confetti.burst();
    const k = board.get().kids.find(x => x.id === kidId);
    announce(`Good job, ${k?.name}! You won ${prize.name}!`);
    setTimeout(() => showSign(kidId, prize), reducedMotion() ? 100 : 1100);
  };
  const onHub = () => {
    if (drawerR.current && !wheelR.current) return; // preview only while editing
    const st = board.get();
    if (spinningR.current || !canSpin(st, st.kids[activeIndex(st)])) { Sound.bonk(); return; }
    spin();
  };

  /* ---------- win sign ---------- */
  const showSign = (kidId, prize) => {
    const st = board.get(), k = st.kids.find(x => x.id === kidId);
    setSign({ show: true, kidId, prize });
    setWon(true);
    confetti.burst(90);
    const more = k ? spinsLeft(st, k) : 0;
    setTimeout(() => (more > 0 ? againRef.current : backRef.current)?.focus({ preventScroll: true }), 60);
  };
  const onBack = () => { setSign(v => ({ ...v, show: false })); setSpinning(false); closeWheel(); };
  const onAgain = () => { setSpinning(false); setWon(false); spin(); };

  /* ---------- drawer ---------- */
  const openDrawer = () => {
    if (spinningR.current || modalOpen()) return;
    setDrawerOpen(true);
    setTimeout(() => document.getElementById('closeWs')?.focus({ preventScroll: true }), 50);
  };
  const closeDrawer = () => {
    if (!drawerR.current) return;
    setDrawerOpen(false); setPop(null);
    if (wsRef.current?.contains(document.activeElement)) editRef.current?.focus({ preventScroll: true });
  };

  /* ---------- tools ---------- */
  const setSound = on => {
    update(d => { d.sound = on; });
    if (on) Sound.marimba(783.99, 0, 0.3, 0.5);
  };
  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  };

  /* ---------- keyboard ---------- */
  const trap = (e, items) => {
    const f = items.filter(b => b && !b.hidden && b.getClientRects().length > 0);
    if (!f.length) return;
    const idx = f.indexOf(document.activeElement);
    e.preventDefault();
    f[(idx + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
  };
  const onKeyDown = e => {
    const tag = (e.target.tagName || '').toLowerCase();
    const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
    const promptUp = promptR.current.show, signUp = signR.current.show, wheelUp = wheelR.current;
    if (e.key === 'Escape') {
      if (popR.current) {
        const back = popR.current; setPop(null);
        wsRef.current?.querySelector(`[data-act="${back.kind}"][data-id="${back.id}"]`)?.focus();
        return;
      }
      if (promptUp) { onLater(); return; }
      if (signUp) { onBack(); return; }
      if (wheelUp) { closeWheel(); return; }
      if (drawerR.current) { closeDrawer(); return; }
    }
    if (e.key === 'Tab') {
      if (promptUp) return trap(e, [claimRef.current, laterRef.current]);
      if (signUp) return trap(e, [againRef.current, backRef.current]);
      if (wheelUp) return trap(e, [hubRef.current, closeWheelRef.current]);
    }
    if (typing || drawerR.current || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.code === 'Space') {
      e.preventDefault(); spaceTaken.current = true;
      if (e.repeat) return;
      if (promptUp) { onClaim(); return; }
      if (signUp) return;
      if (wheelUp) { if (!spinningR.current) onHub(); return; }
      const st = board.get(), ai = activeIndex(st);
      if (canSpin(st, st.kids[ai])) openWheel(ai);
      else { const j = st.kids.findIndex(k => canSpin(st, k)); if (j >= 0) openWheel(j); else nudgeLane(ai); }
      return;
    }
    if (promptUp || signUp || wheelUp) return;
    const m = /^(?:Digit|Numpad)([1-9])$/.exec(e.code);
    if (m) {
      const i = +m[1] - 1;
      if (i < board.get().kids.length) {
        e.preventDefault();
        if (e.repeat) return;
        if (e.shiftKey) undoStar(i);
        else {
          addStar(i);
          const b = laneEl(i)?.querySelector('.btn-star');
          if (b) { b.classList.add('pressed'); setTimeout(() => b.classList.remove('pressed'), 130); }
        }
      }
    }
  };

  /* ---------- density: shrink strips until every kid fits on one screen ---------- */
  const fitDensity = () => {
    const el = lanesRef.current, st = board.get();
    if (!el || !st) return;
    const K = st.kids.length;
    let idx = K <= 2 ? 0 : K <= 4 ? 1 : 2;
    el.dataset.size = DENSITY[idx];
    if (innerWidth < 900) return;
    while (idx < 2 && el.scrollHeight > el.clientHeight + 2) { idx++; el.dataset.size = DENSITY[idx]; }
  };
  const tipShown = s.kids.every(k => k.stars === 0);
  useLayoutEffect(fitDensity, [s.kids.length, tipShown]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---------- window-level wiring (handlers read the latest render through this ref) ---------- */
  const latest = useRef({});
  latest.current = { onKeyDown, fitDensity, openDrawer };
  useEffect(() => {
    attachConfetti(canvasRef.current);
    attachLive(liveRef.current);
    rotorRef.current.style.transform = `rotate(${rotation.current}deg)`;
    let fitT = 0;
    const keydown = e => latest.current.onKeyDown(e);
    const keyup = e => { if (e.code === 'Space' && spaceTaken.current) { e.preventDefault(); spaceTaken.current = false; } };
    const resize = () => { cancelAnimationFrame(fitT); fitT = requestAnimationFrame(() => latest.current.fitDensity()); setWide(innerWidth >= 900); };
    const fullchange = () => setIsFull(!!document.fullscreenElement);
    const dragover = e => { if (hasFiles(e) && !wsRef.current?.contains(e.target)) e.preventDefault(); };
    const drop = e => {
      if (!hasFiles(e) || wsRef.current?.contains(e.target)) return;
      e.preventDefault();
      const files = [...e.dataTransfer.files];
      if (!drawerR.current) latest.current.openDrawer();
      addPhotoPrizes(files).then(id => {
        if (id) requestAnimationFrame(() => wsRef.current?.querySelector(`[data-act="pname"][data-id="${id}"]`)?.focus());
      });
    };
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);
    document.addEventListener('fullscreenchange', fullchange);
    addEventListener('resize', resize);
    addEventListener('dragover', dragover);
    addEventListener('drop', drop);
    document.fonts?.ready.then(() => latest.current.fitDensity());
    const timers = pending.current;
    return () => {
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('keyup', keyup);
      document.removeEventListener('fullscreenchange', fullchange);
      removeEventListener('resize', resize);
      removeEventListener('dragover', dragover);
      removeEventListener('drop', drop);
      timers.forEach(t => clearTimeout(t)); timers.clear();
      attachConfetti(null); attachLive(null);
    };
  }, [drawerR]);

  useEffect(() => {
    document.body.classList.toggle('wheel-up', wheelOpen);
    document.documentElement.style.overflow = wheelOpen ? 'hidden' : '';
    return () => { document.body.classList.remove('wheel-up'); document.documentElement.style.overflow = ''; };
  }, [wheelOpen]);

  /* ---------- render ---------- */
  const ai = activeIndex(s), activeKid = s.kids[ai];
  const peek = drawerOpen && wide && !wheelOpen;
  const hubCan = canSpin(s, activeKid) && !spinning;
  const kp = PAINTS[activeKid.color];
  const spinFor = s.kids.length > 1 || activeKid.name !== 'Superstar' ? `${activeKid.name}'s spin!` : 'Your spin!';
  const promptKid = s.kids.find(k => k.id === prompt.kidId);
  const signKid = s.kids.find(k => k.id === sign.kidId);
  const K = s.kids;

  return (
    <>
      <div className="app">
        <header className="topbar">
          <Title />
          <div className="tools">
            <button className="tool round" type="button" hidden={!canFullscreen} aria-label={isFull ? 'Exit full screen' : 'Full screen'} onClick={toggleFull}>
              <Icon id={isFull ? 'i-unfull' : 'i-full'} />
            </button>
            <button className="tool round" type="button" aria-label={s.sound ? 'Sound on' : 'Sound off'} aria-pressed={s.sound} onClick={() => setSound(!board.get().sound)}>
              <Icon id={s.sound ? 'i-sound' : 'i-mute'} />
            </button>
            <button ref={editRef} className="tool" type="button" aria-label="Prizes and kids" aria-expanded={drawerOpen} aria-controls="workshop" onClick={() => (drawerR.current ? closeDrawer() : openDrawer())}>
              <Icon id="i-brush" /><span className="label">Prizes &amp; kids</span>
            </button>
            {mode === 'cloud' && sync === 'error' && (
              <button className="sync-chip" type="button" onClick={openDrawer} title="Your latest changes are waiting to be saved. They will save when the internet is back.">
                <Icon id="i-cloud" /><span className="label">Not saved yet</span>
              </button>
            )}
          </div>
        </header>

        <main className="stage">
          <section className="lanes-col" aria-label="Stars">
            <div className="lanes" ref={lanesRef}>
              {K.map((k, i) => (
                <Lane
                  key={k.id} s={s} kid={k} i={i} fx={fx[k.id] || NO_FX}
                  onStar={() => addStar(i)}
                  onUndo={() => undoStar(i)}
                  onClaim={() => openWheel(i)}
                  onRename={v => renameKid(k.id, v)}
                />
              ))}
              {tipShown && (
                <p className="tip">
                  Each time a kid answers, tap the <b>big star button</b>
                  {K.length > 1 ? <> (or press <b>1–{Math.min(K.length, 8)}</b>)</> : <> (or press <b>1</b>)</>}.{' '}
                  {s.free ? 'Every star counts. Spin any time!' : `${s.perSpin} ${s.perSpin === 1 ? 'star wins' : 'stars win'} a turn on the prize wheel.`}
                </p>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* wheel: only comes out to claim a reward (or as a preview while editing prizes) */}
      <div className={'wheel-stage' + (wheelOpen ? ' open' : '') + (peek ? ' peek' : '') + (won ? ' won' : '')}>
        <div className="scrim" onClick={() => { if (!spinningR.current && !signR.current.show) closeWheel(); }} />
        <button ref={closeWheelRef} className="tool round close-wheel" type="button" aria-label="Put the wheel away" onClick={closeWheel}>
          <Icon id="i-close" />
        </button>
        <div className="wheel-card" role="dialog" aria-modal="true" aria-labelledby="spinFor">
          <p className="spin-for" id="spinFor" style={{ '--kid': kp.c, '--kid-t': kp.t }}>{spinFor}</p>
          <div className="wheel-wrap">
            <div className="wheel-shadow" />
            <div className="rotor" ref={rotorRef}><WheelSvg prizes={s.prizes} win={winSlice} /></div>
            <svg className="glass" viewBox="0 0 500 500" aria-hidden="true">
              <defs>
                <radialGradient id="sheen" cx="34%" cy="25%" r="75%">
                  <stop offset="0" stopColor="#fff" stopOpacity=".26" />
                  <stop offset=".45" stopColor="#fff" stopOpacity=".03" />
                  <stop offset="1" stopColor="#0C1846" stopOpacity=".12" />
                </radialGradient>
              </defs>
              <circle cx="250" cy="250" r="248" fill="url(#sheen)" />
            </svg>
            <svg className="pointer" ref={pointerRef} viewBox="0 0 60 120" aria-hidden="true"><use href="#i-flapper" /></svg>
            <button
              ref={hubRef}
              className={'hub' + (hubCan && wheelOpen ? ' ready' : '')}
              type="button"
              aria-disabled={!hubCan || peek}
              aria-label={hubCan ? `Spin the wheel for ${activeKid.name}` : 'Spin the wheel'}
              onClick={onHub}
            >
              SPIN
            </button>
          </div>
        </div>
      </div>

      <Workshop
        s={s} open={drawerOpen} mode={mode} user={user} wsRef={wsRef}
        pop={pop} setPop={setPop}
        onClose={closeDrawer} onSound={setSound} onSignIn={onSignIn} onSignOut={onSignOut}
      />

      <RewardPrompt
        show={prompt.show} kid={promptKid} perSpin={s.perSpin}
        claimRef={claimRef} laterRef={laterRef} onClaim={onClaim} onLater={onLater}
      />
      <WinSign
        show={sign.show} kid={signKid} prize={sign.prize} free={s.free}
        more={signKid ? spinsLeft(s, signKid) : 0}
        againRef={againRef} backRef={backRef} onAgain={onAgain} onBack={onBack}
      />

      <canvas id="confetti" ref={canvasRef} aria-hidden="true" />
      <div className="sr-only" ref={liveRef} aria-live="polite" />
      {praises.map(p => (
        <div key={p.id} className="praise" aria-hidden="true" style={{ left: `${p.x}px`, top: `${p.y}px`, '--c': p.c, '--t': p.t, '--r': `${p.r}deg` }}>
          {p.word}
        </div>
      ))}
    </>
  );
}
