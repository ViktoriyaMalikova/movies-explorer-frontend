
import "./FilterCheckbox.css";
import { useLocation } from 'react-router-dom';

function FilterCheckbox({ isCheck, toggleFilter, firstEntry }) {

    const { pathname } = useLocation();

    const onClickFilter = (evt) => {
        toggleFilter(evt.target.checked)
    }

    return (
        <div className="search__checkbox">
            <label className="search__checkbox-label">
                <span className="search__checkbox-text">Короткометражки</span>
                <input
                    className="search__checkbox-input"
                    type="checkbox"
                    name="filterCheckbox"
                    disabled={firstEntry && pathname === "/saved-movies"}
                    checked={isCheck}
                    onChange={onClickFilter}
                />
                <span className="search__checkbox-button" ></span>
            </label>
        </div>
    )
}

export default FilterCheckbox;