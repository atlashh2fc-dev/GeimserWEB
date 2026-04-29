'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   Tipos de entrada para cada cliente
   - logoUrl: imagen real desde web oficial
   - svgFallback: logo SVG inline si la imagen falla o no existe
───────────────────────────────────────────── */
type Client = {
  id: string;
  name: string;
  sector: string;
  accentColor: string;
  logoUrl?: string;
  svgFallback?: React.ReactNode;
};

const clients: Client[] = [
  {
    id: 'natura',
    name: 'Natura',
    sector: 'Retail & Cosmetics',
    accentColor: '#FF6900',
    // SVG fiel al logo oficial de natura.cl (hoja + texto en Georgia serif)
    svgFallback: (
      <svg viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Natura" className="w-full h-full">
        {/* Hoja derecha — color naranja oscuro */}
        <ellipse cx="27" cy="30" rx="12" ry="18" fill="#E85D00" opacity="0.90" transform="rotate(-20 27 30)" />
        {/* Hoja izquierda — naranja más claro */}
        <ellipse cx="35" cy="30" rx="12" ry="18" fill="#FF6900" opacity="0.45" transform="rotate(20 35 30)" />
        {/* Nervio central */}
        <line x1="31" y1="48" x2="31" y2="12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
        {/* Texto "natura" — serif, tamaño prominente */}
        <text
          x="54"
          y="39"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="28"
          fontWeight="700"
          fill="currentColor"
          letterSpacing="-0.5"
        >natura</text>
      </svg>
    ),
  },
  {
    id: 'linksolutions',
    name: 'Link Solutions',
    sector: 'IT Services',
    accentColor: '#0066CC',
    logoUrl: 'https://www.linksolution.cl/wp-content/uploads/2025/01/logo.jpg.webp',
    svgFallback: (
      <svg viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Link Solutions" className="w-full h-full">
        <rect x="6" y="19" width="20" height="11" rx="5.5" stroke="#0066CC" strokeWidth="2.5" fill="none"/>
        <rect x="20" y="19" width="20" height="11" rx="5.5" stroke="#0066CC" strokeWidth="2.5" fill="none"/>
        <text x="47" y="24" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="12" fontWeight="700" fill="#0066CC" letterSpacing="0.6">LINK</text>
        <text x="47" y="39" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="12" fontWeight="400" fill="currentColor" letterSpacing="1.1">SOLUTIONS</text>
      </svg>
    ),
  },
  {
    id: 'wabtec',
    name: 'Wabtec',
    sector: 'Industrial Technology',
    accentColor: '#E31837',
    logoUrl: 'https://www.wabteccorp.com/themes/custom/wabtec/images/Wabtec-logo-White.svg',
    svgFallback: (
      <svg viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Wabtec" className="w-full h-full">
        <polyline points="6,15 14,38 22,20 30,38 38,15" stroke="#E31837" strokeWidth="3.2" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
        <text x="46" y="35" fontFamily="'Arial Black', Arial, sans-serif" fontSize="21" fontWeight="900" fill="currentColor" letterSpacing="-0.4">WABTEC</text>
      </svg>
    ),
  },
  {
    id: 'prever',
    name: 'Prever',
    sector: 'Insurance & Prevention',
    accentColor: '#004B8D',
    logoUrl: 'https://www.prever.cl/Content/images/logo_prever.png',
    svgFallback: (
      <svg viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Prever" className="w-full h-full">
        <path d="M22 10 L35 15 L35 29 C35 37 22 44 22 44 C22 44 9 37 9 29 L9 15 Z" fill="#004B8D" opacity="0.9"/>
        <path d="M16 28 L20 32 L28 22" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <text x="43" y="35" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="22" fontWeight="700" fill="currentColor" letterSpacing="-0.3">Prever</text>
      </svg>
    ),
  },
  {
    id: 'ggelectrics',
    name: 'GG Electrics',
    sector: 'Electrical Engineering',
    accentColor: '#F5A623',
    logoUrl: 'https://www.ggelectrics.cl/web/image/website/1/logo/GG%20Electrics?unique=6a947e4',
    svgFallback: (
      <svg viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="GG Electrics" className="w-full h-full">
        <polygon points="24,8 13,30 22,30 15,48 33,22 23,22" fill="#F5A623"/>
        <text x="41" y="25" fontFamily="'Arial Black', Arial, sans-serif" fontSize="16" fontWeight="900" fill="currentColor" letterSpacing="0.5">GG</text>
        <text x="41" y="41" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="12" fontWeight="400" fill="currentColor" letterSpacing="0.9">ELECTRICS</text>
      </svg>
    ),
  },
  {
    id: 'infobusiness',
    name: 'Infobusiness',
    sector: 'Business Intelligence',
    accentColor: '#1B3A6B',
    // La web usa texto puro — representamos la marca con SVG fiel
    svgFallback: (
      <svg viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Infobusiness" className="w-full h-full">
        {/* Ícono átomo + datos (marca visual de Infobusiness) */}
        <circle cx="22" cy="28" r="6" stroke="#1B3A6B" strokeWidth="2" fill="none"/>
        <ellipse cx="22" cy="28" rx="14" ry="6" stroke="#1B3A6B" strokeWidth="1.5" fill="none" transform="rotate(60 22 28)"/>
        <ellipse cx="22" cy="28" rx="14" ry="6" stroke="#1B3A6B" strokeWidth="1.5" fill="none" transform="rotate(-60 22 28)"/>
        <circle cx="22" cy="28" r="2.5" fill="#1B3A6B"/>
        {/* Texto marca */}
        <text x="42" y="26" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="13" fontWeight="700" fill="#1B3A6B" letterSpacing="0.3">Info</text>
        <text x="42" y="42" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="13" fontWeight="400" fill="currentColor" letterSpacing="0.2">business</text>
      </svg>
    ),
  },
  {
    id: 'recaall',
    name: 'Recaall',
    sector: 'Contact Center',
    accentColor: '#C0392B',
    logoUrl: 'https://www.recaall.cl/wp-content/themes/sapublicidad/img/logo.jpg',
    svgFallback: (
      <svg viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Recaall Contact Center" className="w-full h-full">
        {/* 3 puntos corporativos: rojo, gris, naranja */}
        <circle cx="10" cy="20" r="5" fill="#C0392B"/>
        <circle cx="22" cy="20" r="5" fill="#7F8C8D"/>
        <circle cx="34" cy="20" r="5" fill="#E67E22"/>
        <text x="8" y="40" fontFamily="'Arial Black', Arial, sans-serif" fontSize="14" fontWeight="900" fill="currentColor" letterSpacing="1">RECAALL</text>
        <text x="8" y="52" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="8" fontWeight="400" fill="currentColor" letterSpacing="1.5">CONTACT CENTER</text>
      </svg>
    ),
  },
  {
    id: 'equifax',
    name: 'Equifax',
    sector: 'Data & Analytics',
    accentColor: '#E3002B',
    logoUrl: 'https://assets.equifax.com/global/images/logos/equifax_150_28.svg',
    svgFallback: (
      <svg viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Equifax" className="w-full h-full">
        <polygon points="22,8 33,14 33,30 22,36 11,30 11,14" fill="#E3002B"/>
        <text x="14" y="27" fontFamily="'Arial Black', Arial, sans-serif" fontSize="15" fontWeight="900" fill="#fff">E</text>
        <text x="41" y="35" fontFamily="'Arial Black', Arial, sans-serif" fontSize="21" fontWeight="900" fill="currentColor" letterSpacing="-0.5">EQUIFAX</text>
      </svg>
    ),
  },
];

