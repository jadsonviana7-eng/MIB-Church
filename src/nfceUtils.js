import { supabase } from './supabaseClient';

/**
 * Mapeamento dos códigos de UF do IBGE
 */
const UF_IBGE = {
  '11': 'RO', '12': 'AC', '13': 'AM', '14': 'RR', '15': 'PA', '16': 'AP', '17': 'TO',
  '21': 'MA', '22': 'PI', '23': 'CE', '24': 'RN', '25': 'PB', '26': 'PE', '27': 'AL',
  '28': 'SE', '29': 'BA', '31': 'MG', '32': 'ES', '33': 'RJ', '35': 'SP', '41': 'PR',
  '42': 'SC', '43': 'RS', '50': 'MS', '51': 'MT', '52': 'GO', '53': 'DF'
};

/**
 * Extrai a chave de acesso de 44 dígitos a partir de uma URL de QR Code ou texto puro
 */
export function extrairChaveAcesso(textoOuUrl) {
  if (!textoOuUrl) return null;
  const texto = String(textoOuUrl).trim();

  // Caso seja URL contendo o parâmetro 'p=' (ex: https://.../consulta?p=2626...|3|1)
  const matchParamP = texto.match(/[?&]p=([0-9]{44})/i);
  if (matchParamP && matchParamP[1]) {
    return matchParamP[1];
  }

  // Caso o texto contenha uma sequência direta de 44 dígitos
  const match44 = texto.match(/(\d{44})/);
  if (match44 && match44[1]) {
    return match44[1];
  }

  return null;
}

/**
 * Formata CNPJ para exibição amigável (ex: 00.000.000/0000-00)
 */
