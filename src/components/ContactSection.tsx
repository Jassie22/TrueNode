'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CalendlyWidget from './CalendlyWidget';
import MemoryGame from './MemoryGame';
import { event as gaEvent } from '@/lib/gtag';

// Add AI chat component
interface ChatSummarizerProps {
  onClose: () => void;
  onSend: (summary: string) => void;
}

interface ChatMessage {
  role: 'system' | 'user';
  content: string;
}

const ChatSummarizer: React.FC<ChatSummarizerProps> = ({ onClose, onSend }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: 'Hi there! 👋 I\'m here to help gather some details about your project. This will help us better understand your needs and prepare a perfect solution for you. Our team consists of Jasmeen, a Chemistry graduate from the University of Nottingham with 8+ years of coding experience and expertise in AI/ML, and Dylan, a Mechanical Engineering graduate from Nottingham who has managed £2.5M+ projects at Jaguar Land Rover.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const summarySectionRef = useRef<HTMLDivElement>(null);

  // Questions to ask the user - updated for UK audience with British English
  const questions: string[] = [
    'What sort of website or application are you looking to build for your business?',
    'When would you ideally like to launch this project?',
    'Do you have any particular technologies or frameworks in mind?',
    'What sort of budget range have you allocated for this project?',
    'Would you benefit from our data analysis or AI integration expertise?',
    'Is there anything specific about your business requirements we should know?'
  ];

  // Add a new message from the AI
  const addAIMessage = (content: string) => {
    setMessages(prev => [...prev, { role: 'system', content }]);
  };

  // Add a new message from the user
  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, { role: 'user', content }]);
  };

  // Generate a summary of the conversation
  const generateSummary = () => {
    const userMessages = messages.filter(m => m.role === 'user');
    if (userMessages.length === 0) return '';
    
    const summaryText = userMessages.map((m, i) => {
      const questionIndex = i < questions.length ? i : questions.length - 1;
      return `${questions[questionIndex]}: ${m.content}`;
    }).join('\n\n');
    
    setCurrentSummary(summaryText);
    return summaryText;
  };

  // Handle user sending a message - improved flow
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    addUserMessage(input);
    setInput('');
    
    // Set loading state
    setLoading(true);
    
    // Get current question index
    const userMessageCount = messages.filter(m => m.role === 'user').length;
    
    // Simulate AI response after a delay
    setTimeout(() => {
      setLoading(false);
      
      // If we have more questions, ask the next one
      if (userMessageCount < questions.length) {
        addAIMessage(questions[userMessageCount]);
      } else {
        // If we've asked all questions, thank the user with British English
        addAIMessage("Brilliant! Thank you for providing all this information. I've created a summary below for you to review before sending your enquiry.");
        
        // Show submit button visually
        const submitBtn = document.querySelector('.chat-submit-btn');
        if (submitBtn) {
          (submitBtn as HTMLElement).style.opacity = '1';
          (submitBtn as HTMLElement).style.transform = 'translateY(0)';
        }
      }
      
      // Generate summary after each message
      setTimeout(() => {
        generateSummary();
      }, 100);
      
    }, 800);
  };

  // Skip the chat and close
  const handleSkip = () => {
    onClose();
  };

  // Submit the conversation with improved handling
  const handleSubmit = () => {
    // Create a summary of the conversation
    const summary = generateSummary();
    
    // Add a final message to indicate completion
    addAIMessage("Summary completed! I'm sending this to our team now.");
    
    // Slight delay before sending to allow animation to play
    setTimeout(() => {
      // Send the summary to the parent component
      onSend(summary);
    }, 800);
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Generate summary when messages change
    if (messages.length > 1) {
      generateSummary();
    }
  }, [messages]);

  // Start the conversation by asking the first question right away
  useEffect(() => {
    setTimeout(() => {
      if (messages.length === 1) {
        addAIMessage(questions[0]);
      }
    }, 1000);
  }, []);

  // Apply animations to summary section
  useEffect(() => {
    if (summarySectionRef.current && currentSummary) {
      gsap.fromTo(
        summarySectionRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [currentSummary]);

  return (
    <div className="bg-gradient-to-br from-bg-darker to-zinc-900/90 backdrop-blur-md border border-accent/30 rounded-xl overflow-hidden shadow-2xl relative">
      {/* Chat header with site-matching gradient */}
      <div className="bg-gradient-to-r from-[#903AE7]/30 via-[#903AE7]/20 to-[#23B5D3]/20 p-5 flex justify-between items-center border-b border-[#903AE7]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-glow relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent to-accent-blue opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">True Node Assistant</h3>
            <p className="text-white/70 text-xs flex items-center">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
              Ready to help with your project
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
          aria-label="Close chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex flex-col h-[500px]">
        {/* Chat messages - improved with better styling and animations */}
        <div className="flex-grow overflow-y-auto p-5 space-y-5 bg-black/40 custom-scrollbar bg-gradient-to-b from-black/40 to-black/20">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} animate-fadeIn`}
            >
              <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'system' && (
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                )}
                <div 
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-accent/40 to-accent/30 text-white rounded-tr-none shadow-lg' 
                      : 'bg-gradient-to-br from-zinc-800 to-zinc-900 text-white/90 rounded-tl-none shadow border border-white/5'
                  }`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center ml-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Add skip button below AI messages */}
              {message.role === 'system' && message.content !== 'Hi there! 👋 I\'m here to help gather some details about your project. This will help us better understand your needs and prepare a perfect solution for you.' && (
                <button
                  onClick={handleSkip}
                  className="text-accent/70 hover:text-accent text-xs mt-1 ml-11 flex items-center gap-1 hover:underline touch-friendly"
                >
                  <span>Skip questions & go to form</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 text-white/90 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2 border border-white/5 shadow">
                <div className="w-2.5 h-2.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2.5 h-2.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2.5 h-2.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Real-time summary section */}
        {currentSummary && (
          <div 
            ref={summarySectionRef}
            className="p-4 bg-gradient-to-r from-accent/15 to-accent-blue/10 border-t border-accent/20 max-h-[150px] overflow-y-auto custom-scrollbar"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-accent flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Summary of Your Inquiry
              </h4>
              <div className="flex items-center gap-1 text-white/40 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>This will be included with your message</span>
              </div>
            </div>
            <div className="text-white/80 text-xs whitespace-pre-line pl-6 border-l-2 border-accent/30">
              {currentSummary}
            </div>
          </div>
        )}
        
        {/* Chat input - enhanced with better styling */}
        <div className="p-5 border-t border-white/10 bg-zinc-900/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..."
              className="flex-1 bg-zinc-800/90 border border-white/10 rounded-full px-5 py-3 text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all shadow-inner"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-accent to-accent-blue hover:from-accent-light hover:to-accent text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg scale-100 hover:scale-105"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={handleSkip}
              className="touch-friendly px-4 py-2 bg-zinc-800/80 hover:bg-zinc-700/80 text-white/80 hover:text-white text-sm rounded-md transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Skip to form
            </button>
            <button
              onClick={handleSubmit}
              className="chat-submit-btn touch-friendly px-5 py-2.5 bg-gradient-to-r from-accent to-accent-blue text-white text-sm font-medium rounded-md transition-all flex items-center gap-1 group hover:shadow-lg hover:shadow-accent/25 opacity-80 transform translate-y-2"
            >
              <span>Submit & continue</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add a privacy policy modal component
const PrivacyPolicy = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-bg-darker border border-accent/20 rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-lg shadow-accent/10">
        <div className="sticky top-0 bg-accent/20 backdrop-blur-sm px-6 py-4 border-b border-accent/20 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Privacy Policy</h3>
          <button 
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h4 className="text-lg font-bold text-accent mb-2">What We Collect</h4>
            <p className="text-white/80">We collect name, email, and message content through our contact form to respond to your inquiries and provide our services.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-accent mb-2">How We Use Your Data</h4>
            <p className="text-white/80">Your information is used only to respond to inquiries, communicate about our services, and fulfill contractual obligations.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-accent mb-2">Your GDPR Rights</h4>
            <p className="text-white/80">You have the right to access, rectify, delete, and port your personal data. You may also object to or restrict processing.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-accent mb-2">Contact Us</h4>
            <p className="text-white/80">For privacy inquiries, contact us at <a href="mailto:info@truenode.co.uk" className="text-accent hover:underline">info@truenode.co.uk</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formContentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showChatSummarizer, setShowChatSummarizer] = useState(false);
  const [chatSummary, setChatSummary] = useState('');
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  
  // Service options for checkboxes
  const serviceOptions = [
    'Website Development',
    'App Development',
    'AI Integration',
    'Data Analysis',
    'Branding',
    'Ecommerce',
    'Other'
  ];
  
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    services: [] as string[],
    businessName: '',
    businessUrl: ''
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Register GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Create animation timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'center center',
            toggleActions: 'play none none none'
          }
        });
        
        // Animate background blobs
        if (backgroundRef.current) {
          const blobs = backgroundRef.current.querySelectorAll('.glow-blob');
          
          blobs.forEach((blob, index) => {
            gsap.set(blob, {
              x: Math.random() * 300 - 150,
              y: Math.random() * 300 - 150,
              scale: 0.8 + Math.random() * 0.4
            });
            
            gsap.to(blob, {
              x: `+=${Math.random() * 100 - 50}`,
              y: `+=${Math.random() * 100 - 50}`,
              scale: 0.9 + Math.random() * 0.3,
              opacity: 0.5 + Math.random() * 0.3,
              duration: 8 + index * 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: index * 1.5
            });
          });
        }
        
        // Animate title and description
        tl.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
        
        tl.fromTo(
          descriptionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 0.7, duration: 0.5 },
          '-=0.3'
        );
        
        // Animate form entrance
        tl.fromTo(
          formContentRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        );
        
      } catch (error) {
        console.warn('Error in ContactSection animations:', error);
      }
    }
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle service checkbox changes
  const handleServiceChange = (service: string) => {
    setFormData(prev => {
      const updatedServices = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      
      return { ...prev, services: updatedServices };
    });
  };
  
  // Handle chat summarizer submission
  const handleChatSummary = (summary: string) => {
    setChatSummary(summary);
    setShowChatSummarizer(false);
  };
  
  // Reset form function
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      services: [],
      businessName: '',
      businessUrl: ''
    });
  };
  
  // Modify the form submission to include chat summary
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      const formSubmitData = new FormData();
      
      // Add form fields to FormData
      formSubmitData.append('name', formData.name);
      formSubmitData.append('email', formData.email);
      formSubmitData.append('phone', formData.phone || 'Not provided');
      formSubmitData.append('message', formData.message);
      formSubmitData.append('services', formData.services.join(', ') || 'None specified');
      formSubmitData.append('businessName', formData.businessName || 'Not provided');
      formSubmitData.append('businessUrl', formData.businessUrl || 'Not provided');
      
      // Add the file if one is selected
      const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        
        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setFormError("File size exceeds 5MB limit. Please select a smaller file.");
          setIsSubmitting(false);
          return;
        }
        
        // Check file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
          setFormError("File type not supported. Please use PDF, DOC, DOCX, JPG or PNG files.");
          setIsSubmitting(false);
          return;
        }
        
        // Use the correct form-submit.co field name for file attachments
        formSubmitData.append('attachment', file);
      }
      
      // Add additional form fields for FormSubmit.co
      formSubmitData.append('_subject', 'New Website Contact Form Submission');
      formSubmitData.append('_template', 'table');
      formSubmitData.append('_captcha', 'false');
      
      // Create a form element directly
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://formsubmit.co/info@truenode.co.uk';
      form.enctype = 'multipart/form-data';
      form.style.display = 'none';
      
      // Convert FormData to form elements - fix for TypeScript iteration error
      const entries = Array.from(formSubmitData.entries());
      for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i];
        const input = document.createElement('input');
        input.name = key;
        
        if (value instanceof File) {
          input.type = 'file';
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(value);
          input.files = dataTransfer.files;
        } else {
          input.type = 'text';
          input.value = value.toString();
        }
        
        form.appendChild(input);
      }
      
      // Add hidden iframe to catch the submission
      let iframe = document.getElementById('hidden-form-iframe') as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hidden-form-iframe';
        iframe.name = 'hidden-form-iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }
      
      // Set the target to the iframe
      form.target = 'hidden-form-iframe';
      
      // Append form to body and submit
      document.body.appendChild(form);
      form.submit();
      
      // Show success notification within the form area
      setShowNotification(true);
      
      // Add gradient banner to the form
      const formContainer = document.querySelector('.enquiry-form-gradient-border');
      if (formContainer) {
        // Add a success banner within the form
        const successBanner = document.createElement('div');
        successBanner.className = 'bg-gradient-to-r from-accent/30 to-accent-blue/30 text-white p-4 rounded-t-xl text-center';
        successBanner.innerHTML = `
          <div class="flex items-center justify-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-light" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <p class="font-medium">Thank you! Your message has been sent successfully.</p>
          </div>
        `;
        
        // Insert at the beginning of the form
        const firstChild = formContainer.firstChild;
        formContainer.insertBefore(successBanner, firstChild);
        
        // Remove the banner after 5 seconds
        setTimeout(() => {
          if (formContainer.contains(successBanner)) {
            formContainer.removeChild(successBanner);
          }
        }, 7000);
      }
      
      // Reset form for next submission
      resetForm();
      
      // Remove form after submission
      setTimeout(() => {
        if (document.body.contains(form)) {
          document.body.removeChild(form);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setFormError("There was a problem submitting your form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative bg-primary overflow-hidden enhanced-glow blue-glow"
    >
      {/* Animated background with blobs */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-primary to-bg-darker opacity-70"></div>
        
        {/* Glow blobs */}
        <div className="glow-blob absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] top-[-10%] right-[-10%] opacity-40"></div>
        <div className="glow-blob absolute w-[600px] h-[600px] rounded-full bg-accent-blue/5 blur-[120px] bottom-[-20%] left-[-10%] opacity-30"></div>
        <div className="glow-blob absolute w-[400px] h-[400px] rounded-full bg-accent-magenta/5 blur-[80px] top-[40%] right-[30%] opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="relative z-30 py-6 px-4">
            {/* Purple accent line */}
            <div className="absolute h-1 w-32 bg-accent rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-glow"></div>
            
            <h2 
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              Get in <span className="text-accent">Touch</span>
            </h2>
            
            <div className="overflow-hidden">
              <p 
                ref={descriptionRef}
                className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto"
              >
                Have a project in mind? We'd love to hear from you and discuss how we can help bring your vision to reality.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 gap-y-16 relative" ref={formContentRef}>
          {/* Left column with contact form or success message */}
          <div className="lg:mr-5">
            <div className="enquiry-form-gradient-border">
              <div className="rounded-xl bg-dark/20 backdrop-blur-sm p-8 shadow-lg h-full relative">
                <div className="relative z-10">
                  {!formSubmitted ? (
                    <>
                      {showChatSummarizer ? (
                        <ChatSummarizer 
                          onClose={() => setShowChatSummarizer(false)} 
                          onSend={handleChatSummary}
                        />
                      ) : (
                        <>
                          <div className="mb-6 p-4 bg-accent/5 rounded-lg border border-accent/20 shadow-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="text-2xl font-bold mb-2 text-white">Send us a message</h3>
                                <p className="text-white/60 text-sm">Fill out the form below to get in touch with our team.</p>
                              </div>
                            </div>
                          </div>
                        
                          {chatSummary && (
                            <div className="mb-6 p-4 bg-gradient-to-r from-accent/10 to-accent-blue/5 rounded-lg border border-accent/20">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="text-sm font-medium text-accent-light flex items-center gap-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                  </svg>
                                  AI Chat Summary
                                </h4>
                                <button 
                                  onClick={() => setShowChatSummarizer(true)}
                                  className="text-accent hover:text-accent-light text-xs flex items-center gap-1"
                                >
                                  <span>Edit</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                </button>
                              </div>
                              <p className="text-white/80 text-sm whitespace-pre-line max-h-32 overflow-y-auto custom-scrollbar">{chatSummary}</p>
                            </div>
                          )}
                        
                          <div className="space-y-6">
                            {/* Contact Form - Always visible */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                              <div>
                                <label htmlFor="name" className="block text-white/80 mb-2 text-sm">Your Name</label>
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-3 bg-bg-darker border border-white/10 text-white focus:border-accent focus:outline-none transition-colors rounded-md"
                                />
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label htmlFor="email" className="block text-white/80 mb-2 text-sm">Email Address</label>
                                  <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-bg-darker border border-white/10 text-white focus:border-accent focus:outline-none transition-colors rounded-md"
                                  />
                                </div>
                                
                                <div>
                                  <label htmlFor="phone" className="block text-white/80 mb-2 text-sm">Phone Number <span className="text-white/40">(Optional)</span></label>
                                  <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-bg-darker border border-white/10 text-white focus:border-accent focus:outline-none transition-colors rounded-md"
                                  />
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label htmlFor="businessName" className="block text-white/80 mb-2 text-sm">Business Name <span className="text-white/40">(Optional)</span></label>
                                  <input
                                    type="text"
                                    id="businessName"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-bg-darker border border-white/10 text-white focus:border-accent focus:outline-none transition-colors rounded-md"
                                  />
                                </div>
                                
                                <div>
                                  <label htmlFor="businessUrl" className="block text-white/80 mb-2 text-sm">Website URL <span className="text-white/40">(Optional)</span></label>
                                  <input
                                    type="text"
                                    id="businessUrl"
                                    name="businessUrl"
                                    value={formData.businessUrl}
                                    onChange={handleInputChange}
                                    placeholder="Your website address (if you have one)"
                                    className="w-full px-4 py-3 bg-bg-darker border border-white/10 text-white focus:border-accent focus:outline-none transition-colors rounded-md"
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <label htmlFor="message" className="block text-white/80 mb-2 text-sm">Your Message</label>
                                <textarea
                                  id="message"
                                  name="message"
                                  value={formData.message}
                                  onChange={handleInputChange}
                                  rows={5}
                                  required
                                  className="w-full px-4 py-3 bg-bg-darker border border-white/10 text-white focus:border-accent focus:outline-none transition-colors rounded-md resize-none"
                                ></textarea>
                              </div>
                              
                              {/* Service selection checkboxes */}
                              <div>
                                <label className="block text-white/80 mb-3 text-sm">Which services are you interested in?</label>
                                <div className="grid grid-cols-2 gap-2">
                                  {serviceOptions.map((service, index) => (
                                    <div key={index} className="flex items-center">
                                      <input
                                        type="checkbox"
                                        id={`service-${index}`}
                                        checked={formData.services.includes(service)}
                                        onChange={() => handleServiceChange(service)}
                                        className="w-4 h-4 accent-accent mr-2 bg-bg-darker border-white/20"
                                      />
                                      <label 
                                        htmlFor={`service-${index}`} 
                                        className="text-sm text-white/70 cursor-pointer hover:text-white"
                                      >
                                        {service}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* File attachment field */}
                              <div>
                                <label htmlFor="fileUpload" className="block text-white/80 mb-2 text-sm">Attach a File <span className="text-white/40">(Optional)</span></label>
                                <div className="flex items-center gap-4">
                                  <input
                                    type="file"
                                    id="fileUpload"
                                    name="fileUpload"
                                    className="hidden"
                                    onChange={(e) => {
                                      const fileName = e.target.files?.[0]?.name || 'No file chosen';
                                      const fileLabel = document.getElementById('fileLabel');
                                      if (fileLabel) fileLabel.textContent = fileName;
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => document.getElementById('fileUpload')?.click()}
                                    className="px-4 py-2 bg-accent/20 hover:bg-accent/30 rounded-md text-white text-sm transition-colors"
                                  >
                                    Choose File
                                  </button>
                                  <span id="fileLabel" className="text-white/60 text-sm truncate">No file chosen</span>
                                </div>
                                <p className="text-white/40 text-xs mt-1">Max file size: 5MB. Supported formats: PDF, DOC, DOCX, JPG, PNG</p>
                              </div>
                              
                              {/* GDPR compliance checkbox */}
                              <div className="flex items-start">
                                <input
                                  type="checkbox"
                                  id="gdprConsent"
                                  name="gdprConsent"
                                  required
                                  className="w-4 h-4 accent-accent mt-1 mr-2 bg-bg-darker border-white/20"
                                />
                                <label htmlFor="gdprConsent" className="text-sm text-white/70">
                                  I consent to True Node collecting my data. 
                                  <button 
                                    type="button"
                                    onClick={() => setShowPrivacyPolicy(true)}
                                    className="text-purple-400 hover:text-purple-300 underline ml-1 focus:outline-none"
                                  >
                                    View Privacy Policy
                                  </button>
                                </label>
                              </div>
                              
                              {/* Form submission button */}
                              <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-accent-blue rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
                                <button
                                  type="submit"
                                  disabled={isSubmitting}
                                  className="relative w-full py-4 bg-accent hover:bg-accent/90 text-white font-medium rounded-md transition-all duration-300 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                  {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                      </svg>
                                      Sending...
                                    </span>
                                  ) : (
                                    'Send Message'
                                  )}
                                </button>
                              </div>
                            </form>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    // Thank you message after form submission
                    <div className="py-8 text-center">
                      <div className="w-20 h-20 bg-accent/20 rounded-full mx-auto flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-white">Thank You!</h3>
                      <p className="text-white/80 mb-6">Your message has been sent successfully. We'll get back to you within 1-2 business days.</p>
                      <button 
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-2 bg-accent/20 hover:bg-accent/30 text-white rounded-md transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column with direct contact options and game */}
          <div className="lg:ml-5 h-full">
            <div className="flex flex-col h-full gap-6">
              {/* Quick Contact Section - Already hidden on mobile, no changes needed */}
              <div className="rounded-xl bg-black/20 border border-white/10 overflow-hidden hidden md:block">
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Quick Contact
                  </h3>
                  
                  <p className="text-white/70 mb-4">
                    Need immediate assistance? Reach out to us directly. We work with clients globally, providing both remote and on-site solutions tailored to your needs.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-accent/20 rounded-full p-2.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Email Us</h4>
                        <a href="mailto:info@truenode.co.uk" className="text-accent hover:text-accent-hover">info@truenode.co.uk</a>
                        <p className="text-xs text-white/50 mt-1">We typically respond within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-accent/20 rounded-full p-2.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Location</h4>
                        <p className="text-white/70">Leamington Spa, Warwickshire, UK</p>
                        <a 
                          href="https://g.co/kgs/C8je7zR" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-accent hover:text-accent-hover flex items-center gap-1 mt-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                          </svg>
                          <span>Find us on Google Maps</span>
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-accent/20 rounded-full p-2.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Global Service</h4>
                        <p className="text-white/70">UK based, working worldwide</p>
                        <p className="text-xs text-white/50 mt-1">Remote & on-site capabilities</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10 pt-4 mt-6">
                    <button 
                      onClick={() => window.Calendly?.initPopupWidget({url: 'https://calendly.com/jasmeendahak03/30min'})}
                      className="w-full py-3 px-4 text-white text-base font-medium rounded-xl bg-gradient-to-r from-[#903AE7] to-[#23B5D3] hover:from-[#A54BF9] hover:to-[#2ECCEB] transition-all duration-300 shadow-lg"
                    >
                      Book a Free Consultation
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Memory Game component */}
              <div className="rounded-xl border border-white/10 flex-grow">
                <div className="h-full">
                  <MemoryGame />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Privacy Policy Modal */}
      <PrivacyPolicy isOpen={showPrivacyPolicy} onClose={() => setShowPrivacyPolicy(false)} />
    </section>
  );
};

// Adding CSS classes directly in the component instead of using styled-jsx
const styles = `
  .animated-border {
    position: relative;
    z-index: 0;
  }
  
  .animated-border::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -10px;
    top: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    background: linear-gradient(90deg, #903AE7, #23B5D3, #E73AA9, #903AE7);
    background-size: 300% 300%;
    animation: gradient-animation 8s ease infinite;
    border-radius: 16px;
    filter: blur(8px);
    opacity: 0.7;
  }
  
  .animated-border::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #101014;
    border-radius: 14px;
  }
  
  .enquiry-form-gradient-border {
    position: relative;
    z-index: 0;
    border-radius: 18px;
    overflow: hidden;
    border: 2px solid rgba(144, 58, 231, 0.3);
    box-shadow: 0 0 20px rgba(144, 58, 231, 0.15);
  }
  
  .enquiry-form-gradient-border::before {
    display: none;  /* Hide animated border */
  }
  
  .enquiry-form-gradient-border > div {
    border: none !important;
  }
  
  @keyframes gradient-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  .background-animate {
    background-size: 300% 300%;
    animation: gradient-animation 8s ease infinite;
  }
  
  .book-call-btn {
    position: relative;
    overflow: hidden;
  }
  
  .book-call-btn:hover::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(144, 58, 231, 0), rgba(231, 58, 169, 0.2), rgba(144, 58, 231, 0));
    animation: button-shine 2s ease infinite;
  }
  
  @keyframes button-shine {
    0% {
      transform: translateX(-100%);
    }
    60% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(144, 58, 231, 0.5);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(144, 58, 231, 0.7);
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject styles into head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default ContactSection; 

