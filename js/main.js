// ============================================
// WTJ - JAVASCRIPT CONSOLIDADO Y OPTIMIZADO
// Web Turismo Jujuy - Sin duplicaciones
// ============================================

// ============================================
// 1. CONTADOR ANIMADO
// ============================================

function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200; // milliseconds per increment

    const isCounterInView = () => {
        const counterSection = document.querySelector('.counter-section');
        if (!counterSection) return false;
        const rect = counterSection.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    };

    if (isCounterInView()) {
        counters.forEach(counter => {
            if (counter.classList.contains('animated')) return;

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

            counter.classList.add('animated');
            updateCounter();
        });
    }
}

// Ejecutar cuando el documento está listo
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Initial check
});

// ============================================
// 2. CARRUSEL DE TESTIMONIOS
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

        if (this.carousel && this.items.length > 0) {
            this.init();
        }
    }

    init() {
        // Crear puntos (dots)
        this.createDots();

        // Event listeners
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

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
// 3. FORMULARIO DE CONTACTO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const spinner = document.getElementById('form-spinner');
    const modal = document.getElementById('modal-confirm');
    const closeModal = document.getElementById('close-modal');

    // Validar y enviar formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación básica
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        // Mostrar spinner
        if (spinner) spinner.style.display = 'flex';
        form.querySelector('button[type="submit"]').disabled = true;
        
        // Simular envío (1.8 segundos)
        setTimeout(() => {
            if (spinner) spinner.style.display = 'none';
            if (modal) modal.style.display = 'flex';
            form.reset();
            form.querySelector('button[type="submit"]').disabled = false;
        }, 1800);
    });
    
    // Cerrar modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (modal) modal.style.display = 'none';
        });
    }
    
    // Cerrar modal al hacer clic fuera
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});

// ============================================
// 4. NEWSLETTER FORM
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
// 5. ANIMACIONES DE SCROLL PARA CARDS
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
// 6. SMOOTH SCROLL PARA LINKS
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
// 7. BOTÓN CTA - SCROLL A DESTINOS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Solo si es el botón del hero
            if (this.classList.contains('animate-title') || 
                (this.parentElement && this.parentElement.classList.contains('hero-content'))) {
                e.preventDefault();
                const destinosSection = document.getElementById('destinos');
                if (destinosSection) {
                    destinosSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// ============================================
// 8. INICIALIZAR RATINGS - AGENCIAS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const ratings = document.querySelectorAll('.rating');

    ratings.forEach(function(rating, index) {
        // Valores iniciales para cada agencia (1-5 estrellas)
        const initialRatings = [5, 4, 5, 4, 5, 4];
        const initialRating = initialRatings[index] || 4;

        // Marcar la estrella correspondiente
        const inputs = rating.querySelectorAll('input');
        if (inputs[5 - initialRating]) {
            inputs[5 - initialRating].checked = true;
        }
    });
});

// ============================================
// 9. NAVEGACIÓN A DESTINOS - PARÁMETRO URL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el parámetro 'destino' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const destino = urlParams.get('destino');
    
    if (destino) {
        // Buscar el elemento con el ID correspondiente
        const elemento = document.getElementById('destino-' + destino);
        
        if (elemento) {
            // Esperar a que la página se cargue completamente
            setTimeout(function() {
                elemento.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});

// ============================================
// 10. FILTROS DE GALERÍA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const filterRadios = document.querySelectorAll('input[name="destinos"]');
    
    filterRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Los filtros se manejan con CSS :checked combinator
            // Solo necesitamos reflow si es necesario
            console.log('Filtro aplicado:', this.id);
        });
    });
});

// ============================================
// FINAL - Exports para módulos
// ============================================

try {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            animateCounters,
            TestimonialCarousel,
            validateEmail
        };
    }
} catch (e) {
    // Silenciosamente ignorar si no está en entorno de módulo
}
