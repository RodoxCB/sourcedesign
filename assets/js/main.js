// Menu Mobile Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Header scroll effect and responsive minimization
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;
let isMinimized = false;

function updateHeader(currentScrollY) {
    // Header background and shadow effects
    if (currentScrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = 'none';
    }

    // Responsive header minimization for mobile
    if (window.innerWidth <= 768) {
        if (currentScrollY > 200 && !isMinimized) {
            header.classList.add('minimized');
            isMinimized = true;
        } else if (currentScrollY <= 50 && isMinimized) {
            header.classList.remove('minimized');
            isMinimized = false;
        }
    } else {
        // Ensure header is visible on larger screens
        if (isMinimized) {
            header.classList.remove('minimized');
            isMinimized = false;
        }
    }
}

// Header click to expand (when minimized)
header.addEventListener('click', () => {
    if (window.innerWidth <= 768 && isMinimized) {
        header.classList.remove('minimized');
        isMinimized = false;
    }
});

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    updateHeader(currentScrollY);
    lastScrollY = currentScrollY;
});

// Initial check on page load
updateHeader(window.scrollY);

// Update header state on window resize
window.addEventListener('resize', () => {
    updateHeader(window.scrollY);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements that should animate on scroll
const animateElements = document.querySelectorAll('.service-card, .benefit-item, .testimonial-card, .diferencial-item, .service-item-detailed, .faq-item');
animateElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm && formMessage) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const nome = document.getElementById('nome').value.trim();
        const empresa = document.getElementById('empresa').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // Validation
        let isValid = true;
        let errors = [];

        // Name validation
        if (nome.length < 2) {
            isValid = false;
            errors.push('Nome deve ter pelo menos 2 caracteres');
        }

        // Phone validation (Brazilian format)
        const phoneRegex = /^\(?(\d{2})\)?\s?9?\d{4}-?\d{4}$/;
        if (!phoneRegex.test(telefone.replace(/\D/g, ''))) {
            isValid = false;
            errors.push('Telefone inválido. Use o formato (11) 99999-9999');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            errors.push('E-mail inválido');
        }

        // Message validation
        if (mensagem.length < 10) {
            isValid = false;
            errors.push('Mensagem deve ter pelo menos 10 caracteres');
        }

        // Show validation results
        if (!isValid) {
            showFormMessage('error', errors.join('<br>'));
            return;
        }

        // Create WhatsApp message
        const whatsappMessage = `Olá! Sou ${nome}${empresa ? ` da empresa ${empresa}` : ''}.

Gostaria de solicitar informações sobre seus serviços de design gráfico.

📋 *Dados do contato:*
• Nome: ${nome}
• Empresa: ${empresa || 'Não informado'}
• Telefone: ${telefone}
• E-mail: ${email}

💬 *Mensagem:*
${mensagem}

Aguardo seu contato! Obrigado.`;

        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // WhatsApp URL
        const whatsappUrl = `https://wa.me/5527996019833?text=${encodedMessage}`;

        // Show success message
        showFormMessage('success', 'Abrindo WhatsApp...');

        // Open WhatsApp after a short delay
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            showFormMessage('success', 'Mensagem enviada com sucesso! Conversa aberta no WhatsApp.');
            contactForm.reset();
        }, 1000);
    });
}

function showFormMessage(type, message) {
    formMessage.className = `form-message ${type}`;
    formMessage.innerHTML = message;
    formMessage.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Phone number formatting
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length <= 10) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
            } else {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            }
        }

        e.target.value = value;
    });
}

// Loading animation for page transitions
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body
    document.body.classList.add('loaded');

    // Remove loading class after animations complete
    setTimeout(() => {
        document.body.classList.remove('loaded');
    }, 1000);
});

// Parallax effect for hero section (optional)
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (heroSection.querySelector('.hero-visual')) {
            heroSection.querySelector('.hero-visual').style.transform = `translateY(${rate * 0.1}px)`;
        }
    });
}

// Service cards hover effect enhancement
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Testimonial carousel (if needed for more testimonials)
class TestimonialCarousel {
    constructor() {
        this.testimonials = document.querySelectorAll('.testimonial-card');
        this.currentIndex = 0;
        this.autoPlayInterval = null;

        if (this.testimonials.length > 3) {
            this.init();
        }
    }

    init() {
        this.showTestimonial(this.currentIndex);
        this.startAutoPlay();
    }

    showTestimonial(index) {
        this.testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.showTestimonial(this.currentIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, 5000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Initialize testimonial carousel if needed
if (document.querySelectorAll('.testimonial-card').length > 3) {
    const carousel = new TestimonialCarousel();
}

// Performance optimization: Lazy load images (if any)
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

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Add focus styles for keyboard navigation
const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #FFFFFF';
    });

    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Prevent form submission on Enter for certain inputs
const inputs = document.querySelectorAll('input:not([type="submit"]):not([type="button"])');
inputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Move to next input or submit if it's the last one
            const inputs = Array.from(document.querySelectorAll('input, textarea'));
            const currentIndex = inputs.indexOf(this);
            const nextInput = inputs[currentIndex + 1];

            if (nextInput) {
                nextInput.focus();
            } else {
                // Submit form if it's the last input
                if (this.form) {
                    this.form.dispatchEvent(new Event('submit'));
                }
            }
        }
    });
});
