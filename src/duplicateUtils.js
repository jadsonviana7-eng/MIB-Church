import { supabase } from './supabaseClient';
import { soNumeros, mascaraCPF, mascaraTelefone } from './mascaras';

/**
 * Normaliza uma string de texto removendo acentos, espaços extras e convertendo para minúsculas.
 */
export function normalizarTextoComparacao(str) {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Verifica duplicidade em uma lista local de pessoas já carregadas em memória.
 * @param {Object} dados - Dados da pessoa a ser cadastrada ou atualizada
 * @param {Array} listaPessoas - Lista de pessoas existentes
 * @param {string|null} idAtual - ID da pessoa atual (caso seja edição)
 * @returns {Object|null} Retorna o objeto de duplicidade ou null
 */
export function verificarDuplicidadeLocal(dados, listaPessoas = [], idAtual = null) {
  if (!dados || !Array.isArray(listaPessoas) || listaPessoas.length === 0) return null;

  const cpfLimpo = soNumeros(dados.cpf);
  const emailLimpo = dados.email ? String(dados.email).trim().toLowerCase() : '';
  const nomeNorm = normalizarTextoComparacao(dados.nome);
  const telLimpo = soNumeros(dados.telefone);
  const dataNasc = dados.data_nascimento || dados.dataNascimento || null;

  for (const p of listaPessoas) {
    if (idAtual && p.id === idAtual) continue;
    if (p.status === 'excluido') continue;

    // 1. Verificação por CPF (critério mais forte)
    const pCpfLimpo = soNumeros(p.cpf);
    if (cpfLimpo && pCpfLimpo && cpfLimpo.length >= 11 && cpfLimpo === pCpfLimpo) {
      return {
        duplicado: true,
        campo: 'cpf',
        tituloCampo: 'CPF',
        valorConflito: mascaraCPF(cpfLimpo),
        motivo: `O CPF ${mascaraCPF(cpfLimpo)} já está cadastrado no sistema para "${p.nome}".`,
        pessoaExistente: p,
      };
    }

    // 2. Verificação por E-mail
    const pEmailLimpo = p.email ? String(p.email).trim().toLowerCase() : '';
    if (emailLimpo && pEmailLimpo && emailLimpo === pEmailLimpo) {
      return {
        duplicado: true,
        campo: 'email',
        tituloCampo: 'E-mail',
        valorConflito: emailLimpo,
        motivo: `O e-mail "${emailLimpo}" já está associado ao cadastro de "${p.nome}".`,
        pessoaExistente: p,
      };
    }

    // 3. Verificação por Nome idêntico + Telefone
    const pNomeNorm = normalizarTextoComparacao(p.nome);
    const pTelLimpo = soNumeros(p.telefone);
    if (nomeNorm && pNomeNorm && nomeNorm === pNomeNorm && telLimpo && pTelLimpo && telLimpo === pTelLimpo) {
      return {
        duplicado: true,
        campo: 'nome_telefone',
        tituloCampo: 'Nome e Telefone',
        valorConflito: `${p.nome} (${mascaraTelefone(telLimpo)})`,
        motivo: `Já existe um cadastro com o mesmo nome e telefone no sistema.`,
        pessoaExistente: p,
      };
    }

    // 4. Verificação por Nome idêntico + Data de Nascimento
    if (nomeNorm && pNomeNorm && nomeNorm === pNomeNorm && dataNasc && p.data_nascimento && dataNasc === p.data_nascimento) {
      return {
        duplicado: true,
        campo: 'nome_nascimento',
        tituloCampo: 'Nome e Data de Nascimento',
        valorConflito: p.nome,
        motivo: `Já existe um cadastro com este mesmo nome e data de nascimento no sistema.`,
        pessoaExistente: p,
      };
    }
  }

  return null;
}

/**
 * Consulta o Supabase para verificar duplicidades no banco de dados.
 * @param {Object} dados - Dados da pessoa a ser cadastrada ou atualizada
 * @param {string|null} idAtual - ID da pessoa atual (caso seja edição)
 * @returns {Promise<Object|null>}
 */
export async function buscarDuplicidadeBanco(dados, idAtual = null) {
  if (!dados) return null;

  const cpfLimpo = soNumeros(dados.cpf);
  const emailLimpo = dados.email ? String(dados.email).trim().toLowerCase() : '';
  const nomeLimpo = dados.nome ? String(dados.nome).trim() : '';

  try {
    // 1. Busca por CPF
    if (cpfLimpo && cpfLimpo.length >= 11) {
      let query = supabase
        .from('pessoas')
        .select('id, nome, cpf, email, telefone, cargo, status, foto_url, celula_id, celulas(nome)')
        .eq('cpf', cpfLimpo);
      if (idAtual) query = query.neq('id', idAtual);
      const { data } = await query.limit(1);

      if (data && data.length > 0) {
        const p = data[0];
        return {
          duplicado: true,
          campo: 'cpf',
          tituloCampo: 'CPF',
          valorConflito: mascaraCPF(cpfLimpo),
          motivo: `O CPF ${mascaraCPF(cpfLimpo)} já está cadastrado no sistema para "${p.nome}".`,
          pessoaExistente: p,
        };
      }
    }

    // 2. Busca por E-mail
    if (emailLimpo) {
      let query = supabase
        .from('pessoas')
        .select('id, nome, cpf, email, telefone, cargo, status, foto_url, celula_id, celulas(nome)')
        .ilike('email', emailLimpo);
      if (idAtual) query = query.neq('id', idAtual);
      const { data } = await query.limit(1);

      if (data && data.length > 0) {
        const p = data[0];
        return {
          duplicado: true,
          campo: 'email',
          tituloCampo: 'E-mail',
          valorConflito: emailLimpo,
          motivo: `O e-mail "${emailLimpo}" já está associado ao cadastro de "${p.nome}".`,
          pessoaExistente: p,
        };
      }
    }

    // 3. Busca por Nome Exato se não houver CPF
    if (!cpfLimpo && nomeLimpo && nomeLimpo.length >= 4) {
      let query = supabase
        .from('pessoas')
        .select('id, nome, cpf, email, telefone, cargo, status, foto_url, celula_id, celulas(nome)')
        .ilike('nome', nomeLimpo);
      if (idAtual) query = query.neq('id', idAtual);
      const { data } = await query.limit(1);

      if (data && data.length > 0) {
        const p = data[0];
        const telLimpo = soNumeros(dados.telefone);
        const pTelLimpo = soNumeros(p.telefone);
        // Se coincidir telefone ou se nome for idêntico
        if ((telLimpo && pTelLimpo && telLimpo === pTelLimpo) || p.nome.toLowerCase() === nomeLimpo.toLowerCase()) {
          return {
            duplicado: true,
            campo: 'nome',
            tituloCampo: 'Nome',
            valorConflito: p.nome,
            motivo: `Já existe um cadastro ativo com o nome "${p.nome}" no sistema.`,
            pessoaExistente: p,
          };
        }
      }
    }
  } catch (err) {
    console.warn('Não foi possível realizar a checagem remota de duplicidade:', err);
  }

  return null;
}

/**
 * Interpreta erros retornados pelo Supabase/PostgREST e detecta se decorrem de duplicidade/chave única.
 * @param {Object} error - Objeto de erro retornado pela requisição Supabase
 * @param {Object} dados - Dados enviados no payload
 * @param {Array} listaPessoas - Lista opcional para localizar o registro conflitante
 * @returns {Object|null}
 */
export function interpretarErroDuplicidadeBanco(error, dados = {}, listaPessoas = []) {
  if (!error) return null;

  const msg = String(error.message || '').toLowerCase();
  const details = String(error.details || '').toLowerCase();
  const code = String(error.code || '');

  const ehErroDuplicidade =
    code === '23505' ||
    msg.includes('duplicate key') ||
    msg.includes('unique constraint') ||
    msg.includes('already exists') ||
    msg.includes('duplicat') ||
    details.includes('already exists') ||
    details.includes('key (');

  if (!ehErroDuplicidade) return null;

  let campo = 'cadastro';
  let tituloCampo = 'Cadastro';
  let valorConflito = '';
  let motivo = 'Já existe um cadastro no sistema com estas mesmas informações.';

  if (msg.includes('cpf') || details.includes('cpf')) {
    campo = 'cpf';
    tituloCampo = 'CPF';
    valorConflito = dados.cpf ? mascaraCPF(dados.cpf) : '';
    motivo = `O CPF informado ${valorConflito ? `(${valorConflito}) ` : ''}já está cadastrado no banco de dados.`;
  } else if (msg.includes('email') || details.includes('email')) {
    campo = 'email';
    tituloCampo = 'E-mail';
    valorConflito = dados.email || '';
    motivo = `O endereço de e-mail informado ${valorConflito ? `(${valorConflito}) ` : ''}já está em uso no sistema.`;
  } else if (msg.includes('nome') || details.includes('nome')) {
    campo = 'nome';
    tituloCampo = 'Nome';
    valorConflito = dados.nome || '';
    motivo = `Já existe um registro com o nome "${valorConflito || 'informado'}" no banco de dados.`;
  }

  // Tenta encontrar a pessoa existente na lista
  const matchLocal = verificarDuplicidadeLocal(dados, listaPessoas);
  const pessoaExistente = matchLocal?.pessoaExistente || null;

  return {
    duplicado: true,
    campo,
    tituloCampo,
    valorConflito,
    motivo,
    pessoaExistente,
    mensagemTecnica: error.message || error.details || '',
  };
}
