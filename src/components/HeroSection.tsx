'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CalendlyWidget from './CalendlyWidget';
import HeroStats from './HeroStats';

interface ScrollTriggerInstance {
  kill: (reset?: boolean) => void;
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const accentBlockRef = useRef<HTMLDivElement>(null);
  const attentionGrabberRef = useRef<HTMLDivElement>(null);
  let businessTextElement: HTMLDivElement | null = null;
  
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Text to animate - RESTORING THESE DEFINITIONS
  const mainHeadingText = "Transform";
  const mainHeadingTextLine2 = "Your Business";
  const subHeadingText = "Custom Websites. Smart Apps. AI That Works for You.";
  
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Mobile check effect
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    try {
      gsap.registerPlugin(ScrollTrigger);
      
      const masterTl = gsap.timeline({
        defaults: { 
          ease: "power3.out",
          duration: 0.3
        },
        delay: 0
      });
      
      // Attention grabber animation - can run before full mount
      if (attentionGrabberRef.current) {
        const grabberElements = attentionGrabberRef.current.querySelectorAll('.attention-element');
        masterTl.fromTo(
          grabberElements,
          { y: -30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.03, duration: 0.4, ease: "back.out(1.2)" },
          0
        );
        grabberElements.forEach((el, index) => {
          gsap.to(el, {
            y: `${Math.sin(index) * 10}px`,
            rotate: Math.random() > 0.5 ? '+=8' : '-=8',
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      }
      
      // Background glow blobs - can run before full mount
      if (backgroundRef.current) {
        const blobs = backgroundRef.current.querySelectorAll('.glow-blob');
        blobs.forEach((blob, index) => {
          gsap.set(blob, {
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            scale: 0.9 + Math.random() * 0.2,
            opacity: 0.7
          });
          gsap.to(blob, {
            x: `+=${Math.random() * 80 - 40}`,
            y: `+=${Math.random() * 80 - 40}`,
            scale: 0.9 + Math.random() * 0.2,
            opacity: 0.6 + Math.random() * 0.4,
            duration: 8 + index * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5
          });
        });
      }

      if (hasMounted) { // Only run main text and CTA animations after component has mounted
        // Extra large first line of text animation - optimized
        if (headingRef.current) {
          headingRef.current.innerHTML = ''; // Clear any SSR content before building
          
          const firstLineContainer = document.createElement('h1');
          firstLineContainer.className = 'text-[18vw] sm:text-[16vw] md:text-[15vw] lg:text-[15vw] xl:text-[14vw] font-bold leading-none tracking-tighter mb-6 md:mb-8 relative overflow-visible text-center md:text-left max-w-full';
          
          const secondLineContainer = document.createElement('div');
          secondLineContainer.className = 'text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] xl:text-[7vw] font-bold leading-none tracking-tighter relative overflow-visible mb-8 md:mb-12 text-center md:text-left max-w-full';
          secondLineContainer.id = 'business-text';
          businessTextElement = secondLineContainer;
          
          const firstLineSpans = [];
          mainHeadingText.split('').forEach((letter, letterIndex) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.className = isMobile ? 'inline-block' : 'inline-block opacity-0 transform translate-y-full';
            letterSpan.dataset.index = letterIndex.toString();
            letterSpan.setAttribute('aria-hidden', 'true');
            firstLineSpans.push(letterSpan);
            firstLineContainer.appendChild(letterSpan);
          });

          const secondLineSpans = [];
          mainHeadingTextLine2.split(' ').forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word;
            wordSpan.setAttribute('aria-hidden', 'true');
            let initialClasses = 'inline-block mr-[1vw] opacity-0 transform translate-y-full transition-all duration-500';

            if (isMobile) {
              if (word.toLowerCase() === 'your') {
                initialClasses += ' text-white'; 
              } else {
                initialClasses += ' text-accent';
              }
            } else {
              initialClasses += ' text-white';
            }
            wordSpan.className = initialClasses;
            secondLineSpans.push(wordSpan);
            secondLineContainer.appendChild(wordSpan);
          });
          
          headingRef.current.appendChild(firstLineContainer);
          headingRef.current.appendChild(secondLineContainer);
          
          const srHeading = document.createElement('span');
          srHeading.className = 'sr-only';
          srHeading.textContent = `${mainHeadingText} ${mainHeadingTextLine2}`;
          headingRef.current.appendChild(srHeading);
          
          const subtitleContainer = document.createElement('div');
          subtitleContainer.className = `text-[4.5vw] sm:text-[3.8vw] md:text-[2.5vw] lg:text-[2.2vw] xl:text-[2vw] font-bold leading-tight tracking-normal relative overflow-visible mt-4 md:mt-6 text-white/90 opacity-0 max-w-[95%] sm:max-w-[85%] mb-3 md:mb-4 text-center md:text-left mx-auto md:mx-0 ${isMobile ? 'hero-subtitle-mobile' : ''}`;
          subtitleContainer.innerHTML = `Custom <span class="text-[#23B5D3] font-bold ${isMobile ? '' : 'cursor-pointer hover:underline'} transition-all" data-nav="services">Websites</span>. Smart <span class="text-[#23B5D3] font-bold ${isMobile ? '' : 'cursor-pointer hover:underline'} transition-all" data-nav="services">Apps</span>.<br>AI That Works for <span class="text-[#23B5D3] font-bold ${isMobile ? '' : 'cursor-pointer hover:underline'} transition-all" data-nav="services">You</span>.`;
          headingRef.current.appendChild(subtitleContainer);
          
          // Add click handlers for navigation (desktop only)
          if (!isMobile) {
            const navElements = subtitleContainer.querySelectorAll('[data-nav="services"]');
            navElements.forEach(element => {
              element.addEventListener('click', () => {
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              });
            });
          }
          
          if (!isMobile) { // Desktop: animate "Transform" letter by letter
            const firstLineLetters = firstLineContainer.querySelectorAll('span');
            gsap.set(firstLineLetters, { opacity: 0, y: '100%' }); 
            masterTl.to(
              firstLineLetters,
              { y: 0, opacity: 1, stagger: 0.015, duration: 0.5, ease: "power4.out" },
              0.2 
            );
            firstLineLetters.forEach((letter) => {
              letter.addEventListener('mouseenter', () => {
                gsap.to(letter, { y: -20, color: '#B24CF0', duration: 0.2, ease: 'power2.out' });
              });
              letter.addEventListener('mouseleave', () => {
                gsap.to(letter, { y: 0, color: 'white', duration: 0.2, ease: 'power2.inOut' });
              });
            });
          } else { // Mobile: animate "Transform" as a block and ensure it is visible
            firstLineContainer.classList.add('opacity-0', 'transform', 'translate-y-full');
            masterTl.to(
              firstLineContainer, 
              { y: 0, opacity: 1, duration: 0.5, ease: "power4.out" },
              0.2
            );
          }
          
          const secondLineWords = secondLineContainer.querySelectorAll('span');
          // Animate both "Your" and "Business" words together
          masterTl.to(
            secondLineWords,
            { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.02 },
            '+=0.1' // Chain after first line with a small delay
          );
          masterTl.to(
            subtitleContainer,
            { opacity: 1, duration: 0.5, ease: "power2.inOut" },
            '+=0.05' // Chain after "Business"
          );
          
          gsap.to(firstLineContainer, {
            scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
            x: -100, ease: "none"
          });
          gsap.to(secondLineContainer, {
            scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
            x: 100, ease: "none"
          });

          if (businessTextElement && !isMobile) { // Hover effects only on desktop
            const businessWords = businessTextElement.querySelectorAll('span');
            businessWords.forEach(word => {
                word.addEventListener('mouseenter', () => {
                    const currentWordText = word.textContent?.toLowerCase();
                    if (currentWordText === 'your' || currentWordText === 'business') { 
                        gsap.to(word, { color: '#903ae7', scale: 1.1, duration: 0.3, ease: 'back.out(1.7)' });
                    }
                });
                word.addEventListener('mouseleave', () => {
                    const currentWordText = word.textContent?.toLowerCase();
                    if (currentWordText === 'your' || currentWordText === 'business') { 
                        gsap.to(word, { color: 'white', scale: 1, duration: 0.3, ease: 'back.in(1.7)' });
                    }
                });
            });
          }
        }

        // CTA buttons animation - also depends on hasMounted
        const ctaGroup = document.getElementById('hero-cta-group');
        if (ctaGroup && ctaContainerRef.current) {
          masterTl.fromTo(
            ctaGroup,
            { y: 30, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" },
            '-=0.1'
          );
        }

        // Stats wrapper animation - also depends on hasMounted
        const statsWrapper = document.getElementById('hero-stats-wrapper');
        if (statsWrapper) {
            masterTl.fromTo(
                statsWrapper,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
                '-=0.1'
            );
        }
      } // End of if(hasMounted) for main animations

      const scrollTriggerInstance = ScrollTrigger.getById('heroScrollTrigger');
      if (scrollTriggerInstance) {
        //scrollTriggerInstance.kill();
      }      

    } catch (error) {
      console.warn("Error in HeroSection animations:", error);
    }
    
    return () => {
      gsap.killTweensOf('.glow-blob, .attention-element, #hero-stats-wrapper');
      if (headingRef.current) {
        gsap.killTweensOf(headingRef.current.querySelectorAll('span'));
        gsap.killTweensOf(headingRef.current.querySelectorAll('div'));
      }
      if (ctaContainerRef.current) {
        gsap.killTweensOf(ctaContainerRef.current.querySelectorAll('button, a'));
      }
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
      window.removeEventListener('resize', checkMobile);
    };
  }, [hasMounted, isMobile, mainHeadingText, mainHeadingTextLine2]); // Added hasMounted and isMobile to dependency array

