// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // GSAP Animations
    // Hero Section Animations
    gsap.from('.main-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        onComplete: function() {
            gsap.to('.main-title', { opacity: 1 });
        }
    });
    
    gsap.from('.subtitle', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out',
        onComplete: function() {
            gsap.to('.subtitle', { opacity: 1 });
        }
    });
    
    gsap.from('.cta-button', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out',
        onComplete: function() {
            gsap.to('.cta-button', { opacity: 1 });
        }
    });
    
    // Scroll Animations
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // About Section Animations
    gsap.utils.toArray('.team-member').forEach((member, i) => {
        gsap.to(member, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: member,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Services Section Animations
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Contact Form Animation
    gsap.to('.contact-form', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}); 