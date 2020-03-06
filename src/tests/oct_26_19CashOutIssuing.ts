import { Simulation } from '../service/Simulation';
import { PerformanceEventGenerator } from '../service/formater/CsvCreation';
import { fromPerformanceFile } from '../service/commands/performance';
import { plusDays } from '../utils/dateOffset';
import { fromCashOutFile } from '../service/commands/CashOut';

const refDate: Date = new Date(2019, 9, 26);
const fromDate: Date = plusDays(-1, refDate);

const simulation: Simulation = new Simulation(refDate);
simulation.pipe([fromPerformanceFile(fromDate), fromCashOutFile('cashout_22-01-2020.xlsx')]);
(async () => {
    await simulation.processSimulation(PerformanceEventGenerator);
    await simulation.exportSimulation('firstCashOutIssue.json');
})();
