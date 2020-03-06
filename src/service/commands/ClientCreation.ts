import { Simulation } from '../Simulation';
import { Client } from '../../model/Client';

export const client = (name: string, nit: string, affiliationNumber: string) => async (
    currentState: Simulation,
): Promise<Simulation> => {
    const newClient = new Client(name, nit, affiliationNumber, []);
    currentState.clients.set(affiliationNumber, newClient);

    return currentState;
};
