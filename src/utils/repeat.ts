import { range } from './range';

export const repeat = <T>(n: number, val: T): T[] => range(0, n).map(() => val);
