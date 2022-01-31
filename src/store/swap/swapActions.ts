import {SwapAction, SwapActionTypes} from '../../types/swap';
import {Token} from '../../types/tokens';
import {Pair} from '../../types/pair';

export const setSwapTokenIn = (token: Token | null): SwapAction => {
    return {type: SwapActionTypes.SET_TOKEN_IN, payload: token}
}

export const setSwapTokenOut = (token: Token | null): SwapAction => {
    return {type: SwapActionTypes.SET_TOKEN_OUT, payload: token}
}

export const setSwapAmountIn = (amount: number): SwapAction => {
    return {type: SwapActionTypes.SET_AMOUNT_IN, payload: amount}
}

export const setSwapAmountOut = (amount: number): SwapAction => {
    return {type: SwapActionTypes.SET_AMOUNT_OUT, payload: amount}
}

export const setSwapAmountOutMin = (amount: number): SwapAction => {
    return {type: SwapActionTypes.SET_AMOUNT_OUT_MIN, payload: amount}
}

export const setSwapPair = (data: {pair: Pair | null, reversed: boolean}): SwapAction => {
    return {type: SwapActionTypes.SET_PAIR, payload: data}
}