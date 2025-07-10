'use client';

import { useState, useEffect } from 'react';

interface LoadingPageProps {
  isLoading: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ isLoading }) => {
  const [loadingText, setLoadingText] = useState('Initializing your experience');
  const [dots, setDots] = useState('');

  const loadingMessages = [
    'Initializing your experience',
    'Preparing TrueNode services',
    'Loading cutting-edge solutions',
    'Configuring your digital workspace',
    'Establishing secure connections',
    'Optimizing performance systems',
    'Finalizing your True Node experience'
  ];

  useEffect(() => {
    if (!isLoading) return;

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    // Change loading text
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(textInterval);
    };
  }, [isLoading]);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black transition-all duration-300 ${isLoading ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <div className="infinity-spinner">
            <div></div>
            <div></div>
          </div>
        </div>
        <div>
          <h2 className="text-white text-2xl font-semibold mb-3 tracking-wide">TrueNode</h2>
          <p className="text-white/70 text-base min-h-[24px]">
            {loadingText}<span className="text-[#8b5cf6]">{dots}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage; 