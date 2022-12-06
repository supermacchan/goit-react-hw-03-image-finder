import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
    return (
        <header className={css.searchbar}>
            <form className={css.searchForm}>
                <button type="submit" className={css.searchFormButton}>
                    <span className={css.searchFormButtonLabel}>Search</span>
                </button>

                <input
                    className={css.searchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
};