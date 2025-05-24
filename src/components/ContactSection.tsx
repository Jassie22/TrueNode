'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CalendlyWidget from './CalendlyWidget';
import MemoryGame from './MemoryGame';
import { event as gaEvent } from '@/lib/gtag';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formContentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const formInnerRef = useRef<HTMLDivElement>(null);
  const gameContentRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    services: [] as string[]
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          if (titleRef.current) {
            gsap.set(titleRef.current, { y: 40, opacity: 0 });
          }
          if (descriptionRef.current) {
            gsap.set(descriptionRef.current, { y: 30, opacity: 0 });
          }
          // Only hide the form inner content, keeping the border visible
          if (formInnerRef.current) {
            gsap.set(formInnerRef.current, { y: 40, opacity: 0 });
          }
          if (gameContentRef.current) {
            gsap.set(gameContentRef.current, { y: 40, opacity: 0 });
          }

          // Remove the timeout and start animations immediately
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%', // Start slightly earlier
              end: 'center center',
              toggleActions: 'play none none none'
            }
          });

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
          // Animate the form and game content with stagger
          tl.fromTo(
            [formInnerRef.current, gameContentRef.current],
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
            '-=0.3'
          );
          ScrollTrigger.refresh();

        }, sectionRef);

        return () => {
          ctx.revert();
        };
        
      } catch (error) {
        console.warn('Error in ContactSection animations:', error);
      }
    }
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleServiceChange = (service: string) => {
    setFormData(prev => {
      const updatedServices = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      return { ...prev, services: updatedServices };
    });
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      services: []
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Get file input data first
      const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
      let fileData = null;
      
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (file.size > 5 * 1024 * 1024) {
          setFormError("File size exceeds 5MB limit. Please select a smaller file.");
          setIsSubmitting(false);
          return;
        }
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
          setFormError("File type not supported. Please use PDF, DOC, DOCX, JPG or PNG files.");
          setIsSubmitting(false);
          return;
        }
        fileData = file;
      }
      
      // Create iframe to prevent redirect
      let iframe = document.getElementById('hidden-form-iframe') as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hidden-form-iframe';
        iframe.name = 'hidden-form-iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }
      
      // Create form using the working ChatbotPopup approach
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://formsubmit.co/info@truenode.co.uk';
      form.style.display = 'none';
      form.target = 'hidden-form-iframe';
      
      // If we have a file, use multipart encoding
      if (fileData) {
        form.enctype = 'multipart/form-data';
      }
      
      // Add debugging
      console.log('Submitting form to:', form.action);
      console.log('Form data:', formData);
      
      // Create input fields directly (like ChatbotPopup)
      const nameField = document.createElement('input');
      nameField.type = 'text';
      nameField.name = 'name';
      nameField.value = formData.name;
      form.appendChild(nameField);
      
      const emailField = document.createElement('input');
      emailField.type = 'email';
      emailField.name = 'email';
      emailField.value = formData.email;
      form.appendChild(emailField);
      
      const phoneField = document.createElement('input');
      phoneField.type = 'text';
      phoneField.name = 'phone';
      phoneField.value = formData.phone || 'Not provided';
      form.appendChild(phoneField);
      
      const messageField = document.createElement('input');
      messageField.type = 'text';
      messageField.name = 'message';
      messageField.value = formData.message;
      form.appendChild(messageField);
      
      const servicesField = document.createElement('input');
      servicesField.type = 'text';
      servicesField.name = 'services';
      servicesField.value = formData.services.join(', ') || 'None specified';
      form.appendChild(servicesField);
      
      // Add file if exists (keep the original file input approach)
      if (fileData && fileInput) {
        const fileField = document.createElement('input');
        fileField.type = 'file';
        fileField.name = 'attachment';
        fileField.files = fileInput.files;
        form.appendChild(fileField);
      }
      
      // Add FormSubmit configuration fields
      const subjectField = document.createElement('input');
      subjectField.type = 'hidden';
      subjectField.name = '_subject';
      subjectField.value = 'New Website Contact Form Submission';
      form.appendChild(subjectField);
      
      const templateField = document.createElement('input');
      templateField.type = 'hidden';
      templateField.name = '_template';
      templateField.value = 'table';
      form.appendChild(templateField);
      
      const captchaField = document.createElement('input');
      captchaField.type = 'hidden';
      captchaField.name = '_captcha';
      captchaField.value = 'false';
      form.appendChild(captchaField);
      
      // Prevent redirect after submission
      const nextField = document.createElement('input');
      nextField.type = 'hidden';
      nextField.name = '_next';
      nextField.value = window.location.href;
      form.appendChild(nextField);
      
      // Submit form
      document.body.appendChild(form);
      form.submit();
      
      // Clean up
      setTimeout(() => {
        if (document.body.contains(form)) {
          document.body.removeChild(form);
        }
      }, 1000);
      
      setFormSubmitted(true);
      resetForm();
      
      // Show success notification banner at top of page (like chatbot popup)
      const notificationBanner = document.createElement('div');
      notificationBanner.className = 'fixed top-0 left-0 right-0 bg-green-600 text-white py-3 px-4 text-center z-[10000] shadow-xl';
      notificationBanner.textContent = 'Message sent successfully! Our team will review it and get back to you shortly.';
      notificationBanner.style.transform = 'translateY(-100%)';
      notificationBanner.style.fontSize = '1rem';
      document.body.appendChild(notificationBanner);
      
      // Animate the banner sliding down
      setTimeout(() => {
        notificationBanner.style.transition = 'transform 0.4s ease-out';
        notificationBanner.style.transform = 'translateY(0)';
      }, 10);
      
      // Remove the notification after 4 seconds
      setTimeout(() => {
        notificationBanner.style.transform = 'translateY(-100%)';
        setTimeout(() => {
          if (document.body.contains(notificationBanner)) {
            document.body.removeChild(notificationBanner);
          }
        }, 400);
      }, 4000);
      
      gaEvent({
        action: 'submit_form',
        category: 'Contact',
        label: 'Contact Form Submission'
      });
      
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
      className="py-24 relative bg-primary overflow-hidden enhanced-glow"
    >
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-primary to-bg-darker opacity-70"></div>
        <div className="glow-blob absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] top-[-10%] right-[-10%] opacity-40"></div>
        <div className="glow-blob absolute w-[500px] h-[500px] rounded-full bg-accent-blue/3 blur-[120px] bottom-[-20%] left-[-10%] opacity-20"></div>
        <div className="glow-blob absolute w-[400px] h-[400px] rounded-full bg-accent-magenta/5 blur-[80px] top-[40%] right-[30%] opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="relative z-30 py-6 px-4">
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
          <div className="lg:mr-5">
            <div className="enquiry-form-gradient-border">
              <div className="rounded-xl bg-dark/20 backdrop-blur-sm p-6 sm:p-8 shadow-lg h-full relative">
                <div className="relative z-10" ref={formInnerRef}>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-white text-center lg:text-left">Send a message</h3>
                  {!formSubmitted ? (
                    <>
                      {formError && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-white">
                          <p className="text-sm">{formError}</p>
                        </div>
                      )}
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label htmlFor="name" className="block text-white/80 mb-1.5 text-sm">Your Name</label>
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
                            <label htmlFor="email" className="block text-white/80 mb-1.5 text-sm">Email Address</label>
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
                            <label htmlFor="phone" className="block text-white/80 mb-1.5 text-sm">Phone Number <span className="text-white/40">(Optional)</span></label>
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
                        <div>
                          <label htmlFor="message" className="block text-white/80 mb-1.5 text-sm">Your Message</label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={5}
                            required
                            maxLength={4000}
                            className="w-full px-4 py-3 bg-bg-darker border border-white/10 text-white focus:border-accent focus:outline-none transition-colors rounded-md resize-none"
                          ></textarea>
                          <p className="text-right text-xs text-white/50 mt-1">
                            {formData.message.length} / 4000
                          </p>
                        </div>
                        <div>
                          <label className="block text-white/80 mb-2 text-sm">Which services are you interested in?</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
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
                        <div>
                          <label htmlFor="fileUpload" className="block text-white/80 mb-1.5 text-sm">Attach a File <span className="text-white/40">(Optional)</span></label>
                          <div className="flex items-center gap-3">
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
                            <a 
                              href="/privacy-policy" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:text-purple-300 underline ml-1 focus:outline-none"
                            >
                              View Privacy Policy
                            </a>
                          </label>
                        </div>
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
          
          <div className="lg:ml-5 h-full">
            <div className="flex flex-col h-full gap-6">
              <div className="rounded-xl bg-black/20 border border-white/10 overflow-hidden hidden md:block">
                <div className="p-5 md:p-4 lg:p-5">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Quick Contact
                  </h3>
                  <p className="text-white/70 mb-3 text-sm">
                    Need immediate assistance? Reach out to us directly. We work with clients globally, providing both remote and on-site solutions tailored to your needs.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-accent/20 rounded-full p-2 mr-2.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">Email Us</h4>
                        <a href="mailto:info@truenode.co.uk" className="text-accent hover:text-accent-hover text-sm">info@truenode.co.uk</a>
                        <p className="text-xs text-white/50 mt-0.5">We typically respond within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-accent/20 rounded-full p-2 mr-2.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">Location</h4>
                        <p className="text-white/70 text-sm">Leamington Spa, Warwickshire, UK</p>
                        <a 
                          href="https://g.co/kgs/C8je7zR" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-accent hover:text-accent-hover flex items-center gap-1 mt-0.5"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                          </svg>
                          <span>Find us on Google Maps</span>
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-accent/20 rounded-full p-2 mr-2.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">Global Service</h4>
                        <p className="text-white/70 text-sm">UK based, working worldwide</p>
                        <p className="text-xs text-white/50 mt-0.5">Remote & on-site capabilities</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-3 mt-4">
                    <button 
                      onClick={() => window.Calendly?.initPopupWidget({url: 'https://calendly.com/jasmeendahak03/30min'})}
                      className="w-full py-2.5 px-4 text-white text-sm font-medium rounded-xl bg-gradient-to-r from-[#903AE7] to-[#23B5D3] hover:from-[#A54BF9] hover:to-[#2ECCEB] transition-all duration-300 shadow-lg"
                    >
                      Book a Free Consultation
                    </button>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 flex-grow">
                <div className="h-full" ref={gameContentRef}>
                  <MemoryGame />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
    display: none;
  }
  .enquiry-form-gradient-border > div {
    border: none !important;
  }
  @keyframes gradient-animation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
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
    0% { transform: translateX(-100%); }
    60% { transform: translateX(100%); }
    100% { transform: translateX(100%); }
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
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default ContactSection; 
