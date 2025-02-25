const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    toggle.addEventListener('click', () => {
        nav.classList.toggle('show-menu')

        toggle.classList.toggle('show-icon')
    })
}
showMenu('nav-toggle', 'nav-menu');

document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    });
});

class AnimationObserver {
    constructor(options = {}) {
        this.options = {
            threshold: 0.2,
            ...options
        };

        this.handleIntersection = this.handleIntersection.bind(this); // Enlazar el método
        this.observer = new IntersectionObserver(this.handleIntersection, this.options);
        this.elements = new Map();
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = parseInt(element.dataset.delay) || 0; // Convertir a número

                setTimeout(() => {
                    element.classList.add('activado');
                }, delay);

                this.observer.unobserve(element);
            }
        });
    }

    observe(element) {
        this.observer.observe(element);
    }

    observeAll(elements) {
        elements.forEach(element => this.observe(element));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const animationObserver = new AnimationObserver();
    const animatedElements = document.querySelectorAll('.animate');
    animationObserver.observeAll(animatedElements);
});

function addAnimation(element, animation = 'fade-up', delay = 0) {
    element.classList.add('animate');
    element.dataset.animation = animation;
    element.dataset.delay = delay;

    const observer = new AnimationObserver();
    observer.observe(element);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Mostrar Cards
const observerCards = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('shows');
            observer.unobserve(entry.target);
        }
    });
});

const hiddenCards = document.querySelectorAll('.cards');
hiddenCards.forEach((el) => observerCards.observe(el));

const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

emailjs.init('Esfk6SMNHFs8Za8x1');
const form = document.getElementById('form');
const button = document.getElementById('button');
const errorElement = document.getElementById('error');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    const name = nameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;

    let hasError = false; // Flag to check if there are errors

    // Reset errors
    errorElement.textContent = '';
    nameInput.classList.remove('input-error');
    phoneInput.classList.remove('input-error');
    emailInput.classList.remove('input-error');

    // Validate phone
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        errorElement.textContent = 'Número de teléfono inválido. Debe tener 10 dígitos, sin signos.';
        phoneInput.classList.add('input-error');
        hasError = true;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorElement.textContent = 'Email inválido.';
        emailInput.classList.add('input-error');
        hasError = true;
    }

    // Validate name
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nameRegex.test(name)) {
        errorElement.textContent = 'El campo Nombre y Apellido solo debe contener letras y espacios.';
        nameInput.classList.add('input-error');
        hasError = true;
    }

    if (hasError) {
        return; // Stop form submission if there are errors
    }

    button.textContent = 'Enviando...';

    const serviceID = 'service_hte5p68';
    const templateID = 'template_r8ny00y';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            button.textContent = 'Enviar';
            Toastify({
                text: "Enviado Correctamente",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#28a745",
                className: "custom-toast",
                style: {
                    color: "white",
                    borderRadius: "8px",
                    fontSize: "15px"
                }
            }).showToast();
            form.reset();
        })
        .catch((err) => {
            button.textContent = 'Enviar';
            alert('Hubo un error al enviar tu mensaje: ' + JSON.stringify(err));
        });
});


function openModal(modalId) {
    document.getElementById(modalId).classList.add('open');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('open');
}

const lemas = document.querySelectorAll(".lema");
let currentIndex = 0;

setInterval(() => {
    // Oculta el lema actual
    lemas[currentIndex].classList.remove("active");

    // Mueve al siguiente lema
    currentIndex = (currentIndex + 1) % lemas.length;

    lemas[currentIndex].classList.add("active");
}, 4000);
