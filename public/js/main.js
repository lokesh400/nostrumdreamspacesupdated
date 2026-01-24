// Main JavaScript for Nostrum Dream Spaces Website

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing components...');

    // Wait a bit for all styles to load
    setTimeout(function() {
        // Test hamburger menu directly
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        console.log('Elements found:', {
            navToggle: navToggle,
            navMenu: navMenu,
            navToggleVisible: navToggle ? window.getComputedStyle(navToggle).display : 'not found',
            navTogglePosition: navToggle ? window.getComputedStyle(navToggle).position : 'not found'
        });

        if (navToggle && navMenu) {
            console.log('Found hamburger elements, adding direct listener');
            
            // Remove any existing listeners
            navToggle.replaceWith(navToggle.cloneNode(true));
            const newNavToggle = document.getElementById('nav-toggle');
            
            newNavToggle.addEventListener('click', function (e) {
                console.log('Direct hamburger click detected!');
                e.preventDefault();
                e.stopPropagation();

                newNavToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
                
                console.log('Classes toggled:', {
                    toggleActive: newNavToggle.classList.contains('active'),
                    menuActive: navMenu.classList.contains('active'),
                    bodyMenuOpen: document.body.classList.contains('menu-open')
                });
            });
            
            // Also add touch event for mobile
            newNavToggle.addEventListener('touchstart', function (e) {
                console.log('Touch event detected on hamburger');
                e.preventDefault();
                e.stopPropagation();

                newNavToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
            
        } else {
            console.log('Hamburger elements not found:', { navToggle, navMenu });
        }
    }, 100);

    // Initialize all components
    initNavigation();
    initHeroSlider();
    initScrollAnimations();
    initProjectFilters();
    initBackToTop();
    initSmoothScroll();
    initFormHandling();
    initLazyLoading();
    initCounters();
    initParallax();

    console.log('All components initialized');
});

// Navigation functionality
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    console.log('Navigation elements:', { header, navToggle, navMenu, dropdowns: dropdowns.length });

    // Header scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scro');
        }
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        console.log('Adding click listener to hamburger menu');
        navToggle.addEventListener('click', function (e) {
            console.log('Hamburger clicked!');
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on non-dropdown links
        const navLinks = navMenu.querySelectorAll('.nav-link:not(.dropdown .nav-link)');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');

                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            });
        });

        // Handle dropdown clicks on mobile
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('.nav-link');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');

            if (dropdownLink && dropdownMenu) {
                dropdownLink.addEventListener('click', function (e) {
                    // On mobile, prevent default and toggle dropdown
                    if (window.innerWidth <= 991) {
                        e.preventDefault();

                        // Close other dropdowns
                        dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('active');
                            }
                        });

                        // Toggle current dropdown
                        dropdown.classList.toggle('active');
                    }
                });

                // Close dropdown when clicking on dropdown links
                const dropdownLinks = dropdownMenu.querySelectorAll('a');
                dropdownLinks.forEach(link => {
                    link.addEventListener('click', function () {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.classList.remove('menu-open');
                        dropdown.classList.remove('active');
                    });
                });
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');

                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Handle window resize
        window.addEventListener('resize', function () {
            if (window.innerWidth > 991) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');

                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
}

// Hero slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');

    if (slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function () {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-play slider
    setInterval(nextSlide, 5000);

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // Trigger counter animation if element has counter class
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements with scroll animation classes
    const animateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .observe-fade, .observe-slide-left, .observe-slide-right, .observe-scale');

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Stagger animation for service cards and other grid items
    const staggerElements = document.querySelectorAll('.services-grid .service-card, .projects-grid .project-card, .process-steps .process-step');

    staggerElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('scroll-animate');
        observer.observe(element);
    });
}

// Project filters
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');

                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form handling
function initFormHandling() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                form.reset();

                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }, 2000);
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')) || parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        counter.classList.add('scroll-animate');
    });
}

