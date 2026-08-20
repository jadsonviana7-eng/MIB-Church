export function normalizarTexto(texto) {
  if (typeof texto !== 'string') return '';
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export function extrairDataInfo(dataVal) {
  if (!dataVal) return null;
  const str = String(dataVal).trim();

  // 1. Formato YYYY-MM-DD ou YYYY/MM/DD (com ou sem horário)
  const matchISO = str.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (matchISO) {
    const ano = parseInt(matchISO[1], 10);
    const mes = parseInt(matchISO[2], 10) - 1;
    const dia = parseInt(matchISO[3], 10);
    if (!isNaN(ano) && !isNaN(mes) && !isNaN(dia) && mes >= 0 && mes <= 11) {
      return { ano, mes, dia };
    }
  }

  // 2. Formato BR DD/MM/YYYY ou DD-MM-YYYY
  const matchBR = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
  if (matchBR) {
    const dia = parseInt(matchBR[1], 10);
    const mes = parseInt(matchBR[2], 10) - 1;
    const ano = parseInt(matchBR[3], 10);
    if (!isNaN(ano) && !isNaN(mes) && !isNaN(dia) && mes >= 0 && mes <= 11) {
      return { ano, mes, dia };
    }
  }

  // 3. Formato BR curto DD/MM/YY
  const matchBRCurto = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{2})$/);
  if (matchBRCurto) {
    const dia = parseInt(matchBRCurto[1], 10);
    const mes = parseInt(matchBRCurto[2], 10) - 1;
    let ano = parseInt(matchBRCurto[3], 10);
    ano += ano < 50 ? 2000 : 1900;
    if (!isNaN(ano) && !isNaN(mes) && !isNaN(dia) && mes >= 0 && mes <= 11) {
      return { ano, mes, dia };
    }
  }

  // 4. Fallback genérico JS Date
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    return { ano: d.getFullYear(), mes: d.getMonth(), dia: d.getDate() };
  }
  return null;
}

export function extrairValorNumerico(val) {
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  if (!val) return 0;
  let str = String(val).trim();
  str = str.replace(/[R$\s]/g, '');
  if (str.includes('.') && str.includes(',')) {
    str = str.replace(/\./g, '').replace(',', '.');
  } else if (str.includes(',')) {
    str = str.replace(',', '.');
  }
  const n = parseFloat(str);
  return isNaN(n) ? 0 : n;
}

export function classificarTransacao(t) {
  if (!t) return { tipo: 'receita', valor: 0, infoData: null, status: 'pago', isCancelado: false };

  const infoData = extrairDataInfo(t.data || t.created_at || t.data_transacao || t.data_vencimento || t.data_pagamento);
  let valor = extrairValorNumerico(t.valor);

  let tipo = 'receita';
  const tipoStr = String(t.tipo || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  if (tipoStr.includes('despesa') || tipoStr.includes('saida') || tipoStr.includes('pagamento') || tipoStr.includes('debito')) {
    tipo = 'despesa';
  } else if (tipoStr.includes('receita') || tipoStr.includes('dizimo') || tipoStr.includes('oferta') || tipoStr.includes('entrada') || tipoStr.includes('doacao') || tipoStr.includes('credito')) {
    tipo = 'receita';
  } else if (valor < 0) {
    tipo = 'despesa';
    valor = Math.abs(valor);
  }

  const statusStr = String(t.status || '').toLowerCase().trim();
  const isCancelado = statusStr === 'cancelado' || statusStr === 'excluido' || statusStr === 'inativo';

  return {
    tipo,
    valor,
    infoData,
    status: statusStr,
    isCancelado
  };
}

export const faixasEtarias = [
  { id: 'criancas', nome: 'Crianças (0-11)', curto: 'Crianças' },
  { id: 'adolescentes', nome: 'Adolescentes (12-17)', curto: 'Adolescentes' },
  { id: 'jovens', nome: 'Jovens (18-29)', curto: 'Jovens' },
  { id: 'adultos', nome: 'Adultos (30-59)', curto: 'Adultos' },
  { id: 'idosos', nome: 'Idosos (60+)', curto: 'Idosos' },
];

export function calcularIdade(dataNascimento) {
  if (!dataNascimento) return null;
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

export function faixaDaIdade(dataNascimento) {
  const idade = calcularIdade(dataNascimento);
  if (idade === null) return null;

  if (idade >= 0 && idade <= 11) return 'criancas';
  if (idade >= 12 && idade <= 17) return 'adolescentes';
  if (idade >= 18 && idade <= 29) return 'jovens';
  if (idade >= 30 && idade <= 59) return 'adultos';
  if (idade >= 60) return 'idosos';
  return null;
}

export function agrupamentoPor(lista, chaveFn) {
  return lista.reduce((acc, item) => {
    const chave = chaveFn(item);
    acc[chave] = (acc[chave] || 0) + 1;
    return acc;
  }, {});
}

export function nomeZona(zonas, zonaId) {
  return zonas.find((z) => String(z.id) === String(zonaId))?.nome || 'Não informada';
}

export function nomePessoa(pessoas, pessoaId) {
  return pessoas.find((p) => String(p.id) === String(pessoaId))?.nome || 'Não informado';
}

export function valorOfertaRelatorio(relatorio) {
  return Number(relatorio.oferta || 0);
}

export function statusBatismo(pessoa) {
  if (pessoa.batizado_aguas) return 'Batizado';
  if (pessoa.data_conversao) return 'Convertido';
  return 'Não convertido';
}

export function valorCampoRelatorio(pessoa, campo, zonas = []) {
  switch (campo) {
    case 'Cargos':
      return pessoa.cargo || 'Membro';
    case 'Faixa etaria':
      return faixasEtarias.find((f) => f.id === faixaDaIdade(pessoa.data_nascimento))?.curto || 'Não informada';
    case 'Aniversarios':
      return pessoa.data_nascimento ? meses[new Date(`${pessoa.data_nascimento}T00:00:00`).getMonth()] : 'Não informada';
    case 'Sexo':
      return pessoa.genero || 'Não informado';
    case 'Estado civil':
      return pessoa.estado_civil || 'Não informado';
    case 'Batismo':
      return statusBatismo(pessoa);
    case 'Data de conversao':
      return pessoa.data_conversao ? new Date(`${pessoa.data_conversao}T00:00:00`).getFullYear().toString() : 'Não convertido';
    case 'Bairro':
      return pessoa.bairro || 'Não informado';
    case 'Campo de Atuacao':
      return pessoa.atuacao || 'Não informado';
    case 'Permissoes':
      return pessoa.permissao || pessoa.cargo || 'Membro';
    case 'Zona de moradia':
      return nomeZona(zonas, pessoa.zona_id);
    default:
      return 'Outro';
  }
}