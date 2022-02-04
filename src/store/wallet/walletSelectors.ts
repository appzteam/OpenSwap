import {WalletState} from '../../types/wallet';

export const selectBalanceByTokenAddress = (state: WalletState, address: string) => {
    const token = state.balances.find((token) => {
        return token.address === address
    })
    return token?.amount || 0
}