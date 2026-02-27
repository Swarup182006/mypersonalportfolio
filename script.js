// Portfolio JavaScript

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Skills Animation on Scroll
const skillBars = document.querySelectorAll('.skill-fill');

const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                bar.style.width = bar.style.width;
            });
        }
    });
}, observerOptions);

// Observe the skills section
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const resumeDownload = document.getElementById('resume-download');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real application, this would send to a backend
    alert(`Thank you, ${name}! Your message has been sent successfully.`);
    
    // Reset form
    contactForm.reset();
});

// Resume Download
resumeDownload.addEventListener('click', (e) => {
    e.preventDefault();
    // In a real application, this would download a PDF
    alert('Resume download would happen here. Please contact me directly for my resume.');
});

// Scroll Animation for Sections
const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    sectionObserver.observe(section);
});

// Parallax Effect for Hero Background Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroDecoration = document.querySelector('.hero-decoration');
    
    if (hero && heroDecoration) {
        const parallaxSpeed = scrolled * 0.5;
        heroDecoration.style.transform = `translateY(${parallaxSpeed}px)`;
    }
});

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Initialize animations on load
window.addEventListener('load', () => {
    // Trigger initial scroll event to set active nav
    window.dispatchEvent(new Event('scroll'));
    
    // Add slight delay for hero animations
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('loaded');
    }, 100);
});

// Accessibility: Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance: Debounce scroll events
function debounce(func, wait = 15, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounced scroll events
window.addEventListener('scroll', debounce(() => {
    // Parallax effect
    const scrolled = window.pageYOffset;
    const heroDecoration = document.querySelector('.hero-decoration');
    if (heroDecoration) {
        const parallaxSpeed = scrolled * 0.5;
        heroDecoration.style.transform = `translateY(${parallaxSpeed}px)`;
    }
    
    // Update active navigation
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}));

// Add loading states for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        // Optional: Add loading indicator or confirmation
        console.log(`Opening external link: ${link.href}`);
    });
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Initialize all interactive elements safely
document.addEventListener('DOMContentLoaded', () => {
    // Check if all required elements exist
    const requiredElements = [
        '.hamburger',
        '.nav-menu',
        '#contact-form',
        '#skills'
    ];
    
    requiredElements.forEach(selector => {
        safeQuerySelector(selector);
    });
    
    console.log('Portfolio loaded successfully!');
});