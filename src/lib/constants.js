export const PAINTS = {
  red:    { name: 'Red',    c: '#DC3B26', lo: '#A8291A', t: '#FFFFFF' },
  orange: { name: 'Orange', c: '#F7801E', lo: '#C25A08', t: '#3A1A00' },
  yellow: { name: 'Yellow', c: '#FFC21A', lo: '#CF8A00', t: '#3A2200' },
  lime:   { name: 'Lime',   c: '#9BCB2E', lo: '#6E9614', t: '#1F2E00' },
  green:  { name: 'Green',  c: '#23874A', lo: '#17643A', t: '#FFFFFF' },
  teal:   { name: 'Teal',   c: '#13A89E', lo: '#0B7A72', t: '#032E2B' },
  sky:    { name: 'Sky',    c: '#47B5F0', lo: '#1E86C2', t: '#06304A' },
  blue:   { name: 'Blue',   c: '#2A5CD6', lo: '#1A3E9E', t: '#FFFFFF' },
  purple: { name: 'Purple', c: '#7A4CC2', lo: '#56328F', t: '#FFFFFF' },
  pink:   { name: 'Pink',   c: '#F0609E', lo: '#C23A76', t: '#3B0A22' },
};
export const PAINT_KEYS = Object.keys(PAINTS);

export const ICONS = {
  star: 'Star sticker', gamepad: 'Game', music: 'Music', crayon: 'Crayon', gift: 'Present', hand: 'High five',
  smile: 'Silly face', book: 'Book', crown: 'Crown', balloon: 'Balloon', candy: 'Candy', icecream: 'Ice cream',
  trophy: 'Trophy', rocket: 'Rocket', heart: 'Heart', tv: 'Video', dice: 'Dice', clock: 'Free time', mic: 'Microphone',
};
export const ICON_KEYS = Object.keys(ICONS);

export const STARTER = [
  { name: 'Sticker',         icon: 'star',    color: 'yellow' },
  { name: 'Game time',       icon: 'gamepad', color: 'red' },
  { name: 'Dance party',     icon: 'music',   color: 'purple' },
  { name: 'Draw a picture',  icon: 'crayon',  color: 'green' },
  { name: 'Mystery prize',   icon: 'gift',    color: 'orange' },
  { name: 'Sing a song',     icon: 'mic',     color: 'pink' },
  { name: 'Silly face',      icon: 'smile',   color: 'sky' },
  { name: 'Super high five', icon: 'hand',    color: 'blue' },
];

export const KID_PAINTS = ['red', 'green', 'purple', 'orange', 'blue', 'pink', 'teal', 'yellow'];
export const GIFT_COLORS = ['#DC3B26', '#7A4CC2', '#23874A', '#F7801E', '#2A5CD6', '#F0609E'];
export const MAX_PRIZES = 12;
export const MIN_PRIZES = 2;
export const MAX_KIDS = 8;
export const NAME_MAX = 24;

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const rotFor = j => (((j * 37 + 11) % 25) - 12);
export const uid = () => crypto.randomUUID();
export const isUuid = s => typeof s === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
