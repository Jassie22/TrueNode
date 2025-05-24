'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

// Removed hardcoded API key. We'll use environment variables instead.

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Company and team information for AI context
const companyInfo = {
  about: "True Node is a forward-thinking tech consultancy based in Leamington Spa, Warwickshire, UK. We combine technical expertise with creative problem-solving to help businesses transform their digital presence. We work with clients remotely worldwide.",
  founders: {
    jas: "Jasmeen is a technical founder with 8+ years of development experience. She has won machine learning competitions, built numerous dashboards, websites, and apps, and has contracted AI work contributing to the building of large AI models. With a background in science from the University of Nottingham, she brings unique problem-solving skills to every project. Contact: jasmeen.dahak@truenode.co.uk",
    dylan: "Dylan has a Mechanical Engineering degree from the University of Nottingham and is a project engineer at Jaguar Land Rover. With 3+ years of experience, he has managed projects with budgets exceeding £2.5 million. He specializes in client management and project delivery, ensuring smooth execution and satisfied clients. Contact: dylan.shah@truenode.co.uk"
  },
  story: "Jasmeen and Dylan met at the University of Nottingham and recognized their complementary skills - Jasmeen's technical expertise and Dylan's project management abilities. They founded True Node to create innovative digital solutions with a personal touch, now operating from Leamington Spa.",
  services: {
    webDevelopment: "Custom website development using modern frameworks like React, Next.js, and Vue. We build responsive, performant sites optimized for search engines and conversion.",
    appDevelopment: "Native and cross-platform mobile applications for iOS and Android, built with React Native, Flutter, or native technologies depending on project requirements.",
    aiIntegration: "Implementation of AI solutions including chatbots, recommendation systems, and automated workflows to enhance business operations and customer experiences.",
    branding: "Complete brand identity development including logo design, style guides, and visual language that communicates your company's values and vision.",
    support: "Ongoing technical support, maintenance, and hosting solutions to keep your digital products running smoothly with minimal downtime.",
    dataAnalysis: "Data visualization and analytics solutions that transform raw data into actionable insights for better business decision-making."
  },
  approach: "We take a collaborative approach to projects, working closely with clients from initial concept through design, development, and post-launch support. Our process emphasizes clear communication, iterative feedback, and quality-driven development.",
  social: {
    linkedin: "https://www.linkedin.com/company/true-node1/",
    facebook: "https://www.facebook.com/profile.php?id=61575691329958",
    email: "info@truenode.co.uk"
  }
};