  useEffect(() => {
    // This effect sets hasMounted to true after the initial render.
    setHasMounted(true);
  }, []);

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="min-h-[120vh] flex flex-col items-center justify-center pt-32 pb-20 relative overflow-hidden section-fluid-motion fade-in-section section-overlap-bottom"
    >
      {/* Animated background with blobs */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 overflow-visible"
      >
        {/* Mobile-specific subtle purple background overlay */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-br from-purple-900/10 via-purple-800/5 to-purple-900/8 opacity-60"></div>
        
        {/* Glow blobs - Made larger and moved lower */}
        <div className="glow-blob absolute w-[700px] h-[700px] rounded-full bg-accent/5 blur-[120px] top-[30%] left-[10%] opacity-60"></div>
        <div className="glow-blob absolute w-[800px] h-[800px] rounded-full bg-accent-blue/5 blur-[150px] bottom-[20%] right-[5%] opacity-50"></div>
        <div className="glow-blob absolute w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[100px] top-[50%] right-[30%] opacity-40"></div>
        
        {/* Mobile-specific purple glow elements */}
        <div className="md:hidden">
          <div className="glow-blob absolute w-[400px] h-[400px] rounded-full bg-purple-500/8 blur-[80px] top-[20%] left-[15%] opacity-60"></div>
          <div className="glow-blob absolute w-[350px] h-[350px] rounded-full bg-accent/6 blur-[70px] bottom-[30%] right-[10%] opacity-50"></div>
          <div className="glow-blob absolute w-[300px] h-[300px] rounded-full bg-purple-600/7 blur-[60px] top-[60%] left-[20%] opacity-45"></div>
        </div>
      </div>
      
      {/* Eye-catching animation at the top - moved lower */}
      <div 
        ref={attentionGrabberRef}
        className="absolute top-[15%] left-0 right-0 h-32 pointer-events-none z-10 justify-center items-center overflow-visible hidden md:flex"
      >
        <div className="attention-element w-16 h-16 sm:w-36 sm:h-36 bg-accent/10 rounded-full absolute aspect-square" style={{ left: '10%' }}></div>
        <div className="attention-element w-14 h-14 sm:w-28 sm:h-28 bg-accent-blue/20 rounded-full absolute aspect-square" style={{ left: '25%' }}></div>
        <div className="attention-element w-12 h-12 sm:w-24 sm:h-24 border-2 border-accent/40 rounded-full absolute aspect-square" style={{ left: '55%' }}></div>
        <div className="attention-element w-16 h-16 sm:w-32 sm:h-32 bg-purple-500/15 rounded-full absolute aspect-square" style={{ left: '75%' }}></div>
        <div className="attention-element w-8 h-8 sm:w-16 sm:h-16 bg-white/10 rounded-full absolute aspect-square" style={{ left: '40%', top: '70%' }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Main content area with left-aligned layout */}
        <div className="flex flex-col items-start w-full">
          {/* Left column: Heading, Subtitle, and CTA Button */}
          <div className="w-full relative">
            {/* Heading area - now contains semantic h1 */}
            <div 
              ref={headingRef}
              className="overflow-visible"
              role="heading"
              aria-level={1}
            >
              {/* Content will be populated by JavaScript */}
            </div>

            {/* Container for CTAs and New Stats - Ref for potential group animation */}
            <div ref={ctaContainerRef} className="w-full flex flex-col md:flex-row items-center md:items-start md:justify-between gap-12 md:gap-16 mt-1 md:mt-2">
              {/* CTA Buttons Group */}
              <div id="hero-cta-group" className="cta-buttons-group flex flex-col sm:flex-row items-center gap-4 md:gap-5 opacity-0 mt-8 md:mt-1 mb-4 md:mb-0">
                <CalendlyWidget
                  buttonText="Book a Free Consultation"
                  className="group relative inline-flex items-center justify-center px-10 py-4 sm:px-12 sm:py-5 text-lg sm:text-xl font-medium text-white bg-accent hover:bg-accent-light rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-light focus:ring-offset-2 focus:ring-offset-black overflow-hidden w-full sm:w-auto"
                />
              </div>

              {/* Stats section - positioned to align vertically with "Your Business" */}
              {hasMounted && (
                <div id="hero-stats-wrapper" className="w-full md:w-auto md:pl-8 lg:pl-12 mt-4 md:-mt-32 lg:-mt-36 xl:-mt-40 md:self-start opacity-0">
                  <HeroStats />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Accent Block - kept for visual consistency */}
      <div 
        ref={accentBlockRef}
        className="absolute inset-0 z-0 overflow-visible"
      >
        {/* Glow blobs - Made larger and moved lower */}
        <div className="glow-blob absolute w-[700px] h-[700px] rounded-full bg-accent/5 blur-[120px] top-[30%] left-[10%] opacity-60"></div>
        <div className="glow-blob absolute w-[800px] h-[800px] rounded-full bg-accent-blue/5 blur-[150px] bottom-[20%] right-[5%] opacity-50"></div>
        <div className="glow-blob absolute w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[100px] top-[50%] right-[30%] opacity-40"></div>
      </div>
    </section>
  );
};

export default HeroSection;