// Modern JavaScript for Enhanced User Experience
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Back to top functionality
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for anchor links
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
    
    // Active navigation highlighting
    const navLinks = document.querySelectorAll('.nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Client logos slider
    initializeClientSlider();
    
    // Form handling
    initializeFormHandling();
    
    // Counter animations
    initializeCounterAnimations();
});

// Client logos slider functionality
function initializeClientSlider() {
    const clientsTrack = document.getElementById('clients-track');
    if (!clientsTrack) return;
    
    // List of client logos from the extracted images
    const clientLogos = [
        'client-logos/client-micro_plastics.png',
        'client-logos/client-merck.png',
        'client-logos/client-novozymes.png',
        'client-logos/client-omni_matrix.png',
        'client-logos/client-oaktree.png',
        'client-logos/client-nandhana_palace.png',
        'client-logos/client-nttf.png',
        'client-logos/client-renewsys.png',
        'client-logos/client-rotork.png',
        'client-logos/client-rishi_fibc.png',
        'client-logos/client-rm.png',
        'client-logos/client-emkay.png',
        'client-logos/client-craftsman.png',
        'client-logos/client-sjs.png',
        'client-logos/client-schunk.png',
        'client-logos/client-smtpl.png',
        'client-logos/client-mv_designs.png',
        'client-logos/client-rst.png',
        'client-logos/client-rexam.png',
        'client-logos/client-eigen.png',
        'client-logos/client-invendis.png',
        'client-logos/client-weatherseal.png',
        'client-logos/client-amc.png',
        'client-logos/client-konspec.png'
    ];
    
    // Create logo elements (duplicate for seamless loop)
    const logoElements = [];
    
    // Create two sets for seamless looping
    for (let i = 0; i < 2; i++) {
        clientLogos.forEach(logoSrc => {
            const img = document.createElement('img');
            img.src = logoSrc;
            img.alt = 'Client Logo';
            img.className = 'client-logo';
            img.onerror = function() {
                // If image fails to load, hide it
                this.style.display = 'none';
            };
            logoElements.push(img);
        });
    }
    
    // Add all logos to the track
    logoElements.forEach(logo => {
        clientsTrack.appendChild(logo);
    });
}

// Form handling functionality
function initializeFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                showNotification('Message sent successfully! We will get back to you soon.', 'success');
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    });
}

// Counter animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimization
window.addEventListener('scroll', throttle(() => {
    // Throttled scroll events
}, 16)); // ~60fps

