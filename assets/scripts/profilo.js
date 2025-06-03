const searchInput = document.getElementById("search-input");

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const query = searchInput.value;
        window.location.href = `risultati.html?query=${query}`;
        console.log('Enter key pressed');
    }
});

const searchButton = document.getElementById("search-button");

function searchMovies() {
    const query = searchInput.value;
    window.location.href = `risultati.html?query=${query}`;
    console.log('Search button clicked');
}

searchButton.addEventListener('click', searchMovies);

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function displaySavedMovies() {

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');

    const favoritesContainer = document.getElementById('favorites-container');
    if (favorites.length > 0) {
        favorites.forEach(movie => createCard(movie, favoritesContainer));
    } else {
        favoritesContainer.innerHTML = '<p>Nessun film nei preferiti</p>';
    }

    const watchlistContainer = document.getElementById('watchlist-container');
    if (watchlist.length > 0) {
        watchlist.forEach(movie => createCard(movie, watchlistContainer));
    } else {
        watchlistContainer.innerHTML = '<p>Nessun film nella watchlist</p>';
    }
}

function createCard(movie, wrapper) {
    const posterUrl = movie.poster_path ? IMG_URL + movie.poster_path : '/assets/images/immagine-non-disponibile.jpg';

    const card = document.createElement('figure');
    card.classList.add('card-item-results');
    
    const templateCard = `
        <a href="film.html?id=${movie.id}">
            <img src="${posterUrl}" alt="${movie.title}" style="width: 20vw; border-radius: 10px;">
            <h3 class="titolo-card">${movie.title}</h3>
            <p class="testo-card">${movie.overview}</p>
        </a>
    `;
    
    card.innerHTML = templateCard;
    wrapper.appendChild(card);
}

document.addEventListener('DOMContentLoaded', displaySavedMovies);

window.onload = function() {
    if (window.location.hash === '#watchlist-section') {
        const element = document.getElementById('watchlist-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};