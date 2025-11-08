
// Header scroll effects
class HeaderEffects {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollY = window.scrollY;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateHeader());
        this.updateHeader(); // Initial check
    }

    updateHeader() {
        const currentScrollY = window.scrollY;

        // Add enhanced shadow on scroll for better separation
        if (currentScrollY > 50) {
            this.header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
        } else {
            this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }

        this.lastScrollY = currentScrollY;
    }
}

// Enhanced Mobile Menu with Accessibility
class AccessibleMobileMenu {
    constructor() {
        this.toggleBtn = document.querySelector('.mobile-menu-toggle');
        this.overlay = document.querySelector('.mobile-menu-overlay');
        this.closeBtn = document.querySelector('.mobile-menu-close');
        this.navLinks = document.querySelectorAll('.mobile-nav-link');
        this.isOpen = false;
        this.body = document.body;
        this.lastFocusedElement = null;

        this.init();
    }

    init() {
        if (!this.toggleBtn || !this.overlay) return;

        // Event listeners
        this.toggleBtn.addEventListener('click', () => this.toggleMenu());
        this.closeBtn?.addEventListener('click', () => this.closeMenu());

        // Close on overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeMenu();
            }
        });

        // Close on nav link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Touch/swipe support (optional)
        this.addTouchSupport();

        // Focus trap setup
        this.focusableElements = this.overlay.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        if (this.isOpen) return;

        this.isOpen = true;
        this.lastFocusedElement = document.activeElement;

        // Update ARIA attributes
        this.toggleBtn.setAttribute('aria-expanded', 'true');
        this.overlay.setAttribute('aria-hidden', 'false');

        // Prevent body scroll
        this.body.style.overflow = 'hidden';

        // Add class for animations
        this.overlay.style.display = 'flex';

        // Focus management
        requestAnimationFrame(() => {
            this.closeBtn?.focus();
        });

        // Announce to screen readers
        this.announceMenuState('Menu de navegação aberto');
    }

    closeMenu() {
        if (!this.isOpen) return;

        this.isOpen = false;

        // Update ARIA attributes
        this.toggleBtn.setAttribute('aria-expanded', 'false');
        this.overlay.setAttribute('aria-hidden', 'true');

        // Restore body scroll
        this.body.style.overflow = '';

        // Focus management
        if (this.lastFocusedElement) {
            this.lastFocusedElement.focus();
        }

        // Announce to screen readers
        this.announceMenuState('Menu de navegação fechado');
    }

    handleKeydown(e) {
        if (!this.isOpen) return;

        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                this.closeMenu();
                break;

            case 'Tab':
                this.handleTabKey(e);
                break;
        }
    }

    handleTabKey(e) {
        if (this.focusableElements.length === 0) return;

        const firstElement = this.focusableElements[0];
        const lastElement = this.focusableElements[this.focusableElements.length - 1];

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    addTouchSupport() {
        let startX = 0;
        let startY = 0;

        this.overlay.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        this.overlay.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;

            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;

            // Swipe left to close menu
            if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
                this.closeMenu();
            }
        }, { passive: true });
    }

    announceMenuState(message) {
        // Create temporary announcement for screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';

        announcement.textContent = message;
        document.body.appendChild(announcement);

        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize header effects
    new HeaderEffects();

    // Initialize accessible mobile menu
    new AccessibleMobileMenu();

    // Add loading class to body
    document.body.classList.add('loaded');

    // Remove loading class after animations complete
    setTimeout(() => {
        document.body.classList.remove('loaded');
    }, 1000);
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

// Função para aguardar o carregamento do reCAPTCHA
function waitForRecaptcha() {
    return new Promise((resolve) => {
        if (typeof grecaptcha !== 'undefined') {
            resolve();
        } else {
            const checkRecaptcha = setInterval(() => {
                if (typeof grecaptcha !== 'undefined') {
                    clearInterval(checkRecaptcha);
                    resolve();
                }
            }, 100);
        }
    });
}

// Real-time Form Validation and Submission
class RealTimeFormValidator {
    constructor(formId, messageId) {
        this.form = document.getElementById(formId);
        this.formMessage = document.getElementById(messageId);
        this.fields = {
            nome: { minLength: 2, message: 'Nome deve ter pelo menos 2 caracteres' },
            telefone: {
                regex: /^\(?(\d{2})\)?\s?9?\d{4}-?\d{4}$/,
                message: 'Telefone inválido. Use o formato (11) 99999-9999',
                transform: (value) => value.replace(/\D/g, '')
            },
            email: {
                regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'E-mail inválido'
            },
            mensagem: { minLength: 10, message: 'Mensagem deve ter pelo menos 10 caracteres' }
        };

        this.init();
    }

    init() {
        if (!this.form || !this.formMessage) return;

        // Add real-time validation to each field
        Object.keys(this.fields).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                // Remove existing error message element if present
                this.removeFieldError(fieldName);

                // Add event listeners
                field.addEventListener('input', () => this.validateField(fieldName));
                field.addEventListener('blur', () => this.validateField(fieldName, true));

                // Initial validation for pre-filled fields
                if (field.value.trim()) {
                    this.validateField(fieldName);
                }
            }
        });

        // Handle form submission (fallback para Enter key)
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // NOVO: Event listeners para os dois botões
        const whatsappBtn = document.getElementById('whatsappBtn');
        const emailBtn = document.getElementById('emailBtn');

        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', (e) => this.handleWhatsAppSubmit(e));
        }

        if (emailBtn) {
            emailBtn.addEventListener('click', (e) => this.handleSubmit(e));
        }
    }

    validateField(fieldName, showErrors = false) {
        const field = document.getElementById(fieldName);
        const value = field ? field.value.trim() : '';
        const config = this.fields[fieldName];

        let isValid = true;
        let errorMessage = '';

        // Check validation rules
        if (config.minLength && value.length < config.minLength) {
            isValid = false;
            errorMessage = config.message;
        } else if (config.regex) {
            const testValue = config.transform ? config.transform(value) : value;
            if (!config.regex.test(testValue)) {
                isValid = false;
                errorMessage = config.message;
            }
        }

        // Update field visual feedback
        this.updateFieldVisual(fieldName, isValid);

        // Show/hide error message
        if (showErrors || field === document.activeElement) {
            this.showFieldError(fieldName, isValid ? '' : errorMessage);
        }

        return isValid;
    }

    updateFieldVisual(fieldName, isValid) {
        const field = document.getElementById(fieldName);
        if (!field) return;

        // Remove previous validation classes
        field.classList.remove('valid', 'invalid');

        // Add appropriate class if field has content
        if (field.value.trim()) {
            field.classList.add(isValid ? 'valid' : 'invalid');
        }
    }

    showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        if (!field) return;

        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        // Remove existing error message
        this.removeFieldError(fieldName);

        // Add new error message if provided
        if (message) {
            const errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.id = `${fieldName}-error`;
            errorElement.textContent = message;
            formGroup.appendChild(errorElement);
        }
    }

    removeFieldError(fieldName) {
        const existingError = document.getElementById(`${fieldName}-error`);
        if (existingError) {
            existingError.remove();
        }
    }

    validateAllFields() {
        let allValid = true;
        Object.keys(this.fields).forEach(fieldName => {
            if (!this.validateField(fieldName, true)) {
                allValid = false;
            }
        });
        return allValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        if (!this.validateAllFields()) {
            this.showFormMessage('error', 'Por favor, corrija os erros destacados antes de enviar.');
            return;
        }

        // Wait for reCAPTCHA to be ready
        await waitForRecaptcha();

        // Check reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            this.showFormMessage('error', 'Por favor, complete a verificação de segurança.');
            return;
        }

        // Show loading state
        this.showFormMessage('info', 'Enviando mensagem...');
        const emailBtn = document.getElementById('emailBtn');
        emailBtn.disabled = true;
        emailBtn.innerHTML = '<span>Enviando...</span><i class="material-icons spinning">refresh</i>';

        // Get form values
        const formData = {
            nome: document.getElementById('nome').value.trim(),
            empresa: document.getElementById('empresa').value.trim(),
            telefone: document.getElementById('telefone').value.trim(),
            email: document.getElementById('email').value.trim(),
            mensagem: document.getElementById('mensagem').value.trim(),
            recaptcha: recaptchaResponse
        };

        // Send to server-side function
        fetch('/.netlify/functions/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Apenas mostrar mensagem de sucesso
                this.showFormMessage('success', 'Mensagem enviada com sucesso! Entraremos em contato em breve.');

                // Reset form
                this.form.reset();
                this.clearAllValidation();
                grecaptcha.reset(); // Reset reCAPTCHA
            } else {
                this.showFormMessage('error', data.errors ? data.errors.join('<br>') : 'Erro ao enviar mensagem');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            this.showFormMessage('error', 'Erro de conexão. Tente novamente.');
        })
        .finally(() => {
            // Reset button state
            emailBtn.disabled = false;
            emailBtn.innerHTML = '<span>Enviar via E-mail</span><i class="material-icons">email</i>';
        });
    }

    async handleWhatsAppSubmit(e) {
        e.preventDefault();

        // Validate all fields
        if (!this.validateAllFields()) {
            this.showFormMessage('error', 'Por favor, corrija os erros destacados antes de enviar.');
            return;
        }

        // Wait for reCAPTCHA to be ready
        await waitForRecaptcha();

        // Check reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            this.showFormMessage('error', 'Por favor, complete a verificação de segurança.');
            return;
        }

        // Show loading state
        this.showFormMessage('info', 'Abrindo WhatsApp...');
        const whatsappBtn = document.getElementById('whatsappBtn');
        whatsappBtn.disabled = true;
        whatsappBtn.innerHTML = '<span>Conectando...</span><i class="material-icons spinning">refresh</i>';

        // Get form values
        const nome = document.getElementById('nome').value.trim();
        const empresa = document.getElementById('empresa').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // Create WhatsApp message
        const whatsappMessage = `*Novo contato via site Source Design*\n\n` +
            `*Nome:* ${nome}\n` +
            `*Empresa:* ${empresa || 'Não informado'}\n` +
            `*Telefone:* ${telefone}\n` +
            `*E-mail:* ${email}\n\n` +
            `*Mensagem:*\n${mensagem}`;

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/5527996019833?text=${encodeURIComponent(whatsappMessage)}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Show success message
        this.showFormMessage('success', 'WhatsApp aberto! Converse conosco sobre seu projeto.');

        // Reset form
        this.form.reset();
        this.clearAllValidation();
        grecaptcha.reset();

        // Reset button state
        whatsappBtn.disabled = false;
        whatsappBtn.innerHTML = '<span>Enviar via WhatsApp</span><i class="material-icons">phone</i>';
    }

    clearAllValidation() {
        // Remove all validation classes and error messages
        Object.keys(this.fields).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                field.classList.remove('valid', 'invalid');
            }
            this.removeFieldError(fieldName);
        });
    }

    showFormMessage(type, message) {
        this.formMessage.className = `form-message ${type}`;
        this.formMessage.innerHTML = message;
        this.formMessage.style.display = 'block';

        // Hide message after 5 seconds for non-success messages
        if (type !== 'success') {
            setTimeout(() => {
                this.formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// Initialize real-time form validation
const formValidator = new RealTimeFormValidator('contactForm', 'formMessage');

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
    // Accessibility improvements for keyboard navigation
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
