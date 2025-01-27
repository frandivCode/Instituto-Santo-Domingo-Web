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

const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

const hiddenCards = document.querySelectorAll('.cards');
hiddenCards.forEach((el) => observerCards.observe(el));

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

