const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function getSearchString() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams);
    return urlParams.get('query');
}
const ricerca = getSearchString();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

fetch(`https://api.themoviedb.org/3/search/movie?query=${ricerca}&include_adult=false&language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));


    async function getData() {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${ricerca}&include_adult=false&language=en-US&page=1`);
          const data = await response.json();
            const movies = data.results.slice(0, 10);
            const wrapper = document.getElementById('results-container');
            wrapper.classList.add('card-wrapper-results');
            movies.forEach(movie => createCard(movie, wrapper));

        } catch (error) {
          console.error('Errore nel recupero dei film:', error);
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

    getData();
    
    const searchInput =  document.getElementById("search-input");
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value;
            window.location.href = `risultati.html?query=${query}`;
        }
    });