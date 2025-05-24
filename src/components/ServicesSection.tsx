'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from './ServiceCard';

// Service data with detailed bullet points
const mainServices = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Custom, responsive websites optimized for performance and user experience.',
    icon: '/images/icons/web-icon.svg',
    details: [
      'Responsive design that works on all devices',
      'Performance optimization for faster load times',
      'SEO-friendly structure and implementation',
      'Custom animations and interactive elements',
      'Content management systems integration'
    ],
    subServices: [
      {
        id: 'web-1',
        title: 'Website Audit',
        description: 'Comprehensive review of your existing website with actionable recommendations.',
        icon: '/images/icons/web-icon.svg',
        details: [
          'Performance and speed assessment',
          'UX/UI evaluation and improvement suggestions',
          'SEO and content analysis',
          'Security vulnerability detection',
          'Accessibility compliance review'
        ]
      },
      {
        id: 'web-2',
        title: 'Support & Hosting',
        description: 'Reliable technical support and secure hosting solutions for your digital assets.',
        icon: '/images/icons/web-icon.svg',
        details: [
          'Managed website hosting and maintenance',
          'Regular updates and security patches',
          'Performance monitoring and optimization',
          'Backup and disaster recovery',
          'Technical support and troubleshooting'
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'App Development',
    description: 'Mobile and web applications tailored to your specific business requirements.',
    icon: '/images/icons/app-icon.svg',
    details: [
      'Native iOS and Android mobile applications',
      'Progressive Web Apps (PWA) development',
      'Cross-platform solutions (React Native, Flutter)',
      'API development and third-party integrations',
      'App store submission and optimization'
    ],
    subServices: []
  },
  {
    id: 3,
    title: 'AI Integration',
    description: 'Implementing cutting-edge AI tools to streamline your business processes.',
    icon: '/images/icons/ai-icon.svg',
    details: [
      'Custom AI solutions for your business needs',
      'Chatbots and virtual assistants implementation',
      'Data analysis and prediction models',
      'Natural language processing solutions',
      'AI-driven automation systems'
    ],
    subServices: []
  },
  {
    id: 4,
    title: 'Data Analysis',
    description: 'Transform your data into actionable insights for better business decisions.',
    icon: '/images/icons/data-icon.svg',
    details: [
      'Custom dashboards and data visualization',
      'Business intelligence implementation',
      'Data collection and processing systems',
      'Predictive analytics and trend analysis',
      'Monthly website analytics updates with customer base insights',
      'Performance metrics and KPI reporting'
    ],
    subServices: []
  },
  {
    id: 5,
    title: 'Branding',
    description: 'Create a cohesive and memorable brand identity that resonates with your audience.',
    icon: '/images/icons/branding-icon.svg',
    details: [
      'Logo design and brand guidelines',
      'Visual identity system development',
      'Brand messaging and tone of voice',
      'Marketing materials and collateral',
      'Brand consistency across platforms'
    ],
    subServices: []
  },
  {
    id: 7,
    title: 'Ecommerce',
    description: 'Build powerful online stores that convert visitors into customers.',
    icon: '/images/icons/ecommerce-icon.svg',
    details: [
      'Custom ecommerce platform development',
      'Shopping cart and checkout optimization',
      'Payment gateway integration',
      'Inventory and order management systems',
      'Customer account and loyalty programs'
    ],
    subServices: []
  }
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const serviceContainerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const hoverTimeouts = useRef<Array<NodeJS.Timeout | null>>([]);
  const transformTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Register GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate background blobs
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
        
        // Create a master timeline for animations with immediate trigger
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%', // Trigger very early
            toggleActions: 'play none none none', // Play once, don't reverse
            once: true // Only trigger once
          },
          defaults: {
            duration: 0.4,
            ease: 'power2.out'
          }
        });
        
        // Quick and subtle animations for title and description
        masterTl.fromTo(
          titleRef.current,
          { 
            opacity: 0.9,
            y: 5
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3
          },
          0
        );
        
        masterTl.fromTo(
          descriptionRef.current,
          {
            opacity: 0.7,
            y: 5
          },
          {
            opacity: 0.8,
            y: 0,
            duration: 0.3
          },
          0
        );
        
        // Animate service cards with faster staggered entrance
        /* // REMOVING THIS FADE-IN ANIMATION FOR SERVICE CARDS
        if (serviceContainerRef.current) {
          const serviceCards = serviceContainerRef.current.querySelectorAll('.service-card');
          masterTl.fromTo(
            serviceCards,
            {
              y: 20,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              stagger: 0.03,
              duration: 0.4
            },
            0.1
          );
        }
        */
        
      } catch (error) {
        console.warn('Error in ServicesSection animations:', error);
      }
    }
    
    // Clean up timeouts on unmount
    return () => {
      hoverTimeouts.current.forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  // Handle service hover
  const handleServiceHover = (index: number) => {
    // Clear any pending timeouts
    hoverTimeouts.current.forEach(timeout => {
      if (timeout) clearTimeout(timeout);
    });
    
    // Set active service immediately
    setActiveService(index);
  };
  
  // Handle service mouse leave
  const handleServiceLeave = () => {
    // Reset after a short delay to prevent flickering when moving between services
    const timeout = setTimeout(() => {
      setActiveService(null);
    }, 100);
    
    hoverTimeouts.current.push(timeout);
  };
  
  // Toggle expanded service with sub-services
  const toggleExpandService = (index: number) => {
    if (expandedService === index) {
      setExpandedService(null);
    } else {
      setExpandedService(index);
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="pt-24 pb-20 relative bg-transparent overflow-hidden enhanced-glow section-fluid-motion section-overlap-top"
    >
      {/* SVG wave divider at the top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden z-0 pointer-events-none">
        <svg className="w-full h-16 sm:h-24 text-black/50 transform -translate-y-1" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="currentColor"
            opacity="0.2"
          ></path>
        </svg>
      </div>
      
      {/* Animated background with blobs */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {/* Glow blobs - added blue tones */}
        <div className="glow-blob absolute w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] top-[-10%] left-[30%] opacity-30"></div>
        <div className="glow-blob absolute w-[400px] h-[400px] rounded-full bg-accent-magenta/4 blur-[100px] bottom-[-20%] right-[20%] opacity-20"></div>
        <div className="glow-blob absolute w-[400px] h-[400px] rounded-full bg-accent-magenta/5 blur-[80px] top-[50%] left-[10%] opacity-25"></div>
      </div>
      
      {/* Network nodes background similar to logo */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <svg className="absolute h-full w-full" preserveAspectRatio="xMidYMid slice">
          {/* Main nodes */}
          <circle cx="10%" cy="20%" r="2" fill="white" />
          <circle cx="20%" cy="70%" r="2" fill="white" />
          <circle cx="30%" cy="40%" r="2" fill="white" />
          <circle cx="40%" cy="80%" r="2" fill="white" />
          <circle cx="50%" cy="30%" r="2" fill="white" />
          <circle cx="60%" cy="60%" r="2" fill="white" />
          <circle cx="70%" cy="20%" r="2" fill="white" />
          <circle cx="80%" cy="50%" r="2" fill="white" />
          <circle cx="90%" cy="30%" r="2" fill="white" />
          
          {/* Connecting lines */}
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <line x1="20%" y1="70%" x2="40%" y2="80%" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <line x1="30%" y1="40%" x2="50%" y2="30%" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <line x1="40%" y1="80%" x2="60%" y2="60%" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <line x1="50%" y1="30%" x2="70%" y2="20%" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <line x1="60%" y1="60%" x2="80%" y2="50%" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <line x1="70%" y1="20%" x2="90%" y2="30%" stroke="white" strokeWidth="0.5" opacity="0.3" />
          
          {/* Cross connections */}
          <line x1="10%" y1="20%" x2="60%" y2="60%" stroke="white" strokeWidth="0.3" opacity="0.2" />
          <line x1="20%" y1="70%" x2="70%" y2="20%" stroke="white" strokeWidth="0.3" opacity="0.2" />
          <line x1="30%" y1="40%" x2="80%" y2="50%" stroke="white" strokeWidth="0.3" opacity="0.2" />
        </svg>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Section title with improved visibility */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <div className="relative z-30 py-6 px-4">
            {/* Remove dark overlay with glowing border */}
            
            {/* Purple accent line */}
            <div className="absolute h-1 w-32 bg-accent rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-glow"></div>
            
            <h2 
              ref={titleRef}
              className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-glow text-white"
              style={{ textShadow: '0 0 8px rgba(144, 58, 231, 0.3)', opacity: 1 }}
            >
              Our <span className="text-accent text-shadow-lg">Services</span>
            </h2>
            
            <div className="overflow-hidden">
              <p 
                ref={descriptionRef}
                className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed"
                style={{ opacity: 0.8 }}
              >
                Tailored digital solutions crafted with precision to elevate your business presence and performance.
              </p>
            </div>
          </div>
        </div>
        
        {/* Service cards grid */}
        <div 
          ref={serviceContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8"
        >
          {mainServices.map((service, index) => (
            <div key={service.id} className="service-card transform transition-all duration-300">
              <ServiceCard
                service={service}
                active={activeService === index}
                expanded={expandedService === index}
                onHover={() => handleServiceHover(index)}
                onLeave={handleServiceLeave}
                onToggleExpand={() => toggleExpandService(index)}
              />
            </div>
          ))}
        </div>
        
        {/* CTA section */}
        <div className="mt-20 text-center">
          <div className="overflow-hidden mb-6">
            <p 
              className="text-white/70 max-w-2xl mx-auto transform transition-all duration-700 animate-fade-in-up"
            >
              Not sure which service is right for your specific needs? Let's discuss your project in detail.
            </p>
          </div>
          <button
            onClick={() => window.Calendly?.initPopupWidget({url: 'https://calendly.com/jasmeendahak03/30min'})}
            className="px-8 py-4 bg-gradient-to-r from-accent to-[#1B6CF2] hover:from-accent-light hover:to-[#3D82F3] text-white font-medium rounded-lg transition-all duration-300 shadow-glow-accent"
          >
            Schedule Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 