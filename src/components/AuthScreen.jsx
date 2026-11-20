import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Title } from './Bits';

function friendly(err) {
  const m = String(err?.message || err || '');
  if (/invalid login credentials/i.test(m)) return 'That email and password don’t match. Try again, or make an account.';
  if (/email not confirmed/i.test(m)) return 'Please open the link we emailed you first, then sign in here.';
  if (/password should be at least|weak password/i.test(m)) return 'Use a longer password: at least 6 letters or numbers.';
  if (/rate limit|too many/i.test(m)) return 'Too many tries. Wait a minute, then try again.';
  if (/fetch|network|failed to/i.test(m)) return 'Can’t reach the internet. Check the connection and try again.';
  return m || 'Something went wrong. Please try again.';
}

/** Teacher sign in / sign up, on the same paper board. Guests can skip it and keep everything on this computer. */
export default function AuthScreen({ onGuest }) {
  const [mode, setMode] = useState('in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const signingUp = mode === 'up';

  const submit = async e => {
    e.preventDefault();
    if (busy) return;
    setBusy(true); setMsg(null);
    try {
      const addr = email.trim();
      if (signingUp) {
        const { data, error } = await supabase.auth.signUp({ email: addr, password, options: { emailRedirectTo: location.origin } });
        if (error) throw error;
        if (!data.session) {
          setMsg({ text: `Almost done! We sent a link to ${addr}. Open it, then come back here and sign in.` });
          setMode('in'); setPassword('');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: addr, password });
        if (error) throw error;
      }
    } catch (err) {
      setMsg({ text: friendly(err), warn: true });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth">
      <Title />
      <form className="card taped auth-card" onSubmit={submit} aria-labelledby="authTitle">
        <h2 id="authTitle">{signingUp ? 'Make an account' : 'Hello, teacher!'}</h2>
        <p className="lead">
          {signingUp ? 'One account keeps your board on every computer you teach from.' : 'Sign in to keep your kids, stars and prizes safe on every computer.'}
        </p>
        {msg && <p className={'ws-note' + (msg.warn ? ' warn' : '')} role="alert">{msg.text}</p>}
        <label className="auth-field">
          Email
          <input className="field" type="email" name="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="auth-field">
          Password
          <input
            className="field" type="password" name="password" required minLength={6}
            autoComplete={signingUp ? 'new-password' : 'current-password'}
            value={password} onChange={e => setPassword(e.target.value)}
          />
          {signingUp && <small>At least 6 letters or numbers.</small>}
        </label>
        <button className="btn big" type="submit" disabled={busy}>
          {busy ? 'One moment…' : signingUp ? 'Make my account' : 'Sign in'}
        </button>
        <button className="auth-switch" type="button" onClick={() => { setMode(signingUp ? 'in' : 'up'); setMsg(null); }}>
          {signingUp ? 'Already have an account? Sign in' : 'New here? Make an account'}
        </button>
        <div className="auth-or" aria-hidden="true"><span>or</span></div>
        <button className="btn plain" type="button" onClick={onGuest}>Use without an account</button>
        <p className="auth-small">Saves on this computer only.</p>
      </form>
    </div>
  );
}
