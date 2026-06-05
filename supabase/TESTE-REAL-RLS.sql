-- ==============================================================
-- EXPLICAÇÃO: Por que tudo retorna NULL
-- ==============================================================

-- Quando você executa SQL direto no SQL Editor:
-- - Você está logado no Supabase como ADMIN do sistema
-- - Não como um usuário autenticado da aplicação
-- - auth.uid() retorna NULL neste contexto

-- Isto é NORMAL e ESPERADO!

-- Para testar corretamente, precisa:
-- 1. Fazer login NA APLICAÇÃO (não no SQL Editor)
-- 2. Ou usar um INSERT teste

-- ==============================================================
-- TESTE REAL: Inserir um registro de teste
-- ==============================================================

-- Primeiro, verify se a pessoa com seu email existe
SELECT id, email, permissao FROM public.pessoas 
WHERE email = 'seu-email@gmail.com'
LIMIT 1;

-- Se não existir, insira:
-- INSERT INTO public.pessoas (nome, email, permissao, status)
-- VALUES ('Teste Admin', 'seu-email@gmail.com', 'admin', 'ativo');

-- ==============================================================
-- TESTE NA APLICAÇÃO (O QUE REALMENTE IMPORTA)
-- ==============================================================

/*

1. Faça LOGIN na aplicação (não no SQL Editor)
2. Abra F12 (console do navegador)
3. Copie e cole isto no console:

const { data } = await supabase
  .from('pessoas')
  .select('COUNT(*)', { count: 'exact' });
console.log('Total de pessoas que você consegue ver:', data);

4. Se for ADMIN: deve ser 150+
5. Se for MEMBRO: deve ser 1
6. Se for LÍDER: deve ser quantidade de sua célula

Este é o verdadeiro teste!

*/

-- ==============================================================
-- ALTERNATIVA: Testar com uma query SQL que não precisa de auth
-- ==============================================================

-- Contar TODAS as pessoas (sem RLS)
SELECT COUNT(*) as total_pessoas_banco FROM public.pessoas;

-- Contar TODAS as células (sem RLS)
SELECT COUNT(*) as total_celulas_banco FROM public.celulas;

-- Ver quantas pessoas têm permissao preenchida
SELECT 
  COUNT(*) as total,
  SUM(CASE WHEN permissao IS NULL THEN 1 ELSE 0 END) as sem_permissao,
  SUM(CASE WHEN permissao = 'admin' THEN 1 ELSE 0 END) as admins,
  SUM(CASE WHEN permissao = 'pastor' THEN 1 ELSE 0 END) as pastores,
  SUM(CASE WHEN permissao = 'lider' THEN 1 ELSE 0 END) as lideres,
  SUM(CASE WHEN permissao = 'membro' THEN 1 ELSE 0 END) as membros,
  SUM(CASE WHEN permissao = 'secretario' THEN 1 ELSE 0 END) as secretarios,
  SUM(CASE WHEN permissao = 'tesoureiro' THEN 1 ELSE 0 END) as tesoureiros
FROM public.pessoas;

-- Ver um exemplo de pessoa com cada perfil
SELECT DISTINCT permissao, 
  (SELECT nome FROM public.pessoas p2 WHERE p2.permissao = p1.permissao LIMIT 1) as exemplo
FROM public.pessoas p1
WHERE permissao IS NOT NULL
ORDER BY permissao;
