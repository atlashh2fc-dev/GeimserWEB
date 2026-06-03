'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
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
  Sparkles,
  Users,
  Workflow,
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
    icon: MessageSquare,
    title: 'Experiencia de cliente y contact center',
    promise: 'Atención, soporte, ventas y seguimiento por los canales que tus clientes ya usan.',
    services: ['Atención inbound/outbound', 'Soporte especializado', 'Gestión de leads', 'Encuestas NPS/CSAT'],
  },
  {
    icon: Code2,
    title: 'Tecnología, automatización e IA',
    promise: 'Sistemas y flujos digitales que ordenan la operación y reducen tareas manuales.',
    services: ['Sitios y apps a medida', 'CRM y tableros', 'Integración de APIs', 'Automatizaciones con IA'],
  },
  {
    icon: Users,
    title: 'Talento, BPO y soporte operativo',
    promise: 'Equipos y procesos para escalar sin cargar estructura fija ni perder control.',
    services: ['Staffing especializado', 'BPO administrativo', 'Backoffice comercial', 'Gestión de procesos'],
  },
  {
    icon: Building2,
    title: 'Infraestructura flexible y presencia profesional',
    promise: 'Oficina, teléfono, recepción y soporte administrativo para operar con imagen sólida.',
    services: ['Oficina por horas', 'Secretaria virtual', 'Número dedicado', 'Recepción de clientes'],
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

export default function ServiciosPage() {
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
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 pb-20 pt-32 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-200">
              <Sparkles className="mr-2 h-4 w-4" />
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-600">
              Catálogo estratégico
            </p>
            <h2 className="text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
              Cuatro líneas de solución, una sola operación integrada
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
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
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-200/70"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-cyan-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold leading-tight text-slate-950">{pillar.title}</h3>
                  <p className="mb-6 leading-relaxed text-slate-600">{pillar.promise}</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {pillar.services.map((service) => (
                      <div key={service} className="flex items-center rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                        <CheckCircle2 className="mr-2 h-4 w-4 flex-none text-cyan-600" />
                        {service}
                      </div>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pack-emprendedor" className="bg-[#050b18] px-6 py-20 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
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
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.05 } } }}
            className="rounded-lg border border-cyan-400/15 bg-[#0d1728] p-5 text-white shadow-2xl shadow-black/30"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {packIncludes.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.label} variants={fadeUp} className="flex items-center rounded-lg border border-white/10 bg-[#111d31] p-4">
                    <div className="mr-3 flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-100">{item.label}</span>
                  </motion.div>
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
    </main>
  );
}
