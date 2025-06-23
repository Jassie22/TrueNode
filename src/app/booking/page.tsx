'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Link from 'next/link';
import Script from 'next/script';
import { BOOKING_CONFIG } from '@/config/booking';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState<'datetime' | 'details' | 'calendly'>('datetime');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const calendlyRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
    budget: '',
    timeline: ''
  });

  // Available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00'
  ];

  // Project types
  const projectTypes = [
    'Website Development',
    'App Development', 
    'AI Integration',
    'Data Analysis',
    'Branding',
    'Ecommerce',
    'Other'
  ];

  // Budget ranges
  const budgetRanges = [
    'Under £5,000',
    '£5,000 - £10,000',
    '£10,000 - £25,000',
    '£25,000 - £50,000',
    'Over £50,000'
  ];

  // Timeline options
  const timelineOptions = [
    'ASAP',
    '1-3 months',
    '3-6 months',
    '6+ months',
    'Just exploring'
  ];

  useEffect(() => {
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
  }, []);

  // Generate available dates (next 30 days excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() + 1); // Start from tomorrow
    
    while (dates.length < 20) {
      const dayOfWeek = currentDate.getDay();
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const formatDateForSubmission = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (step === 'datetime') {
      setSelectedDate('selected');
      setSelectedTime('selected');
      setStep('details');
    } else if (step === 'details' && formData.name && formData.email) {
      setStep('calendly');
    }
  };

  // Listen for Calendly events
  useEffect(() => {
    if (step === 'calendly') {
      const handleCalendlyEvent = (e: MessageEvent) => {
        if (e.data.event && e.data.event.indexOf('calendly') === 0) {
          if (e.data.event === 'calendly.event_scheduled') {
            setBookingConfirmed(true);
            // Send notification email with booking details
            sendBookingNotification(e.data.payload);
          }
        }
      };

      window.addEventListener('message', handleCalendlyEvent);
      
      return () => {
        window.removeEventListener('message', handleCalendlyEvent);
      };
    }
  }, [step]);

  const sendBookingNotification = async (calendlyData: any) => {
    try {
      // Create hidden iframe to prevent redirect (like in chatbot)
      let iframe = document.getElementById('hidden-form-iframe-booking') as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hidden-form-iframe-booking';
        iframe.name = 'hidden-form-iframe-booking';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      // Send additional project details to your email
      const notificationData = {
        ...formData,
        calendlyEventUri: calendlyData.event.uri,
        scheduledTime: calendlyData.event.start_time,
        inviteeEmail: calendlyData.invitee.email,
        bookingType: 'Automated Calendly Booking',
        submittedAt: new Date().toISOString()
      };

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = BOOKING_CONFIG.FORMSUBMIT_ENDPOINT;
      form.style.display = 'none';
      form.target = 'hidden-form-iframe-booking'; // Target the hidden iframe
      
      Object.entries(notificationData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      
      // Add FormSubmit configuration
      const subjectField = document.createElement('input');
      subjectField.type = 'hidden';
      subjectField.name = '_subject';
      subjectField.value = `New Automated Booking: ${formData.name} - ${formData.projectType}`;
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
      
      // Prevent redirect by targeting the hidden iframe
      const nextField = document.createElement('input');
      nextField.type = 'hidden';
      nextField.name = '_next';
      nextField.value = window.location.href;
      form.appendChild(nextField);
      
      document.body.appendChild(form);
      form.submit();
      
      // Clean up form after submission
      setTimeout(() => {
        if (document.body.contains(form)) {
          document.body.removeChild(form);
        }
      }, 1000);
    } catch (error) {
      console.error('Error sending booking notification:', error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated background */}
        <div 
          ref={backgroundRef}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <div className="glow-blob absolute w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] top-[10%] left-[20%] opacity-30"></div>
          <div className="glow-blob absolute w-[400px] h-[400px] rounded-full bg-accent-blue/4 blur-[100px] bottom-[20%] right-[10%] opacity-25"></div>
          <div className="glow-blob absolute w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[80px] top-[50%] left-[60%] opacity-20"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 p-6">
          <Link href="/" className="inline-flex items-center text-white hover:text-accent transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Homepage
          </Link>
        </nav>

        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          {!bookingConfirmed ? (
            <>
              {/* Header */}
              <div className="text-center mb-12">
                <div className="absolute h-1 w-32 bg-accent rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-8 md:-translate-y-8 -translate-y-4 shadow-glow"></div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 pt-4"
                    style={{ textShadow: '0 0 15px rgba(144, 58, 231, 0.5)' }}>
                  Book Your <span className="text-accent">Free Consultation</span>
                </h1>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Schedule a 30-minute consultation to discuss your project needs. Automatically synced to our calendar.
                </p>
              </div>

              {/* Progress indicator */}
              <div className="flex justify-center mb-12">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    step === 'datetime' ? 'bg-accent border-accent text-white' : 
                    step === 'details' || step === 'calendly' ? 'bg-accent/20 border-accent text-accent' : 
                    'border-white/30 text-white/50'
                  }`}>
                    1
                  </div>
                  <div className={`w-16 h-0.5 transition-colors ${
                    step === 'details' || step === 'calendly' ? 'bg-accent' : 'bg-white/30'
                  }`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    step === 'details' ? 'bg-accent border-accent text-white' : 
                    step === 'calendly' ? 'bg-accent/20 border-accent text-accent' :
                    'border-white/30 text-white/50'
                  }`}>
                    2
                  </div>
                  <div className={`w-16 h-0.5 transition-colors ${
                    step === 'calendly' ? 'bg-accent' : 'bg-white/30'
                  }`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    step === 'calendly' ? 'bg-accent border-accent text-white' : 'border-white/30 text-white/50'
                  }`}>
                    3
                  </div>
                </div>
              </div>

              {/* Step content */}
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/10"
              >
                {step === 'datetime' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Project Information</h2>
                    <p className="text-white/70 mb-6">Tell us about your project so we can prepare for our consultation.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-white/80 mb-2">Project Type</label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white rounded-lg focus:border-accent focus:outline-none"
                        >
                          <option value="">Select a service</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/80 mb-2">Budget Range</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white rounded-lg focus:border-accent focus:outline-none"
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-white/80 mb-2">Timeline</label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white rounded-lg focus:border-accent focus:outline-none"
                        >
                          <option value="">Select timeline</option>
                          {timelineOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/80 mb-2">Company (Optional)</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white rounded-lg focus:border-accent focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-white/80 mb-2">Project Description</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white rounded-lg focus:border-accent focus:outline-none resize-none"
                      ></textarea>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleNextStep}
                        className="px-8 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-all duration-300"
                      >
                        Continue to Contact Details
                      </button>
                    </div>
                  </div>
                )}

                {step === 'details' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Your Contact Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-white/80 mb-2">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white rounded-lg focus:border-accent focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white rounded-lg focus:border-accent focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-white/80 mb-2">Phone (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white rounded-lg focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => setStep('datetime')}
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        disabled={!formData.name || !formData.email}
                        className="px-8 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Schedule Meeting
                      </button>
                    </div>
                  </div>
                )}

                {step === 'calendly' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Select Your Preferred Time</h2>
                    <p className="text-white/70 mb-6">
                      Choose a time that works best for you. The meeting will be automatically added to both our calendars.
                    </p>
                    
                    {/* Calendly inline widget using simple HTML approach */}
                    <div 
                      className="calendly-inline-widget bg-white rounded-lg overflow-hidden mx-auto w-full max-w-[95vw] md:max-w-4xl h-[500px] md:h-[600px]"
                      data-url={BOOKING_CONFIG.CALENDLY_URL}
                      style={{ 
                        minWidth: '320px',
                        maxWidth: '100%'
                      }}
                    ></div>

                    <div className="mt-6 flex justify-start">
                      <button
                        onClick={() => setStep('details')}
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300"
                      >
                        Back to Contact Details
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Main Success Message */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-lg rounded-2xl p-6 md:p-8 lg:p-12 mb-8 border border-white/10 shadow-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
                  🎉 Meeting Scheduled Successfully!
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                  Perfect! Your consultation has been automatically added to our calendars. 
                  <span className="text-purple-400 font-semibold"> We're excited to discuss your project with you!</span>
                </p>
                
                {/* What Happens Next Section */}
                <div className="bg-gradient-to-r from-accent/10 to-accent-blue/10 border border-accent/30 rounded-xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center">
                    <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    What Happens Next
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-accent font-bold text-xs md:text-sm">1</span>
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1 text-sm md:text-base">📧 Confirmation Email</p>
                        <p className="text-white/70 text-xs md:text-sm">Check your inbox for the calendar invitation with Google Meet link</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-accent font-bold text-xs md:text-sm">2</span>
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1 text-sm md:text-base">📋 Project Review</p>
                        <p className="text-white/70 text-xs md:text-sm">We'll review your project details before our call</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-accent font-bold text-xs md:text-sm">3</span>
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1 text-sm md:text-base">💬 Strategic Discussion</p>
                        <p className="text-white/70 text-xs md:text-sm">30-minute focused conversation about your goals and requirements</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-accent font-bold text-xs md:text-sm">4</span>
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1 text-sm md:text-base">📊 Custom Proposal</p>
                        <p className="text-white/70 text-xs md:text-sm">Tailored recommendations and next steps for your project</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preparation Tips */}
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/20 rounded-xl p-6 mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                    Come Prepared With
                  </h4>
                  <div className="text-white/80 text-sm space-y-2">
                    <p>• Any questions about our services or approach</p>
                    <p>• Specific examples or inspiration for your project</p>
                    <p>• Timeline preferences and budget considerations</p>
                    <p>• Current challenges you're facing with your digital presence</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/" 
                  className="group px-8 py-4 bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 w-full sm:w-auto"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                  <span>Return to Homepage</span>
                </Link>
                <button
                  onClick={() => {
                    window.location.href = '/#services';
                  }}
                  className="group px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 w-full sm:w-auto"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  <span>Explore Our Services</span>
                </button>
              </div>

              {/* Additional Contact Info */}
              <div className="mt-12 p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/5">
                <p className="text-white/60 text-sm mb-2">Need to reschedule or have questions?</p>
                <p className="text-white/80">
                  Contact us at{' '}
                  <a href="mailto:info@truenode.co.uk" className="text-accent hover:text-accent-light transition-colors font-medium">
                    info@truenode.co.uk
                  </a>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Calendly script - load only when needed */}
      {step === 'calendly' && (
        <Script 
          src="https://assets.calendly.com/assets/external/widget.js" 
          strategy="lazyOnload"
          async
        />
      )}
    </>
  );
};

// Add type definition for the Calendly global object
declare global {
  interface Window {
    Calendly: any;
  }
}

export default BookingPage; 