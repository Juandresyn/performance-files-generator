import { Simulation, SimulationTransitionCommand } from '../service/Simulation';

export const foldTransitionCommand = (state: Simulation, commands: SimulationTransitionCommand[]) =>
    commands.reduce(async (prevState, command) => command(await prevState), Promise.resolve(state));
