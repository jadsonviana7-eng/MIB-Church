-- ============================================================
-- FRAMEWORK DE PERMISSÕES MANUAIS SEGURO & CONSISTENTE (SUPABASE RLS)
-- ============================================================
-- Objetivo:
-- 1. Cria a função public.obter_permissao_manual(modulo_bloco, acao)
-- 2. Limpa políticas RLS antigas conflitantes
-- 3. Cria novas políticas RLS integrando as permissões manuais de forma
--    exclusiva (se existirem) ou usando o fallback por cargo padrão.
-- ============================================================

-- 1. CRIAR OU ATUALIZAR FUNÇÃO DE PERMISSÃO MANUAL
CREATE OR REPLACE FUNCTION public.obter_permissao_manual(modulo_bloco text, acao text DEFAULT NULL)
RETURNS BOOLEAN AS $$
DECLARE
  v_permissoes jsonb;
  v_chave text;
BEGIN
  -- Se for admin, possui acesso total bypass
  IF public.obter_perfil() = 'admin' THEN
    RETURN true;
  END IF;

  -- Obter email e buscar permissoes_json do usuário ativo
  SELECT permissoes_json INTO v_permissoes 
  FROM public.pessoas 
  WHERE email = public.obter_email() 
  LIMIT 1;

  -- Se não possui configurações manuais salvas ou se o objeto for vazio, retorna NULL
  -- para que o RLS caia no comportamento padrão de cargos (Fallback)
  IF v_permissoes IS NULL OR v_permissoes = '{}'::jsonb THEN
    RETURN NULL;
  END IF;

  -- Bypass Total do Módulo Financeiro se "Gestor financeiro" estiver ativo
  IF split_part(modulo_bloco, '|', 1) = 'Financeiro' AND (
    (v_permissoes->>'Financeiro|Gestor financeiro')::boolean = true OR
    (v_permissoes->>'Financeiro|Gestor financeiro|ver')::boolean = true OR
    (v_permissoes->>'Financeiro|Gestor financeiro|editar')::boolean = true OR
    (v_permissoes->>'Financeiro|Gestor financeiro|excluir')::boolean = true
  ) THEN
    RETURN true;
  END IF;

  -- Se foi especificada uma ação granular ('ver', 'editar', 'excluir')
  IF acao IS NOT NULL THEN
    v_chave := modulo_bloco || '|' || acao;
    RETURN COALESCE((v_permissoes->>v_chave)::boolean, false);
  ELSE
    -- Sem ação: verifica se o bloco principal está ativo ou se a ação 'ver' está ativa
    RETURN COALESCE(
      (v_permissoes->>modulo_bloco)::boolean, 
      (v_permissoes->>(modulo_bloco || '|ver'))::boolean, 
      false
    );
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 2. LIMPAR POLÍTICAS RLS ANTIGAS CONFLITANTES
-- Tabela: pessoas
DROP POLICY IF EXISTS "pessoas_admin_full" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_secretario_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_secretario_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_tesoureiro_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_lider_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_lider_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_select_access" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_update_self" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_select_policy" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_update_policy" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_delete_policy" ON public.pessoas;

-- Tabela: celulas
DROP POLICY IF EXISTS "celulas_admin_full" ON public.celulas;
DROP POLICY IF EXISTS "celulas_pastor_full" ON public.celulas;
DROP POLICY IF EXISTS "celulas_secretario_select" ON public.celulas;
DROP POLICY IF EXISTS "celulas_tesoureiro_select" ON public.celulas;
DROP POLICY IF EXISTS "celulas_lider_own" ON public.celulas;
DROP POLICY IF EXISTS "celulas_lider_update_own" ON public.celulas;
DROP POLICY IF EXISTS "celulas_membro_select" ON public.celulas;
DROP POLICY IF EXISTS "celulas_select_policy" ON public.celulas;
DROP POLICY IF EXISTS "celulas_write_policy" ON public.celulas;

-- Tabela: transacoes_financeiras
DROP POLICY IF EXISTS "transacoes_admin_full" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_pastor_full" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_tesoureiro_full" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_secretario_select" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_lider_select" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_membro_select" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_select_policy" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_insert_policy" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_update_policy" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_delete_policy" ON public.transacoes_financeiras;

-- Tabela: categorias_financeiras
DROP POLICY IF EXISTS "categorias_admin_full" ON public.categorias_financeiras;
DROP POLICY IF EXISTS "categorias_pastor_full" ON public.categorias_financeiras;
DROP POLICY IF EXISTS "categorias_tesoureiro_full" ON public.categorias_financeiras;
DROP POLICY IF EXISTS "categorias_secretario_select" ON public.categorias_financeiras;
DROP POLICY IF EXISTS "categorias_lider_membro_deny" ON public.categorias_financeiras;
DROP POLICY IF EXISTS "categorias_select_policy" ON public.categorias_financeiras;
DROP POLICY IF EXISTS "categorias_write_policy" ON public.categorias_financeiras;

-- Tabela: contas_financeiras
DROP POLICY IF EXISTS "contas_admin_full" ON public.contas_financeiras;
DROP POLICY IF EXISTS "contas_pastor_full" ON public.contas_financeiras;
DROP POLICY IF EXISTS "contas_tesoureiro_full" ON public.contas_financeiras;
DROP POLICY IF EXISTS "contas_secretario_select" ON public.contas_financeiras;
DROP POLICY IF EXISTS "contas_lider_deny" ON public.contas_financeiras;
DROP POLICY IF EXISTS "contas_select_policy" ON public.contas_financeiras;
DROP POLICY IF EXISTS "contas_write_policy" ON public.contas_financeiras;


