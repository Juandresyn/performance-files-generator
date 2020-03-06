import { FundDistribution } from '../interface/fundDistribution';
import { Client } from './Client';

export class CashIn {
    // Fields
    client: Client;

    numberContribution: string;

    dateContribution: string;

    valueContribution: number;

    fundDistribution: FundDistribution;

    egress: number;

    transfer: number;

    retention: number;

    constructor(
        client: Client,
        numberContribution: string,
        dateContribution: string,
        valueContribution: number,
        fundDistribution: FundDistribution,
        egress: number,
        transfer: number,
        retention: number,
    ) {
        this.client = client;
        this.numberContribution = numberContribution;
        this.dateContribution = dateContribution;
        this.valueContribution = valueContribution;
        this.fundDistribution = fundDistribution;
        this.egress = egress;
        this.transfer = transfer;
        this.retention = retention;
    }

    get balance(): number {
        return Array.from(this.fundDistribution.values()).reduce((acc, item) => acc + item.balance, 0);
    }
}
