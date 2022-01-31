import * as WalletActionCreators from './wallet/walletActions';
import * as SwapActionCreators from './swap/swapActions';
import * as SettingsActionCreators from './settings/settingsActions';
import * as TokensActionCreators from './tokens/tokensActions';
import * as PoolActionCreators from './pool/poolActions';

export default {
    ...WalletActionCreators,
    ...SwapActionCreators,
    ...SettingsActionCreators,
    ...TokensActionCreators,
    ...PoolActionCreators
}