export function formatarCNPJ(cnpj) {
  const c = String(cnpj || '').replace(/\D/g, '');
  if (c.length !== 14) return cnpj;
  return c.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

/**
 * Extrai dados estruturados a partir da Chave de Acesso de 44 dígitos
 */
export function extrairDadosChaveAcesso(chaveOuUrl) {
  const chave = extrairChaveAcesso(chaveOuUrl);
  if (!chave || chave.length !== 44) return null;

  const codUf = chave.slice(0, 2);
  const uf = UF_IBGE[codUf] || 'PE';
  const ano = '20' + chave.slice(2, 4);
  const mes = chave.slice(4, 6);
  const cnpj = chave.slice(6, 20);
  const modelo = chave.slice(20, 22);
  const serie = parseInt(chave.slice(22, 25), 10);
  const numeroNota = parseInt(chave.slice(25, 34), 10);

  const tipoDocumento = modelo === '65' ? 'NFC-e' : modelo === '55' ? 'NF-e' : 'Nota Fiscal';
  const cnpjFmt = formatarCNPJ(cnpj);
  const dataEstimada = `${ano}-${mes}-01`;

  const textoAnotacoes = `🧾 CHAVE DE ACESSO IMPORTADA\n` +
    `Documento: ${tipoDocumento} nº ${numeroNota} (Série ${serie})\n` +
    `Emitente (CNPJ): ${cnpjFmt}\n` +
    `Estado (UF): ${uf}\n` +
    `Emissão: ${mes}/${ano}\n` +
    `Chave: ${chave}\n` +
    `Link SEFAZ: https://nfce.sefaz.pe.gov.br/nfce/consulta?p=${chave}|3|1`;

  return {
    chaveAcesso: chave,
    data: dataEstimada,
    numeroNota: String(numeroNota),
    serie: String(serie),
    fornecedor: {
      razaoSocial: `Fornecedor CNPJ ${cnpjFmt}`,
      nomeFantasia: '',
      cnpj,
      cidade: '',
      uf,
      nomeExibicao: `Fornecedor (${cnpjFmt})`
    },
    descricaoSugerida: `Compra ${tipoDocumento} ${numeroNota} - CNPJ ${cnpjFmt}`,
    valorTotal: 0,
    quantidadeItens: 1,
    itens: [],
    textoAnotacoes,
    categoriaSugerida: null,
    modoParcial: true
  };
}

/**
 * Analisa e extrai todas as informações estruturadas de uma string XML de NF-e / NFC-e
 */
export function parseNFeXML(xmlString) {
  if (!xmlString) throw new Error('Conteúdo XML vazio.');

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  // Verifica erros de parsing no XML
  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    throw new Error('Formato XML inválido ou corrompido.');
  }

  // Tags principais
  const infNFe = xmlDoc.querySelector('infNFe');
  if (!infNFe) {
    throw new Error('Estrutura da Nota Fiscal (infNFe) não encontrada no documento.');
  }

  // Chave de acesso
  let chaveAcesso = infNFe.getAttribute('Id') || '';
  chaveAcesso = chaveAcesso.replace(/^NFe/i, '');
  if (!chaveAcesso) {
    const chNFeTag = xmlDoc.querySelector('chNFe');
    if (chNFeTag) chaveAcesso = chNFeTag.textContent.trim();
  }

  // Dados da Emissão e Identificação
  const ide = xmlDoc.querySelector('ide');
  const dhEmi = ide?.querySelector('dhEmi')?.textContent?.trim() || ide?.querySelector('dEmi')?.textContent?.trim() || '';
  const dataFormatada = dhEmi ? dhEmi.split('T')[0] : new Date().toISOString().split('T')[0];
  const nNF = ide?.querySelector('nNF')?.textContent?.trim() || '';
  const serie = ide?.querySelector('serie')?.textContent?.trim() || '';
  const natOp = ide?.querySelector('natOp')?.textContent?.trim() || '';

  // Dados do Emitente (Fornecedor)
  const emit = xmlDoc.querySelector('emit');
  const xNome = emit?.querySelector('xNome')?.textContent?.trim() || '';
  const xFant = emit?.querySelector('xFant')?.textContent?.trim() || '';
  const cnpj = emit?.querySelector('CNPJ')?.textContent?.trim() || '';
  const xMun = emit?.querySelector('enderEmit > xMun')?.textContent?.trim() || '';
  const uf = emit?.querySelector('enderEmit > UF')?.textContent?.trim() || '';

  const fornecedorNome = xFant || xNome || 'Fornecedor';
  const fornecedorCompleto = `${fornecedorNome}${xMun ? ` (${xMun}/${uf})` : ''}`;

  // Totais da Nota
  const total = xmlDoc.querySelector('total');
  const vNFStr = total?.querySelector('vNF')?.textContent?.trim() || 
                 total?.querySelector('vNFTot')?.textContent?.trim() || 
                 xmlDoc.querySelector('vNFTot')?.textContent?.trim() || '0';
  const valorTotal = parseFloat(vNFStr) || 0;

  // Itens / Produtos
  const detElements = xmlDoc.querySelectorAll('det');
  const itens = [];
  let totalQuantidadeItens = 0;

  detElements.forEach((det, idx) => {
    const prod = det.querySelector('prod');
    if (!prod) return;

    const nItem = det.getAttribute('nItem') || String(idx + 1);
    const cProd = prod.querySelector('cProd')?.textContent?.trim() || '';
    const xProd = prod.querySelector('xProd')?.textContent?.trim() || `Item ${nItem}`;
    const qComStr = prod.querySelector('qCom')?.textContent?.trim() || '1';
    const vUnComStr = prod.querySelector('vUnCom')?.textContent?.trim() || '0';
    const vProdStr = prod.querySelector('vProd')?.textContent?.trim() || 
                     det.querySelector('vItem')?.textContent?.trim() || '0';
    const uCom = prod.querySelector('uCom')?.textContent?.trim() || 'un';

    const quantidade = parseFloat(qComStr) || 1;
    const valorUnitario = parseFloat(vUnComStr) || 0;
    const valorItem = parseFloat(vProdStr) || (quantidade * valorUnitario);

    totalQuantidadeItens += quantidade;

    itens.push({
      nItem,
      cProd,
      descricao: xProd,
      quantidade,
      unidade: uCom,
      valorUnitario,
      valorTotal: valorItem
    });
  });

  // Gera texto formatado para anotações
  let textoAnotacoes = `🧾 NOTA FISCAL IMPORTADA\n`;
  textoAnotacoes += `Estabelecimento: ${xNome} ${xFant ? `(${xFant})` : ''}\n`;
  if (cnpj) textoAnotacoes += `CNPJ: ${formatarCNPJ(cnpj)}\n`;
  if (nNF) textoAnotacoes += `Nº Nota: ${nNF} (Série ${serie || '1'})\n`;
  if (chaveAcesso) textoAnotacoes += `Chave: ${chaveAcesso}\n`;
  textoAnotacoes += `\n📦 ITENS COMPRADOS (${itens.length} itens):\n`;

  itens.forEach(item => {
    const vUnFmt = item.valorUnitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const vTotFmt = item.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    textoAnotacoes += `• ${item.quantidade} ${item.unidade} × ${item.descricao} (${vUnFmt}) = ${vTotFmt}\n`;
  });

  // Sugestão de categoria com base nos produtos
  let categoriaSugerida = null;
  const textoTodosProdutos = itens.map(i => i.descricao.toLowerCase()).join(' ');
  if (textoTodosProdutos.includes('limp') || textoTodosProdutos.includes('deterg') || textoTodosProdutos.includes('desinf') || textoTodosProdutos.includes('sabao') || textoTodosProdutos.includes('agua sanit') || textoTodosProdutos.includes('pano')) {
    categoriaSugerida = 'limpeza';
  } else if (textoTodosProdutos.includes('copo') || textoTodosProdutos.includes('cafe') || textoTodosProdutos.includes('acucar') || textoTodosProdutos.includes('suco') || textoTodosProdutos.includes('agua') || textoTodosProdutos.includes('biscoito')) {
    categoriaSugerida = 'consumo';
  }

  return {
    chaveAcesso,
    data: dataFormatada,
    numeroNota: nNF,
    serie,
    naturezaOperacao: natOp,
    fornecedor: {
      razaoSocial: xNome,
      nomeFantasia: xFant,
      cnpj,
      cidade: xMun,
      uf,
      nomeExibicao: fornecedorCompleto
    },
    descricaoSugerida: `${fornecedorNome} - NF ${nNF || chaveAcesso.slice(-8)}`,
    valorTotal,
    quantidadeItens: totalQuantidadeItens,
    itens,
    textoAnotacoes,
    categoriaSugerida,
    modoParcial: false
  };
}

