import React from 'react';
import { HourlyScenarioData } from '../types';
import { CurrencyInput } from './CurrencyInput';

interface HourlyScenarioCardProps {
    scenario: HourlyScenarioData;
    onChange: (id: number, field: keyof HourlyScenarioData, value: string) => void;
}

export const HourlyScenarioCard: React.FC<HourlyScenarioCardProps> = ({ scenario, onChange }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col gap-4 relative">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h3 className="font-bold text-lg text-gray-800">Cenário {scenario.id}</h3>
            </div>

            <CurrencyInput
                label="Valor por Hora (R$)"
                value={scenario.valorHora}
                onValueChange={(val) => onChange(scenario.id, 'valorHora', val)}
                required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Horas por Dia</label>
                    <input
                        type="number"
                        value={scenario.horasPorDia}
                        onChange={(e) => onChange(scenario.id, 'horasPorDia', e.target.value)}
                        placeholder="Ex: 8"
                        min="1"
                        max="24"
                        step="0.5"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Dias por Semana</label>
                    <input
                        type="number"
                        value={scenario.diasPorSemana}
                        onChange={(e) => onChange(scenario.id, 'diasPorSemana', e.target.value)}
                        placeholder="Ex: 5"
                        min="1"
                        max="7"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Semanas no Mês</label>
                    <input
                        type="number"
                        value={scenario.semanasPorMes}
                        onChange={(e) => onChange(scenario.id, 'semanasPorMes', e.target.value)}
                        placeholder="4.345"
                        min="1"
                        max="6"
                        step="0.001"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <p className="text-xs text-gray-400">Média padrão: 4,345 semanas</p>
                </div>

                <CurrencyInput
                    label="Entrada em R$ (Opcional)"
                    value={scenario.entradaReais}
                    onValueChange={(val) => onChange(scenario.id, 'entradaReais', val)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Entrada em % (Opcional)</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={scenario.entradaPercentual}
                            onChange={(e) => onChange(scenario.id, 'entradaPercentual', e.target.value)}
                            placeholder="Ex: 10"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none pr-8"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                    </div>
                    <p className="text-xs text-gray-400">Valor em R$ tem prioridade se preenchido</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Data 1ª Parcela</label>
                    <input
                        type="date"
                        value={scenario.dataPrimeiraParcela}
                        onChange={(e) => onChange(scenario.id, 'dataPrimeiraParcela', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Parcelas Semanais</label>
                    <input
                        type="number"
                        value={scenario.parcelasSemanais}
                        onChange={(e) => onChange(scenario.id, 'parcelasSemanais', e.target.value)}
                        placeholder="Ex: 4"
                        min="1"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>
        </div>
    );
};
