# Calculadora RPA Soares Logística (v2.3) - Edição Detalhada e Dinâmica

Ferramenta avançada para precificação de projetos RPA, suportando múltiplos cenários, gestão dinâmica de participantes, detalhamento financeiro profundo e exportação de relatórios.

## Funcionalidades Principais

### Precificação por Projeto
- **Múltiplos Cenários**: Simule até 10 cenários diferentes simultaneamente.
- **Gestão de Participantes**:
  - **Adicione/Remova Participantes**: Configure quem fará parte do projeto. 
  - **Porcentagens Personalizáveis**: Defina a porcentagem de lucro de cada participante.
  - **Validação**: O sistema alerta caso a soma das porcentagens não seja 100%.
- **Detalhamento Financeiro**:
  - Cálculo automático da divisão de lucros (Mensal e Total) por participante.
  - Estimativas de ganho diário e semanal.
  - Valor total do contrato e financiamento.
- **Exportação**: Gere relatórios completos em formato `.txt`.

### Simulador de Precificação por Hora (NOVO!)
- **Cálculo baseado em hora trabalhada**: Defina valor/hora, horas/dia, dias/semana.
- **Múltiplos cenários**: Compare até 10 cenários de precificação por hora.
- **Parcelamento semanal**: Configure entrada em % e número de parcelas semanais.
- **Cronograma automático**: Geração de datas das parcelas semanais.
- **Métricas detalhadas**:
  - Horas no mês
  - Valor diário, semanal e mensal
  - Entrada e valor financiado
  - Valor de cada parcela semanal
- **Exportação**: Relatório completo em formato `.txt`.

### Navegação e UX
- **Sistema de Abas**: Alterne entre "Precificação por Projeto" e "Simulador por Hora".
- **Persistência de Estado**: Dados são mantidos ao trocar de abas.
- **Botão Limpar**: Resete a página atual quando necessário.
- **Interface Moderna**: Construída com React, TypeScript e Tailwind CSS.

## Tecnologias

- **Frontend**: Vite + React + TypeScript
- **Estilização**: Tailwind CSS + Lucide Icons
- **Desktop**: Electron (para geração de executável)
- **Utils**: date-fns

## Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado (versão 18+ recomendada).

### Passo a Passo (Terminal)

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Modo de Desenvolvimento (Web)**:
   ```bash
   npm run dev
   ```
   Acesse a URL indicada (ex: `http://localhost:5173`).

3. **Gere o Executável (.exe)**:
   Para criar o arquivo `.exe` para Windows:
   ```bash
   npm run package
   ```
   O executável será gerado na pasta `dist_exec/Calculadora RPA-win32-x64/`.
   Procure pelo arquivo `Calculadora RPA.exe`.
   
   *(Alternativa: `npm run dist` tenta gerar um instalador, mas pode exibir erros de dependência).*

4. **Gere apenas o build Web**:
   ```bash
   npm run build
   ```
   Os arquivos serão gerados na pasta `dist/`.

## Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── CurrencyInput.tsx
│   ├── ScenarioCard.tsx
│   ├── ResultsTable.tsx
│   ├── ScenarioDetails.tsx
│   ├── HourlyScenarioCard.tsx      # NOVO
│   ├── HourlyResultsTable.tsx       # NOVO
│   └── HourlyScenarioDetails.tsx    # NOVO
├── pages/                # Páginas da aplicação
│   ├── PricingPage.tsx              # Precificação por Projeto
│   └── HourlyPricingPage.tsx        # NOVO - Simulador por Hora
├── types/                # Tipagens TypeScript
│   └── index.ts
├── utils/                # Funções utilitárias
│   ├── calculations.ts
│   ├── exportToTxt.ts
│   ├── hourlyCalculations.ts        # NOVO
│   └── exportHourlyToTxt.ts         # NOVO
├── App.tsx               # Componente principal com navegação
└── main.tsx
```

## Propósito

Esta ferramenta visa facilitar a negociação e planejamento financeiro de projetos RPA, oferecendo clareza sobre o fluxo de caixa, parcelamento e uma divisão de resultados justa e transparente entre todos os envolvidos no projeto.
