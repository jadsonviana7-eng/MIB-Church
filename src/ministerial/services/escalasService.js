import { supabase } from '../../supabaseClient';

export const isMinisterioManutencao = (nome) => {
  if (!nome) return false;
  const n = String(nome).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  return n.includes('manutencao') || n.includes('manutenc') || n.includes('obras') || n.includes('patrimonio');
};

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
            foto_url,
            telefone
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
              id,
              nome,
              telefone
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
          pessoaIds.length > 0 ? supabase.from('pessoas').select('id, nome, foto_url, telefone').in('id', pessoaIds) : { data: [] },
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

  async obterEscalaPublica(escalaId) {
    if (!escalaId) return null;

    try {
      // 1. Busca direta na tabela escalas
      const { data: escalasData, error: errEscalas } = await supabase
        .from('escalas')
        .select('*')
        .eq('id', escalaId)
        .limit(1);

      if (errEscalas) {
        console.warn('Erro ao consultar tabela escalas:', errEscalas);
      }

      const esc = (escalasData && escalasData.length > 0) ? escalasData[0] : null;
      if (!esc) {
        throw new Error('Escala não encontrada no sistema ou link expirado.');
      }

      // 2. Carregar entidades relacionadas de forma segura e paralela sem .single()
      const [resEvento, resPessoa, resMin, resFunc] = await Promise.all([
        esc.evento_id 
          ? supabase.from('eventos_ministeriais').select('*').eq('id', esc.evento_id).limit(1)
          : Promise.resolve({ data: [] }),
        esc.pessoa_id 
          ? supabase.from('pessoas').select('id, nome, foto_url, telefone').eq('id', esc.pessoa_id).limit(1)
          : Promise.resolve({ data: [] }),
        esc.ministerio_id 
          ? supabase.from('ministerios').select('id, nome, icone, cor_principal, fardamentos').eq('id', esc.ministerio_id).limit(1)
          : Promise.resolve({ data: [] }),
        esc.funcao_id 
          ? supabase.from('ministerio_funcoes').select('id, nome').eq('id', esc.funcao_id).limit(1)
          : Promise.resolve({ data: [] })
      ]);

      const evento = (resEvento.data && resEvento.data.length > 0) ? resEvento.data[0] : null;
      const pessoa = (resPessoa.data && resPessoa.data.length > 0) ? resPessoa.data[0] : { nome: 'Voluntário' };
      const ministerio = (resMin.data && resMin.data.length > 0) ? resMin.data[0] : { nome: 'Ministério' };
      const funcao = (resFunc.data && resFunc.data.length > 0) ? resFunc.data[0] : { nome: 'Função' };

      return {
        ...esc,
        eventos_ministeriais: evento,
        pessoas: pessoa,
        ministerios: ministerio,
        ministerio_funcoes: funcao
      };
    } catch (error) {
      console.error('Erro em obterEscalaPublica:', error);
      throw error;
    }
  },

  async obterEscalasPublicasDoMes({ escalaId, pessoaId, mes, ano }) {
    try {
      let targetPessoaId = pessoaId || null;
      let targetMes = (mes !== undefined && mes !== null && mes !== '') ? Number(mes) : null;
      let targetAno = (ano !== undefined && ano !== null && ano !== '') ? Number(ano) : null;
      let escalaInicial = null;

      // Se foi fornecido escalaId, busca a escala correspondente para identificar a pessoa e data
      if (escalaId) {
        const { data: escData, error: errEsc } = await supabase
          .from('escalas')
          .select('*')
          .eq('id', escalaId)
          .limit(1);

        if (!errEsc && escData && escData.length > 0) {
          escalaInicial = escData[0];
          targetPessoaId = escalaInicial.pessoa_id || targetPessoaId;

          if (escalaInicial.evento_id && (targetMes === null || targetAno === null)) {
            const { data: evData } = await supabase
              .from('eventos_ministeriais')
              .select('data_evento')
              .eq('id', escalaInicial.evento_id)
              .limit(1);

            if (evData && evData.length > 0 && evData[0].data_evento) {
              const d = new Date(evData[0].data_evento);
              // Fuso Brasília UTC-3
              const bDate = new Date(d.getTime() - 3 * 3600 * 1000);
              if (targetMes === null) targetMes = bDate.getUTCMonth();
              if (targetAno === null) targetAno = bDate.getUTCFullYear();
            }
          }
        }
      }

      if (!targetPessoaId && !escalaInicial) {
        throw new Error('Link de confirmação inválido ou escala não encontrada.');
      }

      // Se não definiu mês/ano, adota o mês atual
      if (targetMes === null || targetAno === null) {
        const agora = new Date();
        if (targetMes === null) targetMes = agora.getMonth();
        if (targetAno === null) targetAno = agora.getFullYear();
      }

      // Intervalo do mês em ISO UTC
      const dataInicioMes = new Date(Date.UTC(targetAno, targetMes, 1, 0, 0, 0)).toISOString();
      const dataFimMes = new Date(Date.UTC(targetAno, targetMes + 1, 0, 23, 59, 59, 999)).toISOString();

      // 1. Buscar todos os eventos do mês
      const { data: eventosMes, error: errEventos } = await supabase
        .from('eventos_ministeriais')
        .select('*')
        .gte('data_evento', dataInicioMes)
        .lte('data_evento', dataFimMes)
        .order('data_evento', { ascending: true });

      if (errEventos) {
        console.warn('Erro ao consultar eventos do mês:', errEventos);
      }

      const mapaEventos = new Map((eventosMes || []).map(e => [e.id, e]));
      const eventoIds = (eventosMes || []).map(e => e.id);

      // Adiciona o evento da escala inicial se estiver fora do range
      if (escalaInicial?.evento_id && !mapaEventos.has(escalaInicial.evento_id)) {
        eventoIds.push(escalaInicial.evento_id);
      }

      // 2. Buscar todas as escalas da pessoa nesses eventos
      let rawEscalas = [];
      if (targetPessoaId && eventoIds.length > 0) {
        const { data: escMes, error: errEscMes } = await supabase
          .from('escalas')
          .select('*')
          .eq('pessoa_id', targetPessoaId)
          .in('evento_id', eventoIds);

        if (!errEscMes && escMes) {
          rawEscalas = escMes;
        }
      }

      // Garante que a escalaInicial esteja presente
      if (escalaInicial && !rawEscalas.some(e => e.id === escalaInicial.id)) {
        rawEscalas.push(escalaInicial);
      }

      if (rawEscalas.length === 0) {
        throw new Error('Nenhuma escala encontrada para este voluntário neste período.');
      }

      // 3. Buscar entidades relacionadas em lote
      const pessoaIds = [...new Set(rawEscalas.map(e => e.pessoa_id).filter(Boolean))];
      const ministerioIds = [...new Set(rawEscalas.map(e => e.ministerio_id).filter(Boolean))];
      const funcaoIds = [...new Set(rawEscalas.map(e => e.funcao_id).filter(Boolean))];
      const missingEventoIds = rawEscalas.map(e => e.evento_id).filter(id => id && !mapaEventos.has(id));

      const [resPessoas, resMin, resFunc, resMissingEvents] = await Promise.all([
        pessoaIds.length > 0 ? supabase.from('pessoas').select('id, nome, foto_url, telefone').in('id', pessoaIds) : { data: [] },
        ministerioIds.length > 0 ? supabase.from('ministerios').select('id, nome, icone, cor_principal, fardamentos').in('id', ministerioIds) : { data: [] },
        funcaoIds.length > 0 ? supabase.from('ministerio_funcoes').select('id, nome').in('id', funcaoIds) : { data: [] },
        missingEventoIds.length > 0 ? supabase.from('eventos_ministeriais').select('*').in('id', missingEventoIds) : { data: [] }
      ]);

      (resMissingEvents.data || []).forEach(ev => mapaEventos.set(ev.id, ev));

      const mapPessoas = new Map((resPessoas.data || []).map(p => [p.id, p]));
      const mapMin = new Map((resMin.data || []).map(m => [m.id, m]));
      const mapFunc = new Map((resFunc.data || []).map(f => [f.id, f]));

      const pessoa = (targetPessoaId && mapPessoas.get(targetPessoaId)) || (resPessoas.data?.[0]) || { nome: 'Voluntário' };

      const escalasFormatadas = rawEscalas.map(esc => {
        const ev = mapaEventos.get(esc.evento_id) || null;
        return {
          ...esc,
          eventos_ministeriais: ev,
          pessoas: mapPessoas.get(esc.pessoa_id) || pessoa,
          ministerios: mapMin.get(esc.ministerio_id) || { nome: 'Ministério' },
          ministerio_funcoes: mapFunc.get(esc.funcao_id) || { nome: 'Função' }
        };
      });

      // Ordena cronologicamente pela data do evento
      escalasFormatadas.sort((a, b) => {
        const tA = a.eventos_ministeriais?.data_evento ? new Date(a.eventos_ministeriais.data_evento).getTime() : 0;
        const tB = b.eventos_ministeriais?.data_evento ? new Date(b.eventos_ministeriais.data_evento).getTime() : 0;
        return tA - tB;
      });

      const nomesMeses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];

      return {
        pessoa,
        mesInfo: {
          mesIndex: targetMes,
          ano: targetAno,
          mesNome: nomesMeses[targetMes] || 'Mês'
        },
        escalas: escalasFormatadas
      };
    } catch (error) {
      console.error('Erro em obterEscalasPublicasDoMes:', error);
      throw error;
    }
  },

  async atualizarStatusMultiplasEscalas(escalaIds, status, justificativa = null) {
    if (!escalaIds || escalaIds.length === 0) return [];
    const payload = { status };
    if (justificativa !== undefined && justificativa !== null) {
      payload.justificativa = justificativa;
    }

    try {
      const { data, error } = await supabase
        .from('escalas')
        .update(payload)
        .in('id', escalaIds)
        .select();

      if (!error) return data || [];

      // Fallback se justificativa falhar por ausência de coluna
      const { data: dataFallback, error: errFallback } = await supabase
        .from('escalas')
        .update({ status })
        .in('id', escalaIds)
        .select();

      if (errFallback) throw errFallback;
      return dataFallback || [];
    } catch (error) {
      console.error('Erro em atualizarStatusMultiplasEscalas:', error);
      throw error;
    }
  },

  async verificarConflitoEscala({ eventoId, pessoaId, ministerioId, escalaIdIgnorar }) {
    if (!eventoId || !pessoaId) return { temConflito: false };

    try {
      // 1. Se o ministério de destino for Manutenção, não gera conflito com nada
      if (ministerioId) {
        const { data: minDestino } = await supabase
          .from('ministerios')
          .select('nome')
          .eq('id', ministerioId)
          .single();

        if (minDestino && isMinisterioManutencao(minDestino.nome)) {
          return { temConflito: false };
        }
      }

      // 2. Busca as escalas existentes da pessoa neste evento
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
        .eq('pessoa_id', pessoaId);

      if (!error && data && data.length > 0) {
        // Filtra para remover:
        // - A própria escala atual (ao editar)
        // - Escalas do ministério de Manutenção (pois ocorrem fora do horário dos cultos/eventos)
        const conflitosReais = data.filter(e => {
          if (escalaIdIgnorar && String(e.id) === String(escalaIdIgnorar)) return false;
          if (isMinisterioManutencao(e.ministerios?.nome)) return false;
          return true;
        });

        if (conflitosReais.length > 0) {
          const e = conflitosReais[0];
          return {
            temConflito: true,
            pessoaNome: e.pessoas?.nome || 'Esta pessoa',
            ministerioNome: e.ministerios?.nome || 'outro ministério',
            eventoTitulo: e.eventos_ministeriais?.titulo || 'este evento'
          };
        }
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
        pessoaId: payload.pessoa_id,
        ministerioId: payload.ministerio_id
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
        .select();

      if (!error) return (data && data[0]) ? data[0] : { id, ...payload };

      // Fallback se a coluna justificativa não existir no Postgres
      if (error && (error.code === 'PGRST204' || error.message?.includes('justificativa') || error.code === '42703')) {
        const { data: dataFallback, error: errFallback } = await supabase
          .from('escalas')
          .update({ status })
          .eq('id', id)
          .select();
        if (errFallback) throw errFallback;
        return (dataFallback && dataFallback[0]) ? dataFallback[0] : { id, status };
      }
      throw error;
    } catch (err) {
      if (err.message?.includes('justificativa') || err.code === '42703') {
        const { data: dataFallback, error: errFallback } = await supabase
          .from('escalas')
          .update({ status })
          .eq('id', id)
          .select();
        if (errFallback) throw errFallback;
        return (dataFallback && dataFallback[0]) ? dataFallback[0] : { id, status };
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
    if (!eventoIds || eventoIds.length === 0 || !ministerioId) return [];

    try {
      // 1. Tentativa com foreign keys explícitas
      const { data, error } = await supabase
        .from('escalas')
        .select(`
          *,
          pessoas:pessoa_id (
            id,
            nome,
            foto_url,
            telefone
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
        .in('evento_id', eventoIds)
        .eq('ministerio_id', ministerioId);

      if (!error && data) return data;
      if (error) throw error;
    } catch (err1) {
      console.warn('Tentando fallback 1 para listarEscalasMes:', err1?.message || err1);
      try {
        // 2. Tentativa com relações padrão
        const { data: data2, error: err2 } = await supabase
          .from('escalas')
          .select(`
            *,
            pessoas (
              id,
              nome,
              telefone
            ),
            ministerios (
              id,
              nome,
              fardamentos
            ),
            ministerio_funcoes (
              id,
              nome
            )
          `)
          .in('evento_id', eventoIds)
          .eq('ministerio_id', ministerioId);

        if (!err2 && data2) return data2;
        if (err2) throw err2;
      } catch (err2) {
        console.warn('Tentando fallback 2 (hidratação manual) para listarEscalasMes:', err2?.message || err2);
        // 3. Fallback infalível: busca pura na tabela escalas com hidratação manual
        const { data: rawEscalas, error: err3 } = await supabase
          .from('escalas')
          .select('*')
          .in('evento_id', eventoIds)
          .eq('ministerio_id', ministerioId);

        if (err3) {
          console.error('Erro final ao buscar escalas do mês:', err3);
          throw err3;
        }
        if (!rawEscalas || rawEscalas.length === 0) return [];

        const pessoaIds = [...new Set(rawEscalas.map(e => e.pessoa_id).filter(Boolean))];
        const ministerioIds = [...new Set(rawEscalas.map(e => e.ministerio_id).filter(Boolean))];
        const funcaoIds = [...new Set(rawEscalas.map(e => e.funcao_id).filter(Boolean))];

        const [resPessoas, resMin, resFunc] = await Promise.all([
          pessoaIds.length > 0 ? supabase.from('pessoas').select('id, nome, foto_url, telefone').in('id', pessoaIds) : { data: [] },
          ministerioIds.length > 0 ? supabase.from('ministerios').select('id, nome, fardamentos').in('id', ministerioIds) : { data: [] },
          funcaoIds.length > 0 ? supabase.from('ministerio_funcoes').select('id, nome').in('id', funcaoIds) : { data: [] }
        ]);

        const mapPessoas = new Map((resPessoas.data || []).map(p => [String(p.id), p]));
        const mapMin = new Map((resMin.data || []).map(m => [String(m.id), m]));
        const mapFunc = new Map((resFunc.data || []).map(f => [String(f.id), f]));

        return rawEscalas.map(e => ({
          ...e,
          pessoas: mapPessoas.get(String(e.pessoa_id)) || { nome: 'Voluntário' },
          ministerios: mapMin.get(String(e.ministerio_id)) || { nome: 'Ministério' },
          ministerio_funcoes: mapFunc.get(String(e.funcao_id)) || { nome: 'Geral' }
        }));
      }
    }
  }
}
