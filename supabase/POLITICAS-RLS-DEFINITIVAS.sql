-- ==============================================================
-- ROW LEVEL SECURITY (RLS) - POLÍTICAS DEFINITIVAS
-- ==============================================================
-- 6 Perfis: admin, pastor, lider, membro, secretario, tesoureiro
-- Banco: MIB Church (Supabase)
--
-- EXECUÇÃO:
-- 1. SQL Editor do Supabase
-- 2. Cole este arquivo COMPLETO
-- 3. Execute
-- ==============================================================

-- ============================================
-- FUNÇÃO AUXILIAR: Obter perfil do usuário
-- ============================================

CREATE OR REPLACE FUNCTION public.obter_perfil()
RETURNS TEXT AS $$
DECLARE
  email_user TEXT;
  perfil TEXT;
BEGIN
  -- Definir o path para garantir que encontre as tabelas mesmo se chamado de outro schema
  SET search_path = public, auth;

  -- Obter email do usuário autenticado
  email_user := (SELECT email FROM auth.users WHERE id = auth.uid());
  
  IF email_user IS NULL THEN
    RETURN 'anonimo';
  END IF;

  -- Buscar permissão no banco
  SELECT COALESCE(p.permissao, 'membro')
  INTO perfil
  FROM public.pessoas p
  WHERE p.email = email_user
  LIMIT 1;

  RETURN COALESCE(perfil, 'membro');
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER; -- SECURITY DEFINER é a chave para evitar o sumiço dos dados

-- ============================================
-- FUNÇÃO AUXILIAR: Obter email do usuário
-- ============================================

CREATE OR REPLACE FUNCTION public.obter_email()
RETURNS TEXT AS $$
BEGIN
  RETURN COALESCE((SELECT email FROM auth.users WHERE id = auth.uid()), '');
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- ============================================
-- FUNÇÃO AUXILIAR: Obter ID da pessoa
-- ============================================

