/**
 * es6 modules and imports
 */
import {getMovies, getMovieForEdit, addMovies} from './api';
import sayHello from './hello';
sayHello('World');

const loader = $('#loading');
const addMovie = $('#addMovie');
const movieInfo = $('#movie-info');
const deleteMovie = $('#deleteButton');
let movieCount = 0;

function refreshMovies() {
    movieInfo.html(``);
    getMovies().then((movies) => {
        movies.forEach(({title, rating, id}) => {
            // console.log(`id#${id} - ${title} - rating: ${rating}`);
            movieCount = parseInt(id);
            console.log(id);
            movieInfo.append(`<li> id#${id} - ${title} - rating: ${rating}
<button id=${id} type="button" class="btn btn-primary editButton"
data-toggle="modal" data-target="#exampleModal">Edit</button></li>`);

        });
        loader.removeClass("visible");
        loader.addClass("invisible");
    }).then(() => {
        $('.editButton').click(function () {
            let movie = getMovieForEdit(this.id);
            $("#editMovieId").text(movie.id);
            console.log(movie.id);
            // movie.title
            // movie.rating
            console.log(getMovieForEdit(this.id));
        });
    })
        .catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}


function loadUp() {
    loader.removeClass('invisible');
    loader.addClass("visible")
}

addMovie.click((e) => {
    e.preventDefault();
    let data = {
        title: $('#movieTitle').val(),
        rating: $('#movieRating').val()
    };
    loadUp();
    addMovies(data);
    refreshMovies();
});



deleteMovie.click((id) => {


});

$(document).ready(() => {
    loadUp();
    refreshMovies();
});
