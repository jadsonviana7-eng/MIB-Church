-- ==============================================================
-- ATUALIZAÇÃO DE RLS E PERMISSÕES DE LIDERANÇA (MIB CHURCH) - V3
-- ==============================================================

-- 1. FUNÇÕES AUXILIARES E ATUALIZAÇÕES

-- Obter célula do líder, co-líder ou auxiliar
CREATE OR REPLACE FUNCTION public.obter_celula_lider()
RETURNS UUID AS $$
BEGIN
  RETURN COALESCE(
    (
      SELECT id FROM public.celulas 
      WHERE lider_id = public.obter_id_pessoa()
         OR co_lider_id = public.obter_id_pessoa()
         OR auxiliar_id = public.obter_id_pessoa()
      LIMIT 1
    ),
    NULL::uuid
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Verificar se é Líder de Ministério
CREATE OR REPLACE FUNCTION public.e_lider_ministerio()
RETURNS BOOLEAN AS $$
DECLARE
  v_pessoa_id UUID;
  v_is_lider BOOLEAN;
BEGIN
  v_pessoa_id := public.obter_id_pessoa();
  IF v_pessoa_id IS NULL THEN
    RETURN false;
  END IF;

  -- Verifica se é líder em qualquer ministério
  SELECT EXISTS (
    SELECT 1 FROM public.ministerio_membros
    WHERE pessoa_id = v_pessoa_id AND lider = true
  ) INTO v_is_lider;

  RETURN v_is_lider;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Buscar pessoas ativas para vincular à célula (Security Definer para ignorar RLS temporariamente)
CREATE OR REPLACE FUNCTION public.buscar_pessoas_para_celula(termo_busca TEXT)
RETURNS TABLE (
  id UUID,
  nome TEXT,
  email TEXT,
  telefone TEXT,
  celula_id UUID,
  celula_nome TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id, 
    p.nome::text, 
    p.email::text, 
    p.telefone::text, 
    p.celula_id,
    c.nome::text as celula_nome
  FROM public.pessoas p
  LEFT JOIN public.celulas c ON c.id = p.celula_id
  WHERE (p.nome ILIKE '%' || termo_busca || '%' 
     OR p.telefone ILIKE '%' || termo_busca || '%'
     OR p.email ILIKE '%' || termo_busca || '%')
    AND p.status = 'ativo'
  ORDER BY p.nome
  LIMIT 15;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 2. RESETAR POLÍTICAS ANTIGAS NAS TABELAS CONCERNENTES

-- Tabela: pessoas
DROP POLICY IF EXISTS "pessoas_select_policy" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_update_policy" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_delete_policy" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_insert_policy" ON public.pessoas;

-- Tabela: celulas
DROP POLICY IF EXISTS "celulas_select_policy" ON public.celulas;
DROP POLICY IF EXISTS "celulas_write_policy" ON public.celulas;
DROP POLICY IF EXISTS "celulas_insert_policy" ON public.celulas;
DROP POLICY IF EXISTS "celulas_update_policy" ON public.celulas;
DROP POLICY IF EXISTS "celulas_delete_policy" ON public.celulas;

-- Tabela: transacoes_financeiras
DROP POLICY IF EXISTS "transacoes_select_policy" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_insert_policy" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_update_policy" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_delete_policy" ON public.transacoes_financeiras;

-- Tabela: categorias_financeiras
DROP POLICY IF EXISTS "categorias_select_policy" ON public.categorias_financeiras;
DROP POLICY IF EXISTS "categorias_write_policy" ON public.categorias_financeiras;

-- Tabela: contas_financeiras
DROP POLICY IF EXISTS "contas_select_policy" ON public.contas_financeiras;
DROP POLICY IF EXISTS "contas_write_policy" ON public.contas_financeiras;

-- Tabela: reunioes_celula
DROP POLICY IF EXISTS "reunioes_admin_full" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_pastor_full" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_secretario_select" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_tesoureiro_select" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_lider_all" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_membro_select" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_select_policy" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_write_policy" ON public.reunioes_celula;

-- Tabela: relatorios_reuniao (Antigo nome, manter por segurança caso exista no banco)
DROP POLICY IF EXISTS "relatorios_admin_full" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_pastor_full" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_secretario_select" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_secretario_update" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_tesoureiro_select" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_lider_all" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_membro_select" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_select_policy" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_write_policy" ON public.relatorios_reuniao;

-- Tabela: relatorios_celula (NOME REAL DA TABELA NO BANCO)
DROP POLICY IF EXISTS "relatorios_celula_admin_full" ON public.relatorios_celula;
DROP POLICY IF EXISTS "relatorios_celula_pastor_full" ON public.relatorios_celula;
DROP POLICY IF EXISTS "relatorios_celula_secretario_select" ON public.relatorios_celula;
DROP POLICY IF EXISTS "relatorios_celula_secretario_update" ON public.relatorios_celula;
DROP POLICY IF EXISTS "relatorios_celula_tesoureiro_select" ON public.relatorios_celula;
DROP POLICY IF EXISTS "relatorios_celula_lider_all" ON public.relatorios_celula;
DROP POLICY IF EXISTS "relatorios_celula_membro_select" ON public.relatorios_celula;
DROP POLICY IF EXISTS "relatorios_celula_select_policy" ON public.relatorios_celula;
DROP POLICY IF EXISTS "relatorios_celula_write_policy" ON public.relatorios_celula;

-- Tabela: presencas_relatorio
DROP POLICY IF EXISTS "presencas_relatorio_select" ON public.presencas_relatorio;
DROP POLICY IF EXISTS "presencas_relatorio_staff" ON public.presencas_relatorio;
DROP POLICY IF EXISTS "presencas_relatorio_lider" ON public.presencas_relatorio;
DROP POLICY IF EXISTS "presencas_relatorio_select_policy" ON public.presencas_relatorio;
DROP POLICY IF EXISTS "presencas_relatorio_write_policy" ON public.presencas_relatorio;

-- Tabela: visitantes
DROP POLICY IF EXISTS "visitantes_admin_full" ON public.visitantes;
DROP POLICY IF EXISTS "visitantes_pastor_full" ON public.visitantes;
DROP POLICY IF EXISTS "visitantes_secretario_select" ON public.visitantes;
DROP POLICY IF EXISTS "visitantes_secretario_write" ON public.visitantes;
DROP POLICY IF EXISTS "visitantes_lider_all" ON public.visitantes;
DROP POLICY IF EXISTS "visitantes_membro_select" ON public.visitantes;
DROP POLICY IF EXISTS "visitantes_staff_select" ON public.visitantes;
DROP POLICY IF EXISTS "visitantes_select_policy" ON public.visitantes;
DROP POLICY IF EXISTS "visitantes_write_policy" ON public.visitantes;

-- Tabela: contribuicoes
DROP POLICY IF EXISTS "contribuicoes_admin_full" ON public.contribuicoes;
DROP POLICY IF EXISTS "contribuicoes_pastor_full" ON public.contribuicoes;
DROP POLICY IF EXISTS "contribuicoes_tesoureiro_full" ON public.contribuicoes;
DROP POLICY IF EXISTS "contribuicoes_secretario_select" ON public.contribuicoes;
DROP POLICY IF EXISTS "contribuicoes_lider_select" ON public.contribuicoes;
DROP POLICY IF EXISTS "contribuicoes_membro_select" ON public.contribuicoes;
DROP POLICY IF EXISTS "contribuicoes_select_policy" ON public.contribuicoes;
DROP POLICY IF EXISTS "contribuicoes_write_policy" ON public.contribuicoes;

-- Tabela: eventos_ministeriais
DROP POLICY IF EXISTS "eventos_ministeriais_select_all" ON public.eventos_ministeriais;
DROP POLICY IF EXISTS "eventos_ministeriais_manage_staff" ON public.eventos_ministeriais;
DROP POLICY IF EXISTS "Todos_leem_eventos" ON public.eventos_ministeriais;
DROP POLICY IF EXISTS "eventos_ministeriais_select_policy" ON public.eventos_ministeriais;
DROP POLICY IF EXISTS "eventos_ministeriais_write_policy" ON public.eventos_ministeriais;

-- Tabela: escalas
DROP POLICY IF EXISTS "escalas_select_all" ON public.escalas;
DROP POLICY IF EXISTS "escalas_manage_staff" ON public.escalas;
DROP POLICY IF EXISTS "escalas_update_proprio" ON public.escalas;
DROP POLICY IF EXISTS "escalas_select" ON public.escalas;
DROP POLICY IF EXISTS "escalas_insert_staff" ON public.escalas;
DROP POLICY IF EXISTS "escalas_delete_staff" ON public.escalas;
DROP POLICY IF EXISTS "escalas_select_policy" ON public.escalas;
DROP POLICY IF EXISTS "escalas_insert_policy" ON public.escalas;
DROP POLICY IF EXISTS "escalas_update_policy" ON public.escalas;
DROP POLICY IF EXISTS "escalas_delete_policy" ON public.escalas;


-- 3. CRIAR NOVAS POLÍTICAS RLS UNIFICADAS, ADITIVAS E ADAPTADAS (INCLUINDO TODOS OS PERFIS DE LÍDER)

-- ==============================================================
-- TABELA: pessoas
-- ==============================================================

-- SELECT: Líder vê sua célula E a si mesmo. Manual é somado.
CREATE POLICY "pessoas_select_policy" ON public.pessoas
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(
         public.obter_permissao_manual('Pessoas|Ver todos', 'ver') OR public.obter_permissao_manual('Pessoas|Ficha do membro', 'ver'),
         false
       )
    OR (
      public.obter_perfil() IN ('pastor', 'secretario', 'tesoureiro')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor') AND (celula_id = public.obter_celula_lider() OR id = public.obter_id_pessoa()))
      OR (public.obter_perfil() = 'membro' AND (id = public.obter_id_pessoa() OR status = 'ativo'))
    )
  );

-- INSERT: Pastor/Secretário inserem qualquer um. Líder insere na sua célula. Manual somado.
CREATE POLICY "pessoas_insert_policy" ON public.pessoas
  FOR INSERT TO authenticated
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Pessoas|Adicionar pessoa', 'editar'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'secretario')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor') AND celula_id = public.obter_celula_lider())
    )
  );

