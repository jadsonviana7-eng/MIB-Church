-- ==============================================================
-- DIAGNÓSTICO E CORREÇÃO DO PROBLEMA RLS
-- ==============================================================
-- O problema: A coluna 'permissao' está vazia ou com valores inválidos
-- Solução: Preencher corretamente as permissões
-- ==============================================================

-- 1. VERIFICAR ESTADO ATUAL
-- Execute para ver quais usuários estão sem permissão:

SELECT 
  id, 
  nome, 
  email, 
  permissao,
  auth_user_id,
  acesso_ativo
FROM public.pessoas
WHERE email IS NOT NULL
ORDER BY created_at DESC
LIMIT 20;

-- Se ver muitos com permissao = NULL, continue com os passos abaixo

-- ==============================================================
-- 2. PREENCHER PERMISSÕES FALTANTES
-- ==============================================================

-- 2.1 - Atribuir ADMIN (seu e-mail principal)
UPDATE public.pessoas 
SET permissao = 'admin'
WHERE email = 'seu-email@example.com' AND permissao IS NULL;
-- ⚠️ TROQUE 'seu-email@example.com' pelo seu e-mail real!

-- 2.2 - Atribuir PASTOR (outros admins)
UPDATE public.pessoas 
SET permissao = 'pastor'
WHERE email ILIKE '%pastor%' AND permissao IS NULL;

-- 2.3 - Atribuir MEMBRO (padrão para todos os outros)
UPDATE public.pessoas 
SET permissao = 'membro'
WHERE permissao IS NULL;

-- ==============================================================
-- 3. PROBLEMA ADICIONAL: auth_user_id provavelmente está NULL
-- ==============================================================
-- As políticas precisam que auth_user_id esteja preenchido!

-- 3.1 - Verificar quantos não têm auth_user_id vinculado:
SELECT COUNT(*) as sem_auth_user_id
FROM public.pessoas
WHERE auth_user_id IS NULL;

-- Se resultado > 0, siga para 3.2

-- ==============================================================
-- 3.2 - SOLUÇÃO ALTERNATIVA: Usar email em vez de auth_user_id
-- ==============================================================
-- Se não conseguir vincular auth_user_id, use esta abordagem:
-- Copie este SQL para criar NOVAS políticas que usam email em vez de ID

-- Primeiro, remova as políticas antigas (opcional, mas recomendado):
DROP POLICY IF EXISTS "pessoas_admin_all" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_lider_celula_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_lider_celula_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_delete_admin" ON public.pessoas;

-- Agora crie NOVAS FUNÇÕES que usam email:

CREATE OR REPLACE FUNCTION public.get_email_usuario()
RETURNS TEXT AS $$
BEGIN
  RETURN COALESCE(
    (SELECT email FROM auth.users WHERE id = auth.uid()),
    ''
  );
END;
$$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION public.get_perfil_usuario_v2()
RETURNS TEXT AS $$
DECLARE
  email_user text;
  perfil text;
BEGIN
  email_user := public.get_email_usuario();
  
  IF email_user = '' THEN
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

-- ==============================================================
-- 4. NOVA POLÍTICA PARA PESSOAS (VERSION 2 - USA EMAIL)
-- ==============================================================

-- Admin: Acesso total
CREATE POLICY "pessoas_admin_all_v2" ON public.pessoas
  FOR ALL
  TO authenticated
  USING (public.get_perfil_usuario_v2() = 'admin')
  WITH CHECK (public.get_perfil_usuario_v2() = 'admin');

-- Pastor: Leitura de todos, escrita restrita
CREATE POLICY "pessoas_pastor_select_v2" ON public.pessoas
  FOR SELECT
  TO authenticated
  USING (public.get_perfil_usuario_v2() = 'pastor');

CREATE POLICY "pessoas_pastor_update_v2" ON public.pessoas
  FOR UPDATE
  TO authenticated
  USING (public.get_perfil_usuario_v2() = 'pastor')
  WITH CHECK (public.get_perfil_usuario_v2() = 'pastor');

