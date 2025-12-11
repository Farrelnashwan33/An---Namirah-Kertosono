// Throttle function untuk optimasi performance
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

// Debounce function untuk optimasi performance
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

// Sticky Header Functionality
const header = document.getElementById('header');
let lastScroll = 0;

const handleScroll = throttle(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}, 16); // ~60fps

window.addEventListener('scroll', handleScroll, { passive: true });

// Smooth Scrolling for Anchor Links
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

// Lazy loading untuk testimonial images (optimized)
function initTestimonialLazyLoad() {
    const testimonialImages = document.querySelectorAll('.testimonial-image');
    
    if ('IntersectionObserver' in window && testimonialImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        testimonialImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize testimonial lazy loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonialLazyLoad);
} else {
    initTestimonialLazyLoad();
}

// WhatsApp CTA Button Enhancement
const ctaButton = document.querySelector('.cta-button');

if (ctaButton) {
    // Add click tracking (optional - can be used for analytics)
    ctaButton.addEventListener('click', function(e) {
        // The link will handle navigation, but we can add analytics here if needed
        console.log('CTA button clicked - redirecting to WhatsApp');
    });
}

// Testimonial gallery click untuk lightbox (optional enhancement)
function initTestimonialLightbox() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    testimonialItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.testimonial-image');
            if (img) {
                // Bisa ditambahkan lightbox modal di sini jika diperlukan
                // Untuk sekarang, hanya console log
                console.log('Testimonial image clicked:', img.src);
            }
        });
    });
}

// Initialize testimonial lightbox
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonialLightbox);
} else {
    initTestimonialLightbox();
}

// Add animation on scroll (optimized untuk smooth)
function animateOnScroll() {
    const elements = document.querySelectorAll('.pricing-card, .inclusions-box, .exclusions-box');
    
    if ('IntersectionObserver' in window && elements.length > 0) {
        // Set initial state dengan CSS class untuk menghindari FOUC
        elements.forEach(element => {
            element.classList.add('fade-in-up');
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Initialize scroll animations setelah DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// Form validation (if contact form is added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Image Slider Functionality
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let autoSlideInterval;

    // Create dots indicator
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    // Function to update slide (optimized dengan requestAnimationFrame)
    function updateSlide() {
        requestAnimationFrame(() => {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (dots[index]) {
                    dots[index].classList.remove('active');
                }
            });

            if (slides[currentSlide]) {
                slides[currentSlide].classList.add('active');
            }
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
        });
    }

    // Function to go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        if (currentSlide >= slides.length) currentSlide = 0;
        updateSlide();
        resetAutoSlide();
    }

    // Next slide
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;
        updateSlide();
        resetAutoSlide();
    }

    // Previous slide
    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        updateSlide();
        resetAutoSlide();
    }

    // Auto slide functionality (optimized)
    function startAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        autoSlideInterval = setInterval(() => {
            requestAnimationFrame(nextSlide);
        }, 5000); // Change slide every 5 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                nextSlide(); // Swipe left - next
            }
            if (touchEndX > touchStartX + 50) {
                prevSlide(); // Swipe right - previous
            }
        }
    }

    // Start auto slide
    startAutoSlide();

    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        heroSlider.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
}

// Initialize slider when DOM is loaded (optimized)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
} else {
    // DOM already loaded
    initSlider();
}

// Add loaded class to body untuk prevent FOUC
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('loaded');
    });
} else {
    document.body.classList.add('loaded');
}

// Dark Mode Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    // Update toggle button state
    function updateToggleState(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }
    }
    
    // Toggle theme function (optimized untuk smooth transition)
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Prevent multiple rapid clicks
        if (html.classList.contains('theme-transitioning')) {
            return;
        }
        
        // Add animation class for smooth transition
        html.classList.add('theme-transitioning');
        
        requestAnimationFrame(() => {
            updateToggleState(newTheme);
            localStorage.setItem('theme', newTheme);
            
            setTimeout(() => {
                html.classList.remove('theme-transitioning');
            }, 300);
        });
    }
    
    // Event listener for toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes (optional)
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Only apply system preference if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            mediaQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    updateToggleState(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
});

// Console message for developers
console.log('%cAn Namirah Travelindo', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cUmroh Spesial Desember 2025', 'color: #f59e0b; font-size: 14px;');

