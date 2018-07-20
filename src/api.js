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
    deleteMovies: (id) => {
        return fetch(`/api/movies/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json());

    },
    changeMovie: (data) => {
        return fetch(`/api/movies/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }
};
