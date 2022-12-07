// import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = () => {
    return (
        <li className={css.imageGalleryItem}>
            <img
                src=""
                alt=""
                 className={css.imageGalleryItemImg}
            />
        </li>
    );
}