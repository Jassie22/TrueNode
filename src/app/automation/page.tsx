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
  const workflowRef = useRef<HTMLDivElement>(null);

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
        { id: 1, x: 80, y: 120, title: "Topic", description: "Input idea", icon: "" },
        { id: 2, x: 240, y: 80, title: "Research", description: "Gather data", icon: "" },
        { id: 3, x: 240, y: 160, title: "Draft", description: "Generate content", icon: "" },
        { id: 4, x: 400, y: 120, title: "Optimize", description: "SEO & style", icon: "" },
        { id: 5, x: 520, y: 80, title: "Publish", description: "Multi-channel", icon: "" },
        { id: 6, x: 520, y: 160, title: "Analyze", description: "Track performance", icon: "" },
        { id: 7, x: 400, y: 200, title: "Iterate", description: "Improve based on data", icon: "" },
        { id: 8, x: 240, y: 240, title: "Archive", description: "Store successful content", icon: "" }
      ],
      connections: [
        { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 4 },
        { from: 4, to: 5 }, { from: 4, to: 6 }, { from: 5, to: 7 }, { from: 6, to: 7 }, { from: 7, to: 8 }
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 mt-8">
            Transform Manual Tasks into{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              Automatic Savings
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Reduce costs and improve efficiency with intelligent automation that works around the clock.
          </p>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 h-full hover:border-[#8b5cf6]/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Reclaim Time</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Automate repetitive tasks that consume valuable hours daily.</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 h-full hover:border-[#8b5cf6]/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[#10b981]/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Reduce Errors</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Eliminate costly mistakes with consistent, automated processes.</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 h-full hover:border-[#8b5cf6]/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Scale Seamlessly</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Handle increased volume without proportional cost increases.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Demos */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Automation{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Workflows
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See how automation streamlines common business processes.
            </p>
          </div>

          {/* Workflow Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.values(workflows).map((workflow, index) => (
              <button
                key={workflow.id}
                onClick={() => switchWorkflow(workflow.id)}
                className={`px-6 py-4 rounded-xl border transition-all duration-300 text-left hover:transform hover:scale-105 ${
                  selectedWorkflow === workflow.id
                    ? 'bg-gradient-to-r from-[#8b5cf6]/20 to-[#06b6d4]/20 border-[#8b5cf6] shadow-lg shadow-[#8b5cf6]/30'
                    : 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#8b5cf6]/50'
                } ${index % 2 === 0 ? 'min-w-[200px]' : 'min-w-[180px]'}`}
              >
                <h3 className="font-semibold mb-1 text-sm">{workflow.name}</h3>
                <p className="text-xs text-gray-500">
                  {index % 3 === 0 ? 'View Process' : index % 3 === 1 ? 'See Workflow' : 'Explore Steps'}
                </p>
              </button>
            ))}
          </div>

          {/* Problem Statement */}
          <div className={`border border-[#2a2a2a] rounded-xl p-6 mb-8 ${
            selectedWorkflow === 'ecommerce' ? 'bg-gradient-to-r from-[#8b5cf6]/5 to-[#06b6d4]/5' :
            selectedWorkflow === 'receptionist' ? 'bg-gradient-to-r from-[#10b981]/5 to-[#8b5cf6]/5' :
            selectedWorkflow === 'content' ? 'bg-gradient-to-r from-[#06b6d4]/5 to-[#10b981]/5' :
            'bg-gradient-to-r from-[#f59e0b]/5 to-[#8b5cf6]/5'
          }`}>
            <p className="text-gray-300 text-lg">{currentWorkflow.problem}</p>
          </div>

          {/* Workflow Visualization */}
          <div 
            ref={workflowRef}
            className="relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 min-h-[350px] overflow-hidden"
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

                const isActive = animationStep > currentWorkflow.nodes.length + index;
                
                return (
                  <line
                    key={`${connection.from}-${connection.to}-${index}`}
                    x1={fromNode.x + 40}
                    y1={fromNode.y + 15}
                    x2={toNode.x + 40}
                    y2={toNode.y + 15}
                    stroke={isActive ? '#8b5cf6' : '#2a2a2a'}
                    strokeWidth={isActive ? "3" : "2"}
                    className={`transition-all duration-500 ${isActive ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]' : ''}`}
                    markerEnd="url(#arrowhead)"
                  />
                );
              })}
              
              {/* Arrow marker */}
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" 
                        refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#8b5cf6" />
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
                      width="80"
                      height="30"
                      rx="8"
                      fill={isActive ? '#1a1a1a' : '#0a0a0a'}
                      stroke={isActive ? '#8b5cf6' : '#2a2a2a'}
                      strokeWidth={isActive ? "2" : "1"}
                      className={`transition-all duration-500 ${isPulsing ? 'animate-pulse' : ''} ${isActive ? 'drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]' : ''}`}
                    />
                    <text
                      x={node.x + 40}
                      y={node.y + 16}
                      textAnchor="middle"
                      fontSize="10"
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
                      fontSize="8"
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
                className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#8b5cf6]/50"
              >
                ▶ Replay
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[#10b981] mb-2">67%</div>
              <p className="text-gray-400 text-sm">Time Reduction</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[#8b5cf6] mb-2">89%</div>
              <p className="text-gray-400 text-sm">Fewer Errors</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[#06b6d4] mb-2">3.2x</div>
              <p className="text-gray-400 text-sm">Faster Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Measurable Business Impact
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Time Recovery", desc: "Reclaim 3-4 hours per employee daily" },
              { title: "Error Prevention", desc: "Eliminate 95% of manual data entry mistakes" },
              { title: "Response Speed", desc: "Instant automated responses capture opportunities" },
              { title: "Scale Efficiency", desc: "Handle 10x volume without additional staff" },
              { title: "Consistency", desc: "Ensure every customer gets the same experience" },
              { title: "24/7 Operations", desc: "Automated systems work around the clock" }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#8b5cf6]/50 transition-all duration-300"
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Calculate Your Potential Savings
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's analyze your processes and show you exactly how much automation could save.
          </p>
          <Link 
            href="/booking"
            className="inline-block px-8 py-4 bg-[#8b5cf6] hover:bg-[#8b5cf6]/80 rounded-xl font-semibold text-lg transition-all duration-300"
          >
            Get Your Savings Analysis
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AutomationPage; 