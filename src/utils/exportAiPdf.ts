import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AiProjectInputs, AiProjectResult } from '../types/ai';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const exportAiProposalToPdf = (inputs: AiProjectInputs, result: AiProjectResult) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    const secondaryColor = [44, 62, 80] as [number, number, number]; // Dark Blue

    // Header
    doc.setFillColor(...secondaryColor);
    doc.rect(0, 0, pageWidth, 40, 'F');

    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text('Proposta de Automação IA & n8n', pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Gerado em: ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, pageWidth / 2, 30, { align: 'center' });

    let yPos = 50;

    // Seção 1: Escopo e Complexidade
    doc.setFontSize(14);
    doc.setTextColor(...secondaryColor);
    doc.text('1. Escopo e Especificações', 14, yPos);
    yPos += 10;

    const specsData = [
        ['Workflows n8n', inputs.workflowsCount.toString(), 'Complexidade', inputs.complexity.toUpperCase()],
        ['Integrações (Nodes)', inputs.integrationsCount.toString(), 'Modelo IA', inputs.model.toUpperCase()],
        ['RAG / Base Conhecimento', inputs.hasRag ? 'Sim' : 'Não', 'Memória / Vetorial', inputs.hasMemory ? 'Sim' : 'Não'],
        ['Hospedagem', inputs.hosting.toUpperCase(), 'Tokens/mês', inputs.estimatedTokens.toLocaleString('pt-BR')],
        ['Transferência IP', inputs.hasIpTransfer ? 'Sim' : 'Não', 'Urgência', inputs.isUrgent ? 'Sim' : 'Não']
    ];

    autoTable(doc, {
        startY: yPos,
        head: [['Item', 'Valor', 'Item', 'Valor']],
        body: specsData,
        theme: 'grid',
        headStyles: { fillColor: secondaryColor },
        styles: { fontSize: 10 }
    });

    // @ts-ignore
    yPos = doc.lastAutoTable.finalY + 20;

    // Seção 2: Investimento (Setup)
    doc.setFontSize(14);
    doc.setTextColor(...secondaryColor);
    doc.text('2. Investimento de Setup (Projeto)', 14, yPos);
    yPos += 10;

    const setupData = [
        ['Estimativa de Horas', `${result.estimatedHours} horas`],
        ['Valor Base (Horas + Integrações)', `R$ ${result.baseSetupValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Adicional Complexidade/Tecnologia', `R$ ${result.complexityMarkup.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Investimento Final (Setup)', `R$ ${result.finalSetupValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`]
    ];

    autoTable(doc, {
        startY: yPos,
        body: setupData,
        theme: 'striped',
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 100 },
            1: { halign: 'right' }
        },
        styles: { fontSize: 11 }
    });

    // @ts-ignore
    yPos = doc.lastAutoTable.finalY + 20;

    // Seção 3: Recorrência Mensal
    doc.setFontSize(14);
    doc.setTextColor(...secondaryColor);
    doc.text('3. Manutenção e Custos Mensais', 14, yPos);
    yPos += 10;

    const monthlyData = [
        ['Infraestrutura (Hospedagem)', `R$ ${result.infraCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Consumo API (Tokens)', `R$ ${result.tokenCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Taxa de Suporte/Manutenção', `R$ ${inputs.supportFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Valor Mensal Total', `R$ ${result.finalMonthlyValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`]
    ];

    autoTable(doc, {
        startY: yPos,
        body: monthlyData,
        theme: 'striped',
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 100 },
            1: { halign: 'right' }
        },
        styles: { fontSize: 11 }
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text('Agência de IA - Proposta Comercial', pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    }

    doc.save('proposta_agencia_ia.pdf');
};
