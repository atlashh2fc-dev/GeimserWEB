'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, ShieldCheck } from 'lucide-react';
import styles from './access.module.css';

export default function ExperienceAccessPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/experience/auth', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? 'No fue posible validar el acceso.');
      window.location.replace('/experiencia');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No fue posible validar el acceso.');
      setLoading(false);
    }
  };

  return (
    <main className={styles.access}>
      <div className={styles.aurora} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <header className={styles.brand}>
        <span>G</span>
        <div><strong>GEIMSER</strong><small>PRODUCT UNIVERSE</small></div>
      </header>

      <section className={styles.panel}>
        <div className={styles.lock}><LockKeyhole size={25} /></div>
        <span className={styles.eyebrow}><ShieldCheck size={13} /> Acceso comercial protegido</span>
        <h1>Ingresa al universo<br /><em>de productos Geimser.</em></h1>
        <p>Este entorno conecta con demostraciones reales. Identifícate para iniciar una sesión privada.</p>

        <form onSubmit={submit}>
          <label>
            <span>Usuario</span>
            <input
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Usuario comercial"
              required
            />
          </label>
          <label>
            <span>Contraseña</span>
            <div className={styles.passwordField}>
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••••"
                required
              />
              <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </label>

          {error && <div className={styles.error} role="alert">{error}</div>}

          <button className={styles.submit} disabled={loading}>
            {loading ? <><LoaderCircle className={styles.spinner} size={18} /> Validando acceso</> : <>Entrar a la experiencia <ArrowRight size={17} /></>}
          </button>
        </form>

        <footer><i /> Sesión cifrada · Expiración automática · Uso interno</footer>
      </section>
    </main>
  );
}
