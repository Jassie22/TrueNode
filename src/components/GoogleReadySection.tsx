'use client';

import React from 'react';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// SEO Checklist data for bubble text
const seoChecklist = {
  technical: [
    "Mobile-friendly responsive design",
    "Fast page loading speed (< 3 seconds)",
    "HTTPS secure website",
    "XML sitemap implementation",
    "Robots.txt configuration",
    "Schema markup for rich snippets",
    "Browser compatibility",
    "Core Web Vitals optimization",
    "Largest Contentful Paint (LCP) optimization",
    "Cumulative Layout Shift (CLS) minimization",
    "First Input Delay (FID) reduction",
    "Structured data implementation",
    "Website architecture optimization",
    "Internal linking structure",
    "URL structure optimization",
    "301 redirects for changed URLs",
    "404 error page customization",
    "Image optimization",
    "Lazy loading implementation",
    "CSS and JavaScript minification",
    "Gzip compression",
    "Browser caching configuration",
    "CDN implementation",
    "Server response time optimization",
    "Accelerated Mobile Pages (AMP)",
    "Progressive Web App capabilities",
    "Cross-device compatibility",
    "JavaScript rendering issues",
    "Pagination implementation",
    "Canonicalization issues",
    "Robots meta tags",
    "Hreflang implementation for international sites",
    "Secure DNS configuration",
    "SSL certificate implementation",
    "Site architecture depth",
    "Web font optimization",
    "Website database optimization"
  ],
  content: [
    "Keyword research and strategy",
    "Keyword mapping for key pages",
    "Unique, high-quality content",
    "SEO-optimized page titles",
    "Compelling meta descriptions",
    "Proper header tags (H1, H2, H3)",
    "Keyword-rich URLs",
    "Optimized image alt text",
    "Internal linking strategy",
    "Content length optimization",
    "Regular content updates",
    "Blog strategy implementation",
    "Topic clusters development",
    "Content gaps analysis",
    "Featured snippets optimization",
    "Natural language processing optimization",
    "FAQ section implementation",
    "Long-tail keyword targeting",
    "Geographic targeting",
    "Semantic search optimization"
  ],
  user: [
    "Clear call-to-action buttons",
    "Intuitive navigation menu",
    "Readable typography",
    "Proper color contrast",
    "Logical page structure",
    "Page scroll depth analysis",
    "Mobile navigation optimization",
    "Trust signals implementation",
    "Social proof integration",
    "Accessibility compliance (WCAG)",
    "User journey mapping",
    "Conversion path analysis",
    "User flow optimization",
    "Form optimization",
    "Site search functionality",
    "Navigation breadcrumbs"
  ],
  analytics: [
    "Google Analytics implementation",
    "Google Search Console setup",
    "Conversion tracking",
    "Goal setup in analytics",
    "Event tracking configuration",
    "Regular SEO audits",
    "Keyword position tracking",
    "Backlink profile monitoring",
    "Competitor analysis",
    "Traffic source analysis",
    "Session duration analysis",
    "Bounce rate optimization",
    "Exit page analysis",
    "User behavior analysis",
    "Heatmap implementation",
    "A/B testing framework",
    "Custom dashboard setup",
    "Funnel visualization",
    "Organic traffic monitoring",
    "Search visibility trends",
    "Click-through rate analysis",
    "Return on investment measurement",
    "Attribution modeling"
  ]
};

const allChecklistItems = [
  ...seoChecklist.technical,
  ...seoChecklist.content,
  ...seoChecklist.user,
  ...seoChecklist.analytics,
];

// Helper function to get N random items from an array
const getRandomItems = (arr: string[], count: number): string[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Counter component
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

// Enhanced Star component for constellation effect
const Star = ({ isBrightNode }: { isBrightNode?: boolean }) => {
  const starRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!starRef.current) return;
    const star = starRef.current;
    const animationDuration = 3 + Math.random() * 4; // Slower, more subtle twinkle
    const delay = Math.random() * 5;
    star.style.animation = `twinkle ${animationDuration}s ease-in-out ${delay}s infinite`;
  }, []);

  const size = isBrightNode ? 2.5 + Math.random() * 1.5 : 1 + Math.random() * 1; // Adjusted sizes
  const opacity = isBrightNode ? 0.6 + Math.random() * 0.4 : 0.15 + Math.random() * 0.25; // Adjusted opacities

  return (
    <div
      ref={starRef}
      className="absolute bg-white rounded-full" // Rounded-full for softer stars
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        // Removed clip-path for simple round stars, can be re-added if specific shape is crucial
        width: `${size}px`,
        height: `${size}px`,
        opacity: opacity,
      }}
    />
  );
};

// Refactored SeoLane component
interface SeoLaneProps {
  items: string[];
  animationDuration?: string;
  laneRef: React.RefObject<HTMLDivElement>;
}

