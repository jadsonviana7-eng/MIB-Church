import { supabase } from '../supabaseClient';
import { ministeriosService } from './services/ministeriosService';
import { escalasService } from './services/escalasService';

function lerCacheSessao(chave) {
  try {
    const raw = sessionStorage.getItem(chave);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function salvarCacheMinisterios(lista) {
  const dados = lista || [];
  ministerialCache.ministerios = dados;
  try {
    sessionStorage.setItem('mib_cache_ministerios', JSON.stringify(dados));
  } catch {
    // ignore quota errors
  }
}

// Cache em memória compartilhado entre todas as páginas do Módulo Ministerial
// Permite abertura instantânea (stale-while-revalidate) ao alternar entre abas.
export const ministerialCache = {
  dashboard: null,
  consolidados: null,
  ministerios: lerCacheSessao('mib_cache_ministerios'),
  detalhesPorMinisterio: {},
  eventos: null,
  escalasPorEvento: {},
  minhasEscalasPorMembro: {},
  todasPessoas: null,
  historicoPorAcao: {}
};

let prefetchEmAndamento = false;

export function prefetchModuloMinisterial(membroId = null) {
  if (prefetchEmAndamento) return;
  prefetchEmAndamento = true;

  const tarefas = [
    ministeriosService.obterDashboard()
      .then((res) => { if (res) ministerialCache.dashboard = res; })
      .catch(() => {}),
    ministeriosService.obterRelatoriosConsolidados()
      .then((res) => { if (res) ministerialCache.consolidados = res; })
      .catch(() => {}),
    ministeriosService.listarMinisterios()
      .then((res) => { if (res) salvarCacheMinisterios(res); })
      .catch(() => {}),
    escalasService.listarEventos()
      .then((res) => { if (res) ministerialCache.eventos = res; })
      .catch(() => {}),
    supabase.from('pessoas').select('id, nome, telefone').order('nome')
      .then(({ data }) => { if (data) ministerialCache.todasPessoas = data; })
      .catch(() => {}),
    supabase
      .from('historico_ministerial')
      .select(`
        id,
        acao,
        detalhes,
        criado_em,
        pessoas (
          nome,
          cargo
        ),
        ministerios (
          nome
        )
      `)
      .order('criado_em', { ascending: false })
      .then(({ data }) => { if (data) ministerialCache.historicoPorAcao[''] = data; })
      .catch(() => {})
  ];

  if (membroId) {
    tarefas.push(
      escalasService.listarEscalasMembro(membroId)
        .then((res) => { if (res) ministerialCache.minhasEscalasPorMembro[membroId] = res; })
        .catch(() => {})
    );
  }

  Promise.all(tarefas).finally(() => {
    prefetchEmAndamento = false;
  });
}
