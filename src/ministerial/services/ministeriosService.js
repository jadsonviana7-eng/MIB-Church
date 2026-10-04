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
    try {
      const [resMin, resMem, resFunc, resEsc, resPess] = await Promise.allSettled([
        supabase.from('ministerios').select('*'),
        supabase.from('ministerio_membros').select('*'),
        supabase.from('ministerio_funcoes').select('*'),
        supabase.from('escalas').select('*'),
        supabase.from('pessoas').select('id, nome')
      ]);

      const ministerios = resMin.status === 'fulfilled' && resMin.value.data ? resMin.value.data : [];
      const vinculos = resMem.status === 'fulfilled' && resMem.value.data ? resMem.value.data : [];
      const funcoes = resFunc.status === 'fulfilled' && resFunc.value.data ? resFunc.value.data : [];
      const escalas = resEsc.status === 'fulfilled' && resEsc.value.data ? resEsc.value.data : [];
      const pessoas = resPess.status === 'fulfilled' && resPess.value.data ? resPess.value.data : [];

      const mapPessoas = new Map(pessoas.map(p => [p.id, p]));
      const mapMinisterios = new Map(ministerios.map(m => [m.id, m]));

      let confirmadas = 0;
      let faltasJustificadas = 0;
      let faltasInjustificadas = 0;
      let recusadas = 0;
      let pendentes = 0;
      const voluntarioCounts = {};

      escalas.forEach(e => {
        const st = (e.status || '').toLowerCase();
        const pNome = mapPessoas.get(e.pessoa_id)?.nome;
        if (st === 'confirmado' || st === 'presente') {
          confirmadas++;
          if (pNome) {
            voluntarioCounts[pNome] = (voluntarioCounts[pNome] || 0) + 1;
          }
        } else if (st === 'falta_justificada' || st === 'ausente_justificado') {
          faltasJustificadas++;
        } else if (st === 'falta' || st === 'falta_injustificada' || st === 'ausente') {
          faltasInjustificadas++;
        } else if (st === 'recusado') {
          recusadas++;
        } else {
          pendentes++;
        }
      });

      const rankingVoluntarios = Object.entries(voluntarioCounts)
        .map(([nome, total]) => ({ nome, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);

      const minCounts = {};
      vinculos.forEach(v => {
        const mNome = mapMinisterios.get(v.ministerio_id)?.nome;
        if (mNome) {
          minCounts[mNome] = (minCounts[mNome] || 0) + 1;
        }
      });

      const rankingMinisterios = Object.entries(minCounts)
        .map(([nome, total]) => ({ nome, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);

      const liderCounts = {};
      vinculos.filter(v => v.lider === true).forEach(l => {
        const pNome = mapPessoas.get(l.pessoa_id)?.nome;
        if (pNome) {
          liderCounts[pNome] = (liderCounts[pNome] || 0) + 1;
        }
      });

      const rankingLideres = Object.entries(liderCounts)
        .map(([nome, total]) => ({ nome, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);

      return {
        totalMinisterios: ministerios.length,
        totalMembros: vinculos.length,
        totalFuncoes: funcoes.length,
        totalLideres: vinculos.filter(v => v.lider === true).length,
        escalasStats: { 
          confirmadas, 
          faltasJustificadas,
          faltasInjustificadas,
          recusadas, 
          pendentes, 
          total: escalas.length 
        },
        rankingVoluntarios,
        rankingMinisterios,
        rankingLideres
      };
    } catch (err) {
      console.error('Erro em obterDashboard:', err);
      return {
        totalMinisterios: 0,
        totalMembros: 0,
        totalFuncoes: 0,
        totalLideres: 0,
        escalasStats: { confirmadas: 0, faltasJustificadas: 0, faltasInjustificadas: 0, recusadas: 0, pendentes: 0, total: 0 },
        rankingVoluntarios: [],
        rankingMinisterios: [],
        rankingLideres: []
      };
    }
  },

  async listarFuncoes(ministerioId) {
    const { data, error } =
      await supabase
        .from('ministerio_funcoes')
        .select('*')
        .eq('ministerio_id', ministerioId)
        .order('ordem');

    if (error) throw error;

    return data;
  },

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
    try {
      // 1. Buscar tabelas em paralelo com queries diretas e sem joins relacionais frágeis
      const [
        resMinisterios,
        resMembros,
        resEscalas,
        resPessoas,
        resEventos,
        resFuncoes,
        resHistoricos
      ] = await Promise.allSettled([
        supabase.from('ministerios').select('*'),
        supabase.from('ministerio_membros').select('*'),
        supabase.from('escalas').select('*'),
        supabase.from('pessoas').select('id, nome, foto_url, cargo, telefone, email'),
        supabase.from('eventos_ministeriais').select('id, titulo, data_evento, local, fardamentos'),
        supabase.from('ministerio_funcoes').select('id, nome, ministerio_id'),
        supabase.from('historico_ministerial').select('id, ministerio_id, acao, criado_em')
      ]);

      const rawMinisterios = resMinisterios.status === 'fulfilled' && resMinisterios.value.data ? resMinisterios.value.data : [];
      const rawMembros = resMembros.status === 'fulfilled' && resMembros.value.data ? resMembros.value.data : [];
      const rawEscalas = resEscalas.status === 'fulfilled' && resEscalas.value.data ? resEscalas.value.data : [];
      const rawPessoas = resPessoas.status === 'fulfilled' && resPessoas.value.data ? resPessoas.value.data : [];
      const rawEventos = resEventos.status === 'fulfilled' && resEventos.value.data ? resEventos.value.data : [];
      const rawFuncoes = resFuncoes.status === 'fulfilled' && resFuncoes.value.data ? resFuncoes.value.data : [];
      const rawHistoricos = resHistoricos.status === 'fulfilled' && resHistoricos.value.data ? resHistoricos.value.data : [];

      // Mapeamentos rápidos por ID
      const mapPessoas = new Map(rawPessoas.map(p => [p.id, p]));
      const mapMinisterios = new Map(rawMinisterios.map(m => [m.id, m]));
      const mapEventos = new Map(rawEventos.map(e => [e.id, e]));
      const mapFuncoes = new Map(rawFuncoes.map(f => [f.id, f]));

      // Ministérios ativos (ou sem ativo === false)
      const ministerios = rawMinisterios.filter(m => m.ativo !== false);

      // Membros hidratados
      const membros = rawMembros
        .filter(m => m.ativo !== false)
        .map(m => {
          const pessoa = mapPessoas.get(m.pessoa_id) || { id: m.pessoa_id, nome: 'Voluntário' };
          const min = mapMinisterios.get(m.ministerio_id) || { id: m.ministerio_id, nome: 'Ministério' };
          return {
            ...m,
            pessoas: pessoa,
            ministerios: min
          };
        });

      // Escalas hidratadas com pessoas, eventos_ministeriais, ministerios e ministerio_funcoes
      const escalas = rawEscalas.map(e => {
        const pessoa = mapPessoas.get(e.pessoa_id) || { id: e.pessoa_id, nome: 'Voluntário' };
        const min = mapMinisterios.get(e.ministerio_id) || { id: e.ministerio_id, nome: 'Ministério' };
        const func = mapFuncoes.get(e.funcao_id) || { id: e.funcao_id, nome: 'Geral' };
        const evento = mapEventos.get(e.evento_id) || { id: e.evento_id, titulo: 'Culto/Evento' };

        return {
          ...e,
          pessoas: pessoa,
          ministerios: min,
          ministerio_funcoes: func,
          eventos_ministeriais: evento
        };
      });

      // Funções hidratadas
      const funcoes = rawFuncoes.map(f => ({
        ...f,
        ministerios: mapMinisterios.get(f.ministerio_id) || { id: f.ministerio_id, nome: 'Geral' }
      }));

      // Histórico de crescimento
      const historicos = rawHistoricos.filter(h => !h.acao || h.acao === 'ENTRADA_MINISTERIO');

      return {
        ministerios,
        membros,
        escalas,
        historicos,
        funcoes
      };
    } catch (err) {
      console.error('Erro em obterRelatoriosConsolidados:', err);
      return {
        ministerios: [],
        membros: [],
        escalas: [],
        historicos: [],
        funcoes: []
      };
    }
  }
};