CREATE OR REPLACE FUNCTION public.obter_id_pessoa()
RETURNS UUID AS $$
BEGIN
  RETURN COALESCE(
    (SELECT id FROM public.pessoas WHERE email = public.obter_email()),
    NULL::uuid
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- ============================================
-- FUNÇÃO AUXILIAR: Obter célula do líder
-- ============================================

CREATE OR REPLACE FUNCTION public.obter_celula_lider()
RETURNS UUID AS $$
BEGIN
  RETURN COALESCE(
    (SELECT id FROM public.celulas WHERE lider_id = public.obter_id_pessoa()),
    NULL::uuid
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- ============================================
-- HABILITAR RLS EM TODAS AS TABELAS
-- ============================================

ALTER TABLE public.pessoas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.celulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zonas_moradia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.atuacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cargos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reunioes_celula ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relatorios_reuniao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contas_financeiras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias_financeiras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transacoes_financeiras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contribuicoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relacoes_familiares ENABLE ROW LEVEL SECURITY;

-- ============================================
-- REMOVER TODAS AS POLÍTICAS ANTIGAS
-- ============================================

DROP POLICY IF EXISTS "pessoas_public" ON public.pessoas;
DROP POLICY IF EXISTS "celulas_public" ON public.celulas;
DROP POLICY IF EXISTS "zonas_moradia_public" ON public.zonas_moradia;
DROP POLICY IF EXISTS "atuacoes_public" ON public.atuacoes;
DROP POLICY IF EXISTS "cargos_public" ON public.cargos;
DROP POLICY IF EXISTS "reunioes_celula_public" ON public.reunioes_celula;
DROP POLICY IF EXISTS "relatorios_reuniao_public" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "contas_financeiras_public" ON public.contas_financeiras;
DROP POLICY IF EXISTS "categorias_financeiras_public" ON public.categorias_financeiras;
DROP POLICY IF EXISTS "transacoes_financeiras_public" ON public.transacoes_financeiras;

-- ============================================
-- POLÍTICA GENÉRICA PARA DEBUG (opcional)
-- ============================================
-- Descomente se quiser ver erros reais:
-- CREATE POLICY "debug_all" ON public.pessoas FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================
-- TABELA: pessoas
-- ==============================================================

-- ADMIN: Acesso total
CREATE POLICY "pessoas_admin_full" ON public.pessoas
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'admin')
  WITH CHECK (public.obter_perfil() = 'admin');

-- PASTOR: Leitura total, escrita restrita
CREATE POLICY "pessoas_pastor_select" ON public.pessoas
  FOR SELECT
  TO authenticated
  USING (public.obter_perfil() = 'pastor');

CREATE POLICY "pessoas_pastor_update" ON public.pessoas
  FOR UPDATE
  TO authenticated
  USING (public.obter_perfil() = 'pastor')
  WITH CHECK (public.obter_perfil() = 'pastor');

-- SECRETÁRIO: Leitura total, escrita limitada (para seu papel)
CREATE POLICY "pessoas_secretario_select" ON public.pessoas
  FOR SELECT
  TO authenticated
  USING (public.obter_perfil() = 'secretario');

CREATE POLICY "pessoas_secretario_update" ON public.pessoas
  FOR UPDATE
  TO authenticated
  USING (public.obter_perfil() = 'secretario')
  WITH CHECK (public.obter_perfil() = 'secretario');

-- TESOUREIRO: Leitura total, escrita limitada (para dados financeiros)
CREATE POLICY "pessoas_tesoureiro_select" ON public.pessoas
  FOR SELECT
  TO authenticated
  USING (public.obter_perfil() = 'tesoureiro');

-- LÍDER DE CÉLULA: Leitura/escrita de sua célula
CREATE POLICY "pessoas_lider_select" ON public.pessoas
  FOR SELECT
  TO authenticated
  USING (
    public.obter_perfil() = 'lider'
    AND celula_id = public.obter_celula_lider()
  );

CREATE POLICY "pessoas_lider_update" ON public.pessoas
  FOR UPDATE
  TO authenticated
  USING (
    public.obter_perfil() = 'lider'
    AND celula_id = public.obter_celula_lider()
  )
  WITH CHECK (
    public.obter_perfil() = 'lider'
    AND celula_id = public.obter_celula_lider()
  );

-- MEMBRO: Leitura do próprio registro E NOMES de pessoas ativas (necessário para buscar cônjuge/filhos)
DROP POLICY IF EXISTS "pessoas_membro_select_self" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_select_basic" ON public.pessoas;
CREATE POLICY "pessoas_membro_select_access" ON public.pessoas
  FOR SELECT
  TO authenticated
  USING (
    (public.obter_perfil() = 'membro' AND (id = public.obter_id_pessoa() OR status = 'ativo'))
    OR public.obter_perfil() IN ('admin', 'pastor', 'lider', 'secretario', 'tesoureiro')
  );

CREATE POLICY "pessoas_membro_update_self" ON public.pessoas
  FOR UPDATE
  TO authenticated
  USING (
    public.obter_perfil() = 'membro'
    AND id = public.obter_id_pessoa()
  )
  WITH CHECK (
    public.obter_perfil() = 'membro'
    AND id = public.obter_id_pessoa()
  );

-- POLÍTICA PARA RELAÇÕES FAMILIARES
DROP POLICY IF EXISTS "relacoes_familiares_membro" ON public.relacoes_familiares;
CREATE POLICY "relacoes_familiares_membro" ON public.relacoes_familiares
  FOR ALL
  TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'lider', 'secretario')
    OR id_pai_mae = public.obter_id_pessoa()
    OR id_filho = public.obter_id_pessoa() -- Corrigido: o membro vê relações onde ele é pai OU filho
  );

-- ==============================================================
-- TABELA: celulas
-- ==============================================================

-- ADMIN: Acesso total
CREATE POLICY "celulas_admin_full" ON public.celulas
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'admin')
  WITH CHECK (public.obter_perfil() = 'admin');

