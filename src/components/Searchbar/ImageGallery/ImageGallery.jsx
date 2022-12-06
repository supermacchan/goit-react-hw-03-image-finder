import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = () => {
    return (
        <ul className={css.imageGallery}>
        {/* <!-- Набор <li> с изображениями -->
        Будем делать тут map получаемого массива и для каждой единицы рендерить айтем */}
            <ImageGalleryItem />
        </ul>
    );
}