import {PoolAction, PoolActionTypes, PoolState} from '../../types/pool';

const initialState: PoolState = {
    loading: false,
    error: null,
    token0: null,
    token1: null,
    amount0: 0,
    amount1: 0,
    min_lp_amount: 0,
    pair: null,
    is_pair_reversed: false
}

export const poolReducer = (state: PoolState = initialState, action: PoolAction): PoolState => {
    switch (action.type) {
        case PoolActionTypes.SET_TOKEN_0:
            return {...state, token0: action.payload}
        case PoolActionTypes.SET_TOKEN_1:
            return {...state, token1: action.payload}
        case PoolActionTypes.SET_AMOUNT_0:
            return {...state, amount0: action.payload}
        case PoolActionTypes.SET_AMOUNT_1:
            return {...state, amount1: action.payload}
        case PoolActionTypes.SET_MIN_LP_AMOUNT:
            return {...state, min_lp_amount: action.payload}
        case PoolActionTypes.SET_PAIR:
            return {...state, pair: action.payload.pair, is_pair_reversed: action.payload.reversed}
        default:
            return state
    }
}