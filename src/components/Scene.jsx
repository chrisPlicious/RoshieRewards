/** Cut-paper bulletin board behind everything: sun, clouds, rainbow, hills and the scalloped border. Decoration only. */
const Cloud = ({ className }) => (
  <svg className={className} viewBox="0 0 150 80">
    <g fill="#fff"><circle cx="42" cy="48" r="24" /><circle cx="76" cy="34" r="30" /><circle cx="110" cy="50" r="22" /><rect x="30" y="46" width="94" height="28" rx="14" /></g>
  </svg>
);
const Spark = ({ className }) => <svg className={className} viewBox="0 0 56 60"><use href="#piece-star" /></svg>;
const Squiggle = ({ className, color }) => (
  <svg className={className} viewBox="0 0 120 40">
    <path d="M4 26c10-18 20-18 26 0s16 18 26 0 20-18 26 0 16 14 34-6" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export default function Scene() {
  return (
    <>
      <div className="scene" aria-hidden="true">
        <svg className="rainbow" viewBox="0 0 320 170">
          <g fill="none" strokeWidth="15">
            <path d="M18 168a142 142 0 0 1 284 0" stroke="#DC3B26" /><path d="M33 168a127 127 0 0 1 254 0" stroke="#F7801E" />
            <path d="M48 168a112 112 0 0 1 224 0" stroke="#FFC21A" /><path d="M63 168a97 97 0 0 1 194 0" stroke="#23874A" />
            <path d="M78 168a82 82 0 0 1 164 0" stroke="#13A89E" /><path d="M93 168a67 67 0 0 1 134 0" stroke="#7A4CC2" />
          </g>
        </svg>
        <svg className="sun" viewBox="0 0 200 200">
          <g fill="#FFB21A">
            <path d="M100 0l12 34H88z" /><path d="M100 200l-12-34h24z" /><path d="M0 100l34-12v24z" /><path d="M200 100l-34 12V88z" />
            <path d="M29 29l33 15-18 18z" /><path d="M171 171l-33-15 18-18z" /><path d="M171 29l-15 33-18-18z" /><path d="M29 171l15-33 18 18z" />
          </g>
        </svg>
        <svg className="sun-face" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="58" fill="#FFD43B" /><circle cx="100" cy="100" r="58" fill="none" stroke="#fff" strokeWidth="5" />
          <circle cx="82" cy="94" r="5.5" fill="#231C45" /><circle cx="118" cy="94" r="5.5" fill="#231C45" />
          <path d="M80 112c11 12 29 12 40 0" fill="none" stroke="#231C45" strokeWidth="5" strokeLinecap="round" />
          <circle cx="70" cy="110" r="7" fill="#F7801E" opacity=".45" /><circle cx="130" cy="110" r="7" fill="#F7801E" opacity=".45" />
        </svg>
        <Cloud className="cloud c1" /><Cloud className="cloud c2" /><Cloud className="cloud c3" />
        <Spark className="spark s1" /><Spark className="spark s2" /><Spark className="spark s3" /><Spark className="spark s4" />
        <Squiggle className="squiggle q1" color="#fff" /><Squiggle className="squiggle q2" color="#FFE27A" />
        <svg className="hills" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0 110C220 30 470 40 720 105S1200 50 1440 90V200H0z" fill="#6BCB5E" />
          <path d="M0 150C300 90 620 175 930 128S1290 108 1440 138V200H0z" fill="#3FA34D" />
          <g fill="#fff"><circle cx="220" cy="160" r="5" /><circle cx="560" cy="170" r="4" /><circle cx="1040" cy="150" r="5" /><circle cx="1320" cy="168" r="4" /></g>
          <g fill="#FFC21A"><circle cx="220" cy="160" r="2" /><circle cx="1040" cy="150" r="2" /></g>
        </svg>
      </div>
      <div className="frame t" aria-hidden="true" /><div className="frame b" aria-hidden="true" />
      <div className="frame l" aria-hidden="true" /><div className="frame r" aria-hidden="true" />
    </>
  );
}
