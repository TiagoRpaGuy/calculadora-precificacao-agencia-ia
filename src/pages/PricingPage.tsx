import { useState } from 'react';
import { ScenarioData, ScenarioResult } from '../types';
import { calculateScenario } from '../utils/calculations';
import { ScenarioCard } from '../components/ScenarioCard';
import { ResultsTable } from '../components/ResultsTable';
import { Users, Plus, Trash2, AlertCircle } from 'lucide-react';
import { CurrencyInput } from '../components/CurrencyInput';
import { Participant } from '../types';

export function PricingPage() {
    const [numScenarios, setNumScenarios] = useState<number>(1);
    const [scenarios, setScenarios] = useState<ScenarioData[]>([
        { id: 1, totalProjeto: '', entradaReais: '', entradaPercentual: '', parcelas: '', dataPrimeiraParcela: '' }
    ]);
    const [participants, setParticipants] = useState<Participant[]>([
        { id: 1, name: 'Participante 1', percentage: 70 },
        { id: 2, name: 'Participante 2', percentage: 30 }
    ]);
    const [results, setResults] = useState<ScenarioResult[]>([]);
    const [globalTotal, setGlobalTotal] = useState<string>('');

    // Handle number of scenarios change
    const handleNumScenariosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val >= 1 && val <= 10) {
            setNumScenarios(val);

            setScenarios(prev => {
                const newScenarios = [...prev];
                if (val > prev.length) {
                    for (let i = prev.length; i < val; i++) {
                        newScenarios.push({
                            id: i + 1,
                            totalProjeto: globalTotal,
                            entradaReais: '',
                            entradaPercentual: '',
                            parcelas: '',
                            dataPrimeiraParcela: ''
                        });
                    }
                } else {
                    newScenarios.length = val;
                }
                return newScenarios;
            });
        } else if (e.target.value === '') {
            setNumScenarios(Number(e.target.value));
        }
    };

    // Handle scenario data change
    const handleScenarioChange = (id: number, field: keyof ScenarioData, value: string) => {
        setScenarios(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleGlobalTotalChange = (val: string) => {
        setGlobalTotal(val);
        setScenarios(prev => prev.map(s => ({ ...s, totalProjeto: val })));
    };

    // Participant handlers
    const addParticipant = () => {
        const newId = participants.length > 0 ? Math.max(...participants.map(p => p.id)) + 1 : 1;
        setParticipants([...participants, { id: newId, name: `Participante ${newId}`, percentage: 0 }]);
    };

    const removeParticipant = (id: number) => {
        if (participants.length <= 1) return;
        setParticipants(participants.filter(p => p.id !== id));
    };

    const updateParticipant = (id: number, field: keyof Participant, value: string | number) => {
        setParticipants(participants.map(p => {
            if (p.id === id) {
                return { ...p, [field]: value };
            }
            return p;
        }));
    };

    const totalPercentage = participants.reduce((sum, p) => sum + p.percentage, 0);

    const handleCalculate = () => {
        const calculated: ScenarioResult[] = scenarios.map(s => {
            return calculateScenario(s, participants, parseFloat(globalTotal));
        });
        setResults(calculated);
    };

    return (
        <>
            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="mb-6 pb-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5 text-blue-600" />
                        Configuração de Participantes
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {participants.map((p) => (
                            <div key={p.id} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <div className="flex-1">
                                    <label className="block text-xs text-gray-500 mb-1">Nome</label>
                                    <input
                                        type="text"
                                        value={p.name}
                                        onChange={(e) => updateParticipant(p.id, 'name', e.target.value)}
                                        className="w-full text-sm border-gray-300 rounded focus:ring-blue-500 border p-1"
                                    />
                                </div>
                                <div className="w-24">
                                    <label className="block text-xs text-gray-500 mb-1">Participação %</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={p.percentage}
                                            onChange={(e) => updateParticipant(p.id, 'percentage', parseFloat(e.target.value) || 0)}
                                            className="w-full text-sm border-gray-300 rounded focus:ring-blue-500 border p-1 pr-6"
                                        />
                                        <span className="absolute right-2 top-1 text-gray-400 text-xs">%</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeParticipant(p.id)}
                                    className="mt-5 p-1 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Remover participante"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addParticipant}
                            className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 border-dashed rounded-lg p-3 transition-colors h-full"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="font-medium">Adicionar</span>
                        </button>
                    </div>

                    {totalPercentage !== 100 && (
                        <div className={`flex items-center gap-2 text-sm p-3 rounded-md ${totalPercentage > 100 ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
                            <AlertCircle className="w-4 h-4" />
                            <span>
                                Atenção: O total das porcentagens é <b>{totalPercentage}%</b>.
                                {totalPercentage !== 100 && " O ideal é que feche em 100%."}
                            </span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    {/* Global Total Input */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <CurrencyInput
                            label="Valor Total do Projeto (Global)"
                            value={globalTotal}
                            onValueChange={handleGlobalTotalChange}
                            className="bg-white"
                        />
                        <p className="text-xs text-blue-600 mt-1">
                            Define o valor padrão para todos os cenários.
                        </p>
                    </div>

                    {/* Number of Scenarios */}
                    <div className="p-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Quantidade de Cenários
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={String(numScenarios)}
                                onChange={handleNumScenariosChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                                placeholder="Ex: 3"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Dynamic Scenarios Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {scenarios.map((scenario, index) => (
                    <ScenarioCard
                        key={scenario.id}
                        scenario={scenario}
                        index={index}
                        onChange={handleScenarioChange}
                    />
                ))}
            </section>

            <div className="text-center mb-12">
                <button
                    onClick={handleCalculate}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-12 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95 text-lg"
                >
                    Calcular Cenários
                </button>
            </div>

            {/* Results */}
            <ResultsTable results={results} />
        </>
    );
}
