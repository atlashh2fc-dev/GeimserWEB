'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  CreditCard,
  Globe2,
  Headphones,
  MapPin,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const whatsappUrl =
  'https://wa.me/56974159166?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20Pack%20Emprendedor%20de%20Geimser.';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

const services = [
  {
    icon: MessageSquare,
    title: 'Experiencia de Cliente',
    text: 'Atención omnicanal, soporte, ventas y gestión de conversaciones con foco en continuidad y calidad.',
    points: ['Atención inbound/outbound', 'Soporte especializado', 'Gestión de leads'],
  },
  {
    icon: Code2,
    title: 'Tecnología y Soluciones Digitales',
    text: 'Desarrollo web, automatización, integraciones y sistemas a medida para ordenar la operación.',
    points: ['Webs y apps custom', 'CRM y automatización', 'Integración de pagos'],
  },
  {
    icon: Users,
    title: 'Talento y Gestión de Personas',
    text: 'Perfiles especializados y soporte operativo para equipos que necesitan escalar sin sobrecargarse.',
    points: ['Staffing especializado', 'BPO operativo', 'Gestión administrativa'],
  },
  {
    icon: Building2,
    title: 'Oficina y Soporte Administrativo',
    text: 'Infraestructura flexible, secretaria virtual y recepción profesional para negocios en crecimiento.',
    points: ['Oficina por horas', 'Secretaria virtual', 'Número dedicado'],
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

const audiences = [
  'Emprendedores que están formalizando su negocio.',
  'Profesionales independientes que necesitan imagen corporativa.',
  'Tiendas y servicios que quieren vender o agendar en línea.',
  'Pymes que requieren apoyo administrativo sin contratar equipo interno.',
];

const process = [
  {
    step: '01',
    title: 'Diagnóstico',
    text: 'Revisamos qué vendes, cómo atiendes y qué necesitas activar primero.',
  },
  {
    step: '02',
    title: 'Definición del pack',
    text: 'Armamos la combinación correcta de web, oficina, teléfono y soporte.',
  },
  {
    step: '03',
    title: 'Implementación',
    text: 'Diseñamos los canales digitales y dejamos configurada la operación base.',
  },
  {
    step: '04',
    title: 'Operación y mejora',
    text: 'Te acompañamos con soporte, ajustes y reportes para seguir creciendo.',
  },
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
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/25" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 pb-20 pt-32 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-200"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Servicios Geimser
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mb-6 text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl lg:text-6xl"
            >
              Servicios para operar, vender y crecer con respaldo profesional
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl"
            >
              Tecnología, atención, talento e infraestructura flexible para que tu negocio avance sin armar todo desde cero.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#00B8F1] px-6 py-3 font-bold text-black shadow-[0_0_24px_rgba(0,184,241,0.35)] transition hover:bg-cyan-300"
              >
                Hablar por WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#pack-emprendedor"
                className="inline-flex items-center justify-center rounded-lg border border-cyan-200/25 bg-slate-950/70 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-slate-900"
              >
                Ver Pack Emprendedor
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mb-12 max-w-3xl"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-600">
              Catálogo de servicios
            </p>
            <h2 className="text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
              Todo lo que tu operación necesita, ordenado en una sola mirada
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.08, duration: 0.45 },
                    },
                  }}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-200/70"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-cyan-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-950">{service.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">{service.text}</p>
                  <ul className="space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center text-sm font-medium text-slate-700">
                        <CheckCircle2 className="mr-2 h-4 w-4 flex-none text-cyan-600" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pack-emprendedor" className="bg-slate-950 px-6 py-20 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
              Oferta destacada
            </p>
            <h2 className="mb-6 text-3xl font-extrabold tracking-normal sm:text-5xl">
              Pack Emprendedor
            </h2>
            <p className="mb-6 text-xl font-semibold text-white">
              La base digital y operativa para que tu emprendimiento se vea profesional desde el primer día.
            </p>
            <p className="mb-8 max-w-xl leading-relaxed text-slate-300">
              Combinamos presencia web a medida, soporte administrativo virtual y acceso a oficina física para que puedas vender, atender y reunirte con clientes con una imagen sólida desde el inicio.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['Web custom', 'Sin plantillas genéricas'],
                ['Oficina flexible', 'Santiago Centro'],
                ['Secretaria virtual', 'Atención profesional'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-bold text-cyan-200">{title}</p>
                  <p className="mt-1 text-sm text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.05 },
              },
            }}
            className="rounded-lg border border-white/10 bg-white p-5 text-slate-950 shadow-2xl"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {packIncludes.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="mr-3 flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">{item.label}</span>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-5 rounded-lg bg-slate-950 p-5 text-white">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 flex-none text-cyan-300" />
                <p className="text-sm leading-relaxed text-slate-200">
                  El pack se ajusta según etapa, rubro y urgencia comercial. La idea es partir ordenado, sin sobredimensionar costos.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-600">
              Para quién es
            </p>
            <h2 className="mb-8 text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
              Pensado para negocios que necesitan verse más grandes sin cargar estructura pesada
            </h2>
            <div className="space-y-3">
              {audiences.map((item) => (
                <div key={item} className="flex rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <CheckCircle2 className="mr-3 mt-0.5 h-5 w-5 flex-none text-cyan-600" />
                  <p className="font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            className="rounded-lg bg-slate-100 p-6"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
              Cómo funciona
            </p>
            <div className="space-y-4">
              {process.map((item) => (
                <div key={item.step} className="grid grid-cols-[56px_1fr] gap-4 rounded-lg bg-white p-5 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 font-black text-cyan-300">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.text}</p>
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
            <BriefcaseBusiness className="mb-4 h-9 w-9 text-cyan-300" />
            <h2 className="text-3xl font-extrabold tracking-normal">
              Cuéntanos que estás armando y te proponemos el pack correcto
            </h2>
            <p className="mt-3 text-slate-300">
              Partimos por entender tu negocio y dejamos una ruta clara para activar presencia digital, atención y soporte.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[#00B8F1] px-6 py-3 font-bold text-black transition hover:bg-cyan-300"
            >
              Quiero mi Pack Emprendedor
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <Link
              href="/#solutions"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Ver soluciones
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
