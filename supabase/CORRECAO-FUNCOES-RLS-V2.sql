-- ==============================================================
-- CORREÇÃO: Atualizar Funções SEM Remover Políticas
-- ==============================================================
-- Use CREATE OR REPLACE em vez de DROP
-- ==============================================================

-- ============================================
-- FUNÇÃO 1: Obter email do usuário
-- ============================================

CREATE OR REPLACE FUNCTION public.obter_email()
RETURNS TEXT AS $$
  SELECT email FROM auth.users WHERE id = auth.uid();
$$ LANGUAGE SQL STABLE;

-- ============================================
-- FUNÇÃO 2: Obter ID da pessoa
-- ============================================

CREATE OR REPLACE FUNCTION public.obter_id_pessoa()
RETURNS UUID AS $$
  SELECT id FROM public.pessoas WHERE email = public.obter_email() LIMIT 1;
$$ LANGUAGE SQL STABLE;

-- ============================================
-- FUNÇÃO 3: Obter perfil do usuário (VERSÃO CORRIGIDA)
-- ============================================

CREATE OR REPLACE FUNCTION public.obter_perfil()
RETURNS TEXT AS $$
  SELECT COALESCE(permissao, 'membro') FROM public.pessoas 
  WHERE email = public.obter_email() 
  LIMIT 1;
$$ LANGUAGE SQL STABLE;

-- ============================================
-- FUNÇÃO 4: Obter célula do líder
-- ============================================

CREATE OR REPLACE FUNCTION public.obter_celula_lider()
RETURNS UUID AS $$
  SELECT id FROM public.celulas 
  WHERE lider_id = public.obter_id_pessoa() 
  LIMIT 1;
$$ LANGUAGE SQL STABLE;

-- ============================================
-- TESTE: Verificar se funcionam
-- ============================================

SELECT 'Funções atualizadas com sucesso!' as status;

SELECT 
  public.obter_email() as email,
  public.obter_perfil() as perfil,
  public.obter_id_pessoa() as id_pessoa,
  public.obter_celula_lider() as celula_lider;
