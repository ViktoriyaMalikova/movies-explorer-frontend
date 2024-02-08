import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
    return (
        <section className="search">
            <div className="search__wrapper">
                <form className="search__form" name="formSearch" noValidate>
                    <input className="search__input" type="text" placeholder="Фильм" name="searchMovie" required />
                    <button className="search__button" type="submit">
                        Поиск
                    </button>
                </form>
            </div>
            <FilterCheckbox />
        </section>
    )
}

export default SearchForm;