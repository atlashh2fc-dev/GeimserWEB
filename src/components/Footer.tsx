'use client';

import React from 'react';
import Image from 'next/image';
import {
  Mail,
  Phone,
  Smartphone,
  Clock,
  MapPin,
  Linkedin,
  Instagram,
  MessageSquare,
  ArrowRight,
  Shield,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Sobre Nosotros', href: '#' },
    { label: 'Soluciones', href: '#' },
    { label: 'Casos de Éxito', href: '#' },
    { label: 'Carreras', href: '#' },
    { label: 'Blog', href: '#' },
  ];

  const legalLinks = [
    { label: 'Política de Privacidad', href: '#' },
    { label: 'Términos de Servicio', href: '#' },
  ];

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{
        background: 'var(--surface)',
        color: 'var(--text)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Fondo sutil */}
      <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center opacity-20" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Columna 1: Branding + Social */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Image
                src="/G2.png"
                alt="Geimser Logo"
                width={210}
                height={60}
                className="w-48 h-auto brightness-125 contrast-110 drop-shadow-md"
                priority
              />
            </div>
            <p className="text-sm leading-relaxed mb-6 text-[var(--text-muted)]">
              Conectamos tecnología, talento y resultados para impulsar tu
              negocio hacia el futuro digital.
            </p>
            <div className="flex gap-3" aria-label="Redes sociales">
              <a
                href="#"
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 hover:text-[var(--accent)] hover:border-cyan-400/50"
                style={{
                  background: 'var(--surface-2)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/geimser_chile/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 hover:text-[var(--accent)] hover:border-cyan-400/50"
                style={{
                  background: 'var(--surface-2)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                }}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/56974159166"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 hover:text-[var(--accent)] hover:border-cyan-400/50"
                style={{
                  background: 'var(--surface-2)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                }}
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación + Contacto */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-4">Navegación</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-[var(--accent)] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Contacto</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-[var(--text-muted)]" />
                  <span>Merced 838, Santiago Centro, Chile</span>
                </li>
                <li className="flex items-start">
                  <Mail className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-[var(--text-muted)]" />
                  <a
                    href="mailto:contacto@geimser.cl"
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    contacto@geimser.cl
                  </a>
                </li>
                <li className="flex items-start">
                  <Smartphone className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-[var(--text-muted)]" />
                  <div>
                    <span className="text-[var(--text-muted)] block text-xs">Celular:</span>
                    <a
                      href="tel:+56974159166"
                      className="hover:text-[var(--accent)] transition-colors font-medium"
                    >
                      +56 9 7415 9166
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-[var(--text-muted)]" />
                  <div>
                    <span className="text-[var(--text-muted)] block text-xs">Teléfono:</span>
                    <a
                      href="tel:+56227121164"
                      className="hover:text-[var(--accent)] transition-colors font-medium"
                    >
                      +56 2 2712 1164
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-[var(--text-muted)]" />
                  <div>
                    <span className="text-[var(--text-muted)] block text-xs">Horario de Atención:</span>
                    <span className="font-medium">Lunes a Viernes 9:00 a 18:00 hrs</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna 3: Newsletter + Sello Mujer */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-4">
                Mantente Actualizado
              </h4>
              <p className="text-sm mb-4 text-[var(--text-muted)]">
                Recibe insights sobre tecnología, IA y experiencia de cliente
                directamente en tu correo.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-grow px-4 py-2 rounded-l-md text-sm focus:outline-none transition-colors"
                  style={{
                    background: 'var(--surface-2)',
                    border: `1px solid var(--border)`,
                    color: 'var(--text)',
                  }}
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--accent)] hover:bg-[#0f6fe6] rounded-r-md transition-colors duration-200 text-white"
                  aria-label="Suscribirse al newsletter"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>

            <div
              className="rounded-xl p-4 flex items-center gap-4"
              style={{
                background: 'var(--surface-2)',
                border: `1px solid var(--border)`,
              }}
            >
              <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-white/20 shadow-md">
                <Image
                  src="/sello%20mujer.png"
                  alt="Sello Mujer"
                  fill
                  sizes="64px"
                  className="object-contain brightness-125 drop-shadow"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium leading-tight">
                  Empresa comprometida con la inclusión y el talento femenino
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-[var(--accent)]" />
                  Política de diversidad y oportunidades equitativas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/G2.png"
              alt="Geimser Icon"
              width={24}
              height={24}
              className="h-6 w-auto mr-3 brightness-125"
            />
            <p>
              &copy; {currentYear} Geimser. Todos los derechos reservados.
              <span className="ml-2 text-[11px] text-[var(--text-muted)] tracking-wide">
                Ignite. Execute. Scale.
              </span>
            </p>
          </div>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[var(--accent)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
