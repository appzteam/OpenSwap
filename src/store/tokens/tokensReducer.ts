import {TokensAction, TokensActionTypes, TokensState} from '../../types/tokens';
import {TOKENS_MOCK} from '../../mocks/tokens';
import {PAIRS_MOCK} from '../../mocks/pairs';
import {Pair} from '../../types/pair';

const initialState: TokensState = {
    standard: TOKENS_MOCK,
    imported: JSON.parse(localStorage.getItem('imported_tokens') || '[]'),
    pairs: PAIRS_MOCK.concat(JSON.parse(localStorage.getItem('custom_pairs') || '[]') as Pair[]), // Just for presentation purposes only
}

export const tokensReducer = (state: TokensState = initialState, action: TokensAction): TokensState => {
    switch (action.type) {
        case TokensActionTypes.SET_STANDARD:
            return {...state, standard: action.payload}
        case TokensActionTypes.SET_IMPORTED:
            localStorage.setItem('imported_tokens', JSON.stringify(action.payload))
            return {...state, imported: action.payload}
        case TokensActionTypes.SET_PAIRS:
            return {...state, pairs: action.payload}
        default:
            return state
    }
}