import './style.css';

// Initialize Lucide Icons
lucide.createIcons();

// --- Reveal on Scroll Logic ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Unobserve once revealed to keep performance high
            // revealObserver.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Select all elements with data-reveal attribute
document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
});

// --- Active Nav Link Management ---
const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('.nav-link');

const navObserverOptions = {
    threshold: 0.3
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            if (activeLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                activeLink.classList.add('active');
            }
        }
    });
}, navObserverOptions);

sections.forEach(section => {
    navObserver.observe(section);
});

// --- Navbar Blur Effect on Scroll ---
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

// --- Smooth Scrolling for Navigation ---
document.querySelectorAll('.nav-link, .btn').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
