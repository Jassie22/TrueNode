'use client';

import React from 'react';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// SEO Checklist data
const seoChecklist = {
  technical: [
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
    "DB optimization"
  ],
  content: [
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
    "Semantic search optim."
  ],
  user: [
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
    "Navigation breadcrumbs"
  ],
  analytics: [
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
  ]
};

const allUniqueChecklistItems = Array.from(
  new Set([
    ...seoChecklist.technical,
    ...seoChecklist.content,
    ...seoChecklist.user,
    ...seoChecklist.analytics,
  ])
);

const getRandomItems = (arr: string[], count: number): string[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const AnimatedCounter: React.FC<{ target: number }> = ({ target }) => {
  const countRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (countRef.current) {
      gsap.to(countRef.current, {
        textContent: target,
        duration: 2,
        ease: 'power1.inOut',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: countRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, [target]);
  return <span ref={countRef}>0</span>;
};

const Star = ({ isBrightNode }: { isBrightNode?: boolean }) => {
  const starRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!starRef.current) return;
    const star = starRef.current;
    const animationDuration = 3 + Math.random() * 4;
    const delay = Math.random() * 5;
    star.style.animation = `twinkle ${animationDuration}s ease-in-out ${delay}s infinite`;
  }, []);

  const size = isBrightNode ? 2.5 + Math.random() * 1.5 : 1 + Math.random() * 1;
  const opacity = isBrightNode ? 0.6 + Math.random() * 0.4 : 0.15 + Math.random() * 0.25;

  return (
    <div
      ref={starRef}
      className="absolute bg-white rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: opacity,
      }}
    />
  );
};

interface SeoLaneProps {
  items: string[];
  animationDuration?: string;
  laneRef: React.RefObject<HTMLDivElement>;
}

