// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initTheme();
    initTypingAnimation();
    initMobileMenu();
    initContactForm();
});

// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const isDark = localStorage.getItem('theme') === 'dark';
    
    if (isDark) {
        document.body.classList.add('dark-mode');
        updateThemeIcons(true);
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
}

function updateThemeIcons(isDark) {
    const icons = document.querySelectorAll('.theme-toggle i');
    icons.forEach(icon => {
        icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    });
    lucide.createIcons();
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    const text = 'Full Stack Developer';
    let index = 0;
    let isDeleting = false;
    
    function type() {
        if (!isDeleting && index <= text.length) {
            typingElement.textContent = text.slice(0, index);
            index++;
            setTimeout(type, 100);
        } else if (!isDeleting && index > text.length) {
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 2000);
        } else if (isDeleting && index >= 0) {
            typingElement.textContent = text.slice(0, index);
            index--;
            setTimeout(type, 50);
        } else if (isDeleting && index < 0) {
            isDeleting = false;
            index = 0;
            setTimeout(type, 1000);
        }
    }
    
    type();
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuToggle.addEventListener('click', () => {
        const isActive = mobileMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.setAttribute('data-lucide', isActive ? 'x' : 'menu');
        lucide.createIcons();
    });
}

// Smooth Scroll
function smoothScroll(event, target) {
    event.preventDefault();
    const element = document.querySelector(target);
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile menu if open
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            const menuToggle = document.getElementById('menuToggle');
            const icon = menuToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    }
}

function scrollToTop(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !message) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Smooth scroll for all navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            smoothScroll(e, href);
        }
    });
});
