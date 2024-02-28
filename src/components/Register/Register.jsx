import React from 'react';
import AuthnWithForm from '../AuthnWithForm/AuthnWithForm';
import AuthInput from '../AuthInput/AuthInput';
import { useFormWithValidation } from '../../hooks/useFormAndValidation';
import { NAME_REGEX, EMAIL_REGEX } from '../../utils/constants'
import './Register.css';

function Register({ onRegister, isError, errorMessageRegister, onLoading }) {

    const { values, handleChange, errors, isValid } = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(values);
    }

    return (
        <AuthnWithForm
            name="signup"
            title="Добро пожаловать!"
            btnTitle={!onLoading ? "Зарегистрироваться" : "Регистрация..."}
            onSubmit={handleSubmit}
            isError={isError}
            errorMessageRegister={errorMessageRegister}
            isValid={isValid}
            onLoading={onLoading}
        >
            <AuthInput
                type="text"
                title="Имя"
                name="name"
                minLength={2}
                maxLength={30}
                pattern={NAME_REGEX}
                placeholder="Введите имя"
                value={values.name || ""}
                error={errors.name}
                onChange={handleChange}
                onLoading={onLoading}
            />
            <AuthInput
                type="email"
                title="E-mail"
                name="email"
                pattern={EMAIL_REGEX}
                placeholder="Введите e-mail"
                value={values.email || ""}
                error={errors.email}
                onChange={handleChange}
                onLoading={onLoading}
            />
            <AuthInput
                type="password"
                title="Пароль"
                name="password"
                placeholder="Введите пароль"
                value={values.password || ""}
                error={errors.password}
                onChange={handleChange}
                onLoading={onLoading}
            />
        </AuthnWithForm>
    )
}

export default Register;