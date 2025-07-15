'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const svgs = [
  // Tech Icons
  { name: 'Angular', path: '/tech-icons/angular.svg' },
  { name: 'AWS', path: '/tech-icons/aws.svg' },
  { name: 'CSS3', path: '/tech-icons/css3.svg' },
  { name: 'Docker', path: '/tech-icons/docker.svg' },
  { name: 'Express.js', path: '/tech-icons/expressjs.svg' },
  { name: 'Figma', path: '/tech-icons/figma.svg' },
  { name: 'Flutter', path: '/tech-icons/flutter.svg' },
  { name: 'Git', path: '/tech-icons/git.svg' },
  { name: 'GitHub', path: '/tech-icons/github.svg' },
  { name: 'GraphQL', path: '/tech-icons/graphql.svg' },
  { name: 'HTML5', path: '/tech-icons/html5.svg' },
  { name: 'Hugging Face', path: '/tech-icons/huggingface.svg' },
  { name: 'JavaScript', path: '/tech-icons/javascript.svg' },
  { name: 'Kotlin', path: '/tech-icons/kotlin.svg' },
  { name: 'Kubernetes', path: '/tech-icons/kubernetes.svg' },
  { name: 'LangChain', path: '/tech-icons/langchain.svg' },
  { name: 'MongoDB', path: '/tech-icons/mongodb.svg' },
  { name: 'MySQL', path: '/tech-icons/mysql.svg' },
  { name: 'n8n', path: '/tech-icons/n8n.svg' },
  { name: 'Next.js', path: '/tech-icons/nextjs.svg' },
  { name: 'Node.js', path: '/tech-icons/nodejs.svg' },
  { name: 'NPM', path: '/tech-icons/npm.svg' },
  { name: 'OpenAI', path: '/tech-icons/openai.svg' },
  { name: 'Plotly', path: '/tech-icons/plotly.svg' },
  { name: 'PostgreSQL', path: '/tech-icons/postgresql.svg' },
  { name: 'Prisma', path: '/tech-icons/prisma.svg' },
  { name: 'Python', path: '/tech-icons/python.svg' },
  { name: 'PyTorch', path: '/tech-icons/pytorch.svg' },
  { name: 'React', path: '/tech-icons/react.svg' },
  { name: 'React Native', path: '/tech-icons/reactnative.svg' },
  { name: 'Redis', path: '/tech-icons/redis.svg' },
  { name: 'Stripe', path: '/tech-icons/stripe.svg' },
  { name: 'Supabase', path: '/tech-icons/supabase.svg' },
  { name: 'Svelte', path: '/tech-icons/svelte.svg' },
  { name: 'Swift', path: '/tech-icons/swift.svg' },
  { name: 'Tailwind CSS', path: '/tech-icons/tailwindcss.svg' },
  { name: 'TensorFlow', path: '/tech-icons/tensorflow.svg' },
  { name: 'Three.js', path: '/tech-icons/threejs.svg' },
  { name: 'TypeScript', path: '/tech-icons/typescript.svg' },
  { name: 'Vercel', path: '/tech-icons/vercel.svg' },
  { name: 'Vite', path: '/tech-icons/vite.svg' },
  { name: 'Vue.js', path: '/tech-icons/vuejs.svg' },
  { name: 'R', path: '/tech-icons/r.svg' },
  { name: 'Power BI', path: '/tech-icons/powerbi.svg' },
  { name: 'Excel', path: '/tech-icons/excel.svg' },

  // Service Icons
  { name: 'AI Icon', path: '/images/icons/ai-icon.svg' },
  { name: 'App Icon', path: '/images/icons/app-icon.svg' },
  { name: 'Branding Icon', path: '/images/icons/branding-icon.svg' },
  { name: 'Data Icon', path: '/images/icons/data-icon.svg' },
  { name: 'E-commerce Icon', path: '/images/icons/ecommerce-icon.svg' },
  { name: 'Web Icon', path: '/images/icons/web-icon.svg' },
];

const SvgsPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 mt-8">
            SVG Icon Library
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A central repository of all the technology and service icons used throughout the TrueNode website.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
          {svgs.map((svg) => (
            <div 
              key={svg.name} 
              className="flex flex-col items-center justify-center text-center p-4 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:border-[#8b5cf6]/50 transition-all duration-300"
            >
              <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                <Image
                  src={svg.path}
                  alt={`${svg.name} icon`}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span className="text-sm text-gray-300">{svg.name}</span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SvgsPage; 