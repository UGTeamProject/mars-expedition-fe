export type Currency = 'gold' | 'diamonds' | 'gems';
export type CurrencyAmount = {
    [key in Currency]: number;
};
