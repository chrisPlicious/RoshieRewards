import { useEffect, useRef, useState } from 'react';
import { GIFT_COLORS, NAME_MAX, rotFor } from '../lib/constants';
import { railOf, spinsLeft, needFor, canUndo, kidVars } from '../lib/board';
import { Icon, Gift, MiniStar } from './Bits';

/** Gift stickers after the name: one per reward won this lesson, "+N" after four. */
function Earned({ won, fresh }) {
  if (!won) return null;
  const shown = Math.min(won, 4);
  return (
    <span className="earned" role="img" aria-label={`${won} ${won === 1 ? 'reward' : 'rewards'} won`}>
      {Array.from({ length: shown }, (_, j) => (
        <span
          key={j}
          className={'gift-sticker' + (fresh && j === shown - 1 && won <= 4 ? ' new' : '')}
          style={{ '--gc': GIFT_COLORS[j % GIFT_COLORS.length], '--rot': `${rotFor(j + 3)}deg` }}
        >
          <svg viewBox="0 0 48 48" aria-hidden="true"><use href="#i-gift" /></svg>
        </span>
      ))}
      {won > 4 && (
        <span key={`more${won}`} className={'gift-sticker more' + (fresh ? ' new' : '')} style={{ '--rot': '4deg' }}>+{won - 4}</span>
      )}
    </span>
  );
}

function RenameInput({ initial, onDone }) {
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => { ref.current?.focus(); ref.current?.select(); }, []);
  const finish = ok => {
    if (done.current) return;
    done.current = true;
    onDone(ok, ref.current?.value ?? '');
  };
  return (
    <input
      ref={ref}
      className="tag-input"
      defaultValue={initial}
      maxLength={NAME_MAX}
      aria-label="Kid name"
      onKeyDown={e => {
        if (e.key === 'Enter') { e.preventDefault(); finish(true); }
        else if (e.key === 'Escape') { e.preventDefault(); finish(false); }
        e.stopPropagation();
      }}
      onBlur={() => finish(true)}
    />
  );
}

/**
 * One kid's construction-paper strip.
 * `fx` describes the animation to play on this render: { seq, newStar, completed, bump, claimPop, giftNew, nudge }.
 * `seq` changes on every event so one-shot animations (count bump, nudge) restart.
 */
export default function Lane({ s, kid, i, fx, onStar, onUndo, onClaim, onRename }) {
  const [editing, setEditing] = useState(false);
  const tagRef = useRef(null);
  const wasEditing = useRef(false);
  useEffect(() => {
    if (wasEditing.current && !editing) tagRef.current?.focus();
    wasEditing.current = editing;
  }, [editing]);

  const { n, filled } = railOf(s, kid);
  const shown = fx.completed ? n : filled;
  const left = spinsLeft(s, kid);
  const name = kid.name;

  let claim = null;
  if (s.free) {
    claim = (
      <button className="claim" type="button" data-act="claim" onClick={onClaim} aria-label={`Spin the wheel for ${name}`}>
        <Gift />Spin!
      </button>
    );
  } else if (left > 0 && !fx.completed) {
    claim = (
      <button
        className={'claim' + (fx.claimPop ? ' claim-in' : '')}
        type="button"
        data-act="claim"
        onClick={onClaim}
        aria-label={`Claim a reward for ${name}${left > 1 ? `, ${left} rewards waiting` : ''}`}
      >
        <Gift />Claim reward{left > 1 && <span className="x" aria-hidden="true">{left}</span>}
      </button>
    );
  } else if (!fx.completed) {
    const need = needFor(s, kid);
    claim = (
      <span key={`need${fx.seq}`} className={'need' + (fx.nudge ? ' nudge' : '')} aria-label={`${name} needs ${need} more ${need === 1 ? 'star' : 'stars'} for a reward`}>
        <Gift cut="#fff" />{need} more
      </span>
    );
  }

  return (
    <article className="lane" data-i={i} style={kidVars(kid)} aria-label={name}>
      <div className="name-row">
        {editing ? (
          <RenameInput
            initial={name}
            onDone={(ok, v) => { setEditing(false); if (ok) onRename(v); }}
          />
        ) : (
          <button ref={tagRef} className="tag" type="button" data-act="rename" onClick={() => setEditing(true)} aria-label={`${name}. Rename`}>
            {name}
          </button>
        )}
        <Earned won={kid.won || 0} fresh={fx.giftNew} />
      </div>
      <div className="count" role="img" aria-label={`${kid.stars} ${kid.stars === 1 ? 'star' : 'stars'}`}>
        <MiniStar />
        <span key={fx.seq} className={'num' + (fx.bump ? ' bump' : '')}>{kid.stars}</span>
      </div>
      <div className="actions">
        <button className="btn-undo" type="button" data-act="undo" onClick={onUndo} aria-label={`Take a star back from ${name}`} disabled={!canUndo(s, kid)}>
          <Icon id="i-minus" />
        </button>
        <button className="btn-star" type="button" data-act="star" onClick={onStar} aria-label={`Give ${name} a star`}>
          <svg viewBox="0 0 48 48" aria-hidden="true"><use href="#i-give" /></svg>
        </button>
      </div>
      <div className="rail" style={{ '--n': n }} aria-hidden="true">
        {Array.from({ length: n }, (_, j) => (
          <span className="slot" key={j}>
            <svg className="mark" viewBox="0 0 56 60"><use href="#slot-star" /></svg>
            {j < shown && (
              <svg
                className={'piece' + (fx.completed ? ' hop' : '') + (j === fx.newStar ? ' drop' : '')}
                style={{ '--d': `${j * 70}ms`, '--rot': `${rotFor(j)}deg` }}
                viewBox="0 0 56 60"
              >
                <use href="#piece-star" />
              </svg>
            )}
          </span>
        ))}
      </div>
      {claim}
    </article>
  );
}
