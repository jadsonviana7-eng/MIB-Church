-- ==============================================================================
-- CORREÇÃO DEFINITIVA DE PERMISSÕES PARA O PERFIL SECRETARIA / SECRETÁRIO
-- MIB CHURCH (Supabase PostgreSQL RLS & Overrides Manuais)
--
-- CORREÇÃO CRÍTICA APLICADA:
-- Corrigido erro "0A000: SET is not allowed in a non-volatile function".
-- 'SET search_path' agora fica na assinatura da função e não dentro do corpo BEGIN.
--
-- INSTRUÇÕES DE EXECUÇÃO:
-- 1. Abra o painel do Supabase (https://supabase.com/dashboard)
-- 2. Selecione seu projeto MIB Church
-- 3. No menu lateral esquerdo, clique em "SQL Editor"
-- 4. Cole TODO o conteúdo deste arquivo e clique no botão "RUN" (ou CTRL+ENTER)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. NORMALIZAÇÃO DOS CADASTROS EXISTENTES NA TABELA PESSOAS
-- ------------------------------------------------------------------------------
UPDATE public.pessoas
SET permissao = 'secretaria'
WHERE LOWER(TRIM(permissao)) IN ('secretaria', 'secretario', 'secretária', 'secretário');

-- Limpa permissoes_json com chaves desativadas em lote para a Secretaria
-- garantindo que o perfil utilize as regras oficiais e completas do perfil Secretaria
UPDATE public.pessoas
SET permissoes_json = '{}'::jsonb
WHERE LOWER(TRIM(permissao)) IN ('secretaria', 'secretario', 'secretária', 'secretário')
  AND permissoes_json IS NOT NULL;

UPDATE public.pessoas
SET permissao = 'tesouraria'
WHERE LOWER(TRIM(permissao)) IN ('tesouraria', 'tesoureiro', 'tesoureira');

UPDATE public.pessoas
SET permissao = 'pastor'
WHERE LOWER(TRIM(permissao)) IN ('pastor', 'pastora');

UPDATE public.pessoas
SET permissao = 'admin'
WHERE LOWER(TRIM(permissao)) IN ('admin', 'administrador');

-- ------------------------------------------------------------------------------
-- 2. FUNÇÕES AUXILIARES SEGURAS (SEM 'SET' DENTRO DO CORPO)
-- ------------------------------------------------------------------------------

-- Função: Obter e-mail do usuário autenticado
CREATE OR REPLACE FUNCTION public.obter_email()
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT email FROM auth.users WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public, auth;

GRANT EXECUTE ON FUNCTION public.obter_email() TO authenticated, anon;

-- Função: Obter id da pessoa correspondente
CREATE OR REPLACE FUNCTION public.obter_id_pessoa()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT p.id FROM public.pessoas p 
    WHERE p.auth_user_id = auth.uid() 
       OR LOWER(TRIM(p.email)) = LOWER(TRIM((SELECT email FROM auth.users WHERE id = auth.uid())))
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public, auth;

GRANT EXECUTE ON FUNCTION public.obter_id_pessoa() TO authenticated, anon;

-- Função: Obter ID da célula em que o usuário é líder
CREATE OR REPLACE FUNCTION public.obter_celula_lider()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT c.id FROM public.celulas c 
    WHERE c.lider_id = public.obter_id_pessoa()
       OR c.co_lider_id = public.obter_id_pessoa()
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public, auth;

GRANT EXECUTE ON FUNCTION public.obter_celula_lider() TO authenticated, anon;

-- Função: Obter Perfil normalizado
CREATE OR REPLACE FUNCTION public.obter_perfil()
RETURNS TEXT AS $$
DECLARE
  v_email TEXT;
  v_permissao TEXT;
BEGIN
  v_email := (SELECT email FROM auth.users WHERE id = auth.uid());
  
  IF v_email IS NULL THEN
    RETURN 'anonimo';
  END IF;

  SELECT LOWER(TRIM(COALESCE(p.permissao, 'membro')))
  INTO v_permissao
  FROM public.pessoas p
  WHERE LOWER(TRIM(p.email)) = LOWER(TRIM(v_email))
     OR p.auth_user_id = auth.uid()
  LIMIT 1;

  -- Normaliza secretaria/secretario (retorna 'secretaria')
  IF v_permissao IN ('secretaria', 'secretario', 'secretária', 'secretário') THEN
    RETURN 'secretaria';
  END IF;

  -- Normaliza tesouraria/tesoureiro
  IF v_permissao IN ('tesouraria', 'tesoureiro', 'tesoureira', 'financeiro') THEN
    RETURN 'tesouraria';
  END IF;

  -- Normaliza liderança
  IF v_permissao LIKE '%lider%' OR v_permissao LIKE '%celula%' OR v_permissao LIKE '%supervisor%' THEN
    RETURN 'lider';
  END IF;

  -- Normaliza pastoral
  IF v_permissao IN ('pastor', 'pastora') THEN
    RETURN 'pastor';
  END IF;

  -- Normaliza admin
  IF v_permissao IN ('admin', 'administrador') THEN
    RETURN 'admin';
  END IF;

  RETURN COALESCE(v_permissao, 'membro');
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public, auth;

GRANT EXECUTE ON FUNCTION public.obter_perfil() TO authenticated, anon;

-- Função: Obter permissão manual (Retorna NULL se não encontrada, permitindo o fallback do perfil)
CREATE OR REPLACE FUNCTION public.obter_permissao_manual(modulo_bloco text, acao text DEFAULT NULL)
RETURNS BOOLEAN AS $$
DECLARE
  v_permissoes jsonb;
  v_chave text;
BEGIN
  IF public.obter_perfil() = 'admin' THEN
    RETURN true;
  END IF;

  SELECT permissoes_json INTO v_permissoes 
  FROM public.pessoas 
  WHERE auth_user_id = auth.uid() 
     OR LOWER(TRIM(email)) = LOWER(TRIM((SELECT email FROM auth.users WHERE id = auth.uid())))
  LIMIT 1;

  IF v_permissoes IS NULL OR v_permissoes = '{}'::jsonb THEN
    RETURN NULL;
  END IF;

  -- Gestor financeiro bypass
  IF split_part(modulo_bloco, '|', 1) = 'Financeiro' AND (
    (v_permissoes->>'Financeiro|Gestor financeiro')::boolean = true OR
    (v_permissoes->>'Financeiro|Gestor financeiro|ver')::boolean = true
  ) THEN
    RETURN true;
  END IF;

  IF acao IS NOT NULL THEN
    v_chave := modulo_bloco || '|' || acao;
    IF (v_permissoes->>v_chave)::boolean = true THEN
      RETURN true;
    END IF;
  ELSE
    IF (v_permissoes->>modulo_bloco)::boolean = true OR (v_permissoes->>(modulo_bloco || '|ver'))::boolean = true THEN
      RETURN true;
    END IF;
  END IF;

  RETURN NULL;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public, auth;

GRANT EXECUTE ON FUNCTION public.obter_permissao_manual(text, text) TO authenticated, anon;

-- ------------------------------------------------------------------------------
-- 3. POLÍTICAS RLS PARA TABELA: pessoas
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "pessoas_select_policy" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_insert_policy" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_update_policy" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_delete_policy" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_secretario_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_secretario_update" ON public.pessoas;

CREATE POLICY "pessoas_select_policy" ON public.pessoas
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario', 'tesouraria', 'tesoureiro')
    OR (
      public.obter_perfil() = 'lider'
      AND (celula_id = public.obter_celula_lider() OR id = public.obter_id_pessoa())
    )
    OR (
      public.obter_perfil() = 'membro'
      AND (id = public.obter_id_pessoa() OR status = 'ativo')
    )
    OR COALESCE(
      public.obter_permissao_manual('Pessoas|Ver todos', 'ver') OR public.obter_permissao_manual('Pessoas|Ficha do membro', 'ver'),
      false
    )
  );

