-- ==============================================================
-- CORREÇÃO: Funções RLS Simplificadas
-- ==============================================================
-- As funções originais estão gerando ERRO
-- Vamos criar versões simples que funcionam
-- ==============================================================

-- ============================================
-- REMOVER FUNÇÕES ANTIGAS
-- ============================================

DROP FUNCTION IF EXISTS public.obter_perfil();
DROP FUNCTION IF EXISTS public.obter_email();
DROP FUNCTION IF EXISTS public.obter_id_pessoa();
DROP FUNCTION IF EXISTS public.obter_celula_lider();

-- ============================================
-- FUNÇÃO 1: Obter email do usuário
-- ============================================
-- Super simples: apenas retorna email do auth

CREATE OR REPLACE FUNCTION public.obter_email()
RETURNS TEXT AS $$
  SELECT email FROM auth.users WHERE id = auth.uid();
$$ LANGUAGE SQL STABLE;

-- ============================================
-- FUNÇÃO 2: Obter ID da pessoa
-- ============================================
-- Busca ID pelo email

CREATE OR REPLACE FUNCTION public.obter_id_pessoa()
RETURNS UUID AS $$
  SELECT id FROM public.pessoas WHERE email = public.obter_email() LIMIT 1;
$$ LANGUAGE SQL STABLE;

-- ============================================
-- FUNÇÃO 3: Obter perfil do usuário
-- ============================================
-- Retorna 'membro' se não encontrar

CREATE OR REPLACE FUNCTION public.obter_perfil()
RETURNS TEXT AS $$
  SELECT COALESCE(permissao, 'membro') FROM public.pessoas 
  WHERE email = public.obter_email() 
  LIMIT 1;
$$ LANGUAGE SQL STABLE;

-- ============================================
-- FUNÇÃO 4: Obter célula do líder
-- ============================================
-- Se for líder, retorna sua célula

CREATE OR REPLACE FUNCTION public.obter_celula_lider()
RETURNS UUID AS $$
  SELECT id FROM public.celulas 
  WHERE lider_id = public.obter_id_pessoa() 
  LIMIT 1;
$$ LANGUAGE SQL STABLE;

-- ============================================
-- TESTE RÁPIDO
-- ============================================

SELECT 'Funções criadas com sucesso!' as status;

-- Teste cada função
SELECT 
  public.obter_email() as email,
  public.obter_perfil() as perfil,
  public.obter_id_pessoa() as id_pessoa;
