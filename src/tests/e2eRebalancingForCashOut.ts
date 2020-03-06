import { Simulation } from '../service/Simulation';
import { PerformanceEventGenerator } from '../service/formater/CsvCreation';
import { fromPerformanceFile } from '../service/commands/performance';
import { plusDays } from '../utils/dateOffset';
import { fromRebalancingFile } from '../service/commands/Rebalancing';

const refDate: Date = new Date(2019, 12, 13);
const fromDate: Date = plusDays(-1, refDate);

const simulation: Simulation = new Simulation(refDate);
simulation.pipe([fromPerformanceFile(fromDate), fromRebalancingFile('rebalancingCashOut_23-01-2020.xlsx')]);
(async () => {
    await simulation.processSimulation(PerformanceEventGenerator);
    await simulation.exportSimulation('firstCashOutRebalancing.json');
})();