-- UPDATE: Líder atualiza sua célula, a si mesmo, ou adota um membro sem célula (celula_id IS NULL). Manual somado.
CREATE POLICY "pessoas_update_policy" ON public.pessoas
  FOR UPDATE TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Pessoas|Ficha do membro', 'editar'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'secretario')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor') AND (celula_id = public.obter_celula_lider() OR celula_id IS NULL OR id = public.obter_id_pessoa()))
      OR (public.obter_perfil() = 'membro' AND id = public.obter_id_pessoa())
    )
  )
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Pessoas|Ficha do membro', 'editar'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'secretario')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor') AND (celula_id = public.obter_celula_lider() OR id = public.obter_id_pessoa()))
      OR (public.obter_perfil() = 'membro' AND id = public.obter_id_pessoa())
    )
  );

-- DELETE: Apenas admin, pastor ou manual. Líder NUNCA exclui.
CREATE POLICY "pessoas_delete_policy" ON public.pessoas
  FOR DELETE TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Pessoas|Ficha do membro', 'excluir'), false)
    OR (
      public.obter_perfil() IN ('pastor')
    )
  );


-- ==============================================================
-- TABELA: celulas
-- ==============================================================

-- SELECT: Líder vê apenas a própria célula
CREATE POLICY "celulas_select_policy" ON public.celulas
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Células|Lista de células', 'ver'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'secretario', 'tesoureiro')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor') AND (lider_id = public.obter_id_pessoa() OR co_lider_id = public.obter_id_pessoa() OR auxiliar_id = public.obter_id_pessoa()))
      OR (public.obter_perfil() = 'membro' AND id = (SELECT celula_id FROM public.pessoas WHERE id = public.obter_id_pessoa()))
    )
  );

