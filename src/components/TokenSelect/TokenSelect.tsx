import React, {useState} from 'react';
import Modal from '../Modal/Modal';
import styles from './TokenSelect.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import {Token} from '../../types/tokens';
import {TOKENS_MOCK} from '../../mocks/tokens';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {selectBalanceByTokenAddress} from '../../store/wallet/walletSelectors';

type props = {
    isOpen: boolean,
    onRequestClose: () => void,
    selected: Token | null,
    setSelected: (c: Token) => void
};

const TokenSelect = ({isOpen, onRequestClose, selected, setSelected}: props) => {
    const wallet = useTypedSelector(state => state.wallet)
    const tokens = TOKENS_MOCK
    const [searchText, setSearchText] = useState('')

    const searchFilter = (token: Token) => {
        return searchText === '' || token.symbol.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || token.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    }

    const selectToken = (token: Token) => {
        setSelected(token)
        onRequestClose()
    }

    const displayBalance = (token: Token) => {
        const balance = selectBalanceByTokenAddress(wallet, token.address) || 0
        return Math.floor(balance * 100000) / 100000
    }

    return (
        <Modal title="Select token" isOpen={isOpen} onRequestClose={onRequestClose}>

            <div className={styles.search}>
                <input type="text" placeholder="Search by symbol, name or address" value={searchText}
                       onChange={(e) => setSearchText(e.target.value)}/>
                <FontAwesomeIcon icon="search" className={styles.searchIcon}/>
            </div>
            <div className={styles.list}>
                {tokens.filter(searchFilter).map((token, i) =>
                    <div className={[styles.token, token === selected ? styles.selected : ''].join(' ')}
                         onClick={() => selectToken(token)}
                         key={i}>
                        <img className={styles.image} src={token.image} alt={token.name}/>
                        <div className={styles.info}>
                            <div className={styles.symbol}>{token.symbol}</div>
                            <div className={styles.name}>{token.name}</div>
                        </div>
                        <div className="spacer"/>
                        <div className={styles.balance}>{ displayBalance(token) || '–' }</div>
                    </div>
                )}
            </div>

            <ReactTooltip place="bottom" effect="solid" html={true}/>
        </Modal>
    );
};

export default TokenSelect;