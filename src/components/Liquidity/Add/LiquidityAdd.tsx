import React, {useEffect, useState} from 'react';
import styles from './LiquidityAdd.module.scss';
import Card from '../../Card/Card';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {useActions} from '../../../hooks/useActions';
import TokenInput from '../../TokenInput/TokenInput';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {selectPairByTokens, selectTokenBySymbol} from '../../../store/tokens/tokensSelectors';
import {selectBalanceByTokenAddress} from '../../../store/wallet/walletSelectors';
import ReactTooltip from 'react-tooltip';
import LiquidityAddDetails from './Details/LiquidityAddDetails';
import {Pair} from '../../../types/pair';
import {WalletToken} from '../../../types/wallet';
import { useSearchParams } from 'react-router-dom';

const LiquidityAdd = () => {
    const wallet = useTypedSelector(state => state.wallet)
    const settings = useTypedSelector(state => state.settings)
    const pool = useTypedSelector(state => state.pool)
    const tokens = useTypedSelector(state => state.tokens)
    const {
        setPoolToken0,
        setPoolToken1,
        setPoolAmount0,
        setPoolAmount1,
        setPoolPair,
        setSettingsModalOpened,
        connectWallet,
        sendTransaction
    } = useActions()
    const [isButtonEnabled, setButtonEnabled] = useState(false)
    const [buttonTitle, setButtonTitle] = useState('')
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const token0 = searchParams.get('token0') || ''
        const token1 = searchParams.get('token1') || ''
        setPoolToken0(selectTokenBySymbol(tokens, token0.toUpperCase()))
        setPoolToken1(selectTokenBySymbol(tokens, token1.toUpperCase()))
    }, [])

    useEffect(() => {
        const pair = selectPairByTokens(tokens, pool.token0, pool.token1)
        setPoolPair(pair)
    }, [pool.token0, pool.token1])

    useEffect(() => {
        setPoolAmount1(0)
    }, [settings.slippage])

    useEffect(() => {
        setButtonEnabled(false)

        if (wallet.address) {
            if (pool.token0 && pool.token1 && pool.token0 != pool.token1) {
                if (pool.amount0 && pool.amount1) {
                    if (selectBalanceByTokenAddress(wallet, pool.token0?.address || '') >= pool.amount0 && selectBalanceByTokenAddress(wallet, pool.token1?.address || '') >= pool.amount1) {
                        setButtonEnabled(true)
                        setButtonTitle('Send transaction')
                    } else {
                        setButtonTitle('Insufficient balance')
                    }
                } else {
                    setButtonTitle('Enter amount')
                }
            } else {
                setButtonTitle('Select tokens')
            }
        } else {
            setButtonEnabled(true)
            setButtonTitle('Connect wallet')
        }
    }, [wallet.address, pool.amount0, pool.amount1, pool.token0, pool.token1])


    const toggleTokens = () => {
        const [token0, token1, amount0, amount1] = [pool.token0, pool.token1, pool.amount0, pool.amount1]
        setPoolToken0(token1)
        setPoolToken1(token0)
        setPoolAmount0(amount1)
        if (pool.pair) {
            setPoolAmount1(0)
        } else {
            setPoolAmount1(amount0)
        }
        setPoolPair({pair: pool.pair, reversed: !pool.is_pair_reversed})
    }

    const onAmount0Changed = (value: number) => {
        setPoolAmount0(value)
        if (pool.pair) setPoolAmount1(0)
    }

    const onAmount1Changed = (value: number) => {
        setPoolAmount1(value)
        if (pool.pair) setPoolAmount0(0)
    }

    const buttonAction = () => {
        if (wallet.address) {
            if (pool.token0 && pool.token1 && pool.token0 != pool.token1) {
                const to = wallet.address // in the future to some contract
                sendTransaction(to, 0.01, {
                    action: 'addLiquidity',
                    token0: pool.token0,
                    token1: pool.token1,
                    amount0: pool.amount0,
                    amount1: pool.amount1,
                    amountLPMin: pool.min_lp_amount
                })

                // Just for presentation purposes only
                const pairAddress = pool.pair ? pool.pair.pair_address : pool.token0.symbol + pool.token1.symbol + '-PAIR-CONTRACT'
                if (!pool.pair) {
                    const customPairs = JSON.parse(localStorage.getItem('custom_pairs') || '[]') as Pair[]
                    customPairs.push({
                        token0: pool.token0.address,
                        token1: pool.token1.address,
                        pair_address: pairAddress,
                        volume: 0,
                        liquidity: {
                            reserve0: pool.amount0,
                            reserve1: pool.amount1
                        }
                    })
                    localStorage.setItem('custom_pairs', JSON.stringify(customPairs))
                }
                let liquidityBalances = JSON.parse(localStorage.getItem('custom_balances') || '[]') as WalletToken[]
                const pairLPBalance = liquidityBalances.find(balance => balance.address == pairAddress)?.amount || 0
                liquidityBalances = liquidityBalances.filter(balance => balance.address !== pairAddress)
                liquidityBalances.push({
                    address: pairAddress,
                    amount: pool.min_lp_amount + pairLPBalance
                })
                localStorage.setItem('custom_balances', JSON.stringify(liquidityBalances))
            }
        } else {
            connectWallet()
        }
    }

    return (
        <Card title="Add Liquidity"
              backButtonLink="/liquidity"
              headerButtons={[
                  {icon: 'sync-alt', tip: 'Refresh'},
                  {icon: 'cogs', tip: 'Settings', action: () => setSettingsModalOpened(true)}
              ]}
        >
            <div className={styles.form}>

                {!pool.pair && pool.token0 && pool.token1 && pool.token0 != pool.token1 ?
                    <div className={styles.warn}>
                        <div className={styles.warnText}>You are the first liquidity provider!</div>
                        <div className={styles.warnDesc}>The ratio of tokens you add will set the price of this pool.</div>
                    </div> : null
                }

                <TokenInput token={pool.token0} onTokenChange={setPoolToken0} amount={pool.amount0}
                            onAmountChange={onAmount0Changed} showBalanceMaxButton={true}/>

                <div className={styles.toggle}>
                    <FontAwesomeIcon icon="plus" onClick={() => toggleTokens()} tabIndex={2}
                                     data-tip="Toggle tokens"/>
                </div>

                <TokenInput token={pool.token1} onTokenChange={setPoolToken1} amount={pool.amount1}
                            onAmountChange={onAmount1Changed} showBalanceMaxButton={true}/>
            </div>

            {pool.token0 && pool.token1 && (pool.amount0 || pool.amount1) ?
                <LiquidityAddDetails/> : null
            }

            <button className="cardButton" onClick={() => buttonAction()} disabled={!isButtonEnabled}>
                {buttonTitle}
            </button>

            <ReactTooltip place="bottom" effect="solid" delayShow={700} html={true}/>
        </Card>
    );
};

export default LiquidityAdd;