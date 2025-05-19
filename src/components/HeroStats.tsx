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
    mainColor: 'text-fuchsia-300',
    gradientFrom: 'from-fuchsia-600',
    gradientTo: 'to-pink-700',
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
          if (statEl) {
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
                },
              }
            );
          }
        });
      }
    }
  }, []);
  
  return (
    <div ref={statsContainerRef} className="w-full max-w-5xl mx-auto mt-12 md:mt-16 px-4">
      {/* Desktop: Horizontal row */}
      <div className="hidden md:flex flex-row justify-center items-stretch gap-4 lg:gap-6">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            ref={setStatRef(stat.id)}
            className={`flex-1 p-5 lg:p-6 rounded-xl shadow-xl bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} transition-all duration-300 hover:shadow-2xl hover:scale-105 transform min-w-[220px] max-w-[320px]`}
          >
            <div className={`text-4xl lg:text-5xl font-bold ${stat.mainColor} mb-2 text-shadow-sm`}>{stat.value}</div>
            <p className="text-sm lg:text-base text-white/90 leading-relaxed">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Mobile: Vertical stack */}
      <div className="md:hidden space-y-6">
        {statsData.map((stat, mobileIndex) => (
          <div
            key={stat.id}
            ref={setStatRef(stat.id)}
            className={`p-6 rounded-xl shadow-xl bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} transition-all duration-300 active:scale-95`}
            onClick={() => {
                const statElement = individualStatRefs.current[stat.id];
                if (statElement && mobileIndex !== activeIndex) {
                    setActiveIndex(mobileIndex);
                }
            }}
          >
            <div className={`text-3xl font-bold ${stat.mainColor} mb-2 text-shadow-sm`}>{stat.value}</div>
            <p className="text-base text-white/90 leading-relaxed">{stat.description}</p>
          </div>
        ))}
        <div className="flex justify-center space-x-2 pt-4">
          {statsData.map((stat, index) => (
            <button
              key={`dot-${stat.id}`}
              onClick={() => {
                const statElement = individualStatRefs.current[stat.id];
                if (statElement) {
                  statElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  setActiveIndex(index);
                }
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