import Link from 'next/link';

export default function NotFound() {
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
        <h1 className="text-9xl font-extrabold text-white mb-6">404</h1>
        
        <div className="mb-8 bg-black/30 backdrop-blur-md p-8 rounded-xl border border-accent/20 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! <span className="text-accent">Page not found</span>
          </h2>
          <p className="text-white/80 text-lg mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-2 text-left mb-6 bg-black/20 p-4 rounded-lg">
            <p className="text-white/70 text-sm">Try these options:</p>
            <ul className="list-disc list-inside text-white/60 space-y-1 text-sm">
              <li>Check that the URL is correct</li>
              <li>Clear your browser cache and try again</li>
              <li>Return to our homepage</li>
              <li>Contact us if you need assistance</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-all duration-300 shadow-lg"
            >
              Return to Homepage
            </Link>
            <Link
              href="/#contact"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
        
        <p className="text-white/50 text-sm">
          © {new Date().getFullYear()} True Node. All rights reserved.
        </p>
      </div>
    </main>
  );
} 