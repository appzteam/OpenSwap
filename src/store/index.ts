import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import {combineReducers} from "redux";
import {walletReducer} from './wallet/walletReducer';
import {swapReducer} from './swap/swapReducer';
import {settingsReducer} from './settings/settingsReducer';
import {tokensReducer} from './tokens/tokensReducer';
import {poolReducer} from './pool/poolReducer';

export const rootReducer = combineReducers({
    wallet: walletReducer,
    swap: swapReducer,
    settings: settingsReducer,
    tokens: tokensReducer,
    pool: poolReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));