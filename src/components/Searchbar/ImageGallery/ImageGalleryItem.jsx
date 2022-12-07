// import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ url }) => {
    return (
        <li className={css.imageGalleryItem}>
            <img
                src={url}
                alt=""
                 className={css.imageGalleryItemImg}
            />
        </li>
    );
}