import {Token} from './tokens';
import {Pair} from './pair';

export interface SwapState {
    loading: boolean;
    error: null | string;
    token_in: Token | null;
    token_out: Token | null;
    amount_in: number;
    amount_out: number;
    amount_out_min: number;
    pair: Pair | null;
    is_pair_reversed: boolean;
}

export enum SwapActionTypes {
    SET_TOKEN_IN = "SWAP_SET_TOKEN_IN",
    SET_TOKEN_OUT = "SWAP_SET_TOKEN_OUT",
    SET_AMOUNT_IN = "SWAP_SET_AMOUNT_IN",
    SET_AMOUNT_OUT = "SWAP_SET_AMOUNT_OUT",
    SET_AMOUNT_OUT_MIN = "SWAP_SET_AMOUNT_OUT_MIN",
    SET_PAIR = "SWAP_SET_PAIR"
}

interface SetTokenInAction {
    type: SwapActionTypes.SET_TOKEN_IN;
    payload: Token | null
}

interface SetTokenOutAction {
    type: SwapActionTypes.SET_TOKEN_OUT;
    payload: Token | null
}

interface SetAmountInAction {
    type: SwapActionTypes.SET_AMOUNT_IN;
    payload: number
}

interface SetAmountOutAction {
    type: SwapActionTypes.SET_AMOUNT_OUT;
    payload: number
}

interface SetAmountOutMinAction {
    type: SwapActionTypes.SET_AMOUNT_OUT_MIN;
    payload: number
}

interface SetPairAction {
    type: SwapActionTypes.SET_PAIR;
    payload: {
        pair: Pair | null,
        reversed: boolean
    }
}

export type SwapAction = SetTokenInAction | SetTokenOutAction |
    SetAmountInAction | SetAmountOutAction | SetAmountOutMinAction | SetPairAction