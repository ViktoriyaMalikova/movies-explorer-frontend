import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies() {
    return (
        <main className="save-movies">
            <SearchForm />
            <MoviesCardList />
        </main>
    )
}

export default SavedMovies;