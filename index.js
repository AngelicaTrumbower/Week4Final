const apiKey = 'https://www.omdbapi.com/?i=tt3896198&apikey=72e6749a&s=';
const searchForm = document.getElementById("input__form");


document.getElementById('input__form').addEventListener('submit', function (event) {
    event.preventDefault(); 
    
    document.querySelector('.search__container').style.visibility = 'hidden';
    document.querySelector('.movie__container').style.visibility = 'visible';
    
    fetchMovies();
});

async function fetchMovies(event) {
    const searchInput = document.getElementById("search__input").value;
    const apiEnd = `https://www.omdbapi.com/?i=tt3896198&apikey=72e6749a&s=${encodeURIComponent(searchInput)}`;

    const movies = await fetch(apiEnd);
    const movieData = await movies.json();

    const moviesArray = movieData.Search;
    for(let i = 0; i < 9; i++) {
        if (moviesArray[i]) {
            const movieContainer = document.getElementById(`movie${i + 1}`);
            if (movieContainer) {
                movieContainer.innerHTML = displayMovies(moviesArray[i]);
            } else {
                console.error(`Element with id 'movie${i + 1}' not found or no data available.`)
            }
        };
    };
    const movieContainer = document.querySelector('.movie__container');
}

function displayMovies(movie) {
    return `<img src="${movie.Poster}">
            <p>Title: ${movie.Title}</p>
            <p>Year: ${movie.Year}</p>`
}