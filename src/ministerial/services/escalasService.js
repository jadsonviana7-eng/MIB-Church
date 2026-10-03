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
    if (!eventoId) return [];

    try {
      // 1. Tentativa com foreign keys explícitas
      const { data, error } = await supabase
        .from('escalas')
        .select(`
          *,
          pessoas:pessoa_id (
            id,
            nome,
            foto_url
          ),
          ministerios:ministerio_id (
            id,
            nome,
            fardamentos
          ),
          ministerio_funcoes:funcao_id (
            id,
            nome
          )
        `)
        .eq('evento_id', eventoId);

      if (!error && data) return data;
      if (error) throw error;
    } catch (err1) {
      console.warn('Tentando fallback 1 para listarEscalas:', err1?.message || err1);
      try {
        // 2. Tentativa com relações padrão
        const { data: data2, error: err2 } = await supabase
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

        if (!err2 && data2) return data2;
        if (err2) throw err2;
      } catch (err2) {
        console.warn('Tentando fallback 2 (busca direta sem joins) para listarEscalas:', err2?.message || err2);
        // 3. Fallback infalível: busca pura na tabela escalas com hidratação manual
        const { data: rawEscalas, error: err3 } = await supabase
          .from('escalas')
          .select('*')
          .eq('evento_id', eventoId);

        if (err3) {
          console.error('Erro final ao buscar tabela escalas:', err3);
          throw err3;
        }
        if (!rawEscalas || rawEscalas.length === 0) return [];

        const pessoaIds = [...new Set(rawEscalas.map(e => e.pessoa_id).filter(Boolean))];
        const ministerioIds = [...new Set(rawEscalas.map(e => e.ministerio_id).filter(Boolean))];
        const funcaoIds = [...new Set(rawEscalas.map(e => e.funcao_id).filter(Boolean))];

        const [resPessoas, resMin, resFunc] = await Promise.all([
          pessoaIds.length > 0 ? supabase.from('pessoas').select('id, nome, foto_url').in('id', pessoaIds) : { data: [] },
          ministerioIds.length > 0 ? supabase.from('ministerios').select('id, nome, fardamentos').in('id', ministerioIds) : { data: [] },
          funcaoIds.length > 0 ? supabase.from('ministerio_funcoes').select('id, nome').in('id', funcaoIds) : { data: [] }
        ]);

        const mapPessoas = new Map((resPessoas.data || []).map(p => [p.id, p]));
        const mapMin = new Map((resMin.data || []).map(m => [m.id, m]));
        const mapFunc = new Map((resFunc.data || []).map(f => [f.id, f]));

        return rawEscalas.map(e => ({
          ...e,
          pessoas: mapPessoas.get(e.pessoa_id) || { nome: 'Voluntário' },
          ministerios: mapMin.get(e.ministerio_id) || { nome: 'Ministério' },
          ministerio_funcoes: mapFunc.get(e.funcao_id) || { nome: 'Geral' }
        }));
      }
    }
  },

  async verificarConflitoEscala({ eventoId, pessoaId }) {
    if (!eventoId || !pessoaId) return { temConflito: false };

    try {
      const { data, error } = await supabase
        .from('escalas')
        .select(`
          id,
          ministerio_id,
          evento_id,
          pessoas:pessoa_id (
            nome
          ),
          ministerios:ministerio_id (
            nome
          ),
          eventos_ministeriais:evento_id (
            titulo
          )
        `)
        .eq('evento_id', eventoId)
        .eq('pessoa_id', pessoaId)
        .limit(1);

      if (!error && data && data.length > 0) {
        const e = data[0];
        return {
          temConflito: true,
          pessoaNome: e.pessoas?.nome || 'Esta pessoa',
          ministerioNome: e.ministerios?.nome || 'outro ministério',
          eventoTitulo: e.eventos_ministeriais?.titulo || 'este evento'
        };
      }
      return { temConflito: false };
    } catch (error) {
      console.warn('Erro ao verificar conflito de escala:', error);
      return { temConflito: false };
    }
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
    if (!ministerioId) return [];
    try {
      const { data, error } = await supabase
        .from('ministerio_funcoes')
        .select('*')
        .eq('ministerio_id', ministerioId)
        .order('ordem', { ascending: true });

      if (!error && data) {
        return data.sort((a, b) => {
          const ordA = a.ordem !== undefined && a.ordem !== null ? Number(a.ordem) : 999999;
          const ordB = b.ordem !== undefined && b.ordem !== null ? Number(b.ordem) : 999999;
          if (ordA !== ordB) return ordA - ordB;
          return (a.nome || '').localeCompare(b.nome || '');
        });
      }
      if (error) throw error;
    } catch (err) {
      const { data: data2, error: err2 } = await supabase
        .from('ministerio_funcoes')
        .select('*')
        .eq('ministerio_id', ministerioId);

      if (err2) throw err2;
      return (data2 || []).sort((a, b) => {
        const ordA = a.ordem !== undefined && a.ordem !== null ? Number(a.ordem) : 999999;
        const ordB = b.ordem !== undefined && b.ordem !== null ? Number(b.ordem) : 999999;
        if (ordA !== ordB) return ordA - ordB;
        return (a.nome || '').localeCompare(b.nome || '');
      });
    }
  },

  async atualizarStatusEscala(id, status, justificativa = null) {
    const payload = { status };
    if (justificativa !== undefined && justificativa !== null) {
      payload.justificativa = justificativa;
    }

    try {
      const { data, error } = await supabase
        .from('escalas')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (!error) return data;

      // Fallback se a coluna justificativa não existir no Postgres
      if (error && (error.code === 'PGRST204' || error.message?.includes('justificativa') || error.code === '42703')) {
        const { data: dataFallback, error: errFallback } = await supabase
          .from('escalas')
          .update({ status })
          .eq('id', id)
          .select()
          .single();
        if (errFallback) throw errFallback;
        return dataFallback;
      }
      throw error;
    } catch (err) {
      if (err.message?.includes('justificativa') || err.code === '42703') {
        const { data: dataFallback, error: errFallback } = await supabase
          .from('escalas')
          .update({ status })
          .eq('id', id)
          .select()
          .single();
        if (errFallback) throw errFallback;
        return dataFallback;
      }
      throw err;
    }
  },

  async listarEscalasMembro(pessoaId) {
    if (!pessoaId) return [];

    try {
      const { data, error } = await supabase
        .from('escalas')
        .select(`
          *,
          eventos_ministeriais:evento_id (
            id,
            titulo,
            local,
            data_evento
          ),
          ministerios:ministerio_id (
            nome
          ),
          ministerio_funcoes:funcao_id (
            nome
          )
        `)
        .eq('pessoa_id', pessoaId)
        .order('created_at', { ascending: false });

      if (!error && data) return data;
      if (error) throw error;
    } catch (err1) {
      try {
        const { data: data2, error: err2 } = await supabase
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

        if (!err2 && data2) return data2;
        if (err2) throw err2;
      } catch (err2) {
        const { data: rawEscalas, error: err3 } = await supabase
          .from('escalas')
          .select('*')
          .eq('pessoa_id', pessoaId);

        if (err3) throw err3;
        if (!rawEscalas || rawEscalas.length === 0) return [];

        const evIds = [...new Set(rawEscalas.map(e => e.evento_id).filter(Boolean))];
        const minIds = [...new Set(rawEscalas.map(e => e.ministerio_id).filter(Boolean))];
        const funcIds = [...new Set(rawEscalas.map(e => e.funcao_id).filter(Boolean))];

        const [resEv, resMin, resFunc] = await Promise.all([
          evIds.length > 0 ? supabase.from('eventos_ministeriais').select('id, titulo, local, data_evento').in('id', evIds) : { data: [] },
          minIds.length > 0 ? supabase.from('ministerios').select('id, nome').in('id', minIds) : { data: [] },
          funcIds.length > 0 ? supabase.from('ministerio_funcoes').select('id, nome').in('id', funcIds) : { data: [] }
        ]);

        const mapEv = new Map((resEv.data || []).map(ev => [ev.id, ev]));
        const mapMin = new Map((resMin.data || []).map(m => [m.id, m]));
        const mapFunc = new Map((resFunc.data || []).map(f => [f.id, f]));

        return rawEscalas.map(e => ({
          ...e,
          eventos_ministeriais: mapEv.get(e.evento_id) || { titulo: 'Culto/Evento', data_evento: '' },
          ministerios: mapMin.get(e.ministerio_id) || { nome: 'Ministério' },
          ministerio_funcoes: mapFunc.get(e.funcao_id) || { nome: 'Geral' }
        }));
      }
    }
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
