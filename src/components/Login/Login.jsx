import React from 'react';
import AuthnWithForm from '../AuthnWithForm/AuthnWithForm';
import AuthInput from '../AuthInput/AuthInput';
import './Login.css';

function Login() {
    return (
        <AuthnWithForm
            name="signin"
            title="Рады видеть!"
            btnTitle="Войти"
        >
            <AuthInput type="email" title="E-mail" name="email" />
            <AuthInput type="password" title="Пароль" name="password" />
        </AuthnWithForm>
    )
}

export default Login;