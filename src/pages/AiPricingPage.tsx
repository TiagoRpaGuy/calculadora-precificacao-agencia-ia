import React, { useState, useEffect } from 'react';
import { Brain, Server, Rocket, FileText, DollarSign, Cpu, Network, Info, TrendingUp, Calculator, Copy, Check, BookOpen } from 'lucide-react';
import { AiProjectInputs, AiProjectResult } from '../types/ai';
import { calculateAiProject } from '../utils/aiCalculations';
import { exportAiProposalToPdf } from '../utils/exportAiPdf';
import { CurrencyInput } from '../components/CurrencyInput';
import { PricingDetailModal } from '../components/PricingDetailModal';
import { TokenEstimatorModal } from '../components/TokenEstimatorModal';
import { Tooltip } from '../components/Tooltip';
import { GuideModal } from '../components/GuideModal';

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

        hasWhatsapp: false,
        whatsappServiceConversations: 100,
        whatsappMarketingConversations: 0,

        roi: 'medium',
        isUrgent: false,
        hasIpTransfer: false,
        hourlyRate: 200,
        integrationCost: 500,
        supportFee: 2000,
        monthlySavings: 50000, // Exemplo default

        marginSetup: 40,
        marginRecurring: 50
    });

    const [result, setResult] = useState<AiProjectResult | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [copyFeedback, setCopyFeedback] = useState(false);

    // Calcular sempre que inputs mudarem
    useEffect(() => {
        const res = calculateAiProject(inputs);
        setResult(res);
    }, [inputs]);

    const handleInputChange = (field: keyof AiProjectInputs, value: string | number | boolean) => {
        setInputs(prev => ({ ...prev, [field]: value }));
    };

    const formatCurrencyForInput = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
    };

    const handleCurrencyChange = (field: keyof AiProjectInputs, valString: string) => {
        const clean = valString.replace(/[R$\s.]/g, '').replace(',', '.');
        const num = parseFloat(clean);
        handleInputChange(field, isNaN(num) ? 0 : num);
    };

    const handleCopyProposal = () => {
        if (!result) return;

        const text = `🚀 *Proposta de Automação Inteligente*

🤖 *Investimento Único (Setup):* R$ ${result.finalSetupValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
🔄 *Manutenção Mensal:* R$ ${result.finalMonthlyValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

*O que está incluso:*
✅ ${inputs.workflowsCount} Fluxos Inteligentes
🧠 Modelo ${inputs.model.toUpperCase()}
📚 Base de Conhecimento (RAG): ${inputs.hasRag ? 'Sim' : 'Não'}
📱 WhatsApp Oficial: ${inputs.hasWhatsapp ? 'Sim' : 'Não'}

📈 *Retorno Projetado:* 
O sistema se paga em aprox. ${result.paybackMonths > 120 ? '+ de 10 anos' : result.paybackMonths.toFixed(1) + ' meses'} baseado na economia estimada.

Vamos agendar o início?`;

        navigator.clipboard.writeText(text).then(() => {
            setCopyFeedback(true);
            setTimeout(() => setCopyFeedback(false), 2000);
        });
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            {/* Header Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Brain className="w-6 h-6 text-purple-600" />
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Parâmetros do Projeto de IA</h2>
                        <p className="text-xs text-gray-500">Defina o escopo para calcular o investimento</p>
                    </div>
                </div>

                <button
                    onClick={() => setIsGuideOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium text-sm"
                >
                    <BookOpen className="w-4 h-4" />
                    Guia de Precificação
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                Complexidade Lógica
                                <Tooltip content="Baixa: fluxos lineares. Média (+30%): condicionais/loops. Alta (+60%): código customizado e tratamentos de erro complexos." />
                            </label>
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

                        <div className="pt-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                Estimativa Tokens/Mês
                                <Tooltip content="Consumo mensal de API. Use a calculadora ao lado para estimar com base em conversas." />
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    value={inputs.estimatedTokens}
                                    onChange={(e) => handleInputChange('estimatedTokens', Number(e.target.value))}
                                />
                                <button
                                    onClick={() => setIsTokenModalOpen(true)}
                                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                    title="Assistente de Tokens"
                                >
                                    <Calculator className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* WhatsApp Section */}
                        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                            <label className="flex items-center gap-2 text-sm font-bold text-green-800 cursor-pointer mb-2">
                                <input
                                    type="checkbox"
                                    className="rounded text-green-600 focus:ring-green-500"
                                    checked={inputs.hasWhatsapp}
                                    onChange={(e) => handleInputChange('hasWhatsapp', e.target.checked)}
                                />
                                Canal WhatsApp Oficial (Meta)
                            </label>

                            {inputs.hasWhatsapp && (
                                <div className="space-y-2 pl-6 animate-fade-in-down">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600">Conversas Serviço (User)</label>
                                        <input
                                            type="number"
                                            className="w-full p-1 text-sm border border-gray-300 rounded outline-none"
                                            value={inputs.whatsappServiceConversations}
                                            onChange={(e) => handleInputChange('whatsappServiceConversations', Number(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600">Conversas Mkt (Empresa)</label>
                                        <input
                                            type="number"
                                            className="w-full p-1 text-sm border border-gray-300 rounded outline-none"
                                            value={inputs.whatsappMarketingConversations}
                                            onChange={(e) => handleInputChange('whatsappMarketingConversations', Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 mt-2">
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded text-purple-600 focus:ring-purple-500"
                                    checked={inputs.hasRag}
                                    onChange={(e) => handleInputChange('hasRag', e.target.checked)}
                                />
                                <span className="flex items-center gap-2">
                                    RAG / Base de Conhecimento
                                    <Tooltip content="Adiciona custo de engenharia para configurar bancos vetoriais (Pinecone/Supabase) e processamento de documentos." />
                                </span>
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded text-purple-600 focus:ring-purple-500"
                                    checked={inputs.hasMemory}
                                    onChange={(e) => handleInputChange('hasMemory', e.target.checked)}
                                />
                                <span className="flex items-center gap-2">
                                    Memória Persistente (Vetorial)
                                    <Tooltip content="Habilita o agente a lembrar conversas passadas (banco de dados SQL/NoSQL)." />
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Coluna 3: Negócio e Financeiro */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase flex items-center gap-2">
                            <DollarSign className="w-4 h-4" /> Financeiro & Retorno
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
                                <label className="flex items-center gap-1 text-xs font-semibold text-gray-700 mb-1">
                                    Margem Setup (%)
                                    <Tooltip content="Lucro líquido desejado sobre o custo das horas de desenvolvimento." />
                                </label>
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

                        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                            <CurrencyInput
                                label="Economia Mensal Estimada (R$)"
                                value={formatCurrencyForInput(inputs.monthlySavings)}
                                onValueChange={(v: string) => handleCurrencyChange('monthlySavings', v)}
                                className='bg-white'
                            />
                            <p className="text-xs text-yellow-700 mt-1">Para cálculo de Payback</p>
                        </div>

                        <div className="flex flex-col gap-2 pt-2">
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer text-red-600 font-medium">
                                <input
                                    type="checkbox"
                                    className="rounded text-red-600 focus:ring-red-500"
                                    checked={inputs.isUrgent}
                                    onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                                />
                                <span className="flex items-center gap-2">
                                    Urgência (+25%)
                                    <Tooltip content="Adiciona taxa de prioridade (+25%) para projetos com prazos apertados." />
                                </span>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Setup Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Investimento Setup</h3>
                                    <p className="text-sm text-gray-500">Valor Único de Implantação</p>
                                </div>
                                <div className="flex flex-col gap-2 items-end">
                                    <Rocket className="w-8 h-8 text-purple-500 opacity-20" />
                                    <button
                                        onClick={() => setIsDetailModalOpen(true)}
                                        className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium"
                                    >
                                        <Info className="w-3 h-3" />
                                        Ver Detalhes
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 mt-8 border-t border-gray-100 text-center">
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
                                    <p className="text-sm text-gray-500">Manutenção & Custos</p>
                                </div>
                                <Server className="w-8 h-8 text-green-500 opacity-20" />
                            </div>

                            <div className="space-y-1 mb-4 text-sm text-gray-500">
                                <p className="flex justify-between"><span>Infra:</span> <b>{result.infraCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b></p>
                                <p className="flex justify-between"><span>Tokens:</span> <b>{result.tokenCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b></p>
                                {inputs.hasWhatsapp && (
                                    <p className="flex justify-between text-green-700"><span>WhatsApp:</span> <b>{result.whatsappCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b></p>
                                )}
                            </div>

                            <div className="pt-4 border-t border-gray-100 text-center">
                                <p className="text-3xl font-extrabold text-green-700">
                                    R$ {result.finalMonthlyValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ROI Card (NEW) */}
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg border border-yellow-200 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-yellow-900">Análise de ROI</h3>
                                    <p className="text-sm text-yellow-700">Retorno sobre Investimento</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-yellow-600 opacity-30" />
                            </div>

                            <div className="space-y-6 pt-2">
                                <div className="text-center">
                                    <p className="text-sm text-yellow-800 mb-1">Payback Estimado</p>
                                    <p className="text-4xl font-black text-yellow-600 leading-none">
                                        {result.paybackMonths > 120 ? '∞' : result.paybackMonths.toFixed(1)}
                                        <span className="text-lg font-medium text-yellow-700 ml-1">meses</span>
                                    </p>
                                </div>

                                <div className="text-center pt-4 border-t border-yellow-200/50">
                                    <p className="text-xs text-yellow-800 mb-1">Lucro Líquido Anual (Projetado)</p>
                                    <p className="text-xl font-bold text-green-700">
                                        R$ {result.projectedAnnualProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-end pt-4 gap-3">
                <button
                    onClick={handleCopyProposal}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all shadow-lg font-bold border-2 ${copyFeedback
                            ? 'bg-green-100 border-green-500 text-green-700'
                            : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50'
                        }`}
                >
                    {copyFeedback ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copyFeedback ? 'Copiado!' : 'Copiar Resumo'}
                </button>

                <button
                    onClick={() => result && exportAiProposalToPdf(inputs, result)}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
                >
                    <FileText className="w-5 h-5" />
                    Exportar PDF
                </button>
            </div>

            {/* Modals */}
            {result && (
                <PricingDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={() => setIsDetailModalOpen(false)}
                    result={result}
                />
            )}

            <TokenEstimatorModal
                isOpen={isTokenModalOpen}
                onClose={() => setIsTokenModalOpen(false)}
                onConfirm={(tokens) => handleInputChange('estimatedTokens', tokens)}
            />

            <GuideModal
                isOpen={isGuideOpen}
                onClose={() => setIsGuideOpen(false)}
            />
        </div>
    );
};
