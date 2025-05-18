'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import gsap from 'gsap';

interface CalendlyWidgetProps {
  className?: string;
  buttonText?: string;
}

const CalendlyWidget = ({ className = '', buttonText = 'Schedule time with me' }: CalendlyWidgetProps) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This ensures Calendly is defined when the component mounts
    if (typeof window !== 'undefined' && window.Calendly) {
      console.log('Calendly is loaded and ready');
    }

    // Create eye-catching button animation without wiggle
    if (buttonRef.current) {
      // Enhanced pulsing glow animation
      gsap.to(buttonRef.current, {
        boxShadow: '0 0 30px rgba(144, 58, 231, 0.5), 0 0 50px rgba(35, 181, 211, 0.3)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Create hover animation effect with enhanced glow
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          boxShadow: '0 0 40px rgba(144, 58, 231, 0.7), 0 0 60px rgba(35, 181, 211, 0.5)',
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          boxShadow: '0 0 30px rgba(144, 58, 231, 0.5), 0 0 50px rgba(35, 181, 211, 0.3)',
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }
  }, []);

  const openCalendly = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Add click animation
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        onComplete: () => {
          gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 0.2
          });
        }
      });
    }
    
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/jasmeendahak03/30min'
      });
      return false;
    }
  };

  return (
    <>
      {/* Calendly CSS */}
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      
      {/* Calendly JS */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      
      {/* Enhanced Calendly link with improved gradient and size */}
      <a 
        ref={buttonRef}
        href="#" 
        onClick={openCalendly}
        className={`calendly-open ${className} relative px-8 py-4 text-lg font-bold text-white rounded-full bg-gradient-to-r from-[#903AE7] to-[#23B5D3] hover:from-[#A54BF9] hover:to-[#2ECCEB] transition-all duration-300 w-full sm:w-auto text-center`}
        style={{ transform: 'translateZ(0)', willChange: 'transform, box-shadow' }}
      >
        <span className="relative z-10 flex items-center justify-center">
          {buttonText}
          <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </a>
    </>
  );
};

// Add type definition for the Calendly global object
declare global {
  interface Window {
    Calendly: any;
  }
}

export default CalendlyWidget; 