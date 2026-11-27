import { supabase } from './supabaseClient';
import { repertorioService } from './services/repertorioService';

// Cache em memória compartilhado entre as páginas do Módulo Utilitários
// Garante abertura instantânea (stale-while-revalidate) ao alternar entre ferramentas.
export const utilitariosCache = {
  repertorio: null,
  muralOracao: null,
  visitantes: null,
  zonas: null,
  pedidoOracaoPorEmail: {},
  dadosIgreja: null
};

let prefetchUtilitariosEmAndamento = false;

export function prefetchModuloUtilitarios(emailUsuario = null) {
  if (prefetchUtilitariosEmAndamento) return;
  prefetchUtilitariosEmAndamento = true;

  const tarefas = [
    Promise.all([
      repertorioService.listarMusicas(),
      repertorioService.listarEventosMinisteriais(),
      repertorioService.listarTodosRepertorios(),
      repertorioService.calcularEstatisticasMusicas(),
      repertorioService.verificarConexaoBanco(),
      repertorioService.listarBibliotecas()
    ])
      .then(([musicas, eventos, mapaRepertorios, estatisticas, statusBanco, bibliotecas]) => {
        utilitariosCache.repertorio = {
          musicas: musicas || [],
          eventos: eventos || [],
          mapaRepertorios: mapaRepertorios || {},
          estatisticas: estatisticas || null,
          statusBanco: statusBanco || null,
          bibliotecas: bibliotecas || []
        };
      })
      .catch(() => {}),

    supabase
      .from('pedidos_oracao')
      .select(`
        *,
        pessoas(
          nome,
          foto_url,
          celula_id,
          celulas(nome)
        )
      `)
      .order('urgente', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) utilitariosCache.muralOracao = data;
      })
      .catch(() => {}),

    supabase
      .from('zonas_moradia')
      .select('id, nome')
      .order('nome')
      .then(({ data, error }) => {
        if (!error && data) utilitariosCache.zonas = data;
      })
      .catch(() => {}),

    supabase
      .from('visitantes_culto')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) utilitariosCache.visitantes = data;
      })
      .catch(() => {}),

    supabase
      .from('dados_igreja')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) utilitariosCache.dadosIgreja = data;
      })
      .catch(() => {})
  ];

  if (emailUsuario) {
    tarefas.push(
      supabase
        .from('pessoas')
        .select('id, nome, celula_id, foto_url')
        .eq('email', emailUsuario)
        .single()
        .then(async ({ data: p }) => {
          if (!p) return;
          const { data: h } = await supabase
            .from('pedidos_oracao')
            .select('*')
            .eq('pessoa_id', p.id)
            .order('created_at', { ascending: false })
            .limit(5);
          utilitariosCache.pedidoOracaoPorEmail[emailUsuario] = {
            membro: p,
            historico: h || []
          };
        })
        .catch(() => {})
    );
  }

  Promise.all(tarefas).finally(() => {
    prefetchUtilitariosEmAndamento = false;
  });
}
