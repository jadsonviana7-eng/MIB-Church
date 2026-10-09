import { supabase } from '../supabaseClient';

/**
 * Utilitário para registrar e processar Logs de Auditoria do Sistema.
 * Formato padrão:
 * - Quem alterou
 * - O que alterou
 * - Data e Hora
 * - Registro anterior
 * - Registro novo
 */

/**
 * Registra manualmente um log de auditoria no Supabase (logs_sistema).
 */
export async function registrarLogAuditoria({
  usuarioId = null,
  usuarioNome = '',
  usuarioEmail = '',
  acao = 'UPDATE', // 'INSERT', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'AJUSTE'
  tabela = '',
  registroId = null,
  descricao = '',
  valoresAntigos = null,
  valoresNovos = null,
  detalhesExtras = {}
}) {
  try {
    // Se usuário não foi passado, tenta obter da sessão ativa
    let uId = usuarioId;
    let uNome = usuarioNome;
    let uEmail = usuarioEmail;

    if (!uEmail) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        uEmail = session.user.email || '';
        uId = session.user.id || uId;
        uNome = session.user.user_metadata?.nome || session.user.user_metadata?.full_name || uEmail.split('@')[0];
      }
    }

    // Calcula diferenças campo a campo se for UPDATE
    let alteracoes = [];
    if (valoresAntigos && valoresNovos && typeof valoresAntigos === 'object' && typeof valoresNovos === 'object') {
      const allKeys = new Set([...Object.keys(valoresAntigos), ...Object.keys(valoresNovos)]);
      allKeys.forEach(k => {
        // Ignora campos internos que mudam automaticamente
        if (['updated_at', 'created_at', 'last_sign_in_at'].includes(k)) return;
        
        const vOld = valoresAntigos[k];
        const vNew = valoresNovos[k];
        if (JSON.stringify(vOld) !== JSON.stringify(vNew)) {
          alteracoes.push({
            campo: k,
            de: vOld,
            para: vNew
          });
        }
      });
    }

    const payloadDetalhes = {
      descricao: descricao || undefined,
      alteracoes: alteracoes.length > 0 ? alteracoes : undefined,
      valores_antigos: valoresAntigos || undefined,
      valores_novos: valoresNovos || undefined,
      ...detalhesExtras
    };

    const { error } = await supabase.from('logs_sistema').insert([{
      usuario_id: uId || null,
      usuario_email: uEmail || 'sistema',
      usuario_nome: uNome || 'Sistema',
      acao: acao.toUpperCase(),
      tabela: tabela || null,
      registro_id: registroId ? String(registroId) : null,
      detalhes: payloadDetalhes
    }]);

    if (error) {
      console.warn('Aviso: falha ao gravar log de auditoria no Supabase:', error.message);
    }
  } catch (err) {
    console.warn('Erro ao registrar log de auditoria:', err);
  }
}

/**
 * Formata a data e hora no padrão brasileiro amigável: "08/10/2026 – 10:32"
 */
