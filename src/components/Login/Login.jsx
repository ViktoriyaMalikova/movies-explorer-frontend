import React from 'react';
import AuthnWithForm from '../AuthnWithForm/AuthnWithForm';
import AuthInput from '../AuthInput/AuthInput';
import { useFormWithValidation } from '../../hooks/useFormAndValidation';
import { EMAIL_REGEX } from '../../utils/constants'
import './Login.css';

function Login({ onLogin, isError, setIsError, errorMessageLogin, onLoading }) {

    const { values, handleChange, errors, isValid } = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(values);
    }

    React.useEffect(() => {
        setIsError(false);
    }, [setIsError])

    return (
        <AuthnWithForm
            name="signin"
            title="Рады видеть!"
            btnTitle={!onLoading ? "Войти" : "Вход..."}
            onSubmit={handleSubmit}
            isError={isError}
            errorMessageLogin={errorMessageLogin}
            isValid={isValid}
            onLoading={onLoading}
        >
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

export default Login;