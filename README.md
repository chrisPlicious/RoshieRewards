# Rewards

Star board and prize wheel for kids' English lessons. React + Vite, with Supabase for teacher accounts.

## Run it

```powershell
npm install
npm run dev
```

Open http://localhost:5173.

`npm run build` makes a static site in `dist/` that any static host can serve (Vercel, Netlify, GitHub Pages…).

## Supabase

`.env.local` (not committed) points the app at the **roshie rewards** project:

```
VITE_SUPABASE_URL=https://qyefsrxswaudvbynispa.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Copy `.env.example` to `.env.local` on a new machine. Without these values the app still runs, in no-account mode only.

The database schema is in `supabase/migrations/`:

| Table / bucket | Holds |
| --- | --- |
| `boards` | one row per teacher: star goal, free spins, sound, whose turn |
| `kids` | name, color, stars, spins used, rewards won, order |
| `prizes` | name, picture, color, photo path, order |
| `prize-photos` (storage, private) | uploaded prize photos, in a folder per teacher |

Row level security limits every row and photo to the teacher who owns it.

### Auth settings to check in the Supabase dashboard

- **Authentication → URL Configuration**: set *Site URL* to where the app is hosted (e.g. `http://localhost:5173` while developing) so the "confirm your email" link comes back to the app.
- **Authentication → Emails**: Supabase's built-in email sender only delivers to members of your Supabase team and is rate limited. To let other teachers sign up, add your own SMTP server there, or turn off *Confirm email* under **Authentication → Sign In / Providers → Email**.

## How saving works

- Signed in: every change is written to Supabase about half a second later. If the internet drops, the board keeps working, a red "Not saved yet" chip appears, and saving retries until it gets through.
- No account: the board is saved in this browser's `localStorage` (same format as the old single-file app). The first time that teacher signs in, the board moves into their account, photos included.

## Code map

- `src/Root.jsx`: auth state, picks the account board or the no-account board.
- `src/App.jsx`: the board: stars, reward prompt, wheel spin, win sign, keyboard.
- `src/components/`: lanes, wheel face, drawer (`Workshop.jsx`), cards, sign-in screen, SVG sprite, paper scene.
- `src/lib/board.js`: board state, rules (stars → spins), no-account storage.
- `src/lib/cloud.js`: Supabase load + background save + photo upload.
- `src/styles/app.css`: the craft-paper design (carried over unchanged from the original).
