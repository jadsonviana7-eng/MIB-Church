import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader } from './ui';
import {
  mascaraTelefone,
  mascaraCNPJ,
  desmascararTelefone,
  desmascararCNPJ
} from './mascaras';
import {
  Building2, MapPin, Briefcase, CreditCard, Search, X, Check, Trash2, Edit2, Palette, Sun, Moon, Globe, Activity
} from 'lucide-react';
import { aplicarTema } from './themeUtils';

// Dicionário de Tradução de Exemplo para a tela de configurações (Proof of Concept i18n)
const t = {
  pt: {
    configuracoes: "Configurações do Sistema",
    subtitulo: "Gerencie as informações institucionais, localizações, atuações e parâmetros financeiros.",
    voltar: "Voltar ao Dashboard",
    categorias: "Categorias",
    institucional: "Institucional",
    localizacao: "Localização & Zonas",
    atuacoes: "Campos de Atuação",
    financeiro: "Financeiro & Carnê",
    aparencia: "Aparência",
    salvar: "Salvar",
    salvando: "Salvando...",
    excluir: "Excluir",
    editar: "Editar",
    adicionar: "Adicionar",
    limpar: "Limpar",
    nomeIgreja: "Nome da Igreja",
    pastorLocal: "Pastor Local / Responsável",
    cnpj: "CNPJ",
    telefone: "Telefone",
    email: "E-mail de Contato",
    logo: "Logotipo da Igreja",
    logoSub: "Insira a URL de uma imagem válida (PNG, JPG) para cabeçalhos e relatórios.",
    enderecoLogradouro: "Endereço / Logradouro",
    numero: "Número",
    bairro: "Bairro",
    cidade: "Cidade",
    estado: "Estado (UF)",
    cep: "CEP",
    instrucoesCarne: "Instruções de Pagamento",
    localPagamento: "Local de Pagamento Padrão",
    formasPagamento: "Formas de Pagamento",
    aparenciaTitulo: "Preferências Visuais",
    aparenciaSub: "Personalize o tema, a cor principal de destaque e o idioma de exibição do sistema.",
    modoInterface: "Modo da Interface",
    claro: "Modo Claro",
    escuro: "Modo Escuro",
    corDestaque: "Cor de Destaque",
    idiomaSelecionado: "Idioma do Sistema",
    idiomaAjuda: "Selecione o idioma padrão para os menus e formulários.",
    selecioneCor: "Escolha uma cor de destaque para os botões e detalhes do sistema."
  },
  en: {
    configuracoes: "System Settings",
    subtitulo: "Manage institutional information, locations, roles, and financial parameters.",
    voltar: "Back to Dashboard",
    categorias: "Categories",
    institucional: "Institutional",
    localizacao: "Location & Zones",
    atuacoes: "Fields of Action",
    financeiro: "Financial & Slip",
    aparencia: "Appearance",
    salvar: "Save",
    salvando: "Saving...",
    excluir: "Delete",
    editar: "Edit",
    adicionar: "Add",
    limpar: "Clear",
    nomeIgreja: "Church Name",
    pastorLocal: "Local Pastor / Responsible",
    cnpj: "CNPJ/Tax ID",
    telefone: "Phone Number",
    email: "Contact E-mail",
    logo: "Church Logo",
    logoSub: "Enter the URL of a valid image (PNG, JPG) for headers and reports.",
    enderecoLogradouro: "Address / Street",
    numero: "Number",
    bairro: "Neighborhood",
    cidade: "City",
    estado: "State/Province",
    cep: "ZIP Code",
    instrucoesCarne: "Payment Instructions",
    localPagamento: "Default Payment Place",
    formasPagamento: "Payment Methods",
    aparenciaTitulo: "Visual Preferences",
    aparenciaSub: "Personalize the theme, main accent color, and display language.",
    modoInterface: "Interface Mode",
    claro: "Light Mode",
    escuro: "Dark Mode",
    corDestaque: "Accent Color",
    idiomaSelecionado: "System Language",
    idiomaAjuda: "Select the default language for menus and forms.",
    selecioneCor: "Choose an accent color for buttons and system highlights."
  },
  es: {
    configuracoes: "Configuración del Sistema",
    subtitulo: "Administre la información institucional, ubicaciones, roles y parámetros financieros.",
    voltar: "Volver al Panel",
    categorias: "Categorías",
    institucional: "Institucional",
    localizacao: "Ubicación y Zonas",
    atuacoes: "Campos de Actuación",
    financeiro: "Financiero y Carnet",
    aparencia: "Apariencia",
    salvar: "Guardar",
    salvando: "Guardando...",
    excluir: "Eliminar",
    editar: "Editar",
    adicionar: "Agregar",
    limpar: "Limpiar",
    nomeIgreja: "Nombre de la Iglesia",
    pastorLocal: "Pastor Local / Responsable",
    cnpj: "CNPJ / Identificación",
    telefone: "Teléfono",
    email: "Correo de Contacto",
    logo: "Logotipo de la Iglesia",
    logoSub: "Ingrese la URL de una imagen válida (PNG, JPG) para encabezados e informes.",
    enderecoLogradouro: "Dirección / Calle",
    numero: "Número",
    bairro: "Barrio",
    cidade: "Ciudad",
    estado: "Estado",
    cep: "Código Postal",
    instrucoesCarne: "Instrucciones de Pago",
    localPagamento: "Lugar de Pago Predeterminado",
    formasPagamento: "Métodos de Pago",
    aparenciaTitulo: "Preferencias Visuales",
    aparenciaSub: "Personalice el tema, el color de acento principal y el idioma de visualización.",
    modoInterface: "Modo de Interfaz",
    claro: "Modo Claro",
    escuro: "Modo Oscuro",
    corDestaque: "Color de Acento",
    idiomaSelecionado: "Idioma del Sistema",
    idiomaAjuda: "Seleccione el idioma predeterminado para menús y formularios.",
    selecioneCor: "Elija un color de acento para los botones y elementos del sistema."
  }
};

