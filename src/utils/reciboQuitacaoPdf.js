import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { findInJsonGlobal, extrairValorInscricao, extrairParcelasInscricao } from '../eventoInscricaoUtils';
import { mascaraTelefone, mascaraCPF } from '../mascaras';

export function extrairDadosReciboQuitacao({ evento, inscrito, pessoas = [], obterZonaParticipante }) {
  const dados = inscrito?.dados_inscricao || {};
  const nome = findInJsonGlobal(dados, ['nome', 'nome completo', 'completo']) || 'Participante';
  const email = findInJsonGlobal(dados, 'email') || '';
  const rawCpf = findInJsonGlobal(dados, 'cpf') || '';

  const membro = (pessoas || []).find(p =>
    (email && p.email?.toLowerCase().trim() === email.toLowerCase().trim()) ||
    (nome && p.nome?.toLowerCase().trim() === nome.toLowerCase().trim())
  );

  const rawPhone =
    findInJsonGlobal(dados, ['telefone', 'celular', 'whatsapp', 'contato', 'fone']) ||
    membro?.telefone ||
    membro?.celular ||
    membro?.whatsapp ||
    '';
  const telefone = rawPhone ? mascaraTelefone(rawPhone) : '';
  const cpf = rawCpf ? mascaraCPF(rawCpf) : '';

  const incluiTransporte = findInJsonGlobal(dados, 'transporte')?.toString().toLowerCase().startsWith('sim');
  const valorTotal = extrairValorInscricao(dados, evento);

  const totalParc = Number(findInJsonGlobal(dados, 'parcelas')) || extrairParcelasInscricao(dados) || 1;
  const pagas = Array.isArray(dados.parcelas_pagas) ? dados.parcelas_pagas : [];
  const formaPagamento = findInJsonGlobal(dados, ['forma de pagamento', 'forma_pagamento', 'pagamento', 'metodo']) || 'À Vista';

  const isAVista = totalParc <= 1;
  const isQuitado = inscrito?.status_pagamento === 'pago' || (totalParc > 1 && pagas.length >= totalParc);

  const zonaNome = obterZonaParticipante ? obterZonaParticipante(inscrito) : 'Não informada';
  const codigoRecibo = `REC-${new Date().getFullYear()}-${String(inscrito?.id || '00000000').slice(0, 8).toUpperCase()}`;
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

  const qrCodePayload = JSON.stringify({
    tipo: 'RECIBO_MIB_EVENTO',
    recibo: codigoRecibo,
    evento_id: evento?.id,
    inscricao_id: inscrito?.id,
    participante: nome,
    quitado: isQuitado,
    valor: valorTotal
  });

  return {
    dados,
    nome,
    email,
    rawPhone,
    telefone,
    cpf,
    membro,
    incluiTransporte,
    valorTotal,
    totalParc,
    pagas,
    formaPagamento,
    isAVista,
    isQuitado,
    zonaNome,
    codigoRecibo,
    dataEmissao,
    horaEmissao,
    dataEventoFormatada,
    qrCodePayload
  };
}

export function obterTextoReciboWhatsApp(info, evento) {
  const primeiroNome = (info.nome || 'Participante').split(' ')[0];
  return (
    `*PARABÉNS, ${primeiroNome.toUpperCase()}!*\n\n` +
    `Sua inscrição para o evento *${evento?.titulo || 'Evento'}* da MIB Church está *100% CONFIRMADA E QUITADA*!\n\n` +
    `Agradecemos de coração pela sua fidelidade e compromisso ${info.isAVista ? 'com o pagamento à vista' : `com o pagamento pontual de todas as ${info.totalParc} parcelas`}!\n\n` +
    `*COMPROVANTE DE QUITAÇÃO:*\n` +
    `• *Recibo:* ${info.codigoRecibo}\n` +
    `• *Participante:* ${info.nome}\n` +
    `• *Evento:* ${evento?.titulo || 'Evento'}\n` +
    `${info.dataEventoFormatada ? `• *Data:* ${info.dataEventoFormatada}\n` : ''}` +
    `${evento?.local_nome ? `• *Local:* ${evento.local_nome}\n` : ''}` +
    `• *Transporte:* ${info.incluiTransporte ? 'Com Transporte (Incluso)' : 'Sem Transporte'}\n` +
    `• *Valor Total:* ${info.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n` +
    `• *Status:* 100% Quitado (Confirmado)\n\n` +
    `Segue em anexo o seu *Recibo Especial de Quitação (PDF)* com o *QR Code de Credenciamento* para apresentar na entrada do evento.\n\n` +
    `Tudo pronto para vivermos momentos inesquecíveis na presença do Senhor! Deus abençoe abundantemente!`
  );
}

