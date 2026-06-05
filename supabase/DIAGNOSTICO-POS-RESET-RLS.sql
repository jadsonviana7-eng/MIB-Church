-- ============================================================
-- DIAGNOSTICO POS RESET RLS - MIB CHURCH
-- ============================================================
-- Troque o e-mail abaixo pelo e-mail REAL usado no login.
-- Execute no SQL Editor do Supabase.
-- ============================================================

-- 1. Defina aqui o e-mail que voce usa para entrar no app.
WITH alvo AS (
  SELECT lower('seu-email-real@example.com') AS email
)
SELECT
  'pessoas' AS origem,
  p.id,
  p.nome,
  p.email,
  p.permissao,
  p.perfil,
  p.acesso_ativo,
  p.auth_user_id
FROM public.pessoas p
JOIN alvo a ON lower(p.email) = a.email;

-- 2. Confirme se existe usuario no Supabase Auth com o mesmo e-mail.
WITH alvo AS (
  SELECT lower('seu-email-real@example.com') AS email
)
SELECT
  'auth.users' AS origem,
  u.id,
  u.email,
  u.email_confirmed_at,
  u.last_sign_in_at,
  u.created_at
FROM auth.users u
JOIN alvo a ON lower(u.email) = a.email;

-- 3. Promova o e-mail real para admin e sincronize com auth.users.
-- Troque o e-mail antes de executar.
UPDATE public.pessoas p
SET
  permissao = 'admin',
  perfil = 'admin',
  acesso_ativo = true,
  auth_user_id = u.id
FROM auth.users u
WHERE lower(p.email) = lower('seu-email-real@example.com')
  AND lower(u.email) = lower('seu-email-real@example.com');

-- 4. Se o SELECT abaixo retornar zero linhas, o e-mail nao existe em pessoas
-- ou nao existe em auth.users com o mesmo endereco.
SELECT
  p.id,
  p.nome,
  p.email,
  p.permissao,
  p.perfil,
  p.acesso_ativo,
  p.auth_user_id,
  u.id AS auth_id,
  u.email AS auth_email
FROM public.pessoas p
LEFT JOIN auth.users u ON lower(u.email) = lower(p.email)
WHERE lower(p.email) = lower('seu-email-real@example.com');

-- 5. Conferir policies criadas pelo reset.
SELECT
  tablename,
  policyname,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
