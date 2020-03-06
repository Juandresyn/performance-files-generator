import { Fund } from './Fund';

export class RebalancingRow {
    affiliationNumber: string;

    nationalId: string;

    movementNumber: string;

    fromFund: Fund;

    toFund: Fund;

    value: number;

    constructor(
        affiliationNumber: string,
        nationalId: string,
        movementNumber: string,
        fromFund: Fund,
        toFund: Fund,
        value: number,
    ) {
        this.affiliationNumber = affiliationNumber;
        this.nationalId = nationalId;
        this.movementNumber = movementNumber;
        this.fromFund = fromFund;
        this.toFund = toFund;
        this.value = value;
    }
}
