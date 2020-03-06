import { repeat } from '../../utils/repeat';
import { writeFile, exists, mkdir, readFile } from './fsPromise';
import { Simulation } from '../Simulation';

export const padZero = (length: number) => (num: number): string => {
    const strRep = `${num}`;
    const currLength = strRep.length;
    const missingDigits = length - currLength;
    if (missingDigits > 0) {
        return repeat(missingDigits, '0').join('') + strRep;
    }
    return strRep;
};

export const formatFileName = (date: Date, offset: number): string => {
    const dateToSave = new Date(date);
    dateToSave.setDate(dateToSave.getDate() + offset);
    const twoDigitsPad = padZero(2);
    const day = twoDigitsPad(dateToSave.getDate());
    const month = twoDigitsPad(dateToSave.getMonth() + 1);
    const year = twoDigitsPad(dateToSave.getFullYear());
    return `${year}${month}${day}.csv`;
};

export const initPerformanceBaseFolder = async (): Promise<void> => {
    if (!(await exists('performance'))) {
        await mkdir('performance');
    }
};

export const writePerformanceCsvFile = async (date: Date, offset: number, body: string): Promise<void> => {
    const fileName = formatFileName(date, offset);
    const filePath = `performance/${fileName}`;
    console.log(`Saving ${filePath}...`);
    await writeFile(filePath, body);
};

export const readPerformanceCsvFile = async (date: Date): Promise<string> => {
    const fileName = formatFileName(date, 0);
    const filePath = `performance/${fileName}`;
    console.log(`reading ${filePath}...`);
    return (await readFile(filePath)).toString();
};
