'use client';

import { useState, useEffect } from 'react';
import LoadingPage from './LoadingPage';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Only show initial loading on first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
      // If already visited this session, skip initial loading
      setIsInitialLoading(false);
      return;
    }

    const checkPageLoaded = () => {
      if (document.readyState === 'complete') {
        // Mark as visited for this session
        sessionStorage.setItem('hasVisited', 'true');
        
        // Remove loading immediately when page loads
        setIsInitialLoading(false);
      }
    };

    // Check immediately
    checkPageLoaded();

    // If not loaded yet, listen for the load event
    if (isInitialLoading) {
      window.addEventListener('load', checkPageLoaded);
      document.addEventListener('readystatechange', checkPageLoaded);
    }

    return () => {
      window.removeEventListener('load', checkPageLoaded);
      document.removeEventListener('readystatechange', checkPageLoaded);
    };
  }, [isInitialLoading]);

  return (
    <>
      <LoadingPage isLoading={isInitialLoading} />
      <div className={`${isInitialLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
};

export default LoadingWrapper; 