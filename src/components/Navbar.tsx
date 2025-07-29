// components/Navbar.tsx - Diseño Corporativo Elegante y Moderno

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    const phoneNumber = '+56974159466';
    const message = 'Hola, me interesa conocer más sobre sus soluciones tecnológicas.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <style jsx global>{`
        /* DISEÑO CORPORATIVO ELEGANTE Y MODERNO */
        
        .nav-link-elegant {
          position: relative;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 500;
          padding: 12px 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.025em;
        }

        .nav-link-elegant::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ffffff, #e2e8f0);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link-elegant:hover {
          color: #ffffff;
          transform: translateY(-1px);
        }

        .nav-link-elegant:hover::after {
          width: 100%;
        }

        .cta-button-elegant {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          color: white;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(30, 64, 175, 0.15);
        }

        .cta-button-elegant::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .cta-button-elegant:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(30, 64, 175, 0.25);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .cta-button-elegant:hover::before {
          left: 100%;
        }

        .logo-elegant {
          transition: all 0.3s ease;
          filter: brightness(1);
        }

        .logo-elegant:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .hamburger-elegant {
          padding: 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .hamburger-elegant:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .mobile-menu-elegant {
          background: rgba(15, 23, 42, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .mobile-link-elegant {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.25rem;
          font-weight: 500;
          padding: 16px 0;
          transition: all 0.3s ease;
          position: relative;
        }

        .mobile-link-elegant::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ffffff, transparent);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .mobile-link-elegant:hover {
          color: white;
          transform: translateY(-1px);
        }

        .mobile-link-elegant:hover::after {
          width: 100%;
        }

        .menu-fade-in {
          animation: fadeInSlide 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .menu-item-fade {
          opacity: 0;
          transform: translateY(20px);
          animation: itemFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .menu-item-fade:nth-child(1) { animation-delay: 0.1s; }
        .menu-item-fade:nth-child(2) { animation-delay: 0.15s; }
        .menu-item-fade:nth-child(3) { animation-delay: 0.2s; }
        .menu-item-fade:nth-child(4) { animation-delay: 0.25s; }
        .menu-item-fade:nth-child(5) { animation-delay: 0.3s; }

        @keyframes itemFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Micro-interacciones sutiles */
        .subtle-hover {
          transition: all 0.2s ease;
        }

        .subtle-hover:hover {
          transform: translateY(-0.5px);
        }

        /* Glassmorphism elegante */
        .glass-elegant {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        }
      `}</style>

      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center logo-elegant">
            <Image
              src="/G2.png"
              alt="Geimser Logo"
              width={140}
              height={40}
              priority
            />
          </Link>

          {/* Navegación Desktop */}
          <ul className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className="nav-link-elegant"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Botón CTA y Menú Móvil */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleContactClick}
              className="hidden md:block cta-button-elegant subtle-hover"
            >
              Hablemos
            </button>
            
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="hamburger-elegant"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-white transition-transform duration-300" />
                ) : (
                  <Menu className="w-6 h-6 text-white transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Menú Móvil */}
      {isOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full mobile-menu-elegant menu-fade-in">
          <ul className="flex flex-col items-center space-y-2 py-8">
            {navLinks.map((link, index) => (
              <li key={link.name} className="menu-item-fade">
                <Link 
                  href={link.href}
                  className="mobile-link-elegant"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="menu-item-fade pt-4">
              <button
                onClick={() => {
                  handleContactClick();
                  setIsOpen(false);
                }}
                className="cta-button-elegant"
              >
                Hablemos
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Overlay de fondo móvil */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}

export default Navbar;
