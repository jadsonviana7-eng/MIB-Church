import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return resposta({ error: 'Método não permitido.' }, 405);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("ERRO: Secrets não configuradas no dashboard.");
    return resposta({ error: 'Secrets SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY não configurados.' }, 500);
  }

  const authHeader = req.headers.get('Authorization') || '';
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const token = authHeader.replace('Bearer ', '');
  const { data: solicitante, error: erroSolicitante } = await supabaseAdmin.auth.getUser(token);
  if (erroSolicitante || !solicitante.user) {
    console.error("ERRO: Solicitante não autenticado.");
    return resposta({ error: 'Você precisa estar autenticado para criar usuários.' }, 401);
  }

  const body = await req.json().catch(() => null);
  const pessoaId = String(body?.pessoaId || '').trim();
  const nome = String(body?.nome || '').trim();
  const email = String(body?.email || '').trim().toLowerCase();
  const senha = String(body?.senha || '');
  const permissao = String(body?.permissao || 'membro').trim();
  const fotoUrl = String(body?.foto_url || '').trim();

  if (!pessoaId || !nome || !email || senha.length < 6) {
    return resposta({ error: 'Informe membro, nome, e-mail e senha com ao menos 6 caracteres.' }, 400);
  }

  const { data: criado, error: erroCriar } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: senha,
    email_confirm: true,
    user_metadata: {
      pessoa_id: pessoaId,
      nome,
      permissao,
      foto_url: fotoUrl,
    },
  });

  if (erroCriar) {
    console.error("ERRO ao criar usuário Auth:", erroCriar.message);
    return resposta({ error: erroCriar.message }, 400);
  }

  const { error: erroPessoa } = await supabaseAdmin
    .from('pessoas')
    .update({
      auth_user_id: criado.user.id,
      permissao,
      acesso_ativo: true,
    })
    .eq('id', pessoaId);

  if (erroPessoa) {
    console.error("ERRO ao atualizar tabela pessoas:", erroPessoa.message);
    return resposta({ error: `Usuário criado, mas não vinculado ao membro: ${erroPessoa.message}` }, 400);
  }

  return resposta({ ok: true, userId: criado.user.id });
});

function resposta(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}