// FAQ data with more detailed answers
const faqItems: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer: "We provide comprehensive digital solutions including custom web development, mobile app creation, AI integration, data analysis, branding, e-commerce implementation, website audits, and dedicated technical support and hosting."
  },
  {
    question: "How much do your services cost?",
    answer: "Our pricing is tailored to each project's scope and requirements. We offer flexible packages starting from £2,000 for basic websites to £20,000+ for complex applications. Contact us for a personalized quote."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity. Basic websites typically take 4-6 weeks, while more complex applications may require 2-3 months. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Absolutely! We offer comprehensive maintenance packages and technical support to ensure your digital products continue to perform optimally. Our support plans include regular updates, security patches, and performance optimization."
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Yes, we specialize in website redesigns that modernize aesthetics, improve functionality, and enhance user experience. We'll carefully evaluate your current site and develop a strategy to elevate your online presence while preserving your brand identity."
  }
];

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickOptions, setShowQuickOptions] = useState(false);
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStep, setFormStep] = useState(0);
  const [formComplete, setFormComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  
  const popupRef = useRef<HTMLDivElement>(null);
  const chatBubbleRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset chat function
  const resetChat = () => {
    // Reset all state variables
    setMessages([{
      role: 'assistant',
      content: 'Hi there! I\'m the True Node assistant. How can I help with your digital project today?',
      timestamp: new Date()
    }]);
    setShowQuickOptions(true);
    setInputValue('');
    setShowFormBuilder(false);
    setFormStep(0);
    setFormComplete(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setEditingField(null);
    setIsTyping(false);
    // Focus the input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Scroll to bottom of messages when new message is added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showQuickOptions]);

  // Initialize chat only when opened for the first time
  useEffect(() => {
    if (isOpen && !hasInitialized) {
      // Add initial welcome message
      const welcomeMessage: Message = {
        role: 'assistant',
        content: 'Hi there! I\'m the True Node assistant. How can I help with your digital project today?',
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
      setShowQuickOptions(true); // Show quick option buttons instead of FAQ
      setHasInitialized(true);
    }
  }, [isOpen, hasInitialized]);

  // Show chat bubble after 20 seconds, then hide it after 30 more seconds
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowChatBubble(true);
    }, 20000); // Show after 20 seconds instead of 30
    
    const hideTimer = setTimeout(() => {
      setShowChatBubble(false);
    }, 50000); // Hide 30 seconds after showing (50 seconds total)

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Animation for chat bubble with improved visibility
  useEffect(() => {
    if (!chatBubbleRef.current) return;
    
    if (showChatBubble) {
      gsap.fromTo(
        chatBubbleRef.current,
        { 
          scale: 0,
          opacity: 0,
          x: 20
        },
        { 
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: 'back.out(1.7)',
          onComplete: () => {
            // Add a more noticeable bounce animation
            gsap.to(chatBubbleRef.current, {
              y: -10,
              duration: 0.8,
              repeat: 5,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        }
      );
    }
  }, [showChatBubble]);

  // Animation for popup open/close
  useEffect(() => {
    if (!popupRef.current) return;

    if (isOpen) {
      // Hide chat bubble when popup is opened
      setShowChatBubble(false);
      
      // Show the popup
      popupRef.current.style.display = 'flex';
      gsap.to(popupRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out'
      });
    } else {
      // Immediately hide chat bubble when closing to prevent brief flash
      setShowChatBubble(false);
      
      // Hide the popup
      gsap.to(popupRef.current, {
        y: 20,
        opacity: 0, 
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (popupRef.current) {
            popupRef.current.style.display = 'none';
          }
        }
      });
    }
  }, [isOpen]);

  // Add quick option buttons data
  const quickOptions = [
    { id: 'website', text: 'Website for my business', prompt: 'I need a website for my small business' },
    { id: 'ecommerce', text: 'Online store', prompt: 'I want to sell products online' },
    { id: 'refresh', text: 'Website refresh', prompt: 'My current website needs updating' },
    { id: 'marketing', text: 'Digital marketing', prompt: 'Help with online marketing' },
    { id: 'budget', text: 'Budget-friendly options', prompt: 'What are your most affordable options?' }
  ];

  // Handle quick option button click
  const handleQuickOptionClick = (prompt: string) => {
    // Add user message with the prompt
    const userMessage: Message = {
      role: 'user',
      content: prompt,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Hide quick options after selection
    setShowQuickOptions(false);
    
    // Add assistant answer after a short delay to simulate thinking
    setTimeout(() => {
      // Find appropriate response based on the prompt
      let response = '';
      
      if (prompt.toLowerCase().includes('business') && prompt.toLowerCase().includes('website')) {
        response = "We create custom websites tailored to small businesses that help you attract customers and grow. Our sites are mobile-friendly, fast-loading, and designed to convert visitors into leads.";
      } else if (prompt.toLowerCase().includes('online') && prompt.toLowerCase().includes('sell')) {
        response = "We can build you a professional online store with secure payments, inventory management, and everything you need to sell your products successfully online.";
      } else if (prompt.toLowerCase().includes('refresh') || prompt.toLowerCase().includes('updating')) {
        response = "We can modernize your existing website with a fresh design, improved functionality, and better mobile experience while preserving your brand identity.";
      } else if (prompt.toLowerCase().includes('marketing')) {
        response = "Our digital marketing services help small businesses get found online through SEO, social media, and targeted campaigns that bring in qualified leads.";
      } else if (prompt.toLowerCase().includes('budget') || prompt.toLowerCase().includes('affordable')) {
        response = "We offer flexible pricing options to fit different budgets, including starter packages for small businesses just getting online.";
      } else {
        // Default response if no match is found
        response = "Thanks for reaching out! We specialize in helping small businesses like yours succeed online. What specific goals are you hoping to achieve with your digital presence?";
      }
      
      // Add suggestion to make a formal inquiry
      setTimeout(() => {
        const inquiryMessage: Message = {
          role: 'assistant',
          content: "Would you like to tell me more about your project? I can help create a formal inquiry to our team.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, inquiryMessage]);
      }, 1500);
      
      // Only add the assistant message if we have a response
      if (response) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }
    }, 1200);
  };

  // Start form builder process with improved, conversational prompts
  const startFormBuilder = (requestType: string) => {
    setShowFormBuilder(true);
    setFormStep(0);
    setFormComplete(false);
    
    // Store the request type but don't display it directly
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: requestType
    });
    
    // Add assistant message to guide user - avoid echoing user's exact words
    const assistantMessage: Message = {
      role: 'assistant',
      content: `I'd be happy to pass your information to our team. They can provide you with personalized insights about your project.\n\nFirst, could you tell me your name?`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    
    // Hide quick options when form builder starts
    setShowQuickOptions(false);
  };

  // Handle form input in chat with improved UX
  const handleFormInput = () => {
    if (!inputValue.trim()) return;
    
    // Add user's input to messages
    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator for natural feel
    setIsTyping(true);
    
    // Process input with a slight delay to feel more natural
    setTimeout(() => {
      // Update form data based on current step
      const updatedFormData = {...formData};
      
      if (formStep === 0) {
        // Name step
        updatedFormData.name = inputValue;
        setFormData(updatedFormData);
        setFormStep(1);
        
        // Ask for email
        const assistantMessage: Message = {
          role: 'assistant',
          content: `Thanks, ${inputValue}! To help us get back to you, what's your email address?`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } 
      else if (formStep === 1) {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputValue)) {
          const errorMessage: Message = {
            role: 'assistant',
            content: "That doesn't look like a valid email address. Please provide a valid email so we can contact you.",
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, errorMessage]);
          setIsTyping(false);
          return;
        }
        
        // Email step
        updatedFormData.email = inputValue;
        setFormData(updatedFormData);
        setFormStep(2);
        
        // Ask for phone number
        const assistantMessage: Message = {
          role: 'assistant',
          content: "Perfect! If you'd like, please share your phone number so we can give you a call to discuss your project. This is optional - you can type 'skip' to continue without it.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      }
      else if (formStep === 2) {
        // Phone number step (optional)
        if (inputValue.toLowerCase() !== 'skip') {
          updatedFormData.phone = inputValue;
        }
        setFormData(updatedFormData);
        setFormStep(3);
        
        // Ask for details with more helpful prompts
        const assistantMessage: Message = {
          role: 'assistant',
          content: `Thanks! Now, please tell me more about your project. What are you looking to achieve? Include details like:\n\n• Project type (website, app, etc.)\n• Key features you need\n• Timeline considerations\n• Any specific technologies you prefer`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      }
      else if (formStep === 3) {
        // Details step
        const originalMessage = updatedFormData.message;
        updatedFormData.message = `${originalMessage}\nAdditional details: ${inputValue}`;
        setFormData(updatedFormData);
        setFormStep(4);
        setFormComplete(true);
        
        // Show summary with stronger call to action
        const phoneInfo = updatedFormData.phone ? `• Phone: ${updatedFormData.phone}\n` : '';
        const summaryMessage: Message = {
          role: 'assistant',
          content: 
            `Perfect! Here's what I'll send to our team:\n` +
            `• Name: ${updatedFormData.name}\n` +
            `• Email: ${updatedFormData.email}\n` +
            `${phoneInfo}` +
            `• Project details: ${updatedFormData.message}\n\n` +
            `Ready to send this to our team? They'll review your requirements and get back to you within 24 hours with insights tailored to your project.`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, summaryMessage]);
      }
      else if (formStep === 4) {
        if (inputValue.toLowerCase() === 'yes') {
          // Submit the form
          submitForm(updatedFormData);
        } else if (inputValue.toLowerCase() === 'edit') {
          setEditingField('choose');
          const assistantMessage: Message = {
            role: 'assistant',
            content: "Which field would you like to edit?",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, assistantMessage]);
        } else {
          // Handle invalid response
          const assistantMessage: Message = {
            role: 'assistant',
            content: `I didn't understand that. Please type \"yes\" to submit your request or \"edit\" to make changes.`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, assistantMessage]);
        }
      }
      
      setIsTyping(false);
    }, 800);
    
    setInputValue('');
  };

  // Submit form data with hidden iframe to prevent redirect
  const submitForm = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data:', data);
      
      // Generate chat summary (not shown to user, for email only)
      const relevantMessagesForSummary = messages.filter(msg =>
        !(msg.role === 'assistant' &&
         (msg.content.startsWith("Perfect! Here's what I'll send to our team:") || // Summary preview
          msg.content.startsWith(`Thanks, ${data.name}! Your request has been submitted successfully.`) || // Post-submission confirm
          msg.content.startsWith("I'd be happy to pass your information") || // Form start
          msg.content.includes("Which field would you like to edit?") || // Edit prompts
          msg.content.startsWith("What is your name?") || // Form prompts
          (msg.content.startsWith("Thanks, ") && msg.content.includes("what's your email address?")) ||
          msg.content.startsWith("Perfect! If you'd like, please share your phone number") ||
          msg.content.startsWith("Thanks! Now, please tell me more about your project")
         ))
      );

      let chatSummaryForEmail = relevantMessagesForSummary
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n\n---\n\n'); // Use double newline and separator for readability in email

      // Truncate to a reasonable length for an email
      const MAX_SUMMARY_OUTPUT_LINES = 25; // Max raw lines to prevent overly long emails
      const summaryLines = chatSummaryForEmail.split('\n');
      if (summaryLines.length > MAX_SUMMARY_OUTPUT_LINES) {
        chatSummaryForEmail = summaryLines.slice(0, MAX_SUMMARY_OUTPUT_LINES).join('\n') + "\n... [Full conversation was longer]";
      }
      
      if (relevantMessagesForSummary.length === 0) {
        chatSummaryForEmail = "User proceeded to the inquiry form with minimal prior conversation.";
      }
      
      // Create hidden iframe to prevent redirect
      let iframe = document.getElementById('hidden-form-iframe') as HTMLIFrameElement;
      
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hidden-form-iframe';
        iframe.name = 'hidden-form-iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }
      
      // Create a hidden form and submit it to formsubmit.co
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://formsubmit.co/info@truenode.co.uk';
      form.style.display = 'none';
      form.target = 'hidden-form-iframe'; // Target the iframe to prevent page navigation
      
      // Add debugging
      console.log('Chatbot submitting form to:', form.action);
      console.log('Form data being submitted:', data);
      
      // Add form fields
      const nameField = document.createElement('input');
      nameField.type = 'text';
      nameField.name = 'name';
      nameField.value = data.name;
      
      const emailField = document.createElement('input');
      emailField.type = 'email';
      emailField.name = 'email';
      emailField.value = data.email;
      
      const phoneField = document.createElement('input');
      phoneField.type = 'text';
      phoneField.name = 'phone';
      phoneField.value = data.phone || 'Not provided';
      
      const messageField = document.createElement('input');
      messageField.type = 'text';
      messageField.name = 'message';
      messageField.value = data.message;
      
      const subjectField = document.createElement('input');
      subjectField.type = 'hidden';
      subjectField.name = '_subject';
      subjectField.value = 'AI Chatbot Inquiry';
      
      const templateField = document.createElement('input');
      templateField.type = 'hidden';
      templateField.name = '_template';
      templateField.value = 'table';
      
      const captchaField = document.createElement('input');
      captchaField.type = 'hidden';
      captchaField.name = '_captcha';
      captchaField.value = 'false';
      
      // Add chat summary field (hidden)
      const chatSummaryField = document.createElement('input');
      chatSummaryField.type = 'hidden';
      chatSummaryField.name = 'chat_conversation_summary'; // This name will appear in the form submission
      chatSummaryField.value = chatSummaryForEmail;
      
      // Prevent redirect after submission
      const nextField = document.createElement('input');
      nextField.type = 'hidden';
      nextField.name = '_next';
      nextField.value = window.location.href;
      
      // Append fields to form
      form.appendChild(nameField);
      form.appendChild(emailField);
      form.appendChild(phoneField);
      form.appendChild(messageField);
      form.appendChild(chatSummaryField); // Add summary field
      form.appendChild(subjectField);
      form.appendChild(templateField);
      form.appendChild(captchaField);
      form.appendChild(nextField);
      
      // Append form to body and submit
      document.body.appendChild(form);
      form.submit();
      
      // Remove form after submission
      setTimeout(() => {
        document.body.removeChild(form);
      }, 1000);
      
      // Add confirmation message with next steps
      const confirmationMessage: Message = {
        role: 'assistant',
        content: 
          `Thanks, ${data.name}! Your request has been submitted successfully. Our team will review your project details and contact you at ${data.email} within 1-2 business days.\n\n` +
          `In the meantime, would you like to learn more about True Node's approach to projects or our technical expertise?`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, confirmationMessage]);
      
      // Show notification banner ONLY after successful form submission
      const notificationBanner = document.createElement('div');
      notificationBanner.className = 'fixed top-0 left-0 right-0 bg-green-600 text-white py-3 px-4 text-center z-[10000] shadow-xl'; // Success styling
      notificationBanner.textContent = 'Inquiry sent successfully! Our team will review it and get back to you shortly.';
      notificationBanner.style.transform = 'translateY(-100%)';
      notificationBanner.style.fontSize = '1rem'; // Slightly larger text
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
        }, 400); // Matched to transition duration
      }, 4000); // Display for 4 seconds
      
      // Add follow-up options after a delay
      setTimeout(() => {
        const followUpMessage: Message = {
          role: 'assistant',
          content: "You can ask me about our development process, technologies we work with, or previous projects we've completed.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, followUpMessage]);
      }, 3000);
      
      setShowFormBuilder(false);
      setFormComplete(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Error message
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, there was a problem submitting your request. Please try again or email us directly at info@truenode.co.uk.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Suggest consultation in a more natural way
  useEffect(() => {
    if (messages.length > 3 && !showFormBuilder && !isSubmitting) {
      // Check if the last message was from the assistant and not a prompt for a request
      const lastMessage = messages[messages.length - 1];
      const lastMessageContent = lastMessage.content.toLowerCase();
      
      if (
        lastMessage.role === 'assistant' && 
        !lastMessageContent.includes('discuss your project') && 
        !lastMessageContent.includes('tell me more about') && 
        !lastMessageContent.includes('personalized') && 
        !lastMessageContent.includes('insights')
      ) {
        // Clear any existing timeout
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        
        // Set a new timeout to suggest a request
        const timeout = setTimeout(() => {
          const suggestRequestMessage: Message = {
            role: 'assistant',
            content: 'By the way, our team would be happy to provide more personalized insights for your specific needs. Would it be helpful to discuss your project in more detail?',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, suggestRequestMessage]);
        }, 60000); // Suggest after 60 seconds of conversation
        
        setTypingTimeout(timeout);
      }
    }
    
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [messages, showFormBuilder, isSubmitting]);

  // Send message to Gemini API with enhanced context and more conversational approach
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // If in form builder mode, handle form input
    if (showFormBuilder) {
      handleFormInput();
      // Refocus input after handling form input
      setTimeout(() => inputRef.current?.focus(), 0);
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Show a notification banner at the top of the page
    const notificationBanner = document.createElement('div');
    notificationBanner.className = 'fixed top-0 left-0 right-0 bg-accent text-white py-2 px-4 text-center z-[10000] shadow-md';
    notificationBanner.textContent = 'Message received! Our assistant is processing your request...';
    notificationBanner.style.transform = 'translateY(-100%)';
    document.body.appendChild(notificationBanner);
    
    // Animate the banner sliding down
    setTimeout(() => {
      notificationBanner.style.transition = 'transform 0.3s ease-out';
      notificationBanner.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove the notification after 3 seconds
    setTimeout(() => {
      notificationBanner.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        if (document.body.contains(notificationBanner)) {
          document.body.removeChild(notificationBanner);
        }
      }, 300);
    }, 3000);
    
    // Hide quick options when user starts typing their own message
    setShowQuickOptions(false);

    try {
      // Check for intent to discuss a project - more nuanced detection
      const input = inputValue.toLowerCase();
      const projectTerms = [
        'quote', 'estimate', 'proposal', 'contact', 'hire', 'work with you', 
        'consultation', 'get in touch', 'submit', 'request', 'project', 
        'help me', 'service', 'discuss', 'talk', 'meet', 'call', 'team',
        'price', 'cost', 'budget', 'expensive', 'affordable', 'package'
      ];
      
      // Check if the message contains any project-related terms
      const hasProjectIntent = projectTerms.some(term => input.includes(term));
      
      // Check if it's a direct question about getting started or pricing
      const isStartingQuestion = 
        (input.includes('how') && (
          input.includes('start') || 
          input.includes('begin') || 
          input.includes('get started') || 
          input.includes('price') || 
          input.includes('cost')
        )) || 
        (input.includes('what') && (
          input.includes('price') || 
          input.includes('cost') || 
          input.includes('next step') || 
          input.includes('process')
        ));
        
      if (hasProjectIntent || isStartingQuestion) {
        setIsTyping(false);
        
        // First respond to their question
        const responseMessage: Message = {
          role: 'assistant',
          content: input.includes('price') || input.includes('cost') || input.includes('expensive') || input.includes('affordable') 
            ? "Our pricing depends on your specific project requirements. We tailor our solutions to match both your needs and budget."
            : "We'd love to learn more about your project and how we can help.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, responseMessage]);
        
        // Then after a short delay, suggest collecting their info
        setTimeout(() => {
          startFormBuilder(inputValue);
        }, 1000);
        
        return;
      }
      
      // Get API key from environment variable
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      
      console.log('Environment variable loaded:', !!apiKey); // Log if the API key exists (true/false)
      
      if (!apiKey) {
        throw new Error('API key not found');
      }

      // Prepare conversation history for context
      const conversationHistory = messages
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');

      // Enhanced prompt with company and team information
      const prompt = `
        ${conversationHistory}
        User: ${inputValue}
        You are a smart, helpful assistant for a digital solutions company called TrueNode.
        IMPORTANT: Your tone should be friendly, approachable, and chatty. Feel free to use a bit more conversational language and aim for responses that are engaging, though still try to be reasonably concise (2-4 sentences is good).
        Your job is to help visitors understand what TrueNode offers and build interest in the company's services.
        Avoid technical jargon unless the user asks for technical details.
        
        About TrueNode:
        ${companyInfo.about}
        
        Founders:
        - Jas: ${companyInfo.founders.jas}
        - Dylan: ${companyInfo.founders.dylan}
        
        Company Story:
        ${companyInfo.story}
        
        TrueNode services:
        - Web Development: ${companyInfo.services.webDevelopment}
        - App Development: ${companyInfo.services.appDevelopment}
        - AI Integration: ${companyInfo.services.aiIntegration}
        - Branding: ${companyInfo.services.branding}
        - Support & Hosting: ${companyInfo.services.support}
        - Data Analysis: ${companyInfo.services.dataAnalysis}
        
        Project Approach:
        ${companyInfo.approach}
        
        Respond helpfully and professionally. Your responses can be a bit longer now, around 2-4 sentences, to be more conversational.
        
        IMPORTANT: 
        1. Never include "Assistant:" prefix in your responses
        2. Be conversational. You can gently guide users towards making an inquiry if their messages indicate a clear need for your services, but do so naturally after addressing their immediate questions.
        3. If the user is asking about costs, pricing, specific project details, or showing interest in services, focus on answering their question first and avoid pushing them to make a formal request.
        
        Your response:
      `;

      // Call Gemini API using the 2.0 Flash model
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          }
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      let aiResponse = "Sorry, I couldn't process your request at this time.";
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        aiResponse = data.candidates[0].content.parts[0].text.trim();
      }

      // Add the AI response
      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Check if this is a good opportunity to suggest discussing their project
      // But do it conversationally and only if their message suggests project interest
      if (
        (input.includes('project') || 
        input.includes('website') || 
        input.includes('app') || 
        input.includes('design') || 
        input.includes('development')) &&
        !aiResponse.toLowerCase().includes('discuss') &&
        !aiResponse.toLowerCase().includes('team')
      ) {
        // Wait a moment before asking if they want more info
        setTimeout(() => {
          const followupMessage: Message = {
            role: 'assistant',
            content: "Would you like to tell me more about what you're looking to achieve with your project?",
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, followupMessage]);
        }, 2000);
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm having trouble connecting to my services right now. Please try again later or contact our team directly at info@truenode.co.uk.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      // Refocus input after AI response
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  // Handle skip button click below message
  const handleSkipButtonClick = () => {
    // Add user message for skip
    const userMessage: Message = {
      role: 'user',
      content: 'skip',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Process skip directly (for phone step)
    setTimeout(() => {
      if (formStep === 2) {
        // Skip phone number
        setFormStep(3);
        
        const assistantMessage: Message = {
          role: 'assistant',
          content: `Thanks! Now, please tell me more about your project. What are you looking to achieve? Include details like:\n\n• Project type (website, app, etc.)\n• Key features you need\n• Timeline considerations\n• Any specific technologies you prefer`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      }
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 800);
  };

  // Handle edit/send buttons below submission
  const handleEditButtonClick = () => {
    // Add user message for edit
    const userMessage: Message = {
      role: 'user',
      content: 'edit',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      setEditingField('choose');
      const assistantMessage: Message = {
        role: 'assistant',
        content: "Which field would you like to edit?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 800);
  };

  const handleSendToTeamButtonClick = () => {
    // Add user message for send
    const userMessage: Message = {
      role: 'user',
      content: 'yes',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Submit the form directly
    submitForm(formData);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-8 right-8 z-[10000] flex flex-col items-end">
      {/* Chat bubble */}
      {showChatBubble && !isOpen && (
        <div 
          ref={chatBubbleRef}
          className="bg-accent text-white p-4 rounded-lg rounded-br-none mb-3 max-w-[280px] shadow-lg shadow-accent/20 animate-pop-in cursor-pointer relative"
          onClick={() => setIsOpen(true)}
        >
          {/* Close button for chat bubble */}
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening the chat
              setShowChatBubble(false);
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-accent-blue hover:bg-accent text-white rounded-full flex items-center justify-center shadow-md transition-colors"
            aria-label="Close chat bubble"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <p className="text-base font-medium">👋 Need help with your digital project? Chat with our AI assistant!</p>
          <p className="text-xs mt-2 opacity-80">Click to start a conversation</p>
          <div className="absolute -bottom-2 right-0 w-4 h-4 bg-accent-blue transform translate-y-1/2 rotate-45"></div>
        </div>
      )}
      
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-accent hover:bg-accent-light text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all hover:shadow-xl hover:scale-105 relative z-50"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {/* Chat popup - using style for display instead of conditional rendering */}
      <div
        ref={popupRef}
        className="bg-[#121212] backdrop-blur-lg border border-[#333] rounded-lg shadow-2xl w-[90vw] sm:w-[400px] md:w-[450px] h-[450px] sm:h-[550px] mt-4 flex flex-col"
        style={{ transform: 'translateY(20px)', opacity: 0, display: 'none' }}
      >
        {/* Chat header with close button inside */}
        <div className="bg-gradient-to-r from-accent to-accent-light p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-white text-lg">TrueNode AI Assistant</h3>
              <p className="text-white/70 text-xs">Ask me anything about our services</p>
            </div>
          </div>
          <div className="flex items-center">
            {/* Only show reset button if there are more than 1 message or form builder is active */}
            {(messages.length > 1 || showFormBuilder) && (
              <button 
                onClick={resetChat}
                className="hover:bg-white/10 rounded-full p-2 transition-colors mr-2 text-white/70 hover:text-white"
                aria-label="Reset chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 2v6h6"></path>
                  <path d="M3 8L8 3"></path>
                  <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
                  <path d="M21 16v6h-6"></path>
                  <path d="M16 21l5-5"></path>
                  <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
                </svg>
              </button>
            )}
            {/* Close button moved here inside the header */}
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 rounded-full p-2 transition-colors"
              aria-label="Minimize chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-black/20">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl p-4 ${
                  message.role === 'user' 
                    ? 'bg-accent text-white shadow-md' 
                    : 'bg-[#2A2A2A] text-white/90 shadow-md'
                }`}
              >
                <p className="text-[15px] whitespace-pre-line leading-relaxed">{message.content}</p>
                <span className="text-xs text-white/60 block mt-2 text-right">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          
          {/* Quick options below input */}
          {showQuickOptions && (
            <div className="p-3 border-t border-gray-100/10">
              <p className="text-xs text-gray-400 mb-2">I'm interested in:</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {quickOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleQuickOptionClick(option.prompt)}
                    className="px-3 py-1.5 rounded-full bg-gradient-to-r from-accent/10 to-accent-blue/10 text-white/80 text-xs border border-accent/20 hover:from-accent/20 hover:to-accent-blue/20 hover:border-accent/30 hover:text-white transition-all duration-300"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
              <div className="flex justify-center mt-3">
                <button
                  onClick={() => startFormBuilder("New inquiry")}
                  className="flex items-center gap-1 text-accent hover:text-accent-light text-sm bg-accent/10 hover:bg-accent/20 px-4 py-1.5 rounded-lg transition-all duration-300 border border-accent/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Create formal inquiry
                </button>
              </div>
            </div>
          )}
          
          {/* Edit options displayed as buttons */}
          {editingField === 'choose' && (
            <div className="bg-[#2A2A2A] text-white/90 rounded-lg p-4 mt-3 shadow-md border border-[#444]/30">
              <p className="text-[15px] font-medium mb-3">What would you like to edit?</p>
              <div className="flex flex-wrap gap-2">
                {(['name','email','phone','details'] as const).map(field => (
                  <button
                    key={field}
                    className="py-2 px-4 bg-accent/20 hover:bg-accent/40 text-white rounded-full transition-colors text-sm font-medium border border-accent/30"
                    onClick={() => {
                      setEditingField(field);
                      // Prompt for the chosen field
                      const prompts = {
                        name: 'What is your name?',
                        email: 'What is your email address?',
                        phone: 'What is your phone number? (or type skip)',
                        details: 'Please provide your project details.'
                      };
                      setMessages(prev => [...prev, { role: 'assistant', content: prompts[field], timestamp: new Date() }]);
                    }}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </button>
                ))}
                <button
                  className="py-2 px-4 bg-green-600/60 hover:bg-green-600/80 text-white rounded-full transition-colors text-sm font-medium"
                  onClick={() => {
                    setEditingField(null);
                    setMessages(prev => [...prev, { 
                      role: 'assistant', 
                      content: 'Great! Ready to send this to our team? They\'ll review your information and get back to you within 24 hours.', 
                      timestamp: new Date() 
                    }]);
                    setFormStep(4);
                  }}
                >
                  Submit as is
                </button>
              </div>
            </div>
          )}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#2A2A2A] text-white rounded-2xl p-4 max-w-[85%] shadow-md">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/60 animate-pulse"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/60 animate-pulse delay-100"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/60 animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}

          {/* Skip button as a bubble below message when appropriate */}
          {showFormBuilder && formStep === 2 && !isTyping && (
            <div className="flex justify-start mt-2 ml-10">
              <button
                onClick={handleSkipButtonClick}
                className="bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue hover:text-white text-sm font-medium rounded-full px-4 py-2 transition-colors"
              >
                Skip this step
              </button>
            </div>
          )}

          {/* Edit/Send buttons below submission summary */}
          {formStep === 4 && formComplete && !isTyping && (
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={handleEditButtonClick}
                className="bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue hover:text-white text-sm font-medium rounded-lg px-6 py-2 transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Details
              </button>
              <button
                onClick={handleSendToTeamButtonClick}
                className="bg-gradient-to-r from-accent to-accent-blue text-white text-sm font-medium rounded-lg px-6 py-2 transition-colors flex items-center gap-1 shadow-md hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send to Team
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="mt-auto border-t border-gray-700/30 p-3 bg-zinc-900/50">
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center text-xs text-gray-400 mb-2">
              <div className="h-2 w-2 bg-accent rounded-full animate-ping mr-1.5"></div>
              <span>AI Assistant is typing...</span>
            </div>
          )}
          
          <div className="relative flex items-center">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (handleSendMessage(), setTimeout(() => inputRef.current?.focus(), 0))}
              placeholder={showFormBuilder ? "Type your response..." : "Type your message..."}
              className="w-full bg-zinc-800/90 border border-gray-700/50 rounded-lg py-2.5 pl-4 pr-12 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
              disabled={isTyping || isSubmitting}
              ref={inputRef}
            />
            
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping || isSubmitting}
              className="absolute right-2 p-1.5 bg-accent hover:bg-accent-hover text-white rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-accent flex items-center justify-center"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Create inquiry button */}
          {!showFormBuilder && !isSubmitting && messages.length > 1 && (
            <div className="flex justify-center mt-3">
              <button
                onClick={() => startFormBuilder("New inquiry from chat")}
                className="flex items-center gap-1 text-accent hover:text-accent-light text-sm bg-accent/10 hover:bg-accent/20 px-4 py-1.5 rounded-lg transition-all duration-300 border border-accent/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Create formal inquiry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotPopup; 