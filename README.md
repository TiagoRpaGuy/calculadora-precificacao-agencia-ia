# 🤖 Agência de IA & Automação - Calculadora de Precificação

Sistema completo para precificação de projetos de **Automação RPA, Desenvolvimento de IA & Agentes n8n**, com análise de ROI, gestão de equipe e exportação de propostas comerciais profissionais em PDF.

---

## 🚀 Módulos do Sistema

### 1. 🧠 Automação de IA & n8n (Principal)

Módulo especializado para agências que desenvolvem soluções com **Inteligência Artificial e n8n**.

#### Inputs de Escopo

| Categoria             | Inputs                                                                                  |
| --------------------- | --------------------------------------------------------------------------------------- |
| **Escopo n8n**        | Quantidade de Workflows, Nodes/Integrações, Complexidade Lógica (Baixa/Média/Alta)      |
| **Stack de IA**       | Modelo LLM (GPT-4o, Claude 3.5, Gemini Pro), RAG/Base de Conhecimento, Memória Vetorial |
| **WhatsApp Business** | Conversas de Serviço (usuário inicia), Conversas de Marketing (empresa inicia)          |
| **Infraestrutura**    | Tipo de Hospedagem (Cloud vs Self-hosted), Estimativa de Tokens/mês                     |
| **Multiplicadores**   | Urgência (+25%), Transferência de IP (+30%), Margem de Setup (%)                        |
| **ROI**               | Economia Mensal Estimada pelo Cliente (para cálculo de Payback)                         |

#### Resultados Calculados

- **Investimento de Setup (Único)**: Valor total de implantação com breakdown detalhado.
- **Recorrência Mensal**: Custos de API, Infraestrutura, WhatsApp Meta e Fee de Suporte.
- **Análise de ROI**: Payback Time (meses) e Lucro Anual Projetado para o cliente.

#### Ferramentas de Vendas

- **📘 Guia de Precificação**: Modal educativo explicando Setup vs Recorrência, Tokens e Margens.
- **💡 Tooltips Contextuais**: Ícones de ajuda em cada campo complexo.
- **🧮 Assistente de Tokens**: Calculadora para estimar consumo mensal baseado em conversas/dia.
- **📋 Copiar Resumo**: Gera texto formatado para WhatsApp/Email com os valores principais.
- **📄 Exportar PDF Profissional**: Proposta comercial de alto valor com:
  - Cabeçalho com título e data.
  - Seção de Escopo com ícones de features.
  - **Box de ROI destacado** (Payback e Lucro Anual).
  - **Tabela de Composição de Setup** (Desenvolvimento, Integrações, Arquitetura, Gestão/QA, Urgência).
  - Tabela de Custos Mensais (Infra Direta vs Gestão/Suporte).
  - Área de Assinatura ("De Acordo").
  - Rodapé com disclaimer de consumo de API.

---

### 2. 🤖 Precificação RPA (Por Projeto)

- Simulação de até **10 cenários** diferentes simultaneamente.
- **Gestão de Participantes**: Defina a equipe e a % de participação nos lucros.
- **Detalhamento Financeiro**: Cálculo de ROI e divisão de lucros.
- **Exportação**: Relatórios em `.txt`.

---

### 3. ⏱️ Simulador por Hora (Time & Material)

- Defina valor/hora e jornada semanal.
- Calcule o faturamento mensal projetado.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia            | Uso                                    |
| --------------------- | -------------------------------------- |
| **Vite**              | Build tool para desenvolvimento rápido |
| **React 18**          | Biblioteca de UI                       |
| **TypeScript**        | Tipagem estática                       |
| **Tailwind CSS**      | Estilização utilitária                 |
| **Lucide React**      | Ícones modernos                        |
| **jsPDF + AutoTable** | Geração de PDFs                        |
| **date-fns**          | Formatação de datas                    |
| **Electron**          | Build de executável .exe (opcional)    |

---

## 📦 Como Rodar Localmente

### Pré-requisitos

- Node.js 18+ instalado.

### Instalação

```bash
git clone https://github.com/TiagoRpaGuy/calculadora-precificacao-agencia-ia.git
cd calculadora-precificacao-agencia-ia
npm install
```

### Desenvolvimento (Web)

```bash
npm run dev
```

Acesse `http://localhost:5173`.

### Build de Produção (Web)

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

### Gerar Executável Windows (.exe)

```bash
npm run package
```

O executável será criado na pasta `dist_exec/`.

---

## 📂 Estrutura de Pastas

```
src/
├── components/
│   ├── CurrencyInput.tsx         # Input monetário formatado
│   ├── PricingDetailModal.tsx    # Modal de breakdown de custos
│   ├── TokenEstimatorModal.tsx   # Calculadora de tokens
│   ├── Tooltip.tsx               # Tooltip de ajuda contextual
│   └── GuideModal.tsx            # Guia de precificação
├── pages/
│   ├── AiPricingPage.tsx         # Módulo Agência de IA
│   ├── PricingPage.tsx           # Módulo RPA
│   └── HourlyPricingPage.tsx     # Módulo por Hora
├── types/
│   ├── ai.ts                     # Tipos do módulo IA
│   └── index.ts                  # Tipos gerais
├── utils/
│   ├── aiCalculations.ts         # Lógica de precificação IA
│   └── exportAiPdf.ts            # Gerador de PDF comercial
└── App.tsx                       # Navegação e Layout
```

---

## 🎯 Propósito

Centralizar a **inteligência comercial** de sua agência de automação, permitindo criar orçamentos rápidos, precisos e profissionais—seja para um bot RPA simples ou para um Agente de IA complexo com RAG, memória vetorial e integração WhatsApp.

---

## 📄 Licença

Uso interno. Desenvolvido por **TiagoRpaGuy**.
