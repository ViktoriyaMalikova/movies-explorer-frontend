import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';


function MoviesCard({ movieCard, onToggleSaveMovie, onDeleteSaveMovie, addMovies, isError }) {

    const { pathname } = useLocation();

    const [savedMovie, setSavedMovie] = React.useState(false);

    //Сохранение или удаление фильма
    const onClickToggle = () => {
        // Проверка, является ли фильм сохраненным
        const isSavedMovie = addMovies.some((item) => movieCard.id === item.movieId);

        if (!isSavedMovie) {
            setSavedMovie(true);
            onToggleSaveMovie(movieCard);
        } else {
            setSavedMovie(false);
            onToggleSaveMovie(movieCard);
        }
    };

    //Удаление фильма
    const onClickDelete = () => {
        onDeleteSaveMovie(movieCard._id)
    }

    React.useEffect(() => {
        if (pathname === '/movies')
            setSavedMovie(addMovies.some(item => movieCard.id === item.movieId))
    }, [pathname, setSavedMovie, addMovies, movieCard.id])

    const toHoursAndMinutes = (duration) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return `${hours}ч${minutes > 0 ? ` ${minutes}м` : ''}`;
    }

    return (
        <li className="movies-list__item">
            <div className="movies-list__wrapper-text">
                <p className="movies-list__name">{movieCard.nameRU}</p>
                <p className="movies-list__duration">{toHoursAndMinutes(movieCard.duration)}</p>
            </div>
            <a href={movieCard.trailerLink} className="movies-list__link-movie" target="_blank" rel="noreferrer">
                <img src={pathname === "/movies" ? `https://api.nomoreparties.co/${movieCard.image.url}` : `${movieCard.image}`} alt="Постер фильма" className="movies-list__image" />
            </a>
            {pathname === "/movies" && !savedMovie && <button className="movies-list__button" onClick={onClickToggle}>Сохранить</button>}
            {savedMovie && pathname === "/movies" && <button className={!isError ? "movies-list__save-button" : "movies-list__button"} onClick={onClickToggle}>{isError && 'Сохранить'}</button>}
            {pathname === "/saved-movies" && <button className="movies-list__delete-button" onClick={onClickDelete}></button>}
        </li>
    )
}

export default MoviesCard;