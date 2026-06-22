import React, { useState, useMemo, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';
import { supabase } from './supabaseClient';
import { mascaraCPF, mascaraTelefone, mascaraCEP } from './mascaras';
import './CarneGenerator.css';
import { baixarCartaoPNG, baixarCartaoPDF, baixarCartoesPDF, compartilharCartaoPDF, compartilharCartoesPDF } from './cartaoDigital';
import { PageHeader } from './ui';
import {
  User, Calendar, DollarSign, Building, Save, Printer,
  Trash2, ChevronDown, ChevronUp, Link, AlertCircle,
  Plus, Share2, Download, QrCode, X, FileText
} from 'lucide-react';

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
    telefone: '',
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
  const [showCedenteConfig, setShowCedenteConfig] = useState(false);

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
          telefone: mascaraTelefone(p.telefone || ''),
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
      telefone: '',
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

  // Monta o objeto "igreja" no formato esperado por cartaoDigital.js
  function montarIgrejaParaCartao() {
    return {
      nome_igreja: dadosCedente.nome,
      endereco: dadosCedente.endereco,
      bairro: dadosCedente.bairro,
      cidade: dadosCedente.cidade,
      estado: dadosCedente.estado,
      telefone: dadosCedente.telefoneCelular || dadosCedente.telefoneFixo,
      email_contato: dadosCedente.email,
    };
  }

  function montarDadosCartaoParcela(parcela) {
    return {
      igreja: montarIgrejaParaCartao(),
      evento: inscricaoSelecionada?.agenda_eventos?.titulo || 'Pagamento',
      nome: dadosCliente.nome,
      cpf: dadosCliente.cpfCnpj,
      valor: parcela.valorPago,
      parcelaNum: parcela.numero,
      totalParcelas: parcela.total,
      vencimento: parcela.vencimento,
      pago: false,
      codigoQr: parcela.codigo,
    };
  }

  async function handleBaixarCartaoPNG(parcela) {
    if (!parcela.codigo) return;
    const nomeArquivo = `cartao_${(dadosCliente.nome || 'participante').replace(/\s+/g, '_').toLowerCase()}_parcela${parcela.numero}.png`;
    await baixarCartaoPNG(montarDadosCartaoParcela(parcela), nomeArquivo);
  }

  async function handleBaixarCartaoPDF(parcela) {
    if (!parcela.codigo) return;
    const nomeArquivo = `cartao_${(dadosCliente.nome || 'participante').replace(/\s+/g, '_').toLowerCase()}_parcela${parcela.numero}.pdf`;
    await baixarCartaoPDF(montarDadosCartaoParcela(parcela), nomeArquivo);
  }

  async function handleBaixarTodosCartoesPDF() {
    const elegiveis = parcelas.filter((p) => p.codigo);
    if (!elegiveis.length) return;
    const nomeArquivo = `cartoes_${(dadosCliente.nome || 'participante').replace(/\s+/g, '_').toLowerCase()}.pdf`;
    await baixarCartoesPDF(elegiveis.map(montarDadosCartaoParcela), nomeArquivo);
  }

  const handleWhatsAppParcela = async (parcela) => {
    const dataVenc = formatDate(parcela.vencimento);
    const valor = formatCurrency(parcela.valorPago);
    const nomeCliente = dadosCliente.nome;
    const igreja = dadosCedente.nome;

    // Tenta encontrar um link de pagamento configurado na inscrição
    const linkPagamento = (inscricaoSelecionada?.agenda_eventos?.formas_pagamento || [])
      .find(f => f.link_pagamento)?.link_pagamento || '';

    const nomeArquivo = `cartao_${(dadosCliente.nome || 'participante').replace(/\s+/g, '_').toLowerCase()}_parcela${parcela.numero}.pdf`;
    const dadosCartao = montarDadosCartaoParcela(parcela);

    // Tenta compartilhar o PDF direto pelo menu nativo (funciona em mobile)
    const compartilhado = await compartilharCartaoPDF(dadosCartao, nomeArquivo);

    if (!compartilhado) {
      // Se não for suportado (ex: Chrome desktop), tenta copiar a imagem PNG para a área de transferência
      let copiado = false;
      try {
        const canvas = await desenharCartaoDigital(dadosCartao);
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        copiado = true;
      } catch (clipErr) {
        console.warn('Erro ao copiar imagem para clipboard:', clipErr);
      }

      // Também baixa o PDF do cartão por conveniência
      await baixarCartaoPDF(dadosCartao, nomeArquivo);

      let msg = `*Olá ${nomeCliente}!* \n\nSegue os dados para pagamento da sua parcela do carnê da *${igreja}*:\n\n`;
      msg += `📌 *Parcela:* ${parcela.parcelaLabel}\n`;
      msg += `📅 *Vencimento:* ${dataVenc}\n`;
      msg += `💰 *Valor:* R$ ${valor}\n`;
      if (linkPagamento) msg += `\n🔗 *Link para pagamento:* ${linkPagamento}\n`;

      if (copiado) {
        msg += `\n*DICA:* A imagem do cartão digital correspondente a esta parcela foi copiada para sua área de transferência. Basta colar (Ctrl+V) no chat do WhatsApp para enviá-la! O arquivo PDF também foi baixado.`;
        window.alert("Imagem do Cartão Digital copiada para a área de transferência!\n\nA conversa do WhatsApp será aberta em seguida. Basta colar (Ctrl+V) na conversa para enviar a imagem do cartão.");
      } else {
        msg += `\n*Nota:* O PDF do cartão digital correspondente a esta parcela foi baixado no seu dispositivo. Por favor, anexe o arquivo ao enviar esta mensagem.`;
      }

      const telLimpo = (dadosCliente.telefone || '').replace(/\D/g, '');
      const url = `https://wa.me/${telLimpo ? telLimpo : ''}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    }
  };

  const handleWhatsAppCarneCompleto = async () => {
    const nomeCliente = dadosCliente.nome;
    const igreja = dadosCedente.nome;
    const totalParcelas = parcelas.length;
    const elegiveis = parcelas.filter((p) => p.codigo);

    if (!elegiveis.length) return;

    const nomeArquivo = `cartoes_${(dadosCliente.nome || 'participante').replace(/\s+/g, '_').toLowerCase()}.pdf`;
    const listaCartoes = elegiveis.map(montarDadosCartaoParcela);

    // Tenta compartilhar todos os cartões consolidados em PDF direto pelo menu nativo
    const compartilhado = await compartilharCartoesPDF(listaCartoes, nomeArquivo);

    if (!compartilhado) {
      // Fallback: baixa o PDF completo e abre o WhatsApp
      await baixarCartoesPDF(listaCartoes, nomeArquivo);

      let msg = `*Olá ${nomeCliente}!* \n\nSegue o resumo do seu carnê da *${igreja}*:\n\n`;
      msg += `📊 *Total de Parcelas:* ${totalParcelas}\n`;
      msg += `💰 *Valor Total:* R$ ${formatCurrency(valorTotal)}\n`;
      msg += `💰 *Valor da Parcela:* R$ ${formatCurrency(dadosVenda.valorParcela)}\n`;
      msg += `📅 *Vencimento Inicial:* ${formatDate(dadosVenda.vencimentoPrimeiraParcela)}\n\n`;
      msg += `*Nota:* O PDF contendo todas as parcelas consolidadas foi baixado no seu dispositivo. Por favor, anexe o arquivo ao enviar esta mensagem.`;

      window.alert("O PDF com todos os cartões digitais foi baixado.\n\nA conversa do WhatsApp será aberta em seguida para que você possa anexar o arquivo PDF baixado.");

      const telLimpo = (dadosCliente.telefone || '').replace(/\D/g, '');
      const url = `https://wa.me/${telLimpo ? telLimpo : ''}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    }
  };

  const handleLimparGeral = () => {
    limparMembroSelecionado();
    removerVinculoInscricao();
    setDadosVenda(prev => ({
      numeroVenda: (Number(prev.numeroVenda) || 0) + 1,
      titulo: 1,
      valorParcela: 70,
      dataEmissao: new Date().toISOString().slice(0, 10),
      vencimentoPrimeiraParcela: '',
      quantidadeParcelas: 4,
      descontos: 0,
      acrescimos: 0,
      instrucoes: prev.instrucoes,
    }));
    setErro('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <div className="carne-print-page max-w-7xl mx-auto pt-0 px-0 pb-3 sm:px-6 sm:pb-6 space-y-6 print:p-0 print:max-w-none mx-[-3px] sm:mx-auto">
        {/* Cabeçalho */}
        <div className="print:hidden mx-[3px] sm:mx-0">
          <PageHeader
            titulo="Gerador de Carnê"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print:block">
          {/* Coluna Esquerda: Formulários */}
          <div className="lg:col-span-5 space-y-6 print:hidden">

            {/* Passo 1: Identificação (Membro / Evento) */}
            <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <User size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Passo 1: Identificação</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Associe o sacado e vincule a um evento</p>
                </div>
              </div>

              {/* Membro Selecionado ou Campo de Busca */}
              {membroSelecionado ? (
                <div className="flex items-center justify-between bg-blue-50/40 border border-blue-100/60 rounded-2xl px-4 py-3">
                  <div className="text-xs">
                    <span className="text-[9px] font-black uppercase text-blue-500 tracking-wider">Cliente / Sacado</span>
                    <p className="font-extrabold text-slate-800 text-sm mt-0.5">{membroSelecionado.nome}</p>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{mascaraCPF(membroSelecionado.cpf || '') || 'CPF não informado'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={limparMembroSelecionado}
                    className="p-1.5 bg-white border border-slate-200 hover:border-red-300 hover:text-red-600 text-slate-500 rounded-lg transition cursor-pointer"
                    title="Trocar membro"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Buscar Membro</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar membro pelo nome..."
                      className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                      value={buscaMembro}
                      onChange={(e) => setBuscaMembro(e.target.value)}
                    />
                    {resultadosBusca.length > 0 && (
                      <ul className="absolute z-20 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-56 overflow-y-auto divide-y divide-slate-50">
                        {resultadosBusca.map((p) => (
                          <li key={p.id}>
                            <button
                              type="button"
                              onClick={() => selecionarMembro(p)}
                              className="w-full text-left px-3 py-2.5 text-xs hover:bg-blue-50/50 flex justify-between items-center transition cursor-pointer"
                            >
                              <span className="font-bold text-slate-700">{p.nome}</span>
                              <span className="text-[10px] text-slate-400 font-semibold">{mascaraCPF(p.cpf || '') || ''}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">
                    Ou digite as informações do cliente manualmente abaixo.
                  </p>
                </div>
              )}

              {carregandoMembro && <p className="text-[10px] text-slate-400 italic">Carregando dados do membro...</p>}

              {/* Vínculo de Evento (QR Code) */}
              {inscricaoSelecionada ? (
                <div className="flex items-center justify-between bg-emerald-50/40 border border-emerald-100/60 rounded-2xl px-4 py-3">
                  <div className="text-xs">
                    <span className="text-[9px] font-black uppercase text-emerald-600 tracking-wider">Inscrição Vinculada (QR Code)</span>
                    <p className="font-extrabold text-slate-800 text-sm mt-0.5">
                      {inscricaoSelecionada.dados_inscricao?.nome ||
                        inscricaoSelecionada.dados_inscricao?.['Nome Completo'] ||
                        'Inscrição'}
                    </p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                      Evento: {inscricaoSelecionada.agenda_eventos?.titulo || '—'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removerVinculoInscricao}
                    className="p-1.5 bg-white border border-slate-200 hover:border-red-300 hover:text-red-600 text-slate-500 rounded-lg transition cursor-pointer"
                    title="Remover vínculo"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">QR Code / Evento (Opcional)</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Vincular inscrição de evento..."
                      className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                      value={buscaInscricao}
                      onChange={(e) => setBuscaInscricao(e.target.value)}
                    />
                    {resultadosInscricao.length > 0 && (
                      <ul className="absolute z-20 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-56 overflow-y-auto divide-y divide-slate-50">
                        {resultadosInscricao.map((insc) => (
                          <li key={insc.id}>
                            <button
                              type="button"
                              onClick={() => selecionarInscricao(insc)}
                              className="w-full text-left px-3 py-2.5 text-xs hover:bg-blue-50/50 flex justify-between items-center transition cursor-pointer"
                            >
                              <span className="font-bold text-slate-700">
                                {insc.dados_inscricao?.nome || insc.dados_inscricao?.['Nome Completo'] || 'Sem nome'}
                              </span>
                              <span className="text-[10px] text-slate-400 font-semibold">{insc.agenda_eventos?.titulo}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Passo 2: Faturamento & Dados Cliente */}
            <form onSubmit={handleGerar} className="space-y-6">
              <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                    <DollarSign size={18} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Passo 2: Dados do Carnê</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Preencha os valores e dados do sacado</p>
                  </div>
                </div>

                {/* Dados Pessoais do Cliente */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Informações do Cliente</h4>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Nome do Cliente</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                      value={dadosCliente.nome}
                      onChange={(e) => setDadosCliente((d) => ({ ...d, nome: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">WhatsApp / Telefone</label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosCliente.telefone}
                        onChange={(e) => setDadosCliente((d) => ({ ...d, telefone: mascaraTelefone(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">CPF / CNPJ</label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosCliente.cpfCnpj}
                        onChange={(e) => setDadosCliente((d) => ({ ...d, cpfCnpj: mascaraCPF(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Endereço</label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosCliente.endereco}
                        onChange={(e) => setDadosCliente((d) => ({ ...d, endereco: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Bairro</label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosCliente.bairro}
                        onChange={(e) => setDadosCliente((d) => ({ ...d, bairro: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-5">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Cidade</label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosCliente.cidade}
                        onChange={(e) => setDadosCliente((d) => ({ ...d, cidade: e.target.value }))}
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">UF</label>
                      <input
                        type="text"
                        maxLength={2}
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium uppercase text-center"
                        value={dadosCliente.estado}
                        onChange={(e) => setDadosCliente((d) => ({ ...d, estado: e.target.value.toUpperCase() }))}
                      />
                    </div>
                    <div className="col-span-4">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">CEP</label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosCliente.cep}
                        onChange={(e) => setDadosCliente((d) => ({ ...d, cep: mascaraCEP(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Nº Rua</label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosCliente.numeroRua}
                        onChange={(e) => setDadosCliente((d) => ({ ...d, numeroRua: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Complemento</label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosCliente.complemento}
                        onChange={(e) => setDadosCliente((d) => ({ ...d, complemento: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100 my-4" />

                {/* Dados Financeiros */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Informações de Cobrança</h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Nº Venda / Pedido</label>
                      <input
                        type="number"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosVenda.numeroVenda}
                        onChange={(e) => setDadosVenda((d) => ({ ...d, numeroVenda: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Título</label>
                      <input
                        type="number"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosVenda.titulo}
                        onChange={(e) => setDadosVenda((d) => ({ ...d, titulo: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Valor da Parcela (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                      value={dadosVenda.valorParcela}
                      onChange={(e) => setDadosVenda((d) => ({ ...d, valorParcela: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">(-) Descontos (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosVenda.descontos}
                        onChange={(e) => setDadosVenda((d) => ({ ...d, descontos: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">(+) Acréscimos (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosVenda.acrescimos}
                        onChange={(e) => setDadosVenda((d) => ({ ...d, acrescimos: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Data de Emissão</label>
                      <input
                        type="date"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosVenda.dataEmissao}
                        onChange={(e) => setDadosVenda((d) => ({ ...d, dataEmissao: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Venc. 1ª Parcela</label>
                      <input
                        type="date"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosVenda.vencimentoPrimeiraParcela}
                        onChange={(e) => setDadosVenda((d) => ({ ...d, vencimentoPrimeiraParcela: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                        Quantidade de Parcelas
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={24}
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosVenda.quantidadeParcelas}
                        onChange={(e) => setDadosVenda((d) => ({ ...d, quantidadeParcelas: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Instruções</label>
                    <textarea
                      rows={2}
                      className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                      value={dadosVenda.instrucoes}
                      onChange={(e) => setDadosVenda((d) => ({ ...d, instrucoes: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Dados do Emissor (Igreja) - Accordion */}
              <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-4">
                <button
                  type="button"
                  onClick={() => setShowCedenteConfig(!showCedenteConfig)}
                  className="w-full flex items-center justify-between border-b border-slate-100 pb-3 text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-50 text-slate-600 rounded-xl">
                      <Building size={18} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Dados do Cedente (Igreja)</h3>
                      <p className="text-[10px] text-slate-400 font-medium">Configurações do emissor do carnê</p>
                    </div>
                  </div>
                  <div className="text-slate-400 hover:text-slate-600">
                    {showCedenteConfig ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {showCedenteConfig && (
                  <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Nome da Igreja / Cedente</label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosCedente.nome}
                        onChange={(e) => setDadosCedente((d) => ({ ...d, nome: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Telefone Celular</label>
                        <input
                          type="text"
                          className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                          value={dadosCedente.telefoneCelular}
                          onChange={(e) => setDadosCedente((d) => ({ ...d, telefoneCelular: mascaraTelefone(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">E-mail</label>
                        <input
                          type="email"
                          className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                          value={dadosCedente.email}
                          onChange={(e) => setDadosCedente((d) => ({ ...d, email: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Endereço</label>
                        <input
                          type="text"
                          className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                          value={dadosCedente.endereco}
                          onChange={(e) => setDadosCedente((d) => ({ ...d, endereco: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Bairro</label>
                        <input
                          type="text"
                          className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                          value={dadosCedente.bairro}
                          onChange={(e) => setDadosCedente((d) => ({ ...d, bairro: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Cidade</label>
                        <input
                          type="text"
                          className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                          value={dadosCedente.cidade}
                          onChange={(e) => setDadosCedente((d) => ({ ...d, cidade: e.target.value }))}
                        />
                      </div>
                      <div className="col-span-3">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">UF</label>
                        <input
                          type="text"
                          maxLength={2}
                          className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium uppercase text-center"
                          value={dadosCedente.estado}
                          onChange={(e) => setDadosCedente((d) => ({ ...d, estado: e.target.value.toUpperCase() }))}
                        />
                      </div>
                      <div className="col-span-4">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">CEP</label>
                        <input
                          type="text"
                          className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                          value={dadosCedente.cep}
                          onChange={(e) => setDadosCedente((d) => ({ ...d, cep: mascaraCEP(e.target.value) }))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Local de Pagamento</label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-xl px-3 py-2 text-xs focus:outline-none transition font-medium"
                        value={dadosCedente.localPagamento}
                        onChange={(e) => setDadosCedente((d) => ({ ...d, localPagamento: e.target.value }))}
                      />
                    </div>
                  </div>
                )}
              </div>

              {erro && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-2xl px-4 py-3 flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span className="font-semibold">{erro}</span>
                </div>
              )}

              {/* Bloco de Botões de Ações */}
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  Gerar Carnê
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleSalvarComoPadrao}
                    disabled={salvandoPadrao}
                    className="py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Save size={14} />
                    {salvandoPadrao ? 'Salvando...' : 'Salvar Padrão'}
                  </button>

                  <button
                    type="button"
                    onClick={handleLimparGeral}
                    className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Trash2 size={14} />
                    Limpar Tudo
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Printer size={15} />
                  Imprimir / Exportar PDF
                </button>
              </div>
            </form>
          </div>

          {/* Coluna Direita: Preview / Resumo */}
          <div className="lg:col-span-7 space-y-6 print:w-full print:p-0 print:m-0">
            {parcelas.length === 0 ? (
              /* Empty State Premium */
              <div className="bg-white border border-slate-100 rounded-[28px] p-12 shadow-sm text-center flex flex-col items-center justify-center min-h-[400px] print:hidden">
                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mb-4">
                  <FileText size={32} />
                </div>
                <h3 className="font-extrabold text-slate-800 text-base">Pré-visualização do Carnê</h3>
                <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed font-medium">
                  Preencha a data de vencimento e valores à esquerda, e clique em <strong>Gerar Carnê</strong> para visualizar os cupons e opções de compartilhamento digital.
                </p>
              </div>
            ) : (
              /* Seção Ativa */
              <>
                {/* Resumo Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white border border-indigo-900/40 rounded-[28px] p-6 shadow-md print:hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-indigo-500/10 blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-400/10 inline-block mb-3">
                    Resumo do Carnê
                  </span>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-[10px] text-indigo-200/60 uppercase font-black tracking-wider">Total do Faturamento</p>
                      <h4 className="text-2xl font-extrabold text-white">R$ {formatCurrency(valorTotal)}</h4>
                    </div>
                    <div>
                      <p className="text-[10px] text-indigo-200/60 uppercase font-black tracking-wider">Valor da Parcela</p>
                      <h4 className="text-xl font-extrabold text-indigo-100">R$ {formatCurrency(dadosVenda.valorParcela)}</h4>
                    </div>
                  </div>

                  <div className="border-t border-indigo-900/60 my-4 pt-3 flex flex-wrap justify-between gap-2 text-xs font-semibold text-indigo-200/80">
                    <p>🔢 Parcela(s): <span className="font-extrabold text-white">{parcelas.length}</span></p>
                    <p>📅 Vencimento Inicial: <span className="font-extrabold text-white">{formatDate(dadosVenda.vencimentoPrimeiraParcela)}</span></p>
                  </div>
                </div>

                {/* Cartões Digitais */}
                <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-4 print:hidden">
                  <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                        <QrCode size={18} />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Cartões Digitais</h3>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {inscricaoId
                            ? 'Envie as parcelas por WhatsApp com códigos QR integrados'
                            : 'Associe uma inscrição de evento para gerar os QR Codes'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleWhatsAppCarneCompleto}
                        className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-200"
                      >
                        <Share2 size={13} />
                        Enviar Resumo
                      </button>
                      {inscricaoId && (
                        <button
                          type="button"
                          onClick={handleBaixarTodosCartoesPDF}
                          className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Download size={13} />
                          Baixar Todos
                        </button>
                      )}
                    </div>
                  </div>

                  {inscricaoId ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {parcelas.map((parcela) => (
                        <div key={parcela.numero} className="border border-slate-100 bg-slate-50/50 rounded-2xl p-3 flex flex-col items-center justify-between text-center gap-3">
                          <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Parcela</span>
                            <p className="text-sm font-black text-slate-800 mt-0.5">{parcela.parcelaLabel}</p>
                            <p className="text-xs font-bold text-slate-600 mt-1">R$ {formatCurrency(parcela.valorPago)}</p>
                          </div>

                          <div className="flex flex-col gap-1.5 w-full">
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => handleBaixarCartaoPNG(parcela)}
                                className="flex-1 py-1.5 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-600 rounded-lg text-[9px] font-extrabold uppercase transition cursor-pointer"
                              >
                                PNG
                              </button>
                              <button
                                type="button"
                                onClick={() => handleBaixarCartaoPDF(parcela)}
                                className="flex-1 py-1.5 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-600 rounded-lg text-[9px] font-extrabold uppercase transition cursor-pointer"
                              >
                                PDF
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleWhatsAppParcela(parcela)}
                              className="w-full py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[9px] font-extrabold uppercase transition flex items-center justify-center gap-1.5 cursor-pointer"
                              title="Enviar por WhatsApp"
                            >
                              <Share2 size={11} />
                              WhatsApp
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Para habilitar a geração de cartões digitais de parcelas e códigos QR para baixa automática, vincule o carnê a uma <strong>Inscrição de Evento</strong> no Passo 1.
                      </p>
                    </div>
                  )}
                </div>

                {/* Pré-visualização Real das Lâminas do Carnê */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-1 print:hidden">
                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                      <FileText size={16} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Lâminas do Carnê</h3>
                      <p className="text-[10px] text-slate-400 font-medium font-semibold">Visualização fiel dos cupons de pagamento</p>
                    </div>
                  </div>

                  <div className="space-y-4 lg:max-h-[900px] lg:overflow-y-auto print:max-h-none print:overflow-visible pr-1">
                    {parcelas.map((parcela, idx) => (
                      <div
                        key={parcela.numero}
                        className={`bg-white p-3 rounded-2xl shadow-sm border border-slate-100 hover:border-slate-200 transition print:p-0 print:border-none print:shadow-none print:rounded-none print:break-inside-avoid print:mb-4 ${(idx + 1) % 3 === 0 && idx !== parcelas.length - 1 ? 'print:break-after-page' : ''
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
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