// Parallax effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

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
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function () {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

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
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimized scroll handler
const optimizedScrollHandler = throttle(function () {
    // Handle scroll-based animations and effects here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Resize handler
const optimizedResizeHandler = debounce(function () {
    // Handle resize-based adjustments here
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// Page visibility API for performance
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        // Pause animations and heavy operations
    } else {
        // Resume animations and operations
    }
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function (err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// File Upload Functionality
function initFileUpload() {
    const fileInputs = document.querySelectorAll('input[type="file"]');

    fileInputs.forEach(input => {
        const uploadArea = input.closest('.file-upload-area');

        if (uploadArea) {
            // Drag and drop functionality
            uploadArea.addEventListener('dragover', function (e) {
                e.preventDefault();
                this.classList.add('dragover');
            });

            uploadArea.addEventListener('dragleave', function (e) {
                e.preventDefault();
                this.classList.remove('dragover');
            });

            uploadArea.addEventListener('drop', function (e) {
                e.preventDefault();
                this.classList.remove('dragover');

                const files = e.dataTransfer.files;
                input.files = files;
                updateFileDisplay(input, files);
            });

            // File selection
            input.addEventListener('change', function () {
                updateFileDisplay(this, this.files);
            });
        }
    });
}

function updateFileDisplay(input, files) {
    const uploadArea = input.closest('.file-upload-area');
    const content = uploadArea.querySelector('.file-upload-content');

    if (files.length > 0) {
        let fileNames = Array.from(files).map(file => file.name).join(', ');
        if (fileNames.length > 50) {
            fileNames = fileNames.substring(0, 50) + '...';
        }
        content.innerHTML = `
            <i class="fas fa-check-circle" style="color: #28a745;"></i>
            <p style="color: #28a745;">${files.length} file(s) selected</p>
            <span style="color: #666;">${fileNames}</span>
        `;
    }
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        form.addEventListener('submit', function (e) {
            let isValid = true;

            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    field.classList.remove('error');
    removeErrorMessage(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }

    // Number validation
    if (field.type === 'number' && value) {
        if (isNaN(value) || parseFloat(value) <= 0) {
            isValid = false;
            errorMessage = 'Please enter a valid number.';
        }
    }

    if (!isValid) {
        field.classList.add('error');
        showErrorMessage(field, errorMessage);
    }

    return isValid;
}

function showErrorMessage(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 14px;
        margin-top: 5px;
        display: block;
    `;

    field.parentNode.appendChild(errorElement);
}

function removeErrorMessage(field) {
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Project Type Dependencies
function initProjectTypeDependencies() {
    const projectTypeSelect = document.getElementById('projectType');
    const propertyTypeSelect = document.getElementById('propertyType');
    const roomsSelect = document.getElementById('rooms');

    if (projectTypeSelect && propertyTypeSelect && roomsSelect) {
        projectTypeSelect.addEventListener('change', function () {
            const projectType = this.value;

            // Update property type options based on project type
            updatePropertyTypeOptions(propertyTypeSelect, projectType);

            // Show/hide rooms field based on project type
            const roomsGroup = roomsSelect.closest('.form-group');
            if (projectType === 'exterior-design' || projectType === 'soundproofing') {
                roomsGroup.style.display = 'none';
                roomsSelect.removeAttribute('required');
            } else {
                roomsGroup.style.display = 'block';
                roomsSelect.setAttribute('required', 'required');
            }
        });
    }
}

function updatePropertyTypeOptions(select, projectType) {
    const allOptions = {
        'interior-design': ['apartment', 'villa', 'office', 'retail', 'restaurant', 'hotel'],
        'exterior-design': ['villa', 'office', 'retail', 'restaurant', 'hotel'],
        'construction': ['apartment', 'villa', 'office', 'retail', 'restaurant', 'hotel'],
        'turnkey': ['apartment', 'villa', 'office', 'retail', 'restaurant', 'hotel'],
        'modular-kitchen': ['apartment', 'villa', 'office', 'restaurant'],
        'modular-furniture': ['apartment', 'villa', 'office', 'retail', 'hotel'],
        'renovation': ['apartment', 'villa', 'office', 'retail', 'restaurant', 'hotel'],
        'flooring': ['apartment', 'villa', 'office', 'retail', 'restaurant', 'hotel'],
        'plumbing': ['apartment', 'villa', 'office', 'restaurant', 'hotel'],
        'soundproofing': ['apartment', 'villa', 'office', 'restaurant', 'hotel']
    };

    const optionLabels = {
        'apartment': 'Apartment',
        'villa': 'Villa/Independent House',
        'office': 'Office',
        'retail': 'Retail Store',
        'restaurant': 'Restaurant/Cafe',
        'hotel': 'Hotel'
    };

    // Clear existing options except the first one
    select.innerHTML = '<option value="">Select Property Type</option>';

    if (projectType && allOptions[projectType]) {
        allOptions[projectType].forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = optionLabels[option];
            select.appendChild(optionElement);
        });
    }
}

// Budget Calculator
function initBudgetCalculator() {
    const areaSizeInput = document.getElementById('areaSize');
    const projectTypeSelect = document.getElementById('projectType');
    const budgetSelect = document.getElementById('budget');

    if (areaSizeInput && projectTypeSelect && budgetSelect) {
        function calculateEstimate() {
            const areaSize = parseFloat(areaSizeInput.value);
            const projectType = projectTypeSelect.value;

            if (areaSize && projectType) {
                const estimate = estimateBudget(areaSize, projectType);
                suggestBudgetRange(budgetSelect, estimate);
            }
        }

        areaSizeInput.addEventListener('input', debounce(calculateEstimate, 500));
        projectTypeSelect.addEventListener('change', calculateEstimate);
    }
}

function estimateBudget(areaSize, projectType) {
    const rates = {
        'interior-design': { min: 1500, max: 3000 },
        'exterior-design': { min: 800, max: 1500 },
        'construction': { min: 2000, max: 4000 },
        'turnkey': { min: 2500, max: 5000 },
        'modular-kitchen': { min: 1200, max: 2500 },
        'modular-furniture': { min: 800, max: 1800 },
        'renovation': { min: 1000, max: 2500 },
        'flooring': { min: 200, max: 800 },
        'plumbing': { min: 300, max: 600 },
        'soundproofing': { min: 150, max: 400 }
    };

    const rate = rates[projectType] || { min: 1000, max: 2000 };

    return {
        min: areaSize * rate.min,
        max: areaSize * rate.max
    };
}

function suggestBudgetRange(select, estimate) {
    const ranges = [
        { value: 'under-2-lakh', min: 0, max: 200000 },
        { value: '2-5-lakh', min: 200000, max: 500000 },
        { value: '5-10-lakh', min: 500000, max: 1000000 },
        { value: '10-25-lakh', min: 1000000, max: 2500000 },
        { value: '25-50-lakh', min: 2500000, max: 5000000 },
        { value: '50-1-crore', min: 5000000, max: 10000000 },
        { value: 'above-1-crore', min: 10000000, max: Infinity }
    ];

    const suggestedRange = ranges.find(range =>
        estimate.min >= range.min && estimate.max <= range.max
    ) || ranges.find(range =>
        estimate.min < range.max && estimate.max > range.min
    );

    if (suggestedRange && !select.value) {
        select.value = suggestedRange.value;
        select.style.borderColor = '#28a745';

        // Show suggestion message
        const suggestion = document.createElement('div');
        suggestion.className = 'budget-suggestion';
        suggestion.innerHTML = `
            <i class="fas fa-lightbulb"></i>
            Suggested based on your project details
        `;
        suggestion.style.cssText = `
            color: #28a745;
            font-size: 12px;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
        `;

        // Remove existing suggestion
        const existingSuggestion = select.parentNode.querySelector('.budget-suggestion');
        if (existingSuggestion) {
            existingSuggestion.remove();
        }

        select.parentNode.appendChild(suggestion);

        // Remove suggestion after 5 seconds
        setTimeout(() => {
            if (suggestion.parentNode) {
                suggestion.remove();
            }
            select.style.borderColor = '';
        }, 5000);
    }
}

// Initialize all form enhancements
document.addEventListener('DOMContentLoaded', function () {
    initFAQ();
    initFileUpload();
    initFormValidation();
    initProjectTypeDependencies();
    initBudgetCalculator();
});

// Add error styles to CSS
const errorStyles = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545;
        background-color: #fff5f5;
    }
    
    .file-upload-area.dragover {
        border-color: #b8956a;
        background-color: #f0f0f0;
        transform: scale(1.02);
    }
`;

// Inject error styles
const styleSheet = document.createElement('style');
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);// 
// Portfolio Page Functionality
function initPortfolio() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    let visibleItems = 6; // Initially show 6 items
    let currentFilter = 'all';

    // Initialize portfolio
    if (portfolioItems.length > 0) {
        showPortfolioItems();

        // Filter functionality
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Reset visible items count
                visibleItems = 6;
                currentFilter = filter;

                // Filter and show items
                filterPortfolioItems(filter);
                showPortfolioItems();
            });
        });

        // Load more functionality
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function () {
                visibleItems += 6;
                showPortfolioItems();
            });
        }
    }

    function filterPortfolioItems(filter) {
        portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-category');

            if (filter === 'all' || categories.includes(filter)) {
                item.style.display = 'block';
                item.classList.remove('hidden');
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
            }
        });
    }

    function showPortfolioItems() {
        const visiblePortfolioItems = Array.from(portfolioItems).filter(item =>
            item.style.display !== 'none'
        );

        visiblePortfolioItems.forEach((item, index) => {
            if (index < visibleItems) {
                item.style.display = 'block';
                item.classList.remove('hidden');
                // Add fade-in animation
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, index * 100);
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
            }
        });

        // Show/hide load more button
        if (loadMoreBtn) {
            if (visiblePortfolioItems.length <= visibleItems) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        }
    }
}

