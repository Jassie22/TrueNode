'use client';

import React from 'react';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Simplified SEO checklist data
const allSeoItems = [
  "Mobile-friendly design",
  "Fast page speed (< 3s)",
  "HTTPS secure website",
  "XML sitemap impl.",
  "Robots.txt configuration",
  "Schema for rich snippets",
  "Browser compatibility",
  "Core Web Vitals optim.",
  "LCP optimization",
  "CLS minimization",
  "FID reduction",
  "Structured data impl.",
  "Site architecture optim.",
  "Internal linking structure",
  "URL structure optim.",
  "301 redirects for URLs",
  "404 error page custom.",
  "Image optimization",
  "Lazy loading impl.",
  "CSS/JS minification",
  "Gzip compression",
  "Browser caching config.",
  "CDN implementation",
  "Server response optim.",
  "AMP implementation",
  "PWA capabilities",
  "Cross-device compatible",
  "JS rendering issues",
  "Pagination implementation",
  "Canonical tag issues",
  "Robots meta tags",
  "Hreflang for intl. sites",
  "Secure DNS config.",
  "SSL certificate impl.",
  "Site architecture depth",
  "Web font optimization",
  "DB optimization",
  "Keyword research/strategy",
  "Keyword mapping",
  "Unique, quality content",
  "SEO page titles",
  "Compelling meta desc.",
  "Proper header tags (H1-H3)",
  "Keyword-rich URLs",
  "Optimized image alt text",
  "Internal linking strat.",
  "Content length optim.",
  "Regular content updates",
  "Blog strategy impl.",
  "Topic cluster dev.",
  "Content gaps analysis",
  "Featured snippets optim.",
  "NLP optimization",
  "FAQ section impl.",
  "Long-tail keyword target.",
  "Geographic targeting",
  "Semantic search optim.",
  "Clear CTAs",
  "Intuitive navigation",
  "Readable typography",
  "Proper color contrast",
  "Logical page structure",
  "Page scroll depth analysis",
  "Mobile nav optim.",
  "Trust signals impl.",
  "Social proof integr.",
  "WCAG compliance",
  "User journey map",
  "Conversion path analysis",
  "User flow optim.",
  "Form optimization",
  "Site search function",
  "Navigation breadcrumbs",
  "Google Analytics impl.",
  "Search Console setup",
  "Conversion tracking",
  "Goal setup in analytics",
  "Event tracking config.",
  "Regular SEO audits",
  "Keyword position track.",
  "Backlink profile monitor.",
  "Competitor analysis",
  "Traffic source analysis",
  "Session duration analysis",
  "Bounce rate optim.",
  "Exit page analysis",
  "User behavior analysis",
  "Heatmap impl.",
  "A/B testing setup",
  "Custom dashboard setup",
  "Funnel visualization",
  "Organic traffic monitor.",
  "Search visibility trends",
  "CTR analysis",
  "ROI measurement",
  "Attribution modeling"
];

