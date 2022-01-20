const apiKey = '6ff3567a';
let movieEl = document.querySelector(".movie__info");
let movieArr;
let search = document.getElementById("search-bar");

function onClick(event) {
    if (event.keyCode == 13) {
        document.getElementById('input').click()
    }

    
}

function searchChange(event) {
    
    const value = search.value;

    console.log(value)
}

async function main() {
    const title = JSON.parse(window.localStorage.getItem("movie"));
    const movies = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
    const moviesData = await movies.json();

    movieArr = Object.entries(moviesData);
    console.log(movieArr)



    movieEl.innerHTML = movieArr.slice(0, 1).map(movie => `<div class="movie__info">
    <h1 class="title">${movieArr[0][1]}</h1>
    <div class="movie__page">
        <img src="${movieArr[13][1]}" alt="">
        <p class="info"><b>Genre: ${movieArr[5][1]}</b></p>
        <p class="info"><b>Released: ${movieArr[3][1]}</b></p>
        <p class="info"><b>Rated: ${movieArr[2][1]}</b></p>
        <p class="info"><b>Runtime: ${movieArr[4][1]}</b></p>

        <p class="stakeholders"><b>Director: ${movieArr[6][1]}</b></p>
        <p class="stakeholders"><b>Writer: ${movieArr[7][1]}</b></p>
        <p class="stakeholders"><b>Actors: ${movieArr[8][1]}</b></p>
        <p class="stakeholders"><b>Box Office: ${movieArr[21][1]}</b></p>

        <p class="lang"><b>Language: ${movieArr[10][1]}</b></p>
        <p class="lang"><b>Country: ${movieArr[11][1]}</b></p>
        <p class="lang"><b>Type: ${movieArr[19][1]}</b></p>

        <p class="plot__para">${movieArr[9][1]}</p>

        <h4>Ratings:</h4>
        <ul>
            <li>Source: ${movieArr[14][1][0]} / Score: </li>
            <li>Source: ${movieArr[14][1][1]} / Score: </li>
            <li>Source: ${movieArr[14][1][2]} / Score: </li>
        </ul>

        <h4>imdbID: ${movieArr[18][1]}</h4>
        <h4>imdbRating: ${movieArr[16][1]}</h4>
        <h4>imdbVotes: ${movieArr[17][1]}</h4>

    </div>
  </div>`).join("")
}
main()