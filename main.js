// Mostrar otros elementos
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle('show', entry.isIntersecting);
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Mostrar Cards
const observerCards = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle('shows', entry.isIntersecting);
    });
});

const hiddenCards = document.querySelectorAll('.cards');
hiddenCards.forEach((el) => observerCards.observe(el));
