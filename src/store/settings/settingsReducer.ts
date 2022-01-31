import {SettingsAction, SettingsActionTypes, SettingsState, ThemeTypes} from '../../types/settings';

const initialState: SettingsState = {
    theme: ThemeTypes.DAY,
    slippage: Number(localStorage.getItem('slippage')) || 1,
    fee: 0.0025,
    is_modal_opened: false
}

export const settingsReducer = (state: SettingsState = initialState, action: SettingsAction): SettingsState => {
    switch (action.type) {
        case SettingsActionTypes.SET_THEME:
            localStorage.setItem('theme', action.payload)
            return {...state, theme: action.payload}
        case SettingsActionTypes.SET_SLIPPAGE:
            localStorage.setItem('slippage', action.payload.toString())
            return {...state, slippage: action.payload}
        case SettingsActionTypes.SET_FEE:
            return {...state, fee: action.payload}
        case SettingsActionTypes.SET_MODAL_OPENED:
            return {...state, is_modal_opened: action.payload}
        default:
            return state
    }
}