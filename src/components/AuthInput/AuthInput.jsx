import React from 'react';
import './AuthInput.css';

function AuthInput({ title, type, name, minLength, maxLength, placeholder, value, onChange, error, pattern, onLoading }) {
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
                    value={value}
                    onChange={onChange}
                    pattern={pattern}
                    required
                    disabled={onLoading}

                />
            </label>
            <span className="authorization__input-error">{error}</span>
        </>
    )
}

export default AuthInput;