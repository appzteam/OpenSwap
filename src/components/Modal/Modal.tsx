import React, {ReactNode, useEffect} from 'react';
import styles from './Modal.module.scss';
import {createPortal} from 'react-dom';

type props = {
    children: ReactNode,
    title?: string,
    isOpen: boolean,
    onRequestClose: () => void
};

const Modal = ({children, title, isOpen, onRequestClose}: props) => {
    const keyHandler = (
        (e: KeyboardEvent) => {
            e.stopImmediatePropagation();
            if (e.key === 'Escape') onRequestClose();
        }
    ) as EventListenerOrEventListenerObject;

    useEffect(() => {
        window.addEventListener('keyup', keyHandler);
        return () => window.removeEventListener('keyup', keyHandler);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => document.body.classList.remove('no-scroll');
    }, [isOpen]);

    return isOpen ? createPortal(
        <div className={styles.wrapper}>
            <div className={[styles.overlay, 'animate__animated', 'animate__fadeIn'].join(' ')} onClick={onRequestClose}>
                <div className={styles.closeIcon}/>
            </div>
            <div className={styles.containerWrapper}>
                <div className="spacer"/>
                <div className={[styles.container, 'animate__animated', 'animate__zoomIn'].join(' ')}>
                    {title && <div className={styles.title}>{title}</div>}
                    {children}
                </div>
                <div className="spacer"/>
            </div>
        </div>
        , document.body) : null;
};

export default Modal;