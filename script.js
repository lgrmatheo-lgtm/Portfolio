// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// -------------------------------
// Header scroll & blur dynamique constant
// -------------------------------
let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // 1️⃣ Cacher / montrer header
    if (currentScroll > lastScroll && currentScroll > window.innerHeight * 0.6) {
        header.classList.add("header-hidden");
    } else {
        header.classList.remove("header-hidden");
    }
    lastScroll = currentScroll;

    // 2️⃣ Blur dynamique à 50% sur les sections
    const hero = document.querySelector("#hero");
    const heroBottom = hero.getBoundingClientRect().bottom;

    if (heroBottom <= header.offsetHeight) {
        // On est en dehors du hero → blur constant 50%
        header.style.backdropFilter = "blur(15px) saturate(150%) brightness(110%)";
        header.style.webkitBackdropFilter = "blur(15px) saturate(150%) brightness(110%)";
    } else {
        // On est sur le hero → pas de blur
        header.style.backdropFilter = "blur(0px)";
        header.style.webkitBackdropFilter = "blur(0px)";
    }
});


