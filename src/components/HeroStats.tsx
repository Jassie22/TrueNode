'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface StatItem {
  id: string;
  value: string;
  description: string;
  mainColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const statsData: StatItem[] = [
  {
    id: 'roi',
    value: '78%',
    description: 'of consumers research small businesses online before visiting.',
    mainColor: 'text-purple-300',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-indigo-700',
  },
  {
    id: 'aiChatbots',
    value: '67%',
    description: 'higher conversion rates with AI chatbots & 30% lower service costs.',
    mainColor: 'text-[#23B5D3]',
    gradientFrom: 'from-sky-500',
    gradientTo: 'to-cyan-500',
  },
  {
    id: 'mobileOptimized',
    value: '2x',
    description: 'more conversions from mobile-optimized sites vs non-optimized.',
    mainColor: 'text-violet-300',
    gradientFrom: 'from-violet-600',
    gradientTo: 'to-purple-700',
  },
];

const HeroStats = () => {
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const individualStatRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [animationsTriggered, setAnimationsTriggered] = useState<Record<string, boolean>>({});
  
  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Helper to assign refs
  const setStatRef = (id: string) => (el: HTMLDivElement | null) => {
    individualStatRefs.current[id] = el;
  };

  // Touch handlers for swipe functionality
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Swipe left: go to next stat, or loop to first if at last
      setActiveIndex(prevIndex => (prevIndex + 1) % statsData.length);
    }
    if (isRightSwipe) {
      // Swipe right: go to previous stat, or loop to last if at first
      setActiveIndex(prevIndex => prevIndex === 0 ? statsData.length - 1 : prevIndex - 1);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Make stats visible immediately without ScrollTrigger
      if (statsContainerRef.current) {
        gsap.set(statsContainerRef.current, { opacity: 1, y: 0 });
      }

      // Set up individual stat animations and count-up
      statsData.forEach((stat) => {
        const statEl = individualStatRefs.current[stat.id];
        const valueEl = statEl?.querySelector('.stat-value');

        if (statEl && valueEl) {
          // Make stats visible immediately
          gsap.set(statEl, { opacity: 1, scale: 1, y: 0 });

          // Function to run the count-up animation
          const runCountUpAnimation = () => {
            if (animationsTriggered[stat.id]) return; // Prevent multiple runs
            
            setAnimationsTriggered(prev => ({ ...prev, [stat.id]: true }));
            
            const targetValue = parseFloat(stat.value.replace(/[^\d.-]/g, ''));
            const isPercentage = stat.value.includes('%');
            const isMultiplier = stat.value.toLowerCase().includes('x');
            
            let counter = { val: 0 };
            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / 2000, 1); // 2 seconds duration
              const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
              const counterValue = Math.floor(easedProgress * targetValue);
              
              if (isPercentage) {
                valueEl.textContent = Math.ceil(counterValue) + '%';
              } else if (isMultiplier) {
                valueEl.textContent = counterValue.toFixed(0) + 'x';
              } else {
                valueEl.textContent = Math.ceil(counterValue).toString();
              }
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            animate();
          };

          // Trigger count-up animation after a short delay (when hero loads)
          setTimeout(() => {
            if (!animationsTriggered[stat.id]) {
              runCountUpAnimation();
            }
          }, 1000); // Delay to let hero text animations complete first
        }
      });
    }
  }, [animationsTriggered]);

  // Effect for auto-sliding on mobile
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) { // Only on mobile (md breakpoint)
      const interval = setInterval(() => {
        setActiveIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % statsData.length;
          // No direct scrollIntoView here for carousel, transform will handle it.
          return nextIndex;
        });
      }, 6000); // Change stat every 6 seconds

      return () => clearInterval(interval); 
    }
  }, []);
  
  return (
    <div ref={statsContainerRef} className="w-full md:max-w-xs lg:max-w-sm xl:max-w-md mx-auto px-4 md:mx-0 md:px-0">
      {/* Desktop: Vertical List - no boxes, more compact */}
      <div className="hidden md:flex flex-col items-start gap-4 lg:gap-5">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            ref={setStatRef(stat.id)}
            className={`transition-all duration-300 transform w-full flex items-start gap-4`}
          >
            <div className={`stat-value text-3xl lg:text-4xl font-bold ${stat.mainColor} text-shadow-sm flex-shrink-0 min-w-[4rem] lg:min-w-[5rem]`}>{stat.value}</div>
            <p className="text-base lg:text-lg text-white/80 leading-snug flex-1 pt-1">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Mobile: Horizontal Carousel - updated for better UX */}
      <div className="md:hidden w-full overflow-hidden relative pb-6">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${activeIndex * 100}%)`,
            willChange: 'transform' // Hint for browser performance
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {statsData.map((stat, mobileIndex) => (
            <div
              key={stat.id}
              className={`p-4 rounded-lg bg-white/5 border border-white/10 w-full flex-shrink-0 flex items-center gap-3`}
              id={`stat-card-${stat.id}`}
              onClick={() => {
                  setActiveIndex(mobileIndex);
              }}
            >
              <div className={`text-2xl font-bold ${stat.mainColor} flex-shrink-0 min-w-[3rem]`}>{stat.value}</div>
              <p className="text-sm text-white/80 leading-relaxed flex-1">{stat.description}</p>
            </div>
          ))}
        </div>
        {/* Dots for Carousel Navigation */}
        <div className="flex justify-center space-x-2 pt-3">
          {statsData.map((stat, index) => (
            <button
              key={`dot-${stat.id}`}
              onClick={() => {
                setActiveIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? `bg-white scale-125` : 'bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`View stat ${stat.description.substring(0, 30)}...`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroStats; 