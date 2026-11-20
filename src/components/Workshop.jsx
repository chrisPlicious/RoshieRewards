import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PAINTS, PAINT_KEYS, ICONS, ICON_KEYS, MAX_KIDS, MAX_PRIZES, MIN_PRIZES, NAME_MAX, clamp } from '../lib/constants';
import { ui, update, addKid, addPrize, renameKid, starterPrizes } from '../lib/board';
import { useStore } from '../lib/store';
import { setPrizePhoto, addPhotoPrizes } from '../lib/prizePhotos';
import { announce } from '../lib/announce';
import { cloudReady } from '../lib/supabase';
import { Icon, MiniStar } from './Bits';

/** Text field that keeps the teacher's typing while focused and follows the board otherwise. */
function NameField({ value, onType, onCommit, ...rest }) {
  const [draft, setDraft] = useState(value);
  const focused = useRef(false);
  useEffect(() => { if (!focused.current) setDraft(value); }, [value]);
  return (
    <input
      {...rest}
      className="field"
      value={draft}
      maxLength={NAME_MAX}
      enterKeyHint="done"
      onFocus={() => { focused.current = true; }}
      onChange={e => { setDraft(e.target.value); onType(e.target.value); }}
      onBlur={e => { focused.current = false; onCommit?.(e.target.value); setDraft(value); }}
      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur(); } }}
    />
  );
}

const SYNC_TEXT = {
  saved: 'Everything is saved to your account.',
  saving: 'Saving…',
  error: 'Can’t reach the internet right now. Your changes will save when it’s back.',
  idle: '',
};

