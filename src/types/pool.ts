import {Token} from './tokens';
import {Pair} from './pair';

export interface PoolState {
    loading: boolean;
    error: null | string;
    token0: Token | null;
    token1: Token | null;
    amount0: number;
    amount1: number;
    min_lp_amount: number;
    pair: Pair | null;
    is_pair_reversed: boolean;
}

export enum PoolActionTypes {
    SET_TOKEN_0 = "POOL_SET_TOKEN_0",
    SET_TOKEN_1 = "POOL_SET_TOKEN_1",
    SET_AMOUNT_0 = "POOL_SET_AMOUNT_0",
    SET_AMOUNT_1 = "POOL_SET_AMOUNT_1",
    SET_MIN_LP_AMOUNT = "POOL_SET_MIN_LP_AMOUNT",
    SET_PAIR = "POOL_SET_PAIR"
}

interface SetToken0Action {
    type: PoolActionTypes.SET_TOKEN_0;
    payload: Token | null
}

interface SetToken1Action {
    type: PoolActionTypes.SET_TOKEN_1;
    payload: Token | null
}

interface SetAmount0Action {
    type: PoolActionTypes.SET_AMOUNT_0;
    payload: number
}

interface SetAmount1Action {
    type: PoolActionTypes.SET_AMOUNT_1;
    payload: number
}

interface SetMinLPAmountAction {
    type: PoolActionTypes.SET_MIN_LP_AMOUNT;
    payload: number
}

interface SetPairAction {
    type: PoolActionTypes.SET_PAIR;
    payload: {
        pair: Pair | null,
        reversed: boolean
    }
}

export type PoolAction = SetToken0Action | SetToken1Action |
    SetAmount0Action | SetAmount1Action | SetMinLPAmountAction | SetPairAction