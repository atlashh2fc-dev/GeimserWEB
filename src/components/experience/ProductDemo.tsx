'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, LoaderCircle, RefreshCw, ShieldCheck, X } from 'lucide-react';
import type { ExperienceProduct } from './experienceData';
import styles from './ProductDemo.module.css';

type Props = {
  product: ExperienceProduct;
  onClose: () => void;
};

const demoEntrypoints: Record<string, string> = {
  itsm: 'https://itsm.geimser.cl/geimser/demo',
  learning: 'https://aprende.geimser.cl/demo-embed',
  legal: 'https://suits.altiusignite.com/demo-embed',
  crm: 'https://atlas.geimser.cl/demo-embed',
};

function ProductMark({ product }: { product: ExperienceProduct }) {
  if (!product.mark) return <span className={styles.letterMark}>A</span>;
  return <img src={product.mark} alt="" className={styles.productMark} />;
}

export default function ProductDemo({ product, onClose }: Props) {
  const [source, setSource] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const connect = useCallback(async () => {
    setSource(null);
    setError(null);
    try {
      const response = await fetch(`/api/experience/demo-ticket?product=${encodeURIComponent(product.id)}`, {
        cache: 'no-store',
        credentials: 'same-origin',
      });
      if (!response.ok) throw new Error('No fue posible autorizar la sesión demo.');
      const payload = await response.json() as { ticket?: string };
      const entrypoint = demoEntrypoints[product.id];
      if (!entrypoint || !payload.ticket) throw new Error('El demo no está disponible.');
      setSource(`${entrypoint}#ticket=${encodeURIComponent(payload.ticket)}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No fue posible abrir el aplicativo.');
    }
  }, [product.id]);

  useEffect(() => { void connect(); }, [connect, reloadKey]);

  return (
    <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className={styles.window} initial={{ opacity: 0, scale: .97, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .985 }} transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }} style={{ '--product-color': product.color } as React.CSSProperties}>
        <header className={styles.topbar}>
          <div className={styles.demoBrand}>
            <span className={styles.demoMark}><ProductMark product={product} /></span>
            <div><strong>{product.name}</strong><small>APLICATIVO REAL · SESIÓN DEMO</small></div>
          </div>
          <div className={styles.demoStatus}><i /><ShieldCheck size={13} /> Acceso temporal protegido</div>
          <div className={styles.topActions}>
            <button onClick={() => setReloadKey((value) => value + 1)} aria-label="Recargar aplicativo"><RefreshCw size={15} /></button>
            <button onClick={onClose}><ArrowLeft size={15} /> Volver al universo</button>
            <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar demo"><X size={18} /></button>
          </div>
        </header>
        <div className={styles.frameShell}>
          {!source && !error && <div className={styles.connecting}><LoaderCircle /><strong>Abriendo {product.shortName}</strong><span>Creando una sesión demo segura…</span></div>}
          {error && <div className={styles.connecting}><strong>No pudimos conectar</strong><span>{error}</span><button onClick={() => setReloadKey((value) => value + 1)}>Intentar nuevamente</button></div>}
          {source && (
            <iframe
              key={source}
              className={styles.frame}
              src={source}
              title={`Demo real de ${product.name}`}
              allow="clipboard-read; clipboard-write; fullscreen"
              sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
