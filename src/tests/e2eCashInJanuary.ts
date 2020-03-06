import { Simulation } from '../service/Simulation';
import { client } from '../service/commands/ClientCreation';
import { fixedClientRandomValueMonthlyContributionBatch } from '../service/commands/CashInCreation';
import { PerformanceEventGenerator } from '../service/formater/CsvCreation';
import { users } from './helpers/leidyQARogersUser';

import { plusYears } from '../utils/dateOffset';

//const someDate: Date = new Date(2019,1,10);
const someDate: Date = new Date(2019,12,27);
const simulation: Simulation = new Simulation(someDate);

simulation
    .pipe(users.map(user => client(user.name, user.nit, user.affiliationNumber)))
    .switchDay()
    .pipe(
        users.map(user =>
            fixedClientRandomValueMonthlyContributionBatch(user.numberCashIns, user.affiliationNumber, 100000, 10000000, user.date),
        ),
    );

(async () => {
    await simulation.processSimulation(PerformanceEventGenerator);
    await simulation.exportSimulation('scenarioOctoberLeidy.json');
})();
