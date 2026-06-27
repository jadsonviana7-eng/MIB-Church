import { useState, useEffect, useMemo } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader } from './ui';
import { 
  UserPlus, Save, CheckCircle2, AlertCircle, RefreshCw, 
  Search, Trash2, Users, Phone, MapPin, Calendar, 
  MessageSquare, Eye, X, Star, Map, BookOpen
} from 'lucide-react';

export default function FormularioVisitante({ onVoltar }) {
  const [abaAtiva, setAbaAtiva] = useState('cadastro'); // 'cadastro' | 'lista'

  // Estados do formulário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [zonaId, setZonaId] = useState('');
  const [quantasVezes, setQuantasVezes] = useState('1ª vez');
  const [estaDePassagem, setEstaDePassagem] = useState(false);
  const [culto, setCulto] = useState('Domingo à Noite');
  const [outroCulto, setOutroCulto] = useState('');
  const [dataVisita, setDataVisita] = useState(new Date().toISOString().substring(0, 10));
  const [observacoes, setObservacoes] = useState('');
  
  // Estados da lista de visitantes
  const [visitantes, setVisitantes] = useState([]);
  const [carregandoVisitantes, setCarregandoVisitantes] = useState(false);
  const [busca, setBusca] = useState('');
  const [filtroCulto, setFiltroCulto] = useState('Todos');
  const [visitanteDetalhado, setVisitanteDetalhado] = useState(null);

  // Estados de metadados
  const [zonas, setZonas] = useState([]);
  const [carregandoZonas, setCarregandoZonas] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [statusEnvio, setStatusEnvio] = useState(null); // { type: 'success' | 'error', message: '...' }

  // Carregar zonas de moradia
  useEffect(() => {
    async function carregarZonas() {
      try {
        const { data, error } = await supabase
          .from('zonas_moradia')
          .select('id, nome')
          .order('nome');
        
        if (error) throw error;
        setZonas(data || []);
      } catch (err) {
        console.error('Erro ao carregar zonas:', err);
      } finally {
        setCarregandoZonas(false);
      }
    }
    carregarZonas();
  }, []);

  // Carregar lista de visitantes
  async function carregarVisitantes() {
    setCarregandoVisitantes(true);
    try {
      const { data, error } = await supabase
        .from('visitantes_culto')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVisitantes(data || []);
    } catch (err) {
      console.error('Erro ao carregar visitantes:', err);
    } finally {
      setCarregandoVisitantes(false);
    }
  }

  // Carrega ao alternar para a aba 'lista'
  useEffect(() => {
    if (abaAtiva === 'lista') {
      carregarVisitantes();
    }
  }, [abaAtiva]);

  // Formatador de celular: (99) 99999-9999
  function handleTelefoneChange(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    
    if (value.length > 6) {
      value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
    } else if (value.length > 2) {
      value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setTelefone(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim()) return;

    setEnviando(true);
    setStatusEnvio(null);

    const cultoFinal = culto === 'Outro' ? outroCulto.trim() : culto;

    try {
      const payload = {
        nome: nome.trim(),
        telefone: telefone.trim() || null,
        zona_id: zonaId ? parseInt(zonaId, 10) : null,
        quantas_vezes: quantasVezes,
        esta_de_passagem: estaDePassagem,
        observacoes: observacoes.trim() || null,
        data: dataVisita,
        culto: cultoFinal || 'Domingo'
      };

      const { error } = await supabase
        .from('visitantes_culto')
        .insert([payload]);

      if (error) throw error;

      // Sucesso!
      setStatusEnvio({
        type: 'success',
        message: `Ficha de ${nome.trim()} enviada com sucesso! Obrigado pelo cadastro.`
      });

      // Limpar formulário
      setNome('');
      setTelefone('');
      setZonaId('');
      setQuantasVezes('1ª vez');
      setEstaDePassagem(false);
      setCulto('Domingo à Noite');
      setOutroCulto('');
      setObservacoes('');
      setDataVisita(new Date().toISOString().substring(0, 10));

    } catch (err) {
      console.error(err);
      setStatusEnvio({
        type: 'error',
        message: 'Erro ao salvar visitante: ' + (err.message || 'Verifique as configurações do banco de dados.')
      });
    } finally {
      setEnviando(false);
    }
  }

  async function handleExcluir(id, nomeVisitante) {
    let confirmou = false;
    if (window.confirmModal) {
      confirmou = await window.confirmModal(
        'Confirmar Exclusão',
        `Deseja realmente excluir a ficha de visitante de "${nomeVisitante}"? Esta ação não pode ser desfeita.`
      );
    } else {
      confirmou = window.confirm(`Deseja realmente excluir a ficha de visitante de "${nomeVisitante}"?`);
    }

    if (!confirmou) return;

    try {
      const { error } = await supabase
        .from('visitantes_culto')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setVisitantes(prev => prev.filter(v => v.id !== id));
      if (visitanteDetalhado?.id === id) {
        setVisitanteDetalhado(null);
      }

      setStatusEnvio({
        type: 'success',
        message: `Ficha de ${nomeVisitante} excluída com sucesso.`
      });
    } catch (err) {
      console.error(err);
      setStatusEnvio({
        type: 'error',
        message: 'Erro ao excluir visitante: ' + err.message
      });
    }
  }

  // Filtragem local dos visitantes
  const visitantesFiltrados = useMemo(() => {
    return visitantes.filter((v) => {
      // Filtro de Busca
      const searchLower = busca.toLowerCase();
      const nomeMatch = v.nome?.toLowerCase().includes(searchLower);
      const telMatch = v.telefone?.includes(busca);
      const obsMatch = v.observacoes?.toLowerCase().includes(searchLower);
      const matchesSearch = !busca || nomeMatch || telMatch || obsMatch;

      // Filtro de Culto
      const matchesCulto = filtroCulto === 'Todos' || v.culto === filtroCulto;

      return matchesSearch && matchesCulto;
    });
  }, [visitantes, busca, filtroCulto]);

  // Estatísticas calculadas
  const stats = useMemo(() => {
    const total = visitantes.length;
    const primeiraVez = visitantes.filter(v => v.quantas_vezes === '1ª vez').length;
    const dePassagem = visitantes.filter(v => v.esta_de_passagem).length;
    return { total, primeiraVez, dePassagem };
  }, [visitantes]);

  // Obter nome da zona a partir do zona_id
  function obterNomeZona(id) {
    if (!id) return 'Não informada';
    const zona = zonas.find(z => String(z.id) === String(id));
    return zona ? zona.nome : 'Não informada';
  }

  return (
    <div className="max-w-4xl mx-auto pt-0 px-0 pb-12 sm:px-6 space-y-6 mx-[-3px] sm:mx-auto animate-in fade-in duration-300">
      
      {/* Cabeçalho */}
      <div className="mx-[3px] sm:mx-0 flex justify-between items-center">
        <PageHeader 
          titulo="Ficha de Visitante" 
          breadcrumb={['Utilitários', 'Recepção']} 
        />
        {onVoltar && (
          <button
            onClick={onVoltar}
            className="hidden sm:block px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-extrabold hover:bg-slate-50 transition cursor-pointer"
          >
            ← Voltar
          </button>
        )}
      </div>

      {/* Banner de Boas Vindas */}
      <div className="relative rounded-[24px] overflow-hidden p-6 md:p-8 bg-gradient-to-br from-pink-900 via-[#4c0519] to-[#3b0764] text-white shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] bg-rose-500/30 text-rose-200 px-3 py-1 rounded-full border border-rose-400/20">
            Recepção e Acolhimento
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">Amar é Servir com Acolhimento</h2>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
            Registre e gerencie a chegada de cada novo amigo da igreja. Essas informações nos ajudam a manter contato e integrá-los de forma calorosa.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shrink-0 text-center md:text-right max-w-[260px] hidden sm:block">
          <p className="text-xs italic text-rose-200 font-medium leading-relaxed">
            "Não vos esqueçais da hospitalidade, porque por ela alguns, não o sabendo, hospedaram anjos."
          </p>
          <span className="text-[10px] font-bold text-rose-300 uppercase block mt-2 tracking-widest">— Hebreus 13:2</span>
        </div>
      </div>

      {/* Abas Alternadoras */}
      <div className="flex border-b border-slate-100 px-1 gap-2">
        <button
          onClick={() => setAbaAtiva('cadastro')}
          className={`pb-3 px-4 text-xs font-black uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
            abaAtiva === 'cadastro'
              ? 'border-pink-600 text-pink-600'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <span className="flex items-center gap-2">
            <UserPlus className="w-3.5 h-3.5" />
            Cadastrar Novo
          </span>
        </button>
        <button
          onClick={() => setAbaAtiva('lista')}
          className={`pb-3 px-4 text-xs font-black uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
            abaAtiva === 'lista'
              ? 'border-pink-600 text-pink-600'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <span className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5" />
            Visitantes Registrados
          </span>
        </button>
      </div>

      {/* Banner de Mensagem de Retorno */}
      {statusEnvio && (
        <div className={`mx-[3px] sm:mx-0 p-4 rounded-2xl flex items-start gap-3 border animate-in fade-in duration-200 ${
          statusEnvio.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <div className="shrink-0 mt-0.5">
            {statusEnvio.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600" />
            )}
          </div>
          <div className="flex-1 text-xs font-semibold leading-relaxed">
            {statusEnvio.message}
          </div>
          <button 
            type="button" 
            onClick={() => setStatusEnvio(null)}
            className={`text-[10px] font-bold hover:opacity-75 transition-opacity px-2.5 py-1 rounded-lg border h-fit shrink-0 ${
              statusEnvio.type === 'success' ? 'border-emerald-300 bg-white text-emerald-700' : 'border-rose-300 bg-white text-rose-700'
            }`}
          >
            Fechar
          </button>
        </div>
      )}

      {/* ── ABA 1: FORMULÁRIO DE CADASTRO ── */}
      {abaAtiva === 'cadastro' && (
        <Card className="p-0 overflow-hidden rounded-3xl border border-slate-100 shadow-md bg-white">
          <CardHeader 
            titulo="Nova Ficha de Visitante" 
            subtitulo="Preencha os dados do visitante para que possamos entrar em contato e enviar boas-vindas." 
          />

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Nome */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                  Nome Completo <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome do visitante"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none text-sm text-slate-800 transition-all placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                  Telefone / WhatsApp
                </label>
                <input
                  type="text"
                  value={telefone}
                  onChange={handleTelefoneChange}
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none text-sm text-slate-800 transition-all placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Zona de Moradia */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                  Zona de Moradia / Bairro
                </label>
                <select
                  value={zonaId}
                  onChange={(e) => setZonaId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none text-sm text-slate-800 transition-all font-medium"
                  disabled={carregandoZonas}
                >
                  <option value="">Selecione uma região / zona</option>
                  {zonas.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.nome}
                    </option>
                  ))}
                </select>
                {carregandoZonas && (
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Carregando zonas...
                  </span>
                )}
              </div>

              {/* Culto */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                  Culto da Visita
                </label>
                <select
                  value={culto}
                  onChange={(e) => setCulto(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none text-sm text-slate-800 transition-all font-medium"
                >
                  <option value="Domingo à Noite">Domingo à Noite (19:00)</option>
                  <option value="Domingo de Manhã">Domingo de Manhã (09:00)</option>
                  <option value="Quinta-feira">Quinta-feira (19:30)</option>
                  <option value="Sábado / Evento">Sábado / Evento</option>
                  <option value="Outro">Outro Culto...</option>
                </select>
              </div>

              {/* Campo adicional para outro culto se selecionado */}
              {culto === 'Outro' && (
                <div className="space-y-2 md:col-span-2 animate-in slide-in-from-top-2 duration-200">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                    Especifique o Culto / Evento
                  </label>
                  <input
                    type="text"
                    required
                    value={outroCulto}
                    onChange={(e) => setOutroCulto(e.target.value)}
                    placeholder="Ex: Culto de Mulheres, Conferência Jovens"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none text-sm text-slate-800 transition-all placeholder:text-slate-400 font-medium"
                  />
                </div>
              )}

              {/* Frequência */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                  Frequência / Visitas
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['1ª vez', '2ª vez', '3ª vez ou mais'].map((op) => (
                    <button
                      key={op}
                      type="button"
                      onClick={() => setQuantasVezes(op)}
                      className={`py-3 rounded-2xl text-xs font-extrabold uppercase transition-all duration-200 cursor-pointer ${
                        quantasVezes === op
                          ? 'bg-rose-600 text-white shadow-md'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                  Data da Visita
                </label>
                <input
                  type="date"
                  required
                  value={dataVisita}
                  onChange={(e) => setDataVisita(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none text-sm text-slate-800 transition-all font-medium"
                />
              </div>
            </div>

            {/* Está de Passagem */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer group p-3.5 rounded-2xl border border-slate-100 hover:border-pink-100 hover:bg-pink-50/20 transition-all select-none">
                <input 
                  type="checkbox" 
                  checked={estaDePassagem} 
                  onChange={e => setEstaDePassagem(e.target.checked)} 
                  className="w-4.5 h-4.5 rounded border-slate-300 text-pink-600 focus:ring-pink-500/20 transition-all cursor-pointer" 
                />
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-slate-700 group-hover:text-pink-600 transition-colors">
                    Está de passagem na cidade?
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Marque se o visitante mora fora ou está apenas visitando a cidade temporariamente
                  </span>
                </div>
              </label>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                Observações / Detalhes Adicionais
              </label>
              <textarea
                rows="3"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none resize-none text-sm text-slate-800 transition-all placeholder:text-slate-400 font-medium"
                placeholder="Ex: Veio a convite de Fulano; pediu oração por saúde; mora perto da célula X..."
              />
            </div>

            {/* Ações */}
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="submit"
                disabled={enviando || !nome.trim()}
                className="px-8 py-3.5 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {enviando ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar Visitante
                  </>
                )}
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* ── ABA 2: LISTAGEM E DASHBOARD ── */}
      {abaAtiva === 'lista' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Dashboard Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block truncate">Total Visitantes</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-800">{stats.total}</span>
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:scale-110 transition-transform shrink-0">
                  <Users className="w-4.5 h-4.5" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block truncate">Primeira Vez</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-pink-600">{stats.primeiraVez}</span>
                <div className="w-8 h-8 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform shrink-0">
                  <Star className="w-4.5 h-4.5" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block truncate">De Passagem</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-purple-600">{stats.dePassagem}</span>
                <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform shrink-0">
                  <Map className="w-4.5 h-4.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Filtros e Busca */}
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por nome, telefone ou observações..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all"
              />
            </div>
            <div className="sm:w-56">
              <select
                value={filtroCulto}
                onChange={(e) => setFiltroCulto(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-xs font-bold text-slate-700 focus:bg-white transition-all"
              >
                <option value="Todos">Todos os Cultos</option>
                <option value="Domingo à Noite">Domingo à Noite (19:00)</option>
                <option value="Domingo de Manhã">Domingo de Manhã (09:00)</option>
                <option value="Quinta-feira">Quinta-feira (19:30)</option>
                <option value="Sábado / Evento">Sábado / Evento</option>
              </select>
            </div>
          </div>

          {/* Lista de Registros */}
          {carregandoVisitantes ? (
            <div className="py-12 text-center text-slate-400 flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-pink-600" />
              <span className="text-xs font-bold uppercase tracking-widest">Carregando visitantes...</span>
            </div>
          ) : visitantesFiltrados.length === 0 ? (
            <div className="bg-white py-12 rounded-3xl border border-slate-100 shadow-sm text-center text-slate-400 italic text-xs">
              Nenhum visitante cadastrado corresponde aos filtros.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visitantesFiltrados.map((v) => (
                <div 
                  key={v.id}
                  onClick={() => setVisitanteDetalhado(v)}
                  className="bg-white p-5 rounded-3xl border border-slate-100 hover:border-pink-200 hover:shadow-lg transition-all duration-300 flex justify-between items-start cursor-pointer group"
                >
                  <div className="space-y-2 min-w-0 flex-1 pr-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-extrabold text-slate-800 text-sm truncate">{v.nome}</h4>
                      {v.esta_de_passagem && (
                        <span className="text-[8px] bg-purple-50 border border-purple-200 text-purple-600 px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider shrink-0">
                          De Passagem
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {obterNomeZona(v.zona_id)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {v.culto} ({v.quantas_vezes})
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {new Date(v.data + 'T12:00:00').toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-center">
                    {/* Botão de abrir detalhes */}
                    <button
                      type="button"
                      title="Ver Detalhes"
                      onClick={(e) => {
                        e.stopPropagation();
                        setVisitanteDetalhado(v);
                      }}
                      className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Botão de Excluir */}
                    <button
                      type="button"
                      title="Excluir Visitante"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExcluir(v.id, v.nome);
                      }}
                      className="w-9 h-9 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-rose-500 hover:bg-rose-100 hover:text-rose-700 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── MODAL DE DETALHES DO VISITANTE ── */}
      {visitanteDetalhado && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[28px] max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-pink-800 to-purple-800 text-white flex justify-between items-start shrink-0">
              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-white/20 text-white px-2.5 py-0.5 rounded-full block w-fit mb-1 border border-white/10">
                  Ficha Completa
                </span>
                <h3 className="text-lg font-extrabold tracking-tight">{visitanteDetalhado.nome}</h3>
              </div>
              <button 
                onClick={() => setVisitanteDetalhado(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition cursor-pointer shrink-0"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto">
              
              {/* Informações Básicas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  <span className="text-[9px] font-black text-slate-400 uppercase block tracking-wider">Zona de Moradia</span>
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    {obterNomeZona(visitanteDetalhado.zona_id)}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  <span className="text-[9px] font-black text-slate-400 uppercase block tracking-wider">Frequência</span>
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mt-1">
                    <Star className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    {visitanteDetalhado.quantas_vezes}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  <span className="text-[9px] font-black text-slate-400 uppercase block tracking-wider">Culto da Visita</span>
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mt-1">
                    <BookOpen className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    {visitanteDetalhado.culto}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  <span className="text-[9px] font-black text-slate-400 uppercase block tracking-wider">Data da Visita</span>
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    {new Date(visitanteDetalhado.data + 'T12:00:00').toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>

              {/* Status de passagem */}
              {visitanteDetalhado.esta_de_passagem && (
                <div className="p-3.5 bg-purple-50 border border-purple-100 text-purple-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
                  <span className="shrink-0 text-base">✈️</span>
                  <span>Este visitante está temporariamente de passagem na cidade.</span>
                </div>
              )}

              {/* Contato do Telefone */}
              {visitanteDetalhado.telefone && (
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Contato WhatsApp</span>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl text-xs font-bold text-slate-700 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {visitanteDetalhado.telefone}
                    </div>
                    <a
                      href={`https://wa.me/55${visitanteDetalhado.telefone.replace(/\D/g, '')}?text=${encodeURIComponent(
                        `Olá ${visitanteDetalhado.nome.split(' ')[0]}! Que alegria ter você conosco no culto de ${visitanteDetalhado.culto} na MIB Church. Queremos agradecer a sua visita e nos colocar à disposição!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition active:scale-95 shadow-md shadow-emerald-100"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Acolher WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {/* Observações */}
              <div className="space-y-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Observações da Recepção</span>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs font-medium text-slate-600 leading-relaxed italic">
                  {visitanteDetalhado.observacoes ? (
                    `"${visitanteDetalhado.observacoes}"`
                  ) : (
                    'Nenhuma observação cadastrada.'
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center shrink-0">
              <button
                type="button"
                onClick={() => handleExcluir(visitanteDetalhado.id, visitanteDetalhado.nome)}
                className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-extrabold uppercase rounded-xl transition cursor-pointer"
              >
                Excluir Cadastro
              </button>
              <button
                type="button"
                onClick={() => setVisitanteDetalhado(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase rounded-xl tracking-wider transition active:scale-95 cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