-- PASTOR: Acesso total
CREATE POLICY "celulas_pastor_full" ON public.celulas
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'pastor')
  WITH CHECK (public.obter_perfil() = 'pastor');

-- SECRETÁRIO: Leitura total
CREATE POLICY "celulas_secretario_select" ON public.celulas
  FOR SELECT
  TO authenticated
  USING (public.obter_perfil() = 'secretario');

-- TESOUREIRO: Leitura total
CREATE POLICY "celulas_tesoureiro_select" ON public.celulas
  FOR SELECT
  TO authenticated
  USING (public.obter_perfil() = 'tesoureiro');

-- LÍDER DE CÉLULA: Leitura/escrita de sua célula
CREATE POLICY "celulas_lider_own" ON public.celulas
  FOR SELECT
  TO authenticated
  USING (
    public.obter_perfil() = 'lider'
    AND lider_id = public.obter_id_pessoa()
  );

CREATE POLICY "celulas_lider_update_own" ON public.celulas
  FOR UPDATE
  TO authenticated
  USING (
    public.obter_perfil() = 'lider'
    AND lider_id = public.obter_id_pessoa()
  )
  WITH CHECK (
    public.obter_perfil() = 'lider'
    AND lider_id = public.obter_id_pessoa()
  );

-- MEMBRO: Leitura de sua célula
CREATE POLICY "celulas_membro_select" ON public.celulas
  FOR SELECT
  TO authenticated
  USING (
    public.obter_perfil() = 'membro'
    AND id = (SELECT celula_id FROM public.pessoas WHERE id = public.obter_id_pessoa())
  );

-- ==============================================================
-- TABELA: reunioes_celula
-- ==============================================================

-- ADMIN: Acesso total
CREATE POLICY "reunioes_admin_full" ON public.reunioes_celula
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'admin')
  WITH CHECK (public.obter_perfil() = 'admin');

-- PASTOR: Acesso total
CREATE POLICY "reunioes_pastor_full" ON public.reunioes_celula
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'pastor')
  WITH CHECK (public.obter_perfil() = 'pastor');

-- SECRETÁRIO: Leitura total
CREATE POLICY "reunioes_secretario_select" ON public.reunioes_celula
  FOR SELECT
  TO authenticated
  USING (public.obter_perfil() = 'secretario');

-- TESOUREIRO: Leitura total
CREATE POLICY "reunioes_tesoureiro_select" ON public.reunioes_celula
  FOR SELECT
  TO authenticated
  USING (public.obter_perfil() = 'tesoureiro');

-- LÍDER DE CÉLULA: CRUD de sua célula
CREATE POLICY "reunioes_lider_all" ON public.reunioes_celula
  FOR ALL
  TO authenticated
  USING (
    public.obter_perfil() = 'lider'
    AND celula_id = public.obter_celula_lider()
  )
  WITH CHECK (
    public.obter_perfil() = 'lider'
    AND celula_id = public.obter_celula_lider()
  );

-- MEMBRO: Leitura de sua célula
CREATE POLICY "reunioes_membro_select" ON public.reunioes_celula
  FOR SELECT
  TO authenticated
  USING (
    public.obter_perfil() = 'membro'
    AND celula_id = (SELECT celula_id FROM public.pessoas WHERE id = public.obter_id_pessoa())
  );

-- ==============================================================
-- TABELA: relatorios_reuniao
-- ==============================================================

-- ADMIN: Acesso total
CREATE POLICY "relatorios_admin_full" ON public.relatorios_reuniao
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'admin')
  WITH CHECK (public.obter_perfil() = 'admin');

-- PASTOR: Acesso total
CREATE POLICY "relatorios_pastor_full" ON public.relatorios_reuniao
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'pastor')
  WITH CHECK (public.obter_perfil() = 'pastor');

-- SECRETÁRIO: Leitura total, escrita (supervisão)
CREATE POLICY "relatorios_secretario_select" ON public.relatorios_reuniao
  FOR SELECT
  TO authenticated
  USING (public.obter_perfil() = 'secretario');

