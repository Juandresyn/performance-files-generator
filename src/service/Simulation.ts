import { Promise } from 'bluebird';
import { Client } from '../model/Client';
import { CashIn } from '../model/CashIn';
import { PerformanceEvent } from '../model/PerformanceEvent';
import { buildPerformanceEvent } from './PerformanceEventCreation';
import { range } from '../utils/range';
import { writePerformanceCsvFile, initPerformanceBaseFolder } from './file/SimulationCsv';
import { getOrElse } from '../utils/getOrElse';
import { cleanEgressAndTransfer } from './commands/cleanEgressAndTransfer';
import { saveSimulationState } from './file/SimulationJson';

export type SimulationTransitionCommand = (currentState: Simulation) => Promise<Simulation>;
export class Simulation {
    clients: Map<string, Client>;

    cashIns: Map<string, CashIn>;

    performanceSummary: Map<number, SimulationTransitionCommand[]>;

    startingDate: Date;

    currentDay: number;

    constructor(date: Date) {
        this.clients = new Map();
        this.cashIns = new Map();
        this.performanceSummary = new Map();
        this.currentDay = 0;
        this.startingDate = new Date(date);
    }

    switchDay(): Simulation {
        this.currentDay++;
        return this;
    }

    pipe(commands: SimulationTransitionCommand[]): Simulation {
        const currentCommands = getOrElse(this.performanceSummary, this.currentDay, () => [cleanEgressAndTransfer]);
        this.performanceSummary.set(this.currentDay, [...currentCommands, ...commands]);
        return this;
    }

    snapShot(): PerformanceEvent[] {
        return Array.from(this.clients.values()).flatMap(client => {
            const clientDistribution = client.fundDistribution;
            const clientContributions = client.totalContributions;
            return client.cashInCollection.flatMap(cashIn => {
                const cashInBalance = cashIn.balance;
                return Array.from(cashIn.fundDistribution.values()).flatMap(fundDetails =>
                    buildPerformanceEvent(
                        client,
                        clientDistribution,
                        clientContributions,
                        cashIn,
                        cashInBalance,
                        fundDetails,
                    ),
                );
            });
        });
    }

    async processSimulation(processor: (day: number, events: PerformanceEvent[]) => string) {
        const commandDaySeq = range(0, this.currentDay + 1).map<[number, SimulationTransitionCommand[]]>(day => [
            day,
            this.performanceSummary.get(day) || [],
        ]);
        await initPerformanceBaseFolder();

        const [, promises] = await commandDaySeq.reduce<Promise<[Simulation, Promise<void>[]]>>(
            async (promiseAcc, [day, commands]) => {
                const [prevSimulation, promisesAcc] = await promiseAcc;
                const eodSimulation = await commands.reduce(
                    async (prevSimulationSameDay, command) => command(await prevSimulationSameDay),
                    Promise.resolve<Simulation>(prevSimulation),
                );
                const body = processor(day, eodSimulation.snapShot());
                return [eodSimulation, [...promisesAcc, writePerformanceCsvFile(this.startingDate, day, body)]];
            },
            Promise.resolve<[Simulation, Promise<void>[]]>([this, []]),
        );

        await Promise.all(promises);
    }

    async exportSimulation(fileName: string) {
        await saveSimulationState(this, fileName);
    }
}
