-- ============================================================
-- RESET RLS DO ZERO - MIB CHURCH
-- ============================================================
-- Objetivo:
-- 1) Remover TODAS as policies do schema public.
-- 2) Recriar helpers seguros para perfil do usuario.
-- 3) Liberar a aplicacao local rapidamente para usuarios logados.
-- 4) Manter o autocadastro publico funcionando.
--
-- Como usar:
-- - Execute este arquivo inteiro no SQL Editor do Supabase.
-- - Depois faca logout/login novamente na aplicacao local.
-- - Quando tudo voltar a carregar, troque para as policies por perfil
--   usando a secao "MODO PRODUCAO" no final deste arquivo.
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Colunas necessarias para vinculo entre pessoas e auth.users
-- ------------------------------------------------------------

ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS auth_user_id uuid UNIQUE;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS acesso_ativo boolean DEFAULT true;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS ultimo_login timestamptz;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS permissao text;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS perfil text;

CREATE INDEX IF NOT EXISTS pessoas_auth_user_id_idx ON public.pessoas(auth_user_id);
CREATE INDEX IF NOT EXISTS pessoas_email_idx ON public.pessoas(email);
CREATE INDEX IF NOT EXISTS pessoas_permissao_idx ON public.pessoas(permissao);

UPDATE public.pessoas p
SET auth_user_id = u.id
FROM auth.users u
WHERE lower(p.email) = lower(u.email)
  AND p.auth_user_id IS NULL;

UPDATE public.pessoas
SET permissao = 'membro'
WHERE permissao IS NULL OR trim(permissao) = '';

UPDATE public.pessoas
SET perfil = permissao
WHERE perfil IS NULL OR trim(perfil) = '';

UPDATE public.pessoas
SET permissao = perfil
WHERE permissao IS NULL OR trim(permissao) = '';

UPDATE public.pessoas
SET acesso_ativo = true
WHERE acesso_ativo IS NULL;

-- IMPORTANTE:
-- Troque o e-mail abaixo pelo seu e-mail de login principal e execute
-- novamente esta linha se precisar promover seu usuario a admin.
-- UPDATE public.pessoas SET permissao = 'admin', acesso_ativo = true
-- WHERE lower(email) = lower('seu-email-admin@example.com');

-- ------------------------------------------------------------
-- 2. Remover TODAS as policies existentes no schema public
-- ------------------------------------------------------------

DO $$
DECLARE
  policy_record record;
BEGIN
  FOR policy_record IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format(
      'DROP POLICY IF EXISTS %I ON %I.%I',
      policy_record.policyname,
      policy_record.schemaname,
      policy_record.tablename
    );
  END LOOP;
END $$;

-- ------------------------------------------------------------
-- 2.1. Remover funcoes antigas que podem referenciar colunas erradas
-- ------------------------------------------------------------

DROP FUNCTION IF EXISTS public.obter_perfil() CASCADE;
DROP FUNCTION IF EXISTS public.obter_email() CASCADE;
DROP FUNCTION IF EXISTS public.obter_id_pessoa() CASCADE;
DROP FUNCTION IF EXISTS public.obter_celula_lider() CASCADE;
DROP FUNCTION IF EXISTS public.get_perfil_usuario() CASCADE;
DROP FUNCTION IF EXISTS public.get_id_usuario() CASCADE;
DROP FUNCTION IF EXISTS public.get_celula_lider() CASCADE;
DROP FUNCTION IF EXISTS public.get_email_usuario() CASCADE;
DROP FUNCTION IF EXISTS public.get_perfil_usuario_v2() CASCADE;
DROP FUNCTION IF EXISTS public.get_perfil_por_email() CASCADE;
DROP FUNCTION IF EXISTS public.rls_email_usuario() CASCADE;
DROP FUNCTION IF EXISTS public.rls_id_pessoa() CASCADE;
DROP FUNCTION IF EXISTS public.rls_perfil_usuario() CASCADE;
DROP FUNCTION IF EXISTS public.rls_equipe_lider_celula() CASCADE;
DROP FUNCTION IF EXISTS public.rls_is_admin() CASCADE;
DROP FUNCTION IF EXISTS public.rls_is_staff() CASCADE;

-- ------------------------------------------------------------
-- 3. Funcoes auxiliares sem recursao de RLS
-- ------------------------------------------------------------
-- SECURITY DEFINER faz a funcao consultar public.pessoas sem ficar
-- presa nas policies da propria tabela.

CREATE OR REPLACE FUNCTION public.rls_email_usuario()
RETURNS text
AS $fn$
  SELECT COALESCE((SELECT email FROM auth.users WHERE id = auth.uid()), '');
$fn$
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth;