-- INSERT: Líder de célula não cria novas células
CREATE POLICY "celulas_insert_policy" ON public.celulas
  FOR INSERT TO authenticated
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Células|Nova célula', 'editar'), false)
    OR (
      public.obter_perfil() IN ('pastor')
    )
  );

-- UPDATE: Líder atualiza apenas a própria célula
CREATE POLICY "celulas_update_policy" ON public.celulas
  FOR UPDATE TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Células|Detalhes da célula', 'editar'), false)
    OR (
      public.obter_perfil() IN ('pastor')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor') AND (lider_id = public.obter_id_pessoa() OR co_lider_id = public.obter_id_pessoa() OR auxiliar_id = public.obter_id_pessoa()))
    )
  )
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Células|Detalhes da célula', 'editar'), false)
    OR (
      public.obter_perfil() IN ('pastor')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor') AND (lider_id = public.obter_id_pessoa() OR co_lider_id = public.obter_id_pessoa() OR auxiliar_id = public.obter_id_pessoa()))
    )
  );

-- DELETE: Líder de célula não exclui células
CREATE POLICY "celulas_delete_policy" ON public.celulas
  FOR DELETE TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Células|Detalhes da célula', 'excluir'), false)
    OR (
      public.obter_perfil() IN ('pastor')
    )
  );


