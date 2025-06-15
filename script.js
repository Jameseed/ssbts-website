// General Utility Functions

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector(".header");
    if (!header) return; // Exit if header not found

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            header.style.background = "rgba(255, 255, 255, 0.98)";
            header.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
        } else {
            header.style.background = "rgba(255, 255, 255, 0.95)";
            header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const navigation = document.querySelector(".main-navigation ul");

    if (!mobileToggle || !navigation) return; // Exit if elements not found

    mobileToggle.addEventListener("click", () => {
        navigation.classList.toggle("mobile-active");
        mobileToggle.classList.toggle("active");
    });

    // Close mobile menu when a link is clicked
    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("mobile-active");
            mobileToggle.classList.remove("active");
        });
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById("footer-search");
    const searchBtn = document.querySelector(".search-btn");

    if (!searchInput || !searchBtn) return; // Exit if elements not found

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Searching for: "${query}"\n\nThis is a demo. In a real implementation, this would search through the website content.`);
        }
    }

    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            performSearch();
        }
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector("form"); // Assuming one main form on contact page

    if (!contactForm) return; // Exit if form not found

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        console.log("Contact form submitted:", data);
        alert("Thank you for your message! We will get back to you soon.");

        contactForm.reset();
    });
}

// Sliders (only for index.html)
class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll(".hero-slider .slide");
        this.prevBtn = document.querySelector(".hero-section .slider-nav.prev");
        this.nextBtn = document.querySelector(".hero-section .slider-nav.next");

        if (this.slides.length === 0) return; // Exit if no slides found

        this.init();
    }

    init() {
        this.goToSlide(this.currentSlide);
        this.autoPlay = setInterval(() => {
            this.nextSlide();
        }, 5000);

        this.prevBtn.addEventListener("click", () => this.prevSlide());
        this.nextBtn.addEventListener("click", () => this.nextSlide());

        const heroSection = document.querySelector(".hero-section");
        heroSection.addEventListener("mouseenter", () => this.pauseAutoPlay());
        heroSection.addEventListener("mouseleave", () => this.resumeAutoPlay());
    }

    goToSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
        this.currentSlide = nextIndex;
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
        this.currentSlide = prevIndex;
    }

    pauseAutoPlay() {
        clearInterval(this.autoPlay);
    }

    resumeAutoPlay() {
        this.autoPlay = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
}

class TestimonialsSlider {
    constructor() {
        this.currentTestimonial = 0;
        this.testimonials = document.querySelectorAll(".testimonial-carousel .testimonial-slide");
        this.prevBtn = document.querySelector(".testimonials-section .testimonial-nav.prev");
        this.nextBtn = document.querySelector(".testimonials-section .testimonial-nav.next");

        if (this.testimonials.length === 0) return; // Exit if no testimonials found

        this.init();
    }

    init() {
        this.goToTestimonial(this.currentTestimonial);
        this.autoPlay = setInterval(() => {
            this.nextTestimonial();
        }, 6000);

        this.prevBtn.addEventListener("click", () => this.prevTestimonial());
        this.nextBtn.addEventListener("click", () => this.nextTestimonial());
    }

    goToTestimonial(index) {
        this.testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove("active");
            if (i === index) {
                testimonial.classList.add("active");
            }
        });
    }

    nextTestimonial() {
        const nextIndex = (this.currentTestimonial + 1) % this.testimonials.length;
        this.goToTestimonial(nextIndex);
        this.currentTestimonial = nextIndex;
    }

    prevTestimonial() {
        const prevIndex = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
        this.goToTestimonial(prevIndex);
        this.currentTestimonial = prevIndex;
    }
}

class GallerySlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll(".gallery-carousel .gallery-slide");
        this.prevBtn = document.querySelector(".gallery-teaser-section .gallery-nav.prev");
        this.nextBtn = document.querySelector(".gallery-teaser-section .gallery-nav.next");

        if (this.slides.length === 0) return; // Exit if no slides found

        this.init();
    }

    init() {
        this.goToSlide(this.currentSlide);
        this.autoPlay = setInterval(() => {
            this.nextSlide();
        }, 4000);

        this.prevBtn.addEventListener("click", () => this.prevSlide());
        this.nextBtn.addEventListener("click", () => this.nextSlide());

        const gallerySection = document.querySelector(".gallery-teaser-section");
        gallerySection.addEventListener("mouseenter", () => this.pauseAutoPlay());
        gallerySection.addEventListener("mouseleave", () => this.resumeAutoPlay());
    }

    goToSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
        this.currentSlide = nextIndex;
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
        this.currentSlide = prevIndex;
    }

    pauseAutoPlay() {
        clearInterval(this.autoPlay);
    }

    resumeAutoPlay() {
        this.autoPlay = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }
}

class ClientsSlider {
    constructor() {
        this.track = document.querySelector(".client-carousel");
        this.prevBtn = document.querySelector(".clients-section .client-nav.prev");
        this.nextBtn = document.querySelector(".clients-section .client-nav.next");
        this.scrollAmount = 200; // Adjust based on client logo width + gap

        if (!this.track) return; // Exit if track not found

        this.init();
    }

    init() {
        this.prevBtn.addEventListener("click", () => this.scrollClients(-this.scrollAmount));
        this.nextBtn.addEventListener("click", () => this.scrollClients(this.scrollAmount));
    }

    scrollClients(amount) {
        this.track.scrollBy({ left: amount, behavior: "smooth" });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initHeaderScrollEffect();
    initMobileMenu();
    initSearch();

    // Initialize sliders only on index.html
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        new HeroSlider();
        new TestimonialsSlider();
        new GallerySlider();
        new ClientsSlider();
    }

    // Initialize contact form only on contact.html
    if (window.location.pathname.endsWith("contact.html")) {
        initContactForm();
    }

    // Add loading animation
    document.body.classList.add("loaded");
});

// Add CSS for loading state (can be moved to styles.css if preferred)
const loadingCSS = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }

    body.loaded {
        opacity: 1;
    }

    @media (max-width: 768px) {
        .main-navigation ul.mobile-active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            padding: 20px;
            gap: 15px;
        }

        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

// Inject additional CSS
const style = document.createElement("style");
style.textContent = loadingCSS;
document.head.appendChild(style);


