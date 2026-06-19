import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from './supabaseClient';
import { PageHeader, Card, CardHeader, Avatar, StatCard, DoughnutCard, ColumnChart } from './ui'; 
import { agrupamentoPor } from './churchUtils';

export default function EscolasModulo({ submenu, onNavigate, pessoas = [], alunoSelecionadoParaCadernetaId, setAlunoSelecionadoParaCadernetaId, membroLogado }) {
  const [escolas, setEscolas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [escolaEditando, setEscolaEditando] = useState(null);
  const [isModalEdicaoAberto, setIsModalEdicaoAberto] = useState(false);
  
  const podeEditar = ['admin', 'secretaria'].includes(membroLogado?.permissao);

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
  const [mostrarFormNovaTurma, setMostrarFormNovaTurma] = useState(false);
  const [mostrarFormNovoCurso, setMostrarFormNovoCurso] = useState(false);

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
  const [disciplinaParaEditar, setDisciplinaParaEditar] = useState(null);
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
    const sortedAlunos = (dataAlunos || []).sort((a, b) => 
      (a.alunos?.pessoas?.nome || "").localeCompare(b.alunos?.pessoas?.nome || "")
    );
    setAlunosTurma(sortedAlunos);

    // 2. Disciplinas vinculadas
    const { data: dataDisc } = await supabase
      .from('turmas_disciplinas')
      .select('*, disciplinas(id, nome), professores(id, pessoa_id, pessoas(nome))')
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
    if (!(await window.confirmModal('Excluir Curso', 'Deseja realmente excluir este curso? Todas as turmas vinculadas serão afetadas.'))) return;
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

  const handleUpdateStatusAluno = async (matriculaId, novoStatus) => {
    setCarregando(true);
    const { error } = await supabase
      .from('alunos_turmas')
      .update({ status: novoStatus })
      .eq('id', matriculaId);

    if (error) {
      alert('Erro ao atualizar status do aluno: ' + error.message);
    } else {
      carregarDadosTurma(turmaSelecionadaId);
    }
    setCarregando(false);
  };

  const handleExcluirTurma = async (id) => {
    if (!(await window.confirmModal('Excluir Turma', 'Excluir esta turma permanentemente?'))) return;
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
    
    try {
      // 1. Garantir que professor existe
      let { data: prof } = await supabase.from('professores').select('id').eq('pessoa_id', novaDisciplinaProfId).maybeSingle();
      if (!prof) {
        const { data: novoProf, error: profError } = await supabase.from('professores').insert([{ pessoa_id: novaDisciplinaProfId }]).select().single();
        if (profError) throw profError;
        prof = novoProf;
      }

      if (disciplinaParaEditar) {
        // Atualizar disciplina existente
        const { error: discError } = await supabase
          .from('disciplinas')
          .update({ nome: novaDisciplinaNome })
          .eq('id', disciplinaParaEditar.disciplinas.id);
        if (discError) throw discError;

        // Atualizar vínculo na turma (professor)
        const { error: vincError } = await supabase
          .from('turmas_disciplinas')
          .update({ professor_id: prof.id })
          .eq('id', disciplinaParaEditar.id);
        if (vincError) throw vincError;
      } else {
        // Criar nova disciplina
        const { data: disc, error: discError } = await supabase.from('disciplinas').insert([{ 
          nome: novaDisciplinaNome, 
          escola_id: turma.escola_id 
        }]).select().single();
        if (discError) throw discError;

        // Vincular à turma
        const { error: vincError } = await supabase.from('turmas_disciplinas').insert([{
          turma_id: turmaSelecionadaId,
          disciplina_id: disc.id,
          professor_id: prof.id
        }]);
        if (vincError) throw vincError;
      }

      setIsModalAddDisciplinaAberto(false);
      setNovaDisciplinaNome('');
      setNovaDisciplinaProfId('');
      setDisciplinaParaEditar(null);
      carregarDadosTurma(turmaSelecionadaId);
    } catch (error) {
      alert('Erro ao salvar disciplina: ' + error.message);
    } finally {
      setCarregando(false);
    }
  };

  const handleEditDisciplina = (d) => {
    setDisciplinaParaEditar(d);
    setNovaDisciplinaNome(d.disciplinas?.nome || '');
    setNovaDisciplinaProfId(d.professores?.pessoa_id || '');
    setIsModalAddDisciplinaAberto(true);
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
    if (!(await window.confirmModal('Excluir Aula', 'Deseja realmente excluir este registro de aula?'))) return;
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
    <div className="escolas-root space-y-6">
      <style>{`
        .escolas-root, .escolas-root * { 
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif !important; 
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
      <div className="hidden md:block">
        <PageHeader titulo={getSubmenuTitle(submenu)} breadcrumb={breadcrumb} onNavigate={() => onNavigate('resumo')} />
      </div>

      {submenu === 'resumo' && (
        <DashboardEscolas escolas={escolas} turmas={turmas} pessoas={pessoas} onNavigate={onNavigate} />
      )}

      {submenu === 'cursos' && (
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 items-start">
          {/* PAINEL LATERAL DE CADASTRO */}
          {podeEditar && (
          <Card className="p-0 overflow-hidden sticky top-24">
            <div className="hidden md:block">
              <CardHeader 
                titulo="Novo Curso" 
                className="!bg-slate-50 !border-[#202046]"
              />
            </div>

            {/* Mobile: botão que expande o formulário (pushdown) */}
            <button
              type="button"
              onClick={() => setMostrarFormNovoCurso(v => !v)}
              className="md:hidden w-full flex items-center justify-between p-4 font-bold text-sm text-[#202046] bg-slate-50"
            >
              + Criar Novo Curso
              <svg className={`w-4 h-4 transition-transform ${mostrarFormNovoCurso ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`${mostrarFormNovoCurso ? 'block' : 'hidden'} md:block`}>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nome do Curso</label>
                <input 
                  type="text" required placeholder="Ex: Escola de Líderes..."
                  value={nome} 
                  onChange={e => setNome(e.target.value)} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#202046]/20 outline-none" 
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
                        className="rounded text-[#202046] focus:ring-[#202046]" 
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
                  className="w-full py-2.5 rounded-xl bg-[#202046] hover:opacity-90 text-white text-sm font-bold transition shadow-md disabled:opacity-50">
                  {carregando ? 'Processando...' : '+ Criar Novo Curso'}
                </button>
              </div>
            </form>
            </div>
          </Card>
          )}

          {/* LISTA DE CURSOS EM TABELA */}
          <Card className={`p-5 overflow-hidden ${!podeEditar ? 'col-span-full' : ''}`}>
            <div className="hidden md:block"><CardHeader titulo="Cursos Cadastrados" /></div>
            <div className="overflow-x-auto">
              <table className="table-mib">
                <thead>
                  <tr>
                    <th>Curso / Descrição</th>
                    <th className="hidden sm:table-cell">Gestores</th>
                    <th className="text-center hidden sm:table-cell">Início</th>
                    <th className="text-right pr-2 sm:pr-6">Ações</th>
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
                          <p className="text-[11px] text-slate-400 line-clamp-1 max-w-[180px] sm:max-w-[250px]">{escola.descricao || 'Sem descrição'}</p>
                        </td>
                        <td className="hidden sm:table-cell">
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
                        <td className="text-center text-xs text-slate-500 hidden sm:table-cell">
                          {new Date(escola.data_criacao).toLocaleDateString()}
                        </td>
                        <td className="text-right pr-2 sm:pr-6">
                          {podeEditar && (
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleEditar(escola)} className="text-[#202046] hover:text-[#2F2F80] transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer" title="Editar Curso">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button onClick={() => handleExcluir(escola.id)} className="text-rose-500 hover:text-rose-700 transition p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer" title="Remover Curso">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          )}
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
            onAddDisciplina={() => {
              setDisciplinaParaEditar(null);
              setNovaDisciplinaNome('');
              setNovaDisciplinaProfId('');
              setIsModalAddDisciplinaAberto(true);
            }}
            onEditDisciplina={handleEditDisciplina}
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
            onUpdateStatusAluno={handleUpdateStatusAluno}
          />
        ) : turmaSelecionadaId ? (
          <div className="p-10 text-center animate-pulse text-slate-400">Buscando dados da turma...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 items-start">
          {/* Voltar (somente mobile) */}
          <button
            type="button"
            onClick={() => onNavigate('resumo')}
            className="md:hidden col-span-full -mb-2 text-[10px] font-black text-[#202046] uppercase hover:underline cursor-pointer text-left"
          >
            ← Voltar
          </button>

          {/* PAINEL LATERAL DE CADASTRO */}
          <Card className="p-0 overflow-hidden sticky top-24 col-span-full lg:col-span-1">
            {/* Mobile: botão que expande o formulário (pushdown) */}
            <button
              type="button"
              onClick={() => setMostrarFormNovaTurma(v => !v)}
              className="md:hidden w-full flex items-center justify-between p-4 font-bold text-sm text-[#202046] bg-slate-50"
            >
              + Adicionar Turma
              <svg className={`w-4 h-4 transition-transform ${mostrarFormNovaTurma ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`${mostrarFormNovaTurma ? 'block' : 'hidden'} md:block`}>
              <div className="hidden md:block">
                <CardHeader titulo="Nova Turma" className="!bg-slate-50 !border-[#202046]" />
              </div>
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
            </div>
          </Card>

          {/* LISTA EM TABELA */}
          <Card className="p-0 overflow-hidden col-span-full lg:col-span-1">
            <div className="hidden md:block"><CardHeader titulo="Turmas Ativas" /></div>
            <div className="overflow-x-auto">
              <table className="table-mib">
                <thead>
                  <tr>
                    <th>Turma</th>
                    <th className="hidden sm:table-cell">Curso</th>
                    <th className="hidden sm:table-cell">Horário</th>
                    <th>Status</th>
                    <th className="text-right pr-2 sm:pr-6">Ações</th>
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
                          <p className="text-[10px] text-[#202046] uppercase font-bold sm:hidden">{t.escolas?.nome || 'Curso não vinculado'}</p>
                        </td>
                        <td className="hidden sm:table-cell">
                          <p className="text-[10px] text-[#202046] uppercase font-bold">{t.escolas?.nome || 'Curso não vinculado'}</p>
                        </td>
                        <td className="text-xs text-slate-600 hidden sm:table-cell">{t.horario}</td>
                        <td>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                            t.status === 'Em andamento' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                            t.status === 'Finalizada' ? 'bg-slate-50 text-slate-500 border-slate-200' :
                            'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="text-right pr-2 sm:pr-6">
                          <div className="flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                            <button onClick={() => handleEditarTurma(t)} className="text-[#202046] hover:text-[#2F2F80] transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer" title="Editar Turma">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button onClick={() => handleExcluirTurma(t.id)} className="text-rose-500 hover:text-rose-700 transition p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer" title="Remover Turma">
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
            </div>
          </Card>
        </div>
        )
      )}

      {submenu === 'disciplinas' && (
        <Card className="p-6">
          <div className="hidden md:block"><CardHeader titulo="Gestão de Disciplinas" /></div>
          <p className="text-sm text-slate-600">
            Cadastre e organize as disciplinas oferecidas pelas escolas da igreja.
          </p>
          {/* Conteúdo específico para Disciplinas */}
        </Card>
      )}

      {submenu === 'professores' && (
        <Card className="p-6">
          <div className="hidden md:block"><CardHeader titulo="Cadastro de Professores" /></div>
          <p className="text-sm text-slate-600">
            Gerencie os professores, seus dados e as disciplinas que lecionam.
          </p>
          {/* Conteúdo específico para Professores */}
        </Card>
      )}

      {submenu === 'alunos' && (
        <Card className="p-6">
          <div className="hidden md:block"><CardHeader titulo="Cadastro de Alunos" /></div>
          <p className="text-sm text-slate-600">
            Mantenha o registro dos alunos, suas turmas e histórico.
          </p>
          {/* Conteúdo específico para Alunos */}
        </Card>
      )}

      {submenu === 'aulas' && (
        <Card className="p-6">
          <div className="hidden md:block"><CardHeader titulo="Programação de Aulas" /></div>
          <p className="text-sm text-slate-600">
            Organize o calendário e a programação das aulas.
          </p>
          {/* Conteúdo específico para Aulas */}
        </Card>
      )}

      {submenu === 'avaliacoes' && (
        <Card className="p-6">
          <div className="hidden md:block"><CardHeader titulo="Registro de Avaliações" /></div>
          <p className="text-sm text-slate-600">
            Registre e acompanhe as avaliações e o desempenho dos alunos.
          </p>
          {/* Conteúdo específico para Avaliações */}
        </Card>
      )}

      {submenu === 'inscricoes' && (
        <Card className="p-6">
          <div className="hidden md:block"><CardHeader titulo="Formulários de Inscrição Pública" /></div>
          <p className="text-sm text-slate-600">
            Crie e gerencie formulários de inscrição para novos alunos.
          </p>
          {/* Conteúdo específico para Inscrições Públicas */}
        </Card>
      )}

      {/* Modal de Edição (Apenas Edição) */}
      {isModalEdicaoAberto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-2 py-4 bg-slate-900/60 backdrop-blur-sm">
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#202046]/20 outline-none" 
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
                <button type="submit" disabled={carregando} className="flex-1 px-4 py-3 bg-[#202046] text-white rounded-2xl text-xs font-bold hover:opacity-90 transition shadow-lg shadow-teal-100 cursor-pointer">
                  {carregando ? 'Salvando...' : '💾 Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Edição Turma */}
      {isModalEdicaoTurmaAberto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-2 py-4 bg-slate-900/60 backdrop-blur-sm">
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
                <button type="submit" disabled={carregando} className="flex-1 px-4 py-3 bg-[#202046] text-white rounded-2xl text-xs font-bold hover:opacity-90 transition shadow-lg shadow-teal-100 cursor-pointer">
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
                  className="rounded text-[#202046] focus:ring-[#202046]"
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
            <button onClick={() => handleAddAlunos(selectedMembrosParaAdicionar)} disabled={isAddingAlunos || selectedMembrosParaAdicionar.length === 0} className="flex-1 py-2.5 rounded-xl bg-[#202046] text-white text-xs font-bold disabled:opacity-50 cursor-pointer">
              {isAddingAlunos ? 'Adicionando...' : `Adicionar Selecionados (${selectedMembrosParaAdicionar.length})`}
            </button>
          </div>
        </ModalWrapper>
      )}

      {/* MODAL INCLUIR DISCIPLINA */}
      {isModalAddDisciplinaAberto && (
        <ModalWrapper titulo={disciplinaParaEditar ? "Editar Disciplina" : "Incluir Disciplina"} onFechar={() => setIsModalAddDisciplinaAberto(false)}>
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
              <button type="submit" className="flex-1 py-2.5 rounded-xl bg-[#202046] text-white text-xs font-bold cursor-pointer">Salvar Disciplina</button>
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
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Observações</label>
                <textarea rows="2" value={novaAulaDesc} onChange={e => setNovaAulaDesc(e.target.value)} className="w-full px-3 py-2 border rounded-xl resize-none" placeholder="Relato do professor sobre a aula ministrada..." />
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-black text-slate-400 uppercase mb-3 tracking-widest">Chamada / Presença</h4>
                <div className="space-y-2">
                  {alunosTurma.filter(a => a.status === 'ativo').map(a => {
                    const presente = !!novaAulaPresencas[a.aluno_id];
                    return (
                      <div key={a.aluno_id} className="flex items-center justify-between p-2.5 rounded-lg bg-white border transition select-none">
                        <span className="text-xs font-bold text-slate-700">{a.alunos?.pessoas?.nome}</span>
                        <button
                          type="button"
                          onClick={() => togglePresencaAula(a.aluno_id)}
                          className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${presente ? 'bg-emerald-500' : 'bg-rose-400'}`}
                          title={presente ? 'Presente' : 'Ausente'}
                        >
                          <span className={`pointer-events-none inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out text-[9px] font-black ${presente ? 'translate-x-6 text-emerald-600' : 'translate-x-0 text-rose-500'}`}>
                            {presente ? 'P' : 'A'}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="p-5 border-t bg-slate-50 flex gap-3 shrink-0">
              <button type="button" onClick={() => setIsModalAddAulaAberto(false)} className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-bold cursor-pointer">Cancelar</button>
              <button type="submit" className="flex-1 py-3 rounded-xl bg-[#202046] text-white text-xs font-bold shadow-lg cursor-pointer">Finalizar e Salvar Aula</button>
            </div>
          </form>
        </ModalWrapper>
      )}
    </div>
  );
}

