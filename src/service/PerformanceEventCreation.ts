import { Client } from '../model/Client';
import { CashIn } from '../model/CashIn';
import { FundDetails } from '../model/FundDetails';
import { PerformanceEvent } from '../model/PerformanceEvent';
import { FundDistribution } from '../interface/fundDistribution';

export const buildPerformanceEvent = (
    client: Client,
    clientDistribution: FundDistribution,
    clientContribution: number,
    cashIn: CashIn,
    cashInBalance: number,
    fundDetails: FundDetails,
): PerformanceEvent =>
    new PerformanceEvent(
        client.invesmentPlan,
        client.name,
        Number(client.nit),
        client.affiliationNumber,
        fundDetails.balance,
        cashInBalance,
        cashIn.numberContribution,
        cashIn.dateContribution,
        cashIn.valueContribution,
        fundDetails.fund,
        clientDistribution.get(fundDetails.fund).balance,
        clientContribution,
        clientContribution,
        cashIn.egress,
        cashIn.transfer,
        cashIn.retention,
        fundDetails.performance,
        fundDetails.commision,
        fundDetails.capital,
        fundDetails.performance + fundDetails.commision,
    );
