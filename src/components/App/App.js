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
  const [isOpenEditProfile, setIsOpenEditProfile] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [addMovies, setAddMovies] = React.useState([]);

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
            setLoggedIn(false);
            localStorage.clear();
            console.log(error);
          })
      }
    }
  }, [setLoggedIn])

  //Получение данных пользователя и сохраненных фильмов после авторизации
  React.useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      Promise.all([MainApi.getInfoProfile(token), MainApi.getMovies(token)])
        .then(([dataUser, dataMovie]) => {
          setCurrentUser(dataUser);
          setAddMovies(dataMovie.reverse());
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
    localStorage.clear();
    setCurrentUser({});
    navigate('/');
  }

  React.useEffect(() => {
    setIsError(false);
  }, [navigate])

  React.useEffect(() => {
    if (loggedIn && (registerPage || loginPage)) {
      navigate("/movies");
    }
  }, [navigate, loggedIn, pathname, registerPage, loginPage]);

  //Открытие редактирования профиля
  function handleOpenEditProfile() {
    setIsOpenEditProfile(true);
  }

  //Редактирование данных пользователя
  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    MainApi.setInfoProfile(name, email, token)
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

  //Удаление фильма
  function handleDeleteMovie(savedMovieId) {
    const token = localStorage.getItem('token');
    MainApi.deleteMovie(savedMovieId, token)
      .then(() => {
        setAddMovies(
          addMovies.filter((movie) => {
            return movie._id !== savedMovieId;
          }),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Функция, которая добавляет или удаляет фильм из сохраненных
  function handleToggleSaveMovie(movieCard) {
    //Проверка, является ли фильм сохраненным
    const isSavedMovie = addMovies.some((item) => movieCard.id === item.movieId);

    if (!isSavedMovie) {
      const token = localStorage.getItem('token');
      MainApi.addMovie(movieCard, token)
        .then((newMovie) => {
          setAddMovies([newMovie, ...addMovies]);
        })
        .catch((err) => {
          console.error(err);
          setIsError(true);
        });
    } else {
      const SavedMovie = addMovies.find((item) => {
        return item.movieId === movieCard.id;
      });
      handleDeleteMovie(SavedMovie._id);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {visibleHeader && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<ProtectedRoute
            element={Movies}
            loggedIn={loggedIn}
            onToggleSaveMovie={handleToggleSaveMovie}
            addMovies={addMovies}
            onLoading={isLoading}
            setIsLoading={setIsLoading}
            isError={isError}
          />} />
          <Route path="/saved-movies" element={<ProtectedRoute
            element={SavedMovies}
            loggedIn={loggedIn}
            addMovies={addMovies}
            onDeleteSaveMovie={handleDeleteMovie}
          />} />
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