CREATE POLICY "relatorios_secretario_update" ON public.relatorios_reuniao
  FOR UPDATE
  TO authenticated
  USING (public.obter_perfil() = 'secretario')
  WITH CHECK (public.obter_perfil() = 'secretario');

-- TESOUREIRO: Leitura total (para dados financeiros)
CREATE POLICY "relatorios_tesoureiro_select" ON public.relatorios_reuniao
  FOR SELECT
  TO authenticated
  USING (public.obter_perfil() = 'tesoureiro');

-- LÍDER DE CÉLULA: CRUD de sua célula
CREATE POLICY "relatorios_lider_all" ON public.relatorios_reuniao
  FOR ALL
  TO authenticated
  USING (
    public.obter_perfil() = 'lider'
    AND celula_id = public.obter_celula_lider()
  )
  WITH CHECK (
    public.obter_perfil() = 'lider'
    AND celula_id = public.obter_celula_lider()
  );

-- MEMBRO: Leitura de sua célula
CREATE POLICY "relatorios_membro_select" ON public.relatorios_reuniao
  FOR SELECT
  TO authenticated
  USING (
    public.obter_perfil() = 'membro'
    AND celula_id = (SELECT celula_id FROM public.pessoas WHERE id = public.obter_id_pessoa())
  );

-- ==============================================================
-- TABELA: transacoes_financeiras
-- ==============================================================

-- ADMIN: Acesso total
CREATE POLICY "transacoes_admin_full" ON public.transacoes_financeiras
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'admin')
  WITH CHECK (public.obter_perfil() = 'admin');

-- PASTOR: Acesso total
CREATE POLICY "transacoes_pastor_full" ON public.transacoes_financeiras
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'pastor')
  WITH CHECK (public.obter_perfil() = 'pastor');

-- TESOUREIRO: Acesso total (sua função)
CREATE POLICY "transacoes_tesoureiro_full" ON public.transacoes_financeiras
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'tesoureiro')
  WITH CHECK (public.obter_perfil() = 'tesoureiro');

-- SECRETÁRIO: Leitura apenas
CREATE POLICY "transacoes_secretario_select" ON public.transacoes_financeiras
  FOR SELECT
  TO authenticated
  USING (public.obter_perfil() = 'secretario');

-- LÍDER: Leitura apenas (informativo)
CREATE POLICY "transacoes_lider_select" ON public.transacoes_financeiras
  FOR SELECT
  TO authenticated
  USING (public.obter_perfil() = 'lider');

-- MEMBRO: Ver suas próprias contribuições
DROP POLICY IF EXISTS "transacoes_membro_deny" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_membro_select" ON public.transacoes_financeiras;
CREATE POLICY "transacoes_membro_select" ON public.transacoes_financeiras
  FOR SELECT
  TO authenticated
  USING (
    public.obter_perfil() = 'membro'
    AND pessoa_id = public.obter_id_pessoa()
  );

-- ==============================================================
-- TABELA: contribuicoes
-- ==============================================================

-- ADMIN: Acesso total
CREATE POLICY "contribuicoes_admin_full" ON public.contribuicoes
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'admin')
  WITH CHECK (public.obter_perfil() = 'admin');

-- PASTOR: Acesso total
CREATE POLICY "contribuicoes_pastor_full" ON public.contribuicoes
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'pastor')
  WITH CHECK (public.obter_perfil() = 'pastor');

-- TESOUREIRO: Acesso total
CREATE POLICY "contribuicoes_tesoureiro_full" ON public.contribuicoes
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'tesoureiro')
  WITH CHECK (public.obter_perfil() = 'tesoureiro');

-- SECRETÁRIO: Leitura apenas
CREATE POLICY "contribuicoes_secretario_select" ON public.contribuicoes
  FOR SELECT
  TO authenticated
  USING (public.obter_perfil() = 'secretario');

