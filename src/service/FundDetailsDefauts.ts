import { Fund } from '../model/Fund';
import { FundDetails } from '../model/FundDetails';
import { Client } from '../model/Client';
import { CashIn } from '../model/CashIn';

export const defaultEmptyFundForClient = (fund: Fund, client: Client) => () => {
    console.warn(`no funds on Fund: ${fund} for client: ${client.affiliationNumber} creating one ...`);
    const details = new FundDetails(Fund.LIQUIDITY, 0, 0, 0, 0);
    client.fundDistribution.set(fund, details);
    return details;
};

export const defaultEmptyFundForCashIn = (fund: Fund, cashIn: CashIn) => () => {
    console.warn(`no funds on Fund: ${fund} for cashIn: ${cashIn.numberContribution} creating one ...`);
    const details = new FundDetails(fund, 0, 0, 0, 0);
    cashIn.fundDistribution.set(fund, details);
    return details;
};
