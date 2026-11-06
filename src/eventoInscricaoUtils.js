// Utilitários para tratamento financeiro e cálculo imutável de inscrições de eventos

export const findInJsonGlobal = (obj, query) => {
  if (!obj || typeof obj !== 'object') return null;
  const queries = Array.isArray(query) ? query : [query];
  const key = Object.keys(obj).find(k => queries.some(q => k.toLowerCase().includes(q.toLowerCase())));
  return key ? obj[key] : null;
};

// Converte string de moeda (ex: "R$ 180,00", "180.00", "180", "1.250,50") ou número em float confiável
export const parseMoeda = (val) => {
  if (val === null || val === undefined || val === '') return null;
  if (typeof val === 'number') return isNaN(val) ? null : val;
  const str = String(val).trim();
  if (!str) return null;

  // Se já for uma string numérica pura como "180" ou "180.00"
  if (/^-?\d+(\.\d+)?$/.test(str)) {
    const n = parseFloat(str);
    return isNaN(n) ? null : n;
  }

  // Remove caracteres que não sejam dígitos, vírgula, ponto ou hífen
  const limpo = str.replace(/[^\d,.-]/g, '');
  if (!limpo) return null;

  // Se contiver tanto vírgula quanto ponto (ex: "1.250,50" ou "1,250.50")
  if (limpo.includes(',') && limpo.includes('.')) {
    if (limpo.lastIndexOf(',') > limpo.lastIndexOf('.')) {
      // Formato brasileiro: ponto como milhar e vírgula como decimal
      const semMilhar = limpo.replace(/\./g, '').replace(',', '.');
      const num = parseFloat(semMilhar);
      return isNaN(num) ? null : num;
    } else {
      // Formato americano: vírgula como milhar e ponto como decimal
      const semMilhar = limpo.replace(/,/g, '');
      const num = parseFloat(semMilhar);
      return isNaN(num) ? null : num;
    }
  }

  // Se tiver apenas vírgula (ex: "180,00" ou "36,00")
  if (limpo.includes(',')) {
    const num = parseFloat(limpo.replace(',', '.'));
    return isNaN(num) ? null : num;
  }

  // Se tiver apenas ponto
  if (limpo.includes('.')) {
    const partes = limpo.split('.');
    if (partes.length > 2) {
      // Múltiplos pontos = milhares (ex: 1.000.000)
      const num = parseFloat(limpo.replace(/\./g, ''));
      return isNaN(num) ? null : num;
    }
    // 1 ponto com 1 ou 2 casas decimais = decimal (ex: 180.00 ou 36.5)
    if (partes[1].length === 2 || partes[1].length === 1) {
      const num = parseFloat(limpo);
      return isNaN(num) ? null : num;
    }
    // 1 ponto com 3 casas = milhar (ex: 1.000)
    if (partes[1].length === 3) {
      const num = parseFloat(limpo.replace(/\./g, ''));
      return isNaN(num) ? null : num;
    }
    const num = parseFloat(limpo);
    return isNaN(num) ? null : num;
  }

  const num = parseFloat(limpo);
  return isNaN(num) ? null : num;
};

/**
 * Extrai o valor real da inscrição garantindo congelamento histórico:
 * Mesmo que o valor base do evento ou lote seja alterado posteriormente (ex: de R$ 180 para R$ 230),
 * as inscrições já realizadas NUNCA sofrem alteração de valor.
 */
