import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from './supabaseClient';
import { Card, PageHeader, Avatar } from './ui';
import ModalLancarReuniao from './ModalLancarReuniao';
import {
  Calendar, Gift, Wallet, Music, Heart,
  ArrowRight, Sparkles, ChevronRight, CheckCircle2, 
  ShieldAlert, Users, MessageSquare, Plus, UserPlus, BookOpen, ExternalLink
} from 'lucide-react';
import { normalizarTexto } from './churchUtils';

export default function DashboardLider({
  membroLogado,
  pessoas,
  celulas,
  relatoriosCelula,
  reunioesVistas,
  onNavigate,
  isLiderMinisterio,
  obterDados,
  onVerMembro,
  onVerPerfil
}) {
  const [avisos, setAvisos] = useState([]);
  const [proximasEscalas, setProximasEscalas] = useState([]);
  const [ultimasContribuicoes, setUltimasContribuicoes] = useState([]);
  const [visitantes, setVisitantes] = useState([]);
  const [carregandoVisitantes, setCarregandoVisitantes] = useState(false);
  const [loading, setLoading] = useState(true);
  const [avisoAtivoIdx, setAvisoAtivoIdx] = useState(0);

  // Modais de Criação Rápida
  const [isModalReuniaoAberto, setIsModalReuniaoAberto] = useState(false);
  const [isModalVisitanteAberto, setIsModalVisitanteAberto] = useState(false);
  const [isModalParticipanteAberto, setIsModalParticipanteAberto] = useState(false);

  // Formulários locais
  const [formVisitante, setFormVisitante] = useState({ nome: '', telefone: '', endereco: '' });
  const [salvandoVisitante, setSalvandoVisitante] = useState(false);

  const [formParticipante, setFormParticipante] = useState({
    nome: '',
    telefone: '',
    email: '',
    genero: '',
    data_nascimento: ''
  });
  const [salvandoParticipante, setSalvandoParticipante] = useState(false);

  // Estados de busca de participante existente
  const [pesquisaMembros, setPesquisaMembros] = useState([]);
  const [buscandoMembros, setBuscandoMembros] = useState(false);
  const [membroSelecionado, setMembroSelecionado] = useState(null);

  // Busca debotada de membros existentes
  useEffect(() => {
    if (membroSelecionado) {
      setPesquisaMembros([]);
      return;
    }
    const nome = formParticipante.nome;
    if (nome.trim().length < 3) {
      setPesquisaMembros([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setBuscandoMembros(true);
      try {
        const { data, error } = await supabase.rpc('buscar_pessoas_para_celula', {
          termo_busca: nome.trim()
        });
        if (error) throw error;
        setPesquisaMembros(data || []);
      } catch (err) {
        console.error("Erro ao buscar membros:", err);
      } finally {
        setBuscandoMembros(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [formParticipante.nome, membroSelecionado]);

  // Célula liderada pelo usuário
  const minhaCelula = useMemo(() => {
    if (!membroLogado?.id || celulas.length === 0) return null;
    return celulas.find(c => 
      String(c.lider_id || '') === String(membroLogado.id) ||
      String(c.co_lider_id || '') === String(membroLogado.id)
    );
  }, [membroLogado, celulas]);

  // Membros cadastrados na célula do líder
  const membrosCelula = useMemo(() => {
    if (!minhaCelula) return [];
    return pessoas.filter(p => String(p.celula_id || '') === String(minhaCelula.id) && p.status !== 'inativo');
  }, [minhaCelula, pessoas]);

  // Relatórios de reunião desta célula
  const reunioesCelula = useMemo(() => {
    if (!minhaCelula) return [];
    return relatoriosCelula.filter(r => String(r.celula_id || '') === String(minhaCelula.id));
  }, [minhaCelula, relatoriosCelula]);

  // Rotação automática de Avisos
  useEffect(() => {
    if (avisos.length <= 1) return;
    const interval = setInterval(() => {
      setAvisoAtivoIdx((prev) => (prev + 1) % avisos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [avisos.length]);

  const handleResponderEscala = async (escalaId, novoStatus) => {
    try {
      const { error } = await supabase
        .from('escalas')
        .update({ status: novoStatus })
        .eq('id', escalaId);

      if (error) throw error;
      await carregarDadosDashboard();
    } catch (err) {
      window.alert("Erro ao responder escala: " + err.message);
    }
  };

  // Carrega os dados locais do dashboard do líder
  async function carregarDadosDashboard() {
    if (!membroLogado?.id) return;
    setLoading(true);
    try {
      const hojeIso = new Date().toISOString().split('T')[0];

      // 1. Carregar Avisos Ativos
      const { data: avisosRaw, error: errAvisos } = await supabase
        .from('mural_avisos')
        .select('*')
        .eq('ativo', true)
        .order('prioridade', { ascending: false });

      if (errAvisos) console.error("Erro ao carregar avisos:", errAvisos);

      const avisosData = (avisosRaw || []).filter(aviso => {
        if (!aviso.data_expiracao) return true;
        return aviso.data_expiracao >= hojeIso;
      });
      setAvisos(avisosData);

      // 2. Carregar Próximas Escalas do Líder (Buscando de escalas em Gestão Ministerial)
      const { data: escalasRaw, error: errEscalas } = await supabase
        .from('escalas')
        .select(`
          id,
          status,
          eventos_ministeriais!inner(
            titulo,
            data_evento
          ),
          ministerio_funcoes(
            nome
          )
        `)
        .eq('pessoa_id', membroLogado.id)
        .gte('eventos_ministeriais.data_evento', hojeIso);

      if (errEscalas) {
        console.error("Erro ao carregar escalas do Gestor Ministerial:", errEscalas);
        setProximasEscalas([]);
      } else {
        const escalasFormatadas = (escalasRaw || [])
          .map(esc => ({
            id: esc.id,
            status: esc.status || 'confirmado',
            data: esc.eventos_ministeriais?.data_evento,
            tipo_escala: esc.eventos_ministeriais?.titulo || 'Evento',
            funcao: esc.ministerio_funcoes?.nome || 'Voluntário'
          }))
          .sort((a, b) => new Date(a.data) - new Date(b.data))
          .slice(0, 3);
        setProximasEscalas(escalasFormatadas);
      }

      // 3. Carregar Minhas Contribuições Financeiras Pessoais
      const { data: financeiroData, error: errFin } = await supabase
        .from('transacoes_financeiras')
        .select('id, data, valor, descricao, tipo')
        .eq('pessoa_id', membroLogado.id)
        .in('tipo', ['receita', 'entrada', 'RECEITA', 'ENTRADA'])
        .order('data', { ascending: false })
        .limit(5);

      if (errFin) console.error("Erro ao carregar transações financeiras:", errFin);
      setUltimasContribuicoes(financeiroData || []);

      // 4. Carregar Visitantes da Célula
      if (minhaCelula?.id) {
        setCarregandoVisitantes(true);
        const { data: visitantesRaw, error: errVis } = await supabase
          .from('visitantes')
          .select('*')
          .eq('celula_id', minhaCelula.id)
          .order('nome');

        if (errVis) console.error("Erro ao carregar visitantes:", errVis);
        setVisitantes(visitantesRaw || []);
        setCarregandoVisitantes(false);
      }
    } catch (err) {
      console.error("Erro ao carregar dados do dashboard do líder:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDadosDashboard();
  }, [membroLogado, minhaCelula?.id]);

  // Formatar Telefone
  function handleTelefoneChange(e, setForm) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    if (value.length > 6) {
      value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
    } else if (value.length > 2) {
      value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setForm(prev => ({ ...prev, telefone: value }));
  }

  // Enviar formulário de Visitante
  async function handleSalvarVisitante(e) {
    e.preventDefault();
    if (!formVisitante.nome.trim() || !minhaCelula) return;
    setSalvandoVisitante(true);
    const payload = {
      celula_id: minhaCelula.id,
      nome: formVisitante.nome.trim(),
      telefone: formVisitante.telefone.replace(/\D/g, '') || null,
      endereco: formVisitante.endereco.trim() || null
    };
    try {
      const { error } = await supabase.from('visitantes').insert([payload]);
      if (error) throw error;
      setFormVisitante({ nome: '', telefone: '', endereco: '' });
      setIsModalVisitanteAberto(false);
      carregarDadosDashboard();
    } catch (err) {
      window.alert('Erro ao cadastrar visitante: ' + err.message);
    } finally {
      setSalvandoVisitante(false);
    }
  }

  async function handleSalvarParticipante(e) {
    e.preventDefault();
    if (!formParticipante.nome.trim() || !minhaCelula) return;
    setSalvandoParticipante(true);
    
    try {
      if (membroSelecionado) {
        // Apenas vincula o membro existente à célula do líder
        const { error } = await supabase
          .from('pessoas')
          .update({ celula_id: minhaCelula.id })
          .eq('id', membroSelecionado.id);
        
        if (error) throw error;
      } else {
        // Cria um novo participante do zero
        const payload = {
          nome: formParticipante.nome.trim(),
          telefone: formParticipante.telefone.replace(/\D/g, '') || null,
          email: formParticipante.email.trim() || null,
          genero: formParticipante.genero || null,
          data_nascimento: formParticipante.data_nascimento || null,
          celula_id: minhaCelula.id,
          status: 'ativo',
          tipo_membro: 'membro'
        };
        const { error } = await supabase.from('pessoas').insert([payload]);
        if (error) throw error;
      }
      
      setFormParticipante({ nome: '', telefone: '', email: '', genero: '', data_nascimento: '' });
      setMembroSelecionado(null);
      setIsModalParticipanteAberto(false);
      obterDados(); // recarrega pessoas visiveis
    } catch (err) {
      window.alert('Erro ao incluir participante: ' + err.message);
    } finally {
      setSalvandoParticipante(false);
    }
  }

  const formatarDataLocal = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  };

  const linkWhatsapp = (tel) => {
    if (!tel) return '';
    const clean = tel.replace(/\D/g, '');
    return `https://wa.me/55${clean}`;
  };

  if (!minhaCelula) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-lg mx-auto text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
          <ShieldAlert size={32} />
        </div>
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Célula Não Vinculada</h3>
        <p className="text-sm text-slate-500">
          Você está registrado com permissão de liderança, mas não foi vinculado como líder na tabela de células. Peça para a secretaria ou pastor configurar sua célula.
        </p>
        <button
          onClick={onVerPerfil}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer"
        >
          Ver Meu Perfil
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500 relative">

      {/* HEADER DE BOAS VINDAS E AVISOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Banner de Boas Vindas */}
        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6] text-white p-6 md:p-8 shadow-xl flex items-center justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles size={120} />
          </div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/20 overflow-hidden shadow-lg shrink-0">
              {membroLogado?.foto_url ? (
                <img src={membroLogado.foto_url} alt={membroLogado.nome} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-white/10 flex items-center justify-center font-black text-2xl">
                  {membroLogado?.nome?.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">
                Painel da Liderança
              </p>
              <h2 className="text-xl md:text-2xl font-black tracking-tight">
                Líder da Célula {minhaCelula.nome}
              </h2>
              <p className="text-blue-100/80 text-[11px] font-medium mt-1">
                {membroLogado.nome}
              </p>
            </div>
          </div>
        </div>

        {/* Mural de Avisos Mini */}
        <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm relative flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3 text-slate-400">
            <ShieldAlert size={14} className="text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">Avisos da Igreja</span>
          </div>

          {avisos.length > 0 ? (
            <div className="relative h-28 rounded-xl overflow-hidden w-full">
              {avisos.map((aviso, idx) => {
                const hasLink = !!aviso.link_externo;
                return (
                  <div
                    key={aviso.id}
                    onClick={hasLink ? () => window.open(aviso.link_externo, '_blank', 'noopener,noreferrer') : undefined}
                    className={`absolute inset-0 transition-all duration-700 w-full h-full ${
                      idx === avisoAtivoIdx ? 'opacity-100 z-10' : 'opacity-0 -z-10'
                    } ${hasLink ? 'cursor-pointer hover:opacity-95' : ''}`}
                  >
                    {aviso.imagem_url ? (
                      <img src={aviso.imagem_url} alt={aviso.titulo} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-50 p-3 flex flex-col justify-center">
                        <h4 className="font-bold text-xs text-slate-800 line-clamp-1">{aviso.titulo}</h4>
                        <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                          {aviso.subtitulo || (aviso.conteudo_html ? aviso.conteudo_html.replace(/<[^>]+>/g, '') : '')}
                        </p>
                      </div>
                    )}
                    {aviso.imagem_url && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                        <h4 className="font-bold text-xs text-white line-clamp-1">{aviso.titulo}</h4>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-slate-400 text-xs italic opacity-70">
              Nenhum aviso no momento.
            </div>
          )}

          {avisos.length > 1 && (
            <div className="flex justify-center gap-1 mt-2">
              {avisos.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === avisoAtivoIdx ? 'bg-blue-500 w-3' : 'bg-slate-200'}`} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm flex flex-col justify-between">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users size={18} />
          </div>
          <div className="mt-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Membros</span>
            <span className="text-xl font-black text-slate-800 block mt-0.5">{membrosCelula.length}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm flex flex-col justify-between">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <UserPlus size={18} />
          </div>
          <div className="mt-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Visitantes</span>
            <span className="text-xl font-black text-slate-800 block mt-0.5">{visitantes.length}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm flex flex-col justify-between">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <BookOpen size={18} />
          </div>
          <div className="mt-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Reuniões</span>
            <span className="text-xl font-black text-slate-800 block mt-0.5">{reunioesCelula.length}</span>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS SECTION */}
      <div>
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Ações Rápidas da Célula</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setIsModalReuniaoAberto(true)}
            className="group bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-blue-200 hover:shadow-md transition-all active:scale-95 cursor-pointer text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-slate-700">Lançar Reunião</span>
          </button>

          <button
            onClick={() => setIsModalVisitanteAberto(true)}
            className="group bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-amber-200 hover:shadow-md transition-all active:scale-95 cursor-pointer text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UserPlus size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-slate-700">Cadastrar Visitante</span>
          </button>

          <button
            onClick={() => setIsModalParticipanteAberto(true)}
            className="group bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-indigo-200 hover:shadow-md transition-all active:scale-95 cursor-pointer text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-slate-700">Novo Participante</span>
          </button>

          <button
            onClick={() => onNavigate('celulas')}
            className="group bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-slate-200 hover:shadow-md transition-all active:scale-95 cursor-pointer text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowRight size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-slate-700">Minha Célula</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Coluna 1 & 2: Membros e Visitantes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lista de Membros da Célula */}
          <Card className="p-0 overflow-hidden border-slate-100 shadow-sm rounded-3xl">
            <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="text-indigo-600" size={18} />
                <h4 className="font-black text-xs text-slate-800 uppercase tracking-widest">Participantes Cadastrados</h4>
              </div>
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{membrosCelula.length} total</span>
            </div>
            <div className="p-4 divide-y divide-slate-50 max-h-[350px] overflow-y-auto custom-scrollbar">
              {membrosCelula.length > 0 ? (
                membrosCelula.map(membro => (
                  <div key={membro.id} className="flex items-center justify-between py-3 bg-white">
                    <div className="flex items-center gap-3 min-w-0" onClick={() => onVerMembro(membro.id)}>
                      <Avatar pessoa={membro} tamanho="w-8 h-8" />
                      <div className="min-w-0 cursor-pointer">
                        <p className="text-xs font-bold text-slate-800 hover:text-blue-600 truncate">{membro.nome}</p>
                        <p className="text-[10px] text-slate-400">{membro.telefone ? `(${membro.telefone.substring(0,2)}) ${membro.telefone.substring(2,7)}-${membro.telefone.substring(7)}` : 'Sem telefone'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {membro.telefone && (
                        <a
                          href={linkWhatsapp(membro.telefone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 hover:bg-slate-50 rounded-lg text-emerald-600 transition flex items-center gap-1 border border-slate-100 text-[10px] font-bold"
                        >
                          WhatsApp
                        </a>
                      )}
                      <button
                        onClick={() => onVerMembro(membro.id)}
                        className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 transition"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-xs text-slate-400 italic">Nenhum participante ativo cadastrado na sua célula.</p>
                </div>
              )}
            </div>
          </Card>

          {/* Lista de Visitantes Cadastrados */}
          <Card className="p-0 overflow-hidden border-slate-100 shadow-sm rounded-3xl">
            <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="text-amber-600" size={18} />
                <h4 className="font-black text-xs text-slate-800 uppercase tracking-widest">Visitantes da Célula</h4>
              </div>
              <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">{visitantes.length} total</span>
            </div>
            <div className="p-4 divide-y divide-slate-50 max-h-[300px] overflow-y-auto custom-scrollbar">
              {carregandoVisitantes ? (
                <div className="animate-pulse py-4 h-16 bg-slate-50 rounded-xl"></div>
              ) : visitantes.length > 0 ? (
                visitantes.map(vis => (
                  <div key={vis.id} className="flex items-center justify-between py-2 bg-white">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{vis.nome}</p>
                      {vis.telefone && <p className="text-[10px] text-slate-400">{vis.telefone}</p>}
                    </div>
                    {vis.telefone && (
                      <a
                        href={linkWhatsapp(vis.telefone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-slate-50 rounded-lg text-emerald-600 transition flex items-center gap-1 border border-slate-100 text-[10px] font-bold"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-xs text-slate-400 italic">Nenhum visitante cadastrado nesta célula.</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Coluna 3: Escalas e Contribuições */}
        <div className="space-y-6">
          {/* Próximas Escalas */}
          <Card className="p-0 overflow-hidden border-slate-100 shadow-sm rounded-3xl">
            <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="text-blue-600" size={18} />
                <h4 className="font-black text-xs text-slate-800 uppercase tracking-widest">Minhas Próximas Escalas</h4>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {loading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-12 bg-slate-100 rounded-xl"></div>
                </div>
              ) : proximasEscalas.length > 0 ? (
                proximasEscalas.map(esc => (
                  <div key={esc.id} className="flex flex-col p-3 rounded-xl border border-slate-100 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex flex-col items-center justify-center shrink-0">
                        <span className="text-[9px] font-black uppercase">{new Date(esc.data).toLocaleString('pt-BR', { month: 'short' })}</span>
                        <span className="text-sm font-black leading-none">{new Date(esc.data).getDate()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{esc.tipo_escala}</p>
                        <div className="text-[10px] text-slate-400 truncate flex items-center gap-1.5 flex-wrap mt-0.5">
                          <span>Função: <span className="font-bold text-slate-600">{esc.funcao || 'Voluntário'}</span></span>
                          {esc.status === 'confirmado' && (
                            <span className="text-[8px] font-black uppercase bg-emerald-50 text-emerald-600 px-1 rounded-md border border-emerald-100">Confirmado</span>
                          )}
                          {esc.status === 'recusado' && (
                            <span className="text-[8px] font-black uppercase bg-rose-50 text-rose-600 px-1 rounded-md border border-rose-100">Recusado</span>
                          )}
                          {esc.status === 'pendente' && (
                            <span className="text-[8px] font-black uppercase bg-amber-50 text-amber-600 px-1 rounded-md border border-amber-100">Pendente</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {esc.status === 'pendente' && (
                      <div className="flex gap-2 mt-3 pt-2.5 border-t border-slate-50">
                        <button
                          type="button"
                          onClick={() => handleResponderEscala(esc.id, 'confirmado')}
                          className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[9px] font-black uppercase tracking-wider transition cursor-pointer text-center"
                        >
                          Confirmar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleResponderEscala(esc.id, 'recusado')}
                          className="flex-1 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-[9px] font-black uppercase tracking-wider transition cursor-pointer text-center"
                        >
                          Recusar
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-xs text-slate-400 italic">Você não possui escalas futuras programadas.</p>
                </div>
              )}
              {isLiderMinisterio && (
                <button
                  onClick={() => onNavigate('gestao')}
                  className="w-full mt-2 py-2 text-[10px] font-bold text-blue-600 uppercase tracking-wider hover:bg-blue-50 rounded-lg transition border border-dashed border-blue-200"
                >
                  Gerenciar Escalas
                </button>
              )}
            </div>
          </Card>

          {/* Minhas Contribuições (Pessoais) */}
          <Card className="p-0 overflow-hidden border-slate-100 shadow-sm rounded-3xl">
            <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="text-emerald-600" size={18} />
                <h4 className="font-black text-xs text-slate-800 uppercase tracking-widest">Minhas Contribuições</h4>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {loading ? (
                <div className="animate-pulse h-20 bg-slate-100 rounded-xl"></div>
              ) : ultimasContribuicoes.length > 0 ? (
                ultimasContribuicoes.map(trans => (
                  <div key={trans.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{trans.descricao || 'Contribuição'}</p>
                      <p className="text-[10px] text-slate-400">{formatarDataLocal(trans.data)}</p>
                    </div>
                    <p className="text-sm font-black text-emerald-600">
                      R$ {Number(trans.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-xs text-slate-400 italic">Nenhuma contribuição pessoal encontrada.</p>
                </div>
              )}
            </div>
          </Card>
        </div>

      </div>

      {/* ── MODAIS ── */}

      {/* Modal Lançar Reunião */}
      {isModalReuniaoAberto && (
        <ModalLancarReuniao
          celulas={celulas}
          pessoas={pessoas}
          celulaInicial={minhaCelula.id}
          onFechar={() => setIsModalReuniaoAberto(false)}
          onSalvo={() => {
            setIsModalReuniaoAberto(false);
            obterDados();
            carregarDadosDashboard();
          }}
        />
      )}

      {/* Modal Novo Visitante */}
      {isModalVisitanteAberto && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in duration-300 relative">
            <h3 className="text-base font-black text-slate-800 uppercase tracking-tight mb-4 flex items-center gap-2">
              <UserPlus className="text-amber-500" size={18} />
              Cadastrar Novo Visitante
            </h3>
            <form onSubmit={handleSalvarVisitante} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={formVisitante.nome}
                  onChange={e => setFormVisitante(prev => ({ ...prev, nome: e.target.value }))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  placeholder="Nome do visitante"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Telefone / Celular</label>
                <input
                  type="text"
                  value={formVisitante.telefone}
                  onChange={e => handleTelefoneChange(e, setFormVisitante)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  placeholder="(99) 99999-9999"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Endereço Residencial</label>
                <input
                  type="text"
                  value={formVisitante.endereco}
                  onChange={e => setFormVisitante(prev => ({ ...prev, endereco: e.target.value }))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  placeholder="Rua, número, bairro..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalVisitanteAberto(false)}
                  className="px-4 py-2 border border-slate-100 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvandoVisitante}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center gap-1 cursor-pointer"
                >
                  {salvandoVisitante ? 'Salvando...' : 'Salvar Visitante'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Incluir Participante */}
      {isModalParticipanteAberto && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in duration-300 relative">
            <h3 className="text-base font-black text-slate-800 uppercase tracking-tight mb-4 flex items-center gap-2">
              <Users className="text-indigo-500" size={18} />
              Incluir Novo Participante
            </h3>
            <form onSubmit={handleSalvarParticipante} className="space-y-4">
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={formParticipante.nome}
                  onChange={e => {
                    const val = e.target.value;
                    setFormParticipante(prev => ({ ...prev, nome: val }));
                    if (membroSelecionado && val !== membroSelecionado.nome) {
                      setMembroSelecionado(null);
                    }
                  }}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Digite para buscar ou cadastrar..."
                  autoComplete="off"
                />
                
                {buscandoMembros && (
                  <div className="absolute right-3 top-7 text-[9px] text-slate-400 font-bold uppercase tracking-wider">Buscando...</div>
                )}

                {pesquisaMembros.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto divide-y divide-slate-50">
                    {pesquisaMembros.map(m => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setMembroSelecionado(m);
                          setFormParticipante({
                            nome: m.nome,
                            telefone: m.telefone || '',
                            email: m.email || '',
                            genero: '',
                            data_nascimento: ''
                          });
                          setPesquisaMembros([]);
                        }}
                        className="p-3 hover:bg-slate-50 cursor-pointer text-left transition"
                      >
                        <p className="text-xs font-bold text-slate-800">{m.nome}</p>
                        <p className="text-[9px] text-slate-400 flex flex-wrap items-center gap-1.5 mt-0.5">
                          {m.telefone && <span>{m.telefone}</span>}
                          {m.email && <span>· {m.email}</span>}
                          {m.celula_nome ? (
                            <span className="bg-amber-50 text-amber-600 font-bold px-1.5 py-0.5 rounded text-[8px]">
                              Célula: {m.celula_nome}
                            </span>
                          ) : (
                            <span className="bg-emerald-50 text-emerald-600 font-bold px-1.5 py-0.5 rounded text-[8px]">
                              Sem célula
                            </span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {membroSelecionado && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-700 flex items-center justify-between animate-in slide-in-from-top-2 duration-200">
                  <div className="min-w-0">
                    <p className="font-bold">Membro Cadastrado Selecionado</p>
                    <p className="text-[10px] text-indigo-500 truncate">Este participante será vinculado à sua célula.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMembroSelecionado(null);
                      setFormParticipante({ nome: '', telefone: '', email: '', genero: '', data_nascimento: '' });
                    }}
                    className="text-[10px] font-bold text-rose-500 uppercase hover:bg-rose-50 px-2 py-1 rounded cursor-pointer"
                  >
                    Desvincular
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Celular</label>
                  <input
                    type="text"
                    disabled={membroSelecionado !== null}
                    value={formParticipante.telefone}
                    onChange={e => handleTelefoneChange(e, setFormParticipante)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none disabled:opacity-60"
                    placeholder="(99) 99999-9999"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Gênero</label>
                  <select
                    disabled={membroSelecionado !== null}
                    value={formParticipante.genero}
                    onChange={e => setFormParticipante(prev => ({ ...prev, genero: e.target.value }))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none disabled:opacity-60"
                  >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">E-mail</label>
                <input
                  type="email"
                  disabled={membroSelecionado !== null}
                  value={formParticipante.email}
                  onChange={e => setFormParticipante(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none disabled:opacity-60"
                  placeholder="exemplo@igreja.com"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Data de Nascimento</label>
                <input
                  type="date"
                  disabled={membroSelecionado !== null}
                  value={formParticipante.data_nascimento}
                  onChange={e => setFormParticipante(prev => ({ ...prev, data_nascimento: e.target.value }))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none disabled:opacity-60"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMembroSelecionado(null);
                    setFormParticipante({ nome: '', telefone: '', email: '', genero: '', data_nascimento: '' });
                    setPesquisaMembros([]);
                    setIsModalParticipanteAberto(false);
                  }}
                  className="px-4 py-2 border border-slate-100 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvandoParticipante}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center gap-1 cursor-pointer"
                >
                  {salvandoParticipante ? 'Salvando...' : 'Salvar Participante'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
