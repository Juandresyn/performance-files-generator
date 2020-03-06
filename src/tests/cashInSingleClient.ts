import { Simulation } from '../service/Simulation';
import { client } from '../service/commands/ClientCreation';
import { newCashIn } from '../service/commands/CashInCreation';
import { PerformanceEventGenerator } from '../service/formater/CsvCreation';
import { users } from './helpers/users';
import { rebalancing } from '../service/commands/Rebalancing';
import { Fund } from '../model/Fund';
import { newCashOut } from '../service/commands/CashOut';
import { readSimulationState } from '../service/file/SimulationJson';

const todayDate: Date = new Date(2019, 12, 16);
const tomorrow = new Date();

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
            new Date(2019, 12, 17),
            users[0].numberContribution + 100,
        ),
    ]);

(async () => {
    await simulation.processSimulation(PerformanceEventGenerator);
    await simulation.exportSimulation('test.json');
})();
