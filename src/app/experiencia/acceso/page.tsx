'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Eye, EyeOff, LoaderCircle, ShieldCheck } from 'lucide-react';
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
    <main className={`${styles.access} experience-access`}>
      <video className={styles.backgroundVideo} autoPlay muted loop playsInline poster="/assets/images/team-hero.jpg" aria-hidden="true">
        <source src="/G1.mp4" type="video/mp4" />
      </video>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <Link href="/" className={styles.brand} aria-label="Volver a Geimser">
        <span className={styles.logoCrop}><Image src="/G2.png" alt="Geimser" width={500} height={500} priority /></span>
      </Link>

      <div className={styles.context}>
        <span>GEIMSER · PRODUCT UNIVERSE</span>
        <strong>Cuatro plataformas.<br />Una experiencia conectada.</strong>
      </div>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.eyebrow}><ShieldCheck size={12} /> Acceso privado</span>
          <small>Sesión comercial</small>
        </div>
        <h1>Experience Hub</h1>
        <p>Ingresa con tu credencial para explorar los productos Geimser.</p>

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

        <footer><i /> Sesión protegida · 12 horas</footer>
      </section>
    </main>
  );
}