/** The notebook-paper drawer: prizes, kids, star goal, keyboard help, start over, account. */
export default function Workshop({ s, open, mode, user, wsRef, pop, setPop, onClose, onSound, onSignIn, onSignOut }) {
  const { note, sync } = useStore(ui);
  const bodyRef = useRef(null);
  const popRef = useRef(null);
  const fileOne = useRef(null);
  const fileMany = useRef(null);
  const photoTarget = useRef(null);
  const [armed, setArmed] = useState(null);
  const armT = useRef(0);
  const [dropRow, setDropRow] = useState(null);
  const [dropping, setDropping] = useState(false);
  const P = s.prizes, K = s.kids;

  useEffect(() => () => clearTimeout(armT.current), []);
  useEffect(() => { if (!open) setArmed(null); }, [open]);

  const confirmTwice = (key, run) => {
    clearTimeout(armT.current);
    if (armed === key) { setArmed(null); run(); return; }
    setArmed(key);
    armT.current = setTimeout(() => setArmed(null), 3000);
  };
  const focusLater = (sel, select) => requestAnimationFrame(() => {
    const el = wsRef.current?.querySelector(sel);
    if (el) { el.focus(); if (select) el.select?.(); }
  });
  const anchorSel = p => `[data-act="${p.kind}"][data-id="${p.id}"]`;

  /* ---- picker pop-over ---- */
  const togglePop = (kind, id) => setPop(cur => (cur && cur.kind === kind && cur.id === id ? null : { kind, id }));
  const closePopTo = p => { setPop(null); if (p) focusLater(anchorSel(p)); };

  useLayoutEffect(() => {
    if (!pop) return;
    const body = bodyRef.current, el = popRef.current, anchor = wsRef.current?.querySelector(anchorSel(pop));
    if (!body || !el || !anchor) { setPop(null); return; }
    const br = body.getBoundingClientRect(), ar = anchor.getBoundingClientRect();
    el.style.left = clamp(ar.left - br.left, 8, body.clientWidth - el.offsetWidth - 8) + 'px';
    el.style.top = (ar.bottom - br.top + body.scrollTop + 8) + 'px';
    (el.querySelector('[aria-pressed="true"]') || el.querySelector('button'))?.focus({ preventScroll: false });
  }, [pop?.kind, pop?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!pop) return;
    const down = e => {
      if (!popRef.current?.contains(e.target) && !e.target.closest('[data-act="paint"],[data-act="icon"],[data-act="kpaint"]')) setPop(null);
    };
    document.addEventListener('pointerdown', down);
    return () => document.removeEventListener('pointerdown', down);
  }, [pop, setPop]);

  const onPopKey = e => {
    const btns = [...popRef.current.querySelectorAll('[data-icon],[data-paint]')];
    const idx = btns.indexOf(document.activeElement);
    if (idx < 0) return;
    const map = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 5, ArrowUp: -5 };
    if (map[e.key] !== undefined) { e.preventDefault(); btns[clamp(idx + map[e.key], 0, btns.length - 1)].focus(); }
  };
  const pickPaint = key => {
    const p = pop;
    update(d => {
      const t = p.kind === 'kpaint' ? d.kids.find(k => k.id === p.id) : d.prizes.find(x => x.id === p.id);
      if (t) t.color = key;
    });
    closePopTo(p);
  };
  const pickIcon = key => {
    const p = pop;
    update(d => { const t = d.prizes.find(x => x.id === p.id); if (t) { t.icon = key; t.img = null; t.imagePath = null; } });
    closePopTo(p);
  };
  const removePhoto = () => {
    const p = pop;
    update(d => { const t = d.prizes.find(x => x.id === p.id); if (t) { t.img = null; t.imagePath = null; } });
    closePopTo(p);
  };

  let popBody = null;
  if (pop) {
    if (pop.kind !== 'icon') {
      const cur = pop.kind === 'kpaint' ? K.find(k => k.id === pop.id)?.color : P.find(p => p.id === pop.id)?.color;
      popBody = PAINT_KEYS.map(pk => (
        <button key={pk} type="button" className="paint-btn" data-paint={pk} style={{ '--c': PAINTS[pk].c }} aria-label={PAINTS[pk].name} aria-pressed={pk === cur} onClick={() => pickPaint(pk)} />
      ));
    } else {
      const pz = P.find(p => p.id === pop.id);
      if (pz) {
        const c = PAINTS[pz.color];
        popBody = (
          <>
            <button type="button" className="pop-wide" data-upload onClick={() => { photoTarget.current = pz.id; fileOne.current.value = ''; fileOne.current.click(); }}>
              <Icon id="i-photo" />{pz.img ? 'Change photo' : 'Upload a photo'}
            </button>
            {pz.img && (
              <button type="button" className="pop-wide plain" data-noimg onClick={removePhoto}><Icon id="i-trash" />Remove photo</button>
            )}
            <p className="pop-or">{pz.img ? 'or use a picture instead:' : 'or pick a picture:'}</p>
            {ICON_KEYS.map(ic => (
              <button key={ic} type="button" className="icon-btn" data-icon={ic} style={{ '--c': c.c, '--t': c.t }} aria-label={ICONS[ic]} aria-pressed={!pz.img && ic === pz.icon} onClick={() => pickIcon(ic)}>
                <svg viewBox="0 0 48 48" aria-hidden="true"><use href={`#i-${ic}`} /></svg>
              </button>
            ))}
          </>
        );
      }
    }
  }

  /* ---- photos ---- */
  const photoOnto = async (id, file) => {
    const p = pop;
    if (await setPrizePhoto(id, file)) {
      setPop(null);
      focusLater(`[data-act="icon"][data-id="${id}"]`);
    } else if (p) focusLater(anchorSel(p));
  };
  const photosAsPrizes = async files => {
    const last = await addPhotoPrizes(files);
    if (last) focusLater(`[data-act="pname"][data-id="${last}"]`);
  };
  const hasFiles = e => e.dataTransfer && [...e.dataTransfer.types].includes('Files');
  const rowOf = e => e.target.closest?.('#prizeRows .row')?.dataset.id || null;

  /* ---- account ---- */
  const signOut = () => {
    if (sync === 'error' || sync === 'saving') confirmTwice('signout', onSignOut);
    else onSignOut();
  };

  return (
    <aside
      ref={wsRef}
      className={'workshop' + (open ? ' open' : '') + (dropping ? ' dropping' : '')}
      id="workshop"
      aria-label="Prizes and kids"
      inert={!open}
      onDragOver={e => {
        if (!hasFiles(e)) return;
        e.preventDefault(); e.dataTransfer.dropEffect = 'copy';
        const row = rowOf(e);
        setDropRow(row); setDropping(!row);
      }}
      onDragLeave={e => { if (!wsRef.current.contains(e.relatedTarget)) { setDropping(false); setDropRow(null); } }}
      onDrop={e => {
        if (!hasFiles(e)) return;
        e.preventDefault(); e.stopPropagation();
        setDropping(false); setDropRow(null);
        const row = rowOf(e);
        if (row && e.dataTransfer.files.length === 1) photoOnto(row, e.dataTransfer.files[0]);
        else photosAsPrizes([...e.dataTransfer.files]);
      }}
    >
      <div className="ws-head">
        <h2>Prizes &amp; kids</h2>
        <button className="tool round" id="closeWs" type="button" aria-label="Close" onClick={onClose}><Icon id="i-close" /></button>
      </div>
      <div className="ws-body" ref={bodyRef}>
        <section className="ws-sec">
          <h3>Prize wheel</h3>
          <p className="hint">Write your own prizes. Tap the color or the picture to change it, or upload your own photo. You can also drag photos onto this page.</p>
          <p className={'ws-note' + (note?.warn ? ' warn' : '')} role="status" hidden={!note}>{note?.msg}</p>
          <ol className="rows" id="prizeRows">
            {P.map((p, i) => {
              const c = PAINTS[p.color];
              const delKey = `pdel:${p.id}`;
              return (
                <li key={p.id} className={'row' + (dropRow === p.id ? ' drop-on' : '')} data-id={p.id}>
                  <button className="paint-btn" type="button" data-act="paint" data-id={p.id} style={{ '--c': c.c }} aria-label={`Color: ${c.name}. Change color`} aria-haspopup="true" onClick={() => togglePop('paint', p.id)} />
                  <button
                    className={'icon-btn' + (p.img ? ' has-photo' : '')}
                    type="button" data-act="icon" data-id={p.id}
                    style={{ '--c': c.c, '--t': c.t, ...(p.img ? { backgroundImage: `url("${p.img}")` } : {}) }}
                    aria-label={`Picture: ${p.img ? 'your photo' : ICONS[p.icon]}. Change picture or upload a photo`}
                    aria-haspopup="true"
                    onClick={() => togglePop('icon', p.id)}
                  >
                    <svg viewBox="0 0 48 48" aria-hidden="true"><use href={`#i-${p.icon}`} /></svg>
                  </button>
                  <NameField
                    data-act="pname" data-id={p.id} value={p.name} placeholder="Prize name" aria-label={`Prize ${i + 1} name`}
                    onType={v => update(d => { const t = d.prizes.find(x => x.id === p.id); if (t) t.name = v.slice(0, NAME_MAX); })}
                    onCommit={v => { if (!v.trim()) update(d => { const t = d.prizes.find(x => x.id === p.id); if (t) t.name = 'Prize'; }); }}
                  />
                  <button
                    className={'del' + (armed === delKey ? ' armed' : '')}
                    type="button" data-act="pdel"
                    aria-label={armed === delKey ? `Tap again to remove ${p.name || 'this prize'}` : `Remove ${p.name || 'prize'}`}
                    disabled={P.length <= MIN_PRIZES}
                    onClick={() => confirmTwice(delKey, () => update(d => { d.prizes = d.prizes.filter(x => x.id !== p.id); }))}
                  >
                    <Icon id="i-trash" />
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="add-pair">
            <button className="add" type="button" disabled={P.length >= MAX_PRIZES} onClick={() => { const p = addPrize(); if (p) focusLater(`[data-act="pname"][data-id="${p.id}"]`, true); }}>
              <Icon id="i-plus" /><span>{P.length >= MAX_PRIZES ? `Wheel is full (${MAX_PRIZES})` : 'Add a prize'}</span>
            </button>
            <button className="add" type="button" disabled={P.length >= MAX_PRIZES} onClick={() => { fileMany.current.value = ''; fileMany.current.click(); }}>
              <Icon id="i-photo" /><span>Add prizes from photos</span>
            </button>
          </div>
          <input type="file" ref={fileOne} accept="image/*" hidden onChange={e => { const f = e.target.files[0]; if (f && photoTarget.current) photoOnto(photoTarget.current, f); }} />
          <input type="file" ref={fileMany} accept="image/*" multiple hidden onChange={e => { const fs = [...e.target.files]; e.target.value = ''; if (fs.length) photosAsPrizes(fs); }} />
        </section>

        <section className="ws-sec">
          <h3>Kids</h3>
          <p className="hint">One kid for a private lesson, or up to 8 in a group.</p>
          <ol className="rows">
            {K.map((k, i) => {
              const c = PAINTS[k.color];
              const delKey = `kdel:${k.id}`;
              return (
                <li key={k.id} className="row kid">
                  <button className="paint-btn" type="button" data-act="kpaint" data-id={k.id} style={{ '--c': c.c }} aria-label={`${k.name}'s color: ${c.name}. Change color`} aria-haspopup="true" onClick={() => togglePop('kpaint', k.id)} />
                  <NameField
                    data-act="kname" data-id={k.id} value={k.name} placeholder="Kid's name" aria-label={`Kid ${i + 1} name`}
                    onType={v => renameKid(k.id, v)}
                  />
                  <span className="kid-stars" aria-label={`${k.stars} stars`}><MiniStar />{k.stars}</span>
                  <button
                    className={'del' + (armed === delKey ? ' armed' : '')}
                    type="button" data-act="kdel"
                    aria-label={armed === delKey ? `Tap again to remove ${k.name} and their stars` : `Remove ${k.name}`}
                    disabled={K.length <= 1}
                    onClick={() => {
                      const run = () => update(d => { d.kids = d.kids.filter(x => x.id !== k.id); if (d.active === k.id) d.active = null; });
                      if (k.stars > 0) confirmTwice(delKey, run); else run();
                    }}
                  >
                    <Icon id="i-trash" />
                  </button>
                </li>
              );
            })}
          </ol>
          <button className="add" type="button" disabled={K.length >= MAX_KIDS} onClick={() => { const k = addKid(); if (k) focusLater(`[data-act="kname"][data-id="${k.id}"]`, true); }}>
            <Icon id="i-plus" /><span>Add a kid</span>
          </button>
        </section>

        <section className="ws-sec">
          <h3>Star goal</h3>
          <div className="rule">
            <span className="rule-label" id="ruleLabel">Stars for one reward</span>
            <div className="stepper" role="group" aria-labelledby="ruleLabel">
              <button className="step" type="button" aria-label="Fewer stars" disabled={s.free || s.perSpin <= 1} onClick={() => update(d => { d.perSpin = clamp(d.perSpin - 1, 1, 10); })}><Icon id="i-minus" /></button>
              <span className="step-val" aria-live="polite">{s.perSpin}</span>
              <button className="step" type="button" aria-label="More stars" disabled={s.free || s.perSpin >= 10} onClick={() => update(d => { d.perSpin = clamp(d.perSpin + 1, 1, 10); })}><Icon id="i-plus" /></button>
            </div>
            <div className="preview" aria-hidden="true">
              {!s.free && (
                <>
                  {Array.from({ length: s.perSpin }, (_, j) => <MiniStar key={j} />)}
                  <span className="eq">=</span>
                  <svg className="pgift" viewBox="0 0 48 48" style={{ '--cut': '#fff' }}><use href="#i-gift" /></svg>
                </>
              )}
            </div>
          </div>
          <label className="switch">
            <span>Free spins<small>Kids can spin any time, no stars needed.</small></span>
            <input type="checkbox" checked={s.free} onChange={e => { const v = e.target.checked; update(d => { d.free = v; }); }} />
            <span className="track" aria-hidden="true" />
          </label>
          <label className="switch">
            <span>Sound<small>Pops, chimes and the wheel ticking.</small></span>
            <input type="checkbox" checked={s.sound} onChange={e => onSound(e.target.checked)} />
            <span className="track" aria-hidden="true" />
          </label>
        </section>

        <section className="ws-sec">
          <h3>Keyboard</h3>
          <dl className="keys">
            <dt><kbd>1</kbd>–<kbd>8</kbd></dt><dd>Give that kid a star</dd>
            <dt><kbd>Shift</kbd> + <kbd>1</kbd></dt><dd>Take a star back</dd>
            <dt><kbd>Space</kbd></dt><dd>Claim a reward, then spin</dd>
          </dl>
        </section>

        <section className="ws-sec">
          <h3>Start over</h3>
          <p className="hint">New lesson clears everyone's stars and rewards. Kids and prizes stay.</p>
          <div className="danger">
            <button className={'btn red' + (armed === 'lesson' ? ' armed' : '')} type="button" onClick={() => confirmTwice('lesson', () => {
              update(d => { d.kids.forEach(k => { k.stars = 0; k.spent = 0; k.won = 0; }); d.active = null; });
              announce('New lesson. All stars cleared.');
            })}>
              {armed === 'lesson' ? 'Tap again to clear all stars' : 'New lesson'}
            </button>
            <button className={'btn plain' + (armed === 'starter' ? ' armed' : '')} type="button" onClick={() => confirmTwice('starter', () => {
              update(d => { d.prizes = starterPrizes(); });
              announce('Starter prizes are back on the wheel.');
            })}>
              {armed === 'starter' ? 'Tap again to replace your prizes' : 'Use starter prizes'}
            </button>
          </div>
        </section>

        <section className="ws-sec" hidden={mode !== 'cloud' && !cloudReady}>
          {mode === 'cloud' ? (
            <>
              <h3>Your account</h3>
              <p className="hint">Signed in as <b>{user?.email}</b>. <span className={'sync-line ' + sync}>{SYNC_TEXT[sync]}</span></p>
              <div className="danger">
                <button className={'btn plain' + (armed === 'signout' ? ' armed' : '')} type="button" onClick={signOut}>
                  {armed === 'signout' ? 'Not saved yet. Tap again to sign out' : 'Sign out'}
                </button>
              </div>
            </>
          ) : (
            <>
              <h3>Save online</h3>
              <p className="hint">Right now this board is saved on this computer only. Sign in to keep your kids, stars and prizes on every computer.</p>
              <div className="danger">
                <button className="btn" type="button" onClick={onSignIn}>Sign in</button>
              </div>
            </>
          )}
        </section>

        {pop && (
          <div ref={popRef} className={'pop ' + (pop.kind === 'icon' ? 'icons' : 'paints')} onKeyDown={onPopKey}>
            {popBody}
          </div>
        )}
      </div>
      <div className="ws-foot"><button className="btn" type="button" onClick={onClose}>Done</button></div>
    </aside>
  );
}
