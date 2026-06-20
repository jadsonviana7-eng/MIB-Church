import { useState, useMemo, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, AvatarCelula, PageHeader, Avatar, SelectFiltro, uploadImagemCelula } from './ui';
import { nomePessoa, nomeZona, valorOfertaRelatorio, agrupamentoPor } from './churchUtils';
import { extrairMetadadosReuniao, montarObservacoesComMetadados } from './reuniaoHelpers';
import { mascaraMoeda, desmascararMoeda } from './mascaras';
import ModalEditarCelula from './ModalEditarCelula';
import ModalExcluirCelula from './ModalExcluirCelula';
import ModalLancarReuniao from './ModalLancarReuniao';
import FormularioCelula from './FormularioCelula';

export default function CelulasModulo({
  submenu,
  celulas,
  celulasFiltradas,
  filtrosCelula,
  alterarFiltroCelula,
  limparFiltros,
  pessoas,
  zonas,
  relatoriosCelula,
  celulaSelecionadaId,
  setCelulaSelecionadaId,
  reuniaoSelecionadaId,
  setReuniaoSelecionadaId,
  obterDados,
  onNavigate,
  membroLogado,
  onMarcarReuniaoComoVista = () => {}
}) {
  const [celulaEditando, setCelulaEditando] = useState(null);
  const [celulaExcluindo, setCelulaExcluindo] = useState(null);
  const [reuniaoParaVer, setReuniaoParaVer] = useState(null);

  useEffect(() => {
    if (reuniaoSelecionadaId && relatoriosCelula) {
      const reuniao = relatoriosCelula.find(r => String(r.id) === String(reuniaoSelecionadaId));
      if (reuniao) {
        setReuniaoParaVer(reuniao);
        if (onMarcarReuniaoComoVista) {
          onMarcarReuniaoComoVista(reuniao.id);
        }
      }
    }
  }, [reuniaoSelecionadaId, relatoriosCelula, onMarcarReuniaoComoVista]);

  const isMembro = membroLogado?.permissao === 'membro';

  const abrirReuniao = (relatorio) => {
    if (onMarcarReuniaoComoVista) {
      onMarcarReuniaoComoVista(relatorio.id);
    }
    setReuniaoParaVer(relatorio);
  };

  if (celulaSelecionadaId) {
    const celula = celulas.find((item) => String(item.id) === String(celulaSelecionadaId));
    return (
      <>
        <DetalhesCelula 
          celula={celula} 
          celulas={celulas}
          pessoas={pessoas} 
          zonas={zonas} 
          relatoriosCelula={relatoriosCelula} 
          onFechar={() => setCelulaSelecionadaId(null)} 
          obterDados={obterDados} 
          breadcrumb={['Células', 'Ficha']} 
          onVerReuniao={abrirReuniao}
          membroLogado={membroLogado}
          setCelulaSelecionadaId={setCelulaSelecionadaId}
        />
        {reuniaoParaVer && (
          <ModalVerReuniao
            reuniao={reuniaoParaVer}
            celula={celulas.find(c => c.id === reuniaoParaVer.celula_id)}
            membros={pessoas.filter(p => p.celula_id === reuniaoParaVer.celula_id)}
            membroLogado={membroLogado}
            onFechar={() => {
              setReuniaoParaVer(null);
              if (setReuniaoSelecionadaId) setReuniaoSelecionadaId(null);
            }}
            onSalvo={async () => {
              await obterDados();
              setReuniaoParaVer(null);
              if (setReuniaoSelecionadaId) setReuniaoSelecionadaId(null);
            }}
          />
        )}
      </>
    );
  }

  if (submenu === 'adicionar') {
    return (
      <>
        <div className="hidden md:block">
          <PageHeader titulo="Adicionar Nova Célula" subtitulo="Cadastro da célula com liderança, agenda, endereço, zona e anotações." />
        </div>
        <FormularioCelula onCelulaCadastrada={obterDados} />
      </>
    );
  }

  if (submenu === 'reunioes') {
    return (
      <>
        <ReunioesCelulas
          celulas={celulas}
          pessoas={pessoas}
          relatoriosCelula={relatoriosCelula}
          obterDados={obterDados}
          onVoltar={() => onNavigate('lista')}
          onVerReuniao={abrirReuniao}
        />
        {reuniaoParaVer && (
          <ModalVerReuniao
            reuniao={reuniaoParaVer}
            celula={celulas.find(c => c.id === reuniaoParaVer.celula_id) || {}}
            membros={pessoas.filter(p => p.celula_id === reuniaoParaVer.celula_id)}
            membroLogado={membroLogado}
            onFechar={() => {
              setReuniaoParaVer(null);
              if (setReuniaoSelecionadaId) setReuniaoSelecionadaId(null);
            }}
            onSalvo={async () => {
              await obterDados();
              setReuniaoParaVer(null);
              if (setReuniaoSelecionadaId) setReuniaoSelecionadaId(null);
            }}
          />
        )}
      </>
    );
  }

  if (submenu === 'relatorios') {
    return (
      <RelatoriosCelulas
        celulas={celulas}
        pessoas={pessoas}
        relatoriosCelula={relatoriosCelula}
        zonas={zonas}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
        <Card className="p-0">
          <CardHeader
            titulo={`${celulasFiltradas.length} Células Cadastradas`}
          />
          {celulasFiltradas.length === 0 ? (
            <div className="p-10 text-center text-sm text-[var(--text-muted)]">Nenhuma célula encontrada.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-mib">
                <thead className="hidden md:table-header-group">
                  <tr>
                    <th>Célula</th>
                    <th>Líder</th>
                    <th>Agenda</th>
                    <th>Membros</th>
                    <th className="text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {celulasFiltradas.map((celula) => {
                    const membros = pessoas.filter((p) => String(p.celula_id || '') === String(celula.id) && p.status !== 'inativo');
                    return (
                      <tr
                        key={celula.id}
                        onClick={() => setCelulaSelecionadaId(celula.id)}
                        className="cursor-pointer"
                      >
                        <td>
                          <div className="flex items-center gap-3 py-3 md:py-2">
                            <AvatarCelula celula={celula} />
                            <div>
                              <span className="font-semibold text-[var(--text-heading)] block">{celula.nome}</span>
                              <span className="md:hidden text-[var(--text-muted)] text-xs">{nomePessoa(pessoas, celula.lider_id)}</span>
                            </div>
                          </div>
                        </td>
                        <td className="hidden md:table-cell">{nomePessoa(pessoas, celula.lider_id)}</td>
                        <td className="hidden md:table-cell text-[var(--text-muted)]">{celula.dia_semana || 'Sem dia'} · {celula.horario || '—'}</td>
                        <td className="text-right pr-6">
                          {!isMembro && (
                            <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              title="Editar célula"
                              onClick={(e) => { e.stopPropagation(); setCelulaEditando(celula); }}
                              className="text-[#055F6D] hover:text-[#044a56] transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              title="Excluir célula"
                              onClick={(e) => { e.stopPropagation(); setCelulaExcluindo(celula); }}
                              className="text-rose-500 hover:text-rose-700 transition p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
        <Card className="p-5 space-y-4 h-fit">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <h3 className="font-semibold text-sm text-[var(--text-heading)] uppercase tracking-wider">Filtros</h3>
            <button type="button" onClick={limparFiltros} className="text-xs font-medium text-[#2563eb]">Limpar</button>
          </div>
          <SelectFiltro label="Perfil / Público" valor={filtrosCelula.faixaEtaria} onChange={(v) => alterarFiltroCelula('faixaEtaria', v)} opcoes={['Mista', 'Adultos', 'Jovens', 'Adolescentes', 'Crianças', 'Casais', 'Empresarial']} />
          <SelectFiltro label="Gênero" valor={filtrosCelula.genero} onChange={(v) => alterarFiltroCelula('genero', v)} opcoes={['Mista', 'Masculina', 'Feminina']} />
          <SelectFiltro label="Dia da semana" valor={filtrosCelula.diaSemana} onChange={(v) => alterarFiltroCelula('diaSemana', v)} opcoes={['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']} />
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Horário</label>
            <input type="time" value={filtrosCelula.horario} onChange={(e) => alterarFiltroCelula('horario', e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
          </div>
        </Card>
      </div>

      {/* Modal Editar Célula */}
      {celulaEditando && (
        <ModalEditarCelula
          celula={celulaEditando}
          onFechar={() => setCelulaEditando(null)}
          onSalvo={async () => { await obterDados(); setCelulaEditando(null); }}
        />
      )}

      {/* Modal Excluir Célula */}
      {celulaExcluindo && (
        <ModalExcluirCelula
          celula={celulaExcluindo}
          onFechar={() => setCelulaExcluindo(null)}
          onExcluida={async () => { await obterDados(); setCelulaExcluindo(null); }}
        />
      )}
    </>
  );
}

function ReunioesCelulas({ celulas, pessoas, relatoriosCelula, obterDados, onVoltar, onVerReuniao }) {
  const [modalAberto, setModalAberto] = useState(false);

  async function handleExcluirReuniao(e, id) {
    e.stopPropagation();
    if (!(await window.confirmModal('Excluir Relatório', 'Tem certeza que deseja excluir este relatório de reunião?'))) return;
    try {
      const { error } = await supabase.from('relatorios_celula').delete().eq('id', id);
      if (error) throw error;
      if (obterDados) await obterDados();
    } catch (error) {
      window.alert(`Erro ao excluir reunião: ${error.message}`);
    }
  }

  return (
    <>
      {/* PageHeader visível apenas em telas maiores que md */}
      <div className="hidden md:block">
        <PageHeader titulo="Reuniões realizadas" breadcrumb={['Células', 'Reuniões']} onNavigate={onVoltar} subtitulo="Histórico de encontros cadastrados pelas células.">
          <button type="button" onClick={() => setModalAberto(true)} className="btn-primary text-xs font-semibold px-4 py-2 rounded-xl">
            + Adicionar Reunião
          </button>
        </PageHeader>
      </div>
      <Card className="p-0 overflow-hidden">
        <CardHeader titulo={`${relatoriosCelula.length} reuniões no histórico`} />
        <div className="overflow-x-auto max-h-[70vh]">
          {/* TABELA - Visível em Desktop */}
          <table className="table-mib hidden md:table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Célula</th>
                <th>Membros</th>
                <th>Visitantes</th>
                <th>Oferta</th>
                <th className="text-right pr-6">Ações</th>
              </tr>
            </thead>
            <tbody>
              {relatoriosCelula.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-[var(--text-muted)] italic">Nenhuma reunião cadastrada.</td>
                </tr>
              ) : (
                relatoriosCelula.map((r) => (
                  <tr key={r.id} onClick={() => onVerReuniao(r)} className="cursor-pointer hover:bg-slate-50 transition">
                    <td className="font-medium">{r.data_reuniao ? new Date(`${r.data_reuniao}T00:00:00`).toLocaleDateString('pt-BR') : '—'}</td>
                    <td>{r.celulas?.nome || '—'}</td>
                    <td>
                      <span className="px-4 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                        {r.presencas_relatorio?.[0]?.count || 0} 
                      </span>
                    </td>
                    <td>{Number(r.visitantes_presentes || 0)}</td>
                    <td>R$ {valorOfertaRelatorio(r).toFixed(2)}</td>
                    <td className="text-right pr-6">
                      <div className="flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => onVerReuniao(r)}
                          className="text-[#055F6D] hover:text-[#044a56] transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                          title="Ver/Editar Reunião"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          onClick={(e) => handleExcluirReuniao(e, r.id)}
                          className="text-rose-500 hover:text-rose-700 transition p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer"
                          title="Excluir Reunião"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* LISTA COMPACTA - Visível apenas em Mobile */}
          <div className="md:hidden divide-y divide-slate-100">
            {relatoriosCelula.length === 0 ? (
              <p className="p-10 text-center text-sm text-[var(--text-muted)] italic">Nenhuma reunião cadastrada.</p>
            ) : (
              relatoriosCelula.map((r) => (
                <div
                  key={r.id}
                  onClick={() => onVerReuniao(r)}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 transition active:scale-[0.98] cursor-pointer"
                >
                  <div className="flex items-center justify-between flex-1 pr-4">
                    <div className="flex flex-col">
                      <p className="text-sm font-black text-slate-800 tracking-tight">
                        {r.data_reuniao ? new Date(`${r.data_reuniao}T00:00:00`).toLocaleDateString('pt-BR') : 'Sem data'}
                      </p>
                      <p className="text-xs text-slate-500 font-bold uppercase mt-0.5">
                        {r.celulas?.nome || 'Célula'}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center">
                        <span className="text-[20px] font-black text-blue-600 leading-none">{r.presencas_relatorio?.[0]?.count || 0}</span>
                        <span className="text-[10px] font-black uppercase text-blue-600 mt-1">Membros</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[20px] font-black text-amber-600 leading-none">{Number(r.visitantes_presentes || 0)}</span>
                        <span className="text-[10px] font-black uppercase text-amber-600 mt-1">Visitantes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                    <button 
                      onClick={(e) => handleExcluirReuniao(e, r.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>
      {modalAberto && (
        <ModalLancarReuniao celulas={celulas} pessoas={pessoas} onFechar={() => setModalAberto(false)} onSalvo={obterDados} />
      )}
    </>
  );
}

function RelatoriosCelulas({ celulas, pessoas, relatoriosCelula, zonas, onNavigate }) {
  const [tipoAtivo, setTipoAtivo] = useState('frequencias');
  const [subTipoAtivo, setSubTipoAtivo] = useState('reunioes');
  const [abaCategoriaAtiva, setAbaCategoriaAtiva] = useState('');
  const [categoriaHover, setCategoriaHover] = useState(null);
  const [dataInicio, setDataInicio] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  });
  const [dataFim, setDataFim] = useState(new Date().toISOString().split('T')[0]);
  const [calendarioAberto, setCalendarioAberto] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());

  const [presencasPeriodo, setPresencasPeriodo] = useState([]);
  const [carregandoPresencas, setCarregandoPresencas] = useState(false);

  // Categorias únicas para as abas do relatório de desenvolvimento
  const categoriasUnicas = useMemo(() => {
    const cats = [...new Set(celulas.map(c => c.faixa_etaria || 'Não definida'))].sort();
    return cats;
  }, [celulas]);

  // Sincroniza a aba ativa quando entrar no relatório de categorias
  useEffect(() => {
    if (subTipoAtivo === 'cat_celulas' && !abaCategoriaAtiva && categoriasUnicas.length > 0) {
      setAbaCategoriaAtiva(categoriasUnicas[0]);
    }
  }, [subTipoAtivo, categoriasUnicas, abaCategoriaAtiva]);

  const chartColorsRelatorio = ['#055F6D', '#2563eb', '#f59e0b', '#8b5cf6', '#f472b6', '#14b8a6', '#64748b'];

  const formatarParaISO = (date) => {
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const formatarExibicao = (iso) => {
    if (!iso) return '__/__/__';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y.slice(-2)}`;
  };

  const setPeriodoRapido = (tipo) => {
    const hoje = new Date();
    let inicio = new Date();
    let fim = new Date();
    switch (tipo) {
      case 'hoje': break;
      case 'ontem':
        inicio.setDate(hoje.getDate() - 1);
        fim.setDate(hoje.getDate() - 1);
        break;
      case '7dias':
        inicio.setDate(hoje.getDate() - 6);
        break;
      case '30dias':
        inicio.setDate(hoje.getDate() - 29);
        break;
      case 'mes_atual':
        inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
        break;
      case 'mes_anterior':
        inicio = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
        fim = new Date(hoje.getFullYear(), hoje.getMonth(), 0);
        break;
      default: return;
    }
    setDataInicio(formatarParaISO(inicio));
    setDataFim(formatarParaISO(fim));
    setCalendarioAberto(false);
  };

  useEffect(() => {
    if (!calendarioAberto) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest('.datepicker-container')) setCalendarioAberto(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [calendarioAberto]);

  const categoriasRelatorios = [
    {
      id: 'frequencias',
      label: '1. Frequências',
      itens: [
        { id: 'reunioes', label: 'Relatório de reuniões' },
        { id: 'part_x_vis', label: 'Participantes x Visitantes' },
        { id: 'presentes', label: 'Pessoas Presentes' },
        { id: 'ausentes', label: 'Pessoas Ausentes' },
        { id: 'sem_celula', label: 'Pessoas sem células' }
      ]
    },
    {
      id: 'desenvolvimento',
      label: '2. Desenvolvimento',
      itens: [
        { id: 'cat_celulas', label: 'Categoria de células' },
        { id: 'novas_celulas', label: 'Novas células' },
        { id: 'ativas_inativas', label: 'Células Ativas/Inativas' }
      ]
    },
    {
      id: 'lideranca',
      label: '3. Liderança',
      itens: [
        { id: 'lideres', label: 'Relatório de Líderes' },
        { id: 'colideres', label: 'Relatório de Co-líderes' },
        { id: 'auxiliares', label: 'Relatório de Auxiliares' }
      ]
    },
    {
      id: 'outros',
      label: '4. Outros',
      itens: [
        { id: 'zona', label: 'Relatórios de Zona' },
        { id: 'dias_horarios', label: 'Dias e Horários' }
      ]
    }
  ];

  const relatoriosFiltrados = useMemo(() => {
    return relatoriosCelula.filter(r => {
      if (!dataInicio || !dataFim) return true;
      return r.data_reuniao >= dataInicio && r.data_reuniao <= dataFim;
    });
  }, [relatoriosCelula, dataInicio, dataFim]);

  useEffect(() => {
    const idsRelatorios = relatoriosFiltrados.map(r => r.id);
    if (idsRelatorios.length === 0) {
      setPresencasPeriodo([]);
      return;
    }
    
    async function carregarPresencas() {
      setCarregandoPresencas(true);
      const { data, error } = await supabase
        .from('presencas_relatorio')
        .select('relatorio_id, pessoa_id')
        .in('relatorio_id', idsRelatorios);
      
      if (!error && data) setPresencasPeriodo(data);
      setCarregandoPresencas(false);
    }

    carregarPresencas();
  }, [relatoriosFiltrados]);

  const dadosRelatorio = useMemo(() => {
    switch (subTipoAtivo) {
      // --- FREQUENCIAS ---
      case 'reunioes':
        return relatoriosFiltrados.map(r => {
          const { tema } = extrairMetadadosReuniao(r.observacoes);
          return {
            col1: new Date(r.data_reuniao + 'T00:00:00').toLocaleDateString('pt-BR'),
            col2: r.celulas?.nome,
            col3: tema || 'Sem tema',
            col4: `R$ ${Number(r.oferta || 0).toFixed(2)}`
          };
        });
      
      case 'part_x_vis':
        return celulas.map(c => {
          const rels = relatoriosFiltrados.filter(r => r.celula_id === c.id);
          const totalPart = rels.reduce((acc, curr) => acc + (curr.presencas_relatorio?.[0]?.count || 0), 0);
          const totalVis = rels.reduce((acc, curr) => acc + Number(curr.visitantes_presentes || 0), 0);
          return { col1: c.nome, col2: `${totalPart} Membros`, col3: `${totalVis} Visitantes`, col4: rels.length > 0 ? `${(totalVis/(totalPart+totalVis || 1)*100).toFixed(0)}% visitantes` : '-' };
        });

      case 'presentes': {
        const stats = {};
        presencasPeriodo.forEach(p => { stats[p.pessoa_id] = (stats[p.pessoa_id] || 0) + 1; });
        return pessoas
          .filter(p => stats[p.id] > 0)
          .map(p => {
            const totalReunioesCelula = relatoriosFiltrados.filter(r => r.celula_id === p.celula_id).length;
            return {
              col1: p.nome,
              col2: celulas.find(c => c.id === p.celula_id)?.nome || 'Sem Célula',
              col3: `${stats[p.id]} de ${totalReunioesCelula} reuniões`,
              col4: '✓ Presente'
            };
          })
          .sort((a, b) => a.col1.localeCompare(b.col1));
      }

      case 'ausentes': {
        const stats = {};
        presencasPeriodo.forEach(p => { stats[p.pessoa_id] = (stats[p.pessoa_id] || 0) + 1; });
        return pessoas
          .filter(p => p.celula_id && p.status !== 'inativo' && !stats[p.id])
          .filter(p => relatoriosFiltrados.some(r => r.celula_id === p.celula_id))
          .map(p => {
            const totalReunioesCelula = relatoriosFiltrados.filter(r => r.celula_id === p.celula_id).length;
            return {
              col1: p.nome,
              col2: celulas.find(c => c.id === p.celula_id)?.nome || 'Sem Célula',
              col3: `0 de ${totalReunioesCelula} reuniões`,
              col4: '⚠️ Ausente'
            };
          })
          .sort((a, b) => a.col1.localeCompare(b.col1));
      }

      case 'sem_celula':
        return pessoas.filter(p => !p.celula_id && p.status !== 'inativo').map(p => ({
          col1: p.nome,
          col2: p.telefone || 'Sem contato',
          col3: p.tipo_membro || 'Visitante',
          col4: 'Aguardando vínculo'
        }));

      // --- DESENVOLVIMENTO ---
      case 'cat_celulas':
        const cats = {};
        celulas.forEach(c => { cats[c.faixa_etaria || 'Não definida'] = (cats[c.faixa_etaria || 'Não definida'] || 0) + 1; });
        return Object.entries(cats).map(([cat, qtd]) => ({ col1: cat, col2: `${qtd} Células`, col3: '', col4: '' }));

      case 'novas_celulas':
        return [...celulas].sort((a, b) => new Date(b.data_abertura) - new Date(a.data_abertura)).map(c => ({
          col1: c.nome,
          col2: c.data_abertura ? new Date(c.data_abertura + 'T00:00:00').toLocaleDateString('pt-BR') : 'Sem data',
          col3: nomePessoa(pessoas, c.lider_id),
          col4: 'Nova Unidade'
        }));

      case 'ativas_inativas':
        return celulas.map(c => {
          const ultimoRel = relatoriosFiltrados.find(r => r.celula_id === c.id);
          const isAtiva = !!ultimoRel;
          return {
            col1: c.nome,
            col2: isAtiva ? 'ATIVA' : 'INATIVA',
            col3: ultimoRel ? `Última em ${new Date(ultimoRel.data_reuniao + 'T00:00:00').toLocaleDateString('pt-BR')}` : 'Nunca reuniu',
            col4: isAtiva ? '✓ OK' : '⚠️ Sem registro'
          };
        });

      // --- LIDERANÇA ---
      case 'lideres':
        return celulas.map(c => ({ col1: nomePessoa(pessoas, c.lider_id), col2: 'Líder', col3: c.nome, col4: 'Ativo' }));
      case 'colideres':
        return celulas.filter(c => c.co_lider_id).map(c => ({ col1: nomePessoa(pessoas, c.co_lider_id), col2: 'Co-líder', col3: c.nome, col4: 'Treinamento' }));
      case 'auxiliares':
        return celulas.filter(c => c.auxiliar_id).map(c => ({ col1: nomePessoa(pessoas, c.auxiliar_id), col2: 'Auxiliar', col3: c.nome, col4: 'Apoio' }));

      // --- OUTROS ---
      case 'zona':
        return celulas.map(c => ({ col1: c.nome, col2: nomeZona(zonas, c.zona_id), col3: c.bairro || '-', col4: '' }));
      case 'dias_horarios':
        return celulas.map(c => ({ col1: c.nome, col2: c.dia_semana || 'Não definido', col3: c.horario || 'Não definido', col4: '' }));

      default: return [];
    }
  }, [subTipoAtivo, celulas, pessoas, relatoriosFiltrados, zonas, presencasPeriodo]);

  const colunas = useMemo(() => {
    if (tipoAtivo === 'lideranca') return ['Nome', 'Cargo', 'Célula', 'Status'];
    if (subTipoAtivo === 'reunioes') return ['Data', 'Célula', 'Tema', 'Oferta'];
    if (subTipoAtivo === 'part_x_vis') return ['Célula', 'Participantes', 'Visitantes', 'Engajamento'];
    if (subTipoAtivo === 'sem_celula') return ['Nome', 'Contato', 'Tipo', 'Observação'];
    if (subTipoAtivo === 'presentes' || subTipoAtivo === 'ausentes') return ['Nome', 'Célula', 'Frequência', 'Status'];
    if (subTipoAtivo === 'ativas_inativas') return ['Célula', 'Status Atual', 'Último Encontro', 'Análise'];
    if (subTipoAtivo === 'zona') return ['Célula', 'Zona', 'Bairro', ''];
    if (subTipoAtivo === 'dias_horarios') return ['Célula', 'Dia', 'Horário', ''];
    return ['Descrição', 'Valor / Info', '', ''];
  }, [tipoAtivo, subTipoAtivo]);

  // Componente interno para o Gráfico Meia Rosca
  const MeiaRosca = ({ dados, categoriaHover, setCategoriaHover }) => {
    const total = Object.values(dados).reduce((a, b) => a + b, 0);
    if (total === 0) return <p className="text-xs text-slate-400 italic text-center py-4">Nenhuma categoria definida.</p>;

    // Arco de meia rosca: de 180° a 0° (sentido horário, parte superior)
    // cx=160, cy=150, r_ext=130, r_int=80
    const cx = 160, cy = 150, rExt = 130, rInt = 80;
    const strokeW = rExt - rInt; // 50

    const polarToXY = (angleDeg, r) => {
      const rad = (angleDeg - 180) * (Math.PI / 180);
      return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    };

    let acumulado = 0;
    const entradas = Object.entries(dados);

    return (
      <div className="flex flex-col items-center w-full">
        <svg viewBox="0 0 320 160" className="w-full max-w-sm" style={{ overflow: 'visible' }}>
          {/* Trilha de fundo */}
          <path
            d={`M ${cx - rExt + strokeW / 2} ${cy} A ${rExt - strokeW / 2} ${rExt - strokeW / 2} 0 0 1 ${cx + rExt - strokeW / 2} ${cy}`}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeW}
            strokeLinecap="butt"
          />

          {entradas.map(([label, valor], i) => {
            const anguloInicio = (acumulado / total) * 180;
            const anguloFim = ((acumulado + valor) / total) * 180;
            acumulado += valor;

            const r = (rExt + rInt) / 2; // raio médio
            const p1 = polarToXY(anguloInicio, r);
            const p2 = polarToXY(anguloFim, r);
            const largeArc = (anguloFim - anguloInicio) > 180 ? 1 : 0;
            const cor = chartColorsRelatorio[i % chartColorsRelatorio.length];
            const isHover = categoriaHover === label;

            return (
              <path
                key={label}
                d={`M ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArc} 1 ${p2.x} ${p2.y}`}
                fill="none"
                stroke={cor}
                strokeWidth={isHover ? strokeW + 6 : strokeW - 2}
                strokeLinecap="butt"
                style={{ transition: 'stroke-width 0.2s ease, opacity 0.2s ease', opacity: categoriaHover && !isHover ? 0.4 : 1, cursor: 'pointer' }}
                onMouseEnter={() => setCategoriaHover(label)}
                onMouseLeave={() => setCategoriaHover(null)}
              />
            );
          })}

          {/* Texto central */}
          <text x={cx} y={cy - 18} textAnchor="middle" fill="#0f172a" style={{ fontSize: 32, fontWeight: 900, fontFamily: 'inherit' }}>{total}</text>
          <text x={cx} y={cy - 4} textAnchor="middle" fill="#94a3b8" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>células</text>

          {/* Tooltip de hover */}
          {categoriaHover && dados[categoriaHover] !== undefined && (() => {
            const idx = entradas.findIndex(([l]) => l === categoriaHover);
            let ang = 0;
            for (let j = 0; j < idx; j++) ang += (entradas[j][1] / total) * 180;
            ang += (entradas[idx][1] / total) * 90;
            const r = (rExt + rInt) / 2;
            const pt = polarToXY(ang, r + 20);
            const pct = ((dados[categoriaHover] / total) * 100).toFixed(0);
            return (
              <g>
                <rect x={pt.x - 26} y={pt.y - 16} width={52} height={22} rx={6} fill="#0f172a" opacity={0.88} />
                <text x={pt.x} y={pt.y - 3} textAnchor="middle" fill="white" style={{ fontSize: 9, fontWeight: 800 }}>{dados[categoriaHover]} · {pct}%</text>
              </g>
            );
          })()}
        </svg>

        {/* Legenda em Formato de Tabela */}
        <div className="w-full mt-6 border-t border-slate-100 pt-2">
          <table className="w-full text-[10px]">
            <tbody>
              {entradas.map(([label, valor], i) => {
                const cor = chartColorsRelatorio[i % chartColorsRelatorio.length];
                const isHover = categoriaHover === label;
                const pct = total > 0 ? ((valor / total) * 100).toFixed(0) : 0;
                
                return (
                  <tr 
                    key={label} 
                    className={`transition-all border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer ${isHover ? 'bg-slate-50' : ''}`}
                    onMouseEnter={() => setCategoriaHover(label)}
                    onMouseLeave={() => setCategoriaHover(null)}
                  >
                    <td className="py-2 pl-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cor }} />
                        <span className="font-bold text-slate-600 uppercase tracking-wide">{label}</span>
                      </div>
                    </td>
                    <td className="py-2 text-right font-black text-slate-700">{valor}</td>
                    <td className="py-2 text-right pr-2 text-slate-400 font-bold w-12">{pct}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const CalendarPopup = () => {
    const ano = viewDate.getFullYear();
    const mes = viewDate.getMonth();
    const primeiroDiaMes = new Date(ano, mes, 1).getDay();
    const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();
    const dias = [];
    for (let i = 0; i < (primeiroDiaMes === 0 ? 6 : primeiroDiaMes - 1); i++) dias.push(null);
    for (let d = 1; d <= ultimoDiaMes; d++) dias.push(new Date(ano, mes, d));

    return (
      <div className="absolute top-full right-0 mt-2 z-[100] bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden flex animate-in fade-in zoom-in duration-200">
        {/* Menu Lateral de Atalhos */}
        <div className="w-36 bg-slate-50 border-r border-slate-100 p-2 flex flex-col gap-1 shrink-0">
          <span className="text-[9px] font-black text-slate-400 uppercase px-2 py-1 mb-1 tracking-widest">Atalhos</span>
          <button onClick={() => setPeriodoRapido('hoje')} className="text-left px-2 py-1.5 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-white hover:text-[#055F6D] transition whitespace-nowrap">Hoje</button>
          <button onClick={() => setPeriodoRapido('7dias')} className="text-left px-2 py-1.5 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-white hover:text-[#055F6D] transition whitespace-nowrap">Últimos 7 dias</button>
          <button onClick={() => setPeriodoRapido('30dias')} className="text-left px-2 py-1.5 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-white hover:text-[#055F6D] transition whitespace-nowrap">Últimos 30 dias</button>
          <button onClick={() => setPeriodoRapido('mes_atual')} className="text-left px-2 py-1.5 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-white hover:text-[#055F6D] transition whitespace-nowrap">Este mês</button>
          <button onClick={() => setPeriodoRapido('mes_anterior')} className="text-left px-2 py-1.5 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-white hover:text-[#055F6D] transition whitespace-nowrap">Mês anterior</button>
        </div>

        {/* Calendário */}
        <div className="p-4 w-72">
          <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={() => setViewDate(new Date(ano, mes - 1, 1))} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400">‹</button>
          <span className="text-sm font-bold text-slate-700">{viewDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</span>
          <button type="button" onClick={() => setViewDate(new Date(ano, mes + 1, 1))} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400">›</button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map(d => <div key={d} className="text-[10px] font-bold text-slate-300 text-center">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {dias.map((dia, i) => {
            if (!dia) return <div key={i} />;
            const dStr = formatarParaISO(dia);
            const ativo = dStr === dataInicio || dStr === dataFim;
            const noRange = dataInicio && dataFim && dStr > dataInicio && dStr < dataFim;
            return (
              <button
                key={i} type="button" onClick={() => {
                  if (!dataInicio || (dataInicio && dataFim)) { setDataInicio(dStr); setDataFim(''); }
                  else { dStr < dataInicio ? (setDataFim(dataInicio), setDataInicio(dStr)) : setDataFim(dStr); setCalendarioAberto(false); }
                }}
                className={`h-8 w-8 text-xs rounded-lg transition-colors ${ativo ? 'bg-[#055F6D] text-white font-bold' : noRange ? 'bg-emerald-50 text-[#055F6D]' : 'hover:bg-slate-50 text-slate-600'}`}
              >
                {dia.getDate()}
              </button>
            );
          })}
        </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
        {/* PAINEL LATERAL DE FILTROS */}
        <aside className="space-y-4 lg:sticky lg:top-24">
          <Card className="p-0 overflow-hidden shadow-sm">
            <CardHeader titulo="Menu de Relatórios" />
          {/* Select para mobile */}
          <div className="p-4 md:hidden">
            <select
              value={tipoAtivo}
              onChange={(e) => {
                const newTipo = e.target.value;
                setTipoAtivo(newTipo);
                // Encontra o primeiro item do novo tipo para definir como subTipoAtivo
                const categoria = categoriasRelatorios.find(cat => cat.id === newTipo);
                if (categoria && categoria.itens.length > 0) {
                  setSubTipoAtivo(categoria.itens[0].id);
                } else {
                  setSubTipoAtivo(''); // Limpa se não houver itens
                }
              }}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white outline-none"
            >
              {categoriasRelatorios.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
            {/* Sub-select para mobile */}
            {tipoAtivo && categoriasRelatorios.find(cat => cat.id === tipoAtivo)?.itens.length > 0 && (
              <select
                value={subTipoAtivo}
                onChange={(e) => setSubTipoAtivo(e.target.value)}
                className="w-full px-3 py-2 mt-2 border border-slate-200 rounded-xl text-sm bg-white outline-none"
              >
                {categoriasRelatorios.find(cat => cat.id === tipoAtivo)?.itens.map(item => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
            )}
          </div>
          {/* Botões para desktop */}
          <div className="p-4 space-y-4 hidden md:block">
            {categoriasRelatorios.map(cat => (
              <div key={cat.id} className="space-y-1">
                <div className={`px-3 py-2 text-[18px] font-black uppercase ${tipoAtivo === cat.id ? 'text-[#055F6D]' : 'text-slate-400'}`}>
                  {cat.label}
                </div>
                {cat.itens.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setTipoAtivo(cat.id); setSubTipoAtivo(item.id); }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between group ${subTipoAtivo === item.id ? 'bg-[#055F6D] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {item.label}
                    <span className={`transition-transform group-hover:translate-x-1 ${subTipoAtivo === item.id ? 'opacity-100' : 'opacity-0'}`}>→</span>
                  </button>
                ))}
                <div className="h-2" />
              </div>
            ))}
          </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-[#055F6D] to-[#044a56] text-blue">
            <h4 className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Resumo Rápido</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-bold opacity-70 uppercase">Células Totais</span>
                <span className="text-xl font-black">{celulas.length}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-bold opacity-70 uppercase">Sem Célula</span>
                <span className="text-xl font-black text-amber-300">{pessoas.filter(p => !p.celula_id && p.status !== 'inativo').length}</span>
              </div>
            </div>
          </Card>
        </aside>

        {/* ÁREA DE RESULTADOS */}
        <main className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm gap-4">
            <div>
              <h3 className="font-black text-slate-800 uppercase tracking-tight text-sm">
                {categoriasRelatorios.find(c => c.id === tipoAtivo)?.itens.find(i => i.id === subTipoAtivo)?.label}
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Resultados processados em tempo real</p>
            </div>
            
            {subTipoAtivo !== 'cat_celulas' && (
              <div className="relative datepicker-container shrink-0">
                <div 
                  onClick={() => setCalendarioAberto(!calendarioAberto)}
                  className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer transition-all hover:border-[#055F6D] group"
                >
                  <span className="text-slate-400 group-hover:text-[#055F6D] transition-colors">📅</span>
                  <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                    <span>{formatarExibicao(dataInicio)}</span>
                    <span className="text-slate-300">→</span>
                    <span>{formatarExibicao(dataFim)}</span>
                  </div>
                </div>
                {calendarioAberto && <CalendarPopup />}
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={() => window.print()} className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition" title="Imprimir Relatório">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </button>
            </div>
          </div>

          {subTipoAtivo === 'cat_celulas' ? (
            /* ── CATEGORIA DE CÉLULAS: Meia rosca + abas por categoria ── */
            (() => {
              const dadosRosca = {};
              celulas.forEach(c => {
                const cat = c.faixa_etaria || 'Não definida';
                dadosRosca[cat] = (dadosRosca[cat] || 0) + 1;
              });
              const todasCats = Object.keys(dadosRosca).sort();
              const abaAtual = abaCategoriaAtiva || todasCats[0] || '';
              const celulasDaAba = celulas.filter(c => (c.faixa_etaria || 'Não definida') === abaAtual);

              return (
                <div className="space-y-4">
                  {/* Gráfico meia rosca */}
                  <Card className="p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 text-center">Distribuição por Categoria</p>
                    <MeiaRosca dados={dadosRosca} categoriaHover={categoriaHover} setCategoriaHover={setCategoriaHover} />
                  </Card>

                  {/* Multipage por categoria */}
                  <Card className="p-0 overflow-hidden">
                    {/* Abas */}
                    <div className="flex overflow-x-auto border-b border-slate-100 bg-slate-50/60 px-2 pt-2 gap-1 scrollbar-hide">
                      {todasCats.map((cat, i) => {
                        const cor = chartColorsRelatorio[i % chartColorsRelatorio.length];
                        const isAtivo = cat === abaAtual;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setAbaCategoriaAtiva(cat)}
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-xl text-[11px] font-bold whitespace-nowrap transition-all shrink-0 border-b-2 ${isAtivo ? 'bg-white border-b-2 text-slate-900 shadow-sm' : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-white/60'}`}
                            style={{ borderBottomColor: isAtivo ? cor : 'transparent' }}
                          >
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cor }} />
                            {cat}
                            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ml-0.5 ${isAtivo ? 'text-white' : 'text-slate-400 bg-slate-200'}`}
                              style={isAtivo ? { backgroundColor: cor } : {}}>
                              {dadosRosca[cat]}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Tabela da aba ativa */}
                    <div className="overflow-x-auto">
                      <table className="table-mib">
                        <thead>
                          <tr className="bg-slate-50">
                            <th>Célula</th>
                            <th>Líder</th>
                            <th>Dia / Horário</th>
                            <th className="text-right pr-6">Membros</th>
                          </tr>
                        </thead>
                        <tbody>
                          {celulasDaAba.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="py-10 text-center text-slate-400 italic text-xs">Nenhuma célula nesta categoria.</td>
                            </tr>
                          ) : (
                            celulasDaAba.map(c => {
                              const membros = pessoas.filter(p => String(p.celula_id || '') === String(c.id) && p.status !== 'inativo');
                              return (
                                <tr key={c.id}>
                                  <td className="font-bold text-slate-800">{c.nome}</td>
                                  <td className="text-slate-500 text-xs">{nomePessoa(pessoas, c.lider_id)}</td>
                                  <td className="text-slate-500 text-xs">{c.dia_semana || '—'} {c.horario ? `· ${c.horario}` : ''}</td>
                                  <td className="text-right pr-6">
                                    <span className="text-xs font-black text-[#2563eb]">{membros.length}</span>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Rodapé com total da aba */}
                    <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{abaAtual}</span>
                      <span className="text-[10px] font-black text-slate-600">{celulasDaAba.length} células · {celulasDaAba.reduce((s, c) => s + pessoas.filter(p => String(p.celula_id || '') === String(c.id) && p.status !== 'inativo').length, 0)} membros</span>
                    </div>
                  </Card>
                </div>
              );
            })()
          ) : (
          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-mib">
                <thead>
                  <tr className="bg-slate-50">
                    {colunas.map((col, i) => <th key={i} className={i === 0 ? '' : i === 3 ? 'text-right pr-6' : ''}>{col}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {carregandoPresencas && (subTipoAtivo === 'presentes' || subTipoAtivo === 'ausentes') ? (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-slate-400 animate-pulse">Cruzando dados de presença...</td>
                    </tr>
                  ) : dadosRelatorio.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-slate-400 italic">Nenhum dado encontrado para esta categoria.</td>
                    </tr>
                  ) : (
                    dadosRelatorio.map((row, idx) => (
                      <tr key={idx}>
                        <td className="font-bold text-slate-700">{row.col1}</td>
                        <td className="text-slate-500 text-xs font-medium">{row.col2}</td>
                        <td className="text-slate-500 text-xs font-medium">{row.col3}</td>
                        <td className="text-right pr-6">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            row.col4.includes('⚠️') || row.col4.includes('Inativa') ? 'bg-rose-50 text-rose-600' : 
                            row.col4.includes('✓') || row.col4.includes('Membro') ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400'
                          }`}>
                            {row.col4}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
          )}

          {/* DICAS DE ANÁLISE (CONTEXTUAL) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
              <span className="text-xl">💡</span>
              <div>
                <h5 className="text-xs font-bold text-blue-900 uppercase tracking-tight">Dica de Gestão</h5>
                <p className="text-[11px] text-blue-700 mt-1 leading-relaxed">
                  {tipoAtivo === 'frequencias' ? 'Monitore a relação visitantes x participantes para entender o potencial de crescimento da sua rede de células.' : 
                   tipoAtivo === 'desenvolvimento' ? 'Células inativas por mais de 30 dias podem precisar de suporte ou readequação da liderança.' : 
                   'Mantenha os dados de co-líderes e auxiliares atualizados para garantir a sucessão e multiplicação saudável.'}
                </p>
              </div>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-3">
              <span className="text-xl">📊</span>
              <div>
                <h5 className="text-xs font-bold text-emerald-900 uppercase tracking-tight">Exportação</h5>
                <p className="text-[11px] text-emerald-700 mt-1 leading-relaxed">
                  Você pode imprimir esta página ou salvar como PDF usando o atalho <kbd className="bg-white px-1 rounded border shadow-sm">Ctrl + P</kbd>. O layout é otimizado para impressão A4.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function InfoLinha({ label, valor }) {
  return (
    <div className="rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] p-2.5 flex items-center justify-between gap-4">
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">{label}</span>
      <span className="font-medium text-[var(--text-heading)] text-right truncate max-w-44">{valor || '---'}</span>
    </div>
  );
}

function DetalhesCelula({ celula, celulas, pessoas, zonas, relatoriosCelula, onFechar, obterDados, breadcrumb = [], onVerReuniao, membroLogado, setCelulaSelecionadaId }) {
  // Estados de Controle Geral e Membros
  const [pessoasSelecionadas, setPessoasSelecionadas] = useState([]);
  const [salvandoModal, setSalvandoModal] = useState(false);
  const [excluindoId, setExcluindoId] = useState(null); // Estado para controlar o ID da pessoa sendo excluída
  const [abaAtiva, setAbaAtiva] = useState('informacoes');
  const [isModalAberto, setIsModalAberto] = useState(false);
  const [isModalReuniaoAberto, setIsModalReuniaoAberto] = useState(false);
  const [imagemPreview, setImagemPreview] = useState('');
  const [arquivoImagem, setArquivoImagem] = useState(null);
  const [salvandoImagem, setSalvandoImagem] = useState(false);

  const isMembro = membroLogado?.permissao === 'membro';

  // Define a aba inicial como 'membros' se for desktop
  useEffect(() => {
    if (window.innerWidth >= 1024) { // Considerando 1024px como breakpoint para desktop
      setAbaAtiva('membros');
    }
  }, []);

  // Declara membros antes de usar no useEffect
  const membros = useMemo(() => {
    return celula ? pessoas.filter((pessoa) => String(pessoa.celula_id || '') === String(celula.id) && pessoa.status !== 'inativo') : [];
  }, [celula, pessoas]);

  const lider = useMemo(() => {
    return pessoas.find(p => String(p.id) === String(celula?.lider_id));
  }, [celula, pessoas]);

  // Inicializa os presenças marcadas como 'true' por padrão
  // Lista de pessoas disponíveis para o primeiro modal (Vincular Membros)
  const pessoasDisponiveis = useMemo(() => {
    if (!celula) return [];
    return pessoas.filter((pessoa) => String(pessoa.celula_id || '') !== String(celula.id) && pessoa.status !== 'inativo');
  }, [pessoas, celula]);

  async function handleExcluirReuniao(e, id) {
    e.stopPropagation();
    if (!(await window.confirmModal('Excluir Relatório', 'Tem certeza que deseja excluir este relatório de reunião?'))) return;
    try {
      const { error } = await supabase.from('relatorios_celula').delete().eq('id', id);
      if (error) throw error;
      if (obterDados) await obterDados();
    } catch (error) {
      window.alert(`Erro ao excluir reunião: ${error.message}`);
    }
  }

  if (!celula) return <div className="p-8 bg-white rounded-2xl border border-slate-200">Celula nao encontrada.</div>;

  const relatorios = relatoriosCelula.filter((relatorio) => String(relatorio.celula_id || '') === String(celula.id));
  const celulasFilhas = useMemo(() => {
    return celulas.filter(c => String(c.celula_mae_id) === String(celula.id));
  }, [celulas, celula.id]);

  async function handleSalvarMembrosModal(e) {
    e.preventDefault();
    if (pessoasSelecionadas.length === 0) return;

    setSalvandoModal(true);
    try {
      const { error } = await supabase.from('pessoas').update({ celula_id: celula.id }).in('id', pessoasSelecionadas);
      if (error) throw error;
      if (obterDados) await obterDados();
      setIsModalAberto(false);
      setPessoasSelecionadas([]);
    } catch (error) {
      console.error(error);
      window.alert(`Erro ao vincular membros: ${error.message}`);
    } finally {
      setSalvandoModal(false);
    }
  }

  const handleCheckboxChange = (pessoaId) => {
    setPessoasSelecionadas((prev) => prev.includes(pessoaId) ? prev.filter((id) => id !== pessoaId) : [...prev, pessoaId]);
  };

  async function handleRemoverPessoa(pessoaId, nomePessoa) {
    if (!(await window.confirmModal('Remover Membro', `Tem certeza que deseja remover ${nomePessoa} desta célula?`))) return;
    setExcluindoId(pessoaId);
    try {
      const { error } = await supabase.from('pessoas').update({ celula_id: null }).eq('id', pessoaId);
      if (error) throw error;
      if (obterDados) await obterDados();
    } catch (error) {
      console.error(error);
    } finally {
      setExcluindoId(null);
    }
  }

  function handleSelecionarImagem(e) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    setArquivoImagem(arquivo);
    setImagemPreview(URL.createObjectURL(arquivo));
  }

  async function handleSalvarImagemCelula() {
    if (!arquivoImagem) return;
    setSalvandoImagem(true);
    try {
      let url;
      try {
        url = await uploadImagemCelula(arquivoImagem, celula.id);
      } catch (erroStorage) {
        throw new Error(`Upload no Storage: ${erroStorage.message}`, { cause: erroStorage });
      }

      const { error } = await supabase.from('celulas').update({ imagem_url: url }).eq('id', celula.id);
      if (error) {
        throw new Error(
          error.message?.includes('row-level security')
            ? `Banco (tabela celulas): ${error.message}. Execute supabase/politicas-imagem-celula.sql no Supabase.`
            : `Banco (tabela celulas): ${error.message}`
        );
      }

      setImagemPreview(url);
      setArquivoImagem(null);
      if (obterDados) await obterDados();
    } catch (error) {
      console.error(error);
      window.alert(`Erro ao salvar imagem: ${error.message}`);
    } finally {
      setSalvandoImagem(false);
    }
  }

  return (
    <div className="celula-detalhes-root">
      <style>{`
        .celula-detalhes-root, .celula-detalhes-root * { 
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif !important; 
          -webkit-font-smoothing: antialiased;
        }
      `}</style>

      {/* Cabeçalho da Página: Visível apenas no Desktop */}
      <div className="hidden xl:block">
        <PageHeader titulo={celula.nome} breadcrumb={breadcrumb} onNavigate={onFechar}>
          <button type="button" onClick={onFechar} className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold">Voltar</button>
        </PageHeader>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-0 xl:gap-5">
        <aside className="space-y-4">
          <Card className="p-0 overflow-hidden shadow-sm">
            <div className="relative h-48 w-full bg-slate-100 border-b border-slate-100">
              {/* BOTÃO VOLTAR NA CAPA: Apenas em telas pequenas para economizar espaço */}
              <button 
                type="button" 
                onClick={onFechar} 
                className="xl:hidden absolute top-4 left-4 z-20 bg-[#1e3a8a] text-white p-2 rounded-xl shadow-lg hover:bg-[#1e40af] transition-all cursor-pointer group"
                title="Voltar para a lista"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {imagemPreview || celula.imagem_url ? (
                <img
                  src={imagemPreview || celula.imagem_url}
                  alt={celula.nome}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                  <img
                    src="https://guznbiqposfhqalqjggw.supabase.co/storage/v1/object/public/fotos-membros/avatar%20celulas.png"
                    alt="Célula"
                    className="w-20 h-20 object-contain opacity-40 grayscale"
                  />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Sem painel definido</span>
                  <span className="text-[9px] text-slate-300 font-bold uppercase mt-1">Tamanho ideal: 1200x300px</span>
                </div>
              )}
              
              {!isMembro && (
                <label 
                className="absolute bottom-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/20 hover:bg-black/50 text-white/90 backdrop-blur-md border border-white/10 cursor-pointer transition-all shadow-lg group" 
                title="Alterar Capa (1200x300px)"
              >
                <svg 
                  className="w-4 h-4 pointer-events-none" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleSelecionarImagem} 
                  className="hidden" 
                />
              </label>
              )}
            </div>

            {/* FOTO DO LÍDER RESTAURADA (OVERLAY) */}
            <div className="relative px-5 pb-5">
              <div className="-mt-12 flex items-end gap-3">
                <div className="p-1 bg-white rounded-2xl shadow-xl border border-slate-100">
                  <Avatar pessoa={lider} tamanho="w-24 h-24" />
                </div>
                <div className="mb-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Líder da Célula</p>
                  <h3 className="text-sm font-black text-slate-700 leading-tight">{lider?.nome || 'Líder não definido'}</h3>
                </div>
              </div>
            </div>

            {arquivoImagem && (
              <div className="p-4 bg-blue-50/50 border-b border-blue-100">
                <button
                  type="button"
                  onClick={handleSalvarImagemCelula}
                  disabled={salvandoImagem}
                  className="w-full py-2.5 rounded-xl bg-[#055F6D] text-white text-[10px] font-black uppercase tracking-wider shadow-sm hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  {salvandoImagem ? 'Salvando...' : '💾 Confirmar Nova Capa'}
                </button>
              </div>
            )}
          </Card>

          {/* Cards de Liderança e Agenda: Fixos na lateral apenas no Desktop */}
          <div className="hidden xl:block space-y-4">
            <Card className="p-0">
              <CardHeader titulo="Liderança" />
              <div className="p-5 space-y-3 text-sm">
                <InfoLinha label="Líder Principal" valor={lider?.nome || 'Líder não definido'} />
                <InfoLinha label="Co-Líder" valor={nomePessoa(pessoas, celula.co_lider_id)} />
                <InfoLinha label="Auxiliar" valor={nomePessoa(pessoas, celula.auxiliar_id)} />
              </div>
            </Card>
            <Card className="p-0">
              <CardHeader titulo="Agenda e Local" />
              <div className="p-5 space-y-3 text-sm">
                <InfoLinha label="Dia da Semana" valor={celula.dia_semana || 'Nao informado'} />
                <InfoLinha label="Horario" valor={celula.horario || 'Nao informado'} />
                <InfoLinha label="Zona" valor={nomeZona(zonas, celula.zona_id)} />
                <InfoLinha label="Bairro" valor={celula.bairro || 'Nao informado'} />
                <InfoLinha label="Endereco" valor={`${celula.endereco || ''}, ${celula.numero || ''}`} />
              </div>
            </Card>
          </div>
        </aside>

        <section className="space-y-5 xl:space-y-5">
          {/* NAVEGAÇÃO POR ABAS COM ÍCONES PROFISSIONAIS */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-white px-2 pt-2 gap-3 rounded-t-2xl shadow-sm">
            <div className="w-full flex overflow-x-auto scrollbar-hide justify-between xl:gap-1">
              {[
                {
                  id: 'informacoes',
                  label: 'Informações',
                  icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
                  cor: '#055F6D',
                  badge: null,
                  mobileOnly: true // Marcamos para ocultar no desktop
                },
                { 
                  id: 'membros', 
                  label: 'Membros', 
                  icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, 
                  cor: '#2563eb', 
                  badge: membros.length 
                },
                { 
                  id: 'reunioes', 
                  label: 'Reuniões', 
                  icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, 
                  cor: '#055F6D', 
                  badge: relatorios.length 
                },
                { 
                  id: 'filhas', 
                  label: 'Gerações', 
                  icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>, 
                  cor: '#8b5cf6', 
                  badge: celulasFilhas.length 
                },
              ].map((tab) => {
                const isAtivo = abaAtiva === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setAbaAtiva(tab.id)}
                    className={`flex-1 flex items-center justify-center py-3 rounded-t-xl text-[11px] font-black uppercase tracking-wider transition-all shrink-0 border-b-2 cursor-pointer xl:justify-center xl:gap-1.5 xl:px-4 xl:py-2.5 xl:font-['Roboto']
                      ${tab.mobileOnly ? 'xl:hidden' : ''} ${
                      isAtivo ? 'bg-slate-50 text-slate-900' : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50/50'
                    }`}
                    style={{ borderBottomColor: isAtivo ? tab.cor : 'transparent' }}
                  >
                    <span style={{ color: isAtivo ? tab.cor : undefined }} className="scale-[2.2] xl:scale-100">{tab.icon}</span>
                    <span className="hidden xl:block">{tab.label}</span>
                    <span className={`hidden xl:inline-block text-[9px] font-black px-1.5 py-0.5 rounded-full ml-0.5 sm:ml-1 ${isAtivo ? 'text-white' : 'bg-slate-100 text-slate-400'}`} style={isAtivo ? { backgroundColor: tab.cor } : {}}>
                      {tab.badge}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Botões de Ação (abaixo das abas, full-width em mobile) */}
          <div className="px-2 sm:px-0">
            {abaAtiva === 'membros' && !isMembro && (
              <button type="button" onClick={() => setIsModalAberto(true)} className="w-full sm:w-auto px-4 py-2 bg-[#2563eb] text-white rounded-xl text-xs font-black uppercase hover:opacity-90 transition cursor-pointer shadow-sm">
                + Vincular Pessoas
              </button>
            )}
            {abaAtiva === 'reunioes' && !isMembro && (
              <button type="button" onClick={() => setIsModalReuniaoAberto(true)} className="w-full sm:w-auto px-4 py-2 bg-[#055F6D] text-white rounded-xl text-xs font-black uppercase hover:opacity-90 transition cursor-pointer shadow-sm">
                📅 Nova Reunião
              </button>
            )}
          </div>

          {abaAtiva === 'informacoes' && (
            <div className="xl:hidden space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card className="p-0">
                <CardHeader titulo="Liderança" />
                <div className="p-5 space-y-3 text-sm">
                  <InfoLinha label="Líder Principal" valor={lider?.nome || 'Líder não definido'} />
                  <InfoLinha label="Co-Líder" valor={nomePessoa(pessoas, celula.co_lider_id)} />
                  <InfoLinha label="Auxiliar" valor={nomePessoa(pessoas, celula.auxiliar_id)} />
                </div>
              </Card>
              <Card className="p-0">
                <CardHeader titulo="Agenda e Local" />
                <div className="p-5 space-y-3 text-sm">
                  <InfoLinha label="Dia da Semana" valor={celula.dia_semana || 'Nao informado'} />
                  <InfoLinha label="Horario" valor={celula.horario || 'Nao informado'} />
                  <InfoLinha label="Zona" valor={nomeZona(zonas, celula.zona_id)} />
                  <InfoLinha label="Bairro" valor={celula.bairro || 'Nao informado'} />
                  <InfoLinha label="Endereco" valor={`${celula.endereco || ''}, ${celula.numero || ''}`} />
                </div>
              </Card>
            </div>
          )}

          {abaAtiva === 'membros' && (
            <Card className="p-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-1 border-t border-[var(--border)] lg:max-h-none lg:overflow-y-visible">
                  {membros.length === 0 ? (
                    <p className="p-10 text-center text-sm text-[var(--text-muted)] italic">Nenhum membro vinculado a esta célula ainda.</p>
                  ) : (
                    <table className="table-mib">
                      <thead className="hidden md:table-header-group">
                        <tr>
                          <th>Membro</th>
                          <th>Função</th>
                          {!isMembro && <th className="text-right">Ação</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {membros.map((membro) => (
                          <tr key={membro.id} className="group">
                            <td>
                              <div className="flex items-center gap-3">
                                <Avatar pessoa={membro} tamanho="w-8 h-8" />
                                <span className="font-medium text-[var(--text-heading)] text-sm">{membro.nome}</span>
                              </div>
                            </td>
                            <td className="hidden md:table-cell text-[var(--text-muted)] text-xs">{membro.cargo || 'Membro'}</td>
                            {!isMembro && (
                              <td className="text-right pr-6">
                              <button
                                type="button"
                                disabled={excluindoId === membro.id}
                                onClick={() => handleRemoverPessoa(membro.id, membro.nome)}
                                className="text-rose-500 hover:text-rose-700 transition p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer disabled:opacity-50"
                                title="Remover da célula"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
            </Card>
          )}

          {abaAtiva === 'reunioes' && (
            <Card className="p-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="max-h-[60vh] overflow-y-auto">
                {relatorios.length === 0 ? (
                  <p className="p-10 text-center text-sm text-[var(--text-muted)] italic">Nenhum relatório enviado para esta célula.</p>
                ) : (
                  <div className="overflow-x-auto">
                    {/* LISTA EM TABELA - Visível apenas em Desktop/Tablet */}
                    <table className="table-mib hidden md:table">
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Membros</th>
                          <th>Visitantes</th>
                          <th>Oferta</th>
                          {!isMembro && <th className="text-right">Ação</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {relatorios.map((relatorio) => (
                          <tr
                            key={relatorio.id}
                            onClick={() => onVerReuniao(relatorio)}
                            className="hover:bg-slate-50 cursor-pointer transition"
                          >
                            <td className="font-medium text-[var(--text-heading)]">
                              {relatorio.data_reuniao ? new Date(`${relatorio.data_reuniao}T00:00:00`).toLocaleDateString('pt-BR') : 'Sem data'}
                            </td>
                            <td>
                              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 text-xs font-medium">
                                {relatorio.presencas_relatorio?.[0]?.count || 0} 
                              </span>
                            </td>
                            <td>
                              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                                {Number(relatorio.visitantes_presentes || 0)}
                              </span>
                            </td>
                            <td className="text-[var(--text-primary)]">
                              R$ {valorOfertaRelatorio(relatorio).toFixed(2)}
                            </td>
                            {!isMembro && (
                              <td className="text-right pr-6">
                              <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                <button
                                  type="button"
                                  title="Visualizar e Editar"
                                  onClick={(e) => { e.stopPropagation(); onVerReuniao(relatorio); }}
                                  className="text-[#055F6D] hover:text-[#044a56] transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  title="Excluir Reunião"
                                  onClick={(e) => handleExcluirReuniao(e, relatorio.id)}
                                  className="text-rose-500 hover:text-rose-700 transition p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* LISTA COMPACTA - Visível apenas em Mobile */}
                    <div className="md:hidden divide-y divide-slate-100 border-t border-slate-50">
                      {relatorios.map((relatorio) => (
                        <div
                          key={relatorio.id}
                          onClick={() => onVerReuniao(relatorio)}
                          className="p-4 flex items-center justify-between hover:bg-slate-50 transition active:scale-[0.98] cursor-pointer"
                        >
                          <div className="flex items-center justify-between flex-1 pr-4"> 
                            <div className="flex flex-col"> {/* Agrupa data e tema verticalmente */}
                              <p className="text-sm font-black text-slate-800 tracking-tight">
                                {relatorio.data_reuniao ? new Date(`${relatorio.data_reuniao}T00:00:00`).toLocaleDateString('pt-BR') : 'Sem data'}
                              </p>
                              <p className="text-xs text-slate-500 mt-1">
                                {extrairMetadadosReuniao(relatorio.observacoes).tema || 'Sem tema'}
                              </p>
                            </div>
                            <div className="flex items-center gap-6"> {/* Membros e Visitantes à direita */}
                              <div className="flex flex-col items-center">
                                <span className="text-[20px] font-black text-blue-600 leading-none">{relatorio.presencas_relatorio?.[0]?.count || 0}</span>
                                <span className="text-[10px] font-black uppercase text-blue-600 mt-1">Membros</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className="text-[20px] font-black text-amber-600 leading-none">{Number(relatorio.visitantes_presentes || 0)}</span>
                                <span className="text-[10px] font-black uppercase text-amber-600 mt-1">Visitantes</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                            {!isMembro && (
                              <>
                                <button 
                                  type="button" 
                                  onClick={(e) => handleExcluirReuniao(e, relatorio.id)}
                                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {abaAtiva === 'filhas' && (
            <Card className="p-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="overflow-x-auto border-t border-[var(--border)]">
                {celulasFilhas.length === 0 ? (
                  <p className="p-10 text-center text-sm text-[var(--text-muted)] italic">Nenhuma célula filha vinculada.</p>
                ) : (
                  <table className="table-mib">
                    <thead>
                      <tr>
                        <th>Célula</th>
                        <th>Líder</th>
                        <th>Agenda</th>
                      </tr>
                    </thead>
                    <tbody>
                      {celulasFilhas.map((filha) => (
                        <tr 
                          key={filha.id} 
                          onClick={() => setCelulaSelecionadaId(filha.id)}
                          className="cursor-pointer hover:bg-slate-50 transition"
                        >
                          <td>
                            <div className="flex items-center gap-3">
                              <AvatarCelula celula={filha} />
                              <span className="font-semibold text-sm text-slate-700">{filha.nome}</span>
                            </div>
                          </td>
                          <td className="text-xs text-slate-500">{nomePessoa(pessoas, filha.lider_id)}</td>
                          <td className="text-xs text-slate-400">
                            {filha.dia_semana || '—'} · {filha.horario || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </Card>
          )}
        </section>
      </div>

      {/* MODAL 1: SELEÇÃO E VÍNCULO DE MEMBROS */}
      {isModalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h4 className="font-semibold text-slate-950 text-base">Vincular Pessoas</h4>
                <p className="text-xs text-slate-400">Selecione os membros que deseja trazer para a célula <strong>{celula.nome}</strong>.</p>
              </div>
              <button type="button" onClick={() => { setIsModalAberto(false); setPessoasSelecionadas([]); }} className="text-slate-400 hover:text-slate-600 font-bold p-1 text-sm">✕</button>
            </div>
            <form onSubmit={handleSalvarMembrosModal} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-5 overflow-y-auto space-y-2 flex-1 max-h-64">
                {pessoasDisponiveis.map((p) => {
                  const estaMarcado = pessoasSelecionadas.includes(p.id);
                  return (
                    <label key={p.id} className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold cursor-pointer select-none transition ${estaMarcado ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-700'}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={estaMarcado} onChange={() => handleCheckboxChange(p.id)} className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                        <span>{p.nome}</span>
                      </div>
                      {p.celulas?.nome && <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md font-normal">vindo de: {p.celulas.nome}</span>}
                    </label>
                  );
                })}
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                <button type="button" onClick={() => { setIsModalAberto(false); setPessoasSelecionadas([]); }} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700">Cancelar</button>
                <button type="submit" disabled={salvandoModal || pessoasSelecionadas.length === 0} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition disabled:bg-slate-200 disabled:text-slate-400 shadow-sm">
                  Salvar e Vincular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalReuniaoAberto && (
        <ModalLancarReuniao
          celulas={[celula]}
          pessoas={pessoas}
          celulaInicial={celula.id}
          onFechar={() => setIsModalReuniaoAberto(false)}
          onSalvo={async () => {
            await obterDados();
            setIsModalReuniaoAberto(false);
          }}
        />
      )}

    </div>
  );
}

function ModalVerReuniao({ reuniao, celula, membros, onFechar, onSalvo, membroLogado }) {
  const [editData, setEditData] = useState(reuniao.data_reuniao || '');
  const [editOferta, setEditOferta] = useState(reuniao?.oferta ? mascaraMoeda(Number(reuniao.oferta) * 100) : '');
  const [editTema, setEditTema] = useState('');
  const [editObservacoes, setEditObservacoes] = useState('');
  const [editPresencas, setEditPresencas] = useState({});
  const [editNomesVisitantes, setEditNomesVisitantes] = useState([]);
  const [editNovoVisitante, setEditNovoVisitante] = useState('');
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    const { observacao, tema, nomesVisitantes } = extrairMetadadosReuniao(reuniao.observacoes);
    setEditTema(tema);
    setEditObservacoes(observacao);
    setEditNomesVisitantes(nomesVisitantes);
    setEditOferta(reuniao.oferta ? mascaraMoeda(Number(reuniao.oferta) * 100) : '');
    setEditData(reuniao.data_reuniao || '');

    async function buscarPresencas() {
      const { data } = await supabase.from('presencas_relatorio').select('pessoa_id').eq('relatorio_id', reuniao.id);
      const pres = {};
      membros.forEach(m => pres[m.id] = data?.some(p => p.pessoa_id === m.id) ?? false);
      setEditPresencas(pres);
    }
    buscarPresencas();
  }, [reuniao, membros]);

  const podeEditar = useMemo(() => {
    if (!membroLogado) return false;
    if (['admin', 'pastor'].includes(membroLogado.permissao)) return true;
    if (membroLogado.permissao === 'lider-celula' && celula && String(celula.lider_id) === String(membroLogado.id)) return true;
    return false;
  }, [membroLogado, celula]);

  async function handleAtualizarReuniao(e) {
    e.preventDefault();
    setSalvandoEdicao(true);
    try {
      const observacoesFinal = montarObservacoesComMetadados(editObservacoes, editTema, editNomesVisitantes);
      const { error } = await supabase
        .from('relatorios_celula')
        .update({
          data_reuniao: editData,
          visitantes_presentes: editNomesVisitantes.length,
          oferta: desmascararMoeda(editOferta) || 0,
          observacoes: observacoesFinal,
        })
        .eq('id', reuniao.id);

      if (error) throw error;

      await supabase.from('presencas_relatorio').delete().eq('relatorio_id', reuniao.id);
      const idsPresentes = Object.keys(editPresencas).filter((id) => editPresencas[id]);
      if (idsPresentes.length > 0) {
        await supabase.from('presencas_relatorio').insert(idsPresentes.map(idPessoa => ({
          relatorio_id: reuniao.id,
          pessoa_id: idPessoa,
        })));
      }

      if (onSalvo) await onSalvo();
    } catch (error) {
      window.alert(`Erro ao atualizar reunião: ${error.message}`);
    } finally {
      setSalvandoEdicao(false);
    }
  }

  const handleCancelarEdicao = () => {
    const { observacao, tema, nomesVisitantes } = extrairMetadadosReuniao(reuniao.observacoes);
    setEditTema(tema);
    setEditObservacoes(observacao);
    setEditNomesVisitantes(nomesVisitantes);
    setEditOferta(reuniao.oferta ? mascaraMoeda(Number(reuniao.oferta) * 100) : '');
    setEditData(reuniao.data_reuniao || '');
    setModoEdicao(false);
  };

  const handleAdicionarVisitanteEdicao = () => {
    if (!editNovoVisitante.trim()) return;
    const nomes = editNovoVisitante.split(',')
      .map(n => {
        const trimmed = n.trim();
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
      })
      .filter(n => n !== "");
    if (nomes.length > 0) {
      setEditNomesVisitantes(prev => [...prev, ...nomes]);
      setEditNovoVisitante('');
    }
  };

  const togglePresencaEdicao = (id) => {
    setEditPresencas(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h4 className="font-semibold text-slate-950 text-base">
              {modoEdicao ? 'Editar Reunião do Histórico' : 'Detalhes do Encontro'}
            </h4>
            <p className="text-xs text-slate-400">
              {modoEdicao ? (
                <>Ajuste os dados do encontro da célula <strong className="text-emerald-700">{celula?.nome}</strong></>
              ) : (
                <>Relatório de atividades da célula <strong className="text-emerald-700">{celula?.nome}</strong></>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onFechar}
            className="text-slate-400 hover:text-slate-600 font-bold p-1 text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {!modoEdicao ? (
          /* MODO VISUALIZAÇÃO */
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-5 overflow-y-auto space-y-5 flex-1 animate-fade-in">
              
              {/* Cards de Indicadores com Números Maiores */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50/60 border border-blue-100/70 p-3.5 rounded-xl text-center flex flex-col justify-center shadow-3xs">
                  <span className="text-2xl font-black text-blue-700 leading-none">
                    {Object.values(editPresencas).filter(Boolean).length}
                  </span>
                  <span className="text-[10px] font-bold text-blue-500 uppercase mt-1.5 tracking-wider">Membros</span>
                </div>
                <div className="bg-purple-50/60 border border-purple-100/70 p-3.5 rounded-xl text-center flex flex-col justify-center shadow-3xs">
                  <span className="text-2xl font-black text-purple-700 leading-none">
                    {editNomesVisitantes.length}
                  </span>
                  <span className="text-[10px] font-bold text-purple-500 uppercase mt-1.5 tracking-wider">Visitantes</span>
                </div>
                <div className="bg-emerald-50/60 border border-emerald-100/70 p-3.5 rounded-xl text-center flex flex-col justify-center shadow-3xs">
                  <span className="text-base font-black text-emerald-700 leading-tight">
                    {editOferta ? editOferta : 'R$ 0,00'}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase mt-1.5 tracking-wider">Oferta</span>
                </div>
              </div>

              {/* Data e Tema */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Data</span>
                  <span className="text-sm font-bold text-slate-700">
                    {editData ? new Date(`${editData}T00:00:00`).toLocaleDateString('pt-BR') : '—'}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tema / Assunto</span>
                  <span className="text-sm font-bold text-slate-700 truncate block">
                    {editTema || '—'}
                  </span>
                </div>
              </div>

              {/* Visitantes */}
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Visitantes do Encontro</span>
                {editNomesVisitantes.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Nenhum visitante registrado.</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {editNomesVisitantes.map((nome, index) => (
                      <span key={index} className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-3xs">
                        👤 {nome}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Chamada / Presença */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lista de Chamada ({membros.length})</span>
                <div className="border border-slate-100 rounded-2xl p-2 bg-slate-50/30 space-y-1">
                  {membros.length === 0 ? (
                    <p className="text-xs text-slate-400 italic p-2">Nenhum membro vinculado.</p>
                  ) : (
                    membros.map((m) => {
                      const isPresente = !!editPresencas[m.id];
                      return (
                        <div key={m.id} className="flex items-center justify-between p-2 hover:bg-white rounded-xl hover:shadow-3xs transition">
                          <div className="flex items-center gap-3">
                            <Avatar pessoa={m} tamanho="w-8 h-8" />
                            <span className="text-sm font-semibold text-slate-700">{m.nome}</span>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={isPresente} 
                            disabled
                            className="w-5 h-5 rounded-md border-slate-300 text-[#055F6D] focus:ring-[#055F6D]/20 cursor-not-allowed"
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Observações */}
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Observações Pastorais / Gerais</span>
                <div className="bg-slate-50/80 border border-slate-200 p-3 rounded-xl text-xs text-slate-600 min-h-[50px] whitespace-pre-wrap">
                  {editObservacoes || 'Nenhuma observação registrada.'}
                </div>
              </div>

            </div>

            {/* Footer Visualização */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-end gap-2 shrink-0">
              <button 
                type="button" 
                onClick={onFechar} 
                className="px-5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-600 font-bold hover:bg-slate-100 transition cursor-pointer"
              >
                Fechar
              </button>
              {podeEditar && (
                <button 
                  type="button" 
                  onClick={() => setModoEdicao(true)} 
                  className="btn-primary text-xs font-bold px-5 py-2 rounded-xl transition shadow-sm cursor-pointer"
                >
                  ✏️ Editar Relatório
                </button>
              )}
            </div>
          </div>
        ) : (
          /* MODO EDICÃO (Form) */
          <form onSubmit={handleAtualizarReuniao} className="flex flex-col flex-1 overflow-hidden animate-fade-in">
            <div className="p-5 overflow-y-auto space-y-4 flex-1">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Data da Reunião</label>
                  <input
                    type="date"
                    value={editData}
                    onChange={(e) => setEditData(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Tema / Assunto</label>
                  <input
                    type="text"
                    value={editTema}
                    onChange={(e) => setEditTema(e.target.value)}
                    placeholder="Ex: Fruto do Espírito"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Valor da Oferta (R$)</label>
                  <input
                    type="text"
                    value={editOferta}
                    onChange={(e) => setEditOferta(mascaraMoeda(e.target.value))}
                    placeholder="R$ 0,00"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Visitantes Presentes
                    <span className="ml-2 bg-amber-500 text-white font-semibold px-2 py-0.5 rounded-md text-[10px]">
                      Contagem: {editNomesVisitantes.length}
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editNovoVisitante}
                      onChange={(e) => setEditNovoVisitante(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdicionarVisitanteEdicao(); } }}
                      placeholder="Digite o nome completo do visitante"
                      className="flex-1 px-3 py-1.5 border border-slate-200 rounded-xl text-slate-800 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button type="button" onClick={handleAdicionarVisitanteEdicao} className="btn-primary text-xs px-3 rounded-xl cursor-pointer">+</button>
                  </div>
                </div>

                {editNomesVisitantes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {editNomesVisitantes.map((nome, index) => (
                      <div key={index} className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-700 flex items-center gap-1.5 shadow-sm">
                        👤 {nome}
                        <button type="button" onClick={() => setEditNomesVisitantes(prev => prev.filter((_, i) => i !== index))} className="text-slate-400 hover:text-rose-500 font-bold text-[12px] pl-0.5">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="space-y-2 sm:space-y-0">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chamada da Célula</label>
                  <div className="sm:border sm:border-slate-100 sm:rounded-2xl sm:p-2 sm:bg-slate-50/30 sm:space-y-1">
                    {membros.length === 0 ? (
                      <p className="text-xs text-slate-400 italic p-2">Nenhum membro vinculado para fazer a chamada.</p>
                    ) : (
                      membros.map((m) => {
                        const isPresente = !!editPresencas[m.id];
                        return (
                          <div key={m.id} 
                            onClick={() => togglePresencaEdicao(m.id)} 
                            className="mb-1 bg-white border border-slate-100 rounded-xl p-3 shadow-sm
                                       flex items-center justify-between cursor-pointer transition active:scale-[0.98] select-none
                                       sm:mb-0 sm:bg-transparent sm:border-transparent sm:shadow-none sm:p-2 sm:hover:bg-white sm:hover:shadow-sm sm:hover:border-slate-100"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar pessoa={m} tamanho="w-8 h-8" />
                              <span className="text-sm font-bold text-slate-700">{m.nome}</span>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={isPresente} 
                              readOnly
                              className="w-5 h-5 rounded-md border-slate-300 text-[#055F6D] focus:ring-[#055F6D]/20 cursor-pointer"
                            />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Observações</label>
                <textarea value={editObservacoes} onChange={(e) => setEditObservacoes(e.target.value)} rows={2} className="w-full px-3 py-2 border rounded-xl text-sm bg-white" />
              </div>

            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-end gap-2 shrink-0">
              <button 
                type="button" 
                onClick={handleCancelarEdicao} 
                className="px-4 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-600 font-semibold hover:bg-slate-100 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={salvandoEdicao} 
                className="btn-primary text-xs font-semibold px-5 py-2 rounded-xl disabled:opacity-50 transition shadow-sm cursor-pointer"
              >
                {salvandoEdicao ? 'Salvando...' : '💾 Salvar Alterações'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
