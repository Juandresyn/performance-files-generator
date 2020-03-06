import { Client } from '../../model/Client';
import { CashIn } from '../../model/CashIn';
import { FundDistribution } from '../../interface/fundDistribution';
import { Fund } from '../../model/Fund';
import { FundDetails } from '../../model/FundDetails';

export const objectToFundDistribution = (objs: any[]): FundDistribution =>
    objs.reduce((map, item) => {
        const fundDetails = new FundDetails(
            item.fund as Fund,
            item.balance,
            item.performance,
            item.commision,
            item.capital,
        );
        map.set(fundDetails.fund, fundDetails);
        return map;
    }, new Map<Fund, FundDetails>());

export const objectToCashIn = (obj: any): CashIn => {
    const distributions = objectToFundDistribution(obj.fundDistribution as object[]);
    return new CashIn(
        null,
        obj.numberContribution,
        obj.dateContribution,
        obj.valueContribution,
        distributions,
        obj.egress,
        obj.transfer,
        obj.retention,
    );
};

export const objectToClient = (obj: any): Client => {
    const cashIns = (obj.cashInCollection as any[]).map(objectToCashIn);
    const client = new Client(obj.name, obj.nit, obj.affiliationNumber, cashIns);

    cashIns.forEach(cashIn => {
        cashIn.client = client;
    });
    return client;
};
