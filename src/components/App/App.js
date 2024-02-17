import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'
import { useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useLocalStorageState } from '../../hooks/useLocalStorageState.js';

import './App.css';
import * as MainApi from '../../utils/MainApi.js.js';
import {
  ERROR_CONFLICT_EMAIL,
  ERROR_REGISTER,
  ERRROR_INCORRECT_EMAIL_PASSWORD,
  ERROR_LOGIN,
  ERROR_UPDATE_USER,
  SUCCESSFUL_UPDATE_USER
} from '../../utils/constants.js';

function App() {

  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useLocalStorageState('loggedIn', false);
  const [isErrorMessageLogin, setIsErrorMessageLogin] = React.useState("");
  const [isErrorMessageRegister, setIsErrorMessageRegister] = React.useState("");
  const [isMessageProfile, setIsMessageProfile] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [isSuccessful, setIsSuccessful] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const navigate = useNavigate();

  const visibleHeader =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

  const visibleFooter =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies";

  const registerPage = pathname === "/signup";
  const loginPage = pathname === "/signin";

  React.useEffect(() => {
    setIsError(false);
  }, [navigate])

  //Проверка токена
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        MainApi.getInfoProfile(token)
          .then((data) => {
            if (data) {
              setLoggedIn(true);
            }
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  }, [setLoggedIn])

  //Получение данных пользователя после авторизации
  React.useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      MainApi.getInfoProfile(token)
        .then((dataUser) => {
          setCurrentUser(dataUser);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [loggedIn])

  //Авторизация пользователя
  function handleLogin({ email, password }) {
    setIsLoading(true);
    MainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem('token', data.token);
          navigate('/movies');
        }
      })
      .catch((error) => {
        setIsError(true);
        setLoggedIn(false);
        console.log(`Ошибка ${error.status}`);
        if (error.status === 401) {
          setIsErrorMessageLogin(ERRROR_INCORRECT_EMAIL_PASSWORD);
        } else {
          setIsErrorMessageLogin(ERROR_LOGIN);
        }
      })
      .finally(
        () => { setIsLoading(false) }
      )
  }

  //Регистрация пользователя
  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    MainApi.register(name, email, password)
      .then((data) => {
        if (data) {
          handleLogin({ email, password });
        }
      })
      .catch((error) => {
        setIsError(true);
        console.log(isError);
        console.log(`Ошибка ${error.status}`);
        if (error.status === 409) {
          setIsErrorMessageRegister(ERROR_CONFLICT_EMAIL);
        } else {
          setIsErrorMessageRegister(ERROR_REGISTER);
        }
      })
      .finally(
        () => { setIsLoading(false) }
      )
  }

  //Выход из аккаунта
  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem('token')
    setCurrentUser({});
    navigate('/');
  }

  React.useEffect(() => {
    if (loggedIn && (registerPage || loginPage)) {
      navigate("/movies");
    }
  }, [navigate, loggedIn, pathname, registerPage, loginPage]);



  const [isOpenEditProfile, setIsOpenEditProfile] = React.useState(false);


  function handleOpenEditProfile() {
    setIsOpenEditProfile(true);
  }

  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    MainApi.setInfoProfile(name, email)
      .then((userData) => {

        setCurrentUser(userData)
        setIsError(false);
        setIsSuccessful(true);
        setTimeout(() => {
          setIsSuccessful(false);
        }, 3000)
        setIsMessageProfile(SUCCESSFUL_UPDATE_USER);
        setIsOpenEditProfile(false);
      })
      .catch((error) => {
        setIsError(true);
        console.log(isError);
        console.log(`Ошибка ${error.status}`);
        if (error.status === 409) {
          setIsMessageProfile(ERROR_CONFLICT_EMAIL);
        } else {
          setIsMessageProfile(ERROR_UPDATE_USER);
        }
      })
      .finally(
        () => { setIsLoading(false) }
      )
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {visibleHeader && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<ProtectedRoute element={Movies} loggedIn={loggedIn} />} />
          <Route path="/saved-movies" element={<ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />} />
          <Route path="/profile" element={<ProtectedRoute
            element={Profile}
            onSignOut={signOut}
            loggedIn={loggedIn}
            onUpdateUser={handleUpdateUser}
            isError={isError}
            isMessageProfile={isMessageProfile}
            isSuccessful={isSuccessful}
            handleOpenEditProfile={handleOpenEditProfile}
            isOpenEditProfile={isOpenEditProfile}
            onLoading={isLoading}
          />} />
          <Route path="/signup" element={<Register
            onRegister={handleRegister}
            isError={isError}
            errorMessageRegister={isErrorMessageRegister}
            onLoading={isLoading}
          />} />
          <Route path="/signin" element={<Login
            onLogin={handleLogin}
            isError={isError}
            errorMessageLogin={isErrorMessageLogin}
            onLoading={isLoading}
          />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {visibleFooter && <Footer />}
      </div >
    </CurrentUserContext.Provider >)
}

export default App;
