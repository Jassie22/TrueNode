'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CalendlyWidget from './CalendlyWidget';
import MemoryGame from './MemoryGame';
import { event as gaEvent } from '@/lib/gtag';

// Privacy policy modal component
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
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
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
        let blobAnimations: gsap.core.Tween[] = [];
        if (backgroundRef.current) {
          const blobs = backgroundRef.current.querySelectorAll('.glow-blob');
          
          blobs.forEach((blob, index) => {
            gsap.set(blob, {
              x: Math.random() * 300 - 150,
              y: Math.random() * 300 - 150,
              scale: 0.8 + Math.random() * 0.4
            });
            
            const anim = gsap.to(blob, {
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
            blobAnimations.push(anim);
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

        // Cleanup function
        return () => {
          tl.kill();
          blobAnimations.forEach(anim => anim.kill());
          ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => {
            // Check if the trigger is associated with this component's elements
            // This is a basic check; more specific checks might be needed if triggers are shared
            if (trigger.trigger === sectionRef.current || 
                (formContentRef.current && formContentRef.current.contains(trigger.trigger as Node)) ||
                (backgroundRef.current && backgroundRef.current.contains(trigger.trigger as Node)) ) {
              trigger.kill();
            }
          });
          // A more aggressive cleanup if issues persist:
          // gsap.globalTimeline.getChildren(true, true, true).forEach(tween => tween.kill());
          // ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
        
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
  
  // Form submission handler
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
      
      // Add gradient banner to the form
      const formContainer = document.querySelector('.enquiry-form-container');
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
      
      // Show success message
      setFormSubmitted(true);
      
      // Reset form for next submission
      resetForm();
      
      // Track form submission with Google Analytics
      gaEvent({
        action: 'submit_form',
        category: 'Contact',
        label: 'Contact Form Submission'
      });
      
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
      className="py-24 relative bg-transparent overflow-visible enhanced-glow blue-glow"
    >
      {/* Animated background with blobs */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-bg-darker to-bg-darker opacity-70"></div>
        
        {/* Glow blobs */}
        <div className="glow-blob absolute w-[500px] h-[500px] rounded-full bg-accent/10 blur-[100px] top-[-10%] right-[-10%] opacity-40"></div>
        <div className="glow-blob absolute w-[600px] h-[600px] rounded-full bg-accent-blue/10 blur-[120px] bottom-[-20%] left-[-10%] opacity-30"></div>
        <div className="glow-blob absolute w-[400px] h-[400px] rounded-full bg-accent-magenta/10 blur-[80px] top-[40%] right-[30%] opacity-20"></div>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative" ref={formContentRef}>
          {/* Left column - Contact Form (1/2 width on large screens) */}
          <div className="lg:col-span-1 order-1">
            <div className="enquiry-form-container bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-lg h-full">
              {!formSubmitted ? (
                <>
                  <div className="mb-6 pb-4 border-b border-white/10">
                    <h3 className="text-2xl font-bold mb-2 text-white">Send us a message</h3>
                    <p className="text-white/60 text-sm">Fill out the form below to get in touch with our team.</p>
                  </div>
                  
                  {formError && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-white">
                      <p className="text-sm">{formError}</p>
                    </div>
                  )}
                  
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
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-1">
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
          
          {/* Right column - Quick Contact and Memory Game stacked (1/2 width on large screens) */}
          <div className="lg:col-span-1 order-2 flex flex-col space-y-8">
            {/* Quick Contact Section - Top half */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-5 shadow-lg flex-1">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Quick Contact
              </h3>
              
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
                    <a href="mailto:info@truenode.co.uk" className="text-accent hover:text-accent-light">info@truenode.co.uk</a>
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
                      className="text-xs text-accent hover:text-accent-light flex items-center gap-1 mt-1"
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
              
              <div className="border-t border-white/10 pt-4 mt-4">
                <CalendlyWidget buttonText="Book a Free Consultation" />
              </div>
            </div>
            
            {/* Memory Game - Bottom half */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg overflow-hidden flex-1">
              {/* Game Title */}
              <div className="p-3 bg-gradient-to-r from-accent/20 to-accent-blue/10 border-b border-white/10">
                <h3 className="text-center text-white font-medium">Bored while waiting?</h3>
              </div>
              
              {/* Memory Game Component */}
              <div className="h-[250px]">
                <MemoryGame />
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

export default ContactSection; 

