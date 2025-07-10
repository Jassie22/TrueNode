'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DataAnalysisPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleStats, setVisibleStats] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const caseStudies = [
    {
      title: 'E-commerce Revenue Optimization',
      challenge: 'Declining conversion rates despite increased traffic',
      solution: 'Comprehensive customer journey and funnel analysis',
      result: 'Identified key drop-off points and optimization opportunities',
      improvement: '35% increase in conversion rate'
    },
    {
      title: 'SaaS Customer Retention',
      challenge: 'High churn rate affecting growth',
      solution: 'Predictive analytics for early churn detection',
      result: 'Built early warning system for at-risk customers',
      improvement: '42% reduction in churn rate'
    },
    {
      title: 'Manufacturing Efficiency',
      challenge: 'Production bottlenecks and waste',
      solution: 'Operational data analysis and process optimization',
      result: 'Identified inefficiencies and resource allocation issues',
      improvement: '28% increase in productivity'
    }
  ];

  const tools = [
    { name: 'Python', icon: '/tech-icons/python.svg', description: 'Data analysis and modeling' },
    { name: 'Tableau', icon: '/tech-icons/plotly.svg', description: 'Data visualization' },
    { name: 'SQL', icon: '/tech-icons/postgresql.svg', description: 'Database querying' },
    { name: 'Power BI', icon: '/tech-icons/powerbi.svg', description: 'Business intelligence' },
    { name: 'R', icon: '/tech-icons/r.svg', description: 'Statistical analysis' },
    { name: 'Excel', icon: '/tech-icons/excel.svg', description: 'Data manipulation' }
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

  const stat1 = useCounter(500, 2000, visibleStats);
  const stat2 = useCounter(12, 2500, visibleStats);
  const stat3 = useCounter(95, 3000, visibleStats);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % caseStudies.length);
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
              Turn Data into{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Decisions
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Unlock the power of your data with comprehensive analytics that reveal insights, predict trends, and drive strategic business decisions.
            </p>
          </div>
          
          {/* Hero CTA */}
          <div className="text-center mb-16">
            <Link
              href="/booking"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#8b5cf6]/80 hover:to-[#06b6d4]/80 rounded-xl font-semibold text-lg transition-all duration-300 mr-4"
            >
              Start Analysis
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
                Data is Your Business's Hidden Potential
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We believe that every small business has untapped potential waiting to be discovered in their data. Our approach goes beyond generic analytics solutions.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                We create bespoke data analysis systems that authentically represent your unique business model, working closely with you to uncover insights that drive real growth.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-[#06b6d4]">
                Growing Together Through Data
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We don't just deliver reports and walk away. We develop lasting partnerships where our data solutions evolve with your business.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                As your business grows, our analytics adapt, providing deeper insights and more sophisticated analysis to fuel your continued success.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Live Dashboard Demo */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              See Our Work in{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Action
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience a real business dashboard we created - featuring sales analytics, customer insights, 
              financial metrics, and operational data all in one powerful interface.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#8b5cf6]/5 to-[#06b6d4]/5 rounded-2xl p-1 shadow-2xl">
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#8b5cf6]/20">
              <div className="flex flex-col lg:flex-row gap-6 mb-6">
                <div className="lg:w-1/3">
                  <h3 className="text-2xl font-semibold mb-4 text-[#8b5cf6]">Interactive Business Dashboard</h3>
                  <p className="text-gray-400 mb-4">
                    This comprehensive dashboard showcases real-time business metrics including:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#2dd4bf] rounded-full mr-3"></div>
                      Sales performance tracking
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#60a5fa] rounded-full mr-3"></div>
                      Customer satisfaction metrics
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#a78bfa] rounded-full mr-3"></div>
                      Social media analytics
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#f59e0b] rounded-full mr-3"></div>
                      Geographic user distribution
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#10b981] rounded-full mr-3"></div>
                      Deal pipeline management
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <a
                      href="/demos/business-dashboard.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#8b5cf6]/80 hover:to-[#06b6d4]/80 rounded-xl font-semibold transition-all duration-300"
                    >
                      Open Full Dashboard
                    </a>
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  <div className="relative rounded-xl overflow-hidden border border-[#8b5cf6]/20 bg-gradient-to-br from-[#8b5cf6]/5 to-[#06b6d4]/5 p-2">
                    <div className="rounded-xl overflow-hidden bg-[#1a1a1a] w-full h-[300px] sm:h-[400px] lg:h-[450px]">
                      <iframe
                        src="/demos/business-dashboard.html"
                        className="w-full h-full"
                        title="Business Dashboard Demo"
                        frameBorder="0"
                        style={{ 
                          transform: 'scale(0.6)', 
                          transformOrigin: 'top left', 
                          width: '166.67%', 
                          height: '166.67%' 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  ✨ Built with pandas, numpy, and plotly - exactly as specified in your requirements
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#8b5cf6]/5 to-[#06b6d4]/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Success{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
          
          <div className="relative">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === currentSlide ? 'block' : 'hidden'
                }`}
              >
                <div className="bg-[#1a1a1a] rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-bold mb-6">{study.title}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-[#f59e0b]">Challenge</h4>
                        <p className="text-gray-400">{study.challenge}</p>
                      </div>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-[#8b5cf6]">Solution</h4>
                        <p className="text-gray-400">{study.solution}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-[#06b6d4]">Result</h4>
                        <p className="text-gray-400">{study.result}</p>
                      </div>
                      <div className="bg-gradient-to-r from-[#10b981]/20 to-[#10b981]/10 rounded-lg p-4">
                        <h4 className="text-lg font-semibold mb-2 text-[#10b981]">Impact</h4>
                        <p className="text-white font-semibold text-xl">{study.improvement}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Slide indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {caseStudies.map((_, index) => (
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

      {/* Tools Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Professional{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Tools
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
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

      {/* Stats Section */}
      <section className="py-20 px-6" ref={statsRef}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-[#8b5cf6] mb-2">{stat1}+</div>
              <p className="text-gray-400">Data Points Analyzed</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#06b6d4] mb-2">{stat2}+</div>
              <p className="text-gray-400">Analytics Tools Mastered</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#10b981] mb-2">{stat3}%</div>
              <p className="text-gray-400">Insight Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Unlock Your Data's Potential?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's transform your raw data into actionable insights that drive real business results.
          </p>
          <Link
            href="/booking"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#8b5cf6]/80 hover:to-[#06b6d4]/80 rounded-xl font-semibold text-lg transition-all duration-300"
          >
            Start Your Data Analysis
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DataAnalysisPage; 