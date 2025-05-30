'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

// Technology data with external SVG file paths
const technologies = [
  { name: 'React', color: '#61DAFB', icon: '/tech-icons/react.svg' },
  { name: 'Next.js', color: '#000000', icon: '/tech-icons/nextjs.svg' },
  { name: 'React Native', color: '#61DAFB', icon: '/tech-icons/reactnative.svg' },
  { name: 'Flutter', color: '#02569B', icon: '/tech-icons/flutter.svg' },
  { name: 'Swift', color: '#FA7343', icon: '/tech-icons/swift.svg' },
  { name: 'Kotlin', color: '#7F52FF', icon: '/tech-icons/kotlin.svg' },
  { name: 'Node.js', color: '#539E43', icon: '/tech-icons/nodejs.svg' },
  { name: 'Python', color: '#3776AB', icon: '/tech-icons/python.svg' },
  { name: 'JavaScript', color: '#F7DF1E', icon: '/tech-icons/javascript.svg' },
  { name: 'TypeScript', color: '#3178C6', icon: '/tech-icons/typescript.svg' },
  { name: 'HTML5', color: '#E34F26', icon: '/tech-icons/html5.svg' },
  { name: 'CSS3', color: '#1572B6', icon: '/tech-icons/css3.svg' },
  { name: 'Vue.js', color: '#4FC08D', icon: '/tech-icons/vuejs.svg' },
  { name: 'Angular', color: '#DD0031', icon: '/tech-icons/angular.svg' },
  { name: 'Svelte', color: '#FF3E00', icon: '/tech-icons/svelte.svg' },
  { name: 'Express.js', color: '#000000', icon: '/tech-icons/expressjs.svg' },
  { name: 'GraphQL', color: '#E10098', icon: '/tech-icons/graphql.svg' },
  { name: 'PostgreSQL', color: '#336791', icon: '/tech-icons/postgresql.svg' },
  { name: 'MySQL', color: '#00618A', icon: '/tech-icons/mysql.svg' },
  { name: 'MongoDB', color: '#47A248', icon: '/tech-icons/mongodb.svg' },
  { name: 'Redis', color: '#DC382D', icon: '/tech-icons/redis.svg' },
  { name: 'Supabase', color: '#3ECF8E', icon: '/tech-icons/supabase.svg' },
  { name: 'Prisma', color: '#2D3748', icon: '/tech-icons/prisma.svg' },
  { name: 'AWS', color: '#FF9900', icon: '/tech-icons/aws.svg' },
  { name: 'Kubernetes', color: '#326CE5', icon: '/tech-icons/kubernetes.svg' },
  { name: 'Docker', color: '#0db7ed', icon: '/tech-icons/docker.svg' },
  { name: 'Tailwind CSS', color: '#38B2AC', icon: '/tech-icons/tailwindcss.svg' },
  { name: 'Vite', color: '#41D1FF', icon: '/tech-icons/vite.svg' },
  { name: 'Figma', color: '#F24E1E', icon: '/tech-icons/figma.svg' },
  { name: 'Git', color: '#F05032', icon: '/tech-icons/git.svg' },
  { name: 'GitHub', color: '#181717', icon: '/tech-icons/github.svg' },
  { name: 'Vercel', color: '#000000', icon: '/tech-icons/vercel.svg' },
  { name: 'Stripe', color: '#635BFF', icon: '/tech-icons/stripe.svg' },
  { name: 'TensorFlow', color: '#FF6F00', icon: '/tech-icons/tensorflow.svg' },
  { name: 'PyTorch', color: '#EE4C2C', icon: '/tech-icons/pytorch.svg' },
  { name: 'OpenAI', color: '#412991', icon: '/tech-icons/openai.svg' },
  { name: 'Hugging Face', color: '#FFD21E', icon: '/tech-icons/huggingface.svg' },
  { name: 'LangChain', color: '#1C3C3C', icon: '/tech-icons/langchain.svg' },
  { name: 'n8n', color: '#EA4B71', icon: '/tech-icons/n8n.svg' },
  { name: 'Three.js', color: '#000000', icon: '/tech-icons/threejs.svg' },
  { name: 'npm', color: '#CB3837', icon: '/tech-icons/npm.svg' },
  { name: 'Plotly', color: '#3d4c73', icon: '/tech-icons/plotly.svg' }
];

const TechnologyReel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="w-screen bg-transparent py-6 md:py-12 lg:pt-20 lg:pb-0 overflow-hidden relative mx-[-1rem] transform left-1/2 right-1/2 -translate-x-1/2" ref={containerRef}>
      
      <div className="relative z-10 text-center mb-4 md:mb-6 lg:mb-8 px-4">
        <div className="relative">
          {/* Purple accent line */}
          <div className="absolute h-1 w-32 bg-accent rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-4 shadow-glow"></div>
          
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-white leading-tight"
              style={{ textShadow: '0 0 15px rgba(144, 58, 231, 0.5)' }}>
            <span className="bg-gradient-to-r from-accent to-accent-blue bg-clip-text text-transparent">
              Technologies
            </span> We Work With
          </h3>
        </div>
        <p className="text-white/60 max-w-2xl mx-auto px-4 text-xs sm:text-sm md:text-base leading-relaxed">
          We employ a range of technologies and techniques to build a custom product that will boost your business
        </p>
      </div>
      
      <div className="overflow-hidden">
        <div className="tech-reel-animation">
          <div className="flex flex-row gap-6 sm:gap-6 md:gap-8 lg:gap-16 px-4 sm:px-4 md:px-8 min-w-max py-6">
            {technologies.map((tech, index) => (
              <div 
                key={`tech-${index}`}
                className="flex flex-col items-center group"
              >
                <div 
                  className="p-2 sm:p-2 md:p-3 rounded-xl transition-all duration-300 border border-transparent hover:border-accent/30 hover:bg-zinc-800/80 hover:shadow-lg hover:shadow-accent/30 hover:transform hover:-translate-y-2"
                >
                  <Image
                    src={tech.icon}
                    alt={`${tech.name} icon`}
                    width={64}
                    height={64}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-16 lg:h-16"
                    style={{ filter: 'none' }}
                  />
                </div>
                <span className="text-white/80 text-xs sm:text-xs md:text-sm font-medium mt-2 md:mt-2 lg:mt-4 transition-all duration-300 group-hover:text-accent-light max-w-[80px] text-center leading-tight">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-6 sm:gap-6 md:gap-8 lg:gap-16 px-4 sm:px-4 md:px-8 min-w-max py-6">
            {technologies.map((tech, index) => (
              <div 
                key={`tech-copy-${index}`}
                className="flex flex-col items-center group"
              >
                <div 
                  className="p-2 sm:p-2 md:p-3 rounded-xl transition-all duration-300 border border-transparent hover:border-accent/30 hover:bg-zinc-800/80 hover:shadow-lg hover:shadow-accent/30 hover:transform hover:-translate-y-2"
                >
                  <Image
                    src={tech.icon}
                    alt={`${tech.name} icon`}
                    width={64}
                    height={64}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-16 lg:h-16"
                    style={{ filter: 'none' }}
                  />
                </div>
                <span className="text-white/80 text-xs sm:text-xs md:text-sm font-medium mt-2 md:mt-2 lg:mt-4 transition-all duration-300 group-hover:text-accent-light max-w-[80px] text-center leading-tight">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyReel; 