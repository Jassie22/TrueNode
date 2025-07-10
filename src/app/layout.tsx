import '../styles/globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/gtag';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import LoadingWrapper from '@/components/LoadingWrapper';
import PageTransition from '@/components/PageTransition';
import { Suspense } from 'react';

// Add window type declaration for gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export const viewport: Viewport = {
  themeColor: '#903AE7',
};

export const metadata: Metadata = {
  title: 'True Node - Modern Tech Solutions for Small Businesses',
  description: 'True Node is a tech consultancy founded by Jasmeen Dahak and Dylan Shah, specializing in providing small businesses with web development, custom applications, AI integration, and data analysis services.',
  authors: [{ name: 'Jasmeen Dahak' }, { name: 'Dylan Shah' }],
  keywords: ['web development', 'AI integration', 'small business', 'tech consultancy', 'Leamington Spa'],
  creator: 'True Node',
  openGraph: {
    title: 'True Node - Modern Tech Solutions',
    description: 'Web development, app solutions & AI integration for small businesses.',
    url: 'https://truenode.tech',
    siteName: 'True Node',
    locale: 'en_GB',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/favicon-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/maskable_icon.png',
        color: '#903AE7'
      },
      {
        rel: 'msapplication-TileImage',
        url: '/icons/favicon-192x192.png'
      },
      {
        rel: 'shortcut icon',
        url: '/favicon.ico',
        type: 'image/x-icon'
      }
    ]
  },
  manifest: '/site.webmanifest',
  applicationName: 'True Node',
  appleWebApp: {
    title: 'True Node',
    capable: true,
    statusBarStyle: 'black-translucent'
  },
  alternates: {
    canonical: 'https://truenode.co.uk'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/satoshi-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/satoshi-500.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/satoshi-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/fonts/satoshi.css" />
        
        {/* Organization Schema (JSON-LD) for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "True Node",
              "url": "https://truenode.co.uk",
              "logo": "https://truenode.co.uk/icons/favicon-192x192.png",
              "sameAs": [
                "https://www.linkedin.com/company/truenode",
                "https://www.instagram.com/truenode.tech",
                "https://twitter.com/truenode" 
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Leamington Spa",
                "addressRegion": "Warwickshire",
                "addressCountry": "UK"
              },
              "email": "hello@truenode.co.uk",
              "description": "Web development, app solutions & AI integration for small businesses."
            })
          }}
        />
        
        {/* Google Analytics - Global Site Tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="bg-bg-darker text-text-primary font-satoshi" suppressHydrationWarning={true}>
        {/* Google Analytics tracking component */}
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        
        {/* GSAP scripts */}
        
        {/* Performance measurement script */}
        <Script id="performance-script">
          {`
            // Add class to body when JS is loaded
            document.body.classList.add('js-loaded');
            
            // Comprehensive performance measurement
            window.addEventListener('load', () => {
              // Wait for everything to stabilize
              setTimeout(() => {
                if (window.performance) {
                  console.group('TrueNode Website Performance Metrics');
                  
                  // Navigation Timing
                  const timing = window.performance.timing;
                  const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
                  const domProcessingTime = timing.domComplete - timing.domLoading;
                  const dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
                  const connectionTime = timing.connectEnd - timing.connectStart;
                  const requestTime = timing.responseEnd - timing.requestStart;
                  const renderTime = timing.domComplete - timing.domContentLoadedEventStart;
                  
                  console.log('⏱️ Page load time:', (pageLoadTime/1000).toFixed(2), 's');
                  console.log('⏱️ DOM processing time:', (domProcessingTime/1000).toFixed(2), 's');
                  console.log('⏱️ DNS lookup time:', (dnsTime).toFixed(2), 'ms');
                  console.log('⏱️ Connection time:', (connectionTime).toFixed(2), 'ms');
                  console.log('⏱️ Request/response time:', (requestTime/1000).toFixed(2), 's');
                  console.log('⏱️ Rendering time:', (renderTime/1000).toFixed(2), 's');
                  
                  // Paint Metrics
                  const paintMetrics = performance.getEntriesByType('paint');
                  if (paintMetrics.length > 0) {
                    paintMetrics.forEach(metric => {
                      console.log(\`⏱️ \${metric.name}: \${(metric.startTime/1000).toFixed(2)} s\`);
                    });
                  }
                  
                  // Resource Metrics - check for slow resources
                  const resourceMetrics = performance.getEntriesByType('resource');
                  if (resourceMetrics.length > 0) {
                    const slowResources = resourceMetrics
                      .filter(r => r.duration > 500) // resources taking over 500ms
                      .sort((a, b) => b.duration - a.duration)
                      .slice(0, 5); // top 5 slow resources
                    
                    if (slowResources.length > 0) {
                      console.log('⚠️ Slow loading resources:');
                      slowResources.forEach(r => {
                        console.log(\`  - \${r.name.split('/').pop()}: \${(r.duration/1000).toFixed(2)}s\`);
                      });
                    } else {
                      console.log('✅ No slow resources detected (>500ms)');
                    }
                  }
                  
                  // Overall assessment
                  if (pageLoadTime < 2000) {
                    console.log('✨ Site performance: Excellent (< 2s)');
                  } else if (pageLoadTime < 4000) {
                    console.log('✅ Site performance: Good (2-4s)');
                  } else if (pageLoadTime < 8000) {
                    console.log('⚠️ Site performance: Fair (4-8s)');
                  } else {
                    console.log('❌ Site performance: Poor (>8s)');
                  }
                  
                  console.groupEnd();
                }
              }, 1000);
            });
          `}
        </Script>
        
        <LoadingWrapper>
          <PageTransition>
            {children}
          </PageTransition>
        </LoadingWrapper>

        <Script id="scrolltrigger-refresh">
          {`
            window.addEventListener('load', () => {
              setTimeout(() => {
                if (window.gsap && window.gsap.ScrollTrigger) {
                  console.log('Attempting ScrollTrigger.refresh()');
                  window.gsap.ScrollTrigger.refresh();
                }
              }, 1000); // Delay to allow layout to settle
            });
          `}
        </Script>
      </body>
    </html>
  );
} 