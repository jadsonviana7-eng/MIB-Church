-- ============================================================
-- DIAGNOSTICAR ERRO 500 - HTTP Status
-- ============================================================

-- 1. Testar cada função individualmente
SELECT 'Test 1: auth.uid()' as teste;
SELECT auth.uid();

SELECT 'Test 2: Buscar email' as teste;
SELECT email FROM auth.users WHERE id = auth.uid();

SELECT 'Test 3: Teste função obter_email()' as teste;
SELECT public.obter_email();

SELECT 'Test 4: Teste função obter_id_pessoa()' as teste;
SELECT public.obter_id_pessoa();

SELECT 'Test 5: Teste função obter_perfil()' as teste;
SELECT public.obter_perfil();

SELECT 'Test 6: Teste função obter_celula_lider()' as teste;
SELECT public.obter_celula_lider();

-- ============================================================
-- Problema encontrado:
-- Quando chamado do SQL Editor, auth.uid() = NULL
-- Então todas as funções retornam NULL/vazio
-- 
-- MAS quando é chamado DA APLICAÇÃO:
-- auth.uid() deveria ter um valor válido
-- 
-- POSSÍVEL CAUSA DO ERRO 500:
-- Pode ser erro na função que está causando exception
-- ============================================================

-- Versão SIMPLES sem PL/pgSQL (mais rápida):

CREATE OR REPLACE FUNCTION public.obter_email()
RETURNS TEXT AS $$
  SELECT COALESCE(email, '') FROM auth.users WHERE id = auth.uid()
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION public.obter_id_pessoa()
RETURNS UUID AS $$
  SELECT id FROM public.pessoas 
  WHERE email = (SELECT COALESCE(email, '') FROM auth.users WHERE id = auth.uid())
  LIMIT 1
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION public.obter_perfil()
RETURNS TEXT AS $$
  SELECT COALESCE(
    (SELECT permissao FROM public.pessoas 
     WHERE email = (SELECT COALESCE(email, '') FROM auth.users WHERE id = auth.uid())
     LIMIT 1),
    'membro'
  )
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION public.obter_celula_lider()
RETURNS UUID AS $$
  SELECT id FROM public.celulas 
  WHERE lider_id = (
    SELECT id FROM public.pessoas 
    WHERE email = (SELECT COALESCE(email, '') FROM auth.users WHERE id = auth.uid())
    LIMIT 1
  )
  LIMIT 1
$$ LANGUAGE sql STABLE;