-- Membro: Pode ver e editar seu próprio registro
CREATE POLICY "pessoas_membro_select_v2" ON public.pessoas
  FOR SELECT
  TO authenticated
  USING (
    public.get_perfil_usuario_v2() = 'membro'
    AND email = public.get_email_usuario()
  );

CREATE POLICY "pessoas_membro_update_v2" ON public.pessoas
  FOR UPDATE
  TO authenticated
  USING (
    public.get_perfil_usuario_v2() = 'membro'
    AND email = public.get_email_usuario()
  )
  WITH CHECK (
    public.get_perfil_usuario_v2() = 'membro'
    AND email = public.get_email_usuario()
  );

-- ==============================================================
-- 5. TESTAR A CONFIGURAÇÃO
-- ==============================================================

-- Execute isso para verificar se está funcionando:
SELECT 
  current_user as usuario,
  public.get_perfil_usuario_v2() as perfil,
  public.get_email_usuario() as email;

-- Você deve ver:
-- usuario = seu_email@supabase.com (ou similar)
-- perfil = admin (se configurou corretamente)
-- email = seu_email_real@example.com

-- ==============================================================
-- CHECKLIST DE CORREÇÃO
-- ==============================================================

/*
[ ] 1. Executar a query de VERIFICAÇÃO (step 1) para ver estado atual
[ ] 2. Executar o PREENCHER PERMISSÕES (step 2) com seu e-mail real
[ ] 3. Executar a query de diagnóstico auth_user_id (step 3.1)
[ ] 4. Executar as NOVAS FUNÇÕES E POLÍTICAS (steps 3.2 e 4)
[ ] 5. Fazer logout e login novamente
[ ] 6. Tentar acessar dados (deve funcionar agora)
[ ] 7. Se ainda não funcionar, consulte TROUBLESHOOTING abaixo
*/

-- ==============================================================
-- TROUBLESHOOTING
-- ==============================================================

-- Problema: Ainda não consigo ver dados
-- Solução 1: Limpar cache do navegador (Ctrl+Shift+Del)

-- Problema 2: Erro "role 'authenticated' does not exist"
-- Solução: Você está tentando logar com um e-mail que não existe em auth.users
-- Verifique em Supabase: Authentication → Users

-- Problema 3: Vejo erro "permission denied"
-- Solução: 
--   a) Verifique se permissao está preenchida: 
--      SELECT email, permissao FROM public.pessoas WHERE email = 'seu-email@example.com';
--   b) Execute: SELECT public.get_perfil_usuario_v2();
--   c) Deverá retornar 'admin' (não 'anonimo' ou 'membro')

-- Problema 4: Não consegue vincular auth_user_id automaticamente
-- Solução: Use a função de TRIGGER abaixo (Step 6)

-- ==============================================================
-- 6. TRIGGER PARA VINCULAR auth_user_id AUTOMATICAMENTE
-- ==============================================================
-- Este TRIGGER vincula automaticamente quando cria usuário via API

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

-- Depois execute para sincronizar registros existentes:
UPDATE public.pessoas p
SET auth_user_id = u.id
FROM auth.users u
WHERE p.email = u.email AND p.auth_user_id IS NULL;

-- ==============================================================
-- 7. SCRIPT FINAL: RESETAR E RECONFIGUAR TUDO
-- ==============================================================
-- Execute APENAS se nada funcionou (vai resetar as políticas)

-- Desabilitar RLS temporariamente
ALTER TABLE public.pessoas DISABLE ROW LEVEL SECURITY;

-- Remover todas as políticas antigas
DROP POLICY IF EXISTS "pessoas_admin_all" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_admin_all_v2" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_select_v2" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_update_v2" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_select_v2" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_update_v2" ON public.pessoas;

-- Reabilitar RLS
ALTER TABLE public.pessoas ENABLE ROW LEVEL SECURITY;

-- Criar POLÍTICA SUPER PERMISSIVA temporária (APENAS PARA TESTES)
CREATE POLICY "pessoas_temp_debug" ON public.pessoas
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Se agora consegue ver dados, o problema está nas funções de RLS
-- Se não consegue ver dados mesmo com política super permissiva, o problema está na autenticação

-- Depois que identificar o problema, remova esta política:
DROP POLICY IF EXISTS "pessoas_temp_debug" ON public.pessoas;