const getRandomItems = (arr: string[], count: number): string[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const AnimatedCounter: React.FC<{ triggerRef: React.RefObject<HTMLElement> }> = ({ triggerRef }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !triggerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Simple counter animation
            let currentCount = 0;
            const increment = 96 / 60; // 60 steps to reach 96
            const timer = setInterval(() => {
              currentCount += increment;
              if (currentCount >= 96) {
                setCount(96);
                clearInterval(timer);
              } else {
                setCount(Math.floor(currentCount));
              }
            }, 40); // Update every 40ms for smooth animation
            
            return () => clearInterval(timer);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(triggerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [triggerRef, hasAnimated]);

  return <span>{count}</span>;
};

interface SeoLaneProps {
  items: string[];
  laneIndex: number;
  laneRef: React.RefObject<HTMLDivElement>;
}

const SeoLane = ({ items, laneIndex, laneRef }: SeoLaneProps) => {
  const duplicatedItems = [...items, ...items];
  
  const getLaneSpeed = (index: number): string => {
    switch (index) {
      case 0: return '60s';
      case 1: return '45s';
      case 2: return '40s';
      case 3: return '55s';
      case 4: return '35s';
      default: return '50s';
    }
  };

  return (
    <div 
      ref={laneRef} 
      className="overflow-hidden whitespace-nowrap opacity-0 invisible pl-2" 
      style={{ transform: 'translateX(100%)', willChange: 'transform, opacity' }}
    >
      <div 
        className={`flex animate-scroll-loop lane-${laneIndex + 1}`}
        style={{ 
          animationDuration: getLaneSpeed(laneIndex),
          width: 'max-content',
          willChange: 'transform',
          gap: '12px'
        }}
      >
        {duplicatedItems.map((item, index) => (
          <span 
            key={`${item}-${index}`}
            className="text-white bg-purple-600/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis text-center min-w-[180px] sm:min-w-[220px] border border-purple-500/30 transition-all hover:bg-purple-500/90 hover:shadow-purple-500/30 hover:scale-105 flex-shrink-0"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const GoogleReadySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const lanesContainerRef = useRef<HTMLDivElement>(null);
  
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const numLanes = 5;
  const itemsPerLane = hasMounted && isMobile ? 12 : 18;

  const laneData = useMemo(() => {
    const lanes = [];
    for (let i = 0; i < numLanes; i++) {
      lanes.push({
        id: `lane-${i}`,
        items: getRandomItems(allSeoItems, itemsPerLane),
        ref: React.createRef<HTMLDivElement>()
      });
    }
    return lanes;
  }, [numLanes, itemsPerLane]);

  const generateStars = useCallback(() => {
    if (!starsContainerRef.current) return;
    
    const container = starsContainerRef.current;
    container.innerHTML = '';
    
    const starCount = hasMounted && isMobile ? 20 : 60;

    for (let i = 0; i < starCount; i++) {
      const isBright = Math.random() < 0.15;
      const size = isBright ? 8 + Math.random() * 4 : 6 + Math.random() * 3;
      const initialOpacity = isBright ? 0.7 : 0.4;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const animationDuration = 2 + Math.random() * 2;
      const delay = Math.random() * 4;
      const initialScale = isBright ? 0.8 : 0.6;
      const targetScale = initialScale * (isBright ? 1.3 : 1.2);

      const starElement = document.createElement('div');
      starElement.className = 'absolute star-wrapper';
      starElement.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
        z-index: 8;
        pointer-events: none;
      `;

      starElement.innerHTML = `
        <svg
          class="star-instance"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="white"
          style="
            opacity: ${initialOpacity};
            transform: scale(${initialScale});
            filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.4));
            position: absolute;
            top: 0;
            left: 0;
          "
        >
          <path d="M12,0L12,0c0.257,6.518,5.482,11.743,12,12h0h0c-6.518,0.257-11.743,5.482-12,12v0v0c-0.257-6.518-5.482-11.743-12-12h0h0	C6.518,11.743,11.743,6.518,12,0L12,0z"/>
        </svg>
      `;
      
      container.appendChild(starElement);
      
      const svgElement = starElement.querySelector('svg');
      if (svgElement) {
        gsap.to(svgElement, {
          scale: targetScale,
          duration: animationDuration / 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay
        });
        
        gsap.to(svgElement, {
          opacity: initialOpacity * (isBright ? 0.15 : 0.1),
          duration: animationDuration / 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay + 0.2
        });
      }
    }
  }, [isMobile, hasMounted]);
  
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
    
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
    
    if (descriptionRef.current) {
      tl.fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 0.8, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
    }
    
    if(hasMounted && lanesContainerRef.current) { 
      gsap.fromTo(lanesContainerRef.current.children, 
        { x: '50%', opacity: 0, visibility: 'hidden' }, 
        { 
          x: '0%', 
          opacity: 1, 
          visibility: 'visible',
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: lanesContainerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
      tl.kill();
    };
  }, [hasMounted, laneData]);
  
  useEffect(() => {
    if (hasMounted) {
      generateStars();
    }
  }, [hasMounted, generateStars]);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleVisibilityChange = () => {
      const lanes = document.querySelectorAll('.animate-scroll-loop');
      lanes.forEach(lane => {
        if (document.hidden) {
          (lane as HTMLElement).style.animationPlayState = 'paused';
        } else {
          (lane as HTMLElement).style.animationPlayState = 'running';
        }
      });
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes scroll-loop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll-loop {
          animation: scroll-loop linear infinite;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
          will-change: transform;
        }
        
        .star-wrapper {
          z-index: 8 !important;
          position: absolute;
          pointer-events: none;
        }
        
        .star-instance {
          will-change: opacity, transform;
          z-index: 8 !important;
          position: absolute;
        }

        .desktop-lanes-container {
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .seo-section-fade-in {
          opacity: 0;
          animation: fadeInSection 0.8s ease-out forwards;
        }

        @keyframes fadeInSection {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .lane-1, .lane-2, .lane-3, .lane-4, .lane-5 {
          display: flex;
          width: max-content;
          gap: 12px;
        }
        
        .lane-1 { animation-duration: 120s !important; }
        .lane-2 { animation-duration: 135s !important; }
        .lane-3 { animation-duration: 95s !important; }
        .lane-4 { animation-duration: 110s !important; }
        .lane-5 { animation-duration: 85s !important; }
      `}</style>
      
      <section
        id="seo-checklist-dynamic"
        ref={sectionRef}
        className={`relative bg-transparent overflow-hidden ${isMobile ? 'pb-12' : 'pb-8'} ${hasMounted && !isMobile ? 'pt-12' : 'pt-4'} ${hasMounted ? 'seo-section-fade-in' : 'opacity-0'}`}
      >
        <div 
          className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
        
        {/* Desktop Title Section */}
        {!isMobile && (
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center mb-0">
            <div className="max-w-4xl mx-auto">
              <h2
                ref={titleRef}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
              >
                Our <span className="text-accent">SEO</span> Checklist
              </h2>
              
              <div className="flex items-center justify-center mb-6">
                <span 
                  className="text-6xl md:text-7xl font-bold text-accent mr-4"
                >
                  <AnimatedCounter triggerRef={titleRef} />
                </span>
                <span className="text-xl md:text-2xl text-white/80 font-light">
                  Key SEO Metrics Tracked
                </span>
              </div>
              
              <p
                ref={descriptionRef}
                className="text-lg md:text-xl text-white/70 font-light max-w-3xl mx-auto"
              >
                Unlock your website's full potential. Our 96-point SEO checklist meticulously covers every angle, from technical precision to content strategy, ensuring your digital presence is primed for peak performance and visibility.
              </p>
            </div>
          </div>
        )}
        
        <div className={`relative w-full ${!isMobile ? 'mt-0' : 'mt-8'}`}>
          {hasMounted && !isMobile && (
            <div className="desktop-lanes-container relative py-6 bg-black/60 backdrop-blur-md overflow-hidden shadow-lg border-y border-white/10">
              <div 
                ref={starsContainerRef}
                className="absolute inset-0 z-5 pointer-events-none overflow-hidden"
                style={{ height: '100%', width: '100%' }}
              ></div>
              
              <div 
                ref={lanesContainerRef} 
                className="relative z-20 flex flex-col space-y-3 sm:space-y-4"
              >
                {laneData.map((lane, index) => (
                  <SeoLane 
                    key={lane.id}
                    laneRef={lane.ref}
                    items={lane.items} 
                    laneIndex={index}
                  />
                ))}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 via-black/20 to-transparent backdrop-blur-md z-25 pointer-events-none"></div>
            </div>
          )}

          {hasMounted && isMobile && (
            <div className="relative z-10 mx-auto px-4 max-w-sm">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl">
                {/* Mobile Title and Counter inside the box */}
                <h2
                  ref={titleRef}
                  className="text-3xl font-bold mb-4 text-white text-center"
                >
                  Our <span className="text-accent">SEO</span> Checklist
                </h2>
                
                <div className="flex items-center justify-center mb-6">
                  <span 
                    className="text-4xl font-bold text-accent mr-2"
                  >
                    <AnimatedCounter triggerRef={titleRef} />
                  </span>
                  <span className="text-sm text-white/80 font-light">
                    Critical Points
                  </span>
                </div>
                
                <p className="text-white/90 mb-6 text-sm leading-relaxed text-center">
                  Transform your digital presence with our comprehensive SEO strategy. From technical optimization to content excellence, we ensure maximum search visibility.
                </p>
                <a 
                  href="#contact"
                  className="block w-full py-3 px-6 bg-gradient-to-r from-accent to-accent-blue hover:from-accent-light hover:to-accent-blue-light text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center text-sm"
                >
                  Get Your Free SEO Analysis
                </a>
              </div>
            </div>
          )}

          {!hasMounted && !isMobile && (
            <div className="relative py-6 bg-black/60 backdrop-blur-md overflow-hidden shadow-lg border-y border-white/10 flex flex-col space-y-3 sm:space-y-4">
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 via-black/20 to-transparent backdrop-blur-md z-25 pointer-events-none"></div>
              {Array.from({ length: numLanes }).map((_, i) => (
                <div key={`placeholder-lane-${i}`} className="h-12 bg-transparent rounded-lg mx-4 opacity-0"></div> 
              ))}
            </div>
          )}
          
          {!hasMounted && isMobile && (
            <div className="relative z-10 mx-auto px-4 max-w-sm mt-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl opacity-50">
                <div className="h-8 bg-white/20 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-6 bg-white/20 rounded w-1/2 mx-auto mb-6"></div>
                <div className="h-4 bg-white/20 rounded w-full mx-auto mb-3"></div>
                <div className="h-4 bg-white/20 rounded w-3/4 mx-auto mb-6"></div>
                <div className="h-10 bg-accent/20 rounded w-full mx-auto"></div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default GoogleReadySection;