/**
 * Consulta a NFC-e via Edge Function do Supabase ou realiza extração inteligente da Chave de Acesso
 */
export async function consultarNFCe(urlOuChave) {
  if (!urlOuChave) throw new Error('Informe o link ou a chave de acesso da nota.');

  let urlConsulta = String(urlOuChave).trim();
  const chave = extrairChaveAcesso(urlConsulta);

  try {
    urlConsulta = decodeURIComponent(urlConsulta);
  } catch {
    // ignore
  }

  if (!urlConsulta.startsWith('http://') && !urlConsulta.startsWith('https://')) {
    if (chave) {
      urlConsulta = `https://nfce.sefaz.pe.gov.br/nfce/consulta?p=${chave}|3|1`;
    } else {
      throw new Error('Chave de acesso de 44 dígitos ou URL inválida.');
    }
  }

  // 1. Tenta consulta direta via Edge Function do Supabase
  try {
    const { data: resFunc, error: errFunc } = await supabase.functions.invoke('consultar-nfce', {
      body: { url: urlConsulta, chave }
    });

    if (!errFunc && resFunc?.xml) {
      return parseNFeXML(resFunc.xml);
    }
  } catch (err) {
    console.warn('Edge Function consultar-nfce indisponível:', err);
  }

  // 2. Se a SEFAZ bloquear conexões externas, faz extração estruturada dos 44 dígitos da Chave de Acesso
  if (chave && chave.length === 44) {
    const dadosChave = extrairDadosChaveAcesso(chave);
    if (dadosChave) {
      return dadosChave;
    }
  }

  throw new Error(
    'Não foi possível consultar a SEFAZ automaticamente neste momento. ' +
    'Você pode fazer upload direto do arquivo .XML da nota na aba "Arquivo XML".'
  );
}
