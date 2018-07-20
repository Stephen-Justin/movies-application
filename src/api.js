module.exports = {
    getMovies: () => {
        return fetch('/api/movies',
        )
            .then(response => response.json());
    },
    getMovieForEdit: (id) => {
        return fetch(`api/movies/${id}`)
            .then(response => response.json());
    },
    addMovies: (data) => {
        return fetch('/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json());
    },
    deleteMovies: (data) => {
        return fetch('/api/movies/' + data, {
            method: 'DELETE'
        })
            .then(response => response.json());

    }
};
