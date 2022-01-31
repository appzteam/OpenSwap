import {Token, TokensAction, TokensActionTypes} from '../../types/tokens';
import {Pair} from '../../types/pair';

export const setStandard = (value: Token[]): TokensAction => {
    return {type: TokensActionTypes.SET_STANDARD, payload: value}
}

export const setImported = (value: Token[]): TokensAction => {
    return {type: TokensActionTypes.SET_IMPORTED, payload: value}
}

export const setPairs = (value: Pair[]): TokensAction => {
    return {type: TokensActionTypes.SET_PAIRS, payload: value}
}