'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Import the same technologies array from TechnologyReel
const technologies = [
  { name: 'React', color: '#61DAFB', icon: '/tech-icons/react.svg' },
  { name: 'Next.js', color: '#000000', icon: '/tech-icons/nextjs.svg' },
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
  { name: 'Express.js', color: '#000000', icon: '/tech-icons/expressjs.svg' },
  { name: 'PostgreSQL', color: '#336791', icon: '/tech-icons/postgresql.svg' },
  { name: 'MySQL', color: '#00618A', icon: '/tech-icons/mysql.svg' },
  { name: 'MongoDB', color: '#47A248', icon: '/tech-icons/mongodb.svg' },
  { name: 'AWS', color: '#FF9900', icon: '/tech-icons/aws.svg' },
  { name: 'Kubernetes', color: '#326CE5', icon: '/tech-icons/kubernetes.svg' },
  { name: 'Docker', color: '#0db7ed', icon: '/tech-icons/docker.svg' },
  { name: 'Tailwind CSS', color: '#38B2AC', icon: '/tech-icons/tailwindcss.svg' },
  { name: 'Figma', color: '#F24E1E', icon: '/tech-icons/figma.svg' },
  { name: 'Git', color: '#F05032', icon: '/tech-icons/git.svg' },
  { name: 'GitHub', color: '#181717', icon: '/tech-icons/github.svg' },
  { name: 'Vercel', color: '#000000', icon: '/tech-icons/vercel.svg' },
  { name: 'TensorFlow', color: '#FF6F00', icon: '/tech-icons/tensorflow.svg' },
  { name: 'PyTorch', color: '#EE4C2C', icon: '/tech-icons/pytorch.svg' },
  { name: 'OpenAI', color: '#412991', icon: '/tech-icons/openai.svg' },
  { name: 'Hugging Face', color: '#FFD21E', icon: '/tech-icons/huggingface.svg' },
  { name: 'LangChain', color: '#1C3C3C', icon: '/tech-icons/langchain.svg' },
  { name: 'Three.js', color: '#000000', icon: '/tech-icons/threejs.svg' },
  { name: 'npm', color: '#CB3837', icon: '/tech-icons/npm.svg' },
  { name: 'Plotly', color: '#3d4c73', icon: '/tech-icons/plotly.svg' }
];

export default function SVGViewerPage() {
  const [selectedTech, setSelectedTech] = useState<typeof technologies[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTechnologies = technologies.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technology SVG Viewer
            </h1>
            <Link 
              href="/"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
          <p className="text-gray-400 mb-4">
            Browse all {technologies.length} technology icons used in the TechnologyReel component
          </p>
          
          {/* Search */}
          <input
            type="text"
            placeholder="Search technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-400">Total Icons</h3>
            <p className="text-2xl font-bold">{technologies.length}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-400">Filtered Results</h3>
            <p className="text-2xl font-bold">{filteredTechnologies.length}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-400">ViewBox</h3>
            <p className="text-lg font-mono">0 0 128 128</p>
          </div>
        </div>

        {/* Grid of SVG Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-8">
          {filteredTechnologies.map((tech, index) => (
            <div
              key={index}
              onClick={() => setSelectedTech(tech)}
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Image
                    src={tech.icon}
                    alt={`${tech.name} icon`}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium text-white truncate w-full">
                    {tech.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 mt-1">
                    <div
                      className="w-3 h-3 rounded-full border border-gray-600"
                      style={{ backgroundColor: tech.color }}
                    />
                    <span className="text-xs text-gray-400 font-mono">
                      {tech.color}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Tech Details */}
        {selectedTech && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedTech.name} Details</h2>
              <button
                onClick={() => setSelectedTech(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Large Icon */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center bg-gray-900 rounded-lg">
                  <Image
                    src={selectedTech.icon}
                    alt={`${selectedTech.name} icon`}
                    width={128}
                    height={128}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{selectedTech.name}</h3>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-600"
                      style={{ backgroundColor: selectedTech.color }}
                    />
                    <span className="text-gray-300 font-mono">{selectedTech.color}</span>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">Technical Info</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">File Path:</span>
                      <span className="font-mono text-green-400">{selectedTech.icon}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Brand Color:</span>
                      <span className="font-mono">{selectedTech.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ViewBox:</span>
                      <span className="font-mono">0 0 128 128</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Format:</span>
                      <span>SVG</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">Usage</h4>
                  <div className="bg-gray-900 p-3 rounded text-xs font-mono overflow-x-auto">
                    <div className="text-gray-400">// React/Next.js</div>
                    <div className="text-blue-300">import Image from 'next/image';</div>
                    <br />
                    <div className="text-green-300">&lt;Image</div>
                    <div className="text-green-300 ml-2">src="{selectedTech.icon}"</div>
                    <div className="text-green-300 ml-2">alt="{selectedTech.name} icon"</div>
                    <div className="text-green-300 ml-2">width={64}</div>
                    <div className="text-green-300 ml-2">height={64}</div>
                    <div className="text-green-300">/&gt;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>All SVG icons are stored in <code className="bg-gray-800 px-2 py-1 rounded">/public/tech-icons/</code></p>
          <p className="mt-2">Icons are optimized with consistent viewBox dimensions and official brand colors</p>
        </div>
      </div>
    </div>
  );
} 