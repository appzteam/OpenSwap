import React, {useEffect, useState} from 'react';
import styles from './LiquidityAddDetails.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';
import {useActions} from '../../../../hooks/useActions';

const LiquidityAddDetails = () => {
    const settings = useTypedSelector(state => state.settings)
    const pool = useTypedSelector(state => state.pool)
    const {setPoolAmount0, setPoolAmount1, setPoolMinLPAmount} = useActions()
    const [price, setPrice] = useState(0)
    const [poolShare, setPoolShare] = useState(0)

    useEffect(() => {
        if (pool.pair) {
            if (pool.amount0 && pool.amount1) return

            let amount0 = 0, amount1 = 0
            const full_liquidity = pool.pair.liquidity.reserve0 * pool.pair.liquidity.reserve1
            let liquidity_ratio = pool.pair.liquidity.reserve1 / pool.pair.liquidity.reserve0

            if (pool.is_pair_reversed) liquidity_ratio = 1/liquidity_ratio

            if (pool.amount0 && !pool.amount1) {
                amount0 = pool.amount0
                amount1 = amount0 * liquidity_ratio

                setPoolAmount1(amount1)
            }
            if (pool.amount1 && !pool.amount0) {
                amount1 = pool.amount1
                amount0 = amount1 / liquidity_ratio

                setPoolAmount0(amount0)
            }

            const share = amount0*amount1 / (full_liquidity+amount0*amount1)

            setPrice(amount1 / amount0)
            setPoolShare(share * 100)
            setPoolMinLPAmount(amount0*amount1 * (settings.slippage / 100))
        } else {
            setPoolMinLPAmount(pool.amount1*pool.amount0 * (settings.slippage / 100))
            setPrice(pool.amount1 / pool.amount0)
            setPoolShare(100)
        }
    }, [pool.pair, pool.is_pair_reversed, pool.amount0, pool.amount1])

    return (
        <div className={[styles.wrapper, 'animate__animated', 'animate__fadeIn'].join(' ')}>

            <div className={styles.row}>
                <div className={styles.title}>
                    <span>Price</span>
                    <FontAwesomeIcon
                        icon={['far', 'question-circle']}
                        data-tip="The average price of your trade"
                        data-for="additional-info"/>
                </div>
                <div className={styles.value}>
                    {'1 ' + pool.token0?.symbol + ' = ' + (Math.floor(price * 100000) / 100000) + ' ' + pool.token1?.symbol}
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.title}>
                    <span>Pool share</span>
                    <FontAwesomeIcon
                        icon={['far', 'question-circle']}
                        data-tip="Your share in the pool after adding liquidity."
                        data-for="additional-info"/>
                </div>
                <div
                    className={styles.value}>
                    {(Math.floor(poolShare * 100) / 100) + '%'}
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.title}>
                    <span>Minimum LP receive</span>
                    <FontAwesomeIcon
                        icon={['far', 'question-circle']}
                        data-tip="If the transaction is successful, you will receive at least this amount of Liquidity Pool tokens."
                        data-for="additional-info"/>
                </div>
                <div
                    className={styles.value}>
                    {(Math.round(pool.min_lp_amount * 10000) / 10000) + ' ' + (!pool.is_pair_reversed ? pool.token0?.symbol : pool.token1?.symbol) + '-' + (!pool.is_pair_reversed ? pool.token1?.symbol : pool.token0?.symbol) + ' LP'}
                </div>
            </div>

            <ReactTooltip id="additional-info" place="bottom" effect="solid" delayShow={200} html={true}/>
        </div>
    );
};

export default LiquidityAddDetails;