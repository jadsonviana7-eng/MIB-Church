import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { findInJsonGlobal, parseMoeda, extrairValorInscricao, extrairParcelasInscricao } from './eventoInscricaoUtils';
import { mascaraTelefone, mascaraCPF } from './mascaras';

/**
 * Modal elegante e completo para exportação customizada de inscritos em PDF (otimizado para A4), Excel (.xlsx) e CSV (.csv).
 * Permite selecionar colunas individuais, alternar cálculos com/sem taxa de transporte,
 * filtrar por status de pagamento e gerar relatórios impressos / salvos em folha A4 com margens perfeitas.
 */
export default function ModalExportarInscritos({
  aberto,
  onFechar,
  evento,
  inscritos = [],
  pessoas = [],
  obterZonaParticipante,
  formatoInicial = 'pdf',
  modoTransporteInicial = 'com_transporte'
}) {
  const [formato, setFormato] = useState(formatoInicial || 'pdf'); // 'pdf' | 'xlsx' | 'csv'
  const [orientacaoA4, setOrientacaoA4] = useState('auto'); // 'auto' | 'portrait' | 'landscape'
  const [filtroStatus, setFiltroStatus] = useState('todos'); // 'todos' | 'pago' | 'pendente' | 'transporte_sim' | 'transporte_nao'
  const [modoTransporte, setModoTransporte] = useState(modoTransporteInicial || 'com_transporte'); // 'ambos' | 'com_transporte' | 'sem_transporte'
  const [incluirLinhaTotais, setIncluirLinhaTotais] = useState(true);

  // Campos extras / personalizados dinamicamente extraídos dos formulários
  const camposPersonalizados = useMemo(() => {
    const campos = new Set();
    const chavesIgnoradas = new Set([
      'nome', 'completo', 'nome_completo', 'nome completo',
      'telefone', 'celular', 'whatsapp', 'contato',
      'email', 'e-mail',
      'cpf',
      'transporte', 'inclui transporte', 'opção de transporte', 'opcao_transporte',
      'valor_total', 'valor total', 'valor_total_numerico',
      'valor_base_lote', 'valor_transporte', 'valor_parcela',
      'forma de pagamento', 'forma_pagamento', 'pagamento', 'metodo', 'detalhes_pagamento',
      'parcelas', 'parcelas_pagas', 'zona', 'zona_moradia', 'zona de moradia'
    ]);

    inscritos.forEach(ins => {
      const dados = ins.dados_inscricao || {};
      Object.keys(dados).forEach(k => {
        const kNorm = k.toLowerCase().trim();
        if (!chavesIgnoradas.has(kNorm) && !kNorm.startsWith('parcelas_') && !kNorm.startsWith('valor_')) {
          campos.add(k);
        }
      });
    });

    return Array.from(campos);
  }, [inscritos]);

  // Definição das colunas padrão do sistema com pesos proporcionais para layout A4
  const colunasSistema = useMemo(() => [
    { id: 'data_inscricao', rotulo: 'Data Inscrição', categoria: 'pessoal', peso: 1.0, padrao: true },
    { id: 'nome', rotulo: 'Nome do Inscrito', categoria: 'pessoal', peso: 2.2, padrao: true },
    { id: 'tipo_pessoa', rotulo: 'Tipo (Membro/Visitante)', categoria: 'pessoal', peso: 1.1, padrao: true },
    { id: 'telefone', rotulo: 'Telefone / WhatsApp', categoria: 'pessoal', peso: 1.3, padrao: true },
    { id: 'email', rotulo: 'E-mail', categoria: 'pessoal', peso: 1.8, padrao: true },
    { id: 'cpf', rotulo: 'CPF', categoria: 'pessoal', peso: 1.2, padrao: false },
    { id: 'zona', rotulo: 'Zona de Moradia', categoria: 'pessoal', peso: 1.3, padrao: true },

    { id: 'transporte_opcao', rotulo: 'Transporte', categoria: 'transporte', peso: 1.1, padrao: true },
    { id: 'transporte_valor', rotulo: 'Valor Transp. (R$)', categoria: 'transporte', peso: 1.0, padrao: modoTransporte === 'ambos' },

    { id: 'status_pagamento', rotulo: 'Status PG', categoria: 'financeiro', peso: 0.9, padrao: true },
    { id: 'forma_pagamento', rotulo: 'Forma Pagamento', categoria: 'financeiro', peso: 1.2, padrao: true },
    { id: 'valor_base', rotulo: 'Valor Base (R$)', categoria: 'financeiro', peso: 1.0, padrao: modoTransporte !== 'com_transporte' },
    { id: 'valor_total', rotulo: 'Valor Total (R$)', categoria: 'financeiro', peso: 1.0, padrao: modoTransporte !== 'sem_transporte' },
    { id: 'parcelas', rotulo: 'Parcelas', categoria: 'financeiro', peso: 0.8, padrao: false },
    { id: 'parcelas_pagas', rotulo: 'Parc. Pagas', categoria: 'financeiro', peso: 0.8, padrao: false },
    { id: 'valor_pago', rotulo: 'Valor Pago (R$)', categoria: 'financeiro', peso: 1.0, padrao: true },
    { id: 'valor_pendente', rotulo: 'Saldo Devedor (R$)', categoria: 'financeiro', peso: 1.0, padrao: true }
  ], [modoTransporte]);

  // Estado das colunas selecionadas
  const [colunasSelecionadas, setColunasSelecionadas] = useState(() => {
    const iniciais = {};
    colunasSistema.forEach(c => { iniciais[c.id] = c.padrao; });
    return iniciais;
  });

  const [personalizadasSelecionadas, setPersonalizadasSelecionadas] = useState(() => {
    const iniciais = {};
    camposPersonalizados.forEach(cp => { iniciais[cp] = true; });
    return iniciais;
  });

  if (!aberto) return null;

  const toggleColuna = (id) => {
    setColunasSelecionadas(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePersonalizada = (campo) => {
    setPersonalizadasSelecionadas(prev => ({ ...prev, [campo]: !prev[campo] }));
  };

  const selecionarTodas = () => {
    const todasSist = {};
    colunasSistema.forEach(c => { todasSist[c.id] = true; });
    setColunasSelecionadas(todasSist);

    const todasPers = {};
    camposPersonalizados.forEach(c => { todasPers[c] = true; });
    setPersonalizadasSelecionadas(todasPers);
  };

  const desmarcarTodas = () => {
    const nenhumaSist = {};
    colunasSistema.forEach(c => { nenhumaSist[c.id] = false; });
    setColunasSelecionadas(nenhumaSist);

    const nenhumaPers = {};
    camposPersonalizados.forEach(c => { nenhumaPers[c] = false; });
    setPersonalizadasSelecionadas(nenhumaPers);
  };

  const restaurarPadrao = () => {
    const padraoSist = {};
    colunasSistema.forEach(c => { padraoSist[c.id] = c.padrao; });
    setColunasSelecionadas(padraoSist);

    const padraoPers = {};
    camposPersonalizados.forEach(c => { padraoPers[c] = true; });
    setPersonalizadasSelecionadas(padraoPers);
  };

  const obterTextoFiltro = (f) => {
    switch (f) {
      case 'pago': return 'Apenas Confirmados (Pagos)';
      case 'pendente': return 'Apenas Pendentes';
      case 'transporte_sim': return 'Apenas Com Transporte';
      case 'transporte_nao': return 'Apenas Sem Transporte';
      default: return 'Todos os Inscritos';
    }
  };

  // Filtragem dos inscritos de acordo com o status escolhido
  const inscritosFiltrados = inscritos.filter(ins => {
    if (filtroStatus === 'pago') return ins.status_pagamento === 'pago';
    if (filtroStatus === 'pendente') return ins.status_pagamento === 'pendente';
    if (filtroStatus === 'cancelado') return ins.status_pagamento === 'cancelado';
    if (filtroStatus === 'transporte_sim') {
      const dados = ins.dados_inscricao || {};
      return findInJsonGlobal(dados, 'transporte')?.toString().toLowerCase().startsWith('sim');
    }
    if (filtroStatus === 'transporte_nao') {
      const dados = ins.dados_inscricao || {};
      return !findInJsonGlobal(dados, 'transporte')?.toString().toLowerCase().startsWith('sim');
    }
    return true;
  });

  // Prepara os dados das colunas ativas e das linhas
  const prepararDados = () => {
    const colunasAtivas = [];

    colunasSistema.forEach(c => {
      if (modoTransporte === 'sem_transporte' && c.id === 'valor_total') return;
      if (modoTransporte === 'com_transporte' && c.id === 'valor_base') return;
      if (colunasSelecionadas[c.id]) {
        colunasAtivas.push({ id: c.id, rotulo: c.rotulo, peso: c.peso || 1.0, tipo: 'sistema' });
      }
    });

    camposPersonalizados.forEach(cp => {
      if (personalizadasSelecionadas[cp]) {
        colunasAtivas.push({ id: cp, rotulo: cp, peso: 1.3, tipo: 'personalizado' });
      }
    });

    let somaBase = 0;
    let somaTransporte = 0;
    let somaTotal = 0;
    let somaPago = 0;
    let somaPendente = 0;
    let confirmados = 0;
    let pendentes = 0;
    let cancelados = 0;

    const linhas = inscritosFiltrados.map(ins => {
      const dados = ins.dados_inscricao || {};
      const nome = findInJsonGlobal(dados, ['nome', 'nome completo', 'completo']) || 'Participante';
      const email = findInJsonGlobal(dados, 'email') || '';
      const rawPhone = findInJsonGlobal(dados, ['telefone', 'celular', 'whatsapp', 'contato']) || '';
      const rawCpf = findInJsonGlobal(dados, 'cpf') || '';

      const membro = pessoas.find(p =>
        (email && p.email?.toLowerCase().trim() === email.toLowerCase().trim()) ||
        (nome && p.nome?.toLowerCase().trim() === nome.toLowerCase().trim())
      );

      const incluiTransporte = findInJsonGlobal(dados, 'transporte')?.toString().toLowerCase().startsWith('sim');
      const valorInscricaoTotal = extrairValorInscricao(dados, evento);

      let valorTransporteItem = 0;
      if (dados.valor_transporte !== undefined && dados.valor_transporte !== null && dados.valor_transporte !== '') {
        valorTransporteItem = Number(dados.valor_transporte) || 0;
      } else if (incluiTransporte) {
        valorTransporteItem = Number(evento?.valor_transporte) || 0;
      }

      const valorBaseItem = Math.max(0, valorInscricaoTotal - valorTransporteItem);
      const totalParcelas = Number(findInJsonGlobal(dados, 'parcelas')) || 1;
      const pagas = dados.parcelas_pagas || [];

      let valorPagoItem = 0;
      let valorPendenteItem = 0;

      const valorReferencia = modoTransporte === 'sem_transporte'
        ? valorBaseItem
        : (modoTransporte === 'com_transporte' ? valorInscricaoTotal : valorInscricaoTotal);

      if (ins.status_pagamento === 'pago') {
        confirmados++;
        valorPagoItem = valorReferencia;
        valorPendenteItem = 0;
      } else if (ins.status_pagamento === 'cancelado') {
        cancelados++;
        valorPagoItem = 0;
        valorPendenteItem = 0;
      } else {
        pendentes++;
        const proporcao = totalParcelas > 0 ? (pagas.length / totalParcelas) : 0;
        valorPagoItem = Math.round(valorReferencia * proporcao * 100) / 100;
        valorPendenteItem = Math.max(0, Math.round((valorReferencia - valorPagoItem) * 100) / 100);
      }

      if (ins.status_pagamento !== 'cancelado') {
        somaBase += valorBaseItem;
        somaTransporte += valorTransporteItem;
        somaTotal += valorInscricaoTotal;
        somaPago += valorPagoItem;
        somaPendente += valorPendenteItem;
      }

      const linha = {};
      colunasAtivas.forEach(col => {
        switch (col.id) {
          case 'data_inscricao':
            linha[col.rotulo] = ins.created_at ? new Date(ins.created_at).toLocaleDateString('pt-BR') : '';
            break;
          case 'nome':
            linha[col.rotulo] = nome;
            break;
          case 'tipo_pessoa':
            linha[col.rotulo] = membro ? 'Membro' : 'Visitante';
            break;
          case 'telefone':
            linha[col.rotulo] = rawPhone ? mascaraTelefone(rawPhone) : '';
            break;
          case 'email':
            linha[col.rotulo] = email;
            break;
          case 'cpf':
            linha[col.rotulo] = rawCpf ? mascaraCPF(rawCpf) : '';
            break;
          case 'zona':
            linha[col.rotulo] = obterZonaParticipante ? obterZonaParticipante(ins) : 'Não informada';
            break;
          case 'transporte_opcao':
            linha[col.rotulo] = incluiTransporte ? 'Sim (Com Transp.)' : 'Não (Sem Transp.)';
            break;
          case 'transporte_valor':
            linha[col.rotulo] = valorTransporteItem;
            break;
          case 'status_pagamento':
            linha[col.rotulo] = ins.status_pagamento === 'pago' ? 'Pago' : (ins.status_pagamento === 'cancelado' ? 'Cancelado' : 'Pendente');
            break;
          case 'forma_pagamento':
            linha[col.rotulo] = findInJsonGlobal(dados, ['forma de pagamento', 'forma_pagamento', 'pagamento', 'metodo']) || 'Não especificada';
            break;
          case 'valor_base':
            linha[col.rotulo] = valorBaseItem;
            break;
          case 'valor_total':
            linha[col.rotulo] = valorInscricaoTotal;
            break;
          case 'parcelas':
            linha[col.rotulo] = totalParcelas;
            break;
          case 'parcelas_pagas':
            linha[col.rotulo] = pagas.length;
            break;
          case 'valor_pago':
            linha[col.rotulo] = valorPagoItem;
            break;
          case 'valor_pendente':
            linha[col.rotulo] = valorPendenteItem;
            break;
          default:
            linha[col.rotulo] = dados[col.id] !== undefined && dados[col.id] !== null ? String(dados[col.id]) : '';
            break;
        }
      });

      return linha;
    });

    return {
      colunasAtivas,
      linhas,
      totais: {
        somaBase,
        somaTransporte,
        somaTotal,
        somaPago,
        somaPendente,
        confirmados,
        pendentes,
        cancelados
      }
    };
  };

  // Determina orientação para folha A4
  const calcularIsLandscape = (totalColunas) => {
    if (orientacaoA4 === 'landscape') return true;
    if (orientacaoA4 === 'portrait') return false;
    return totalColunas > 5;
  };

  // 1. GERAÇÃO DO RELATÓRIO PDF / IMPRESSÃO FORMATADA OTIMIZADA PARA FOLHA A4
  const executarImpressaoPDF = () => {
    const { colunasAtivas, linhas, totais } = prepararDados();
    if (colunasAtivas.length === 0) {
      alert('Selecione pelo menos uma coluna para exportar.');
      return;
    }

    const isLandscape = calcularIsLandscape(colunasAtivas.length);
    const dataHoje = new Date().toLocaleDateString('pt-BR');
    const horaHoje = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const labelArrecadado = modoTransporte === 'sem_transporte'
      ? 'Arrecadado (Sem Transporte)'
      : (modoTransporte === 'com_transporte' ? 'Arrecadado (Com Transporte)' : 'Arrecadado Total');

    const valorArrecadado = modoTransporte === 'sem_transporte'
      ? totais.somaBase
      : (modoTransporte === 'com_transporte' ? totais.somaTotal : totais.somaTotal);

    // Cálculo proporcional de larguras de colunas em porcentagem para preencher 100% da folha A4
    const somaPesos = colunasAtivas.reduce((acc, c) => acc + (c.peso || 1.0), 0);
    const largurasCols = colunasAtivas.map(c => Math.round(((c.peso || 1.0) / somaPesos) * 100));

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>${evento?.titulo || 'Relatório de Inscritos'} - MIB Church</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Otimização de margens para papel tamanho A4 */
    @page {
      size: A4 ${isLandscape ? 'landscape' : 'portrait'};
      margin: 12mm 12mm 14mm 12mm;
    }

    html, body {
      background: #ffffff;
      color: #0f172a;
      font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 10px;
      line-height: 1.3;
      width: 100%;
      height: auto;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Container com largura segura para folha A4 */
    .sheet-a4 {
      width: 100%;
      max-width: ${isLandscape ? '273mm' : '186mm'};
      margin: 0 auto;
      padding: 10px 0;
    }

    @media screen {
      body {
        background: #f1f5f9;
        padding: 30px 15px;
      }
      .sheet-a4 {
        background: #ffffff;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border: 1px solid #e2e8f0;
      }
    }

    @media print {
      body {
        padding: 0 !important;
        margin: 0 !important;
      }
      .sheet-a4 {
        padding: 0 !important;
        margin: 0 !important;
        border: none !important;
        box-shadow: none !important;
      }
      .no-print {
        display: none !important;
      }
      tr {
        page-break-inside: avoid;
      }
      thead {
        display: table-header-group;
      }
      tfoot {
        display: table-footer-group;
      }
    }

    /* Botão flutuante para salvar PDF no navegador */
    .btn-print {
      position: fixed;
      top: 16px;
      right: 16px;
      padding: 10px 18px;
      background: #059669;
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 900;
      font-size: 12px;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .btn-print:hover {
      background: #047857;
      transform: scale(1.02);
    }

    /* Cabeçalho Oficial */
    .header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 10px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 12px;
    }
    .org {
      font-size: 9.5px;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 2px;
    }
    .title {
      font-size: 19px;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: -0.01em;
      line-height: 1.15;
    }
    .subtitle {
      font-size: 10.5px;
      color: #475569;
      margin-top: 3px;
      font-weight: 500;
    }
    .meta {
      text-align: right;
      font-size: 9.5px;
      color: #64748b;
      line-height: 1.4;
      white-space: nowrap;
    }
    .meta strong {
      color: #0f172a;
    }

    /* Faixa de Cards com Margens Alinhadas */
    .cards-row {
      display: flex;
      gap: 8px;
      width: 100%;
      margin-bottom: 14px;
    }
    .card {
      flex: 1;
      min-width: 0;
      border: 1.5px solid #e2e8f0;
      border-radius: 10px;
      padding: 8px 12px;
      background: #f8fafc;
    }
    .card-label {
      font-size: 8.5px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #64748b;
      margin-bottom: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-value {
      font-size: 17px;
      font-weight: 900;
      color: #0f172a;
      line-height: 1;
      white-space: nowrap;
    }
    .card-confirmados .card-value { color: #059669; }
    .card-pendentes .card-value { color: #d97706; }
    .card-arrecadado {
      background: #ecfdf5;
      border-color: #a7f3d0;
    }
    .card-arrecadado .card-label { color: #065f46; }
    .card-arrecadado .card-value { color: #047857; }
    .card-total .card-value { color: #2563eb; }

    /* Tabela Otimizada para o papel A4 */
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      margin-bottom: 14px;
    }
    th {
      background: #0f172a !important;
      color: #ffffff !important;
      font-weight: 800;
      text-align: left;
      padding: 7px 8px;
      font-size: 8.5px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    td {
      padding: 5.5px 8px;
      border-bottom: 1px solid #e2e8f0;
      color: #1e293b;
      font-size: 9px;
      word-wrap: break-word;
      overflow-wrap: break-word;
      vertical-align: middle;
    }
    tr:nth-child(even) td {
      background: #f8fafc;
    }
    
    .badge {
      display: inline-block;
      padding: 1.5px 5px;
      border-radius: 4px;
      font-size: 8px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .badge-pago { background: #dcfce7; color: #15803d; }
    .badge-pendente { background: #fef3c7; color: #b45309; }
    .badge-cancelado { background: #ffe4e6; color: #be123c; }

    /* Linha de Totais Gerais */
    .total-row td {
      background: #f1f5f9 !important;
      font-weight: 900;
      border-top: 2px solid #0f172a;
      border-bottom: 2px solid #0f172a;
      color: #0f172a;
      font-size: 9.5px;
    }

    /* Rodapé da Folha A4 */
    .footer {
      margin-top: 14px;
      padding-top: 8px;
      border-top: 1px solid #cbd5e1;
      display: flex;
      justify-content: space-between;
      font-size: 8.5px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <button class="no-print btn-print" onclick="window.print()">
    <span>🖨️ Salvar como PDF / Imprimir</span>
  </button>

  <div class="sheet-a4">
    <!-- Cabeçalho Institucional -->
    <div class="header">
      <div>
        <div class="org">MIB CHURCH • GESTÃO DE EVENTOS</div>
        <h1 class="title">${evento?.titulo || 'Relatório de Inscritos'}</h1>
        <p class="subtitle">
          ${evento?.subtitulo || 'Relatório Oficial de Participantes'}
          ${evento?.data_inicio ? ` • Data: ${new Date(evento.data_inicio).toLocaleDateString('pt-BR')}` : ''}
          ${evento?.local_nome ? ` • Local: ${evento.local_nome}` : ''}
        </p>
      </div>
      <div class="meta">
        <div>Extraído em: <strong>${dataHoje} às ${horaHoje}</strong></div>
        <div>Filtro: <strong>${obterTextoFiltro(filtroStatus)}</strong></div>
        <div>Cálculo Financeiro: <strong>${modoTransporte === 'sem_transporte' ? 'Sem Transporte' : (modoTransporte === 'com_transporte' ? 'Com Transporte' : 'Ambos (Separados)')}</strong></div>
      </div>
    </div>

    <!-- 4 Indicadores no Topo -->
    <div class="cards-row">
      <div class="card card-confirmados">
        <div class="card-label">Confirmados (Pagos)</div>
        <div class="card-value">${totais.confirmados}</div>
      </div>
      <div class="card card-pendentes">
        <div class="card-label">Pendentes</div>
        <div class="card-value">${totais.pendentes}</div>
      </div>
      <div class="card card-arrecadado">
        <div class="card-label">${labelArrecadado}</div>
        <div class="card-value">${valorArrecadado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
      </div>
      <div class="card card-total">
        <div class="card-label">Total de Inscritos</div>
        <div class="card-value">${inscritosFiltrados.length}</div>
      </div>
    </div>

    <!-- Tabela com Margens e Larguras Proporcionais -->
    <table>
      <thead>
        <tr>
          ${colunasAtivas.map((c, i) => `<th style="width: ${largurasCols[i]}%">${c.rotulo}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${linhas.map(linha => `
          <tr>
            ${colunasAtivas.map(c => {
              const v = linha[c.rotulo];
              if (c.id === 'status_pagamento') {
                const cls = v === 'Pago' ? 'badge-pago' : (v === 'Cancelado' ? 'badge-cancelado' : 'badge-pendente');
                return `<td><span class="badge ${cls}">${v}</span></td>`;
              }
              if (typeof v === 'number' && ['valor_base', 'transporte_valor', 'valor_total', 'valor_pago', 'valor_pendente'].includes(c.id)) {
                return `<td>${v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>`;
              }
              return `<td>${v !== undefined && v !== null ? v : ''}</td>`;
            }).join('')}
          </tr>
        `).join('')}
        ${incluirLinhaTotais ? `
          <tr class="total-row">
            ${colunasAtivas.map((c, idx) => {
              if (idx === 0) return `<td>TOTAL (${inscritosFiltrados.length})</td>`;
              if (c.id === 'valor_base') return `<td>${totais.somaBase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>`;
              if (c.id === 'transporte_valor') return `<td>${totais.somaTransporte.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>`;
              if (c.id === 'valor_total') return `<td>${totais.somaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>`;
              if (c.id === 'valor_pago') return `<td>${totais.somaPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>`;
              if (c.id === 'valor_pendente') return `<td>${totais.somaPendente.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>`;
              return `<td></td>`;
            }).join('')}
          </tr>
        ` : ''}
      </tbody>
    </table>

    <!-- Rodapé -->
    <div class="footer">
      <span>MIB Church • Gestão Eclesiástica Integrada • Otimizado para Folha A4 (${isLandscape ? 'Paisagem' : 'Retrato'})</span>
      <span>Documento gerado para controle e prestação de contas</span>
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

    const printWindow = window.open('', '_blank', 'width=1100,height=850');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
    } else {
      alert('Por favor, permita popups neste site para abrir o relatório de impressão / PDF.');
    }

    onFechar();
  };

  // 2. GERAÇÃO DE DOWNLOAD DIRETO EM ARQUIVO .PDF (jsPDF) OTIMIZADO PARA A4
  const executarDownloadDiretoPDF = () => {
    const { colunasAtivas, linhas, totais } = prepararDados();
    if (colunasAtivas.length === 0) {
      alert('Selecione pelo menos uma coluna para exportar.');
      return;
    }

    const isLandscape = calcularIsLandscape(colunasAtivas.length);
    const doc = new jsPDF({
      orientation: isLandscape ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = isLandscape ? 297 : 210;
    const pageHeight = isLandscape ? 210 : 297;
    const margin = 12; // Margem padrão A4 de 12mm
    let y = 16;

    // Cabeçalho Oficial
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 58, 138);
    doc.text('MIB CHURCH • GESTÃO DE EVENTOS', margin, y);
    y += 5.5;

    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    const titTrunc = (evento?.titulo || 'Relatório de Inscritos').slice(0, 55);
    doc.text(titTrunc, margin, y);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    const dataHoje = new Date().toLocaleDateString('pt-BR');
    doc.text(`Extraído em: ${dataHoje} | Filtro: ${obterTextoFiltro(filtroStatus)}`, pageWidth - margin, y, { align: 'right' });
    y += 7.5;

    // Faixa com Indicadores e Modo de Transporte
    const labelArrec = modoTransporte === 'sem_transporte' ? 'Sem Transp.' : (modoTransporte === 'com_transporte' ? 'Com Transp.' : 'Total');
    const valArrec = (modoTransporte === 'sem_transporte' ? totais.somaBase : totais.somaTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text(`Confirmados: ${totais.confirmados}  |  Pendentes: ${totais.pendentes}  |  Arrecadado (${labelArrec}): ${valArrec}  |  Total: ${inscritosFiltrados.length} inscritos`, margin, y);
    y += 6;

    // Tabela com largura proporcional baseada em pesos
    const usableWidth = pageWidth - (margin * 2);
    const somaPesos = colunasAtivas.reduce((acc, c) => acc + (c.peso || 1.0), 0);
    const colWidths = colunasAtivas.map(c => ((c.peso || 1.0) / somaPesos) * usableWidth);

    // Cabeçalho da tabela
    doc.setFillColor(15, 23, 42);
    doc.rect(margin, y, usableWidth, 7, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);

    let currentX = margin;
    colunasAtivas.forEach((col, idx) => {
      const w = colWidths[idx];
      const maxChars = Math.floor(w / 1.9);
      const rotuloTrunc = col.rotulo.slice(0, maxChars);
      doc.text(rotuloTrunc, currentX + 1.5, y + 4.8);
      currentX += w;
    });
    y += 7;

    // Linhas de dados
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7);
    linhas.forEach((linha, rowIdx) => {
      if (y > pageHeight - 16) {
        doc.addPage();
        y = 15;
      }

      if (rowIdx % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(margin, y, usableWidth, 6, 'F');
      }

      doc.setTextColor(30, 41, 59);
      let rowX = margin;
      colunasAtivas.forEach((col, idx) => {
        const w = colWidths[idx];
        let val = linha[col.rotulo];
        if (typeof val === 'number') {
          val = ['valor_base', 'transporte_valor', 'valor_total', 'valor_pago', 'valor_pendente'].includes(col.id)
            ? `R$ ${val.toFixed(2).replace('.', ',')}`
            : String(val);
        }
        const maxChars = Math.floor(w / 1.7);
        const valStr = String(val !== undefined && val !== null ? val : '').slice(0, maxChars);
        doc.text(valStr, rowX + 1.5, y + 4.2);
        rowX += w;
      });
      y += 6;
    });

    // Rodapé de Totais
    if (incluirLinhaTotais) {
      if (y > pageHeight - 16) {
        doc.addPage();
        y = 15;
      }
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, y, usableWidth, 6.5, 'F');
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);

      let totX = margin;
      colunasAtivas.forEach((col, idx) => {
        const w = colWidths[idx];
        if (idx === 0) {
          doc.text(`TOTAL (${inscritosFiltrados.length})`, totX + 1.5, y + 4.5);
        } else if (col.id === 'valor_base') {
          doc.text(`R$ ${totais.somaBase.toFixed(2).replace('.', ',')}`, totX + 1.5, y + 4.5);
        } else if (col.id === 'transporte_valor') {
          doc.text(`R$ ${totais.somaTransporte.toFixed(2).replace('.', ',')}`, totX + 1.5, y + 4.5);
        } else if (col.id === 'valor_total') {
          doc.text(`R$ ${totais.somaTotal.toFixed(2).replace('.', ',')}`, totX + 1.5, y + 4.5);
        } else if (col.id === 'valor_pago') {
          doc.text(`R$ ${totais.somaPago.toFixed(2).replace('.', ',')}`, totX + 1.5, y + 4.5);
        } else if (col.id === 'valor_pendente') {
          doc.text(`R$ ${totais.somaPendente.toFixed(2).replace('.', ',')}`, totX + 1.5, y + 4.5);
        }
        totX += w;
      });
      y += 6.5;
    }

    // Paginação no rodapé de todas as páginas
    const totalPaginas = doc.getNumberOfPages();
    for (let p = 1; p <= totalPaginas; p++) {
      doc.setPage(p);
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text(`MIB Church • Relatório Oficial (A4) • Página ${p} de ${totalPaginas}`, margin, pageHeight - 7);
    }

    const sanitizar = (str) => (str || 'evento').toLowerCase().replace(/[^a-z0-9]/g, '_');
    const sufixoTransporte = modoTransporte === 'sem_transporte' ? '_sem_transporte' : (modoTransporte === 'com_transporte' ? '_com_transporte' : '');
    const nomeArquivo = `inscritos_${sanitizar(evento?.titulo)}${sufixoTransporte}_${new Date().toISOString().slice(0, 10)}.pdf`;

    doc.save(nomeArquivo);
    onFechar();
  };

  // 3. GERAÇÃO DE PLANILHA EXCEL / CSV
  const executarPlanilha = () => {
    const { colunasAtivas, linhas, totais } = prepararDados();
    if (colunasAtivas.length === 0) {
      alert('Selecione pelo menos uma coluna para exportar.');
      return;
    }

    const dadosExportar = [...linhas];

    if (incluirLinhaTotais) {
      const linhaTotais = {};
      colunasAtivas.forEach((col, idx) => {
        if (idx === 0) {
          linhaTotais[col.rotulo] = `TOTAL GERAL (${inscritosFiltrados.length} inscritos)`;
        } else if (col.id === 'valor_base') {
          linhaTotais[col.rotulo] = Math.round(totais.somaBase * 100) / 100;
        } else if (col.id === 'transporte_valor') {
          linhaTotais[col.rotulo] = Math.round(totais.somaTransporte * 100) / 100;
        } else if (col.id === 'valor_total') {
          linhaTotais[col.rotulo] = Math.round(totais.somaTotal * 100) / 100;
        } else if (col.id === 'valor_pago') {
          linhaTotais[col.rotulo] = Math.round(totais.somaPago * 100) / 100;
        } else if (col.id === 'valor_pendente') {
          linhaTotais[col.rotulo] = Math.round(totais.somaPendente * 100) / 100;
        } else {
          linhaTotais[col.rotulo] = '';
        }
      });
      dadosExportar.push(linhaTotais);
    }

    const ws = XLSX.utils.json_to_sheet(dadosExportar);

    const colWidths = colunasAtivas.map(col => {
      let maxLen = col.rotulo.length;
      dadosExportar.forEach(row => {
        const val = row[col.rotulo];
        if (val !== undefined && val !== null) {
          const str = String(val);
          if (str.length > maxLen) maxLen = str.length;
        }
      });
      return { wch: Math.min(Math.max(maxLen + 3, 12), 45) };
    });
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    const nomeAba = (evento?.titulo || 'Inscritos').slice(0, 31).replace(/[\\/?*:[\]]/g, '');
    XLSX.utils.book_append_sheet(wb, ws, nomeAba || 'Inscritos');

    const sanitizar = (str) => (str || 'evento').toLowerCase().replace(/[^a-z0-9]/g, '_');
    const sufixoTransporte = modoTransporte === 'sem_transporte' ? '_sem_transporte' : (modoTransporte === 'com_transporte' ? '_com_transporte' : '');
    const nomeArquivo = `inscritos_${sanitizar(evento?.titulo)}${sufixoTransporte}_${new Date().toISOString().slice(0, 10)}.${formato}`;

    if (formato === 'csv') {
      XLSX.writeFile(wb, nomeArquivo, { bookType: 'csv' });
    } else {
      XLSX.writeFile(wb, nomeArquivo, { bookType: 'xlsx' });
    }

    onFechar();
  };

  const handleExportarPrincipal = () => {
    if (formato === 'pdf') {
      executarImpressaoPDF();
    } else {
      executarPlanilha();
    }
  };

  const totalColunasAtivas = colunasSistema.filter(c => colunasSelecionadas[c.id]).length +
    camposPersonalizados.filter(cp => personalizadasSelecionadas[cp]).length;

  return (
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onFechar}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Exportar / Imprimir A4
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                {inscritosFiltrados.length} selecionados de {inscritos.length}
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-850 dark:text-white tracking-tight">
              Exportar Lista de Inscritos
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-md">
              {evento?.titulo || 'Evento'}
            </p>
          </div>

          <button
            type="button"
            onClick={onFechar}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition cursor-pointer shrink-0"
            title="Fechar"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-750 dark:text-slate-200">

          {/* 1. SELEÇÃO DE FORMATO (PDF, EXCEL, CSV) */}
          <div>
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
              1. Formato de Exportação
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* PDF */}
              <button
                type="button"
                onClick={() => setFormato('pdf')}
                className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                  formato === 'pdf'
                    ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                  formato === 'pdf' ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}>
                  PDF
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-black truncate">PDF (Folha A4)</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Margens otimizadas</p>
                </div>
              </button>

              {/* XLSX */}
              <button
                type="button"
                onClick={() => setFormato('xlsx')}
                className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                  formato === 'xlsx'
                    ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                  formato === 'xlsx' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}>
                  XLSX
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-black truncate">Excel (.xlsx)</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Planilha formatada</p>
                </div>
              </button>

              {/* CSV */}
              <button
                type="button"
                onClick={() => setFormato('csv')}
                className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                  formato === 'csv'
                    ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                  formato === 'csv' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}>
                  CSV
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-black truncate">CSV (.csv)</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Formato universal</p>
                </div>
              </button>
            </div>

            {/* Configuração de Orientação do Papel A4 quando PDF selecionado */}
            {formato === 'pdf' && (
              <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  📄 Orientação da Folha A4:
                </span>
                <div className="inline-flex items-center gap-1 bg-white dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setOrientacaoA4('auto')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer ${orientacaoA4 === 'auto' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Auto ({totalColunasAtivas > 5 ? 'Paisagem' : 'Retrato'})
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrientacaoA4('portrait')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer ${orientacaoA4 === 'portrait' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Retrato (Vertical)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrientacaoA4('landscape')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer ${orientacaoA4 === 'landscape' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Paisagem (Horizontal)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. CÁLCULO E TOTAL ARRECADADO COM / SEM TRANSPORTE */}
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40">
            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <label className="text-[11px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                2. Total Arrecadado & Transporte
              </label>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">
                Taxa de transporte: {Number(evento?.valor_transporte || 0) > 0 ? `R$ ${Number(evento.valor_transporte).toFixed(2).replace('.', ',')}` : 'Não configurada'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setModoTransporte('com_transporte')}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  modoTransporte === 'com_transporte'
                    ? 'bg-amber-100/90 dark:bg-amber-900/40 border-amber-500 dark:border-amber-600 font-black text-amber-950 dark:text-amber-100 ring-1 ring-amber-500/20'
                    : 'bg-white dark:bg-slate-800 border-amber-200/60 dark:border-amber-900/30 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs">🚌</span>
                  <p className="text-xs font-black">Com Transporte</p>
                </div>
                <p className="text-[10px] opacity-80 leading-tight">Total somando taxa de transporte aos ingressos</p>
              </button>

              <button
                type="button"
                onClick={() => setModoTransporte('sem_transporte')}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  modoTransporte === 'sem_transporte'
                    ? 'bg-amber-100/90 dark:bg-amber-900/40 border-amber-500 dark:border-amber-600 font-black text-amber-950 dark:text-amber-100 ring-1 ring-amber-500/20'
                    : 'bg-white dark:bg-slate-800 border-amber-200/60 dark:border-amber-900/30 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs">🎟️</span>
                  <p className="text-xs font-black">Sem Transporte</p>
                </div>
                <p className="text-[10px] opacity-80 leading-tight">Total apenas do valor base dos ingressos</p>
              </button>

              <button
                type="button"
                onClick={() => setModoTransporte('ambos')}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  modoTransporte === 'ambos'
                    ? 'bg-amber-100/90 dark:bg-amber-900/40 border-amber-500 dark:border-amber-600 font-black text-amber-950 dark:text-amber-100 ring-1 ring-amber-500/20'
                    : 'bg-white dark:bg-slate-800 border-amber-200/60 dark:border-amber-900/30 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs">🔄</span>
                  <p className="text-xs font-black">Ambos (Separados)</p>
                </div>
                <p className="text-[10px] opacity-80 leading-tight">Colunas separadas: Base, Transp. e Total</p>
              </button>
            </div>

            <div className="mt-3 pt-2.5 border-t border-amber-200/50 dark:border-amber-900/30 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-amber-900 dark:text-amber-200 select-none">
                <input
                  type="checkbox"
                  checked={incluirLinhaTotais}
                  onChange={e => setIncluirLinhaTotais(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                />
                <span>Incluir linha de "TOTAL GERAL" somando valores no rodapé</span>
              </label>
            </div>
          </div>

          {/* 3. FILTRO DE INSCRIÇÕES */}
          <div>
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
              3. Filtrar Quem Exportar
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'todos', label: `Todos (${inscritos.length})` },
                { id: 'pago', label: 'Apenas Confirmados' },
                { id: 'pendente', label: 'Apenas Pendentes' },
                { id: 'transporte_sim', label: 'Com Transporte' },
                { id: 'transporte_nao', label: 'Sem Transporte' }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFiltroStatus(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    filtroStatus === f.id
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. ESCOLHA DAS COLUNAS */}
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                  4. Escolha das Colunas ({totalColunasAtivas} ativas)
                </label>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={selecionarTodas}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-bold cursor-pointer"
                >
                  Marcar Todas
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={desmarcarTodas}
                  className="text-slate-500 hover:underline font-bold cursor-pointer"
                >
                  Desmarcar
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={restaurarPadrao}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold cursor-pointer"
                >
                  Padrão
                </button>
              </div>
            </div>

            {/* Grid de Colunas */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/40 max-h-60 overflow-y-auto">
              
              {/* Categoria: Dados Pessoais & Localização */}
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">
                  👤 Dados Pessoais & Localização
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {colunasSistema.filter(c => c.categoria === 'pessoal').map(col => (
                    <label
                      key={col.id}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs font-bold transition cursor-pointer select-none ${
                        colunasSelecionadas[col.id]
                          ? 'bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-900 text-slate-800 dark:text-white shadow-xs'
                          : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!colunasSelecionadas[col.id]}
                        onChange={() => toggleColuna(col.id)}
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                      />
                      <span>{col.rotulo}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categoria: Transporte */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">
                  🚌 Transporte
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {colunasSistema.filter(c => c.categoria === 'transporte').map(col => (
                    <label
                      key={col.id}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs font-bold transition cursor-pointer select-none ${
                        colunasSelecionadas[col.id]
                          ? 'bg-white dark:bg-slate-800 border-amber-200 dark:border-amber-900 text-slate-800 dark:text-white shadow-xs'
                          : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!colunasSelecionadas[col.id]}
                        onChange={() => toggleColuna(col.id)}
                        className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                      />
                      <span>{col.rotulo}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categoria: Financeiro */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">
                  💰 Valores & Pagamento
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {colunasSistema.filter(c => c.categoria === 'financeiro').map(col => (
                    <label
                      key={col.id}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs font-bold transition cursor-pointer select-none ${
                        colunasSelecionadas[col.id]
                          ? 'bg-white dark:bg-slate-800 border-emerald-200 dark:border-emerald-900 text-slate-800 dark:text-white shadow-xs'
                          : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!colunasSelecionadas[col.id]}
                        onChange={() => toggleColuna(col.id)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <span>{col.rotulo}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categoria: Perguntas Personalizadas do Formulário */}
              {camposPersonalizados.length > 0 && (
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">
                    📋 Perguntas Personalizadas do Formulário
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {camposPersonalizados.map(campo => (
                      <label
                        key={campo}
                        className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs font-bold transition cursor-pointer select-none ${
                          personalizadasSelecionadas[campo]
                            ? 'bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-900 text-slate-800 dark:text-white shadow-xs'
                            : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!personalizadasSelecionadas[campo]}
                          onChange={() => togglePersonalizada(campo)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                        />
                        <span className="truncate" title={campo}>{campo}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Rodapé com Botões de Ação */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={onFechar}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            Cancelar
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            {formato === 'pdf' ? (
              <>
                <button
                  type="button"
                  onClick={executarDownloadDiretoPDF}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                  title="Baixa diretamente o arquivo .pdf no formato A4 com margens otimizadas"
                >
                  <span>📥 Baixar .PDF Direto</span>
                </button>
                <button
                  type="button"
                  onClick={executarImpressaoPDF}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-black shadow-md shadow-rose-700/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Abre visualização A4 para Salvar como PDF ou Imprimir"
                >
                  <span>🖨️ Salvar como PDF / Imprimir (A4)</span>
                </button>
              </>
            ) : formato === 'xlsx' ? (
              <button
                type="button"
                onClick={handleExportarPrincipal}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-md shadow-emerald-700/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>📥 Baixar Planilha (XLSX)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleExportarPrincipal}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black shadow-md shadow-blue-700/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>📥 Baixar Arquivo (CSV)</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
