'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Eye,
  Handshake,
  HeartHandshake,
  Info,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

const pillars = [
  {
    icon: Users,
    title: 'Cercanía',
    text: 'Escuchamos antes de proponer y cuidamos que cada relación tenga seguimiento real.',
  },
  {
    icon: Eye,
    title: 'Claridad',
    text: 'Trabajamos con conversaciones simples, responsables visibles y criterios compartidos.',
  },
  {
    icon: Target,
    title: 'Compromiso',
    text: 'Nos hacemos cargo de avanzar con orden, medición y responsabilidad sobre lo acordado.',
  },
];

const trustItems = [
  'Somos un equipo multidisciplinario con experiencia en operación, tecnología y gestión de clientes.',
  'Trabajamos con procesos claros para mantener continuidad, trazabilidad y calidad en la ejecución.',
  'Construimos relaciones de largo plazo, con acompañamiento cercano y foco en confianza.',
];

const identityBlocks = [
  {
    title: 'Qué nos mueve',
    text: 'Ayudar a que las organizaciones avancen con más orden, mejor comunicación y una operación capaz de sostener el crecimiento.',
  },
  {
    title: 'Cómo nos relacionamos',
    text: 'Con una mirada práctica: entender el contexto, alinear expectativas y trabajar con transparencia en cada etapa.',
  },
  {
    title: 'Qué cuidamos',
    text: 'La continuidad, la calidad del servicio, la confianza de los equipos y la experiencia de las personas que interactúan con cada operación.',
  },
];

export default function NosotrosPage() {
  return (
    <main className="bg-white text-slate-950">
      <Navbar />

      <section className="relative min-h-[86vh] overflow-hidden bg-slate-950 text-white">
        <Image
          src="/assets/images/team-hero.jpg"
          alt="Equipo de Geimser colaborando"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(to_top,#fff_0%,rgba(255,255,255,0.92)_18%,rgba(255,255,255,0.62)_44%,rgba(255,255,255,0.22)_72%,transparent_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-7xl items-center px-6 pb-20 pt-32 lg:px-8">
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
              <Info className="mr-2 h-4 w-4" />
              Quiénes somos
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mb-6 text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl lg:text-6xl"
            >
              Un equipo que conecta personas, tecnología y operación para hacer crecer negocios
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
              En Geimser creemos que el crecimiento se sostiene con confianza, criterio operativo y equipos capaces de convertir decisiones en ejecución.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#success"
                className="inline-flex items-center justify-center rounded-lg bg-[#00B8F1] px-6 py-3 font-bold text-black shadow-[0_0_24px_rgba(0,184,241,0.35)] transition hover:bg-cyan-300"
              >
                Ver trayectoria
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center rounded-lg border border-cyan-200/25 bg-slate-950/70 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-slate-900"
              >
                Servicios & soluciones
              </Link>
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
              Nuestra identidad
            </p>
            <h2 className="text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
              Una compañía construida sobre confianza, criterio y ejecución responsable
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.article
                  key={pillar.title}
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
                  <h3 className="mb-3 text-xl font-bold text-slate-950">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{pillar.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-16 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Award className="mb-4 h-9 w-9 text-cyan-300" />
            <h2 className="text-3xl font-extrabold tracking-normal">
              Por qué confiar en Geimser
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-300">
              Porque entendemos que una buena relación no se sostiene con promesas grandes, sino con cumplimiento, comunicación clara y capacidad de acompañar cuando el negocio se mueve.
            </p>
          </div>
          <div className="grid gap-3">
            {trustItems.map((item) => (
              <div key={item} className="flex rounded-lg border border-cyan-400/15 bg-[#0d1728] p-4">
                <CheckCircle2 className="mr-3 mt-0.5 h-5 w-5 flex-none text-cyan-300" />
                <p className="font-medium text-slate-200">{item}</p>
              </div>
            ))}
          </div>
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
              Lo que cuidamos
            </p>
            <h2 className="text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
              Antes que una oferta, somos una forma de trabajar
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {identityBlocks.map((block, index) => (
              <motion.article
                key={block.title}
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
                className="rounded-lg border border-slate-200 bg-slate-50 p-6"
              >
                <HeartHandshake className="mb-5 h-8 w-8 text-cyan-600" />
                <h3 className="mb-3 text-xl font-bold text-slate-950">{block.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{block.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-lg border border-slate-200 bg-slate-50 p-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex gap-3">
              <Handshake className="h-7 w-7 text-cyan-600" />
              <ShieldCheck className="h-7 w-7 text-slate-700" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-normal text-slate-950">
              Conversemos sobre tu contexto y el momento de tu organización
            </h2>
            <p className="mt-3 text-slate-600">
              Si quieres conocer la oferta concreta, la dejamos separada en Servicios & Soluciones para que el recorrido sea claro.
            </p>
          </div>
          <a
            href="https://wa.me/56974159166?text=Hola%2C%20quiero%20conocer%20mas%20sobre%20Geimser."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-slate-800"
          >
            Hablemos
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
