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
  icon: string;
}

interface WorkflowConnection {
  from: number;
  to: number;
  isLoop?: boolean;
}

interface WorkflowType {
  id: string;
  name: string;
  problem: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
}

const AutomationPage = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState('ecommerce');
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [visibleStats, setVisibleStats] = useState(false);
  const workflowRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const workflows: Record<string, WorkflowType> = {
    ecommerce: {
      id: 'ecommerce',
      name: 'E-commerce Automation',
      problem: "Manual order processing creates delays and errors",
      nodes: [
        { id: 1, x: 50, y: 80, title: "Order", description: "New purchase", icon: "" },
        { id: 2, x: 200, y: 80, title: "Payment", description: "Process & verify", icon: "" },
        { id: 3, x: 350, y: 80, title: "Inventory", description: "Update stock", icon: "" },
        { id: 4, x: 500, y: 80, title: "Fulfillment", description: "Ship order", icon: "" },
        { id: 5, x: 350, y: 200, title: "Tracking", description: "Notify customer", icon: "" },
        { id: 6, x: 200, y: 200, title: "Review", description: "Request feedback", icon: "" }
      ],
      connections: [
        { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 },
        { from: 4, to: 5 }, { from: 5, to: 6 }
      ]
    },
    receptionist: {
      id: 'receptionist',
      name: 'Virtual Receptionist',
      problem: "Missed calls mean missed opportunities",
      nodes: [
        { id: 1, x: 100, y: 60, title: "Call", description: "AI answers", icon: "" },
        { id: 2, x: 300, y: 60, title: "Understand", description: "Parse request", icon: "" },
        { id: 3, x: 500, y: 60, title: "Route", description: "Find expert", icon: "" },
        { id: 4, x: 300, y: 140, title: "Schedule", description: "Book meeting", icon: "" },
        { id: 5, x: 100, y: 220, title: "Confirm", description: "Send details", icon: "" },
        { id: 6, x: 300, y: 220, title: "Log", description: "Record interaction", icon: "" },
        { id: 7, x: 500, y: 220, title: "Follow-up", description: "Automated reminders", icon: "" }
      ],
      connections: [
        { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 },
        { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 }
      ]
    },
    content: {
      id: 'content',
      name: 'Content Creation',
      problem: "Scaling content requires significant resources",
      nodes: [
        { id: 1, x: 60, y: 120, title: "Topic", description: "Input idea", icon: "" },
        { id: 2, x: 200, y: 80, title: "Research", description: "Gather data", icon: "" },
        { id: 3, x: 200, y: 160, title: "Draft", description: "Generate content", icon: "" },
        { id: 4, x: 350, y: 120, title: "Optimize", description: "SEO & style", icon: "" },
        { id: 5, x: 480, y: 80, title: "Publish", description: "Multi-channel", icon: "" },
        { id: 6, x: 480, y: 160, title: "Analyze", description: "Track performance", icon: "" },
        { id: 7, x: 580, y: 80, title: "Iterate", description: "Improve based on data", icon: "" },
        { id: 8, x: 580, y: 160, title: "Archive", description: "Store successful content", icon: "" }
      ],
      connections: [
        { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 4 },
        { from: 4, to: 5 }, { from: 4, to: 6 }, { from: 5, to: 7 }, { from: 6, to: 8 }
      ]
    },
    crm: {
      id: 'crm',
      name: 'CRM Automation',
      problem: "Manual follow-up causes delays and missed opportunities",
      nodes: [
        { id: 1, x: 50, y: 100, title: "Lead", description: "New contact", icon: "" },
        { id: 2, x: 200, y: 60, title: "Score", description: "AI qualification", icon: "" },
        { id: 3, x: 200, y: 140, title: "Segment", description: "Categorize lead", icon: "" },
        { id: 4, x: 350, y: 100, title: "Respond", description: "Instant reply", icon: "" },
        { id: 5, x: 500, y: 100, title: "Route", description: "Assign rep", icon: "" }
      ],
      connections: [
        { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 4 }, { from: 4, to: 5 }
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

  const stat1 = useCounter(67, 2000, visibleStats);
  const stat2 = useCounter(89, 2500, visibleStats);
  const stat3 = useCounter(3.2, 3000, visibleStats);

  const playWorkflow = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnimationStep(0);
    setShowReplay(false);
    
    const totalSteps = currentWorkflow.nodes.length + currentWorkflow.connections.length;
    let step = 0;
    
    const interval = setInterval(() => {
      setAnimationStep(step);
      step++;
      
      if (step > totalSteps) {
        clearInterval(interval);
        setIsAnimating(false);
        setTimeout(() => setShowReplay(true), 500);
      }
    }, 600);
  };

  const switchWorkflow = (workflowId: string) => {
    if (workflowId === selectedWorkflow) return;
    
    setSelectedWorkflow(workflowId);
    setAnimationStep(0);
    setIsAnimating(false);
    setShowReplay(false);
    setHasPlayedOnce(false);
  };

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
              Transform Manual Tasks into{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Automatic Savings
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Reduce costs and improve efficiency with intelligent automation that works around the clock, freeing your team to focus on what matters most.
            </p>
          </div>
          
          {/* Hero CTA */}
          <div className="text-center mb-16">
            <Link
              href="/booking"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#8b5cf6]/80 hover:to-[#06b6d4]/80 rounded-xl font-semibold text-lg transition-all duration-300 mr-4"
            >
              Start Automating
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
                Automation That Fits Your Business
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We believe small businesses shouldn't have to change their processes to fit generic automation tools. Every business has unique workflows and challenges.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Our bespoke automation solutions are designed around your specific needs, accurately representing how your business actually operates while freeing up your time for growth.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-[#06b6d4]">
                Partners in Your Growth Journey
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We work closely with you to understand your daily operations, identifying opportunities where automation can have the biggest impact on your efficiency and bottom line.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                As your business evolves, we enhance your automation systems, ensuring they continue to serve your growing needs and unlock new possibilities for success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Why Businesses{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Choose Automation
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Transform your operations with intelligent automation that delivers measurable results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 h-full hover:border-[#8b5cf6]/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Reclaim Time</h3>
                <p className="text-gray-400 leading-relaxed">Automate repetitive tasks that consume valuable hours daily, allowing your team to focus on strategic initiatives.</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 h-full hover:border-[#10b981]/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10b981]/20 to-[#10b981]/10 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Reduce Errors</h3>
                <p className="text-gray-400 leading-relaxed">Eliminate costly mistakes with consistent, automated processes that work perfectly every time.</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 h-full hover:border-[#06b6d4]/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#06b6d4]/20 to-[#06b6d4]/10 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Scale Seamlessly</h3>
                <p className="text-gray-400 leading-relaxed">Handle increased volume without proportional cost increases, growing your business efficiently.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Demos */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#8b5cf6]/5 to-[#06b6d4]/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Interactive Automation{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Workflows
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See how automation streamlines common business processes in real-time.
            </p>
          </div>

          {/* Workflow Selector */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {Object.values(workflows).map((workflow, index) => (
              <button
                key={workflow.id}
                onClick={() => switchWorkflow(workflow.id)}
                className={`px-8 py-4 rounded-xl border transition-all duration-300 text-left hover:transform hover:scale-105 ${
                  selectedWorkflow === workflow.id
                    ? 'bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] border-transparent text-white shadow-lg shadow-[#8b5cf6]/30'
                    : 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#8b5cf6]/50 text-white'
                } min-w-[200px]`}
              >
                <h3 className="font-semibold mb-2">{workflow.name}</h3>
                <p className="text-sm opacity-75">
                  {index % 3 === 0 ? 'View Process' : index % 3 === 1 ? 'See Workflow' : 'Explore Steps'}
                </p>
              </button>
            ))}
          </div>

          {/* Problem Statement */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 mb-8">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-[#f59e0b] rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#f59e0b]">Challenge</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{currentWorkflow.problem}</p>
              </div>
            </div>
          </div>

          {/* Workflow Visualization */}
          <div 
            ref={workflowRef}
            className="relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 min-h-[400px] overflow-hidden"
          >
            <svg 
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 600 300"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Render connections */}
              {currentWorkflow.connections.map((connection, index) => {
                const fromNode = currentWorkflow.nodes.find(n => n.id === connection.from);
                const toNode = currentWorkflow.nodes.find(n => n.id === connection.to);
                if (!fromNode || !toNode) return null;

                const isActive = animationStep > toNode.id - 1;
                
                return (
                  <line
                    key={`${connection.from}-${connection.to}-${index}`}
                    x1={fromNode.x + 40}
                    y1={fromNode.y + 15}
                    x2={toNode.x + 40}
                    y2={toNode.y + 15}
                    stroke={isActive ? '#8b5cf6' : '#2a2a2a'}
                    strokeWidth={isActive ? "4" : "2"}
                    className={`transition-all duration-500 ${isActive ? 'drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]' : ''}`}
                  />
                );
              })}
              
              {/* Render nodes */}
              {currentWorkflow.nodes.map((node, index) => {
                const isActive = animationStep > index;
                const isPulsing = animationStep === index + 1;
                
                return (
                  <g key={node.id}>
                    <rect
                      x={node.x}
                      y={node.y}
                      width="80"
                      height="30"
                      rx="12"
                      fill={isActive ? '#1a1a1a' : '#0a0a0a'}
                      stroke={isActive ? '#8b5cf6' : '#2a2a2a'}
                      strokeWidth={isActive ? "3" : "1"}
                      className={`transition-all duration-500 ${isPulsing ? 'animate-pulse' : ''} ${isActive ? 'drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]' : ''}`}
                    />
                    <text
                      x={node.x + 40}
                      y={node.y + 16}
                      textAnchor="middle"
                      fontSize="11"
                      fill={isActive ? 'white' : '#666'}
                      fontWeight="600"
                    >
                      {node.title}
                    </text>
                    
                    {/* Node description */}
                    <text
                      x={node.x + 40}
                      y={node.y + 45}
                      textAnchor="middle"
                      fontSize="9"
                      fill={isActive ? '#ccc' : '#666'}
                    >
                      {node.description}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Replay Button */}
            {showReplay && (
              <button
                onClick={playWorkflow}
                className="absolute top-6 right-6 px-6 py-3 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#8b5cf6]/50 hover:scale-105"
              >
                ▶ Replay Animation
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6" ref={statsRef}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Proven{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Results
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Industry benchmarks show the transformative power of intelligent automation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 text-center hover:border-[#10b981]/50 transition-all duration-300">
              <div className="text-5xl font-bold text-[#10b981] mb-2">{stat1}%</div>
              <p className="text-gray-400 text-lg">Average Time Reduction</p>
              <p className="text-gray-500 text-sm mt-2">Based on industry studies</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 text-center hover:border-[#8b5cf6]/50 transition-all duration-300">
              <div className="text-5xl font-bold text-[#8b5cf6] mb-2">{stat2}%</div>
              <p className="text-gray-400 text-lg">Fewer Human Errors</p>
              <p className="text-gray-500 text-sm mt-2">Consistent automated processes</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 text-center hover:border-[#06b6d4]/50 transition-all duration-300">
              <div className="text-5xl font-bold text-[#06b6d4] mb-2">{stat3.toFixed(1)}x</div>
              <p className="text-gray-400 text-lg">Faster Response Time</p>
              <p className="text-gray-500 text-sm mt-2">Instant automated responses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#8b5cf6]/5 to-[#06b6d4]/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Measurable Business{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Impact
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See the tangible benefits automation brings to your operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Time Recovery", desc: "Reclaim 3-4 hours per employee daily", icon: "⏰" },
              { title: "Error Prevention", desc: "Eliminate 95% of manual data entry mistakes", icon: "✅" },
              { title: "Response Speed", desc: "Instant automated responses capture opportunities", icon: "⚡" },
              { title: "Scale Efficiency", desc: "Handle 10x volume without additional staff", icon: "📈" },
              { title: "Consistency", desc: "Ensure every customer gets the same experience", icon: "🎯" },
              { title: "24/7 Operations", desc: "Automated systems work around the clock", icon: "🔄" }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 hover:border-[#8b5cf6]/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's analyze your processes and show you exactly how automation can revolutionize your operations.
          </p>
          <Link 
            href="/booking"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#8b5cf6]/80 hover:to-[#06b6d4]/80 rounded-xl font-semibold text-lg transition-all duration-300"
          >
            Get Your Free Automation Analysis
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AutomationPage; 