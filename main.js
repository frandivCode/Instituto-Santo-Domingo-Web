
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

const hiddenCards = document.querySelectorAll('.cards');
hiddenCards.forEach((el) => observerCards.observe(el));
const btnLeft = document.querySelector(".btn-left"),
    btnRight = document.querySelector(".btn-right"),
    slider = document.querySelector("#slider"),
    sliderSection = document.querySelectorAll(".slider-section"),
    dots = document.querySelectorAll('.dot');

console.log('btnLeft:', btnLeft);
console.log('btnRight:', btnRight);
console.log('slider:', slider);
console.log('sliderSection:', sliderSection);
console.log('dots:', dots);

if (btnLeft && btnRight && slider && sliderSection.length > 0 && dots.length > 0) {
    btnLeft.addEventListener("click", () => moveToLeft());
    btnRight.addEventListener("click", () => moveToRight());

    setInterval(() => {
        moveToRight();
        moveToLeft();
    }, 4500);

    let operacion = 0,
        counter = 0,
        widthImg = 100 / sliderSection.length;

    function moveToRight() {
        if (counter >= sliderSection.length - 1) {
            counter = 0;
            operacion = 0;
            slider.style.transform = `translate(-${operacion}%)`;
            slider.style.transition = "none";
        } else {
            counter++;
            operacion = operacion + widthImg;
            slider.style.transform = `translate(-${operacion}%)`;
            slider.style.transition = "all ease .6s";
        }
        updateIndicators(counter);
    }

    function moveToLeft() {
        if (counter <= 0) {
            counter = sliderSection.length - 1;
            operacion = widthImg * (sliderSection.length - 1);
            slider.style.transform = `translate(-${operacion}%)`;
            slider.style.transition = "none";
        } else {
            counter--;
            operacion = operacion - widthImg;
            slider.style.transform = `translate(-${operacion}%)`;
            slider.style.transition = "all ease .6s";
        }
        updateIndicators(counter);
    }

    function updateIndicators(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    updateIndicators(counter);
}

emailjs.init('Esfk6SMNHFs8Za8x1');
const form = document.getElementById('form');
const button = document.getElementById('button');
const errorElement = document.getElementById('error');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        errorElement.textContent = 'Número de teléfono inválido. Debe tener 10 dígitos, sin signos.';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorElement.textContent = 'Email inválido.';
        return;
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nameRegex.test(name)) {
        errorElement.textContent = 'El campo Nombre y Apellido solo debe contener letras y espacios.';
        return;
    }

    errorElement.textContent = '';

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

/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    toggle.addEventListener('click', () => {
        nav.classList.toggle('show-menu')

        toggle.classList.toggle('show-icon')
    })
}

showMenu('nav-toggle', 'nav-menu');

const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;
