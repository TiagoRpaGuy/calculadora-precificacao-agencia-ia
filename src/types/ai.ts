export type ComplexityLevel = 'low' | 'medium' | 'high';
export type AiModel = 'gpt-4o' | 'claude-3-5' | 'gemini-pro';
export type HostingType = 'self-hosted' | 'cloud';
export type RoiLevel = 'low' | 'medium' | 'critical';

export interface AiProjectInputs {
    // Escopo n8n
    workflowsCount: number;
    integrationsCount: number;

    // Complexidade
    complexity: ComplexityLevel;

    // Camada de IA
    model: AiModel;
    hasRag: boolean;
    hasMemory: boolean;

    // Infra e Recorrência
    hosting: HostingType;
    estimatedTokens: number;

    // WhatsApp Oficial (Meta)
    hasWhatsapp: boolean;
    whatsappServiceConversations: number;
    whatsappMarketingConversations: number;

    // Multiplicadores
    roi: RoiLevel;
    isUrgent: boolean;
    hasIpTransfer: boolean; // Propriedade Intelectual

    // Financeiro (Base)
    hourlyRate: number; // R$/hora
    integrationCost: number; // Custo fixo de integrações (licenças etc)
    supportFee: number; // Fee mensal de suporte
    monthlySavings: number; // Economia/Receita Mensal Estimada (ROI)

    // Margens
    marginSetup: number; // %
    marginRecurring: number; // %
}

export interface SetupBreakdown {
    hoursValue: number;         // Valor das horas
    integrationsValue: number;  // Valor das integrações
    complexityAddon: number;    // Valor adicionado pela complexidade
    urgencyAddon: number;       // Valor adicionado pela urgência
    aiTechAddon: number;        // Valor adicionado por RAG/Memória
    ipTransferAddon: number;    // Valor adicionado por IP Transfer
    marginAddon: number;        // Valor adicionado pela margem
}

export interface AiProjectResult {
    // Setup
    estimatedHours: number;
    baseSetupValue: number; // (Horas * Rate) + Integrações
    complexityMarkup: number;
    urgencyMarkup: number;
    finalSetupValue: number;

    // Detalhamento Setup
    breakdown: SetupBreakdown;

    // Recorrência
    infraCost: number;
    tokenCost: number;
    whatsappCost: number; // Custo Meta
    baseMonthlyCost: number;
    finalMonthlyValue: number;

    // ROI
    paybackMonths: number;
    projectedAnnualProfit: number;
}