// Portfolio Image Lightbox (Simple Implementation)
function initPortfolioLightbox() {
    const portfolioImages = document.querySelectorAll('.portfolio-image img');

    portfolioImages.forEach(img => {
        img.addEventListener('click', function (e) {
            e.stopPropagation();
            openLightbox(this.src, this.alt);
        });
    });

    function openLightbox(src, alt) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" alt="${alt}" class="lightbox-image">
                <button class="lightbox-close">&times;</button>
                <div class="lightbox-caption">${alt}</div>
            </div>
        `;

        // Add lightbox styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const content = lightbox.querySelector('.lightbox-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        `;

        const image = lightbox.querySelector('.lightbox-image');
        image.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 10px;
        `;

        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const caption = lightbox.querySelector('.lightbox-caption');
        caption.style.cssText = `
            color: white;
            margin-top: 20px;
            font-size: 16px;
        `;

        // Add to page
        document.body.appendChild(lightbox);

        // Animate in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);

        // Close functionality
        function closeLightbox() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        }

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard close
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }
}

// Portfolio Statistics Counter Animation
function initPortfolioCounters() {
    const counters = document.querySelectorAll('.stat-number.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current) + (target > 50 ? '+' : '');
                    }, 16);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Initialize portfolio functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initPortfolio();
    initPortfolioLightbox();
    initPortfolioCounters();
});
