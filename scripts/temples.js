document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent =
        'Last Modified: ' + document.lastModified;

    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', function () {
        nav.classList.toggle('show');
        if (nav.classList.contains('show')) {
            hamburger.innerHTML = '✕';
        } else {
            hamburger.innerHTML = '☰';
        }
    });

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth < 768) {
                nav.classList.remove('show');
                hamburger.innerHTML = '☰';
            }
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            nav.classList.remove('show');
            hamburger.innerHTML = '☰';
        }
    });
});