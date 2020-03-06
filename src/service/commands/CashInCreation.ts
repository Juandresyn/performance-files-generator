import { Chance } from 'chance';
import { Simulation } from '../Simulation';
import { CashIn } from '../../model/CashIn';
import { FundDistribution } from '../../interface/fundDistribution';
import { Fund } from '../../model/Fund';
import { FundDetails } from '../../model/FundDetails';
import { getOrElse } from '../../utils/getOrElse';
import { range } from '../../utils/range';
import { formatDate } from '../../utils/formatDate';
import { foldTransitionCommand } from '../../utils/foldTransitionCommand';

export const newCashIn = (
    affiliationNumber: string,
    valueContribution: number,
    dateContribution: Date,
    numberContribution: string,
) => async (currentState: Simulation): Promise<Simulation> => {
    const client = getOrElse(currentState.clients, affiliationNumber, () => {
        throw `client with affiliationNumer ${affiliationNumber} does not exists`;
    });

    const fundDetail = new FundDetails(Fund.LIQUIDITY, valueContribution, 0, 0, valueContribution);

    const newFund: FundDistribution = new Map<Fund, FundDetails>([[Fund.LIQUIDITY, fundDetail]]);

    const cashInToAdd = new CashIn(
        client,
        numberContribution,
        formatDate(dateContribution),
        valueContribution,
        newFund,
        0,
        0,
        0,
    );

    client.cashInCollection.push(cashInToAdd);
    currentState.cashIns.set(cashInToAdd.numberContribution, cashInToAdd);

    return currentState;
};

export const cashInBatchFromGenerators = (
    size: number,
    affiliationNumberGen: (index: number, state: Simulation) => string,
    valueGen: (index: number, state: Simulation) => number,
    dateContributionGen: (index: number, state: Simulation) => Date,
    numberContributionGen: (index: number, state: Simulation) => string,
) => async (currentState: Simulation): Promise<Simulation> => {
    const commands = range(0, size).map(index =>
        newCashIn(
            affiliationNumberGen(index, currentState),
            valueGen(index, currentState),
            dateContributionGen(index, currentState),
            numberContributionGen(index, currentState),
        ),
    );
    return foldTransitionCommand(currentState, commands);
};

export const constGen = <T>(constVal: T) => (index: number, state: Simulation) => constVal;

export const boundedRandomValue = (min: number, max: number) => {
    const chance = new Chance();
    return (index: number, state: Simulation) => {
        return chance.integer({ min, max });
    };
};

export const monthProgressionGenerator = (from: Date) => (index: number, state: Simulation) => {
    const baseDate = new Date(from);
    baseDate.setMonth(baseDate.getMonth() + index);
    return baseDate;
};

export const nameSpaceContributionGenerator = (namespace: string) => (index: number, state: Simulation) => {
    return `${namespace}${index}`;
};

export const randomExistentClient = (index: number, state: Simulation) => {
    const chance = new Chance();
    const affiliationNumbers = Array.from(state.clients.keys());
    return affiliationNumbers[chance.integer({ min: 0, max: 10000000 }) % affiliationNumbers.length];
};

export const fixedClientFixedValueMonthlyContributionBatch = (
    size: number,
    affiliationNumber: string,
    value: number,
    startingDate: Date,
) =>
    cashInBatchFromGenerators(
        size,
        constGen(affiliationNumber),
        constGen(value),
        monthProgressionGenerator(startingDate),
        nameSpaceContributionGenerator(`${affiliationNumber}${startingDate.getMilliseconds()}`),
    );

export const fixedClientRandomValueMonthlyContributionBatch = (
    size: number,
    affiliationNumber: string,
    minValue: number,
    maxValue: number,
    startingDate: Date,
) =>
    cashInBatchFromGenerators(
        size,
        constGen(affiliationNumber),
        boundedRandomValue(minValue, maxValue),
        monthProgressionGenerator(startingDate),
        nameSpaceContributionGenerator(`${affiliationNumber}${startingDate.getMilliseconds()}`),
    );

export const randomClientRandomValueFixedContributionDateBatch = (
    size: number,
    minValue: number,
    maxValue: number,
    date: Date,
) =>
    cashInBatchFromGenerators(
        size,
        randomExistentClient,
        boundedRandomValue(minValue, maxValue),
        constGen(date),
        nameSpaceContributionGenerator(`0000${date.getMilliseconds()}`),
    );