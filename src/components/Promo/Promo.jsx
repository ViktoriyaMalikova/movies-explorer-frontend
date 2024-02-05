import React from 'react';
import './Promo.css';
import promoLogo from '../../images/Promo-logo.png'


function Promo() {

    return (
        <section className="promo">
            <div className="promo__wrapper">
                <h1 className="promo__title">
                    Учебный проект студента факультета Веб&nbsp;-&nbsp;разработки.
                </h1>
                <p className="promo__subtitle">
                    Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                </p>
                <a href="#AboutProject" className="promo__link">
                    Узнать больше
                </a>
            </div>
            <img src={promoLogo} alt="Логотип" class="promo__logo"></img>
        </section>
    )
}

export default Promo;