'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
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
const AnimatedCounter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(target);
  
  useEffect(() => {
    countRef.current = target;
    let startTime: number;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const duration = 2000;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * countRef.current));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target]);
  
  return <span className="text-accent">{count}</span>;
};

// Star component (can be kept for background, or removed if not needed for new design)
// For now, I'll keep it as it might be used for the banner background.
const Star = () => {
  const starRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!starRef.current) return;
    
    const star = starRef.current;
    const animationDuration = 2 + Math.random() * 3; // 2-5 seconds
    const delay = Math.random() * 4; // 0-4 seconds delay
    
    star.style.animation = `twinkle ${animationDuration}s ease-in-out ${delay}s infinite`;
  }, []);
  
  return (
    <div
      ref={starRef}
      className="absolute w-1 h-1 bg-white opacity-30"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        clipPath: 'polygon(50% 0%, 65% 35%, 100% 35%, 70% 57%, 80% 100%, 50% 75%, 20% 100%, 30% 57%, 0% 35%, 35% 35%)',
        width: `${2 + Math.random() * 2}px`,
        height: `${2 + Math.random() * 2}px`,
      }}
    />
  );
};

// Refactored SeoLane component
interface SeoLaneProps {
  items: string[];
  animationDuration?: string;
  laneRef: React.RefObject<HTMLDivElement>; // For GSAP animation
}

const SeoLane = ({ items, animationDuration = '60s', laneRef }: SeoLaneProps) => {
  const duplicatedItems = [...items, ...items]; // Duplicate for seamless scroll

  return (
    <div ref={laneRef} className="overflow-hidden whitespace-nowrap opacity-0 pl-2" style={{ transform: 'translateX(100%)' }}> {/* Initial state for GSAP */}
      <div 
        className="flex animate-scroll-left" // Always scrolls left
        style={{ animationDuration: animationDuration }}
      >
        {duplicatedItems.map((item, index) => (
          <span 
            key={index} 
            className="text-white bg-purple-600 mx-2 px-4 py-2 rounded-lg shadow-md text-sm"
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
  
  const [isVisible, setIsVisible] = useState(false);
  
  // Refs for each of the 5 lanes
  const lane1Ref = useRef<HTMLDivElement>(null);
  const lane2Ref = useRef<HTMLDivElement>(null);
  const lane3Ref = useRef<HTMLDivElement>(null);
  const lane4Ref = useRef<HTMLDivElement>(null);
  const lane5Ref = useRef<HTMLDivElement>(null);

  const laneRefs = [lane1Ref, lane2Ref, lane3Ref, lane4Ref, lane5Ref];
  
  // Prepare items for each lane (randomized)
  // Ensure enough items for a good visual, e.g., 25 items per lane
  const itemsPerLane = 25;
  const laneItems = laneRefs.map(() => getRandomItems(allChecklistItems, itemsPerLane));
  // Different animation durations for variety
  const laneAnimationDurations = ['70s', '80s', '65s', '90s', '75s'];

  // Generate stars safely
  const generateStars = useCallback(() => {
    if (!starsContainerRef.current) return;
    
    const container = starsContainerRef.current;
    
    // Clear existing stars
    container.innerHTML = '';
    
    // Create new stars
    const starCount = 100; // Increased star count for full width
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
  }, []);
  
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
    
    // Staggered Lane Entry Animation
    // Order: 2nd, 4th, 3rd, 1st, 5th
    const orderedLaneRefs = [lane2Ref, lane4Ref, lane3Ref, lane1Ref, lane5Ref];
    orderedLaneRefs.forEach((laneRef, index) => {
      if (laneRef.current) {
        tl.to(laneRef.current, {
          x: 0,
          opacity: 1,
          duration: 3.2,
          ease: 'power3.out'
        }, ">-2.5");
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
      tl.kill(); // Kill the main timeline as well
    };
  }, []);
  
  // Setup intersection observer
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    observer.observe(sectionRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  // Handle window resize for stars (can be adapted for lanes if needed)
  useEffect(() => {
    const handleResize = () => {
      // setBubbleConfig(getBubbleConfig()); // Removed bubble config
      generateStars();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [generateStars]);
  
  // Generate stars on mount and when visible
  useEffect(() => {
    if (isVisible) {
      generateStars();
    }
  }, [isVisible, generateStars]);

  const grainEffectUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

  return (
    <>
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          20% { opacity: 1; }
          40% { opacity: 0.3; }
          60% { opacity: 0.8; }
          80% { opacity: 0.2; }
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
                <AnimatedCounter target={allChecklistItems.length} />
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
          
          <div className="relative z-10 flex flex-col space-y-3">
            {laneRefs.map((ref, index) => (
              <SeoLane 
                key={index}
                laneRef={ref}
                items={laneItems[index]} 
                animationDuration={laneAnimationDurations[index]}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default GoogleReadySection;