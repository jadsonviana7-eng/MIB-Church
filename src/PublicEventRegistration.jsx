import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader } from './ui';
import { mascaraTelefone } from './mascaras';

export default function PublicEventRegistration() {
  const [evento, setEvento] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [respostas, setAnswers] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState('sobre');
  const [metodoPagamentoSelecionado, setMetodoPagamentoSelecionado] = useState(null); // Alterado para armazenar um único método
  const [incluirTransporte, setIncluirTransporte] = useState(false);
  const [parcelas, setParcelas] = useState({}); // { [metodo]: numero }

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split('/').pop();
    if (id) fetchEvento(id);
  }, []);

  async function fetchEvento(id) {
    setCarregando(true);
    try {
      const { data, error } = await supabase
        .from('agenda_eventos')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) {
        setEvento(data);
        // Inicializa o estado das respostas com base nos campos dinâmicos
        const init = {};
        (data.campos_inscricao || []).forEach(c => {
          init[c.nome] = c.tipo === 'checkbox' ? [] : '';
        });
        if (data.valor_tipo === 'pago' && data.formas_pagamento?.length > 0) {
          init["Forma de Pagamento"] = "";
        }
        setAnswers(init);
      }
    } catch (err) {
      console.error("Erro ao carregar evento:", err);
    } finally {
      setCarregando(false);
    }
  }

  // Cálculos de valor
  const precoBase = Number(evento?.valor) || 0;
  const precoTransporte = incluirTransporte ? (Number(evento?.valor_transporte) || 0) : 0;
  const valorTotal = precoBase + precoTransporte;

  const formatarMoeda = (val) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatarDataHoraExibicao = (iso) => {
    if (!iso) return '—';
    const [data, hora] = iso.split('T');
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano} ${hora ? hora.slice(0, 5) : '00:00'}`;
  };

  const handleFieldChange = (nome, valor) => {
    const isPhone = ['telefone', 'celular', 'whatsapp'].some(k => nome.toLowerCase().includes(k));
    setAnswers(prev => ({ ...prev, [nome]: isPhone ? mascaraTelefone(valor) : valor }));
  };

  const handleCheckboxChange = (nome, opcao, checked) => {
    const atual = respostas[nome] || [];
    const novo = checked ? [...atual, opcao] : atual.filter(o => o !== opcao);
    setAnswers(prev => ({ ...prev, [nome]: novo }));
  };

  const handleParcelaChange = (tipo, num) => {
    setParcelas(prev => ({ ...prev, [tipo]: Number(num) }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);

    try {
      const detalhesPagamento = metodoPagamentoSelecionado ? 
        `${metodoPagamentoSelecionado}${parcelas[metodoPagamentoSelecionado] > 1 ? ` (${parcelas[metodoPagamentoSelecionado]}x de ${formatarMoeda(valorTotal / parcelas[metodoPagamentoSelecionado])})` : ''}` :
        "Nenhum método selecionado";


      const { error } = await supabase
        .from('agenda_inscricoes')
        .insert([{
          evento_id: evento.id,
          dados_inscricao: {
            ...respostas,
            "Valor Total": formatarMoeda(valorTotal),
            "Inclui Transporte": incluirTransporte ? `Sim (${formatarMoeda(evento.valor_transporte)})` : "Não",
            "Forma de Pagamento": detalhesPagamento,
            "parcelas": parcelas[metodoPagamentoSelecionado] || 1,
            "parcelas_pagas": []
          },
          status_pagamento: evento.valor_tipo === 'gratuito' ? 'pago' : 'pendente'
        }]);
      if (error) throw error;
      setSucesso(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert("Erro ao realizar inscrição: " + err.message);
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) return <div className="p-20 text-center text-slate-400 font-bold animate-pulse">Carregando detalhes do evento...</div>;
  if (!evento) return <div className="p-20 text-center text-slate-400 font-bold italic">Evento não encontrado ou link expirado.</div>;

  if (sucesso) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');`}</style>
        <Card className="max-w-md w-full p-4 sm:p-8 text-center space-y-6 shadow-2xl border-none">
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Inscrição Confirmada!</h2>
          <p className="text-sm text-slate-600 leading-relaxed">Sua participação no evento <strong>{evento.titulo}</strong> foi registrada com sucesso.</p>
          
          {evento.valor_tipo === 'pago' && (
            <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl text-left space-y-4">
              <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">⚠️ Pendente de Pagamento</p>
              <p className="text-xs text-slate-600">Para garantir sua vaga, realize o pagamento seguindo as instruções:</p>
              <div className="space-y-3 divide-y divide-blue-100 mt-4">
                {(evento.formas_pagamento || []).filter(f => metodoPagamentoSelecionado === f.tipo).map(f => (
                  <div key={f.tipo} className="pt-3 first:pt-0">
                    <p className="text-xs font-black text-slate-700 uppercase mb-2">
                      {f.tipo} {parcelas[f.tipo] > 1 ? `(${parcelas[f.tipo]}x de ${formatarMoeda(valorTotal / (parcelas[f.tipo] || 1))})` : ''}
                    </p>
                    {f.link_pagamento && (
                      <button 
                        onClick={() => window.open(f.link_pagamento, '_blank')}
                        className="w-full mb-3 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-blue-700 transition-all"
                      >
                        💳 Abrir Link de Pagamento
                      </button>
                    )}
                    <p className="text-[11px] text-slate-500 mt-1 whitespace-pre-wrap leading-relaxed">{f.instrucao}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button onClick={() => window.location.reload()} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg transition active:scale-95">
            Fazer Outra Inscrição
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-0 pb-2 md:py-6 px-[5px] antialiased text-slate-900" style={{ fontFamily: "'Roboto', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');`}</style>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* CAPA E INFO PRINCIPAL */}
        <Card className="p-0 overflow-hidden shadow-2xl border-none">
          <img src={evento.capa_url || 'https://via.placeholder.com/1200x600?text=Capa+do+Evento'} className="w-full aspect-[16/7] object-cover" alt="Cartaz" />
          <div className="p-4 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
               <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase rounded-full border border-blue-100 tracking-widest">{evento.tipo}</span>
               <span className={`text-[10px] font-black uppercase tracking-widest ${evento.valor_tipo === 'pago' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'} px-3 py-1 rounded-full`}>
                 {evento.valor_tipo === 'pago' ? `Valor: R$ ${evento.valor?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}` : 'Inscrição Gratuita'}
               </span>
            </div>
            
            <div>
              <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-none mb-2">{evento.titulo}</h1>
              <p className="text-lg text-slate-500 font-medium">{evento.subtitulo}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                     <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                   </svg>
                 </div>
                 <div className="text-xs">
                    <p className="font-black text-slate-400 uppercase tracking-widest">Início</p>
                    <p className="font-bold text-slate-700 mt-0.5">{formatarDataHoraExibicao(evento.data_inicio)}</p>
                 </div>
               </div>
               {evento.local_nome && (
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                       <circle cx="12" cy="10" r="3"/>
                     </svg>
                   </div>
                   <div className="text-xs">
                      <p className="font-black text-slate-400 uppercase tracking-widest">Onde</p>
                      <p className="font-bold text-slate-700 mt-0.5 underline cursor-pointer hover:text-blue-600 transition" onClick={() => evento.local_url && window.open(evento.local_url, '_blank')}>{evento.local_nome}</p>
                   </div>
                 </div>
               )}
            </div>
          </div>
        </Card>

        {/* MENU DE ABAS */}
        <div className="flex bg-white p-1 rounded-xl sm:p-1.5 sm:rounded-2xl shadow-sm border border-slate-100 gap-1">
          <button 
            onClick={() => setAbaAtiva('sobre')}
            className={`flex-1 py-2 text-[8px] sm:py-3 sm:text-[10px] font-bold sm:font-black uppercase tracking-normal sm:tracking-widest rounded-lg sm:rounded-xl transition-all duration-300 ${abaAtiva === 'sobre' ? 'bg-[#1e3a8a] text-white shadow-md sm:shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <span className="sm:hidden">Sobre</span>
            <span className="hidden sm:inline">Sobre o Evento</span>
          </button>
          {evento.programacao?.length > 0 && (
            <button 
              onClick={() => setAbaAtiva('programacao')}
              className={`flex-1 py-2 text-[8px] sm:py-3 sm:text-[10px] font-bold sm:font-black uppercase tracking-normal sm:tracking-widest rounded-lg sm:rounded-xl transition-all duration-300 ${abaAtiva === 'programacao' ? 'bg-[#1e3a8a] text-white shadow-md sm:shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <span className="sm:hidden">Agenda</span>
              <span className="hidden sm:inline">Programação</span>
            </button>
          )}
          {evento.palestrantes?.length > 0 && (
            <button 
              onClick={() => setAbaAtiva('palestrantes')}
              className={`flex-1 py-2 text-[8px] sm:py-3 sm:text-[10px] font-bold sm:font-black uppercase tracking-normal sm:tracking-widest rounded-lg sm:rounded-xl transition-all duration-300 ${abaAtiva === 'palestrantes' ? 'bg-[#1e3a8a] text-white shadow-md sm:shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <span className="sm:hidden">Equipe</span>
              <span className="hidden sm:inline">Palestrantes</span>
            </button>
          )}
        </div>

        {/* CONTEÚDO DAS ABAS */}
        <div className="min-h-[200px]">
          {abaAtiva === 'sobre' && (
            <Card className="p-8 animate-in fade-in duration-300">
              {evento.detalhes_ricos ? (
                <div className="prose prose-slate max-w-none prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-sm" 
                     dangerouslySetInnerHTML={{ __html: evento.detalhes_ricos }} />
              ) : (
                <p className="text-center text-slate-400 italic text-sm py-10">Nenhuma descrição detalhada disponível.</p>
              )}
            </Card>
          )}

          {abaAtiva === 'programacao' && evento.programacao?.length > 0 && (
            <Card className="p-0 overflow-hidden shadow-sm animate-in fade-in duration-300">
               <CardHeader titulo="Cronograma do Evento" />
               <div className="divide-y divide-slate-100">
                 {evento.programacao.map(item => (
                   <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="text-sm font-black text-slate-700">{item.titulo}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{new Date(item.data + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                      </div>
                      <span className="text-[11px] font-black text-[#1e3a8a] bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 shadow-sm">{item.horario}</span>
                   </div>
                 ))}
               </div>
            </Card>
          )}

          {abaAtiva === 'palestrantes' && evento.palestrantes?.length > 0 && (
            <div className="space-y-4 animate-in fade-in duration-300">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {evento.palestrantes.map(p => (
                    <Card key={p.id} className="p-4 flex gap-4 items-center bg-white border-none shadow-sm">
                      <img src={p.preview || 'https://via.placeholder.com/80x80?text=👤'} className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-sm" alt={p.nome} />
                      <div className="min-w-0">
                        <p className="font-black text-slate-800 truncate">{p.nome}</p>
                        <p className="text-xs text-slate-500 line-clamp-2">{p.descricao}</p>
                      </div>
                    </Card>
                  ))}
               </div>
            </div>
          )}
        </div>

        {/* FORMULÁRIO DINÂMICO */}
        <Card className="p-5 sm:p-10 shadow-2xl border-none ring-1 ring-slate-200">
          <div className="mb-8 sm:mb-10 text-center">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Ficha de Inscrição</h2>
            <p className="text-sm text-slate-500 mt-2">Os campos marcados com <span className="text-rose-500">*</span> são obrigatórios.</p>
          </div>

          {evento.valor_tipo === 'pago' && (
            <div className="bg-slate-50 border border-slate-200 p-3 sm:p-6 rounded-2xl sm:rounded-3xl text-left space-y-6 mb-8 shadow-inner">
              <div>
                <p className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Forma de Pagamento</p>
                <p className="text-xs text-slate-500 mt-1">Escolha a sua forma de pagamento:</p>
              </div>

              {/* Opcional de Transporte */}
              {evento.valor_transporte > 0 && (
                <label className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${incluirTransporte ? 'bg-amber-50 border-amber-300 shadow-sm' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-amber-600 rounded border-slate-300"
                      checked={incluirTransporte}
                      onChange={(e) => setIncluirTransporte(e.target.checked)}
                    />
                    <div>
                      <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Transporte Opcional</span>
                      <p className="text-[10px] text-slate-500 font-bold">+ {formatarMoeda(evento.valor_transporte)} no valor final</p>
                    </div>
                  </div>
                  <span className="text-lg">🚌</span>
                </label>
              )}

              <div className="space-y-3">
                {(evento.formas_pagamento || []).map(f => {
                  const isSelected = metodoPagamentoSelecionado === f.tipo;
                  return (
                    <div key={f.tipo} className="group">
                      <label className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${isSelected ? 'bg-white border-blue-500 shadow-md scale-[1.01]' : 'bg-white/50 border-slate-200 hover:border-blue-200'}`}>
                        <input 
                          type="radio" // Alterado para radio
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                          checked={isSelected}
                          onChange={() => {
                            setMetodoPagamentoSelecionado(f.tipo);
                            setAnswers(prev => ({ ...prev, "Forma de Pagamento": f.tipo }));
                          }}
                        />
                        <span className="text-xs font-black text-slate-700 uppercase tracking-wider">{f.tipo}</span>
                      </label>
                      {isSelected && (
                        <div className="mt-2 ml-7 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-2xl animate-in fade-in slide-in-from-top-1 duration-300 space-y-4">
                          {/* Botão de pagamento externo se houver link configurado */}
                          {f.link_pagamento && (
                            <div className="pb-4 border-b border-blue-100">
                              <p className="text-[10px] font-black text-blue-400 uppercase mb-2">Pagamento Online</p>
                              <button 
                                type="button"
                                onClick={() => window.open(f.link_pagamento, '_blank')}
                                className="w-full py-3 bg-blue-600 text-white rounded-xl text-[11px] font-black uppercase tracking-[0.15em] shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all"
                              >
                                💳 Pagar agora com {f.tipo}
                              </button>
                            </div>
                          )}
                          {f.permite_parcelas && (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pb-3 border-b border-blue-100">
                              <div className="shrink-0">
                                <p className="text-[10px] font-black text-blue-400 uppercase mb-1">Parcelamento</p>
                                <select 
                                  value={parcelas[f.tipo] || 1}
                                  onChange={(e) => handleParcelaChange(f.tipo, e.target.value)}
                                  className="bg-white border border-blue-200 rounded-lg px-2 py-1 text-xs font-bold text-blue-900 outline-none focus:ring-2 focus:ring-blue-500/20"
                                >
                                  {Array.from({ length: f.max_parcelas || 1 }, (_, i) => i + 1).map(n => (
                                    <option key={n} value={n}>{n}x</option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex-1">
                                <p className="text-[10px] font-black text-blue-400 uppercase mb-1">Valor da Parcela</p>
                                <p className="text-sm font-black text-blue-700">{formatarMoeda(valorTotal / (parcelas[f.tipo] || 1))}</p>
                              </div>
                            </div>
                          )}
                          <div>
                            <p className="text-[10px] font-black text-blue-400 uppercase mb-1">Instruções</p>
                            <p className="text-[11px] text-blue-900 font-medium whitespace-pre-wrap leading-relaxed">{f.instrucao || 'Nenhuma instrução fornecida.'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {(evento.formas_pagamento || []).length === 0 && (
                  <p className="text-xs text-slate-400 italic">Nenhuma forma de pagamento disponível.</p>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
             {(evento.campos_inscricao || []).map((campo, idx) => (
               <div key={idx} className="space-y-3">
                 <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block">
                    {campo.nome} {campo.obrigatorio && <span className="text-rose-500">*</span>}
                 </label>
                 
                 {campo.tipo === 'texto' && (
                    <input type="text" required={campo.obrigatorio} value={respostas[campo.nome] || ''} onChange={e => handleFieldChange(campo.nome, e.target.value)} className="w-full px-4 py-3.5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium" placeholder={`Digite seu ${campo.nome.toLowerCase()}`} />
                 )}

                 {campo.tipo === 'área de texto' && (
                    <textarea required={campo.obrigatorio} rows={4} value={respostas[campo.nome] || ''} onChange={e => handleFieldChange(campo.nome, e.target.value)} className="w-full px-4 py-3.5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none text-sm font-medium" placeholder={`Detalhes sobre ${campo.nome.toLowerCase()}`} />
                 )}

                 {campo.tipo === 'seleção' && (
                   <select required={campo.obrigatorio} value={respostas[campo.nome] || ''} onChange={e => handleFieldChange(campo.nome, e.target.value)} className="w-full px-4 py-3.5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none bg-white text-sm font-medium appearance-none">
                     <option value="">Escolha uma opção</option>
                     {(campo.opcoes || []).map(opt => <option key={opt.id} value={opt.label}>{opt.label}</option>)}
                   </select>
                 )}

                 {(campo.tipo === 'radio' || campo.tipo === 'checkbox') && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                       {(campo.opcoes || []).map(opt => (
                         <label key={opt.id} className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${respostas[campo.nome]?.includes(opt.label) || respostas[campo.nome] === opt.label ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-100 hover:border-slate-300 bg-slate-50/30'}`}>
                           <input type={campo.tipo} name={campo.nome} checked={campo.tipo === 'checkbox' ? (respostas[campo.nome] || []).includes(opt.label) : respostas[campo.nome] === opt.label} onChange={e => campo.tipo === 'checkbox' ? handleCheckboxChange(campo.nome, opt.label, e.target.checked) : handleFieldChange(campo.nome, opt.label)} className="w-4 h-4 text-blue-600" />
                           <span className="text-xs font-black text-slate-700 uppercase">{opt.label}</span>
                         </label>
                       ))}
                    </div>
                 )}
               </div>
             ))}

             <div className="pt-8 flex flex-col gap-6">
                <button type="submit" disabled={enviando} className="w-full py-5 bg-[#1e3a8a] text-white rounded-3xl font-black uppercase tracking-[0.25em] text-xs shadow-2xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                  {enviando ? 'Processando...' : 'Finalizar Inscrição'}
                </button>
                <p className="text-[9px] text-center text-slate-300 font-black uppercase tracking-[0.3em]">Ambiente Seguro · MIB Church</p>
             </div>
          </form>
        </Card>
      </div>
    </div>
  );
}