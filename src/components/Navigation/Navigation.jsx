import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import icon from '../../images/Header-icon.svg';


function Navigation({ isNav, onClick, loggedIn }) {

    const { pathname } = useLocation();

    return (
        <nav className="navigation">
            {loggedIn
                ?
                <div className={`navigation__links ${isNav ? "navigation__links_visible" : ""}`}>
                    <div className="navigation__links-wrapper">
                        <Link to="/" onClick={onClick} className={` navigation__link  navigation__link_type_visible ${pathname === "/" ? "navigation__link_active" : ""}`}>
                            Главная
                        </Link>
                        <Link to="/movies" onClick={onClick} className={`navigation__link  ${pathname === "/movies" ? " navigation__link_active" : ""}`}>
                            Фильмы
                        </Link>
                        <Link to="/saved-movies" onClick={onClick} className={`navigation__link ${pathname === "/saved-movies" ? " navigation__link_active" : ""}`}>
                            Сохраненные фильмы
                        </Link>
                    </div>
                    <Link to="/profile" onClick={onClick} className="navigation__link-profile">
                        Аккаунт
                        <img src={icon} alt="Значок аккаунта" className={`navigation__icon ${pathname === "/" ? "" : "navigation__icon_dark"}`} />
                    </Link>
                    <button type="button" onClick={onClick} className={`navigation__close-menu ${isNav ? " navigation__close-menu_visible" : ""}`}></button>
                </div>
                :
                <div className="navigation__auth-links">
                    <Link to="/signup" className="navigation__auth-link navigation__auth-link_type_link">
                        Регистрация
                    </Link>
                    <Link to="/signin" className="navigation__auth-link navigation__auth-link_type_button">
                        Войти
                    </Link>
                </div>
            }
        </nav>

    )
}

export default Navigation;