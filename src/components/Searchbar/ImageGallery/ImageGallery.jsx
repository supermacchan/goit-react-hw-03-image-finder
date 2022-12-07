import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class ImageGallery extends Component {
    static propTypes = {
        data: PropTypes.string.isRequired,
    };

    state = {
        images: null,
        loading: false,
        error: null,
    };

    componentDidUpdate(prevProps, prevState) {
        const BASE_URL = 'https://pixabay.com/api/'
        const API_KEY = '30551653-aa9d35c8f88064a7bc9ad69bf';
        const query = this.props.data;
        if (prevProps.data !== this.props.data) {
            this.setState({
                loading: true,
                images: null
            });
            fetch(`${BASE_URL}?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    return Promise.reject(
                        new Error('Oops! No matches found.'),
                    );
                })
                .then(images => {
                    if (images.hits.length > 0) {
                        this.setState({ images });
                        return;
                    }
                    toast.error('Oops! No matches found.');
                })
                .catch(error => this.setState({ error }))
                .finally(() => this.setState({ loading: false }));
        } 
    };

    render() {
        const { images, loading, error } = this.state;

        return (
            <ul className={css.imageGallery}>
                {loading &&
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />}
                {error && toast.error(`${error.message}`)}
                {images && images.hits.map(image => {
                    return <ImageGalleryItem
                        key={image.id}
                        url={image.webformatURL}
                    />
                })}
            </ul>
        );
    };
};