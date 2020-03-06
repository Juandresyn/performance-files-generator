import { Simulation } from '../Simulation';
import { Fund } from '../../model/Fund';
import { getOrElse } from '../../utils/getOrElse';
import { readCashOutFile } from '../file/CashOutFiles';
import { foldTransitionCommand } from '../../utils/foldTransitionCommand';

export const newCashOut = (idCashIn: string, amount: number) => async (
    currentState: Simulation,
): Promise<Simulation> => {
    const cashIn = getOrElse(currentState.cashIns, idCashIn, () => {
        throw `cashIn with movement number ${idCashIn} does not exists`;
    });
    cashIn.egress = amount;
    const cashInFundDetails = getOrElse(cashIn.fundDistribution, Fund.LIQUIDITY, () => {
        throw `trying to cashOut from cashIn with no liquidity ${cashIn.numberContribution}`;
    });

    cashInFundDetails.balance -= amount;
    cashInFundDetails.capital -= amount;
    return currentState;
};

export const fromCashOutFile = (fileName: string) => async (state: Simulation): Promise<Simulation> => {
    const rows = await readCashOutFile(fileName);
    const commands = rows.map(row => newCashOut(row.movementNumber, row.amount));
    return foldTransitionCommand(state, commands);
};
