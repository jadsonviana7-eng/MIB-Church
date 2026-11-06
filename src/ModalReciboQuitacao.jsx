import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { findInJsonGlobal, extrairValorInscricao, extrairParcelasInscricao } from './eventoInscricaoUtils';
import { mascaraTelefone, mascaraCPF } from './mascaras';

/**
 * Modal elegante, moderno e alegre de Recibo Especial de Quitação.
 * Parabeniza o participante pela inscrição e pela quitação de todas as parcelas ou pagamento à vista.
 * Inclui QR Code de credenciamento, dados completos do evento e atalhos para imprimir/salvar em PDF e enviar no WhatsApp.
 */
export default function ModalReciboQuitacao({
  aberto,
  onFechar,
  evento,
  inscrito,
  pessoas = [],
  obterZonaParticipante
}) {
  const [processando, setProcessando] = useState(false);
  const [avisoDesktop, setAvisoDesktop] = useState(false);
  const reciboRef = useRef(null);

  if (!aberto || !inscrito) return null;

  const dados = inscrito.dados_inscricao || {};
  const nome = findInJsonGlobal(dados, ['nome', 'nome completo', 'completo']) || 'Participante';
  const email = findInJsonGlobal(dados, 'email') || '';
  const rawPhone = findInJsonGlobal(dados, ['telefone', 'celular', 'whatsapp', 'contato']) || '';
  const rawCpf = findInJsonGlobal(dados, 'cpf') || '';
  const telefone = rawPhone ? mascaraTelefone(rawPhone) : '';
  const cpf = rawCpf ? mascaraCPF(rawCpf) : '';

  const membro = pessoas.find(p =>
    (email && p.email?.toLowerCase().trim() === email.toLowerCase().trim()) ||
    (nome && p.nome?.toLowerCase().trim() === nome.toLowerCase().trim())
  );

  const incluiTransporte = findInJsonGlobal(dados, 'transporte')?.toString().toLowerCase().startsWith('sim');
  const valorTotal = extrairValorInscricao(dados, evento);

  let valorTransporteItem = 0;
  if (dados.valor_transporte !== undefined && dados.valor_transporte !== null && dados.valor_transporte !== '') {
    valorTransporteItem = Number(dados.valor_transporte) || 0;
  } else if (incluiTransporte) {
    valorTransporteItem = Number(evento?.valor_transporte) || 0;
  }
  const valorBase = Math.max(0, valorTotal - valorTransporteItem);

  const totalParc = Number(findInJsonGlobal(dados, 'parcelas')) || extrairParcelasInscricao(dados) || 1;
  const pagas = dados.parcelas_pagas || [];
  const formaPagamento = findInJsonGlobal(dados, ['forma de pagamento', 'forma_pagamento', 'pagamento', 'metodo']) || 'À Vista';

  const isAVista = totalParc <= 1;
  const isQuitado = inscrito.status_pagamento === 'pago' || (totalParc > 1 && pagas.length >= totalParc);

  const zonaNome = obterZonaParticipante ? obterZonaParticipante(inscrito) : 'Não informada';
  const codigoRecibo = `REC-${new Date().getFullYear()}-${inscrito.id.slice(0, 8).toUpperCase()}`;
  const dataEmissao = new Date().toLocaleDateString('pt-BR');
  const horaEmissao = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  let dataEventoFormatada = '';
  if (evento?.data_inicio) {
    try {
      const d = new Date(evento.data_inicio);
      dataEventoFormatada = d.toLocaleDateString('pt-BR');
      const h = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      if (h && h !== '00:00') dataEventoFormatada += ` às ${h}`;
    } catch (_) {}
  }

  // Payload seguro para o QR Code de credenciamento
  const qrCodePayload = JSON.stringify({
    tipo: 'RECIBO_MIB_EVENTO',
    recibo: codigoRecibo,
    evento_id: evento?.id,
    inscricao_id: inscrito.id,
    participante: nome,
    quitado: isQuitado,
    valor: valorTotal
  });

  // Dispara a impressão exclusiva do recibo formatado
  const imprimirRecibo = () => {
    const printWindow = window.open('', '_blank', 'width=900,height=800');
    if (!printWindow) {
      alert('Por favor, permita popups neste site para imprimir o recibo.');
      return;
    }

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Recibo Especial - ${nome} - ${evento?.titulo || 'Evento'}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=Roboto:wght@400;500;700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    @page {
      size: A4 portrait;
      margin: 12mm 12mm 12mm 12mm;
    }
    
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #ffffff;
      color: #0f172a;
      width: 100%;
      height: 100%;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    @media print {
      .no-print { display: none !important; }
      body { padding: 0 !important; }
    }
    
    .sheet {
      width: 100%;
      max-width: 186mm;
      margin: 0 auto;
      border: 2px solid #059669;
      border-radius: 20px;
      padding: 24px;
      background: #ffffff;
      position: relative;
    }
    
    .header {
      text-align: center;
      border-bottom: 2px dashed #cbd5e1;
      padding-bottom: 16px;
      margin-bottom: 18px;
    }
    .org-badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 9999px;
      background: #ecfdf5;
      color: #065f46;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border: 1px solid #a7f3d0;
      margin-bottom: 6px;
    }
    .title {
      font-size: 22px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.02em;
    }
    .selo-quitado {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
      color: #ffffff;
      padding: 6px 16px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      box-shadow: 0 4px 10px rgba(5, 150, 105, 0.25);
    }
    
    .greeting-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 5px solid #059669;
      border-radius: 12px;
      padding: 12px 16px;
      margin-bottom: 18px;
    }
    .greeting-box h3 {
      font-size: 14px;
      font-weight: 800;
      color: #065f46;
      margin-bottom: 4px;
    }
    .greeting-box p {
      font-size: 10.5px;
      color: #334155;
      line-height: 1.45;
    }
    
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 18px;
    }
    .card-info {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 12px;
      background: #ffffff;
    }
    .card-info h4 {
      font-size: 10px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      margin-bottom: 8px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 4px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      padding: 3px 0;
    }
    .row .label { color: #64748b; }
    .row .val { font-weight: 700; color: #0f172a; text-align: right; }
    
    .total-banner {
      background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
      border: 2px solid #a7f3d0;
      border-radius: 14px;
      padding: 14px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
    }
    .total-banner .tag {
      font-size: 10px;
      font-weight: 900;
      text-transform: uppercase;
      color: #047857;
      letter-spacing: 0.05em;
    }
    .total-banner .desc {
      font-size: 9.5px;
      color: #065f46;
      margin-top: 2px;
    }
    .total-banner .valor {
      font-size: 26px;
      font-weight: 900;
      color: #047857;
      letter-spacing: -0.02em;
    }
    
    .qr-section {
      display: flex;
      align-items: center;
      gap: 16px;
      border-top: 2px dashed #cbd5e1;
      padding-top: 16px;
      margin-bottom: 16px;
    }
    .qr-text h5 {
      font-size: 11px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 3px;
    }
    .qr-text p {
      font-size: 9.5px;
      color: #64748b;
      line-height: 1.4;
    }
    
    .footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8.5px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="header">
      <div class="org-badge">MIB Church • Ministério Integrado Batista</div>
      <h1 class="title">Recibo Oficial de Quitação</h1>
      <div>
        <span class="selo-quitado">
          ✨ ${isQuitado ? '100% Confirmado & Quitado' : 'Inscrição Confirmada'} ✨
        </span>
      </div>
    </div>

    <div class="greeting-box">
      <h3>🎉 Parabéns, ${nome}!</h3>
      <p>
        Sua inscrição para o evento <strong>${evento?.titulo || 'Evento Especial'}</strong> está confirmada com honra e fidelidade!
        ${isAVista ? 'Agradecemos pelo pagamento integral realizado à vista.' : `Parabéns pela quitação de todas as ${totalParc} parcelas de forma correta e pontual.`}
        Estamos na expectativa de tudo o que Deus preparou para você nesta ocasião tão especial!
      </p>
    </div>

    <div class="grid-2">
      <div class="card-info">
        <h4>👤 Dados do Participante</h4>
        <div class="row"><span class="label">Nome:</span><span class="val">${nome}</span></div>
        ${cpf ? `<div class="row"><span class="label">CPF:</span><span class="val">${cpf}</span></div>` : ''}
        ${telefone ? `<div class="row"><span class="label">Contato:</span><span class="val">${telefone}</span></div>` : ''}
        ${email ? `<div class="row"><span class="label">E-mail:</span><span class="val">${email}</span></div>` : ''}
        <div class="row"><span class="label">Vínculo:</span><span class="val">${membro ? 'Membro da Igreja' : 'Visitante Convidado'}</span></div>
        <div class="row"><span class="label">Zona/Local:</span><span class="val">${zonaNome}</span></div>
      </div>

      <div class="card-info">
        <h4>🎟️ Detalhes do Evento</h4>
        <div class="row"><span class="label">Evento:</span><span class="val">${evento?.titulo || 'Evento MIB'}</span></div>
        ${dataEventoFormatada ? `<div class="row"><span class="label">Data/Hora:</span><span class="val">${dataEventoFormatada}</span></div>` : ''}
        ${evento?.local_nome ? `<div class="row"><span class="label">Local:</span><span class="val">${evento.local_nome}</span></div>` : ''}
        <div class="row"><span class="label">Transporte:</span><span class="val">${incluiTransporte ? 'Sim (Ônibus/Caravana)' : 'Não (Próprio/Sem)'}</span></div>
        <div class="row"><span class="label">Nº Recibo:</span><span class="val">${codigoRecibo}</span></div>
        <div class="row"><span class="label">Emissão:</span><span class="val">${dataEmissao} às ${horaEmissao}</span></div>
      </div>
    </div>

    <div class="total-banner">
      <div>
        <div class="tag">Valor Total Quitado</div>
        <div class="desc">${formaPagamento} • ${isAVista ? 'Pagamento Único' : `${totalParc}x parcelas pagas`}</div>
      </div>
      <div class="valor">
        ${valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </div>
    </div>

    <div class="qr-section">
      <div style="background: #ffffff; padding: 6px; border: 1px solid #e2e8f0; border-radius: 10px; display: inline-block;">
        ${document.getElementById('qr-code-svg-element')?.outerHTML || ''}
      </div>
      <div class="qr-text">
        <h5>Credenciamento & Check-in Rápido</h5>
        <p>Apresente este código QR digital ou impresso na recepção do evento para retirada do seu crachá e acesso liberado.</p>
        <p style="margin-top: 4px; font-weight: 700; color: #059669;">Autenticação Oficial MIB Church • Código: ${codigoRecibo}</p>
      </div>
    </div>

    <div class="footer">
      <span>MIB Church • Gestão Eclesiástica e Eventos</span>
      <span>"Tudo o que fizerem, façam de todo o coração, como para o Senhor." (Cl 3:23)</span>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 350);
    };
  </script>
</body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  // Constrói o texto formatado para envio no WhatsApp
  const obterTextoWhatsApp = () => {
    const primeiroNome = nome.split(' ')[0];
    return (
      `*PARABÉNS, ${primeiroNome.toUpperCase()}!*\n\n` +
      `Sua inscrição para o evento *${evento?.titulo || 'Evento'}* da MIB Church está *100% CONFIRMADA E QUITADA*!\n\n` +
      `Agradecemos de coração pela sua fidelidade e compromisso ${isAVista ? 'com o pagamento à vista' : `com o pagamento pontual de todas as ${totalParc} parcelas`}!\n\n` +
      `*COMPROVANTE DE QUITAÇÃO:*\n` +
      `• *Recibo:* ${codigoRecibo}\n` +
      `• *Participante:* ${nome}\n` +
      `• *Evento:* ${evento?.titulo || 'Evento'}\n` +
      `${dataEventoFormatada ? `• *Data:* ${dataEventoFormatada}\n` : ''}` +
      `${evento?.local_nome ? `• *Local:* ${evento.local_nome}\n` : ''}` +
      `• *Transporte:* ${incluiTransporte ? 'Com Transporte (Incluso)' : 'Sem Transporte'}\n` +
      `• *Valor Total:* ${valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n` +
      `• *Status:* 100% Quitado (Confirmado)\n\n` +
      `Tudo pronto para vivermos momentos inesquecíveis na presença do Senhor! Nos vemos lá! Deus abençoe abundantemente!`
    );
  };

  // Gera o arquivo PDF vetorial oficial otimizado para A4
  const gerarReciboPDF = async () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 210mm

    // Moldura Externa Elegante
    doc.setDrawColor(5, 150, 105); // emerald-600
    doc.setLineWidth(0.8);
    doc.roundedRect(12, 12, 186, 273, 5, 5, 'D');

    // Moldura Interna Fina
    doc.setDrawColor(203, 213, 225); // slate-300
    doc.setLineWidth(0.3);
    doc.roundedRect(14, 14, 182, 269, 4, 4, 'D');

    // ── Cabeçalho ──
    doc.setFillColor(236, 253, 245); // emerald-50
    doc.setDrawColor(167, 243, 208); // emerald-200
    doc.roundedRect(pageWidth / 2 - 45, 18, 90, 6.5, 3, 3, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(6, 95, 70); // emerald-800
    doc.text('MIB CHURCH • MINISTÉRIO INTEGRADO BATISTA', pageWidth / 2, 22.3, { align: 'center' });

    // Título Principal
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text('RECIBO OFICIAL DE QUITAÇÃO', pageWidth / 2, 33, { align: 'center' });

    // Selo Pill "100% Quitado"
    doc.setFillColor(5, 150, 105); // emerald-600
    doc.roundedRect(pageWidth / 2 - 38, 37.5, 76, 7.5, 3.75, 3.75, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(isQuitado ? '100% CONFIRMADO & QUITADO' : 'INSCRIÇÃO CONFIRMADA', pageWidth / 2, 42.5, { align: 'center' });

    // Linha tracejada separadora
    doc.setDrawColor(203, 213, 225);
    doc.setLineDashPattern([2, 2], 0);
    doc.line(18, 49, 192, 49);
    doc.setLineDashPattern([], 0);

    // ── Mensagem de Parabéns (Greeting Box) ──
    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.roundedRect(18, 53, 174, 28, 3, 3, 'FD');

    // Barra de destaque lateral
    doc.setFillColor(5, 150, 105);
    doc.rect(18, 53, 3.5, 28, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(6, 95, 70);
    doc.text(`Parabéns, ${nome}!`, 25, 60);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85); // slate-700
    const textoMensagemBox = isAVista
      ? `Sua inscrição para o evento ${evento?.titulo || 'Evento Especial'} está confirmada com honra e fidelidade! Agradecemos de coração pelo pagamento integral realizado à vista. Estamos na expectativa de tudo o que Deus preparou para você nesta ocasião tão especial!`
      : `Sua inscrição para o evento ${evento?.titulo || 'Evento Especial'} está confirmada com honra e fidelidade! Parabéns pela sua pontualidade e fidelidade na quitação de todas as ${totalParc} parcelas de forma correta. Estamos na expectativa de tudo o que Deus preparou para você nesta ocasião tão especial!`;
    const linhasMsgBox = doc.splitTextToSize(textoMensagemBox, 162);
    doc.text(linhasMsgBox, 25, 66);

    // ── Cards Lado a Lado (Participante & Evento) ──
    const cardY = 85;
    const cardH = 59;
    const cardW = 84;

    const desenharLinha = (label, val, x, y, maxW = 50) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(label, x, y);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      const valStr = String(val || '—');
      const valCortado = doc.splitTextToSize(valStr, maxW)[0] || '—';
      doc.text(valCortado, x + 84 - 8, y, { align: 'right' });
    };

    // Card 1: Dados do Participante
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(18, cardY, cardW, cardH, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('DADOS DO PARTICIPANTE', 23, cardY + 7);
    doc.setDrawColor(241, 245, 249);
    doc.line(23, cardY + 9, 97, cardY + 9);

    desenharLinha('Nome:', nome, 23, cardY + 16);
    desenharLinha('CPF:', cpf || 'Não informado', 23, cardY + 23);
    desenharLinha('Contato:', telefone || 'Não informado', 23, cardY + 30);
    desenharLinha('E-mail:', email || 'Não informado', 23, cardY + 37);
    desenharLinha('Vínculo:', membro ? 'Membro da Igreja' : 'Visitante Convidado', 23, cardY + 44);
    desenharLinha('Zona/Local:', zonaNome, 23, cardY + 51);

    // Card 2: Detalhes do Evento
    const card2X = 108;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(card2X, cardY, cardW, cardH, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('DETALHES DO EVENTO', card2X + 5, cardY + 7);
    doc.setDrawColor(241, 245, 249);
    doc.line(card2X + 5, cardY + 9, card2X + 79, cardY + 9);

    desenharLinha('Evento:', evento?.titulo || 'Evento MIB', card2X + 5, cardY + 16);
    desenharLinha('Data/Hora:', dataEventoFormatada || 'A definir', card2X + 5, cardY + 23);
    desenharLinha('Local:', evento?.local_nome || 'Templo Sede', card2X + 5, cardY + 30);
    desenharLinha('Transporte:', incluiTransporte ? 'Sim (Incluso)' : 'Não (Sem taxa)', card2X + 5, cardY + 37);
    desenharLinha('Nº Recibo:', codigoRecibo, card2X + 5, cardY + 44);
    desenharLinha('Emissão:', `${dataEmissao} às ${horaEmissao}`, card2X + 5, cardY + 51);

    // ── Banner de Valor Quitado ──
    const bannerY = 148;
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(167, 243, 208);
    doc.roundedRect(18, bannerY, 174, 22, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(4, 120, 87);
    doc.text('VALOR TOTAL QUITADO', 24, bannerY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(6, 95, 70);
    doc.text(`${formaPagamento} • ${isAVista ? 'Pagamento Único à Vista' : `${totalParc}x parcelas quitadas`}`, 24, bannerY + 15);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(19);
    doc.setTextColor(4, 120, 87);
    doc.text(valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 186, bannerY + 14, { align: 'right' });

    // ── Linha tracejada separadora ──
    doc.setDrawColor(203, 213, 225);
    doc.setLineDashPattern([2, 2], 0);
    doc.line(18, 174, 192, 174);
    doc.setLineDashPattern([], 0);

    // ── Seção QR Code de Credenciamento ──
    const qrY = 178;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(18, qrY, 174, 54, 3, 3, 'FD');

    // Gera QR Code via qrcode library
    try {
      const qrDataUrl = await QRCode.toDataURL(qrCodePayload, {
        width: 320,
        margin: 1,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      });

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(23, qrY + 5, 44, 44, 2, 2, 'FD');
      doc.addImage(qrDataUrl, 'PNG', 24, qrY + 6, 42, 42);
    } catch (qrErr) {
      console.warn('Erro ao gerar imagem do QR Code para o PDF:', qrErr);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('Credenciamento & Check-in Rápido', 73, qrY + 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    const textoQrDesc = 'Apresente este código QR digital ou impresso na recepção do evento para leitura rápida e retirada do seu crachá de acesso liberado.';
    const linhasQrDesc = doc.splitTextToSize(textoQrDesc, 114);
    doc.text(linhasQrDesc, 73, qrY + 20);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(5, 150, 105);
    doc.text(`Autenticação Oficial MIB Church • Código: ${codigoRecibo}`, 73, qrY + 39);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(`Hash de Validação: ${inscrito.id.slice(0, 18).toUpperCase()}...`, 73, qrY + 45);

    // ── Rodapé e Versículo ──
    const footY = 244;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(18, footY, 192, footY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('MIB Church • Gestão Eclesiástica e Eventos', 18, footY + 7);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('"Tudo o que fizerem, façam de todo o coração, como para o Senhor." (Cl 3:23)', 192, footY + 7, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(`Documento emitido eletronicamente em ${dataEmissao} às ${horaEmissao} • Autenticidade garantida pelo sistema`, pageWidth / 2, footY + 15, { align: 'center' });

    const nomeArquivo = `recibo_quitacao_${nome.replace(/\s+/g, '_').toLowerCase()}_${codigoRecibo.toLowerCase()}.pdf`;
    const blob = doc.output('blob');
    const file = new File([blob], nomeArquivo, { type: 'application/pdf' });

    return { doc, blob, file, nomeArquivo };
  };

  // Dispara o download direto do arquivo PDF
  const baixarPDF = async () => {
    try {
      setProcessando(true);
      const { doc, nomeArquivo } = await gerarReciboPDF();
      doc.save(nomeArquivo);
    } catch (err) {
      console.error('Erro ao baixar PDF:', err);
      alert('Ocorreu um erro ao gerar o arquivo PDF. Tente novamente.');
    } finally {
      setProcessando(false);
    }
  };

  // Envia o recibo em PDF diretamente para o WhatsApp (Nativo no celular ou Download + WhatsApp no desktop)
  const enviarPDFWhatsApp = async () => {
    try {
      setProcessando(true);
      setAvisoDesktop(false);

      const telLimpo = rawPhone.replace(/\D/g, '');
      const texto = obterTextoWhatsApp();
      const { doc, file, nomeArquivo } = await gerarReciboPDF();

      // 1. Tenta compartilhamento nativo direto do arquivo PDF (ideal para Celular / PWA)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: `Recibo de Quitação - ${nome}`,
            text: texto
          });
          return;
        } catch (shareErr) {
          if (shareErr.name === 'AbortError') return; // Usuário cancelou a tela nativa
          console.warn('Falha no Web Share API, executando fallback desktop:', shareErr);
        }
      }

      // 2. Fallback para Computador / WhatsApp Web:
      // Baixa o arquivo PDF no computador
      doc.save(nomeArquivo);

      // Abre a conversa do WhatsApp com o participante
      const urlWa = telLimpo.length >= 10
        ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(texto)}`
        : `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;

      window.open(urlWa, '_blank', 'noopener,noreferrer');
      setAvisoDesktop(true);
    } catch (err) {
      console.error('Erro ao enviar recibo no WhatsApp:', err);
      alert('Não foi possível processar o envio do recibo. Tente novamente.');
    } finally {
      setProcessando(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onFechar}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Faixa Superior Elegante e Festiva */}
        <div className="relative p-6 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-start justify-between gap-4 overflow-hidden">
          {/* Efeito Glow e Brilho */}
          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -left-8 -top-8 w-32 h-32 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 flex items-start gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-black/10">
              🎉
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-xs">
                  ✨ 100% Quitado
                </span>
                <span className="text-[10px] font-bold text-white/80">
                  {codigoRecibo}
                </span>
              </div>
              <h2 className="text-xl font-black mt-1 tracking-tight text-white">
                Recibo Especial de Quitação
              </h2>
              <p className="text-xs text-white/85 mt-0.5">
                {evento?.titulo || 'Evento MIB'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onFechar}
            className="relative z-10 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer shrink-0"
            title="Fechar"
          >
            ✕
          </button>
        </div>

        {/* Corpo do Recibo (Scrollável) */}
        <div ref={reciboRef} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-slate-750 dark:text-slate-200 flex-1">
          
          {/* Mensagem de Parabéns */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 flex items-start gap-3.5">
            <span className="text-2xl shrink-0">🌟</span>
            <div>
              <h3 className="text-sm font-black text-emerald-900 dark:text-emerald-200">
                Parabéns, {nome}!
              </h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-300/90 mt-1 leading-relaxed">
                {isAVista
                  ? 'Sua vaga está garantida e sua inscrição foi quitada à vista com total sucesso!'
                  : `Parabéns pela pontualidade e fidelidade na quitação de todas as ${totalParc} parcelas da sua inscrição!`}
                {' '}Estamos muito felizes com a sua participação e cremos em momentos inesquecíveis!
              </p>
            </div>
          </div>

          {/* Card Detalhes do Participante e Evento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">
                👤 Participante
              </span>
              <p className="font-extrabold text-slate-800 dark:text-white truncate">{nome}</p>
              {telefone && <p className="text-slate-500 dark:text-slate-400">📱 {telefone}</p>}
              {email && <p className="text-slate-500 dark:text-slate-400 truncate">✉️ {email}</p>}
              <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                📍 {zonaNome} {membro ? '• Membro' : '• Convidado'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">
                🎟️ Evento & Logística
              </span>
              <p className="font-extrabold text-slate-800 dark:text-white truncate">{evento?.titulo || 'Evento'}</p>
              {dataEventoFormatada && <p className="text-slate-500 dark:text-slate-400">📅 {dataEventoFormatada}</p>}
              {evento?.local_nome && <p className="text-slate-500 dark:text-slate-400 truncate">📍 {evento.local_nome}</p>}
              <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                🚌 {incluiTransporte ? 'Com Transporte (Incluso)' : 'Sem Transporte'}
              </p>
            </div>
          </div>

          {/* Banner de Valor Quitado */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-300/80 dark:border-emerald-700/50 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                Valor Total Quitado
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {formaPagamento} • {isAVista ? 'À Vista' : `${totalParc}x parcelas quitadas`}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          </div>

          {/* QR Code de Validação na Entrada */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex items-center gap-4">
            <div className="p-2.5 bg-white rounded-xl shadow-xs border border-slate-200 shrink-0">
              <QRCodeSVG
                id="qr-code-svg-element"
                value={qrCodePayload}
                size={80}
                level="M"
                includeMargin={false}
              />
            </div>
            <div className="text-left">
              <p className="text-xs font-black text-slate-800 dark:text-white">Credenciamento & Check-in</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                Este QR Code é o seu passe de acesso oficial. Apresente-o na recepção do evento para liberar sua entrada.
              </p>
              <p className="text-[10px] font-mono font-bold text-slate-400 mt-1">Autenticação: {codigoRecibo}</p>
            </div>
          </div>

          {/* Aviso Didático para Computador */}
          {avisoDesktop && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start justify-between gap-3 text-xs animate-in fade-in">
              <div className="flex items-start gap-2.5 text-emerald-900 dark:text-emerald-200">
                <span className="text-base shrink-0">📄</span>
                <div>
                  <p className="font-extrabold text-emerald-800 dark:text-emerald-300">Recibo em PDF baixado com sucesso!</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5 leading-relaxed">
                    A conversa do WhatsApp com o participante foi aberta. Como você está no computador, basta arrastar o PDF baixado ou clicar no clipe de anexo para enviá-lo.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAvisoDesktop(false)}
                className="text-emerald-600 hover:text-emerald-800 font-black text-xs cursor-pointer"
                title="Fechar aviso"
              >
                ✕
              </button>
            </div>
          )}

        </div>

        {/* Rodapé com Ações Rápidas */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={onFechar}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            Fechar
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Botão Enviar PDF no WhatsApp */}
            <button
              type="button"
              onClick={enviarPDFWhatsApp}
              disabled={processando}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-md shadow-emerald-700/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              title="Enviar recibo em PDF no WhatsApp do participante"
            >
              <span>{processando ? '⏳ Gerando PDF...' : '💬 Enviar PDF no WhatsApp'}</span>
            </button>

            {/* Botão Baixar Arquivo PDF */}
            <button
              type="button"
              onClick={baixarPDF}
              disabled={processando}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-md shadow-blue-700/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              title="Baixar arquivo PDF do Recibo"
            >
              <span>📥 Baixar PDF</span>
            </button>

            {/* Botão Imprimir */}
            <button
              type="button"
              onClick={imprimirRecibo}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Imprimir ou Salvar Recibo via Navegador"
            >
              <span>🖨️ Imprimir</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

