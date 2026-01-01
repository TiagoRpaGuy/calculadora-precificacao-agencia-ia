import { useState } from 'react';
import { HourlyScenarioData, HourlyScenarioResult, Participant } from '../types';
import { calculateHourlyScenario } from '../utils/hourlyCalculations';
import { HourlyScenarioCard } from '../components/HourlyScenarioCard';
import { HourlyResultsTable } from '../components/HourlyResultsTable';
import { Clock, Users, Plus, Trash2, AlertCircle } from 'lucide-react';

const createDefaultScenario = (id: number): HourlyScenarioData => ({
    id,
    valorHora: '',
    horasPorDia: '8',
    diasPorSemana: '5',
    semanasPorMes: '4.345',
    entradaReais: '',
    entradaPercentual: '',
    dataPrimeiraParcela: '',
    parcelasSemanais: '4',
});

export function HourlyPricingPage() {
    const [numScenarios, setNumScenarios] = useState<number>(1);
    const [scenarios, setScenarios] = useState<HourlyScenarioData[]>([
        createDefaultScenario(1)
    ]);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [results, setResults] = useState<HourlyScenarioResult[]>([]);

    // Handle number of scenarios change
    const handleNumScenariosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val >= 1 && val <= 10) {
            setNumScenarios(val);

            setScenarios(prev => {
                const newScenarios = [...prev];
                if (val > prev.length) {
                    for (let i = prev.length; i < val; i++) {
                        newScenarios.push(createDefaultScenario(i + 1));
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
    const handleScenarioChange = (id: number, field: keyof HourlyScenarioData, value: string) => {
        setScenarios(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
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
        const calculated: HourlyScenarioResult[] = scenarios.map(s => {
            return calculateHourlyScenario(s, participants);
        });
        setResults(calculated);
    };

    return (
        <>
            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Simulador de Precificação por Hora</h2>
                        <p className="text-sm text-gray-500">Calcule cenários baseados em valor da hora trabalhada</p>
                    </div>
                </div>

                {/* Configuração de Participantes */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5 text-purple-600" />
                        Configuração de Participantes
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {participants.map((p) => (
                            <div key={p.id} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <div className="flex-1">
                                    <label className="block text-xs text-gray-500 mb-1">Nome</label>
                                    <input
                                        type="text"
                                        value={p.name}
                                        onChange={(e) => updateParticipant(p.id, 'name', e.target.value)}
                                        className="w-full text-sm border-gray-300 rounded focus:ring-purple-500 border p-1"
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
                                            className="w-full text-sm border-gray-300 rounded focus:ring-purple-500 border p-1 pr-6"
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
                            className="flex items-center justify-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-200 border-dashed rounded-lg p-3 transition-colors h-full min-h-[80px]"
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

                {/* Quantidade de Cenários */}
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
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
                            className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                            placeholder="Ex: 3"
                        />
                        <span className="text-sm text-gray-500">(máximo 10)</span>
                    </div>
                </div>
            </section>

            {/* Dynamic Scenarios Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {scenarios.map((scenario) => (
                    <HourlyScenarioCard
                        key={scenario.id}
                        scenario={scenario}
                        onChange={handleScenarioChange}
                    />
                ))}
            </section>

            <div className="text-center mb-12">
                <button
                    onClick={handleCalculate}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-12 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95 text-lg"
                >
                    Calcular Cenários
                </button>
            </div>

            {/* Results */}
            <HourlyResultsTable results={results} />
        </>
    );
}
