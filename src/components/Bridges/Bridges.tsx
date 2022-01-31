import React from 'react';
import Card from '../Card/Card';
import styles from './Bridges.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {selectTokenBySymbol} from '../../store/tokens/tokensSelectors';


const Bridges = () => {
    const tokens = useTypedSelector(state => state.tokens)

    return (
        <Card title="Bridges">
            <a className={styles.item} href="https://ton.org/bridge/bsc" target="_blank">
                <div className={styles.token}>
                    <img src={selectTokenBySymbol(tokens, 'TONCOIN')?.image} alt=""/>
                    <div className={styles.info}>
                        <div className={styles.symbol}>TON</div>
                        <div className={styles.network}>Native</div>
                    </div>
                </div>
                <FontAwesomeIcon icon="exchange-alt"/>
                <div className={styles.token}>
                    <img src={selectTokenBySymbol(tokens, 'BNB')?.image} alt=""/>
                    <div className={styles.info}>
                        <div className={styles.symbol}>TON</div>
                        <div className={styles.network}>BEP-20</div>
                    </div>
                </div>
            </a>

            <a className={styles.item} href="https://ton.org/bridge/" target="_blank">
                <div className={styles.token}>
                    <img src={selectTokenBySymbol(tokens, 'TONCOIN')?.image} alt=""/>
                    <div className={styles.info}>
                        <div className={styles.symbol}>TON</div>
                        <div className={styles.network}>Native</div>
                    </div>
                </div>
                <FontAwesomeIcon icon="exchange-alt"/>
                <div className={styles.token}>
                    <img src={selectTokenBySymbol(tokens, 'ETH')?.image} alt=""/>
                    <div className={styles.info}>
                        <div className={styles.symbol}>TON</div>
                        <div className={styles.network}>ERC-20</div>
                    </div>
                </div>
            </a>
        </Card>
    );
};

export default Bridges;