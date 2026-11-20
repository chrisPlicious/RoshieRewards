/** Small shared pieces. */
export const Icon = ({ id, ...props }) => (
  <svg aria-hidden="true" {...props}><use href={`#${id}`} /></svg>
);

export const MiniStar = props => (
  <svg viewBox="0 0 56 60" aria-hidden="true" {...props}><use href="#piece-star" /></svg>
);

export const Gift = ({ cut = '#FFC21A' }) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" style={{ '--cut': cut }}><use href="#i-gift" /></svg>
);

const LETTERS = [
  ['R', '#DC3B26', '-6deg'], ['e', '#F7801E', '4deg', '-2px'], ['w', '#FFC21A', '-3deg'], ['a', '#23874A', '5deg', '-3px'],
  ['r', '#13A89E', '-4deg'], ['d', '#7A4CC2', '6deg', '-1px'], ['s', '#F0609E', '-5deg'],
];
export function Title({ as: Tag = 'h1', className = '' }) {
  return (
    <Tag className={`title ${className}`} aria-label="Rewards">
      {LETTERS.map(([ch, c, r, y], i) => (
        <span key={i} aria-hidden="true" style={{ '--c': c, '--r': r, ...(y ? { '--y': y } : {}) }}>{ch}</span>
      ))}
    </Tag>
  );
}
