import { Simulation } from '../service/Simulation';
import { client } from '../service/commands/ClientCreation';
import { newCashIn } from '../service/commands/CashInCreation';
import { PerformanceEventGenerator } from '../service/formater/CsvCreation';
import { users } from './helpers/users';
import { rebalancing } from '../service/commands/Rebalancing';
import { Fund } from '../model/Fund';
import { newCashOut } from '../service/commands/CashOut';

const todayDate: Date = new Date();
const simulation: Simulation = new Simulation(todayDate);

simulation
    .pipe([
        client(users[0].name, users[0].nit, users[0].affiliationNumber),
        client(users[1].name, users[1].nit, users[1].affiliationNumber),
        client(users[2].name, users[2].nit, users[2].affiliationNumber),

        newCashIn(users[0].affiliationNumber, users[0].valueContribution, todayDate, users[0].numberContribution),
        newCashIn(users[1].affiliationNumber, users[1].valueContribution, todayDate, users[1].numberContribution),

        newCashIn(users[2].affiliationNumber, users[2].valueContribution, todayDate, users[2].numberContribution),
    ])
    .switchDay()
    .pipe([
        newCashIn(users[0].affiliationNumber, users[0].valueContribution, todayDate, users[0].numberContribution + 100),
    ])
    .switchDay()
    .pipe([
        rebalancing(users[1].numberContribution, 50000, Fund.LIQUIDITY, Fund.FIXED_RENT_GLOBAL),
        rebalancing(users[2].numberContribution, 40000, Fund.LIQUIDITY, Fund.PUBLIC_DEBT_COL),
    ])
    .switchDay()
    .pipe([
        newCashOut(users[0].numberContribution, 20000),
        rebalancing(users[1].numberContribution, 50000, Fund.LIQUIDITY, Fund.FIXED_RENT_GLOBAL),
        rebalancing(users[2].numberContribution, 40000, Fund.LIQUIDITY, Fund.PUBLIC_DEBT_COL),
    ])

    .processSimulation(PerformanceEventGenerator);
