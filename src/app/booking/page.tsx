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
      
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
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
                <div className="absolute h-1 w-32 bg-accent rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-8 shadow-glow"></div>
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
                      className="calendly-inline-widget bg-white rounded-lg overflow-hidden"
                      data-url={BOOKING_CONFIG.CALENDLY_URL}
                      style={{ minWidth: '320px', height: '700px' }}
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
              className="text-center"
            >
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 mb-8">
                <div className="w-20 h-20 bg-green-500/20 rounded-full mx-auto flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">Meeting Scheduled!</h2>
                <p className="text-white/80 mb-6">
                  Perfect! Your consultation has been automatically added to our calendars. You'll receive a confirmation email with the meeting link and details.
                </p>
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                  <p className="text-sm">
                    <strong>What's Next:</strong><br />
                    • Check your email for the calendar invitation<br />
                    • The Google Meet link will be included<br />
                    • We'll review your project details before our call<br />
                    • Come prepared with any questions or additional requirements
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="px-6 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-all duration-300">
                  Return to Homepage
                </Link>
                <Link href="/services" className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300">
                  Explore Our Services
                </Link>
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