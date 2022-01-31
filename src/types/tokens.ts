import {Pair} from './pair';

export interface Token {
    symbol: string;
    name: string;
    image: string;
    address: string;
}

export interface TokensState {
    standard: Token[],
    imported: Token[],
    pairs: Pair[]
}

export enum TokensActionTypes {
    SET_STANDARD = "TOKENS_SET_STANDARD",
    SET_IMPORTED = "TOKENS_SET_IMPORTED",
    SET_PAIRS = "TOKENS_SET_PAIRS"
}

interface SetStandardAction {
    type: TokensActionTypes.SET_STANDARD;
    payload: Token[]
}

interface SetImportedAction {
    type: TokensActionTypes.SET_IMPORTED;
    payload: Token[]
}

interface SetPairsAction {
    type: TokensActionTypes.SET_PAIRS;
    payload: Pair[]
}

export type TokensAction = SetStandardAction | SetImportedAction | SetPairsAction