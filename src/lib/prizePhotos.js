import { board, update, setNote, freshPrizeLook } from './board';
import { photoFromFile, nameFromFile } from './photos';
import { announce } from './announce';
import { MAX_PRIZES, uid } from './constants';

/** Put a photo on one prize. Resolves true when it worked. Cloud mode uploads it in the background. */
export async function setPrizePhoto(id, file) {
  if (!board.get()?.prizes.some(p => p.id === id)) return false;
  try {
    setNote('Adding photo…');
    const img = await photoFromFile(file);
    update(d => {
      const p = d.prizes.find(x => x.id === id);
      if (!p) return;
      p.img = img; p.imagePath = null;
      if (p.name === 'New prize' || p.name === 'Prize') p.name = nameFromFile(file);
    });
    setNote('');
    const p = board.get().prizes.find(x => x.id === id);
    if (p) announce(`Photo added to ${p.name}.`);
    return true;
  } catch (err) {
    setNote(err.message === 'not-image' ? 'That file is not a picture. Try a JPG, PNG or WebP image.' : 'Sorry, that picture could not be opened. Try another one.', true);
    return false;
  }
}

/** Add one new prize per photo, until the wheel is full. Resolves the id of the last prize added, or null. */
export async function addPhotoPrizes(files) {
  const list = [...files].filter(f => /^image\//.test(f.type));
  if (!list.length) { setNote('Those files are not pictures. Try JPG, PNG or WebP images.', true); return null; }
  const room = MAX_PRIZES - board.get().prizes.length;
  if (room <= 0) { setNote(`The wheel is full (${MAX_PRIZES} prizes). Remove one first.`, true); return null; }
  setNote('Adding photos…');
  let added = 0, failed = 0, lastId = null;
  for (const f of list.slice(0, room)) {
    try {
      const img = await photoFromFile(f);
      const { color } = freshPrizeLook(board.get().prizes);
      const id = uid();
      update(d => { d.prizes.push({ id, name: nameFromFile(f), icon: 'star', color, img, imagePath: null }); });
      added++; lastId = id;
    } catch {
      failed++;
    }
  }
  const skipped = list.length - Math.min(list.length, room);
  let msg = added ? `Added ${added} photo ${added === 1 ? 'prize' : 'prizes'}. Tap a name to change it.` : 'No photos were added.';
  if (skipped) msg += ` ${skipped} didn't fit: the wheel holds ${MAX_PRIZES}.`;
  if (failed) msg += ` ${failed} could not be opened.`;
  setNote(msg, !added || skipped > 0 || failed > 0);
  return lastId;
}
