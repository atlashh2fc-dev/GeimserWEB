'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  CreditCard,
  DatabaseZap,
  Globe2,
  Headphones,
  Layers3,
  MapPin,
  MessageSquare,
  Network,
  PhoneCall,
  ShieldCheck,
  SunMedium,
  Users,
  Workflow,
  X,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const whatsappUrl =
  'https://wa.me/56974159166?text=Hola%2C%20quiero%20conocer%20las%20soluciones%20de%20Geimser%20para%20mi%20negocio.';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

const solutionPillars = [
  {
    icon: Code2,
    title: 'Software, IA y automatización',
    promise: 'Convertimos procesos manuales en flujos inteligentes, integrados y escalables.',
    services: ['Full custom dev', 'IA generativa y bots', 'RPA & automation', 'Integración total'],
    image: '/assets/images/service-software-ai.png',
    metric: 'Procesos inteligentes',
    impact: 'Menos fricción operativa y decisiones con datos en tiempo real.',
    problem: 'La operación depende de planillas, sistemas que no conversan entre sí y tareas manuales que consumen tiempo del equipo.',
    solution: 'Diseñamos software, automatizaciones e integraciones a medida para ordenar el flujo completo: captura, operación, seguimiento y reportería.',
    result: 'Procesos más rápidos, menos errores, mejor control y equipos enfocados en decisiones, no en tareas repetitivas.',
  },
  {
    icon: Camera,
    title: 'Seguridad integral y continuidad',
    promise: 'Protegemos activos críticos con seguridad electrónica, física y monitoreo centralizado.',
    services: ['CCTV con analítica', 'Monitoreo central 24/7', 'Seguridad física', 'Protección 360 grados'],
    image: '/assets/images/service-security.png',
    metric: 'Protección 360',
    impact: 'Mitigación de riesgos antes de que impacten la continuidad del negocio.',
    problem: 'Los riesgos físicos, electrónicos y operacionales suelen gestionarse por separado, generando puntos ciegos y respuestas tardías.',
    solution: 'Integramos vigilancia, control, protección física y monitoreo centralizado para que la seguridad funcione como una operación coordinada.',
    result: 'Más visibilidad, respuesta oportuna y menor exposición para instalaciones, activos críticos y continuidad operacional.',
  },
  {
    icon: Users,
    title: 'Talento TI y equipos gestionados',
    promise: 'Disponibilizamos células expertas y capacidad de despliegue tecnológico para acelerar proyectos críticos con alcance regional.',
    services: ['Front-end experts', 'Back-end devs', 'Mobile specialists', 'QA & security', 'Masterización de equipos', 'Rollout y despliegue TI'],
    image: '/assets/images/service-talent-ti.png',
    metric: 'Células expertas',
    impact: 'Escalabilidad técnica, soporte en terreno y despliegues masivos sin fricción de contratación.',
    problem: 'Los proyectos TI se frenan por falta de perfiles, presión de soporte interno o despliegues físicos que el equipo no puede absorber.',
    solution: 'Aportamos células técnicas, perfiles especializados y capacidad operativa para masterizar, preparar y desplegar equipos en terreno.',
    result: 'Proyectos más rápidos, continuidad del equipo interno y rollouts ordenados con control de avance.',
  },
  {
    icon: BarChart3,
    title: 'Data intelligence y crecimiento comercial',
    promise: 'Ayudamos a encontrar mejores leads en menos tiempo usando datos, scoring y georreferenciación.',
    services: ['Scoring predictivo', 'Georreferenciación', 'Modelos propios', 'Big Data con partners'],
    image: '/assets/images/service-data-intelligence.png',
    metric: 'Leads mejor priorizados',
    impact: 'Funnel comercial optimizado con ciencia de datos.',
    problem: 'Los equipos comerciales pierden tiempo contactando bases frías, mal priorizadas o sin contexto territorial.',
    solution: 'Aplicamos scoring, georreferenciación y modelos de inteligencia para priorizar oportunidades con mayor probabilidad de conversión.',
    result: 'Menor ciclo de adquisición, mejor foco de ventas y mayor retorno sobre campañas y fuerza comercial.',
  },
  {
    icon: SunMedium,
    title: 'Eficiencia energética y sostenibilidad',
    promise: 'Reducimos costos operativos y apoyamos metas ESG con soluciones energéticas concretas.',
    services: ['Plantas solares', 'Ingeniería de eficiencia', 'Consultoría energética', 'Roadmaps renovables'],
    image: '/assets/images/energy-efficiency-real.png',
    metric: 'ROI energético',
    impact: 'Ahorro operativo y avance en metas de descarbonización.',
    problem: 'El costo energético sube y muchas empresas no tienen una ruta clara para ahorrar sin comprometer continuidad.',
    solution: 'Evaluamos consumo, diseñamos soluciones solares o de eficiencia y construimos una hoja de ruta energética viable.',
    result: 'Ahorro medible, mejor desempeño operacional y avances concretos en metas ESG.',
  },
  {
    icon: MessageSquare,
    title: 'CX y contact center',
    promise: 'Diseñamos experiencias omnicanal que transforman contactos en fidelización y crecimiento.',
    services: ['Gestión omnicanal', 'Soporte crítico 24/7', 'Resolución primer contacto', 'Integración CRM'],
    image: '/assets/images/service-cx-contact-center.png',
    metric: 'Fidelización',
    impact: 'Clientes más satisfechos, retenidos y conectados con la marca.',
    problem: 'Los clientes se frustran cuando deben repetir información, esperar demasiado o reciben respuestas distintas según el canal.',
    solution: 'Diseñamos y operamos una experiencia omnicanal con soporte, seguimiento, CRM y criterios de resolución claros.',
    result: 'Mejor satisfacción, mayor retención y una relación de cliente más consistente y medible.',
  },
];

