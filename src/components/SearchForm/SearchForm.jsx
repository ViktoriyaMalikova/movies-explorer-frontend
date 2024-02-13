import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
    return (
        <section className="search">

            <form className="search__form" name="formSearch" noValidate>
                <div className="search__wrapper">
                    <input className="search__input" type="text" placeholder="Фильм" name="searchMovie" required />
                    <button className="search__button" type="submit">
                        Поиск
                    </button>
                </div>
                <FilterCheckbox />
            </form>

        </section>
    )
}

export default SearchForm;