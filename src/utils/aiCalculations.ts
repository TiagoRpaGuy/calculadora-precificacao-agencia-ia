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

// Custos Meta (WhatsApp) - USD -> BRL (6.0)
const META_RATES = {
    service: 0.03 * 6.00,
    marketing: 0.06 * 6.00
};

export const calculateAiProject = (inputs: AiProjectInputs): AiProjectResult => {
    // 1. Estimativa de Horas
    const hrsMultiplier = BASE_HOURS_MULTIPLIER[inputs.complexity];
    const estimatedHours = inputs.workflowsCount * (HOURS_PER_WORKFLOW_BASE * hrsMultiplier);

    // 2. Valor Base de Setup
    const laborCost = estimatedHours * inputs.hourlyRate;
    const baseSetupValue = laborCost + inputs.integrationCost;

    // 3. Multiplicadores de Setup
    const complexityPct = COMPLEXITY_MULTIPLIERS[inputs.complexity];
    const urgencyPct = inputs.isUrgent ? 0.25 : 0;

    // Adicionais Técnicos Individuais
    let ragPct = inputs.hasRag ? 0.15 : 0;
    let memoryPct = inputs.hasMemory ? 0.10 : 0;
    let ipPct = inputs.hasIpTransfer ? 0.30 : 0;

    const totalMarkupMultiplier = 1 + complexityPct + urgencyPct + ragPct + memoryPct + ipPct;

    // Valores monetários dos markups (calculados sobre a BASE)
    const complexityAddon = baseSetupValue * complexityPct;
    const urgencyAddon = baseSetupValue * urgencyPct;
    const aiTechAddon = baseSetupValue * (ragPct + memoryPct);
    const ipTransferAddon = baseSetupValue * ipPct;

    // Valor com Markup Técnico (Pré-Margem)
    let preMarginSetup = baseSetupValue * totalMarkupMultiplier;

    // 4. Margem de Lucro Setup
    const marginAddon = preMarginSetup * (inputs.marginSetup / 100);
    const finalSetupValue = preMarginSetup + marginAddon;

    // --- Recorrência ---

    // 1. Custo Infra
    const infraCost = HOSTING_COSTS[inputs.hosting];

    // 2. Custo Tokens
    const tokenCost = (inputs.estimatedTokens / 1000) * TOKEN_COST_PER_1K[inputs.model];

    // 3. Custo WhatsApp (Meta)
    let whatsappCost = 0;
    if (inputs.hasWhatsapp) {
        whatsappCost += inputs.whatsappServiceConversations * META_RATES.service;
        whatsappCost += inputs.whatsappMarketingConversations * META_RATES.marketing;
    }

    // 4. Base Mensal (Custo puro + Suporte)
    const baseMonthlyCost = infraCost + tokenCost + whatsappCost + inputs.supportFee;

    // 5. Margem Recorrência
    const recurrenceMultiplier = 1 + (inputs.marginRecurring / 100);
    const finalMonthlyValue = baseMonthlyCost * recurrenceMultiplier;

    // --- ROI Analysis ---

    // Lucro Mensal Líquido para o Cliente = (Economia - Custo Mensal da Agência)
    const clientNetMonthlyBenefit = inputs.monthlySavings - finalMonthlyValue;

    // Payback (Meses) = Investimento Setup / Lucro Mensal Líquido
    // Se não houver benefício mensal (prejuizo) ou savings for 0, payback é infinito
    let paybackMonths = 0;
    let projectedAnnualProfit = 0;

    if (clientNetMonthlyBenefit > 0) {
        paybackMonths = finalSetupValue / clientNetMonthlyBenefit;
        projectedAnnualProfit = clientNetMonthlyBenefit * 12;
    } else {
        paybackMonths = 999; // Infinito/Indeterminado
        projectedAnnualProfit = clientNetMonthlyBenefit * 12; // Prejuízo projetado
    }

    return {
        estimatedHours: Math.ceil(estimatedHours),
        baseSetupValue,
        complexityMarkup: complexityAddon + aiTechAddon + ipTransferAddon,
        urgencyMarkup: urgencyAddon,
        finalSetupValue,

        breakdown: {
            hoursValue: laborCost,
            integrationsValue: inputs.integrationCost,
            complexityAddon,
            urgencyAddon,
            aiTechAddon,
            ipTransferAddon,
            marginAddon
        },

        infraCost,
        tokenCost,
        whatsappCost,
        baseMonthlyCost,
        finalMonthlyValue,

        paybackMonths,
        projectedAnnualProfit
    };
};
