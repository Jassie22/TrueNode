'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BrandingPage = () => {
  const [activeTab, setActiveTab] = useState('identity');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleStats, setVisibleStats] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const brandingServices = [
    {
      id: 'identity',
      name: 'Brand Identity',
      description: 'Create a cohesive visual identity that represents your brand values',
      features: ['Logo Design', 'Color Palette', 'Typography', 'Brand Guidelines', 'Visual Style'],
      color: 'from-purple-500 to-pink-600',
      icon: '🎨'
    },
    {
      id: 'strategy',
      name: 'Brand Strategy',
      description: 'Develop a comprehensive strategy that positions your brand for success',
      features: ['Market Research', 'Brand Positioning', 'Target Audience', 'Messaging Strategy', 'Competitive Analysis'],
      color: 'from-blue-500 to-purple-600',
      icon: '🎯'
    },
    {
      id: 'digital',
      name: 'Digital Branding',
      description: 'Extend your brand presence across all digital touchpoints',
      features: ['Social Media Assets', 'Website Branding', 'Email Templates', 'Digital Campaigns', 'Online Presence'],
      color: 'from-green-500 to-blue-600',
      icon: '💻'
    },
    {
      id: 'print',
      name: 'Print Materials',
      description: 'Professional print materials that maintain brand consistency',
      features: ['Business Cards', 'Brochures', 'Letterheads', 'Marketing Materials', 'Packaging Design'],
      color: 'from-orange-500 to-red-600',
      icon: '📄'
    }
  ];

  const brandConcepts = [
    {
      title: 'Tech Startup Rebrand',
      challenge: 'Outdated visual identity not resonating with target market',
      solution: 'Modern, clean brand identity reflecting innovation and trust',
      result: 'Complete visual overhaul with strategic positioning',
      improvement: 'Enhanced brand recognition and market appeal'
    },
    {
      title: 'Restaurant Chain Identity',
      challenge: 'Inconsistent branding across multiple locations',
      solution: 'Unified brand guidelines and asset creation',
      result: 'Cohesive brand experience across all touchpoints',
      improvement: 'Improved customer recognition and loyalty'
    },
    {
      title: 'Professional Services Firm',
      challenge: 'Generic appearance lacking professional credibility',
      solution: 'Premium brand identity emphasizing expertise',
      result: 'Elevated brand perception and market positioning',
      improvement: 'Increased client trust and premium pricing'
    }
  ];

  const designTools = [
    { name: 'Figma', icon: '/tech-icons/figma.svg', description: 'Interface design and prototyping' },
    { name: 'Adobe Creative', icon: '/tech-icons/figma.svg', description: 'Professional design suite' },
    { name: 'Sketch', icon: '/tech-icons/figma.svg', description: 'Vector design tool' },
    { name: 'Canva', icon: '/tech-icons/figma.svg', description: 'Template-based design' },
    { name: 'Procreate', icon: '/tech-icons/figma.svg', description: 'Digital illustration' },
    { name: 'InVision', icon: '/tech-icons/figma.svg', description: 'Design collaboration' }
  ];

  // Counter animation hook
  const useCounter = (end: number, duration: number = 2000, start: boolean = false) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!start) return;
      
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, [end, duration, start]);
    
    return count;
  };

  const stat1 = useCounter(100, 2000, visibleStats);
  const stat2 = useCounter(15, 2500, visibleStats);
  const stat3 = useCounter(98, 3000, visibleStats);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % brandConcepts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleStats(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Build Brands That{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Resonate
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Create memorable brand identities that connect with your audience, communicate your values, and drive business growth through strategic design.
            </p>
          </div>
          
          {/* Hero CTA */}
          <div className="text-center mb-16">
            <Link
              href="/booking"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#8b5cf6]/80 hover:to-[#06b6d4]/80 rounded-xl font-semibold text-lg transition-all duration-300 mr-4"
            >
              Start Your Brand
            </Link>
            <Link
              href="/#portfolio"
              className="inline-block px-8 py-4 border border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/10 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Branding Services Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Branding{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {brandingServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === service.id
                    ? 'bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] text-white'
                    : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          {brandingServices.map((service) => (
            <div
              key={service.id}
              className={`transition-all duration-500 ${
                activeTab === service.id ? 'block' : 'hidden'
              }`}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">{service.name}</h3>
                  <p className="text-gray-400 text-lg mb-6">{service.description}</p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#8b5cf6] rounded-full mr-3"></div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className={`w-full h-80 rounded-xl bg-gradient-to-br ${service.color} p-1`}>
                    <div className="w-full h-full bg-[#1a1a1a] rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-8xl mb-4">{service.icon}</div>
                        <p className="text-gray-400">Design Showcase</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Concepts */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#8b5cf6]/5 to-[#06b6d4]/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Brand{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Transformations
            </span>
          </h2>
          
          <div className="relative">
            {brandConcepts.map((concept, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === currentSlide ? 'block' : 'hidden'
                }`}
              >
                <div className="bg-[#1a1a1a] rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-bold mb-6">{concept.title}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-[#f59e0b]">Challenge</h4>
                        <p className="text-gray-400">{concept.challenge}</p>
                      </div>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-[#8b5cf6]">Solution</h4>
                        <p className="text-gray-400">{concept.solution}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-[#06b6d4]">Result</h4>
                        <p className="text-gray-400">{concept.result}</p>
                      </div>
                      <div className="bg-gradient-to-r from-[#10b981]/20 to-[#10b981]/10 rounded-lg p-4">
                        <h4 className="text-lg font-semibold mb-2 text-[#10b981]">Impact</h4>
                        <p className="text-white font-semibold text-xl">{concept.improvement}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Slide indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {brandConcepts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-[#8b5cf6]' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Design Tools Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Creative{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Tools
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {designTools.map((tool, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-center hover:border-[#8b5cf6]/50 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src={tool.icon}
                    alt={`${tool.name} icon`}
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-gray-400 text-sm">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#8b5cf6]/5 to-[#06b6d4]/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Brand{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your brand, values, and target audience' },
              { step: '02', title: 'Strategy', desc: 'Developing positioning and messaging framework' },
              { step: '03', title: 'Design', desc: 'Creating visual identity and brand assets' },
              { step: '04', title: 'Implementation', desc: 'Launching and maintaining brand consistency' }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{phase.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{phase.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6" ref={statsRef}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-[#8b5cf6] mb-2">{stat1}+</div>
              <p className="text-gray-400">Brand Concepts Created</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#06b6d4] mb-2">{stat2}+</div>
              <p className="text-gray-400">Design Tools Mastered</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#10b981] mb-2">{stat3}%</div>
              <p className="text-gray-400">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's create a brand identity that captures your essence and connects with your audience.
          </p>
          <Link
            href="/booking"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#8b5cf6]/80 hover:to-[#06b6d4]/80 rounded-xl font-semibold text-lg transition-all duration-300"
          >
            Start Your Brand Journey
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandingPage; 