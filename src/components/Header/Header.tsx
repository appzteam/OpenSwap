import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Header.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import TonRate from './TonRate/TonRate';
import TonIcon from '../TonIcon/TonIcon';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '../../hooks/useActions';
import { ReactComponent as Logo } from '../../assets/openswap-logo.svg';

const Header: React.FC = () => {
    const wallet = useTypedSelector(state => state.wallet)
    const {connectWallet, disconnectWallet} = useActions()

    useEffect(() => {
        if (wallet.autoconnect) connectWallet()
    }, [])

    return (
        <header className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Logo/>
                </div>
                <div className={styles.navigation}>
                    <NavLink to="/swap" className={({ isActive }) => isActive ? styles.currentPage : ''}>
                        Exchange
                    </NavLink>
                    <NavLink to="/liquidity" className={({ isActive }) => isActive ? styles.currentPage : ''}>
                        Liquidity
                    </NavLink>
                    {/*<NavLink to="/nft" className={({ isActive }) => isActive ? styles.currentPage : ''}>*/}
                    {/*    NFT*/}
                    {/*</NavLink>*/}
                    <NavLink to="/bridges" className={({ isActive }) => isActive ? styles.currentPage : ''}>
                        Bridges
                    </NavLink>
                </div>
                <div className="spacer"/>
                <div className={styles.rate}>
                    <TonRate/>
                </div>
                {
                    !wallet.connecting ? (
                        wallet.address ?
                            <div className={styles.wallet}>
                                <div className={styles.balance}
                                     title={"Balance: " + wallet!.balances[0].amount.toString()}>
                                    {Math.floor(wallet.balances[0].amount * 1000) / 1000} <TonIcon/>
                                </div>
                                <div className={styles.address} onClick={() => disconnectWallet()}>
                                    <FontAwesomeIcon icon="wallet"/>
                                    <span>{wallet.address.substr(0, 6) + '...' + wallet.address.substr(-3, 3)}</span>
                                </div>
                            </div>
                            :
                            <div className={styles.connectButton} onClick={() => connectWallet()}>
                                <FontAwesomeIcon icon="wallet"/>
                                <div>Connect Wallet</div>
                            </div>
                    ) : null
                }
            </div>
        </header>
    );
};

export default Header;