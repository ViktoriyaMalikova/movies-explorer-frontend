import React from 'react';
import AuthnWithForm from '../AuthnWithForm/AuthnWithForm';
import AuthInput from '../AuthInput/AuthInput';
import './Register.css';

function Register() {


    return (
        <AuthnWithForm
            name="signup"
            title="Добро пожаловать!"
            btnTitle="Зарегистрироваться"
        >
            <AuthInput type="text" title="Имя" name="name" minLength={2} maxLength={30} />
            <AuthInput type="email" title="E-mail" name="email" />
            <AuthInput type="password" title="Пароль" name="password" />
        </AuthnWithForm>
    )
}

export default Register;