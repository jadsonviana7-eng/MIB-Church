-- ==============================================================
-- DEBUG - Verificar Estado Atual das Políticas RLS
-- ==============================================================
-- Execute isto para saber exatamente o que está acontecendo
-- ==============================================================

-- 1. Verificar tabelas e RLS status
SELECT 
  schemaname,
  tablename,
  CASE WHEN rowsecurity THEN 'Ativado' ELSE 'Desativado' END as rls_status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('pessoas', 'celulas', 'reunioes_celula', 'relatorios_reuniao', 'transacoes_financeiras')
ORDER BY tablename;

-- 2. Verificar políticas na tabela 'pessoas'
SELECT
  policyname,
  permissive,
  roles,
  qual as "USING condition",
  with_check as "WITH CHECK condition"
FROM pg_policies
WHERE tablename = 'pessoas'
ORDER BY policyname;

-- 3. Verificar políticas na tabela 'celulas'
SELECT
  policyname,
  permissive,
  roles,
  qual as "USING condition"
FROM pg_policies
WHERE tablename = 'celulas'
ORDER BY policyname;

-- 4. Verificar qual perfil o usuário ATUAL tem
SELECT 
  current_user as usuario_atual,
  (SELECT email FROM auth.users WHERE id = auth.uid()) as email_autenticado,
  (SELECT permissao FROM public.pessoas 
   WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())) as perfil_no_banco;

-- 5. Listar TODAS as políticas no banco
SELECT 
  tablename,
  COUNT(*) as qtd_politicas
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;

-- 6. Mostrar exatamente qual política está bloqueando
SELECT
  'pessoas' as tabela,
  policyname as politica,
  cmd as operacao,
  CASE WHEN qual IS NULL THEN 'Sem restrição' ELSE 'COM RESTRIÇÃO' END as status
FROM pg_policies
WHERE tablename = 'pessoas'
ORDER BY operacao;

-- 7. Testar se consegue ler dados de pessoas AGORA
-- Isto vai falhar se RLS está bloqueando, vai passar se funciona
-- BEGIN;
--   SELECT COUNT(*) as total_pessoas FROM public.pessoas;
-- ROLLBACK;

-- 8. Verificar funções RLS definidas
SELECT 
  p.proname as nome_funcao,
  p.prosrc as codigo_funcao
FROM pg_proc p
WHERE p.prosrc LIKE '%get_perfil%' 
  OR p.prosrc LIKE '%get_email%'
  OR p.prosrc LIKE '%get_celula%'
ORDER BY p.proname;

-- ==============================================================
-- INTERPRETAÇÃO DOS RESULTADOS
-- ==============================================================
/*

Se RLS Status = "Desativado":
- Todas as queries vão passar (sem bloqueio)
- Tudo está liberado
- Isto é desenvolvimento/debug

Se RLS Status = "Ativado":
- Precisa de política para cada operação
- Se não tem política, é bloqueado com 403
- Se tem política ruim, é bloqueado com 403

Se qtd_politicas = 0:
- ❌ PROBLEMA! RLS ativado mas sem políticas
- Resultado: 403 em tudo
- Solução: Crie políticas ou desabilite RLS

Se policyname começa com "pessoas_admin":
- ✅ Boas notícias: tem políticas definidas
- Mas podem estar COM ERRO na condição
- Verifique a coluna "USING condition"

Se USING condition é muito complexa:
- Pode ser bug em função RLS
- Teste: execute a função diretamente
- SELECT public.get_perfil_usuario();

*/
