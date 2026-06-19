import { supabase } from '../../supabaseClient';

export const historicoMinisterialService = {

  async registrar({
    pessoaId,
    ministerioId,
    acao,
    detalhes
  }) {

    const { error } = await supabase
      .from('historico_ministerial')
      .insert({
        pessoa_id: pessoaId,
        ministerio_id: ministerioId,
        acao,
        detalhes
      });

    if (error) throw error;
  },

  async listarPessoa(pessoaId) {

    const { data, error } = await supabase
      .from('historico_ministerial')
      .select(`
        *,
        ministerios (
          nome
        )
      `)
      .eq('pessoa_id', pessoaId)
      .order('criado_em', {
        ascending: false
      });

    if (error) throw error;

    return data;
  }
};