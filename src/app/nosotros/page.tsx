'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BrainCircuit,
  CheckCircle2,
  Handshake,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
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
    title: 'Talento humano',
    text: 'Equipos preparados para atender, operar y resolver con criterio.',
  },
  {
    icon: BrainCircuit,
    title: 'Tecnología aplicada',
    text: 'Automatización, IA y sistemas que mejoran la experiencia sin perder cercanía.',
  },
  {
    icon: Target,
    title: 'Resultados medibles',
    text: 'Gestionamos con indicadores claros para que cada avance se pueda evaluar.',
  },
];

const trustItems = [
  'Operamos con foco en experiencia de cliente, tecnología y continuidad operaciónal.',
  'Integramos soluciones digitales con equipos humanos especializados.',
  'Acompañamos desde el diagnóstico hasta la mejora continua.',
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
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />

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
              <Sparkles className="mr-2 h-4 w-4" />
              Quiénes somos
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mb-6 text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl lg:text-6xl"
            >
              Un equipo que conecta personas, tecnología y operación para hacer crecer negocios
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
              En Geimser combinamos experiencia de cliente, soluciones digitales y talento especializado para resolver desafíos reales con una operación clara, medible y escalable.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center rounded-lg bg-[#00B8F1] px-6 py-3 font-bold text-black shadow-[0_0_24px_rgba(0,184,241,0.35)] transition hover:bg-cyan-300"
              >
                Ver servicios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/#success"
                className="inline-flex items-center justify-center rounded-lg border border-cyan-200/25 bg-slate-950/70 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-slate-900"
              >
                Ver casos de éxito
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
              Nuestra forma de trabajar
            </p>
            <h2 className="text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
              No vendemos solo herramientas: armamos capacidad operativa para que las cosas pasen
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
              Por qué Geimser
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-300">
              Porque entendemos que crecer no depende solo de tecnología ni solo de personas. Depende de integrar ambas con procesos simples, seguimiento y responsabilidad sobre el resultado.
            </p>
          </div>
          <div className="grid gap-3">
            {trustItems.map((item) => (
              <div key={item} className="flex rounded-lg border border-white/10 bg-white/5 p-4">
                <CheckCircle2 className="mr-3 mt-0.5 h-5 w-5 flex-none text-cyan-300" />
                <p className="font-medium text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <About />

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-lg border border-slate-200 bg-slate-50 p-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex gap-3">
              <Handshake className="h-7 w-7 text-cyan-600" />
              <ShieldCheck className="h-7 w-7 text-slate-700" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-normal text-slate-950">
              Hablemos de cómo Geimser puede apoyar tu siguiente etapa
            </h2>
            <p className="mt-3 text-slate-600">
              Revisamos tu contexto y te recomendamos una ruta realista entre servicios, tecnología y operación.
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
