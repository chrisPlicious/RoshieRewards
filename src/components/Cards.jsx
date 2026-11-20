import { PAINTS, rotFor } from '../lib/constants';
import { MiniStar } from './Bits';

/** "Reward time!" card, taped to the board when a kid fills their strip. */
export function RewardPrompt({ show, kid, perSpin, claimRef, laterRef, onClaim, onLater }) {
  const frame = kid ? PAINTS[kid.color].c : undefined;
  return (
    <div className={'layer dim' + (show ? ' show' : '')} aria-hidden={!show}>
      <div className="card taped" role="dialog" aria-modal="true" aria-labelledby="promptTitle" aria-describedby="promptLead" style={{ '--frame': frame }}>
        <h2 id="promptTitle">Reward time!</h2>
        <div className="minis" aria-hidden="true">
          {Array.from({ length: perSpin }, (_, j) => <MiniStar key={j} style={{ '--rot': `${rotFor(j)}deg` }} />)}
        </div>
        <p className="lead" id="promptLead">
          <b>{kid?.name}</b> got {perSpin} {perSpin === 1 ? 'star' : 'stars'}. Good job!
        </p>
        <div className="card-actions">
          <button ref={claimRef} className="btn gold big" type="button" onClick={onClaim}>
            <svg aria-hidden="true" style={{ '--cut': '#FFC21A' }}><use href="#i-gift" /></svg>Claim reward
          </button>
          <button ref={laterRef} className="btn plain" type="button" onClick={onLater}>Later</button>
        </div>
      </div>
    </div>
  );
}

/** "Good job!" card hung on yarn, showing the prize the wheel landed on. */
export function WinSign({ show, kid, prize, more, free, againRef, backRef, onAgain, onBack }) {
  const frame = kid ? PAINTS[kid.color].c : undefined;
  const paint = PAINTS[prize?.color || 'yellow'];
  const title = kid && kid.name.length <= 14 ? `Good job, ${kid.name}!` : 'Good job!';
  return (
    <div className={'layer' + (show ? ' show' : '')} aria-hidden={!show}>
      <div className="card sign hung" role="dialog" aria-modal="true" aria-labelledby="signTitle" aria-describedby="signPrize" style={{ '--frame': frame }}>
        <span className="yarn a" aria-hidden="true" /><span className="yarn b" aria-hidden="true" />
        <span className="clip a" aria-hidden="true" /><span className="clip b" aria-hidden="true" />
        <h2 id="signTitle">{title}</h2>
        <div
          className={'medal' + (prize?.img ? ' photo' : '')}
          style={{ '--c': paint.c, '--t': paint.t, '--cut': paint.c, ...(prize?.img ? { backgroundImage: `url("${prize.img}")` } : {}) }}
        >
          <svg viewBox="0 0 48 48" aria-hidden="true"><use href={`#i-${prize?.icon || 'star'}`} /></svg>
        </div>
        <p className="prize" id="signPrize">{prize?.name || 'A prize!'}</p>
        <div className="card-actions">
          <button ref={againRef} className="btn gold" type="button" hidden={!(more > 0)} onClick={onAgain}>
            {free ? 'Spin again' : `Spin again (${more} left)`}
          </button>
          <button ref={backRef} className="btn" type="button" onClick={onBack}>Back to stars</button>
        </div>
      </div>
    </div>
  );
}
