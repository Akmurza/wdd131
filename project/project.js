
// Games Data Array
const games = [
    {
        name: "Catan",
        description: "Trade, build, and settle the island of Catan in this classic strategy game.",
        age: "10+",
        players: "3-4",
        duration: "60-90 min",
        difficulty: "Medium",
        rating: 4.5,
        category: "Strategy"
    },
    {
        name: "Ticket to Ride",
        description: "Cross-country train adventure. Collect cards to claim railway routes.",
        age: "8+",
        players: "2-5",
        duration: "30-60 min",
        difficulty: "Easy",
        rating: 4.3,
        category: "Family"
    },
    {
        name: "Azul",
        description: "Beautiful tile-laying game inspired by Portuguese tiles.",
        age: "8+",
        players: "2-4",
        duration: "30-45 min",
        difficulty: "Medium",
        rating: 4.7,
        category: "Abstract"
    },
    {
        name: "Splendor",
        description: "Renaissance merchants compete to build the most lucrative gem trade.",
        age: "10+",
        players: "2-4",
        duration: "30 min",
        difficulty: "Medium",
        rating: 4.4,
        category: "Strategy"
    },
    {
        name: "King of Tokyo",
        description: "Mutant monsters battle for dominance in Tokyo.",
        age: "8+",
        players: "2-6",
        duration: "45 min",
        difficulty: "Easy",
        rating: 4.2,
        category: "Dice"
    },
    {
        name: "Pandemic",
        description: "Cooperative game where players work together to save the world.",
        age: "10+",
        players: "2-4",
        duration: "45 min",
        difficulty: "Medium",
        rating: 4.6,
        category: "Cooperative"
    },
    {
        name: "Dixit",
        description: "Imaginative storytelling game with beautiful artwork.",
        age: "8+",
        players: "3-6",
        duration: "30 min",
        difficulty: "Easy",
        rating: 4.1,
        category: "Party"
    },
    {
        name: "7 Wonders",
        description: "Build one of the seven wonders of the ancient world.",
        age: "10+",
        players: "3-7",
        duration: "30 min",
        difficulty: "Medium",
        rating: 4.3,
        category: "Drafting"
    }
];

// Events Data Array
const events = [
    {
        title: "Family Game Night",
        date: "2025-08-15",
        time: "18:00",
        description: "Join us for a fun evening of family-friendly games. All ages welcome!",
        price: "Free"
    },
    {
        title: "Catan Tournament",
        date: "2025-08-22",
        time: "15:00",
        description: "Compete in our monthly Catan tournament. Prizes for winners!",
        price: "15 GEL"
    },
    {
        title: "New Player Workshop",
        date: "2025-08-18",
        time: "17:00",
        description: "Learn the basics of modern board gaming. Perfect for beginners!",
        price: "10 GEL"
    }
];

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const gamesGrid = document.getElementById('games-grid');
const eventsGrid = document.getElementById('events-grid');
const ageFilter = document.getElementById('age-filter');
const playersFilter = document.getElementById('players-filter');
const randomGameBtn = document.getElementById('random-game');
const bookingForm = document.getElementById('booking-form');
const heroCTA = document.getElementById('hero-cta');

// Initialize localStorage for favorites
let favorites = JSON.parse(localStorage.getItem('skyboard-favorites')) || [];

// Utility Functions
function getStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return '★'.repeat(fullStars) + (halfStar ? '☆' : '') + '☆'.repeat(emptyStars);
}


function formatDate(dateString) {
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Game Functions
function renderGames(gamesToRender = games) {
    if (!gamesGrid) return;

    gamesGrid.innerHTML = '';

    gamesToRender.forEach((game, index) => {
        const isFavorite = favorites.includes(game.name);
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';

        gameCard.innerHTML =
            `<h3>${game.name}</h3>
            <p>${game.description}</p>
            <div class="game-info">
                <span>👥 ${game.players}</span>
                <span>🎂 ${game.age}</span>
                <span>⏱️ ${game.duration}</span>
                <span>📊 ${game.difficulty}</span>
            </div>
            <div class="game-rating">
                <span class="stars">${getStars(game.rating)}</span>
                <span>(${game.rating}/5)</span>
            </div>
            <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                    data-game="${game.name}">
                ${isFavorite ? '❤️ Favorite' : '🤍 Add to Favorites'}
            </button>`
            ;

        gamesGrid.appendChild(gameCard);
    });

    // Add event listeners to favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', toggleFavorite);
    });
}