-- ==============================================================
-- TABELA: transacoes_financeiras
-- ==============================================================

-- SELECT: Líder e membro veem APENAS suas próprias contribuições financeiras. Restrição total ao resto.
CREATE POLICY "transacoes_select_policy" ON public.transacoes_financeiras
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Financeiro|Transações', 'ver'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'tesoureiro', 'secretario')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor', 'membro') AND pessoa_id = public.obter_id_pessoa())
    )
  );

-- INSERT: Bloqueio total para líder/membro.
CREATE POLICY "transacoes_insert_policy" ON public.transacoes_financeiras
  FOR INSERT TO authenticated
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Financeiro|Transações', 'editar'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'tesoureiro')
    )
  );

-- UPDATE: Bloqueio total para líder/membro.
CREATE POLICY "transacoes_update_policy" ON public.transacoes_financeiras
  FOR UPDATE TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Financeiro|Transações', 'editar'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'tesoureiro')
    )
  )
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Financeiro|Transações', 'editar'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'tesoureiro')
    )
  );

-- DELETE: Bloqueio total para líder/membro.
CREATE POLICY "transacoes_delete_policy" ON public.transacoes_financeiras
  FOR DELETE TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Financeiro|Transações', 'excluir'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'tesoureiro')
    )
  );


-- ==============================================================
-- TABELA: contribuicoes
-- ==============================================================

-- SELECT: Líder e membro veem apenas as próprias contribuições
CREATE POLICY "contribuicoes_select_policy" ON public.contribuicoes
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR (
      public.obter_perfil() IN ('pastor', 'tesoureiro', 'secretario')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor', 'membro') AND pessoa_id = public.obter_id_pessoa())
    )
  );

-- WRITE (ALL): Apenas admin, pastor, tesoureiro
CREATE POLICY "contribuicoes_write_policy" ON public.contribuicoes
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'tesoureiro')
  )
  WITH CHECK (
    public.obter_perfil() IN ('admin', 'pastor', 'tesoureiro')
  );


-- ==============================================================
-- TABELA: categorias_financeiras (Aditivo/Soma)
-- ==============================================================
CREATE POLICY "categorias_select_policy" ON public.categorias_financeiras
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Financeiro|Categorias', 'ver'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'tesoureiro', 'secretario')
    )
  );

CREATE POLICY "categorias_write_policy" ON public.categorias_financeiras
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Financeiro|Categorias', 'editar'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'tesoureiro')
    )
  )
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Financeiro|Categorias', 'editar'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'tesoureiro')
    )
  );


-- ==============================================================
-- TABELA: contas_financeiras (Aditivo/Soma)
-- ==============================================================
CREATE POLICY "contas_select_policy" ON public.contas_financeiras
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Financeiro|Contas/Caixas', 'ver'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'tesoureiro', 'secretario')
    )
  );

CREATE POLICY "contas_write_policy" ON public.contas_financeiras
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Financeiro|Contas/Caixas', 'editar'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'tesoureiro')
    )
  )
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR COALESCE(public.obter_permissao_manual('Financeiro|Contas/Caixas', 'editar'), false)
    OR (
      public.obter_perfil() IN ('pastor', 'tesoureiro')
    )
  );


-- ==============================================================
-- TABELA: reunioes_celula
-- ==============================================================
CREATE POLICY "reunioes_celula_select_policy" ON public.reunioes_celula
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR (
      public.obter_perfil() IN ('pastor', 'secretario', 'tesoureiro')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor') AND celula_id = public.obter_celula_lider())
      OR (public.obter_perfil() = 'membro' AND celula_id = (SELECT celula_id FROM public.pessoas WHERE id = public.obter_id_pessoa()))
    )
  );

CREATE POLICY "reunioes_celula_write_policy" ON public.reunioes_celula
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR (
      public.obter_perfil() IN ('pastor')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor') AND celula_id = public.obter_celula_lider())
    )
  )
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR (
      public.obter_perfil() IN ('pastor')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor') AND celula_id = public.obter_celula_lider())
    )
  );


