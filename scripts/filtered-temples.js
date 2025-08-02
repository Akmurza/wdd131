console.log('JS file loaded successfully!');
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-5087.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-45825.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/payson-utah-temple/payson-utah-temple-11086.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/yigo-guam-temple/yigo-guam-temple-26495.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/washington-d.c.-temple/washington-d.c.-temple-29514.jpg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/lima-peru-temple/lima-peru-temple-9681.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/mexico-city-mexico-temple/mexico-city-mexico-temple-4058.jpg"
    },
    // Additional temples
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-4947.jpg"
    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 53997,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-26340.jpg"
    },
    {
        templeName: "Provo City Center",
        location: "Provo, Utah, United States",
        dedicated: "2016, March, 20",
        area: 85084,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/provo-city-center-temple/provo-city-center-temple-11068.jpg"
    }
];

// DOM elements
const templeGrid = document.getElementById('temple-grid');
const pageTitle = document.getElementById('page-title');
const navLinks = document.querySelectorAll('nav a');

// Create temple card HTML
function createTempleCard(temple) {
    return `
    <div class="temple-card">
        <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy" />
        <div class="temple-info">
            <h3 class="temple-name">${temple.templeName}</h3>
            <div class="temple-details">
                <p><strong>Location:</strong> ${temple.location}</p>
                <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
            </div>
        </div>
    </div>
    `;
}

// Display temples
function displayTemples(templeList, title = "Sacred Temples:") {
    pageTitle.textContent = title;
    templeGrid.innerHTML = templeList.map(temple => createTempleCard(temple)).join('');
}

// Filter functions
function filterTemples(filter) {
    let filteredTemples = [];
    let title = "Sacred Temples:";


    switch (filter) {
        case 'old':
            filteredTemples = temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                return year < 1900;
            });
            title = "Old Temples (Before 1900):";
            break;
        case 'new':
            filteredTemples = temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                return year > 2000;
            });
            title = "New Temples (After 2000):";
            break;
        case 'large':
            filteredTemples = temples.filter(temple => temple.area > 90000);
            title = "Large Temples (> 90,000 sq ft):";
            break;
        case 'small':
            filteredTemples = temples.filter(temple => temple.area < 10000);
            title = "Small Temples (< 10,000 sq ft):";
            break;
        default:
            filteredTemples = temples;
            title = "Sacred Temples:";
    }

    displayTemples(filteredTemples, title);
}

// Event listeners for navigation
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        this.classList.add('active');

        // Filter temples
        const filter = this.getAttribute('data-filter');
        filterTemples(filter);

        // Close mobile menu if open
        if (window.innerWidth < 768) {
            nav.classList.remove('show');
            hamburger.innerHTML = '☰';
        }
    });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
    // Set current year and last modified date
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent =
        'Last Modified: ' + document.lastModified;

    // Display all temples initially
    displayTemples(temples);

    // Hamburger menu functionality
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

    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            nav.classList.remove('show');
            hamburger.innerHTML = '☰';
        }
    });
});