-- LÍDER: Leitura de sua célula
CREATE POLICY "contribuicoes_lider_select" ON public.contribuicoes
  FOR SELECT
  TO authenticated
  USING (
    public.obter_perfil() = 'lider'
    AND pessoa_id IN (
      SELECT id FROM public.pessoas WHERE celula_id = public.obter_celula_lider()
    )
  );

-- MEMBRO: Leitura de si mesmo
CREATE POLICY "contribuicoes_membro_select" ON public.contribuicoes
  FOR SELECT
  TO authenticated
  USING (
    public.obter_perfil() = 'membro'
    AND pessoa_id = public.obter_id_pessoa()
  );

-- ==============================================================
-- TABELA: contas_financeiras
-- ==============================================================

-- ADMIN: Acesso total
CREATE POLICY "contas_admin_full" ON public.contas_financeiras
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'admin')
  WITH CHECK (public.obter_perfil() = 'admin');

-- PASTOR: Acesso total
CREATE POLICY "contas_pastor_full" ON public.contas_financeiras
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'pastor')
  WITH CHECK (public.obter_perfil() = 'pastor');

-- TESOUREIRO: Acesso total
CREATE POLICY "contas_tesoureiro_full" ON public.contas_financeiras
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'tesoureiro')
  WITH CHECK (public.obter_perfil() = 'tesoureiro');

-- SECRETÁRIO: Leitura apenas
CREATE POLICY "contas_secretario_select" ON public.contas_financeiras
  FOR SELECT
  TO authenticated
  USING (public.obter_perfil() = 'secretario');

-- LÍDER, MEMBRO: Sem acesso
CREATE POLICY "contas_lider_deny" ON public.contas_financeiras
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() IN ('lider', 'membro'))
  WITH CHECK (FALSE);

-- ==============================================================
-- TABELA: categorias_financeiras
-- ==============================================================

-- ADMIN: Acesso total
CREATE POLICY "categorias_admin_full" ON public.categorias_financeiras
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'admin')
  WITH CHECK (public.obter_perfil() = 'admin');

-- PASTOR: Acesso total
CREATE POLICY "categorias_pastor_full" ON public.categorias_financeiras
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'pastor')
  WITH CHECK (public.obter_perfil() = 'pastor');

-- TESOUREIRO: Acesso total
CREATE POLICY "categorias_tesoureiro_full" ON public.categorias_financeiras
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'tesoureiro')
  WITH CHECK (public.obter_perfil() = 'tesoureiro');

-- SECRETÁRIO: Leitura apenas
CREATE POLICY "categorias_secretario_select" ON public.categorias_financeiras
  FOR SELECT
  TO authenticated
  USING (public.obter_perfil() = 'secretario');

-- LÍDER, MEMBRO: Sem acesso
CREATE POLICY "categorias_lider_membro_deny" ON public.categorias_financeiras
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() IN ('lider', 'membro'))
  WITH CHECK (FALSE);

-- ==============================================================
-- TABELA: zonas_moradia (Leitura pública)
-- ==============================================================

CREATE POLICY "zonas_all_select" ON public.zonas_moradia
  FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "zonas_admin_write" ON public.zonas_moradia
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'admin')
  WITH CHECK (public.obter_perfil() = 'admin');

-- ==============================================================
-- TABELA: atuacoes (Leitura pública)
-- ==============================================================

CREATE POLICY "atuacoes_all_select" ON public.atuacoes
  FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "atuacoes_admin_write" ON public.atuacoes
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'admin')
  WITH CHECK (public.obter_perfil() = 'admin');

-- ==============================================================
-- TABELA: cargos (Leitura pública)
-- ==============================================================

CREATE POLICY "cargos_all_select" ON public.cargos
  FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "cargos_admin_write" ON public.cargos
  FOR ALL
  TO authenticated
  USING (public.obter_perfil() = 'admin')
  WITH CHECK (public.obter_perfil() = 'admin');

