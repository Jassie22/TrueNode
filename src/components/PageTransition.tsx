'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import LoadingPage from './LoadingPage';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // Handle pathname changes
  useEffect(() => {
    // Skip transition on initial load or same page
    if (previousPathname.current === pathname) {
      return;
    }

    // Start transition
    setIsTransitioning(true);

    // End transition after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);

    // Update previous pathname
    previousPathname.current = pathname;

    return () => clearTimeout(timer);
  }, [pathname]);

  // Handle navigation clicks
  useEffect(() => {
    const handleNavigation = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find the closest link (includes Next.js Link components)
      const link = target.closest('a');
      if (!link) return;

      // Get the href attribute
      const href = link.getAttribute('href');
      if (!href) return;

      // Check if it's an internal navigation
      const isInternal = href.startsWith('/');
      const isCurrentPage = href === pathname;
      const isHashLink = href.startsWith('#');
      const isEmailOrTel = href.includes('mailto:') || href.includes('tel:');
      const isExternalLink = href.startsWith('http') && !href.includes(window.location.hostname);

      // Skip external links, hash links, email/tel links, or current page
      if (!isInternal || isCurrentPage || isHashLink || isEmailOrTel || isExternalLink) {
        return;
      }

      // Check if it's a Next.js Link component by looking for data-next-link attribute
      const isNextLink = link.hasAttribute('data-next-link') || link.closest('[data-next-link]');
      
      if (isNextLink) {
        // Let Next.js handle the navigation, just show the loading
        setIsTransitioning(true);
        return;
      }

      // For regular links, handle navigation manually
      e.preventDefault();
      setIsTransitioning(true);

      // Navigate after a short delay
      setTimeout(() => {
        window.location.href = href;
      }, 100);
    };

    // Add event listener with higher priority
    document.addEventListener('click', handleNavigation, true);

    // Clean up
    return () => {
      document.removeEventListener('click', handleNavigation, true);
    };
  }, [pathname]);

  return (
    <>
      <LoadingPage isLoading={isTransitioning} />
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
};

export default PageTransition; 