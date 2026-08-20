import { supabase } from '../../supabaseClient';

export const autoEscalaService = {
  /**
   * Retorna apenas as sugestões de autoescala sem persistir no banco.
   */
  async obterSugestoes({ eventoId, ministerioId }) {
    // 1. Obter informações do evento para identificar o dia da semana
    const { data: evento, error: errEvento } = await supabase
      .from('eventos_ministeriais')
      .select('*')
      .eq('id', eventoId)
      .single();

    if (errEvento || !evento) throw new Error('Evento não encontrado');

    const dataEvento = new Date(evento.data_evento);
    const diaSemanaIndex = dataEvento.getDay();
    const colunasDias = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    const diaColuna = colunasDias[diaSemanaIndex];

    // 2. Obter as funções registradas para este ministério
    const { data: funcoes, error: errFuncoes } = await supabase
      .from('ministerio_funcoes')
      .select('*')
      .eq('ministerio_id', ministerioId)
      .order('ordem');

    if (errFuncoes) throw errFuncoes;
    if (!funcoes || funcoes.length === 0) {
      throw new Error('Nenhuma função cadastrada para este ministério. Cadastre funções antes de escalar.');
    }

    // 3. Obter membros vinculados ao ministério
    const { data: membros, error: errMembros } = await supabase
      .from('ministerio_membros')
      .select(`
        id,
        pessoa_id,
        funcao,
        lider,
        pessoas (
          id,
          nome,
          status
        )
      `)
      .eq('ministerio_id', ministerioId)
      .eq('ativo', true);

    if (errMembros) throw errMembros;
    
    // Filtrar apenas pessoas com status ativo no sistema
    const membrosAtivos = (membros || []).filter(m => m.pessoas && m.pessoas.status === 'ativo');
    if (membrosAtivos.length === 0) {
      throw new Error('Nenhum membro ativo vinculado a este ministério.');
    }

    // 4. Obter a disponibilidade de todos os membros do ministério
    const pessoaIds = membrosAtivos.map(m => m.pessoa_id);
    const { data: disponibilidades, error: errDisp } = await supabase
      .from('disponibilidade_ministerial')
      .select('*')
      .in('pessoa_id', pessoaIds);

    if (errDisp) throw errDisp;
    const mapaDisponibilidade = {};
    (disponibilidades || []).forEach(d => {
      mapaDisponibilidade[d.pessoa_id] = d[diaColuna];
    });

    // 4.5 Obter os bloqueios ativos para a data do evento
    const blockedPessoas = new Set();
    try {
      const { data: bloqueios, error: errBloqueios } = await supabase
        .from('bloqueios_escala')
        .select('*')
        .in('pessoa_id', pessoaIds);
      
      if (!errBloqueios && bloqueios) {
        const dataEventoObj = new Date(evento.data_evento);
        bloqueios.forEach(b => {
          const inicio = new Date(b.data_inicio);
          const fim = new Date(b.data_fim);
          if (dataEventoObj >= inicio && dataEventoObj <= fim) {
            blockedPessoas.add(b.pessoa_id);
          }
        });
      }
    } catch (e) {
      console.warn('Erro ao obter bloqueios, ignorando:', e);
    }

    // 5. Obter escalas já existentes para este evento
    const { data: escalasEvento, error: errEscalasEv } = await supabase
      .from('escalas')
      .select('pessoa_id')
      .eq('evento_id', eventoId);

    if (errEscalasEv) throw errEscalasEv;
    const pessoasJaEscaladasNoEvento = new Set(
      (escalasEvento || []).map(e => e.pessoa_id).filter(Boolean)
    );

    // 6. Obter histórico
    const { data: historicoEscalas, error: errHist } = await supabase
      .from('escalas')
      .select('pessoa_id, created_at, status')
      .eq('ministerio_id', ministerioId)
      .order('created_at', { ascending: false });

    if (errHist) throw errHist;
    const participacoesPorPessoa = {};
    const ultimaParticipacaoPorPessoa = {};

    (historicoEscalas || []).forEach(e => {
      if (!e.pessoa_id) return;
      participacoesPorPessoa[e.pessoa_id] = (participacoesPorPessoa[e.pessoa_id] || 0) + 1;
      if (!ultimaParticipacaoPorPessoa[e.pessoa_id]) {
        ultimaParticipacaoPorPessoa[e.pessoa_id] = new Date(e.created_at).getTime();
      }
    });

    // 7. Preparar elegíveis
    const candidatosFiltradosPorBloqueio = membrosAtivos.filter(m => !blockedPessoas.has(m.pessoa_id));

    const voluntariosElegiveis = candidatosFiltradosPorBloqueio.map(m => {
      const pessoaId = m.pessoa_id;
      const disponivel = mapaDisponibilidade[pessoaId] !== false;
      const jaEscalado = pessoasJaEscaladasNoEvento.has(pessoaId);
      const totalServido = participacoesPorPessoa[pessoaId] || 0;
      const ultimaVezServida = ultimaParticipacaoPorPessoa[pessoaId] || 0;

      return {
        membro: m,
        pessoaId,
        nome: m.pessoas.nome,
        disponivel,
        jaEscalado,
        totalServido,
        ultimaVezServida
      };
    });

    // 8. Distribuir voluntários
    const novasEscalas = [];
    const pessoasSelecionadasNestaAutoEscala = new Set();

    for (const funcao of funcoes) {
      let candidatos = voluntariosElegiveis.filter(v => {
        const funcoesDoMembro = v.membro.funcao ? v.membro.funcao.split(',').map(s => s.trim().toLowerCase()) : [];
        const apto = funcoesDoMembro.length === 0 || funcoesDoMembro.includes(funcao.nome.toLowerCase());
        return apto && 
          v.disponivel && 
          !v.jaEscalado && 
          !pessoasSelecionadasNestaAutoEscala.has(v.pessoaId);
      });

      if (candidatos.length === 0) {
        continue;
      }

      candidatos.sort((a, b) => {
        if (a.ultimaVezServida !== b.ultimaVezServida) {
          return a.ultimaVezServida - b.ultimaVezServida; 
        }
        return a.totalServido - b.totalServido;
      });

      const escolhido = candidatos[0];
      pessoasSelecionadasNestaAutoEscala.add(escolhido.pessoaId);

      novasEscalas.push({
        evento_id: eventoId,
        ministerio_id: ministerioId,
        funcao_id: funcao.id,
        pessoa_id: escolhido.pessoaId,
        status: 'pendente'
      });
    }

    return novasEscalas;
  },

  /**
   * Executa a autoescala inteligente e salva diretamente no banco.
   */
  async gerarEscala({ eventoId, ministerioId }) {
    const novasEscalas = await this.obterSugestoes({ eventoId, ministerioId });

    if (novasEscalas.length > 0) {
      const { data, error: errInsert } = await supabase
        .from('escalas')
        .insert(novasEscalas)
        .select();

      if (errInsert) throw errInsert;
      
      for (const esc of novasEscalas) {
        try {
          await supabase
            .from('historico_ministerial')
            .insert({
              pessoa_id: esc.pessoa_id,
              ministerio_id: esc.ministerio_id,
              acao: 'PARTICIPACAO_ESCALA',
              detalhes: `Escalado automaticamente para a função no evento.`
            });
        } catch (e) {
          console.error('Erro ao salvar no histórico:', e);
        }
      }

      return data;
    }

    return [];
  }
};