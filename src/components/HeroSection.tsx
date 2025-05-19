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

  // Text to animate - RESTORING THESE DEFINITIONS
  const mainHeadingText = "Transform";
  const mainHeadingTextLine2 = "Your Business";
  const subHeadingText = "Custom Websites. Smart Apps. AI That Works for You.";
  
  useEffect(() => {
    // Mobile check effect
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (typeof window === 'undefined') return;
    
    try {
      // Register ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);
      
      // Create master timeline with sequential animations
      const masterTl = gsap.timeline({
        defaults: { 
          ease: "power3.out",
          duration: 0.4 // Further reduced duration for faster animation
        },
        delay: 0 // No delay
      });
      
      // Attention grabber animation at the top - optimize to load faster
      if (attentionGrabberRef.current) {
        const grabberElements = attentionGrabberRef.current.querySelectorAll('.attention-element');
        
        masterTl.fromTo(
          grabberElements,
          {
            y: -30, // Reduced distance for faster animation
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.04, // Faster stagger for quicker appearance
            duration: 0.5,
            ease: "back.out(1.2)"
          },
          0
        );
        
        // Add continuous animation to the elements
        grabberElements.forEach((el, index) => {
          gsap.to(el, {
            y: `${Math.sin(index) * 10}px`, // Reduced movement
            rotate: Math.random() > 0.5 ? '+=8' : '-=8', // Reduced rotation
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      }
      
      // Optimize background glow blobs - pre-position them instead of animating initially
      if (backgroundRef.current) {
        const blobs = backgroundRef.current.querySelectorAll('.glow-blob');
        
        blobs.forEach((blob, index) => {
          // Set initial positions without transitions
          gsap.set(blob, {
            x: Math.random() * 200 - 100, // Reduced range
            y: Math.random() * 200 - 100, // Reduced range
            scale: 0.9 + Math.random() * 0.2,
            opacity: 0.7 // Start more visible
          });
          
          // Create floating animation for each blob - starts immediately
          gsap.to(blob, {
            x: `+=${Math.random() * 80 - 40}`, // Reduced movement
            y: `+=${Math.random() * 80 - 40}`, // Reduced movement
            scale: 0.9 + Math.random() * 0.2,
            opacity: 0.6 + Math.random() * 0.4,
            duration: 8 + index * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5 // Reduced delay
          });
        });
      }
      
      // Extra large first line of text animation - optimized
      if (headingRef.current) {
        headingRef.current.innerHTML = '';
        
        // Create first line container (TRANSFORM)
        const firstLineContainer = document.createElement('h1');
        firstLineContainer.className = 'text-[16vw] sm:text-[17vw] md:text-[15vw] lg:text-[15vw] xl:text-[14vw] font-bold leading-none tracking-tighter mb-4 relative overflow-visible text-center md:text-left';
        
        // Create second line container (YOUR BUSINESS)
        const secondLineContainer = document.createElement('div');
        secondLineContainer.className = 'text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] xl:text-[7vw] font-bold leading-none tracking-tighter relative overflow-visible mb-6 text-center md:text-left';
        secondLineContainer.id = 'business-text';
        businessTextElement = secondLineContainer;
        
        // Create all the spans first and add them to the DOM - optimized for faster rendering
        const firstLineSpans = [];
        mainHeadingText.split('').forEach((letter, letterIndex) => {
          const letterSpan = document.createElement('span');
          letterSpan.textContent = letter;
          letterSpan.className = 'inline-block opacity-0 transform translate-y-full';
          letterSpan.dataset.index = letterIndex.toString();
          letterSpan.setAttribute('aria-hidden', 'true'); // For accessibility
          firstLineSpans.push(letterSpan);
          firstLineContainer.appendChild(letterSpan);
        });

        const secondLineSpans = [];
        mainHeadingTextLine2.split(' ').forEach((word, wordIndex) => {
          const wordSpan = document.createElement('span');
          if (wordIndex === 0) {
            // This is "Your" word - make it purple on all screen sizes
            wordSpan.className = 'inline-block mr-[1vw] opacity-0 transform translate-y-full transition-all duration-500 text-accent';
          } else {
            wordSpan.className = 'inline-block mr-[1vw] opacity-0 transform translate-y-full transition-all duration-500';
          }
          wordSpan.textContent = word;
          wordSpan.setAttribute('aria-hidden', 'true'); // For accessibility
          secondLineSpans.push(wordSpan);
          secondLineContainer.appendChild(wordSpan);
        });
        
        // Add to DOM first before animations
        headingRef.current.appendChild(firstLineContainer);
        headingRef.current.appendChild(secondLineContainer);
        
        // Add hidden but screen reader accessible text for the full heading
        const srHeading = document.createElement('span');
        srHeading.className = 'sr-only';
        srHeading.textContent = `${mainHeadingText} ${mainHeadingTextLine2}`;
        headingRef.current.appendChild(srHeading);
        
        // Create subtitle container
        const subtitleContainer = document.createElement('div');
        subtitleContainer.className = 'text-[5vw] sm:text-[4vw] md:text-[2.5vw] lg:text-[2.2vw] xl:text-[2vw] font-bold leading-none tracking-normal relative overflow-visible mt-2 text-white/90 opacity-0 max-w-[90%] sm:max-w-[80%] mb-8 text-center md:text-left mx-auto md:mx-0';
        
        // Add subtitle text with highlighted words as clickable links, broken into two lines
        subtitleContainer.innerHTML = 'Custom <span class="text-[#23B5D3] font-bold cursor-pointer hover:underline transition-all">Websites</span>. Smart <span class="text-[#23B5D3] font-bold cursor-pointer hover:underline transition-all">Apps</span>.<br>AI That Works for <span class="text-[#23B5D3] font-bold cursor-pointer hover:underline transition-all">You</span>.';
        
        // Add subtitle to DOM
        headingRef.current.appendChild(subtitleContainer);
        
        // First animate the first line letters (Transform) - faster animation
        const firstLineLetters = firstLineContainer.querySelectorAll('span');
        masterTl.to(
          firstLineLetters,
          {
            y: 0,
            opacity: 1,
            stagger: 0.02, // Faster stagger
            duration: 0.6,
            ease: "power4.out",
          },
          0 // Start immediately
        );
        
        // Then animate second line words (Your Business) one at a time - faster animation
        const secondLineWords = secondLineContainer.querySelectorAll('span');
        masterTl.to(
          secondLineWords[0], // Your
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out"
          },
          0.4 // Reduced delay
        );
        
        masterTl.to(
          secondLineWords[1], // Business
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out"
          },
          0.5 // Reduced delay
        );
        
        // Animate subtitle with fade in - faster animation
        masterTl.to(
          subtitleContainer,
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.inOut"
          },
          0.7 // Reduced delay
        );
        
        // Setup parallax scrolling effect for both lines
        gsap.to(firstLineContainer, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          },
          x: -100,
          ease: "none"
        });
        
        gsap.to(secondLineContainer, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          },
          x: 100,
          ease: "none"
        });
        
        // Letter hover effect for first line
        firstLineLetters.forEach((letter) => {
          letter.addEventListener('mouseenter', () => {
            gsap.to(letter, {
              y: -20,
              scale: 1.1,
              color: "#903AE7",
              duration: 0.3,
              ease: "power2.out"
            });
          });
          
          letter.addEventListener('mouseleave', () => {
            gsap.to(letter, {
              y: 0,
              scale: 1,
              color: "white",
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
        
        // Business text hover effect with words instead of letters
        if (businessTextElement) {
          const words = businessTextElement.querySelectorAll('span');
          
          // Apply hover effect to each word as a whole unit
          words.forEach((word) => {
            word.addEventListener('mouseenter', () => {
              gsap.to(word, {
                color: "#903AE7",
                textShadow: "0 0 20px rgba(144, 58, 231, 0.8)",
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out",
                zIndex: 50
              });
            });
            
            word.addEventListener('mouseleave', () => {
              gsap.to(word, {
                color: "white",
                textShadow: "none",
                scale: 1,
                duration: 0.3,
                ease: "power2.in",
              });
            });
          });
        }
      }
      
      // Animate statistics instead of bullet points - faster animation
      const statsContainer = document.getElementById('stats-container');
      if (statsContainer) {
        // First make the container visible
        masterTl.to(
          statsContainer,
          {
            opacity: 1,
            duration: 0.2
          },
          0.9 // Start much earlier
        );
        
        // Then animate each stat
        masterTl.fromTo(
          statsContainer.querySelector('div'),
          { 
            y: 20,
            opacity: 0 
          },
          { 
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          },
          1.0 // Start earlier
        );
      }
      
      // Animate CTA buttons and potentially the new stats section together or sequentially
      if (ctaContainerRef.current) {
        const ctaGroup = document.getElementById('hero-cta-group');
        const statsWrapper = document.getElementById('hero-stats-wrapper');

        if (ctaGroup) {
          masterTl.fromTo(
            ctaGroup, // Animate the group itself for opacity
            { 
              opacity: 0,
              y: 20 
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out'
            },
            1.4 // Delay CTA animation slightly after subtitle
          );
        }
        if (statsWrapper) { 
            masterTl.fromTo(
                statsWrapper,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
                1.5 // Stagger slightly after CTA buttons
            );
        }
      }
      
      return () => {
        if (ScrollTrigger.getAll) {
          ScrollTrigger.getAll().forEach((trigger: ScrollTriggerInstance) => {
            if (trigger && trigger.kill) {
              trigger.kill(true);
            }
          });
        }
        masterTl.kill();
        window.removeEventListener('resize', checkMobile);
      };
    } catch (error) {
      console.warn('Error in HeroSection animations:', error);
    }
  }, []);

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center pt-32 relative overflow-hidden section-fluid-motion fade-in-section section-overlap-bottom"
    >
      {/* Animated background with blobs */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 overflow-visible"
      >
        {/* Glow blobs - Made larger and moved lower */}
        <div className="glow-blob absolute w-[700px] h-[700px] rounded-full bg-accent/5 blur-[120px] top-[30%] left-[10%] opacity-60"></div>
        <div className="glow-blob absolute w-[800px] h-[800px] rounded-full bg-accent-blue/5 blur-[150px] bottom-[20%] right-[5%] opacity-50"></div>
        <div className="glow-blob absolute w-[600px] h-[600px] rounded-full bg-accent-magenta/5 blur-[100px] top-[50%] right-[30%] opacity-40"></div>
      </div>
      
      {/* Eye-catching animation at the top - moved lower */}
      <div 
        ref={attentionGrabberRef}
        className="absolute top-[15%] left-0 right-0 h-32 pointer-events-none z-10 flex justify-center items-center overflow-visible"
      >
        <div className="attention-element w-16 h-16 sm:w-36 sm:h-36 bg-accent/10 rounded-full absolute" style={{ left: '10%' }}></div>
        <div className="attention-element w-14 h-14 sm:w-28 sm:h-28 bg-accent-blue/20 rounded-full absolute" style={{ left: '25%' }}></div>
        <div className="attention-element w-12 h-12 sm:w-24 sm:h-24 border-2 border-accent/40 rounded-full absolute" style={{ left: '55%' }}></div>
        <div className="attention-element w-16 h-16 sm:w-32 sm:h-32 bg-accent-magenta/15 rounded-full absolute" style={{ left: '75%' }}></div>
        <div className="attention-element w-8 h-8 sm:w-16 sm:h-16 bg-white/10 rounded-full absolute" style={{ left: '40%', top: '70%' }}></div>
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
            <div ref={ctaContainerRef} className="w-full flex flex-col md:flex-row items-center md:items-start md:justify-start gap-8 mt-8 md:mt-12">
              {/* CTA Buttons Group */}
              <div id="hero-cta-group" className="cta-buttons-group flex flex-col sm:flex-row items-center gap-4 md:gap-5 opacity-0">
                <CalendlyWidget 
                  buttonText="Book a Free Consultation"
                  className="group relative inline-flex items-center justify-center px-7 py-3 sm:px-9 sm:py-3.5 text-base sm:text-lg font-medium text-white bg-accent hover:bg-accent-light rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-light focus:ring-offset-2 focus:ring-offset-black overflow-hidden w-[calc(100%+10%)] sm:w-auto"
                />
              </div>

              {/* Conditionally render HeroStats: not on mobile for now, adjust desktop positioning */}
              {!isMobile && (
                <div id="hero-stats-wrapper" className="w-full md:w-auto md:pl-8 lg:pl-12 mt-6 md:mt-0 opacity-0"> {/* Adjusted margins and initial opacity */}
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
        <div className="glow-blob absolute w-[600px] h-[600px] rounded-full bg-accent-magenta/5 blur-[100px] top-[50%] right-[30%] opacity-40"></div>
      </div>
    </section>
  );
};

export default HeroSection;