CREATE POLICY "pessoas_insert_policy" ON public.pessoas
  FOR INSERT TO authenticated
  WITH CHECK (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario')
    OR (
      public.obter_perfil() = 'lider'
      AND celula_id = public.obter_celula_lider()
    )
    OR COALESCE(public.obter_permissao_manual('Pessoas|Adicionar pessoa', 'editar'), false)
  );

CREATE POLICY "pessoas_update_policy" ON public.pessoas
  FOR UPDATE TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario')
    OR (
      public.obter_perfil() = 'lider'
      AND (celula_id = public.obter_celula_lider() OR celula_id IS NULL OR id = public.obter_id_pessoa())
    )
    OR (
      public.obter_perfil() = 'membro'
      AND id = public.obter_id_pessoa()
    )
    OR COALESCE(public.obter_permissao_manual('Pessoas|Ficha do membro', 'editar'), false)
  )
  WITH CHECK (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario')
    OR (
      public.obter_perfil() = 'lider'
      AND (celula_id = public.obter_celula_lider() OR id = public.obter_id_pessoa())
    )
    OR (
      public.obter_perfil() = 'membro'
      AND id = public.obter_id_pessoa()
    )
    OR COALESCE(public.obter_permissao_manual('Pessoas|Ficha do membro', 'editar'), false)
  );

