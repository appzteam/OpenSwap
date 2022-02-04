import React, {useEffect, useState} from 'react';
import Card from '../Card/Card';
import styles from './Liquidity.module.scss';
import {Link} from 'react-router-dom';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {selectPairByAddress, selectTokenByAddress} from '../../store/tokens/tokensSelectors';
import {Pair, PairExtended} from '../../types/pair';
import {selectBalanceByTokenAddress} from '../../store/wallet/walletSelectors';
import {useNavigate} from 'react-router-dom';
import {Token} from '../../types/tokens';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Liquidity = () => {
        const wallet = useTypedSelector(state => state.wallet)
        const tokens = useTypedSelector(state => state.tokens)
        const navigate = useNavigate();
        const [pairs, setPairs] = useState<PairExtended[]>([])
        const [expandedItems, setExpandedItems] = useState<number[]>([])

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

        const navigateToAddLiquidity = (token0: Token, token1: Token) => {
            navigate({
                pathname: 'add',
                search: '?token0=' + token0.symbol + '&token1=' + token1.symbol,
            });
        }

        const navigateToRemoveLiquidity = (token0: Token, token1: Token) => {
            navigate({
                pathname: 'remove',
                search: '?token0=' + token0.symbol + '&token1=' + token1.symbol,
            });
        }

        const isExpanded = (i: number) => {
            return expandedItems.indexOf(i) !== -1
        }

        const toggleExpand = (i: number) => {
            if (isExpanded(i)) {
                setExpandedItems(expandedItems.filter(item => item != i))
            } else {
                setExpandedItems(expandedItems.concat(i))
            }
        }

        const getStakeDetails = (pair: Pair | PairExtended) : {balance: number, share: number, token0: number, token1: number} => {
            const lp = selectBalanceByTokenAddress(wallet, pair.pair_address) || 0
            const total = pair.liquidity.reserve0 * pair.liquidity.reserve1
            const share = lp / total
            return {
                balance: lp,
                share: share * 100,
                token0: share * pair.liquidity.reserve0,
                token1: share * pair.liquidity.reserve1
            }
        }

        return (
            <Card title="My Liquidity">
                {pairs.length ?
                    <div className={styles.list}>

                        {pairs.map((pair, i) =>
                            <div className={[styles.item, isExpanded(i) ? styles.expanded : ''].join(' ')} key={i}>

                                <div className={styles.header} onClick={() => toggleExpand(i)}>
                                    <div className={styles.images}>
                                        <img className={styles.image0} src={pair.token0.image}
                                             alt={pair.token0.name}/>
                                        <img className={styles.image1} src={pair.token1.image}
                                             alt={pair.token1.name}/>
                                    </div>
                                    <div className={styles.info}>
                                        <div className={styles.symbol}>{pair.token0.symbol + '/' + pair.token1.symbol}</div>
                                        <div className={styles.balance}>
                                            {(Math.floor(getStakeDetails(pair).balance * 100000) / 100000)} LP
                                        </div>
                                    </div>
                                    <div className="spacer"/>
                                    <div className={styles.expand}>
                                        <FontAwesomeIcon icon={isExpanded(i) ? "chevron-up" : "chevron-down"}/>
                                    </div>
                                </div>

                                <div className={styles.body}>
                                    <div className={styles.row}>
                                        <div className={styles.title}>{pair.token0.symbol} in the pool</div>
                                        <div className={styles.value}>{(Math.floor(getStakeDetails(pair).token0 * 100000) / 100000)}</div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.title}>{pair.token1.symbol} in the pool</div>
                                        <div className={styles.value}>{(Math.floor(getStakeDetails(pair).token1 * 100000) / 100000)}</div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.title}>Pool share</div>
                                        <div className={styles.value}>{(Math.floor(getStakeDetails(pair).share * 1000) / 1000) + '%'}</div>
                                    </div>

                                    <div className={styles.buttons}>
                                        <button className="cardButton"
                                                onClick={() => navigateToRemoveLiquidity(pair.token0, pair.token1)}>
                                            <FontAwesomeIcon icon="minus"/> Remove
                                        </button>
                                        <button className="cardButton"
                                                onClick={() => navigateToAddLiquidity(pair.token0, pair.token1)}>
                                            <FontAwesomeIcon icon="plus"/> Add
                                        </button>
                                    </div>
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
    }
;

export default Liquidity;