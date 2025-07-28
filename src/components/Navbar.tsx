// components/Navbar.tsx

import { useState, useEffect, FC } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // 1. Importar el componente Image de Next.js

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
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/50 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 2. Logo - Reemplazamos el texto con el componente Image */}
          <Link href="/" className="flex items-center">
            <Image
              src="/G2.png" // Ruta desde la carpeta 'public'
              alt="Geimser Logo"
              width={140} // AJUSTA ESTE VALOR al ancho deseado
              height={40} // AJUSTA ESTE VALOR al alto deseado
              priority // Prioriza la carga de esta imagen por ser LCP
            />
          </Link>

          {/* Navegación de Escritorio */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className="group relative text-white/90 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Botón CTA y Menú Móvil */}
          <div className="flex items-center gap-4">
             <Link href="#contact" className="hidden md:block px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors duration-300">
                Contactar
             </Link>
             <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                   {isOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
                </button>
             </div>
          </div>

        </div>
      </nav>

      {/* Overlay del Menú Móvil */}
      <div 
        className={`md:hidden fixed top-20 left-0 w-full bg-slate-900/95 backdrop-blur-xl transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col items-center space-y-6 p-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href}
                className="text-2xl text-white/90 hover:text-white transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="#contact" className="mt-4 block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors duration-300">
                Contactar
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;