import { checkResponse } from './checkResponse';
import { MAIN_URL, MOVIES_URL } from './constants';

export const register = (name, email, password) => {
    return fetch(`${MAIN_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(checkResponse)
};

export const authorize = (email, password) => {
    return fetch(`${MAIN_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse)
};

export const getInfoProfile = (token) => {
    return fetch(`${MAIN_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
        .then(checkResponse)
};

export const setInfoProfile = (name, email, token) => {
    return fetch(`${MAIN_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email })
    })
        .then(checkResponse)
}

export const addMovie = (movie, token) => {
    return fetch(`${MAIN_URL}/movies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `${MOVIES_URL}${movie.image.url}`,
            trailerLink: movie.trailerLink,
            thumbnail: `${MOVIES_URL}${movie.image.url}`,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
        }),
    })
        .then(checkResponse)
};

export const getMovies = (token) => {
    return fetch(`${MAIN_URL}/movies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then(checkResponse)
};

export const deleteMovie = (movieId, token) => {
    return fetch(`${MAIN_URL}/movies/${movieId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(checkResponse)
};