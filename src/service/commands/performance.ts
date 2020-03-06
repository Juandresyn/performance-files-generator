import { readPerformanceCsvFile } from '../file/SimulationCsv';
import { performanceEventsFromFileContents } from '../formater/CsvCreation';
import { Simulation } from '../Simulation';
import { Client } from '../../model/Client';
import { CashIn } from '../../model/CashIn';
import { FundDistribution } from '../../interface/fundDistribution';
import { Fund } from '../../model/Fund';
import { FundDetails } from '../../model/FundDetails';

export const fromPerformanceFile = (date: Date) => async (state: Simulation): Promise<Simulation> => {
    const records = performanceEventsFromFileContents(await readPerformanceCsvFile(date));
    console.log(records.length);
    records.forEach(record => {
        let client: Client;
        if (state.clients.has(record.numero_encargo)) {
            client = state.clients.get(record.numero_encargo);
        } else {
            client = new Client(record.nombre_cliente, `${record.nit_cliente}`, record.numero_encargo, []);
            state.clients.set(record.numero_encargo, client);
        }
        let cashIn: CashIn;
        if (state.cashIns.has(record.nro_mvto_aporte)) {
            cashIn = state.cashIns.get(record.nro_mvto_aporte);
        } else {
            const newFund: FundDistribution = new Map<Fund, FundDetails>();

            cashIn = new CashIn(
                client,
                record.nro_mvto_aporte,
                record.fecha_aporte,
                record.valor_aporte,
                newFund,
                0,
                0,
                0,
            );
            state.cashIns.set(record.nro_mvto_aporte, cashIn);
            client.cashInCollection.push(cashIn);
        }
        const fundDetail = new FundDetails(
            record.opcion_inversion,
            record.saldoxaportexopcion,
            0,
            0,
            record.saldoxaportexopcion,
        );
        cashIn.fundDistribution.set(fundDetail.fund, fundDetail);
    });
    return state;
};
