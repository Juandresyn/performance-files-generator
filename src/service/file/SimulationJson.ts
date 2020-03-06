import { Simulation } from '../Simulation';
import { writeFile, readFile, exists, mkdir } from './fsPromise';

export const circularReplacer = <K, V>() => {
    const seen = new WeakSet<any>();
    return (key: any, value: any): any => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return null;
            }
            seen.add(value);
        }
        return value;
    };
};

export const saveSimulationState = async (simulation: Simulation, filename: string): Promise<void> => {
    const clients = Array.from(simulation.clients.values());
    const clientsObjs = clients.map(client => ({
        ...client,
        cashInCollection: client.cashInCollection.map(cashIn => ({
            ...cashIn,
            fundDistribution: Array.from(cashIn.fundDistribution.values()),
            client: null,
        })),
    }));
    const clientsJson = JSON.stringify(clientsObjs, circularReplacer());
    if (!(await exists('simulations'))) {
        await mkdir('simulations');
    }
    const filePath = `simulations/${filename}`;
    console.log(`Saving ${filePath}...`);
    return writeFile(filePath, clientsJson) as Promise<void>;
};

export const readSimulationState = async (filename: string): Promise<object[]> => {
    const filePath = `simulations/${filename}`;
    console.log(`reading ${filePath} ...`);
    const contents = (await readFile(filePath)).toString();
    const json = JSON.parse(contents);
    if (!Array.isArray(json)) {
        throw 'State should be an array';
    }
    return json;
};