-- ==============================================================
-- TABELA: relatorios_celula (NOME CORRETO DA TABELA DE REUNIÕES)
-- ==============================================================
CREATE POLICY "relatorios_celula_select_policy" ON public.relatorios_celula
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR (
      public.obter_perfil() IN ('pastor', 'secretario', 'tesoureiro')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor') AND celula_id = public.obter_celula_lider())
      OR (public.obter_perfil() = 'membro' AND celula_id = (SELECT celula_id FROM public.pessoas WHERE id = public.obter_id_pessoa()))
    )
  );

CREATE POLICY "relatorios_celula_write_policy" ON public.relatorios_celula
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() = 'admin'
    OR (
      public.obter_perfil() IN ('pastor', 'secretario')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor') AND celula_id = public.obter_celula_lider())
    )
  )
  WITH CHECK (
    public.obter_perfil() = 'admin'
    OR (
      public.obter_perfil() IN ('pastor', 'secretario')
      OR (public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor') AND celula_id = public.obter_celula_lider())
    )
  );


-- ==============================================================
-- TABELA: presencas_relatorio (TABELA DE DETALHES DE PRESENÇA)
-- ==============================================================
CREATE POLICY "presencas_relatorio_select_policy" ON public.presencas_relatorio
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "presencas_relatorio_write_policy" ON public.presencas_relatorio
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')
    OR (
      public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor')
      AND relatorio_id IN (
        SELECT id FROM public.relatorios_celula WHERE celula_id = public.obter_celula_lider()
      )
    )
  )
  WITH CHECK (
    public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')
    OR (
      public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor')
      AND relatorio_id IN (
        SELECT id FROM public.relatorios_celula WHERE celula_id = public.obter_celula_lider()
      )
    )
  );


-- ==============================================================
-- TABELA: visitantes
-- ==============================================================
CREATE POLICY "visitantes_select_policy" ON public.visitantes
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'tesoureiro', 'tesoureira', 'financeiro')
    OR (
      public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor')
      AND celula_id = public.obter_celula_lider()
    )
    OR (
      public.obter_perfil() = 'membro'
      AND celula_id = (SELECT celula_id FROM public.pessoas WHERE id = public.obter_id_pessoa())
    )
  );

CREATE POLICY "visitantes_write_policy" ON public.visitantes
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')
    OR (
      public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor')
      AND celula_id = public.obter_celula_lider()
    )
  )
  WITH CHECK (
    public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')
    OR (
      public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor')
      AND celula_id = public.obter_celula_lider()
    )
  );


-- ==============================================================
-- TABELA: eventos_ministeriais (Gestão Ministerial)
-- ==============================================================
CREATE POLICY "eventos_ministeriais_select_policy" ON public.eventos_ministeriais
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "eventos_ministeriais_write_policy" ON public.eventos_ministeriais
  FOR ALL TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')
    OR public.e_lider_ministerio()
  )
  WITH CHECK (
    public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')
    OR public.e_lider_ministerio()
  );


-- ==============================================================
-- TABELA: escalas (Gestão Ministerial)
-- ==============================================================
CREATE POLICY "escalas_select_policy" ON public.escalas
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "escalas_insert_policy" ON public.escalas
  FOR INSERT TO authenticated
  WITH CHECK (
    public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')
    OR public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor')
    OR public.e_lider_ministerio()
  );

CREATE POLICY "escalas_update_policy" ON public.escalas
  FOR UPDATE TO authenticated
  USING (
    pessoa_id = public.obter_id_pessoa()
    OR public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')
    OR public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor')
    OR public.e_lider_ministerio()
  )
  WITH CHECK (
    pessoa_id = public.obter_id_pessoa()
    OR public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')
    OR public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor')
    OR public.e_lider_ministerio()
  );

CREATE POLICY "escalas_delete_policy" ON public.escalas
  FOR DELETE TO authenticated
  USING (
    public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')
    OR public.obter_perfil() IN ('lider', 'lider-celula', 'supervisor')
    OR public.e_lider_ministerio()
  );


-- ==============================================================
-- CONFIRMAÇÃO DE CONCLUSÃO DO PROCESSO
-- ==============================================================
SELECT 'Políticas RLS para Líderes, Relatórios de Célula, Presenças e Visitantes atualizadas com sucesso!' as status;
