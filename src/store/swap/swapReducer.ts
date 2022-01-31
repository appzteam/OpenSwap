import {SwapAction, SwapActionTypes, SwapState} from '../../types/swap';

const initialState: SwapState = {
    loading: false,
    error: null,
    token_in: null,
    token_out: null,
    amount_in: 0,
    amount_out: 0,
    amount_out_min: 0,
    pair: null,
    is_pair_reversed: false
}

export const swapReducer = (state: SwapState = initialState, action: SwapAction): SwapState => {
    switch (action.type) {
        case SwapActionTypes.SET_TOKEN_IN:
            localStorage.setItem('swap_token_in', action.payload?.address || '')
            return {...state, token_in: action.payload}
        case SwapActionTypes.SET_TOKEN_OUT:
            localStorage.setItem('swap_token_out', action.payload?.address || '')
            return {...state, token_out: action.payload}
        case SwapActionTypes.SET_AMOUNT_IN:
            return {...state, amount_in: action.payload}
        case SwapActionTypes.SET_AMOUNT_OUT:
            return {...state, amount_out: action.payload}
        case SwapActionTypes.SET_AMOUNT_OUT_MIN:
            return {...state, amount_out_min: action.payload}
        case SwapActionTypes.SET_PAIR:
            return {...state, pair: action.payload.pair, is_pair_reversed: action.payload.reversed}
        default:
            return state
    }
}