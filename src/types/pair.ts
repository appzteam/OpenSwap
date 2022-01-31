import {Token} from './tokens';

export interface Pair {
    pair_address: string;
    token0: string;
    token1: string;
    volume: number;
    liquidity: {
        reserve0: number;
        reserve1: number;
    };
}

export interface PairExtended extends Omit<Pair, 'token0'|'token1'> {
    token0: Token;
    token1: Token;
}