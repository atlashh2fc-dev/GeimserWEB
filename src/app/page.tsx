'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ClientsShowcase from '@/components/ClientsShowcase';
import Solutions from '@/components/Solutions';
import SuccessCases from '@/components/SuccessCases';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';

const HomePage: React.FC = () => {
  return (
    // Sin clases que fijen colores; hereda de variables CSS
    <main className="bg-black">
      <Navbar />
      <Hero />
      <ScrollReveal delay={0.1} className="relative z-20" width="100%">
        <div id="clients"><ClientsShowcase /></div>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="relative z-20 bg-white" width="100%">
        <div id="solutions"><Solutions /></div>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="relative z-20 bg-white" width="100%">
        <div id="success"><SuccessCases /></div>
      </ScrollReveal>
      <div id="contact"><Footer /></div>
    </main>
  );
}
export default HomePage;
