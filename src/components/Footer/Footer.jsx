import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__wrapper">
                <p className="footer__date">&copy;2024</p>
                <nav className="footer__links">
                    <a href="https://practicum.yandex.ru/" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                    <a href="https://github.com/ViktoriyaMalikova" className="footer__link" target="_blank" rel="noreferrer">Github</a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;