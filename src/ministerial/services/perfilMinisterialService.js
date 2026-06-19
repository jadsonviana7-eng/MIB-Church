import { supabase } from '../../supabaseClient';

export const perfilMinisterialService = {
  async obterPessoa(pessoaId) {
    const { data, error } = await supabase
      .from('pessoas')
      .select('id, nome, cargo, foto_url, telefone')
      .eq('id', pessoaId)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async obterMinisterios(pessoaId) {
    const { data, error } = await supabase
      .from('ministerio_membros')
      .select(`
        id,
        funcao,
        lider,
        ministerios (
          id,
          nome
        )
      `)
      .eq('pessoa_id', pessoaId)
      .eq('ativo', true);
    if (error) throw error;
    return data;
  },

  async obterDisponibilidade(pessoaId) {
    const { data, error } = await supabase
      .from('disponibilidade_ministerial')
      .select('*')
      .eq('pessoa_id', pessoaId)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async salvarDisponibilidade(payload) {
    const { data, error } = await supabase
      .from('disponibilidade_ministerial')
      .upsert(payload, { onConflict: 'pessoa_id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};
