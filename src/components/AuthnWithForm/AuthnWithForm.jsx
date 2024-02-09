import React from 'react';
import { Link } from "react-router-dom";
import './AuthnWithForm.css';
import logo from '../../images/Header-logo.svg';

function AuthnWithForm({ children, title, btnTitle, name }) {
    return (
        <main className="authorization">
            <section className="authorization__authorization-section">
                <Link to="/">
                    <img src={logo} alt="Логотип сайта" className="logo authorization__logo" />
                </Link>
                <div className="authorization__wrapper">
                    <h2 className="authorization__title" >
                        {title}
                    </h2>
                    <form
                        className="authorization__form"
                    >
                        {children}
                        <button className={`authorization__button ${name === "signup" ? "authorization__button_type_signup" : ""}`} type="submit">
                            {btnTitle}
                        </button>
                        {name === "signup" && <p className="authorization__text-button">
                            Уже зарегистрированы?
                            <Link to="/signin" className="authorization__link">
                                Войти
                            </Link>
                        </p>}
                        {name === "signin" && <p className="authorization__text-button">
                            Еще не зарегистрированы?
                            <Link to="/signup" className="authorization__link">
                                Регистрация
                            </Link>
                        </p>}
                    </form>
                </div>
            </section>
        </main >
    )
}

export default AuthnWithForm;