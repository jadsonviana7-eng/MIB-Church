-- ==============================================================
-- RLS QUICK FIX - Execute isto para corrigir o problema
-- ==============================================================
-- Este script resolve o problema de RLS não funcionar
-- Execute as seções em ORDEM
-- ==============================================================

-- ============================================
-- SEÇÃO 1: VERIFICAR ESTADO ATUAL
-- ============================================
-- Execute isto primeiro para saber o que está errado

SELECT 
  COUNT(*) as total_pessoas,
  SUM(CASE WHEN permissao IS NULL THEN 1 ELSE 0 END) as sem_permissao,
  SUM(CASE WHEN auth_user_id IS NULL THEN 1 ELSE 0 END) as sem_auth_user_id,
  SUM(CASE WHEN email IS NULL THEN 1 ELSE 0 END) as sem_email
FROM public.pessoas;

-- Resultado esperado se tem problema:
-- total_pessoas | sem_permissao | sem_auth_user_id | sem_email
-- 10            | 10            | 10               | 0

-- ============================================
-- SEÇÃO 2: PREENCHER permissao (OBRIGATÓRIO!)
-- ============================================
-- ⚠️ EDITE SEU E-MAIL AQUI:

UPDATE public.pessoas 
SET permissao = 'admin'
WHERE email = 'seu-email-admin@example.com' AND permissao IS NULL;

-- Depois preencha o resto com 'membro':
UPDATE public.pessoas 
SET permissao = 'membro'
WHERE permissao IS NULL;

-- Verifique:
SELECT email, permissao FROM public.pessoas LIMIT 5;

-- ============================================
-- SEÇÃO 3: SINCRONIZAR auth_user_id
-- ============================================
-- Isso vincula o e-mail com o ID de autenticação

UPDATE public.pessoas p
SET auth_user_id = u.id
FROM auth.users u
WHERE p.email = u.email AND p.auth_user_id IS NULL;

-- Verifique:
SELECT email, auth_user_id FROM public.pessoas WHERE email IS NOT NULL LIMIT 5;

-- ============================================
-- SEÇÃO 4: CRIAR TRIGGER (automático)
-- ============================================
-- Isso faz novos usuários serem sincronizados automaticamente

DROP TRIGGER IF EXISTS trg_sync_auth_user_id ON public.pessoas;
DROP FUNCTION IF EXISTS public.fn_sync_auth_user_id();

CREATE OR REPLACE FUNCTION public.fn_sync_auth_user_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IS NOT NULL THEN
    NEW.auth_user_id := (
      SELECT id FROM auth.users WHERE email = NEW.email LIMIT 1
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_auth_user_id
BEFORE INSERT OR UPDATE ON public.pessoas
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_auth_user_id();

-- ============================================
-- SEÇÃO 5: VERSÃO ALTERNATIVA DAS POLÍTICAS
-- ============================================
-- Se a versão anterior não funcionar, use esta (baseada em EMAIL)

DROP POLICY IF EXISTS "pessoas_admin_all" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_lider_celula_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_lider_celula_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_delete_admin" ON public.pessoas;

-- Nova função que busca o perfil pelo email
CREATE OR REPLACE FUNCTION public.get_perfil_por_email()
RETURNS TEXT AS $$
DECLARE
  email_user text;
  perfil text;
BEGIN
  email_user := (SELECT email FROM auth.users WHERE id = auth.uid());
  
  IF email_user IS NULL THEN
    RETURN 'anonimo';
  END IF;

  SELECT COALESCE(p.permissao, 'membro')
  INTO perfil
  FROM public.pessoas p
  WHERE p.email = email_user
  LIMIT 1;

  RETURN COALESCE(perfil, 'membro');
END;
$$ LANGUAGE plpgsql STABLE;

-- Políticas baseadas em EMAIL
CREATE POLICY "pessoas_admin_all_email" ON public.pessoas
  FOR ALL
  TO authenticated
  USING (public.get_perfil_por_email() = 'admin')
  WITH CHECK (public.get_perfil_por_email() = 'admin');

CREATE POLICY "pessoas_pastor_select_email" ON public.pessoas
  FOR SELECT
  TO authenticated
  USING (public.get_perfil_por_email() = 'pastor');

CREATE POLICY "pessoas_pastor_update_email" ON public.pessoas
  FOR UPDATE
  TO authenticated
  USING (public.get_perfil_por_email() = 'pastor')
  WITH CHECK (public.get_perfil_por_email() = 'pastor');

CREATE POLICY "pessoas_membro_self_email" ON public.pessoas
  FOR SELECT
  TO authenticated
  USING (
    public.get_perfil_por_email() = 'membro'
    AND email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "pessoas_membro_update_self_email" ON public.pessoas
  FOR UPDATE
  TO authenticated
  USING (
    public.get_perfil_por_email() = 'membro'
    AND email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
  WITH CHECK (
    public.get_perfil_por_email() = 'membro'
    AND email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- ============================================
-- SEÇÃO 6: TESTE RÁPIDO
-- ============================================
-- Execute isto para verificar se funciona

SELECT 
  current_user,
  (SELECT email FROM auth.users WHERE id = auth.uid()) as seu_email,
  public.get_perfil_por_email() as seu_perfil;

-- Resultado esperado:
-- current_user          | seu_email           | seu_perfil
-- seu-email@example.com | seu-email@example.com | admin

-- ============================================
-- SE MESMO ASSIM NÃO FUNCIONAR:
-- ============================================
-- Desabilite RLS temporariamente para testes

-- ALTER TABLE public.pessoas DISABLE ROW LEVEL SECURITY;

-- Depois faça o teste. Se funcionar, o problema é nas funções RLS.
-- Se não funcionar, o problema é na autenticação.

-- Depois reabilite RLS:
-- ALTER TABLE public.pessoas ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RESUMO DO QUE FOI FEITO:
-- ============================================
/*

1. ✅ Verificar estado da tabela pessoas
2. ✅ Preencher coluna 'permissao' com valores válidos (admin, pastor, lider, membro)
3. ✅ Sincronizar auth_user_id com auth.users
4. ✅ Criar trigger para sincronização automática
5. ✅ Substituir as políticas RLS por uma versão baseada em EMAIL
6. ✅ Testar se funciona

Agora você pode fazer logout e login novamente!

*/
