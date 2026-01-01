import { useState } from 'react';
import { HourlyScenarioData, HourlyScenarioResult } from '../types';
import { calculateHourlyScenario } from '../utils/hourlyCalculations';
import { HourlyScenarioCard } from '../components/HourlyScenarioCard';
import { HourlyResultsTable } from '../components/HourlyResultsTable';
import { Clock } from 'lucide-react';

const createDefaultScenario = (id: number): HourlyScenarioData => ({
    id,
    valorHora: '',
    horasPorDia: '8',
    diasPorSemana: '5',
    semanasPorMes: '4.345',
    entradaPercentual: '',
    dataPrimeiraParcela: '',
    parcelasSemanais: '4',
});

export function HourlyPricingPage() {
    const [numScenarios, setNumScenarios] = useState<number>(1);
    const [scenarios, setScenarios] = useState<HourlyScenarioData[]>([
        createDefaultScenario(1)
    ]);
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

    const handleCalculate = () => {
        const calculated: HourlyScenarioResult[] = scenarios.map(s => {
            return calculateHourlyScenario(s);
        });
        setResults(calculated);
    };

    return (
        <>
            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Simulador de Precificação por Hora</h2>
                        <p className="text-sm text-gray-500">Calcule cenários baseados em valor da hora trabalhada</p>
                    </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-4">
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
