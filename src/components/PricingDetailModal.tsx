import React from 'react';
import { X, Calculator } from 'lucide-react';
import { AiProjectResult } from '../types/ai';

interface PricingDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    result: AiProjectResult;
}

export const PricingDetailModal: React.FC<PricingDetailModalProps> = ({ isOpen, onClose, result }) => {
    if (!isOpen) return null;

    const formatCurrency = (val: number) => {
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const breakdown = result.breakdown;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gray-900 text-white p-6 sticky top-0 z-10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Calculator className="w-6 h-6 text-purple-400" />
                        <div>
                            <h2 className="text-xl font-bold">Detalhamento de Custos</h2>
                            <p className="text-gray-400 text-xs">Composição transparente do preço sugerido</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* SETUP SECTION */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                            <span className="bg-purple-100 text-purple-700 font-bold px-2 py-1 rounded text-xs uppercase">Fase 1</span>
                            <h3 className="text-lg font-bold text-gray-800">Investimento de Setup</h3>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 space-y-3 font-mono text-sm border border-gray-100">
                            {/* Base */}
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-gray-700 font-medium">Mão de Obra (Horas)</span>
                                    <span className="text-gray-400 text-xs">{result.estimatedHours}h estimadas</span>
                                </div>
                                <span className="font-bold">{formatCurrency(breakdown.hoursValue)}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-medium">Custos Fixos de Integração</span>
                                <span className="font-bold">{formatCurrency(breakdown.integrationsValue)}</span>
                            </div>

                            <div className="border-t border-dashed border-gray-300 my-2"></div>

                            {/* Markups */}
                            {breakdown.complexityAddon > 0 && (
                                <div className="flex justify-between items-center text-blue-700">
                                    <span>+ Adicional de Complexidade</span>
                                    <span>{formatCurrency(breakdown.complexityAddon)}</span>
                                </div>
                            )}

                            {breakdown.aiTechAddon > 0 && (
                                <div className="flex justify-between items-center text-indigo-700">
                                    <span>+ Stack Tecnológico (IA/RAG)</span>
                                    <span>{formatCurrency(breakdown.aiTechAddon)}</span>
                                </div>
                            )}

                            {breakdown.urgencyAddon > 0 && (
                                <div className="flex justify-between items-center text-red-600 bg-red-50 p-1 -mx-1 rounded">
                                    <span className="flex items-center gap-1 font-bold">Taxa de Urgência</span>
                                    <span className="font-bold">{formatCurrency(breakdown.urgencyAddon)}</span>
                                </div>
                            )}

                            {breakdown.ipTransferAddon > 0 && (
                                <div className="flex justify-between items-center text-emerald-700 bg-emerald-50 p-1 -mx-1 rounded">
                                    <span className="flex items-center gap-1 font-bold">Transferência de IP (Código)</span>
                                    <span className="font-bold">{formatCurrency(breakdown.ipTransferAddon)}</span>
                                </div>
                            )}

                            <div className="border-t border-gray-300 my-2 pt-2">
                                <div className="flex justify-between items-center text-gray-500">
                                    <span>Subtotal (Custo + Markups)</span>
                                    <span>{formatCurrency(result.finalSetupValue - breakdown.marginAddon)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-green-700 font-medium bg-green-50 p-2 rounded">
                                <span>+ Margem de Lucro (Agência)</span>
                                <span>{formatCurrency(breakdown.marginAddon)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-xl shadow-lg">
                            <span className="font-medium">Valor Final Setup</span>
                            <span className="text-2xl font-bold">{formatCurrency(result.finalSetupValue)}</span>
                        </div>
                    </div>

                    {/* MONTHLY SECTION */}
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                            <span className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded text-xs uppercase">Fase 2</span>
                            <h3 className="text-lg font-bold text-gray-800">Recorrência Mensal</h3>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 space-y-3 font-mono text-sm border border-gray-100">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Custo Infraestrutura (Server)</span>
                                <span>{formatCurrency(result.infraCost)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Custo Tokens (Consumo IA)</span>
                                <span>{formatCurrency(result.tokenCost)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Fee de Suporte Mensal</span>
                                <span>{formatCurrency(result.baseMonthlyCost - result.infraCost - result.tokenCost)}</span>
                            </div>
                            <div className="border-t border-gray-300 my-2 pt-2 flex justify-between items-center text-green-700">
                                <span>+ Margem Recorrência</span>
                                <span>{formatCurrency(result.finalMonthlyValue - result.baseMonthlyCost)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-xl shadow-lg">
                            <span className="font-medium">Mensalidade Total</span>
                            <span className="text-2xl font-bold">{formatCurrency(result.finalMonthlyValue)}</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-sm font-medium"
                    >
                        Fechar Detalhes
                    </button>
                </div>
            </div>
        </div>
    );
};
