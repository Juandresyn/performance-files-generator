import { FundDistribution } from '../interface/fundDistribution';
import { CashIn } from './CashIn';
import { FundDetails } from './FundDetails';
import { Fund } from './Fund';
import { getOrElse } from '../utils/getOrElse';

export class Client {
    // Fields
    invesmentPlan: number = 1;

    name: string;

    nit: string;

    affiliationNumber: string;

    cashInCollection: CashIn[];

    constructor(name: string, nit: string, affiliationNumber: string, cashInCollection: CashIn[]) {
        this.name = name;
        this.nit = nit;
        this.affiliationNumber = affiliationNumber;
        this.cashInCollection = cashInCollection;
    }

    get totalContributions(): number {
        return this.cashInCollection.map(cashIn => cashIn.balance).reduce((acc, local) => acc + local, 0);
    }

    get fundDistribution(): FundDistribution {
        return this.cashInCollection.reduce((distribution, cashIn) => {
            const totals = Array.from(cashIn.fundDistribution.entries());
            totals.forEach(([fund, details]) => {
                const global = getOrElse(distribution, fund, () => new FundDetails(fund, 0, 0, 0, 0));
                global.balance += details.balance;
                global.capital += details.capital;
                global.commision += details.commision;
                global.performance += details.performance;

                distribution.set(fund, global);
            });
            return distribution;
        }, new Map<Fund, FundDetails>());
    }
}
