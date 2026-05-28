import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from './supabaseClient';
import { PageHeader, Card, CardHeader, Avatar } from './ui'; // Assumindo que 'ui' tem esses componentes

export default function EscolasModulo({ submenu, onNavigate, pessoas = [], alunoSelecionadoParaCadernetaId, setAlunoSelecionadoParaCadernetaId }) {
  const [escolas, setEscolas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [escolaEditando, setEscolaEditando] = useState(null);
  const [isModalEdicaoAberto, setIsModalEdicaoAberto] = useState(false);

  // Estados do formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataCriacao, setDataCriacao] = useState(new Date().toISOString().split('T')[0]);
  const [gestoresIds, setGestoresIds] = useState([]);

  // Estados exclusivos para Edição (Modal)
  const [editNome, setEditNome] = useState('');
  const [editDescricao, setEditDescricao] = useState('');
  const [editDataCriacao, setEditDataCriacao] = useState('');
  const [editGestoresIds, setEditGestoresIds] = useState([]); // Para Gestores de Escolas/Cursos
  const [selectedMembrosParaAdicionar, setSelectedMembrosParaAdicionar] = useState([]); // Para seleção de alunos na turma

  // Estados para Turmas
  const [turmas, setTurmas] = useState([]);
  const [isModalEdicaoTurmaAberto, setIsModalEdicaoTurmaAberto] = useState(false);
  const [turmaEditando, setTurmaEditando] = useState(null);
  
  // Detalhes da Turma Selecionada
  const [isAddingAlunos, setIsAddingAlunos] = useState(false); // Estado de carregamento local para o modal de adicionar alunos
  const [turmaSelecionadaId, setTurmaSelecionadaId] = useState(null);
  const [abaAtivaTurma, setAbaAtivaTurma] = useState('alunos');

  // Estados do formulário Turmas
  const [turmaCursoId, setTurmaCursoId] = useState('');
  const [turmaNome, setTurmaNome] = useState('');
  const [turmaHorario, setTurmaHorario] = useState('Não definido');
  const [turmaStatus, setTurmaStatus] = useState('Preparando turma');
  const [turmaDescricao, setTurmaDescricao] = useState('');

  // Estados Edição Turmas
  const [editTurmaCursoId, setEditTurmaCursoId] = useState('');
  const [editTurmaNome, setEditTurmaNome] = useState('');
  const [editTurmaHorario, setEditTurmaHorario] = useState('');
  const [editTurmaStatus, setEditTurmaStatus] = useState('');
  const [editTurmaDescricao, setEditTurmaDescricao] = useState('');

  // Estados para Gestão de Alunos/Disciplinas/Aulas
  const [alunosTurma, setAlunosTurma] = useState([]);
  const [disciplinasTurma, setDisciplinasTurma] = useState([]);
  const [aulasTurma, setAulasTurma] = useState([]);
  const [isModalAddAlunosAberto, setIsModalAddAlunosAberto] = useState(false);
  const [isModalAddDisciplinaAberto, setIsModalAddDisciplinaAberto] = useState(false);
  const [isModalAddAulaAberto, setIsModalAddAulaAberto] = useState(false);
  const [aulaParaEditar, setAulaParaEditar] = useState(null);
  
  // Formulário Disciplina
  const [novaDisciplinaNome, setNovaDisciplinaNome] = useState('');
  const [novaDisciplinaProfId, setNovaDisciplinaProfId] = useState('');
  
  // Formulário Aula
  const [novaAulaData, setNovaAulaData] = useState(new Date().toLocaleDateString('en-CA'));
  const [novaAulaDiscId, setNovaAulaDiscId] = useState('');
  const [novaAulaAssunto, setNovaAulaAssunto] = useState('');
  const [novaAulaPresencas, setNovaAulaPresencas] = useState({}); // {aluno_id: boolean}
  const [novaAulaDesc, setNovaAulaDesc] = useState('');

  const carregarEscolas = async () => {
    setCarregando(true);
    console.log('EscolasModulo: Iniciando carregamento de escolas...');
    const { data, error } = await supabase.from('escolas').select('*').order('nome');
    if (error) {
      console.error('EscolasModulo: Erro ao carregar escolas:', error);
    } else {
      console.log('EscolasModulo: Escolas carregadas:', data);
      setEscolas(data || []);
    }
    setCarregando(false);
  };

  const carregarTurmas = async () => {
    const { data, error } = await supabase
      .from('turmas')
      .select('*, escolas(nome)')
      .order('created_at', { ascending: false });
    if (error) console.error('Erro ao carregar turmas:', error);
    else setTurmas(data || []);
  };

  useEffect(() => {
    carregarEscolas();
    carregarTurmas();
  }, []);

  const carregarDadosTurma = async (id) => {
    setCarregando(true);
    // 1. Alunos
    const { data: dataAlunos } = await supabase
      .from('alunos_turmas')
      .select('*, alunos(id, pessoa_id, pessoas(nome, foto_url))')
      .eq('turma_id', id);
    setAlunosTurma(dataAlunos || []);

    // 2. Disciplinas vinculadas
    const { data: dataDisc } = await supabase
      .from('turmas_disciplinas')
      .select('*, disciplinas(nome), professores(pessoas(nome))')
      .eq('turma_id', id);
    setDisciplinasTurma(dataDisc || []);

    // 3. Aulas
    const { data: dataAulas } = await supabase
      .from('aulas')
      .select('*, turmas_disciplinas(disciplinas(nome))')
      .in('turma_disciplina_id', dataDisc?.map(d => d.id) || [])
      .order('data_aula', { ascending: false });
    setAulasTurma(dataAulas || []);
    
    setCarregando(false);
  };

  useEffect(() => {
    if (turmaSelecionadaId) carregarDadosTurma(turmaSelecionadaId);
  }, [turmaSelecionadaId]);

  // Limpa a turma selecionada ao navegar entre submenus do módulo
  useEffect(() => {
    setTurmaSelecionadaId(null);
  }, [submenu]);

  const handleAbrirTurma = (id) => {
    setTurmaSelecionadaId(id);
    setAbaAtivaTurma('alunos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVerCadernetaAluno = (pessoaId) => {
    setAlunoSelecionadoParaCadernetaId(pessoaId);
    onNavigate('ficha-aluno'); // Navega para o submenu de ficha do aluno
  };

  const handleEditar = (escola) => {
    setEscolaEditando(escola);
    setEditNome(escola.nome || '');
    setEditDescricao(escola.descricao || '');
    setEditDataCriacao(escola.data_criacao || new Date().toISOString().split('T')[0]);
    setEditGestoresIds(escola.gestores_ids || []);
    setIsModalEdicaoAberto(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('escolas').insert([{ 
      nome, descricao, data_criacao: dataCriacao, gestores_ids: gestoresIds 
    }]);
    if (error) alert('Erro ao inserir: ' + error.message);
    resetFormCriar();
    carregarEscolas();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('escolas').update({ 
      nome: editNome, descricao: editDescricao, data_criacao: editDataCriacao, gestores_ids: editGestoresIds 
    }).eq('id', escolaEditando.id);
    if (error) alert('Erro ao atualizar: ' + error.message);
    setIsModalEdicaoAberto(false);
    setEscolaEditando(null);
    carregarEscolas();
  };

  const resetFormCriar = () => {
    setNome('');
    setDescricao('');
    setDataCriacao(new Date().toISOString().split('T')[0]);
    setGestoresIds([]);
  };

  const handleExcluir = async (id) => {
    if (!window.confirm('Deseja realmente excluir este curso? Todas as turmas vinculadas serão afetadas.')) return;
    const { error } = await supabase.from('escolas').delete().eq('id', id);
    if (error) alert('Erro ao excluir: ' + error.message);
    else carregarEscolas();
  };

  const toggleGestor = (id) => {
    setGestoresIds(prev => 
      prev.includes(id) ? prev.filter(gid => gid !== id) : [...prev, id]
    );
  };

  const toggleGestorEdit = (id) => {
    setEditGestoresIds(prev => 
      prev.includes(id) ? prev.filter(gid => gid !== id) : [...prev, id]
    );
  };

  const handleCriarTurma = async (e) => {
    e.preventDefault();
    if (!turmaCursoId) return alert('Selecione um curso para a turma.');
    
    setCarregando(true);
    const { error } = await supabase.from('turmas').insert([{
      escola_id: turmaCursoId,
      nome: turmaNome,
      horario: turmaHorario,
      status: turmaStatus,
      descricao: turmaDescricao,
      ano_letivo: new Date().getFullYear() // Valor obrigatório no seu schema
    }]);

    if (error) alert('Erro ao criar turma: ' + error.message);
    else {
      setTurmaNome('');
      setTurmaDescricao('');
      carregarTurmas();
    }
    setCarregando(false);
  };

  const handleEditarTurma = (turma) => {
    setTurmaEditando(turma);
    setEditTurmaCursoId(turma.escola_id || '');
    setEditTurmaNome(turma.nome || '');
    setEditTurmaHorario(turma.horario || 'Não definido');
    setEditTurmaStatus(turma.status || 'Preparando turma');
    setEditTurmaDescricao(turma.descricao || '');
    setIsModalEdicaoTurmaAberto(true);
  };

  const handleUpdateTurma = async (e) => {
    e.preventDefault();
    setCarregando(true);
    const { error } = await supabase.from('turmas').update({
      escola_id: editTurmaCursoId,
      nome: editTurmaNome,
      horario: editTurmaHorario,
      status: editTurmaStatus,
      descricao: editTurmaDescricao
    }).eq('id', turmaEditando.id);

    if (error) alert('Erro ao atualizar: ' + error.message);
    else {
      setIsModalEdicaoTurmaAberto(false);
      carregarTurmas();
    }
    setCarregando(false);
  };

  const handleExcluirTurma = async (id) => {
    if (!window.confirm('Excluir esta turma permanentemente?')) return;
    const { error } = await supabase.from('turmas').delete().eq('id', id);
    if (error) alert('Erro ao excluir: ' + error.message);
    else carregarTurmas();
  };

  // Lógica de Alunos
  const handleAddAlunos = async (idsPessoas) => {
    setIsAddingAlunos(true); // Ativa o estado de carregamento local
    let success = true;
    try {
      for (const pId of idsPessoas) {
        // 1. Garante que existe na tabela alunos (ou cria se não existir)
        let { data: aluno, error: alunoSelectError } = await supabase.from('alunos').select('id').eq('pessoa_id', pId).maybeSingle();
        if (alunoSelectError) throw new Error(`Erro ao buscar aluno: ${alunoSelectError.message}`);

        if (!aluno) {
          const { data: novoAluno, error: alunoInsertError } = await supabase.from('alunos').insert([{ pessoa_id: pId }]).select().single();
          if (alunoInsertError) throw new Error(`Erro ao criar aluno: ${alunoInsertError.message}`);
          aluno = novoAluno;
        }
        // 2. Vincula à turma (usando upsert para evitar duplicatas)
        const { error: alunoTurmaUpsertError } = await supabase.from('alunos_turmas').upsert([{ aluno_id: aluno.id, turma_id: turmaSelecionadaId }]);
        if (alunoTurmaUpsertError) throw new Error(`Erro ao vincular aluno à turma: ${alunoTurmaUpsertError.message}`);
      }
      alert('Alunos adicionados com sucesso!'); // Feedback de sucesso
    } catch (error) {
      success = false;
      console.error('Erro ao adicionar alunos:', error);
      alert('Erro ao adicionar alunos: ' + error.message); // Feedback de erro
    } finally {
      setIsAddingAlunos(false); // Desativa o estado de carregamento
      if (success) {
        setIsModalAddAlunosAberto(false);
        setSelectedMembrosParaAdicionar([]); // Limpa a seleção após adicionar
        carregarDadosTurma(turmaSelecionadaId); // Recarrega os dados da turma
      }
    }
  };

  // Lógica de Disciplinas
  const handleAddDisciplina = async (e) => {
    e.preventDefault();
    setCarregando(true);
    const turma = turmas.find(t => t.id === turmaSelecionadaId);
    
    // 1. Criar disciplina se não existir
    const { data: disc } = await supabase.from('disciplinas').insert([{ 
      nome: novaDisciplinaNome, 
      escola_id: turma.escola_id 
    }]).select().single();

    // 2. Garantir que professor existe
    let { data: prof } = await supabase.from('professores').select('id').eq('pessoa_id', novaDisciplinaProfId).maybeSingle();
    if (!prof) {
      const { data: novoProf } = await supabase.from('professores').insert([{ pessoa_id: novaDisciplinaProfId }]).select().single();
      prof = novoProf;
    }

    // 3. Vincular à turma
    await supabase.from('turmas_disciplinas').insert([{
      turma_id: turmaSelecionadaId,
      disciplina_id: disc.id,
      professor_id: prof.id
    }]);

    setIsModalAddDisciplinaAberto(false);
    setNovaDisciplinaNome('');
    carregarDadosTurma(turmaSelecionadaId);
  };

  // Lógica de Aulas
  const handleAddAula = async (e) => {
    e.preventDefault();
    if (!novaAulaDiscId) return window.alert("Selecione a disciplina");
    setCarregando(true);

    const payload = {
      turma_disciplina_id: novaAulaDiscId,
      data_aula: novaAulaData,
      conteudo_proposto: novaAulaAssunto,
      observacoes: novaAulaDesc,
      // Certifique-se de que a coluna 'presencas' na tabela 'aulas' do Supabase é do tipo JSONB.
      presencas: novaAulaPresencas,
    };

    let error;
    if (aulaParaEditar) {
      const { error: err } = await supabase.from('aulas').update(payload).eq('id', aulaParaEditar.id);
      error = err;
    } else {
      const { error: err } = await supabase.from('aulas').insert([payload]);
      error = err;
    }

    if (error) {
      window.alert("Erro ao salvar aula: " + error.message);
    } else {
      setIsModalAddAulaAberto(false);
      setAulaParaEditar(null);
      setNovaAulaAssunto('');
      setNovaAulaDiscId('');
      carregarDadosTurma(turmaSelecionadaId);
    }
    setCarregando(false);
  };

  const handleExcluirAula = async (id) => {
    if (!window.confirm("Deseja realmente excluir este registro de aula?")) return;
    const { error } = await supabase.from('aulas').delete().eq('id', id);
    if (error) alert("Erro ao excluir aula: " + error.message);
    else carregarDadosTurma(turmaSelecionadaId);
  };

  const handleEditAula = (aula) => {
    setAulaParaEditar(aula);
    // Usa local date string para evitar o bug do dia anterior (fuso horário)
    setNovaAulaData(aula.data_aula ? aula.data_aula.split('T')[0] : new Date().toLocaleDateString('en-CA'));
    setNovaAulaDiscId(aula.turma_disciplina_id);
    setNovaAulaAssunto(aula.conteudo_proposto || '');
    setNovaAulaDesc(aula.observacoes || '');
    
    // Segurança: Garante que presencas seja um objeto, mesmo que venha como string do DB
    let p = aula.presencas || {};
    if (typeof p === 'string') {
      try { p = JSON.parse(p); } catch (e) { p = {}; }
    }
    setNovaAulaPresencas(p);
    setIsModalAddAulaAberto(true);
  };

  const togglePresencaAula = (alunoId) => {
    setNovaAulaPresencas(prev => {
      // Se 'prev' for string (causador do erro de índices), limpa para objeto
      const seguro = (typeof prev === 'object' && prev !== null && !Array.isArray(prev)) ? prev : {};
      return { ...seguro, [alunoId]: !seguro[alunoId] };
    });
  };

  const handleToggleMembroLista = (idPessoa) => {
    setSelectedMembrosParaAdicionar(prev => 
      prev.includes(idPessoa) ? prev.filter(id => id !== idPessoa) : [...prev, idPessoa]
    );
  };

  const turmaAtiva = turmas.find(t => t.id === turmaSelecionadaId);

  const getSubmenuTitle = (id) => {
    switch (id) {
      case 'resumo': return 'Visão Geral das Escolas';
      case 'cursos': return 'Gestão de Cursos (Escolas)';
      case 'turmas': return 'Gestão de Turmas';
      case 'disciplinas': return 'Gestão de Disciplinas';
      case 'professores': return 'Cadastro de Professores';
      case 'alunos': return 'Cadastro de Alunos';
      case 'aulas': return 'Programação de Aulas';
      case 'avaliacoes': return 'Registro de Avaliações';
      case 'inscricoes': return 'Formulários de Inscrição Pública';
      default: return 'Módulo de Escolas';
    }
  };

  const breadcrumb = ['Escolas', getSubmenuTitle(submenu)];

  return (
    <div className="space-y-6">
      <PageHeader titulo={getSubmenuTitle(submenu)} breadcrumb={breadcrumb} onNavigate={() => onNavigate('resumo')} />

      {submenu === 'resumo' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 flex flex-col justify-between border-l-4 border-l-[#055F6D]">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cursos Ativos</p>
              <p className="text-3xl font-black text-slate-800">{escolas.length}</p>
              {escolas.length === 0 && (
                <p className="text-[9px] text-slate-400 mt-1">Nenhum curso cadastrado.</p>
              )}
            </div>
            <button onClick={() => onNavigate('cursos')} className="mt-4 text-xs font-bold text-[#055F6D] hover:underline text-left cursor-pointer">
              {escolas.length === 0 ? 'Adicionar Primeiro Curso →' : 'Gerenciar Cursos →'}
            </button>
          </Card>
          {/* Espaço para mais cards de resumo como Total de Alunos, Turmas Ativas, etc */}
          <div className="p-12 col-span-full text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
             <p className="text-sm text-slate-400 italic">Em breve: Indicadores de matrículas e desempenho escolar.</p>
          </div>
        </div>
      )}

      {submenu === 'cursos' && (
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 items-start">
          {/* PAINEL LATERAL DE CADASTRO */}
          <Card className="p-0 overflow-hidden sticky top-24">
            <CardHeader 
              titulo="Novo Curso" 
              className="!bg-slate-50 !border-[#055F6D]"
            />
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nome do Curso</label>
                <input 
                  type="text" required placeholder="Ex: Escola de Líderes..."
                  value={nome} 
                  onChange={e => setNome(e.target.value)} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#055F6D]/20 outline-none" 
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Data de Criação</label>
                <input 
                  type="date" required
                  value={dataCriacao} 
                  onChange={e => setDataCriacao(e.target.value)} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gestores</label>
                <div className="border border-slate-200 rounded-xl p-2 bg-slate-50 max-h-40 overflow-y-auto space-y-1">
                  {pessoas.map(p => (
                    <label key={p.id} className="flex items-center gap-2 cursor-pointer hover:bg-white p-1.5 rounded-lg transition">
                      <input type="checkbox" 
                        checked={gestoresIds.includes(p.id)}
                        onChange={() => toggleGestor(p.id)}
                        className="rounded text-[#055F6D] focus:ring-[#055F6D]" 
                      />
                      <span className="text-xs text-slate-600 truncate">{p.nome}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Descrição</label>
                <textarea 
                  rows="2" placeholder="Objetivos do curso..."
                  value={descricao} onChange={e => setDescricao(e.target.value)} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none resize-none" 
                />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button type="submit" disabled={carregando}
                  className="w-full py-2.5 rounded-xl bg-[#055F6D] hover:opacity-90 text-white text-sm font-bold transition shadow-md disabled:opacity-50">
                  {carregando ? 'Processando...' : '+ Criar Novo Curso'}
                </button>
              </div>
            </form>
          </Card>

          {/* LISTA DE CURSOS EM TABELA */}
          <Card className="p-0 overflow-hidden">
            <CardHeader titulo="Cursos Cadastrados" />
            <div className="overflow-x-auto">
              <table className="table-mib">
                <thead>
                  <tr>
                    <th>Curso / Descrição</th>
                    <th>Gestores</th>
                    <th className="text-center">Início</th>
                    <th className="text-right pr-6">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {carregando && escolas.length === 0 ? (
                    <tr><td colSpan="4" className="p-10 text-center animate-pulse">Carregando dados...</td></tr>
                  ) : escolas.length === 0 ? (
                    <tr><td colSpan="4" className="p-10 text-center text-slate-400 italic">Nenhum curso cadastrado.</td></tr>
                  ) : (
                    escolas.map(escola => (
                      <tr key={escola.id}>
                        <td className="py-3">
                          <p className="font-bold text-sm text-slate-700">{escola.nome}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 max-w-[250px]">{escola.descricao || 'Sem descrição'}</p>
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-1">
                            {escola.gestores_ids?.map(gid => {
                              const p = pessoas.find(item => item.id === gid);
                              return p ? (
                                <span key={gid} className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                  {p.nome.split(' ')[0]}
                                </span>
                              ) : null;
                            })}
                          </div>
                        </td>
                        <td className="text-center text-xs text-slate-500">
                          {new Date(escola.data_criacao).toLocaleDateString()}
                        </td>
                        <td className="text-right pr-6">
                          <div className="flex justify-end gap-3">
                            <button onClick={() => handleEditar(escola)} className="text-[#055F6D] hover:underline text-xs font-bold cursor-pointer">Editar</button>
                            <button onClick={() => handleExcluir(escola.id)} className="text-rose-400 hover:text-rose-600 text-xs font-bold cursor-pointer">Remover</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {submenu === 'turmas' && (
        turmaSelecionadaId && turmaAtiva ? (
          <DetalhesDaTurma
            turma={turmaAtiva}
            abaAtiva={abaAtivaTurma} 
            setAbaAtiva={setAbaAtivaTurma}
            onVoltar={() => setTurmaSelecionadaId(null)}
            alunos={alunosTurma}
            disciplinas={disciplinasTurma}
            aulas={aulasTurma}
            pessoas={pessoas}
            onAddAlunos={() => { setSelectedMembrosParaAdicionar([]); setIsModalAddAlunosAberto(true); }} // Limpa a seleção ao abrir o modal
            onAddDisciplina={() => setIsModalAddDisciplinaAberto(true)}
            onAddAula={() => {
              const hoje = new Date().toLocaleDateString('en-CA');
              const initialPresencas = {};
              alunosTurma.forEach(a => initialPresencas[a.aluno_id] = true);
              setNovaAulaData(hoje);
              setNovaAulaPresencas(initialPresencas);
              setNovaAulaAssunto('');
              setNovaAulaDesc('');
              setNovaAulaDiscId('');
              setAulaParaEditar(null);
              setIsModalAddAulaAberto(true);
            }}
            onEditAula={handleEditAula}
            onExcluirAula={handleExcluirAula}
            onVerAluno={handleVerCadernetaAluno} // Passa a função para ver caderneta
          />
        ) : turmaSelecionadaId ? (
          <div className="p-10 text-center animate-pulse text-slate-400">Buscando dados da turma...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 items-start">
          {/* PAINEL LATERAL DE CADASTRO */}
          <Card className="p-0 overflow-hidden sticky top-24">
            <CardHeader titulo="Nova Turma" className="!bg-slate-50 !border-[#055F6D]" />
            <form onSubmit={handleCriarTurma} className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Curso / Escola</label>
                <select 
                  required value={turmaCursoId} onChange={e => setTurmaCursoId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white outline-none"
                >
                  <option value="">Selecione o curso...</option>
                  {escolas.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nome da Turma</label>
                <input 
                  type="text" required placeholder="Ex: Turma Alpha 2024..."
                  value={turmaNome} onChange={e => setTurmaNome(e.target.value)} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Horário</label>
                  <select value={turmaHorario} onChange={e => setTurmaHorario(e.target.value)} className="w-full px-2 py-2 border border-slate-200 rounded-xl text-sm bg-white">
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                    <option value="Não definido">Não definido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
                  <select value={turmaStatus} onChange={e => setTurmaStatus(e.target.value)} className="w-full px-2 py-2 border border-slate-200 rounded-xl text-sm bg-white">
                    <option value="Preparando turma">Preparando</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Pausada">Pausada</option>
                    <option value="Finalizada">Finalizada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Descrição</label>
                <textarea 
                  rows="2" placeholder="Breve resumo da turma..."
                  value={turmaDescricao} onChange={e => setTurmaDescricao(e.target.value)} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none resize-none" 
                />
              </div>

              <button type="submit" disabled={carregando} className="w-full py-2.5 rounded-xl bg-[#055F6D] hover:opacity-90 text-white text-sm font-bold transition shadow-md disabled:opacity-50">
                {carregando ? 'Processando...' : '+ Criar Nova Turma'}
              </button>
            </form>
          </Card>

          {/* LISTA EM TABELA */}
          <Card className="p-0 overflow-hidden">
            <CardHeader titulo="Turmas Ativas" />
            <div className="overflow-x-auto">
              <table className="table-mib">
                <thead>
                  <tr>
                    <th>Turma</th>
                    <th>Curso</th>
                    <th>Horário</th>
                    <th>Status</th>
                    <th className="text-right pr-6">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {turmas.length === 0 ? (
                    <tr><td colSpan="5" className="p-10 text-center text-slate-400 italic">Nenhuma turma cadastrada.</td></tr>
                  ) : (
                    turmas.map(t => (
                      <tr key={t.id} onClick={() => handleAbrirTurma(t.id)} className="cursor-pointer">
                        <td>
                          <p className="font-bold text-sm text-slate-700">{t.nome}</p>
                        </td>
                        <td>
                          <p className="text-[10px] text-[#055F6D] uppercase font-bold">{t.escolas?.nome || 'Curso não vinculado'}</p>
                        </td>
                        <td className="text-xs text-slate-600">{t.horario}</td>
                        <td>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                            t.status === 'Em andamento' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                            t.status === 'Finalizada' ? 'bg-slate-50 text-slate-500 border-slate-200' :
                            'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="text-right pr-6">
                          <div className="flex justify-end gap-3" onClick={e => e.stopPropagation()}>
                            <button onClick={() => handleEditarTurma(t)} className="text-[#055F6D] hover:underline text-xs font-bold cursor-pointer">Editar</button>
                            <button onClick={() => handleExcluirTurma(t.id)} className="text-rose-400 hover:text-rose-600 text-xs font-bold cursor-pointer">Remover</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        )
      )}

      {submenu === 'disciplinas' && (
        <Card className="p-6">
          <CardHeader titulo="Gestão de Disciplinas" />
          <p className="text-sm text-slate-600">
            Cadastre e organize as disciplinas oferecidas pelas escolas da igreja.
          </p>
          {/* Conteúdo específico para Disciplinas */}
        </Card>
      )}

      {submenu === 'professores' && (
        <Card className="p-6">
          <CardHeader titulo="Cadastro de Professores" />
          <p className="text-sm text-slate-600">
            Gerencie os professores, seus dados e as disciplinas que lecionam.
          </p>
          {/* Conteúdo específico para Professores */}
        </Card>
      )}

      {submenu === 'alunos' && (
        <Card className="p-6">
          <CardHeader titulo="Cadastro de Alunos" />
          <p className="text-sm text-slate-600">
            Mantenha o registro dos alunos, suas turmas e histórico.
          </p>
          {/* Conteúdo específico para Alunos */}
        </Card>
      )}

      {submenu === 'aulas' && (
        <Card className="p-6">
          <CardHeader titulo="Programação de Aulas" />
          <p className="text-sm text-slate-600">
            Organize o calendário e a programação das aulas.
          </p>
          {/* Conteúdo específico para Aulas */}
        </Card>
      )}

      {submenu === 'avaliacoes' && (
        <Card className="p-6">
          <CardHeader titulo="Registro de Avaliações" />
          <p className="text-sm text-slate-600">
            Registre e acompanhe as avaliações e o desempenho dos alunos.
          </p>
          {/* Conteúdo específico para Avaliações */}
        </Card>
      )}

      {submenu === 'inscricoes' && (
        <Card className="p-6">
          <CardHeader titulo="Formulários de Inscrição Pública" />
          <p className="text-sm text-slate-600">
            Crie e gerencie formulários de inscrição para novos alunos.
          </p>
          {/* Conteúdo específico para Inscrições Públicas */}
        </Card>
      )}

      {/* Modal de Edição (Apenas Edição) */}
      {isModalEdicaoAberto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Editar Curso</h3>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Módulo de Educação</p>
              </div>
              <button onClick={() => setIsModalEdicaoAberto(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-rose-500 transition cursor-pointer">✕</button>
            </div>
            
            <form onSubmit={handleUpdate} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 space-y-5 overflow-y-auto flex-1">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nome do Curso</label>
                  <input 
                    type="text" required
                    value={editNome} 
                    onChange={e => setEditNome(e.target.value)} 
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#055F6D]/20 outline-none" 
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Data de Criação</label>
                  <input 
                    type="date" required
                    value={editDataCriacao} 
                    onChange={e => setEditDataCriacao(e.target.value)} 
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gestores</label>
                  <div className="border border-slate-200 rounded-xl p-2 bg-slate-50 max-h-40 overflow-y-auto space-y-1">
                    {pessoas.map(p => (
                      <label key={p.id} className="flex items-center gap-2 cursor-pointer hover:bg-white p-1.5 rounded-lg transition">
                        <input type="checkbox" 
                          checked={editGestoresIds.includes(p.id)}
                          onChange={() => toggleGestorEdit(p.id)}
                          className="rounded text-[#055F6D] focus:ring-[#055F6D]" 
                        />
                        <span className="text-xs text-slate-600 truncate">{p.nome}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Descrição</label>
                  <textarea 
                    rows="3"
                    value={editDescricao} onChange={e => setEditDescricao(e.target.value)} 
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none resize-none" 
                  />
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3 shrink-0">
                <button type="button" onClick={() => setIsModalEdicaoAberto(false)} className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 rounded-2xl text-xs font-bold hover:bg-slate-50 transition cursor-pointer">
                  Cancelar
                </button>
                <button type="submit" disabled={carregando} className="flex-1 px-4 py-3 bg-[#055F6D] text-white rounded-2xl text-xs font-bold hover:opacity-90 transition shadow-lg shadow-teal-100 cursor-pointer">
                  {carregando ? 'Salvando...' : '💾 Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Edição Turma */}
      {isModalEdicaoTurmaAberto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Editar Turma</h3>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Gestão Acadêmica</p>
              </div>
              <button onClick={() => setIsModalEdicaoTurmaAberto(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-rose-500 transition cursor-pointer">✕</button>
            </div>
            
            <form onSubmit={handleUpdateTurma} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 space-y-5 overflow-y-auto flex-1">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Curso / Escola</label>
                  <select 
                    required value={editTurmaCursoId} onChange={e => setEditTurmaCursoId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white outline-none"
                  >
                    {escolas.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nome da Turma</label>
                  <input 
                    type="text" required
                    value={editTurmaNome} onChange={e => setEditTurmaNome(e.target.value)} 
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Horário</label>
                    <select value={editTurmaHorario} onChange={e => setEditTurmaHorario(e.target.value)} className="w-full px-2 py-2 border border-slate-200 rounded-xl text-sm bg-white">
                      <option value="Manhã">Manhã</option>
                      <option value="Tarde">Tarde</option>
                      <option value="Noite">Noite</option>
                      <option value="Não definido">Não definido</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
                    <select value={editTurmaStatus} onChange={e => setEditTurmaStatus(e.target.value)} className="w-full px-2 py-2 border border-slate-200 rounded-xl text-sm bg-white">
                      <option value="Preparando turma">Preparando</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Pausada">Pausada</option>
                      <option value="Finalizada">Finalizada</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Descrição</label>
                  <textarea 
                    rows="3"
                    value={editTurmaDescricao} onChange={e => setEditTurmaDescricao(e.target.value)} 
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none resize-none" 
                  />
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3 shrink-0">
                <button type="button" onClick={() => setIsModalEdicaoTurmaAberto(false)} className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 rounded-2xl text-xs font-bold hover:bg-slate-50 transition cursor-pointer">
                  Cancelar
                </button>
                <button type="submit" disabled={carregando} className="flex-1 px-4 py-3 bg-[#055F6D] text-white rounded-2xl text-xs font-bold hover:opacity-90 transition shadow-lg shadow-teal-100 cursor-pointer">
                  {carregando ? 'Salvando...' : '💾 Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL MULTISELEÇÃO DE ALUNOS */}
      {isModalAddAlunosAberto && (
        <ModalWrapper titulo="Adicionar Alunos" onFechar={() => setIsModalAddAlunosAberto(false)}>
          <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
            {pessoas.filter(p => !alunosTurma.some(a => a.alunos?.pessoa_id === p.id)).map(p => (
              <label key={p.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition">
                <input 
                  type="checkbox" 
                  checked={selectedMembrosParaAdicionar.includes(p.id)}
                  onChange={() => handleToggleMembroLista(p.id)}
                  className="rounded text-[#055F6D] focus:ring-[#055F6D]"
                />
                <div className="flex items-center gap-2">
                  <Avatar pessoa={p} tamanho="w-8 h-8" />
                  <span className="text-sm font-bold text-slate-700">{p.nome}</span>
                </div>
              </label>
            ))}
          </div>
          <div className="p-5 border-t bg-slate-50 flex gap-3">
            <button onClick={() => setIsModalAddAlunosAberto(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold cursor-pointer">Cancelar</button>
            <button onClick={() => handleAddAlunos(selectedMembrosParaAdicionar)} disabled={isAddingAlunos || selectedMembrosParaAdicionar.length === 0} className="flex-1 py-2.5 rounded-xl bg-[#055F6D] text-white text-xs font-bold disabled:opacity-50 cursor-pointer">
              {isAddingAlunos ? 'Adicionando...' : `Adicionar Selecionados (${selectedMembrosParaAdicionar.length})`}
            </button>
          </div>
        </ModalWrapper>
      )}

      {/* MODAL INCLUIR DISCIPLINA */}
      {isModalAddDisciplinaAberto && (
        <ModalWrapper titulo="Incluir Disciplina" onFechar={() => setIsModalAddDisciplinaAberto(false)}>
          <form onSubmit={handleAddDisciplina} className="p-5 space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nome da Disciplina</label>
              <input type="text" required value={novaDisciplinaNome} onChange={e => setNovaDisciplinaNome(e.target.value)} className="w-full px-3 py-2 border rounded-xl outline-none" placeholder="Ex: Antigo Testamento I" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Professor</label>
              <select required value={novaDisciplinaProfId} onChange={e => setNovaDisciplinaProfId(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-white">
                <option value="">Selecione o professor...</option>
                {pessoas.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setIsModalAddDisciplinaAberto(false)} className="flex-1 py-2.5 rounded-xl border text-xs font-bold cursor-pointer">Cancelar</button>
              <button type="submit" className="flex-1 py-2.5 rounded-xl bg-[#055F6D] text-white text-xs font-bold cursor-pointer">Salvar Disciplina</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* MODAL LANÇAR AULA */}
      {isModalAddAulaAberto && (
        <ModalWrapper titulo={aulaParaEditar ? "Editar Aula / Chamada" : "Lançar Aula e Presença"} onFechar={() => setIsModalAddAulaAberto(false)}>
          <form onSubmit={handleAddAula} className="flex flex-col h-full overflow-hidden">
            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Data</label>
                  <input type="date" required value={novaAulaData} onChange={e => setNovaAulaData(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Disciplina</label>
                  <select required value={novaAulaDiscId} onChange={e => setNovaAulaDiscId(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-white">
                    <option value="">Selecione...</option>
                    {disciplinasTurma.map(d => <option key={d.id} value={d.id}>{d.disciplinas?.nome}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Assunto da Aula</label>
                <input type="text" required value={novaAulaAssunto} onChange={e => setNovaAulaAssunto(e.target.value)} className="w-full px-3 py-2 border rounded-xl" placeholder="Ex: Introdução ao Pentateuco" />
              </div>
              
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-black text-slate-400 uppercase mb-3 tracking-widest">Chamada / Presença</h4>
                <div className="space-y-2">
                  {alunosTurma.map(a => (
                    <div key={a.aluno_id} onClick={() => togglePresencaAula(a.aluno_id)} className="flex items-center justify-between p-2.5 rounded-lg bg-white border cursor-pointer hover:border-[#055F6D]/30 transition active:scale-[0.98] select-none">
                      <span className="text-xs font-bold text-slate-700">{a.alunos?.pessoas?.nome}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${novaAulaPresencas[a.aluno_id] ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {novaAulaPresencas[a.aluno_id] ? 'PRESENTE' : 'AUSENTE'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Observações</label>
                <textarea rows="2" value={novaAulaDesc} onChange={e => setNovaAulaDesc(e.target.value)} className="w-full px-3 py-2 border rounded-xl resize-none" placeholder="Relato do professor sobre a aula ministrada..." />
              </div>
            </div>
            <div className="p-5 border-t bg-slate-50 flex gap-3 shrink-0">
              <button type="button" onClick={() => setIsModalAddAulaAberto(false)} className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-bold cursor-pointer">Cancelar</button>
              <button type="submit" className="flex-1 py-3 rounded-xl bg-[#055F6D] text-white text-xs font-bold shadow-lg cursor-pointer">Finalizar e Salvar Aula</button>
            </div>
          </form>
        </ModalWrapper>
      )}
    </div>
  );
}

/* COMPONENTES AUXILIARES PARA DETALHES */

function DetalhesDaTurma({ turma, abaAtiva, setAbaAtiva, onVoltar, alunos, disciplinas, aulas, onAddAlunos, onAddDisciplina, onAddAula, onEditAula, onExcluirAula }) {
  if (!turma) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 items-start animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* PAINEL LATERAL DE INFORMAÇÕES */}
      <Card className="p-6 border-t-4 border-t-[#055F6D] lg:sticky lg:top-24">
        <div className="space-y-6">
          <button onClick={onVoltar} className="text-[10px] font-black text-[#055F6D] uppercase hover:underline cursor-pointer">← Voltar para Lista</button>
          
          <div>
            <h2 className="text-2xl font-black text-slate-800 leading-tight">{turma?.nome || 'Turma'}</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">{turma?.escolas?.nome}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ano Letivo</p>
              <p className="text-sm font-bold text-slate-700">{turma?.ano_letivo || '---'}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Horário</p>
              <p className="text-sm font-bold text-slate-700">{turma?.horario || 'Não definido'}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
              <span className="text-xs font-bold text-[#055F6D] px-2.5 py-1 bg-teal-50 rounded-full border border-teal-100 inline-block">{turma?.status}</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Alunos</p>
              <p className="text-2xl font-black text-slate-800 leading-none">{alunos?.length || 0}</p>
            </div>
          </div>

          {turma?.descricao && (
            <div className="pt-4 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Sobre a Turma</p>
              <p className="text-xs text-slate-600 leading-relaxed italic">{turma?.descricao}</p>
            </div>
          )}
        </div>
      </Card>

      <div className="space-y-6">
        {/* NAVEGAÇÃO DE ABAS */}
        <div className="flex border-b border-slate-200 gap-8 px-2 overflow-x-auto scrollbar-hide">
          {['alunos', 'disciplinas', 'aulas'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setAbaAtiva(tab)}
              className={`pb-3 text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer px-1 ${abaAtiva === tab ? 'text-[#055F6D] border-b-2 border-[#055F6D]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'}`}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              {tab === 'alunos' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              )}
              {tab === 'disciplinas' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              )}
              {tab === 'aulas' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              )}
              <span>{tab === 'alunos' ? 'Alunos' : tab === 'disciplinas' ? 'Disciplinas' : 'Aulas'}</span>
            </button>
          ))}
        </div>

        {/* CONTEÚDO DAS ABAS */}
        {abaAtiva === 'alunos' && (
          <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={onAddAlunos} className="px-4 py-2 bg-[#055F6D] text-white rounded-xl text-xs font-bold hover:opacity-90 transition cursor-pointer">+ Adicionar Alunos</button>
          </div>
          <Card className="p-0 overflow-hidden">
            <table className="table-mib">
              <thead><tr><th>Aluno</th><th>Status na Turma</th><th className="text-right">Matrícula</th></tr></thead>
              <tbody>
                {alunos.length === 0 ? <tr><td colSpan="3" className="p-10 text-center text-slate-400 italic">Nenhum aluno matriculado nesta turma.</td></tr> :
                  alunos.map(a => (
                    <tr key={a.id} onClick={() => onVerAluno(a.alunos?.pessoa_id)} className="cursor-pointer hover:bg-slate-50 transition">
                      <td><div className="flex items-center gap-2"><Avatar pessoa={a.alunos?.pessoas} tamanho="w-8 h-8"/><span className="font-bold text-sm text-slate-700">{a.alunos?.pessoas?.nome}</span></div></td>
                      <td><span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{a.status}</span></td>
                      <td className="text-right pr-6 font-mono text-xs text-slate-400">{a.alunos?.matricula || '---'}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </Card>
          </div>
        )}

        {abaAtiva === 'disciplinas' && (
          <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={onAddDisciplina} className="px-4 py-2 bg-[#055F6D] text-white rounded-xl text-xs font-bold hover:opacity-90 transition cursor-pointer">+ Incluir Disciplina</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {disciplinas.length === 0 ? <p className="col-span-full py-10 text-center text-slate-400 italic">Nenhuma disciplina vinculada.</p> : 
              disciplinas.map(d => (
                <Card key={d.id} className="p-4 border-l-4 border-l-[#055F6D]">
                  <h4 className="font-black text-slate-800 text-base mb-1">{d.disciplinas?.nome}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">Professor: <span className="text-[#055F6D]">{d.professores?.pessoas?.nome}</span></p>
                  <div className="flex justify-end pt-2 border-t border-slate-50">
                    <button className="text-[10px] font-bold text-rose-500 hover:underline cursor-pointer">Remover</button>
                  </div>
                </Card>
              ))
            }
          </div>
          </div>
          </div>
        )}

        {abaAtiva === 'aulas' && (
          <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={onAddAula} className="px-4 py-2 bg-[#055F6D] text-white rounded-xl text-xs font-bold hover:opacity-90 transition cursor-pointer">📅 Lançar Aula / Presença</button>
          </div>
          <Card className="p-0 overflow-hidden">
            <table className="table-mib">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Disciplina</th>
                  <th>Assunto</th>
                  <th className="text-center">Presenças</th>
                  <th className="text-right pr-6">Ações</th>
                </tr>
              </thead>
              <tbody>
                {aulas.length === 0 ? <tr><td colSpan="5" className="p-10 text-center text-slate-400 italic">Nenhuma aula registrada ainda.</td></tr> : 
                  aulas.map(aula => {
                    // Garantia de processamento do JSON de presenças
                    let pObj = aula.presencas || {};
                    if (typeof pObj === 'string') { try { pObj = JSON.parse(pObj); } catch(e) { pObj = {}; } }
                    const presentesCount = Object.values(pObj).filter(v => v === true).length;

                    return (
                      <tr key={aula.id}>
                        <td className="font-bold text-slate-700 text-sm">{new Date(aula.data_aula).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                        <td><span className="text-[10px] font-black bg-blue-50 text-[#055F6D] px-2 py-0.5 rounded-full">{aula.turmas_disciplinas?.disciplinas?.nome}</span></td>
                        <td className="text-xs text-slate-500">{aula.conteudo_proposto}</td>
                        <td className="text-center">
                          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 uppercase tracking-tighter">
                            {presentesCount} presentes
                          </span>
                        </td>
                        <td className="text-right pr-6 space-x-4">
                          <button onClick={() => onEditAula(aula)} className="text-[#055F6D] hover:text-[#044a56] transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer" title="Ver/Editar Chamada">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button onClick={() => onExcluirAula(aula.id)} className="text-rose-500 hover:text-rose-700 transition p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer" title="Excluir Aula">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </Card>
        </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ModalWrapper({ titulo, children, onFechar }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">{titulo}</h3>
          <button onClick={onFechar} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border text-slate-400 hover:text-rose-500 transition cursor-pointer">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}