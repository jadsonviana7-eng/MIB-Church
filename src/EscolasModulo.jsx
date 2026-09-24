import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { PageHeader, Card, CardHeader, Avatar, StatCard, DoughnutCard, ColumnChart } from './ui';
import { agrupamentoPor } from './churchUtils';
import {
  Users, Home, Calendar, Award, Sparkles, AlertCircle, Coins, Activity,
  CheckCircle, Trophy, BookOpen, Flame, TrendingUp, HelpCircle,
  FileSpreadsheet, Printer, Save, Edit3, MessageSquare, Search, Check,
  RotateCcw, SlidersHorizontal, Layers, FileText, CheckCircle2
} from 'lucide-react';

const getIconForCourse = (nome) => {
  const lower = nome.toLowerCase();
  if (lower.includes('líder') || lower.includes('liderança')) {
    return {
      icon: <Flame size={32} className="text-amber-600 w-8 h-8 md:w-10 md:h-10" />,
      bg: 'bg-amber-50 text-amber-600'
    };
  }
  if (lower.includes('finanças') || lower.includes('mordomia') || lower.includes('dinheiro')) {
    return {
      icon: <Coins size={32} className="text-emerald-600 w-8 h-8 md:w-10 md:h-10" />,
      bg: 'bg-emerald-50 text-emerald-600'
    };
  }
  if (lower.includes('teologia') || lower.includes('bíblia') || lower.includes('ensino')) {
    return {
      icon: <BookOpen size={32} className="text-teal-600 w-8 h-8 md:w-10 md:h-10" />,
      bg: 'bg-teal-50 text-teal-600'
    };
  }
  return {
    icon: <Award size={32} className="text-indigo-600 w-8 h-8 md:w-10 md:h-10" />,
    bg: 'bg-indigo-50 text-indigo-600'
  };
};

export const isAlunoDesistente = (aluno) => {
  if (!aluno) return false;
  const sTurma = String(aluno.status || '').toLowerCase().trim();
  const sAluno = String(aluno.alunos?.status || '').toLowerCase().trim();
  const sPessoa = String(aluno.alunos?.pessoas?.status || '').toLowerCase().trim();
  const sSituacao = String(aluno.situacao || aluno.alunos?.situacao || '').toLowerCase().trim();

  const isValDesistente = (val) =>
    val === 'desistente' ||
    val === 'inativo' ||
    val === 'trancado' ||
    val === 'desistência' ||
    val === 'desistencia' ||
    val === 'evadido' ||
    val === 'cancelado';

  return isValDesistente(sTurma) || isValDesistente(sAluno) || isValDesistente(sPessoa) || isValDesistente(sSituacao);
};

export const isAlunoAtivo = (aluno) => !isAlunoDesistente(aluno);

