// Advanced Animation Controller for Nostrum Dream Spaces

class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animationQueue = [];
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupLoadAnimations();
        this.setupParallaxAnimations();
    }

    // Intersection Observer for scroll-triggered animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: [0.1, 0.3, 0.5, 0.7],
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target, entry.intersectionRatio);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll(`
            .observe-fade,
            .observe-slide-left,
            .observe-slide-right,
            .observe-scale,
            .scroll-animate,
            .scroll-animate-left,
            .scroll-animate-right,
            .scroll-animate-scale,
            .stagger-animation > *,
            .counter,
            .progress-bar,
            .image-reveal
        `);

        animatedElements.forEach(element => {
            observer.observe(element);
        });

        this.observers.set('intersection', observer);
    }

    // Trigger animations based on element type and intersection ratio
    triggerAnimation(element, ratio) {
        if (element.classList.contains('animated')) return;

        element.classList.add('animated');

        // Counter animation
        if (element.classList.contains('counter')) {
            this.animateCounter(element);
        }

        // Progress bar animation
        if (element.classList.contains('progress-bar')) {
            this.animateProgressBar(element);
        }

        // Image reveal animation
        if (element.classList.contains('image-reveal')) {
            this.animateImageReveal(element);
        }

        // Stagger animation for child elements
        if (element.classList.contains('stagger-animation')) {
            this.animateStagger(element);
        }

        // Add intersection-based classes
        if (ratio > 0.5) {
            element.classList.add('fully-visible');
        }

        element.classList.add('in-view');
    }

    // Counter animation with easing
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target')) || 
                      parseInt(element.textContent.replace(/[^\d]/g, ''));
        const duration = parseInt(element.getAttribute('data-duration')) || 2000;
        const prefix = element.getAttribute('data-prefix') || '';
        const suffix = element.getAttribute('data-suffix') || '';
        
        let startTime = null;
        
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Easing function (ease-out-cubic)
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOutCubic);
            
            element.textContent = prefix + current.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Progress bar animation
    animateProgressBar(element) {
        const progressFill = element.querySelector('.progress-fill');
        const percentage = element.getAttribute('data-percentage') || 100;
        
        if (progressFill) {
            setTimeout(() => {
                progressFill.style.transform = `translateX(-${100 - percentage}%)`;
            }, 200);
        }
    }

    // Image reveal animation
    animateImageReveal(element) {
        const img = element.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.2)';
            setTimeout(() => {
                img.style.transform = 'scale(1)';
            }, 500);
        }
    }

    // Stagger animation for child elements
    animateStagger(element) {
        const children = element.children;
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('animate-fade-up');
            }, index * 100);
        });
    }

    // Scroll-based animations
    setupScrollAnimations() {
        let ticking = false;

        const updateAnimations = () => {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;

            // Parallax elements
            document.querySelectorAll('.parallax-element').forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            // Floating elements
            document.querySelectorAll('.float-element').forEach(element => {
                const speed = element.getAttribute('data-float-speed') || 0.02;
                const amplitude = element.getAttribute('data-amplitude') || 10;
                const yPos = Math.sin(scrollY * speed) * amplitude;
                element.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Hover animations
    setupHoverAnimations() {
        // Service cards hover effect
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateServiceCard(card, 'enter');
            });

            card.addEventListener('mouseleave', () => {
                this.animateServiceCard(card, 'leave');
            });
        });

        // Project cards hover effect
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateProjectCard(card, 'enter');
            });

            card.addEventListener('mouseleave', () => {
                this.animateProjectCard(card, 'leave');
            });
        });

        // Button hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.animateButton(btn, 'enter');
            });

            btn.addEventListener('mouseleave', () => {
                this.animateButton(btn, 'leave');
            });
        });
    }

    animateServiceCard(card, state) {
        const icon = card.querySelector('.service-icon');
        const title = card.querySelector('h3');
        
        if (state === 'enter') {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
            if (title) title.style.color = '#c9a96e';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
            if (title) title.style.color = '';
        }
    }

    animateProjectCard(card, state) {
        const image = card.querySelector('.project-image img');
        const overlay = card.querySelector('.project-overlay');
        
        if (state === 'enter') {
            if (image) image.style.transform = 'scale(1.1)';
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.transform = 'scale(1)';
            }
        } else {
            if (image) image.style.transform = 'scale(1)';
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.transform = 'scale(0.95)';
            }
        }
    }

    animateButton(btn, state) {
        if (state === 'enter') {
            btn.style.transform = 'translateY(-2px)';
            btn.style.boxShadow = '0 8px 25px rgba(201, 169, 110, 0.3)';
        } else {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = '';
        }
    }

    // Load animations
    setupLoadAnimations() {
        // Animate elements on page load
        window.addEventListener('load', () => {
            this.animatePageLoad();
        });
    }

    animatePageLoad() {
        // Header animation
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                header.style.transform = 'translateY(0)';
            }, 100);
        }

        // Hero content animation
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const elements = heroContent.querySelectorAll('h1, p, .hero-cta');
            elements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 200 + (index * 200));
            });
        }
    }

    // Parallax animations
    setupParallaxAnimations() {
        // Create parallax effect for background elements
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        if (parallaxElements.length === 0) return;

        let ticking = false;

        const updateParallax = () => {
            const scrollTop = window.pageYOffset;

            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Text animation effects
    animateText(element, effect = 'typewriter') {
        const text = element.textContent;
        element.textContent = '';

        switch (effect) {
            case 'typewriter':
                this.typewriterEffect(element, text);
                break;
            case 'fadeIn':
                this.fadeInWords(element, text);
                break;
            case 'slideUp':
                this.slideUpWords(element, text);
                break;
        }
    }

    typewriterEffect(element, text) {
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i > text.length - 1) {
                clearInterval(timer);
            }
        }, 50);
    }

    fadeInWords(element, text) {
        const words = text.split(' ');
        element.innerHTML = words.map(word => 
            `<span style="opacity: 0;">${word}</span>`
        ).join(' ');

        const spans = element.querySelectorAll('span');
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transition = 'opacity 0.3s ease';
            }, index * 100);
        });
    }

    slideUpWords(element, text) {
        const words = text.split(' ');
        element.innerHTML = words.map(word => 
            `<span style="transform: translateY(20px); opacity: 0; display: inline-block;">${word}</span>`
        ).join(' ');

        const spans = element.querySelectorAll('span');
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.transform = 'translateY(0)';
                span.style.opacity = '1';
                span.style.transition = 'all 0.3s ease';
            }, index * 100);
        });
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
    }
}

