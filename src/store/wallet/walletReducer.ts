import {WalletAction, WalletActionTypes, WalletState} from '../../types/wallet';


const initialState: WalletState = {
    autoconnect: Boolean(JSON.parse(localStorage.getItem('autoconnect') || 'false')),
    address: null,
    balances: [],
    connecting: false,
    sending: false,
    error: null
}

export const walletReducer = (state: WalletState = initialState, action: WalletAction): WalletState => {
    switch (action.type) {
        case WalletActionTypes.CONNECT_WALLET:
            return {...state, connecting: true, error: null}
        case WalletActionTypes.CONNECT_WALLET_SUCCESS:
            return {...state, connecting: false, error: null, ...action.payload}
        case WalletActionTypes.CONNECT_WALLET_ERROR:
            return {...state, connecting: false, error: action.payload, address: null, balances: []}
        case WalletActionTypes.DISCONNECT_WALLET:
            return initialState
        case WalletActionTypes.SET_AUTOCONNECT:
            localStorage.setItem('autoconnect', JSON.stringify(action.payload))
            return {...state, autoconnect: action.payload}

        case WalletActionTypes.SEND_TRANSACTION:
            return {...state, sending: true, error: null}
        case WalletActionTypes.SEND_TRANSACTION_SUCCESS:
            return {...state, sending: false, error: null}
        case WalletActionTypes.SEND_TRANSACTION_ERROR:
            return {...state, sending: false, error: action.payload}

        default:
            return state
    }
}