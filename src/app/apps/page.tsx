'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AppsPage = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('mobile');
  const [currentPhase, setCurrentPhase] = useState(0);

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



  // Auto-loop development phases
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % developmentPhases.length);
    }, 3000);
    return () => clearInterval(interval);
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

      {/* Our Philosophy Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Philosophy
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-[#8b5cf6]">
                Apps That Unlock Potential
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We believe every small business has unique processes and customer needs that deserve custom solutions, not off-the-shelf apps that force you to adapt to their limitations.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Our bespoke app development approach creates digital tools that authentically represent your business model and enhance the experience you provide to your customers.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-[#06b6d4]">
                Evolving Digital Solutions
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We work closely with you to understand your workflows and challenges, tailoring apps that solve real problems and streamline your operations.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Our partnership continues beyond launch – as your business grows and evolves, we enhance your apps with new features that support your expanding success.
              </p>
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
            <p className="text-gray-400 text-lg">
              Watch as we guide you through each phase of app development
            </p>
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