-- ------------------------------------------------------------------------------
-- 4. POLÍTICAS RLS PARA TABELA: celulas
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "celulas_select_policy" ON public.celulas;
DROP POLICY IF EXISTS "celulas_insert_policy" ON public.celulas;
DROP POLICY IF EXISTS "celulas_update_policy" ON public.celulas;
DROP POLICY IF EXISTS "celulas_secretario_select" ON public.celulas;

CREATE POLICY "celulas_select_policy" ON public.celulas
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario', 'tesouraria', 'tesoureiro')
    OR (
      public.obter_perfil() = 'lider'
      AND (lider_id = public.obter_id_pessoa() OR co_lider_id = public.obter_id_pessoa() OR auxiliar_id = public.obter_id_pessoa())
    )
    OR (
      public.obter_perfil() = 'membro'
      AND id = (SELECT celula_id FROM public.pessoas WHERE id = public.obter_id_pessoa())
    )
    OR COALESCE(public.obter_permissao_manual('Células|Lista de células', 'ver'), false)
  );

CREATE POLICY "celulas_insert_policy" ON public.celulas
  FOR INSERT TO authenticated
  WITH CHECK (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario')
    OR COALESCE(public.obter_permissao_manual('Células|Nova célula', 'editar'), false)
  );

CREATE POLICY "celulas_update_policy" ON public.celulas
  FOR UPDATE TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario')
    OR (
      public.obter_perfil() = 'lider'
      AND (lider_id = public.obter_id_pessoa() OR co_lider_id = public.obter_id_pessoa() OR auxiliar_id = public.obter_id_pessoa())
    )
    OR COALESCE(public.obter_permissao_manual('Células|Detalhes da célula', 'editar'), false)
  )
  WITH CHECK (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario')
    OR (
      public.obter_perfil() = 'lider'
      AND (lider_id = public.obter_id_pessoa() OR co_lider_id = public.obter_id_pessoa() OR auxiliar_id = public.obter_id_pessoa())
    )
    OR COALESCE(public.obter_permissao_manual('Células|Detalhes da célula', 'editar'), false)
  );

-- ------------------------------------------------------------------------------
-- 5. POLÍTICAS RLS PARA TABELA: relatorios_celula & presencas_relatorio
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "relatorios_celula_staff_all" ON public.relatorios_celula;
DROP POLICY IF EXISTS "relatorios_celula_select_policy" ON public.relatorios_celula;
DROP POLICY IF EXISTS "relatorios_celula_write_policy" ON public.relatorios_celula;

