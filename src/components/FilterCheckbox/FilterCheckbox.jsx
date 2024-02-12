import "./FilterCheckbox.css";

function FilterCheckbox() {
    return (
        <div className="search__checkbox">
            <label className="search__checkbox-label">
                <span className="search__checkbox-text">Короткометражки</span>
                <input
                    className="search__checkbox-input"
                    type="checkbox"
                    name="filterCheckbox"
                    id="filterCheckbox"
                />
                <span className="search__checkbox-button" ></span>
            </label>
        </div>
    )
}

export default FilterCheckbox;