export interface Wallet {
    address: string | null;
    balances: WalletToken[] | [];
}

export interface WalletToken {
    address: string;
    amount: number;
}

export interface WalletState extends Wallet {
    autoconnect: boolean;
    connecting: boolean;
    sending: boolean;
    error: null | string;
}

export enum WalletActionTypes {
    CONNECT_WALLET = "WALLET_CONNECT_WALLET",
    CONNECT_WALLET_SUCCESS = "WALLET_CONNECT_WALLET_SUCCESS",
    CONNECT_WALLET_ERROR = "WALLET_CONNECT_WALLET_ERROR",
    SET_AUTOCONNECT = "WALLET_SET_AUTOCONNECT",
    DISCONNECT_WALLET = "WALLET_DISCONNECT_WALLET",
    SEND_TRANSACTION = "WALLET_SEND_TRANSACTION",
    SEND_TRANSACTION_SUCCESS = "WALLET_SEND_TRANSACTION_SUCCESS",
    SEND_TRANSACTION_ERROR = "WALLET_SEND_TRANSACTION_ERROR",
}

interface ConnectWalletAction {
    type: WalletActionTypes.CONNECT_WALLET;
}

interface ConnectWalletSuccessAction {
    type: WalletActionTypes.CONNECT_WALLET_SUCCESS;
    payload: Wallet;
}

interface ConnectWalletErrorAction {
    type: WalletActionTypes.CONNECT_WALLET_ERROR;
    payload: string;
}

interface SetAutoconnectAction {
    type: WalletActionTypes.SET_AUTOCONNECT;
    payload: boolean;
}

interface DisconnectWalletAction {
    type: WalletActionTypes.DISCONNECT_WALLET;
}

interface SendTransactionAction {
    type: WalletActionTypes.SEND_TRANSACTION;
}

interface SendTransactionSuccessAction {
    type: WalletActionTypes.SEND_TRANSACTION_SUCCESS;
}

interface SendTransactionErrorAction {
    type: WalletActionTypes.SEND_TRANSACTION_ERROR;
    payload: string;
}

export type WalletAction =
    ConnectWalletAction
    | ConnectWalletSuccessAction
    | ConnectWalletErrorAction
    | SetAutoconnectAction
    | DisconnectWalletAction
    | SendTransactionAction
    | SendTransactionSuccessAction
    | SendTransactionErrorAction;