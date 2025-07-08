'use client';

import { SpinnerDotted } from 'spinners-react';

interface LoadingPageProps {
  isLoading: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="text-center animate-loading-fade-in">
        <div className="mb-6">
          <SpinnerDotted 
            size={50} 
            thickness={100} 
            speed={100} 
            color="#23B5D3" 
          />
        </div>
        <div>
          <h2 className="text-white text-xl font-semibold mb-2">Loading TrueNode</h2>
          <p className="text-white/80 text-sm">Preparing your digital experience...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage; 