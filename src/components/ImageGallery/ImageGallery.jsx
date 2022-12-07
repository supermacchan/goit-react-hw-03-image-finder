import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'components/Button/Button';
import { imageAPI } from 'services/image-api';

export class ImageGallery extends Component {
    static propTypes = {
        data: PropTypes.string.isRequired,
    };

    state = {
        images: null,
        loading: false,
        error: null,
        showButton: false,
    };

    componentDidUpdate(prevProps, prevState) {
        // const query = this.props.data;
        if (prevProps.data !== this.props.data) {
            this.setState({
                loading: true,
                images: null
            });
            imageAPI.resetPageNumber();
            this.fetchGallery();
        } 
    };

    fetchGallery = () => {
        const query = this.props.data;
        imageAPI
            .fetchImages(query)
            .then(images => {
                if (images.hits.length > 0) {
                    console.log(images.hits);
                    this.setState({ images, showButton: true });
                    return;
                }
                toast.error('Oops! No matches found.');
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    };

    loadMoreImages = () => {
        const query = this.props.data;
        imageAPI
            .fetchImages(query)
            .then(images => {
                if (images.hits.length > 0) {
                    console.log(images.hits);
                }
                
                if (images.hits.length < 12) {
                    this.setState({ showButton: false });
                    toast.info("Looks like you've reached the end of search results.");
                }
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    }

    loadMoreClick = () => {
        this.loadMoreImages();
    }

    render() {
        const { images, loading, error, showButton } = this.state;

        return (
            <>
                <ul className={css.imageGallery}>
                    {loading && <Loader />}

                    {error && toast.error(`${error.message}`)}
                
                    {images && images.hits.map(image => {
                        return <ImageGalleryItem
                            key={image.id}
                            url={image.webformatURL}
                            alt={image.tags}
                            largeImage={image.largeImageURL}
                        />
                    })}
                </ul>
                {showButton && <Button onClick={this.loadMoreClick} />}
            </>
        );
    };
};