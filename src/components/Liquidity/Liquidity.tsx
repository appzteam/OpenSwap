import React, {useEffect, useState} from 'react';
import Card from '../Card/Card';
import styles from './Liquidity.module.scss';
import {Link} from 'react-router-dom';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {selectPairByAddress, selectTokenByAddress} from '../../store/tokens/tokensSelectors';
import {PairExtended} from '../../types/pair';
import {selectBalanceByTokenAddress} from '../../store/wallet/walletSelectors';
import { useNavigate } from 'react-router-dom';
import {Token} from '../../types/tokens';

const Liquidity = () => {
    const wallet = useTypedSelector(state => state.wallet)
    const tokens = useTypedSelector(state => state.tokens)
    const navigate = useNavigate();
    const [pairs, setPairs] = useState<PairExtended[]>([])

    const navigateToAddLiquidity = (token0: Token, token1: Token) => {
        navigate({
            pathname: 'add',
            search: '?token0='+token0.symbol+'&token1='+token1.symbol,
        });
    }

    useEffect(() => {
        let _pairs: PairExtended[] = []
        wallet.balances.forEach(balance => {
            const pair = selectPairByAddress(tokens, balance.address)
            if (pair && !_pairs.find(item => item.pair_address == pair.pair_address)) {
                _pairs = _pairs.concat({
                    ...pair,
                    token0: selectTokenByAddress(tokens, pair.token0)!,
                    token1: selectTokenByAddress(tokens, pair.token1)!
                })
            }
        })
        setPairs(_pairs)
    }, [wallet.balances])

    return (
        <Card title="Your Liquidity">
            {pairs.length ?
                <div className={styles.list}>
                    {pairs.map((pair, i) =>
                        <div className={styles.item} key={i} onClick={() => navigateToAddLiquidity(pair.token0, pair.token1)}>
                            <div className={styles.images}>
                                <img className={styles.image0} src={pair.token0.image}
                                     alt={pair.token0.name}/>
                                <img className={styles.image1} src={pair.token1.image}
                                     alt={pair.token1.name}/>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.symbol}>{pair.token0.symbol + '-' + pair.token1.symbol + ' LP'}</div>
                            </div>
                            <div className="spacer"/>
                            <div className={styles.balance}>
                                {selectBalanceByTokenAddress(wallet, pair.pair_address) || '–'}
                            </div>
                        </div>
                    )}
                </div>
                :
                <div className={styles.emptyList}>
                    No liquidity found
                </div>
            }
            <Link to="add">
                <button className="cardButton">
                    Add Liquidity
                </button>
            </Link>
        </Card>
    );
};

export default Liquidity;