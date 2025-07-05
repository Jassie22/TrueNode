'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AppsPage = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('mobile');
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleStats, setVisibleStats] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<HTMLDivElement>(null);

  const platforms = [
    {
      id: 'mobile',
      name: 'Mobile Apps',
      subtitle: 'iOS & Android',
      description: 'Native mobile applications that deliver exceptional user experiences across all devices.',
      features: [
        'Native iOS Development (Swift)',
        'Native Android Development (Kotlin)',
        'Cross-platform Solutions (React Native)',
        'App Store Optimization',
        'Push Notifications',
        'Offline Functionality'
      ],
      icon: '📱',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 'web',
      name: 'Web Apps',
      subtitle: 'Progressive Web Apps',
      description: 'Modern web applications that work across all browsers and devices.',
      features: [
        'Progressive Web App (PWA)',
        'Single Page Applications (SPA)',
        'Real-time Data Sync',
        'Responsive Design',
        'Cross-browser Compatibility',
        'Offline Support'
      ],
      icon: '🌐',
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  const developmentPhases = [
    {
      phase: 1,
      title: 'Discovery & Planning',
      description: 'Understanding your vision and planning the technical architecture',
      activities: [
        'Requirements Analysis',
        'User Research',
        'Technical Planning',
        'Project Timeline'
      ],
      duration: '1-2 weeks',
      icon: '🔍'
    },
    {
      phase: 2,
      title: 'Design & Prototyping',
      description: 'Creating intuitive user interfaces and interactive prototypes',
      activities: [
        'Wireframing',
        'UI/UX Design',
        'Interactive Prototypes',
        'Design System'
      ],
      duration: '2-3 weeks',
      icon: '🎨'
    },
    {
      phase: 3,
      title: 'Development',
      description: 'Building your app with clean, scalable code',
      activities: [
        'Frontend Development',
        'Backend Development',
        'API Integration',
        'Database Setup'
      ],
      duration: '4-8 weeks',
      icon: '⚡'
    },
    {
      phase: 4,
      title: 'Testing & Launch',
      description: 'Ensuring quality and deploying to app stores',
      activities: [
        'Quality Assurance',
        'Beta Testing',
        'App Store Submission',
        'Launch Support'
      ],
      duration: '1-2 weeks',
      icon: '🚀'
    }
  ];

  const appShowcase = [
    {
      name: 'Food Delivery App',
      category: 'Mobile',
      description: 'Real-time order tracking and seamless payments',
      features: ['GPS Tracking', 'Payment Integration', 'Reviews'],
      color: 'bg-gradient-to-br from-orange-400 to-red-500'
    },
    {
      name: 'Fitness Tracker',
      category: 'Mobile',
      description: 'Personal fitness goals and progress tracking',
      features: ['Activity Tracking', 'Progress Charts', 'Social Features'],
      color: 'bg-gradient-to-br from-green-400 to-blue-500'
    },
    {
      name: 'Business Dashboard',
      category: 'Web App',
      description: 'Real-time analytics and business intelligence',
      features: ['Data Visualization', 'Real-time Updates', 'Export Tools'],
      color: 'bg-gradient-to-br from-purple-400 to-pink-500'
    },
    {
      name: 'Social Platform',
      category: 'Web App',
      description: 'Community engagement and content sharing',
      features: ['User Profiles', 'Content Feed', 'Real-time Chat'],
      color: 'bg-gradient-to-br from-blue-400 to-indigo-500'
    }
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

  const stat1 = useCounter(15, 2000, visibleStats);
  const stat2 = useCounter(4.9, 2500, visibleStats);
  const stat3 = useCounter(100, 3000, visibleStats);

  // Auto-play development phases
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentPhase((prev) => (prev + 1) % developmentPhases.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Apps That{' '}
                <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                  Users Love
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                From mobile apps to web applications, we create digital experiences that engage users and drive business growth.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#8b5cf6]/80 hover:to-[#06b6d4]/80 rounded-xl font-semibold transition-all duration-300"
                >
                  Start Your App
                </Link>
                <Link
                  href="/#portfolio"
                  className="px-8 py-4 border border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/10 rounded-xl font-semibold transition-all duration-300"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
            
            {/* Phone Mockup */}
            <div className="relative">
              <div className="relative mx-auto w-64 h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] rounded-[2.5rem] p-2">
                  <div className="w-full h-full bg-[#0a0a0a] rounded-[2rem] flex flex-col">
                    {/* Phone notch */}
                    <div className="flex justify-center py-2">
                      <div className="w-20 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                    
                    {/* App interface mockup */}
                    <div className="flex-1 p-4">
                      <div className="space-y-4">
                        <div className="h-8 bg-gradient-to-r from-[#8b5cf6]/20 to-[#06b6d4]/20 rounded"></div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-16 bg-[#1a1a1a] rounded-lg"></div>
                          <div className="h-16 bg-[#1a1a1a] rounded-lg"></div>
                        </div>
                        <div className="h-24 bg-gradient-to-br from-[#8b5cf6]/10 to-[#06b6d4]/10 rounded-lg"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-[#1a1a1a] rounded w-3/4"></div>
                          <div className="h-4 bg-[#1a1a1a] rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Selection */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Platform
            </span>
          </h2>
          
          {/* Platform tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  selectedPlatform === platform.id
                    ? 'bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] text-white scale-105'
                    : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                }`}
              >
                <span className="text-2xl mr-3">{platform.icon}</span>
                <div className="text-left">
                  <div>{platform.name}</div>
                  <div className="text-sm opacity-75">{platform.subtitle}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Active platform content */}
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className={`transition-all duration-500 ${
                selectedPlatform === platform.id ? 'block' : 'hidden'
              }`}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">{platform.name}</h3>
                  <p className="text-gray-400 text-lg mb-8">{platform.description}</p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {platform.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#8b5cf6] rounded-full mr-4"></div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className={`w-full h-80 rounded-2xl bg-gradient-to-br ${platform.gradient} p-1`}>
                    <div className="w-full h-full bg-[#0a0a0a] rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-8xl mb-4">{platform.icon}</div>
                        <p className="text-gray-400">Interactive Demo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#8b5cf6]/5 to-[#06b6d4]/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Our Development{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-3 bg-[#8b5cf6] hover:bg-[#8b5cf6]/80 rounded-lg font-semibold transition-all duration-300"
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'} Process Demo
            </button>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {developmentPhases.map((phase, index) => (
              <div
                key={index}
                className={`relative bg-[#1a1a1a] border-2 rounded-xl p-6 transition-all duration-500 ${
                  currentPhase === index
                    ? 'border-[#8b5cf6] scale-105 shadow-lg shadow-[#8b5cf6]/20'
                    : 'border-[#2a2a2a] hover:border-[#8b5cf6]/50'
                }`}
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{phase.icon}</div>
                  <div className="text-sm text-[#8b5cf6] font-semibold">Phase {phase.phase}</div>
                  <h3 className="text-lg font-bold">{phase.title}</h3>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">{phase.description}</p>
                
                <div className="space-y-2 mb-4">
                  {phase.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full mr-2"></div>
                      <span className="text-gray-300">{activity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <span className="text-xs text-gray-500">{phase.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            App{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Concepts
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {appShowcase.map((app, index) => (
              <div 
                key={index}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#8b5cf6]/50 transition-all duration-300 group"
              >
                <div className={`h-32 ${app.color} flex items-center justify-center`}>
                  <div className="text-white text-center">
                    <div className="text-3xl mb-2">📱</div>
                    <div className="text-sm font-semibold">{app.name}</div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="text-xs text-[#8b5cf6] mb-2">{app.category}</div>
                  <p className="text-gray-400 text-sm mb-4">{app.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {app.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="text-xs bg-[#2a2a2a] text-gray-300 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
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
              <p className="text-gray-400">Projects Planned</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#06b6d4] mb-2">{stat2.toFixed(1)}</div>
              <p className="text-gray-400">Design Rating Goal</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#10b981] mb-2">{stat3}%</div>
              <p className="text-gray-400">Quality Focused</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your Dream App?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's turn your app idea into reality with cutting-edge technology and user-focused design.
          </p>
          <Link 
            href="/booking"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#8b5cf6]/80 hover:to-[#06b6d4]/80 rounded-xl font-semibold text-lg transition-all duration-300"
          >
            Start Your App Project
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AppsPage; 