import React from 'react';
import './AuthInput.css';

function AuthInput({ title, type, name, minLength, maxLength, placeholder }) {
    return (
        <>
            <label className="authorization__label-text">
                {title}
                <input
                    className="authorization__item"
                    type={type}
                    name={name}
                    minLength={minLength}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    required
                />
            </label>
            <span className="authorization__input-error"></span>
        </>
    )
}

export default AuthInput;