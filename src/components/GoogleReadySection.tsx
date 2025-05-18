'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image'; // No longer needed for this specific component visuals

// SEO Checklist data will be used for bubble text
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

const getBubbleConfig = () => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
  if (width < 600) {
    return {
      scrollDuration: 22,
      interval: 2.8,
      verticalSpacing: 60,
      horizontalSpacing: 220,
      bubbleHeightEstimate: 40,
      bubbleWidthEstimate: 120,
      maxRecent: 2,
      maxBubbles: 4,
    };
  } else if (width < 900) {
    return {
      scrollDuration: 30,
      interval: 1.8,
      verticalSpacing: 60,
      horizontalSpacing: 220,
      bubbleHeightEstimate: 40,
      bubbleWidthEstimate: 120,
      maxRecent: 3,
      maxBubbles: 7,
    };
  } else {
    return {
      scrollDuration: 40,
      interval: 1.2,
      verticalSpacing: 60,
      horizontalSpacing: 220,
      bubbleHeightEstimate: 40,
      bubbleWidthEstimate: 120,
      maxRecent: 4,
      maxBubbles: 12,
    };
  }
};

const GoogleReadySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null); // For existing blob background
  const counterRef = useRef<HTMLSpanElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const bubbleId = useRef(0);
  const bubblesRef = useRef<Array<{
    id: number;
    el: HTMLElement;
    top: number;
    left: number;
    width: number;
    height: number;
    startTime: number;
  }>>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [bubbleConfig, setBubbleConfig] = useState(getBubbleConfig());
  const [isCounterVisible, setIsCounterVisible] = useState(false);

  // GSAP animations for title, description, counter, and background blobs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom bottom',
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
        
        tl.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        );
        tl.fromTo(
          descriptionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 0.8, duration: 0.6 },
          '-=0.3'
        );
        gsap.fromTo(
          counterRef.current,
          { innerText: 0 },
          {
            innerText: allChecklistItems.length,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counterRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      } catch (error) {
        console.warn('Error in GSAP animations:', error);
      }
    }
  }, []);
  
  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Responsive: update bubble config on resize
  useEffect(() => {
    const handleResize = () => setBubbleConfig(getBubbleConfig());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for counter only
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsCounterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Bubble creation interval (always runs, but bubbles only visible if section is mounted)
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const banner = bannerRef.current;
      if (!banner) return;
      if (bubblesRef.current.length >= bubbleConfig.maxBubbles) return;
      const bannerW = banner.offsetWidth;
      const bannerH = banner.offsetHeight;
      // Create bubble element
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.textContent = allChecklistItems[Math.floor(Math.random() * allChecklistItems.length)];
      bubble.style.position = 'absolute';
      bubble.style.opacity = '0';
      bubble.style.left = `${bannerW}px`;
      // Try to find a non-overlapping vertical position
      let y = 0, tries = 0, found = false;
      while (tries < 20 && !found) {
        y = Math.random() * (bannerH - bubbleConfig.bubbleHeightEstimate);
        found = true;
        for (let i = Math.max(0, bubblesRef.current.length - bubbleConfig.maxRecent); i < bubblesRef.current.length; ++i) {
          const b = bubblesRef.current[i];
          // Predict where the previous bubble will be horizontally when this one enters
          const prevElapsed = (Date.now() - b.startTime) / 1000;
          const prevX = b.left - (bannerW + bubbleConfig.bubbleWidthEstimate) * (prevElapsed / bubbleConfig.scrollDuration);
          // If vertical overlap and horizontal overlap
          if (Math.abs(b.top - y) < bubbleConfig.verticalSpacing && Math.abs(prevX - bannerW) < bubbleConfig.horizontalSpacing) {
            found = false;
            break;
          }
        }
        tries++;
      }
      bubble.style.top = `${y}px`;
      banner.appendChild(bubble);
      // Now measure actual size
      const width = bubble.offsetWidth || bubbleConfig.bubbleWidthEstimate;
      const height = bubble.offsetHeight || bubbleConfig.bubbleHeightEstimate;
      // Animate
      bubble.style.opacity = '1';
      bubble.animate([
        { transform: `translateX(0px)`, opacity: 1 },
        { transform: `translateX(-${bannerW + width + 40}px)`, opacity: 1 }
      ], {
        duration: bubbleConfig.scrollDuration * 1000,
        easing: 'linear',
        fill: 'forwards',
      });
      // Track
      const id = bubbleId.current++;
      bubblesRef.current.push({ id, el: bubble, top: y, left: bannerW, width, height, startTime: Date.now() });
      // Cleanup when animation ends
      setTimeout(() => {
        if (bubble.parentElement === banner) {
          banner.removeChild(bubble);
        }
        bubblesRef.current = bubblesRef.current.filter(b => b.id !== id);
      }, bubbleConfig.scrollDuration * 1000 + 100);
    }, bubbleConfig.interval * 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [bubbleConfig]);

  // Create stars dynamically
  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const createStars = () => {
      const starryBg = banner.querySelector('.starry-background');
      if (!starryBg) return;

      // Clear existing stars
      while (starryBg.firstChild) {
        starryBg.removeChild(starryBg.firstChild);
      }

      // Create more stars and distribute them across the full width
      const numStars = 50; // Increased number of stars
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position across full width and height
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        // Random size (2-4px)
        const size = Math.random() * 2 + 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random twinkle duration and delay
        const duration = Math.random() * 2 + 2; // 2-4s
        const delay = Math.random() * 4; // 0-4s
        star.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite`;
        
        starryBg.appendChild(star);
      }
    };

    createStars();
    
    // Recreate stars on window resize
    const handleResize = () => {
      createStars();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [bannerRef]);

  return (
    <section
      id="seo-checklist-dynamic"
      ref={sectionRef}
      className="py-12 relative bg-transparent overflow-hidden section-fluid-motion fade-in-section section-overlap-top"
    >
      {/* Existing Animated background with blobs - Keep this */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div className="glow-blob absolute w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] top-[-20%] right-[-10%] opacity-30"></div>
        <div className="glow-blob absolute w-[500px] h-[500px] rounded-full bg-accent-blue/5 blur-[100px] bottom-[-20%] left-[20%] opacity-25"></div>
        <div className="glow-blob absolute w-[400px] h-[400px] rounded-full bg-accent-magenta/5 blur-[80px] top-[50%] left-[-10%] opacity-20"></div>
      </div>
      {/* Existing Grain effect - Keep this */}
      <div className="absolute inset-0 z-0 opacity-[0.03] noise-bg pointer-events-none"></div>
      
      {/* Existing Container for Title, Counter, Description - Keep this */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 md:px-14 text-center mb-8">
        <div className="max-w-4xl mx-auto">
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold mb-4 text-white flex items-center justify-center gap-2"
              style={{ textShadow: '0 0 15px rgba(144, 58, 231, 0.5)' }}
            >
            Our <span className="text-accent">SEO</span> Checklist
            </h2>
            <div className="flex items-center justify-center mb-6">
              <span 
                ref={counterRef}
                className="text-6xl md:text-7xl font-bold text-accent/90 mr-3"
                style={{ textShadow: '0 0 20px rgba(144, 58, 231, 0.7)' }}
              >
              {isCounterVisible ? <Counter target={allChecklistItems.length} /> : 0}
              </span>
            <span className="text-xl md:text-2xl text-white/80 font-light">insights &amp; techniques</span>
            </div>
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-white/70 font-light max-w-3xl mx-auto"
            >
            Explore the depth of SEO with our dynamically showcased checklist points. Each bubble represents a key aspect of our comprehensive strategy.
          </p>
            </div>
          </div>
          
      {/* New Dynamic Banner for Starry Sky and Bubbles */}
      <div ref={bannerRef} className="dynamic-banner">
        <div className="starry-background"></div>
        {/* Bubbles are injected here */}
      </div>
      
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        .dynamic-banner {
          position: relative;
          width: 100%;
          height: 400px;
          background: rgba(0,0,0,0.95);
          overflow: hidden;
        }
        .starry-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        .star {
          position: absolute;
          width: 3px;
          height: 3px;
          background: transparent;
          clip-path: polygon(
            50% 0%,
            65% 35%,
            100% 35%,
            70% 57%,
            80% 100%,
            50% 75%,
            20% 100%,
            30% 57%,
            0% 35%,
            35% 35%
          );
          background: white;
          will-change: opacity;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          20% { opacity: 1; }
          40% { opacity: 0.3; }
          60% { opacity: 0.8; }
          80% { opacity: 0.2; }
        }
        .bubble {
          position: absolute;
          background: #A020F0;
          border-radius: 25px;
          padding: 8px 18px;
          color: white;
          font-size: 0.9em;
          white-space: nowrap;
          z-index: 3;
          box-shadow: 0 3px 10px rgba(160, 32, 240, 0.3), 0 0 15px rgba(160, 32, 240, 0.2);
          will-change: transform, opacity;
        }
        @media (max-width: 768px) {
          .dynamic-banner { height: 300px; }
          .bubble { font-size: 0.8em; padding: 7px 14px; }
        }
        @media (max-width: 480px) {
          .dynamic-banner { height: 200px; }
          .bubble { font-size: 0.7em; padding: 6px 12px; }
        }
      `}</style>
    </section>
  );
};

// Counter component for animated counting
const Counter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame: number;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    animate(performance.now());
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <>{count}</>;
};

// Helper function to generate star background with four-pointed stars
function generateStarBackground() {
  const stars: string[] = [];
  const positions = [
    [15, 300], [75, 120], [135, 250], [195, 80], [255, 180],
    [315, 50], [375, 290], [435, 150], [495, 20], [555, 220]
  ];

  positions.forEach(([x, y], i) => {
    const size = i % 3 === 0 ? 4 : i % 2 === 0 ? 3 : 2;
    stars.push(`
      radial-gradient(${size}px ${size}px at ${x}px ${y}px, 
        transparent 0%, 
        transparent 35%, 
        #FFF 36%,
        #FFF 100%,
        transparent)`
    );
  });

  return stars.join(',');
}

export default GoogleReadySection; 