const SeoLane = ({ items, animationDuration = '60s', laneRef }: SeoLaneProps) => {
  const duplicatedItems = [...items, ...items]; // Duplicate for seamless scroll
  return (
    <div ref={laneRef} className="overflow-hidden whitespace-nowrap opacity-0 pl-2" style={{ transform: 'translateX(100%)' }}>
      <div className="flex animate-scroll-left" style={{ animationDuration }}>
        {duplicatedItems.map((item, index) => (
          <span 
            key={`${item}-${index}`} // Ensure unique key for duplicated items
            className="text-white bg-purple-600/80 backdrop-blur-sm mx-2 sm:mx-3 px-4 py-2 rounded-lg shadow-lg text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis text-center min-w-[180px] sm:min-w-[220px] border border-purple-500/30 transition-all hover:bg-purple-500/90 hover:shadow-purple-500/30 hover:scale-105"
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
  const bannerRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const lanesContainerRef = useRef<HTMLDivElement>(null);
  
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const numLanes = hasMounted && isMobile ? 4 : 6; // Adjusted number of lanes
  const itemsPerLane = hasMounted && isMobile ? 12 : 18; // Adjusted items per lane

  const laneData = useMemo(() => {
    const lanes = [];
    // Slightly adjusted durations for more variation and potentially slower, more readable speeds
    const baseDurations = ['40s', '55s', '45s', '60s', '50s', '65s']; 
    for (let i = 0; i < numLanes; i++) {
      lanes.push({
        id: `lane-${i}`,
        items: getRandomItems(allUniqueChecklistItems, itemsPerLane),
        duration: baseDurations[i % baseDurations.length],
        ref: React.createRef<HTMLDivElement>()
      });
    }
    return lanes;
  }, [numLanes, itemsPerLane]);

  const generateStars = useCallback(() => {
    if (!starsContainerRef.current) return;
    const container = starsContainerRef.current;
    container.innerHTML = '';
    const starCount = hasMounted && isMobile ? 35 : 70; // Adjusted star count
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < starCount; i++) {
        const isBright = Math.random() < 0.1;
        const starEl = document.createElement('div');
        Object.assign(starEl.style, {
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${isBright ? (2 + Math.random() * 1) : (0.5 + Math.random() * 1)}px`,
          height: `${isBright ? (2 + Math.random() * 1) : (0.5 + Math.random() * 1)}px`,
          background: 'white',
          borderRadius: '50%',
          opacity: `${isBright ? (0.5 + Math.random() * 0.4) : (0.1 + Math.random() * 0.2)}`,
          animation: `twinkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 5}s infinite`
        });
        starEl.classList.add('star'); // Ensure class is added for global styles if any
        fragment.appendChild(starEl);
      }
      container.appendChild(fragment);
  }, [isMobile, hasMounted]);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
    
    if (backgroundRef.current) {
      const blobs = backgroundRef.current.querySelectorAll('.glow-blob');
      blobs.forEach((blob, index) => {
        gsap.set(blob, {
          x: Math.random() * 300 - 150,
          y: Math.random() * 300 - 150,
          scale: 0.8 + Math.random() * 0.4
        });
        gsap.to(blob, {
          x: `+=${Math.random() * 100 - 50}`,
          y: `+=${Math.random() * 100 - 50}`,
          scale: 0.9 + Math.random() * 0.3,
          opacity: 0.5 + Math.random() * 0.3,
          duration: 8 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 1.5
        });
      });
    }
    
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
        { x: '50%', opacity: 0 }, 
        { 
          x: '0%', 
          opacity: 1, 
          duration: 1,
          stagger: 0.15, // Stagger entrance of each lane
          ease: 'power3.out',
          scrollTrigger: {
            trigger: lanesContainerRef.current,
            start: 'top 85%', // Start animation a bit earlier
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
      tl.kill();
    };
  }, [hasMounted, laneData]); // laneData dependency is important here
  
  useEffect(() => {
    const handleResize = () => {
      // No need to explicitly call generateStars, isMobile state change will trigger it.
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (hasMounted) {
      generateStars();
    }
  }, [hasMounted, generateStars]); // generateStars is a dependency now

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const grainEffectUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

  return (
    <>
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--star-opacity-start, 0.1); } /* Changed var name for clarity */
          50% { opacity: var(--star-opacity-end, 0.8); }
        }
        
        .star { /* For direct DOM manipulation of stars */
          will-change: opacity;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); } /* Each row has duplicated items, so -50% is one full scroll */
        }

        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }
        /* Removed .animate-scroll-right as it wasn't used */
      `}</style>
      
      <section
        id="seo-checklist-dynamic"
        ref={sectionRef}
        className="relative bg-transparent overflow-hidden pt-20 pb-12" // Increased top padding, adjusted bottom
      >
        <div 
          ref={backgroundRef}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <div className="glow-blob absolute w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[150px] top-[-25%] right-[-15%] opacity-40"></div>
          <div className="glow-blob absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[130px] bottom-[-25%] left-[15%] opacity-35"></div>
          <div className="glow-blob absolute w-[450px] h-[450px] rounded-full bg-pink-500/10 blur-[100px] top-[50%] left-[-15%] opacity-30"></div>
        </div>
        
        <div 
          className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `url('${grainEffectUrl}')`,
          }}
        ></div>
        
        <div className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center mb-16 ${hasMounted && isMobile ? 'hidden' : ''}`}>
          <div className="max-w-4xl mx-auto">
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
              style={{ textShadow: '0 0 35px rgba(147, 51, 234, 0.7)' }}
            >
              Our <span className="text-accent">SEO</span> Checklist
            </h2>
            
            <div className={`flex items-center justify-center mb-10 ${hasMounted && isMobile ? 'hidden' : ''}`}>
              <span 
                className="text-6xl md:text-7xl font-bold text-accent mr-4"
                style={{ textShadow: '0 0 45px rgba(147, 51, 234, 0.85)' }}
              >
                <AnimatedCounter target={allUniqueChecklistItems.length} />
              </span>
              <span className="text-xl md:text-2xl text-white/80 font-light">
                meticulous considerations
              </span>
            </div>
            
            <p
              ref={descriptionRef}
              className={`text-lg md:text-xl text-white/70 font-light max-w-3xl mx-auto ${hasMounted && isMobile ? 'hidden' : ''}`}
            >
              Witness the breadth of our SEO strategy. Each scrolling lane below unveils a different facet of our comprehensive approach to digital excellence.
            </p>
          </div>
        </div>
        
        <div 
          ref={bannerRef} // This div wraps the stars and the lanes section
          className="relative w-full" // Removed padding/bg here, will apply conditionally
        >
          {hasMounted && !isMobile && (
            <div className="desktop-lanes-container relative pt-6 pb-10 bg-black/60 backdrop-blur-md overflow-hidden shadow-2xl shadow-purple-500/10 border-y border-purple-500/20">
              <div 
                ref={starsContainerRef}
                className="absolute inset-0 z-0 opacity-50"
              ></div>
              <div 
                ref={lanesContainerRef} 
                className="relative z-10 flex flex-col space-y-4 sm:space-y-5">
                {laneData.map((lane) => (
                  <SeoLane 
                    key={lane.id}
                    laneRef={lane.ref}
                    items={lane.items} 
                    animationDuration={lane.duration}
                  />
                ))}
              </div>
            </div>
          )}

          {hasMounted && isMobile && (
            <div className="mobile-summary-box relative z-10 mx-auto mt-8 mb-4 p-6 max-w-md bg-gradient-to-br from-bg-darker to-bg-dark backdrop-blur-lg rounded-xl shadow-2xl border border-purple-500/30 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Our Comprehensive SEO Checklist
              </h3>
              <p className="text-white/80 mb-6 text-sm">
                Unlock your website's full potential. Our {allUniqueChecklistItems.length}-point SEO checklist meticulously covers every angle, from technical precision to content strategy, ensuring your digital presence is primed for peak performance and visibility.
              </p>
              <a 
                href="#contact" // Assuming a contact section ID
                className="inline-block py-3 px-8 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 hover:from-purple-700 hover:via-pink-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-base"
              >
                Get Your Free SEO Analysis
              </a>
            </div>
          )}

          {!hasMounted && !isMobile && ( // Placeholder for desktop before mount
            <div 
              className="relative pt-6 pb-10 bg-black/60 backdrop-blur-md overflow-hidden shadow-2xl shadow-purple-500/10 border-y border-purple-500/20 flex flex-col space-y-4 sm:space-y-5"
            >
              {Array.from({ length: numLanes }).map((_, i) => (
                <div key={`placeholder-lane-${i}`} className="h-12 bg-purple-500/5 rounded-lg mx-4 opacity-50"></div> 
              ))}
            </div>
          )}
          {!hasMounted && isMobile && ( // Placeholder for mobile before mount
            <div className="relative z-10 mx-auto mt-8 mb-4 p-6 max-w-md bg-gradient-to-br from-bg-darker to-bg-dark rounded-xl shadow-xl border border-purple-500/30 text-center opacity-50">
               <div className="h-8 bg-purple-500/10 rounded w-3/4 mx-auto mb-4"></div>
               <div className="h-4 bg-purple-500/10 rounded w-full mx-auto mb-2"></div>
               <div className="h-4 bg-purple-500/10 rounded w-full mx-auto mb-2"></div>
               <div className="h-4 bg-purple-500/10 rounded w-5/6 mx-auto mb-6"></div>
               <div className="h-12 bg-accent/20 rounded w-1/2 mx-auto"></div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default GoogleReadySection;