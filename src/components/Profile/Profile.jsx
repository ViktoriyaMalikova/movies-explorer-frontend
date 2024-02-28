import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormAndValidation';
import { NAME_REGEX, EMAIL_REGEX } from '../../utils/constants'
import { Link } from "react-router-dom";
import './Profile.css';

function Profile({ onSignOut, onUpdateUser, isError, isMessageProfile, isSuccessful, handleOpenEditProfile, isOpenEditProfile, onLoading }) {

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    const currentUser = React.useContext(CurrentUserContext);

    const [isDisabledForm, setIsDisabledForm] = React.useState(false);

    React.useEffect(() => {
        resetForm({
            name: currentUser.name,
            email: currentUser.email
        })
    }, [resetForm, currentUser, isOpenEditProfile]);


    React.useEffect(() => {
        if (currentUser.name !== values.name || currentUser.email !== values.email) {
            setIsDisabledForm(true);
        } else {
            setIsDisabledForm(false);
        }
    }, [values, currentUser])


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(values);
    }

    return (
        <main className="profile">
            <section className="profile__section-profile">
                <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                <form className="profile__form" name="profileForm" onSubmit={handleSubmit} noValidate disabled={!isDisabledForm || !isValid || onLoading}>
                    <div className="profile__info">
                        <label className="profile__container-input profile__container-input_type_name">
                            Имя
                            <input
                                className="profile__input profile__input_type_name"
                                type="text"
                                name="name"
                                placeholder="Введите имя"
                                pattern={NAME_REGEX}
                                id="name"
                                value={values.name || ""}
                                minLength={2}
                                maxLength={30}
                                onChange={handleChange}
                                disabled={!isOpenEditProfile || onLoading}
                                required
                            />
                        </label>
                        <span className="profile__input-error">{errors.name}</span>
                        <label className="profile__container-input profile__container-input_type_title">
                            E-mail
                            <input
                                className="profile__input profile__input_type_title"
                                type="email"
                                name="email"
                                pattern={EMAIL_REGEX}
                                placeholder="Введите email"
                                id="email"
                                value={values.email || ""}
                                onChange={handleChange}
                                disabled={!isOpenEditProfile || onLoading}
                                required
                            />
                        </label>
                        <span className="profile__input-error">{errors.email}</span>
                    </div>
                    <span className={`profile__error-text  ${isError ? "profile__error-text_type_error" : ""} ${isSuccessful ? "profile__error-text_type_successful" : ""}`}>{isMessageProfile}</span>
                    {isOpenEditProfile
                        &&
                        <button type="submit" disabled={!isDisabledForm} className={`profile__button profile__button_type_save ${!isDisabledForm || !isValid ? "profile__button_inactive" : ""}`}>{onLoading ? "Данные обновляются" : "Сохранить"}</button>
                    }
                </form>
                {!isOpenEditProfile
                    &&
                    <>
                        <button type="button" className="profile__button profile__button_type_edit" onClick={handleOpenEditProfile}>Редактировать</button>
                        <Link to="/" className="profile__button profile__button_type_logout" onClick={onSignOut}>Выйти из аккаунта</Link>
                    </>
                }
            </section>
        </main>
    )
}

export default Profile;