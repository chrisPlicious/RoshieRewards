import { useEffect, useRef, useState } from 'react';
import { supabase, cloudReady } from './lib/supabase';
import { board, defaults, loadGuest, startGuestSave, setNote } from './lib/board';
import { loadCloud, startCloudSync } from './lib/cloud';
import { useStore } from './lib/store';
import App from './App';
import AuthScreen from './components/AuthScreen';
import Sprite from './components/Sprite';
import Scene from './components/Scene';
import { MiniStar, Title } from './components/Bits';

const MODE_KEY = 'roshie-rewards-mode';
const readGuest = () => { try { return localStorage.getItem(MODE_KEY) === 'guest'; } catch { return false; } };
const writeGuest = on => { try { if (on) localStorage.setItem(MODE_KEY, 'guest'); else localStorage.removeItem(MODE_KEY); } catch { /* private mode */ } };

function Boot({ text = 'Getting your board…' }) {
  return (
    <div className="auth" aria-busy="true">
      <Title />
      <p className="boot-note"><MiniStar className="boot-star" />{text}</p>
    </div>
  );
}

/** Loads the board for this mode (guest: localStorage, cloud: Supabase), keeps it saved, then shows the app. */
function BoardLoader({ mode, user, onSignIn }) {
  const s = useStore(board);
  const [phase, setPhase] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  const syncRef = useRef(null);

  useEffect(() => {
    let cancelled = false, stop = null;
    setPhase('loading');
    (async () => {
      try {
        if (mode === 'guest') {
          board.set(loadGuest() || defaults());
          stop = startGuestSave();
        } else {
          const { state, base } = await loadCloud(user);
          if (cancelled) return;
          board.set(state);
          const sync = startCloudSync(user, base);
          syncRef.current = sync;
          stop = () => sync.stop();
        }
        if (!cancelled) setPhase('ready');
      } catch (err) {
        console.error('[rewards] could not load the board', err);
        if (!cancelled) setPhase('error');
      }
    })();
    return () => { cancelled = true; stop?.(); syncRef.current = null; board.set(null); setNote(''); };
  }, [mode, user?.id, attempt]); // eslint-disable-line react-hooks/exhaustive-deps

  const signOut = async () => {
    await syncRef.current?.flush();
    await supabase.auth.signOut({ scope: 'local' });
  };

  if (phase === 'error') {
    return (
      <div className="auth">
        <Title />
        <div className="card taped auth-card">
          <h2>Can’t open your board</h2>
          <p className="lead">Check the internet connection, then try again.</p>
          <div className="card-actions">
            <button className="btn big" type="button" onClick={() => setAttempt(a => a + 1)}>Try again</button>
            <button className="btn plain" type="button" onClick={signOut}>Sign out</button>
          </div>
        </div>
      </div>
    );
  }
  if (phase !== 'ready' || !s) return <Boot />;
  return <App mode={mode} user={user} onSignIn={onSignIn} onSignOut={signOut} />;
}

export default function Root() {
  const [session, setSession] = useState(cloudReady ? undefined : null);
  const [guest, setGuest] = useState(() => !cloudReady || readGuest());

  useEffect(() => {
    if (!cloudReady) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  const user = session?.user ?? null;
  const mode = user ? 'cloud' : guest ? 'guest' : null;

  let screen;
  if (session === undefined) screen = <Boot text="Opening Rewards…" />;
  else if (mode) {
    screen = (
      <BoardLoader
        key={user?.id || 'guest'}
        mode={mode}
        user={user}
        onSignIn={() => { writeGuest(false); setGuest(false); }}
      />
    );
  } else screen = <AuthScreen onGuest={() => { writeGuest(true); setGuest(true); }} />;

  return (
    <>
      <Sprite />
      <Scene />
      {screen}
    </>
  );
}
