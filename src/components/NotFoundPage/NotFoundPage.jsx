import React from 'react';
import { useNavigate } from "react-router-dom";
import './NotFoundPage.css';

function NotFoundPage() {

    const navigate = useNavigate();

    return (
        <main className="not-found">
            <section className="not-found__section">
                <h2 className="not-found__title">404</h2>
                <p className="not-found__description">Страница не найдена</p>
                <button className="not-found__link" type="button" onClick={() => navigate(-1)}>
                    Назад
                </button>
            </section>
        </main>
    )
}

export default NotFoundPage;