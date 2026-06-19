import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

// ============================================================
// Cartão Digital de Parcela / Pagamento
// Gera um "ticket" vertical (estilo voucher), com QR grande,
// cabeçalho com dados da igreja e informações essenciais.
// Pode ser exportado como PNG (compartilhamento via WhatsApp)
// ou PDF (1 página por cartão).
// ============================================================

const CARD_WIDTH = 720; // px (referência para o canvas, ~ 9.5cm em 192dpi)
const CARD_HEIGHT = 1080; // px (proporção ~2:3, formato ticket)

/**
 * Desenha o cartão num canvas e retorna o elemento <canvas>.
 *
 * @param {Object} dados
 * @param {Object} dados.igreja - { nome_igreja, endereco, bairro, cidade, estado, telefone, email_contato }
 * @param {string} dados.evento - título do evento
 * @param {string} dados.nome - nome do participante
 * @param {string} [dados.cpf]
 * @param {number} dados.valor - valor da parcela/pagamento
 * @param {string|number} dados.parcelaNum - número da parcela atual
 * @param {number} dados.totalParcelas - total de parcelas
 * @param {Date|string} [dados.vencimento] - data de vencimento da parcela
 * @param {boolean} [dados.pago] - se true, exibe selo "PAGO"
 * @param {string} dados.codigoQr - string a ser codificada no QR (ex: EVENTO|inscricaoId|parcelaNum)
 */
export async function desenharCartaoDigital(dados) {
  const {
    igreja = {},
    evento,
    nome,
    cpf,
    valor,
    parcelaNum,
    totalParcelas,
    vencimento,
    pago = false,
    codigoQr,
  } = dados;

  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d');

  // Fundo
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // Faixa superior colorida (cabeçalho)
  const headerHeight = 220;
  const gradient = ctx.createLinearGradient(0, 0, CARD_WIDTH, 0);
  gradient.addColorStop(0, '#202046');
  gradient.addColorStop(1, '#3730a3');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CARD_WIDTH, headerHeight);

  // Nome da igreja
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = 'bold 34px Helvetica, Arial, sans-serif';
  wrapText(ctx, (igreja.nome_igreja || 'Igreja').toUpperCase(), CARD_WIDTH / 2, 60, CARD_WIDTH - 80, 38);

  // Endereço / contato da igreja
  ctx.font = '18px Helvetica, Arial, sans-serif';
  ctx.fillStyle = '#cbd5e1';
  const enderecoIgreja = [igreja.endereco, igreja.bairro, igreja.cidade, igreja.estado].filter(Boolean).join(', ');
  const contatoIgreja = [igreja.telefone, igreja.email_contato].filter(Boolean).join('  •  ');
  let headerY = 115;
  if (enderecoIgreja) {
    ctx.fillText(truncate(ctx, enderecoIgreja, CARD_WIDTH - 80), CARD_WIDTH / 2, headerY);
    headerY += 26;
  }
  if (contatoIgreja) {
    ctx.fillText(truncate(ctx, contatoIgreja, CARD_WIDTH - 80), CARD_WIDTH / 2, headerY);
    headerY += 26;
  }

  // Título do evento (logo abaixo do cabeçalho)
  let y = headerHeight + 60;
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 16px Helvetica, Arial, sans-serif';
  ctx.fillText('INGRESSO / COMPROVANTE DE PARCELA', CARD_WIDTH / 2, y);

  y += 46;
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 36px Helvetica, Arial, sans-serif';
  wrapText(ctx, evento || 'Evento', CARD_WIDTH / 2, y, CARD_WIDTH - 80, 42);
  y += (Math.ceil(measureWrapLines(ctx, evento || 'Evento', CARD_WIDTH - 80)) ) * 42;

  // Linha pontilhada decorativa
  y += 0;
  drawDashedLine(ctx, 50, y, CARD_WIDTH - 50);
  y += 20;

  // QR Code grande
  const qrSize = 380;
  const qrDataUrl = await QRCode.toDataURL(codigoQr, { width: qrSize, margin: 1 });
  const qrImg = await loadImage(qrDataUrl);
  ctx.drawImage(qrImg, (CARD_WIDTH - qrSize) / 2, y, qrSize, qrSize);
  y += qrSize + 50;

  // Selo PAGO (se aplicável)
  if (pago) {
    ctx.save();
    ctx.translate(CARD_WIDTH / 2, y - qrSize / 2 - 10);
    ctx.rotate(-0.25);
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 6;
    ctx.font = 'bold 46px Helvetica, Arial, sans-serif';
    ctx.fillStyle = 'rgba(22, 163, 74, 0.12)';
    const text = 'PAGO';
    const textWidth = ctx.measureText(text).width;
    ctx.strokeRect(-textWidth / 2 - 24, -36, textWidth + 48, 72);
    ctx.fillStyle = '#16a34a';
    ctx.fillText(text, 0, 14);
    ctx.restore();
  }

  // Linha pontilhada
  y += -20;
  drawDashedLine(ctx, 50, y, CARD_WIDTH - 50);
  y += 40; // Movido 24px para cima (original 50) para aproximar as informações da linha

  // Informações essenciais
  ctx.textAlign = 'left';
  const labelX = 60;
  const valueX = 320;

  const linha = (label, valor2) => {
    ctx.font = 'bold 20px Helvetica, Arial, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText(label, labelX, y);
    ctx.font = 'bold 22px Helvetica, Arial, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(truncate(ctx, String(valor2 ?? '—'), CARD_WIDTH - valueX - 60), valueX, y);
    y += 44;
  };

  linha('Participante', nome);
  if (cpf) linha('CPF', cpf);
  linha('Parcela', `${parcelaNum} / ${totalParcelas}`);
  linha('Valor', `R$ ${Number(valor || 0).toFixed(2)}`);
  if (vencimento) {
    const dataVenc = vencimento instanceof Date ? vencimento : new Date(vencimento);
    linha('Vencimento', dataVenc.toLocaleDateString('pt-BR', { timeZone: 'UTC' }));
  }

  // Rodapé
  ctx.textAlign = 'center';
  ctx.font = '16px Helvetica, Arial, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Apresente este QR Code para confirmar o pagamento.', CARD_WIDTH / 2, CARD_HEIGHT - 20);

  return canvas;
}

