import {Token, TokensState} from '../../types/tokens';

export const selectTokenByAddress = (state: TokensState, address: string) => {
    return state.standard.find(token => token.address === address) || state.imported.find(token => token.address === address) || null
}

export const selectTokenBySymbol = (state: TokensState, symbol: string) => {
    return state.standard.find(token => token.symbol === symbol) || state.imported.find(token => token.symbol === symbol) || null
}

export const selectPairByAddress = (state: TokensState, address: string) => {
    return state.pairs.find(token => token.pair_address === address) || null
}

export const selectPairByTokens = (state: TokensState, token0: Token | null, token1: Token | null) => {
    if (token0 && token1) {
        const pair = state.pairs.find(pair => pair.token0 === token0.address && pair.token1 === token1.address)
        const pair_rev = state.pairs.find(pair => pair.token0 === token1.address && pair.token1 === token0.address)
        if (pair) {
            return {pair: pair, reversed: false}
        } else if (pair_rev) {
            return {pair: pair_rev, reversed: true}
        }
    }
    return {pair: null, reversed: false}
}