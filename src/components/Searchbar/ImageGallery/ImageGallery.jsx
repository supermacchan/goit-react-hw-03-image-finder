import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';
import { RotatingLines } from 'react-loader-spinner';

export class ImageGallery extends Component {
    static propTypes = {
        data: PropTypes.string.isRequired,
    };

    state = {
        images: null,
        loading: false,
    };

    componentDidUpdate(prevProps, prevState) {
        const BASE_URL = 'https://pixabay.com/api/'
        const API_KEY = '30551653-aa9d35c8f88064a7bc9ad69bf';
        const query = this.props.data;
        if (prevProps.data !== this.props.data) {
            this.setState({ loading: true });
            fetch(`${BASE_URL}?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(result => result.json())
                .then(images => this.setState({ images }))
                .finally(() => this.setState({ loading: false }));
        } 
    };

    render() {
         return (
             <ul className={css.imageGallery}>
                 {this.state.loading &&
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                        className={css.spinner}
                    />}
                 {this.state.images && this.state.images.hits.map(image => {
                     return <ImageGalleryItem
                         key={image.id}
                         url={image.webformatURL}
                     />
                 })}
            </ul>
        );
    };
};