CREATE OR REPLACE FUNCTION public.rls_id_pessoa()
RETURNS uuid
AS $fn$
  SELECT p.id
  FROM public.pessoas p
  WHERE p.auth_user_id = auth.uid()
     OR lower(p.email) = lower(public.rls_email_usuario())
  LIMIT 1;
$fn$
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth;

CREATE OR REPLACE FUNCTION public.rls_perfil_usuario()
RETURNS text
AS $fn$
  SELECT COALESCE(
    (
      SELECT lower(p.permissao)
      FROM public.pessoas p
      WHERE p.acesso_ativo IS DISTINCT FROM false
        AND (
          p.auth_user_id = auth.uid()
          OR lower(p.email) = lower(public.rls_email_usuario())
        )
      LIMIT 1
    ),
    'anonimo'
  );
$fn$
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth;

CREATE OR REPLACE FUNCTION public.rls_equipe_lider_celula()
RETURNS uuid
AS $fn$
  SELECT c.id
  FROM public.celulas c
  WHERE c.lider_id = public.rls_id_pessoa()
  LIMIT 1;
$fn$
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth;

CREATE OR REPLACE FUNCTION public.rls_is_admin()
RETURNS boolean
AS $fn$
  SELECT public.rls_perfil_usuario() IN ('admin', 'administrador');
$fn$
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth;

CREATE OR REPLACE FUNCTION public.rls_is_staff()
RETURNS boolean
AS $fn$
  SELECT public.rls_perfil_usuario() IN (
    'admin',
    'administrador',
    'pastor',
    'pastores',
    'secretario',
    'secretaria',
    'tesoureiro',
    'tesoureira',
    'lider'
  );
$fn$
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth;

GRANT EXECUTE ON FUNCTION public.rls_email_usuario() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.rls_id_pessoa() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.rls_perfil_usuario() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.rls_equipe_lider_celula() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.rls_is_admin() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.rls_is_staff() TO anon, authenticated;

-- ------------------------------------------------------------
-- 4. Habilitar RLS em todas as tabelas public
-- ------------------------------------------------------------

DO $$
DECLARE
  table_record record;
BEGIN
  FOR table_record IN
    SELECT schemaname, tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format(
      'ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY',
      table_record.schemaname,
      table_record.tablename
    );
  END LOOP;
END $$;

-- ------------------------------------------------------------
-- 5. MODO RECUPERACAO LOCAL
-- ------------------------------------------------------------
-- Politica temporaria: qualquer usuario autenticado acessa todas
-- as tabelas public. Use para voltar a trabalhar agora.

DO $$
DECLARE
  table_record record;
BEGIN
  FOR table_record IN
    SELECT schemaname, tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format(
      'CREATE POLICY %I ON %I.%I FOR ALL TO authenticated USING (true) WITH CHECK (true)',
      'rls_local_authenticated_all',
      table_record.schemaname,
      table_record.tablename
    );
  END LOOP;
END $$;

-- ------------------------------------------------------------
-- 6. Acesso anonimo minimo para autocadastro publico
-- ------------------------------------------------------------
-- A rota /cadastro-publico precisa ler listas basicas e inserir
-- pessoas antes de existir login.

DO $$
DECLARE
  lookup_table text;
BEGIN
  FOREACH lookup_table IN ARRAY ARRAY[
    'dados_igreja',
    'cargos',
    'celulas',
    'zonas_moradia',
    'atuacoes'
  ]
  LOOP
    IF to_regclass('public.' || lookup_table) IS NOT NULL THEN
      EXECUTE format(
        'CREATE POLICY %I ON public.%I FOR SELECT TO anon USING (true)',
        'rls_anon_select_public_lookup',
        lookup_table
      );
    END IF;
  END LOOP;
END $$;

CREATE POLICY "rls_anon_insert_pessoas_autocadastro"
ON public.pessoas
FOR INSERT
TO anon
WITH CHECK (true);

-- ------------------------------------------------------------
-- 7. Trigger para manter auth_user_id sincronizado
-- ------------------------------------------------------------

DROP TRIGGER IF EXISTS trg_sync_auth_user_id ON public.pessoas;
DROP FUNCTION IF EXISTS public.fn_sync_auth_user_id();

CREATE OR REPLACE FUNCTION public.fn_sync_auth_user_id()
RETURNS trigger
AS $$
BEGIN
  IF NEW.email IS NOT NULL THEN
    NEW.auth_user_id := (
      SELECT u.id
      FROM auth.users u
      WHERE lower(u.email) = lower(NEW.email)
      LIMIT 1
    );
  END IF;

  IF NEW.permissao IS NULL OR trim(NEW.permissao) = '' THEN
    NEW.permissao := COALESCE(NULLIF(trim(NEW.perfil), ''), 'membro');
  END IF;

  IF NEW.perfil IS NULL OR trim(NEW.perfil) = '' THEN
    NEW.perfil := NEW.permissao;
  END IF;

  IF NEW.acesso_ativo IS NULL THEN
    NEW.acesso_ativo := true;
  END IF;

  RETURN NEW;
