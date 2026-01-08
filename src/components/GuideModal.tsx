import React from 'react';
import { X, BookOpen, Layers, Coins, Target } from 'lucide-react';

interface GuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-6 text-white flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <BookOpen className="w-6 h-6" />
                            Guia de Precificação IA
                        </h2>
                        <p className="text-purple-100 mt-1 opacity-90">Como estruturar sua proposta de valor de forma justa e lucrativa.</p>
                    </div>
                    <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">

                    {/* Section 1 */}
                    <div className="flex gap-4">
                        <div className="bg-purple-100 p-3 rounded-xl h-fit">
                            <Layers className="w-6 h-6 text-purple-700" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Setup vs. Recorrência</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Diferente de software tradicional, Agentes de IA tem um custo contínuo alto (LLM).
                                Por isso, cobramos em duas partes:
                                <br /><br />
                                <strong className="text-purple-700">1. Setup (Implantação):</strong> Cobra o desenvolvimento dos workflows (n8n), engenharia de prompt e integração. É onde está seu lucro maior de entrada.
                                <br />
                                <strong className="text-green-700">2. Recorrência (Fee Mensal):</strong> Cobre a manutenção, hospedagem e <span className="italic">custos de API</span>. Nunca absorva o custo da API da OpenAI/Anthropic, repasse ao cliente ou cobre uma mensalidade que cubra com folga.
                            </p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="flex gap-4">
                        <div className="bg-yellow-100 p-3 rounded-xl h-fit">
                            <Coins className="w-6 h-6 text-yellow-700" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Entendendo os Tokens</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Tokens são a moeda das IAs. Uma conversa média de suporte gasta cerca de <strong>1.000 a 2.000 tokens</strong> (entre pergunta do usuário e resposta do bot).
                                <br /><br />
                                Use o <strong className="text-blue-600">Assistente de Tokens</strong> na calculadora para estimar o volume mensal baseado no número de atendimentos diários do seu cliente. Sempre estime para cima para evitar prejuízo na mensalidade.
                            </p>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="flex gap-4">
                        <div className="bg-green-100 p-3 rounded-xl h-fit">
                            <Target className="w-6 h-6 text-green-700" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Margem Saudável</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Projetos de IA tem alta complexidade e risco de "alucinação" ou falha.
                                Recomenda-se uma <strong>margem mínima de 40% a 50%</strong> no Setup para cobrir horas extras de "fine-tuning" (ajuste fino) que sempre acontecem no final do projeto.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
                    <button
                        onClick={onClose}
                        className="px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        Entendi, vamos precificar!
                    </button>
                </div>
            </div>
        </div>
    );
};
