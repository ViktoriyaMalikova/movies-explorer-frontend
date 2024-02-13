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
            <AuthInput type="text" title="Имя" name="name" minLength={2} maxLength={30} placeholder="Введите имя" />
            <AuthInput type="email" title="E-mail" name="email" placeholder="Введите e-mail" />
            <AuthInput type="password" title="Пароль" name="password" placeholder="Введите пароль" />
        </AuthnWithForm>
    )
}

export default Register;