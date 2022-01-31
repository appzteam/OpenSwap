import {WalletAction, WalletActionTypes, WalletToken} from '../../types/wallet';
import {Dispatch} from 'redux';
import {WALLET_MOCK} from '../../mocks/wallet';

export const disconnectWallet = () => {
    return async (dispatch: Dispatch<WalletAction>) => {
        dispatch({type: WalletActionTypes.SET_AUTOCONNECT, payload: false})
        dispatch({type: WalletActionTypes.DISCONNECT_WALLET})
    }
}

export const connectWallet = () => {
    return async (dispatch: Dispatch<WalletAction>) => {
        dispatch({type: WalletActionTypes.SET_AUTOCONNECT, payload: true})
        dispatch({type: WalletActionTypes.CONNECT_WALLET})

        // @ts-ignore
        const provider = window.ton;

        if (provider) {
            const accounts = await provider.send('ton_requestAccounts');
            let balance = await provider.send('ton_getBalance');

            // Just for presentation purposes only
            if (!balance) balance = WALLET_MOCK.balances[0].amount * 1000000000
            const customBalances = JSON.parse(localStorage.getItem('custom_balances') || '[]') as WalletToken[]

            dispatch({
                type: WalletActionTypes.CONNECT_WALLET_SUCCESS, payload: {
                    address: accounts[0],
                    balances: ([
                        {
                            address: 'TONCOIN-SMART-CONTRACT',
                            amount: balance / 1000000000
                        }
                    ] as WalletToken[]).concat(WALLET_MOCK.balances).concat(customBalances)
                }
            })
        } else {
            // dispatch({
            //     type: WalletActionTypes.WALLET_ERROR,
            //     payload: 'Please, install TON Wallet extension to your browser.'
            // })

            dispatch({
                type: WalletActionTypes.CONNECT_WALLET_SUCCESS, payload: WALLET_MOCK
            })
        }
    }
}

export const sendTransaction = (address: string, amount: number, data: {}) => {
    return async (dispatch: Dispatch<WalletAction>) => {

        // @ts-ignore
        const provider = window.ton;

        if (provider) {
            dispatch({type: WalletActionTypes.SEND_TRANSACTION})

            try {
                let comment = ''
                Object.keys(data).forEach((key, i) => {
                    // @ts-ignore
                    comment += key + ':' + data[key] + (i !== Object.keys(data).length - 1 ? '#' : '');
                })

                console.log(comment)

                const transaction = await provider.send('ton_sendTransaction', [{
                    to: address,
                    value: amount * 1000000000,
                    data: comment
                }])

                if (String(transaction).indexOf('Error') !== -1) throw new Error(transaction);

                setTimeout(() => {
                    dispatch({type: WalletActionTypes.SEND_TRANSACTION_SUCCESS})
                }, 2000)

            } catch (e) {
                console.log(e)

                dispatch({
                    type: WalletActionTypes.SEND_TRANSACTION_ERROR,
                    payload: 'Error!'
                })
            }
        } else {
            dispatch({
                type: WalletActionTypes.SEND_TRANSACTION_ERROR,
                payload: 'Please, install TON Wallet extension to your browser.'
            })
        }
    }
}