'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface WorkflowNode {
  id: number;
  x: number;
  y: number;
  title: string;
  description: string;
}

interface WorkflowConnection {
  from: number;
  to: number;
  isLoop?: boolean;
  curve?: 'none' | 'up' | 'down' | 'left' | 'right';
}

interface WorkflowType {
  id: string;
  name: string;
  problem: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  viewBox: string;
}

const WebsitePage = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState('ecommerce');
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [visibleStats, setVisibleStats] = useState({ stat1: 0, stat2: 0, stat3: 0 });
  const workflowRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const workflows: Record<string, WorkflowType> = {
    ecommerce: {
      id: 'ecommerce',
      name: 'E-commerce Website',
      problem: "Generic templates don't convert visitors into customers",
      viewBox: "0 0 800 400",
      nodes: [
        { id: 1, x: 80, y: 100, title: "Business Analysis", description: "Target audience" },
        { id: 2, x: 240, y: 100, title: "Custom Design", description: "Brand-focused UI" },
        { id: 3, x: 400, y: 100, title: "Development", description: "Performance optimized" },
        { id: 4, x: 560, y: 100, title: "Payment Integration", description: "Secure checkout" },
        { id: 5, x: 560, y: 250, title: "Testing & Launch", description: "Quality assurance" },
        { id: 6, x: 240, y: 250, title: "Analytics Setup", description: "Conversion tracking" }
      ],
      connections: [
        { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 },
        { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 1, isLoop: true, curve: 'left' }
      ]
    },
    corporate: {
      id: 'corporate',
      name: 'Corporate Website',
      problem: "Your website doesn't reflect your professional expertise",
      viewBox: "0 0 700 300",
      nodes: [
        { id: 1, x: 80, y: 100, title: "Brand Strategy", description: "Professional positioning" },
        { id: 2, x: 280, y: 100, title: "Content Creation", description: "Authority building" },
        { id: 3, x: 480, y: 100, title: "Development", description: "Enterprise-grade" },
        { id: 4, x: 280, y: 200, title: "SEO Optimization", description: "Search visibility" }
      ],
      connections: [
        { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4, curve: 'down' },
        { from: 4, to: 2, isLoop: true, curve: 'up' }
      ]
    },
    portfolio: {
      id: 'portfolio',
      name: 'Portfolio Website',
      problem: "Generic portfolios fail to showcase your unique value",
      viewBox: "0 0 750 350",
      nodes: [
        { id: 1, x: 80, y: 100, title: "Work Analysis", description: "Project curation" },
        { id: 2, x: 240, y: 100, title: "Visual Design", description: "Creative showcase" },
        { id: 3, x: 400, y: 100, title: "Interactive Build", description: "Engaging experience" },
        { id: 4, x: 560, y: 100, title: "Contact System", description: "Lead capture" },
        { id: 5, x: 400, y: 220, title: "Performance", description: "Fast loading" },
        { id: 6, x: 240, y: 220, title: "Mobile Optimization", description: "All devices" }
      ],
      connections: [
        { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 5 },
        { from: 2, to: 6, curve: 'down' }, { from: 6, to: 5 }, { from: 5, to: 3, isLoop: true, curve: 'up' }
      ]
    },
    saas: {
      id: 'saas',
      name: 'SaaS Landing Page',
      problem: "Complex features confuse potential customers",
      viewBox: "0 0 900 450",
      nodes: [
        { id: 1, x: 80, y: 120, title: "Value Proposition", description: "Clear messaging" },
        { id: 2, x: 240, y: 120, title: "Feature Simplification", description: "Benefit-focused" },
        { id: 3, x: 400, y: 80, title: "Social Proof", description: "Trust building" },
        { id: 4, x: 560, y: 80, title: "Trial Signup", description: "Conversion funnel" },
        { id: 5, x: 720, y: 80, title: "Onboarding", description: "User activation" },
        { id: 6, x: 400, y: 180, title: "Demo System", description: "Interactive preview" },
        { id: 7, x: 240, y: 280, title: "Pricing Strategy", description: "Clear options" },
        { id: 8, x: 560, y: 180, title: "FAQ Section", description: "Objection handling" },
        { id: 9, x: 400, y: 280, title: "Analytics", description: "Conversion tracking" }
      ],
      connections: [
        { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 5 },
        { from: 2, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 9 }, { from: 9, to: 2, isLoop: true },
        { from: 4, to: 8 }, { from: 8, to: 9, isLoop: true }
      ]
    }
  };

  const currentWorkflow = workflows[selectedWorkflow];

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

  const stat1 = useCounter(340, 2000, visibleStats.stat1 > 0);
  const stat2 = useCounter(85, 2500, visibleStats.stat2 > 0);
  const stat3 = useCounter(47, 3000, visibleStats.stat3 > 0);

  const playWorkflow = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnimationStep(0);
    setShowReplay(false);
    
    const totalSteps = currentWorkflow.nodes.length + currentWorkflow.connections.length;
    let step = 0;
    
    const interval = setInterval(() => {
      step++;
      setAnimationStep(step);
      
      if (step >= totalSteps) {
        clearInterval(interval);
        setIsAnimating(false);
        setTimeout(() => setShowReplay(true), 800);
      }
    }, 800);
  };

  const switchWorkflow = (workflowId: string) => {
    if (workflowId === selectedWorkflow) return;
    
    setSelectedWorkflow(workflowId);
    setAnimationStep(0);
    setIsAnimating(false);
    setShowReplay(false);
    setHasPlayedOnce(false);
  };

  // Intersection Observer for workflow animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayedOnce && !isAnimating) {
            setTimeout(() => {
              playWorkflow();
              setHasPlayedOnce(true);
            }, 500);
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px' }
    );

    if (workflowRef.current) {
      observer.observe(workflowRef.current);
    }

    return () => observer.disconnect();
  }, [selectedWorkflow, hasPlayedOnce, isAnimating]);

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleStats({ stat1: 340, stat2: 85, stat3: 47 });
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

  // Helper function to generate curved path
  const generatePath = (fromNode: WorkflowNode, toNode: WorkflowNode, curve?: string, isLoop?: boolean) => {
    const startX = fromNode.x + 80;
    const startY = fromNode.y + 25;
    const endX = toNode.x + 80;
    const endY = toNode.y + 25;
    
    if (!curve || curve === 'none') {
      return `M ${startX} ${startY} L ${endX} ${endY}`;
    }
    
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    
    let controlX = midX;
    let controlY = midY;
    
    if (curve === 'up') {
      controlY -= 60;
    } else if (curve === 'down') {
      controlY += 60;
    } else if (curve === 'left') {
      controlX -= 80;
      controlY -= 30;
    } else if (curve === 'right') {
      controlX += 80;
    }
    
    if (isLoop) {
      controlY += 80;
    }
    
    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Custom Websites Built for{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Your Business Goals
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Stop settling for templates. Get a website that converts visitors into customers and grows with your business.
          </p>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 h-full hover:border-[#8b5cf6]/50 transition-all duration-300 hover:transform hover:translateY-[-4px] hover:shadow-lg hover:shadow-[#8b5cf6]/10">
                <div className="w-12 h-12 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Convert More Visitors</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Custom conversion optimization based on your specific audience and industry.</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 h-full hover:border-[#8b5cf6]/50 transition-all duration-300 hover:transform hover:translateY-[-4px] hover:shadow-lg hover:shadow-[#8b5cf6]/10">
                <div className="w-12 h-12 rounded-lg bg-[#10b981]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Optimized for speed and SEO to rank higher and keep visitors engaged.</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 h-full hover:border-[#8b5cf6]/50 transition-all duration-300 hover:transform hover:translateY-[-4px] hover:shadow-lg hover:shadow-[#8b5cf6]/10">
                <div className="w-12 h-12 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Fully Customizable</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Built specifically for your brand, industry, and business objectives.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Demos */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#8b5cf6]/5 to-[#06b6d4]/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Development{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See how we build websites that actually solve your business problems.
            </p>
          </div>

          {/* Workflow Selector */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {Object.values(workflows).map((workflow) => (
              <button
                key={workflow.id}
                onClick={() => switchWorkflow(workflow.id)}
                className={`p-4 rounded-xl border transition-all duration-300 text-left w-full hover:transform hover:translateY-[-2px] ${
                  selectedWorkflow === workflow.id
                    ? 'bg-[#1a1a1a] border-[#8b5cf6] shadow-lg shadow-[#8b5cf6]/20'
                    : 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#8b5cf6]/50'
                }`}
              >
                <h3 className="font-semibold mb-1 text-sm">{workflow.name}</h3>
                <p className="text-xs text-gray-500">Click to view</p>
              </button>
            ))}
          </div>

          {/* Problem Statement */}
          <div className="bg-gradient-to-r from-[#8b5cf6]/20 to-[#06b6d4]/20 border border-[#8b5cf6]/30 rounded-xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-[#8b5cf6] rounded-full"></div>
              <span className="text-[#8b5cf6] font-medium text-sm uppercase tracking-wide">Problem</span>
            </div>
            <p className="text-white text-lg font-medium">{currentWorkflow.problem}</p>
          </div>

          {/* Workflow Visualization */}
          <div 
            ref={workflowRef}
            className="relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 min-h-[500px]"
          >
            <svg 
              className="w-full h-full"
              viewBox={currentWorkflow.viewBox}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Render connections */}
              {currentWorkflow.connections.map((connection, index) => {
                const fromNode = currentWorkflow.nodes.find(n => n.id === connection.from);
                const toNode = currentWorkflow.nodes.find(n => n.id === connection.to);
                if (!fromNode || !toNode) return null;

                const isActive = animationStep > currentWorkflow.nodes.length + index;
                const path = generatePath(fromNode, toNode, connection.curve, connection.isLoop);
                
                return (
                  <path
                    key={`${connection.from}-${connection.to}-${index}`}
                    d={path}
                    stroke={isActive ? (connection.isLoop ? '#d946ef' : '#8b5cf6') : '#2a2a2a'}
                    strokeWidth="3"
                    fill="none"
                    className={`transition-all duration-500 ${isActive ? 'drop-shadow-[0_0_6px_rgba(139,92,246,0.8)]' : ''}`}
                    markerEnd="url(#arrowhead)"
                  />
                );
              })}
              
              {/* Arrow marker */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="8" 
                        refX="9" refY="4" orient="auto">
                  <polygon points="0 0, 10 4, 0 8" fill="#8b5cf6" />
                </marker>
              </defs>
              
              {/* Render nodes */}
              {currentWorkflow.nodes.map((node, index) => {
                const isActive = animationStep > index;
                const isPulsing = animationStep === index + 1;
                
                return (
                  <g key={node.id}>
                    <rect
                      x={node.x}
                      y={node.y}
                      width="160"
                      height="50"
                      rx="12"
                      fill={isActive ? '#1a1a1a' : '#0a0a0a'}
                      stroke={isActive ? '#8b5cf6' : '#2a2a2a'}
                      strokeWidth="2"
                      className={`transition-all duration-500 ${isPulsing ? 'animate-pulse' : ''} ${isActive ? 'drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]' : ''}`}
                    />
                    <text
                      x={node.x + 80}
                      y={node.y + 22}
                      textAnchor="middle"
                      fontSize="14"
                      fill={isActive ? 'white' : '#666'}
                      fontWeight="700"
                    >
                      {node.title}
                    </text>
                    <text
                      x={node.x + 80}
                      y={node.y + 38}
                      textAnchor="middle"
                      fontSize="11"
                      fill={isActive ? '#ccc' : '#555'}
                      fontWeight="400"
                    >
                      {node.description}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Replay Button */}
            {showReplay && !isAnimating && (
              <button
                onClick={playWorkflow}
                className="absolute top-6 right-6 px-4 py-2 bg-[#8b5cf6] hover:bg-[#8b5cf6]/80 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Replay
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-[#0a0a0a]" ref={statsRef}>
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-center hover:transform hover:translateY-[-4px] transition-all duration-300 hover:shadow-lg">
              <div className="text-4xl font-bold mb-2 text-[#10b981]">
                {stat1}%
              </div>
              <p className="text-gray-400 text-sm">Average Conversion Increase</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-center hover:transform hover:translateY-[-4px] transition-all duration-300 hover:shadow-lg">
              <div className="text-4xl font-bold mb-2 text-[#8b5cf6]">
                {stat2}+
              </div>
              <p className="text-gray-400 text-sm">PageSpeed Score</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-center hover:transform hover:translateY-[-4px] transition-all duration-300 hover:shadow-lg">
              <div className="text-4xl font-bold mb-2 text-[#06b6d4]">
                {stat3}%
              </div>
              <p className="text-gray-400 text-sm">Faster Than Competitors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Custom Beats Templates
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Industry-Specific Design", desc: "Built for your industry's conversion patterns and user expectations" },
              { title: "Competitive Advantage", desc: "Stand out from competitors using the same generic templates" },
              { title: "Performance Optimized", desc: "Code written specifically for your content and functionality needs" },
              { title: "Scalable Architecture", desc: "Grows with your business without platform limitations" },
              { title: "Brand Consistency", desc: "Every element reinforces your unique brand identity" },
              { title: "Conversion Focused", desc: "Every design decision optimized for your specific goals" }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#8b5cf6]/50 transition-all duration-300 hover:transform hover:translateY-[-4px] hover:shadow-lg hover:shadow-[#8b5cf6]/10"
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready for a Website That Converts?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's discuss your specific business goals and build a website that delivers results.
          </p>
          <Link 
            href="/booking"
            className="inline-block px-8 py-4 bg-[#8b5cf6] hover:bg-[#8b5cf6]/80 rounded-xl font-semibold text-lg transition-all duration-300 hover:transform hover:translateY-[-2px] hover:shadow-lg hover:shadow-[#8b5cf6]/25"
          >
            Get Your Website Analysis
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebsitePage; 