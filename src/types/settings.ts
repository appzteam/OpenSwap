export interface SettingsState {
    theme: ThemeTypes;
    slippage: number;
    fee: number;
    is_modal_opened: boolean;
}

export enum ThemeTypes {
    DAY = "DAY",
    NIGHT = "NIGHT"
}

export enum SettingsActionTypes {
    SET_THEME = "SETTINGS_SET_THEME",
    SET_SLIPPAGE = "SETTINGS_SET_SLIPPAGE",
    SET_FEE = "SETTINGS_SET_FEE",
    SET_MODAL_OPENED = "SETTINGS_SET_MODAL_OPENED"
}

interface SetThemeAction {
    type: SettingsActionTypes.SET_THEME;
    payload: ThemeTypes
}

interface SetSlippageAction {
    type: SettingsActionTypes.SET_SLIPPAGE;
    payload: number
}

interface SetFeeAction {
    type: SettingsActionTypes.SET_FEE;
    payload: number
}

interface SetModalOpenedAction {
    type: SettingsActionTypes.SET_MODAL_OPENED;
    payload: boolean
}



export type SettingsAction = SetThemeAction | SetSlippageAction | SetFeeAction | SetModalOpenedAction