const outcomes = [
  {
    icon: ShieldCheck,
    title: 'Continuidad operacional',
    text: 'Canales, personas y sistemas alineados para responder sin improvisar.',
  },
  {
    icon: DatabaseZap,
    title: 'Gestión con datos',
    text: 'Indicadores simples para medir atención, avance comercial y desempeño operativo.',
  },
  {
    icon: Network,
    title: 'Integración real',
    text: 'Unimos herramientas digitales, equipo humano e infraestructura en una misma ruta.',
  },
];

const packIncludes = [
  { icon: Globe2, label: 'Sitio web customizado' },
  { icon: CreditCard, label: 'Webpay o medios de pago' },
  { icon: CalendarDays, label: 'Agenda o reservas' },
  { icon: PhoneCall, label: 'Número telefónico dedicado' },
  { icon: Headphones, label: 'Atención y toma de recados' },
  { icon: MapPin, label: 'Oficina en Santiago Centro' },
  { icon: ClipboardCheck, label: 'Reportes simples de actividad' },
  { icon: Workflow, label: 'Flujos digitales a medida' },
];

const journey = [
  ['01', 'Diagnóstico', 'Entendemos tu etapa, dolores operativos, canales actuales y metas comerciales.'],
  ['02', 'Diseño de solución', 'Priorizamos servicios y definimos una ruta accionable, sin sobredimensionar costos.'],
  ['03', 'Implementación', 'Configuramos canales, herramientas, equipo y procesos con responsables claros.'],
  ['04', 'Operación y mejora', 'Medimos, ajustamos y acompañamos la evolución con foco en continuidad y resultado.'],
];

const ecosystem = [
  ['Siptel', 'Infraestructura core'],
  ['Vocalcom', 'Experiencia cliente'],
  ['Neotel', 'Integración CRM'],
  ['Infobusiness', 'Data & analytics'],
  ['GG Electrics', 'Energía sostenible'],
  ['Altius', 'Automatización, IA y BPO'],
];