CREATE POLICY "relatorios_celula_staff_all" ON public.relatorios_celula
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario')
    OR (
      public.obter_perfil() = 'lider'
      AND celula_id = public.obter_celula_lider()
    )
  )
  WITH CHECK (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario')
    OR (
      public.obter_perfil() = 'lider'
      AND celula_id = public.obter_celula_lider()
    )
  );

DROP POLICY IF EXISTS "presencas_relatorio_staff_all" ON public.presencas_relatorio;
DROP POLICY IF EXISTS "presencas_relatorio_select_policy" ON public.presencas_relatorio;
DROP POLICY IF EXISTS "presencas_relatorio_write_policy" ON public.presencas_relatorio;

CREATE POLICY "presencas_relatorio_staff_all" ON public.presencas_relatorio
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario', 'lider')
  )
  WITH CHECK (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario', 'lider')
  );

-- ------------------------------------------------------------------------------
-- 6. POLÍTICAS RLS PARA TABELA: reunioes_celula
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "reunioes_celula_staff_all" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_select_policy" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_write_policy" ON public.reunioes_celula;

CREATE POLICY "reunioes_celula_staff_all" ON public.reunioes_celula
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario')
    OR (
      public.obter_perfil() = 'lider'
      AND celula_id = public.obter_celula_lider()
    )
    OR (
      public.obter_perfil() = 'membro'
      AND celula_id = (SELECT celula_id FROM public.pessoas WHERE id = public.obter_id_pessoa())
    )
  )
  WITH CHECK (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario')
    OR (
      public.obter_perfil() = 'lider'
      AND celula_id = public.obter_celula_lider()
    )
  );

-- ------------------------------------------------------------------------------
-- 7. POLÍTICAS RLS PARA TABELA: visitantes
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "visitantes_staff_all" ON public.visitantes;
DROP POLICY IF EXISTS "visitantes_select_policy" ON public.visitantes;
DROP POLICY IF EXISTS "visitantes_write_policy" ON public.visitantes;

CREATE POLICY "visitantes_staff_all" ON public.visitantes
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario', 'lider')
  )
  WITH CHECK (
    public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario', 'lider')
  );

-- ------------------------------------------------------------------------------
-- 8. POLÍTICAS RLS PARA TABELA: mural_avisos
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "mural_staff_manage" ON public.mural_avisos;
DROP POLICY IF EXISTS "mural_avisos_select" ON public.mural_avisos;
DROP POLICY IF EXISTS "Admin gerencia mural" ON public.mural_avisos;

CREATE POLICY "mural_avisos_select" ON public.mural_avisos
  FOR SELECT TO authenticated, anon
  USING (true);

CREATE POLICY "mural_staff_manage" ON public.mural_avisos
  FOR ALL TO authenticated
  USING (public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario'))
  WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretaria', 'secretario'));

-- ------------------------------------------------------------------------------
-- 9. TABELAS AUXILIARES DE LEITURA (cargos, atuacoes, zonas_moradia)
-- ------------------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'cargos') THEN
    DROP POLICY IF EXISTS "cargos_select_all" ON public.cargos;
    CREATE POLICY "cargos_select_all" ON public.cargos FOR SELECT TO authenticated, anon USING (true);
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'atuacoes') THEN
    DROP POLICY IF EXISTS "atuacoes_select_all" ON public.atuacoes;
    CREATE POLICY "atuacoes_select_all" ON public.atuacoes FOR SELECT TO authenticated, anon USING (true);
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'zonas_moradia') THEN
    DROP POLICY IF EXISTS "zonas_moradia_select_all" ON public.zonas_moradia;
    CREATE POLICY "zonas_moradia_select_all" ON public.zonas_moradia FOR SELECT TO authenticated, anon USING (true);
  END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 10. CONFIRMAÇÃO DE STATUS
-- ------------------------------------------------------------------------------
SELECT 'Correção definitiva de permissões para Secretaria e funções RLS aplicada com sucesso!' AS status;