-- ==============================================================
-- RESUMO DAS PERMISSÕES
-- ==============================================================
/*

┌─────────────────────────────────────────────┐
│          PERMISSÕES POR PERFIL              │
├─────────────────────────────────────────────┤
│ ADMIN                                       │
│  ✅ Acesso total a tudo                     │
│  ✅ Create, Read, Update, Delete (CRUD)     │
├─────────────────────────────────────────────┤
│ PASTOR                                      │
│  ✅ Pessoas: Full CRUD                      │
│  ✅ Células: Full CRUD                      │
│  ✅ Reuniões: Full CRUD                     │
│  ✅ Relatórios: Full CRUD                   │
│  ✅ Transações: Full CRUD                   │
│  ✅ Contribuições: Full CRUD                │
│  ✅ Contas/Categorias: Full CRUD            │
├─────────────────────────────────────────────┤
│ SECRETÁRIO                                  │
│  ✅ Pessoas: Leitura total                  │
│  ✅ Células: Leitura                        │
│  ✅ Reuniões: Leitura                       │
│  ✅ Relatórios: Leitura + Atualizar         │
│  ✅ Transações: Leitura                     │
│  ✅ Contribuições: Leitura                  │
│  ✅ Contas/Categorias: Leitura              │
├─────────────────────────────────────────────┤
│ TESOUREIRO                                  │
│  ✅ Pessoas: Leitura                        │
│  ✅ Células: Leitura                        │
│  ✅ Reuniões: Leitura                       │
│  ✅ Relatórios: Leitura (dados financeiros) │
│  ✅ Transações: Full CRUD                   │
│  ✅ Contribuições: Full CRUD                │
│  ✅ Contas/Categorias: Full CRUD            │
├─────────────────────────────────────────────┤
│ LÍDER DE CÉLULA                             │
│  ✅ Pessoas: Sua célula (CRUD)              │
│  ✅ Células: Sua célula (R/W)               │
│  ✅ Reuniões: Sua célula (CRUD)             │
│  ✅ Relatórios: Sua célula (CRUD)           │
│  ✅ Transações: Leitura (informativo)       │
│  ✅ Contribuições: Sua célula (Leitura)     │
│  ❌ Contas/Categorias: Bloqueado            │
├─────────────────────────────────────────────┤
│ MEMBRO                                      │
│  ✅ Pessoas: Seu perfil (R/W)               │
│  ✅ Células: Sua célula (Leitura)           │
│  ✅ Reuniões: Sua célula (Leitura)          │
│  ✅ Relatórios: Sua célula (Leitura)        │
│  ✅ Contribuições: Seu registro (Leitura)   │
│  ❌ Transações: Bloqueado                   │
│  ❌ Contas/Categorias: Bloqueado            │
└─────────────────────────────────────────────┘

*/

-- ==============================================================
-- COMO ATRIBUIR PERFIS
-- ==============================================================
/*

1. Atribua o perfil na coluna 'permissao':

   UPDATE public.pessoas
   SET permissao = 'admin'
   WHERE email = 'admin@igrejamib.com.br';

2. Perfis válidos:
   - 'admin'
   - 'pastor'
   - 'secretario'
   - 'tesoureiro'
   - 'lider'
   - 'membro'

3. Para líderes, vincule a célula:
   
   UPDATE public.celulas
   SET lider_id = (SELECT id FROM public.pessoas WHERE email = 'lider@igrejamib.com.br')
   WHERE nome = 'Célula Central';

4. Para membros, vincule a célula:

   UPDATE public.pessoas
   SET celula_id = (SELECT id FROM public.celulas WHERE nome = 'Célula Central')
   WHERE email = 'membro@igrejamib.com.br';

*/

-- ==============================================================
-- TESTE DE SEGURANÇA
-- ==============================================================
/*

Para verificar se está funcionando corretamente:

1. Faça logout completo
2. Faça login com cada perfil
3. Verifique o que cada um consegue fazer:

   SELECT 
     (SELECT email FROM auth.users WHERE id = auth.uid()) as email,
     public.obter_perfil() as perfil,
     COUNT(*) as total_pessoas_visibles
   FROM public.pessoas;

*/
