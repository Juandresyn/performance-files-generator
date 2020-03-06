import { Simulation } from '../Simulation';
import { readSimulationState } from '../file/SimulationJson';
import { objectToClient } from '../formater/JsonToModel';

export const fromSavedState = (fileName: string) => async (currentState: Simulation): Promise<Simulation> => {
    const fileContents = await readSimulationState(fileName);
    const clients = fileContents.map(objectToClient);
    clients.forEach(client => {
        currentState.clients.set(client.affiliationNumber, client);
        client.cashInCollection.forEach(cashIn => {
            currentState.cashIns.set(cashIn.numberContribution, cashIn);
        });
    });
    return currentState;
};
