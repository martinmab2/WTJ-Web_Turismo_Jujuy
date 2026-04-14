// ============================================
// CONTADOR ANIMADO
// ============================================

function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200; // milliseconds per increment

    const isCounterInView = () => {
        const counterSection = document.querySelector('.counter-section');
        const rect = counterSection.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    };

    if (isCounterInView()) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / speed;
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = target;
                }
            };

            if (!counter.classList.contains('animated')) {
                counter.classList.add('animated');
                updateCounter();
            }
        });
    }
}

// Ejecutar cuando el documento está listo
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Initial check
});

// ============================================
// CARRUSEL DE TESTIMONIOS
// ============================================

class TestimonialCarousel {
    constructor() {
        this.carousel = document.querySelector('.carousel');
        this.items = document.querySelectorAll('.carousel-item');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.dotsContainer = document.getElementById('carousel-dots');
        this.currentIndex = 0;
        this.itemCount = this.items.length;

        this.init();
    }

    init() {
        // Crear puntos (dots)
        this.createDots();

        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Auto-scroll cada 5 segundos
        this.autoScroll = setInterval(() => this.next(), 5000);

        // Detener auto-scroll al interactuar
        this.carousel.addEventListener('mouseenter', () => clearInterval(this.autoScroll));
        this.carousel.addEventListener('mouseleave', () => {
            this.autoScroll = setInterval(() => this.next(), 5000);
        });
    }

    createDots() {
        for (let i = 0; i < this.itemCount; i++) {
            const dot = document.createElement('div');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    updateCarousel() {
        const offset = -this.currentIndex * 100;
        this.carousel.style.transform = `translateX(${offset}%)`;
        this.updateDots();
    }

    updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.itemCount;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.itemCount) % this.itemCount;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
}

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialCarousel();
});

// ============================================
// FORMULARIO NEWSLETTER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            // Validar email
            if (validateEmail(email)) {
                // Mostrar mensaje de éxito
                alert('¡Gracias por suscribirse! Pronto recibirás nuestras ofertas exclusivas.');
                emailInput.value = '';
            } else {
                alert('Por favor, ingresa un email válido.');
            }
        });
    }
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ============================================
// SCROLL ANIMATIONS PARA CARDS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// ============================================
// SMOOTH SCROLL PARA LINKS DE NAVEGACIÓN
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
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

// ============================================
// BOTÓN CTA - SCROLL A DESTINOS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const destinosSection = document.getElementById('destinos');
            if (destinosSection) {
                destinosSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
