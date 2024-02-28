import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { EMPTY_RES, SERVER_ERROR } from '../../utils/constants.js';
import './MoviesCardList.css';

function MoviesCardList({ onLoading, filteredMovies, addMovies, filteredSaveMovies, onDeleteSaveMovie, onToggleSaveMovie, firstEntry, isError, isServerError }) {

    const { pathname } = useLocation();

    const [visibleMovies, setVisibleMovies] = React.useState(0);
    const [step, setStep] = React.useState(0);

    //Загрузка необходимого количества карточек фильмов
    React.useEffect(() => {
        const showMoreMovie = () => {
            if (window.innerWidth >= 1024) {
                setVisibleMovies(12);
                setStep(3);
            } else if (window.innerWidth >= 650) {
                setVisibleMovies(8);
                setStep(2);
            } else if (window.innerWidth < 650) {
                setVisibleMovies(5);
                setStep(2)
            }
        }
        showMoreMovie();

        window.addEventListener('resize', showMoreMovie);
        return () => window.removeEventListener('resize', showMoreMovie);
    }, [filteredMovies])

    // Показать больше карточек фильмов
    const handleMoreMovie = () => {
        setVisibleMovies(visibleMovies + step)
    }

    return (
        <section className="movies-list">
            {onLoading ? <Preloader /> :
                <div className="movies-list__wrapper">
                    {pathname === "/movies" && filteredMovies.length !== 0 && (
                        <ul className="movies-list__items">
                            {filteredMovies.slice(0, visibleMovies).map((movie) => {
                                return (
                                    <MoviesCard
                                        key={movie.id}
                                        onToggleSaveMovie={onToggleSaveMovie}
                                        addMovies={addMovies}
                                        movieCard={movie}
                                        isError={isError}
                                    />
                                )
                            })}
                        </ul>)}
                    {pathname === "/saved-movies" && filteredSaveMovies.length !== 0 && (
                        <ul className="movies-list__items">
                            {filteredSaveMovies.map((movie) => {
                                return (
                                    <MoviesCard
                                        movieCard={movie}
                                        key={movie._id}
                                        onDeleteSaveMovie={onDeleteSaveMovie}
                                    />
                                )
                            })}
                        </ul>)
                    }
                    {pathname === "/movies" &&
                        filteredMovies.length === 0 &&
                        !onLoading &&
                        !isServerError &&
                        !firstEntry &&
                        <span className="movies-list_error">{EMPTY_RES}</span>
                    }
                    {pathname === "/saved-movies" &&
                        filteredSaveMovies.length === 0 &&
                        !firstEntry &&
                        <span className="movies-list_error">{EMPTY_RES}</span>
                    }
                    {isServerError &&
                        <span className="movies-list_error">{SERVER_ERROR}</span>
                    }
                    {pathname === "/movies" &&
                        visibleMovies < filteredMovies.length &&
                        <button className="movies-list__btn" type="button" onClick={handleMoreMovie} >Еще</button>
                    }
                </div>
            }
        </section>
    )
}

export default MoviesCardList;