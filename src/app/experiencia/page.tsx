'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Command,
  ExternalLink,
  Grid2X2,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  Play,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
  type LucideIcon,
} from 'lucide-react';

type App = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  color: string;
  softColor: string;
  url?: string;
  highlights: string[];
  metrics: [string, string][];
  modules: string[];
};

const apps: App[] = [
  {
    id: 'itsm',
    name: 'ITSM Control Center',
    eyebrow: 'OPERACIONES TI',
    description: 'Una operación TI visible, ordenada y siempre un paso adelante.',
    longDescription: 'Centraliza solicitudes, activos, acuerdos de servicio y la resolución de incidentes en una vista que el equipo puede operar de punta a punta.',
    icon: LayoutDashboard,
    color: '#49D9FF',
    softColor: 'rgba(73, 217, 255, 0.16)',
    url: process.env.NEXT_PUBLIC_ITSM_URL || 'https://itsm.geimser.cl/',
    highlights: ['Mesa de ayuda omnicanal', 'SLA en tiempo real', 'Activos y conocimiento'],
    metrics: [['97.8%', 'SLA cumplido'], ['24', 'tickets activos'], ['8m', '1ª respuesta']],
    modules: ['Incidentes', 'Solicitudes', 'Catálogo', 'Activos'],
  },
  {
    id: 'learning',
    name: 'Learning Suite',
    eyebrow: 'APRENDIZAJE',
    description: 'Capacitación que se siente tan fluida como consumir una gran experiencia digital.',
    longDescription: 'Diseña rutas de aprendizaje, entrega contenidos, mide progreso y convierte el desarrollo de equipos en una experiencia continua.',
    icon: BookOpenCheck,
    color: '#A78BFA',
    softColor: 'rgba(167, 139, 250, 0.16)',
    url: process.env.NEXT_PUBLIC_LEARNING_SUITE_URL || 'https://aprende.geimser.cl/login',
    highlights: ['Rutas personalizadas', 'Progreso y certificación', 'Contenido centralizado'],
    metrics: [['86%', 'avance promedio'], ['12', 'rutas activas'], ['428', 'personas aprendiendo']],
    modules: ['Mi ruta', 'Biblioteca', 'Equipos', 'Certificados'],
  },
  {
    id: 'legal',
    name: 'SuitS Legal',
    eyebrow: 'LEGAL OPS',
    description: 'Visibilidad total para decisiones legales con menos fricción y más control.',
    longDescription: 'Organiza expedientes, tareas, documentos, plazos y trazabilidad para que cada caso mantenga su contexto y cada decisión llegue a tiempo.',
    icon: ShieldCheck,
    color: '#2EE59D',
    softColor: 'rgba(46, 229, 157, 0.16)',
    url: process.env.NEXT_PUBLIC_SUITS_LEGAL_URL || 'https://suits.altiusignite.com/',
    highlights: ['Expedientes conectados', 'Plazos críticos', 'Documentos con trazabilidad'],
    metrics: [['14', 'hitos esta semana'], ['100%', 'expedientes trazables'], ['3', 'alertas críticas']],
    modules: ['Casos', 'Documentos', 'Agenda', 'Reportes'],
  },
  {
    id: 'crm',
    name: 'Geimser CRM',
    eyebrow: 'CRECIMIENTO',
    description: 'Relaciones comerciales conectadas: desde el primer contacto hasta la oportunidad.',
    longDescription: 'Reúne conversaciones, contactos, oportunidades y actividades comerciales para que cada equipo atienda con contexto y avance con foco.',
    icon: UsersRound,
    color: '#FFB95C',
    softColor: 'rgba(255, 185, 92, 0.16)',
    url: process.env.NEXT_PUBLIC_CRM_URL || 'https://atlas.geimser.cl/login',
    highlights: ['Pipeline vivo', 'Vista 360° del cliente', 'Automatización comercial'],
    metrics: [['$48M', 'pipeline visible'], ['36', 'oportunidades'], ['72%', 'seguimiento al día']],
    modules: ['Pipeline', 'Contactos', 'Actividades', 'Insights'],
  },
];

const dots = Array.from({ length: 72 });

