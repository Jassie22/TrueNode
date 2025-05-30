'use client';

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Function to handle smooth scrolling to sections
  const scrollToSection = (id: string) => {
    // Remove the # if it exists
    const cleanId = id.startsWith('#') ? id.substring(1) : id;
    const element = document.getElementById(cleanId);
    
    if (element) {
      // Scroll to the element smoothly
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="bg-bg-darker text-white py-12 relative">
      {/* Grid lines for subtle effect */}
      <div className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, #903AE7 1px, transparent 1px),
                          linear-gradient(to bottom, #903AE7 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Glow effects in the background */}
      <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-[#903AE7]/10 blur-[80px] opacity-30"></div>
      <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-[#00BFFF]/10 blur-[80px] opacity-20"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            {/* Matching the navbar TrueNode style */}
            <h3 className="text-2xl font-bold group relative inline-block">
              <span>True</span>
              <span className="text-[#B24CF0] relative inline-block">
                Node
                <span className="absolute -inset-1 bg-gradient-to-r from-[#B24CF0]/20 to-transparent rounded-lg blur-sm group-hover:opacity-100 transition-opacity duration-300"></span>
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#B24CF0] via-[#1B6CF2] to-[#B24CF0] opacity-70 group-hover:opacity-100 transition-opacity duration-300" style={{backgroundSize: "200% 100%", animation: "gradient 3s ease infinite"}}></div>
            </h3>
            <p className="text-text-secondary">
              Custom <span className="text-[#23B5D3] font-medium">Websites</span>. Smart <span className="text-[#23B5D3] font-medium">Apps</span>. AI That Works for <span className="text-[#23B5D3] font-medium">You</span>.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold border-b border-accent pb-2 mb-4 inline-block">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="text-text-secondary hover:text-accent transition-colors relative group inline-block cursor-pointer"
                >
                  <span>Home</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-text-secondary hover:text-accent transition-colors relative group inline-block cursor-pointer"
                >
                  <span>Services</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('team')} 
                  className="text-text-secondary hover:text-accent transition-colors relative group inline-block cursor-pointer"
                >
                  <span>Team</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-text-secondary hover:text-accent transition-colors relative group inline-block cursor-pointer"
                >
                  <span>Contact</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold border-b border-accent pb-2 mb-4 inline-block">Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61575691329958" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-accent relative group"
                style={{ boxShadow: '0 0 10px rgba(144, 58, 231, 0.2)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"/>
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-[#903AE7]/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
              </a>
              <a 
                href="https://www.linkedin.com/company/true-node1/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-accent relative group"
                style={{ boxShadow: '0 0 10px rgba(144, 58, 231, 0.2)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-[#903AE7]/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
              </a>
              <a 
                href="https://g.co/kgs/C8je7zR" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-accent relative group"
                style={{ boxShadow: '0 0 10px rgba(144, 58, 231, 0.2)' }}
                aria-label="Google Business Profile"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-[#903AE7]/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
              </a>
              <a href="mailto:info@truenode.co.uk" className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-accent relative group" style={{ boxShadow: '0 0 10px rgba(144, 58, 231, 0.2)' }} aria-label="Email us">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-[#903AE7]/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
              </a>
              <a 
                href="https://www.instagram.com/YOUR_INSTAGRAM_USERNAME_HERE"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-accent relative group"
                style={{ boxShadow: '0 0 10px rgba(144, 58, 231, 0.2)' }}
                aria-label="Instagram Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-5 w-5 text-white" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-[#903AE7]/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
              </a>
            </div>
            
            <div className="mt-4">
              <div className="text-text-secondary flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>Leamington Spa, Warwickshire, UK</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-white/10 text-center text-text-secondary">
          <p>&copy; {currentYear} <span className="group inline-block"><span>True</span><span className="text-[#903AE7] relative">Node</span></span>. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 