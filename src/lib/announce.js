/** Screen-reader announcements through one polite live region. */
let el = null;
export const attachLive = node => { el = node; };
export function announce(text) {
  if (!el) return;
  el.textContent = '';
  setTimeout(() => { if (el) el.textContent = text; }, 30);
}
