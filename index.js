// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navEl = document.querySelector('.navbar nav');

if (navToggle && navEl) {
    navEl.classList.add('collapsed');
    navToggle.addEventListener('click', () => {
        navEl.classList.toggle('collapsed');
    });
}

// Count-up animation for the stats strip, triggered once when it scrolls into view
const statsStrip = document.getElementById('statsStrip');

function animateCount(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = value.toLocaleString() + suffix;
        if (progress < 1) {
            requestAnimationFrame(tick);
        }
    }
    requestAnimationFrame(tick);
}

if (statsStrip && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                statsStrip.querySelectorAll('.stat-number').forEach(animateCount);
                observer.disconnect();
            }
        });
    }, { threshold: 0.4 });

    observer.observe(statsStrip);
} else if (statsStrip) {
    // Fallback for browsers without IntersectionObserver support
    statsStrip.querySelectorAll('.stat-number').forEach(animateCount);
}