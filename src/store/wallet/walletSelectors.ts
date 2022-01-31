import {WalletState} from '../../types/wallet';

export const selectBalanceByTokenAddress = (state: WalletState, address: string) => {
    const token = state.balances.find((token) => {
        return token.address === address
    })
    return token ? Math.floor(token.amount * 100000) / 100000 : 0
}