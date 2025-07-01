'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
// import CalendlyWidget from './CalendlyWidget'; // Removed unused import

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return; // Don't run scroll listener until mounted

    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Debounce scroll events to prevent flickering
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
      }, 150);

      const scrollY = window.scrollY;
      const shouldBeScrolled = scrollY > 50;
      
      // Only update state if it actually changes
      if (shouldBeScrolled !== scrolled) {
        setScrolled(shouldBeScrolled);
      }
      
      // Determine active section based on scroll position
      const sections = ['home', 'services', 'portfolio', 'contact'];
      let currentSection = 'home';
      for (const sectionId of sections.reverse()) { 
        const element = document.getElementById(sectionId);
        if (element && scrollY >= element.offsetTop - 200) {
          currentSection = sectionId;
          break;
        }
      }
      // If scrolled to the very top, ensure 'home' is active
      if (scrollY < 100 && document.getElementById('home')) {
         currentSection = 'home';
      }
      
      // Only update active section if it changes
      setActiveSection(prev => prev !== currentSection ? currentSection : prev);
    };

    // Use passive listener for better performance on mobile
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once on mount to set initial state correctly
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [hasMounted, scrolled]);
  
  // Handle smooth scrolling to sections
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Offset for navbar height
        behavior: 'smooth'
      });
      
      // Update URL hash without jumping
      history.pushState(null, '', `#${sectionId}`);
      
      // Update active section
      setActiveSection(sectionId);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
        setMobileMenuOpen(false);
        setActiveSection(sectionId);
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out ${
        hasMounted && scrolled 
          ? 'py-3 bg-black/50 backdrop-blur-md' 
          : 'py-4 bg-transparent'
      }`}
      style={{
        boxShadow: hasMounted && scrolled 
          ? '0 4px 20px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(144, 58, 231, 0.15)' 
          : 'none',
        willChange: 'background-color, backdrop-filter, box-shadow, padding',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex justify-between items-center px-6 relative z-10">
        {/* Logo/Brand with enhanced styling */}
        <Link href="/" className="text-3xl font-bold text-white group relative inline-block">
          <div className="flex items-center">
            <span>True</span>
            <span className="text-[#B24CF0] relative inline-block group-hover:scale-105 transition-all duration-300">
              Node
              <span className="absolute -inset-1 bg-gradient-to-r from-[#B24CF0]/20 to-transparent rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </span>
          </div>
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#B24CF0] via-[#1B6CF2] to-[#B24CF0] opacity-70 group-hover:opacity-100 transition-opacity duration-300" style={{backgroundSize: "200% 100%", animation: "gradient 3s ease infinite"}}></div>
        </Link>
        
        {/* Desktop Navigation - Enhanced with accessibility */}
        <div className="hidden md:flex items-center space-x-10">
          <a 
            href="#services" 
            className={`text-white hover:text-accent transition-colors duration-200 relative ${
              activeSection === 'services' ? 'text-accent' : ''
            }`}
            onClick={(e) => handleSectionClick(e, 'services')}
            onKeyDown={(e) => handleKeyDown(e, 'services')}
            tabIndex={0}
            role="button"
            aria-current={activeSection === 'services' ? 'page' : undefined}
          >
            Services
            {activeSection === 'services' && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
            )}
          </a>
          <a 
            href="#portfolio" 
            className={`text-white hover:text-accent transition-colors duration-200 relative ${
              activeSection === 'portfolio' ? 'text-accent' : ''
            }`}
            onClick={(e) => handleSectionClick(e, 'portfolio')}
            onKeyDown={(e) => handleKeyDown(e, 'portfolio')}
            tabIndex={0}
            role="button"
            aria-current={activeSection === 'portfolio' ? 'page' : undefined}
          >
            Portfolio
            {activeSection === 'portfolio' && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
            )}
          </a>
          <a 
            href="#contact" 
            className={`text-white hover:text-accent transition-colors duration-200 relative ${
              activeSection === 'contact' ? 'text-accent' : ''
            }`}
            onClick={(e) => handleSectionClick(e, 'contact')}
            onKeyDown={(e) => handleKeyDown(e, 'contact')}
            tabIndex={0}
            role="button"
            aria-current={activeSection === 'contact' ? 'page' : undefined}
          >
            Contact
            {activeSection === 'contact' && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
            )}
          </a>
          
          {/* Contact Button with wiggle and glow effects */}
          <Link
            href="/booking"
            className="px-6 py-2.5 text-white rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#903AE7] to-[#23B5D3] hover:from-[#A54BF9] hover:to-[#2ECCEB] shadow-lg relative overflow-hidden group"
            aria-label="Book my personal consultation call"
          >
            Book My Call
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none"></span>
          </Link>
        </div>
        
        {/* Mobile Menu Button - Enhanced */}
        <div className="md:hidden">
          <button 
            className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu - Enhanced */}
      <div 
        id="mobile-menu"
        className={`md:hidden absolute w-full bg-black/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[300px] py-4 border-b border-white/10' : 'max-h-0'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="container mx-auto flex flex-col space-y-5 px-6">
          <a 
            href="#services" 
            className={`text-white hover:text-accent py-2 flex items-center ${
              activeSection === 'services' ? 'text-accent' : ''
            }`}
            onClick={(e) => handleSectionClick(e, 'services')}
            onKeyDown={(e) => handleKeyDown(e, 'services')}
            tabIndex={mobileMenuOpen ? 0 : -1}
            role="button"
            aria-current={activeSection === 'services' ? 'page' : undefined}
          >
            <span className="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </span>
            Services
          </a>
          <a 
            href="#portfolio" 
            className={`text-white hover:text-accent py-2 flex items-center ${
              activeSection === 'portfolio' ? 'text-accent' : ''
            }`}
            onClick={(e) => handleSectionClick(e, 'portfolio')}
            onKeyDown={(e) => handleKeyDown(e, 'portfolio')}
            tabIndex={mobileMenuOpen ? 0 : -1}
            role="button"
            aria-current={activeSection === 'portfolio' ? 'page' : undefined}
          >
            <span className="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </span>
            Portfolio
          </a>
          <a 
            href="#contact" 
            className={`text-white hover:text-accent py-2 flex items-center ${
              activeSection === 'contact' ? 'text-accent' : ''
            }`}
            onClick={(e) => handleSectionClick(e, 'contact')}
            onKeyDown={(e) => handleKeyDown(e, 'contact')}
            tabIndex={mobileMenuOpen ? 0 : -1}
            role="button"
            aria-current={activeSection === 'contact' ? 'page' : undefined}
          >
            <span className="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>
            Contact
          </a>
          
          {/* Contact Button - mobile */}
          <Link
            href="/booking"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-white bg-gradient-to-r from-[#903AE7] to-[#23B5D3] hover:from-[#A54BF9] hover:to-[#2ECCEB] px-5 py-3 rounded-lg font-medium transition-all duration-300 mt-4 flex items-center justify-center gap-2"
            aria-label="Book my personal consultation call"
            tabIndex={mobileMenuOpen ? 0 : -1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Book My Call
          </Link>
        </div>
      </div>
      
      {/* Styles for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 
