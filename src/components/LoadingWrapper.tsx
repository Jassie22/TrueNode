'use client';

import { useState, useEffect } from 'react';
import LoadingPage from './LoadingPage';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPageLoaded = () => {
      if (document.readyState === 'complete') {
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    // Check immediately
    checkPageLoaded();

    // If not loaded yet, listen for the load event
    if (isLoading) {
      window.addEventListener('load', checkPageLoaded);
      document.addEventListener('readystatechange', checkPageLoaded);
    }

    return () => {
      window.removeEventListener('load', checkPageLoaded);
      document.removeEventListener('readystatechange', checkPageLoaded);
    };
  }, [isLoading]);

  return (
    <>
      <LoadingPage isLoading={isLoading} />
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
};

export default LoadingWrapper; 