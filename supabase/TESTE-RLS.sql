-- ==============================================================
-- TESTE DE SEGURANÇA RLS
-- ==============================================================
-- Execute isto para verificar se as políticas estão funcionando
-- ==============================================================

-- 1. Verificar usuário atual e seu perfil
SELECT 
  current_user as usuario_sistema,
  (SELECT email FROM auth.users WHERE id = auth.uid()) as email_autenticado,
  public.obter_perfil() as perfil_no_banco,
  public.obter_id_pessoa() as id_pessoa,
  public.obter_celula_lider() as celula_se_lider;

-- 2. Contar pessoas que VOCÊ consegue ver (com RLS ativo)
SELECT 
  'pessoas' as tabela,
  COUNT(*) as total_visivel
FROM public.pessoas;

-- 3. Contar células que VOCÊ consegue ver
SELECT 
  'celulas' as tabela,
  COUNT(*) as total_visivel
FROM public.celulas;

-- 4. Se for líder, mostrar sua célula
SELECT 
  id,
  nome as celula
FROM public.celulas
WHERE lider_id = public.obter_id_pessoa();

-- 5. Se for membro, mostrar sua célula
SELECT 
  nome as minha_celula
FROM public.celulas
WHERE id = (SELECT celula_id FROM public.pessoas WHERE id = public.obter_id_pessoa());

-- 6. Listar todas as políticas RLS ativas
SELECT 
  tablename as tabela,
  policyname as politica,
  COUNT(*) as qtd
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename, policyname
ORDER BY tablename, policyname;

-- 7. Contar políticas por tabela
SELECT 
  tablename as tabela,
  COUNT(*) as total_politicas
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;

-- ==============================================================
-- RESULTADO ESPERADO
-- ==============================================================
/*

1. ADMIN
   email_autenticado = seu-email@example.com
   perfil_no_banco = admin
   total_visivel (pessoas) = Total de pessoas no banco
   total_visivel (celulas) = Total de células no banco

2. PASTOR
   perfil_no_banco = pastor
   total_visivel (pessoas) = Total de pessoas
   total_visivel (celulas) = Total de células

3. SECRETÁRIO
   perfil_no_banco = secretario
   total_visivel (pessoas) = Total de pessoas
   total_visivel (celulas) = Total de células

4. TESOUREIRO
   perfil_no_banco = tesoureiro
   total_visivel (pessoas) = Total de pessoas
   total_visivel (celulas) = Total de células

5. LÍDER
   perfil_no_banco = lider
   total_visivel (pessoas) = Pessoas de SUA célula
   total_visivel (celulas) = Sua célula
   minha_celula = Nome da sua célula

6. MEMBRO
   perfil_no_banco = membro
   total_visivel (pessoas) = 1 (apenas você mesmo)
   total_visivel (celulas) = 1 (sua célula)
   minha_celula = Nome da sua célula

*/

-- ==============================================================
-- SE ALGUM TESTE FALHAR
-- ==============================================================
/*

Erro: "permission denied"
→ Significa RLS está ativo mas a política está bloqueando
→ Verifique se o perfil está correto em pessoas.permissao
→ Execute: SELECT email, permissao FROM public.pessoas WHERE email = '...';

Erro: "relation does not exist"
→ Significa a tabela não foi criada
→ Execute: supabase/politicas-rls-perfis.sql SEÇÃO 0

Total muito alto/baixo
→ Significa a política está funcionando errado
→ Verifique a função obter_perfil()
→ Execute: SELECT public.obter_perfil();

*/
