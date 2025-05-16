const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGRlMGRmMzk0OGRlZjU0ZTJkYTEyNWIxYWEyMmFlMyIsIm5iZiI6MTc0NjA0NjE0Mi44NjgsInN1YiI6IjY4MTI4Y2JlZGVkODMwMjlhYzA1NTI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2G1UWdAZI6tdk175QHtdyeGr3iaWAgOoL4mNeBc6JY';
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
  
  fetch(`https://api.themoviedb.org/3/movie/${movie_id}`, options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));

    async function getData() {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}`);
          const data = await response.json();

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


        } catch (error) {
          console.error('Errore nel recupero dei film:', error);
        }
    }
    getData();