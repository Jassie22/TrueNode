'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface SubService {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  details: string[];
  subServices: SubService[];
}

export interface ServiceCardProps {
  service: Service;
  active: boolean;
  expanded: boolean;
  onHover: () => void;
  onLeave: () => void;
  onToggleExpand: () => void;
}

const ServiceCard = ({
  service,
  active,
  expanded,
  onHover,
  onLeave,
  onToggleExpand,
}: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLUListElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Details to display - always show 3 by default, only expand on active/expanded
  const maxVisibleDetails = isMobile 
    ? (expanded ? service.details.length : 3)
    : (active || expanded) ? service.details.length : 3;
  
  // Separate visible and hidden details
  const visibleDetails = service.details.slice(0, maxVisibleDetails);
  const hasMoreDetails = isMobile && service.details.length > maxVisibleDetails && !expanded;
  
  // Handle initial animation and hover effects
  useEffect(() => {
    if (!cardRef.current) return;
    
    // Skip hover effects on mobile
    if (isMobile) return;
    
    // Set up card hover animations
    const card = cardRef.current;
    
    // Handle mouse movement for 3D effect and glow
    const handleMouseMove = (e: MouseEvent) => {
      if (!card || !glowRef.current) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element
      
      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 4; // Max 4 degrees rotation
      const rotateX = ((centerY - y) / centerY) * 4; // Max 4 degrees rotation
      
      // Apply rotation transform
      gsap.to(card, {
        rotateY: rotateY,
        rotateX: rotateX,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000,
        transformOrigin: 'center'
      });
      
      // Move glow to follow mouse
      gsap.to(glowRef.current, {
        x: x - 100,
        y: y - 100,
        opacity: 0.15,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    // Handle mouse leave - reset card to original position
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
      
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0,
          duration: 0.3
        });
      }
    };
    
    // Add event listeners
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    // Clean up event listeners
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);
  
  // Handle active state animations
  useEffect(() => {
    if (!cardRef.current || !iconRef.current || !contentRef.current || !detailsRef.current) return;
    
    // Skip animations on mobile
    if (isMobile) return;
    
    if (active || expanded) {
      // Expand card with a smoother, more elegant animation
      gsap.to(cardRef.current, {
        y: -10,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(160, 32, 240, 0.15)',
        backgroundColor: 'rgba(30, 30, 40, 0.9)',
        borderColor: 'rgba(160, 32, 240, 0.25)'
      });
      
      // Animate icon with smoother animation
      gsap.to(iconRef.current, {
        scale: 1.15,
        y: -3,
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      // Collapse card with smoother animation
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(25, 25, 35, 0.5)',
        borderColor: 'rgba(255, 255, 255, 0.05)'
      });
      
      // Reset icon with smoother animation
      gsap.to(iconRef.current, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, [active, expanded, isMobile]);

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden backdrop-blur-sm rounded-2xl p-4 sm:p-6 h-full transform transition-all duration-500 border border-white/5 ${!isMobile ? 'hover:border-accent/20 hover:shadow-glow-accent/20' : ''}`}
      style={{
        backgroundColor: 'rgba(25, 25, 35, 0.5)',
        transformStyle: 'preserve-3d',
        willChange: 'transform, box-shadow'
      }}
      onClick={isMobile ? onToggleExpand : undefined}
      onMouseEnter={isMobile ? undefined : onHover}
      onMouseLeave={isMobile ? undefined : onLeave}
    >
      {/* Enhanced glow effect that appears on hover - disabled on mobile */}
      {!isMobile && (
        <div 
          ref={glowRef}
          className="absolute w-[250px] h-[250px] rounded-full bg-gradient-to-br from-accent/30 to-[#1B6CF2]/20 opacity-0 blur-[80px] pointer-events-none transition-opacity duration-500 ease-in-out group-hover:opacity-40"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
      
      {/* Pulse glow border that activates on hover - disabled on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/40 to-accent-blue/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse-glow"></div>
        </div>
      )}
      
      {/* Decorative accents */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
        <div className="absolute top-6 right-0 w-full h-px bg-gradient-to-r from-accent-light/0 via-accent/30 to-accent-light/0 transform -rotate-45"></div>
        <div className="absolute top-0 right-6 h-full w-px bg-gradient-to-b from-accent-light/0 via-[#1B6CF2]/30 to-accent-light/0 transform -rotate-45"></div>
      </div>
      
      {/* Service content */}
      <div ref={contentRef} className="relative z-10">
        {/* Service header with icon */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white">{service.title}</h3>
          {!isMobile && (
            <div 
              ref={iconRef}
              className="ml-2 relative transform transition-all duration-300 origin-right"
            >
              <div className="w-10 h-10 flex items-center justify-center relative transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-blue/10 rounded-full opacity-30 group-hover:opacity-70 transition-all duration-300"></div>
                <Image 
                  src={service.icon || '/images/placeholder-icon.svg'} 
                  alt={service.title}
                  width={24}
                  height={24}
                  className="object-contain group-hover:scale-125 transition-transform duration-300 filter drop-shadow-glow z-10 relative"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Service description - only show on desktop or when expanded on mobile */}
        {(!isMobile || expanded) && (
          <p className="text-white/70 text-sm leading-relaxed mb-3">{service.description}</p>
        )}
        
        {/* Service details - show on desktop (when active/expanded) or mobile (always, but limited to 3 unless expanded) */}
        {((!isMobile && (active || expanded)) || isMobile) && (
          <div className="mt-4">
            <h4 className="text-white/90 text-base font-medium mb-2">Key Features:</h4>
            <ul ref={detailsRef} className="space-y-2">
              {visibleDetails.map((detail, index) => (
                <li key={index} className="text-white/70 text-sm flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            
            {/* Show More button for mobile */}
            {hasMoreDetails && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand();
                }}
                className="mt-3 text-accent text-sm font-medium hover:text-accent-light transition-colors duration-200 flex items-center"
              >
                Show More ({service.details.length - 3} more)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            
            {/* Show Less button for mobile when expanded */}
            {isMobile && expanded && service.details.length > 3 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand();
                }}
                className="mt-3 text-accent text-sm font-medium hover:text-accent-light transition-colors duration-200 flex items-center"
              >
                Show Less
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard; 