import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    };

    state = {
        showModal: false,
    };

    render() {
        const { url, alt, largeImage } = this.props;

        return (
            <>
                <li className={css.imageGalleryItem}>
                    <img
                        src={url}
                        alt={alt}
                        className={css.imageGalleryItemImg}
                    />
                </li>
                {this.state.showModal &&
                    <Modal
                    largeImage={largeImage}
                    alt={alt}
                    />
                }
            </>
        );
    };  
};
