// Premium Services Carousel with Price Animation
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.service-slide');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    let autoSlideInterval;

    // Initialize carousel
    function initCarousel() {
        showSlide(0);
        // Auto-slide disabled as requested
        // startAutoSlide();
        animatePrices();
    }

    // Show specific slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
        animatePricesInActiveSlide();
    }

    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // Previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 10000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Navigation dots event listeners
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            // Auto-slide disabled as requested
            // stopAutoSlide();
            // setTimeout(startAutoSlide, 10000); // Restart auto-slide after 10 seconds
        });
    });

    // Arrow navigation event listeners
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            // Auto-slide disabled as requested
            // stopAutoSlide();
            // setTimeout(startAutoSlide, 10000);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
            // Auto-slide disabled as requested
            // stopAutoSlide();
            // setTimeout(startAutoSlide, 10000);
        });
    }

    // Auto-slide hover functionality disabled as requested
    // const carousel = document.querySelector('.premium-services-carousel');
    // if (carousel) {
    //     carousel.addEventListener('mouseenter', stopAutoSlide);
    //     carousel.addEventListener('mouseleave', startAutoSlide);
    // }

    // Animate price counters
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Animate prices in active slide
    function animatePricesInActiveSlide() {
        const activeSlide = document.querySelector('.service-slide.active');
        if (activeSlide) {
            const amounts = activeSlide.querySelectorAll('.amount');
            amounts.forEach(amount => {
                const target = parseInt(amount.getAttribute('data-target'));
                if (target) {
                    amount.textContent = '0';
                    setTimeout(() => {
                        animateCounter(amount, target, 1500);
                    }, 500);
                }
            });
        }
    }

    // Initial price animation for all slides
    function animatePrices() {
        setTimeout(() => {
            animatePricesInActiveSlide();
        }, 1000);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('premium-services-section')) {
                    setTimeout(animatePrices, 500);
                }
            }
        });
    }, observerOptions);

    // Observe premium sections
    const premiumSection = document.querySelector('.premium-services-section');
    if (premiumSection) {
        observer.observe(premiumSection);
    }

    // Add floating animation to title words
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach((word, index) => {
        word.style.animationDelay = `${index * 0.2}s`;
    });

    // Enhanced hover effects for premium cards
    const premiumCards = document.querySelectorAll('.premium-card');
    premiumCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });

    // Initialize everything
    initCarousel();

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        .animate-in .title-word {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        .animate-in .luxury-badge {
            animation: fadeInScale 1s ease-out 0.5s forwards;
            opacity: 0;
        }
        
        .animate-in .premium-subtitle {
            animation: fadeInUp 0.8s ease-out 0.8s forwards;
            opacity: 0;
        }
        
        @keyframes slideInUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeInScale {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes fadeInUp {
            from {
                transform: translateY(30px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

