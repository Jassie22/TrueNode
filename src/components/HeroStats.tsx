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
    value: '93%',
    description: 'of businesses see ROI within 6 months of digital transformation.',
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

  // Helper to assign refs
  const setStatRef = (id: string) => (el: HTMLDivElement | null) => {
    individualStatRefs.current[id] = el;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      if (statsContainerRef.current) {
        gsap.fromTo(
          statsContainerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: 'top bottom-=100px',
              toggleActions: 'play none none none',
            },
          }
        );

        statsData.forEach((stat) => {
          const statEl = individualStatRefs.current[stat.id];
          const valueEl = statEl?.querySelector('.stat-value'); // Add a class to the value element

          if (statEl && valueEl) {
            gsap.fromTo(
              statEl,
              { opacity: 0, scale: 0.8, y: 30 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: 'back.out(1.4)',
                scrollTrigger: {
                  trigger: statEl,
                  start: 'top bottom-=150px',
                  toggleActions: 'play none none none',
                  onEnter: () => {
                    // Number count-up animation
                    const targetValue = parseFloat(stat.value.replace(/[^\d.-]/g, ''));
                    const isPercentage = stat.value.includes('%');
                    const isMultiplier = stat.value.toLowerCase().includes('x');
                    
                    let counter = { val: 0 };
                    gsap.to(counter, {
                      val: targetValue,
                      duration: 1.5,
                      ease: 'power2.out',
                      onUpdate: () => {
                        if (isPercentage) {
                          valueEl.textContent = Math.ceil(counter.val) + '%';
                        } else if (isMultiplier) {
                          valueEl.textContent = counter.val.toFixed(0) + 'x'; // Assuming integer for '2x' type
                        } else {
                          valueEl.textContent = Math.ceil(counter.val).toString();
                        }
                      },
                    });
                  }
                },
              }
            );
          }
        });
      }
    }
  }, []);

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
    <div ref={statsContainerRef} className="w-full md:max-w-xs lg:max-w-sm mx-auto px-4 md:mx-0 md:px-0">
      {/* Desktop: Vertical List - no boxes, more compact */}
      <div className="hidden md:flex flex-col items-start gap-4 lg:gap-5">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            ref={setStatRef(stat.id)}
            className={`transition-all duration-300 transform w-full flex items-start gap-4`}
          >
            <div className={`stat-value text-3xl lg:text-4xl font-bold ${stat.mainColor} text-shadow-sm flex-shrink-0 min-w-[4rem] lg:min-w-[5rem]`}>{stat.value}</div>
            <p className="text-xs lg:text-sm text-white/80 leading-snug flex-1 pt-1">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Mobile: Horizontal Carousel */}
      <div className="md:hidden w-full overflow-hidden relative">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${activeIndex * 100}%)`,
            willChange: 'transform' // Hint for browser performance
          }}
        >
          {statsData.map((stat, mobileIndex) => (
            <div
              key={stat.id}
              className={`p-6 rounded-xl shadow-xl bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} w-full flex-shrink-0 flex items-start gap-4`}
              id={`stat-card-${stat.id}`}
              onClick={() => {
                  setActiveIndex(mobileIndex);
              }}
            >
              <div className={`text-3xl font-bold ${stat.mainColor} text-shadow-sm flex-shrink-0 min-w-[4rem]`}>{stat.value}</div>
              <p className="text-base text-white/90 leading-relaxed flex-1 pt-1">{stat.description}</p>
            </div>
          ))}
        </div>
        {/* Dots for Carousel Navigation */}
        <div className="flex justify-center space-x-2 pt-4">
          {statsData.map((stat, index) => (
            <button
              key={`dot-${stat.id}`}
              onClick={() => {
                setActiveIndex(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index ? `bg-white scale-125 shadow-md ring-2 ${stat.mainColor.replace("text-", "ring-").replace(/-\d+$/, '-500')}` : 'bg-white/30 hover:bg-white/60'
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