const SeoLane = ({ items, animationDuration = '60s', laneRef }: SeoLaneProps) => {
  const duplicatedItems = [...items, ...items];
  return (
    <div ref={laneRef} className="overflow-hidden whitespace-nowrap opacity-0 pl-2" style={{ transform: 'translateX(100%)' }}>
      <div className="flex animate-scroll-left" style={{ animationDuration }}>
        {duplicatedItems.map((item, index) => (
          <span 
            key={index} 
            className="text-white bg-purple-600/70 backdrop-blur-sm mx-3 sm:mx-4 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-lg text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis text-center min-w-[150px] sm:min-w-[200px]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// Main component
const GoogleReadySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null); // This might be repurposed for lanes container
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const lanesContainerRef = useRef<HTMLDivElement>(null); // Ref for the direct parent of lanes
  
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const numLanes = hasMounted && isMobile ? 3 : 5;

  const itemsPerLane = hasMounted && isMobile ? 15 : 20;

  const laneData = useMemo(() => {
    const lanes = [];
    const baseDurations = ['35s', '45s', '30s', '50s', '40s'];
    for (let i = 0; i < numLanes; i++) {
      lanes.push({
        id: `lane-${i}`,
        items: getRandomItems(allChecklistItems, itemsPerLane),
        duration: baseDurations[i % baseDurations.length],
        ref: React.createRef<HTMLDivElement>()
      });
    }
    return lanes;
  }, [numLanes, itemsPerLane]); // Dependencies ensure this recalculates when numLanes changes post-mount

  const generateStars = useCallback(() => {
    if (!starsContainerRef.current) return;
    const container = starsContainerRef.current;
    container.innerHTML = '';
    const starCount = hasMounted && isMobile ? 30 : 60;
    for (let i = 0; i < starCount; i++) {
      const starElement = document.createElement('div');
      starElement.className = 'star';
      starElement.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${1 + Math.random() * 2}px; 
        height: ${1 + Math.random() * 2}px;
        background: white;
        clip-path: polygon(50% 0%, 65% 35%, 100% 35%, 70% 57%, 80% 100%, 50% 75%, 20% 100%, 30% 57%, 0% 35%, 35% 35%);
        animation: twinkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 5}s infinite;
      `;
      container.appendChild(starElement);
    }
  }, [isMobile, hasMounted]);
  
  // Initialize GSAP animations
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
    
    if(hasMounted) { // Only animate lanes after mount and laneData is stable
      laneData.forEach((lane) => {
        if (lane.ref.current) {
          tl.to(lane.ref.current, {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out'
          }, "+=0.3");
        }
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
      tl.kill();
    };
  }, [hasMounted, laneData]);
  
  // Handle window resize for stars (can be adapted for lanes if needed)
  useEffect(() => {
    const handleResize = () => {
      // setBubbleConfig(getBubbleConfig()); // Removed bubble config
      // No need to regenerate stars on resize for isMobile logic, isMobile state handles starCount
      // generateStars(); // This might be too frequent, relying on isVisible and initial load
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Removed generateStars from dependencies
  
  // Generate stars on mount and when visible
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
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const grainEffectUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

  return (
    <>
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--opacity-start, 0.1); }
          50% { opacity: var(--opacity-end, 1); }
        }
        
        .star {
          will-change: opacity;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right linear infinite;
        }
      `}</style>
      
      <section
        id="seo-checklist-dynamic"
        ref={sectionRef}
        className="relative bg-transparent overflow-hidden pt-16 pb-8"
      >
        {/* Animated background with blobs */}
        <div 
          ref={backgroundRef}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <div className="glow-blob absolute w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[120px] top-[-20%] right-[-10%] opacity-30"></div>
          <div className="glow-blob absolute w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px] bottom-[-20%] left-[20%] opacity-25"></div>
          <div className="glow-blob absolute w-[400px] h-[400px] rounded-full bg-pink-500/5 blur-[80px] top-[50%] left-[-10%] opacity-20"></div>
        </div>
        
        {/* Grain effect */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url('${grainEffectUrl}')`,
          }}
        ></div>
        
        {/* Title and description */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 md:px-14 text-center mb-12">
          <div className="max-w-4xl mx-auto">
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              style={{ textShadow: '0 0 30px rgba(147, 51, 234, 0.6)' }}
            >
              Our <span className="text-accent">SEO</span> Approach
            </h2>
            
            <div className="flex items-center justify-center mb-8">
              <span 
                className="text-6xl md:text-7xl font-bold text-accent mr-3"
                style={{ textShadow: '0 0 40px rgba(147, 51, 234, 0.8)' }}
              >
                <AnimatedCounter target={96} />
              </span>
              <span className="text-xl md:text-2xl text-white/80 font-light">
                insights &amp; techniques
              </span>
            </div>
            
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-white/70 font-light max-w-3xl mx-auto"
            >
              Explore the depth of SEO with our continuously showcased checklist points. 
              Each lane highlights a key aspect of our comprehensive strategy.
            </p>
          </div>
        </div>
        
        {/* Full-width banner for lanes */}
        <div 
          ref={bannerRef}
          className="relative w-full pt-4 pb-8 bg-black/50 overflow-hidden"
        >
          <div 
            ref={starsContainerRef}
            className="absolute inset-0 z-0 opacity-40"
          ></div>
          
          {hasMounted && (
            <div 
              ref={lanesContainerRef} // bannerRef was used here, but lanesContainerRef is more appropriate for the direct parent of lanes. Let's assume bannerRef is for the background section and lanesContainerRef for the lanes themselves.
                                     // The user's provided code uses bannerRef for the "Full-width banner for lanes" which contains starsContainerRef and the lanes. So this is correct.
                                     // The actual lanes are mapped inside a div within this banner.
              className="relative z-10 flex flex-col space-y-3">
              {laneData.map((lane) => (
                <SeoLane 
                  key={lane.id}
                  laneRef={lane.ref}
                  items={lane.items} 
                  animationDuration={lane.duration}
                />
              ))}
            </div>
          )}
          {!hasMounted && (
            // Placeholder for SSR or initial client render to match structure (5 lanes)
            <div className="relative z-10 flex flex-col space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`placeholder-lane-${i}`} className="h-10"></div> // Simple placeholder with height
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default GoogleReadySection;