import React from 'react';
import { Link } from "react-router-dom";
import './Profile.css';

function Profile({ user }) {

    const [isEditProfile, setIsEditProfile] = React.useState(false);

    function hendleEditProfile() {
        setIsEditProfile(!isEditProfile);
    }

    return (
        <main className="profile">
            <section className="profile__section-profile">
                <h2 className="profile__title">Привет, {user.name}!</h2>
                <form className="profile__form" name="profileForm">
                    <div className="profile__info">
                        <label className="profile__container-input profile__container-input_type_name">
                            Имя
                            <input
                                className="profile__input profile__input_type_name"
                                type="text"
                                name="name"
                                placeholder="Введите имя"
                                id="name"
                                defaultValue={user.name}
                                minLength="2"
                                maxLength="30"
                            />
                        </label>
                        <span className="profile__input-error"></span>
                        <label className="profile__container-input profile__container-input_type_title">
                            E-mail
                            <input
                                className="profile__input profile__input_type_title"
                                type="email"
                                name="email"
                                placeholder="Введите email"
                                id="email"
                                defaultValue={user.email}
                            />
                        </label>
                        <span className="profile__input-error"></span>
                    </div>
                    <span className="profile__error-text"></span>
                    {isEditProfile
                        &&
                        <button type="submit" className="profile__button profile__button_type_save" onClick={hendleEditProfile}>Сохранить</button>
                    }
                </form>
                {!isEditProfile
                    &&
                    <>
                        <button type="button" className="profile__button profile__button_type_edit" onClick={hendleEditProfile}>Редактировать</button>
                        <Link to="/signin" className="profile__button profile__button_type_logout">Выйти из аккаунта</Link>
                    </>
                }
            </section>
        </main>
    )
}

export default Profile;