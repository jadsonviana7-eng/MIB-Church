import { useState, useMemo, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, AvatarCelula, PageHeader, Avatar, SelectFiltro, uploadImagemCelula } from './ui';
import { nomePessoa, nomeZona, valorOfertaRelatorio } from './churchUtils';
import { extrairMetadadosReuniao, montarObservacoesComMetadados } from './reuniaoHelpers';
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
  obterDados,
  onNavigate,
}) {
  const [celulaEditando, setCelulaEditando] = useState(null);
  const [celulaExcluindo, setCelulaExcluindo] = useState(null);
  const [reuniaoParaVer, setReuniaoParaVer] = useState(null);

  const abrirReuniao = (relatorio) => {
    setReuniaoParaVer(relatorio);
  };

  if (celulaSelecionadaId) {
    const celula = celulas.find((item) => String(item.id) === String(celulaSelecionadaId));
    return (
      <>
        <DetalhesCelula 
          celula={celula} 
          pessoas={pessoas} 
          zonas={zonas} 
          relatoriosCelula={relatoriosCelula} 
          onFechar={() => setCelulaSelecionadaId(null)} 
          obterDados={obterDados} 
          breadcrumb={['Células', 'Ficha']} 
          onVerReuniao={abrirReuniao}
        />
        {reuniaoParaVer && (
          <ModalVerReuniao
            reuniao={reuniaoParaVer}
            celula={celulas.find(c => c.id === reuniaoParaVer.celula_id)}
            membros={pessoas.filter(p => p.celula_id === reuniaoParaVer.celula_id)}
            onFechar={() => setReuniaoParaVer(null)}
            onSalvo={async () => {
              await obterDados();
              setReuniaoParaVer(null);
            }}
          />
        )}
      </>
    );
  }

  if (submenu === 'adicionar') {
    return (
      <>
        <PageHeader titulo="Adicionar Nova Célula" subtitulo="Cadastro da célula com liderança, agenda, endereço, zona e anotações." />
        <FormularioCelula onCelulaCadastrada={obterDados} />
      </>
    );
  }

  if (submenu === 'reunioes') {
    return (
      <ReunioesCelulas
        celulas={celulas}
        pessoas={pessoas}
        relatoriosCelula={relatoriosCelula}
        obterDados={obterDados}
        onVoltar={() => onNavigate('lista')}
      />
    );
  }

  return (
    <>
      <PageHeader titulo="Células" />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
        <Card className="p-0">
          <CardHeader
            titulo={`${celulasFiltradas.length} células cadastradas`}
          />
          {celulasFiltradas.length === 0 ? (
            <div className="p-10 text-center text-sm text-[var(--text-muted)]">Nenhuma célula encontrada.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-mib">
                <thead>
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
                    const membros = pessoas.filter((p) => String(p.celula_id || '') === String(celula.id));
                    return (
                      <tr
                        key={celula.id}
                        onClick={() => setCelulaSelecionadaId(celula.id)}
                        className="cursor-pointer"
                      >
                        <td>
                          <div className="flex items-center gap-3">
                            <AvatarCelula celula={celula} />
                            <span className="font-semibold text-[var(--text-heading)]">{celula.nome}</span>
                          </div>
                        </td>
                        <td>{nomePessoa(pessoas, celula.lider_id)}</td>
                        <td className="text-[var(--text-muted)]">{celula.dia_semana || 'Sem dia'} · {celula.horario || '—'}</td>
                        <td><span className="text-xs font-semibold text-[#2563eb]">{membros.length} vinculados</span></td>
                        <td className="text-right">
                          <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              title="Editar célula"
                              onClick={(e) => { e.stopPropagation(); setCelulaEditando(celula); }}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] text-[11px] font-semibold transition-all duration-150 shadow-sm"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 0l.172.172a2 2 0 010 2.828L12 16H9v-3z" />
                              </svg>
                              Editar
                            </button>
                            <button
                              type="button"
                              title="Excluir célula"
                              onClick={(e) => { e.stopPropagation(); setCelulaExcluindo(celula); }}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 text-[11px] font-semibold transition-all duration-150 shadow-sm"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Excluir
                            </button>
                          </div>
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

  return (
    <>
      <PageHeader titulo="Reuniões realizadas" breadcrumb={['Células', 'Reuniões']} onNavigate={onVoltar} subtitulo="Histórico de encontros cadastrados pelas células.">
        <button type="button" onClick={() => setModalAberto(true)} className="btn-primary text-xs font-semibold px-4 py-2 rounded-xl">
          + Adicionar Reunião
        </button>
      </PageHeader>
      <Card className="p-0 overflow-hidden">
        <CardHeader titulo={`${relatoriosCelula.length} reuniões no histórico`} />
        <div className="overflow-x-auto max-h-[70vh]">
          <table className="table-mib">
            <thead>
              <tr>
                <th>Data</th>
                <th>Célula</th>
                <th>Membros</th>
                <th>Visitantes</th>
                <th>Oferta</th>
              </tr>
            </thead>
            <tbody>
              {relatoriosCelula.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-[var(--text-muted)] italic">Nenhuma reunião cadastrada.</td>
                </tr>
              ) : (
                relatoriosCelula.map((r) => (
                  <tr key={r.id} onClick={() => onVerReuniao(r)} className="cursor-pointer hover:bg-slate-50 transition">
                    <td className="font-medium">{r.data_reuniao ? new Date(`${r.data_reuniao}T00:00:00`).toLocaleDateString('pt-BR') : '—'}</td>
                    <td>{r.celulas?.nome || '—'}</td>
                    <td><span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">Chamada feita</span></td>
                    <td>{Number(r.visitantes_presentes || 0)}</td>
                    <td>R$ {valorOfertaRelatorio(r).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
      {modalAberto && (
        <ModalLancarReuniao celulas={celulas} pessoas={pessoas} onFechar={() => setModalAberto(false)} onSalvo={obterDados} />
      )}
    </>
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

function DetalhesCelula({ celula, pessoas, zonas, relatoriosCelula, onFechar, obterDados, breadcrumb = [], onVerReuniao }) {
  // Estados de Controle Geral e Membros
  const [pessoasSelecionadas, setPessoasSelecionadas] = useState([]);
  const [salvandoModal, setSalvandoModal] = useState(false);
  const [excluindoId, setExcluindoId] = useState(null);
  const [listaAberta, setListaAberta] = useState(true);
  const [isModalAberto, setIsModalAberto] = useState(false);

  // ESTADOS DO MODAL: LANÇAR ENCONTRO
  const [isModalReuniaoAberto, setIsModalReuniaoAberto] = useState(false);

  // ESTADOS PARA VISITANTES DINÂMICOS

  // Estados do modal de edição (Histórico de Reuniões)

  const [imagemPreview, setImagemPreview] = useState('');
  const [arquivoImagem, setArquivoImagem] = useState(null);
  const [salvandoImagem, setSalvandoImagem] = useState(false);

  // Declara membros antes de usar no useEffect
  const membros = useMemo(() => {
    return celula ? pessoas.filter((pessoa) => String(pessoa.celula_id || '') === String(celula.id)) : [];
  }, [celula, pessoas]);

  // Inicializa os presenças marcadas como 'true' por padrão
  // Lista de pessoas disponíveis para o primeiro modal (Vincular Membros)
  const pessoasDisponiveis = useMemo(() => {
    if (!celula) return [];
    return pessoas.filter((pessoa) => String(pessoa.celula_id || '') !== String(celula.id));
  }, [pessoas, celula]);

  if (!celula) return <div className="p-8 bg-white rounded-2xl border border-slate-200">Celula nao encontrada.</div>;

  const relatorios = relatoriosCelula.filter((relatorio) => String(relatorio.celula_id || '') === String(celula.id));
  const celulasFilhas = [];

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
    if (!window.confirm(`Tem certeza que deseja remover ${nomePessoa} desta célula?`)) return;
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
    <>
      <PageHeader titulo={celula.nome} breadcrumb={breadcrumb} onNavigate={onFechar}>
        <button type="button" onClick={onFechar} className="px-4 py-2 rounded-xl btn-primary text-xs font-semibold">Voltar</button>
      </PageHeader>

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-5">
        <aside className="space-y-4">
          <Card className="p-0">
            <CardHeader titulo="Identidade da célula" />
            <div className="p-5 space-y-4">
              <div className="flex justify-center">
                {imagemPreview ? (
                  <img src={imagemPreview} alt={celula.nome} className="w-28 h-28 rounded-2xl object-cover border border-[var(--border)]" />
                ) : (
                  <AvatarCelula celula={celula} tamanho="w-28 h-28" />
                )}
              </div>
              <label className="block w-full text-center text-xs font-medium text-[#2563eb] cursor-pointer hover:underline">
                {arquivoImagem ? 'Trocar imagem selecionada' : 'Adicionar ou alterar imagem'}
                <input type="file" accept="image/*" onChange={handleSelecionarImagem} className="hidden" />
              </label>
              {arquivoImagem && (
                <button
                  type="button"
                  onClick={handleSalvarImagemCelula}
                  disabled={salvandoImagem}
                  className="w-full py-2 rounded-xl btn-primary text-xs font-semibold disabled:opacity-50"
                >
                  {salvandoImagem ? 'Salvando imagem...' : 'Salvar imagem da célula'}
                </button>
              )}
            </div>
          </Card>

          <Card className="p-0">
            <CardHeader titulo="Lideranca" />
            <div className="p-5 space-y-3 text-sm">
              <InfoLinha label="Lider" valor={nomePessoa(pessoas, celula.lider_id)} />
              <InfoLinha label="Co-Lider" valor={nomePessoa(pessoas, celula.co_lider_id)} />
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
        </aside>

        <section className="space-y-5">
          <Card className="p-0">
            <CardHeader
              titulo={(
                <span className="flex items-center gap-2 cursor-pointer" onClick={() => setListaAberta(!listaAberta)} onKeyDown={() => {}} role="button" tabIndex={0}>
                  Pessoas na célula
                  <span className="text-xs bg-blue-50 text-[#2563eb] px-2 py-0.5 rounded-full font-medium">{membros.length}</span>
                  <span className="text-[var(--text-muted)] text-xs font-normal">{listaAberta ? '▲' : '▼'}</span>
                </span>
              )}
              subtitulo="Gerenciamento de membros vinculados diretamente."
              children={pessoasDisponiveis.length > 0 ? (
                <button type="button" onClick={() => setIsModalAberto(true)} className="btn-primary text-xs font-semibold px-3 py-1.5 rounded-xl shrink-0 whitespace-nowrap">
                  + Adicionar Pessoas
                </button>
              ) : null}
            />

            {listaAberta && (
              <div className="p-4 border-t border-[var(--border)] max-h-96 overflow-y-auto space-y-3">
                {membros.length === 0 ? (
                  <p className="p-5 text-sm text-[var(--text-muted)] italic">Nenhum membro vinculado a esta célula ainda.</p>
                ) : (
                  <table className="table-mib">
                    <thead>
                      <tr>
                        <th>Membro</th>
                        <th>Função</th>
                        <th className="text-right">Ação</th>
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
                          <td className="text-[var(--text-muted)] text-xs">{membro.cargo || 'Membro'}</td>
                          <td className="text-right">
                            <button
                              type="button"
                              disabled={excluindoId === membro.id}
                              onClick={() => handleRemoverPessoa(membro.id, membro.nome)}
                              className="p-1.5 text-[var(--text-muted)] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition disabled:opacity-50"
                              title="Remover da célula"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </Card>

          <Card className="p-0">
            <CardHeader
              titulo="Histórico de reuniões"
              subtitulo="Relatórios de encontros anteriores desta célula."
              children={(
                <button type="button" onClick={() => setIsModalReuniaoAberto(true)} className="btn-primary text-xs font-semibold px-3 py-1.5 rounded-xl shrink-0 whitespace-nowrap">
                  📅 Nova Reunião
                </button>
              )}
            />

            <div className="max-h-80 overflow-y-auto">
              {relatorios.length === 0 ? (
                <p className="p-5 text-sm text-[var(--text-muted)] italic">Nenhum relatório enviado para esta célula.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table-mib">
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Membros</th>
                        <th>Visitantes</th>
                        <th>Oferta</th>
                        <th className="text-right">Ação</th>
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
                            <span className="text-xs font-medium text-slate-500">Ver detalhes</span>
                          </td>
                          <td>
                            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                              {Number(relatorio.visitantes_presentes || 0)} visitantes
                            </span>
                          </td>
                          <td className="text-[var(--text-primary)]">
                            R$ {valorOfertaRelatorio(relatorio).toFixed(2)}
                          </td>
                          <td className="text-right">
                            <button
                              type="button"
                              className="text-xs font-bold text-blue-600 hover:text-blue-800"
                              onClick={(e) => {
                                e.stopPropagation();
                                onVerReuniao(relatorio);
                              }}
                            >
                              Visualizar e Editar 🔍
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-0">
            <CardHeader titulo="Celulas filhas" />
            <p className="p-5 text-sm text-[var(--text-muted)]">{celulasFilhas.length ? `${celulasFilhas.length} geracoes cadastradas.` : 'Nenhuma geracao vinculada a esta celula.'}</p>
          </Card>
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
          onFechar={() => setIsModalReuniaoAberto(false)}
          onSalvo={async () => {
            await obterDados();
            setIsModalReuniaoAberto(false);
          }}
        />
      )}

    </>
  );
}

function ModalVerReuniao({ reuniao, celula, membros, onFechar, onSalvo }) {
  const [editData, setEditData] = useState(reuniao.data_reuniao || '');
  const [editOferta, setEditOferta] = useState(valorOfertaRelatorio(reuniao));
  const [editTema, setEditTema] = useState('');
  const [editObservacoes, setEditObservacoes] = useState('');
  const [editPresencas, setEditPresencas] = useState({});
  const [editNomesVisitantes, setEditNomesVisitantes] = useState([]);
  const [editNovoVisitante, setEditNovoVisitante] = useState('');
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);

  useEffect(() => {
    const { observacao, tema, nomesVisitantes } = extrairMetadadosReuniao(reuniao.observacoes);
    setEditTema(tema);
    setEditObservacoes(observacao);
    setEditNomesVisitantes(nomesVisitantes);

    async function buscarPresencas() {
      const { data } = await supabase.from('presencas_relatorio').select('pessoa_id').eq('relatorio_id', reuniao.id);
      const pres = {};
      membros.forEach(m => pres[m.id] = data?.some(p => p.pessoa_id === m.id) ?? true);
      setEditPresencas(pres);
    }
    buscarPresencas();
  }, [reuniao, membros]);

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
          oferta: Number(editOferta) || 0,
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

  const handleAdicionarVisitanteEdicao = () => {
    if (!editNovoVisitante.trim()) return;
    setEditNomesVisitantes(prev => [...prev, editNovoVisitante.trim()]);
    setEditNovoVisitante('');
  };

  const togglePresencaEdicao = (id) => {
    setEditPresencas(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">

            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h4 className="font-semibold text-slate-950 text-base">Editar Reunião do Histórico</h4>
                <p className="text-xs text-slate-400">
                  Ajuste os dados do encontro da célula <strong className="text-emerald-700">{celula.nome}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={onFechar}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAtualizarReuniao} className="flex flex-col flex-1 overflow-hidden">
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
                      type="number"
                      step="0.01"
                      min="0"
                      value={editOferta}
                      onChange={(e) => setEditOferta(e.target.value)}
                      placeholder="0.00"
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
                      <button
                        type="button"
                        onClick={handleAdicionarVisitanteEdicao}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition shrink-0"
                      >
                        + Adicionar
                      </button>
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
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Lista de Presença dos Membros</label>
                  <div className="border border-slate-100 rounded-xl divide-y divide-slate-50 max-h-40 overflow-y-auto p-2 bg-slate-50/50">
                    {membros.length === 0 ? (
                      <p className="text-xs text-slate-400 italic p-2">Nenhum membro vinculado para fazer a chamada.</p>
                    ) : (
                      membros.map((m) => {
                        const isPresente = !!editPresencas[m.id];
                        return (
                          <div
                            key={m.id}
                            onClick={() => togglePresencaEdicao(m.id)}
                            className="flex items-center justify-between py-2 px-3 hover:bg-white rounded-lg cursor-pointer transition select-none"
                          >
                            <span className="text-xs font-semibold text-slate-800">{m.nome}</span>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-md tracking-wider ${isPresente ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                              {isPresente ? '✅ PRESENTE' : '❌ AUSENTE'}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Observações / Testemunhos</label>
                  <textarea
                    value={editObservacoes}
                    onChange={(e) => setEditObservacoes(e.target.value)}
                    rows="2"
                    placeholder="Escreva como foi o mover de Deus na célula, decisões..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onFechar}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 rounded-xl transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvandoEdicao}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition disabled:bg-slate-300 shadow-sm flex items-center gap-1 cursor-pointer"
                >
                  {salvandoEdicao ? 'Salvando...' : '💾 Salvar Alterações'}
                </button>
              </div>
            </form>

          </div>
        </div>
  );
}
