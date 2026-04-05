import './style.css';

// Initialize Lucide Icons
const initLucide = () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
};

document.addEventListener('DOMContentLoaded', initLucide);
initLucide(); // Fallback in case DOMContentLoaded already fired

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

// --- Mobile Navigation Toggle ---
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinksWrapper = document.querySelector('.nav-links-wrapper');
const menuIcon = document.getElementById('menu-icon');

const updateMenuIcon = (isOpen) => {
    if (!menuIcon) return;
    if (isOpen) {
        menuIcon.setAttribute('data-lucide', 'x');
    } else {
        menuIcon.setAttribute('data-lucide', 'menu');
    }
    if (window.lucide) {
        window.lucide.createIcons();
    }
};

if (mobileNavToggle && navLinksWrapper) {
    mobileNavToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinksWrapper.classList.toggle('active');
        const isOpen = navLinksWrapper.classList.contains('active');
        updateMenuIcon(isOpen);
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksWrapper.classList.remove('active');
            updateMenuIcon(false);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinksWrapper.contains(e.target) && !mobileNavToggle.contains(e.target)) {
            if (navLinksWrapper.classList.contains('active')) {
                navLinksWrapper.classList.remove('active');
                updateMenuIcon(false);
            }
        }
    });
}

// --- Navbar Blur Effect on Scroll ---
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        nav.style.background = 'rgba(255, 255, 255, 0.9)';
        nav.style.height = '4.5rem';
        nav.style.boxShadow = 'var(--shadow-sm)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
        nav.style.height = '5rem';
        nav.style.boxShadow = 'none';
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
