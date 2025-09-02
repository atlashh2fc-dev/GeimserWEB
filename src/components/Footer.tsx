'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Instagram, MessageSquare, ArrowRight, Shield } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Sobre Nosotros", href: "#" },
    { label: "Soluciones", href: "#" },
    { label: "Casos de Éxito", href: "#" },
    { label: "Carreras", href: "#" },
    { label: "Blog", href: "#" }
  ];

  const legalLinks = [
    { label: "Política de Privacidad", href: "#" },
    { label: "Términos de Servicio", href: "#" }
  ];

  return (
    <footer className="bg-[#0B0F19] text-gray-400 relative overflow-hidden border-t border-white/10">
      {/* Fondo con grid sutil */}
      <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse,white,transparent_80%)] opacity-20"></div>

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
                className="w-48 h-auto"
                priority
              />
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Conectamos tecnología, talento y resultados para impulsar tu negocio hacia el futuro digital.
            </p>
            {/* Social */}
            <div className="flex space-x-3">
              <a
                href="#" // Reemplaza con tu URL de LinkedIn
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="https://www.instagram.com/geimser_chile/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://wa.me/56974159166"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación + Contacto */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Navegación</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-cyan-400 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Contacto</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                  <span>Merced 838, Santiago Centro, Chile</span>
                </li>
                <li className="flex items-start">
                  <Mail className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                  <a href="mailto:contacto@geimser.cl" className="hover:text-cyan-400">
                    contacto@geimser.cl
                  </a>
                </li>
                <li className="flex items-start">
                  <Phone className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                  <a href="tel:+56227501799" className="hover:text-cyan-400">
                    +56 2 27501799
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna 3: Newsletter + Sello Mujer */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div>
              <h4 className="font-semibold text-white mb-4">Mantente Actualizado</h4>
              <p className="text-sm mb-4">
                Recibe insights sobre tecnología, IA y experiencia de cliente directamente en tu correo.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-grow px-4 py-2 bg-gray-800/50 border border-white/10 rounded-l-md text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-r-md transition-colors duration-300"
                  aria-label="Suscribirse al newsletter"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Tarjeta Sello Mujer (imagen con fondo transparente, layout pro) */}
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex items-center gap-4">
              <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-white/10">
                {/* Nota: el archivo se llama 'sello mujer.png' (con espacio). Usamos la ruta codificada. */}
                <Image
                  src="/sello%20mujer.png"
                  alt="Sello Mujer - Compromiso con la inclusión"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium leading-tight">
                  Empresa comprometida con la inclusión y el talento femenino
                </p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  Política de diversidad y oportunidades equitativas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/G2.png"
              alt="Geimser Icon"
              width={24}
              height={24}
              className="h-6 w-auto mr-3 opacity-50"
            />
            <p>&copy; {currentYear} Geimser. Todos los derechos reservados.</p>
          </div>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-cyan-400 transition-colors duration-300"
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