import { Simulation } from '../service/Simulation';
import { PerformanceEventGenerator } from '../service/formater/CsvCreation';
import { fromPerformanceFile } from '../service/commands/performance';
import { plusDays } from '../utils/dateOffset';
import { fromRebalancingFile } from '../service/commands/Rebalancing';

/*Se setea un año y mes antes y un día después(cuando cambia de año) al que será leido del folder de performance
*p.e archivo para enero 2020-01-12 => new Date(2019, 12, 13)
*p.e aechivo para febrero 2020-02-18 => new Date(2020, 01, 18)
*/
const refDate: Date = new Date(2019, 12, 29); 
const fromDate: Date = plusDays(-1, refDate);

const simulation: Simulation = new Simulation(refDate);
simulation.pipe([fromPerformanceFile(fromDate), fromRebalancingFile('rebalancingCashIn_28-01-2020.xlsx')]);
(async () => {
    await simulation.processSimulation(PerformanceEventGenerator);
    await simulation.exportSimulation('secondCashInRebalancing.json');
})();