END;
$$
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth;

CREATE TRIGGER trg_sync_auth_user_id
BEFORE INSERT OR UPDATE ON public.pessoas
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_auth_user_id();

COMMIT;

-- ============================================================
-- TESTES RAPIDOS
-- ============================================================
-- Execute depois, no SQL Editor:
--
-- SELECT tablename, policyname, roles, cmd
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
--
-- SELECT email, permissao, auth_user_id, acesso_ativo
-- FROM public.pessoas
-- WHERE email IS NOT NULL
-- ORDER BY nome
-- LIMIT 30;
--
-- Na aplicacao local:
-- 1) Faca logout.
-- 2) Limpe cache se o PWA/service worker estiver ativo.
-- 3) Faca login novamente.
-- ============================================================

-- ============================================================
-- MODO PRODUCAO - OPCIONAL, execute SOMENTE depois de recuperar
-- ============================================================
-- Quando a aplicacao estiver carregando novamente e seu usuario
-- estiver com permissao = 'admin', voce pode substituir o modo
-- recuperacao por regras por perfil.
--
-- ATENCAO: execute este bloco separadamente, nao junto com o reset.
-- ============================================================

/*
BEGIN;

DO $$
DECLARE
  policy_record record;
BEGIN
  FOR policy_record IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format(
      'DROP POLICY IF EXISTS %I ON %I.%I',
      policy_record.policyname,
      policy_record.schemaname,
      policy_record.tablename
    );
  END LOOP;
END $$;

-- Tabelas de consulta: qualquer usuario autenticado le.
DO $$
DECLARE
  lookup_table text;
BEGIN
  FOREACH lookup_table IN ARRAY ARRAY[
    'dados_igreja',
    'cargos',
    'celulas',
    'zonas_moradia',
    'atuacoes',
    'categorias_financeiras',
    'contas_financeiras'
  ]
  LOOP
    IF to_regclass('public.' || lookup_table) IS NOT NULL THEN
      EXECUTE format(
        'CREATE POLICY %I ON public.%I FOR SELECT TO authenticated USING (true)',
        'rls_auth_select_lookup',
        lookup_table
      );

      EXECUTE format(
        'CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (public.rls_is_admin()) WITH CHECK (public.rls_is_admin())',
        'rls_admin_manage_lookup',
        lookup_table
      );
    END IF;
  END LOOP;
END $$;

-- Pessoas:
CREATE POLICY "rls_pessoas_select"
ON public.pessoas
FOR SELECT
TO authenticated
USING (
  public.rls_is_staff()
  OR id = public.rls_id_pessoa()
);

CREATE POLICY "rls_pessoas_insert_staff"
ON public.pessoas
FOR INSERT
TO authenticated
WITH CHECK (public.rls_is_staff());

CREATE POLICY "rls_pessoas_update"
ON public.pessoas
FOR UPDATE
TO authenticated
USING (
  public.rls_is_staff()
  OR id = public.rls_id_pessoa()
)
WITH CHECK (
  public.rls_is_staff()
  OR id = public.rls_id_pessoa()
);

CREATE POLICY "rls_pessoas_delete_admin"
ON public.pessoas
FOR DELETE
TO authenticated
USING (public.rls_is_admin());

-- Autocadastro publico:
CREATE POLICY "rls_anon_insert_pessoas_autocadastro"
ON public.pessoas
FOR INSERT
TO anon
WITH CHECK (true);

DO $$
DECLARE
  lookup_table text;
BEGIN
  FOREACH lookup_table IN ARRAY ARRAY[
    'dados_igreja',
    'cargos',
    'celulas',
    'zonas_moradia',
    'atuacoes'
  ]
  LOOP
    IF to_regclass('public.' || lookup_table) IS NOT NULL THEN
      EXECUTE format(
        'CREATE POLICY %I ON public.%I FOR SELECT TO anon USING (true)',
        'rls_anon_select_public_lookup',
        lookup_table
      );
    END IF;
  END LOOP;
END $$;

-- Todas as demais tabelas: staff gerencia.
DO $$
DECLARE
  table_record record;
BEGIN
  FOR table_record IN
    SELECT schemaname, tablename
    FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename NOT IN (
        'pessoas',
        'dados_igreja',
        'cargos',
        'celulas',
        'zonas_moradia',
        'atuacoes',
        'categorias_financeiras',
        'contas_financeiras'
      )
  LOOP
    EXECUTE format(
      'CREATE POLICY %I ON %I.%I FOR ALL TO authenticated USING (public.rls_is_staff()) WITH CHECK (public.rls_is_staff())',
      'rls_staff_manage_all',
      table_record.schemaname,
      table_record.tablename
    );
  END LOOP;
END $$;

COMMIT;
*/
