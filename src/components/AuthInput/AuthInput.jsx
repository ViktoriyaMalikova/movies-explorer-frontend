import React from 'react';
import './AuthInput.css';

function AuthInput({ title, type, name, minLength, maxLength, value, }) {
    return (
        <label className="authorization__label-text">
            {title}
            <input
                className="authorization__item"
                type={type}
                name={name}
                minLength={minLength}
                maxLength={maxLength}
                required
            />
        </label>
    )
}

export default AuthInput;