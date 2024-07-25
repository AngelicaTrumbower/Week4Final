const searchForm = document.getElementById("input__form");

document.getElementById('input__form').addEventListener('submit', function (event) {
    event.preventDefault(); 
    
    document.querySelector('.search__container').style.visibility = 'hidden';
    document.querySelector('.movie__container').style.visibility = 'visible';
    document.querySelector('.filter').style.visibility = 'visible';
    
    fetchMovies();
});

async function fetchMovies(event) {
    const searchInput = document.getElementById("search__input").value;
    const apiEnd = `https://www.omdbapi.com/?i=tt3896198&apikey=72e6749a&s=${encodeURIComponent(searchInput)}`;

    const movies = await fetch(apiEnd);
    const movieData = await movies.json();

    displayMovies(movieData.Search);
    console.log(movieData.Search)
};   

function displayMovies(movies) {
    const movieContainers = Array.from({length: 9}, (_, i) => document.getElementById(`movie${i + 1}`));
    movieContainers.map((movieContainer, i) => {
        if (movieContainer) {
            if (movies && movies[i]) {
                movieContainer.innerHTML = `
                    <img src= "${movies[i].Poster}">
                    <p>Title: "${movies[i].Title}"</p>
                    <p>Year: ${movies[i].Year}</p>`;
            } else {
                movieContainer.innerHTML = "";
            };
        };
    });
}

function filterMovies() {
    const filterValue = filter.value;
    const movieContainer = Array.from(document.querySelectorAll('.movie__listing')).filter(container => container.innerHTML.trim() !== "");

    movieContainer.sort((a,b) => {
        const titleA = a.querySelector('p:nth-child(2)').textContent.split(': ')[1];
        const titleB = b.querySelector('p:nth-child(2)').textContent.split(': ')[1];
        const yearA = parseInt(a.querySelector('p:nth-child(3)').textContent.split(': ')[1]);
        const yearB = parseInt(b.querySelector('p:nth-child(3)').textContent.split(': ')[1]);
        
        if (filterValue === "Title:A-Z") {
            return titleA.localeCompare(titleB);
        } else if (filterValue === "Year:New to Old") {
            return yearB - yearA;
        } else if (filterValue === "Year:Old to New") {
            return yearA - yearB;
        }
    });
    const movieContainerParent = document.querySelector('.movie__container');
    movieContainer.forEach(container => movieContainerParent.appendChild(container));
}