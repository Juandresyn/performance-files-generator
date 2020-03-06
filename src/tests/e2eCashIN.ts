import { Simulation } from '../service/Simulation';
import { client } from '../service/commands/ClientCreation';
import { newCashIn } from '../service/commands/CashInCreation';
import { PerformanceEventGenerator } from '../service/formater/CsvCreation';
import { users } from './helpers/users';
import { rebalancing, fromRebalancingFile } from '../service/commands/Rebalancing';
import { Fund } from '../model/Fund';
import { newCashOut } from '../service/commands/CashOut';
import { readSimulationState } from '../service/file/SimulationJson';
import { fromSavedState } from '../service/commands/FromSavedState';

const todayDate: Date = new Date(2019, 12, 18);
const simulation: Simulation = new Simulation(todayDate);

simulation
    .pipe([fromSavedState('test.json')])
    .switchDay()
    .pipe([fromRebalancingFile('rebalancingTest.xlsx')]);

(async () => {
    await simulation.processSimulation(PerformanceEventGenerator);
    await simulation.exportSimulation('test2.json');
})();
