import React from 'react';
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">
                Портфолио
            </h2>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a href="https://github.com/ViktoriyaMalikova/how-to-learn" className="portfolio__link" target="_blank" rel="noreferrer">
                        <p className="portfolio__link-name">
                            Статичный сайт
                        </p>
                        <div className="portfolio__link-icon"></div>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a href="https://github.com/ViktoriyaMalikova/russian-travel" className="portfolio__link" target="_blank" rel="noreferrer">
                        <p className="portfolio__link-name">
                            Адаптивный сайт
                        </p>
                        <div className="portfolio__link-icon"></div>
                    </a>
                </li>
                <li className="portfolio__item portfolio__item_type_last">
                    <a href="https://github.com/ViktoriyaMalikova/react-mesto-api-full-gha" className="portfolio__link portfolio__link_type_last" target="_blank" rel="noreferrer">
                        <p className="portfolio__link-name">
                            Одностраничное приложение
                        </p>
                        <div className="portfolio__link-icon"></div>
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;