export default function EscolasModulo({
  submenu,
  onNavigate,
  pessoas = [],
  alunoSelecionadoParaCadernetaId,
  setAlunoSelecionadoParaCadernetaId,
  membroLogado,
  hasAccess,
  turmaSelecionadaId,
  setTurmaSelecionadaId,
  filtroCursoTurmas,
  setFiltroCursoTurmas
}) {
  const [escolas, setEscolas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [escolaEditando, setEscolaEditando] = useState(null);
  const [isModalEdicaoAberto, setIsModalEdicaoAberto] = useState(false);

  const podeEditar = hasAccess('Escolas', 'Cursos', 'editar');

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

  // Estados para Gestão de Alunos/Disciplinas/Aulas/Avaliações
  const [alunosTurma, setAlunosTurma] = useState([]);
  const [disciplinasTurma, setDisciplinasTurma] = useState([]);
  const [aulasTurma, setAulasTurma] = useState([]);
  const [avaliacoesTurma, setAvaliacoesTurma] = useState([]);
  const [avaliacoesItensTurma, setAvaliacoesItensTurma] = useState([]);
  const [avaliacoesNotasTurma, setAvaliacoesNotasTurma] = useState([]);
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
  const [filtroAlunosModalAula, setFiltroAlunosModalAula] = useState('todos'); // 'todos' | 'ativos' | 'desistentes'

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
    try {
      // 1. Alunos
      const { data: dataAlunos } = await supabase
        .from('alunos_turmas')
        .select('*, alunos(id, pessoa_id, pessoas(nome, foto_url))')
        .eq('turma_id', id);
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

      const discIds = (dataDisc || []).map(d => d.id);

      // 3. Aulas
      if (discIds.length > 0) {
        const { data: dataAulas } = await supabase
          .from('aulas')
          .select('*, turmas_disciplinas(disciplinas(nome))')
          .in('turma_disciplina_id', discIds)
          .order('data_aula', { ascending: false });
        setAulasTurma(dataAulas || []);

        // 4. Avaliações Itens (Provas/Atividades individuais dentro dos módulos)
        let itensList = [];
        try {
          const { data: dataItens, error: errItens } = await supabase
            .from('avaliacoes_itens')
            .select('*')
            .in('turma_disciplina_id', discIds)
            .order('ordem', { ascending: true })
            .order('created_at', { ascending: true });
          if (!errItens && dataItens) {
            itensList = dataItens;
          }
        } catch (e) {
          console.warn("Tabela avaliacoes_itens não encontrada ou vazia:", e);
        }
        setAvaliacoesItensTurma(itensList);

        // 5. Notas por Item de Avaliação
        const itemIds = itensList.map(it => it.id);
        if (itemIds.length > 0) {
          try {
            const { data: dataNotasItens, error: errNotasItens } = await supabase
              .from('alunos_avaliacoes_notas')
              .select('*')
              .in('avaliacao_item_id', itemIds);
            if (!errNotasItens && dataNotasItens) {
              setAvaliacoesNotasTurma(dataNotasItens);
            } else {
              setAvaliacoesNotasTurma([]);
            }
          } catch (e) {
            console.warn("Tabela alunos_avaliacoes_notas não encontrada:", e);
            setAvaliacoesNotasTurma([]);
          }
        } else {
          setAvaliacoesNotasTurma([]);
        }

        // 6. Avaliações Gerais (Compatibilidade / Médias consolidadas por disciplina)
        const { data: dataAval, error: errAval } = await supabase
          .from('avaliacoes')
          .select('*')
          .in('turma_disciplina_id', discIds);
        if (errAval) console.error("EscolasModulo: Erro ao carregar avaliações:", errAval);
        setAvaliacoesTurma(dataAval || []);
      } else {
        setAulasTurma([]);
        setAvaliacoesTurma([]);
        setAvaliacoesItensTurma([]);
        setAvaliacoesNotasTurma([]);
      }
    } catch (err) {
      console.error("EscolasModulo: Erro ao carregar dados da turma:", err);
    } finally {
      setCarregando(false);
    }
  };

  // Criar nova avaliação vinculada a um módulo/disciplina
  const handleCriarAvaliacaoItem = async (payload) => {
    setCarregando(true);
    try {
      const { error } = await supabase
        .from('avaliacoes_itens')
        .insert([{
          turma_disciplina_id: payload.turma_disciplina_id,
          nome: payload.nome,
          peso: payload.peso || 1.0,
          ordem: payload.ordem || 1,
          data_avaliacao: payload.data_avaliacao || null
        }]);
      if (error) throw error;
      await carregarDadosTurma(turmaSelecionadaId);
      return { success: true };
    } catch (err) {
      console.error('Erro ao criar avaliação:', err);
      alert('Erro ao criar avaliação: ' + (err.message || err));
      return { success: false, error: err };
    } finally {
      setCarregando(false);
    }
  };

  // Editar avaliação existente
  const handleEditarAvaliacaoItem = async (id, payload) => {
    setCarregando(true);
    try {
      const { error } = await supabase
        .from('avaliacoes_itens')
        .update({
          nome: payload.nome,
          peso: payload.peso || 1.0,
          ordem: payload.ordem || 1,
          data_avaliacao: payload.data_avaliacao || null
        })
        .eq('id', id);
      if (error) throw error;
      await carregarDadosTurma(turmaSelecionadaId);
      return { success: true };
    } catch (err) {
      console.error('Erro ao editar avaliação:', err);
      alert('Erro ao editar avaliação: ' + (err.message || err));
      return { success: false, error: err };
    } finally {
      setCarregando(false);
    }
  };

  // Excluir avaliação
  const handleExcluirAvaliacaoItem = async (id) => {
    if (!(await window.confirmModal('Excluir Avaliação', 'Deseja realmente remover esta avaliação e todas as suas notas lançadas?'))) return;
    setCarregando(true);
    try {
      const { error } = await supabase
        .from('avaliacoes_itens')
        .delete()
        .eq('id', id);
      if (error) throw error;
      await carregarDadosTurma(turmaSelecionadaId);
      return { success: true };
    } catch (err) {
      console.error('Erro ao excluir avaliação:', err);
      alert('Erro ao excluir avaliação: ' + (err.message || err));
      return { success: false, error: err };
    } finally {
      setCarregando(false);
    }
  };

  // Salvar notas (tanto por itens de avaliação quanto médias consolidadas)
  const handleSalvarAvaliacoes = async (payload) => {
    setCarregando(true);
    try {
      const registrosGerais = Array.isArray(payload) ? payload : (payload.registrosGerais || []);
      const registrosItens = Array.isArray(payload) ? [] : (payload.registrosItens || []);

      // 1. Salva notas individuais por item de avaliação
      if (registrosItens.length > 0) {
        try {
          const { error: errItens } = await supabase
            .from('alunos_avaliacoes_notas')
            .upsert(registrosItens, { onConflict: 'avaliacao_item_id,aluno_id' });
          if (errItens) console.warn('Aviso ao salvar alunos_avaliacoes_notas:', errItens);
        } catch (e) {
          console.warn('Tabela alunos_avaliacoes_notas ainda não criada no Supabase:', e);
        }
      }

      // 2. Salva as médias consolidadas da disciplina/módulo
      if (registrosGerais.length > 0) {
        const { error: errGerais } = await supabase
          .from('avaliacoes')
          .upsert(registrosGerais, { onConflict: 'turma_disciplina_id,aluno_id' });
        if (errGerais) throw errGerais;
      }

      // 3. Recarrega dados atualizados da turma
      await carregarDadosTurma(turmaSelecionadaId);
      return { success: true };
    } catch (err) {
      console.error('Erro ao salvar avaliações:', err);
      alert('Erro ao salvar avaliações: ' + (err.message || err));
      return { success: false, error: err };
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (turmaSelecionadaId) carregarDadosTurma(turmaSelecionadaId);
  }, [turmaSelecionadaId]);

  // Limpa a turma selecionada ao navegar entre submenus do módulo (preserva se for para ficha-aluno ou avaliações)
  useEffect(() => {
    if (submenu !== 'ficha-aluno' && submenu !== 'turmas' && submenu !== 'avaliacoes') {
      setTurmaSelecionadaId(null);
    }
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

    // Constrói objeto de presenças garantindo que desistentes NUNCA fiquem com presença true
    const cleanPresencas = {};
    alunosTurma.forEach(a => {
      if (isAlunoDesistente(a)) {
        cleanPresencas[a.aluno_id] = false;
      } else {
        cleanPresencas[a.aluno_id] = !!novaAulaPresencas[a.aluno_id];
      }
    });

    const payload = {
      turma_disciplina_id: novaAulaDiscId,
      data_aula: novaAulaData,
      conteudo_proposto: novaAulaAssunto,
      observacoes: novaAulaDesc,
      presencas: cleanPresencas,
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
    
    const safePresencas = {};
    alunosTurma.forEach(a => {
      if (isAlunoDesistente(a)) {
        safePresencas[a.aluno_id] = false;
      } else if (a.aluno_id in p) {
        safePresencas[a.aluno_id] = !!p[a.aluno_id];
      } else {
        safePresencas[a.aluno_id] = true;
      }
    });

    setNovaAulaPresencas(safePresencas);
    setFiltroAlunosModalAula('todos');
    setIsModalAddAulaAberto(true);
  };

  const togglePresencaAula = (alunoId) => {
    const aluno = alunosTurma.find(a => a.aluno_id === alunoId);
    if (isAlunoDesistente(aluno)) {
      // Se for desistente, não marca como presente
      return;
    }
    setNovaAulaPresencas(prev => {
      const seguro = (typeof prev === 'object' && prev !== null && !Array.isArray(prev)) ? prev : {};
      return { ...seguro, [alunoId]: !seguro[alunoId] };
    });
  };

  const handleMarcarTodos = (apenasAtivos = true, statusPresenca = true) => {
    setNovaAulaPresencas(prev => {
      const novo = { ...(typeof prev === 'object' && prev !== null && !Array.isArray(prev) ? prev : {}) };
      alunosTurma.forEach(a => {
        if (isAlunoDesistente(a)) {
          novo[a.aluno_id] = false;
        } else {
          novo[a.aluno_id] = statusPresenca;
        }
      });
      return novo;
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
      <PageHeader titulo={getSubmenuTitle(submenu)} />

      {submenu === 'resumo' && (
        <DashboardEscolas escolas={escolas} turmas={turmas} pessoas={pessoas} onNavigate={onNavigate} />
      )}

      {submenu === 'cursos' && (
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 items-start">
          {/* PAINEL LATERAL DE CADASTRO */}
          {podeEditar && (
            <Card className="p-0 overflow-hidden sticky top-24 !bg-[#202046] !border-none text-white shadow-xl">
              <div className="hidden md:block bg-[#191938] border-b border-[#2e2e5e] p-4">
                <h3 className="text-base font-extrabold text-white tracking-tight">Novo Curso</h3>
              </div>

              {/* Mobile: botão que expande o formulário (pushdown) */}
              <button
                type="button"
                onClick={() => setMostrarFormNovoCurso(v => !v)}
                className="md:hidden w-full flex items-center justify-between p-4 font-extrabold text-sm text-white bg-[#191938] border-b border-[#2e2e5e] rounded-t-2xl cursor-pointer"
              >
                <span>+ Criar Novo Curso</span>
                <svg className={`w-4 h-4 transition-transform ${mostrarFormNovoCurso ? 'rotate-180' : ''} text-white/80`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`${mostrarFormNovoCurso ? 'block' : 'hidden'} md:block`}>
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">Nome do Curso</label>
                    <input
                      type="text" required placeholder="Ex: Escola de Líderes..."
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      className="w-full px-3 py-2 border-0 bg-[#2e2e5e] text-white placeholder-slate-400 rounded-xl text-sm focus:ring-2 focus:ring-teal-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">Data de Criação</label>
                    <input
                      type="date" required
                      value={dataCriacao}
                      onChange={e => setDataCriacao(e.target.value)}
                      className="w-full px-3 py-2 border-0 bg-[#2e2e5e] text-white rounded-xl text-sm focus:ring-2 focus:ring-teal-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">Gestores</label>
                    <div className="border border-[#2e2e5e] rounded-xl p-2 bg-[#191938] max-h-40 overflow-y-auto space-y-1">
                      {pessoas.map(p => (
                        <label key={p.id} className="flex items-center gap-2 cursor-pointer hover:bg-[#2e2e5e] p-1.5 rounded-lg transition">
                          <input type="checkbox"
                            checked={gestoresIds.includes(p.id)}
                            onChange={() => toggleGestor(p.id)}
                            className="rounded text-teal-500 focus:ring-teal-450 bg-[#2e2e5e] border-0"
                          />
                          <span className="text-xs text-slate-300 truncate">{p.nome}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">Descrição</label>
                    <textarea
                      rows="2" placeholder="Objetivos do curso..."
                      value={descricao} onChange={e => setDescricao(e.target.value)}
                      className="w-full px-3 py-2 border-0 bg-[#2e2e5e] text-white placeholder-slate-400 rounded-xl text-sm outline-none resize-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <button type="submit" disabled={carregando}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white text-sm font-black uppercase transition-all duration-300 shadow-md shadow-teal-950/20 disabled:opacity-50 cursor-pointer">
                      {carregando ? 'Processando...' : '+ Criar Novo Curso'}
                    </button>
                  </div>
                </form>
              </div>
            </Card>
          )}

          {/* CARDS DE CURSOS */}
          <div className={`${!podeEditar ? 'col-span-full' : ''} space-y-4`}>
            <div className="hidden md:block">
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight">Cursos Cadastrados</h3>
            </div>

            {carregando && escolas.length === 0 ? (
              <div className="p-10 text-center animate-pulse text-slate-400">Carregando cursos...</div>
            ) : escolas.length === 0 ? (
              <div className="p-10 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-white italic">Nenhum curso cadastrado.</div>
            ) : (
              <div className={`grid grid-cols-2 gap-4 ${podeEditar ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'}`}>
                {escolas.map(escola => {
                  const numTurmas = turmas.filter(t => t.escola_id === escola.id).length;
                  const iconInfo = getIconForCourse(escola.nome);

                  return (
                    <button
                      key={escola.id}
                      type="button"
                      onClick={() => {
                        setFiltroCursoTurmas(escola.id);
                        onNavigate('turmas');
                      }}
                      className="flex flex-col items-center justify-between p-4 sm:p-6 rounded-2xl border border-slate-150 bg-white hover:bg-slate-50/50 hover:border-slate-350 hover:shadow-md hover:scale-[1.03] active:scale-97 transition-all duration-300 text-center w-full aspect-square group cursor-pointer relative"
                    >
                      {/* Edit Action (top-right absolute) */}
                      {podeEditar && (
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); handleEditar(escola); }}
                          className="absolute top-2 right-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition p-1.5 md:p-2 rounded-lg cursor-pointer opacity-80 group-hover:opacity-100 z-10"
                          title="Editar Curso"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      )}

                      {/* Delete Action (bottom-right absolute) */}
                      {podeEditar && (
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); handleExcluir(escola.id); }}
                          className="absolute bottom-2 right-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition p-1.5 md:p-2 rounded-lg cursor-pointer opacity-80 group-hover:opacity-100 z-10"
                          title="Remover Curso"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}

                      {/* Icon Container */}
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0 transition-colors mt-2 md:mt-4 ${iconInfo.bg}`}>
                        {iconInfo.icon}
                      </div>

                      {/* Title and Highlighted Count */}
                      <div className="flex-1 flex flex-col justify-center my-2 md:my-3 w-full">
                        <h4 className="text-xs md:text-sm lg:text-base font-bold text-slate-800 line-clamp-2 leading-snug px-1 mb-1" title={escola.nome}>
                          {escola.nome}
                        </h4>
                        <div className="flex items-baseline justify-center gap-1 md:gap-1.5 mt-0.5">
                          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 group-hover:text-indigo-700 transition-colors">
                            {numTurmas}
                          </span>
                          <span className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {numTurmas === 1 ? 'turma' : 'turmas'}
                          </span>
                        </div>
                      </div>

                      {/* Hover action indicator */}
                      <span className="text-[9px] md:text-xs font-bold text-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider mb-1">
                        Ver turmas →
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
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
            avaliacoes={avaliacoesTurma}
            avaliacoesItens={avaliacoesItensTurma}
            avaliacoesNotas={avaliacoesNotasTurma}
            onSalvarAvaliacoes={handleSalvarAvaliacoes}
            onCriarAvaliacaoItem={handleCriarAvaliacaoItem}
            onEditarAvaliacaoItem={handleEditarAvaliacaoItem}
            onExcluirAvaliacaoItem={handleExcluirAvaliacaoItem}
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
              // Apenas alunos ativos iniciam como presentes (true). Desistentes iniciam como ausentes (false)
              alunosTurma.forEach(a => {
                initialPresencas[a.aluno_id] = isAlunoAtivo(a);
              });
              setNovaAulaData(hoje);
              setNovaAulaPresencas(initialPresencas);
              setNovaAulaAssunto('');
              setNovaAulaDesc('');
              setNovaAulaDiscId('');
              setAulaParaEditar(null);
              setFiltroAlunosModalAula('todos');
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

            {/* PAINEL LATERAL DE CADASTRO */}
            <Card className="p-0 overflow-hidden sticky top-24 col-span-full lg:col-span-1 !bg-[#202046] !border-none text-white shadow-xl">
              {/* Mobile: botão que expande o formulário (pushdown) */}
              <button
                type="button"
                onClick={() => setMostrarFormNovaTurma(v => !v)}
                className="md:hidden w-full flex items-center justify-between p-4 font-extrabold text-sm text-white bg-[#191938] border-b border-[#2e2e5e] rounded-t-2xl cursor-pointer"
              >
                <span>+ Adicionar Turma</span>
                <svg className={`w-4 h-4 transition-transform ${mostrarFormNovaTurma ? 'rotate-180' : ''} text-white/80`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`${mostrarFormNovaTurma ? 'block' : 'hidden'} md:block`}>
                <div className="hidden md:block bg-[#191938] border-b border-[#2e2e5e] p-4">
                  <h3 className="text-base font-extrabold text-white tracking-tight">Nova Turma</h3>
                </div>
                <form onSubmit={handleCriarTurma} className="p-5 space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">Curso / Escola</label>
                    <select
                      required value={turmaCursoId} onChange={e => setTurmaCursoId(e.target.value)}
                      className="w-full px-3 py-2 border-0 bg-[#2e2e5e] text-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="" className="bg-[#202046] text-white">Selecione o curso...</option>
                      {escolas.map(e => <option key={e.id} value={e.id} className="bg-[#202046] text-white">{e.nome}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">Nome da Turma</label>
                    <input
                      type="text" required placeholder="Ex: Turma Alpha 2024..."
                      value={turmaNome} onChange={e => setTurmaNome(e.target.value)}
                      className="w-full px-3 py-2 border-0 bg-[#2e2e5e] text-white placeholder-slate-400 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">Horário</label>
                      <select value={turmaHorario} onChange={e => setTurmaHorario(e.target.value)} className="w-full px-2 py-2 border-0 bg-[#2e2e5e] text-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-400">
                        <option value="Manhã" className="bg-[#202046] text-white">Manhã</option>
                        <option value="Tarde" className="bg-[#202046] text-white">Tarde</option>
                        <option value="Noite" className="bg-[#202046] text-white">Noite</option>
                        <option value="Não definido" className="bg-[#202046] text-white">Não definido</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">Status</label>
                      <select value={turmaStatus} onChange={e => setTurmaStatus(e.target.value)} className="w-full px-2 py-2 border-0 bg-[#2e2e5e] text-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-400">
                        <option value="Preparando turma" className="bg-[#202046] text-white">Preparando</option>
                        <option value="Em andamento" className="bg-[#202046] text-white">Em andamento</option>
                        <option value="Pausada" className="bg-[#202046] text-white">Pausada</option>
                        <option value="Finalizada" className="bg-[#202046] text-white">Finalizada</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">Descrição</label>
                    <textarea
                      rows="2" placeholder="Breve resumo da turma..."
                      value={turmaDescricao} onChange={e => setTurmaDescricao(e.target.value)}
                      className="w-full px-3 py-2 border-0 bg-[#2e2e5e] text-white placeholder-slate-400 rounded-xl text-sm outline-none resize-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>

                  <button type="submit" disabled={carregando} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white text-sm font-black uppercase transition-all duration-300 shadow-md shadow-teal-950/20 disabled:opacity-50 cursor-pointer">
                    {carregando ? 'Processando...' : '+ Criar Nova Turma'}
                  </button>
                </form>
              </div>
            </Card>

            {/* CARDS DE TURMAS */}
            <div className="space-y-4 col-span-full lg:col-span-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-extrabold text-slate-800 tracking-tight">
                  {filtroCursoTurmas ? `Turmas de ${escolas.find(e => e.id === filtroCursoTurmas)?.nome || 'Curso'}` : "Turmas Ativas"}
                </h3>
                {filtroCursoTurmas && (
                  <button
                    onClick={() => setFiltroCursoTurmas('')}
                    className="px-3 py-1.5 text-xs font-bold text-[#055F6D] hover:text-[#044c57] bg-[#055F6D]/5 hover:bg-[#055F6D]/10 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    ← Ver Todas
                  </button>
                )}
              </div>

              {/* Mobile filter clear indicator */}
              {filtroCursoTurmas && (
                <div className="md:hidden p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Filtrando: {escolas.find(e => e.id === filtroCursoTurmas)?.nome}</span>
                  <button
                    onClick={() => setFiltroCursoTurmas('')}
                    className="text-xs font-black text-[#055F6D] cursor-pointer"
                  >
                    Limpar
                  </button>
                </div>
              )}

              {(filtroCursoTurmas ? turmas.filter(t => t.escola_id === filtroCursoTurmas) : turmas).length === 0 ? (
                <div className="p-10 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-white italic">Nenhuma turma cadastrada para este filtro.</div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(filtroCursoTurmas ? turmas.filter(t => t.escola_id === filtroCursoTurmas) : turmas).map(t => {
                    const iconInfo = getIconForCourse(t.escolas?.nome || '');
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleAbrirTurma(t.id)}
                        className="flex flex-col items-center justify-between p-4 sm:p-6 rounded-2xl border border-slate-150 bg-white hover:bg-slate-50/50 hover:border-slate-350 hover:shadow-md hover:scale-[1.03] active:scale-97 transition-all duration-300 text-center w-full aspect-square group cursor-pointer relative"
                      >
                        {/* Edit Action (top-right absolute) */}
                        {podeEditar && (
                          <button
                            type="button"
                            onClick={e => { e.stopPropagation(); handleEditarTurma(t); }}
                            className="absolute top-2 right-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition p-1.5 md:p-2 rounded-lg cursor-pointer opacity-80 group-hover:opacity-100 z-10"
                            title="Editar Turma"
                          >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}

                        {/* Delete Action (bottom-right absolute) */}
                        {podeEditar && (
                          <button
                            type="button"
                            onClick={e => { e.stopPropagation(); handleExcluirTurma(t.id); }}
                            className="absolute bottom-2 right-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition p-1.5 md:p-2 rounded-lg cursor-pointer opacity-80 group-hover:opacity-100 z-10"
                            title="Remover Turma"
                          >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}

                        {/* Icon Container */}
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0 transition-colors mt-2 md:mt-4 ${iconInfo.bg}`}>
                          {iconInfo.icon}
                        </div>

                        {/* Title and Highlighted Status/Schedule */}
                        <div className="flex-1 flex flex-col justify-center my-2 md:my-3 w-full">
                          <h4 className="text-xs md:text-sm lg:text-base font-bold text-slate-800 line-clamp-2 leading-snug px-1 mb-1" title={t.nome}>
                            {t.nome}
                          </h4>
                          <p className="text-[10px] md:text-xs text-[#202046]/80 font-semibold truncate px-2 mb-1.5">
                            {t.escolas?.nome || 'Sem curso'}
                          </p>
                          <div className="flex flex-wrap items-center justify-center gap-1.5">
                            <span className="text-[9px] md:text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 uppercase tracking-wide">
                              {t.horario}
                            </span>
                            <span className={`text-[9px] md:text-xs font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wide ${t.status === 'Em andamento' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                              t.status === 'Finalizada' ? 'bg-slate-50 text-slate-500 border-slate-200' :
                                'bg-amber-50 text-amber-600 border-amber-100'
                              }`}>
                              {t.status}
                            </span>
                          </div>
                        </div>

                        {/* Hover action indicator */}
                        <span className="text-[9px] font-bold text-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider mb-1">
                          Gerenciar Turma →
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
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
        turmaSelecionadaId && turmaAtiva ? (
          <DetalhesDaTurma
            turma={turmaAtiva}
            abaAtiva={abaAtivaTurma || 'avaliacoes'}
            setAbaAtiva={setAbaAtivaTurma}
            onVoltar={() => setTurmaSelecionadaId(null)}
            alunos={alunosTurma}
            disciplinas={disciplinasTurma}
            aulas={aulasTurma}
            avaliacoes={avaliacoesTurma}
            avaliacoesItens={avaliacoesItensTurma}
            avaliacoesNotas={avaliacoesNotasTurma}
            onSalvarAvaliacoes={handleSalvarAvaliacoes}
            onCriarAvaliacaoItem={handleCriarAvaliacaoItem}
            onEditarAvaliacaoItem={handleEditarAvaliacaoItem}
            onExcluirAvaliacaoItem={handleExcluirAvaliacaoItem}
            pessoas={pessoas}
            onAddAlunos={() => { setSelectedMembrosParaAdicionar([]); setIsModalAddAlunosAberto(true); }}
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
              alunosTurma.forEach(a => {
                initialPresencas[a.aluno_id] = isAlunoAtivo(a);
              });
              setNovaAulaData(hoje);
              setNovaAulaPresencas(initialPresencas);
              setNovaAulaAssunto('');
              setNovaAulaDesc('');
              setNovaAulaDiscId('');
              setAulaParaEditar(null);
              setFiltroAlunosModalAula('todos');
              setIsModalAddAulaAberto(true);
            }}
            onEditAula={handleEditAula}
            onExcluirAula={handleExcluirAula}
            onVerAluno={handleVerCadernetaAluno}
            onUpdateStatusAluno={handleUpdateStatusAluno}
          />
        ) : turmaSelecionadaId ? (
          <div className="p-10 text-center animate-pulse text-slate-400">Buscando caderneta da turma...</div>
        ) : (
          <PainelCentralAvaliacoes
            turmas={turmas}
            escolas={escolas}
            filtroCursoTurmas={filtroCursoTurmas}
            setFiltroCursoTurmas={setFiltroCursoTurmas}
            onAbrirCadernetaTurma={(turmaId) => {
              setTurmaSelecionadaId(turmaId);
              setAbaAtivaTurma('avaliacoes');
            }}
          />
        )
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

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-150 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Chamada / Presença</h4>
                    <p className="text-[11px] text-slate-400">Controle de presença dos alunos ativos</p>
                  </div>
                  <div className="flex items-center gap-1.5 self-start sm:self-auto flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleMarcarTodos(true, true)}
                      className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[10px] font-bold transition cursor-pointer"
                      title="Marcar todos os alunos ativos como presentes"
                    >
                      ✓ Todos Presentes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMarcarTodos(false, false)}
                      className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[10px] font-bold transition cursor-pointer"
                      title="Marcar todos como ausentes"
                    >
                      ✕ Todos Ausentes
                    </button>
                  </div>
                </div>

                {/* Resumo / Indicadores - Apenas Alunos Ativos */}
                {(() => {
                  const alunosAtivosParaChamada = alunosTurma.filter(isAlunoAtivo);
                  const presentesCount = alunosAtivosParaChamada.filter(a => !!novaAulaPresencas[a.aluno_id]).length;
                  const ausentesCount = alunosAtivosParaChamada.length - presentesCount;

                  return (
                    <div className="grid grid-cols-3 gap-2 bg-white p-2.5 rounded-xl border border-slate-150 text-center">
                      <div>
                        <span className="block text-[8px] font-bold text-slate-400 uppercase">Alunos Ativos</span>
                        <span className="text-xs font-black text-slate-700">{alunosAtivosParaChamada.length}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-bold text-emerald-600 uppercase">Presentes</span>
                        <span className="text-xs font-black text-emerald-600">{presentesCount}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-bold text-amber-600 uppercase">Ausentes</span>
                        <span className="text-xs font-black text-amber-600">{ausentesCount}</span>
                      </div>
                    </div>
                  );
                })()}

                {/* Lista de alunos - Apenas Alunos Ativos */}
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {alunosTurma.filter(isAlunoAtivo).map(a => {
                    const presente = !!novaAulaPresencas[a.aluno_id];
                    return (
                      <div
                        key={a.aluno_id}
                        className="flex items-center justify-between p-2.5 rounded-xl border bg-white border-slate-150 transition select-none hover:bg-slate-50/50"
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <Avatar pessoa={a.alunos?.pessoas} tamanho="w-7 h-7" />
                          <div className="truncate">
                            <span className="text-xs font-bold text-slate-700 block truncate">
                              {a.alunos?.pessoas?.nome}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => togglePresencaAula(a.aluno_id)}
                          className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            presente ? 'bg-emerald-500' : 'bg-rose-400'
                          }`}
                          title={presente ? 'Presente (Clique para marcar Ausente)' : 'Ausente (Clique para marcar Presente)'}
                        >
                          <span
                            className={`pointer-events-none inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out text-[9px] font-black ${
                              presente ? 'translate-x-6 text-emerald-600' : 'translate-x-0 text-rose-500'
                            }`}
                          >
                            {presente ? 'P' : 'A'}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                  {alunosTurma.filter(isAlunoAtivo).length === 0 && (
                    <div className="p-6 text-center text-xs text-slate-400 italic">
                      Nenhum aluno ativo cadastrado nesta turma.
                    </div>
                  )}
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

function DetalhesDaTurma({
  turma,
  abaAtiva,
  setAbaAtiva,
  onVoltar,
  alunos = [],
  disciplinas = [],
  aulas = [],
  avaliacoes = [],
  avaliacoesItens = [],
  avaliacoesNotas = [],
  onSalvarAvaliacoes,
  onCriarAvaliacaoItem,
  onEditarAvaliacaoItem,
  onExcluirAvaliacaoItem,
  onAddAlunos,
  onAddDisciplina,
  onEditDisciplina,
  onAddAula,
  onEditAula,
  onExcluirAula,
  onVerAluno,
  onUpdateStatusAluno
}) {
  if (!turma) return null;

  // ── ESTADOS PARA A ABA DE FREQUÊNCIA ──
  const [mesFrequencia, setMesFrequencia] = useState(new Date().getMonth());
  const [anoFrequencia, setAnoFrequencia] = useState(new Date().getFullYear());
  const [esconderDiasSemRegistro, setEsconderDiasSemRegistro] = useState(true);
  const [relatorioFrequencia, setRelatorioFrequencia] = useState(null);

  // ── ESTADOS PARA A CADERNETA DE NOTAS / AVALIAÇÕES ──
  const [notasLocais, setNotasLocais] = useState({}); // { [`${target_id}_${aluno_id}`]: string }
  const [observacoesLocais, setObservacoesLocais] = useState({}); // { [`${target_id}_${aluno_id}`]: string }
  const [alteracoesPendentes, setAlteracoesPendentes] = useState(false);
  const [salvandoNotas, setSalvandoNotas] = useState(false);
  const [msgFeedback, setMsgFeedback] = useState(null); // { tipo: 'sucesso' | 'erro', texto: string }
  const [filtroBuscaCaderneta, setFiltroBuscaCaderneta] = useState('');
  const [filtroStatusCaderneta, setFiltroStatusCaderneta] = useState('ativos'); // 'todos' | 'ativos' | 'desistentes'

  // Modais da Caderneta
  const [isModalNovaAvaliacaoAberto, setIsModalNovaAvaliacaoAberto] = useState(false);
  const [moduloAlvoNovaAvaliacao, setModuloAlvoNovaAvaliacao] = useState('');
  const [isModalGerenciarAvaliacoesAberto, setIsModalGerenciarAvaliacoesAberto] = useState(false);
  const [isModalLoteAberto, setIsModalLoteAberto] = useState(false);
  const [modalObs, setModalObs] = useState({ aberto: false, alunoId: null, targetId: null, alunoNome: '', titulo: '', obs: '' });
  const [isModalImprimirAberto, setIsModalImprimirAberto] = useState(false);

  const mesesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  // Helper para obter itens de avaliação de um módulo/disciplina
  const getItemsDoModulo = (discId) => {
    return (avaliacoesItens || []).filter(it => it.turma_disciplina_id === discId);
  };

  // Sincroniza estado local da grade com as avaliações (itens e legado)
  useEffect(() => {
    const nMap = {};
    const oMap = {};

    // 1. Carrega notas dos itens de avaliação detalhados
    (avaliacoesNotas || []).forEach(av => {
      const key = `${av.avaliacao_item_id}_${av.aluno_id}`;
      nMap[key] = av.nota !== null && av.nota !== undefined ? String(av.nota) : '';
      oMap[key] = av.observacao || '';
    });

    // 2. Carrega notas consolidadas / legado (para disciplinas que não têm sub-itens)
    (avaliacoes || []).forEach(av => {
      const key = `${av.turma_disciplina_id}_${av.aluno_id}`;
      // Se não houver nota de item já definida nessa chave, preenche
      if (nMap[key] === undefined) {
        nMap[key] = av.nota !== null && av.nota !== undefined ? String(av.nota) : '';
        oMap[key] = av.observacao || '';
      }
    });

    setNotasLocais(nMap);
    setObservacoesLocais(oMap);
    setAlteracoesPendentes(false);
  }, [avaliacoes, avaliacoesNotas, avaliacoesItens]);

  // Alteração de nota inline na tabela
  const handleNotaChange = (targetId, alunoId, valor) => {
    const key = `${targetId}_${alunoId}`;
    setNotasLocais(prev => ({ ...prev, [key]: valor }));
    setAlteracoesPendentes(true);
  };

  // Cálculo da Média de um Módulo para um Aluno específico
  const calcularMediaModuloAluno = (discId, alunoId) => {
    const items = getItemsDoModulo(discId);

    if (items.length === 0) {
      // Módulo com avaliação direta única
      const val = notasLocais[`${discId}_${alunoId}`];
      if (val === undefined || val === null || val === '') return null;
      const num = parseFloat(String(val).replace(',', '.'));
      return isNaN(num) ? null : Math.round(num * 10) / 10;
    }

    // Módulo com múltiplas avaliações
    const notasValidas = [];
    items.forEach(it => {
      const val = notasLocais[`${it.id}_${alunoId}`];
      if (val !== undefined && val !== null && val !== '') {
        const num = parseFloat(String(val).replace(',', '.'));
        if (!isNaN(num)) {
          notasValidas.push({
            nota: num,
            peso: Number(it.peso) || 1.0
          });
        }
      }
    });

    if (notasValidas.length === 0) return null;
    const totalPesos = notasValidas.reduce((acc, curr) => acc + curr.peso, 0);
    const somaPonderada = notasValidas.reduce((acc, curr) => acc + (curr.nota * curr.peso), 0);
    if (totalPesos <= 0) return null;

    const media = somaPonderada / totalPesos;
    return Math.round(media * 10) / 10;
  };

  // Cálculo da Média Geral do Curso para o Aluno (Média dos Módulos)
  const calcularMediaAluno = (alunoId) => {
    const mediasModulos = [];
    disciplinas.forEach(d => {
      const mediaMod = calcularMediaModuloAluno(d.id, alunoId);
      if (mediaMod !== null) {
        mediasModulos.push(mediaMod);
      }
    });

    if (mediasModulos.length === 0) return null;
    const mediaGeral = mediasModulos.reduce((acc, curr) => acc + curr, 0) / mediasModulos.length;
    return Math.round(mediaGeral * 10) / 10;
  };

  // Cálculo de Frequência do Aluno
  const calcularFrequenciaAluno = (alunoId, alunoPessoaId, matriculaId) => {
    if (!aulas || aulas.length === 0) return 100;
    let totalAulas = 0;
    let presencas = 0;

    aulas.forEach(aula => {
      totalAulas += 1;
      let pObj = aula.presencas || {};
      if (typeof pObj === 'string') {
        try { pObj = JSON.parse(pObj); } catch (e) { pObj = {}; }
      }
      if (pObj[alunoId] === true || pObj[alunoPessoaId] === true || pObj[matriculaId] === true) {
        presencas += 1;
      }
    });

    if (totalAulas === 0) return 100;
    return Math.round((presencas / totalAulas) * 100);
  };

  // Média da turma em um item específico de avaliação
  const calcularMediaItemTurma = (itemId) => {
    const notas = [];
    alunos.filter(isAlunoAtivo).forEach(a => {
      const val = notasLocais[`${itemId}_${a.aluno_id}`];
      if (val !== undefined && val !== null && val !== '') {
        const num = parseFloat(String(val).replace(',', '.'));
        if (!isNaN(num)) notas.push(num);
      }
    });
    if (notas.length === 0) return null;
    return Math.round((notas.reduce((a, b) => a + b, 0) / notas.length) * 10) / 10;
  };

  // Média geral da turma em uma disciplina/módulo
  const calcularMediaDisciplinaTurma = (discId) => {
    const mediasAlunos = [];
    alunos.filter(isAlunoAtivo).forEach(a => {
      const mediaMod = calcularMediaModuloAluno(discId, a.aluno_id);
      if (mediaMod !== null) mediasAlunos.push(mediaMod);
    });
    if (mediasAlunos.length === 0) return null;
    return Math.round((mediasAlunos.reduce((a, b) => a + b, 0) / mediasAlunos.length) * 10) / 10;
  };

  // Resumo e Métricas Gerais da Caderneta
  const metricasCaderneta = useMemo(() => {
    const alunosAtivos = alunos.filter(isAlunoAtivo);
    const mediasAtivos = alunosAtivos.map(a => calcularMediaAluno(a.aluno_id)).filter(m => m !== null);
    const mediaGeral = mediasAtivos.length > 0 ? (mediasAtivos.reduce((a, b) => a + b, 0) / mediasAtivos.length) : null;
    const aprovados = mediasAtivos.filter(m => m >= 7.0).length;
    const atencao = mediasAtivos.filter(m => m < 7.0).length;

    // Total de notas possíveis considerando todos os itens de avaliação
    let totalNotasPossiveis = 0;
    let totalNotasPreenchidas = 0;

    disciplinas.forEach(d => {
      const items = (avaliacoesItens || []).filter(it => it.turma_disciplina_id === d.id);
      if (items.length > 0) {
        items.forEach(it => {
          totalNotasPossiveis += alunosAtivos.length;
          alunosAtivos.forEach(a => {
            const key = `${it.id}_${a.aluno_id}`;
            if (notasLocais[key] !== undefined && notasLocais[key] !== '') {
              totalNotasPreenchidas += 1;
            }
          });
        });
      } else {
        totalNotasPossiveis += alunosAtivos.length;
        alunosAtivos.forEach(a => {
          const key = `${d.id}_${a.aluno_id}`;
          if (notasLocais[key] !== undefined && notasLocais[key] !== '') {
            totalNotasPreenchidas += 1;
          }
        });
      }
    });

    return {
      mediaGeral: mediaGeral !== null ? Math.round(mediaGeral * 10) / 10 : null,
      aprovados,
      atencao,
      totalNotasPossiveis,
      totalNotasPreenchidas,
      pctPreenchimento: totalNotasPossiveis > 0 ? Math.round((totalNotasPreenchidas / totalNotasPossiveis) * 100) : 0
    };
  }, [alunos, disciplinas, avaliacoesItens, notasLocais]);

  // Alunos filtrados para a visualização da caderneta
  const alunosFiltradosCaderneta = useMemo(() => {
    return alunos.filter(a => {
      if (filtroStatusCaderneta === 'ativos' && !isAlunoAtivo(a)) return false;
      if (filtroStatusCaderneta === 'desistentes' && isAlunoAtivo(a)) return false;
      if (filtroBuscaCaderneta.trim()) {
        const termo = filtroBuscaCaderneta.toLowerCase().trim();
        const nome = (a.alunos?.pessoas?.nome || '').toLowerCase();
        const mat = (a.alunos?.matricula || '').toLowerCase();
        return nome.includes(termo) || mat.includes(termo);
      }
      return true;
    });
  }, [alunos, filtroStatusCaderneta, filtroBuscaCaderneta]);

  // Salva todas as notas e observações pendentes no Supabase
  const handleSalvarCaderneta = async () => {
    if (!onSalvarAvaliacoes) return;
    setSalvandoNotas(true);

    const registrosItens = [];
    const registrosGerais = [];

    disciplinas.forEach(d => {
      const items = getItemsDoModulo(d.id);

      alunos.forEach(a => {
        // Se houver sub-itens no módulo, reúne cada nota individual
        if (items.length > 0) {
          items.forEach(it => {
            const key = `${it.id}_${a.aluno_id}`;
            const valStr = (notasLocais[key] ?? '').replace(',', '.').trim();
            const obs = observacoesLocais[key] || '';
            if (valStr !== '' || obs !== '') {
              const nVal = valStr !== '' ? Math.min(10, Math.max(0, parseFloat(valStr))) : null;
              registrosItens.push({
                avaliacao_item_id: it.id,
                aluno_id: a.aluno_id,
                nota: isNaN(nVal) ? null : nVal,
                observacao: obs.trim() || null
              });
            }
          });
        }

        // Calcula a média consolidada do módulo para salvar em 'avaliacoes'
        const mediaMod = calcularMediaModuloAluno(d.id, a.aluno_id);
        const legacyKey = `${d.id}_${a.aluno_id}`;
        const obsGeral = observacoesLocais[legacyKey] || '';

        if (mediaMod !== null || obsGeral !== '') {
          registrosGerais.push({
            turma_disciplina_id: d.id,
            aluno_id: a.aluno_id,
            nota: mediaMod,
            observacao: obsGeral.trim() || null
          });
        }
      });
    });

    const res = await onSalvarAvaliacoes({ registrosGerais, registrosItens });
    setSalvandoNotas(false);
    if (res?.success) {
      setAlteracoesPendentes(false);
      setMsgFeedback({ tipo: 'sucesso', texto: 'Todas as notas e médias foram salvas com sucesso!' });
      setTimeout(() => setMsgFeedback(null), 3500);
    } else {
      setMsgFeedback({ tipo: 'erro', texto: 'Houve um erro ao salvar as avaliações.' });
      setTimeout(() => setMsgFeedback(null), 4000);
    }
  };

  const gerarRelatorioFrequencia = () => {
    const aulasFiltradas = aulas.filter(aula => {
      const data = new Date(aula.data_aula);
      const dataAjustada = new Date(data.getTime() + data.getTimezoneOffset() * 60000);
      return dataAjustada.getMonth() === Number(mesFrequencia) && dataAjustada.getFullYear() === Number(anoFrequencia);
    });

    const diasComAula = [...new Set(aulasFiltradas.map(aula => {
      const d = new Date(aula.data_aula);
      const da = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
      return da.getDate();
    }))].sort((a, b) => a - b);

    const dados = alunos.map(aluno => {
      const presencasPorDia = {};
      aulasFiltradas.forEach(aula => {
        const d = new Date(aula.data_aula);
        const da = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
        const dia = da.getDate();

        let pObj = aula.presencas || {};
        if (typeof pObj === 'string') { try { pObj = JSON.parse(pObj); } catch (e) { pObj = {}; } }

        const statusAnterior = presencasPorDia[dia];
        const statusAtual = pObj[aluno.aluno_id] ? 'P' : 'F';

        if (statusAnterior !== 'P') {
          presencasPorDia[dia] = statusAtual;
        }
      });

      return {
        nome: aluno.alunos?.pessoas?.nome,
        status: aluno.status,
        presencas: presencasPorDia
      };
    });

    setRelatorioFrequencia({ diasComAula, dados });
  };

  const [painelLateralOculto, setPainelLateralOculto] = useState(false);

  return (
    <div className="space-y-4">
      {/* BARRA SUPERIOR QUANDO EM MODO EXPANDIDO OU NA CADERNETA */}
      {(abaAtiva === 'avaliacoes' || painelLateralOculto) && (
        <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onVoltar}
              className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
              title="Voltar para a Lista de Turmas"
            >
              <span>← Turmas</span>
            </button>
            <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{turma.escolas?.nome || 'Escola'}</span>
            <span className="text-slate-300 font-bold">•</span>
            <span className="text-xs font-black text-slate-800">{turma.nome}</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 ml-1">
              {alunos.filter(isAlunoAtivo).length} Alunos
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPainelLateralOculto(!painelLateralOculto)}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
            >
              {painelLateralOculto ? "📋 Mostrar Detalhes da Turma" : "↔️ Visualização Expandida (100%)"}
            </button>
          </div>
        </div>
      )}

      <div className={`grid gap-4 sm:gap-6 items-start animate-in fade-in slide-in-from-bottom-4 duration-300 ${
        (abaAtiva === 'avaliacoes' || painelLateralOculto)
          ? 'grid-cols-1 w-full'
          : 'grid-cols-1 lg:grid-cols-[270px_1fr]'
      }`}>

        {/* PAINEL LATERAL DE INFORMAÇÕES */}
        {!(abaAtiva === 'avaliacoes' || painelLateralOculto) && (
          <Card className="hidden sm:block p-4 sm:p-5 border-t-4 border-t-[#202046] lg:sticky lg:top-24">
            <InfoTurma turma={turma} alunos={alunos} onVoltar={onVoltar} />
          </Card>
        )}

        <div className="space-y-4 sm:space-y-5 min-w-0 w-full">
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
            {
              id: 'avaliacoes',
              label: 'Caderneta de Notas',
              cor: '#7c3aed',
              badge: metricasCaderneta.totalNotasPreenchidas > 0 ? `${metricasCaderneta.totalNotasPreenchidas}` : null,
              icon: (
                <Award className="w-3.5 h-3.5" strokeWidth={1.8} />
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
                      className={`flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2 rounded-t-xl text-[11px] font-black whitespace-nowrap transition-all shrink-0 border-b-2 cursor-pointer ${tab.mobileOnly ? 'sm:hidden' : ''
                        } ${isAtivo
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

              {/* Ações Rápidas */}
              <div className="pb-2 sm:pb-0 px-1 sm:pr-2 shrink-0 flex items-center gap-2">
                {abaAtiva === 'alunos' && (
                  <button onClick={onAddAlunos} className="w-full sm:w-auto px-4 py-1.5 bg-[#202046] text-white rounded-xl text-[10px] font-black uppercase hover:opacity-90 transition cursor-pointer shadow-sm">+ Adicionar Alunos</button>
                )}
                {abaAtiva === 'disciplinas' && (
                  <button onClick={onAddDisciplina} className="w-full sm:w-auto px-4 py-1.5 bg-[#6366f1] text-white rounded-xl text-[10px] font-black uppercase hover:opacity-90 transition cursor-pointer shadow-sm">+ Incluir Disciplina</button>
                )}
                {abaAtiva === 'aulas' && (
                  <button onClick={onAddAula} className="w-full sm:w-auto px-4 py-1.5 bg-[#f59e0b] text-white rounded-xl text-[10px] font-black uppercase hover:opacity-90 transition cursor-pointer shadow-sm">📅 Lançar Aula / Presença</button>
                )}
                {abaAtiva === 'avaliacoes' && (
                  <div className="flex items-center gap-1.5 w-full sm:w-auto flex-wrap">
                    <button
                      onClick={() => {
                        setModuloAlvoNovaAvaliacao(disciplinas[0]?.id || '');
                        setIsModalNovaAvaliacaoAberto(true);
                      }}
                      disabled={disciplinas.length === 0}
                      className="px-3 py-1.5 bg-[#7c3aed] text-white rounded-xl text-[10px] font-black uppercase hover:bg-[#6d28d9] transition cursor-pointer shadow-sm flex items-center justify-center gap-1 disabled:opacity-50"
                      title="Adicionar uma nova avaliação/prova à turma"
                    >
                      <Sparkles size={13} />
                      <span>+ Nova Avaliação</span>
                    </button>
                  </div>
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
                        <td><div className="flex items-center gap-2"><Avatar pessoa={a.alunos?.pessoas} tamanho="w-8 h-8" /><span className="text-sm text-slate-700">{a.alunos?.pessoas?.nome}</span></div></td>
                        <td>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                            isAlunoAtivo(a)
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                              : isAlunoDesistente(a)
                              ? 'bg-rose-50 text-rose-600 border-rose-100'
                              : 'bg-slate-100 text-slate-500 border-slate-200'
                          }`}>
                            {a.status || 'ativo'}
                          </span>
                        </td>
                        <td className="font-mono text-xs text-slate-400 hidden sm:table-cell">{a.alunos?.matricula || '---'}</td>
                        <td className="text-right pr-2 sm:pr-6">
                          <div className="flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                            <button
                              onClick={() => onUpdateStatusAluno(a.id, isAlunoAtivo(a) ? 'desistente' : 'ativo')}
                              className={`transition p-1.5 rounded-lg cursor-pointer ${
                                isAlunoAtivo(a)
                                  ? 'text-slate-400 hover:text-rose-500 hover:bg-rose-50'
                                  : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-50'
                              }`}
                              title={isAlunoAtivo(a) ? 'Marcar como Desistente' : 'Reativar Aluno'}
                            >
                              {isAlunoAtivo(a) ? (
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
                    <th>Disciplina / Módulo</th>
                    <th>Professor</th>
                    <th>Avaliações Cadastradas</th>
                    <th className="text-right pr-2 sm:pr-6">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {disciplinas.length === 0 ? (
                    <tr><td colSpan="4" className="p-10 text-center text-slate-400 italic">Nenhuma disciplina vinculada.</td></tr>
                  ) : (
                    disciplinas.map(d => {
                      const items = getItemsDoModulo(d.id);
                      return (
                        <tr key={d.id}>
                          <td><span className="font-bold text-sm text-slate-700">{d.disciplinas?.nome}</span></td>
                          <td><span className="text-xs font-bold text-[#202046]">{d.professores?.pessoas?.nome || 'Sem professor'}</span></td>
                          <td>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {items.length === 0 ? (
                                <span className="text-[10px] text-slate-400 italic">1 avaliação padrão</span>
                              ) : (
                                items.map(it => (
                                  <span key={it.id} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-200">
                                    {it.nome} {it.peso && it.peso !== 1 ? `(p:${it.peso})` : ''}
                                  </span>
                                ))
                              )}
                            </div>
                          </td>
                          <td className="text-right pr-2 sm:pr-6">
                            <div className="flex justify-end items-center gap-1.5 sm:gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setModuloAlvoNovaAvaliacao(d.id);
                                  setIsModalNovaAvaliacaoAberto(true);
                                }}
                                className="text-violet-600 hover:text-violet-800 transition p-1.5 rounded-lg hover:bg-violet-50 text-xs font-bold flex items-center gap-1 cursor-pointer"
                                title="Adicionar Avaliação a esta Disciplina"
                              >
                                <span>+ Avaliação</span>
                              </button>
                              <button onClick={() => onEditDisciplina(d)} className="text-[#202046] hover:text-[#2F2F80] transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer" title="Editar Disciplina">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
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
                      let pObj = aula.presencas || {};
                      if (typeof pObj === 'string') { try { pObj = JSON.parse(pObj); } catch (e) { pObj = {}; } }
                      
                      const alunosAtivos = (alunos || []).filter(isAlunoAtivo);
                      const presentesCount = alunosAtivos.filter(a => {
                        return pObj && (pObj[a.aluno_id] === true || pObj[a.alunos?.pessoa_id] === true || pObj[a.id] === true);
                      }).length;
                      const totalAtivos = alunosAtivos.length;

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
                            <span className="text-[13px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 uppercase tracking-tighter" title={`${presentesCount} presentes de ${totalAtivos} alunos ativos`}>
                              {presentesCount} <span className="text-[10px] text-slate-400 font-bold">/ {totalAtivos}</span>
                            </span>
                          </td>
                          <td className="text-right pr-2 sm:pr-6">
                            <div className="flex items-center justify-end gap-2 sm:gap-4">
                              <button onClick={() => onEditAula(aula)} className="text-[#202046] hover:text-[#2F2F80] transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer" title="Editar Aula">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              </button>
                              <button onClick={() => onExcluirAula(aula.id)} className="text-rose-500 hover:text-rose-700 transition p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer" title="Remover Aula">
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
                        {(esconderDiasSemRegistro ? relatorioFrequencia.diasComAula : Array.from({ length: 31 }, (_, i) => i + 1)).map(dia => (
                          <th key={dia} className="text-center w-7 sm:w-8 min-w-[28px] sm:min-w-[32px] px-0.5 sm:px-1">{dia}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {relatorioFrequencia.dados.map((row, idx) => (
                        <tr key={idx}>
                          <td className="sticky left-0 bg-white z-10 font-medium text-slate-700 text-xs border-r min-w-[120px] sm:min-w-[160px] truncate">
                            <div className="flex items-center justify-between gap-1.5 pr-1">
                              <span className="truncate">{row.nome}</span>
                              {row.status === 'desistente' && (
                                <span className="text-[8px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-1 py-0.2 rounded shrink-0">
                                  Desistente
                                </span>
                              )}
                            </div>
                          </td>
                          {(esconderDiasSemRegistro ? relatorioFrequencia.diasComAula : Array.from({ length: 31 }, (_, i) => i + 1)).map(dia => {
                            const status = row.presencas[dia];
                            return (
                              <td key={dia} className="text-center p-0">
                                <span className={`inline-block w-full py-2 text-[10px] font-semibold ${status === 'P' ? 'text-emerald-600 bg-emerald-50/50' :
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

        {/* ── ABA: CADERNETA DE NOTAS & RESULTADOS DAS AVALIAÇÕES ── */}
        {abaAtiva === 'avaliacoes' && (
          <div className="space-y-3.5 animate-in fade-in duration-200 w-full min-w-0">
            {/* TOPO: INDICADORES E RESUMO DA CADERNETA */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shrink-0">
                  <Award size={18} />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block truncate">Média Geral</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base sm:text-lg font-black text-slate-800">
                      {metricasCaderneta.mediaGeral !== null ? metricasCaderneta.mediaGeral : '---'}
                    </span>
                    {metricasCaderneta.mediaGeral !== null && (
                      <span className={`text-[8px] font-bold px-1 rounded ${
                        metricasCaderneta.mediaGeral >= 7 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {metricasCaderneta.mediaGeral >= 7 ? 'Bom' : 'Atenção'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block truncate">Aprovados (≥ 7.0)</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base sm:text-lg font-black text-emerald-600">
                      {metricasCaderneta.aprovados}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold">alunos</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <AlertCircle size={18} />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block truncate">Abaixo da Média</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base sm:text-lg font-black text-amber-600">
                      {metricasCaderneta.atencao}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold">alunos</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <FileSpreadsheet size={18} />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block truncate">Lançamentos</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base sm:text-lg font-black text-slate-800">
                      {metricasCaderneta.totalNotasPreenchidas}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold">/ {metricasCaderneta.totalNotasPossiveis}</span>
                    <span className="text-[9px] font-bold text-blue-600 ml-0.5">({metricasCaderneta.pctPreenchimento}%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FEEDBACK DE NOTIFICAÇÃO */}
            {msgFeedback && (
              <div className={`p-2.5 rounded-xl flex items-center justify-between gap-3 text-xs font-bold animate-in fade-in duration-200 ${
                msgFeedback.tipo === 'sucesso' ? 'bg-emerald-500 text-white shadow-2xs' : 'bg-rose-500 text-white shadow-2xs'
              }`}>
                <div className="flex items-center gap-2">
                  <span>{msgFeedback.tipo === 'sucesso' ? '✓' : '⚠️'}</span>
                  <span>{msgFeedback.texto}</span>
                </div>
                <button onClick={() => setMsgFeedback(null)} className="opacity-80 hover:opacity-100 text-sm cursor-pointer">✕</button>
              </div>
            )}

            {/* BARRA DE FERRAMENTAS E CONTROLES DA CADERNETA */}
            <div className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2">
              {/* Filtros e Busca */}
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                <div className="relative flex-1 min-w-[150px]">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar aluno..."
                    value={filtroBuscaCaderneta}
                    onChange={e => setFiltroBuscaCaderneta(e.target.value)}
                    className="w-full pl-8 pr-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-violet-400 focus:bg-white"
                  />
                  {filtroBuscaCaderneta && (
                    <button onClick={() => setFiltroBuscaCaderneta('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs">✕</button>
                  )}
                </div>

                <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
                  {[
                    { id: 'ativos', label: 'Ativos' },
                    { id: 'todos', label: 'Todos' },
                    { id: 'desistentes', label: 'Desistentes' }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFiltroStatusCaderneta(f.id)}
                      className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md transition cursor-pointer ${
                        filtroStatusCaderneta === f.id
                          ? 'bg-white text-[#202046] shadow-2xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botões de Ação na Caderneta */}
              <div className="flex items-center gap-1.5 self-end md:self-auto flex-wrap">
                {/* Botão para Nova Avaliação */}
                <button
                  type="button"
                  onClick={() => {
                    setModuloAlvoNovaAvaliacao(disciplinas[0]?.id || '');
                    setIsModalNovaAvaliacaoAberto(true);
                  }}
                  disabled={disciplinas.length === 0}
                  className="px-2.5 py-1 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-50 shadow-2xs"
                  title="Criar nova prova, trabalho ou avaliação para um módulo"
                >
                  <Sparkles size={13} />
                  <span>+ Nova Avaliação</span>
                </button>

                {/* Botão para Gerenciar / Organizar Avaliações */}
                <button
                  type="button"
                  onClick={() => setIsModalGerenciarAvaliacoesAberto(true)}
                  disabled={disciplinas.length === 0}
                  className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  title="Gerenciar, editar pesos ou excluir avaliações da turma"
                >
                  <BookOpen size={13} className="text-slate-500" />
                  <span className="hidden sm:inline">Gerenciar</span>
                </button>

                {/* Botão de Lançamento em Lote */}
                <button
                  type="button"
                  onClick={() => setIsModalLoteAberto(true)}
                  disabled={disciplinas.length === 0}
                  className="px-2.5 py-1 bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  title="Lançamento Rápido em Lote por Módulo/Avaliação"
                >
                  <span>⚡ Lançar Notas</span>
                </button>

                {/* Imprimir Boletim */}
                <button
                  type="button"
                  onClick={() => setIsModalImprimirAberto(true)}
                  className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  title="Visualizar e Imprimir Boletim Geral da Turma"
                >
                  <Printer size={13} className="text-slate-500" />
                  <span className="hidden sm:inline">Imprimir</span>
                </button>

                {/* Salvar Notas */}
                <button
                  type="button"
                  onClick={handleSalvarCaderneta}
                  disabled={salvandoNotas || !alteracoesPendentes}
                  className={`px-3 py-1 rounded-lg text-xs font-black uppercase transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    alteracoesPendentes
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white animate-pulse'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Save size={13} />
                  <span>{salvandoNotas ? 'Salvando...' : alteracoesPendentes ? 'Salvar' : 'Salvo'}</span>
                </button>
              </div>
            </div>

            {/* SE NÃO HOUVER DISCIPLINAS CADASTRADAS */}
            {disciplinas.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white space-y-2">
                <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <BookOpen size={20} />
                </div>
                <h4 className="text-sm font-bold text-slate-800">Nenhuma disciplina/módulo vinculado a esta turma</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Adicione os módulos da turma para registrar e organizar as avaliações na caderneta.
                </p>
                <div className="pt-1">
                  <button
                    onClick={onAddDisciplina}
                    className="px-4 py-1.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    + Incluir Módulo / Disciplina
                  </button>
                </div>
              </div>
            ) : (
              /* TABELA / MATRIZ DE NOTAS COM SUPORTE A MÚLTIPLAS AVALIAÇÕES POR MÓDULO */
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs w-full">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      {/* LINHA 1 DO CABEÇALHO: MÓDULOS AGRUPADOS */}
                      <tr className="bg-slate-50/95 border-b border-slate-200 text-slate-500 font-black uppercase text-[10px]">
                        {/* Coluna Aluno */}
                        <th rowSpan={2} className="sticky left-0 bg-slate-50 z-20 w-[170px] sm:w-[200px] min-w-[140px] max-w-[200px] p-2 border-r border-slate-150 align-middle">
                          Aluno ({alunosFiltradosCaderneta.length})
                        </th>

                        {/* Agrupamento por Módulo / Disciplina */}
                        {disciplinas.map(disc => {
                          const items = getItemsDoModulo(disc.id);
                          const colSpan = items.length > 0 ? items.length + (items.length > 1 ? 1 : 0) : 1;
                          const mediaTurmaMod = calcularMediaDisciplinaTurma(disc.id);

                          return (
                            <th
                              key={disc.id}
                              colSpan={colSpan}
                              className="text-center p-1.5 border-r border-slate-200 bg-slate-50/80"
                            >
                              <div className="flex items-center justify-between gap-1 px-1">
                                <div className="text-left truncate min-w-0 flex-1">
                                  <span className="font-extrabold text-slate-800 text-[11px] block truncate" title={disc.disciplinas?.nome}>
                                    {disc.disciplinas?.nome}
                                  </span>
                                  {disc.professores?.pessoas?.nome && (
                                    <span className="text-[8px] font-semibold text-slate-400 block truncate">
                                      Prof: {disc.professores.pessoas.nome.split(' ')[0]}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  {mediaTurmaMod !== null && (
                                    <span className="text-[8px] font-black px-1 py-0.2 rounded bg-violet-100 text-violet-800" title={`Média da Turma no Módulo: ${mediaTurmaMod}`}>
                                      Méd: {mediaTurmaMod}
                                    </span>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setModuloAlvoNovaAvaliacao(disc.id);
                                      setIsModalNovaAvaliacaoAberto(true);
                                    }}
                                    className="w-4 h-4 rounded-full bg-violet-100 hover:bg-violet-200 text-violet-700 flex items-center justify-center text-[10px] font-black transition cursor-pointer"
                                    title={`Adicionar nova avaliação para ${disc.disciplinas?.nome}`}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </th>
                          );
                        })}

                        <th rowSpan={2} className="text-center w-14 min-w-[50px] p-1.5 bg-slate-100/80 text-slate-800 font-black border-r border-slate-150 align-middle">
                          Média Final
                        </th>
                        <th rowSpan={2} className="text-center w-12 min-w-[45px] p-1.5 text-slate-700 font-black border-r border-slate-100 align-middle">
                          Freq
                        </th>
                        <th rowSpan={2} className="text-center w-20 min-w-[65px] p-1.5 align-middle">
                          Status
                        </th>
                        <th rowSpan={2} className="text-center w-8 min-w-[32px] p-1 pr-2 align-middle">
                          <FileSpreadsheet size={13} className="mx-auto text-slate-400" />
                        </th>
                      </tr>

                      {/* LINHA 2 DO CABEÇALHO: SUBCATEGORIAS DE CADA AVALIAÇÃO */}
                      <tr className="bg-slate-100/70 border-b border-slate-200 text-[9px] font-extrabold text-slate-600">
                        {disciplinas.map(disc => {
                          const items = getItemsDoModulo(disc.id);

                          if (items.length === 0) {
                            return (
                              <th key={`single_${disc.id}`} className="text-center py-1 px-1 border-r border-slate-150 w-20 min-w-[68px] max-w-[95px]">
                                <span className="text-[9px] text-slate-500 font-bold">Nota Única</span>
                              </th>
                            );
                          }

                          return (
                            <React.Fragment key={`sub_${disc.id}`}>
                              {items.map((it, idx) => {
                                const mediaItem = calcularMediaItemTurma(it.id);
                                return (
                                  <th
                                    key={it.id}
                                    className="text-center py-1 px-1 border-r border-slate-150 min-w-[55px] max-w-[85px] group/itemhead relative"
                                  >
                                    <div className="flex flex-col items-center">
                                      <span className="font-bold text-slate-700 truncate max-w-[75px]" title={`${it.nome} ${it.peso && it.peso !== 1 ? `(Peso ${it.peso})` : ''}`}>
                                        {it.nome}
                                      </span>
                                      {it.peso && it.peso !== 1 && (
                                        <span className="text-[7px] text-violet-600 font-bold leading-none">
                                          p:{it.peso}
                                        </span>
                                      )}
                                      {mediaItem !== null && (
                                        <span className="text-[7px] text-slate-400 font-bold leading-none mt-0.5">
                                          x̄:{mediaItem}
                                        </span>
                                      )}
                                    </div>
                                  </th>
                                );
                              })}
                              {items.length > 1 && (
                                <th className="text-center py-1 px-1 border-r border-slate-200 bg-violet-50/60 text-violet-900 font-black min-w-[48px] max-w-[60px]">
                                  Méd. Mód
                                </th>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {alunosFiltradosCaderneta.length === 0 ? (
                        <tr>
                          <td colSpan={50} className="p-8 text-center text-slate-400 italic">
                            Nenhum aluno encontrado para os filtros selecionados.
                          </td>
                        </tr>
                      ) : (
                        alunosFiltradosCaderneta.map(a => {
                          const mediaGeralAluno = calcularMediaAluno(a.aluno_id);
                          const freq = calcularFrequenciaAluno(a.aluno_id, a.alunos?.pessoa_id, a.id);
                          const desistente = isAlunoDesistente(a);

                          return (
                            <tr key={a.id} className="hover:bg-slate-50/80 transition">
                              {/* Célula do Aluno */}
                              <td className="sticky left-0 bg-white z-10 border-r border-slate-150 w-[170px] sm:w-[200px] min-w-[140px] max-w-[200px] p-1.5 sm:p-2">
                                <div className="flex items-center gap-1.5">
                                  <Avatar pessoa={a.alunos?.pessoas} tamanho="w-6 h-6 shrink-0" />
                                  <div className="min-w-0 pr-0.5 truncate">
                                    <span
                                      onClick={() => onVerAluno(a.alunos?.pessoa_id)}
                                      className="font-bold text-xs text-slate-800 hover:text-indigo-600 cursor-pointer block truncate"
                                      title={a.alunos?.pessoas?.nome}
                                    >
                                      {a.alunos?.pessoas?.nome}
                                    </span>
                                    <div className="flex items-center gap-1 leading-none mt-0.5">
                                      {desistente ? (
                                        <span className="text-[7px] font-black text-rose-600 bg-rose-50 border border-rose-200 px-1 py-0.2 rounded shrink-0">
                                          Desistente
                                        </span>
                                      ) : a.alunos?.matricula ? (
                                        <span className="font-mono text-[8px] text-slate-400 truncate">{a.alunos?.matricula}</span>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Células de Notas de cada Módulo e suas Avaliações */}
                              {disciplinas.map(disc => {
                                const items = getItemsDoModulo(disc.id);
                                const mediaMod = calcularMediaModuloAluno(disc.id, a.aluno_id);

                                // Se não houver itens cadastrados no módulo, exibe a entrada única
                                if (items.length === 0) {
                                  const key = `${disc.id}_${a.aluno_id}`;
                                  const notaRaw = notasLocais[key] ?? '';
                                  const obs = observacoesLocais[key] || '';
                                  const notaNum = notaRaw !== '' ? parseFloat(String(notaRaw).replace(',', '.')) : null;

                                  let estiloNota = 'bg-white border-slate-200 text-slate-700 focus:border-violet-500';
                                  if (notaNum !== null && !isNaN(notaNum)) {
                                    if (notaNum >= 7.0) estiloNota = 'bg-emerald-50 border-emerald-300 text-emerald-800 font-extrabold focus:border-emerald-500';
                                    else if (notaNum >= 5.0) estiloNota = 'bg-amber-50 border-amber-300 text-amber-800 font-extrabold focus:border-amber-500';
                                    else estiloNota = 'bg-rose-50 border-rose-300 text-rose-800 font-extrabold focus:border-rose-500';
                                  }

                                  return (
                                    <td key={disc.id} className="text-center p-1 border-r border-slate-100">
                                      <div className="relative inline-flex items-center justify-center">
                                        <input
                                          type="text"
                                          inputMode="decimal"
                                          placeholder="-"
                                          value={notaRaw}
                                          onChange={e => handleNotaChange(disc.id, a.aluno_id, e.target.value)}
                                          onBlur={() => {
                                            if (notaRaw !== '') {
                                              const num = parseFloat(String(notaRaw).replace(',', '.'));
                                              if (!isNaN(num)) {
                                                const clamped = Math.min(10, Math.max(0, num));
                                                handleNotaChange(disc.id, a.aluno_id, String(clamped));
                                              }
                                            }
                                          }}
                                          className={`w-11 sm:w-12 h-7 sm:h-7.5 text-center text-xs font-bold rounded-md border outline-none transition-all shadow-2xs ${estiloNota}`}
                                          title={`Nota em ${disc.disciplinas?.nome} para ${a.alunos?.pessoas?.nome}`}
                                        />

                                        {/* Botão de Observação */}
                                        <button
                                          type="button"
                                          onClick={() => setModalObs({
                                            aberto: true,
                                            alunoId: a.aluno_id,
                                            targetId: disc.id,
                                            alunoNome: a.alunos?.pessoas?.nome || 'Aluno',
                                            titulo: disc.disciplinas?.nome || 'Disciplina',
                                            obs: obs
                                          })}
                                          className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] transition cursor-pointer ${
                                            obs ? 'bg-violet-600 text-white shadow-2xs' : 'opacity-0 group-hover:opacity-100 hover:bg-slate-200 text-slate-400'
                                          }`}
                                          title={obs ? `Observação: "${obs}"` : 'Adicionar observação'}
                                        >
                                          <MessageSquare size={7} />
                                        </button>
                                      </div>
                                    </td>
                                  );
                                }

                                // Se houver múltiplos itens de avaliação no módulo
                                return (
                                  <React.Fragment key={disc.id}>
                                    {items.map(it => {
                                      const key = `${it.id}_${a.aluno_id}`;
                                      const notaRaw = notasLocais[key] ?? '';
                                      const obs = observacoesLocais[key] || '';
                                      const notaNum = notaRaw !== '' ? parseFloat(String(notaRaw).replace(',', '.')) : null;

                                      let estiloNota = 'bg-white border-slate-200 text-slate-700 focus:border-violet-500';
                                      if (notaNum !== null && !isNaN(notaNum)) {
                                        if (notaNum >= 7.0) estiloNota = 'bg-emerald-50 border-emerald-300 text-emerald-800 font-extrabold focus:border-emerald-500';
                                        else if (notaNum >= 5.0) estiloNota = 'bg-amber-50 border-amber-300 text-amber-800 font-extrabold focus:border-amber-500';
                                        else estiloNota = 'bg-rose-50 border-rose-300 text-rose-800 font-extrabold focus:border-rose-500';
                                      }

                                      return (
                                        <td key={it.id} className="text-center p-1 border-r border-slate-100">
                                          <div className="relative inline-flex items-center justify-center">
                                            <input
                                              type="text"
                                              inputMode="decimal"
                                              placeholder="-"
                                              value={notaRaw}
                                              onChange={e => handleNotaChange(it.id, a.aluno_id, e.target.value)}
                                              onBlur={() => {
                                                if (notaRaw !== '') {
                                                  const num = parseFloat(String(notaRaw).replace(',', '.'));
                                                  if (!isNaN(num)) {
                                                    const clamped = Math.min(10, Math.max(0, num));
                                                    handleNotaChange(it.id, a.aluno_id, String(clamped));
                                                  }
                                                }
                                              }}
                                              className={`w-11 sm:w-12 h-7 sm:h-7.5 text-center text-xs font-bold rounded-md border outline-none transition-all shadow-2xs ${estiloNota}`}
                                              title={`${it.nome} (${disc.disciplinas?.nome}) para ${a.alunos?.pessoas?.nome}`}
                                            />

                                            <button
                                              type="button"
                                              onClick={() => setModalObs({
                                                aberto: true,
                                                alunoId: a.aluno_id,
                                                targetId: it.id,
                                                alunoNome: a.alunos?.pessoas?.nome || 'Aluno',
                                                titulo: `${disc.disciplinas?.nome} - ${it.nome}`,
                                                obs: obs
                                              })}
                                              className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] transition cursor-pointer ${
                                                obs ? 'bg-violet-600 text-white shadow-2xs' : 'opacity-0 group-hover:opacity-100 hover:bg-slate-200 text-slate-400'
                                              }`}
                                              title={obs ? `Observação: "${obs}"` : 'Adicionar observação'}
                                            >
                                              <MessageSquare size={7} />
                                            </button>
                                          </div>
                                        </td>
                                      );
                                    })}

                                    {/* Média do Módulo */}
                                    {items.length > 1 && (
                                      <td className="text-center bg-violet-50/30 p-1 border-r border-slate-200 font-bold">
                                        {mediaMod !== null ? (
                                          <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-black ${
                                            mediaMod >= 7.0 ? 'bg-emerald-100/90 text-emerald-800' :
                                            mediaMod >= 5.0 ? 'bg-amber-100/90 text-amber-800' :
                                            'bg-rose-100/90 text-rose-800'
                                          }`}>
                                            {mediaMod.toFixed(1)}
                                          </span>
                                        ) : (
                                          <span className="text-[10px] text-slate-300 font-bold">---</span>
                                        )}
                                      </td>
                                    )}
                                  </React.Fragment>
                                );
                              })}

                              {/* Média Geral Final */}
                              <td className="text-center bg-slate-50/70 p-1 border-r border-slate-150">
                                {mediaGeralAluno !== null ? (
                                  <span className={`inline-block px-1.5 py-0.5 rounded-md text-[11px] font-black ${
                                    mediaGeralAluno >= 7.0 ? 'bg-emerald-100 text-emerald-800 shadow-2xs' :
                                    mediaGeralAluno >= 5.0 ? 'bg-amber-100 text-amber-800 shadow-2xs' :
                                    'bg-rose-100 text-rose-800 shadow-2xs'
                                  }`}>
                                    {mediaGeralAluno.toFixed(1)}
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-300 font-bold">---</span>
                                )}
                              </td>

                              {/* Frequência */}
                              <td className="text-center p-1 border-r border-slate-100">
                                <span className={`text-[11px] font-black ${
                                  freq >= 75 ? 'text-emerald-600' : 'text-rose-600'
                                }`}>
                                  {freq}%
                                </span>
                              </td>

                              {/* Situação */}
                              <td className="text-center p-1">
                                {desistente ? (
                                  <span className="px-1.5 py-0.2 text-[8px] font-bold rounded bg-rose-50 text-rose-600 border border-rose-200">
                                    Desistente
                                  </span>
                                ) : mediaGeralAluno === null ? (
                                  <span className="px-1.5 py-0.2 text-[8px] font-bold rounded bg-slate-100 text-slate-400">
                                    Pendente
                                  </span>
                                ) : mediaGeralAluno >= 7.0 ? (
                                  <span className="px-1.5 py-0.2 text-[8px] font-black rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    ✓ Aprovado
                                  </span>
                                ) : mediaGeralAluno >= 5.0 ? (
                                  <span className="px-1.5 py-0.2 text-[8px] font-black rounded bg-amber-50 text-amber-700 border border-amber-200">
                                    Atenção
                                  </span>
                                ) : (
                                  <span className="px-1.5 py-0.2 text-[8px] font-black rounded bg-rose-50 text-rose-700 border border-rose-200">
                                    Reprovado
                                  </span>
                                )}
                              </td>

                              {/* Ação: Ver Ficha Individual */}
                              <td className="text-center p-1 pr-2">
                                <button
                                  type="button"
                                  onClick={() => onVerAluno(a.alunos?.pessoa_id)}
                                  className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition cursor-pointer"
                                  title="Abrir Ficha Individual do Aluno"
                                >
                                  <FileSpreadsheet size={14} />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Rodapé da tabela com orientações rápidas */}
                <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] text-slate-500">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ≥ 7.0 (Aprovado)</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> 5.0 - 6.9 (Atenção)</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> &lt; 5.0 (Reprovado)</span>
                  </div>
                  <span className="font-bold text-slate-400">
                    * Cada avaliação calcula a média do seu módulo ponderada pelo peso e gera a média geral da turma.
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
      </div>

      {/* ── MODAL DE NOVA AVALIAÇÃO ── */}
      {isModalNovaAvaliacaoAberto && (
        <ModalNovaAvaliacao
          turma={turma}
          disciplinas={disciplinas}
          avaliacoesItens={avaliacoesItens}
          moduloInicialId={moduloAlvoNovaAvaliacao}
          onCriar={async (dados) => {
            const res = await onCriarAvaliacaoItem(dados);
            if (res?.success) {
              setIsModalNovaAvaliacaoAberto(false);
              setMsgFeedback({ tipo: 'sucesso', texto: `Avaliação "${dados.nome}" criada com sucesso!` });
              setTimeout(() => setMsgFeedback(null), 3500);
            }
          }}
          onFechar={() => setIsModalNovaAvaliacaoAberto(false)}
        />
      )}

      {/* ── MODAL DE GERENCIAR AVALIAÇÕES ── */}
      {isModalGerenciarAvaliacoesAberto && (
        <ModalGerenciarAvaliacoes
          turma={turma}
          disciplinas={disciplinas}
          avaliacoesItens={avaliacoesItens}
          onSalvarItem={onEditarAvaliacaoItem}
          onExcluirItem={onExcluirAvaliacaoItem}
          onAdicionarItem={(discId) => {
            setModuloAlvoNovaAvaliacao(discId);
            setIsModalNovaAvaliacaoAberto(true);
          }}
          onFechar={() => setIsModalGerenciarAvaliacoesAberto(false)}
        />
      )}

      {/* ── MODAL DE LANÇAMENTO EM LOTE POR DISCIPLINA / AVALIAÇÃO ── */}
      {isModalLoteAberto && (
        <ModalLancarNotasDisciplina
          turma={turma}
          disciplinas={disciplinas}
          avaliacoesItens={avaliacoesItens}
          alunos={alunos.filter(isAlunoAtivo)}
          notasLocais={notasLocais}
          observacoesLocais={observacoesLocais}
          onSalvar={async (targetId, notasAtualizadas) => {
            const newNotasLocais = { ...notasLocais };
            const newObsLocais = { ...observacoesLocais };

            Object.entries(notasAtualizadas).forEach(([alunoId, data]) => {
              const key = `${targetId}_${alunoId}`;
              newNotasLocais[key] = data.nota;
              newObsLocais[key] = data.obs;
            });

            setNotasLocais(newNotasLocais);
            setObservacoesLocais(newObsLocais);
            setAlteracoesPendentes(true);
            setIsModalLoteAberto(false);
            setMsgFeedback({ tipo: 'sucesso', texto: 'Notas lançadas! Clique em "Salvar" para confirmar no banco.' });
            setTimeout(() => setMsgFeedback(null), 3500);
          }}
          onFechar={() => setIsModalLoteAberto(false)}
        />
      )}

      {/* ── MODAL DE EDITAR OBSERVAÇÃO DA NOTA ── */}
      {modalObs.aberto && (
        <ModalWrapper
          titulo={`Observação: ${modalObs.titulo}`}
          onFechar={() => setModalObs({ ...modalObs, aberto: false })}
        >
          <div className="p-5 space-y-4">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Aluno</span>
              <span className="text-sm font-black text-slate-800">{modalObs.alunoNome}</span>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Anotações sobre a Avaliação
              </label>
              <textarea
                rows="4"
                placeholder="Ex: Entregou trabalho complementar; Prova de 2ª chamada realizada em data tal..."
                value={modalObs.obs}
                onChange={e => setModalObs({ ...modalObs, obs: e.target.value })}
                className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-400 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalObs({ ...modalObs, aberto: false })}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  const key = `${modalObs.targetId}_${modalObs.alunoId}`;
                  setObservacoesLocais(prev => ({ ...prev, [key]: modalObs.obs }));
                  setAlteracoesPendentes(true);
                  setModalObs({ ...modalObs, aberto: false });
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#7c3aed] text-white text-xs font-bold shadow-md shadow-violet-900/10 cursor-pointer"
              >
                Salvar Observação
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* ── MODAL DE IMPRESSÃO / BOLETIM GERAL DA TURMA ── */}
      {isModalImprimirAberto && (
        <ModalImprimirCaderneta
          turma={turma}
          disciplinas={disciplinas}
          avaliacoesItens={avaliacoesItens}
          alunos={alunos.filter(isAlunoAtivo)}
          notasLocais={notasLocais}
          calcularMediaModuloAluno={calcularMediaModuloAluno}
          calcularMediaAluno={calcularMediaAluno}
          calcularFrequenciaAluno={calcularFrequenciaAluno}
          onFechar={() => setIsModalImprimirAberto(false)}
        />
      )}
    </div>
  );
}

/* MODAL DE CRIAÇÃO DE NOVA AVALIAÇÃO */
function ModalNovaAvaliacao({ turma, disciplinas = [], avaliacoesItens = [], moduloInicialId, onCriar, onFechar }) {
  const [discId, setDiscId] = useState(moduloInicialId || disciplinas[0]?.id || '');
  const [nome, setNome] = useState('');
  const [peso, setPeso] = useState('1.0');
  const [dataAvaliacao, setDataAvaliacao] = useState('');
  const [salvando, setSalvando] = useState(false);

  // Sugestões rápidas de nomes
  const discSelecionada = disciplinas.find(d => d.id === discId);
  const itemsJaExistentes = (avaliacoesItens || []).filter(it => it.turma_disciplina_id === discId);
  const proximoNumero = itemsJaExistentes.length + 1;

  const sugestoes = [
    `Avaliação ${proximoNumero}`,
    `Prova ${proximoNumero}`,
    `Trabalho ${proximoNumero}`,
    'Seminário',
    'Simulado Final'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!discId) return alert('Selecione o módulo/disciplina.');
    if (!nome.trim()) return alert('Informe o nome da avaliação.');

    setSalvando(true);
    await onCriar({
      turma_disciplina_id: discId,
      nome: nome.trim(),
      peso: parseFloat(String(peso).replace(',', '.')) || 1.0,
      ordem: proximoNumero,
      data_avaliacao: dataAvaliacao || null
    });
    setSalvando(false);
  };

  return (
    <ModalWrapper titulo="Nova Avaliação / Prova" onFechar={onFechar}>
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Módulo / Disciplina
          </label>
          <select
            value={discId}
            onChange={e => setDiscId(e.target.value)}
            className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-violet-400"
          >
            {disciplinas.map(d => {
              const count = (avaliacoesItens || []).filter(it => it.turma_disciplina_id === d.id).length;
              return (
                <option key={d.id} value={d.id}>
                  {d.disciplinas?.nome} ({count} {count === 1 ? 'avaliação' : 'avaliações'})
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Nome da Avaliação
            </label>
            <span className="text-[10px] text-slate-400">Sugestões rápidas:</span>
          </div>

          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            {sugestoes.map((sug, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setNome(sug)}
                className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-100 hover:bg-violet-100 hover:text-violet-700 text-slate-600 transition cursor-pointer"
              >
                + {sug}
              </button>
            ))}
          </div>

          <input
            type="text"
            required
            placeholder="Ex: Avaliação 1, Prova Teórica, Trabalho em Grupo..."
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Peso na Média (Padrão 1.0)
            </label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="1.0"
              value={peso}
              onChange={e => setPeso(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Data Prevista (Opcional)
            </label>
            <input
              type="date"
              value={dataAvaliacao}
              onChange={e => setDataAvaliacao(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>
        </div>

        <div className="p-3 bg-violet-50 rounded-xl border border-violet-100 text-[11px] text-violet-800 flex items-start gap-2">
          <span className="text-base leading-none">💡</span>
          <span>
            Ao adicionar esta avaliação, a caderneta exibirá uma nova coluna sob o módulo <strong>{discSelecionada?.disciplinas?.nome}</strong> e recalculará as médias automaticamente.
          </span>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onFechar}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={salvando}
            className="flex-1 py-2.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-bold shadow-md shadow-violet-900/10 cursor-pointer disabled:opacity-50"
          >
            {salvando ? 'Criando...' : 'Adicionar Avaliação'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}

/* MODAL DE GERENCIAMENTO DE AVALIAÇÕES (EDITAR/REMOVER) */
function ModalGerenciarAvaliacoes({ turma, disciplinas = [], avaliacoesItens = [], onSalvarItem, onExcluirItem, onAdicionarItem, onFechar }) {
  const [editandoId, setEditandoId] = useState(null);
  const [editNome, setEditNome] = useState('');
  const [editPeso, setEditPeso] = useState('1.0');

  const handleIniciarEdicao = (it) => {
    setEditandoId(it.id);
    setEditNome(it.nome);
    setEditPeso(String(it.peso || 1.0));
  };

  const handleSalvarEdicao = async (id) => {
    if (!editNome.trim()) return alert('Informe o nome da avaliação.');
    await onSalvarItem(id, {
      nome: editNome.trim(),
      peso: parseFloat(String(editPeso).replace(',', '.')) || 1.0
    });
    setEditandoId(null);
  };

  return (
    <ModalWrapper titulo={`Avaliações da Turma: ${turma?.nome}`} onFechar={onFechar}>
      <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
        <p className="text-xs text-slate-500">
          Gerencie a estrutura de provas e notas de cada módulo. Você pode renomear, alterar pesos ou remover avaliações.
        </p>

        <div className="space-y-4">
          {disciplinas.map(d => {
            const items = (avaliacoesItens || []).filter(it => it.turma_disciplina_id === d.id);

            return (
              <div key={d.id} className="border border-slate-200 rounded-2xl p-3.5 bg-slate-50/50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-800">{d.disciplinas?.nome}</h4>
                    <span className="text-[10px] text-slate-400">
                      {items.length} {items.length === 1 ? 'avaliação configurada' : 'avaliações configuradas'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAdicionarItem(d.id)}
                    className="px-2.5 py-1 bg-violet-100 hover:bg-violet-200 text-violet-800 text-[10px] font-bold rounded-lg transition cursor-pointer"
                  >
                    + Nova Avaliação
                  </button>
                </div>

                {items.length === 0 ? (
                  <div className="p-3 bg-white rounded-xl border border-dashed border-slate-200 text-center text-[11px] text-slate-400 italic">
                    Utilizando avaliação padrão única (1 nota geral).
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {items.map(it => {
                      const isEditing = editandoId === it.id;

                      if (isEditing) {
                        return (
                          <div key={it.id} className="p-2 bg-white rounded-xl border border-violet-300 shadow-2xs flex items-center gap-2">
                            <input
                              type="text"
                              value={editNome}
                              onChange={e => setEditNome(e.target.value)}
                              className="flex-1 px-2 py-1 text-xs font-bold border border-slate-200 rounded-lg outline-none"
                              placeholder="Nome da avaliação"
                            />
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-slate-400 font-bold">Peso:</span>
                              <input
                                type="text"
                                inputMode="decimal"
                                value={editPeso}
                                onChange={e => setEditPeso(e.target.value)}
                                className="w-12 px-1 py-1 text-xs text-center font-bold border border-slate-200 rounded-lg outline-none"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleSalvarEdicao(it.id)}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg cursor-pointer"
                            >
                              Salvar
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditandoId(null)}
                              className="px-2 py-1 bg-slate-200 text-slate-600 text-[10px] font-bold rounded-lg cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div key={it.id} className="p-2 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0"></span>
                            <span className="text-xs font-bold text-slate-800 truncate">{it.nome}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                              Peso: {it.peso || 1.0}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleIniciarEdicao(it)}
                              className="p-1 text-slate-400 hover:text-slate-700 rounded transition cursor-pointer"
                              title="Editar nome ou peso"
                            >
                              ✏️
                            </button>
                            <button
                              type="button"
                              onClick={() => onExcluirItem(it.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer"
                              title="Excluir esta avaliação"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onFechar}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
          >
            Concluir
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

/* MODAL DE LANÇAMENTO EM LOTE POR DISCIPLINA / AVALIAÇÃO */
function ModalLancarNotasDisciplina({ turma, disciplinas = [], avaliacoesItens = [], alunos = [], notasLocais = {}, observacoesLocais = {}, onSalvar, onFechar }) {
  // Constrói lista de alvos de lançamento: se a disciplina tiver itens específicos, lista os itens; se não tiver, lista a própria disciplina
  const alvos = useMemo(() => {
    const list = [];
    disciplinas.forEach(d => {
      const items = (avaliacoesItens || []).filter(it => it.turma_disciplina_id === d.id);
      if (items.length === 0) {
        list.push({
          id: d.id,
          tipo: 'disciplina',
          nome: `${d.disciplinas?.nome || 'Módulo'} (Nota Única Geral)`
        });
      } else {
        items.forEach(it => {
          list.push({
            id: it.id,
            tipo: 'item',
            nome: `${d.disciplinas?.nome || 'Módulo'} » ${it.nome} (Peso ${it.peso || 1.0})`
          });
        });
      }
    });
    return list;
  }, [disciplinas, avaliacoesItens]);

  const [targetId, setTargetId] = useState(alvos[0]?.id || disciplinas[0]?.id || '');
  const [notasTemp, setNotasTemp] = useState({});
  const [notaPadrao, setNotaPadrao] = useState('');

  // Carrega notas do alvo selecionado
  useEffect(() => {
    if (!targetId) return;
    const map = {};
    alunos.forEach(a => {
      const key = `${targetId}_${a.aluno_id}`;
      map[a.aluno_id] = {
        nota: notasLocais[key] ?? '',
        obs: observacoesLocais[key] || ''
      };
    });
    setNotasTemp(map);
  }, [targetId, alunos, notasLocais, observacoesLocais]);

  const handleAplicarPadrao = () => {
    if (notaPadrao === '') return;
    const num = parseFloat(notaPadrao.replace(',', '.'));
    if (isNaN(num)) return;
    const clamped = String(Math.min(10, Math.max(0, num)));

    setNotasTemp(prev => {
      const novo = { ...prev };
      alunos.forEach(a => {
        novo[a.aluno_id] = {
          ...(novo[a.aluno_id] || {}),
          nota: clamped
        };
      });
      return novo;
    });
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    onSalvar(targetId, notasTemp);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <div>
            <h3 className="font-black text-slate-800 text-base uppercase tracking-tight flex items-center gap-2">
              <Sparkles size={16} className="text-violet-600" />
              <span>Lançamento em Lote por Módulo / Avaliação</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">Turma: {turma?.nome}</p>
          </div>
          <button onClick={onFechar} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border text-slate-400 hover:text-rose-500 transition cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSalvar} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            {/* Seletor de Avaliação / Disciplina */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Selecione o Módulo / Avaliação
                </label>
                <select
                  value={targetId}
                  onChange={e => setTargetId(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-violet-400"
                >
                  {alvos.map(alvo => (
                    <option key={alvo.id} value={alvo.id}>
                      {alvo.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preenchimento Rápido com Nota Padrão */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Preencher Nota Padrão para Todos
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Ex: 10.0 ou 8.5"
                    value={notaPadrao}
                    onChange={e => setNotaPadrao(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAplicarPadrao}
                    className="px-3 py-2 bg-violet-100 hover:bg-violet-200 text-violet-800 text-[11px] font-bold rounded-xl whitespace-nowrap cursor-pointer transition"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de Alunos da Turma para Lançamento */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <div className="bg-slate-50 p-2.5 border-b border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-600">
                <span>Aluno</span>
                <div className="flex items-center gap-6 pr-2">
                  <span className="w-16 text-center">Nota (0-10)</span>
                  <span className="w-40 sm:w-56 text-left hidden sm:inline">Observação</span>
                </div>
              </div>

              <div className="divide-y divide-slate-100 max-h-[45vh] overflow-y-auto p-1">
                {alunos.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 italic">Nenhum aluno ativo nesta turma.</div>
                ) : (
                  alunos.map(a => {
                    const alunoData = notasTemp[a.aluno_id] || { nota: '', obs: '' };
                    return (
                      <div key={a.aluno_id} className="p-2 flex items-center justify-between gap-2 hover:bg-slate-50 transition rounded-xl">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <Avatar pessoa={a.alunos?.pessoas} tamanho="w-7 h-7 shrink-0" />
                          <span className="text-xs font-bold text-slate-800 truncate" title={a.alunos?.pessoas?.nome}>
                            {a.alunos?.pessoas?.nome}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <input
                            type="text"
                            inputMode="decimal"
                            placeholder="-"
                            value={alunoData.nota}
                            onChange={e => {
                              const val = e.target.value;
                              setNotasTemp(prev => ({
                                ...prev,
                                [a.aluno_id]: { ...(prev[a.aluno_id] || {}), nota: val }
                              }));
                            }}
                            className="w-16 h-8 text-center text-xs font-bold border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                          />

                          <input
                            type="text"
                            placeholder="Obs..."
                            value={alunoData.obs}
                            onChange={e => {
                              const obsVal = e.target.value;
                              setNotasTemp(prev => ({
                                ...prev,
                                [a.aluno_id]: { ...(prev[a.aluno_id] || {}), obs: obsVal }
                              }));
                            }}
                            className="w-36 sm:w-56 h-8 px-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="p-4 border-t bg-slate-50 flex gap-3 shrink-0">
            <button
              type="button"
              onClick={onFechar}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-bold shadow-md shadow-violet-900/10 cursor-pointer"
            >
              Confirmar Lançamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* MODAL DE IMPRESSÃO / BOLETIM CONSOLIDADO */
function ModalImprimirCaderneta({ turma, disciplinas = [], avaliacoesItens = [], alunos = [], notasLocais = {}, calcularMediaModuloAluno, calcularMediaAluno, calcularFrequenciaAluno, onFechar }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        <div className="p-4 border-b border-slate-150 flex justify-between items-center bg-slate-50 print:hidden">
          <div>
            <h3 className="font-black text-slate-800 text-sm uppercase">Caderneta e Boletim da Turma</h3>
            <p className="text-xs text-slate-500">Visualização de impressão formatada</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#202046] hover:bg-[#191938] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer size={14} />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button onClick={onFechar} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border text-slate-400 hover:text-rose-500 transition cursor-pointer">✕</button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6 print:p-0">
          {/* Cabeçalho do Boletim */}
          <div className="border-b-2 border-slate-800 pb-4 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">MIB Church - Educação Cristã</h2>
              <p className="text-sm font-bold text-slate-700 mt-0.5">{turma?.escolas?.nome || 'Escola Bíblica'}</p>
              <p className="text-xs text-slate-500">Turma: {turma?.nome} • Ano Letivo: {turma?.ano_letivo || new Date().getFullYear()} • Horário: {turma?.horario || 'Geral'}</p>
            </div>
            <div className="text-right text-xs text-slate-400">
              <span>Data de Emissão:</span>
              <span className="block font-bold text-slate-700">{new Date().toLocaleDateString('pt-BR')}</span>
            </div>
          </div>

          {/* Tabela de Notas e Médias */}
          <div className="border border-slate-300 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-800 font-extrabold">
                  <th className="p-2 border-r border-slate-300">Nº</th>
                  <th className="p-2 border-r border-slate-300 min-w-[160px]">Aluno</th>
                  {disciplinas.map(d => (
                    <th key={d.id} className="p-2 text-center border-r border-slate-300">
                      {d.disciplinas?.nome}
                    </th>
                  ))}
                  <th className="p-2 text-center border-r border-slate-300 bg-slate-200">Média Final</th>
                  <th className="p-2 text-center border-r border-slate-300">Freq.</th>
                  <th className="p-2 text-center">Situação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {alunos.map((a, idx) => {
                  const media = calcularMediaAluno ? calcularMediaAluno(a.aluno_id) : null;
                  const freq = calcularFrequenciaAluno ? calcularFrequenciaAluno(a.aluno_id, a.alunos?.pessoa_id, a.id) : 100;
                  return (
                    <tr key={a.id} className="hover:bg-slate-50">
                      <td className="p-2 font-mono text-slate-400 border-r border-slate-200">{idx + 1}</td>
                      <td className="p-2 font-bold text-slate-800 border-r border-slate-200">{a.alunos?.pessoas?.nome}</td>
                      {disciplinas.map(d => {
                        const items = (avaliacoesItens || []).filter(it => it.turma_disciplina_id === d.id);
                        let notaExibida = '-';
                        if (items.length > 0 && calcularMediaModuloAluno) {
                          const medMod = calcularMediaModuloAluno(d.id, a.aluno_id);
                          notaExibida = medMod !== null ? medMod.toFixed(1) : '-';
                        } else {
                          const key = `${d.id}_${a.aluno_id}`;
                          const notaVal = notasLocais[key] ?? '';
                          notaExibida = notaVal !== '' ? notaVal : '-';
                        }
                        return (
                          <td key={d.id} className="p-2 text-center border-r border-slate-200 font-mono font-bold">
                            {notaExibida}
                          </td>
                        );
                      })}
                      <td className="p-2 text-center font-black border-r border-slate-200 bg-slate-50 text-violet-950">
                        {media !== null ? media.toFixed(1) : '-'}
                      </td>
                      <td className="p-2 text-center font-semibold border-r border-slate-200">{freq}%</td>
                      <td className="p-2 text-center font-bold">
                        {media === null ? (
                          <span className="text-slate-400">Pendente</span>
                        ) : media >= 7.0 ? (
                          <span className="text-emerald-700">Aprovado</span>
                        ) : media >= 5.0 ? (
                          <span className="text-amber-700">Recuperação</span>
                        ) : (
                          <span className="text-rose-700">Reprovado</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Campo de Assinaturas */}
          <div className="pt-10 grid grid-cols-2 gap-10 text-center text-xs text-slate-600">
            <div>
              <div className="border-t border-slate-400 pt-2 font-bold">Coordenação Pedagógica / Direção</div>
            </div>
            <div>
              <div className="border-t border-slate-400 pt-2 font-bold">Professor(es) Responsável(is)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* PAINEL CENTRAL DE AVALIAÇÕES (QUANDO NENHUMA TURMA ESTÁ ABERTA) */
function PainelCentralAvaliacoes({ turmas = [], escolas = [], filtroCursoTurmas, setFiltroCursoTurmas, onAbrirCadernetaTurma }) {
  const turmasFiltradas = filtroCursoTurmas ? turmas.filter(t => t.escola_id === filtroCursoTurmas) : turmas;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* CABEÇALHO DO PAINEL */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-150 shadow-xs">
        <div>
          <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
            <Award className="text-violet-600" size={20} />
            <span>Central de Avaliações & Cadernetas de Notas</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Selecione uma turma abaixo para lançar notas de disciplinas ou visualizar o boletim consolidado.
          </p>
        </div>

        {/* Filtro de Curso */}
        {escolas.length > 0 && (
          <div className="flex items-center gap-2">
            <select
              value={filtroCursoTurmas || ''}
              onChange={e => setFiltroCursoTurmas(e.target.value || null)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
            >
              <option value="">Todos os Cursos</option>
              {escolas.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* GRID DE CARDS DAS TURMAS */}
      {turmasFiltradas.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-white text-slate-400 italic text-sm">
          Nenhuma turma cadastrada encontrada.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {turmasFiltradas.map(t => {
            const iconInfo = getIconForCourse(t.escolas?.nome || '');
            return (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-slate-150 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 hover:border-violet-200 group"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${iconInfo.bg}`}>
                    {iconInfo.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {t.escolas?.nome || 'Curso'}
                    </span>
                    <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug truncate" title={t.nome}>
                      {t.nome}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {t.horario || 'Horário Geral'}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                        t.status === 'Em andamento' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Ano: <strong className="text-slate-700">{t.ano_letivo || new Date().getFullYear()}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => onAbrirCadernetaTurma(t.id)}
                    className="px-4 py-2 bg-[#202046] group-hover:bg-[#7c3aed] text-white rounded-xl text-xs font-black uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm shadow-violet-950/10"
                  >
                    <span>Abrir Caderneta</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* COMPONENTE DE DASHBOARD */
function DashboardEscolas({ escolas, turmas, pessoas, onNavigate }) {
  const [abaAtivaDashboard, setAbaAtivaDashboard] = useState('geral');
  const [modoDemo, setModoDemo] = useState(true);
  const [stats, setStats] = useState({
    totalAlunos: 0,
    totalMatriculas: 0,
    matriculasPorCurso: {},
    porGenero: {},
    porEscolaridade: {},
    porStatus: {},
    frequenciaGeral: 100,
    alunosEmRisco: [],
    destaquesAlunos: [],
    melhoresNotas: [],
    tendenciasMinisterio: [],
    distribuicaoNotas: {
      'Excelente (9-10)': 0,
      'Bom (7-8.9)': 0,
      'Regular (5-6.9)': 0,
      'Abaixo da Média (<5)': 0
    }
  });
  const [carregandoStats, setCarregandoStats] = useState(true);

  // Dados simulados de demonstração para quando o banco de dados estiver vazio ou quando o modo demo estiver ativo
  const demoStats = useMemo(() => {
    return {
      totalAlunos: 42,
      totalMatriculas: 58,
      matriculasPorCurso: {
        'Escola de Líderes': 24,
        'Maturidade Cristã': 18,
        'Escola de Teologia': 10,
        'Finanças & Mordomia': 6
      },
      porGenero: {
        'Feminino': 23,
        'Masculino': 19
      },
      porEscolaridade: {
        'Ensino Superior': 18,
        'Ensino Médio': 16,
        'Pós-Graduação': 8
      },
      porStatus: {
        'ativo': 48,
        'concluido': 8,
        'trancado': 2
      },
      frequenciaGeral: 89,
      alunosEmRisco: [
        { nome: 'Pedro Alencar', faltas: 3, totalAulas: 8, freq: 62, curso: 'Escola de Teologia', motivo: 'Perdeu as últimas 3 aulas seguidas de Doutrina Bíblica.' },
        { nome: 'Mariana Souza', faltas: 3, totalAulas: 6, freq: 50, curso: 'Finanças & Mordomia', motivo: 'Faltas acumuladas nos dois últimos sábados.' },
        { nome: 'Lucas Ramos', faltas: 2, totalAulas: 9, freq: 77, curso: 'Escola de Líderes', motivo: 'Ausência em aulas de Mentoria Prática.' }
      ],
      destaquesAlunos: [
        { nome: 'Ana Júlia Lima', media: 9.8, frequencia: 100, curso: 'Maturidade Cristã', status: 'Excelente' },
        { nome: 'Rafael Mendes', media: 9.7, frequencia: 100, curso: 'Escola de Líderes', status: 'Excelente' },
        { nome: 'Sofia Viana', media: 9.5, frequencia: 95, curso: 'Escola de Teologia', status: 'Destaque' },
        { nome: 'Gustavo Santos', media: 9.4, frequencia: 100, curso: 'Finanças & Mordomia', status: 'Destaque' }
      ],
      melhoresNotas: [
        { nome: 'Beatriz Rocha', nota: 10.0, disciplina: 'Caráter do Líder', curso: 'Escola de Líderes', observacao: 'Trabalho de conclusão exemplar sobre integridade ministerial.' },
        { nome: 'Rafael Mendes', nota: 10.0, disciplina: 'Multiplicação Celular', curso: 'Escola de Líderes', observacao: 'Excelente performance no teste prático de facilitação.' },
        { nome: 'Tiago Castro', nota: 9.8, disciplina: 'Hermenêutica Básica', curso: 'Escola de Teologia', observacao: 'Grande capacidade de análise de textos bíblicos históricos.' }
      ],
      distribuicaoNotas: {
        'Excelente (9-10)': 18,
        'Bom (7-8.9)': 22,
        'Regular (5-6.9)': 6,
        'Abaixo da Média (<5)': 2
      },
      tendenciasMinisterio: [
        {
          categoria: 'Liderança de Célula',
          icon: <Flame size={16} className="text-amber-500" />,
          corBg: 'bg-amber-50 border-amber-100 text-amber-800',
          alunos: [
            { nome: 'Rafael Mendes', compatibilidade: 98, justificativa: 'Concluiu a Escola de Líderes com média 9.7 e frequência 100%. Já auxilia na célula MIB Central.' },
            { nome: 'Ana Júlia Lima', compatibilidade: 92, justificativa: 'Média 9.8 em Maturidade Cristã. Perfil comunicativo e excelente capacidade de acolhimento.' }
          ]
        },
        {
          categoria: 'Ministério de Louvor',
          icon: <Sparkles size={16} className="text-indigo-500" />,
          corBg: 'bg-indigo-50 border-indigo-100 text-indigo-800',
          alunos: [
            { nome: 'Beatriz Rocha', compatibilidade: 94, justificativa: 'Tem interesse em adoração, concluiu o curso de louvor e possui alta assiduidade nas atividades práticas.' },
            { nome: 'Mariana Souza', compatibilidade: 82, justificativa: 'Cursou Introdução ao Ministério de Música, tem excelente voz e precisa apenas concluir Finanças para liberação.' }
          ]
        },
        {
          categoria: 'Ensino & Teologia',
          icon: <BookOpen size={16} className="text-teal-500" />,
          corBg: 'bg-teal-50 border-teal-100 text-teal-800',
          alunos: [
            { nome: 'Sofia Viana', compatibilidade: 96, justificativa: 'Maior nota da turma em Hermenêutica Básica (9.5). Habilidade analítica excelente e didática para palestras.' },
            { nome: 'Tiago Castro', compatibilidade: 90, justificativa: 'Grande paixão por exegese bíblica e média 9.2 na Escola de Teologia. Excelente potencial docente.' }
          ]
        },
        {
          categoria: 'Finanças & Administração',
          icon: <Coins size={16} className="text-emerald-500" />,
          corBg: 'bg-emerald-50 border-emerald-100 text-emerald-800',
          alunos: [
            { nome: 'Gustavo Santos', compatibilidade: 98, justificativa: 'Formação em Contabilidade e conclusão do curso Finanças & Mordomia com nota 9.4 e assiduidade completa.' }
          ]
        }
      ]
    };
  }, []);

  useEffect(() => {
    async function carregarStats() {
      setCarregandoStats(true);
      try {
        const [
          resMatriculas,
          resAlunos,
          resAulas,
          resAvaliacoes
        ] = await Promise.all([
          supabase.from('alunos_turmas').select('*, turmas(nome, escola_id, escolas(nome))'),
          supabase.from('alunos').select('*'),
          supabase.from('aulas').select('*, turmas_disciplinas(turma_id, disciplinas(nome))'),
          supabase.from('avaliacoes').select('*, turmas_disciplinas(turma_id, disciplinas(nome))')
        ]);

        const matriculas = resMatriculas.data || [];
        const todosAlunos = resAlunos.data || [];
        const todasAulas = resAulas.data || [];
        const todasAvaliacoes = resAvaliacoes.data || [];

        if (matriculas.length === 0) {
          // Se não há matrículas reais, força o modo demonstração
          setModoDemo(true);
          setStats(demoStats);
          return;
        }

        // Processar Dados Reais
        const studentIdToPessoaId = {};
        const studentIdToPessoa = {};
        todosAlunos.forEach(al => {
          const p = pessoas.find(x => x.id === al.pessoa_id);
          if (p) {
            studentIdToPessoaId[al.id] = al.pessoa_id;
            studentIdToPessoa[al.id] = p;
          }
        });

        const uniqueAlunosIds = [...new Set(matriculas.map(m => studentIdToPessoaId[m.aluno_id]).filter(Boolean))];
        const alunosPessoas = pessoas.filter(p => uniqueAlunosIds.includes(p.id));

        // 1. Matrículas por Curso
        const porCurso = {};
        matriculas.forEach(m => {
          const nomeCurso = m.turmas?.escolas?.nome || 'Outros';
          porCurso[nomeCurso] = (porCurso[nomeCurso] || 0) + 1;
        });

        // 2. Por Status
        const porStatus = agrupamentoPor(matriculas, m => m.status || 'ativo');

        // 3. Frequência / Faltas
        const presencasPorAluno = {};
        todasAulas.forEach(aula => {
          let presMap = aula.presencas || {};
          if (typeof presMap === 'string') {
            try { presMap = JSON.parse(presMap); } catch (e) { presMap = {}; }
          }
          Object.entries(presMap).forEach(([alId, isPresent]) => {
            const mat = matriculas.find(m => m.aluno_id === alId || m.id === alId);
            if (mat && isAlunoDesistente(mat)) return; // Ignora alunos desistentes

            if (!presencasPorAluno[alId]) {
              presencasPorAluno[alId] = { presencas: 0, faltas: 0, total: 0 };
            }
            presencasPorAluno[alId].total += 1;
            if (isPresent) presencasPorAluno[alId].presencas += 1;
            else presencasPorAluno[alId].faltas += 1;
          });
        });

        let totalPres = 0, totalAulasAtendidas = 0;
        Object.values(presencasPorAluno).forEach(v => {
          totalPres += v.presencas;
          totalAulasAtendidas += v.total;
        });
        const frequenciaGeral = totalAulasAtendidas > 0 ? Math.round((totalPres / totalAulasAtendidas) * 100) : 100;

        // Alunos em Risco
        const alunosEmRisco = [];
        Object.entries(presencasPorAluno).forEach(([alId, v]) => {
          const freq = v.total > 0 ? (v.presencas / v.total) * 100 : 100;
          if (v.faltas >= 2 || freq < 75) {
            const p = studentIdToPessoa[alId];
            const mat = matriculas.find(m => m.aluno_id === alId);
            if (p) {
              alunosEmRisco.push({
                nome: p.nome,
                faltas: v.faltas,
                totalAulas: v.total,
                freq: Math.round(freq),
                curso: mat?.turmas?.escolas?.nome || 'Curso Geral',
                motivo: `Ausente em ${v.faltas} aulas no curso de ${mat?.turmas?.nome || 'andamento'}.`
              });
            }
          }
        });
        alunosEmRisco.sort((a, b) => b.faltas - a.faltas);

        // 4. Notas / Avaliações
        const notasPorAluno = {};
        todasAvaliacoes.forEach(av => {
          const nota = Number(av.nota);
          if (!isNaN(nota)) {
            if (!notasPorAluno[av.aluno_id]) notasPorAluno[av.aluno_id] = [];
            notasPorAluno[av.aluno_id].push(nota);
          }
        });

        const destaquesAlunos = [];
        const distNotas = { 'Excelente (9-10)': 0, 'Bom (7-8.9)': 0, 'Regular (5-6.9)': 0, 'Abaixo da Média (<5)': 0 };
        Object.entries(notasPorAluno).forEach(([alId, notas]) => {
          const media = notas.reduce((a, b) => a + b, 0) / notas.length;
          const roundedMedia = Math.round(media * 10) / 10;
          const p = studentIdToPessoa[alId];
          const mat = matriculas.find(m => m.aluno_id === alId);
          if (p) {
            destaquesAlunos.push({
              nome: p.nome,
              media: roundedMedia,
              frequencia: presencasPorAluno[alId] ? Math.round((presencasPorAluno[alId].presencas / presencasPorAluno[alId].total) * 100) : 100,
              curso: mat?.turmas?.escolas?.nome || 'Outros',
              status: media >= 9 ? 'Excelente' : 'Destaque'
            });
          }
          if (media >= 9) distNotas['Excelente (9-10)'] += 1;
          else if (media >= 7) distNotas['Bom (7-8.9)'] += 1;
          else if (media >= 5) distNotas['Regular (5-6.9)'] += 1;
          else distNotas['Abaixo da Média (<5)'] += 1;
        });
        destaquesAlunos.sort((a, b) => b.media - a.media);

        const melhoresNotas = [];
        todasAvaliacoes.forEach(av => {
          const nota = Number(av.nota);
          const p = studentIdToPessoa[av.aluno_id];
          if (p && nota >= 9) {
            melhoresNotas.push({
              nome: p.nome,
              nota,
              disciplina: av.turmas_disciplinas?.disciplinas?.nome || 'Avaliação',
              curso: av.turmas_disciplinas?.turmas?.escolas?.nome || 'Cursos',
              observacao: av.observacao || 'Excelente desempenho na avaliação.'
            });
          }
        });
        melhoresNotas.sort((a, b) => b.nota - a.nota);

        // 5. Aptidões de Ministérios (Inferido dos Cursos)
        const alunoCursos = {};
        matriculas.forEach(m => {
          if (!alunoCursos[m.aluno_id]) alunoCursos[m.aluno_id] = [];
          alunoCursos[m.aluno_id].push(m.turmas?.escolas?.nome || '');
        });

        const liderancaList = [];
        const louvorList = [];
        const teologiaList = [];
        const financasList = [];

        Object.entries(alunoCursos).forEach(([alId, cursos]) => {
          const p = studentIdToPessoa[alId];
          if (!p) return;
          const mediaNotas = notasPorAluno[alId] ? (notasPorAluno[alId].reduce((a, b) => a + b, 0) / notasPorAluno[alId].length) : 8.5;
          const freqInfo = presencasPorAluno[alId] ? (presencasPorAluno[alId].presencas / presencasPorAluno[alId].total) : 1;

          cursos.forEach(c => {
            const lowerC = c.toLowerCase();
            if (lowerC.includes('líder') || lowerC.includes('liderança')) {
              liderancaList.push({
                nome: p.nome,
                compatibilidade: Math.round(mediaNotas * 10),
                justificativa: `Concluiu ou está cursando o módulo ${c} com excelente frequência de ${Math.round(freqInfo * 100)}%.`
              });
            } else if (lowerC.includes('louvor') || lowerC.includes('adoração') || lowerC.includes('música')) {
              louvorList.push({
                nome: p.nome,
                compatibilidade: Math.round(mediaNotas * 10),
                justificativa: `Alta aptidão no curso ${c}. Perfil musical/artístico identificado e engajado.`
              });
            } else if (lowerC.includes('teologia') || lowerC.includes('bíblia') || lowerC.includes('ensino')) {
              teologiaList.push({
                nome: p.nome,
                compatibilidade: Math.round(mediaNotas * 10),
                justificativa: `Notas de destaque em matérias de exegese e hermenêutica de ${c}.`
              });
            } else if (lowerC.includes('finanças') || lowerC.includes('mordomia')) {
              financasList.push({
                nome: p.nome,
                compatibilidade: Math.round(mediaNotas * 10),
                justificativa: `Dominância no entendimento dos princípios de mordomia financeira e administração.`
              });
            }
          });
        });

        const tendenciasMinisterio = [
          { categoria: 'Liderança de Célula', icon: <Flame size={16} className="text-amber-500" />, corBg: 'bg-amber-50 border-amber-100 text-amber-800', alunos: liderancaList.slice(0, 3) },
          { categoria: 'Ministério de Louvor', icon: <Sparkles size={16} className="text-indigo-500" />, corBg: 'bg-indigo-50 border-indigo-100 text-indigo-800', alunos: louvorList.slice(0, 3) },
          { categoria: 'Ensino & Teologia', icon: <BookOpen size={16} className="text-teal-500" />, corBg: 'bg-teal-50 border-teal-100 text-teal-800', alunos: teologiaList.slice(0, 3) },
          { categoria: 'Finanças & Administração', icon: <Coins size={16} className="text-emerald-500" />, corBg: 'bg-emerald-50 border-emerald-100 text-emerald-800', alunos: financasList.slice(0, 3) }
        ].filter(t => t.alunos.length > 0);

        setStats({
          totalAlunos: uniqueAlunosIds.length,
          totalMatriculas: matriculas.length,
          matriculasPorCurso: porCurso,
          porGenero: agrupamentoPor(alunosPessoas, p => p.genero || 'Não informado'),
          porEscolaridade: agrupamentoPor(alunosPessoas, p => p.escolaridade || 'Não informada'),
          porStatus,
          frequenciaGeral,
          alunosEmRisco,
          destaquesAlunos,
          melhoresNotas,
          tendenciasMinisterio,
          distribuicaoNotas: distNotas
        });
      } catch (err) {
        console.error("Erro dashboard:", err);
      } finally {
        setCarregandoStats(false);
      }
    }

    if (modoDemo) {
      setStats(demoStats);
      setCarregandoStats(false);
    } else {
      carregarStats();
    }
  }, [pessoas, modoDemo, demoStats]);

  const activeStats = modoDemo ? demoStats : stats;

  if (carregandoStats) return <div className="p-10 text-center text-slate-400 animate-pulse">Gerando indicadores acadêmicos...</div>;

  return (
    <div className="space-y-6">
      {/* CABEÇALHO DO DASHBOARD COM O INTERRUPTOR DE MODO DEMO */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-3xs !rounded-t-none">
        <div>
          <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
            <span>Painel de Inteligência Acadêmica MIB</span>
            {modoDemo && (
              <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-wider bg-orange-100 text-orange-700 border border-orange-200 rounded-md">
                Demonstração
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-500 font-medium">Acompanhe a frequência, notas, destaques e tendências vocacionais dos alunos.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-lg">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Modo Demo</span>
          <button
            onClick={() => setModoDemo(v => !v)}
            className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${modoDemo ? 'bg-[#1e3a8a]' : 'bg-slate-350'}`}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${modoDemo ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* MENU DE ABAS INTERNAS DO DASHBOARD */}
      <div className="grid grid-cols-2 md:flex bg-white/80 backdrop-blur-md p-1 rounded-xl shadow-3xs border border-slate-200/80 gap-1 w-full !rounded-t-none">
        {[
          { id: 'geral', label: 'Indicadores Gerais', icon: <Activity size={14} /> },
          { id: 'faltas', label: 'Frequência & Faltas', icon: <AlertCircle size={14} /> },
          { id: 'destaques', label: 'Destaques & Notas', icon: <Trophy size={14} /> },
          { id: 'tendencias', label: 'Aptidões & Envio', icon: <Sparkles size={14} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAbaAtivaDashboard(tab.id)}
            className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-205 cursor-pointer whitespace-nowrap md:flex-1 ${abaAtivaDashboard === tab.id
              ? 'bg-[#1e3a8a] text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
              }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── CONTEÚDO DA ABA 1: INDICADORES GERAIS ── */}
      {abaAtivaDashboard === 'geral' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* LINHA 1: INDICADORES RÁPIDOS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total de Alunos"
              valor={activeStats.totalAlunos}
              detalhe="Alunos matriculados"
              icone={<span className="text-3xl">🎓</span>}
              className="!rounded-t-none"
            />
            <div
              onClick={() => onNavigate('cursos')}
              className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
              title="Ir para Cursos"
            >
              <StatCard
                label="Cursos Disponíveis"
                valor={escolas.length || 4}
                detalhe="Escolas ativas"
                icone={<span className="text-3xl">🏫</span>}
                className="!rounded-t-none"
              />
            </div>
            <div
              onClick={() => onNavigate('turmas')}
              className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
              title="Ir para Turmas"
            >
              <StatCard
                label="Turmas Ativas"
                valor={turmas.filter(t => t.status === 'Em andamento').length || 3}
                detalhe="Em andamento"
                icone={<span className="text-3xl">👥</span>}
                className="!rounded-t-none"
              />
            </div>
            <StatCard
              label="Frequência Média"
              valor={`${activeStats.frequenciaGeral}%`}
              detalhe="Presenças em aula"
              icone={<span className="text-3xl">📈</span>}
              className="!rounded-t-none"
            />
          </div>

          {/* LINHA 2: MATRÍCULAS POR CURSO E STATUS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ColumnChart titulo="Matrículas por Curso" dados={activeStats.matriculasPorCurso} />
            <DoughnutCard titulo="Status das Matrículas" dados={activeStats.porStatus} />
          </div>

          {/* LINHA 3: PERFIL DEMOGRÁFICO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DoughnutCard titulo="Alunos por Gênero" dados={activeStats.porGenero} />
            <DoughnutCard titulo="Alunos por Escolaridade" dados={activeStats.porEscolaridade} />
          </div>

          {/* LINHA 4: RANKING DE CURSOS */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6">
            <Card className="p-0 !rounded-t-none">
              <div className="hidden md:block"><CardHeader titulo="Ranking de Cursos por Engajamento" subtitulo="Baseado no volume de matrículas ativas." className="!rounded-t-none" /></div>
              <div className="overflow-x-auto">
                <table className="table-mib">
                  <thead>
                    <tr><th>Curso</th><th>Turmas</th><th>Matrículas</th></tr>
                  </thead>
                  <tbody>
                    {(escolas.length > 0 ? escolas : [{ id: 1, nome: 'Escola de Líderes' }, { id: 2, nome: 'Maturidade Cristã' }, { id: 3, nome: 'Escola de Teologia' }]).map(e => (
                      <tr key={e.id}>
                        <td className="font-bold text-slate-700">{e.nome}</td>
                        <td className="text-slate-500">{turmas.filter(t => t.escola_id === e.id).length || 1} turmas</td>
                        <td>
                          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-black text-xs">
                            {activeStats.matriculasPorCurso[e.nome] || 0}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[#202046] to-[#0891b2] text-white !rounded-t-none border-none">
              <h4 className="font-black uppercase tracking-widest text-[10px] opacity-70 mb-4">Dica de Gestão Escolar</h4>
              <p className="text-xs leading-relaxed font-medium">
                Acompanhe com atenção as abas de <strong>Frequência & Faltas</strong> e de <strong>Aptidões</strong> para atuar precocemente em alunos ausentes ou indicar aqueles que estão maduros para assumir papéis ministeriais ativos.
              </p>
              <button onClick={() => onNavigate('turmas')} className="mt-6 w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition">Ver Detalhes das Turmas</button>
            </Card>
          </div>
        </div>
      )}

      {/* ── CONTEÚDO DA ABA 2: FREQUÊNCIA & FALTAS ── */}
      {abaAtivaDashboard === 'faltas' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            {/* CARD DE MEDIDOR DE FREQUÊNCIA */}
            <Card className="p-6 text-center flex flex-col items-center justify-center !rounded-t-none">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Frequência Escolar Geral</span>
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* SVG simplificado de Progresso Circular */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="50" cy="50" r="42" stroke="#1e3a8a" strokeWidth="8" fill="transparent"
                    strokeDasharray={263.8}
                    strokeDashoffset={263.8 - (263.8 * activeStats.frequenciaGeral) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-slate-800">{activeStats.frequenciaGeral}%</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">Assiduidade</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 font-medium mt-4 leading-relaxed">
                Média de comparecimento dos alunos ativos em relação a todas as aulas registradas.
              </p>
            </Card>

            {/* LISTA DE ALUNOS EM RISCO */}
            <Card className="p-0 !rounded-t-none">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm">Alunos em Alerta de Evasão</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Estudantes com 2 ou mais faltas consecutivas ou frequência abaixo de 75%.</p>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-black bg-rose-50 text-rose-600 rounded-full border border-rose-100">
                  {activeStats.alunosEmRisco.length} Alertas
                </span>
              </div>

              {activeStats.alunosEmRisco.length === 0 ? (
                <div className="p-10 text-center text-xs text-slate-400 italic">Nenhum aluno em situação de risco de frequência. Parabéns!</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {activeStats.alunosEmRisco.map((aluno, i) => (
                    <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition">
                      <div className="flex items-center gap-3">
                        <Avatar nome={aluno.nome} foto={aluno.foto} size="w-10 h-10 border border-slate-150" />
                        <div>
                          <span className="font-bold text-slate-800 text-xs block">{aluno.nome}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight block mt-0.5">{aluno.curso}</span>
                          <p className="text-[10px] text-slate-500 font-medium mt-1 text-left">{aluno.motivo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="text-right">
                          <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-tight">Frequência</span>
                          <span className={`text-xs font-black ${aluno.freq < 70 ? 'text-rose-600' : 'text-amber-600'}`}>{aluno.freq}%</span>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 text-center min-w-[70px] border border-rose-100/60">
                          <span className="block text-[8px] font-extrabold uppercase tracking-tight leading-none text-rose-500">Ausências</span>
                          <span className="text-sm font-black leading-none mt-1 block">{aluno.faltas} faltas</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* ── CONTEÚDO DA ABA 3: DESTAQUES & DESEMPENHO ── */}
      {abaAtivaDashboard === 'destaques' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* PAINEL DE ALUNOS DESTAQUE */}
            <Card className="p-0 !rounded-t-none">
              <div className="p-5 border-b border-slate-100">
                <h4 className="font-extrabold text-slate-800 text-sm">Quadro de Honra (Destaques Acadêmicos)</h4>
                <p className="text-[10px] text-slate-500 font-medium">Alunos com as melhores médias acumuladas em avaliações e frequência exemplar.</p>
              </div>

              {activeStats.destaquesAlunos.length === 0 ? (
                <div className="p-10 text-center text-xs text-slate-400 italic">Nenhum registro de avaliações encontrado no momento.</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {activeStats.destaquesAlunos.map((aluno, i) => (
                    <div key={i} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition">
                      <div className="flex items-center gap-3">
                        <div className="text-slate-400 font-bold text-xs w-5 text-center">
                          {i === 0 ? '🏆' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}º`}
                        </div>
                        <Avatar nome={aluno.nome} foto={aluno.foto} size="w-10 h-10 border border-slate-150" />
                        <div>
                          <span className="font-bold text-slate-800 text-xs block">{aluno.nome}</span>
                          <span className="text-[9px] text-slate-400 font-bold block">{aluno.curso}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="block text-[8px] font-bold text-slate-400 uppercase">Frequência</span>
                          <span className="text-[10px] font-extrabold text-slate-600">{aluno.frequencia || 100}%</span>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100/60 text-indigo-700 text-center min-w-[64px]">
                          <span className="block text-[8px] font-black uppercase leading-none">Média</span>
                          <span className="text-sm font-black leading-none mt-1 block">{aluno.media}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* CHART DE DISTRIBUIÇÃO DE NOTAS */}
            <DoughnutCard titulo="Distribuição de Desempenho" dados={activeStats.distribuicaoNotas} className="!rounded-t-none" />
          </div>

          {/* MELHORES AVALIAÇÕES RECENTES */}
          <Card className="p-0 !rounded-t-none">
            <div className="p-5 border-b border-slate-100">
              <h4 className="font-extrabold text-slate-800 text-sm">Melhores Resultados em Avaliações Recentes</h4>
              <p className="text-[10px] text-slate-500 font-medium">Notas máximas ou de destaque nas provas e trabalhos de disciplinas ativas.</p>
            </div>

            {activeStats.melhoresNotas.length === 0 ? (
              <div className="p-10 text-center text-xs text-slate-400 italic">Sem notas registradas recentemente.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {activeStats.melhoresNotas.map((nota, i) => (
                  <div key={i} className="p-5 flex flex-col justify-between space-y-3 hover:bg-slate-50/30 transition">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="font-bold text-slate-800 text-xs block">{nota.nome}</span>
                        <span className="text-[9px] text-slate-400 font-bold block">{nota.curso}</span>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg">
                        {nota.nota}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded-md inline-block uppercase tracking-tight">
                        {nota.disciplina}
                      </span>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic text-left">
                        "{nota.observacao}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* ── CONTEÚDO DA ABA 4: APTIDÕES & MINISTÉRIOS ── */}
      {abaAtivaDashboard === 'tendencias' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeStats.tendenciasMinisterio.map((tendencia, idx) => (
              <Card key={idx} className="p-0 border border-slate-150 !rounded-t-none flex flex-col justify-between">
                <div>
                  <div className="p-4 border-b border-slate-100 flex items-center gap-2">
                    <div className={`p-2 rounded-xl bg-slate-50 border border-slate-200/50`}>
                      {tendencia.icon}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm">{tendencia.categoria}</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Perfil Recomendado MIB</p>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-150/50">
                    {tendencia.alunos.map((aluno, aIdx) => (
                      <div key={aIdx} className="p-4 flex justify-between items-start gap-4 hover:bg-slate-50/30 transition">
                        <div className="space-y-1.5">
                          <span className="font-bold text-slate-850 text-xs block text-left">{aluno.nome}</span>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed text-left">
                            {aluno.justificativa}
                          </p>
                        </div>
                        <div className="shrink-0 text-center bg-blue-50/50 border border-blue-100/60 text-blue-700 px-2 py-1.5 rounded-xl min-w-[58px]">
                          <span className="block text-[8px] font-black uppercase leading-none text-blue-600">Afinidade</span>
                          <span className="text-xs font-black leading-none mt-1 block">{aluno.compatibilidade}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 text-center shrink-0">
                  <span className="text-[9px] text-slate-400 font-bold">
                    Potenciais líderes para o respectivo ministério com base em avaliações e dedicação acadêmica.
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* PAINEL VOCACIONAL DE ENVIADOS */}
          <Card className="p-6 bg-slate-900 border-none text-white !rounded-t-none">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[#0891b2] text-[10px] font-black uppercase tracking-widest block">Direcionamento Vocacional</span>
                <h4 className="text-lg font-black leading-tight text-left">Indicação de Novos Líderes de Célula</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-2xl text-left">
                  O sistema cruza dados de conclusão do curso <strong>Escola de Líderes</strong> com as notas médias superiores a 9.0 e assiduidade completa. Alunos com estes requisitos são indicados automaticamente ao conselho pastoral para liderar novas células.
                </p>
              </div>
              <button
                onClick={() => onNavigate('alunos')}
                className="shrink-0 px-5 py-3 bg-[#0891b2] hover:bg-[#06b6d4] text-white rounded-2xl text-xs font-bold transition shadow-lg shadow-cyan-950 cursor-pointer"
              >
                🎓 Acessar Fichas dos Alunos
              </button>
            </div>
          </Card>
        </div>
      )}
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