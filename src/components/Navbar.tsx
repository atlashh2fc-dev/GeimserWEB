'use client';

import { useState, useEffect, FC } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Casos de Éxito', href: '/#success' },
];

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleContactClick = () => {
    const phone = '+56974159166';
    const msg = 'Hola, me interesa conocer más sobre los servicios de Geimser.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const navContainerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  } as const;

  const linkVariants = {
    hover: {
      color: "#ffffff",
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.header
      variants={navContainerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled
        ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-lg'
        : 'bg-transparent py-4'
        }`}
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center group relative z-50">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Image
                src="/G2.png"
                alt="Geimser Logo"
                width={isScrolled ? 110 : 130}
                height={35}
                className="transition-all duration-500"
                priority
              />
            </motion.div>
          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.li key={link.name} className="relative group">
                <Link href={link.href} className="relative text-sm font-medium text-gray-300 py-2 block overflow-hidden transition-colors hover:text-white">
                  <motion.span variants={linkVariants} whileHover="hover" className="relative z-10 block">
                    {link.name}
                  </motion.span>

                  {/* Animated Underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#00B8F1] transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* CTA y Menú Mobile */}
          <div className="flex items-center gap-4 group">
            <motion.button
              onClick={handleContactClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden md:block px-5 py-2 rounded-lg font-bold text-sm transition-all duration-300 relative overflow-hidden group/btn bg-[#00B8F1] text-black shadow-[0_0_15px_rgba(0,184,241,0.4)] hover:shadow-[0_0_25px_rgba(0,184,241,0.6)]`}
            >
              <span className="relative z-10">Hablemos</span>
              {/* Shine effect inside button */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover/btn:animate-shine" />
            </motion.button>

            <div className="md:hidden relative z-50">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-white/10 border border-white/10 text-white"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* MENÚ MOBILE CON ANIMACIÓN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-slate-950/95 backdrop-blur-xl z-40 pt-24 px-6 overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <motion.ul
              className="flex flex-col items-center space-y-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    className="block text-2xl font-medium text-gray-300 hover:text-cyan-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}

              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="pt-8 w-full max-w-xs"
              >
                <button
                  onClick={() => {
                    handleContactClick();
                    setIsOpen(false);
                  }}
                  className="w-full py-4 text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-lg shadow-cyan-500/20 active:scale-95 transition-transform"
                >
                  Hablemos
                </button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
