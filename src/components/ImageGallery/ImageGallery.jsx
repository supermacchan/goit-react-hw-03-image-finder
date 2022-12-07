import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './ImageGallery.module.css';
import { animateScroll } from 'react-scroll';

import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { imageAPI } from 'services/image-api';

export class ImageGallery extends Component {
    static propTypes = {
        data: PropTypes.string.isRequired,
    };

    state = {
        images: null,
        loading: false,
        showButton: false,
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                loading: true,
                images: null,
                showButton: false,
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
                if (images.hits.length > 0 && images.totalHits <= 12) {
                    this.setState({ images: images.hits });
                    return;
                } else if (images.hits.length > 0 && images.totalHits > 12) {
                    this.setState({
                        images: images.hits,
                        showButton: true,
                    });
                    return;
                }
                toast.error('Oops! No matches found.');
            })
            .catch(error => toast.error(`${error.message}`))
            .finally(() => this.setState({ loading: false }));
    };

    loadMoreClick = () => {
        this.setState({
                loading: true,
        });

        const query = this.props.data;

        imageAPI
            .fetchImages(query)
            .then(images => {
                if (images.hits.length > 0) {
                    animateScroll.scrollToBottom();
                    this.setState(prevState => {
                        return {
                            images: [...prevState.images, ...images.hits],
                        }
                    })
                }
                
                if (images.hits.length < 12) {
                    this.setState({ showButton: false });
                    toast.info("Looks like you've reached the end of search results.");
                }
            })
            .catch(error => toast.error(`${error.message}`))
            .finally(() => this.setState({ loading: false }));
    }

    render() {
        const { images, loading, showButton } = this.state;

        return (
            <>
                <ul className={css.imageGallery}>
                    {images && images.map(image => {
                        return <ImageGalleryItem
                            key={image.id}
                            url={image.webformatURL}
                            alt={image.tags}
                            largeImage={image.largeImageURL}
                        />
                    })}
                </ul>
                {loading && <Loader />}
                {showButton && <Button onClick={this.loadMoreClick} />}
            </>
        );
    };
};