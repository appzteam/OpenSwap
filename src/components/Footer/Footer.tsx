import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.caption}>
                    Made with &lt;3 for TON
                </div>
            </div>
        </footer>
    );
};

export default Footer;