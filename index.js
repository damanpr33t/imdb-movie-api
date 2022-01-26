// api key = 6ff3567a
// API 1 = http://www.omdbapi.com/?i=tt3896198&apikey=6ff3567a
// API 2 = http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}

import { apiKey } from './apiKey'

// const apiKey = '6ff3567a';
const input = document.querySelector(".input-wrap");
let search = document.getElementById("search-bar");
let movieList = document.querySelector(".movie-list");
let topic = input.value;
let movieData;
let movieArr;

function onClick(event) {
    if (event.keyCode == 13) {
        document.getElementById('input').click()
    }
    
}

async function main(searchTerm) {
    // const URL = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;
    // const res = await fetch(`${URL}`);
    // const data = await res.json();
    // console.log(data);
    
    const postsPromise = fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`);
    
    console.log(postsPromise)
    
    postsPromise
    .then(data => data.json())
    .then((data) => {
        console.log(data.Search)
        let output = `<div class="movie-list hide-movie-list">
        <div class="movie">
          <div class="movie-card">
            <div class="movie-card__container">
                <img src="${data.Search.Poster}" alt="">
                <h3>${data.Search.Title}</h3>
                <p><b>Year:</b> ${data.Search.Year}</p>
                <p><b>Type:</b> ${data.Search.Type}</p>
                <p><b>imdbID:</b> ${data.Search.imdbID}</p>                        
            </div>
          </div>
        </div>
      </div>`
      document.getElementsByClassName('.movie').innerHTML = output;
    })
    .catch((err) => {
        console.log(err);
    })


}
main();