export function obterMensagemBoasVindasEvento({ evento, nome, templateCustom }) {
  const primeiroNome = (nome || 'Participante').split(' ')[0];
  let dataFormatada = '';
  if (evento?.data_inicio) {
    try {
      const d = new Date(evento.data_inicio);
      dataFormatada = d.toLocaleDateString('pt-BR');
      const h = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      if (h && h !== '00:00') dataFormatada += ` às ${h}`;
    } catch (_) {}
  }

  if (templateCustom && templateCustom.trim()) {
    return templateCustom
      .replace(/\{\{NOME\}\}/gi, nome || 'Participante')
      .replace(/\{\{PRIMEIRO_NOME\}\}/gi, primeiroNome)
      .replace(/\{\{EVENTO\}\}/gi, evento?.titulo || 'Evento MIB')
      .replace(/\{\{DATA\}\}/gi, dataFormatada || 'Em breve')
      .replace(/\{\{LOCAL\}\}/gi, evento?.local_nome || 'Templo Sede');
  }

  return (
    `*OLÁ, ${primeiroNome.toUpperCase()}! SEJA MUITO BEM-VINDO(A)!*\n\n` +
    `Recebemos sua inscrição para o evento *${evento?.titulo || 'Evento MIB Church'}*!\n\n` +
    `${dataFormatada ? `📅 *Data:* ${dataFormatada}\n` : ''}` +
    `${evento?.local_nome ? `📍 *Local:* ${evento.local_nome}\n` : ''}` +
    `\nEstamos muito felizes em contar com a sua presença! Em breve entraremos em contato com mais informações. Deus abençoe!`
  );
}

export function obterMensagemCheckinBoasVindas({ evento, nome, templateCustom }) {
  const primeiroNome = (nome || 'Participante').split(' ')[0];
  const local = evento?.local_nome || 'Templo Sede';

  if (templateCustom && templateCustom.trim()) {
    return templateCustom
      .replace(/\{\{NOME\}\}/gi, nome || 'Participante')
      .replace(/\{\{PRIMEIRO_NOME\}\}/gi, primeiroNome)
      .replace(/\{\{EVENTO\}\}/gi, evento?.titulo || 'Evento MIB')
      .replace(/\{\{LOCAL\}\}/gi, local);
  }

  return (
    `*SEJA MUITO BEM-VINDO(A), ${primeiroNome.toUpperCase()}!* 🎉\n\n` +
    `Seu credenciamento foi confirmado e sua presença está registrada no evento *${evento?.titulo || 'Evento MIB Church'}*!\n\n` +
    `✅ *Acesso liberado*\n` +
    `${evento?.local_nome ? `📍 *Local:* ${evento.local_nome}\n` : ''}` +
    `\nQue Deus fale poderosamente ao seu coração e abençoe grandemente este tempo especial conosco! Aproveite cada momento!`
  );
}

