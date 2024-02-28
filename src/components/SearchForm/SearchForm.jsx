import React from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { EMPTY_REQ } from '../../utils/constants.js';
import './SearchForm.css';

function SearchForm({ handleSearchForm, valueInput, toggleFilter, isCheck, firstEntry, onLoading }) {

    const { pathname } = useLocation();

    const [inputValueForm, setInputValueForm] = React.useState("");
    const [isEmptyReq, setIsEmptyReq] = React.useState(false);

    React.useEffect(() => {
        setInputValueForm(valueInput);
    }, [valueInput]);

    function handleChangeInput(e) {
        setInputValueForm(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (inputValueForm.length === 0 && firstEntry && pathname === "/movies") {
            setIsEmptyReq(true);
        } else {
            handleSearchForm(inputValueForm);
            setIsEmptyReq(false);
        }
    }

    return (
        <section className="search">
            <form className="search__form" name="formSearch" onSubmit={handleSubmit} noValidate >
                <div className="search__wrapper">
                    <input
                        className="search__input"
                        type="text"
                        placeholder="Фильм"
                        name="searchMovie"
                        value={inputValueForm || ""}
                        onChange={handleChangeInput}
                        required
                        disabled={(firstEntry && pathname === "/saved-movies") || onLoading}
                    />
                    <button className={`search__button ${firstEntry && pathname === "/saved-movies" ? "search__button_inactive" : ""}`} type="submit" disabled={(firstEntry && pathname === "/saved-movies") || onLoading} >
                        {onLoading ? "Поиск..." : "Поиск"}
                    </button>
                </div>
                <span className={`search__error ${isEmptyReq ? "search__error_active" : ""}`}>{EMPTY_REQ}</span>
                <FilterCheckbox toggleFilter={toggleFilter} isCheck={isCheck} firstEntry={firstEntry} />
            </form>
        </section>
    )
}

export default SearchForm;