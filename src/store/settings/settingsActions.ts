import {SettingsAction, SettingsActionTypes, ThemeTypes} from '../../types/settings';

export const setTheme = (value: ThemeTypes): SettingsAction => {
    return {type: SettingsActionTypes.SET_THEME, payload: value}
}

export const setSlippage = (value: number): SettingsAction => {
    return {type: SettingsActionTypes.SET_SLIPPAGE, payload: value}
}

export const setFee = (value: number): SettingsAction => {
    return {type: SettingsActionTypes.SET_FEE, payload: value}
}

export const setSettingsModalOpened = (value: boolean): SettingsAction => {
    return {type: SettingsActionTypes.SET_MODAL_OPENED, payload: value}
}