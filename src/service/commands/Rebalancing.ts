import { Simulation } from '../Simulation';
import { Fund } from '../../model/Fund';
import { getOrElse } from '../../utils/getOrElse';
import { defaultEmptyFundForCashIn } from '../FundDetailsDefauts';
import { readRebalancingFile } from '../file/RebalancingFiles';
import { foldTransitionCommand } from '../../utils/foldTransitionCommand';

export const rebalancing = (movementNumber: string, amount: number, from: Fund, to: Fund) => async (
    state: Simulation,
): Promise<Simulation> => {
    const cashIn = getOrElse(state.cashIns, movementNumber, () => {
        throw `cashIn with movementNumber ${movementNumber} does not exists`;
    });

    const cashInDist = cashIn.fundDistribution;

    const cashInFundDetailsFrom = getOrElse(cashInDist, from, defaultEmptyFundForCashIn(from, cashIn));
    const cashInFundDetailsTo = getOrElse(cashInDist, to, defaultEmptyFundForCashIn(to, cashIn));

    cashInFundDetailsFrom.balance -= amount;
    cashInFundDetailsFrom.capital -= amount;

    cashInFundDetailsTo.balance += amount;
    cashInFundDetailsTo.capital += amount;

    cashIn.transfer += amount;

    return state;
};

export const fromRebalancingFile = (fileName: string) => async (state: Simulation): Promise<Simulation> => {
    const rows = await readRebalancingFile(fileName);
    const commands = rows.map(row => rebalancing(row.movementNumber, row.value, row.fromFund, row.toFund));
    return foldTransitionCommand(state, commands);
};
