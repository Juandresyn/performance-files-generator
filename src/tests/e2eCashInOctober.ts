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

const todayDate: Date = new Date(2019, 9, 24);
const simulation: Simulation = new Simulation(todayDate);

simulation
    .pipe([fromSavedState('scenarioOctoberLeidy.json')])
    .pipe([fromRebalancingFile('20200108_rebalancing.xlsx')])
    .switchDay()
    .pipe([fromRebalancingFile('20200109_rebalancing.xlsx')]);
(async () => {
    await simulation.processSimulation(PerformanceEventGenerator);
    await simulation.exportSimulation('scenarioOctoberLeidyAfterRebalancing.json');
})();
