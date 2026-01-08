import { useState } from 'react';
import { Calculator, Clock, RotateCcw, Brain } from 'lucide-react';
import { PricingPage } from './pages/PricingPage';
import { HourlyPricingPage } from './pages/HourlyPricingPage';
import { AiPricingPage } from './pages/AiPricingPage';

type TabType = 'pricing' | 'hourly' | 'ai';

function App() {
    const [activeTab, setActiveTab] = useState<TabType>('pricing');

    // Keys para forçar reset dos componentes
    const [pricingKey, setPricingKey] = useState(0);
    const [hourlyKey, setHourlyKey] = useState(0);
    const [aiKey, setAiKey] = useState(0);

    const handleResetCurrentPage = () => {
        if (activeTab === 'pricing') {
            setPricingKey(prev => prev + 1);
        } else if (activeTab === 'hourly') {
            setHourlyKey(prev => prev + 1);
        } else {
            setAiKey(prev => prev + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-[#2c3e50] flex justify-center items-center gap-2">
                        <Brain className="w-8 h-8 text-purple-600" />
                        Agência de IA & Automação
                    </h1>
                    <p className="text-gray-500 mt-2">Sistema de Precificação Inteligente</p>
                </header>

                {/* Tab Navigation */}
                <nav className="mb-8">
                    <div className="border-b border-gray-200">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <ul className="flex flex-wrap -mb-px justify-center gap-2">
                                <li>
                                    <button
                                        onClick={() => setActiveTab('pricing')}
                                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-t-lg font-medium text-sm transition-colors ${activeTab === 'pricing'
                                            ? 'bg-white text-green-600 border-b-2 border-green-600 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Calculator className="w-4 h-4" />
                                        Precificação RPA
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveTab('hourly')}
                                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-t-lg font-medium text-sm transition-colors ${activeTab === 'hourly'
                                            ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Clock className="w-4 h-4" />
                                        Simulador Hora
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveTab('ai')}
                                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-t-lg font-medium text-sm transition-colors ${activeTab === 'ai'
                                            ? 'bg-white text-purple-600 border-b-2 border-purple-600 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Brain className="w-4 h-4" />
                                        Automação de IA & n8n
                                    </button>
                                </li>
                            </ul>

                            {/* Reset Button */}
                            <button
                                onClick={handleResetCurrentPage}
                                className="inline-flex items-center gap-2 px-4 py-2 ml-4 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                                title="Limpar dados da página atual"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Limpar
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Page Content - Usando display para manter o estado */}
                <div style={{ display: activeTab === 'pricing' ? 'block' : 'none' }}>
                    <PricingPage key={pricingKey} />
                </div>
                <div style={{ display: activeTab === 'hourly' ? 'block' : 'none' }}>
                    <HourlyPricingPage key={hourlyKey} />
                </div>
                <div style={{ display: activeTab === 'ai' ? 'block' : 'none' }}>
                    <AiPricingPage key={aiKey} />
                </div>
            </div>
        </div>
    );
}

export default App
