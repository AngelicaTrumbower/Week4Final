const searchForm = document.getElementById("input__form");
const filter = document.getElementById("filter");


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
    console.log(moviesArray);

    for(let i = 0; i < 9; i++) {
        console.log(moviesArray[i].Year)
        if (moviesArray[i]) {
            const movieContainer = document.getElementById(`movie${i + 1}`);
            if (movieContainer) {
                movieContainer.innerHTML = displayMovies(moviesArray[i]);
            };
        };
    };
    if (filter === "Title:A-Z") {
        (moviesArray[i].Title).sort((a, b) => (a.moviesArray[i].Title) - (b.moviesArray[i].Title));
    }
    else if (filter === "Year: New to Old") {
        (moviesArray[i].Year).sort((a, b) => (a.moviesArray[i].Year) - (b.moviesArray[i].Year));
    }
    else if (filter === "Year: Old to New") {
        (moviesArray[i].Year).sort((a, b) => (b.moviesArray[i].Year) - (a.moviesArray[i].Year));
    };
};

function displayMovies(movie) {
    return `<img src= ${movie.Poster}>
            <p>Title: "${movie.Title}"</p>
            <p>Year: ${movie.Year}</p>`
};

function filterMovies(event) {
    fetchMovies(event.target.value);
    console.log(fetchMovies(event.target.value));
};

setTimeout(() => {
    fetchMovies();
}, 2000);