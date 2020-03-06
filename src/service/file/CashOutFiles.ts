import * as XLSX from 'XLSX';
import { readFile } from './fsPromise';
import { range } from '../../utils/range';
import { Fund } from '../../model/Fund';
import { CashOutFileRow } from '../../model/CashOutFileRow';

const CASHOUTS_SHEET = 'Cashouts';

export const lastPopulatedRow = (worksheet: XLSX.WorkSheet) => {
    let currentRow = 1;
    while (worksheet[`A${currentRow}`]) {
        currentRow++;
    }
    return currentRow - 1;
};

export const extractFund = (data: string): Fund => Number(data.split(' ')[0]);

export const rowExtraction = (worksheet: XLSX.WorkSheet) => (rowNumber: number): CashOutFileRow =>
    new CashOutFileRow(
        worksheet[`A${rowNumber}`].v,
        Number(worksheet[`C${rowNumber}`].v),
        worksheet[`M${rowNumber}`].v,
    );

export const readCashOutFile = async (filename: string): Promise<CashOutFileRow[]> => {
    const filePath = `cashout/${filename}`;
    console.log(`reading ${filePath}`);
    const contents = await readFile(filePath);
    const workbook = XLSX.read(contents, { type: 'buffer' });
    const worksheet = workbook.Sheets[CASHOUTS_SHEET];
    const lastRow = lastPopulatedRow(worksheet);
    if (lastRow < 1) {
        return [];
    }
    return range(2, lastRow + 1).map(rowExtraction(worksheet));
};
