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

const HomePage: React.FC = () => {
  return (
    <main className="bg-gray-950 text-white">
      <Navbar />
      <Hero />
      <div id="about"><About /></div>
      <div id="solutions"><Solutions /></div>
      <div id="infrastructure"><Infrastructure /></div>
      <div id="success"><SuccessCases /></div>
      <div id="benefits"><Benefits /></div>
      <div id="implementation"><ImplementationSteps /></div>
      <div id="offices"><Offices /></div>
      <div id="partners"><PartnersSection /></div>
      <div id="contact"><Footer /></div>
    </main>
  );
}

export default HomePage;