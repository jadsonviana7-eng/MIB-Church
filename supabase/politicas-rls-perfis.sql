-- ==============================================================
-- ROW LEVEL SECURITY (RLS) - POLÍTICAS POR PERFIL
-- ==============================================================
-- Perfis: admin, pastor, lider, membro
-- Banco de dados: MIB Church (Supabase)
--
-- EXECUÇÃO:
-- 1. SQL Editor do Supabase
-- 2. Cole este arquivo inteiro
-- 3. Execute
-- 4. Se as tabelas do módulo ministerial não existirem, execute o script
--    de criação de tabelas ministeriais primeiro.
-- ==============================================================

-- ============================================
-- 0. CRIAR TABELAS FALTANTES (se necessário)
-- ============================================

-- Tabela: reunioes_celula
-- Tabela de Eventos para as escalas
CREATE TABLE IF NOT EXISTS public.eventos_ministeriais (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT,
    local TEXT,
    data_evento TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de Escalas (quem está escalado para qual evento/função)
CREATE TABLE IF NOT EXISTS public.escalas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    evento_id UUID REFERENCES public.eventos_ministeriais(id) ON DELETE CASCADE NOT NULL,
    pessoa_id UUID REFERENCES public.pessoas(id) ON DELETE CASCADE NOT NULL,
    ministerio_id UUID REFERENCES public.ministerios(id) ON DELETE CASCADE NOT NULL,
    funcao_id UUID REFERENCES public.ministerio_funcoes(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pendente', -- pendente, confirmado, recusado
    created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.reunioes_celula (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  celula_id uuid NOT NULL REFERENCES public.celulas(id) ON DELETE CASCADE,
  data_reuniao DATE NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reunioes_celula_celula_id ON public.reunioes_celula(celula_id);

-- Tabela: relatorios_reuniao
CREATE TABLE IF NOT EXISTS public.relatorios_reuniao (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  celula_id uuid NOT NULL REFERENCES public.celulas(id) ON DELETE CASCADE,
  data_reuniao DATE NOT NULL,
  tema TEXT,
  valor_oferta DECIMAL(10, 2),
  observacoes TEXT,
  visitantes TEXT,
  criado_por TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_relatorios_reuniao_celula_id ON public.relatorios_reuniao(celula_id);

-- Tabela: contas_financeiras
CREATE TABLE IF NOT EXISTS public.contas_financeiras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Tabela: categorias_financeiras
CREATE TABLE IF NOT EXISTS public.categorias_financeiras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  tipo TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Tabela: transacoes_financeiras
CREATE TABLE IF NOT EXISTS public.transacoes_financeiras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data DATE NOT NULL,
  tipo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pendente',
  pessoa_id uuid REFERENCES public.pessoas(id),
  categoria_id uuid REFERENCES public.categorias_financeiras(id),
  conta_id uuid REFERENCES public.contas_financeiras(id),
  anotacoes TEXT,
  competencia TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_transacoes_financeiras_pessoa_id ON public.transacoes_financeiras(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_transacoes_financeiras_categoria_id ON public.transacoes_financeiras(categoria_id);

-- ============================================
-- 1. VERIFICAR SE RLS ESTÁ HABILITADO
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
ALTER TABLE public.eventos_ministeriais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escalas ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. FUNÇÃO AUXILIAR: GET_PERFIL_USUARIO
-- ============================================
-- Retorna o perfil do usuário autenticado: 'admin', 'pastor', 'lider', 'membro'
CREATE OR REPLACE FUNCTION public.get_perfil_usuario()
RETURNS TEXT AS $$
DECLARE
  user_id uuid;
  perfil text;
BEGIN
  user_id := auth.uid();
  
  IF user_id IS NULL THEN
    RETURN 'anonimo';
  END IF;

  -- Tenta buscar o perfil armazenado na coluna 'permissao' de pessoas
  SELECT COALESCE(p.permissao, 'membro')
  INTO perfil
  FROM public.pessoas p
  WHERE p.auth_user_id = user_id
  LIMIT 1;

  RETURN COALESCE(perfil, 'membro');
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================
-- 3. FUNÇÃO AUXILIAR: GET_ID_USUARIO
-- ============================================
-- Retorna o ID de pessoa do usuário autenticado
CREATE OR REPLACE FUNCTION public.get_id_usuario()
RETURNS uuid AS $$
BEGIN
  RETURN COALESCE(
    (SELECT id FROM public.pessoas WHERE auth_user_id = auth.uid()),
    NULL::uuid
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================
-- 4. FUNÇÃO AUXILIAR: GET_CELULA_LIDER
-- ============================================
-- Retorna o ID da célula que o líder coordena
CREATE OR REPLACE FUNCTION public.get_celula_lider()
RETURNS uuid AS $$
BEGIN
  RETURN COALESCE(
    (SELECT id FROM public.celulas WHERE lider_id = public.get_id_usuario()),
    NULL::uuid
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================
-- POLÍTICAS PARA A TABELA: pessoas
-- ============================================

-- DROP existing policies (se existirem)
DROP POLICY IF EXISTS "pessoas_admin_all" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_leitura" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_lider_celula_leitura" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_leitura_limitada" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_insert" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_delete" ON public.pessoas;

-- Admin: Acesso total
CREATE POLICY "pessoas_admin_all" ON public.pessoas
  FOR ALL
  TO authenticated
  USING (public.get_perfil_usuario() = 'admin')
  WITH CHECK (public.get_perfil_usuario() = 'admin');

-- Pastores: Leitura de todos, escrita restrita
CREATE POLICY "pessoas_pastor_select" ON public.pessoas
  FOR SELECT
  TO authenticated
  USING (public.get_perfil_usuario() = 'pastor');

CREATE POLICY "pessoas_pastor_update" ON public.pessoas
  FOR UPDATE
  TO authenticated
  USING (public.get_perfil_usuario() = 'pastor')
  WITH CHECK (public.get_perfil_usuario() = 'pastor');

-- Líderes de Célula: Leitura de membros da sua célula
CREATE POLICY "pessoas_lider_celula_select" ON public.pessoas
  FOR SELECT
  TO authenticated
  USING (
    public.get_perfil_usuario() = 'lider'
    AND celula_id = public.get_celula_lider()
  );

CREATE POLICY "pessoas_lider_celula_update" ON public.pessoas
  FOR UPDATE
  TO authenticated
  USING (
    public.get_perfil_usuario() = 'lider'
    AND celula_id = public.get_celula_lider()
  )
  WITH CHECK (
    public.get_perfil_usuario() = 'lider'
    AND celula_id = public.get_celula_lider()
  );

-- Membros: Leitura do próprio perfil
CREATE POLICY "pessoas_membro_select" ON public.pessoas
  FOR SELECT
  TO authenticated
  USING (
    public.get_perfil_usuario() = 'membro'
    AND id = public.get_id_usuario()
  );

-- Membros podem atualizar seu próprio perfil
CREATE POLICY "pessoas_membro_update" ON public.pessoas
  FOR UPDATE
  TO authenticated
  USING (
    public.get_perfil_usuario() = 'membro'
    AND id = public.get_id_usuario()
  )
  WITH CHECK (
    public.get_perfil_usuario() = 'membro'
    AND id = public.get_id_usuario()
  );

-- Admin pode deletar pessoas (soft delete via status)
CREATE POLICY "pessoas_delete_admin" ON public.pessoas
  FOR DELETE
  TO authenticated
  USING (public.get_perfil_usuario() = 'admin');

-- ============================================
-- POLÍTICAS PARA A TABELA: celulas
-- ============================================

DROP POLICY IF EXISTS "celulas_admin_all" ON public.celulas;
DROP POLICY IF EXISTS "celulas_pastor_select" ON public.celulas;
DROP POLICY IF EXISTS "celulas_lider_own" ON public.celulas;
DROP POLICY IF EXISTS "celulas_membro_select" ON public.celulas;

-- Admin: Acesso total
CREATE POLICY "celulas_admin_all" ON public.celulas
  FOR ALL
  TO authenticated
  USING (public.get_perfil_usuario() = 'admin')
  WITH CHECK (public.get_perfil_usuario() = 'admin');

-- Pastores: Leitura de todas as células
CREATE POLICY "celulas_pastor_select" ON public.celulas
  FOR SELECT
  TO authenticated
  USING (public.get_perfil_usuario() = 'pastor');

-- Pastores: Podem atualizar (atribuir líderes, etc)
CREATE POLICY "celulas_pastor_update" ON public.celulas
  FOR UPDATE
  TO authenticated
  USING (public.get_perfil_usuario() = 'pastor')
  WITH CHECK (public.get_perfil_usuario() = 'pastor');

-- Líderes: Leitura e atualização da sua própria célula
CREATE POLICY "celulas_lider_own" ON public.celulas
  FOR SELECT
  TO authenticated
  USING (
    public.get_perfil_usuario() = 'lider'
    AND lider_id = public.get_id_usuario()
  );

CREATE POLICY "celulas_lider_update_own" ON public.celulas
  FOR UPDATE
  TO authenticated
  USING (
    public.get_perfil_usuario() = 'lider'
    AND lider_id = public.get_id_usuario()
  )
  WITH CHECK (
    public.get_perfil_usuario() = 'lider'
    AND lider_id = public.get_id_usuario()
  );

-- Membros: Leitura de sua própria célula
CREATE POLICY "celulas_membro_select" ON public.celulas
  FOR SELECT
  TO authenticated
  USING (
    public.get_perfil_usuario() = 'membro'
    AND id = (SELECT celula_id FROM public.pessoas WHERE id = public.get_id_usuario())
  );

-- ============================================
-- POLÍTICAS PARA A TABELA: reunioes_celula
-- ============================================

DROP POLICY IF EXISTS "reunioes_celula_admin_all" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_pastor_select" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_lider" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_membro_select" ON public.reunioes_celula;

-- Admin: Acesso total
CREATE POLICY "reunioes_celula_admin_all" ON public.reunioes_celula
  FOR ALL
  TO authenticated
  USING (public.get_perfil_usuario() = 'admin')
  WITH CHECK (public.get_perfil_usuario() = 'admin');

-- Pastores: Leitura de todas as reuniões
CREATE POLICY "reunioes_celula_pastor_select" ON public.reunioes_celula
  FOR SELECT
  TO authenticated
  USING (public.get_perfil_usuario() = 'pastor');

-- Líderes: CRUD da sua célula
CREATE POLICY "reunioes_celula_lider_all" ON public.reunioes_celula
  FOR ALL
  TO authenticated
  USING (
    public.get_perfil_usuario() = 'lider'
    AND celula_id = public.get_celula_lider()
  )
  WITH CHECK (
    public.get_perfil_usuario() = 'lider'
    AND celula_id = public.get_celula_lider()
  );

-- Membros: Leitura da sua célula
CREATE POLICY "reunioes_celula_membro_select" ON public.reunioes_celula
  FOR SELECT
  TO authenticated
  USING (
    public.get_perfil_usuario() = 'membro'
    AND celula_id = (SELECT celula_id FROM public.pessoas WHERE id = public.get_id_usuario())
  );

-- ============================================
-- POLÍTICAS PARA A TABELA: relatorios_reuniao
-- ============================================

DROP POLICY IF EXISTS "relatorios_reuniao_admin_all" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_pastor_select" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_lider" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_membro_select" ON public.relatorios_reuniao;

-- Admin: Acesso total
CREATE POLICY "relatorios_reuniao_admin_all" ON public.relatorios_reuniao
  FOR ALL
  TO authenticated
  USING (public.get_perfil_usuario() = 'admin')
  WITH CHECK (public.get_perfil_usuario() = 'admin');

-- Pastores: Leitura de todos os relatórios
CREATE POLICY "relatorios_reuniao_pastor_select" ON public.relatorios_reuniao
  FOR SELECT
  TO authenticated
  USING (public.get_perfil_usuario() = 'pastor');

-- Pastores: Podem atualizar (corrigir, validar)
CREATE POLICY "relatorios_reuniao_pastor_update" ON public.relatorios_reuniao
  FOR UPDATE
  TO authenticated
  USING (public.get_perfil_usuario() = 'pastor')
  WITH CHECK (public.get_perfil_usuario() = 'pastor');

-- Líderes: CRUD da sua célula
CREATE POLICY "relatorios_reuniao_lider_all" ON public.relatorios_reuniao
  FOR ALL
  TO authenticated
  USING (
    public.get_perfil_usuario() = 'lider'
    AND celula_id = public.get_celula_lider()
  )
  WITH CHECK (
    public.get_perfil_usuario() = 'lider'
    AND celula_id = public.get_celula_lider()
  );

-- Membros: Leitura de relatórios da sua célula
CREATE POLICY "relatorios_reuniao_membro_select" ON public.relatorios_reuniao
  FOR SELECT
  TO authenticated
  USING (
    public.get_perfil_usuario() = 'membro'
    AND celula_id = (SELECT celula_id FROM public.pessoas WHERE id = public.get_id_usuario())
  );

-- ============================================
-- POLÍTICAS PARA A TABELA: transacoes_financeiras
-- ============================================

DROP POLICY IF EXISTS "transacoes_admin_all" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_pastor_all" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_lider_read" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_membro_none" ON public.transacoes_financeiras;

-- Admin: Acesso total
CREATE POLICY "transacoes_admin_all" ON public.transacoes_financeiras
  FOR ALL
  TO authenticated
  USING (public.get_perfil_usuario() = 'admin')
  WITH CHECK (public.get_perfil_usuario() = 'admin');

-- Pastores: Acesso total
CREATE POLICY "transacoes_pastor_all" ON public.transacoes_financeiras
  FOR ALL
  TO authenticated
  USING (public.get_perfil_usuario() = 'pastor')
  WITH CHECK (public.get_perfil_usuario() = 'pastor');

-- Líderes: Leitura de transações (se associadas a sua célula/zona)
CREATE POLICY "transacoes_lider_read" ON public.transacoes_financeiras
  FOR SELECT
  TO authenticated
  USING (
    public.get_perfil_usuario() = 'lider'
  );

-- Membros: Sem acesso a transações financeiras
CREATE POLICY "transacoes_membro_deny" ON public.transacoes_financeiras
  FOR ALL
  TO authenticated
  USING (false);

-- ============================================
-- POLÍTICAS PARA TABELAS AUXILIARES
-- ============================================

-- zonas_moradia: Leitura pública, escrita apenas admin
DROP POLICY IF EXISTS "zonas_moradia_select" ON public.zonas_moradia;
DROP POLICY IF EXISTS "zonas_moradia_admin" ON public.zonas_moradia;

CREATE POLICY "zonas_moradia_select" ON public.zonas_moradia
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "zonas_moradia_admin" ON public.zonas_moradia
  FOR ALL
  TO authenticated
  USING (public.get_perfil_usuario() = 'admin')
  WITH CHECK (public.get_perfil_usuario() = 'admin');

-- atuacoes: Leitura pública, escrita apenas admin
DROP POLICY IF EXISTS "atuacoes_select" ON public.atuacoes;
DROP POLICY IF EXISTS "atuacoes_admin" ON public.atuacoes;

CREATE POLICY "atuacoes_select" ON public.atuacoes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "atuacoes_admin" ON public.atuacoes
  FOR ALL
  TO authenticated
  USING (public.get_perfil_usuario() = 'admin')
  WITH CHECK (public.get_perfil_usuario() = 'admin');

-- cargos: Leitura pública, escrita apenas admin
DROP POLICY IF EXISTS "cargos_select" ON public.cargos;
DROP POLICY IF EXISTS "cargos_admin" ON public.cargos;

CREATE POLICY "cargos_select" ON public.cargos
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "cargos_admin" ON public.cargos
  FOR ALL
  TO authenticated
  USING (public.get_perfil_usuario() = 'admin')
  WITH CHECK (public.get_perfil_usuario() = 'admin');

-- ============================================
-- CONTAS FINANCEIRAS (Admin + Pastores apenas)
-- ============================================

DROP POLICY IF EXISTS "contas_financeiras_admin_pastor" ON public.contas_financeiras;
DROP POLICY IF EXISTS "contas_financeiras_deny_lider_membro" ON public.contas_financeiras;

CREATE POLICY "contas_financeiras_admin_pastor" ON public.contas_financeiras
  FOR ALL
  TO authenticated
  USING (
    public.get_perfil_usuario() IN ('admin', 'pastor')
  )
  WITH CHECK (
    public.get_perfil_usuario() IN ('admin', 'pastor')
  );

CREATE POLICY "contas_financeiras_deny_lider_membro" ON public.contas_financeiras
  FOR ALL
  TO authenticated
  USING (false);

-- ============================================
-- CATEGORIAS FINANCEIRAS (Admin + Pastores apenas)
-- ============================================

DROP POLICY IF EXISTS "categorias_financeiras_admin_pastor" ON public.categorias_financeiras;
DROP POLICY IF EXISTS "categorias_financeiras_deny_lider_membro" ON public.categorias_financeiras;

CREATE POLICY "categorias_financeiras_admin_pastor" ON public.categorias_financeiras
  FOR ALL
  TO authenticated
  USING (
    public.get_perfil_usuario() IN ('admin', 'pastor')
  )
  WITH CHECK (
    public.get_perfil_usuario() IN ('admin', 'pastor')
  );

CREATE POLICY "categorias_financeiras_deny_lider_membro" ON public.categorias_financeiras
  FOR ALL
  TO authenticated
  USING (false);

-- ============================================
-- POLÍTICAS PARA O MÓDULO DE ESCALAS
-- ============================================

-- Tabela: eventos_ministeriais
DROP POLICY IF EXISTS "eventos_ministeriais_select_all" ON public.eventos_ministeriais;
DROP POLICY IF EXISTS "eventos_ministeriais_manage_staff" ON public.eventos_ministeriais;

-- Qualquer usuário logado pode ver os eventos.
CREATE POLICY "eventos_ministeriais_select_all" ON public.eventos_ministeriais
  FOR SELECT
  TO authenticated
  USING (true);

-- Apenas admin, pastor e líder podem gerenciar (criar, editar, excluir).
CREATE POLICY "eventos_ministeriais_manage_staff" ON public.eventos_ministeriais
  FOR ALL
  TO authenticated
  USING (public.get_perfil_usuario() IN ('admin', 'pastor', 'lider'))
  WITH CHECK (public.get_perfil_usuario() IN ('admin', 'pastor', 'lider'));

-- Tabela: escalas
DROP POLICY IF EXISTS "escalas_select_all" ON public.escalas;
DROP POLICY IF EXISTS "escalas_manage_staff" ON public.escalas;
DROP POLICY IF EXISTS "escalas_update_proprio" ON public.escalas;

-- Qualquer usuário logado pode ver as escalas.
CREATE POLICY "escalas_select_all" ON public.escalas
  FOR SELECT
  TO authenticated
  USING (true);

-- Apenas admin, pastor e líder podem criar e excluir escalados.
CREATE POLICY "escalas_manage_staff" ON public.escalas
  FOR INSERT, DELETE
  TO authenticated
  USING (public.get_perfil_usuario() IN ('admin', 'pastor', 'lider'))
  WITH CHECK (public.get_perfil_usuario() IN ('admin', 'pastor', 'lider'));

-- O próprio membro pode atualizar o status da sua escala (confirmar/recusar).
CREATE POLICY "escalas_update_proprio" ON public.escalas
  FOR UPDATE
  TO authenticated
  USING (pessoa_id = public.get_id_usuario());

-- ============================================
-- RESUMO DAS PERMISSÕES
-- ============================================
/*

  PERFIL: ADMIN
  - Acesso total a todas as tabelas
  - Pode criar, ler, atualizar e deletar

  PERFIL: PASTOR
  - Pessoas: Leitura total, escrita limitada
  - Células: Leitura total, pode atualizar
  - Reuniões: Leitura total
  - Relatórios: Leitura total, pode atualizar
  - Transações Financeiras: Acesso total
  - Contas e Categorias Financeiras: Acesso total
  
  PERFIL: LIDER (Líder de Célula)
  - Pessoas: Leitura/escrita apenas de membros da sua célula
  - Células: Leitura/escrita apenas de sua própria célula
  - Reuniões: CRUD apenas de sua célula
  - Relatórios: CRUD apenas de sua célula
  - Transações Financeiras: Leitura apenas
  - Contas e Categorias Financeiras: Sem acesso
  
  PERFIL: MEMBRO
  - Pessoas: Leitura/escrita apenas do seu próprio perfil
  - Células: Leitura apenas da sua célula
  - Reuniões: Leitura apenas da sua célula
  - Relatórios: Leitura apenas de sua célula
  - Transações Financeiras: Sem acesso
  - Contas e Categorias Financeiras: Sem acesso

*/

-- ============================================
-- COMO USAR:
-- ============================================
/*

1. Defina o perfil do usuário (na coluna 'permissao' da tabela 'pessoas'):
   UPDATE public.pessoas 
   SET permissao = 'admin'
   WHERE email = 'admin@example.com';

2. Os perfis válidos são:
   - 'admin'
   - 'pastor'
   - 'lider'
   - 'membro'

3. Líderes de célula precisam estar vinculados como lider_id na tabela celulas

4. Membros precisam estar vinculados a uma célula via celula_id

*/
