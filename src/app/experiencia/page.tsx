'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  Maximize2,
  LogOut,
  Pause,
  Play,
  Sparkles,
  X,
} from 'lucide-react';
import styles from './experience.module.css';
import { experienceProducts } from '@/components/experience/experienceData';
import ProductDemo from '@/components/experience/ProductDemo';

const ExperienceScene = dynamic(
  () => import('@/components/experience/ExperienceScene'),
  { ssr: false },
);

export default function ExperiencePage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [detailsIndex, setDetailsIndex] = useState<number | null>(null);
  const [demoIndex, setDemoIndex] = useState<number | null>(null);
  const selected = experienceProducts[selectedIndex];
  const detailsProduct = detailsIndex === null ? null : experienceProducts[detailsIndex];
  const demoProduct = demoIndex === null ? null : experienceProducts[demoIndex];

  const goTo = useCallback((index: number) => {
    setSelectedIndex((index + experienceProducts.length) % experienceProducts.length);
  }, []);

  const openDetails = useCallback((index: number) => {
    const normalized = (index + experienceProducts.length) % experienceProducts.length;
    setSelectedIndex(normalized);
    setAutoPlay(false);
    setDetailsIndex(normalized);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDetailsIndex(null);
        setDemoIndex(null);
        return;
      }
      if (detailsIndex !== null || demoIndex !== null) return;
      if (event.key === 'ArrowRight') goTo(selectedIndex + 1);
      if (event.key === 'ArrowLeft') goTo(selectedIndex - 1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [demoIndex, detailsIndex, goTo, selectedIndex]);

  useEffect(() => {
    const locked = detailsIndex !== null || demoIndex !== null;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [demoIndex, detailsIndex]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = window.setInterval(() => {
      setSelectedIndex((current) => (current + 1) % experienceProducts.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [autoPlay]);

  const requestPresentationMode = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  };

  const closeExperienceSession = async () => {
    await fetch('/api/experience/auth', { method: 'DELETE', credentials: 'same-origin' });
    window.location.replace('/experiencia/acceso');
  };

  return (
    <main className={`${styles.experience} experience-hub`}>
      <div className={styles.aurora} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Volver a Geimser">
          <span className={styles.brandLogo}>
            <Image src="/G2.png" alt="Geimser" width={500} height={500} priority />
          </span>
        </Link>

        <div className={styles.headerStatus}>
          <span className={styles.liveDot} />
          <span>Ecosistema conectado</span>
          <span className={styles.statusDivider} />
          <span>04 experiencias</span>
        </div>

        <div className={styles.headerActions}>
          <button className={styles.presentationButton} onClick={requestPresentationMode}>
            <Maximize2 size={15} />
            <span>Modo presentación</span>
          </button>
          <button className={styles.logoutButton} onClick={closeExperienceSession} aria-label="Cerrar sesión comercial" title="Cerrar sesión">
            <LogOut size={15} />
          </button>
        </div>
      </header>

      <section className={styles.stage} aria-label="Universo interactivo de productos Geimser">
        <div className={styles.scene}>
          <ExperienceScene
            products={experienceProducts}
            selectedIndex={selectedIndex}
            onSelect={openDetails}
          />
        </div>

        <div className={styles.intro}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.kicker}
          >
            <Sparkles size={14} />
            Experiencia comercial interactiva
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            Tecnología que<br />
            <span>se puede recorrer.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            Cuatro productos reales, suspendidos en un mismo universo. Muévelos, selecciónalos y entra en vivo.
          </motion.p>
        </div>

        <nav className={styles.productRail} aria-label="Seleccionar producto">
          {experienceProducts.map((product, index) => {
            const active = index === selectedIndex;
            return (
              <button
                key={product.id}
                className={`${styles.railItem} ${active ? styles.railItemActive : ''}`}
                onClick={() => openDetails(index)}
                aria-current={active ? 'true' : undefined}
              >
                <span className={styles.railNumber}>{product.number}</span>
                <span className={styles.railLine} style={{ '--product-color': product.color } as React.CSSProperties} />
                <span className={styles.railCopy}>
                  <strong>{product.shortName}</strong>
                  <small>{product.category}</small>
                </span>
              </button>
            );
          })}
        </nav>

        <div className={styles.interactionHint}>
          <span className={styles.mouseGlyph}><span /></span>
          Arrastra para explorar · usa ← → para navegar
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={selected.id}
            className={styles.productPanel}
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ '--product-color': selected.color } as React.CSSProperties}
          >
            <div className={styles.productIdentity}>
              <span className={styles.productIndex}>{selected.number}</span>
              <div>
                <span className={styles.productCategory}>{selected.category}</span>
                <h2>{selected.name}</h2>
              </div>
            </div>

            <div className={styles.productNarrative}>
              <strong>{selected.statement}</strong>
              <p>{selected.description}</p>
            </div>

            <div className={styles.capabilities}>
              {selected.capabilities.map((capability) => (
                <span key={capability}>{capability}</span>
              ))}
            </div>

            <button className={styles.launchButton} onClick={() => openDetails(selectedIndex)}>
              Conocer {selected.shortName}
              <Eye size={17} />
            </button>
          </motion.article>
        </AnimatePresence>

        <div className={styles.tourControls}>
          <button onClick={() => goTo(selectedIndex - 1)} aria-label="Experiencia anterior">
            <ArrowLeft size={17} />
          </button>
          <button className={styles.playButton} onClick={() => setAutoPlay((value) => !value)} aria-label={autoPlay ? 'Pausar recorrido' : 'Iniciar recorrido automático'}>
            {autoPlay ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
          </button>
          <button onClick={() => goTo(selectedIndex + 1)} aria-label="Siguiente experiencia">
            <ArrowRight size={17} />
          </button>
          <div className={styles.progressTrack}>
            <motion.span
              key={`${selected.id}-${autoPlay}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: autoPlay ? 1 : (selectedIndex + 1) / experienceProducts.length }}
              transition={{ duration: autoPlay ? 6.5 : 0.45, ease: autoPlay ? 'linear' : 'easeOut' }}
            />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {detailsProduct && (
          <motion.div className={styles.detailsOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDetailsIndex(null)}>
            <motion.article
              className={styles.detailsModal}
              initial={{ opacity: 0, scale: .94, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: .97, y: 16 }}
              transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }}
              style={{ '--product-color': detailsProduct.color } as React.CSSProperties}
              onClick={(event) => event.stopPropagation()}
            >
              <button className={styles.modalClose} onClick={() => setDetailsIndex(null)} aria-label="Cerrar"><X size={18} /></button>
              <div className={styles.modalVisual}>
                <div className={styles.modalGlow} />
                <div className={styles.modalMark}>
                  {detailsProduct.mark ? <img src={detailsProduct.mark} alt="" /> : <span>A</span>}
                </div>
                <small>{detailsProduct.number} · {detailsProduct.category}</small>
                <strong>{detailsProduct.shortName}</strong>
              </div>
              <div className={styles.modalContent}>
                <span className={styles.modalEyebrow}>Qué encontrarás dentro</span>
                <h2>{detailsProduct.name}</h2>
                <p>{detailsProduct.description}</p>
                <ul>
                  {detailsProduct.demoFeatures.map((feature) => <li key={feature}><CheckCircle2 size={16} /><span>{feature}</span></li>)}
                </ul>
                <div className={styles.modalActions}>
                  <button className={styles.secondaryAction} onClick={() => setDetailsIndex(null)}>Seguir explorando</button>
                  <button className={styles.primaryAction} onClick={() => { setDemoIndex(detailsIndex); setDetailsIndex(null); }}><Play size={15} fill="currentColor" /> Entrar al demo</button>
                </div>
                <small className={styles.demoDisclaimer}>Entorno comercial protegido · Sesión temporal · Acceso controlado</small>
              </div>
            </motion.article>
          </motion.div>
        )}
        {demoProduct && <ProductDemo product={demoProduct} onClose={() => setDemoIndex(null)} />}
      </AnimatePresence>
    </main>
  );
}
