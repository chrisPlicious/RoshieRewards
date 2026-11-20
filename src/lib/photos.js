import { NAME_MAX } from './constants';

/** Crop a picture to a 256px square and return it as a small data: URL (WebP, JPEG fallback). */
export async function photoFromFile(file) {
  if (!file || !/^image\//.test(file.type)) throw new Error('not-image');
  let src, w, h, cleanup = () => {};
  try {
    src = await createImageBitmap(file); w = src.width; h = src.height; cleanup = () => src.close && src.close();
  } catch {
    const url = URL.createObjectURL(file);
    src = await new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = url; });
    w = src.naturalWidth; h = src.naturalHeight; cleanup = () => URL.revokeObjectURL(url);
  }
  const side = Math.min(w, h), S = 256;
  const cv = document.createElement('canvas'); cv.width = cv.height = S;
  const cx = cv.getContext('2d'); cx.imageSmoothingQuality = 'high';
  cx.drawImage(src, (w - side) / 2, (h - side) / 2, side, side, 0, 0, S, S);
  cleanup();
  let out = cv.toDataURL('image/webp', 0.82);
  if (!out.startsWith('data:image/webp')) {
    const flat = document.createElement('canvas'); flat.width = flat.height = S;
    const fx = flat.getContext('2d'); fx.fillStyle = '#fff'; fx.fillRect(0, 0, S, S); fx.drawImage(cv, 0, 0);
    out = flat.toDataURL('image/jpeg', 0.85);
  }
  return out;
}

export function nameFromFile(file) {
  const base = (file.name || '').replace(/\.[a-z0-9]+$/i, '').replace(/[_\-.]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!base || /^(img|image|photo|dsc|pxl|screenshot)\s?\d/i.test(base)) return 'Prize';
  return (base.charAt(0).toUpperCase() + base.slice(1)).slice(0, NAME_MAX);
}
