'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { trackContactFormConversion } from './GoogleAdsTag';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [notice, setNotice] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.get('name'), email: data.get('email'), phone: data.get('phone'), message: data.get('message') }),
      });
      if (!response.ok) throw new Error('Contact request failed');
      form.reset();
      setStatus('success');
      setNotice('Recibimos tu solicitud. El equipo de Geimser te contactará pronto.');
      trackContactFormConversion();
    } catch {
      setStatus('error');
      setNotice('No pudimos enviar tu solicitud. Escríbenos directamente a contacto@geimser.cl.');
    }
  }

  const inputClass = 'w-full rounded-md border border-white/10 bg-[#07101f] px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400';
  return <form onSubmit={submit} className="space-y-3" noValidate>
    <input aria-label="Nombre" name="name" required maxLength={100} placeholder="Tu nombre" className={inputClass} />
    <input aria-label="Correo corporativo" name="email" type="email" required maxLength={254} placeholder="tu@email.com" className={inputClass} />
    <input aria-label="Teléfono" name="phone" type="tel" maxLength={32} placeholder="Teléfono (opcional)" className={inputClass} />
    <textarea aria-label="¿Cómo podemos ayudarte?" name="message" required maxLength={2000} rows={3} placeholder="¿Cómo podemos ayudarte?" className={`${inputClass} resize-y`} />
    <button type="submit" disabled={status === 'sending'} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#00B8F1] px-4 py-2 font-medium text-black transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">
      {status === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />} Enviar solicitud
    </button>
    {notice && <p className={`flex gap-2 text-xs ${status === 'success' ? 'text-emerald-300' : 'text-rose-300'}`} role="status">{status === 'success' && <CheckCircle2 className="h-4 w-4 shrink-0" />}{notice}</p>}
  </form>;
}
