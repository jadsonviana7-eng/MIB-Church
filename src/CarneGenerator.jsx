import React, { useState, useMemo, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';
import { supabase } from './supabaseClient';
import { mascaraCPF, mascaraTelefone, mascaraCEP } from './mascaras';
import './CarneGenerator.css';

// ============================================================
// Util: formatação de data e moeda
// ============================================================
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

function formatCurrency(value) {
  const n = Number(value) || 0;
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Soma N meses a uma data (equivalente ao DateAdd("M", 1, data) do VBA)
function addMonths(date, months) {
  const d = new Date(date);
  const day = d.getUTCDate();
  d.setUTCMonth(d.getUTCMonth() + months);
  // corrige overflow de dia (ex: 31/jan + 1 mês -> 28/fev em vez de 03/mar)
  if (d.getUTCDate() !== day) {
    d.setUTCDate(0);
  }
  return d;
}

// ============================================================
// Lógica central: gera o array de parcelas
// Replica a sub "JogaInformaçõesNoCarne" da macro VBA original:
// para cada parcela, calcula vencimento (mês a mês) e o texto
// "DivStatus/Div" (ex: "1/4", "2/4", ...).
// ============================================================
function gerarParcelas({ vencimentoInicial, quantidadeParcelas, valorParcela, descontos, acrescimos }) {
  const parcelas = [];
  let vencimento = vencimentoInicial ? new Date(vencimentoInicial + 'T00:00:00Z') : null;

  for (let i = 1; i <= quantidadeParcelas; i++) {
    const desconto = Number(descontos) || 0;
    const acrescimo = Number(acrescimos) || 0;
    const valorDocumento = Number(valorParcela) || 0;
    const valorPago = valorDocumento - desconto + acrescimo;

    parcelas.push({
      numero: i,
      total: quantidadeParcelas,
      vencimento: vencimento ? new Date(vencimento) : null,
      valorDocumento,
      descontos: desconto,
      acrescimos: acrescimo,
      valorPago,
      parcelaLabel: `${i}/${quantidadeParcelas}`,
    });

    if (vencimento) {
      vencimento = addMonths(vencimento, 1);
    }
  }

  return parcelas;
}

// ============================================================
// Componente: um único cupom do carnê (lado a lado, igual ao
// boleto original com duas colunas idênticas B.. e AB..)
// ============================================================
function CupomCarne({ dadosCedente, dadosCliente, dadosVenda, parcela }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-gray-800 text-[11px] sm:text-[10px] leading-tight font-mono bg-white text-black print:grid-cols-2 print:text-[8px] print:leading-[1.15]">
      {[0, 1].map((lado) => (
        <div
          key={lado}
          className={`p-2 print:p-1.5 flex flex-col gap-1 print:gap-0.5 ${lado === 0 ? 'sm:border-r border-dashed border-gray-400 border-b sm:border-b-0 print:border-b-0' : ''}`}
        >
          {/* Cabeçalho */}
          {lado === 0 && (
            <div className="text-center mb-1 print:mb-0.5">
              <p className="font-bold text-xs uppercase">{dadosCedente.nome}</p>
              <p className="text-[9px]">
                {dadosCedente.endereco} {dadosCedente.bairro} {dadosCedente.cidade} {dadosCedente.estado}{' '}
                {dadosCedente.cep} {dadosCedente.numeroRua} {dadosCedente.complemento}
              </p>
              <p className="text-[9px]">
                {dadosCedente.telefoneFixo && `Tel: ${dadosCedente.telefoneFixo} `}
                {dadosCedente.telefoneCelular && `Cel: ${dadosCedente.telefoneCelular} `}
                {dadosCedente.email && `E-mail: ${dadosCedente.email}`}
              </p>
            </div>
          )}

          {/* Vencimento e local de pagamento */}
          <div className="grid grid-cols-2 gap-2 print:gap-1 border-t border-gray-300 print:border-gray-400 pt-1 print:pt-0.5">
            <div>
              <p className="font-semibold">Vencimento</p>
              <p>{formatDate(parcela.vencimento)}</p>
            </div>
            {lado === 0 && (
              <div>
                <p className="font-semibold">Local de Pagamento</p>
                <p>{dadosCedente.localPagamento}</p>
              </div>
            )}
          </div>

          {/* Valor do documento */}
          <div className="grid grid-cols-2 gap-2 print:gap-1">
            <div>
              <p className="font-semibold">(=) Valor do Documento</p>
              <p>R$ {formatCurrency(parcela.valorDocumento)}</p>
            </div>
            {lado === 0 && (
              <div>
                <p className="font-semibold">Nome do Cedente</p>
                <p>{dadosCedente.nome}</p>
              </div>
            )}
          </div>

          {/* Nº Parcela */}
          <div className="grid grid-cols-2 gap-2 print:gap-1">
            <div>
              <p className="font-semibold">Nº Parcela/Total Parc.</p>
              <p>{parcela.parcelaLabel}</p>
            </div>
            {lado === 0 && (
              <div>
                <p className="font-semibold">Endereço do Cedente</p>
                <p>
                  {dadosCedente.endereco} {dadosCedente.bairro} {dadosCedente.cidade} {dadosCedente.estado}{' '}
                  {dadosCedente.cep} {dadosCedente.numeroRua}
                </p>
              </div>
            )}
          </div>

          {/* Descontos */}
          <div className="grid grid-cols-2 gap-2 print:gap-1">
            <div>
              <p className="font-semibold">(-) Descontos</p>
              <p>{parcela.descontos ? `R$ ${formatCurrency(parcela.descontos)}` : ''}</p>
            </div>
          </div>

          {/* Acréscimos / Instruções */}
          <div className="grid grid-cols-2 gap-2 print:gap-1">
            <div>
              <p className="font-semibold">(+) Acréscimos</p>
              <p>{parcela.acrescimos ? `R$ ${formatCurrency(parcela.acrescimos)}` : ''}</p>
            </div>
            {lado === 0 && (
              <div>
                <p className="font-semibold">Instruções</p>
                <p>{dadosVenda.instrucoes}</p>
              </div>
            )}
          </div>

          {/* Valor pago */}
          <div className="grid grid-cols-2 gap-2 print:gap-1 border-t border-gray-300 print:border-gray-400 pt-1 print:pt-0.5">
            <div>
              <p className="font-semibold">(=) Valor Pago</p>
              <p>R$ {formatCurrency(parcela.valorPago)}</p>
            </div>
          </div>

          {/* Visto / data de pagamento / QR Code */}
          <div className="grid grid-cols-2 gap-2 print:gap-1 mt-2 print:mt-0.5 items-center">
            <div>
              <p className="font-semibold">Visto do Operador</p>
              <div className="h-6 print:h-3 border-b border-gray-400 mt-1 print:mt-0.5" />
              <p className="font-semibold mt-1 print:mt-0.5">Pago em</p>
              <p>_____ / _____ / __________</p>
            </div>
            {parcela.qrCodeDataUrl && (
              <div className="flex flex-col items-center justify-self-end text-center">
                <img
                  src={parcela.qrCodeDataUrl}
                  alt={`QR Code parcela ${parcela.parcelaLabel}`}
                  className="w-16 h-16 sm:w-14 sm:h-14 print:w-10 print:h-10"
                />
                <p className="text-[8px] print:text-[6px] text-gray-500 mt-0.5">Escaneie para dar baixa</p>
              </div>
            )}
          </div>

          {/* Título / Pedido / Sacado */}
          <div className="border-t border-gray-300 print:border-gray-400 pt-1 print:pt-0.5 mt-1 print:mt-0.5 space-y-0.5 print:space-y-0">
            <p>
              <span className="font-semibold">Título:</span> {dadosVenda.titulo}
              <span className="font-semibold ml-3">Pedido:</span> {dadosVenda.numeroVenda}
              <span className="font-semibold ml-3">Sacado:</span> {dadosCliente.nome}
              <span className="font-semibold ml-3">CPF:</span> {dadosCliente.cpfCnpj}
              {lado === 0 && (
                <>
                  <span className="font-semibold ml-3">Dt emissão:</span> {formatDate(dadosVenda.dataEmissao)}
                </>
              )}
            </p>
            <p>
              <span className="font-semibold">Endereço:</span> {dadosCliente.endereco} {dadosCliente.bairro}{' '}
              {dadosCliente.cidade} {dadosCliente.estado} {dadosCliente.cep}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Componente principal
// ============================================================
export default function CarneGenerator({ pessoaIdInicial = null, inscricaoIdInicial = null }) {
  const [dadosCliente, setDadosCliente] = useState({
    nome: '',
    cpfCnpj: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    numeroRua: '',
    complemento: '',
  });

  const [dadosCedente, setDadosCedente] = useState({
    nome: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    numeroRua: '',
    complemento: '',
    telefoneFixo: '',
    telefoneCelular: '',
    email: '',
    localPagamento: '',
  });

  const [dadosVenda, setDadosVenda] = useState({
    numeroVenda: 1,
    titulo: 1,
    valorParcela: 70,
    dataEmissao: new Date().toISOString().slice(0, 10),
    vencimentoPrimeiraParcela: '',
    quantidadeParcelas: 4,
    descontos: 0,
    acrescimos: 0,
    instrucoes: '',
  });

  const [erro, setErro] = useState('');
  const [salvandoPadrao, setSalvandoPadrao] = useState(false);

  const handleSalvarComoPadrao = async () => {
    setSalvandoPadrao(true);
    try {
      const { error } = await supabase.from('dados_igreja').update({
        nome_igreja: dadosCedente.nome,
        endereco: dadosCedente.endereco,
        numero: dadosCedente.numeroRua,
        bairro: dadosCedente.bairro,
        cidade: dadosCedente.cidade,
        estado: dadosCedente.estado,
        cep: dadosCedente.cep,
        telefone: dadosCedente.telefoneCelular,
        email_contato: dadosCedente.email,
        carne_instrucoes: dadosVenda.instrucoes,
        carne_local_pagamento: dadosCedente.localPagamento
      }).eq('id', 1);
      if (error) throw error;
      window.alert('Configurações do Cedente e Instruções salvas como padrão!');
    } catch (err) {
      alert('Erro ao salvar padrões: ' + err.message);
    } finally {
      setSalvandoPadrao(false);
    }
  };

  // ── Busca de membros (Supabase) ──────────────────────────
  const [pessoaSelecionadaId, setPessoaSelecionadaId] = useState(pessoaIdInicial);
  const [buscaMembro, setBuscaMembro] = useState('');
  const [resultadosBusca, setResultadosBusca] = useState([]);
  const [carregandoMembro, setCarregandoMembro] = useState(false);
  const [membroSelecionado, setMembroSelecionado] = useState(null);

  // Carrega configurações automáticas do Emissor (Cedente)
  useEffect(() => {
    async function carregarConfiguracoesPadrao() {
      const { data, error } = await supabase.from('dados_igreja').select('*').eq('id', 1).single();
      if (!error && data) {
        setDadosCedente({
          nome: (data.nome_igreja || '').toUpperCase(),
          endereco: (data.endereco || '').toUpperCase(),
          numeroRua: data.numero || '',
          bairro: (data.bairro || '').toUpperCase(),
          cidade: (data.cidade || '').toUpperCase(),
          estado: (data.estado || '').toUpperCase(),
          cep: data.cep || '',
          email: data.email_contato || '',
          telefoneCelular: data.telefone || '',
          localPagamento: data.carne_local_pagamento || 'PAGÁVEL NA SECRETARIA DA IGREJA'
        });
        
        setDadosVenda(prev => ({
          ...prev,
          instrucoes: data.carne_instrucoes || ''
        }));
      }
    }
    carregarConfiguracoesPadrao();
  }, []);

  // Busca incremental por nome (debounced)
  useEffect(() => {
    if (!buscaMembro || buscaMembro.length < 2) {
      setResultadosBusca([]);
      return;
    }
    const timeout = setTimeout(async () => {
      const { data, error } = await supabase
        .from('pessoas')
        .select('id, nome, cpf, telefone')
        .ilike('nome', `%${buscaMembro}%`)
        .order('nome')
        .limit(10);
      if (!error && data) setResultadosBusca(data);
    }, 300);
    return () => clearTimeout(timeout);
  }, [buscaMembro]);

  // Carrega dados completos do membro selecionado e popula o formulário
  const carregarMembro = useCallback(async (id) => {
    if (!id) return;
    setCarregandoMembro(true);
    try {
      const { data: p, error } = await supabase
        .from('pessoas')
        .select('id, nome, cpf, cep, endereco, numero, bairro, cidade, estado')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (p) {
        setMembroSelecionado(p);
        setDadosCliente({
          nome: (p.nome || '').toUpperCase(),
          cpfCnpj: mascaraCPF(p.cpf || '') || p.cpf || '',
          endereco: (p.endereco || '').toUpperCase(),
          bairro: (p.bairro || '').toUpperCase(),
          cidade: (p.cidade || '').toUpperCase(),
          estado: (p.estado || '').toUpperCase(),
          cep: p.cep || '',
          numeroRua: p.numero || '',
          complemento: '',
        });
      }
    } catch (err) {
      console.error('Erro ao carregar membro:', err);
      setErro('Não foi possível carregar os dados do membro.');
    } finally {
      setCarregandoMembro(false);
    }
  }, []);

  // Se um pessoaId inicial foi passado via prop, carrega automaticamente
  useEffect(() => {
    if (pessoaIdInicial) {
      setPessoaSelecionadaId(pessoaIdInicial);
      carregarMembro(pessoaIdInicial);
    }
  }, [pessoaIdInicial, carregarMembro]);

  function selecionarMembro(p) {
    setPessoaSelecionadaId(p.id);
    setBuscaMembro('');
    setResultadosBusca([]);
    carregarMembro(p.id);
  }

  function limparMembroSelecionado() {
    setPessoaSelecionadaId(null);
    setMembroSelecionado(null);
    setDadosCliente({
      nome: '',
      cpfCnpj: '',
      endereco: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      numeroRua: '',
      complemento: '',
    });
  }

  // ── Vínculo com inscrição de evento (para baixa via QR Code) ──
  const [inscricaoId, setInscricaoId] = useState(inscricaoIdInicial);
  const [inscricaoSelecionada, setInscricaoSelecionada] = useState(null);
  const [buscaInscricao, setBuscaInscricao] = useState('');
  const [resultadosInscricao, setResultadosInscricao] = useState([]);

  // Busca inscrições em eventos (para vincular o carnê e habilitar baixa via QR)
  useEffect(() => {
    if (!buscaInscricao || buscaInscricao.length < 2) {
      setResultadosInscricao([]);
      return;
    }
    const timeout = setTimeout(async () => {
      const { data, error } = await supabase
        .from('agenda_inscricoes')
        .select('id, dados_inscricao, agenda_eventos(titulo)')
        .order('created_at', { ascending: false })
        .limit(50);
      if (!error && data) {
        const termo = buscaInscricao.toLowerCase();
        const filtrados = data.filter((insc) => {
          const nome = (insc.dados_inscricao?.nome || insc.dados_inscricao?.['Nome Completo'] || '')
            .toString()
            .toLowerCase();
          const evento = (insc.agenda_eventos?.titulo || '').toLowerCase();
          return nome.includes(termo) || evento.includes(termo);
        });
        setResultadosInscricao(filtrados.slice(0, 10));
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [buscaInscricao]);

  // Se um inscricaoId inicial foi passado via prop, carrega os dados básicos
  useEffect(() => {
    if (!inscricaoIdInicial) return;
    (async () => {
      const { data } = await supabase
        .from('agenda_inscricoes')
        .select('id, dados_inscricao, agenda_eventos(titulo)')
        .eq('id', inscricaoIdInicial)
        .single();
      if (data) {
        setInscricaoId(data.id);
        setInscricaoSelecionada(data);
      }
    })();
  }, [inscricaoIdInicial]);

  function selecionarInscricao(insc) {
    setInscricaoId(insc.id);
    setInscricaoSelecionada(insc);
    setBuscaInscricao('');
    setResultadosInscricao([]);
  }

  function removerVinculoInscricao() {
    setInscricaoId(null);
    setInscricaoSelecionada(null);
  }

  const parcelasBase = useMemo(() => {
    if (!dadosVenda.vencimentoPrimeiraParcela || !dadosVenda.quantidadeParcelas) return [];
    return gerarParcelas({
      vencimentoInicial: dadosVenda.vencimentoPrimeiraParcela,
      quantidadeParcelas: Number(dadosVenda.quantidadeParcelas),
      valorParcela: dadosVenda.valorParcela,
      descontos: dadosVenda.descontos,
      acrescimos: dadosVenda.acrescimos,
    }).map((p) => ({
      ...p,
      // Código embutido no QR: EVENTO|<inscricaoId>|<parcelaNum>
      // Compatível com LeitorQRCodeEvento, que dá baixa em agenda_inscricoes.dados_inscricao.parcelas_pagas
      codigo: inscricaoId ? `EVENTO|${inscricaoId}|${p.numero}` : null,
    }));
  }, [dadosVenda, inscricaoId]);

  // Gera os QR Codes (data URL) para cada parcela vinculada a uma inscrição
  const [parcelas, setParcelas] = useState([]);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      if (!parcelasBase.length) {
        setParcelas([]);
        return;
      }
      if (!inscricaoId) {
        setParcelas(parcelasBase);
        return;
      }
      const comQr = await Promise.all(
        parcelasBase.map(async (p) => {
          try {
            const qrCodeDataUrl = await QRCode.toDataURL(p.codigo, { width: 120, margin: 1 });
            return { ...p, qrCodeDataUrl };
          } catch (err) {
            console.error('Erro ao gerar QR Code:', err);
            return p;
          }
        })
      );
      if (!cancelado) setParcelas(comQr);
    })();
    return () => {
      cancelado = true;
    };
  }, [parcelasBase, inscricaoId]);

  const valorTotal = useMemo(
    () => parcelas.reduce((acc, p) => acc + p.valorPago, 0),
    [parcelas]
  );

  function handleGerar(e) {
    e.preventDefault();
    setErro('');

    // Validações equivalentes às do VBA (MDcarne.Copia)
    if (!dadosVenda.quantidadeParcelas) {
      setErro('Informe o número de parcelas!');
      return;
    }
    if (!dadosVenda.vencimentoPrimeiraParcela) {
      setErro('Informe a data de vencimento da primeira parcela!');
      return;
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="carne-print-page max-w-5xl mx-auto p-3 sm:p-6 space-y-6 print:p-0 print:max-w-none">
        {/* Cabeçalho */}
        <header className="print:hidden">
          <h1 className="text-2xl font-bold text-slate-900">Gerador de Carnê de Pagamento</h1>
          <p className="text-sm text-slate-500">
            Baseado no modelo "Carnê - Congresso Nacional MIB". Preencha os dados abaixo e clique em
            "Gerar Carnê".
          </p>
        </header>

        {/* Busca de membro (Supabase) */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 print:hidden space-y-2">
          <h2 className="font-semibold text-slate-700">Cliente (Sacado)</h2>

          {membroSelecionado ? (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded px-3 py-2">
              <div className="text-sm">
                <p className="font-semibold text-slate-800">{membroSelecionado.nome}</p>
                <p className="text-xs text-slate-500">{mascaraCPF(membroSelecionado.cpf || '') || 'CPF não informado'}</p>
              </div>
              <button
                type="button"
                onClick={limparMembroSelecionado}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900"
              >
                Trocar membro
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar membro pelo nome..."
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={buscaMembro}
                onChange={(e) => setBuscaMembro(e.target.value)}
              />
              {resultadosBusca.length > 0 && (
                <ul className="absolute z-10 left-0 right-0 mt-1 bg-white border border-slate-200 rounded shadow-lg max-h-56 overflow-y-auto">
                  {resultadosBusca.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => selecionarMembro(p)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 flex justify-between"
                      >
                        <span>{p.nome}</span>
                        <span className="text-xs text-slate-400">{mascaraCPF(p.cpf || '') || ''}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-xs text-slate-400 mt-1">
                Ou preencha os campos manualmente no formulário abaixo.
              </p>
            </div>
          )}

          {carregandoMembro && <p className="text-xs text-slate-400">Carregando dados do membro...</p>}
        </div>

        {/* Vínculo com inscrição de evento (habilita baixa por QR Code) */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 print:hidden space-y-2">
          <h2 className="font-semibold text-slate-700">Baixa por QR Code (opcional)</h2>
          <p className="text-xs text-slate-500">
            Vincule este carnê a uma inscrição de evento para gerar um QR Code em cada parcela. O QR
            pode ser lido em "Leitor QR" para dar baixa automática no pagamento.
          </p>

          {inscricaoSelecionada ? (
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded px-3 py-2">
              <div className="text-sm">
                <p className="font-semibold text-slate-800">
                  {inscricaoSelecionada.dados_inscricao?.nome ||
                    inscricaoSelecionada.dados_inscricao?.['Nome Completo'] ||
                    'Inscrição'}
                </p>
                <p className="text-xs text-slate-500">
                  Evento: {inscricaoSelecionada.agenda_eventos?.titulo || '—'}
                </p>
              </div>
              <button
                type="button"
                onClick={removerVinculoInscricao}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
              >
                Remover vínculo
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar inscrição por nome ou evento..."
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={buscaInscricao}
                onChange={(e) => setBuscaInscricao(e.target.value)}
              />
              {resultadosInscricao.length > 0 && (
                <ul className="absolute z-10 left-0 right-0 mt-1 bg-white border border-slate-200 rounded shadow-lg max-h-56 overflow-y-auto">
                  {resultadosInscricao.map((insc) => (
                    <li key={insc.id}>
                      <button
                        type="button"
                        onClick={() => selecionarInscricao(insc)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 flex justify-between"
                      >
                        <span>
                          {insc.dados_inscricao?.nome || insc.dados_inscricao?.['Nome Completo'] || 'Sem nome'}
                        </span>
                        <span className="text-xs text-slate-400">{insc.agenda_eventos?.titulo}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>


        <form onSubmit={handleGerar} className="grid md:grid-cols-2 gap-6 print:hidden">
          {/* Dados do cliente */}
          <fieldset className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
            <legend className="font-semibold text-slate-700 px-1">Dados do Cliente</legend>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Nome do cliente</label>
              <input
                type="text"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dadosCliente.nome}
                onChange={(e) => setDadosCliente((d) => ({ ...d, nome: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">CPF/CNPJ</label>
              <input
                type="text"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dadosCliente.cpfCnpj}
                onChange={(e) => setDadosCliente((d) => ({ ...d, cpfCnpj: mascaraCPF(e.target.value) }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Endereço</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosCliente.endereco}
                  onChange={(e) => setDadosCliente((d) => ({ ...d, endereco: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Bairro</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosCliente.bairro}
                  onChange={(e) => setDadosCliente((d) => ({ ...d, bairro: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="col-span-1">
                <label className="block text-xs font-medium text-slate-600 mb-1">Cidade</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosCliente.cidade}
                  onChange={(e) => setDadosCliente((d) => ({ ...d, cidade: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Estado</label>
                <input
                  type="text"
                  maxLength={2}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosCliente.estado}
                  onChange={(e) => setDadosCliente((d) => ({ ...d, estado: e.target.value.toUpperCase() }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">CEP</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosCliente.cep}
                  onChange={(e) => setDadosCliente((d) => ({ ...d, cep: mascaraCEP(e.target.value) }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nº Rua</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosCliente.numeroRua}
                  onChange={(e) => setDadosCliente((d) => ({ ...d, numeroRua: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Complemento</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosCliente.complemento}
                  onChange={(e) => setDadosCliente((d) => ({ ...d, complemento: e.target.value }))}
                />
              </div>
            </div>
          </fieldset>

          {/* Dados da venda / financeiros */}
          <fieldset className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
            <legend className="font-semibold text-slate-700 px-1">Dados Financeiros (Venda)</legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Número da Venda</label>
                <input
                  type="number"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosVenda.numeroVenda}
                  onChange={(e) => setDadosVenda((d) => ({ ...d, numeroVenda: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Título</label>
                <input
                  type="number"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosVenda.titulo}
                  onChange={(e) => setDadosVenda((d) => ({ ...d, titulo: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Valor da Parcela (R$)</label>
              <input
                type="number"
                step="0.01"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dadosVenda.valorParcela}
                onChange={(e) => setDadosVenda((d) => ({ ...d, valorParcela: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">(-) Descontos (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosVenda.descontos}
                  onChange={(e) => setDadosVenda((d) => ({ ...d, descontos: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">(+) Acréscimos (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosVenda.acrescimos}
                  onChange={(e) => setDadosVenda((d) => ({ ...d, acrescimos: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Data de Emissão</label>
                <input
                  type="date"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosVenda.dataEmissao}
                  onChange={(e) => setDadosVenda((d) => ({ ...d, dataEmissao: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Venc. 1ª Parcela</label>
                <input
                  type="date"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosVenda.vencimentoPrimeiraParcela}
                  onChange={(e) => setDadosVenda((d) => ({ ...d, vencimentoPrimeiraParcela: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Quantidade de Parcelas (Dividido)
              </label>
              <input
                type="number"
                min={1}
                max={24}
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dadosVenda.quantidadeParcelas}
                onChange={(e) => setDadosVenda((d) => ({ ...d, quantidadeParcelas: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Instruções</label>
              <textarea
                rows={2}
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dadosVenda.instrucoes}
                onChange={(e) => setDadosVenda((d) => ({ ...d, instrucoes: e.target.value }))}
              />
            </div>
          </fieldset>

          {/* Dados do cedente */}
          <fieldset className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 md:col-span-2">
            <legend className="font-semibold text-slate-700 px-1">Dados do Cedente (Emissor)</legend>

            <div className="grid md:grid-cols-3 gap-2">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Nome / Razão Social</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosCedente.nome}
                  onChange={(e) => setDadosCedente((d) => ({ ...d, nome: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Telefone Celular</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosCedente.telefoneCelular}
                  onChange={(e) => setDadosCedente((d) => ({ ...d, telefoneCelular: mascaraTelefone(e.target.value) }))}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Endereço</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosCedente.endereco}
                  onChange={(e) => setDadosCedente((d) => ({ ...d, endereco: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Bairro</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dadosCedente.bairro}
                  onChange={(e) => setDadosCedente((d) => ({ ...d, bairro: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Cidade / UF / CEP</label>
                <div className="flex flex-wrap gap-1">
                  <input
                    type="text"
                    className="flex-1 min-w-[100px] border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={dadosCedente.cidade}
                    onChange={(e) => setDadosCedente((d) => ({ ...d, cidade: e.target.value }))}
                  />
                  <input
                    type="text"
                    maxLength={2}
                    className="w-14 sm:w-16 border border-slate-300 rounded px-2 py-1.5 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={dadosCedente.estado}
                    onChange={(e) => setDadosCedente((d) => ({ ...d, estado: e.target.value.toUpperCase() }))}
                  />
                  <input
                    type="text"
                    className="w-24 sm:w-28 border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={dadosCedente.cep}
                    onChange={(e) => setDadosCedente((d) => ({ ...d, cep: mascaraCEP(e.target.value) }))}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Local de Pagamento</label>
              <input
                type="text"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dadosCedente.localPagamento}
                onChange={(e) => setDadosCedente((d) => ({ ...d, localPagamento: e.target.value }))}
              />
            </div>
          </fieldset>

          {erro && (
            <div className="md:col-span-2 bg-red-50 border border-red-300 text-red-700 text-sm rounded px-3 py-2">
              ⚠ {erro}
            </div>
          )}

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded transition w-full sm:w-auto"
            >
              Gerar Carnê
            </button>
            <button
              type="button"
              onClick={handleSalvarComoPadrao}
              disabled={salvandoPadrao}
              className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded transition w-full sm:w-auto flex items-center justify-center gap-2"
            >
              {salvandoPadrao ? 'Salvando...' : '💾 Salvar como Padrão'}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded transition w-full sm:w-auto"
            >
              Imprimir / PDF
            </button>
          </div>
        </form>

        {/* Resumo */}
        {parcelas.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-lg p-4 print:hidden">
            <h2 className="font-semibold text-slate-700 mb-2">Resumo</h2>
            <p className="text-sm text-slate-600">
              {parcelas.length} parcela(s) de R$ {formatCurrency(dadosVenda.valorParcela)} — Total: R${' '}
              {formatCurrency(valorTotal)}
            </p>
          </div>
        )}

        {/* Carnê gerado */}
        {parcelas.length > 0 && (
          <div className="space-y-4 print:space-y-0">
            {parcelas.map((parcela, idx) => (
              <div
                key={parcela.numero}
                className={`print:break-inside-avoid print:mb-4 ${
                  (idx + 1) % 3 === 0 && idx !== parcelas.length - 1 ? 'print:break-after-page' : ''
                }`}
              >
                <CupomCarne
                  dadosCedente={dadosCedente}
                  dadosCliente={dadosCliente}
                  dadosVenda={dadosVenda}
                  parcela={parcela}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
