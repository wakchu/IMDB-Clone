
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=`;

function getMovieIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
const movie_id = getMovieIdFromUrl();

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGRlMGRmMzk0OGRlZjU0ZTJkYTEyNWIxYWEyMmFlMyIsIm5iZiI6MTc0NjA0NjE0Mi44NjgsInN1YiI6IjY4MTI4Y2JlZGVkODMwMjlhYzA1NTI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2G1UWdAZI6tdk175QHtdyeGr3iaWAgOoL4mNeBc6JY'
    }
  };

let data;
async function getData() {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}`, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      data = await response.json();
      
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
      const isFavorite = favorites.some(f => f.id === data.id);
      const isInWatchlist = watchlist.some(w => w.id === data.id);

      const filmOverview = document.getElementById('filmOverview');
      filmOverview.innerHTML = `
        <div class="sx">
        <h1 class="sx">${data.title}</h1>
        <img src="${IMG_URL + data.poster_path}" alt="${data.title}" style="width: 20vw; border-radius: 10px;">
        </div>
        <div class="dx">
        <p>${data.overview}</p>
        <p>Data di uscita: ${data.release_date}</p>
        <p>Voto: ${data.vote_average}</p>
        <p>Lingua: ${data.original_language}</p>
        <p>Durata: ${data.runtime} minuti</p>
        <p>Genere: ${data.genres.map(genre => genre.name).join(', ')}</p>
        </div>`

      const bottoni = document.getElementById('bottoni');
      bottoni.innerHTML = `            
      <div class="card-actions">
          <button class="btn-favorite ${isFavorite ? 'active' : ''}" data-id="${data.id}">
            <img src="assets/images/icona1.png" alt="Preferiti" class="icon" />
          </button>
          <button class="btn-watchlist ${isInWatchlist ? 'active' : ''}" data-id="${data.id}">
            <img src="assets/images/icona2.png" alt="Watchlist" class="icon" />
          </button>
        </div>`

      initializeButtons();
    } catch (error) {
      console.error('Errore nel recupero dei film:', error);
    }
}

getData();

const searchInput =  document.getElementById("search-input");
searchInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
      e.preventDefault();
          const query = searchInput.value;
          window.location.href = `risultati.html?query=${query}`;
        }
});

const initializeButtons = () => {
  const btnFavorite = document.querySelector('.btn-favorite');
  const btnWatchlist = document.querySelector('.btn-watchlist');

  btnFavorite.addEventListener('click', (e) => {
    e.preventDefault();
    toggleFavorite(data);
    btnFavorite.classList.toggle('active');
    console.log('Preferiti:', favorites);
  });
            
  btnWatchlist.addEventListener('click', (e) => {
    e.preventDefault();
    toggleWatchlist(data);
    btnWatchlist.classList.toggle('active');
  });
}
                
function toggleFavorite(data) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const index = favorites.findIndex(f => f.id === data.id);
  
  if (index === -1) {
    favorites.push(data);
    showNotification('Aggiunto ai preferiti');
  } else {
    favorites.splice(index, 1);
    showNotification('Rimosso dai preferiti');
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function toggleWatchlist(data) {
  const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
  const index = watchlist.findIndex(w => w.id === data.id);
  
  if (index === -1) {
    watchlist.push(data);
    showNotification('Aggiunto alla watchlist');
  } else {
    watchlist.splice(index, 1);
    showNotification('Rimosso dalla watchlist');
  }
  
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }, 100);
}