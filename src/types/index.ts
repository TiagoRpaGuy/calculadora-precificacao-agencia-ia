export interface ScenarioData {
    id: number;
    totalProjeto: string;
    entradaReais: string;
    entradaPercentual: string;
    parcelas: string;
    dataPrimeiraParcela: string;
}

export interface Participant {
    id: number;
    name: string;
    percentage: number;
}

export interface ParticipantShare {
    name: string;
    percentage: number;
    shareTotal: number;
    shareMensal: number;
}

export interface ScenarioResult {
    id: number;
    nome: string;
    totalProjeto: number;
    entradaReais: number;
    entradaPercentual: number;
    valorFinanciado: number;
    quantidadeParcelas: number;
    valorParcelaMensal: number;
    valorParcelaSemanal: number;
    valorDiario: number;
    totalSemanas: number;
    participantsShares: ParticipantShare[];
    totalContrato: number;
    dataPrimeiraParcela: string;
    dataUltimaParcelaMensal: string;
    datasMensais: string[];
    datasSemanais: string[];
    error?: string;
}

// Dados de entrada do cenário por hora
export interface HourlyScenarioData {
    id: number;
    valorHora: string;          // Valor por hora (R$)
    horasPorDia: string;        // Horas trabalhadas por dia
    diasPorSemana: string;      // Dias trabalhados por semana
    semanasPorMes: string;      // Semanas no mês (default 4.345)
    entradaReais: string;       // Entrada em R$ (valor absoluto)
    entradaPercentual: string;  // % de entrada
    dataPrimeiraParcela: string;// Data da 1ª parcela
    parcelasSemanais: string;   // Quantidade de parcelas semanais
}

// Resultado calculado do cenário por hora
export interface HourlyScenarioResult {
    id: number;
    nome: string;
    // Visão Geral
    valorHora: number;          // Valor por hora utilizado
    horasNoMes: number;
    valorPorDia: number;
    valorSemanal: number;
    valorMensalTotal: number;
    // Pagamento
    entradaReais: number;
    entradaPercentual: number;
    valorFinanciado: number;
    totalContrato: number;
    // Parcelamento
    numeroParcelas: number;
    valorParcelaSemanal: number;
    valorMensalEstimado: number;
    valorDiarioMedio: number;
    // Divisão de lucros
    participantsShares: ParticipantShare[];
    // Cronograma
    dataPrimeiraParcela: string;
    dataUltimaParcela: string;
    datasSemanais: string[];
    error?: string;
}
