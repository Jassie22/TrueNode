'use client';

import React from 'react';
// import Image from 'next/image'; // Removed unused import
import Hero from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TeamSection from '@/components/TeamSection';
import GoogleReadySection from '@/components/GoogleReadySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ChatbotPopup from '@/components/ChatbotPopup';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-darker text-text-primary relative overflow-visible">
      <Navbar />
      
      <div className="relative">
        <div className="gradient-blur hero-glow performance-optimized"></div>
        <Hero />
      </div>
      
      <div className="relative z-10" id="services">
        <div className="gradient-blur services-glow performance-optimized"></div>
        <ServicesSection />
      </div>
      
      <div className="relative z-10" id="seo-checklist">
        <div className="gradient-blur tech-glow performance-optimized"></div>
        <GoogleReadySection />
      </div>
      
      <div className="relative z-10" id="portfolio">
        <div className="gradient-blur portfolio-glow performance-optimized"></div>
        <PortfolioSection />
      </div>
      
      <div className="relative z-10" id="team">
        <div className="gradient-blur team-glow performance-optimized absolute inset-0 -z-10"></div>
        <TeamSection />
      </div>
      
      <div className="relative z-10" id="technologies">
        <div className="gradient-blur tech-glow performance-optimized"></div>
      </div>
      
      <div className="relative z-10" id="contact">
        <div className="gradient-blur contact-glow performance-optimized absolute inset-0 -z-10"></div>
        <ContactSection />
      </div>
      
      <Footer />
      <ChatbotPopup />
    </main>
  );
} 