export function formatarDataHoraAuditoria(dataIso) {
  if (!dataIso) return '---';
  try {
    const d = new Date(dataIso);
    if (isNaN(d.getTime())) return '---';
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();
    const hora = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} – ${hora}:${min}`;
  } catch {
    return '---';
  }
}

/**
 * Formata um valor primitivo ou objeto para exibição amigável no diff
 */
export function formatarValorDiff(val) {
  if (val === null || val === undefined || val === '') return '— (Vazio)';
  if (typeof val === 'boolean') return val ? 'Sim' : 'Não';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'object') {
    if (Array.isArray(val)) return val.length === 0 ? '[]' : `[${val.length} itens]`;
    return JSON.stringify(val);
  }
  return String(val);
}

/**
 * Extrai e normaliza as alterações (Antes → Depois) de um registro de log
 */
export function extrairAlteracoesLog(log) {
  if (!log || !log.detalhes) return [];

  const det = log.detalhes;

  // 1. Se já possui array de alterações pré-calculadas
  if (Array.isArray(det.alteracoes) && det.alteracoes.length > 0) {
    return det.alteracoes.map(alt => ({
      campo: formatarNomeCampo(alt.campo),
      campoRaw: alt.campo,
      de: formatarValorDiff(alt.de),
      para: formatarValorDiff(alt.para)
    }));
  }

  // 2. Se possui valores_antigos e valores_novos
  if (det.valores_antigos && det.valores_novos) {
    const oldObj = det.valores_antigos;
    const newObj = det.valores_novos;
    const diffs = [];
    const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

    allKeys.forEach(k => {
      if (['updated_at', 'created_at', 'id', 'senha_hash'].includes(k)) return;
      const vOld = oldObj[k];
      const vNew = newObj[k];
      if (JSON.stringify(vOld) !== JSON.stringify(vNew)) {
        diffs.push({
          campo: formatarNomeCampo(k),
          campoRaw: k,
          de: formatarValorDiff(vOld),
          para: formatarValorDiff(vNew)
        });
      }
    });

    if (diffs.length > 0) return diffs;
  }

  // 3. Se for apenas INSERT com valores_novos
  if (det.valores_novos && !det.valores_antigos) {
    return Object.entries(det.valores_novos)
      .filter(([k]) => !['created_at', 'updated_at', 'id'].includes(k))
      .slice(0, 8)
      .map(([k, v]) => ({
        campo: formatarNomeCampo(k),
        campoRaw: k,
        de: '— (Não existia)',
        para: formatarValorDiff(v)
      }));
  }

  // 4. Se for apenas DELETE com valores_antigos
  if (det.valores_antigos && !det.valores_novos) {
    return Object.entries(det.valores_antigos)
      .filter(([k]) => !['created_at', 'updated_at', 'id'].includes(k))
      .slice(0, 8)
      .map(([k, v]) => ({
        campo: formatarNomeCampo(k),
        campoRaw: k,
        de: formatarValorDiff(v),
        para: '— (Excluído)'
      }));
  }

  return [];
}

/**
 * Traduz nomes de colunas técnicas para rótulos legíveis em português
 */
export function formatarNomeCampo(campo) {
  const map = {
    nome: 'Nome',
    email: 'E-mail',
    telefone: 'Telefone',
    nota: 'Nota',
    status: 'Status',
    valor: 'Valor (R$)',
    data_evento: 'Data do Evento',
    descricao: 'Descrição',
    presenca: 'Presença',
    fardamentos: 'Fardamento',
    funcao_id: 'Função',
    ministerio_id: 'Ministério',
    celula_id: 'Célula',
    categoria: 'Categoria',
    cargo: 'Cargo',
    ativo: 'Ativo/Inativo',
    justificativa: 'Justificativa',
    tipo: 'Tipo',
    saldo: 'Saldo'
  };
  return map[campo] || campo.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Monta um resumo descritivo em linguagem natural para o log
 */
export function gerarDescricaoResumoLog(log) {
  if (!log) return '';
  const usuario = log.usuario_nome || log.usuario_email || 'Usuário';

  if (log.detalhes?.descricao) {
    return log.detalhes.descricao;
  }

  const tabelaNome = formatarNomeTabela(log.tabela);

  if (log.acao === 'INSERT') {
    const nomeItem = log.detalhes?.valores_novos?.nome || log.detalhes?.valores_novos?.titulo || log.detalhes?.valores_novos?.descricao;
    return `${usuario} cadastrou novo registro em ${tabelaNome}${nomeItem ? ` ("${nomeItem}")` : ''}`;
  }

  if (log.acao === 'UPDATE') {
    const nomeItem = log.detalhes?.valores_novos?.nome || log.detalhes?.valores_antigos?.nome || log.detalhes?.valores_novos?.titulo || '';
    const diffs = extrairAlteracoesLog(log);
    const camposTexto = diffs.slice(0, 3).map(d => d.campo).join(', ');
    return `${usuario} alterou ${camposTexto ? `[${camposTexto}]` : 'dados'} em ${tabelaNome}${nomeItem ? ` de "${nomeItem}"` : ''}`;
  }

  if (log.acao === 'DELETE') {
    const nomeItem = log.detalhes?.valores_antigos?.nome || log.detalhes?.valores_antigos?.titulo || '';
    return `${usuario} excluiu um registro de ${tabelaNome}${nomeItem ? ` ("${nomeItem}")` : ''}`;
  }

  if (log.acao === 'LOGIN') {
    return `${usuario} realizou login no sistema`;
  }

  if (log.acao === 'LOGOUT') {
    return `${usuario} encerrou a sessão no sistema`;
  }

  return `${usuario} executou ação de ${log.acao} em ${tabelaNome}`;
}

export function formatarNomeTabela(tabela) {
  const map = {
    pessoas: 'Pessoas / Membros',
    celulas: 'Células',
    relatorios_celula: 'Relatórios de Célula',
    transacoes_financeiras: 'Transações Financeiras',
    escalas: 'Escalas Ministeriais',
    eventos_ministeriais: 'Eventos / Cultos',
    ministerios: 'Ministérios',
    alunos_avaliacoes: 'Avaliações de Alunos',
    turmas_avaliacoes: 'Turmas / Avaliações',
    visitantes: 'Visitantes',
    visitantes_culto: 'Visitantes do Culto'
  };
  return map[tabela] || tabela || 'Sistema';
}
