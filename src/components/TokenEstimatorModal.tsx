import React, { useState } from 'react';
import { X, Calculator, MessageSquare } from 'lucide-react';

interface TokenEstimatorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (tokens: number) => void;
}

export const TokenEstimatorModal: React.FC<TokenEstimatorModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    const [conversationsPerDay, setConversationsPerDay] = useState(50);
    const [msgsPerConversation, setMsgsPerConversation] = useState(10);

    // Premissa: Cada mensagem (pergunta + resposta) consome ~1000 tokens (contexto + resposta)
    // Ajustável conforme necessidade, mas "1000" é uma boa média para conversas RAG
    const TOKENS_PER_EXCHANGE = 1000;

    const calculatedTokens = conversationsPerDay * msgsPerConversation * 30 * TOKENS_PER_EXCHANGE;

    const handleConfirm = () => {
        onConfirm(calculatedTokens);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 rounded-t-xl flex justify-between items-center text-white">
                    <h3 className="font-bold flex items-center gap-2">
                        <Calculator className="w-5 h-5" />
                        Assistente de Tokens
                    </h3>
                    <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Conversas / Dia
                        </label>
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                                type="number"
                                className="w-full pl-9 p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                value={conversationsPerDay}
                                onChange={(e) => setConversationsPerDay(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trocas de Msg / Conversa
                        </label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            value={msgsPerConversation}
                            onChange={(e) => setMsgsPerConversation(Number(e.target.value))}
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Considerando aprox. {TOKENS_PER_EXCHANGE} tokens por troca (Input + Contexto + Output).
                        </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
                        <p className="text-xs text-blue-600 font-bold uppercase mb-1">Estimativa Mensal</p>
                        <p className="text-2xl font-black text-blue-700">
                            {calculatedTokens.toLocaleString('pt-BR')} <span className="text-sm font-normal text-blue-600">tokens</span>
                        </p>
                    </div>

                    <button
                        onClick={handleConfirm}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                    >
                        Aplicar Estimativa
                    </button>
                </div>
            </div>
        </div>
    );
};
