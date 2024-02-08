import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList() {

    const { pathname } = useLocation();

    return (
        <section className="movies-list">
            <ul className="movies-list__items">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </ul>
            {pathname === "/movies" && <button className="movies-list__btn">Еще</button>}

        </section>
    )
}

export default MoviesCardList;