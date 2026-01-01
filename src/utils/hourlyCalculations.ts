import { addDays, format } from 'date-fns';
import { HourlyScenarioData, HourlyScenarioResult, Participant } from '../types';
import { parseCurrency } from './calculations';

export const calculateHourlyScenario = (scenario: HourlyScenarioData, participants: Participant[] = []): HourlyScenarioResult => {
    const result: HourlyScenarioResult = {
        id: scenario.id,
        nome: `Cenário ${scenario.id}`,
        // Visão Geral
        valorHora: 0,
        horasNoMes: 0,
        valorPorDia: 0,
        valorSemanal: 0,
        valorMensalTotal: 0,
        // Pagamento
        entradaReais: 0,
        entradaPercentual: 0,
        valorFinanciado: 0,
        totalContrato: 0,
        // Parcelamento
        numeroParcelas: 0,
        valorParcelaSemanal: 0,
        valorMensalEstimado: 0,
        valorDiarioMedio: 0,
        // Divisão de lucros
        participantsShares: [],
        // Cronograma
        dataPrimeiraParcela: '',
        dataUltimaParcela: '',
        datasSemanais: [],
    };

    try {
        // Parse inputs
        const valorHora = parseCurrency(scenario.valorHora);
        const horasPorDia = parseFloat(scenario.horasPorDia) || 0;
        const diasPorSemana = parseFloat(scenario.diasPorSemana) || 0;
        const semanasPorMes = parseFloat(scenario.semanasPorMes) || 4.345;
        const entradaReaisInput = parseCurrency(scenario.entradaReais);
        const entradaPctInput = parseFloat(scenario.entradaPercentual.replace(',', '.')) || 0;
        const parcelasSemanais = parseInt(scenario.parcelasSemanais) || 0;

        // Validações básicas - prevenção de divisão por zero
        if (valorHora <= 0 || horasPorDia <= 0 || diasPorSemana <= 0) {
            return result;
        }

        // Armazena valor por hora no resultado
        result.valorHora = valorHora;

        // 1) Horas no mês = horasPorDia × diasPorSemana × semanasPorMes
        result.horasNoMes = horasPorDia * diasPorSemana * semanasPorMes;

        // 2) Valor por dia = valorHora × horasPorDia
        result.valorPorDia = valorHora * horasPorDia;

        // 3) Valor semanal = valorPorDia × diasPorSemana
        result.valorSemanal = result.valorPorDia * diasPorSemana;

        // 4) Valor mensal total = valorSemanal × semanasPorMes
        result.valorMensalTotal = result.valorSemanal * semanasPorMes;

        // 5) Total do contrato = valor mensal total (representa 1 mês de trabalho)
        result.totalContrato = result.valorMensalTotal;

        // 6) Lógica de Entrada: Valor em R$ tem prioridade, se não, usa %
        let entradaVal = 0;
        let entradaPct = 0;

        if (entradaReaisInput > 0) {
            // Valor em R$ informado - calcula o percentual
            entradaVal = entradaReaisInput;
            entradaPct = (entradaVal / result.valorMensalTotal) * 100;
        } else if (entradaPctInput > 0) {
            // Apenas percentual informado - calcula o valor em R$
            entradaPct = entradaPctInput;
            entradaVal = result.valorMensalTotal * (entradaPct / 100);
        }

        result.entradaReais = entradaVal;
        result.entradaPercentual = entradaPct;

        // 7) Valor financiado = valorMensalTotal - entradaReais
        result.valorFinanciado = Math.max(0, result.valorMensalTotal - result.entradaReais);

        // 8) Parcelamento semanal
        if (parcelasSemanais > 0) {
            result.numeroParcelas = parcelasSemanais;

            // Valor parcela semanal = valorFinanciado / parcelasSemanais
            result.valorParcelaSemanal = result.valorFinanciado / parcelasSemanais;

            // Valor mensal estimado = valorParcelaSemanal × 4.345 (semanas por mês)
            result.valorMensalEstimado = result.valorParcelaSemanal * 4.345;

            // Valor diário médio = valorParcelaSemanal / 7
            result.valorDiarioMedio = result.valorParcelaSemanal / 7;

            // 9) Divisão de lucros entre participantes
            result.participantsShares = participants.map(p => ({
                name: p.name,
                percentage: p.percentage,
                shareTotal: result.valorFinanciado * (p.percentage / 100),
                shareMensal: result.valorParcelaSemanal * 4.345 * (p.percentage / 100)
            }));

            // 10) Cronograma de parcelas semanais
            if (scenario.dataPrimeiraParcela) {
                const [y, m, d] = scenario.dataPrimeiraParcela.split('-').map(Number);
                const startDate = new Date(y, m - 1, d);

                result.dataPrimeiraParcela = format(startDate, 'dd/MM/yyyy');

                // Gerar datas semanais
                for (let i = 0; i < parcelasSemanais; i++) {
                    const date = addDays(startDate, 7 * i);
                    result.datasSemanais.push(format(date, 'dd/MM/yyyy'));
                    if (i === parcelasSemanais - 1) {
                        result.dataUltimaParcela = format(date, 'dd/MM/yyyy');
                    }
                }
            }
        }

    } catch (e) {
        result.error = "Erro no cálculo";
    }

    return result;
};
