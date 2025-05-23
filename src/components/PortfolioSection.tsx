'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Define project type
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  features: string[];
  technologies: string[];
  image: string;
}

// Portfolio project data
const projects: Project[] = [
  {
    id: 1,
    title: 'TechGear',
    category: 'E-Commerce Website',
    description: 'A modern technology e-commerce platform featuring responsive design, sleek product showcases, and a streamlined checkout experience for tech enthusiasts.',
    features: [
      'Responsive mobile-first design',
      'Product visualization and comparison',
      'Streamlined checkout process',
      'Customer reviews and ratings',
      'Wishlist and favorites functionality'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    image: '/images/final-mockups/Tech eCommerce 3.png',
  },
  {
    id: 2,
    title: 'BrewMaster',
    category: 'Coffee Shop App',
    description: 'An elegant coffee shop application that allows customers to browse coffee selections, place orders for pickup, track loyalty points, and discover new seasonal varieties.',
    features: [
      'Mobile ordering system',
      'Loyalty program integration',
      'Coffee variety catalog',
      'Order history and favorites',
      'Store location finder'
    ],
    technologies: ['React Native', 'Firebase', 'Node.js', 'Express', 'Google Maps API'],
    image: '/images/final-mockups/Coffee Shop app 2 - Copy.png',
  },
  {
    id: 3,
    title: 'AnalyticsPro',
    category: 'Business Dashboard',
    description: 'An intuitive analytics dashboard providing real-time business insights, customizable data visualization, and comprehensive performance metrics all in one place.',
    features: [
      'Real-time data processing',
      'Customizable dashboard layouts',
      'Interactive charts and graphs',
      'Performance trend analysis',
      'Export and reporting functionality'
    ],
    technologies: ['React', 'D3.js', 'TypeScript', 'Node.js', 'Firebase'],
    image: '/images/final-mockups/Analytics Dash 1.png',
  },
  {
    id: 4,
    title: 'StyleStudio',
    category: 'Beauty Website',
    description: 'A sophisticated beauty salon website featuring service showcases, before/after galleries, online booking, and beauty tips blog to attract and retain clients.',
    features: [
      'Service catalog with pricing',
      'Before/after transformation gallery',
      'Online appointment booking',
      'Staff profiles and specialties',
      'Integrated beauty blog'
    ],
    technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Strapi CMS', 'Stripe'],
    image: '/images/final-mockups/Hair and Beauty 2.png',
  },
  {
    id: 5,
    title: 'BeautyNails',
    category: 'Salon Booking App',
    description: 'An elegant nail salon mobile application that allows customers to browse nail designs, book appointments, and receive special offers with a beautiful, user-friendly interface.',
    features: [
      'Design gallery and inspiration',
      'Appointment scheduling system',
      'Special offers and discounts',
      'Treatment catalog with pricing',
      'Favorite styles and booking history'
    ],
    technologies: ['React Native', 'Firebase', 'Stripe API', 'Node.js', 'Expo'],
    image: '/images/final-mockups/Nails App 1 - Copy.png',
  },
  {
    id: 6,
    title: 'Luxe Fashion',
    category: 'Luxury Brand Website',
    description: 'An elegant and immersive website for a luxury fashion brand that showcases high-end products with sophisticated design elements and smooth interactions.',
    features: [
      'Premium visual storytelling',
      'Product collections showcase',
      'Brand story and heritage section',
      'Newsletter and exclusive offers',
      'Store locator and appointments'
    ],
    technologies: ['Vue.js', 'GSAP', 'Sass', 'Strapi CMS', 'AWS'],
    image: '/images/final-mockups/Luxury Fashion.png',
  },
  {
    id: 7,
    title: 'FitLife Coach',
    category: 'Personal Trainer Website',
    description: 'A dynamic personal trainer website featuring program showcases, client testimonials, and an integrated booking system for fitness consultations and classes.',
    features: [
      'Program and service showcase',
      'Client transformation gallery',
      'Appointment scheduling system',
      'Fitness blog and resources',
      'Subscription and membership options'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    image: '/images/final-mockups/Personal Trainer 3.png',
  }
];

const PortfolioSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
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

  return (
    <section id="portfolio" className="py-16 relative bg-black overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black opacity-50"></div>
      
      {/* Section content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our <span className="text-accent">Portfolio</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Showcasing our design and development capabilities through concept projects.
          </p>
        </div>
        
        {/* Render the appropriate carousel based on screen size */}
        {isMobile ? <MobileCarousel projects={projects} /> : <DesktopCarousel projects={projects} />}
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            These concept projects demonstrate our approach and capabilities. Ready to discuss your custom project?
          </p>
          <button
            onClick={() => window.Calendly?.initPopupWidget({url: 'https://calendly.com/jasmeendahak03/30min'})}
            className="px-8 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:scale-105"
          >
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

interface CarouselProps {
  projects: Project[];
}

// Desktop implementation of the carousel
const DesktopCarousel: React.FC<CarouselProps> = ({ projects }) => {
  const initialProjectIndex = projects.length > 0 ? Math.floor(projects.length / 2) : 0;
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentCenterIndex, setCurrentCenterIndex] = useState<number>(initialProjectIndex);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Update center index based on scroll position
  const updateCenterIndex = useCallback(() => {
    if (!carouselRef.current) return;
    
    const scrollLeft = carouselRef.current.scrollLeft;
    const cardWidth = 350 + 24; // card width + spacing
    const containerWidth = carouselRef.current.clientWidth;
    const centerPosition = scrollLeft + containerWidth / 2;
    const estimatedIndex = Math.round(centerPosition / cardWidth);
    
    setCurrentCenterIndex(Math.max(0, Math.min(projects.length - 1, estimatedIndex)));
  }, [projects.length]);

  // Scroll to center the selected project card, or initial project on load
  useEffect(() => {
    if (carouselRef.current) {
      const projectToCenterId = selectedProject ?? projects[currentCenterIndex]?.id;
      if (projectToCenterId === null) return;

      const targetIdx = projects.findIndex(p => p.id === projectToCenterId);
      if (targetIdx === -1) return;

      const cardWidthCollapsed = 350;
      const cardWidthExpanded = 750;
      const spacing = 24;

      let offsetLeft = 0;
      for (let i = 0; i < targetIdx; i++) {
        const cardWidth = (projects[i].id === selectedProject && selectedProject !== null) ? cardWidthExpanded : cardWidthCollapsed;
        offsetLeft += cardWidth + spacing;
      }
      
      const currentCardEffectiveWidth = (projectToCenterId === selectedProject && selectedProject !== null) ? cardWidthExpanded : cardWidthCollapsed;
      const targetScrollLeft = offsetLeft - (carouselRef.current.clientWidth / 2) + (currentCardEffectiveWidth / 2);

      const isInitialLoad = carouselRef.current.scrollLeft === 0 && selectedProject === null;

      carouselRef.current.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: isInitialLoad ? 'auto' : 'smooth' 
      });
    }
  }, [selectedProject, projects, currentCenterIndex]);

  // Navigation functions
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -374, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 374, behavior: 'smooth' });
    }
  };
  
  // Mouse drag handlers
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };
  
  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    const deltaX = e.clientX - dragStartX;
    carouselRef.current.scrollLeft -= deltaX * 2;
    setDragStartX(e.clientX);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    updateCenterIndex();
  };

  // Handle scroll events to update center index
  const handleScroll = useCallback(() => {
    updateCenterIndex();
  }, [updateCenterIndex]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Function to handle dot click for desktop
  const handleDotClick = (index: number) => {
    setSelectedProject(null);
    setCurrentCenterIndex(index);
    
    if (carouselRef.current) {
      const cardWidthCollapsed = 350;
      const spacing = 24;
      
      let offsetLeft = 0;
      for (let i = 0; i < index; i++) {
        offsetLeft += cardWidthCollapsed + spacing;
      }
      
      const targetScrollLeft = offsetLeft - (carouselRef.current.clientWidth / 2) + (cardWidthCollapsed / 2);
      carouselRef.current.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth'
      });
    }
  };

  // Function to handle card close - ensure it stays centered
  const handleCardClose = () => {
    const currentProjectIndex = projects.findIndex(p => p.id === selectedProject);
    setSelectedProject(null);
    if (currentProjectIndex !== -1) {
      setCurrentCenterIndex(currentProjectIndex);
    }
  };

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button 
        onClick={scrollLeft}
        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all hover:scale-110 shadow-lg"
        aria-label="Previous project"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={scrollRight}
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all hover:scale-110 shadow-lg"
        aria-label="Next project"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto hide-scrollbar pb-8 pt-2"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div className="flex space-x-6 px-4">
          {projects.map((project, index) => {
            const isCentered = selectedProject === null && index === currentCenterIndex;
            
            let cardClassName = 'flex-shrink-0 relative transition-all duration-500 ease-out ';
            if (selectedProject === project.id) {
              cardClassName += 'w-[750px] z-20';
            } else if (isCentered) {
              cardClassName += 'w-[350px] scale-125 -translate-y-12 shadow-2xl shadow-accent/40 z-10 transform-gpu';
            } else {
              cardClassName += 'w-[350px] opacity-80 hover:opacity-100';
            }

            return (
              <motion.div 
                key={project.id}
                className={cardClassName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout="position"
              >
                <AnimatePresence mode="wait">
                  {selectedProject === project.id ? (
                    <motion.div
                      key="expanded"
                      className="h-[525px]"
                      initial={{ opacity: 0, width: "350px" }}
                      animate={{ opacity: 1, width: "750px" }}
                      exit={{ opacity: 0, width: "350px" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ExpandedDesktopCard 
                        project={project} 
                        onClose={handleCardClose} 
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="collapsed"
                      className="h-[525px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <DesktopProjectCard 
                        project={project} 
                        onClick={() => setSelectedProject(project.id)} 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination dots for Desktop Carousel */}
      {projects.length > 0 && (
        <div className="flex justify-center space-x-2 mt-8">
          {projects.map((project, index) => (
            <button
              key={`desktop-dot-${project.id}`}
              className={`h-3 rounded-full transition-all duration-300 ease-in-out ${
                (selectedProject === project.id || (selectedProject === null && index === currentCenterIndex)) 
                  ? "bg-accent w-8" 
                  : "bg-white/20 w-3 hover:bg-white/40"
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to project ${project.title}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

// Desktop Project Card Component (collapsed view)
const DesktopProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div 
      className="bg-gray-900 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg cursor-pointer h-full group"
      whileHover={{ scale: 1.03, y: -5 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && onClick()}
      aria-label={`View details for ${project.title}`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Project Image (portrait orientation) */}
      <div className="relative w-full aspect-[2/3]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-contain bg-gray-900"
          sizes="(max-width: 768px) 100vw, 350px"
        />
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
          <span className="inline-block bg-accent/30 text-accent-light text-xs px-3 py-1.5 rounded-full">
            {project.category}
          </span>
        </div>
        
        {/* Hover indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-accent/80 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface ExpandedCardProps {
  project: Project;
  onClose: () => void;
}

// Desktop Expanded Project Card Component
const ExpandedDesktopCard: React.FC<ExpandedCardProps> = ({ project, onClose }) => {
  const textContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number = 0) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  const listVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const listItemVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    hidden: { opacity: 0, x: 20, transition: { duration: 0.2, ease: "easeIn" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <motion.div 
      className="bg-gray-900 rounded-xl overflow-hidden border border-white/20 shadow-2xl flex flex-row h-full"
      initial={{ opacity: 0, width: "350px" }}
      animate={{ opacity: 1, width: "750px" }}
      exit={{ opacity: 0, width: "350px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Left Section - Image */}
      <motion.div 
        className="relative w-[350px] flex-shrink-0 h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-full flex items-center justify-center bg-gray-900">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 350px"
            priority
          />
        </div>
      </motion.div>
      
      {/* Right Section - Content */}
      <motion.div 
        className="flex-grow p-6 max-w-md relative"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={listVariants}
      >
        <button
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-black rounded-full transition-colors z-10"
          aria-label="Close details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      
        <motion.h3 custom={0} variants={textContentVariants} className="text-xl font-bold text-white mb-1">{project.title}</motion.h3>
        <motion.span custom={1} variants={textContentVariants} className="inline-block bg-accent/30 text-accent-light text-xs px-3 py-1.5 rounded-full mb-3">
          {project.category}
        </motion.span>
        
        <motion.p custom={2} variants={textContentVariants} className="text-sm text-gray-300 mb-4 leading-relaxed">
          {project.description}
        </motion.p>
        
        {/* Features Section */}
        <motion.div custom={3} variants={textContentVariants} className="mb-4">
          <motion.h4 variants={listItemVariants} className="text-base font-semibold text-white mb-2">Key Features</motion.h4>
          <motion.ul variants={listVariants} className="space-y-1.5">
            {project.features.map((feature, index) => (
              <motion.li key={index} variants={listItemVariants} className="flex items-start text-xs text-gray-300 leading-snug">
                <svg className="h-4 w-4 text-accent-light mr-1.5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
        
        {/* Technologies Section */}
        <motion.div custom={4} variants={textContentVariants}>
          <motion.h4 variants={listItemVariants} className="text-base font-semibold text-white mb-2">Technologies Used</motion.h4>
          <motion.div variants={listVariants} className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, index) => (
              <motion.span key={index} variants={listItemVariants} className="bg-accent/30 text-accent-light border border-accent/20 px-3 py-1 rounded-full text-xs font-medium">
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Mobile implementation of the carousel
const MobileCarousel: React.FC<CarouselProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const swipeRef = useRef<HTMLDivElement>(null);
  
  // Touch handling for mobile swiping
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const minSwipeDistance = 50;
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextProject();
    } else if (isRightSwipe) {
      prevProject();
    }
  };
  
  const prevProject = () => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };
  
  const nextProject = () => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <div className="relative">
      {/* Mobile swipe indicator */}
      <div className="relative overflow-hidden pb-6">
        <div 
          ref={swipeRef}
          className="flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm mx-auto"
            >
              <MobileProjectCard 
                project={projects[activeIndex]} 
                onClick={() => setShowModal(true)}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Pagination dots - ensuring these are always rendered if projects exist */}
      {projects.length > 0 && (
        <div className="flex justify-center space-x-2 mt-4">
          {projects.map((_, index) => (
            <button
              key={`dot-${index}`}
              className={`h-3 rounded-full transition-all duration-300 ease-in-out ${
                activeIndex === index ? "bg-accent w-8" : "bg-white/20 w-3 hover:bg-white/40"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevProject}
          className="bg-black/30 hover:bg-black/50 text-white p-3 rounded-lg transition-colors flex items-center"
          aria-label="Previous project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </button>
        
        <button
          onClick={nextProject}
          className="bg-black/30 hover:bg-black/50 text-white p-3 rounded-lg transition-colors flex items-center"
          aria-label="Next project"
        >
          <span>Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Full screen modal for mobile */}
      <AnimatePresence>
        {showModal && (
          <MobileModal 
            project={projects[activeIndex]} 
            onClose={() => setShowModal(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Project Card Component
const MobileProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div 
      className="bg-gray-900 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Project Image (portrait orientation) */}
      <div className="relative w-full aspect-[2/3]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-contain bg-gray-900"
          sizes="100vw"
        />
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
          <span className="inline-block bg-accent/30 text-accent-light text-xs px-3 py-1.5 rounded-full mb-2">
            {project.category}
          </span>
          
          {/* View details button */}
          <div className="mt-2">
            <div className="bg-accent/80 rounded-full py-2 px-4 inline-flex items-center">
              <span className="text-white text-base font-medium mr-2">View Details</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Mobile Modal Component
const MobileModal: React.FC<ExpandedCardProps> = ({ project, onClose }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black/95 z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="min-h-screen px-4 py-12">
        <div className="relative max-w-md mx-auto">
          {/* Project content */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="relative"
          >
            {/* Close button - moved to better position for mobile */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-accent rounded-full p-3 shadow-lg"
              aria-label="Close details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          
            {/* Project Image */}
            <div className="relative w-full aspect-[2/3] rounded-t-xl overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain bg-gray-900 py-4"
                sizes="100vw"
              />
            </div>
            
            {/* Project Details */}
            <div className="bg-gray-900 p-6 rounded-b-xl shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <span className="inline-block bg-accent/30 text-accent-light text-sm px-3 py-1.5 rounded-full mb-4">
                {project.category}
              </span>
            
              <p className="text-gray-200 mb-6">
                {project.description}
              </p>
            
              {/* Features Section */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-200">
                      <svg className="h-6 w-6 text-accent-light mr-3 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            
              {/* Technologies Section */}
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Technologies Used</h4>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-accent/30 text-accent-light border border-accent/20 px-4 py-2 rounded-full text-lg font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioSection;
