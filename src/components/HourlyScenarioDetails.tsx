import React from 'react';
import { HourlyScenarioResult } from '../types';
import { formatCurrency } from '../utils/calculations';
import { generateHourlyScenarioReport } from '../utils/exportHourlyToTxt';
import { Download, Calendar } from 'lucide-react';

interface HourlyScenarioDetailsProps {
    scenario: HourlyScenarioResult;
}

export const HourlyScenarioDetails: React.FC<HourlyScenarioDetailsProps> = ({ scenario }) => {
    return (
        <div className="p-6 bg-gray-50 border-t border-gray-200">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                Detalhes de {scenario.nome}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Coluna 1: Visão Geral */}
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <h5 className="font-semibold text-gray-600 mb-3 border-b pb-1">Visão Geral</h5>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Horas no Mês:</span>
                            <span className="font-medium text-gray-900">
                                {scenario.horasNoMes.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}h
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Valor Diário:</span>
                            <span className="font-medium text-gray-900">{formatCurrency(scenario.valorPorDia)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Valor Semanal:</span>
                            <span className="font-medium text-gray-900">{formatCurrency(scenario.valorSemanal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Valor Mensal Total:</span>
                            <span className="font-medium text-green-700">{formatCurrency(scenario.valorMensalTotal)}</span>
                        </div>
                    </div>
                </div>

                {/* Coluna 2: Pagamento */}
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <h5 className="font-semibold text-gray-600 mb-3 border-b pb-1">Pagamento</h5>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Entrada (R$):</span>
                            <span className="font-medium text-gray-900">{formatCurrency(scenario.entradaReais)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Entrada (%):</span>
                            <span className="font-medium text-gray-900">
                                {scenario.entradaPercentual.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Valor Financiado:</span>
                            <span className="font-medium text-blue-600">{formatCurrency(scenario.valorFinanciado)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Total Contrato:</span>
                            <span className="font-medium text-green-700">{formatCurrency(scenario.totalContrato)}</span>
                        </div>
                    </div>
                </div>

                {/* Coluna 3: Parcelamento */}
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <h5 className="font-semibold text-gray-600 mb-3 border-b pb-1">Parcelamento</h5>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Nº de Parcelas:</span>
                            <span className="font-medium text-gray-900">{scenario.numeroParcelas}x</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Valor Semanal:</span>
                            <span className="font-medium text-gray-900">{formatCurrency(scenario.valorParcelaSemanal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Valor Mensal Est.:</span>
                            <span className="font-medium text-gray-900">{formatCurrency(scenario.valorMensalEstimado)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Valor Diário Médio:</span>
                            <span className="font-medium text-gray-500 text-xs mt-1">{formatCurrency(scenario.valorDiarioMedio)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cronograma de parcelas */}
            {scenario.datasSemanais.length > 0 && (
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100 mb-6">
                    <h5 className="font-semibold text-gray-600 mb-3 border-b pb-1">Cronograma de Parcelas Semanais</h5>
                    <div className="flex flex-wrap gap-2">
                        {scenario.datasSemanais.map((date, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                            >
                                {index + 1}ª: {date}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-md border border-gray-100">
                <div className="flex gap-4 text-sm text-gray-600 mb-4 sm:mb-0">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Início: <b>{scenario.dataPrimeiraParcela}</b></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Fim: <b>{scenario.dataUltimaParcela}</b></span>
                    </div>
                </div>

                <button
                    onClick={() => generateHourlyScenarioReport(scenario)}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Exportar Cenário (.txt)
                </button>
            </div>
        </div>
    );
};
