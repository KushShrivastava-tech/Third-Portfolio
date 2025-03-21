// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Text animation sequence
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-text');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Progress bar animation
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    const skillSection = document.querySelector('.skills-section');

    if (!skillSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                    bar.classList.add('animate');
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillSection);
};

// Skills animation
const skillSection = document.querySelector('.skills-section');
const progressBars = document.querySelectorAll('.progress-bar');

const animateSkills = () => {
    if (!skillSection) return;
    
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;
    
    if (sectionPos < screenPos) {
        progressBars.forEach(bar => {
            const value = bar.getAttribute('data-progress');
            bar.style.width = value + '%';
            bar.style.opacity = 1;
            
            // Add counter animation
            const counter = bar.parentElement.previousElementSibling.querySelector('span');
            if (counter) {
                let currentValue = 0;
                const targetValue = parseInt(value);
                const increment = targetValue / 30; // Divide animation into 30 steps
                
                const updateCounter = () => {
                    if (currentValue < targetValue) {
                        currentValue += increment;
                        counter.textContent = Math.round(currentValue) + '%';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = targetValue + '%';
                    }
                };
                
                updateCounter();
            }
        });
    }
};

window.addEventListener('scroll', animateSkills);

// Portfolio filtering
const initPortfolioFilter = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Show all items initially
    portfolioItems.forEach(item => {
        item.classList.remove('hide');
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            console.log('Filter clicked:', filterValue); // Debug log

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                console.log('Item category:', itemCategory); // Debug log

                if (filterValue === 'all') {
                    item.classList.remove('hide');
                } else if (itemCategory === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });
};

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateProgressBars();
    initPortfolioFilter();
});

// Service card height equalization
const equalizeServiceCardHeights = () => {
    const serviceCards = document.querySelectorAll('.service-card');
    let maxHeight = 0;
    
    // Reset heights
    serviceCards.forEach(card => {
        card.style.height = 'auto';
        maxHeight = Math.max(maxHeight, card.offsetHeight);
    });
    
    // Set equal heights
    serviceCards.forEach(card => {
        card.style.height = maxHeight + 'px';
    });
};

window.addEventListener('load', equalizeServiceCardHeights);
window.addEventListener('resize', equalizeServiceCardHeights);

// Portfolio filtering with animation
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            item.style.transform = 'scale(0.8)';
            item.style.opacity = '0';
            
            setTimeout(() => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            }, 300);
        });
    });
});

// Handle quotation form submission
const quotationForm = document.getElementById('quotationForm');
if (quotationForm) {
    quotationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Hide modal
            const modal = document.getElementById('getStartedModal');
            const bsModal = bootstrap.Modal.getInstance(modal);
            bsModal.hide();
            
            // Show success message
            const toast = new bootstrap.Toast(document.createElement('div'));
            toast.classList.add('toast', 'show', 'position-fixed', 'bottom-0', 'end-0', 'm-3');
            toast.innerHTML = `
                <div class="toast-header bg-success text-white">
                    <strong class="me-auto">Success!</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    Thank you for your interest! We'll get back to you within 24 hours.
                </div>
            `;
            document.body.appendChild(toast);
            
            // Reset form and button
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Remove toast after 5 seconds
            setTimeout(() => {
                toast.remove();
            }, 5000);
        }, 1500);
    });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        formStatus.className = 'mt-3 text-info';
        formStatus.textContent = 'Sending your message...';

        // Get form data
        const templateParams = {
            to_name: 'Kush Shrivastava',
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            reply_to: document.getElementById('email').value
        };

        // Send email using EmailJS
        emailjs.send(
            'service_i1d37pn',
            'template_otkrwwp',
            templateParams
        )
        .then(function() {
            // Success
            formStatus.className = 'mt-3 text-success';
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            contactForm.reset();
        })
        .catch(function(error) {
            // Error
            console.error('EmailJS error:', error);
            formStatus.className = 'mt-3 text-danger';
            formStatus.textContent = 'Oops! Something went wrong. Please try again later.';
        })
        .finally(function() {
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
    });
}

// Contact form handling (Modal)
const contactFormModal = document.getElementById('contactFormModal');
const formStatusModal = document.getElementById('formStatusModal');

if (contactFormModal) {
    contactFormModal.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        formStatusModal.className = 'mt-3 text-info';
        formStatusModal.textContent = 'Sending your message...';

        // Get form data
        const templateParams = {
            to_name: 'Kush Shrivastava',
            from_name: document.getElementById('nameModal').value,
            from_email: document.getElementById('emailModal').value,
            subject: document.getElementById('subjectModal').value,
            message: document.getElementById('messageModal').value,
            reply_to: document.getElementById('emailModal').value
        };

        // Send email using EmailJS
        emailjs.send(
            'service_i1d37pn',
            'template_otkrwwp',
            templateParams
        )
        .then(function() {
            // Success
            formStatusModal.className = 'mt-3 text-success';
            formStatusModal.textContent = 'Thank you! Your message has been sent successfully.';
            contactFormModal.reset();
            
            // Close modal after 2 seconds
            setTimeout(() => {
                const contactModal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
                contactModal.hide();
            }, 2000);
        })
        .catch(function(error) {
            // Error
            console.error('EmailJS error:', error);
            formStatusModal.className = 'mt-3 text-danger';
            formStatusModal.textContent = 'Oops! Something went wrong. Please try again later.';
        })
        .finally(function() {
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
    });
}

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const addActiveClass = () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', addActiveClass);
window.addEventListener('load', addActiveClass);