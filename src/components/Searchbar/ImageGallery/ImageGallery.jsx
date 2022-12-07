import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';

export class ImageGallery extends Component {
    static propTypes = {
        data: PropTypes.string.isRequired,
    };

    state = {
        images: null,
    };

    componentDidUpdate(prevProps, prevState) {
        const API_KEY = '30551653-aa9d35c8f88064a7bc9ad69bf';
        const query = this.props.data;
        if (prevProps.data !== this.props.data) {

        }
        fetch(`https://pixabay.com/api/?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(result => result.json())
            .then(images => this.setState({ images }));
    };

    render() {
         return (
            <ul className={css.imageGallery}>
            {/* <!-- Набор <li> с изображениями -->
            Будем делать тут map получаемого массива и для каждой единицы рендерить айтем */}
                <ImageGalleryItem />
            </ul>
        );
    };
};