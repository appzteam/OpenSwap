import React, {useEffect, useState} from 'react';
import TonIcon from '../../TonIcon/TonIcon';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {selectPairByTokens, selectTokenBySymbol} from '../../../store/tokens/tokensSelectors';
import {Pair} from '../../../types/pair';

const TonRate = () => {
    const tokens = useTypedSelector(state => state.tokens)
    const [price, setPrice] = useState(0)
    const [pair, setPair] = useState<Pair | null>(null)

    useEffect(() => {
        const ton = selectTokenBySymbol(tokens,'TONCOIN')
        const usdt = selectTokenBySymbol(tokens, 'USDT')
        setPair(selectPairByTokens(tokens, ton, usdt).pair)
    }, [tokens.pairs])

    useEffect(() => {
        if (pair) setPrice(pair.liquidity.reserve1 / pair.liquidity.reserve0)
    }, [pair])

    return (
        <div>
            1 <TonIcon/> = ${price.toFixed(2)}
        </div>
    );
};

export default TonRate;