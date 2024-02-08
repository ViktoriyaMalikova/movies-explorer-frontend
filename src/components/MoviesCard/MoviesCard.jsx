import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import movieImg from '../../images/Movies-img.jpg';

function MoviesCard() {

    const { pathname } = useLocation();
    const [isSaveMovie, setIsSaveMovie] = React.useState(false);

    function handleSaveCard() {
        setIsSaveMovie(!isSaveMovie);
    }
    return (
        <li className="movies-list__item">
            <div className="movies-list__wrapper">
                <p className="movies-list__name">В погоне за Бенкси</p>
                <p className="movies-list__duration">0ч 42м</p>
            </div>
            <img src={movieImg}
                alt="Постер фильма" className="movies-list__image" />
            {pathname === "/movies" && !isSaveMovie && <button className="movies-list__button" onClick={handleSaveCard}>Сохранить</button>}
            {isSaveMovie && <button className="movies-list__save-button" onClick={handleSaveCard}></button>}
            {pathname === "/saved-movies" && <button className="movies-list__delete-button"></button>}
        </li>
    )
}

export default MoviesCard;