/**
 * es6 modules and imports
 */
import {getMovies, getMovieForEdit, addMovies, deleteMovies, changeMovie} from './api';
import sayHello from './hello';

sayHello('World');

const loader = $('#loading');
const addMovie = $('#addMovie');
const movieInfo = $('#movie-info');
const saveChanges = $('#saveChanges');
const deleteMovie = $('#deleteButton');
let movieCount = 0;

function refreshMovies() {
    movieInfo.html(``);
    getMovies().then((movies) => {
        movies.forEach(({title, rating, id}) => {
            // console.log(`id#${id} - ${title} - rating: ${rating}`);
            movieCount = parseInt(id);
            console.log(id);
            movieInfo.append(`<li class="list-group-item p-1"> id#${id} - ${title} - rating: ${rating}
<button id=${id} type="button" class="btn-sm btn-primary editButton"
data-toggle="modal" data-target="#editMovieModal">Edit</button></li>`);

        });
        loader.removeClass("visible");
        loader.addClass("invisible");
    }).then(() => {
        $('.editButton').click(function () {
            const id = this.id;
            getMovieForEdit(id)
                .then(movie => {
                    $("#editMovieId").text(movie.id);
                    $("#editMovieTitle").val(movie.title);
                    $("#editMovieRating").val(movie.rating);
                })
        });
    }).catch((error) => {
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


deleteMovie.click(() => {
    let deleteCheck = confirm("Are you sure you want to delete this movie?");
    if (deleteCheck){
    let id = $("#editMovieId").text();
    loadUp();
    deleteMovies(id);
    refreshMovies();
    }
});

saveChanges.click((e) => {
    e.preventDefault();
    let data = {
        title: $('#editMovieTitle').val(),
        rating: $('#editMovieRating').val(),
        id: $("#editMovieId").text()
    };
    loadUp();
    changeMovie(data);
    refreshMovies();
});

$(document).ready(() => {
    loadUp();
    refreshMovies();
});