export const extrairValorInscricao = (dados, evento) => {
  if (!dados || typeof dados !== 'object') {
    return Number(evento?.valor) || 0;
  }

  // 1. Campo numérico direto explicitamente gravado na inscrição
  if (typeof dados.valor_total_numerico === 'number' && dados.valor_total_numerico > 0) {
    return dados.valor_total_numerico;
  }

  // 2. Chaves de valor total prioritárias
  const chavesTotal = [
    'valor total', 'valor_total', 'valortotal',
    'total pago', 'total_pago', 'valorpago', 'valor pago',
    'total da inscricao', 'total da inscrição', 'total inscricao', 'total'
  ];
  for (const k of chavesTotal) {
    const val = findInJsonGlobal(dados, k);
    const parsed = parseMoeda(val);
    if (parsed !== null && parsed > 0) return parsed;
  }

  // 3. Detecção pela string em "Forma de Pagamento", ex: "Cartão de crédito (5x de R$ 36,00)" ou "5x de 36,00"
  const formaPg = findInJsonGlobal(dados, ['forma de pagamento', 'forma_pagamento', 'pagamento', 'metodo', 'detalhes_pagamento'])?.toString() || '';
  if (formaPg) {
    // Procura padrão de parcelas: "5x de R$ 36,00", "5x R$ 36,00", "5x 36,00"
    const matchParc = formaPg.match(/(\d+)\s*x\s*(?:de\s*)?(?:R\$\s*)?([\d.,]+)/i);
    if (matchParc) {
      const qtd = Number(matchParc[1]);
      const valUnit = parseMoeda(matchParc[2]);
      if (qtd > 0 && valUnit && valUnit > 0) {
        return Math.round(qtd * valUnit * 100) / 100;
      }
    }
    // Valor total único em texto de pagamento (ex: "Pix - R$ 180,00" ou "À vista R$ 180,00")
    const matchValorUnico = formaPg.match(/R\$\s*([\d.,]+)/i);
    if (matchValorUnico) {
      const valParsed = parseMoeda(matchValorUnico[1]);
      if (valParsed && valParsed > 0) return valParsed;
    }
  }

  // 4. Quantidade de parcelas * valor da parcela unitária
  const parcelasQtd = Number(findInJsonGlobal(dados, ['parcelas', 'qtd_parcelas', 'quantidade_parcelas'])) || 1;
  const valorUnitParcela = parseMoeda(findInJsonGlobal(dados, ['valor_parcela', 'valor parcela', 'valor da parcela']));
  if (parcelasQtd > 0 && valorUnitParcela && valorUnitParcela > 0) {
    return Math.round(parcelasQtd * valorUnitParcela * 100) / 100;
  }

  // 5. Chaves gerais de valor (como "Valor", "Preço", "Valor da Inscrição", "Lote", "Valor Base")
  const chavesGerais = [
    'valor da inscricao', 'valor da inscrição', 'valor inscricao', 'valor inscrição',
    'valor base', 'valor_base', 'valor do lote', 'valor lote', 'valor_lote',
    'preco', 'preço', 'valor', 'investimento', 'taxa'
  ];
  for (const k of chavesGerais) {
    const val = findInJsonGlobal(dados, k);
    const parsed = parseMoeda(val);
    if (parsed !== null && parsed > 0) return parsed;
  }

  // 6. Varredura geral em todas as chaves do objeto dados_inscricao
  for (const [k, v] of Object.entries(dados)) {
    const kLow = k.toLowerCase();
    if (['total', 'valor', 'preco', 'preço'].some(term => kLow.includes(term))) {
      const parsed = parseMoeda(v);
      if (parsed !== null && parsed > 0) return parsed;
    }
  }

  // 7. Fallback se não houver NENHUM registro de valor histórico no JSON
  const incluiTransporte = findInJsonGlobal(dados, 'transporte')?.toString().toLowerCase().startsWith('sim');
  const valorTransporte = incluiTransporte ? (Number(evento?.valor_transporte) || 0) : 0;
  return (Number(evento?.valor) || 0) + valorTransporte;
};

// Extrai a quantidade de parcelas da inscrição
export const extrairParcelasInscricao = (dados) => {
  if (!dados || typeof dados !== 'object') return 1;
  const num = Number(findInJsonGlobal(dados, ['parcelas', 'qtd_parcelas', 'quantidade_parcelas']));
  if (num && num > 0) return num;

  const formaPg = findInJsonGlobal(dados, ['forma de pagamento', 'forma_pagamento', 'pagamento', 'metodo'])?.toString() || '';
  const matchParc = formaPg.match(/(\d+)\s*x/i);
  if (matchParc) {
    const p = Number(matchParc[1]);
    if (p > 0) return p;
  }
  return 1;
};

/**
 * Gera mensagem formatada e calorosa para envio do formulário de inscrição via WhatsApp
 */
export const gerarMensagemInscricaoEvento = (evento, url) => {
  const nomeEv = evento?.titulo || 'Evento Especial';

  let dataTexto = '';
  if (evento?.data_inicio) {
    try {
      const d = new Date(evento.data_inicio);
      dataTexto = d.toLocaleDateString('pt-BR');
      const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      if (hora && hora !== '00:00') dataTexto += ` às ${hora}`;
    } catch (_) {}
  }

  const dataInfo = dataTexto ? `\n📅 *Data:* ${dataTexto}` : '';
  const localTexto = evento?.local_nome ? `\n📍 *Local:* ${evento.local_nome}` : '';

  let valorInfo = '';
  if (evento?.valor_tipo === 'pago') {
    const valor = Number(evento.valor_padrao || evento.valor || 0);
    valorInfo = valor > 0 ? `\n🎟️ *Inscrição:* R$ ${valor.toFixed(2).replace('.', ',')}` : '\n🎟️ *Inscrição:* Evento Pago';
  } else if (evento?.valor_tipo === 'gratuito') {
    valorInfo = '\n🎟️ *Inscrição:* Gratuita';
  }

  return (
    `Olá! Paz do Senhor! ✨\n\n` +
    `Estão abertas as inscrições para o evento *${nomeEv}* da MIB Church! 🎉` +
    `${dataInfo}` +
    `${localTexto}` +
    `${valorInfo}\n\n` +
    `Para garantir a sua vaga e preencher a sua inscrição, acesse o link oficial abaixo:\n\n` +
    `${url}\n\n` +
    `Ficamos muito felizes com a sua participação! Esperamos por você! 🙏✨`
  );
};


