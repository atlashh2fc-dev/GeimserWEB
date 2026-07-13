'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  FileText,
  Gauge,
  LayoutDashboard,
  Search,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react';
import type { ExperienceProduct } from './experienceData';
import styles from './ProductDemo.module.css';

type Props = {
  product: ExperienceProduct;
  onClose: () => void;
};

const demoNavigation: Record<string, string[]> = {
  itsm: ['Resumen', 'Tickets', 'Activos', 'SLA'],
  learning: ['Mi ruta', 'Biblioteca', 'Equipos', 'Certificados'],
  legal: ['Dashboard', 'Casos', 'Agenda', 'IA Auditor'],
  crm: ['Pipeline', 'Contactos', 'Actividades', 'Insights'],
};

function ProductMark({ product }: { product: ExperienceProduct }) {
  if (!product.mark) return <span className={styles.letterMark}>A</span>;
  return <img src={product.mark} alt="" className={styles.productMark} />;
}

function Metric({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className={styles.metric}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{trend}</small>
    </div>
  );
}

function ItsmDemo() {
  const tickets = [
    ['#1048', 'VPN sin acceso · Operaciones', 'Alta', 'Camila R.'],
    ['#1047', 'Alta de usuario · Finanzas', 'Media', 'Diego M.'],
    ['#1046', 'Equipo sin conexión · Terreno', 'Crítica', 'Mesa N2'],
    ['#1045', 'Permiso carpeta comercial', 'Baja', 'Paula S.'],
  ];
  return (
    <>
      <div className={styles.metrics}><Metric label="Tickets activos" value="24" trend="−12% esta semana" /><Metric label="SLA cumplido" value="97.8%" trend="Objetivo 95%" /><Metric label="Primera respuesta" value="8 min" trend="3 min más rápido" /></div>
      <div className={styles.demoGrid}>
        <section className={styles.dataPanel}>
          <div className={styles.panelHeading}><div><span>Operación en vivo</span><h3>Solicitudes recientes</h3></div><button>Ver todos <ChevronRight size={14} /></button></div>
          <div className={styles.tableHeader}><span>Ticket</span><span>Solicitud</span><span>Prioridad</span><span>Responsable</span></div>
          {tickets.map((ticket) => <div className={styles.tableRow} key={ticket[0]}>{ticket.map((cell, index) => <span key={cell} className={index === 2 ? styles.priority : ''}>{cell}</span>)}</div>)}
        </section>
        <section className={styles.sidePanel}><div className={styles.panelHeading}><div><span>Salud operativa</span><h3>SLA por equipo</h3></div></div>{[['Mesa N1','99%'],['Mesa N2','96%'],['Terreno','91%']].map(([name,value]) => <div className={styles.progressItem} key={name}><div><span>{name}</span><strong>{value}</strong></div><i><b style={{ width: value }} /></i></div>)}</section>
      </div>
    </>
  );
}

function LearningDemo() {
  return (
    <>
      <div className={styles.learningHero}><div><span>Tu ruta activa</span><h3>Liderazgo para equipos híbridos</h3><p>Continúa donde quedaste y completa tu próximo hito.</p><button><BookOpen size={16} /> Continuar aprendiendo</button></div><div className={styles.progressRing}><strong>68%</strong><span>completado</span></div></div>
      <div className={styles.courseGrid}>{[
        ['Comunicación efectiva', '5 de 6 lecciones', '82%'],
        ['Cultura de seguridad', '3 de 5 lecciones', '60%'],
        ['IA aplicada al trabajo', '2 de 8 lecciones', '25%'],
      ].map(([title, meta, progress]) => <article className={styles.course} key={title}><span className={styles.courseIcon}><BookOpen size={20} /></span><small>CURSO</small><h3>{title}</h3><p>{meta}</p><i><b style={{ width: progress }} /></i><strong>{progress}</strong></article>)}</div>
    </>
  );
}

