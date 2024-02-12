import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import NotFoundMovie from '../NotFoundMovie/NotFoundMovie';
import Preloader from '../Preloader/Preloader'
import './MoviesCardList.css';

function MoviesCardList() {

    const { pathname } = useLocation();

    return (
        <section className="movies-list">
            {/* <Preloader /> */}
            {/* <NotFoundMovie /> */}
            <div className="movies-list__wrapper">
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
                {pathname === "/movies" && <button className="movies-list__btn" type="button">Еще</button>}
            </div>
        </section>
    )
}

export default MoviesCardList;