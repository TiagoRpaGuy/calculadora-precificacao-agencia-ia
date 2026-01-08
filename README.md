# Agência de IA & Automação - Precificação e Orçamentos

Sistema completo para precificação de projetos de **Automação RPA, Desenvolvimento de IA & Agentes n8n**, com suporte a múltiplos cenários, gestão de equipe e exportação de propostas em PDF.

## 🚀 Módulos do Sistema

### 1. Automação de IA & n8n (NOVO!)
Módulo especializado para precificação de Agências de Automação de IA.
- **Escopo Baseado em Valor**: Cálculo híbrido considerando horas técnicas + valor agregado.
- **Inputs Detalhados**:
  - **Escopo n8n**: Quantidade de workflows e complexidade lógica.
  - **Stack Tecnológico**: Adicione markups para **RAG**, **Memória Vetorial** e **Transferência de IP**.
  - **Modelos LLM**: Estimativa de custos para GPT-4o, Claude 3.5 e Gemini Pro.
  - **Infraestrutura**: Custos de hospedagem (Cloud vs Self-hosted).
- **Resultados Claros**:
  - **Investimento de Setup**: Valor único de implementação com margens e taxas de urgência.
  - **Recorrência Mensal**: Valor de manutenção, suporte e custos de API.
  - **Botão "Ver Detalhes"**: Breakdown completo (Recibo) mostrando a composição matemática do preço (Mão de obra + Adicionais + Margem).
- **Análise de ROI e Viabilidade**:
  - Nova calculadora de "Payback Time" (Retorno sobre Investimento).
  - Projeção de Lucro Anual para o cliente baseada em economia estimada.
- **WhatsApp & Meta**: Cálculo integrado de custos de operação (Service vs Marketing conversations).
- **Ferramentas de Vendas de Alto Valor**:
  - **Tooltips Educativos**: Explicações contextuais para cada item de custo.
  - **Guia de Precificação**: Modal educativo integrado.
  - **Proposta Comercial em PDF (Novo Layout)**:
    - Design profissional com cabeçalho e rodapé.
    - **Detalhamento de Setup**: Tabela transparente separando Desenvolvimento, Integrações e Arquitetura Avançada.
    - Área de assinatura e disclaimers jurídicos.

### 2. Precificação RPA (Por Projeto)
- **Múltiplos Cenários**: Simule até 10 cenários diferentes simultaneamente.
- **Gestão de Participantes**:
  - Defina a equipe e a % de participação no lucro de cada um.
- **Detalhamento Financeiro**:
  - Cálculo de ROI e divisão de lucros.
- **Exportação**: Relatórios em `.txt`.

### 3. Simulador por Hora
- Para projetos "Time & Material".
- Defina valor/hora, jornada semanal e calcule o faturamento mensal projetado.

---

## 🛠️ Tecnologias Utilizadas
- **Frontend**: Vite + React + TypeScript
- **Estilização**: Tailwind CSS + Lucide Icons
- **PDF**: jsPDF + AutoTable
- **Desktop**: Electron (opcional para build .exe)

## 📦 Como Rodar

### Instalação
```bash
npm install
```

### Desenvolvimento (Web)
```bash
npm run dev
```
Acesse `http://localhost:5173`.

### Gerar Executável (Windows)
```bash
npm run package
```
O executável será criado na pasta `dist_exec/`.

---

## 📂 Estrutura de Pastas (Principais)

```
src/
├── components/           
│   ├── CurrencyInput.tsx       # Input monetário reutilizável
│   ├── PricingDetailModal.tsx  # Modal de detalhamento de custos (IA)
│   └── ...
├── pages/                
│   ├── AiPricingPage.tsx       # Módulo Agência de IA
│   ├── PricingPage.tsx         # Módulo RPA
│   └── HourlyPricingPage.tsx   # Módulo Hora
├── utils/                
│   ├── aiCalculations.ts       # Lógica de precificação IA
│   └── exportAiPdf.ts          # Gerador de PDF
└── App.tsx                     # Navegação e Layout
```

## 🎯 Propósito
Centralizar a inteligência comercial de sua agência, permitindo criar orçamentos rápidos, precisos e justos, seja para um bot RPA simples ou para um Agente de IA complexo com RAG e memória.
