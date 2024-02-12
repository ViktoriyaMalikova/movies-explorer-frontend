import React from 'react';
import './NotFoundMovie.css';

function NotFoundMovie() {
    return (
        <div className="movies-list__notfound-wrapper">
            <h2 className="movies-list__notfound-title">Фильмы по вашему запросу не найдены</h2>
        </div>
    )
}

export default NotFoundMovie;