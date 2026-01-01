import { formatCurrency } from './calculations';
import { HourlyScenarioResult } from '../types';

export const generateHourlyScenarioReport = (scenario: HourlyScenarioResult) => {
    const lines = [];
    lines.push('===============================');
    lines.push(`   RELATÓRIO - ${scenario.nome.toUpperCase()}`);
    lines.push('   SIMULADOR DE PRECIFICAÇÃO POR HORA');
    lines.push('===============================');
    lines.push('');

    lines.push('--- VISÃO GERAL ---');
    lines.push(`Horas no mês: ${scenario.horasNoMes.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}h`);
    lines.push(`Valor por dia: ${formatCurrency(scenario.valorPorDia)}`);
    lines.push(`Valor semanal: ${formatCurrency(scenario.valorSemanal)}`);
    lines.push(`Valor mensal total: ${formatCurrency(scenario.valorMensalTotal)}`);
    lines.push('');

    lines.push('--- PAGAMENTO ---');
    lines.push(`Entrada: ${formatCurrency(scenario.entradaReais)} (${scenario.entradaPercentual.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%)`);
    lines.push(`Valor financiado: ${formatCurrency(scenario.valorFinanciado)}`);
    lines.push(`Total do contrato: ${formatCurrency(scenario.totalContrato)}`);
    lines.push('');

    lines.push('--- PARCELAMENTO SEMANAL ---');
    lines.push(`Número de parcelas: ${scenario.numeroParcelas}x`);
    lines.push(`Valor da parcela semanal: ${formatCurrency(scenario.valorParcelaSemanal)}`);
    lines.push(`Valor mensal estimado: ${formatCurrency(scenario.valorMensalEstimado)}`);
    lines.push(`Valor diário médio: ${formatCurrency(scenario.valorDiarioMedio)}`);
    lines.push('');

    lines.push('--- CRONOGRAMA ---');
    lines.push(`Data primeira parcela: ${scenario.dataPrimeiraParcela}`);
    lines.push(`Data última parcela: ${scenario.dataUltimaParcela}`);
    lines.push('');

    lines.push('Datas das parcelas semanais:');
    scenario.datasSemanais.forEach((date: string, index: number) => {
        lines.push(`  ${index + 1}ª parcela: ${date}`);
    });
    lines.push('');
    lines.push('===============================');
    lines.push('Gerado pela Calculadora RPA Soares Logística');
    lines.push('===============================');

    const content = lines.join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio_hora_${scenario.nome.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
