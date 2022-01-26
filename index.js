const apiKey = 'e3505e35'
// API 2 = http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}
// API 1 = http://www.omdbapi.com/?i=tt3896198&apikey=6ff3567a

const movieSearchBox = document.getElementById('movie__search--box');
const searchList = document.getElementById('search__list');
const resultGrid = document.getElementById('result__grid');

//load movies from api

async function loadMovies(searchTerm) {
  const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=${apiKey}`
  const response = await fetch(`${URL}`)
  const data = await response.json()
  // console.log(data.Search)
  if (data.Response == "True") displayMovieList(data.Search)
}

function findMovies() {
  let searchTerm = (movieSearchBox.value).trim()
  if (searchTerm.length > 0) {
    searchList.classList.remove('hide__search--list')
    loadMovies(searchTerm)
  } else {
    searchList.classList.add('hide__search--list')
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = ''
  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement('div')
    movieListItem.dataset.id = movies[idx].imdbID
    movieListItem.classList.add('search__list--item')
    if (movies[idx].poster != 'N/A') {
      moviePoster = movies[idx].Poster
    } else {
      moviePoster = 'image-not-found.png'
    }
    movieListItem.innerHTML = `
    <div class="search__item--thumbnail">
    <img src="${moviePoster}" alt="">
    </div>
    <div class="search__item--info">
        <h3>${movies[idx].Title}</h3>
        <p>${movies[idx].Year}</p>
    </div>
    `
    searchList.appendChild(movieListItem)
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll('.search__list--item');
  searchListMovies.forEach(movie => {
    movie.addEventListener('click', async () => {
      // console.log(movie.dataset.id)
      searchList.classList.add('hide__search--list')
      movieSearchBox.value = ""
      const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=${apiKey}`)
      const movieDetails = await result.json()
      // console.log(movieDetails)
      displayMovieDetails(movieDetails)
    })
  })
}

function displayMovieDetails(details) {
  resultGrid.innerHTML = `
  <div class="movie__poster">
      <img src="${(details.Poster != "N/A") ? details.Poster : "image-not-found.png"}" alt="movie poster">
  </div>
  <div class="movie__info">
      <h3 class="movie__title">
          ${details.Title}
      </h3>
      <ul class="movie__misc--info">
          <li class="year">Year: ${details.Year}</li>
          <li class="rated">Ratings: ${details.Rated}</li>
          <li class="released">Released: ${details.Released}</li>
      </ul>
      <p class="genre"><b>Genre: </b> ${details.Genre}</p>
      <p class="writer"><b>Writer: </b> ${details.Writer}</p>
      <p class="actors"><b>Actors: </b>${details.Actors}</p>
      <p class="plot">
          <b>Plot: </b>${details.Plot}
        </p>
        <p class="language"><b>Language: </b> ${details.Language}</p>
        <p class="awards"><b><i class="fas fa-award"></i> </b> ${details.Awards}</p>
  </div>
  `
}

window.addEventListener('click', (event) => {
  if(event.target.value.className != "form__control") {
    searchList.classList.add("hide__search--list")
  }
})