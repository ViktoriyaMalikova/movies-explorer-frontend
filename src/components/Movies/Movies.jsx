import React, { useCallback } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import * as MoviesApi from '../../utils/MoviesApi.js';
import { handleFilter } from '../../utils/utils.js';
import './Movies.css';

function Movies({ isError, onToggleSaveMovie, onDelete, addMovies, onLoading, setIsLoading, }) {

    const [apiMovies, setApiMovies] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [valueInput, setValueInput] = React.useState("");
    const [isCheck, setIsCheck] = React.useState(false);
    const [isServerError, setIsServerError] = React.useState(false);
    const [firstEntry, setFirstEntry] = React.useState(true);

    // Поиск и фильрация фильмов
    const filterMovies = useCallback((value, movies, isCheck) => {
        const filteredMovies = handleFilter(value, movies, isCheck);
        setFilteredMovies(filteredMovies);

        localStorage.setItem('value', JSON.stringify(value))
        localStorage.setItem('apimovies', JSON.stringify(movies))
        localStorage.setItem('check', JSON.stringify(isCheck))
    }, [setFilteredMovies])

    // Запрос на поиск
    const handleSearchForm = (value) => {
        if (apiMovies.length === 0) {
            setIsLoading(true);
            MoviesApi.getMoviesApi()
                .then((data) => {
                    setApiMovies(data);
                    setIsServerError(false);
                    filterMovies(value, data, isCheck);
                    setFirstEntry(false);
                })
                .catch((error) => {
                    setIsServerError(true);
                    console.log(error);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        } else {
            filterMovies(value, apiMovies, isCheck);
        }
    }

    //Восстановление результатов поиска
    React.useEffect(() => {
        if (
            localStorage.getItem('apimovies') &&
            localStorage.getItem('value') &&
            localStorage.getItem('check')
        ) {
            const movies = JSON.parse(localStorage.getItem('apimovies'));
            const value = JSON.parse(localStorage.getItem('value'));
            const check = JSON.parse(localStorage.getItem('check'));
            setApiMovies(movies)
            setValueInput(value)
            setIsCheck(check)
            filterMovies(value, movies, check)
            setFirstEntry(false);
        }
    }, [filterMovies])

    // Включение и выключение фильтра
    const handleToggleFilter = (isCheck) => {
        if (localStorage.getItem('apimovies') &&
            localStorage.getItem('value')) {
            const movies = JSON.parse(localStorage.getItem('apimovies'));
            const value = JSON.parse(localStorage.getItem('value'));
            setIsCheck(isCheck);
            filterMovies(value, movies, isCheck);
            localStorage.setItem('check', JSON.stringify(isCheck));
        } else {
            setIsCheck(isCheck);
        }
    }

    return (
        <main className="movies">
            <SearchForm firstEntry={firstEntry}
                handleSearchForm={handleSearchForm}
                valueInput={valueInput}
                toggleFilter={handleToggleFilter}
                onLoading={onLoading}
                isCheck={isCheck} />
            <MoviesCardList
                filteredMovies={filteredMovies}
                onLoading={onLoading}
                onDelete={onDelete}
                onToggleSaveMovie={onToggleSaveMovie}
                addMovies={addMovies}
                firstEntry={firstEntry}
                isError={isError}
                isServerError={isServerError} />
        </main>
    )
}

export default Movies;