/* COMPONENTES AUXILIARES PARA DETALHES */

function DetalhesDaTurma({ turma, abaAtiva, setAbaAtiva, onVoltar, alunos, disciplinas, aulas, onAddAlunos, onAddDisciplina, onEditDisciplina, onAddAula, onEditAula, onExcluirAula, onVerAluno, onUpdateStatusAluno }) {
  if (!turma) return null;

  // Estados para a aba de Frequência
  const [mesFrequencia, setMesFrequencia] = useState(new Date().getMonth());
  const [anoFrequencia, setAnoFrequencia] = useState(new Date().getFullYear());
  const [esconderDiasSemRegistro, setEsconderDiasSemRegistro] = useState(true);
  const [relatorioFrequencia, setRelatorioFrequencia] = useState(null);

  const mesesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const gerarRelatorioFrequencia = () => {
    // Filtrar aulas da turma que pertencem ao mês e ano selecionados
    const aulasFiltradas = aulas.filter(aula => {
      const data = new Date(aula.data_aula);
      // Ajuste de timezone para comparação precisa
      const dataAjustada = new Date(data.getTime() + data.getTimezoneOffset() * 60000);
      return dataAjustada.getMonth() === Number(mesFrequencia) && dataAjustada.getFullYear() === Number(anoFrequencia);
    });

    // Mapear dias que possuem registro de aula
    const diasComAula = [...new Set(aulasFiltradas.map(aula => {
      const d = new Date(aula.data_aula);
      const da = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
      return da.getDate();
    }))].sort((a, b) => a - b);

    // Montar matriz de presença para cada aluno
    const dados = alunos.map(aluno => {
      const presencasPorDia = {};
      
      aulasFiltradas.forEach(aula => {
        const d = new Date(aula.data_aula);
        const da = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
        const dia = da.getDate();
        
        // Processar o JSON de presenças
        let pObj = aula.presencas || {};
        if (typeof pObj === 'string') { try { pObj = JSON.parse(pObj); } catch(e) { pObj = {}; } }
        
        // Se já houver registro 'P' para o dia, mantém. Se for 'F' e encontrar um 'P', atualiza.
        const statusAnterior = presencasPorDia[dia];
        const statusAtual = pObj[aluno.aluno_id] ? 'P' : 'F';
        
        if (statusAnterior !== 'P') {
          presencasPorDia[dia] = statusAtual;
        }
      });

      return {
        nome: aluno.alunos?.pessoas?.nome,
        presencas: presencasPorDia
      };
    });

    setRelatorioFrequencia({ diasComAula, dados });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 items-start animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Voltar (somente mobile) */}
      <button onClick={onVoltar} className="sm:hidden col-span-full -mb-2 text-[10px] font-black text-[#202046] uppercase hover:underline cursor-pointer text-left">← Voltar para Lista</button>

      {/* PAINEL LATERAL DE INFORMAÇÕES (oculto no mobile, vira aba "Informações") */}
      <Card className="hidden sm:block p-4 sm:p-6 border-t-4 border-t-[#202046] lg:sticky lg:top-24">
        <InfoTurma turma={turma} alunos={alunos} onVoltar={onVoltar} />
      </Card>

      <div className="space-y-6">
        {/* NAVEGAÇÃO DE ABAS E AÇÕES */}
        {(() => {
          const tabConfig = [
            {
              id: 'info',
              label: 'Informações',
              cor: '#0ea5e9',
              badge: null,
              mobileOnly: true,
              icon: (
                <svg className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              ),
            },
            {
              id: 'alunos',
              label: 'Alunos',
              cor: '#202046',
              badge: alunos.length,
              icon: (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
            },
            {
              id: 'disciplinas',
              label: 'Disciplinas',
              cor: '#6366f1',
              badge: disciplinas.length,
              icon: (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ),
            },
            {
              id: 'aulas',
              label: 'Aulas',
              cor: '#f59e0b',
              badge: aulas.length,
              icon: (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              id: 'frequencias',
              label: 'Frequências',
              cor: '#10b981',
              badge: null,
              icon: (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              ),
            },
          ];

          return (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 bg-slate-50/60 px-2 pt-2 gap-2 sm:gap-3 rounded-t-2xl">
              <div className="flex w-full sm:w-auto overflow-x-auto gap-1 scrollbar-hide -mx-2 px-2 sm:mx-0 sm:px-0">
                {tabConfig.map((tab) => {
                  const isAtivo = abaAtiva === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setAbaAtiva(tab.id)}
                      className={`flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2 rounded-t-xl text-[11px] font-black whitespace-nowrap transition-all shrink-0 border-b-2 cursor-pointer ${
                        tab.mobileOnly ? 'sm:hidden' : ''
                      } ${
                        isAtivo
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-white/60'
                      }`}
                      style={{ borderBottomColor: isAtivo ? tab.cor : 'transparent' }}
                      title={tab.label}
                    >
                      <span className="[&_svg]:w-8 [&_svg]:h-8 sm:[&_svg]:w-3.5 sm:[&_svg]:h-3.5" style={{ color: isAtivo ? tab.cor : undefined }}>{tab.icon}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                      {tab.badge !== null && (
                        <span
                        className="hidden sm:inline text-[9px] font-black px-1.5 py-0.5 rounded-full ml-0.5"
                          style={
                            isAtivo
                              ? { backgroundColor: tab.cor, color: 'white' }
                              : { backgroundColor: '#e2e8f0', color: '#94a3b8' }
                          }
                        >
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Ações Rápidas - Alinhadas com as Abas */}
              <div className="pb-2 sm:pb-0 px-1 sm:pr-2 shrink-0">
                {abaAtiva === 'alunos' && (
                  <button onClick={onAddAlunos} className="w-full sm:w-auto px-4 py-1.5 bg-[#202046] text-white rounded-xl text-[10px] font-black uppercase hover:opacity-90 transition cursor-pointer shadow-sm shadow-teal-900/10">+ Adicionar Alunos</button>
                )}
                {abaAtiva === 'disciplinas' && (
                  <button onClick={onAddDisciplina} className="w-full sm:w-auto px-4 py-1.5 bg-[#6366f1] text-white rounded-xl text-[10px] font-black uppercase hover:opacity-90 transition cursor-pointer shadow-sm shadow-indigo-900/10">+ Incluir Disciplina</button>
                )}
                {abaAtiva === 'aulas' && (
                  <button onClick={onAddAula} className="w-full sm:w-auto px-4 py-1.5 bg-[#f59e0b] text-white rounded-xl text-[10px] font-black uppercase hover:opacity-90 transition cursor-pointer shadow-sm shadow-amber-900/10">📅 Lançar Aula / Presença</button>
                )}
              </div>
            </div>
          );
        })()}

        {/* CONTEÚDO DAS ABAS */}
        {abaAtiva === 'info' && (
          <Card className="sm:hidden p-4 border-t-4 border-t-[#0ea5e9]">
            <InfoTurma turma={turma} alunos={alunos} onVoltar={onVoltar} />
          </Card>
        )}

        {abaAtiva === 'alunos' && (
          <div className="space-y-4">
          <Card className="p-0 overflow-hidden">
            <table className="table-mib">
              <thead><tr><th>Aluno</th><th>Status na Turma</th><th className="hidden sm:table-cell">Matrícula</th><th className="text-right pr-2 sm:pr-6">Ações</th></tr></thead>
              <tbody>
                {alunos.length === 0 ? <tr><td colSpan="4" className="p-10 text-center text-slate-400 italic">Nenhum aluno matriculado nesta turma.</td></tr> : 
                  alunos.map(a => (
                    <tr key={a.id} onClick={() => onVerAluno(a.alunos?.pessoa_id)} className="cursor-pointer hover:bg-slate-50 transition">
                      <td><div className="flex items-center gap-2"><Avatar pessoa={a.alunos?.pessoas} tamanho="w-8 h-8"/><span className="text-sm text-slate-700">{a.alunos?.pessoas?.nome}</span></div></td>
                      <td>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border uppercase ${
                          a.status === 'ativo' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                          a.status === 'desistente' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                          'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="font-mono text-xs text-slate-400 hidden sm:table-cell">{a.alunos?.matricula || '---'}</td>
                      <td className="text-right pr-2 sm:pr-6">
                        <div className="flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                          <button 
                            onClick={() => onUpdateStatusAluno(a.id, a.status === 'ativo' ? 'desistente' : 'ativo')}
                            className={`transition p-1.5 rounded-lg cursor-pointer ${
                              a.status === 'ativo' 
                                ? 'text-slate-400 hover:text-rose-500 hover:bg-rose-50' 
                                : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-50'
                            }`}
                            title={a.status === 'ativo' ? 'Desativar Aluno' : 'Reativar Aluno'}
                          >
                            
                            {a.status === 'ativo' ? (
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
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
            <Card className="p-0 overflow-hidden">
              <table className="table-mib">
                <thead>
                  <tr>
                    <th>Disciplina</th>
                    <th>Professor</th>
                    <th className="text-right pr-2 sm:pr-6">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {disciplinas.length === 0 ? (
                    <tr><td colSpan="3" className="p-10 text-center text-slate-400 italic">Nenhuma disciplina vinculada.</td></tr>
                  ) : (
                    disciplinas.map(d => (
                      <tr key={d.id}>
                        <td><span className="font-bold text-sm text-slate-700">{d.disciplinas?.nome}</span></td>
                        <td><span className="text-xs font-bold text-[#202046]">{d.professores?.pessoas?.nome}</span></td>
                        <td className="text-right pr-2 sm:pr-6 space-x-2 sm:space-x-4">
                          <button onClick={() => onEditDisciplina(d)} className="text-[#202046] hover:text-[#2F2F80] transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer" title="Editar Disciplina">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button className="text-rose-500 hover:text-rose-700 transition p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer" title="Remover Disciplina">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {abaAtiva === 'aulas' && (
          <div className="space-y-4">
          <Card className="p-0 overflow-hidden">
            <table className="table-mib">
              <thead>
                <tr>
                  <th>Data</th>
                  <th className="hidden sm:table-cell">Assunto</th>
                  <th className="text-center">Presenças</th>
                  <th className="text-right pr-2 sm:pr-6">Ações</th>
                </tr>
              </thead>
              <tbody>
                {aulas.length === 0 ? <tr><td colSpan="4" className="p-10 text-center text-slate-400 italic">Nenhuma aula registrada ainda.</td></tr> : 
                  aulas.map(aula => {
                    // Garantia de processamento do JSON de presenças
                    let pObj = aula.presencas || {};
                    if (typeof pObj === 'string') { try { pObj = JSON.parse(pObj); } catch(e) { pObj = {}; } }
                    const presentesCount = Object.values(pObj).filter(v => v === true).length;

                    return (
                      <tr key={aula.id}>
                        <td className="font-bold text-slate-700 text-sm">
                          {new Date(aula.data_aula).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                          {aula.conteudo_proposto && (
                            <div className="sm:hidden mt-1">
                              <span className="block text-xs text-slate-500">{aula.conteudo_proposto}</span>
                            </div>
                          )}
                        </td>
                        <td className="text-xs text-slate-500 hidden sm:table-cell">{aula.conteudo_proposto}</td>
                        <td className="text-center">
                          <span className="text-[14px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 uppercase tracking-tighter">
                            {presentesCount}
                          </span>
                        </td>
                        <td className="text-right pr-2 sm:pr-6">
                          <div className="flex items-center justify-end gap-2 sm:gap-4">
                          <button onClick={() => onEditAula(aula)} className="text-[#202046] hover:text-[#2F2F80] transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer" title="Ver/Editar Chamada">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button onClick={() => onExcluirAula(aula.id)} className="text-rose-500 hover:text-rose-700 transition p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer" title="Excluir Aula">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </Card>
        </div>
        )}

        {abaAtiva === 'frequencias' && (
          <div className="space-y-6">
            {/* PAINEL DE FILTROS DA FREQUÊNCIA */}
            <Card className="p-4 bg-slate-50 border-slate-200">
              <div className="flex flex-wrap items-end gap-3 sm:gap-4">
                <div className="flex-1 min-w-[120px] sm:min-w-[150px]">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Mês</label>
                  <select value={mesFrequencia} onChange={e => setMesFrequencia(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-white text-sm">
                    {mesesNomes.map((m, i) => <option key={i} value={i}>{m}</option>)}
                  </select>
                </div>
                <div className="flex-1 min-w-[90px] sm:min-w-[120px]">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Ano</label>
                  <select value={anoFrequencia} onChange={e => setAnoFrequencia(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-white text-sm">
                    {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button onClick={gerarRelatorioFrequencia} className="px-6 py-2 bg-[#202046] text-white rounded-xl text-xs font-bold hover:opacity-90 transition w-full sm:w-auto">
                    Gerar Frequência
                  </button>
                  <div className="flex items-center justify-between sm:justify-start gap-3 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm h-[38px]">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Exibir dias vazios</span>
                    <button 
                      type="button"
                      onClick={() => setEsconderDiasSemRegistro(!esconderDiasSemRegistro)} 
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${!esconderDiasSemRegistro ? 'bg-[#202046]' : 'bg-slate-200'}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${!esconderDiasSemRegistro ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* RELATÓRIO EM TABELA */}
            {relatorioFrequencia ? (
              <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="table-mib">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="sticky left-0 bg-slate-50 z-10 min-w-[120px] sm:min-w-[160px]">Aluno</th>
                        {/* Gerar colunas para os dias */}
                        {(esconderDiasSemRegistro ? relatorioFrequencia.diasComAula : Array.from({length: 31}, (_, i) => i + 1)).map(dia => (
                          <th key={dia} className="text-center w-7 sm:w-8 min-w-[28px] sm:min-w-[32px] px-0.5 sm:px-1">{dia}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {relatorioFrequencia.dados.map((row, idx) => (
                        <tr key={idx}>
                          <td className="sticky left-0 bg-white z-10 font-medium text-slate-700 text-xs border-r min-w-[120px] sm:min-w-[160px] truncate">{row.nome}</td>
                          {(esconderDiasSemRegistro ? relatorioFrequencia.diasComAula : Array.from({length: 31}, (_, i) => i + 1)).map(dia => {
                            const status = row.presencas[dia];
                            return (
                              <td key={dia} className="text-center p-0">
                                <span className={`inline-block w-full py-2 text-[10px] font-semibold ${
                                  status === 'P' ? 'text-emerald-600 bg-emerald-50/50' : 
                                  status === 'F' ? 'text-rose-600 bg-rose-50/50' : 
                                  'text-slate-200'
                                }`}>
                                  {status || '-'}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ) : (
              <div className="p-12 text-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-300 italic text-sm">
                Selecione o período e clique em "Gerar Frequência" para visualizar o mapa de presença.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* COMPONENTE DE DASHBOARD */
function DashboardEscolas({ escolas, turmas, pessoas, onNavigate }) {
  const [stats, setStats] = useState({
    totalAlunos: 0,
    totalMatriculas: 0,
    matriculasPorCurso: {},
    porGenero: {},
    porEscolaridade: {},
    porStatus: {},
    rankingFrequencia: []
  });
  const [carregandoStats, setCarregandoStats] = useState(true);

  useEffect(() => {
    async function carregarStats() {
      setCarregandoStats(true);
      try {
        const { data: matriculas } = await supabase
          .from('alunos_turmas')
          .select('*, turmas(nome, escola_id, escolas(nome)), alunos(pessoa_id)');
        
        if (matriculas) {
          const uniqueAlunosIds = [...new Set(matriculas.map(m => m.alunos?.pessoa_id))];
          const alunosPessoas = pessoas.filter(p => uniqueAlunosIds.includes(p.id));

          // 1. Matrículas por Curso
          const porCurso = {};
          matriculas.forEach(m => {
            const nomeCurso = m.turmas?.escolas?.nome || 'Outros';
            porCurso[nomeCurso] = (porCurso[nomeCurso] || 0) + 1;
          });

          // 2. Por Status
          const porStatus = agrupamentoPor(matriculas, m => m.status || 'ativo');

          // 3. Rankings (Simulado com base no engajamento/matrículas por aluno se não houver notas)
          // Aqui você pode expandir para buscar médias reais da tabela de avaliações

          setStats({
            totalAlunos: uniqueAlunosIds.length,
            totalMatriculas: matriculas.length,
            matriculasPorCurso: porCurso,
            porGenero: agrupamentoPor(alunosPessoas, p => p.genero || 'Não informado'),
            porEscolaridade: agrupamentoPor(alunosPessoas, p => p.escolaridade || 'Não informada'),
            porStatus
          });
        }
      } catch (err) {
        console.error("Erro dashboard:", err);
      } finally {
        setCarregandoStats(false);
      }
    }
    carregarStats();
  }, [pessoas]);

  if (carregandoStats) return <div className="p-10 text-center text-slate-400 animate-pulse">Gerando indicadores...</div>;

  return (
    <div className="space-y-6">
      {/* LINHA 1: INDICADORES RÁPIDOS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="h-30 sm:h-40">
          <StatCard 
            label="Total de Alunos" 
            valor={stats.totalAlunos} 
            detalhe="Alunos únicos" 
            icone={<span className="text-4xl">🎓</span>}
            className="h-full justify-center items-center text-center"
          />
        </div>
        <div
          onClick={() => onNavigate('cursos')}
          className="h-30 sm:h-40 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
          title="Ir para Cursos"
        >
          <StatCard 
            label="Cursos" 
            valor={escolas.length} 
            detalhe="Escolas ativas" 
            icone={<span className="text-4xl">🏫</span>}
            className="h-full justify-center items-center text-center"
          />
        </div>
        <div
          onClick={() => onNavigate('turmas')}
          className="h-30 sm:h-40 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
          title="Ir para Turmas"
        >
          <StatCard 
            label="Turmas" 
            valor={turmas.filter(t => t.status === 'Em andamento').length} 
            detalhe="Em andamento" 
            icone={<span className="text-4xl">👥</span>}
            className="h-full justify-center items-center text-center"
          />
        </div>
        <div className="h-30 sm:h-40">
          <StatCard 
            label="Matrículas" 
            valor={stats.totalMatriculas} 
            detalhe="Total acumulado" 
            icone={<span className="text-4xl">📝</span>}
            className="h-full justify-center items-center text-center"
          />
        </div>
      </div>

      {/* LINHA 2: MATRÍCULAS POR CURSO E STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ColumnChart titulo="Matrículas por Curso" dados={stats.matriculasPorCurso} />
        <DoughnutCard titulo="Status das Matrículas" dados={stats.porStatus} />
      </div>

      {/* LINHA 3: PERFIL DEMOGRÁFICO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DoughnutCard titulo="Alunos por Gênero" dados={stats.porGenero} />
        <DoughnutCard titulo="Alunos por Escolaridade" dados={stats.porEscolaridade} />
      </div>

      {/* LINHA 4: RANKINGS E SUGESTÕES */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6">
        <Card className="p-0">
          <div className="hidden md:block"><CardHeader titulo="Ranking de Cursos por Engajamento" subtitulo="Baseado no volume de matrículas ativas." /></div>
          <div className="overflow-x-auto">
            <table className="table-mib">
              <thead>
                <tr><th>Curso</th><th>Turmas</th><th>Matrículas</th></tr>
              </thead>
              <tbody>
                {escolas.map(e => (
                  <tr key={e.id}>
                    <td className="font-bold text-slate-700">{e.nome}</td>
                    <td className="text-slate-500">{turmas.filter(t => t.escola_id === e.id).length} turmas</td>
                    <td>
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-black text-xs">
                        {stats.matriculasPorCurso[e.nome] || 0}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-[#202046] to-[#0891b2] text-white">
          <h4 className="font-black uppercase tracking-widest text-[10px] opacity-70 mb-4">Dica de Gestão</h4>
          <p className="text-sm leading-relaxed font-medium">
            Acompanhe a taxa de <strong>Desistência</strong> para identificar cursos que podem precisar de reforço pedagógico ou mudança na abordagem de ensino.
          </p>
          <button onClick={() => onNavigate('turmas')} className="mt-6 w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition">Ver Detalhes das Turmas</button>
        </Card>
      </div>
    </div>
  );
}

function InfoTurma({ turma, alunos, onVoltar }) {
  return (
    <div className="space-y-6">
      <button onClick={onVoltar} className="hidden sm:block text-[10px] font-black text-[#202046] uppercase hover:underline cursor-pointer">← Voltar para Lista</button>

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
          <span className="text-xs font-bold text-[#202046] px-2.5 py-1 bg-teal-50 rounded-full border border-teal-100 inline-block">{turma?.status}</span>
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
  );
}

function ModalWrapper({ titulo, children, onFechar }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh] self-end sm:self-center">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">{titulo}</h3>
          <button onClick={onFechar} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border text-slate-400 hover:text-rose-500 transition cursor-pointer">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}