export default function ServiciosPage() {
  const [selectedSolution, setSelectedSolution] = React.useState<(typeof solutionPillars)[number] | null>(null);

  return (
    <main className="bg-white text-slate-950">
      <Navbar />

      <section className="relative min-h-[88vh] overflow-hidden bg-slate-950 text-white">
        <Image
          src="/assets/images/modern-office.jpg"
          alt="Equipo trabajando en una oficina moderna"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.42]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-slate-950/85 to-slate-950/35" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(to_top,#fff_0%,rgba(255,255,255,0.92)_18%,rgba(255,255,255,0.62)_44%,rgba(255,255,255,0.22)_72%,transparent_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 pb-20 pt-32 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-200">
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              Servicios & Soluciones Geimser
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              Tecnología, personas e infraestructura para que tu negocio opere mejor
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
              Diseñamos, implementamos y operamos soluciones que conectan atención al cliente, automatización, talento especializado y presencia profesional.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#00B8F1] px-6 py-3 font-bold text-black shadow-[0_0_24px_rgba(0,184,241,0.35)] transition hover:bg-cyan-300"
              >
                Agendar diagnóstico
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center rounded-lg border border-cyan-200/25 bg-slate-950/70 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-slate-900"
              >
                Ver catálogo
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-600">
              Relato de oferta
            </p>
            <h2 className="text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
              No vendemos piezas sueltas: armamos capacidad para resolver problemas reales
            </h2>
          </motion.div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-lg leading-relaxed text-slate-600"
          >
            La diferencia está en combinar consultoría práctica, ejecución tecnológica, equipo humano e infraestructura. Así cada servicio queda conectado a un resultado: atender mejor, vender más ordenado, operar con continuidad y escalar sin perder control.
          </motion.p>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl gap-4 md:grid-cols-3">
          {outcomes.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { delay: index * 0.08, duration: 0.45 } },
                }}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6"
              >
                <Icon className="mb-5 h-8 w-8 text-cyan-600" />
                <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="catalogo" className="bg-slate-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-600">
                Catálogo estratégico
              </p>
              <h2 className="text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
                Seis líneas de solución, una sola operación integrada
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-slate-600">
              El catálogo actualizado combina transformación digital, protección operacional, datos, talento, energía y experiencia de cliente. Cada línea puede operar de forma independiente o como parte de una hoja de ruta mayor.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {solutionPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.article
                  key={pillar.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.22 }}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { delay: index * 0.06, duration: 0.45 } },
                  }}
                  className="group relative min-h-[430px] overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-white shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-300/80"
                >
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-78"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950/72 to-slate-950/12" />
                  <div className="relative flex min-h-[430px] flex-col justify-end p-5">
                    <div className="mb-auto flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-300/20 backdrop-blur">
                      <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-lg border border-white/10 bg-black/35 px-3 py-1 text-xs font-bold text-cyan-100 backdrop-blur">
                        {pillar.metric}
                      </span>
                    </div>
                    <h3 className="mb-3 text-2xl font-extrabold leading-tight">{pillar.title}</h3>
                    <p className="mb-5 leading-relaxed text-slate-200">{pillar.promise}</p>
                    <div className="mb-5 flex flex-wrap gap-2">
                      {pillar.services.slice(0, 3).map((service) => (
                        <span key={service} className="rounded-lg border border-cyan-300/25 bg-[#07101f]/85 px-3 py-1 text-xs font-bold text-cyan-100 shadow-sm backdrop-blur">
                          {service}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedSolution(pillar)}
                      className="inline-flex w-full items-center justify-center rounded-lg border border-cyan-300/35 bg-[#00B8F1] px-4 py-3 text-sm font-extrabold text-black shadow-[0_0_18px_rgba(0,184,241,0.22)] transition hover:bg-cyan-300"
                    >
                      Explorar solución
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-600">
                  Ecosistema de respaldo
                </p>
                <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                  Partners y capacidades que sostienen la operación
                </h3>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600">
                La propuesta se apoya en infraestructura, data, CRM, energía, automatización y CX para dar continuidad real a cada solución.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ecosystem.map(([name, area]) => (
                <div key={name} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="font-bold text-slate-950">{name}</p>
                  <p className="mt-1 text-sm text-slate-600">{area}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="pack-emprendedor" className="bg-[#050b18] px-6 py-20 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
              Oferta paquetizada
            </p>
            <h2 className="mb-6 text-3xl font-extrabold tracking-normal sm:text-5xl">
              Pack Emprendedor
            </h2>
            <p className="mb-6 text-xl font-semibold text-white">
              Una base digital y operativa para negocios que necesitan imagen, atención y presencia comercial desde el primer día.
            </p>
            <p className="mb-8 max-w-xl leading-relaxed text-slate-300">
              Es una entrada concreta al ecosistema Geimser: web, pagos, agenda, teléfono, atención, reportes y oficina flexible, ajustado según rubro y urgencia comercial.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['Activar', 'Presencia digital y canales base'],
                ['Atender', 'Recados, teléfono y soporte'],
                ['Crecer', 'Reportes y mejoras por etapa'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-lg border border-cyan-400/20 bg-[#0d1728] p-4">
                  <p className="font-bold text-white">{title}</p>
                  <p className="mt-1 text-sm text-slate-300">{text}</p>
                </div>
              ))}
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#00B8F1] px-6 py-3 font-bold text-black shadow-[0_0_24px_rgba(0,184,241,0.28)] transition hover:bg-cyan-300"
            >
              Diseñar mi pack
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            className="relative overflow-hidden rounded-lg border border-cyan-400/20 bg-[#0b1424] shadow-2xl shadow-black/35"
          >
            <div className="relative aspect-[16/10] min-h-[360px]">
              <Image
                src="/assets/images/pack-emprendedor-real.png"
                alt="Pack Emprendedor con sitio web, pagos, agenda y atención profesional"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050b18]/35 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050b18] via-[#050b18]/72 to-transparent p-5 pt-28">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ['Web + pagos', 'Presencia lista para vender'],
                    ['Agenda + teléfono', 'Clientes atendidos con orden'],
                    ['Oficina + reportes', 'Imagen y seguimiento real'],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-lg border border-white/10 bg-[#07101f]/90 p-4 backdrop-blur">
                      <p className="text-sm font-bold text-white">{title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-300">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-2 border-t border-white/10 bg-[#07101f] p-4 sm:grid-cols-2 lg:grid-cols-4">
              {packIncludes.slice(0, 8).map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2">
                    <Icon className="h-4 w-4 flex-none text-cyan-300" />
                    <span className="text-xs font-semibold text-slate-200">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-600">
              Cómo trabajamos
            </p>
            <h2 className="mb-5 text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
              Del diagnóstico a la operación, con una ruta clara
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Cada solución se arma según el momento del cliente. Podemos partir pequeño, ordenar lo urgente y escalar hacia automatización, equipo o infraestructura cuando el negocio lo necesita.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} className="rounded-lg bg-slate-100 p-6">
            <div className="space-y-4">
              {journey.map(([step, title, text]) => (
                <div key={step} className="grid grid-cols-[56px_1fr] gap-4 rounded-lg bg-white p-5 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 font-black text-cyan-300">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-16 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex gap-3">
              <BriefcaseBusiness className="h-9 w-9 text-cyan-300" />
              <Layers3 className="h-9 w-9 text-slate-300" />
              <BadgeCheck className="h-9 w-9 text-cyan-300" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-normal">
              Cuéntanos qué necesitas resolver y armamos la solución correcta
            </h2>
            <p className="mt-3 text-slate-300">
              Partimos por entender tu operación y te proponemos una combinación realista de servicios, tecnología y soporte.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[#00B8F1] px-6 py-3 font-bold text-black transition hover:bg-cyan-300"
            >
              Hablar con Geimser
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <Link
              href="/nosotros"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Conocer respaldo
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {selectedSolution && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md" onClick={() => setSelectedSolution(null)}>
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative min-h-[260px] overflow-hidden bg-slate-950 text-white">
              <Image src={selectedSolution.image} alt={selectedSolution.title} fill sizes="100vw" className="object-cover opacity-55" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-slate-950/80 to-slate-950/20" />
              <button
                type="button"
                onClick={() => setSelectedSolution(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
                aria-label="Cerrar detalle"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative z-10 max-w-3xl p-6 sm:p-8">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">{selectedSolution.metric}</p>
                <h3 className="mb-4 text-3xl font-extrabold sm:text-5xl">{selectedSolution.title}</h3>
                <p className="text-lg leading-relaxed text-slate-200">{selectedSolution.impact}</p>
              </div>
            </div>
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_0.95fr]">
              <div className="grid gap-4">
                {[
                  ['El problema', selectedSolution.problem],
                  ['Cómo lo resolvemos', selectedSolution.solution],
                  ['Qué obtiene el cliente', selectedSolution.result],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-700">{title}</p>
                    <p className="mt-2 leading-relaxed text-slate-700">{text}</p>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="mb-4 text-xl font-extrabold text-slate-950">Qué incluye</h4>
                <div className="grid gap-3">
                {selectedSolution.services.map((service) => (
                  <div key={service} className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-800">
                    <CheckCircle2 className="mr-3 h-5 w-5 flex-none text-cyan-600" />
                    {service}
                  </div>
                ))}
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
                >
                  Conversar esta solución
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
