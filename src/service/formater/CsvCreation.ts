import { PerformanceEvent } from '../../model/PerformanceEvent';

const eventHeaders = [
    '   ',
    'PLAN_INVERSION',
    'NOMBRE_CLIENTE',
    'NIT_CLIENTE',
    'NUMERO_ENCARGO',
    'SALDOXAPORTEXOPCION',
    'SALDOXAPORTE',
    'NRO_MVTO_APORTE',
    'FECHA_APORTE',
    'VALOR_APORTE',
    'OPCION_INVERSION',
    'TOTAL_OPCION',
    'TOTAL_APORTES',
    'BALANCE_ENCARGO',
    'TOTAL_EGREXAPO',
    'TOTAL_TRAS',
    'RETENCION_CONTIGENTE',
    'RENDIMIENTOS',
    'COMISION',
    'CAPITAL',
    'RENDIMIENTOS_NETOS',
].map(x => `"${x}"`);

export type Row = string[];

const transfromEventToArray = (event: PerformanceEvent): Row =>
    [
        '',
        event.plan_inversion,
        event.nombre_cliente,
        event.nit_cliente,
        event.numero_encargo,
        event.saldoxaportexopcion,
        event.saldoxaporte,
        event.nro_mvto_aporte,
        event.fecha_aporte,
        event.valor_aporte,
        event.opcion_inversion,
        event.total_opcion,
        event.total_aportes,
        event.balance_encargo,
        event.total_egrexapo,
        event.total_tras,
        event.retencion_contigente,
        event.rendimientos,
        event.comision,
        event.capital,
        event.rendimientos_netos,
    ].map(x => `"${x}"`);

const transformedRowToLine = (joinBy: string = ';') => (row: Row): string => row.join(joinBy);

const joinByEndLine = (lines: string[]) => lines.join('\n');

export const PerformanceEventGenerator = (day: number, eventList: PerformanceEvent[]): string =>
    joinByEndLine([eventHeaders, ...eventList.map(transfromEventToArray)].map(transformedRowToLine()));

export const performanceEventsFromFileContents = (contents: string): PerformanceEvent[] => {
    const matrix = contents
        .split('\n')
        .splice(1)
        .map(line => line.split(';'))
        .filter(line => line.length > 0)
        // asumes every value is quoted
        .map(line => line.filter(cell => cell.length > 0).map(cell => cell.substring(1, cell.length - 1)));

    return matrix.map(
        line =>
            new PerformanceEvent(
                Number(line[1]),
                line[2],
                Number(line[3]),
                line[4],
                Number(line[5]),
                Number(line[6]),
                line[7],
                line[8],
                Number(line[9]),
                Number(line[10]),
                Number(line[11]),
                Number(line[12]),
                Number(line[13]),
                Number(line[14]),
                Number(line[15]),
                Number(line[16]),
                Number(line[17]),
                Number(line[18]),
                Number(line[19]),
                Number(line[20]),
            ),
    );
};