-- 3. CRIAR NOVAS POLÍTICAS RLS UNIFICADAS COM SUPORTE A OVERRIDES MANUAIS

-- ==========================================
-- TABELA: pessoas
-- ==========================================
CREATE POLICY "pessoas_select_policy" ON public.pessoas
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Pessoas|Ver todos', 'ver') OR public.obter_permissao_manual('Pessoas|Ficha do membro', 'ver'),
         public.obter_perfil() IN ('pastor', 'secretario', 'tesoureiro')
         OR (public.obter_perfil() = 'lider' AND celula_id = public.obter_celula_lider())
         OR (public.obter_perfil() = 'membro' AND (id = public.obter_id_pessoa() OR status = 'ativo'))
       )
  );

CREATE POLICY "pessoas_update_policy" ON public.pessoas
  FOR UPDATE TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Pessoas|Ficha do membro', 'editar'),
         public.obter_perfil() IN ('pastor', 'secretario')
         OR (public.obter_perfil() = 'lider' AND celula_id = public.obter_celula_lider())
         OR (public.obter_perfil() = 'membro' AND id = public.obter_id_pessoa())
       )
  )
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Pessoas|Ficha do membro', 'editar'),
         public.obter_perfil() IN ('pastor', 'secretario')
         OR (public.obter_perfil() = 'lider' AND celula_id = public.obter_celula_lider())
         OR (public.obter_perfil() = 'membro' AND id = public.obter_id_pessoa())
       )
  );

CREATE POLICY "pessoas_delete_policy" ON public.pessoas
  FOR DELETE TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Pessoas|Ficha do membro', 'excluir'),
         public.obter_perfil() IN ('pastor')
       )
  );

-- ==========================================
-- TABELA: celulas
-- ==========================================
CREATE POLICY "celulas_select_policy" ON public.celulas
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Células|Lista de células', 'ver'),
         public.obter_perfil() IN ('pastor', 'secretario', 'tesoureiro')
         OR (public.obter_perfil() = 'lider' AND lider_id = public.obter_id_pessoa())
         OR (public.obter_perfil() = 'membro' AND id = (SELECT celula_id FROM public.pessoas WHERE id = public.obter_id_pessoa()))
       )
  );

CREATE POLICY "celulas_write_policy" ON public.celulas
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Células|Nova célula', 'editar') OR public.obter_permissao_manual('Células|Detalhes da célula', 'editar'),
         public.obter_perfil() IN ('pastor')
         OR (public.obter_perfil() = 'lider' AND lider_id = public.obter_id_pessoa())
       )
  )
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Células|Nova célula', 'editar') OR public.obter_permissao_manual('Células|Detalhes da célula', 'editar'),
         public.obter_perfil() IN ('pastor')
         OR (public.obter_perfil() = 'lider' AND lider_id = public.obter_id_pessoa())
       )
  );

-- ==========================================
-- TABELA: transacoes_financeiras
-- ==========================================
CREATE POLICY "transacoes_select_policy" ON public.transacoes_financeiras
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Financeiro|Transações', 'ver'),
         public.obter_perfil() IN ('pastor', 'tesoureiro', 'secretario', 'lider')
         OR (public.obter_perfil() = 'membro' AND pessoa_id = public.obter_id_pessoa())
       )
  );

CREATE POLICY "transacoes_insert_policy" ON public.transacoes_financeiras
  FOR INSERT TO authenticated
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Financeiro|Transações', 'editar'),
         public.obter_perfil() IN ('pastor', 'tesoureiro')
       )
  );

CREATE POLICY "transacoes_update_policy" ON public.transacoes_financeiras
  FOR UPDATE TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Financeiro|Transações', 'editar'),
         public.obter_perfil() IN ('pastor', 'tesoureiro')
       )
  )
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Financeiro|Transações', 'editar'),
         public.obter_perfil() IN ('pastor', 'tesoureiro')
       )
  );

CREATE POLICY "transacoes_delete_policy" ON public.transacoes_financeiras
  FOR DELETE TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Financeiro|Transações', 'excluir'),
         public.obter_perfil() IN ('pastor', 'tesoureiro')
       )
  );

-- ==========================================
-- TABELA: categorias_financeiras
-- ==========================================
CREATE POLICY "categorias_select_policy" ON public.categorias_financeiras
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Financeiro|Categorias', 'ver'),
         public.obter_perfil() IN ('pastor', 'tesoureiro', 'secretario')
       )
  );

CREATE POLICY "categorias_write_policy" ON public.categorias_financeiras
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Financeiro|Categorias', 'editar'),
         public.obter_perfil() IN ('pastor', 'tesoureiro')
       )
  )
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Financeiro|Categorias', 'editar'),
         public.obter_perfil() IN ('pastor', 'tesoureiro')
       )
  );

-- ==========================================
-- TABELA: contas_financeiras
-- ==========================================
CREATE POLICY "contas_select_policy" ON public.contas_financeiras
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Financeiro|Contas/Caixas', 'ver'),
         public.obter_perfil() IN ('pastor', 'tesoureiro', 'secretario')
       )
  );

CREATE POLICY "contas_write_policy" ON public.contas_financeiras
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Financeiro|Contas/Caixas', 'editar'),
         public.obter_perfil() IN ('pastor', 'tesoureiro')
       )
  )
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Financeiro|Contas/Caixas', 'editar'),
         public.obter_perfil() IN ('pastor', 'tesoureiro')
       )
  );
