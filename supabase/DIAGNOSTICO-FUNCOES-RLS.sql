-- ==============================================================
-- DIAGNÓSTICO: Verificar Funções RLS
-- ==============================================================
-- Execute isto para descobrir o que está errado
-- ==============================================================

-- 1. Testar função de email
SELECT 'Teste 1: Email' as teste;
SELECT public.obter_email() as email_resultado;

-- 2. Testar função de perfil
SELECT 'Teste 2: Perfil' as teste;
SELECT public.obter_perfil() as perfil_resultado;

-- 3. Testar função de ID pessoa
SELECT 'Teste 3: ID Pessoa' as teste;
SELECT public.obter_id_pessoa() as id_resultado;

-- 4. Testar função de célula líder
SELECT 'Teste 4: Célula Líder' as teste;
SELECT public.obter_celula_lider() as celula_resultado;

-- 5. Ver dados brutos do auth
SELECT 'Teste 5: Auth.users' as teste;
SELECT id, email FROM auth.users WHERE id = auth.uid();

-- 6. Ver dados brutos da pessoa
SELECT 'Teste 6: Pessoa Vinculada' as teste;
SELECT id, email, permissao FROM public.pessoas 
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

-- 7. Ver qual é o perfil real
SELECT 'Teste 7: Qual é seu perfil?' as teste;
SELECT 
  (SELECT email FROM auth.users WHERE id = auth.uid()) as seu_email,
  (SELECT permissao FROM public.pessoas WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())) as permissao_no_banco,
  public.obter_perfil() as funcao_retorna;

-- 8. Se for líder, qual é sua célula?
SELECT 'Teste 8: Se for Líder' as teste;
SELECT id, nome FROM public.celulas WHERE lider_id = public.obter_id_pessoa();

-- 9. Se for membro, qual é sua célula?
SELECT 'Teste 9: Se for Membro' as teste;
SELECT c.id, c.nome FROM public.celulas c
WHERE c.id = (SELECT celula_id FROM public.pessoas WHERE id = public.obter_id_pessoa())
LIMIT 1;

-- ==============================================================
-- ESPERADO PARA CADA PERFIL:
-- ==============================================================
/*

ADMIN:
  Teste 1: email_resultado = seu-email@gmail.com
  Teste 2: perfil_resultado = admin
  Teste 3: id_resultado = uuid-da-pessoa
  Teste 4: celula_resultado = NULL (admin não é líder)
  Teste 7: permissao_no_banco = admin, funcao_retorna = admin

PASTOR:
  Teste 1: email_resultado = seu-email@gmail.com
  Teste 2: perfil_resultado = pastor
  Teste 3: id_resultado = uuid-da-pessoa
  Teste 7: permissao_no_banco = pastor, funcao_retorna = pastor

MEMBRO:
  Teste 1: email_resultado = seu-email@gmail.com
  Teste 2: perfil_resultado = membro
  Teste 3: id_resultado = uuid-da-pessoa
  Teste 9: Sua célula (ex: Célula Centro)

LÍDER:
  Teste 1: email_resultado = seu-email@gmail.com
  Teste 2: perfil_resultado = lider
  Teste 3: id_resultado = uuid-da-pessoa
  Teste 8: Sua célula (ex: Célula Centro)

*/

-- ==============================================================
-- SE NÃO FUNCIONAR:
-- ==============================================================
/*

Se algum teste retornar NULL ou erro:

1. ERRO na função = Syntax error no SQL
2. NULL no email = Usuário não está autenticado
3. NULL no perfil = Coluna permissao não foi preenchida
4. NULL no ID pessoa = Email do auth.users não bate com pessoas.email

SOLUÇÃO:
  a) Verifique que está logado: auth.uid() deve retornar uuid
  b) Verifique permissao: SELECT email, permissao FROM public.pessoas
  c) Verifique email: SELECT email FROM auth.users

*/
