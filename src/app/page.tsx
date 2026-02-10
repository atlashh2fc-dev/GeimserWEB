'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Solutions from '@/components/Solutions';
import Infrastructure from '@/components/Infrastructure';
import Offices from '@/components/Offices';
import SuccessCases from '@/components/SuccessCases';
import Benefits from '@/components/Benefits';
import ImplementationSteps from '@/components/ImplementationSteps';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';

const HomePage: React.FC = () => {
  return (
    // Sin clases que fijen colores; hereda de variables CSS
    <main className="bg-black">
      <Navbar />
      <Hero />
      <ScrollReveal delay={0.1} className="relative z-20 bg-white" width="100%">
        <div id="about"><About /></div>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="relative z-20 bg-white" width="100%">
        <div id="solutions"><Solutions /></div>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="relative z-20 bg-white" width="100%">
        <div id="infrastructure"><Infrastructure /></div>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="relative z-20 bg-white" width="100%">
        <div id="success"><SuccessCases /></div>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="relative z-20 bg-white" width="100%">
        <div id="benefits"><Benefits /></div>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="relative z-20 bg-white" width="100%">
        <div id="implementation"><ImplementationSteps /></div>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="relative z-20 bg-white" width="100%">
        <div id="offices"><Offices /></div>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="relative z-20 bg-white" width="100%">
        <div id="partners"><PartnersSection /></div>
      </ScrollReveal>
      <div id="contact"><Footer /></div>
    </main>
  );
}
export default HomePage;