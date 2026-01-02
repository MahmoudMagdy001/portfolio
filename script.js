AOS.init({
    once: true,
    offset: 100,
    duration: 800,
});

VanillaTilt.init(document.querySelectorAll(".project-card, .skill-item"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTotal = document.documentElement.scrollTop;
    const heightWin = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = (scrollTotal / heightWin) * 100;
    document.querySelector('.scroll-progress').style.width = scrollValue + "%";
});

// Navigate to Project Details Page
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card, index) => {
    card.style.cursor = "pointer"; // Indicate clickable
    card.addEventListener('click', (e) => {
        // Prevent navigation if clicking on direct links inside the card
        if(e.target.closest('.links')) return;
        
        // Navigate to details page with project index
        window.location.href = `project-details.html?id=${index}`;
    });
});
