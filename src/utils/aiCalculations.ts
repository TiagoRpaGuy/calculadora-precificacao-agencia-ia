import { AiProjectInputs, AiProjectResult } from '../types/ai';

const HOURS_PER_WORKFLOW_BASE = 8; // Horas base por workflow

const COMPLEXITY_MULTIPLIERS = {
    low: 0,
    medium: 0.30,
    high: 0.60
};

const BASE_HOURS_MULTIPLIER = {
    low: 1,     // 8h
    medium: 1.5, // 12h
    high: 2.5    // 20h
};

// Custos estimados de infra (exemplo)
const HOSTING_COSTS = {
    'self-hosted': 50, // VPS básico
    'cloud': 150       // Managed n8n cloud starter
};

// Custo médio por 1k tokens (mix input/output) em USD -> BRL (aprox 6.0)
const TOKEN_COST_PER_1K = {
    'gpt-4o': (0.015 * 6),
    'claude-3-5': (0.015 * 6),
    'gemini-pro': (0.005 * 6)
};

export const calculateAiProject = (inputs: AiProjectInputs): AiProjectResult => {
    // 1. Estimativa de Horas
    // Base: Workflows * (BaseHours * ComplexityFactor)
    // Ex: 5 workflows, Medium Complexity -> 5 * (8 * 1.5) = 60 horas
    const hrsMultiplier = BASE_HOURS_MULTIPLIER[inputs.complexity];
    const estimatedHours = inputs.workflowsCount * (HOURS_PER_WORKFLOW_BASE * hrsMultiplier);

    // 2. Valor Base de Setup
    // (Horas * Valor/Hora) + Custo Integrações
    const laborCost = estimatedHours * inputs.hourlyRate;
    const baseSetupValue = laborCost + inputs.integrationCost;

    // 3. Multiplicadores de Setup
    // (1 + % Complexidade + % Urgência)
    const complexityPct = COMPLEXITY_MULTIPLIERS[inputs.complexity];
    const urgencyPct = inputs.isUrgent ? 0.25 : 0;

    // Adicional IA/RAG (Aumenta horas ou valor? Vamos tratar como markup de complexidade técnica no valor)
    let techMarkup = 0;
    if (inputs.hasRag) techMarkup += 0.15;
    if (inputs.hasMemory) techMarkup += 0.10;
    if (inputs.hasIpTransfer) techMarkup += 0.30; // IP Transfer é caro

    const totalMarkupMultiplier = 1 + complexityPct + urgencyPct + techMarkup;

    // Valor com Markup Técnico
    let preMarginSetup = baseSetupValue * totalMarkupMultiplier;

    // 4. Margem de Lucro Setup
    const finalSetupValue = preMarginSetup * (1 + (inputs.marginSetup / 100));

    // --- Recorrência ---

    // 1. Custo Infra
    const infraCost = HOSTING_COSTS[inputs.hosting];

    // 2. Custo Tokens
    // (Total Tokens / 1000) * CustoModelo
    const tokenCost = (inputs.estimatedTokens / 1000) * TOKEN_COST_PER_1K[inputs.model];

    // 3. Base Mensal (Custo puro + Suporte)
    const baseMonthlyCost = infraCost + tokenCost + inputs.supportFee;

    // 4. Margem Recorrência (Fixa 1.5 no prompt, mas vamos usar o input tbm se quiser flexivel, ou fixar 50% min)
    // O prompt diz: (Custo Infra + Custo Tokens + Fee de Suporte) * 1.5 (Margem Recorrência)
    // Vamos interpretar o input marginRecurring como o "50%" (0.5). Se o user botar 50, é 1.5x.
    const recurrenceMultiplier = 1 + (inputs.marginRecurring / 100);
    const finalMonthlyValue = baseMonthlyCost * recurrenceMultiplier;

    return {
        estimatedHours: Math.ceil(estimatedHours),
        baseSetupValue,
        complexityMarkup: baseSetupValue * (complexityPct + urgencyPct + techMarkup), // Valor monetário adicionado pelos markups
        urgencyMarkup: 0, // Já somado acima para simplificar display, ou separar se quiser detalhe
        finalSetupValue,

        infraCost,
        tokenCost,
        baseMonthlyCost,
        finalMonthlyValue
    };
};
