import { supabase } from '../../supabaseClient';

export const escalasService = {

  async listarEventos() {
    const { data, error } = await supabase
      .from('eventos_ministeriais')
      .select('*')
      .order('data_evento');

    if (error) throw error;
    return data;
  },

  async criarEvento(payload) {
    const { data, error } = await supabase
      .from('eventos_ministeriais')
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async criarEventosEmLote(payloads) {
    const { data, error } = await supabase
      .from('eventos_ministeriais')
      .insert(payloads)
      .select();

    if (error) throw error;
    return data;
  },

  async excluirEvento(id) {
    const { error } = await supabase
      .from('eventos_ministeriais')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async atualizarEvento(id, payload) {
    const { data, error } = await supabase
      .from('eventos_ministeriais')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async listarEscalas(eventoId) {
    const { data, error } = await supabase
      .from('escalas')
      .select(`
        *,
        pessoas (
          nome
        ),
        ministerios (
          nome,
          fardamentos
        ),
        ministerio_funcoes (
          nome
        )
      `)
      .eq('evento_id', eventoId);

    if (error) throw error;
    return data;
  },

  async verificarConflitoEscala({ eventoId, pessoaId }) {
    if (!eventoId || !pessoaId) return { temConflito: false };

    const { data, error } = await supabase
      .from('escalas')
      .select(`
        id,
        ministerio_id,
        evento_id,
        pessoas (
          nome
        ),
        ministerios (
          nome
        ),
        eventos_ministeriais (
          titulo
        )
      `)
      .eq('evento_id', eventoId)
      .eq('pessoa_id', pessoaId)
      .limit(1);

    if (error) {
      console.warn('Erro ao verificar conflito de escala:', error);
      return { temConflito: false };
    }

    if (data && data.length > 0) {
      const e = data[0];
      return {
        temConflito: true,
        pessoaNome: e.pessoas?.nome || 'Esta pessoa',
        ministerioNome: e.ministerios?.nome || 'outro ministério',
        eventoTitulo: e.eventos_ministeriais?.titulo || 'este evento'
      };
    }

    return { temConflito: false };
  },

  async adicionarEscala(payload) {
    if (payload.evento_id && payload.pessoa_id) {
      const conflito = await this.verificarConflitoEscala({
        eventoId: payload.evento_id,
        pessoaId: payload.pessoa_id
      });
      if (conflito && conflito.temConflito) {
        const err = new Error(`ESTA_PESSOA_JA_ESCALADA::${conflito.pessoaNome}::${conflito.ministerioNome}::${conflito.eventoTitulo}`);
        err.conflito = conflito;
        throw err;
      }
    }

    const { error } = await supabase
      .from('escalas')
      .insert(payload);

    if (error) throw error;
  },

  async excluirEscala(id) {
    const { error } = await supabase
      .from('escalas')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async listarMinisterios() {
    const { data, error } = await supabase
      .from('ministerios')
      .select('*')
      .order('nome');

    if (error) throw error;
    return data;
  },

  async listarPessoasMinisterio(ministerioId) {
    const { data, error } = await supabase
      .from('ministerio_membros')
      .select(`
        *,
        pessoas (
          id,
          nome
        )
      `)
      .eq('ministerio_id', ministerioId);

    if (error) throw error;
    return data;
  },

  async listarFuncoes(ministerioId) {
    const { data, error } = await supabase
      .from('ministerio_funcoes')
      .select('*')
      .eq('ministerio_id', ministerioId);

    if (error) throw error;
    return data;
  },

  async atualizarStatusEscala(id, status) {
    const { data, error } = await supabase
      .from('escalas')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async listarEscalasMembro(pessoaId) {
    const { data, error } = await supabase
      .from('escalas')
      .select(`
        *,
        eventos_ministeriais (
          id,
          titulo,
          local,
          data_evento
        ),
        ministerios (
          nome
        ),
        ministerio_funcoes (
          nome
        )
      `)
      .eq('pessoa_id', pessoaId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async obterBloqueiosMembro(pessoaId) {
    const { data, error } = await supabase
      .from('bloqueios_escala')
      .select('*')
      .eq('pessoa_id', pessoaId)
      .order('data_inicio');
    
    if (error) {
      // Se a tabela ainda não existir no Supabase, retornamos um array vazio e tratamos de forma silenciosa
      if (error.code === 'PGRST204' || error.message.includes('relation "bloqueios_escala" does not exist')) {
        return [];
      }
      throw error;
    }
    return data;
  },

  async salvarBloqueiosMembro(pessoaId, bloqueios) {
    const { error: delError } = await supabase
      .from('bloqueios_escala')
      .delete()
      .eq('pessoa_id', pessoaId);
    
    if (delError) {
      if (delError.code === 'PGRST204' || delError.message.includes('relation "bloqueios_escala" does not exist')) {
        // Tabela inexistente, ignora sem quebrar o sistema
        return;
      }
      throw delError;
    }

    if (bloqueios && bloqueios.length > 0) {
      const payloads = bloqueios.map(b => ({
        pessoa_id: pessoaId,
        data_inicio: b.data_inicio,
        data_fim: b.data_fim,
        justificativa: b.justificativa
      }));
      const { error: insError } = await supabase
        .from('bloqueios_escala')
        .insert(payloads);
      
      if (insError) throw insError;
    }
  },

  async listarEscalasMes(eventoIds, ministerioId) {
    const { data, error } = await supabase
      .from('escalas')
      .select(`
        *,
        pessoas (
          nome
        ),
        ministerios (
          nome
        ),
        ministerio_funcoes (
          nome
        )
      `)
      .in('evento_id', eventoIds)
      .eq('ministerio_id', ministerioId);

    if (error) throw error;
    return data;
  }
}