function filterGames() {
    const ageValue = ageFilter?.value || '';
    const playersValue = playersFilter?.value || '';

    let filteredGames = games.filter(game => {
        let ageMatch = true;
        let playersMatch = true;

        if (ageValue) {
            const gameAge = parseInt(game.age);
            const filterAge = parseInt(ageValue);
            ageMatch = gameAge >= filterAge;
        }

        if (playersValue) {
            if (playersValue === '2') {
                playersMatch = game.players.includes('2');
            } else if (playersValue === '3-4') {
                playersMatch = game.players.includes('3') || game.players.includes('4');
            } else if (playersValue === '5+') {
                playersMatch = game.players.includes('5') || game.players.includes('6') || game.players.includes('7');
            }
        }

        return ageMatch && playersMatch;
    });

    renderGames(filteredGames);
}

function getRandomGame() {
    const randomIndex = Math.floor(Math.random() * games.length);
    const randomGame = games[randomIndex];

    alert(`🎲 Random Game Suggestion: ${randomGame.name}\n\n${randomGame.description}\n\nPlayers: ${randomGame.players}\nAge: ${randomGame.age}\nDuration: ${randomGame.duration}`);
}

function toggleFavorite(event) {
    const gameName = event.target.dataset.game;
    const button = event.target;

    if (favorites.includes(gameName)) {
        favorites = favorites.filter(name => name !== gameName);
        button.textContent = '🤍 Add to Favorites';
        button.classList.remove('active');
    } else {
        favorites.push(gameName);
        button.textContent = '❤️ Favorite';
        button.classList.add('active');
    }

    localStorage.setItem('skyboard-favorites', JSON.stringify(favorites));
}

// Event Functions
function renderEvents() {
    if (!eventsGrid) return;

    eventsGrid.innerHTML = '';

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';

        eventCard.innerHTML =
            `<div class="event-date">${formatDate(event.date)}</div>
            <h3>${event.title}</h3>
            <p><strong>Time:</strong> ${event.time}</p>
            <p>${event.description}</p>
            <p><strong>Price:</strong> ${event.price}</p>
            ;`

        eventsGrid.appendChild(eventCard);
    });
}


// Navigation Functions
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Form Functions
function handleBookingSubmission(event) {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const bookingData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        date: formData.get('date'),
        time: formData.get('time'),
        players: formData.get('players'),
        message: formData.get('message')
    };

    // Conditional branching for form validation
    if (!bookingData.name || !bookingData.email || !bookingData.date || !bookingData.time || !bookingData.players) {
        alert('Please fill in all required fields!');
        return;
    }

    // Save booking to localStorage
    let bookings = JSON.parse(localStorage.getItem('skyboard-bookings')) || [];
    bookingData.id = Date.now(); // Simple ID generation
    bookings.push(bookingData);
    localStorage.setItem('skyboard-bookings', JSON.stringify(bookings));

    // Success message using template literal
    const successMessage = `Thank you ${bookingData.name}!Your table booking for ${bookingData.date} at ${bookingData.time} has been submitted.We'll contact you at ${bookingData.email} to confirm.`;

    alert(successMessage);
    bookingForm.reset();
}

// Smooth Scrolling Function
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId.replace('#', ''));
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Hero CTA Function
function handleHeroCTA() {
    smoothScrollTo('games');
}

// Date Validation Function
function setMinDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        dateInput.min = formattedDate;
    }
}

// Search and Display Functions
function displaySearchResults(query) {
    if (!query) {
        renderGames();
        return;
    }

    const searchResults = games.filter(game =>
        game.name.toLowerCase().includes(query.toLowerCase()) ||
        game.description.toLowerCase().includes(query.toLowerCase()) ||
        game.category.toLowerCase().includes(query.toLowerCase())
    );

    renderGames(searchResults);
}

// Game Statistics Object
const gameStats = {
    totalGames: games.length,
    categories: [...new Set(games.map(game => game.category))],
    averageRating: games.reduce((sum, game) => sum + game.rating, 0) / games.length,

    getGamesByCategory(category) {
        return games.filter(game => game.category === category);
    },

    getTopRatedGames(limit = 3) {
        return games
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // Initialize components
    renderGames();
    renderEvents();
    setMinDate();

    // Navigation
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            closeMobileMenu();

            // Handle smooth scrolling for anchor links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(this.getAttribute('href'));


            }
        });
    });

    // Game filters
    if (ageFilter) {
        ageFilter.addEventListener('change', filterGames);
    }

    if (playersFilter) {
        playersFilter.addEventListener('change', filterGames);
    }

    // Random game button
    if (randomGameBtn) {
        randomGameBtn.addEventListener('click', getRandomGame);
    }

    // Booking form
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmission);
    }

    // Hero CTA
    if (heroCTA) {
        heroCTA.addEventListener('click', handleHeroCTA);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navMenu?.contains(event.target);
        const isClickOnHamburger = hamburger?.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu?.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Console log for testing purposes
    console.log(`SkyBoard loaded with ${gameStats.totalGames} games!`);
    console.log('Top rated games:', gameStats.getTopRatedGames());
});

// Intersection Observer for animations (bonus feature)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe game cards and event cards when they're created
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(() => {
            document.querySelectorAll('.game-card, .event-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        }, 100);
    });
}