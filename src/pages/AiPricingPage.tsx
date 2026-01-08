import React, { useState, useEffect } from 'react';
import { Brain, Server, Rocket, FileText, DollarSign, Cpu, Network } from 'lucide-react';
import { AiProjectInputs, AiProjectResult } from '../types/ai';
import { calculateAiProject } from '../utils/aiCalculations';
import { exportAiProposalToPdf } from '../utils/exportAiPdf';
import { CurrencyInput } from '../components/CurrencyInput';

export const AiPricingPage: React.FC = () => {
    // Estado inicial dos inputs
    const [inputs, setInputs] = useState<AiProjectInputs>({
        workflowsCount: 5,
        integrationsCount: 3,
        complexity: 'medium',
        model: 'gpt-4o',
        hasRag: false,
        hasMemory: false,
        hosting: 'cloud',
        estimatedTokens: 1000000, // 1M tokens
        roi: 'medium',
        isUrgent: false,
        hasIpTransfer: false,
        hourlyRate: 200,
        integrationCost: 500,
        supportFee: 2000,
        marginSetup: 40,
        marginRecurring: 50
    });

    const [result, setResult] = useState<AiProjectResult | null>(null);

    // Calcular sempre que inputs mudarem
    useEffect(() => {
        const res = calculateAiProject(inputs);
        setResult(res);
    }, [inputs]);

    const handleInputChange = (field: keyof AiProjectInputs, value: string | number | boolean) => {
        setInputs(prev => ({ ...prev, [field]: value }));
    };

    // Helper para converter número para string formatada (apenas visual, CurrencyInput faz o resto)
    // Mas o CurrencyInput espera recebe string "R$ 0,00".
    // Se o state ja é numero, a gente formata antes de passar.
    const formatCurrencyForInput = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
    };

    // CurrencyInput onValueChange retorna string formatada "R$ 1.000,00"
    // Precisamos limpar para salvar no state como number
    const handleCurrencyChange = (field: keyof AiProjectInputs, valString: string) => {
        // Remove R$, pontos e troca virgula por ponto
        const clean = valString.replace(/[R$\s.]/g, '').replace(',', '.');
        const num = parseFloat(clean);
        handleInputChange(field, isNaN(num) ? 0 : num);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                    <Brain className="w-6 h-6 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-800">Parâmetros do Projeto de IA</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Coluna 1: Escopo e Complexidade */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase flex items-center gap-2">
                            <Network className="w-4 h-4" /> Escopo n8n
                        </h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Qtd. Workflows</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                value={inputs.workflowsCount}
                                onChange={(e) => handleInputChange('workflowsCount', Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Qtd. Nodes (Integrações)</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                value={inputs.integrationsCount}
                                onChange={(e) => handleInputChange('integrationsCount', Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Complexidade Lógica</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                value={inputs.complexity}
                                onChange={(e) => handleInputChange('complexity', e.target.value)}
                            >
                                <option value="low">Baixa (+0%)</option>
                                <option value="medium">Média (+30%)</option>
                                <option value="high">Alta (+60%)</option>
                            </select>
                        </div>
                    </div>

                    {/* Coluna 2: Camada de IA e Infra */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase flex items-center gap-2">
                            <Cpu className="w-4 h-4" /> Camada de IA & Infra
                        </h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Modelo LLM</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                value={inputs.model}
                                onChange={(e) => handleInputChange('model', e.target.value)}
                            >
                                <option value="gpt-4o">GPT-4o (OpenAI)</option>
                                <option value="claude-3-5">Claude 3.5 Sonnet (Anthropic)</option>
                                <option value="gemini-pro">Gemini Pro (Google)</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded text-purple-600 focus:ring-purple-500"
                                    checked={inputs.hasRag}
                                    onChange={(e) => handleInputChange('hasRag', e.target.checked)}
                                />
                                RAG / Base de Conhecimento
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded text-purple-600 focus:ring-purple-500"
                                    checked={inputs.hasMemory}
                                    onChange={(e) => handleInputChange('hasMemory', e.target.checked)}
                                />
                                Memória Persistente (Vetorial)
                            </label>
                        </div>
                        <div className="pt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Estimativa Tokens/Mês</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                value={inputs.estimatedTokens}
                                onChange={(e) => handleInputChange('estimatedTokens', Number(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Coluna 3: Negócio e Financeiro */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase flex items-center gap-2">
                            <DollarSign className="w-4 h-4" /> Financeiro
                        </h3>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <CurrencyInput
                                    label="Valor/Hora (R$)"
                                    value={formatCurrencyForInput(inputs.hourlyRate)}
                                    onValueChange={(v: string) => handleCurrencyChange('hourlyRate', v)}
                                    className="text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Margem Setup (%)</label>
                                <input
                                    type="number"
                                    value={inputs.marginSetup}
                                    onChange={(e) => handleInputChange('marginSetup', Number(e.target.value))}
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>

                        <div>
                            <CurrencyInput
                                label="Custo Integrações (R$)"
                                value={formatCurrencyForInput(inputs.integrationCost)}
                                onValueChange={(v: string) => handleCurrencyChange('integrationCost', v)}
                            />
                        </div>

                        <div className="flex flex-col gap-2 pt-2">
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer text-red-600 font-medium">
                                <input
                                    type="checkbox"
                                    className="rounded text-red-600 focus:ring-red-500"
                                    checked={inputs.isUrgent}
                                    onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                                />
                                Urgência (+25%)
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded text-purple-600 focus:ring-purple-500"
                                    checked={inputs.hasIpTransfer}
                                    onChange={(e) => handleInputChange('hasIpTransfer', e.target.checked)}
                                />
                                Transferência de IP (Código Fonte)
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {result && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Setup Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Investimento de Setup</h3>
                                    <p className="text-sm text-gray-500">Desenvolvimento & Implementação</p>
                                </div>
                                <Rocket className="w-8 h-8 text-purple-500 opacity-20" />
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Estimativa de Horas:</span>
                                    <span className="font-medium">{result.estimatedHours}h</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Base (Horas + Int.):</span>
                                    <span className="font-medium">R$ {result.baseSetupValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-sm text-purple-700 bg-purple-50 p-1 rounded">
                                    <span>Adicional Tec/Complex:</span>
                                    <span>+ R$ {result.complexityMarkup.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-xs text-gray-500 mb-1">Valor Total do Projeto</p>
                                <p className="text-3xl font-extrabold text-gray-900">
                                    R$ {result.finalSetupValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-600"></div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Recorrência Mensal</h3>
                                    <p className="text-sm text-gray-500">Manutenção, Infra e Suporte</p>
                                </div>
                                <Server className="w-8 h-8 text-green-500 opacity-20" />
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Infraestrutura:</span>
                                    <span className="font-medium">R$ {result.infraCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Consumo Tokens:</span>
                                    <span className="font-medium">R$ {result.tokenCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-sm items-center">
                                    <span className="text-gray-600 w-1/2">Suporte Mensal:</span>
                                    <div className="w-1/2">
                                        <CurrencyInput
                                            label=""
                                            value={formatCurrencyForInput(inputs.supportFee)}
                                            onValueChange={(v: string) => handleCurrencyChange('supportFee', v)}
                                            className="text-right text-xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-xs text-gray-500 mb-1">Valor Mensalidade</p>
                                <p className="text-3xl font-extrabold text-green-700">
                                    R$ {result.finalMonthlyValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-end pt-4">
                <button
                    onClick={() => result && exportAiProposalToPdf(inputs, result)}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
                >
                    <FileText className="w-5 h-5" />
                    Exportar Orçamento em PDF
                </button>
            </div>
        </div>
    );
};
