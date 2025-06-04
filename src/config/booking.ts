export const BOOKING_CONFIG = {
  // Calendly Configuration
  CALENDLY_URL: 'https://calendly.com/jasmeendahak03/new-meeting?hide_event_type_details=1&hide_gdpr_banner=1',
  CALENDLY_PREFIX: 'truenode',
  
  // Email Configuration
  NOTIFICATION_EMAIL: 'info@truenode.co.uk',
  FORMSUBMIT_ENDPOINT: 'https://formsubmit.co/info@truenode.co.uk',
  
  // Meeting Configuration
  MEETING_DURATION: 30, // minutes
  MEETING_TYPE: 'Video Call (Google Meet)',
  BUSINESS_HOURS: {
    start: '09:00',
    end: '17:00',
    timezone: 'Europe/London'
  },
  
  // Available time slots
  TIME_SLOTS: [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00'
  ],
  
  // Custom fields mapping for Calendly
  CUSTOM_FIELDS: {
    phone: 'a1',
    company: 'a2', 
    projectType: 'a3',
    budget: 'a4',
    timeline: 'a5',
    message: 'a6'
  }
}; 