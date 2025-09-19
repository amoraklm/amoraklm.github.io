document.addEventListener('DOMContentLoaded', () => {
    // Add a class to the body after a short delay for smooth fade-in
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 1s ease-in-out';
    }, 100);

    // Scroll-based animations (Dorf's efficiency)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glassmorphic, .glassmorphic-section, .glassmorphic-card').forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    // Simple smooth scrolling for nav links (Apple's UX)
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
