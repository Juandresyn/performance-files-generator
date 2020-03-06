export class CashOutFileRow {
    affiliationNumber: string;

    amount: number;

    movementNumber: string;

    constructor(affiliationNumber: string, amount: number, movementNumber: string) {
        this.affiliationNumber = affiliationNumber;
        this.amount = amount;
        this.movementNumber = movementNumber;
    }
}
