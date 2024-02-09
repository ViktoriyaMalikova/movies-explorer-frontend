import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
    return (
        <main className="not-found">
            <section className="not-found__section">
                <h2 className="not-found__title">404</h2>
                <p className="not-found__description">Страница не найдена</p>
                <Link to="/" className="not-found__link">
                    Назад
                </Link>
            </section>
        </main>
    )
}

export default NotFoundPage;