/* Triplicamos para el loop infinito sin gaps */
const allClients = [...clients, ...clients, ...clients];

export default function ClientsShowcase() {
  return (
    <section
      id="clients"
      className="relative py-20 overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      {/* ── Fondo sutil ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,184,241,0.06) 0%, transparent 70%)'
        }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cg" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cg)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{
              background: 'var(--accent-soft)',
              color: 'var(--accent)',
              border: '1px solid rgba(0,184,241,0.25)',
              letterSpacing: '0.12em'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse inline-block" />
            Clientes que confían en nosotros
          </span>

          <h2
            className="text-3xl lg:text-4xl font-bold tracking-tight mt-1"
            style={{ color: 'var(--text)' }}
          >
            Empresas líderes eligen{' '}
            <span style={{ color: 'var(--accent)' }}>Geimser</span>
          </h2>

          <p
            className="mt-4 text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            Más de una década acompañando a organizaciones de distintas industrias
            en su transformación digital.
          </p>
        </motion.div>

        {/* ── Divider ── */}
        <div className="relative mb-10">
          <div style={{ height: '1px', background: 'var(--border)' }} />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4"
            style={{ background: 'var(--surface)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
          </div>
        </div>

        {/* ── Marquee ── */}
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--surface), transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--surface), transparent)' }}
          />

          <div className="overflow-hidden py-3">
            <motion.div
              className="flex gap-6 w-max"
              animate={{ x: ['0%', '-33.333%'] }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatType: 'loop',
                },
              }}
              style={{ willChange: 'transform' }}
            >
              {allClients.map((client, i) => (
                <ClientCard key={`${client.id}-${i}`} client={client} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--border)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { value: '50+', label: 'Clientes activos', accent: true },
            { value: '98%', label: 'Satisfacción medida', accent: false },
            { value: '12+', label: 'Años de trayectoria', accent: false },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-8 px-4"
              style={{ background: 'var(--surface-2)' }}
            >
              <span
                className="text-3xl font-black tracking-tight"
                style={{ color: stat.accent ? 'var(--accent)' : 'var(--text)' }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs font-medium mt-1 tracking-wide uppercase"
                style={{ color: 'var(--text-muted)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Card individual con logo real + SVG fallback ── */
function ClientCard({ client }: { client: Client }) {
  const [imgError, setImgError] = useState(false);
  const showSvg = !client.logoUrl || imgError;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-2xl px-8 py-6 cursor-default"
      style={{
        width: '230px',
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${client.accentColor}18 0%, transparent 70%)`,
        }}
      />

      {/* Logo */}
      <div
        className="w-full flex items-center justify-center"
        style={{ height: '60px' }}
      >
        {showSvg ? (
          /* SVG fallback — fiel a marca corporativa */
          <div
            className="w-full h-full transition-all duration-300 client-svg-wrapper flex items-center justify-center"
            style={{
              opacity: 0.72,
              color: 'var(--text)', // Hereda al SVG text
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.72';
            }}
          >
            {client.svgFallback}
          </div>
        ) : (
          /* Imagen real desde web oficial */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={client.logoUrl}
            alt={client.name}
            onError={() => setImgError(true)}
            className="max-h-full max-w-full object-contain transition-all duration-300"
            style={{
              filter: 'grayscale(100%) brightness(0.85) contrast(1.15)',
              opacity: 0.72,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.filter = 'grayscale(0%) brightness(1) contrast(1)';
              el.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.filter = 'grayscale(100%) brightness(0.85) contrast(1.15)';
              el.style.opacity = '0.72';
            }}
          />
        )}
      </div>

      {/* Sector tag — aparece en hover */}
      <span
        className="text-[10px] font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-250"
        style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}
      >
        {client.sector}
      </span>
    </motion.div>
  );
}
