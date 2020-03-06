import { Fund } from './Fund';

export class FundDetails {
    // Fields
    fund: Fund;

    balance: number;

    performance: number;

    commision: number;

    capital: number;

    constructor(fund: Fund, balance: number, performance: number, commision: number, capital: number) {
        this.fund = fund;
        this.balance = balance;
        this.performance = performance;
        this.commision = commision;
        this.capital = capital;
    }
}
