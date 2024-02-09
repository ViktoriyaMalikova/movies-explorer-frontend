import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/Header-logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn }) {

    const { pathname } = useLocation();
    const [nav, setNav] = React.useState(false);

    function handleOpenNav() {
        setNav(!nav);
    }
    return (
        <header className={pathname === "/" ? "header header_landing" : "header"}>
            <div className="header__wrapper">
                <Link to="/">
                    <img src={logo} alt="Логотип сайта" className="logo header__logo" />
                </Link>
                <Navigation isNav={nav} onClick={handleOpenNav} isloggedIn={isLoggedIn} />
                {isLoggedIn && <button type="button" onClick={handleOpenNav} className="navigation__burger-menu"></button>}
            </div>

        </header>
    )
}

export default Header;