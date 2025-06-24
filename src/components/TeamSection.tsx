'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import TechnologyReel from './TechnologyReel';
import { AnimatePresence, motion } from 'framer-motion';

// Register GSAP plugins client-side to prevent server-side rendering issues
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Team member data
const teamMembers = [
  {
    id: 1,
    name: 'Jasmeen Dahak',
    role: 'Lead Developer',
    bio: 'Technical founder with 8+ years of development experience. Jasmeen has won machine learning competitions, built numerous dashboards, websites, and apps, and has contracted AI work contributing to the building of large AI models. Her unique blend of technical expertise brings innovative solutions to every project.',
    image: '/images/team/jasmeen.jpg',
    experience: '8+ years development, 3+ years ML/AI',
    education: 'Chemistry, University of Nottingham',
    social: {
      linkedin: 'https://www.linkedin.com/in/jasmeendahak/',
      github: 'https://github.com/Jassie22',
      email: 'jasmeen.dahak@truenode.co.uk'
    }
  },
  {
    id: 2,
    name: 'Dylan Shah',
    role: 'Project Manager & Business Lead',
    bio: 'Experienced project manager with extensive experience at Jaguar Land Rover. Dylan has successfully managed projects with budgets exceeding £2.5 million over his 3+ year career. His expertise in client management and project delivery ensures each engagement is completed to the highest standards on time and within budget.',
    image: '/images/team/dylan.png',
    experience: '3+ years in project management, specialized in client delivery',
    education: 'Mechanical Engineering, University of Nottingham',
    social: {
      linkedin: 'https://www.linkedin.com/in/dylan-shah-521732a9/',
      email: 'dylan.shah@truenode.co.uk'
    }
  }
];

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const teamMemberRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [expandedMember, setExpandedMember] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  // Swipe functionality
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwipping, setIsSwipping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  
  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwipping(true);
  };

  // Handle touch move - add visual feedback during swipe
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    
    // Limit the swipe offset to prevent extreme movements
    const maxOffset = 100;
    const limitedOffset = Math.max(-maxOffset, Math.min(maxOffset, diff * 0.5));
    
    setSwipeOffset(limitedOffset);
    setTouchEnd(currentTouch);
  };

  // Handle touch end - determine swipe direction with reduced threshold
  const handleTouchEnd = () => {
    setIsSwipping(false);
    setSwipeOffset(0);
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 30; // Reduced from 50 to 30 for more responsive swipe
    const isRightSwipe = distance < -30; // Reduced from -50 to -30
    
    if (isLeftSwipe && currentMemberIndex < teamMembers.length - 1) {
      // Swipe left: go to next member
      setCurrentMemberIndex(currentMemberIndex + 1);
    } else if (isRightSwipe && currentMemberIndex > 0) {
      // Swipe right: go to previous member
      setCurrentMemberIndex(currentMemberIndex - 1);
    }
  };

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Ensure elements are visible immediately
        if (titleRef.current) {
          titleRef.current.style.opacity = '1';
        }
        if (descriptionRef.current) {
          descriptionRef.current.style.opacity = '1';
        }
        if (teamMemberRefs.current && teamMemberRefs.current.length > 0) {
          teamMemberRefs.current.forEach(ref => {
            if (ref) ref.style.opacity = '1';
          });
        }

        // Simple background blob animation only
        let blobAnimations: gsap.core.Tween[] = [];
        if (backgroundRef.current) {
          const blobs = backgroundRef.current.querySelectorAll('.glow-blob');
          
          blobs.forEach((blob, index) => {
            gsap.set(blob, {
              x: Math.random() * 300 - 150,
              y: Math.random() * 300 - 150,
              scale: 0.8 + Math.random() * 0.4
            });
            
            const anim = gsap.to(blob, {
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
            blobAnimations.push(anim);
          });
        }
        
        // Cleanup function
        return () => {
          blobAnimations.forEach(anim => anim.kill());
          teamMemberRefs.current.forEach(memberRef => {
            if (memberRef) gsap.killTweensOf(memberRef);
          });
        };
        
      } catch (error) {
        console.warn('Error in TeamSection animations:', error);
        // Fallback to ensure visibility
        if (titleRef.current) titleRef.current.style.opacity = '1';
        if (descriptionRef.current) descriptionRef.current.style.opacity = '1';
        if (teamMemberRefs.current) {
          teamMemberRefs.current.forEach(ref => {
            if (ref) ref.style.opacity = '1';
          });
        }
      }
    }
  }, []);

  // Set refs for team members
  const setTeamMemberRef = (el: HTMLDivElement | null, index: number) => {
    teamMemberRefs.current[index] = el;
  };

  // Handle member hover
  const handleMemberHover = (index: number) => {
    if (isMobile) return; // Don't hover on mobile
    setHoveredMember(index);
    
    if (teamMemberRefs.current[index]) {
      gsap.to(teamMemberRefs.current[index], {
        y: -20,
        scale: 1.05,
        zIndex: 20,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
        duration: 0.4,
        ease: 'power2.out'
      });
      
      // Dim other members
      teamMemberRefs.current.forEach((member, i) => {
        if (i !== index && member) {
          gsap.to(member, {
            scale: 0.95,
            opacity: 0.6,
            duration: 0.3
          });
        }
      });
    }
  };
  
  // Handle member mouse leave
  const handleMemberLeave = () => {
    if (isMobile) return; // Don't hover on mobile
    setHoveredMember(null);
    
    teamMemberRefs.current.forEach((member) => {
      if (member) {
        gsap.to(member, {
          y: 0,
          scale: 1,
          opacity: 1,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });
  };
  
  // Toggle expanded member on mobile
  const toggleExpandMember = (index: number) => {
    if (!isMobile) return; // Only expand on mobile
    
    setExpandedMember(expandedMember === index ? null : index);
    
    // Animate the cards
    if (expandedMember === index) {
      // Collapse - reset all cards
      teamMemberRefs.current.forEach((member) => {
        if (member) {
          gsap.to(member, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            zIndex: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      });
    } else {
      // Expand the selected card
      teamMemberRefs.current.forEach((member, i) => {
        if (member) {
          if (i === index) {
            gsap.to(member, {
              scale: 1.05,
              zIndex: 20,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
              duration: 0.4,
              ease: 'power2.out'
            });
          } else {
            // Move other cards to the side
            gsap.to(member, {
              x: i < index ? -30 : 30,
              scale: 0.9,
              opacity: 0.6,
              duration: 0.4,
              ease: 'power2.out'
            });
          }
        }
      });
    }
  };

  return (
    <section 
      id="team"
      ref={sectionRef}
      className="py-12 sm:py-16 relative bg-transparent overflow-hidden enhanced-glow magenta-glow section-fluid-motion fade-in-section section-overlap-top"
    >
      {/* Animated background with blobs */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {/* Glow blobs - added blue tones */}
        <div className="glow-blob absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] top-[-10%] left-[20%] opacity-30"></div>
        <div className="glow-blob absolute w-[600px] h-[600px] rounded-full bg-[#1B6CF2]/8 blur-[120px] bottom-[-20%] right-[20%] opacity-30"></div>
        <div className="glow-blob absolute w-[400px] h-[400px] rounded-full bg-accent-magenta/5 blur-[80px] top-[50%] right-[-10%] opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
          <div className="relative z-30 py-6 px-4">
            {/* Purple accent line */}
            <div className="absolute h-1 w-32 bg-accent rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-8 shadow-glow"></div>
            
            <h2 
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold mb-4 text-white pt-4"
              style={{ textShadow: '0 0 8px rgba(144, 58, 231, 0.3)' }}
            >
              Our <span className="text-accent">Team</span>
            </h2>
            
            <div className="overflow-hidden relative z-30">
              <p 
                ref={descriptionRef}
                className="text-lg md:text-xl text-white font-light leading-relaxed relative z-10"
                style={{ textShadow: '0 0 10px rgba(0, 0, 0, 0.8)' }}
              >
                Meet the minds behind True Node – blending technical expertise with creative vision.
              </p>
            </div>
          </div>
        </div>
        
        {/* Regular grid view for desktop */}
        <div className="hidden md:grid grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => setTeamMemberRef(el, index)}
              className={`team-member relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-lg shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-accent/30 ${
                hoveredMember === index 
                  ? 'transform scale-105 shadow-2xl z-20 shadow-accent/20' 
                  : hoveredMember !== null 
                    ? 'transform scale-95 opacity-70' 
                    : 'shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-2xl'
              }`}
              onMouseEnter={() => handleMemberHover(index)}
              onMouseLeave={handleMemberLeave}
            >
              <div className="flex flex-col">
                {/* Image container */}
                <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 filter saturate-110"
                    style={{ 
                      transform: hoveredMember === index ? 'scale(1.08)' : 'scale(1)'
                    }}
                  />
                </div>
                
                {/* Info section */}
                <div className="flex-1 p-6 bg-zinc-900/90">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-white/80 text-sm font-medium mb-1">{member.role}</p>
                    <p className="text-white/60 text-xs mb-2">{member.experience}</p>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-white/80 text-sm leading-relaxed mb-4">{member.bio}</p>
                    
                    {/* Education */}
                    <div className="flex items-center text-white/60 text-xs mb-4">
                      <svg className="w-4 h-4 mr-2 text-accent/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                      {member.education}
                    </div>
                    
                    {/* Social icons */}
                    <div className="flex space-x-3">
                      {member.social.email && (
                        <a href={`mailto:${member.social.email}`} className="w-8 h-8 flex items-center justify-center bg-black/30 rounded-full text-white/60 hover:text-accent transition-colors border border-white/10 hover:border-accent/30">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                          </svg>
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-black/30 rounded-full text-white/60 hover:text-accent transition-colors border border-white/10 hover:border-accent/30">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      {member.social.github && (
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-black/30 rounded-full text-white/60 hover:text-accent transition-colors border border-white/10 hover:border-accent/30">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Swipeable cards for mobile */}
        <div className="relative md:hidden max-w-xs mx-auto">
          {/* Swipe container */}
          <div 
            className="w-full overflow-hidden relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Team member card */}
            <motion.div
              key={currentMemberIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ 
                opacity: 1, 
                x: swipeOffset,
                scale: isSwipping ? 0.98 : 1
              }}
              transition={{ 
                duration: isSwipping ? 0.1 : 0.3,
                ease: "easeOut"
              }}
              className="w-full"
            >
              <div 
                className="team-member relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-lg shadow-2xl"
                onClick={() => toggleExpandMember(currentMemberIndex)}
              >
                {/* Mobile slide layout */}
                <div className="flex flex-col bg-zinc-900/90">
                  {/* Image container with overlaid navigation */}
                  <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
                    <Image
                      src={teamMembers[currentMemberIndex].image}
                      alt={teamMembers[currentMemberIndex].name}
                      fill
                      className="object-cover transition-transform duration-700 filter saturate-110"
                    />
                    
                    {/* Left chevron overlay */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentMemberIndex > 0) setCurrentMemberIndex(currentMemberIndex - 1);
                      }}
                      disabled={currentMemberIndex === 0}
                      className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white rounded-full p-2 transition-all duration-200 ${
                        currentMemberIndex === 0 
                          ? 'opacity-30 cursor-not-allowed' 
                          : 'opacity-70 hover:opacity-100 hover:scale-110'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    {/* Right chevron overlay */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentMemberIndex < teamMembers.length - 1) setCurrentMemberIndex(currentMemberIndex + 1);
                      }}
                      disabled={currentMemberIndex === teamMembers.length - 1}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white rounded-full p-2 transition-all duration-200 ${
                        currentMemberIndex === teamMembers.length - 1 
                          ? 'opacity-30 cursor-not-allowed' 
                          : 'opacity-70 hover:opacity-100 hover:scale-110'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Show expand/collapse indicator */}
                    <div className={`absolute top-2 right-2 bg-black/50 rounded-full p-1.5 transition-transform duration-300 ${expandedMember === currentMemberIndex ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Info section */}
                  <div className="flex-1 p-6">
                    {/* Always visible info */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{teamMembers[currentMemberIndex].name}</h3>
                      <p className="text-white/80 text-sm font-medium mb-1">{teamMembers[currentMemberIndex].role}</p>
                      <p className="text-white/60 text-xs mb-2">{teamMembers[currentMemberIndex].experience}</p>
                    </div>
                    
                    {/* Bio, education, and social links - only visible when expanded */}
                    {expandedMember === currentMemberIndex && (
                      <div className="mt-4 animate-fadeIn">
                        <p className="text-white/80 text-sm leading-relaxed mb-4">{teamMembers[currentMemberIndex].bio}</p>
                        
                        {/* Education */}
                        <div className="flex items-center text-white/60 text-xs mb-4">
                          <svg className="w-4 h-4 mr-2 text-accent/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          </svg>
                          {teamMembers[currentMemberIndex].education}
                        </div>
                        
                        {/* Social icons */}
                        <div className="flex space-x-2 mt-4">
                          <a href={`mailto:${teamMembers[currentMemberIndex].social.email}`} className="w-8 h-8 flex items-center justify-center bg-black/30 rounded-full text-white/60 hover:text-accent transition-colors border border-white/10 hover:border-accent/30">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </a>
                          
                          <a href={teamMembers[currentMemberIndex].social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-black/30 rounded-full text-white/60 hover:text-accent transition-colors border border-white/10 hover:border-accent/30">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                            </svg>
                          </a>
                          
                          {teamMembers[currentMemberIndex].social.github && (
                            <a href={teamMembers[currentMemberIndex].social.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-black/30 rounded-full text-white/60 hover:text-accent transition-colors border border-white/10 hover:border-accent/30">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Simplified navigation - just pagination dots */}
          <div className="flex justify-center items-center mt-4">
            {/* Pagination indicators */}
            <div className="flex space-x-2 items-center">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                    index === currentMemberIndex ? 'bg-accent' : 'bg-white/30'
                  }`}
                  onClick={() => setCurrentMemberIndex(index)}
                />
              ))}
            </div>
          </div>
          
          {/* Updated swipe hint */}
          <div className="text-center mt-2">
            <p className="text-white/60 text-xs">Swipe or use arrows to navigate between team members</p>
          </div>
        </div>
        
        {/* Technology Reel */}
        <div className="mt-12">
          <TechnologyReel />
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 