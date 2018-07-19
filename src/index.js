/**
 * es6 modules and imports
 */
import {getMovies, addMovies} from './api';
import sayHello from './hello';

sayHello('World');

const loader = $('#loading');
const movieInfo = $('#movie-info');
let movieCount = 0;

function refreshMovies() {
    movieInfo.html(``);
    getMovies().then((movies) => {
        movies.forEach(({title, rating, id}) => {
            // console.log(`id#${id} - ${title} - rating: ${rating}`);
            movieCount = parseInt(id);
            console.log(id);
            movieInfo.append(`<li> id#${id} - ${title} - rating: ${rating} <button id="delete">Delete</button></li>`);

        });
        loader.removeClass("visible");
        loader.addClass("invisible");
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}


function loadUp() {
    loader.removeClass('invisible');
    loader.addClass("visible")
}

$('#addMovie').click((e) => {
    e.preventDefault();
    let data = {
        title: $('#movieTitle').val(),
        rating: $('#movieRating').val()
    };
    loadUp();
    addMovies(data);
    refreshMovies();
});


$(document).ready(() => {
    loadUp();
    refreshMovies();
});