export default function ExperiencePage() {
  const [selected, setSelected] = useState<App>(apps[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setIsModalOpen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const chooseApp = (app: App) => {
    setSelected(app);
    setIsMenuOpen(false);
  };

  const launchApp = (app: App) => {
    if (app.url) {
      window.open(app.url, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelected(app);
    setIsModalOpen(true);
  };

  const AppIcon = selected.icon;

  return (
    <main className="experience-hub min-h-screen overflow-hidden bg-[#070B16] text-white selection:bg-cyan-300 selection:text-slate-950">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-[-8rem] h-[32rem] w-[32rem] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-[-10rem] h-[36rem] w-[36rem] rounded-full bg-violet-500/10 blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:52px_52px]" />
      </div>

      <header className="relative z-30 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="group flex items-center gap-3" aria-label="Volver a Geimser">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/[0.06] text-cyan-300 shadow-[0_0_30px_rgba(73,217,255,.12)] transition group-hover:border-cyan-300/60">
            <Command className="h-5 w-5" />
          </div>
          <div className="leading-none">
            <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-white/45">Geimser</span>
            <span className="mt-1 block text-base font-semibold tracking-tight">Experience Hub</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 text-sm text-white/65 backdrop-blur-xl md:flex">
          <a href="#ecosistema" className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white">Ecosistema</a>
          <a href="#showroom" className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white">Showroom</a>
          <a href="#acceso" className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white">Acceso</a>
        </nav>

        <button onClick={() => setIsMenuOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/[0.06] md:hidden" aria-label="Abrir menú">
          <Menu className="h-5 w-5" />
        </button>
        <a href="https://wa.me/56974159166?text=Hola%2C%20quiero%20conocer%20el%20Experience%20Hub%20de%20Geimser." target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 md:inline-flex">
          Hablar con Geimser <ArrowRight className="h-4 w-4" />
        </a>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[#070B16]/95 p-6 backdrop-blur-2xl md:hidden">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold tracking-[0.22em] text-cyan-300">EXPERIENCE HUB</span>
              <button onClick={() => setIsMenuOpen(false)} className="rounded-xl border border-white/15 p-2"><X /></button>
            </div>
            <div className="mt-14 space-y-3">
              {apps.map((app) => (
                <button key={app.id} onClick={() => chooseApp(app)} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left">
                  <span className="font-semibold">{app.name}</span><ChevronRight className="text-white/45" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="ecosistema" className="relative z-10 mx-auto max-w-[1440px] px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:px-10 lg:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1.5 text-xs font-bold tracking-[0.14em] text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" /> EL PORTAL PARA VIVIR EL ECOSISTEMA
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .08 }} className="max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.055em] text-balance sm:text-6xl lg:text-8xl">
              Todo lo que Geimser crea. <span className="bg-gradient-to-r from-cyan-200 via-white to-violet-300 bg-clip-text text-transparent">En un solo lugar.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .18 }} className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
              Explora, muestra y entra a nuestras plataformas. Un espacio de experiencia para descubrir cómo cada producto hace avanzar a las personas, la operación y el negocio.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .28 }} className="mt-9 flex flex-wrap gap-3">
              <a href="#showroom" className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_32px_rgba(73,217,255,.22)] transition hover:-translate-y-0.5 hover:bg-white"><Play className="h-4 w-4 fill-current" /> Entrar al showroom</a>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white/65"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> 4 experiencias conectadas</span>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .75, delay: .15 }} className="relative mx-auto w-full max-w-[480px]">
            <div className="absolute inset-8 rounded-full border border-cyan-300/10" />
            <div className="absolute inset-16 rounded-full border border-violet-300/10" />
            <div className="grid aspect-square place-items-center rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_38%,rgba(73,217,255,.17),transparent_27%),linear-gradient(145deg,rgba(255,255,255,.1),rgba(255,255,255,.015))] p-8 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
              <div className="relative grid h-48 w-48 place-items-center rounded-[2rem] border border-white/15 bg-[#0A1124]/85 shadow-[0_0_65px_rgba(73,217,255,.18)]">
                {dots.map((_, index) => <span key={index} className="absolute h-1.5 w-1.5 rounded-full bg-cyan-200" style={{ transform: `rotate(${index * 5}deg) translateY(-105px)`, opacity: index % 3 === 0 ? .9 : .22 }} />)}
                <Command className="h-16 w-16 text-cyan-200" strokeWidth={1.2} />
              </div>
              <div className="absolute bottom-10 left-10 rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs text-white/65 backdrop-blur"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-300" />Ecosistema online</div>
              <div className="absolute right-10 top-12 rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs text-white/65 backdrop-blur">4 productos · 1 experiencia</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="showroom" className="relative z-10 border-y border-white/10 bg-white/[0.025] py-16 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-xs font-bold tracking-[.18em] text-cyan-300">ELIGE UNA EXPERIENCIA</p><h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Tu vitrina de productos, con pulso propio.</h2></div>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">Selecciona una plataforma para recorrer su visión. Si su ambiente está habilitado, ingresa directamente desde aquí.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {apps.map((app, index) => {
              const Icon = app.icon;
              const active = selected.id === app.id;
              return (
                <motion.article key={app.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }} onClick={() => chooseApp(app)} className={`group cursor-pointer rounded-2xl border p-5 transition duration-300 ${active ? 'border-white/35 bg-white/[0.1] shadow-xl shadow-black/20' : 'border-white/10 bg-white/[0.035] hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.075]'}`}>
                  <div className="flex items-start justify-between"><div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: app.softColor, color: app.color }}><Icon className="h-5 w-5" /></div><span className="text-[10px] font-bold tracking-[.14em] text-white/35">0{index + 1}</span></div>
                  <p className="mt-7 text-[10px] font-bold tracking-[.16em]" style={{ color: app.color }}>{app.eyebrow}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">{app.name}</h3>
                  <p className="mt-3 min-h-16 text-sm leading-relaxed text-white/55">{app.description}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold" style={{ color: app.color }}>Explorar <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0A1020]/85 shadow-2xl shadow-black/25 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5"><div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" /><span className="ml-3 text-xs text-white/35">showroom.geimser · {selected.id}</span></div><span className="hidden rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-emerald-200 sm:block">LIVE PREVIEW</span></div>
            <div className="grid min-h-[430px] lg:grid-cols-[220px_1fr]">
              <aside className="hidden border-r border-white/10 bg-black/15 p-4 lg:block"><div className="mb-7 flex items-center gap-2 text-sm font-semibold"><AppIcon className="h-4 w-4" style={{ color: selected.color }} /> {selected.name}</div>{selected.modules.map((module, index) => <div key={module} className={`mb-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${index === 0 ? 'bg-white/10 text-white' : 'text-white/40'}`}><Grid2X2 className="h-4 w-4" />{module}</div>)}</aside>
              <div className="relative overflow-hidden p-5 sm:p-8"><div className="absolute right-0 top-0 h-52 w-52 rounded-full blur-3xl" style={{ background: selected.softColor }} />
                <AnimatePresence mode="wait"><motion.div key={selected.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .25 }} className="relative">
                  <div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-bold tracking-[.16em]" style={{ color: selected.color }}>{selected.eyebrow} · SHOWROOM</p><h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{selected.name}</h3><p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">{selected.longDescription}</p></div><button onClick={() => launchApp(selected)} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-110" style={{ background: selected.color }}>{selected.url ? 'Abrir plataforma' : 'Ver experiencia'}<ExternalLink className="h-4 w-4" /></button></div>
                  <div className="mt-8 grid gap-3 sm:grid-cols-3">{selected.metrics.map(([value, label]) => <div key={label} className="rounded-xl border border-white/10 bg-white/[0.045] p-4"><strong className="text-2xl font-semibold" style={{ color: selected.color }}>{value}</strong><span className="mt-1 block text-xs text-white/45">{label}</span></div>)}</div>
                  <div className="mt-7 rounded-xl border border-white/10 bg-black/15 p-4"><p className="text-[10px] font-bold tracking-[.16em] text-white/35">CAPACIDADES CLAVE</p><div className="mt-3 flex flex-wrap gap-2">{selected.highlights.map((highlight) => <span key={highlight} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/70">{highlight}</span>)}</div></div>
                </motion.div></AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="acceso" className="relative z-10 mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-300/[.14] via-white/[.055] to-violet-400/[.12] px-6 py-12 sm:px-12 sm:py-16"><div className="absolute -right-12 -top-16 h-64 w-64 rounded-full bg-cyan-300/15 blur-3xl" /><div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="text-xs font-bold tracking-[.18em] text-cyan-200">UN ECOSISTEMA, MUCHAS POSIBILIDADES</p><h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">No es una lista de herramientas. Es el lugar donde las soluciones cobran vida.</h2><p className="mt-5 max-w-2xl text-white/60">Muéstralas al equipo, recórrelas con un cliente o entra a trabajar. El Experience Hub está diseñado para ser la puerta de entrada del ecosistema Geimser.</p></div><a href="https://wa.me/56974159166?text=Hola%2C%20quiero%20coordinar%20una%20demo%20del%20ecosistema%20Geimser." target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">Coordinar demo guiada <MessageSquareText className="h-4 w-4" /></a></div></div>
      </section>

      <AnimatePresence>{isModalOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-5 backdrop-blur-md" onClick={() => setIsModalOpen(false)}><motion.div initial={{ scale: .95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .95, y: 10 }} onClick={(event) => event.stopPropagation()} className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#0C1427] p-7 shadow-2xl"><div className="flex items-start justify-between"><div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: selected.softColor, color: selected.color }}><AppIcon /></div><button onClick={() => setIsModalOpen(false)} className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button></div><h2 className="mt-6 text-2xl font-semibold">{selected.name} está listo para su ambiente.</h2><p className="mt-3 leading-relaxed text-white/60">La experiencia de showroom está activa. Para habilitar el acceso directo, agrega la URL pública de esta plataforma en las variables de entorno del proyecto.</p><div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4 font-mono text-xs text-cyan-200">NEXT_PUBLIC_{selected.id === 'learning' ? 'LEARNING_SUITE' : selected.id === 'legal' ? 'SUITS_LEGAL' : selected.id.toUpperCase()}_URL</div><button onClick={() => setIsModalOpen(false)} className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-bold text-slate-950">Seguir explorando</button></motion.div></motion.div>}</AnimatePresence>
    </main>
  );
}
