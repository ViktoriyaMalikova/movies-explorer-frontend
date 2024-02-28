import React from 'react';
import { Link } from "react-router-dom";
import './AuthnWithForm.css';
import logo from '../../images/Header-logo.svg';

function AuthnWithForm({ children, title, btnTitle, name, onSubmit, isError, errorMessageLogin, errorMessageRegister, isValid, onLoading }) {
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
                        disabled={!isValid || onLoading}
                        onSubmit={onSubmit}
                        noValidate
                    >
                        {children}
                        <div className={`authorization__button-wrapper ${name === "signup" ? "authorization__button-wrapper_type_signup" : ""}`}>
                            <span className={`authorization__error-text ${isError && "authorization__error-text_active"}`}>{name === "signup" ? errorMessageRegister : errorMessageLogin}</span>
                            <button className={`authorization__button ${!isValid && "authorization__button_inactive"}`} type='submit'>
                                {btnTitle}
                            </button>
                        </div>
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