export default function TelaConfiguracoes({ membroLogado, onFechar }) {
  const [zonas, setZonas] = useState([]);
  const [atuacoes, setAtuacoes] = useState([]);
  const [novaZona, setNovaZona] = useState('');
  const [novaAtuacao, setNovaAtuacao] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [formasPagamentoDisponiveis, setFormasPagamentoDisponiveis] = useState([]);
  const [novaFormaPagamento, setNovaFormaPagamento] = useState('');

  const [nomeIgreja, setNomeIgreja] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [telefone, setTelefone] = useState('');
  const [emailContato, setEmailContato] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [carneInstrucoes, setCarneInstrucoes] = useState('');
  const [carneLocalPagamento, setCarneLocalPagamento] = useState('');
  const [salvandoIgreja, setSalvandoIgreja] = useState(false);
  const [pastorResponsavel, setPastorResponsavel] = useState('');

  // Novos estados para aprimoramento profissional
  const [abaAtiva, setAbaAtiva] = useState('institucional');
  const [filtroZonas, setFiltroZonas] = useState('');
  const [filtroAtuacoes, setFiltroAtuacoes] = useState('');
  const [filtroFormas, setFiltroFormas] = useState('');

  const [editandoId, setEditandoId] = useState(null);
  const [editandoTexto, setEditandoTexto] = useState('');

  // Aparência e preferências
  const [temaModo, setTemaModo] = useState('claro');
  const [temaAcento, setTemaAcento] = useState('azul');
  const [idioma, setIdioma] = useState('pt');

  // Estados do Sistema de Logs
  const [logsAuditoria, setLogsAuditoria] = useState([]);
  const [logsSessoes, setLogsSessoes] = useState([]);
  const [carregandoLogs, setCarregandoLogs] = useState(false);
  const [subAbaLogs, setSubAbaLogs] = useState('auditoria');
  const [filtroAcaoAudit, setFiltroAcaoAudit] = useState('');
  const [filtroUsuarioAudit, setFiltroUsuarioAudit] = useState('');
  const [filtroTabelaAudit, setFiltroTabelaAudit] = useState('');
  const [logDetalhesExpandidoId, setLogDetalhesExpandidoId] = useState(null);

  const eAdminOuPastor = membroLogado?.permissao?.toLowerCase() === 'admin' || membroLogado?.permissao?.toLowerCase() === 'pastor';

  async function carregarDadosConfiguracao() {
    setCarregando(true);
    try {
      const { data: listZonas, error: erroZonas } = await supabase.from('zonas_moradia').select('*').order('nome');
      if (erroZonas) console.warn('Tabela "zonas_moradia" não encontrada. Veja DATABASE_SCHEMA.md');
      if (listZonas) setZonas(listZonas);

      const { data: listAtuacoes, error: erroAtuacoes } = await supabase.from('atuacoes').select('*').order('nome');
      if (erroAtuacoes) console.warn('Tabela "atuacoes" não encontrada. Veja DATABASE_SCHEMA.md');
      if (listAtuacoes) setAtuacoes(listAtuacoes);

      const { data: igr, error: erroIgreja } = await supabase.from('dados_igreja').select('*').eq('id', 1).single();
      if (erroIgreja) console.warn('Tabela "dados_igreja" não encontrada. Veja DATABASE_SCHEMA.md');
      if (igr) {
        setNomeIgreja(igr.nome_igreja || '');
        setCnpj(mascaraCNPJ(igr.cnpj || ''));
        setEndereco(igr.endereco || '');
        setNumero(igr.numero || '');
        setBairro(igr.bairro || '');
        setCidade(igr.cidade || '');
        setEstado(igr.estado || '');
        setCep(igr.cep || '');
        setTelefone(mascaraTelefone(igr.telefone || ''));
        setEmailContato(igr.email_contato || '');
        setLogoUrl(igr.logo_url || '');
        setCarneInstrucoes(igr.carne_instrucoes || '');
        setCarneLocalPagamento(igr.carne_local_pagamento || '');
        setPastorResponsavel(igr.pastor_responsavel || '');
      }
      const { data: listFormasPagamento, error: erroFormasPagamento } = await supabase.from('formas_pagamento_disponiveis').select('*').order('nome');
      if (erroFormasPagamento) console.warn('Tabela "formas_pagamento_disponiveis" não encontrada. Veja DATABASE_SCHEMA.md');
      if (listFormasPagamento) {
        setFormasPagamentoDisponiveis(listFormasPagamento);
      }
    } catch (err) {
      console.error('Erro ao carregar configurações:', err);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDadosConfiguracao();
    const modo = localStorage.getItem('mib-theme-modo') || 'claro';
    const acento = localStorage.getItem('mib-theme-acento') || 'azul';
    const lang = localStorage.getItem('mib-language') || 'pt';
    setTemaModo(modo);
    setTemaAcento(acento);
    setIdioma(lang);
  }, []);

  const carregarLogsSistema = async () => {
    if (!eAdminOuPastor) return;
    setCarregandoLogs(true);
    try {
      // 1. Carrega logs de auditoria
      const { data: audit, error: errAudit } = await supabase
        .from('logs_sistema')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(250);
      if (!errAudit && audit) setLogsAuditoria(audit);

      // 2. Carrega logs de sessões
      const { data: sessoes, error: errSess } = await supabase
        .from('sessoes_sistema')
        .select('*')
        .order('ultimo_heartbeat', { ascending: false })
        .limit(250);
      if (!errSess && sessoes) setLogsSessoes(sessoes);
    } catch (err) {
      console.error('Erro ao carregar logs:', err);
    } finally {
      setCarregandoLogs(false);
    }
  };

  useEffect(() => {
    if (abaAtiva === 'logs') {
      carregarLogsSistema();
    }
  }, [abaAtiva]);

  const formatarTempoPermanencia = (segundos) => {
    if (segundos === null || segundos === undefined || segundos < 0) return '---';
    if (segundos < 60) return `${segundos}s`;
    const hrs = Math.floor(segundos / 3600);
    const mins = Math.floor((segundos % 3600) / 60);
    const parts = [];
    if (hrs > 0) parts.push(`${hrs}h`);
    if (mins > 0) parts.push(`${mins}m`);
    return parts.join(' ');
  };

  const formatarDataHora = (dataStr) => {
    if (!dataStr) return '---';
    return new Date(dataStr).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  async function handleSalvarDadosIgreja(e) {
    e.preventDefault();
    setSalvandoIgreja(true);
    try {
      const { error } = await supabase.from('dados_igreja').update({
        nome_igreja: nomeIgreja.trim(),
        cnpj: desmascararCNPJ(cnpj),
        endereco: endereco.trim(),
        numero: numero.trim(),
        bairro: bairro.trim(),
        cidade: cidade.trim(),
        estado: estado.trim(),
        cep: cep.trim(),
        telefone: desmascararTelefone(telefone),
        email_contato: emailContato.trim(),
        logo_url: logoUrl.trim(),
        carne_instrucoes: carneInstrucoes.trim(),
        carne_local_pagamento: carneLocalPagamento.trim(),
        pastor_responsavel: pastorResponsavel.trim(),
      }).eq('id', 1);
      if (error) throw error;
      window.alert('Dados salvos com sucesso.');
    } catch (err) {
      window.alert('Erro ao salvar dados: ' + err.message);
    } finally {
      setSalvandoIgreja(false);
    }
  }

  async function handleAdicionarZona(e) {
    e.preventDefault();
    if (!novaZona.trim()) return;
    setCarregando(true);
    const { error } = await supabase.from('zonas_moradia').insert([{ nome: novaZona.trim() }]);
    if (!error) {
      setNovaZona('');
      await carregarDadosConfiguracao();
    } else {
      window.alert('Erro: ' + error.message);
    }
    setCarregando(false);
  }

  async function handleAdicionarAtuacao(e) {
    e.preventDefault();
    if (!novaAtuacao.trim()) return;
    setCarregando(true);
    const { error } = await supabase.from('atuacoes').insert([{ nome: novaAtuacao.trim() }]);
    if (!error) {
      setNovaAtuacao('');
      await carregarDadosConfiguracao();
    } else {
      window.alert('Erro: ' + error.message);
    }
    setCarregando(false);
  }

  async function handleExcluirZona(id) {
    if (!(await window.confirmModal('Excluir Zona', 'Excluir esta zona?'))) return;
    await supabase.from('zonas_moradia').delete().eq('id', id);
    await carregarDadosConfiguracao();
  }

  async function handleExcluirAtuacao(id) {
    if (!(await window.confirmModal('Excluir Atuação', 'Excluir esta atuação?'))) return;
    await supabase.from('atuacoes').delete().eq('id', id);
    await carregarDadosConfiguracao();
  }

  async function handleAdicionarFormaPagamento(e) {
    e.preventDefault();
    if (!novaFormaPagamento.trim()) return;
    setCarregando(true);
    const { error } = await supabase.from('formas_pagamento_disponiveis').insert([{ nome: novaFormaPagamento.trim() }]);
    if (!error) {
      setNovaFormaPagamento('');
      await carregarDadosConfiguracao();
    } else {
      window.alert('Erro: ' + error.message);
    }
    setCarregando(false);
  }

  async function handleExcluirFormaPagamento(id) {
    if (!(await window.confirmModal('Excluir Forma de Pagamento', 'Excluir esta forma de pagamento?'))) return;
    await supabase.from('formas_pagamento_disponiveis').delete().eq('id', id);
    await carregarDadosConfiguracao();
  }

  async function handleSalvarEdicaoZona(id) {
    if (!editandoTexto.trim()) return;
    setCarregando(true);
    try {
      const { error } = await supabase.from('zonas_moradia').update({ nome: editandoTexto.trim() }).eq('id', id);
      if (error) throw error;
      setEditandoId(null);
      setEditandoTexto('');
      await carregarDadosConfiguracao();
    } catch (err) {
      window.alert('Erro ao atualizar zona: ' + err.message);
    } finally {
      setCarregando(false);
    }
  }

  async function handleSalvarEdicaoAtuacao(id) {
    if (!editandoTexto.trim()) return;
    setCarregando(true);
    try {
      const { error } = await supabase.from('atuacoes').update({ nome: editandoTexto.trim() }).eq('id', id);
      if (error) throw error;
      setEditandoId(null);
      setEditandoTexto('');
      await carregarDadosConfiguracao();
    } catch (err) {
      window.alert('Erro ao atualizar atuação: ' + err.message);
    } finally {
      setCarregando(false);
    }
  }

  async function handleSalvarEdicaoFormaPagamento(id) {
    if (!editandoTexto.trim()) return;
    setCarregando(true);
    try {
      const { error } = await supabase.from('formas_pagamento_disponiveis').update({ nome: editandoTexto.trim() }).eq('id', id);
      if (error) throw error;
      setEditandoId(null);
      setEditandoTexto('');
      await carregarDadosConfiguracao();
    } catch (err) {
      window.alert('Erro ao atualizar forma de pagamento: ' + err.message);
    } finally {
      setCarregando(false);
    }
  }

  const handleAlterarAparencia = (modo, acento) => {
    setTemaModo(modo);
    setTemaAcento(acento);
    aplicarTema(modo, acento);
  };

  const handleAlterarIdioma = (lang) => {
    setIdioma(lang);
    localStorage.setItem('mib-language', lang);
  };

  return (
    <div className="w-full max-w-full sm:max-w-5xl space-y-5 px-2">
      <PageHeader titulo={t[idioma].configuracoes} subtitulo={t[idioma].subtitulo}>
        <button
          type="button"
          onClick={onFechar}
          className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-3xs cursor-pointer transition-all active:scale-95"
        >
          {t[idioma].voltar}
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* NAVEGAÇÃO POR ABAS - Sidebar no desktop / Menu horizontal no mobile */}
        <div className="md:col-span-3 bg-white border border-slate-100 rounded-2xl p-2.5 shadow-3xs space-y-1">
          <p className="hidden md:block text-[9px] font-black text-slate-400 uppercase tracking-widest px-3.5 py-2">
            {t[idioma].categorias}
          </p>
          <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 gap-1.5 scrollbar-hide">
            {(() => {
              const abas = [
                { id: 'institucional', label: t[idioma].institucional, icon: <Building2 size={16} /> },
                { id: 'localizacao', label: t[idioma].localizacao, icon: <MapPin size={16} /> },
                { id: 'atuacoes', label: t[idioma].atuacoes, icon: <Briefcase size={16} /> },
                { id: 'financeiro', label: t[idioma].financeiro, icon: <CreditCard size={16} /> },
                { id: 'aparencia', label: t[idioma].aparencia, icon: <Palette size={16} /> }
              ];
              if (eAdminOuPastor) {
                abas.push({ id: 'logs', label: "Logs do Sistema", icon: <Activity size={16} /> });
              }
              return abas;
            })().map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setAbaAtiva(tab.id);
                  setEditandoId(null);
                  setEditandoTexto('');
                }}
                className={`flex items-center gap-2.5 py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none shrink-0 md:w-full ${abaAtiva === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* PAINEL DE CONTEÚDO */}
        <div className="md:col-span-9 space-y-4">

          {/* ── ABA 1: INSTITUCIONAL ── */}
          {abaAtiva === 'institucional' && (
            <Card className="p-0 border border-slate-100 rounded-2xl shadow-3xs overflow-hidden">
              <CardHeader
                titulo={t[idioma].institucional}
                subtitulo="Informações gerais e identidade visual da igreja para relatórios e recibos."
              />
              <div className="p-5 border-t border-slate-50 bg-slate-50/10">

                {/* PREVIEW DO LOGOTIPO */}
                <div className="mb-6 p-4 bg-white border border-slate-100 rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-3xs">
                  <div className="w-16 h-16 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-3xs">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Logo da Igreja" className="w-full h-full object-contain" />
                    ) : (
                      <Building2 size={24} className="text-slate-400" />
                    )}
                  </div>
                  <div className="text-center sm:text-left space-y-1 flex-1 min-w-0 w-full">
                    <h4 className="font-extrabold text-slate-800 text-xs">{t[idioma].logo}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{t[idioma].logoSub}</p>
                    <input
                      type="url"
                      placeholder="https://exemplo.com/logo.png"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      className="w-full mt-1.5 px-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* FORMULÁRIO INSTITUCIONAL */}
                <form onSubmit={handleSalvarDadosIgreja} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{t[idioma].nomeIgreja}</label>
                      <input
                        type="text"
                        required
                        placeholder={t[idioma].nomeIgreja}
                        value={nomeIgreja}
                        onChange={(e) => setNomeIgreja(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{t[idioma].pastorLocal}</label>
                      <input
                        type="text"
                        placeholder={t[idioma].pastorLocal}
                        value={pastorResponsavel}
                        onChange={(e) => setPastorResponsavel(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{t[idioma].cnpj}</label>
                      <input
                        type="text"
                        placeholder="00.000.000/0000-00"
                        value={cnpj}
                        onChange={(e) => setCnpj(mascaraCNPJ(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{t[idioma].telefone}</label>
                      <input
                        type="text"
                        placeholder="(00) 00000-0000"
                        value={telefone}
                        onChange={(e) => setTelefone(mascaraTelefone(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{t[idioma].email}</label>
                    <input
                      type="email"
                      placeholder="contato@igreja.com"
                      value={emailContato}
                      onChange={(e) => setEmailContato(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={salvandoIgreja}
                    className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-bold shadow-sm transition-all ml-auto block cursor-pointer select-none active:scale-98"
                  >
                    {salvandoIgreja ? t[idioma].salvando : t[idioma].salvar}
                  </button>
                </form>
              </div>
            </Card>
          )}

          {/* ── ABA 2: LOCALIZAÇÃO & ZONAS ── */}
          {abaAtiva === 'localizacao' && (
            <div className="space-y-5">
              {/* ENDEREÇO SEDE */}
              <Card className="p-0 border border-slate-100 rounded-2xl shadow-3xs overflow-hidden">
                <CardHeader
                  titulo="Endereço do Templo Local"
                  subtitulo="Localização física principal da igreja."
                />
                <form onSubmit={handleSalvarDadosIgreja} className="p-5 border-t border-slate-50 bg-slate-50/10 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-9 space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{t[idioma].enderecoLogradouro}</label>
                      <input
                        type="text"
                        placeholder="Rua, Avenida, Praça..."
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-3 space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{t[idioma].numero}</label>
                      <input
                        type="text"
                        placeholder="Ex: 123"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{t[idioma].bairro}</label>
                      <input
                        type="text"
                        placeholder="Bairro"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{t[idioma].cidade}</label>
                      <input
                        type="text"
                        placeholder="Cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{t[idioma].estado}</label>
                      <input
                        type="text"
                        placeholder="SP"
                        maxLength={2}
                        value={estado}
                        onChange={(e) => setEstado(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{t[idioma].cep}</label>
                      <input
                        type="text"
                        placeholder="00000-000"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={salvandoIgreja}
                    className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-bold shadow-sm transition-all ml-auto block cursor-pointer select-none active:scale-98"
                  >
                    {salvandoIgreja ? t[idioma].salvando : t[idioma].salvar}
                  </button>
                </form>
              </Card>

              {/* ZONAS GEOGRÁFICAS */}
              <Card className="p-0 border border-slate-100 rounded-2xl shadow-3xs overflow-hidden">
                <CardHeader
                  titulo={`Zonas Geográficas (${zonas.length})`}
                  subtitulo="Mapeamento de regiões para organizar membros e células."
                />

                {/* Form Adicionar Zona */}
                <form onSubmit={handleAdicionarZona} className="p-4 border-t border-slate-50 bg-slate-50/20 flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: Zona Leste, Região Central..."
                    value={novaZona}
                    onChange={(e) => setNovaZona(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none bg-white"
                    disabled={carregando}
                  />
                  <button
                    type="submit"
                    disabled={carregando || !novaZona.trim()}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-bold shadow-sm disabled:bg-slate-300 transition-all shrink-0 cursor-pointer select-none active:scale-95"
                  >
                    + {t[idioma].adicionar}
                  </button>
                </form>

                {/* Filtro interno */}
                {zonas.length > 0 && (
                  <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-2">
                    <Search size={14} className="text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Pesquisar zona..."
                      value={filtroZonas}
                      onChange={(e) => setFiltroZonas(e.target.value)}
                      className="w-full text-xs text-slate-700 bg-transparent border-none focus:outline-none focus:ring-0 py-1"
                    />
                    {filtroZonas && (
                      <button
                        type="button"
                        onClick={() => setFiltroZonas('')}
                        className="text-[10px] text-slate-450 hover:text-slate-750 font-bold uppercase shrink-0"
                      >
                        {t[idioma].limpar}
                      </button>
                    )}
                  </div>
                )}

                {/* Lista de zonas */}
                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto bg-white">
                  {(() => {
                    const filtradas = zonas.filter(z => z.nome.toLowerCase().includes((filtroZonas || '').toLowerCase()));
                    if (filtradas.length === 0) {
                      return <p className="p-4 text-xs text-slate-450 italic text-center">Nenhuma zona encontrada.</p>;
                    }
                    return filtradas.map((z) => (
                      <div key={z.id} className="px-4 py-3 flex justify-between items-center text-xs group hover:bg-slate-50/50 transition-colors">
                        {editandoId === z.id ? (
                          <div className="flex items-center gap-2 flex-1 mr-3">
                            <input
                              type="text"
                              value={editandoTexto}
                              onChange={(e) => setEditandoTexto(e.target.value)}
                              className="flex-1 px-2.5 py-1 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => handleSalvarEdicaoZona(z.id)}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                              title={t[idioma].salvar}
                            >
                              <Check size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => { setEditandoId(null); setEditandoTexto(''); }}
                              className="p-1 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
                              title="Cancelar"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="font-medium text-slate-700">{z.nome}</span>
                            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={() => { setEditandoId(z.id); setEditandoTexto(z.nome); }}
                                className="px-2.5 py-1 text-slate-555 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1"
                              >
                                <Edit2 size={12} /> {t[idioma].editar}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleExcluirZona(z.id)}
                                className="px-2.5 py-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1"
                              >
                                <Trash2 size={12} /> {t[idioma].excluir}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ));
                  })()}
                </div>
              </Card>
            </div>
          )}

          {/* ── ABA 3: CAMPOS DE ATUAÇÃO ── */}
          {abaAtiva === 'atuacoes' && (
            <Card className="p-0 border border-slate-100 rounded-2xl shadow-3xs overflow-hidden">
              <CardHeader
                titulo={`${t[idioma].atuacoes} (${atuacoes.length})`}
                subtitulo="Gerencie as áreas ministeriais onde os membros da igreja atuarão."
              />

              {/* Form Adicionar Atuação */}
              <form onSubmit={handleAdicionarAtuacao} className="p-4 border-t border-slate-50 bg-slate-50/20 flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: Diaconia, Ministério Infantil, Recepção..."
                  value={novaAtuacao}
                  onChange={(e) => setNovaAtuacao(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none bg-white"
                  disabled={carregando}
                />
                <button
                  type="submit"
                  disabled={carregando || !novaAtuacao.trim()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-bold shadow-sm disabled:bg-slate-300 transition-all shrink-0 cursor-pointer select-none active:scale-95"
                >
                  + {t[idioma].adicionar}
                </button>
              </form>

              {/* Filtro interno */}
              {atuacoes.length > 0 && (
                <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-2">
                  <Search size={14} className="text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Pesquisar atuação..."
                    value={filtroAtuacoes}
                    onChange={(e) => setFiltroAtuacoes(e.target.value)}
                    className="w-full text-xs text-slate-700 bg-transparent border-none focus:outline-none focus:ring-0 py-1"
                  />
                  {filtroAtuacoes && (
                    <button
                      type="button"
                      onClick={() => setFiltroAtuacoes('')}
                      className="text-[10px] text-slate-450 hover:text-slate-750 font-bold uppercase shrink-0"
                    >
                      {t[idioma].limpar}
                    </button>
                  )}
                </div>
              )}

              {/* Lista de atuações */}
              <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto bg-white">
                {(() => {
                  const filtradas = atuacoes.filter(a => a.nome.toLowerCase().includes((filtroAtuacoes || '').toLowerCase()));
                  if (filtradas.length === 0) {
                    return <p className="p-4 text-xs text-slate-450 italic text-center">Nenhuma atuação encontrada.</p>;
                  }
                  return filtradas.map((a) => (
                    <div key={a.id} className="px-4 py-3 flex justify-between items-center text-xs group hover:bg-slate-50/50 transition-colors">
                      {editandoId === a.id ? (
                        <div className="flex items-center gap-2 flex-1 mr-3">
                          <input
                            type="text"
                            value={editandoTexto}
                            onChange={(e) => setEditandoTexto(e.target.value)}
                            className="flex-1 px-2.5 py-1 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => handleSalvarEdicaoAtuacao(a.id)}
                            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                            title={t[idioma].salvar}
                          >
                            <Check size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => { setEditandoId(null); setEditandoTexto(''); }}
                            className="p-1 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
                            title="Cancelar"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="font-medium text-slate-700">{a.nome}</span>
                          <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => { setEditandoId(a.id); setEditandoTexto(a.nome); }}
                              className="px-2.5 py-1 text-slate-555 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1"
                            >
                              <Edit2 size={12} /> {t[idioma].editar}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleExcluirAtuacao(a.id)}
                              className="px-2.5 py-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1"
                            >
                              <Trash2 size={12} /> {t[idioma].excluir}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </Card>
          )}

          {/* ── ABA 4: FINANCEIRO & CARNÊ ── */}
          {abaAtiva === 'financeiro' && (
            <div className="space-y-5">
              {/* CONFIG CARNÊ */}
              <Card className="p-0 border border-slate-100 rounded-2xl shadow-3xs overflow-hidden">
                <CardHeader
                  titulo="Configurações do Carnê"
                  subtitulo="Defina as instruções de pagamento e o local padrão para os boletos/carnês."
                />
                <form onSubmit={handleSalvarDadosIgreja} className="p-5 border-t border-slate-50 bg-slate-50/10 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{t[idioma].instrucoesCarne}</label>
                    <textarea
                      placeholder="Ex: Instruções de multa, regras de depósito ou chaves PIX para pagamento..."
                      value={carneInstrucoes}
                      onChange={(e) => setCarneInstrucoes(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none bg-white resize-none"
                      rows="4"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{t[idioma].localPagamento}</label>
                    <input
                      type="text"
                      placeholder="Ex: PIX ou Secretaria da Igreja"
                      value={carneLocalPagamento}
                      onChange={(e) => setCarneLocalPagamento(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={salvandoIgreja}
                    className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-bold shadow-sm transition-all ml-auto block cursor-pointer select-none active:scale-98"
                  >
                    {salvandoIgreja ? t[idioma].salvando : t[idioma].salvar}
                  </button>
                </form>
              </Card>

              {/* FORMAS DE PAGAMENTO */}
              <Card className="p-0 border border-slate-100 rounded-2xl shadow-3xs overflow-hidden">
                <CardHeader
                  titulo={`${t[idioma].formasPagamento} (${formasPagamentoDisponiveis.length})`}
                  subtitulo="Opções de liquidação nas inscrições e eventos pagos."
                />

                {/* Form Adicionar Forma */}
                <form onSubmit={handleAdicionarFormaPagamento} className="p-4 border-t border-slate-50 bg-slate-50/20 flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: PIX, Transferência, Dinheiro..."
                    value={novaFormaPagamento}
                    onChange={(e) => setNovaFormaPagamento(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none bg-white"
                    disabled={carregando}
                  />
                  <button
                    type="submit"
                    disabled={carregando || !novaFormaPagamento.trim()}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-bold shadow-sm disabled:bg-slate-300 transition-all shrink-0 cursor-pointer select-none active:scale-95"
                  >
                    + {t[idioma].adicionar}
                  </button>
                </form>

                {/* Filtro interno */}
                {formasPagamentoDisponiveis.length > 0 && (
                  <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-2">
                    <Search size={14} className="text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Pesquisar forma..."
                      value={filtroFormas}
                      onChange={(e) => setFiltroFormas(e.target.value)}
                      className="w-full text-xs text-slate-700 bg-transparent border-none focus:outline-none focus:ring-0 py-1"
                    />
                    {filtroFormas && (
                      <button
                        type="button"
                        onClick={() => setFiltroFormas('')}
                        className="text-[10px] text-slate-450 hover:text-slate-750 font-bold uppercase shrink-0"
                      >
                        {t[idioma].limpar}
                      </button>
                    )}
                  </div>
                )}

                {/* Lista de formas */}
                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto bg-white">
                  {(() => {
                    const filtradas = formasPagamentoDisponiveis.filter(f => f.nome.toLowerCase().includes((filtroFormas || '').toLowerCase()));
                    if (filtradas.length === 0) {
                      return <p className="p-4 text-xs text-slate-450 italic text-center">Nenhuma forma encontrada.</p>;
                    }
                    return filtradas.map((f) => (
                      <div key={f.id} className="px-4 py-3 flex justify-between items-center text-xs group hover:bg-slate-50/50 transition-colors">
                        {editandoId === f.id ? (
                          <div className="flex items-center gap-2 flex-1 mr-3">
                            <input
                              type="text"
                              value={editandoTexto}
                              onChange={(e) => setEditandoTexto(e.target.value)}
                              className="flex-1 px-2.5 py-1 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => handleSalvarEdicaoFormaPagamento(f.id)}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                              title={t[idioma].salvar}
                            >
                              <Check size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => { setEditandoId(null); setEditandoTexto(''); }}
                              className="p-1 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
                              title="Cancelar"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="font-medium text-slate-700">{f.nome}</span>
                            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={() => { setEditandoId(f.id); setEditandoTexto(f.nome); }}
                                className="px-2.5 py-1 text-slate-555 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1"
                              >
                                <Edit2 size={12} /> {t[idioma].editar}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleExcluirFormaPagamento(f.id)}
                                className="px-2.5 py-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1"
                              >
                                <Trash2 size={12} /> {t[idioma].excluir}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ));
                  })()}
                </div>
              </Card>
            </div>
          )}

          {/* ── ABA 5: APARÊNCIA ── */}
          {abaAtiva === 'aparencia' && (
            <Card className="p-0 border border-slate-100 rounded-2xl shadow-3xs overflow-hidden">
              <CardHeader
                titulo={t[idioma].aparenciaTitulo}
                subtitulo={t[idioma].aparenciaSub}
              />
              <div className="p-5 border-t border-slate-50 bg-slate-50/10 space-y-6">

                {/* MODO DA INTERFACE (CLARO / ESCURO) */}
                <div className="space-y-3">
                  <h4 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5 animate-in slide-in-from-top-1 duration-200">
                    {temaModo === 'claro' ? <Sun size={15} className="text-warning" /> : <Moon size={15} className="text-blue-400" />}
                    {t[idioma].modoInterface}
                  </h4>
                  <div className="grid grid-cols-2 gap-3 max-w-sm">
                    <button
                      type="button"
                      onClick={() => handleAlterarAparencia('claro', temaAcento)}
                      className={`py-3 px-4 border rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${temaModo === 'claro'
                          ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      <Sun size={14} />
                      {t[idioma].claro}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAlterarAparencia('escuro', temaAcento)}
                      className={`py-3 px-4 border rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${temaModo === 'escuro'
                          ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      <Moon size={14} />
                      {t[idioma].escuro}
                    </button>
                  </div>
                </div>

                {/* PALETA DE CORES DE ACENTO */}
                <div className="space-y-3 border-t border-slate-100 pt-5">
                  <h4 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5">
                    <Palette size={15} className="text-indigo-500" />
                    {t[idioma].corDestaque}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">{t[idioma].selecioneCor}</p>
                  <div className="flex flex-wrap gap-4 pt-1.5 animate-in fade-in duration-300">
                    {[
                      { id: 'azul', name: 'Classic Blue', color: 'bg-[#202046]', border: 'border-[#202046]' },
                      { id: 'esmeralda', name: 'Emerald Teal', color: 'bg-[#0f766e]', border: 'border-[#0f766e]' },
                      { id: 'roxo', name: 'Deep Purple', color: 'bg-[#6b21a8]', border: 'border-[#6b21a8]' },
                      { id: 'slate', name: 'Slate Gray', color: 'bg-[#334155]', border: 'border-[#334155]' }
                    ].map((acento) => (
                      <button
                        key={acento.id}
                        type="button"
                        onClick={() => handleAlterarAparencia(temaModo, acento.id)}
                        className={`flex items-center gap-2 py-2 px-3 border rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer bg-white ${temaAcento === acento.id
                            ? `${acento.border} text-slate-900 ring-2 ring-offset-2 ring-slate-400`
                            : 'border-slate-200 text-slate-650 hover:bg-slate-50'
                          }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full ${acento.color} inline-block shadow-3xs`} />
                        {acento.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* IDIOMA DO SISTEMA */}
                <div className="space-y-3 border-t border-slate-100 pt-5">
                  <h4 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5">
                    <Globe size={15} className="text-emerald-500" />
                    {t[idioma].idiomaSelecionado}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">{t[idioma].idiomaAjuda}</p>
                  <div className="max-w-xs">
                    <select
                      value={idioma}
                      onChange={(e) => handleAlterarIdioma(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                    >
                      <option value="pt">🇧🇷 Português (Brasil)</option>
                      <option value="en">🇺🇸 English (United States)</option>
                      <option value="es">🇪🇸 Español (España)</option>
                    </select>
                  </div>
                </div>

              </div>
            </Card>
          )}

          {/* ── ABA 6: LOGS DO SISTEMA ── */}
          {abaAtiva === 'logs' && eAdminOuPastor && (
            <Card className="p-0 border border-slate-100 rounded-2xl shadow-3xs overflow-hidden bg-white">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Logs e Auditoria do Sistema</h3>
                  <p className="text-xs text-slate-400">Monitore as ações executadas e as sessões de usuários.</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSubAbaLogs('auditoria')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      subAbaLogs === 'auditoria'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-650 hover:bg-slate-200'
                    }`}
                  >
                    Ações de Auditoria
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubAbaLogs('sessoes')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      subAbaLogs === 'sessoes'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-650 hover:bg-slate-200'
                    }`}
                  >
                    Tempo de Uso & Sessões
                  </button>
                </div>
              </div>

              {/* CONTEÚDO SUB-ABA: AUDITORIA */}
              {subAbaLogs === 'auditoria' && (
                <div className="p-5 space-y-4">
                  {/* Filtros */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-450 uppercase">Usuário</label>
                      <input
                        type="text"
                        placeholder="Nome ou e-mail..."
                        value={filtroUsuarioAudit}
                        onChange={e => setFiltroUsuarioAudit(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-450 uppercase">Ação</label>
                      <select
                        value={filtroAcaoAudit}
                        onChange={e => setFiltroAcaoAudit(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                      >
                        <option value="">Todas as Ações</option>
                        <option value="INSERT">Inclusão (INSERT)</option>
                        <option value="UPDATE">Alteração (UPDATE)</option>
                        <option value="DELETE">Exclusão (DELETE)</option>
                        <option value="LOGIN">Acesso (LOGIN)</option>
                        <option value="LOGOUT">Saída (LOGOUT)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-450 uppercase">Tabela</label>
                      <input
                        type="text"
                        placeholder="Ex: pessoas, celulas..."
                        value={filtroTabelaAudit}
                        onChange={e => setFiltroTabelaAudit(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  {/* Listagem/Tabela */}
                  {carregandoLogs ? (
                    <div className="py-12 flex justify-center items-center text-xs text-slate-400 italic">
                      Carregando logs de auditoria...
                    </div>
                  ) : (
                    <div className="border border-slate-100 rounded-2xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                              <th className="p-3">Data/Hora</th>
                              <th className="p-3">Usuário</th>
                              <th className="p-3">Ação</th>
                              <th className="p-3">Tabela</th>
                              <th className="p-3">Detalhes</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {(() => {
                              const filtrados = logsAuditoria.filter(log => {
                                const matchUser = !filtroUsuarioAudit || 
                                  log.usuario_nome?.toLowerCase().includes(filtroUsuarioAudit.toLowerCase()) ||
                                  log.usuario_email?.toLowerCase().includes(filtroUsuarioAudit.toLowerCase());
                                const matchAcao = !filtroAcaoAudit || log.acao === filtroAcaoAudit;
                                const matchTab = !filtroTabelaAudit || log.tabela?.toLowerCase().includes(filtroTabelaAudit.toLowerCase());
                                return matchUser && matchAcao && matchTab;
                              });

                              if (filtrados.length === 0) {
                                return (
                                  <tr>
                                    <td colSpan="5" className="p-6 text-center text-slate-400 italic">
                                      Nenhum registro de auditoria encontrado.
                                    </td>
                                  </tr>
                                );
                              }

                              return filtrados.map(log => {
                                const isExpandido = logDetalhesExpandidoId === log.id;
                                let badgeColor = 'bg-slate-100 text-slate-650';
                                if (log.acao === 'INSERT') badgeColor = 'bg-emerald-50 text-emerald-700 border border-emerald-100';
                                if (log.acao === 'UPDATE') badgeColor = 'bg-blue-50 text-blue-700 border border-blue-100';
                                if (log.acao === 'DELETE') badgeColor = 'bg-rose-50 text-rose-700 border border-rose-100';
                                if (log.acao === 'LOGIN') badgeColor = 'bg-purple-50 text-purple-700 border border-purple-100';
                                if (log.acao === 'LOGOUT') badgeColor = 'bg-amber-50 text-amber-700 border border-amber-100';

                                return (
                                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-3 text-slate-500 whitespace-nowrap">{formatarDataHora(log.created_at)}</td>
                                    <td className="p-3">
                                      <div className="font-bold text-slate-800">{log.usuario_nome}</div>
                                      <div className="text-[10px] text-slate-400">{log.usuario_email}</div>
                                    </td>
                                    <td className="p-3">
                                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${badgeColor}`}>
                                        {log.acao}
                                      </span>
                                    </td>
                                    <td className="p-3 font-semibold text-slate-600 whitespace-nowrap">{log.tabela || '---'}</td>
                                    <td className="p-3">
                                      <div className="space-y-1">
                                        <button
                                          type="button"
                                          onClick={() => setLogDetalhesExpandidoId(isExpandido ? null : log.id)}
                                          className="text-blue-600 hover:text-blue-800 font-bold hover:underline"
                                        >
                                          {isExpandido ? 'Ocultar' : 'Ver Detalhes'}
                                        </button>
                                        {isExpandido && log.detalhes && (
                                          <pre className="mt-2 p-3 bg-slate-900 text-slate-200 text-[10px] rounded-xl overflow-x-auto font-mono max-w-lg leading-relaxed shadow-inner">
                                            {JSON.stringify(log.detalhes, null, 2)}
                                          </pre>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              });
                            })()}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CONTEÚDO SUB-ABA: SESSÕES */}
              {subAbaLogs === 'sessoes' && (
                <div className="p-5 space-y-4">
                  {/* Filtro */}
                  <div className="max-w-xs space-y-1 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                    <label className="text-[10px] font-bold text-slate-450 uppercase">Pesquisar Usuário</label>
                    <input
                      type="text"
                      placeholder="Nome ou e-mail..."
                      value={filtroUsuarioAudit}
                      onChange={e => setFiltroUsuarioAudit(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  {/* Listagem */}
                  {carregandoLogs ? (
                    <div className="py-12 flex justify-center items-center text-xs text-slate-400 italic">
                      Carregando sessões...
                    </div>
                  ) : (
                    <div className="border border-slate-100 rounded-2xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                              <th className="p-3">Usuário</th>
                              <th className="p-3">Login em</th>
                              <th className="p-3">Última Atividade</th>
                              <th className="p-3">Tempo de Permanência</th>
                              <th className="p-3">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {(() => {
                              const filtradas = logsSessoes.filter(sess => {
                                return !filtroUsuarioAudit ||
                                  sess.usuario_nome?.toLowerCase().includes(filtroUsuarioAudit.toLowerCase()) ||
                                  sess.usuario_email?.toLowerCase().includes(filtroUsuarioAudit.toLowerCase());
                              });

                              if (filtradas.length === 0) {
                                return (
                                  <tr>
                                    <td colSpan="5" className="p-6 text-center text-slate-400 italic">
                                      Nenhuma sessão registrada encontrada.
                                    </td>
                                  </tr>
                                );
                              }

                              return filtradas.map(sess => {
                                // Determina se a sessão está ativa (heartbeat feito nos últimos 90 segundos)
                                const heartbeatTime = new Date(sess.ultimo_heartbeat).getTime();
                                const agora = new Date().getTime();
                                const isAtiva = (agora - heartbeatTime) < 90000;

                                return (
                                  <tr key={sess.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-3">
                                      <div className="font-bold text-slate-800">{sess.usuario_nome}</div>
                                      <div className="text-[10px] text-slate-400">{sess.usuario_email}</div>
                                    </td>
                                    <td className="p-3 text-slate-500">{formatarDataHora(sess.login_at)}</td>
                                    <td className="p-3 text-slate-500">{formatarDataHora(sess.ultimo_heartbeat)}</td>
                                    <td className="p-3 font-semibold text-slate-700">{formatarTempoPermanencia(sess.duracao_segundos)}</td>
                                    <td className="p-3">
                                      {isAtiva ? (
                                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                          Ativa
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-550 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200">
                                          Finalizada
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              });
                            })()}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
