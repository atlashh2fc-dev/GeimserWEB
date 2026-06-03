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
    { label: 'Sobre Nosotros', href: '/nosotros' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Casos de Éxito', href: '/#success' },
    { label: 'Contacto', href: '/#contact' },
  ];

  const legalLinks = [
    { label: 'Política de Privacidad', href: '#' },
    { label: 'Términos de Servicio', href: '#' },
  ];

  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 bg-black text-white"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950 via-black to-black" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />

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
            <p className="text-sm leading-relaxed mb-6 text-slate-300">
              Conectamos tecnología, talento y resultados para impulsar tu
              negocio hacia el futuro digital.
            </p>
            <div className="flex gap-3" aria-label="Redes sociales">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#07101f] text-slate-300 transition-all duration-300 hover:border-cyan-400/50 hover:text-[#00B8F1]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/geimser_chile/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#07101f] text-slate-300 transition-all duration-300 hover:border-cyan-400/50 hover:text-[#00B8F1]"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/56974159166"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#07101f] text-slate-300 transition-all duration-300 hover:border-cyan-400/50 hover:text-[#00B8F1]"
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
                      className="text-sm text-slate-300 transition-colors duration-200 hover:text-[#00B8F1]"
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
                  <MapPin className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-slate-400" />
                  <span>Merced 838, Santiago Centro, Chile</span>
                </li>
                <li className="flex items-start">
                  <Mail className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-slate-400" />
                  <a
                    href="mailto:contacto@geimser.cl"
                    className="transition-colors hover:text-[#00B8F1]"
                  >
                    contacto@geimser.cl
                  </a>
                </li>
                <li className="flex items-start">
                  <Smartphone className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-slate-400" />
                  <div>
                    <span className="block text-xs text-slate-400">Celular:</span>
                    <a
                      href="tel:+56974159166"
                      className="font-medium transition-colors hover:text-[#00B8F1]"
                    >
                      +56 9 7415 9166
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-slate-400" />
                  <div>
                    <span className="block text-xs text-slate-400">Teléfono:</span>
                    <a
                      href="tel:+56227121164"
                      className="font-medium transition-colors hover:text-[#00B8F1]"
                    >
                      +56 2 2712 1164
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-slate-400" />
                  <div>
                    <span className="block text-xs text-slate-400">Horario de Atención:</span>
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
              <p className="mb-4 text-sm text-slate-300">
                Recibe insights sobre tecnología, IA y experiencia de cliente
                directamente en tu correo.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-grow rounded-l-md border border-white/10 bg-[#07101f] px-4 py-2 text-sm text-white transition-colors placeholder:text-slate-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="rounded-r-md bg-[#00B8F1] px-4 py-2 text-black transition-colors duration-200 hover:bg-cyan-300"
                  aria-label="Suscribirse al newsletter"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>

            <div
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#07101f] p-4"
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
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                  <Shield className="h-3.5 w-3.5 text-[#00B8F1]" />
                  Política de diversidad y oportunidades equitativas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-8 text-sm text-slate-300 md:flex-row">
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
              <span className="ml-2 text-[11px] tracking-wide text-slate-500">
                Ignite. Execute. Scale.
              </span>
            </p>
          </div>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-[#00B8F1]"
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
