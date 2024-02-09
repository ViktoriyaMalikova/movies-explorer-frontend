import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import user from '../../utils/user';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import './App.css';

function App() {

  const { pathname } = useLocation();
  const [isloggedIn, setLoggedIn] = React.useState(true);

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
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {visibleFooter && <Footer />}
      </div>
    </div >
  );
}

export default App;
