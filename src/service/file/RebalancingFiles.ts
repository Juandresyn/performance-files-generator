import * as XLSX from 'XLSX';
import { readFile } from './fsPromise';
import { RebalancingRow } from '../../model/RebalancingRow';
import { range } from '../../utils/range';
import { Fund } from '../../model/Fund';

const REBALANCING_SHEET = 'rebalanceo';

export const lastPopulatedRow = (worksheet: XLSX.WorkSheet) => {
    let currentRow = 1;
    while (worksheet[`A${currentRow}`]) {
        currentRow++;
    }
    return currentRow - 1;
};

export const extractFund = (data: string): Fund => Number(data.split(' ')[0]);

export const rowExtraction = (worksheet: XLSX.WorkSheet) => (rowNumber: number): RebalancingRow =>
    new RebalancingRow(
        worksheet[`A${rowNumber}`].v,
        worksheet[`B${rowNumber}`].v,
        worksheet[`C${rowNumber}`].v,
        extractFund(worksheet[`D${rowNumber}`].v),
        extractFund(worksheet[`E${rowNumber}`].v),
        Number(worksheet[`F${rowNumber}`].v),
    );

export const readRebalancingFile = async (filename: string): Promise<RebalancingRow[]> => {
    const filePath = `rebalancing/${filename}`;
    console.log(`reading ${filePath}`);
    const contents = await readFile(filePath);
    const workbook = XLSX.read(contents, { type: 'buffer' });
    const worksheet = workbook.Sheets[REBALANCING_SHEET];
    const lastRow = lastPopulatedRow(worksheet);
    if (lastRow < 1) {
        return [];
    }
    return range(2, lastRow + 1).map(rowExtraction(worksheet));
};
