import { Simulation } from '../service/Simulation';
import { client } from '../service/commands/ClientCreation';
import { newCashIn } from '../service/commands/CashInCreation';
import { PerformanceEventGenerator } from '../service/formater/CsvCreation';
import { users } from './helpers/users';
import { rebalancing } from '../service/commands/Rebalancing';
import { Fund } from '../model/Fund';
import { plusDays } from '../utils/dateOffset';

const todayDate: Date = new Date(2019, 12, 16);

const simulation: Simulation = new Simulation(todayDate);

simulation
    .pipe([
        client(users[0].name, users[0].nit, users[0].affiliationNumber),

        newCashIn(users[0].affiliationNumber, users[0].valueContribution, todayDate, users[0].numberContribution),
    ])
    .switchDay()
    .pipe([
        newCashIn(
            users[0].affiliationNumber,
            users[0].valueContribution,
            plusDays(1, todayDate),
            users[0].numberContribution + 100,
        ),
    ])
    .switchDay()
    .pipe([rebalancing(users[0].numberContribution, 50000, Fund.LIQUIDITY, Fund.FIXED_RENT_GLOBAL)])
    .switchDay()
    .pipe([rebalancing(users[0].numberContribution + 100, 25000, Fund.LIQUIDITY, Fund.PUBLIC_DEBT_COL)]);

(async () => {
    await simulation.processSimulation(PerformanceEventGenerator);
    await simulation.exportSimulation('test.json');
})();
