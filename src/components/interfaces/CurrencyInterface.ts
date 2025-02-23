export interface Currency {
    name: string;
    symbol: string;
}

export interface Currencies {
    [key: string | number]: Currency;
}