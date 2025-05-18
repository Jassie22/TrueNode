'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageView } from '@/lib/gtag';

function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Create URL from pathname and search params
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      // Track page view with Google Analytics
      pageView(url);
    }
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}

export default function GoogleAnalytics() {
  return (
    <Analytics />
  );
} 