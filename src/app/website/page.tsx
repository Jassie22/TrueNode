'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const WebsitePage = () => {
  const [activeTab, setActiveTab] = useState('business');

  const websiteTypes = [
    {
      id: 'business',
      name: 'Business Websites',
      description: 'Professional websites that establish credibility and drive conversions',
      features: ['Custom Design', 'SEO Optimized', 'Mobile Responsive', 'Fast Loading', 'Contact Forms'],
      color: 'from-blue-500 to-purple-600',
      image: '/images/business-website.jpg'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Stores',
      description: 'Powerful online stores that convert visitors into customers',
      features: ['Shopping Cart', 'Payment Integration', 'Inventory Management', 'User Accounts', 'Analytics'],
      color: 'from-green-500 to-teal-600',
      image: '/images/ecommerce-website.jpg'
    },
    {
      id: 'portfolio',
      name: 'Portfolio Sites',
      description: 'Stunning showcases that highlight your work and attract clients',
      features: ['Gallery Layouts', 'Project Showcases', 'Client Testimonials', 'Contact Systems', 'Blog Integration'],
      color: 'from-orange-500 to-pink-600',
      image: '/images/portfolio-website.jpg'
    },
    {
      id: 'landing',
      name: 'Landing Pages',
      description: 'High-converting pages designed for specific campaigns and goals',
      features: ['A/B Testing', 'Lead Capture', 'Conversion Optimization', 'Analytics', 'Fast Performance'],
      color: 'from-purple-500 to-blue-600',
      image: '/images/landing-page.jpg'
    }
  ];

  const technologies = [
    { name: 'React', icon: '/tech-icons/react.svg', description: 'Modern, fast user interfaces' },
    { name: 'Next.js', icon: '/tech-icons/nextjs.svg', description: 'Full-stack React framework' },
    { name: 'TypeScript', icon: '/tech-icons/typescript.svg', description: 'Type-safe development' },
    { name: 'Tailwind CSS', icon: '/tech-icons/tailwindcss.svg', description: 'Utility-first styling' },
    { name: 'Node.js', icon: '/tech-icons/nodejs.svg', description: 'Server-side JavaScript' },
    { name: 'MongoDB', icon: '/tech-icons/mongodb.svg', description: 'Flexible database solutions' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 mt-8">
              Websites That{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Work for You
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Custom websites designed to grow your business, not just look pretty. Every site is built with purpose, performance, and results in mind.
            </p>
          </div>
          
          {/* Hero CTA */}
          <div className="text-center mb-16">
            <Link
              href="/booking"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#8b5cf6]/80 hover:to-[#06b6d4]/80 rounded-xl font-semibold text-lg transition-all duration-300 mr-4"
            >
              Start Your Project
            </Link>
            <button className="inline-block px-8 py-4 border border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/10 rounded-xl font-semibold text-lg transition-all duration-300">
              View Portfolio
            </button>
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
                Why Websites Matter for Small Business
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We believe websites are the key to helping small businesses reach their full potential. Your online presence is often the first impression customers have of your business.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                That's why we create bespoke websites, not templates. Every business is unique, and your website should authentically represent your brand, values, and the experience you provide.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-[#06b6d4]">
                Growing Together, Not Apart
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We work closely with you to tailor the perfect solution for your business needs, understanding your goals and crafting a website that serves them.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                We develop lasting relationships where we help grow your website as your website helps grow your business – evolving together toward greater success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Checklist Section */}
      <section className="py-20 px-6 bg-[#111111]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Actionable{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              SEO Checklist
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Our websites are built with a strong SEO foundation to ensure you rank higher and attract more organic traffic. See how we help your business get found on Google.
          </p>
          <Link
            href="/seo-analysis"
            className="inline-block px-10 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#8b5cf6]/80 hover:to-[#06b6d4]/80 rounded-xl font-semibold text-lg transition-all duration-300"
          >
            Get a Free SEO Analysis
          </Link>
        </div>
      </section>


      {/* Website Types Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Website Types We{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Specialize In
            </span>
          </h2>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {websiteTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === type.id
                    ? 'bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] text-white'
                    : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          {websiteTypes.map((type) => (
            <div
              key={type.id}
              className={`transition-all duration-500 ${
                activeTab === type.id ? 'block' : 'hidden'
              }`}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">{type.name}</h3>
                  <p className="text-gray-400 text-lg mb-6">{type.description}</p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#8b5cf6] rounded-full mr-3"></div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className={`w-full h-64 rounded-xl bg-gradient-to-br ${type.color} p-1`}>
                    <div className="w-full h-full bg-[#1a1a1a] rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🌐</div>
                        <p className="text-gray-400">Preview Coming Soon</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-6 bg-[#111111]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Technologies We{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Use
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {technologies.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center">
                <div className="w-20 h-20 mb-4 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                  <Image src={tech.icon} alt={tech.name} width={40} height={40} />
                </div>
                <h3 className="text-lg font-semibold">{tech.name}</h3>
                <p className="text-gray-400 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WebsitePage; 