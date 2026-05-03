// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links and sections
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Handle floating icon clicks
    floatingIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const targetNavLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
            
            if (targetSection && targetNavLink) {
                // Remove active class from all links and sections
                navLinks.forEach(l => l.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                
                // Add active class to target link and section
                targetNavLink.classList.add('active');
                targetSection.classList.add('active');
                
                // Smooth scroll to section
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Portfolio tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the category to filter
            const category = this.getAttribute('data-category');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    // Add animation
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Smooth scroll function for CTA button
    window.scrollToSection = function(sectionId) {
        const targetSection = document.getElementById(sectionId);
        const targetNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (targetSection && targetNavLink) {
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to target link and section
            targetNavLink.classList.add('active');
            targetSection.classList.add('active');
            
            // Smooth scroll to section
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    // Add loading animation to sections
    sections.forEach(section => {
        section.classList.add('loading');
    });
    
    // Remove loading animation after page load
    setTimeout(() => {
        sections.forEach(section => {
            section.classList.add('loaded');
        });
    }, 100);
    
    // Mobile menu toggle (if needed in future)
    const createMobileMenuToggle = () => {
        if (window.innerWidth <= 768) {
            const sidebar = document.querySelector('.sidebar');
            const menuToggle = document.createElement('button');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.style.cssText = `
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1001;
                background: var(--primary-yellow);
                border: none;
                padding: 0.8rem;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1.2rem;
                color: var(--secondary-dark);
            `;
            
            document.body.appendChild(menuToggle);
            
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            });
        }
    };
    
    // Initialize mobile menu if needed
    createMobileMenuToggle();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const existingToggle = document.querySelector('.mobile-menu-toggle');
        if (window.innerWidth > 768 && existingToggle) {
            existingToggle.remove();
        } else if (window.innerWidth <= 768 && !existingToggle) {
            createMobileMenuToggle();
        }
    });
    
    // Add parallax effect to hero section (optional enhancement)
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = heroSection.querySelectorAll('.hero-left, .hero-right');
            
            parallaxElements.forEach((element, index) => {
                const speed = index === 0 ? 0.5 : 0.3;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.stat-card, .resume-item, .testimonial-card, .portfolio-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Additional utility functions
const utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Add smooth reveal animation
    revealOnScroll: () => {
        const elements = document.querySelectorAll('.reveal-on-scroll');
        elements.forEach(element => {
            if (utils.isInViewport(element)) {
                element.classList.add('revealed');
            }
        });
    }
};

// Initialize reveal on scroll
window.addEventListener('scroll', utils.debounce(utils.revealOnScroll, 100));
utils.revealOnScroll();

// Form validation (if contact form is added later)
const validateForm = (form) => {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
};

// Add error styling for form validation
const formStyles = document.createElement('style');
formStyles.textContent = `
    input.error, textarea.error, select.error {
        border-color: #ff4444 !important;
        box-shadow: 0 0 5px rgba(255, 68, 68, 0.3) !important;
    }
    
    .error-message {
        color: #ff4444;
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }
`;
document.head.appendChild(formStyles);

// Console log for debugging
console.log('Sarita Smith Portfolio - Loaded successfully!');
