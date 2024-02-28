import React, { useCallback } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { handleFilter } from '../../utils/utils.js';
import './SavedMovies.css';

function SavedMovies({ onDeleteSaveMovie, addMovies }) {

    const [isCheck, setIsCheck] = React.useState(false);
    const [valueInputSearchForm, setValueInputSearchForm] = React.useState("");
    const [filteredSaveMovies, setFilteredSaveMovies] = React.useState(addMovies);
    const [firstEntrySaveMovies, setFirstEntrySaveMovies] = React.useState(true);


    // Поиск и фильрация фильмов
    const filterSaveMovies = useCallback((value, movies, isCheck) => {
        setValueInputSearchForm(value);
        setFilteredSaveMovies(
            handleFilter(value, movies, isCheck)
        )
    }, [setFilteredSaveMovies])

    // Запрос на поиск
    const handleSearchForm = (value) => {
        filterSaveMovies(value, addMovies, isCheck);
    }

    // Включение и выключение фильтра
    const handleToggleFilter = (isCheck) => {
        setIsCheck(isCheck);
        filterSaveMovies(valueInputSearchForm, addMovies, isCheck);
    }

    React.useEffect(() => {
        filterSaveMovies(valueInputSearchForm, addMovies, isCheck);
    }, [filterSaveMovies, addMovies, valueInputSearchForm, isCheck]);

    React.useEffect(() => {
        if (addMovies.length === 0) {
            setFirstEntrySaveMovies(true);
        } else {
            setFirstEntrySaveMovies(false);
        }
    }, [addMovies, firstEntrySaveMovies]);

    return (
        <main className="save-movies">
            <SearchForm
                handleSearchForm={handleSearchForm}
                isCheck={isCheck}
                valueInputSearchForm={valueInputSearchForm}
                firstEntry={firstEntrySaveMovies}
                toggleFilter={handleToggleFilter} />
            <MoviesCardList
                onDeleteSaveMovie={onDeleteSaveMovie}
                filteredSaveMovies={filteredSaveMovies}
                firstEntry={firstEntrySaveMovies} />
        </main>
    )
}

export default SavedMovies;