import {PoolAction, PoolActionTypes} from '../../types/pool';
import {Token} from '../../types/tokens';
import {Pair} from '../../types/pair';

export const setPoolToken0 = (token: Token | null): PoolAction => {
    return {type: PoolActionTypes.SET_TOKEN_0, payload: token}
}

export const setPoolToken1 = (token: Token | null): PoolAction => {
    return {type: PoolActionTypes.SET_TOKEN_1, payload: token}
}

export const setPoolAmount0 = (amount: number): PoolAction => {
    return {type: PoolActionTypes.SET_AMOUNT_0, payload: amount}
}

export const setPoolAmount1 = (amount: number): PoolAction => {
    return {type: PoolActionTypes.SET_AMOUNT_1, payload: amount}
}

export const setPoolMinLPAmount = (amount: number): PoolAction => {
    return {type: PoolActionTypes.SET_MIN_LP_AMOUNT, payload: amount}
}

export const setPoolPair = (data: {pair: Pair | null, reversed: boolean}): PoolAction => {
    return {type: PoolActionTypes.SET_PAIR, payload: data}
}