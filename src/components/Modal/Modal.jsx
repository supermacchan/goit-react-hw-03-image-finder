import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

export class Modal extends Component {
    static propTypes = {
        largeImage: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    }
    render() {
        const { largeImage, alt } = this.props;
        const modalRoot = document.querySelector('#modal-root');
        
        return createPortal(
            <div className={css.overlay}>
                <div className={css.modal}>
                    <img src={largeImage} alt={alt} />
                </div>
            </div>,
            modalRoot,
        );
    };
}