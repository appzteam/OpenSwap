import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Token} from '../../types/tokens';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import TokenSelect from '../TokenSelect/TokenSelect';
import styles from './TokenInput.module.scss';
import {selectBalanceByTokenAddress} from '../../store/wallet/walletSelectors';

type props = {
    token: Token | null,
    onTokenChange: (c: Token) => void,
    amount: number,
    onAmountChange: (c: number) => void,
    showBalance?: boolean,
    showBalanceMaxButton?: boolean
}

const TokenInput = ({
                        token,
                        onTokenChange,
                        amount,
                        onAmountChange,
                        showBalance = true,
                        showBalanceMaxButton = false
                    }: props) => {
    const wallet = useTypedSelector(state => state.wallet)
    const [isSelectOpened, setSelectOpened] = useState(false)

    return (
        <div className={styles.wrapper}>

            <div className={styles.header}>

                <div className={styles.select} onClick={() => setSelectOpened(true)}>
                    {token ? (
                        <img className={styles.image} src={token.image} alt={token.name}/>
                    ) : (
                        <FontAwesomeIcon className={styles.image} icon={['far', 'question-circle']}/>
                    )}
                    <div className={styles.symbol}>
                        {token ? token.symbol : 'SELECT'}
                    </div>
                    <FontAwesomeIcon icon="chevron-down" className={styles.arrow}/>
                </div>

                <div className="spacer"/>

                {showBalance && wallet.address && token ?
                    <div className={styles.balance} key={1}>
                        Balance: {selectBalanceByTokenAddress(wallet, token.address)}
                    </div> : null
                }

                {showBalanceMaxButton && wallet.address && token ?
                    <a className={styles.balanceMax} key={2}
                       onClick={() => onAmountChange(selectBalanceByTokenAddress(wallet, token!.address))}>
                        Max
                    </a> : null
                }

            </div>

            <div className={styles.inputWrapper}>
                <input placeholder="0" type="text"
                       value={amount ? (Math.floor(amount * 100000) / 100000).toString() : ''}
                    // FIX IT ^^^ (не вставляется точка и запятая)
                       onKeyPress={(e) => !/[0-9.,]/.test(e.key) ? e.preventDefault() : true}
                       onChange={(e) => onAmountChange(Number(e.target.value.replace(',', '.')))}/>
            </div>

            <TokenSelect isOpen={isSelectOpened} onRequestClose={() => setSelectOpened(false)}
                         selected={token} setSelected={onTokenChange}/>
        </div>
    );
};

export default TokenInput;