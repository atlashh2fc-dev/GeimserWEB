
'use client';

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowRight } from 'lucide-react';

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
    { label: "Términos de Servicio", href: "#" },
    { label: "Política de Cookies", href: "#" }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" }
  ];

  return (
    <footer className="bg-[#0B0F19] text-gray-400 relative overflow-hidden border-t border-white/10">
      {/* Fondo con grid sutil */}
      <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse,white,transparent_80%)] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Columna Izquierda: Logo, Descripción y Redes */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-bold text-white mb-4">
              Geimser
            </h3>
            <p className="text-sm leading-relaxed mb-6">
              Conectamos tecnología, talento y resultados para impulsar tu negocio hacia el futuro digital.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columna Central: Enlaces Rápidos y Contacto */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Navegación</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm hover:text-cyan-400 transition-colors duration-300">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contacto</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <span>Av. Providencia 1234, Santiago, Chile</span>
                </li>
                <li className="flex items-start">
                  <Mail className="w-4 h-4 mr-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <a href="mailto:contacto@geimser.cl" className="hover:text-cyan-400">contacto@geimser.cl</a>
                </li>
                <li className="flex items-start">
                  <Phone className="w-4 h-4 mr-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <a href="tel:+56223456789" className="hover:text-cyan-400">+56 2 2345 6789</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna Derecha: Newsletter */}
          <div className="lg:col-span-4">
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

        </div>

        {/* Barra Inferior: Copyright y Enlaces Legales */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-4 md:mb-0">
            &copy; {currentYear} Geimser. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-cyan-400 transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
