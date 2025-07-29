'use client';

import { useState, useEffect, FC } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Nosotros', href: '#about' },
  { name: 'Soluciones', href: '#solutions' },
  { name: 'Infraestructura', href: '#infrastructure' },
  { name: 'Casos de Éxito', href: '#success' },
];

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleContactClick = () => {
    const phone = '+56974159466';
    const msg = 'Hola, me interesa conocer más sobre sus soluciones tecnológicas.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <style jsx global>{`
        .nav-link-refined {
          position: relative;
          color: #e0e0e0;
          font-weight: 500;
          padding: 12px 0;
          transition: all 0.3s ease;
        }

        .nav-link-refined::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 2px;
          width: 0%;
          background: linear-gradient(90deg, #00e5ff, #00bcd4);
          transition: width 0.4s ease;
        }

        .nav-link-refined:hover {
          color: #ffffff;
          transform: translateY(-1px);
        }

        .nav-link-refined:hover::after {
          width: 100%;
        }

        .cta-refined {
          background: linear-gradient(135deg, #00e5ff, #00bcd4);
          color: black;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .cta-refined::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,0.2);
          transition: left 0.6s ease;
        }

        .cta-refined:hover::before {
          left: 100%;
        }

        .cta-refined:hover {
          transform: scale(1.03);
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.4);
        }

        .hamburger-refined {
          padding: 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .hamburger-refined:hover {
          transform: scale(1.05);
        }

        .mobile-link-refined {
          color: white;
          font-size: 1.2rem;
          font-weight: 500;
          padding: 14px 0;
          position: relative;
          transition: all 0.3s ease;
        }

        .mobile-link-refined:hover {
          color: #00e5ff;
        }
      `}</style>

      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/G2.png"
              alt="Geimser Logo"
              width={140}
              height={40}
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="nav-link-refined">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA y Menú Mobile */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleContactClick}
              className="hidden md:block cta-refined"
            >
              Hablemos
            </button>

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="hamburger-refined">
                {isOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MENÚ MOBILE */}
      {isOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full bg-slate-900/95 backdrop-blur-md z-40">
          <ul className="flex flex-col items-center py-6 space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="mobile-link-refined"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <button
                onClick={() => {
                  handleContactClick();
                  setIsOpen(false);
                }}
                className="cta-refined"
              >
                Hablemos
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;