/**
 * Gera o cartão e dispara o download como PNG.
 */
export async function baixarCartaoPNG(dados, nomeArquivo) {
  const canvas = await desenharCartaoDigital(dados);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nomeArquivo || 'cartao.png';
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Gera o cartão e dispara o download como PDF (1 página, formato cartão).
 */
export async function baixarCartaoPDF(dados, nomeArquivo) {
  const canvas = await desenharCartaoDigital(dados);
  const imgData = canvas.toDataURL('image/png');

  // Mantém a proporção do canvas (720x1080 ≈ 2:3) num PDF retrato
  const pdfWidth = 90; // mm
  const pdfHeight = (CARD_HEIGHT / CARD_WIDTH) * pdfWidth;

  const doc = new jsPDF({ unit: 'mm', format: [pdfWidth, pdfHeight] });
  doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  doc.save(nomeArquivo || 'cartao.pdf');
}

/**
 * Gera múltiplos cartões (um por parcela) e baixa todos como PDF
 * em um único arquivo (1 página por parcela).
 */
export async function baixarCartoesPDF(listaDados, nomeArquivo) {
  if (!listaDados.length) return;

  const pdfWidth = 90; // mm
  const pdfHeight = (CARD_HEIGHT / CARD_WIDTH) * pdfWidth;
  const doc = new jsPDF({ unit: 'mm', format: [pdfWidth, pdfHeight] });

  for (let i = 0; i < listaDados.length; i++) {
    const canvas = await desenharCartaoDigital(listaDados[i]);
    const imgData = canvas.toDataURL('image/png');
    if (i > 0) doc.addPage([pdfWidth, pdfHeight]);
    doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  }

  doc.save(nomeArquivo || 'cartoes.pdf');
}

// ============================================================
// Helpers de desenho
// ============================================================

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawDashedLine(ctx, x1, y, x2) {
  ctx.save();
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.stroke();
  ctx.restore();
}

function truncate(ctx, text, maxWidth) {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let truncated = text;
  while (truncated.length > 1 && ctx.measureText(truncated + '…').width > maxWidth) {
    truncated = truncated.slice(0, -1);
  }
  return truncated + '…';
}

// Quebra texto em múltiplas linhas centradas, retornando o número de linhas desenhadas
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text).split(' ');
  let line = '';
  let currentY = y;
  let lines = 0;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    if (ctx.measureText(testLine).width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), x, currentY);
      line = words[i] + ' ';
      currentY += lineHeight;
      lines++;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  lines++;
  return lines;
}

// Calcula quantas linhas o wrapText vai gerar, sem desenhar
function measureWrapLines(ctx, text, maxWidth) {
  const words = String(text).split(' ');
  let line = '';
  let lines = 1;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    if (ctx.measureText(testLine).width > maxWidth && line !== '') {
      line = words[i] + ' ';
      lines++;
    } else {
      line = testLine;
    }
  }
  return lines;
}
