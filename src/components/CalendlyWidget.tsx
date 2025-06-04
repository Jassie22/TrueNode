'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

interface CalendlyWidgetProps {
  className?: string;
  buttonText?: string;
}

const CalendlyWidget = ({ className = '', buttonText = 'Schedule time with me' }: CalendlyWidgetProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
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

  const handleBookingClick = () => {
    // Navigate immediately without waiting for animations
    router.push('/booking');
  };

  return (
    <>      
      {/* Enhanced booking navigation button with improved gradient and size */}
      <button 
        ref={buttonRef}
        onClick={handleBookingClick}
        className={`calendly-open ${className} relative px-8 py-4 text-lg font-bold text-white rounded-full bg-gradient-to-r from-[#903AE7] to-[#23B5D3] hover:from-[#A54BF9] hover:to-[#2ECCEB] transition-all duration-300 w-full sm:w-auto text-center`}
        style={{ transform: 'translateZ(0)', willChange: 'transform, box-shadow' }}
      >
        <span className="relative z-10 flex items-center justify-center">
          {buttonText}
          <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </span>
      </button>
    </>
  );
};

export default CalendlyWidget; 