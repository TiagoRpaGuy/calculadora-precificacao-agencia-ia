import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AiProjectInputs, AiProjectResult } from '../types/ai';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const exportAiProposalToPdf = (inputs: AiProjectInputs, result: AiProjectResult) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const primaryColor = [75, 0, 130] as [number, number, number]; // Indigo/Purple
    const secondaryColor = [30, 41, 59] as [number, number, number]; // Slate 800
    const highlightColor = [255, 247, 237] as [number, number, number]; // Orange 50 (ROI Box)
    const accentColor = [234, 88, 12] as [number, number, number]; // Orange 600

    // Helper: Format Currency
    const formatBRL = (val: number) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // --- HEADER ---
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 50, 'F');

    doc.setFontSize(26);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Plano de Aceleração com IA', 14, 25);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Proposta Comercial Exclusiva', 14, 35);

    doc.setFontSize(10);
    doc.text(`Data: ${format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`, pageWidth - 14, 25, { align: 'right' });
    doc.text('Validade: 15 dias', pageWidth - 14, 35, { align: 'right' });

    let yPos = 70;

    // --- SECTION 1: ESCOPO & DESTAQUES ---
    doc.setFontSize(16);
    doc.setTextColor(...secondaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Escopo da Solução', 14, yPos);
    yPos += 5;

    doc.setDrawColor(200, 200, 200);
    doc.line(14, yPos, pageWidth - 14, yPos);
    yPos += 15;

    // Feature Grid
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'normal');

    const col1X = 14;
    const col2X = pageWidth / 2 + 10;

    // Left Column
    doc.text(`• Inteligência: Modelo ${inputs.model.toUpperCase()}`, col1X, yPos);
    yPos += 10;
    doc.text(`• Fluxos de Automação: ${inputs.workflowsCount} Workflows Complexos`, col1X, yPos);
    yPos += 10;
    doc.text(`• Conectividade: ${inputs.integrationsCount} Integrações de Sistema`, col1X, yPos);
    yPos += 10;

    // Right Column (Reset Y for 2nd col)
    let yPosRight = yPos - 30;
    if (inputs.hasRag) {
        doc.setTextColor(0, 100, 0); // Green for bonus features
        doc.text('• Base de Conhecimento (RAG) Inclusa', col2X, yPosRight);
        doc.setTextColor(50, 50, 50);
        yPosRight += 10;
    }
    if (inputs.hasWhatsapp) {
        doc.setTextColor(0, 100, 0);
        doc.text('• Canal Oficial WhatsApp (Meta) Validado', col2X, yPosRight);
        doc.setTextColor(50, 50, 50);
        yPosRight += 10;
    }
    if (inputs.hasMemory) {
        doc.text('• Memória Persistente de Longo Prazo', col2X, yPosRight);
        yPosRight += 10;
    }

    yPos = Math.max(yPos, yPosRight) + 15;


    // --- SECTION 2: ROI ANALYSIS (HIGHLIGHT BOX) ---
    // Only show if savings were input
    if (inputs.monthlySavings > 0) {
        // Draw Box
        doc.setFillColor(...highlightColor);
        doc.setDrawColor(...accentColor);
        doc.roundedRect(14, yPos, pageWidth - 28, 45, 3, 3, 'FD');

        const boxY = yPos + 12;

        doc.setFontSize(14);
        doc.setTextColor(...accentColor);
        doc.setFont('helvetica', 'bold');
        doc.text('ANÁLISE DE VIABILIDADE (ROI)', 20, boxY);

        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.setFont('helvetica', 'normal');
        doc.text('Economia/Receita Mensal Estimada:', 20, boxY + 10);

        doc.setFontSize(12);
        doc.setTextColor(30, 30, 30);
        doc.setFont('helvetica', 'bold');
        doc.text(formatBRL(inputs.monthlySavings), 90, boxY + 10);

        // Big Numbers
        doc.setFontSize(16);
        doc.setTextColor(...accentColor);
        doc.text(`Payback Estimado: ${result.paybackMonths > 120 ? '+10 Anos' : result.paybackMonths.toFixed(1) + ' Meses'}`, 20, boxY + 25);

        doc.setFontSize(11);
        doc.setTextColor(30, 30, 30);
        doc.setFont('helvetica', 'normal');
        doc.text(`Lucro Anual Projetado: ${formatBRL(result.projectedAnnualProfit)}`, 110, boxY + 25);

        yPos += 60;
    }

    // --- SECTION 3: SETUP INVESTMENT (DETAILED) ---
    doc.setFontSize(16);
    doc.setTextColor(...secondaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('2. Investimento de Implementação (Setup)', 14, yPos);
    yPos += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, yPos, pageWidth - 14, yPos);
    yPos += 10;

    // -- Calculate Values for Breakdown --
    const devValue = result.breakdown.hoursValue;
    const integraValue = result.breakdown.integrationsValue;
    // Architecture = Complexity + AI Tech + IP
    const archValue = result.breakdown.complexityAddon + result.breakdown.aiTechAddon + result.breakdown.ipTransferAddon;
    const mgmtValue = result.breakdown.marginAddon;
    const urgencyValue = result.breakdown.urgencyAddon;

    const setupBody = [
        ['Desenvolvimento Workflows/Lógica (' + result.estimatedHours + 'h estimadas)', formatBRL(devValue)],
        [`Integrações de Sistemas (${inputs.integrationsCount} conectores)`, formatBRL(integraValue)]
    ];

    if (archValue > 0) {
        setupBody.push([`Arquitetura Avançada e Tratamento de Dados (Nível ${inputs.complexity.toUpperCase()})`, formatBRL(archValue)]);
    }

    setupBody.push(['Gestão de Projeto, Testes (QA) e Homologação', formatBRL(mgmtValue)]);

    if (inputs.isUrgent) {
        setupBody.push(['Taxa de Alocação Prioritária (Fast-track)', formatBRL(urgencyValue)]);
    }

    // Total Row
    setupBody.push([
        { content: 'TOTAL SETUP (PAGAMENTO ÚNICO)', styles: { fontStyle: 'bold', fillColor: [240, 240, 240], textColor: [30, 41, 59] } },
        { content: formatBRL(result.finalSetupValue), styles: { fontStyle: 'bold', fontSize: 13, textColor: [30, 41, 59], fillColor: [240, 240, 240], halign: 'right' } }
    ]);

    autoTable(doc, {
        startY: yPos,
        head: [['DESCRIÇÃO', 'VALOR']],
        // @ts-ignore
        body: setupBody,
        theme: 'plain',
        headStyles: { fillColor: [255, 255, 255], textColor: [150, 150, 150], fontStyle: 'bold', fontSize: 9 },
        styles: { fontSize: 10, cellPadding: 4, textColor: [50, 50, 50] },
        columnStyles: {
            0: { cellWidth: 120 },
            1: { halign: 'right' }
        },
        didParseCell: (data) => {
            // Apply bold to the Description column if it's the last row
            if (data.row.index === setupBody.length - 1) {
                data.cell.styles.fontStyle = 'bold';
            }
        }
    });

    // @ts-ignore
    yPos = doc.lastAutoTable.finalY + 15;


    // --- SECTION 4: RECURRING ---

    // Page Break Check: Ensure title has space
    if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = 30; // Margin top for new page
    }

    doc.setFontSize(16);
    doc.setTextColor(...secondaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('3. Operação Mensal (Recorrência)', 14, yPos);
    yPos += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, yPos, pageWidth - 14, yPos);
    yPos += 10;

    const recurringBody = [
        // Group A
        [{ content: 'INFRAESTRUTURA DIRETA (REPASSE)', colSpan: 2, styles: { fontStyle: 'bold', fontSize: 9, textColor: [100, 100, 100] } }],
        ['Consumo API IA (Tokens Estimados)*', formatBRL(result.tokenCost)],
        ['Servidor / Cloud Hosting', formatBRL(result.infraCost)],
    ];

    if (inputs.hasWhatsapp) {
        recurringBody.push(['Custos Meta (WhatsApp API)', formatBRL(result.whatsappCost)]);
    }

    // Group B
    recurringBody.push(
        [{ content: 'GESTÃO E SERVIÇOS', colSpan: 2, styles: { fontStyle: 'bold', fontSize: 9, textColor: [100, 100, 100], fillColor: [255, 255, 255] } }],
        ['Fee de Suporte, Monitoramento e Melhorias', formatBRL(inputs.supportFee)],
        // Total
        [{ content: 'TOTAL MENSAL ESTIMADO', styles: { fontStyle: 'bold', fillColor: [240, 255, 240] } },
        { content: formatBRL(result.finalMonthlyValue), styles: { fontStyle: 'bold', fontSize: 13, textColor: [0, 100, 0], fillColor: [240, 255, 240], halign: 'right' } }]
    );

    autoTable(doc, {
        startY: yPos,
        // @ts-ignore
        body: recurringBody,
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 3, textColor: [50, 50, 50] },
        columnStyles: {
            1: { halign: 'right' }
        }
    });

    // @ts-ignore
    yPos = doc.lastAutoTable.finalY + 30;

    // --- SIGNATURE AREA ---
    // Check if enough space for signature (needs ~50 units)
    if (yPos > pageHeight - 50) {
        doc.addPage();
        yPos = 50;
    }

    doc.setDrawColor(0, 0, 0);
    doc.line(14, yPos, 120, yPos); // Signature line

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text('De Acordo: __________________________________________________', 14, yPos + 6);

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Ao assinar, o cliente autoriza o início do cronograma de setup.', 14, yPos + 12);


    // --- FOOTER ---
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);

        // Token Disclaimer (Font small)
        doc.setFontSize(7);
        doc.setTextColor(100, 100, 100);
        doc.text('* O valor de consumo de API é uma estimativa baseada no uso projetado. O faturamento será feito conforme o uso real (Modelo Pague-pelo-uso).', 14, pageHeight - 20);

        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Desenvolvido com tecnologia n8n e IA Generativa', pageWidth / 2, pageHeight - 15, { align: 'center' });
        doc.text('Confidencial - Proibida a reprodução sem autorização', pageWidth / 2, pageHeight - 10, { align: 'center' });
    }

    doc.save('Proposta_Comercial_IA.pdf');
};
