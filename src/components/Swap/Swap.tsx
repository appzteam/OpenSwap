import React, {useEffect, useState} from 'react';
import styles from './Swap.module.scss';
import ReactTooltip from 'react-tooltip';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '../../hooks/useActions';
import {selectBalanceByTokenAddress} from '../../store/wallet/walletSelectors';
import {selectTokenByAddress, selectPairByTokens} from '../../store/tokens/tokensSelectors';
import Card from '../Card/Card';
import TokenInput from '../TokenInput/TokenInput';
import SwapDetails from './Details/SwapDetails';

const Swap = () => {
    const wallet = useTypedSelector(state => state.wallet)
    const tokens = useTypedSelector(state => state.tokens)
    const swap = useTypedSelector(state => state.swap)
    const settings = useTypedSelector(state => state.settings)
    const {setSwapTokenIn, setSwapTokenOut, setSwapAmountIn, setSwapAmountOut, connectWallet, sendTransaction, setSwapPair, setSettingsModalOpened} = useActions()
    const [isButtonEnabled, setButtonEnabled] = useState(false)
    const [buttonTitle, setButtonTitle] = useState('')

    useEffect(() => {
        const from = selectTokenByAddress(tokens, localStorage.getItem('swap_token_in') || tokens.pairs[0].token0)!
        const to = selectTokenByAddress(tokens, localStorage.getItem('swap_token_out') || tokens.pairs[0].token1)!
        setSwapTokenIn(from)
        setSwapTokenOut(to)
    }, [])

    useEffect(() => {
        const pair = selectPairByTokens(tokens, swap.token_in, swap.token_out)
        setSwapPair(pair)
    }, [swap.token_in, swap.token_out])

    useEffect(() => {
        setSwapAmountOut(0)
    }, [settings.slippage])

    useEffect(() => {
        setButtonEnabled(false)

        if (wallet.address) {
            if (swap.token_in && swap.token_out && swap.token_in != swap.token_out) {
                if (swap.pair && (swap.pair.liquidity.reserve0 > 0 && swap.pair.liquidity.reserve1 > 0)) {
                    if (swap.amount_in && swap.amount_out) {
                        if (selectBalanceByTokenAddress(wallet, swap.token_in?.address || '') >= swap.amount_in) {
                            setButtonEnabled(true)
                            setButtonTitle('Send transaction')
                        } else {
                            setButtonTitle('Insufficient balance')
                        }
                    } else {
                        setButtonTitle('Enter amount')
                    }
                } else {
                    setButtonTitle('Insufficient liquidity')
                }
            } else {
                setButtonTitle('Select tokens')
            }
        } else {
            setButtonEnabled(true)
            setButtonTitle('Connect wallet')
        }
    }, [wallet.address, swap.amount_in, swap.amount_out, swap.pair])

    const toggleTokens = () => {
        const [token_in, token_out, amount_out] = [swap.token_in, swap.token_out, swap.amount_out]
        setSwapTokenIn(token_out)
        setSwapTokenOut(token_in)
        setSwapAmountIn(amount_out)
        setSwapAmountOut(0)
        setSwapPair({pair: swap.pair, reversed: !swap.is_pair_reversed})
    }

    const onAmountInChanged = (value: number) => {
        setSwapAmountIn(value)
        setSwapAmountOut(0)
    }

    const onAmountOutChanged = (value: number) => {
        setSwapAmountIn(0)
        setSwapAmountOut(value)
    }

    const buttonAction = () => {
        if (wallet.address) {
            if (swap.pair) {
                const to = wallet.address // in the future to pair address or some router contract
                sendTransaction(to, swap.amount_in, {
                    action: 'swap',
                    amountIn: swap.amount_in,
                    amountOutMin: swap.amount_out_min
                })
            }
        } else {
            connectWallet()
        }
    }

    return (
        <Card title="Swap" headerButtons={[
            {icon: 'sync-alt', tip: 'Refresh'},
            {icon: 'cogs', tip: 'Settings', action: () => setSettingsModalOpened(true)}
        ]}>

            <div className={styles.form}>
                <TokenInput token={swap.token_in} onTokenChange={setSwapTokenIn} amount={swap.amount_in}
                            onAmountChange={onAmountInChanged} showBalanceMaxButton={true}/>

                <div className={styles.toggle}>
                    <FontAwesomeIcon icon="arrow-down" onClick={() => toggleTokens()} tabIndex={2}
                                     data-tip="Toggle tokens"/>
                </div>

                <TokenInput token={swap.token_out} onTokenChange={setSwapTokenOut} amount={swap.amount_out}
                            onAmountChange={onAmountOutChanged}/>
            </div>

            {swap.token_in && swap.token_out && (swap.amount_in || swap.amount_out) ?
                <SwapDetails/> : null
            }

            <button className="cardButton" onClick={() => buttonAction()} disabled={!isButtonEnabled}>
                {buttonTitle}
            </button>

            <ReactTooltip place="bottom" effect="solid" delayShow={700} html={true}/>
        </Card>
    );
};

export default Swap;