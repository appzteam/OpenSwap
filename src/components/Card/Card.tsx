import React from 'react';
import styles from './Card.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {Link} from 'react-router-dom';

interface CardHeaderButton {
    icon: IconProp;
    tip?: string;
    action?: () => void;
}

type props = {
    title: string,
    backButtonLink?: string,
    headerButtons?: CardHeaderButton[],
    children: React.ReactNode
}

const Card = ({title, backButtonLink = '', headerButtons = [], children}: props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    {backButtonLink ?
                        <Link to={backButtonLink} className={styles.backButton}>
                            <FontAwesomeIcon icon="chevron-left"/>
                        </Link> : null
                    }
                    <div className={styles.title}>{title}</div>
                    <div className="spacer"/>
                    {headerButtons?.map((button, i) =>
                        <div className={[styles.rightButton, styles[button.icon as string] || ''].join(' ')}
                             onClick={button.action} data-tip={button.tip} key={i} tabIndex={i}>
                            <FontAwesomeIcon icon={button.icon}/>
                        </div>
                    )}

                    <ReactTooltip place="bottom" effect="solid" delayShow={700} html={true}/>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Card;