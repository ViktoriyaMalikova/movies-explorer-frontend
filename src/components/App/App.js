import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './App.css';

function App() {

  const { pathname } = useLocation();
  const [isloggedIn, setLoggedIn] = React.useState(false);

  const visibleHeader =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

  const visibleFooter =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies";

  return (
    <div className="page">
      <div className="page__content">
        {visibleHeader && <Header isLoggedIn={isloggedIn} />}
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        {visibleFooter && <Footer />}
      </div>
    </div >
  );
}

export default App;
