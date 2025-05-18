'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [count, setCount] = useState(30);
  
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
    
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          reset(); // Try to recover by resetting the app
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [error, reset]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-bg-darker to-primary p-6 relative overflow-hidden">
      {/* Animated background with blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-primary to-bg-darker opacity-80"></div>
        
        {/* Glow blobs */}
        <div className="absolute w-[700px] h-[700px] rounded-full bg-accent/5 blur-[120px] top-[30%] left-[10%] opacity-60"></div>
        <div className="absolute w-[800px] h-[800px] rounded-full bg-accent-blue/5 blur-[150px] bottom-[20%] right-[5%] opacity-50"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full bg-accent-magenta/5 blur-[100px] top-[50%] right-[30%] opacity-40"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-red-500/20 rounded-full mx-auto flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        
        <div className="mb-8 bg-black/30 backdrop-blur-md p-8 rounded-xl border border-accent/20 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Something went <span className="text-red-500">wrong</span>
          </h2>
          <p className="text-white/80 text-lg mb-6">
            We're experiencing some technical difficulties. Our team has been notified and is working on the issue.
          </p>
          
          <div className="space-y-2 text-left mb-6 bg-black/20 p-4 rounded-lg">
            <p className="text-white/70 text-sm">Here's what you can try:</p>
            <ul className="list-disc list-inside text-white/60 space-y-1 text-sm">
              <li>Refresh the page</li>
              <li>Clear your browser cache</li>
              <li>Try again later</li>
              <li>Contact our support team if the issue persists</li>
            </ul>
          </div>
          
          <p className="text-white/70 mb-6">
            Attempting to recover in <span className="text-accent font-bold">{count}</span> seconds...
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-all duration-300 shadow-lg"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-300"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
        
        <p className="text-white/50 text-sm">
          Error ID: {error.digest || 'unknown'}
        </p>
        <p className="text-white/50 text-sm mt-2">
          © {new Date().getFullYear()} True Node. All rights reserved.
        </p>
      </div>
    </main>
  );
} 