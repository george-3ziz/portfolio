document.addEventListener('DOMContentLoaded', function () {

    // --- Theme (Dark/Light Mode) Toggler ---
    const themeToggleBtn = document.getElementById('theme-toggle');

    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Function to apply the theme
    const applyTheme = (isDark) => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            themeToggleLightIcon.classList.remove('hidden');
            themeToggleDarkIcon.classList.add('hidden');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            themeToggleLightIcon.classList.add('hidden');
            themeToggleDarkIcon.classList.remove('hidden');
            localStorage.setItem('color-theme', 'light');
        }
    };

    // Check initial theme
    const isDarkMode = localStorage.getItem('color-theme') === 'dark' || 
                      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    applyTheme(isDarkMode);

    // Add click event listener
    themeToggleBtn.addEventListener('click', function() {
        const isCurrentlyDark = document.documentElement.classList.contains('dark');
        applyTheme(!isCurrentlyDark);
    });

    // --- Scroll Animations (Intersection Observer) ---
    const scrollTargets = document.querySelectorAll('.scroll-target');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after it becomes visible
            }
        });
    }, { threshold: 0.15 });

    scrollTargets.forEach(target => {
        observer.observe(target);
    });
});
    