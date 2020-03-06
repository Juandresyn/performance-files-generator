import { Simulation } from '../Simulation';

export const cleanEgressAndTransfer = async (state: Simulation): Promise<Simulation> => {
    Array.from(state.cashIns.values()).forEach(cashIn => {
        cashIn.egress = 0;
        cashIn.transfer = 0;
    });
    return state;
};