function LegalDemo() {
  return (
    <>
      <div className={styles.metrics}><Metric label="Causas activas" value="47" trend="3 vencen hoy" /><Metric label="Plazos esta semana" value="12" trend="0 vencidos" /><Metric label="Documentos" value="3.2K" trend="100% trazables" /></div>
      <div className={styles.demoGrid}>
        <section className={styles.dataPanel}><div className={styles.panelHeading}><div><span>Gestión jurídica</span><h3>Casos prioritarios</h3></div><button>Nuevo caso</button></div>{[['C-2026-089','Comercial Andes S.A.','En tramitación'],['C-2026-091','González Hermanos','Audiencia'],['C-2026-094','Tech Corp Ltda.','Resolución']].map(([code,client,state]) => <div className={styles.caseRow} key={code}><span className={styles.fileIcon}><FileText size={17} /></span><div><strong>{code}</strong><small>{client}</small></div><em>{state}</em><ChevronRight size={16} /></div>)}</section>
        <section className={`${styles.sidePanel} ${styles.aiPanel}`}><span className={styles.aiIcon}><Sparkles size={18} /></span><small>IA AUDITOR</small><h3>Revisión inteligente</h3><p>Demanda_Laboral.pdf</p>{['Partes identificadas', 'Plazos verificados', 'Cláusula crítica detectada'].map(item => <div className={styles.aiCheck} key={item}><CheckCircle2 size={14} />{item}</div>)}<button>Ver auditoría</button></section>
      </div>
    </>
  );
}

function CrmDemo() {
  const columns: [string, string[]][] = [
    ['Nuevos', ['Minera Norte', 'Innova Retail']],
    ['Calificados', ['Energía Sur', 'Grupo Andino']],
    ['Propuesta', ['Wabtec Chile', 'Natura LATAM']],
    ['Negociación', ['Equifax', 'Link Solutions']],
  ];
  return (
    <>
      <div className={styles.metrics}><Metric label="Pipeline" value="$48M" trend="+14% este mes" /><Metric label="Oportunidades" value="36" trend="8 en propuesta" /><Metric label="Conversión" value="27%" trend="+4.2 puntos" /></div>
      <div className={styles.pipeline}>{columns.map(([title,items],column) => <section key={title}><header><span>{title}</span><small>{items.length}</small></header>{items.map((item,index) => <article key={item}><strong>{item}</strong><span>{['Software & IA','Data intelligence','CX & automatización'][(column + index) % 3]}</span><div><b>${[8,12,6,9,11,7,14,5][column * 2 + index]}M</b><i>{['CR','PM','AS','JV'][(column + index) % 4]}</i></div></article>)}</section>)}</div>
    </>
  );
}

export default function ProductDemo({ product, onClose }: Props) {
  const [activeNav, setActiveNav] = useState(0);
  const navigation = demoNavigation[product.id];

  return (
    <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className={styles.window} initial={{ opacity: 0, scale: .965, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .45, ease: [0.22, 1, 0.36, 1] }} style={{ '--product-color': product.color } as React.CSSProperties}>
        <header className={styles.topbar}>
          <div className={styles.demoBrand}><span className={styles.demoMark}><ProductMark product={product} /></span><div><strong>{product.name}</strong><small>DEMO COMERCIAL · DATOS SIMULADOS</small></div></div>
          <div className={styles.demoStatus}><i /> Sesión demo activa</div>
          <div className={styles.topActions}><button onClick={onClose}><ArrowLeft size={15} /> Volver al universo</button><button className={styles.closeButton} onClick={onClose} aria-label="Cerrar demo"><X size={18} /></button></div>
        </header>
        <div className={styles.shell}>
          <aside className={styles.sidebar}>
            <nav>{navigation.map((item, index) => <button key={item} className={activeNav === index ? styles.navActive : ''} onClick={() => setActiveNav(index)}>{[<LayoutDashboard key="d" />, <FileText key="f" />, <UsersRound key="u" />, <Gauge key="g" />][index]}<span>{item}</span></button>)}</nav>
            <div className={styles.demoUser}><span>DG</span><div><strong>Demo Geimser</strong><small>Administrador</small></div></div>
          </aside>
          <section className={styles.content}>
            <div className={styles.contentHeader}><div><span>{product.category}</span><h2>{navigation[activeNav]}</h2><p>{activeNav === 0 ? product.statement : `Explora ${navigation[activeNav].toLowerCase()} dentro de ${product.shortName}.`}</p></div><div className={styles.contentActions}><button><Search size={16} /></button><button><Bell size={16} /><i /></button><button><CircleUserRound size={17} /> Demo</button></div></div>
            {product.id === 'itsm' && <ItsmDemo />}
            {product.id === 'learning' && <LearningDemo />}
            {product.id === 'legal' && <LegalDemo />}
            {product.id === 'crm' && <CrmDemo />}
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}
