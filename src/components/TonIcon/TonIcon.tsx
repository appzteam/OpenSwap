import React from 'react';
import { ReactComponent as Icon } from '../../assets/toncoin.svg';
import style from './TonIcon.module.scss';

const TonIcon = () => {
    return (
        <>
            <Icon className={style.element}/>
        </>
    );
};

export default TonIcon;