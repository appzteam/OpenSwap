import React, {useEffect, useState} from 'react';
import styles from './SwapDetails.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {useActions} from '../../../hooks/useActions';

const SwapDetails = () => {
    const settings = useTypedSelector(state => state.settings)
    const swap = useTypedSelector(state => state.swap)
    const {setSwapAmountIn, setSwapAmountOut, setSwapAmountOutMin} = useActions()
    const [price, setPrice] = useState(0)
    const [priceImpact, setPriceImpact] = useState(0)
    const [providerFee, setProviderFee] = useState(0)

    useEffect(() => {
        if (swap.pair) {
            if (swap.amount_in && swap.amount_out) return

            let amount_in = 0, amount_in_with_fee = 0, reserve_b_after = 0, amount_out = 0;
            const full_liquidity = swap.pair.liquidity.reserve0 * swap.pair.liquidity.reserve1;

            if (swap.amount_in && !swap.amount_out) {
                amount_in = swap.amount_in
                amount_in_with_fee = amount_in * (1 - settings.fee)
                reserve_b_after = full_liquidity / ((!swap.is_pair_reversed ? swap.pair.liquidity.reserve0 : swap.pair.liquidity.reserve1) + amount_in_with_fee);
                amount_out = (!swap.is_pair_reversed ? swap.pair.liquidity.reserve1 : swap.pair.liquidity.reserve0) - reserve_b_after;

                setSwapAmountOut(amount_out)
            }
            if (swap.amount_out && !swap.amount_in) {
                amount_out = swap.amount_out;
                reserve_b_after = (!swap.is_pair_reversed ? swap.pair.liquidity.reserve1 : swap.pair.liquidity.reserve0) - amount_out
                amount_in_with_fee = (full_liquidity / reserve_b_after) - (!swap.is_pair_reversed ? swap.pair.liquidity.reserve0 : swap.pair.liquidity.reserve1)
                amount_in = amount_in_with_fee / (1 - settings.fee)

                setSwapAmountIn(amount_in)
            }

            const provider_fee = amount_in * settings.fee
            const market_price = amount_in_with_fee / amount_out;
            const mid_price = !swap.is_pair_reversed ? swap.pair.liquidity.reserve0 / swap.pair.liquidity.reserve1 : swap.pair.liquidity.reserve1 / swap.pair.liquidity.reserve0;
            const price_impact = 1 - (mid_price / market_price);

            setPrice(amount_out / amount_in)
            setPriceImpact(price_impact * 100)
            setProviderFee(provider_fee)
            setSwapAmountOutMin(amount_out * (1 - (settings.slippage / 100)))
        }
    }, [swap.pair, swap.is_pair_reversed, swap.amount_in, swap.amount_out])

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
                    {'1 ' + swap.token_in?.symbol + ' = ' + (Math.floor(price * 100000) / 100000) + ' ' + swap.token_out?.symbol}
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.title}>
                    <span>Price impact</span>
                    <FontAwesomeIcon
                        icon={['far', 'question-circle']}
                        data-tip="The difference between the market price and <br>estimated price due to trade size"
                        data-for="additional-info"/>
                </div>
                <div
                    className={[styles.value, priceImpact > 3 && priceImpact < 10 ? styles.impactMiddle : '', priceImpact >= 10 ? styles.impactLarge : ''].join(' ')}>
                    {(Math.round(priceImpact * 100) / 100) + '%'}
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.title}>
                    <span>Minimum receive</span>
                    <FontAwesomeIcon
                        icon={['far', 'question-circle']}
                        data-tip="Your transaction will revert if there is a large, <br>unfavorable price movement before it is confirmed"
                        data-for="additional-info"/>
                </div>
                <div className={styles.value}>
                    {(Math.floor(swap.amount_out_min * 100000) / 100000) + ' ' + swap.token_out?.symbol}
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.title}>
                    <span>Provider fee</span>
                    <FontAwesomeIcon
                        icon={['far', 'question-circle']}
                        data-tip={'For each trade a ' + settings.fee * 100 + '% fee is paid'}
                        data-for="additional-info"/>
                </div>
                <div className={styles.value}>
                    {(Math.floor(providerFee * 10000) / 10000) + ' ' + swap.token_in?.symbol}
                </div>
            </div>

            <ReactTooltip id="additional-info" place="bottom" effect="solid" delayShow={200} html={true}/>
        </div>
    );
};

export default SwapDetails;