// Initialize animation controller
const animationController = new AnimationController();

// Export for use in other modules
window.AnimationController = AnimationController;
window.animationController = animationController;

// Additional utility functions for animations
window.animateElement = function(element, animation, duration = 300) {
    return new Promise(resolve => {
        element.style.animation = `${animation} ${duration}ms ease-out forwards`;
        setTimeout(resolve, duration);
    });
};

window.fadeIn = function(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        
        element.style.opacity = Math.min(progress, 1);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
};

window.fadeOut = function(element, duration = 300) {
    let start = null;
    const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        
        element.style.opacity = Math.max(1 - progress, 0);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    };
    
    requestAnimationFrame(animate);
};

window.slideUp = function(element, duration = 300) {
    const height = element.offsetHeight;
    element.style.height = height + 'px';
    element.style.overflow = 'hidden';
    
    let start = null;
    const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        
        element.style.height = Math.max(height * (1 - progress), 0) + 'px';
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
            element.style.height = '';
            element.style.overflow = '';
        }
    };
    
    requestAnimationFrame(animate);
};

window.slideDown = function(element, duration = 300) {
    element.style.display = 'block';
    const height = element.scrollHeight;
    element.style.height = '0px';
    element.style.overflow = 'hidden';
    
    let start = null;
    const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        
        element.style.height = Math.min(height * progress, height) + 'px';
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.style.height = '';
            element.style.overflow = '';
        }
    };
    
    requestAnimationFrame(animate);
};