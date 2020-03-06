import { Simulation } from '../service/Simulation';
import { PerformanceEventGenerator } from '../service/formater/CsvCreation';
import { fromPerformanceFile } from '../service/commands/performance';
import { plusDays } from '../utils/dateOffset';
import { fromRebalancingFile } from '../service/commands/Rebalancing';

const refDate: Date = new Date(2019, 9, 25);
const fromDate: Date = plusDays(-1, refDate);

const simulation: Simulation = new Simulation(refDate);
simulation.pipe([fromPerformanceFile(fromDate), fromRebalancingFile('rebalancing_cashout_22-01-2020.xlsx')]);
(async () => {
    await simulation.processSimulation(PerformanceEventGenerator);
    await simulation.exportSimulation('firstCashOutRebalancing.json');
})();

