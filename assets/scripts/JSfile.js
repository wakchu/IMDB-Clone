const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGRlMGRmMzk0OGRlZjU0ZTJkYTEyNWIxYWEyMmFlMyIsIm5iZiI6MTc0NjA0NjE0Mi44NjgsInN1YiI6IjY4MTI4Y2JlZGVkODMwMjlhYzA1NTI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2G1UWdAZI6tdk175QHtdyeGr3iaWAgOoL4mNeBc6JY'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=`;
const FilmInPrimoPiano = document.getElementById('list');
let index = 1;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGRlMGRmMzk0OGRlZjU0ZTJkYTEyNWIxYWEyMmFlMyIsIm5iZiI6MTc0NjA0NjE0Mi44NjgsInN1YiI6IjY4MTI4Y2JlZGVkODMwMjlhYzA1NTI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2G1UWdAZI6tdk175QHtdyeGr3iaWAgOoL4mNeBc6JY'
        }
      };
      
      fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));

        async function getDataCard() {
          try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`);
            const data = await response.json();
            
            const movies = data.results.slice(0, 10);
            
            const wrapper = document.createElement('div');
            wrapper.classList.add('card-wrapper');
            
            movies.forEach(movie => createCard(movie, wrapper));
            movies.forEach(movie => createCard(movie, wrapper));
            
            const list = document.getElementById('list');
            list.innerHTML = '';
            list.appendChild(wrapper);
            
          } catch (error) {
            console.error('Errore nel recupero dei film:', error);
          }
        }
        
        function createCard(movie, wrapper) {
          const posterUrl = IMG_URL + movie.poster_path;
          
          const card = document.createElement('figure');
          card.classList.add('card-item');
          
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
        
        getDataCard();
// searchButton.addEventListener('click', searchMovies);
// searchInput.addEventListener('keypress', function(e) {
//     if (e.key === 'Enter') {
//         searchMovies();
//         }
//     }
// );