/** Every sticker, prize picture and UI glyph, drawn once and reused with <use href="#id">. */
const cut = { fill: 'var(--cut,#000)' };
const cutW = { fill: 'var(--cut,#fff)' };
const cutLine = { fill: 'none', stroke: 'var(--cut,#000)' };

export default function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <path id="starPath" d="M24 5L28.82 17.37L42.07 18.13L31.8 26.53L35.17 39.37L24 32.2L12.83 39.37L16.2 26.53L5.93 18.13L19.18 17.37Z" />
        <linearGradient id="goldfoil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFEB8A" /><stop offset=".4" stopColor="#FFC21A" /><stop offset=".62" stopColor="#F29B06" /><stop offset=".8" stopColor="#FFD54A" /><stop offset="1" stopColor="#F5A70C" />
        </linearGradient>
      </defs>

      {/* stickers */}
      <symbol id="piece-star" viewBox="0 0 56 60">
        <use href="#starPath" transform="translate(4 5)" fill="#fff" stroke="#fff" strokeWidth="10" strokeLinejoin="round" />
        <use href="#starPath" transform="translate(4 5)" fill="url(#goldfoil)" stroke="url(#goldfoil)" strokeWidth="3" strokeLinejoin="round" />
        <path d="M15.8 22.2l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9z" fill="#fff" />
        <g className="star-face">
          <circle cx="22.4" cy="31.6" r="1.9" fill="#F0609E" opacity=".55" />
          <circle cx="33.6" cy="31.6" r="1.9" fill="#F0609E" opacity=".55" />
          <g className="star-eyes" fill="#231C45">
            <ellipse cx="24.7" cy="27.2" rx="1.75" ry="2.25" />
            <ellipse cx="31.3" cy="27.2" rx="1.75" ry="2.25" />
          </g>
          <circle cx="25.2" cy="26.4" r=".6" fill="#fff" />
          <circle cx="31.8" cy="26.4" r=".6" fill="#fff" />
          <path d="M25 31.1q3 3.3 6 0" fill="none" stroke="#231C45" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </symbol>
      <symbol id="slot-star" viewBox="0 0 56 60">
        <use href="#starPath" transform="translate(4 5)" fill="none" style={{ stroke: 'var(--slot,#9AA8C8)' }} strokeWidth="3.2" strokeDasharray="6 4" strokeLinejoin="round" strokeLinecap="round" opacity=".75" />
        <use href="#starPath" transform="translate(4.8 5.8)" fill="none" style={{ stroke: 'var(--slot,#9AA8C8)' }} strokeWidth="1.4" strokeDasharray="10 5" strokeLinecap="round" opacity=".4" />
      </symbol>
      <symbol id="i-give" viewBox="0 0 48 48">
        <use href="#starPath" transform="translate(0 1)" fill="url(#goldfoil)" stroke="url(#goldfoil)" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M12.4 18.4l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" fill="#fff" />
        <g className="star-face">
          <circle cx="18.6" cy="27.6" r="1.6" fill="#F0609E" opacity=".55" />
          <circle cx="29.4" cy="27.6" r="1.6" fill="#F0609E" opacity=".55" />
          <g className="star-eyes" fill="#231C45">
            <ellipse cx="20.8" cy="23.4" rx="1.6" ry="2.05" />
            <ellipse cx="27.2" cy="23.4" rx="1.6" ry="2.05" />
          </g>
          <path d="M21.2 27.2q2.8 3 5.6 0" fill="none" stroke="#231C45" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <circle cx="37.5" cy="37" r="9" fill="#23874A" stroke="#fff" strokeWidth="2.6" />
        <path d="M37.5 32.5v9M33 37h9" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
      </symbol>
      <symbol id="i-gift" viewBox="0 0 48 48">
        <g fill="currentColor"><rect x="6" y="17" width="36" height="9" rx="2.5" /><rect x="9" y="25" width="30" height="17" rx="2.5" /><path d="M24 17c-3-6-9.5-9-12-5.5C10 14.5 15 17 24 17zm0 0c3-6 9.5-9 12-5.5C38 14.5 33 17 24 17z" /></g>
        <rect x="22" y="17" width="4" height="25" style={cutW} /><rect x="9" y="26" width="30" height="1.8" style={cutW} />
      </symbol>
      <symbol id="i-flapper" viewBox="0 0 60 120">
        <path d="M10 26h40L30 114z" fill="#A8291A" transform="translate(0 3)" />
        <path d="M10 26h40L30 114z" fill="#DC3B26" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
        <path d="M17 32l9 40" stroke="#fff" strokeOpacity=".45" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M4 8l52-3 2 22-53 3z" fill="rgba(246,236,205,.94)" />
        <path d="M4 8l52-3" stroke="rgba(0,0,0,.08)" strokeWidth="2" />
      </symbol>

      {/* prize pictures: currentColor = paint, --cut = slice colour */}
      <symbol id="i-star" viewBox="0 0 48 48"><use href="#starPath" transform="translate(0 1.5)" fill="currentColor" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" /><circle cx="20" cy="22.5" r="2" style={cut} /><circle cx="28" cy="22.5" r="2" style={cut} /><path d="M20 27.5c2.2 2.4 5.8 2.4 8 0" style={cutLine} strokeWidth="2.2" strokeLinecap="round" /></symbol>
      <symbol id="i-gamepad" viewBox="0 0 48 48"><path fill="currentColor" d="M14 13h20c6.6 0 11 5.5 11 13.5S42 39 38.5 39c-3 0-4.6-2.4-6.4-4.8-.9-1.2-2.2-1.7-3.6-1.7h-9c-1.4 0-2.7.5-3.6 1.7C14.1 36.6 12.5 39 9.5 39 6 39 3 34.5 3 26.5S7.4 13 14 13z" /><path style={cut} d="M12.5 20h3v4h4v3h-4v4h-3v-4h-4v-3h4z" /><circle style={cut} cx="33" cy="22.5" r="2.6" /><circle style={cut} cx="37.5" cy="27.5" r="2.6" /></symbol>
      <symbol id="i-music" viewBox="0 0 48 48"><g fill="currentColor"><circle cx="13" cy="35.5" r="6.5" /><circle cx="35" cy="31" r="6.5" /><rect x="16" y="11" width="3.6" height="24.5" /><rect x="38" y="6.5" width="3.6" height="24.5" /><path d="M16 11l25.6-5.5v7L16 18z" /></g></symbol>
      <symbol id="i-crayon" viewBox="0 0 48 48"><g transform="rotate(-45 24 24)"><rect x="5" y="18" width="28" height="12" rx="2.5" fill="currentColor" /><path d="M33 18.6L43.5 24 33 29.4z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><rect x="9.5" y="18" width="3" height="12" style={cut} /><rect x="27" y="18" width="2.2" height="12" style={cut} /></g></symbol>
      <symbol id="i-hand" viewBox="0 0 48 48"><g fill="currentColor"><rect x="13" y="21" width="23" height="21" rx="9" /><rect x="13" y="9" width="5.2" height="19" rx="2.6" /><rect x="19.3" y="5" width="5.2" height="22" rx="2.6" /><rect x="25.6" y="6.5" width="5.2" height="21" rx="2.6" /><rect x="31.9" y="10.5" width="4.8" height="17" rx="2.4" /><rect x="9" y="20" width="5.4" height="17" rx="2.7" transform="rotate(-35 11.7 36)" /></g></symbol>
      <symbol id="i-smile" viewBox="0 0 48 48"><circle fill="currentColor" cx="24" cy="24" r="19" /><circle style={cut} cx="17" cy="19.5" r="2.8" /><path d="M28 20.5c1.2-2.6 4.8-2.6 6 0" style={cutLine} strokeWidth="2.8" strokeLinecap="round" /><path style={cut} d="M13.5 26.5h21c0 6-4.7 10.5-10.5 10.5S13.5 32.5 13.5 26.5z" /><path fill="currentColor" d="M21 33.4c0-2 1.4-3.2 3-3.2s3 1.2 3 3.2v1.7a8.6 8.6 0 0 1-6 0z" /></symbol>
      <symbol id="i-book" viewBox="0 0 48 48"><g fill="currentColor"><path d="M23 13C18 9 10 8.5 4 10.5v26c6-2 14-1.5 19 2.5z" /><path d="M25 13c5-4 13-4.5 19-2.5v26c-6-2-14-1.5-19 2.5z" /></g><path d="M9 18c3.5-.8 7-.4 10 1M9 24c3.5-.8 7-.4 10 1M29 19c3-1.4 6.5-1.8 10-1M29 25c3-1.4 6.5-1.8 10-1" style={cutLine} strokeWidth="2" strokeLinecap="round" /></symbol>
      <symbol id="i-crown" viewBox="0 0 48 48"><path fill="currentColor" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" d="M6 15l9 9 9-13 9 13 9-9-4 23H10z" /><g fill="currentColor"><circle cx="6" cy="13.5" r="3" /><circle cx="24" cy="8.5" r="3" /><circle cx="42" cy="13.5" r="3" /></g><g style={cut}><circle cx="16" cy="31" r="2.4" /><circle cx="24" cy="31" r="2.4" /><circle cx="32" cy="31" r="2.4" /></g></symbol>
      <symbol id="i-balloon" viewBox="0 0 48 48"><ellipse fill="currentColor" cx="24" cy="18.5" rx="13" ry="15" /><path fill="currentColor" d="M24 32.5l-3.2 5h6.4z" /><path d="M24 37.5c-3 2.5 3 4.5 0 8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><ellipse style={cut} cx="18.5" cy="13" rx="2.6" ry="4.4" transform="rotate(20 18.5 13)" /></symbol>
      <symbol id="i-candy" viewBox="0 0 48 48"><g fill="currentColor" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"><circle cx="24" cy="24" r="9.5" /><path d="M15.5 24L5 16.5v15zM32.5 24L43 16.5v15z" /></g><path d="M18 19.5c4 1.8 8 7.6 12 9.4M17 25.5c2.8.9 5 2.8 7 4.8" style={cutLine} strokeWidth="2.6" strokeLinecap="round" /></symbol>
      <symbol id="i-icecream" viewBox="0 0 48 48"><path fill="currentColor" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" d="M14.5 25h19L24 45z" /><g fill="currentColor"><circle cx="24" cy="16" r="10" /><circle cx="15.5" cy="21" r="5" /><circle cx="32.5" cy="21" r="5" /><circle cx="24" cy="4.5" r="2.6" /></g><rect x="11" y="24.2" width="26" height="1.9" style={cut} /><path d="M18 29l9 6M30 29l-9 6" style={cutLine} strokeWidth="2" strokeLinecap="round" /></symbol>
      <symbol id="i-trophy" viewBox="0 0 48 48"><g fill="currentColor"><path d="M13 7h22v11a11 11 0 0 1-22 0z" /><rect x="21" y="28" width="6" height="7" /><rect x="14" y="35" width="20" height="7" rx="2" /></g><path d="M13 11H8.5a4.5 4.5 0 0 0 0 9H13M35 11h4.5a4.5 4.5 0 0 1 0 9H35" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" /><path style={cut} d="M24 10.5l1.9 3.9 4.2.6-3 3 .7 4.2-3.8-2-3.8 2 .7-4.2-3-3 4.2-.6z" /></symbol>
      <symbol id="i-rocket" viewBox="0 0 48 48"><g fill="currentColor"><path d="M24 3c7.5 6 10 15.5 8 29H16C14 18.5 16.5 9 24 3z" /><path d="M16.5 22L9 30v6l7-3zM31.5 22l7.5 8v6l-7-3z" /><path d="M19 35h10l-5 9z" /></g><circle style={cut} cx="24" cy="17" r="4.2" /><rect x="15" y="32" width="18" height="2" style={cut} /></symbol>
      <symbol id="i-heart" viewBox="0 0 48 48"><path fill="currentColor" d="M24 42C10.5 32.5 5 24.5 5 17.5 5 12 9.3 8 14.3 8c4 0 7.3 2.4 9.7 6 2.4-3.6 5.7-6 9.7-6C38.7 8 43 12 43 17.5 43 24.5 37.5 32.5 24 42z" /><ellipse style={cut} cx="14.5" cy="16" rx="3.2" ry="2" transform="rotate(-35 14.5 16)" /></symbol>
      <symbol id="i-tv" viewBox="0 0 48 48"><rect fill="currentColor" x="4" y="13" width="40" height="27" rx="6" /><path d="M17 5l7 7.5L31 5M13 40l-2 4M35 40l2 4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><rect style={cut} x="9" y="18" width="30" height="17" rx="3" /><path fill="currentColor" d="M21 21.5v9l8-4.5z" /></symbol>
      <symbol id="i-dice" viewBox="0 0 48 48"><rect fill="currentColor" x="7" y="7" width="34" height="34" rx="8" /><g style={cut}><circle cx="16" cy="16" r="3.2" /><circle cx="32" cy="16" r="3.2" /><circle cx="24" cy="24" r="3.2" /><circle cx="16" cy="32" r="3.2" /><circle cx="32" cy="32" r="3.2" /></g></symbol>
      <symbol id="i-clock" viewBox="0 0 48 48"><path fill="currentColor" d="M7.5 12.5a6.5 6.5 0 0 1 9.5-4zM40.5 12.5a6.5 6.5 0 0 0-9.5-4z" /><circle fill="currentColor" cx="24" cy="26" r="18" /><circle style={cut} cx="24" cy="26" r="13.5" /><path d="M24 18v8l5.5 4" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="i-mic" viewBox="0 0 48 48"><rect fill="currentColor" x="17" y="4" width="14" height="22" rx="7" /><path d="M11 20a13 13 0 0 0 26 0" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" /><rect fill="currentColor" x="22.3" y="32" width="3.4" height="7" /><rect fill="currentColor" x="15" y="39" width="18" height="4" rx="2" /><path d="M20 11h8M20 16h8" style={cutLine} strokeWidth="2" strokeLinecap="round" /></symbol>

      {/* interface glyphs */}
      <symbol id="i-minus" viewBox="0 0 48 48"><path d="M13 24h22" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" /></symbol>
      <symbol id="i-plus" viewBox="0 0 48 48"><path d="M24 12v24M12 24h24" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" /></symbol>
      <symbol id="i-close" viewBox="0 0 48 48"><path d="M14 14l20 20M34 14L14 34" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></symbol>
      <symbol id="i-trash" viewBox="0 0 48 48"><path fill="currentColor" d="M18.5 5h11l1.6 3.5H38a2.2 2.2 0 0 1 0 4.4H10a2.2 2.2 0 0 1 0-4.4h6.9z" /><path fill="currentColor" d="M12 15h24l-2 23.6a4 4 0 0 1-4 3.7H18a4 4 0 0 1-4-3.7z" /></symbol>
      <symbol id="i-sound" viewBox="0 0 48 48"><path fill="currentColor" d="M6 18h7l10-8v28l-10-8H6a2 2 0 0 1-2-2V20a2 2 0 0 1 2-2z" /><path d="M30 17.5a9 9 0 0 1 0 13M35.5 12a16.5 16.5 0 0 1 0 24" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" /></symbol>
      <symbol id="i-mute" viewBox="0 0 48 48"><path fill="currentColor" d="M6 18h7l10-8v28l-10-8H6a2 2 0 0 1-2-2V20a2 2 0 0 1 2-2z" /><path d="M31 19l10 10M41 19L31 29" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" /></symbol>
      <symbol id="i-brush" viewBox="0 0 48 48"><path fill="currentColor" d="M38.3 5.4a3.2 3.2 0 0 1 4.5 4.5L25.2 27.6l-4.6-4.6z" /><path fill="currentColor" d="M18.3 25.4l4.5 4.5c-1 6.4-6.4 11-16.3 11 2.3-2.6 2.6-4.8 3.1-7.3.9-4.3 4.6-7.8 8.7-8.2z" /></symbol>
      <symbol id="i-photo" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M10 10h28a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V15a5 5 0 0 1 5-5zm0 4.5a1 1 0 0 0-1 1v14.2l8.6-8.2a2.4 2.4 0 0 1 3.3 0l6.4 6.1 3.6-3.4a2.4 2.4 0 0 1 3.3 0L39 29V15.5a1 1 0 0 0-1-1z" /><circle fill="currentColor" cx="31.5" cy="20" r="3.3" /></symbol>
      <symbol id="i-full" viewBox="0 0 48 48"><path d="M8 18V8h10M30 8h10v10M40 30v10H30M18 40H8V30" fill="none" stroke="currentColor" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="i-unfull" viewBox="0 0 48 48"><path d="M18 8v10H8M40 18H30V8M30 40V30h10M8 30h10v10" fill="none" stroke="currentColor" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="i-cloud" viewBox="0 0 48 48"><path fill="currentColor" d="M14 38a10 10 0 0 1-1.6-19.9A13 13 0 0 1 37.5 17 10.5 10.5 0 0 1 36 38z" /><path d="M19 27l10 6M29 27l-10 6" fill="none" stroke="var(--cut,#fff)" strokeWidth="3.4" strokeLinecap="round" /></symbol>
    </svg>
  );
}
