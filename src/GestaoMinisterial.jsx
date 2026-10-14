import React, { useState, useMemo } from 'react';
import DashboardMinisterialV2 from './ministerial/DashboardMinisterialV2';
import EscalasMinisteriais from './ministerial/EscalasMinisteriais';
import MinisteriosManager from './ministerial/MinisteriosManager';
import HistoricoMinisterial from './ministerial/HistoricoMinisterial';
import RelatoriosMinisterial from './ministerial/RelatoriosMinisterial';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  Menu,
  X,
  Music
} from 'lucide-react';
import RepertorioLouvor from './RepertorioLouvor';
import { isLouvorMinistry } from './ministerial/services/ministeriosService';

export default function GestaoMinisterial(props) {
  const { submenu, onNavigate } = props;
  const aba = submenu || 'dashboard';

  const [filtroMinisterioId, setFiltroMinisterioId] = useState(null);
  const [ministerioAtivo, setMinisterioAtivo] = useState(null);
  const [filtroStatusEscala, setFiltroStatusEscala] = useState(null);
  const [filtroMesEscala, setFiltroMesEscala] = useState(null);
  const [filtroAnoEscala, setFiltroAnoEscala] = useState(null);

  // Controle de recolhimento da coluna direita
  const [colunaRecolhida, setColunaRecolhida] = useState(false);

  // Detecta se está dentro do ambiente específico do Ministério de Louvor
  const isLouvorAmbiente = useMemo(() => {
    // 1. Diretamente na visualização de repertório
    if (aba === 'repertorio') return true;
    // 2. Na aba de Ministérios ('config') e dentro do ambiente do Ministério de Louvor
    if (aba === 'config' && ministerioAtivo && isLouvorMinistry(ministerioAtivo.nome)) {
      return true;
    }
    return false;
  }, [aba, ministerioAtivo]);

  const handleNavegarTab = (novaAba, filtros = {}) => {
    if (filtros.ministerioId !== undefined) {
      setFiltroMinisterioId(filtros.ministerioId);
    } else if (novaAba === 'repertorio' && ministerioAtivo?.id) {
      // Preserva o ID do ministério de louvor ativo
      setFiltroMinisterioId(ministerioAtivo.id);
    } else if (novaAba !== 'repertorio' && novaAba !== 'config') {
      // Saindo do escopo de ministérios/repertório para dashboard, relatórios, etc.
      setFiltroMinisterioId(null);
      setMinisterioAtivo(null);
    }
    if (filtros.status !== undefined) setFiltroStatusEscala(filtros.status);
    if (filtros.mes !== undefined) setFiltroMesEscala(filtros.mes);
    if (filtros.ano !== undefined) setFiltroAnoEscala(filtros.ano);

    onNavigate(novaAba);
  };

  const abas = useMemo(() => {
    const lista = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        titulo: 'Painel de Indicadores',
        desc: 'Métricas consolidadas de participação, voluntários e engajamento ministerial. Clique nos cartões para ver os detalhes.',
        menuDesc: 'Indicadores e visão geral',
        icon: LayoutDashboard
      },
      {
        id: 'config',
        label: 'Ministérios',
        titulo: 'Ministérios',
        desc: 'Cadastre os ministérios ativos da igreja e configure suas equipes e funções.',
        menuDesc: 'Equipes, líderes e funções',
        icon: Settings
      },
      {
        id: 'escalas',
        label: 'Escalas',
        titulo: 'Escalas Ministeriais',
        desc: 'Planejamento de cultos, eventos, distribuição de funções e escalas de voluntários.',
        menuDesc: 'Cultos, eventos e voluntários',
        icon: Calendar
      },
    ];

    // O botão Repertório é exibido SOMENTE no ambiente específico do Ministério de Louvor
    if (isLouvorAmbiente) {
      lista.push({
        id: 'repertorio',
        label: 'Repertório',
        titulo: 'Repertório de Louvor',
        desc: 'Planejamento musical dos cultos com biblioteca de músicas e sugestões inteligentes.',
        menuDesc: 'Músicas e setlists do culto',
        icon: Music
      });
    }

    lista.push(
      {
        id: 'relatorios',
        label: 'Relatórios',
        titulo: 'Indicadores e Relatórios',
        desc: 'Relatórios analíticos e indicadores de desempenho ministerial.',
        menuDesc: 'Estatísticas e dados',
        icon: BarChart3
      },
      {
        id: 'historico',
        label: 'Histórico',
        titulo: 'Histórico Ministerial',
        desc: 'Rastreabilidade completa de movimentações, escalas e promoções de voluntários.',
        menuDesc: 'Registro de movimentações',
        icon: Clock
      }
    );

    return lista;
  }, [isLouvorAmbiente]);

  const abaAtual = abas.find((a) => a.id === aba) || abas[0];
  const IconeAbaAtual = abaAtual.icon;

  return (
    <div className="w-full space-y-6">
      {/* ── CABEÇALHO DO MÓDULO (OCULTO NA ABA DASHBOARD) ── */}
      {aba !== 'dashboard' && (
        <>
          <div className="hidden md:block animate-in fade-in duration-300">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              {abaAtual.titulo || abaAtual.label}
            </h1>
            <p className="text-xs text-slate-500">
              {abaAtual.desc}
            </p>
          </div>

          {/* ── CARD BRANCO DE TÍTULO NO MOBILE (MESMA LARGURA DOS ELEMENTOS DA PÁGINA) ── */}
          <div className="md:hidden w-full mb-4 bg-white px-4 py-3.5 rounded-b-2xl sm:rounded-b-3xl rounded-t-none border border-t-0 border-slate-200/90 shadow-2xs flex items-center justify-center">
            <h1 className="text-sm font-black uppercase tracking-wider text-slate-800 text-center truncate">
              {abaAtual.titulo || abaAtual.label}
            </h1>
          </div>
        </>
      )}

      {/* ── MENU DE ABAS NO TOPO NO MOBILE (BOTÕES QUADRADOS COM ÍCONES ACIMA E NOME ABAIXO) ── */}
      <div className="lg:hidden w-full">
        <div
          className="grid gap-1 sm:gap-1.5 w-full bg-white p-1 rounded-2xl border border-slate-200/90 shadow-2xs"
          style={{ gridTemplateColumns: `repeat(${abas.length}, minmax(0, 1fr))` }}
        >
          {abas.map((a) => {
            const Icon = a.icon;
            const ativo = aba === a.id;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => handleNavegarTab(a.id)}
                className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 text-center min-w-0 ${ativo
                  ? 'bg-gradient-to-tr from-blue-700 via-indigo-700 to-blue-800 text-white shadow-md shadow-blue-700/25'
                  : a.id === 'repertorio'
                    ? 'text-purple-700 hover:text-purple-900 bg-purple-50/70 border border-purple-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
                title={a.label}
              >
                <Icon size={18} strokeWidth={ativo ? 2.5 : 2} className="shrink-0 mb-1" />
                <span className={`text-[8.5px] uppercase tracking-tighter leading-tight truncate w-full text-center px-0.5 ${ativo ? 'font-black text-white' : 'font-bold text-slate-700'}`}>
                  {a.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* ── CONTEÚDO PRINCIPAL (OCUPA A ESQUERDA) ── */}
        <div className="flex-1 min-w-0 w-full animate-in fade-in duration-300">
          {aba === 'dashboard' && (
            <DashboardMinisterialV2
              {...props}
              onNavegarTab={handleNavegarTab}
              hideHeader={true}
            />
          )}
          {aba === 'escalas' && (
            <EscalasMinisteriais
              {...props}
              initialFiltroMinisterioId={filtroMinisterioId}
              initialStatus={filtroStatusEscala}
              initialFiltroMes={filtroMesEscala}
              initialFiltroAno={filtroAnoEscala}
            />
          )}
          {aba === 'historico' && (
            <HistoricoMinisterial
              {...props}
              initialStatus={filtroStatusEscala}
              hideHeader={true}
            />
          )}
          {aba === 'relatorios' && (
            <RelatoriosMinisterial
              {...props}
              onNavegarTab={handleNavegarTab}
              hideHeader={true}
            />
          )}
          {aba === 'config' && (
            <MinisteriosManager
              {...props}
              onNavegarTab={handleNavegarTab}
              initialSelectedMinistryId={filtroMinisterioId}
              onMinisterioAtivoChange={(min) => {
                setMinisterioAtivo(min);
                if (!min) setFiltroMinisterioId(null);
              }}
              hideHeader={true}
            />
          )}
          {aba === 'repertorio' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <button
                  type="button"
                  onClick={() => handleNavegarTab('config')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200/90 shadow-xs text-xs font-bold transition active:scale-95 cursor-pointer group"
                  title="Voltar para os detalhes do Ministério de Louvor"
                >
                  <ChevronLeft size={16} strokeWidth={2.5} className="text-slate-400 group-hover:text-slate-700 transition" />
                  <span>Voltar para Ministério de Louvor</span>
                </button>
                <div className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200/60 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
                  <Music size={13} className="text-purple-600" />
                </div>
              </div>

              <RepertorioLouvor
                {...props}
                hideHeader={true}
                hideSidebar={true}
                onVoltar={() => handleNavegarTab('config')}
              />
            </div>
          )}
        </div>



        {/* ── COLUNA FIXA/STICKY À DIREITA (DESKTOP) ── */}
        <aside
          className={`hidden lg:block shrink-0 transition-all duration-300 lg:sticky lg:top-4 z-20 ${colunaRecolhida ? 'lg:w-20' : 'lg:w-64 xl:w-72'
            }`}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-sm p-3.5 space-y-3">
            {/* Header da Coluna Lateral */}
            {colunaRecolhida ? (
              <div className="flex flex-col items-center pb-2 border-b border-slate-100 gap-2">
                <div
                  className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm shadow-xs border border-blue-100/60"
                  title="Gestor Ministerial"
                >
                  <ShieldAlert size={20} className="text-blue-700" />
                </div>
                <button
                  type="button"
                  onClick={() => setColunaRecolhida(false)}
                  title="Expandir menu"
                  className="p-1 rounded-lg text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 px-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm shadow-xs border border-blue-100/60 shrink-0">
                    <ShieldAlert size={18} className="text-blue-700" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 truncate">
                      Gestor Ministerial
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold truncate">Menu de Navegação</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setColunaRecolhida(true)}
                  title="Recolher menu para ícones"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer shrink-0"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Navegação de Abas */}
            {colunaRecolhida ? (
              <nav className="space-y-2">
                {abas.map((a) => {
                  const Icon = a.icon;
                  const ativo = aba === a.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => handleNavegarTab(a.id)}
                      title={`${a.label} — ${a.desc}`}
                      className={`w-full flex items-center justify-center p-3 rounded-2xl transition-all duration-200 group cursor-pointer active:scale-95 relative ${ativo
                        ? 'bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white shadow-lg shadow-blue-700/25 border border-blue-400/30'
                        : a.id === 'repertorio'
                          ? 'text-purple-700 hover:text-purple-900 bg-purple-50/70 hover:bg-purple-100/80 border border-purple-200/80'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                        }`}
                    >
                      <Icon size={20} strokeWidth={ativo ? 2.5 : 2} />
                      {ativo && (
                        <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-5 rounded-r bg-blue-500 shadow-sm" />
                      )}
                    </button>
                  );
                })}
              </nav>
            ) : (
              <nav className="space-y-1.5">
                {abas.map((a) => {
                  const Icon = a.icon;
                  const ativo = aba === a.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => handleNavegarTab(a.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all duration-200 group cursor-pointer active:scale-95 ${ativo
                        ? 'bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white shadow-lg shadow-blue-700/25 border border-blue-400/30'
                        : a.id === 'repertorio'
                          ? 'text-purple-700 hover:text-purple-900 bg-purple-50/60 hover:bg-purple-100/70 border border-purple-200/70'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                        }`}
                    >
                      <span
                        className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-all duration-200 ${ativo
                          ? 'bg-white/20 text-white shadow-inner'
                          : a.id === 'repertorio'
                            ? 'bg-purple-100 text-purple-700 group-hover:bg-purple-200'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-700'
                          }`}
                      >
                        <Icon size={18} strokeWidth={ativo ? 2.5 : 2} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-black uppercase tracking-wider leading-tight truncate ${ativo ? 'text-white' : a.id === 'repertorio' ? 'text-purple-900 font-bold' : 'text-slate-700 group-hover:text-slate-900'
                          }`}>
                          {a.label}
                        </p>
                        <p className={`text-[10px] leading-tight truncate mt-0.5 font-medium ${ativo ? 'text-blue-100' : a.id === 'repertorio' ? 'text-purple-600/80 font-bold' : 'text-slate-400'
                          }`}>
                          {a.menuDesc || a.desc}
                        </p>
                      </div>
                      {ativo && (
                        <span className="w-1.5 h-6 rounded-full bg-white ml-auto shrink-0 shadow-xs" />
                      )}
                    </button>
                  );
                })}
              </nav>
            )}

            {/* Rodapé sutil com identificação */}
            {!colunaRecolhida && (
              <div className="pt-2 px-1 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>MIB Church</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Módulo Ativo" />
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}