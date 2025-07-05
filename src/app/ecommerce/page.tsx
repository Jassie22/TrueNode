'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const EcommercePage = () => {
  const [activeTab, setActiveTab] = useState('store');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleStats, setVisibleStats] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const ecommerceServices = [
    {
      id: 'store',
      name: 'Online Store',
      description: 'Complete e-commerce solutions that convert visitors into customers',
      features: ['Product Catalogs', 'Shopping Cart', 'Checkout Process', 'Order Management', 'Customer Accounts'],
      color: 'from-green-500 to-teal-600',
      icon: '🛒'
    },
    {
      id: 'marketplace',
      name: 'Marketplace',
      description: 'Multi-vendor platforms that scale with your business',
      features: ['Vendor Management', 'Commission System', 'Multi-store Support', 'Advanced Analytics', 'Payment Distribution'],
      color: 'from-blue-500 to-purple-600',
      icon: '🏪'
    },
    {
      id: 'subscription',
      name: 'Subscription Commerce',
      description: 'Recurring revenue models with automated billing',
      features: ['Recurring Billing', 'Subscription Management', 'Payment Processing', 'Customer Retention', 'Analytics Dashboard'],
      color: 'from-purple-500 to-pink-600',
      icon: '🔄'
    },
    {
      id: 'mobile',
      name: 'Mobile Commerce',
      description: 'Mobile-optimized shopping experiences',
      features: ['Mobile App', 'Responsive Design', 'Touch Optimization', 'Push Notifications', 'Mobile Payments'],
      color: 'from-orange-500 to-red-600',
      icon: '📱'
    }
  ];

  const successStories = [
    {
      title: 'Fashion Boutique Launch',
      challenge: 'Traditional store needed online presence during pandemic',
      solution: 'Custom e-commerce platform with inventory integration',
      result: 'Seamless online shopping experience with real-time inventory',
      improvement: '300% increase in sales within 6 months'
    },
    {
      title: 'Subscription Box Service',
      challenge: 'Complex subscription model requiring custom billing',
      solution: 'Automated subscription management with flexible plans',
      result: 'Streamlined operations and improved customer retention',
      improvement: '85% customer retention rate achieved'
    },
    {
      title: 'Artisan Marketplace',
      challenge: 'Local artisans needed platform to sell online',
      solution: 'Multi-vendor marketplace with commission tracking',
      result: 'Empowered 200+ artisans with online selling capabilities',
      improvement: '500% increase in vendor reach'
    }
  ];

  const ecommerceTools = [
    { name: 'Shopify', icon: '/tech-icons/react.svg', description: 'E-commerce platform' },
    { name: 'WooCommerce', icon: '/tech-icons/wordpress.svg', description: 'WordPress e-commerce' },
    { name: 'Stripe', icon: '/tech-icons/stripe.svg', description: 'Payment processing' },
    { name: 'PayPal', icon: '/tech-icons/stripe.svg', description: 'Online payments' },
    { name: 'Magento', icon: '/tech-icons/react.svg', description: 'Enterprise e-commerce' },
    { name: 'BigCommerce', icon: '/tech-icons/react.svg', description: 'SaaS e-commerce' }
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

  const stat1 = useCounter(250, 2000, visibleStats);
  const stat2 = useCounter(18, 2500, visibleStats);
  const stat3 = useCounter(99, 3000, visibleStats);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % successStories.length);
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
      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 mt-8">
              E-commerce That{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Converts
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Build powerful online stores that drive sales, enhance customer experience, and scale with your business goals.
            </p>
          </div>
          
          {/* Hero CTA */}
          <div className="text-center mb-16">
            <Link
              href="/booking"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#8b5cf6]/80 hover:to-[#06b6d4]/80 rounded-xl font-semibold text-lg transition-all duration-300 mr-4"
            >
              Launch Your Store
            </Link>
            <Link
              href="/#portfolio"
              className="inline-block px-8 py-4 border border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/10 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              View Examples
            </Link>
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
                Your Store, Your Success
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We believe small businesses deserve e-commerce solutions that reflect their unique brand and business model, not cookie-cutter templates that look like everyone else.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Our bespoke approach creates online stores that authentically represent your business, working closely with you to build the perfect solution that converts visitors into loyal customers.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-[#06b6d4]">
                Growing Together Online
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We don't just launch your store and disappear. We build lasting partnerships where your e-commerce platform evolves alongside your business growth.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                As your business expands, we help scale your online presence, adding new features and optimizations that support your continued success in the digital marketplace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Services Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            E-commerce{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {ecommerceServices.map((service) => (
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
          {ecommerceServices.map((service) => (
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
                        <p className="text-gray-400">Store Preview</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#8b5cf6]/5 to-[#06b6d4]/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            E-commerce{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          
          <div className="relative">
            {successStories.map((story, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === currentSlide ? 'block' : 'hidden'
                }`}
              >
                <div className="bg-[#1a1a1a] rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-bold mb-6">{story.title}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-[#f59e0b]">Challenge</h4>
                        <p className="text-gray-400">{story.challenge}</p>
                      </div>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-[#8b5cf6]">Solution</h4>
                        <p className="text-gray-400">{story.solution}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-[#06b6d4]">Result</h4>
                        <p className="text-gray-400">{story.result}</p>
                      </div>
                      <div className="bg-gradient-to-r from-[#10b981]/20 to-[#10b981]/10 rounded-lg p-4">
                        <h4 className="text-lg font-semibold mb-2 text-[#10b981]">Impact</h4>
                        <p className="text-white font-semibold text-xl">{story.improvement}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Slide indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {successStories.map((_, index) => (
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

      {/* E-commerce Tools Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Powerful{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Platforms
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {ecommerceTools.map((tool, index) => (
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

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#8b5cf6]/5 to-[#06b6d4]/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Essential E-commerce{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Secure Payments", desc: "Multiple payment gateways with PCI compliance", icon: "🔒" },
              { title: "Inventory Management", desc: "Real-time stock tracking and automated alerts", icon: "📦" },
              { title: "Mobile Responsive", desc: "Optimized for all devices and screen sizes", icon: "📱" },
              { title: "SEO Optimized", desc: "Built-in SEO features for better search rankings", icon: "🔍" },
              { title: "Analytics Dashboard", desc: "Comprehensive insights into sales and customers", icon: "📊" },
              { title: "Customer Support", desc: "Integrated chat and support ticket systems", icon: "💬" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 hover:border-[#8b5cf6]/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
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
              <p className="text-gray-400">Products Sold Daily</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#06b6d4] mb-2">{stat2}+</div>
              <p className="text-gray-400">Payment Gateways</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#10b981] mb-2">{stat3}%</div>
              <p className="text-gray-400">Uptime Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Selling Online?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's build an e-commerce solution that drives sales and grows your business.
          </p>
          <Link
            href="/booking"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#8b5cf6]/80 hover:to-[#06b6d4]/80 rounded-xl font-semibold text-lg transition-all duration-300"
          >
            Launch Your E-commerce Store
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EcommercePage; 