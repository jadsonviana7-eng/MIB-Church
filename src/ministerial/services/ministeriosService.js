import { supabase } from '../../supabaseClient';
import { historicoMinisterialService } from './historicoMinisterialService';

export const ministeriosService = {
  async listarMinisterios() {
    const { data, error } = await supabase
      .from('ministerios')
      .select('*')
      .eq('ativo', true)
      .order('nome');

    if (error) throw error;

    return data;
  },

  async listarMembros(ministerioId) {
    const { data, error } = await supabase
      .from('ministerio_membros')
      .select(`
  id,
  funcao,
  lider,
  pessoas (
    id,
    nome,
    telefone,
    foto_url,
    cargo
  )
`)
      .eq('ministerio_id', ministerioId)
      .eq('ativo', true);

    if (error) throw error;

    return data;
  },

  async listarPessoas() {
    const { data, error } = await supabase
      .from('pessoas')
      .select(`
        id,
        nome,
        telefone,
        foto_url,
        cargo
      `)
      .eq('status', 'ativo')
      .order('nome');

    if (error) throw error;

    return data;
  },

  async adicionarMembro(payload) {
    const { data, error } = await supabase
      .from('ministerio_membros')
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    // Registrar entrada no histórico
    await historicoMinisterialService.registrar({
      pessoaId: payload.pessoa_id,
      ministerioId: payload.ministerio_id,
      acao: 'ENTRADA_MINISTERIO',
      detalhes: 'Entrou no ministério'
    });

    return data;
  },

  async removerMembro(id) {
    // Buscar dados do vínculo antes de remover para registrar no histórico
    const { data: membro } = await supabase
      .from('ministerio_membros')
      .select('pessoa_id, ministerio_id')
      .eq('id', id)
      .maybeSingle();

    const { error } = await supabase
      .from('ministerio_membros')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Registrar saída no histórico
    if (membro) {
      await historicoMinisterialService.registrar({
        pessoaId: membro.pessoa_id,
        ministerioId: membro.ministerio_id,
        acao: 'SAIDA_MINISTERIO',
        detalhes: 'Saiu do ministério'
      });
    }
  },

  async atualizarMembro(id, payload) {
    const { data, error } = await supabase
      .from('ministerio_membros')
      .update({
        funcao: payload.funcao,
        lider: payload.lider
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Registrar no histórico a alteração
    if (payload.pessoa_id && payload.ministerio_id) {
      await historicoMinisterialService.registrar({
        pessoaId: payload.pessoa_id,
        ministerioId: payload.ministerio_id,
        acao: 'ALTERACAO_VINCULO',
        detalhes: `Vínculo atualizado: Função: ${payload.funcao || 'Sem Função'} · Líder: ${payload.lider ? 'Sim' : 'Não'}`
      });
    }

    return data;
  },

  async obterResumo() {
    const { count: totalMinisterios } = await supabase
      .from('ministerios')
      .select('*', { count: 'exact', head: true });

    const { count: totalVinculos } = await supabase
      .from('ministerio_membros')
      .select('*', { count: 'exact', head: true });

    const { count: totalLideres } = await supabase
      .from('ministerio_membros')
      .select('*', { count: 'exact', head: true })
      .eq('lider', true);

    return {
      totalMinisterios,
      totalVinculos,
      totalLideres
    };
  },

  async criarMinisterio(payload) {
    const { data, error } = await supabase
      .from('ministerios')
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async atualizarMinisterio(id, payload) {
    const { data, error } = await supabase
      .from('ministerios')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async excluirMinisterio(id) {
    const { error } = await supabase
      .from('ministerios')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async obterDashboard() {
    const { count: totalMinisterios } = await supabase.from('ministerios').select('*', { count: 'exact', head: true });
    const { count: totalMembros } = await supabase.from('ministerio_membros').select('*', { count: 'exact', head: true });
    const { count: totalFuncoes } = await supabase.from('ministerio_funcoes').select('*', { count: 'exact', head: true });
    const { count: totalLideres } = await supabase.from('ministerio_membros').select('*', { count: 'exact', head: true }).eq('lider', true);

    const { data: escalas } = await supabase
      .from('escalas')
      .select('status, pessoa_id, pessoas(nome)');

    let confirmadas = 0;
    let pendentes = 0;
    let recusadas = 0;
    const voluntarioCounts = {};

    (escalas || []).forEach(e => {
      if (e.status === 'confirmado') confirmadas++;
      else if (e.status === 'recusado') recusadas++;
      else pendentes++;

      if (e.pessoa_id && e.pessoas) {
        voluntarioCounts[e.pessoas.nome] = (voluntarioCounts[e.pessoas.nome] || 0) + 1;
      }
    });

    const rankingVoluntarios = Object.entries(voluntarioCounts)
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    const { data: vinculos } = await supabase
      .from('ministerio_membros')
      .select('ministerio_id, ministerios(nome)');

    const minCounts = {};
    (vinculos || []).forEach(v => {
      if (v.ministerios) {
        minCounts[v.ministerios.nome] = (minCounts[v.ministerios.nome] || 0) + 1;
      }
    });

    const rankingMinisterios = Object.entries(minCounts)
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    const { data: lideres } = await supabase
      .from('ministerio_membros')
      .select('pessoa_id, pessoas(nome)')
      .eq('lider', true);

    const liderCounts = {};
    (lideres || []).forEach(l => {
      if (l.pessoas) {
        liderCounts[l.pessoas.nome] = (liderCounts[l.pessoas.nome] || 0) + 1;
      }
    });

    const rankingLideres = Object.entries(liderCounts)
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    return {
      totalMinisterios: totalMinisterios || 0,
      totalMembros: totalMembros || 0,
      totalFuncoes: totalFuncoes || 0,
      totalLideres: totalLideres || 0,
      escalasStats: { confirmadas, pendentes, recusadas, total: (escalas || []).length },
      rankingVoluntarios,
      rankingMinisterios,
      rankingLideres
    };
  }, // CORRIGIDO: Chave adicionada aqui para fechar a função obterDashboard

  async listarFuncoes(ministerioId) {
    const { data, error } =
      await supabase
        .from('ministerio_funcoes')
        .select('*')
        .eq('ministerio_id', ministerioId)
        .order('ordem');

    if (error) throw error;

    return data;
  }, // A propriedade `listarFuncoes` deve ser seguida por uma vírgula

  async criarFuncao(payload) {
    const { data, error } =
      await supabase
        .from('ministerio_funcoes')
        .insert(payload)
        .select()
        .single();

    if (error) throw error;

    return data;
  },

  async atualizarFuncao(id, payload) {
    const { data, error } =
      await supabase
        .from('ministerio_funcoes')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    return data;
  },

  async excluirFuncao(id) {
    const { error } =
      await supabase
        .from('ministerio_funcoes')
        .delete()
        .eq('id', id);

    if (error) throw error;
  },

  async obterRelatoriosConsolidados() {
    // 1. Ministerios
    const { data: ministerios, error: errMin } = await supabase
      .from('ministerios')
      .select('id, nome, cor_principal')
      .eq('ativo', true);
    if (errMin) throw errMin;

    // 2. Membros
    const { data: membros, error: errMem } = await supabase
      .from('ministerio_membros')
      .select(`
        id,
        ministerio_id,
        pessoa_id,
        lider,
        funcao,
        pessoas (
          id,
          nome,
          foto_url,
          cargo
        )
      `)
      .eq('ativo', true);
    if (errMem) throw errMem;

    // 3. Escalas e Eventos
    const { data: escalas, error: errEsc } = await supabase
      .from('escalas')
      .select(`
        id,
        status,
        pessoa_id,
        ministerio_id,
        pessoas (
          nome
        ),
        eventos_ministeriais (
          id,
          titulo,
          data_evento
        )
      `);
    if (errEsc) throw errEsc;

    // 4. Historico de Entrada para Crescimento
    const { data: historicos, error: errHist } = await supabase
      .from('historico_ministerial')
      .select('id, ministerio_id, acao, criado_em')
      .eq('acao', 'ENTRADA_MINISTERIO');
    if (errHist) {
      console.warn('Erro ao obter historico_ministerial:', errHist);
    }

    return {
      ministerios: ministerios || [],
      membros: membros || [],
      escalas: escalas || [],
      historicos: historicos || []
    };
  }
};