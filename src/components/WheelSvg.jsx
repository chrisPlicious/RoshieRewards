import { PAINTS, PAINT_KEYS, clamp } from '../lib/constants';

/** The paper-plate wheel face: fluted rim, painted slices, pictures or photos, names along the arc. */
const CX = 250;
const pt = (deg, r) => {
  const a = deg * Math.PI / 180;
  return [(CX + r * Math.sin(a)).toFixed(2), (CX - r * Math.cos(a)).toFixed(2)];
};
const wedge = (s, e, r) => {
  const [x1, y1] = pt(s, r), [x2, y2] = pt(e, r);
  return `M${CX} ${CX}L${x1} ${y1}A${r} ${r} 0 ${e - s > 180 ? 1 : 0} 1 ${x2} ${y2}Z`;
};

export default function WheelSvg({ prizes, win }) {
  const n = prizes.length, a = 360 / n;
  const iconSize = Math.min(70, 2 * Math.PI * 140 / n * 0.78);
  const defs = [], slices = [], art = [], dots = [];

  prizes.forEach((p, i) => {
    const s = i * a, e = s + a, mid = s + a / 2, paint = PAINTS[p.color];
    slices.push(<path key={p.id} className={'slice' + (win === i ? ' win' : '')} data-i={i} d={wedge(s, e, 218)} fill={paint.c} />);
    const turn = `rotate(${mid.toFixed(3)} ${CX} ${CX})`;
    if (p.img) {
      const PR = Math.min(48, Math.PI * 128 / n * 0.92), py = CX - 128;
      defs.push(<clipPath key={`pc${i}`} id={`pc${i}`}><circle cx={CX} cy={py} r={PR.toFixed(1)} /></clipPath>);
      art.push(
        <g key={`a${p.id}`} transform={turn}>
          <circle cx={CX} cy={py + 2.5} r={(PR + 6).toFixed(1)} fill="rgba(12,24,70,.25)" />
          <circle cx={CX} cy={py} r={(PR + 6).toFixed(1)} fill="#fff" />
          <image href={p.img} x={(CX - PR).toFixed(1)} y={(py - PR).toFixed(1)} width={(PR * 2).toFixed(1)} height={(PR * 2).toFixed(1)} preserveAspectRatio="xMidYMid slice" clipPath={`url(#pc${i})`} />
        </g>,
      );
    } else {
      art.push(
        <g key={`a${p.id}`} transform={turn}>
          <use href={`#i-${p.icon}`} x={(CX - iconSize / 2).toFixed(1)} y={(108 - iconSize / 2).toFixed(1)} width={iconSize.toFixed(1)} height={iconSize.toFixed(1)} style={{ color: paint.t, '--cut': paint.c }} />
        </g>,
      );
    }
    const pad = Math.min(a * 0.07, 5), R = 186;
    const [ax, ay] = pt(s + pad, R), [bx, by] = pt(e - pad, R);
    defs.push(<path key={`lp${i}`} id={`lp${i}`} d={`M${ax} ${ay}A${R} ${R} 0 0 1 ${bx} ${by}`} />);
    const arcLen = 2 * Math.PI * R * (a - 2 * pad) / 360;
    const label = p.name.trim() || ' ';
    const fs = clamp(arcLen / (label.length * 0.56), 12, 22).toFixed(1);
    art.push(
      <text key={`t${p.id}`} className="slice-label" fontSize={fs} fill={paint.t}>
        <textPath href={`#lp${i}`} startOffset="50%" textAnchor="middle">{label}</textPath>
      </text>,
    );
    const [dx, dy] = pt(s, 231);
    dots.push(<circle key={`d${i}`} cx={dx} cy={dy} r="5" fill={PAINTS[PAINT_KEYS[i % PAINT_KEYS.length]].c} stroke="#fff" strokeWidth="2" />);
  });

  return (
    <svg viewBox="0 0 500 500" aria-hidden="true">
      <defs>
        <filter id="pfib" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="5" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.5 0 0 0 -0.24" />
        </filter>
        <clipPath id="sliceclip"><circle cx="250" cy="250" r="218" /></clipPath>
        {defs}
      </defs>
      <circle cx="250" cy="250" r="249" fill="#fff" />
      <circle cx="250" cy="250" r="236" fill="none" stroke="#E4E8F0" strokeWidth="22" strokeDasharray="3.4 4" />
      <circle cx="250" cy="250" r="224.5" fill="none" stroke="#D9DFEA" strokeWidth="2" />
      <circle cx="250" cy="250" r="248" fill="none" stroke="#D9DFEA" strokeWidth="2" />
      <g stroke="#fff" strokeWidth="4" strokeLinejoin="round">{slices}</g>
      <rect width="500" height="500" filter="url(#pfib)" clipPath="url(#sliceclip)" opacity=".7" />
      {art}
      {dots}
      <circle cx="250" cy="250" r="66" fill="#fff" />
    </svg>
  );
}