export async function gerarReciboQuitacaoPDF({ evento, inscrito, pessoas = [], obterZonaParticipante }) {
  const info = extrairDadosReciboQuitacao({ evento, inscrito, pessoas, obterZonaParticipante });
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Moldura Externa
  doc.setDrawColor(5, 150, 105);
  doc.setLineWidth(0.8);
  doc.roundedRect(12, 12, 186, 273, 5, 5, 'D');

  // Moldura Interna
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(14, 14, 182, 269, 4, 4, 'D');

  // Cabeçalho
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(pageWidth / 2 - 45, 18, 90, 6.5, 3, 3, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(6, 95, 70);
  doc.text('MIB CHURCH • MINISTÉRIO INTEGRADO BATISTA', pageWidth / 2, 22.3, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text('RECIBO OFICIAL DE QUITAÇÃO', pageWidth / 2, 33, { align: 'center' });

  doc.setFillColor(5, 150, 105);
  doc.roundedRect(pageWidth / 2 - 38, 37.5, 76, 7.5, 3.75, 3.75, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(info.isQuitado ? '100% CONFIRMADO & QUITADO' : 'INSCRIÇÃO CONFIRMADA', pageWidth / 2, 42.5, { align: 'center' });

  doc.setDrawColor(203, 213, 225);
  doc.setLineDashPattern([2, 2], 0);
  doc.line(18, 49, 192, 49);
  doc.setLineDashPattern([], 0);

  // Greeting Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(18, 53, 174, 28, 3, 3, 'FD');
  doc.setFillColor(5, 150, 105);
  doc.rect(18, 53, 3.5, 28, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(6, 95, 70);
  doc.text(`Parabéns, ${info.nome}!`, 25, 60);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const textoMensagemBox = info.isAVista
    ? `Sua inscrição para o evento ${evento?.titulo || 'Evento Especial'} está confirmada com honra e fidelidade! Agradecemos de coração pelo pagamento integral realizado à vista. Estamos na expectativa de tudo o que Deus preparou para você nesta ocasião tão especial!`
    : `Sua inscrição para o evento ${evento?.titulo || 'Evento Especial'} está confirmada com honra e fidelidade! Parabéns pela sua pontualidade e fidelidade na quitação de todas as ${info.totalParc} parcelas de forma correta. Estamos na expectativa de tudo o que Deus preparou para você nesta ocasião tão especial!`;
  doc.text(doc.splitTextToSize(textoMensagemBox, 162), 25, 66);

  // Cards Lado a Lado
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
    const valCortado = doc.splitTextToSize(String(val || '—'), maxW)[0] || '—';
    doc.text(valCortado, x + 84 - 8, y, { align: 'right' });
  };

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(18, cardY, cardW, cardH, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('DADOS DO PARTICIPANTE', 23, cardY + 7);
  doc.setDrawColor(241, 245, 249);
  doc.line(23, cardY + 9, 97, cardY + 9);

  desenharLinha('Nome:', info.nome, 23, cardY + 16);
  desenharLinha('CPF:', info.cpf || 'Não informado', 23, cardY + 23);
  desenharLinha('Contato:', info.telefone || 'Não informado', 23, cardY + 30);
  desenharLinha('E-mail:', info.email || 'Não informado', 23, cardY + 37);
  desenharLinha('Vínculo:', info.membro ? 'Membro da Igreja' : 'Visitante Convidado', 23, cardY + 44);
  desenharLinha('Zona/Local:', info.zonaNome, 23, cardY + 51);

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
  desenharLinha('Data/Hora:', info.dataEventoFormatada || 'A definir', card2X + 5, cardY + 23);
  desenharLinha('Local:', evento?.local_nome || 'Templo Sede', card2X + 5, cardY + 30);
  desenharLinha('Transporte:', info.incluiTransporte ? 'Sim (Incluso)' : 'Não (Sem taxa)', card2X + 5, cardY + 37);
  desenharLinha('Nº Recibo:', info.codigoRecibo, card2X + 5, cardY + 44);
  desenharLinha('Emissão:', `${info.dataEmissao} às ${info.horaEmissao}`, card2X + 5, cardY + 51);

  // Banner de Valor Quitado
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
  doc.text(`${info.formaPagamento} • ${info.isAVista ? 'Pagamento Único à Vista' : `${info.totalParc}x parcelas quitadas`}`, 24, bannerY + 15);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(4, 120, 87);
  doc.text(info.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 186, bannerY + 14, { align: 'right' });

  doc.setDrawColor(203, 213, 225);
  doc.setLineDashPattern([2, 2], 0);
  doc.line(18, 174, 192, 174);
  doc.setLineDashPattern([], 0);

  // QR Code de Credenciamento
  const qrY = 178;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(18, qrY, 174, 54, 3, 3, 'FD');

  try {
    const qrDataUrl = await QRCode.toDataURL(info.qrCodePayload, {
      width: 320,
      margin: 1,
      color: { dark: '#0f172a', light: '#ffffff' }
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
  doc.text(doc.splitTextToSize(textoQrDesc, 114), 73, qrY + 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(5, 150, 105);
  doc.text(`Autenticação Oficial MIB Church • Código: ${info.codigoRecibo}`, 73, qrY + 39);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Hash de Validação: ${String(inscrito?.id || '').slice(0, 18).toUpperCase()}...`, 73, qrY + 45);

  // Rodapé
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
  doc.text(`Documento emitido eletronicamente em ${info.dataEmissao} às ${info.horaEmissao} • Autenticidade garantida pelo sistema`, pageWidth / 2, footY + 15, { align: 'center' });

  const nomeArquivo = `recibo_quitacao_${info.nome.replace(/\s+/g, '_').toLowerCase()}_${info.codigoRecibo.toLowerCase()}.pdf`;
  const blob = doc.output('blob');
  const file = new File([blob], nomeArquivo, { type: 'application/pdf' });
  const dataUri = doc.output('datauristring');
  const pdfBase64 = dataUri.includes(',') ? dataUri.split(',')[1] : dataUri;
  const caption = obterTextoReciboWhatsApp(info, evento);

  return { doc, blob, file, pdfBase64, nomeArquivo, caption, info };
}
