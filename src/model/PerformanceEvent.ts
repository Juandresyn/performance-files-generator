export class PerformanceEvent {
    plan_inversion: number;

    nombre_cliente: string;

    nit_cliente: number;

    numero_encargo: string;

    saldoxaportexopcion: number;

    saldoxaporte: number;

    nro_mvto_aporte: string;

    fecha_aporte: string;

    valor_aporte: number;

    opcion_inversion: number;

    total_opcion: number;

    total_aportes: number;

    balance_encargo: number;

    total_egrexapo: number;

    total_tras: number;

    retencion_contigente: number;

    rendimientos: number;

    comision: number;

    capital: number;

    rendimientos_netos: number;

    constructor(
        plan_inversion: number,
        nombre_cliente: string,
        nit_cliente: number,
        numero_encargo: string,
        saldoxaportexopcion: number,
        saldoxaporte: number,
        nro_mvto_aporte: string,
        fecha_aporte: string,
        valor_aporte: number,
        opcion_inversion: number,
        total_opcion: number,
        total_aportes: number,
        balance_encargo: number,
        total_egrexapo: number,
        total_tras: number,
        retencion_contigente: number,
        rendimientos: number,
        comision: number,
        capital: number,
        rendimientos_netos: number,
    ) {
        this.plan_inversion = plan_inversion;
        this.nombre_cliente = nombre_cliente;
        this.nit_cliente = nit_cliente;
        this.numero_encargo = numero_encargo;
        this.saldoxaportexopcion = saldoxaportexopcion;
        this.saldoxaporte = saldoxaporte;
        this.nro_mvto_aporte = nro_mvto_aporte;
        this.fecha_aporte = fecha_aporte;
        this.valor_aporte = valor_aporte;
        this.opcion_inversion = opcion_inversion;
        this.total_opcion = total_opcion;
        this.total_aportes = total_aportes;
        this.balance_encargo = balance_encargo;
        this.total_egrexapo = total_egrexapo;
        this.total_tras = total_tras;
        this.retencion_contigente = retencion_contigente;
        this.rendimientos = rendimientos;
        this.comision = comision;
        this.capital = capital;
        this.rendimientos_netos = rendimientos_netos;
    }
}
