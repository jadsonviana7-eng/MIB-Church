-- ==========================================
-- POLÍTICAS RLS PARA O PERFIL: TESOURARIA
-- ==========================================
-- Este script implementa o acesso padrão para o perfil Tesouraria.
-- Permissões: Perfil 'tesouraria' OU permissão manual via 'permissoes_json'.

-- Limpeza de políticas antigas para evitar conflitos
DROP POLICY IF EXISTS "Tesoureiro - Ver pessoas" ON public.pessoas;
DROP POLICY IF EXISTS "Tesouraria - Ver pessoas" ON public.pessoas;
DROP POLICY IF EXISTS "Tesouraria - Ver células" ON public.celulas;
DROP POLICY IF EXISTS "Tesouraria - Ver reuniões" ON public.reunioes_celula;
DROP POLICY IF EXISTS "Tesouraria - Ver relatórios" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "Tesouraria - Gestão de transações" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "Tesouraria - Gestão de contribuições" ON public.contribuicoes;
DROP POLICY IF EXISTS "Tesouraria - Gestão de contas" ON public.contas_financeiras;
DROP POLICY IF EXISTS "Tesouraria - Gestão de categorias" ON public.categorias_financeiras;
DROP POLICY IF EXISTS "Tesouraria - Ver zonas" ON public.zonas_moradia;
DROP POLICY IF EXISTS "Tesouraria - Ver atuações" ON public.atuacoes;
DROP POLICY IF EXISTS "Tesouraria - Ver cargos" ON public.cargos;

-- Função auxiliar para verificar permissão dinâmica no JSON
-- Considera o perfil 'tesouraria' OU se o campo 'modulo_financeiro' no JSON é true
CREATE OR REPLACE FUNCTION public.tem_acesso_financeiro()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.pessoas
    WHERE auth_user_id = auth.uid()
    AND (permissao = 'tesouraria' OR permissao = 'admin' OR permissao = 'pastor' OR (permissoes_json->>'modulo_financeiro')::boolean = true)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PESSOAS (Leitura para identificar contribuintes)
CREATE POLICY "Tesouraria - Ver pessoas" ON public.pessoas
FOR SELECT TO authenticated 
USING (public.tem_acesso_financeiro());

-- 2. CÉLULAS (Leitura para relatórios financeiros por célula)
CREATE POLICY "Tesouraria - Ver células" ON public.celulas
FOR SELECT TO authenticated 
USING (public.tem_acesso_financeiro());

-- 3. REUNIÕES DE CÉLULA (Leitura)
CREATE POLICY "Tesouraria - Ver reuniões" ON public.reunioes_celula
FOR SELECT TO authenticated 
USING (public.tem_acesso_financeiro());

-- 4. RELATÓRIOS DE REUNIÃO (Leitura)
CREATE POLICY "Tesouraria - Ver relatórios" ON public.relatorios_reuniao
FOR SELECT TO authenticated 
USING (public.tem_acesso_financeiro());

-- 5. TRANSAÇÕES FINANCEIRAS (Acesso Total - CRUD)
CREATE POLICY "Tesouraria - Gestão de transações" ON public.transacoes_financeiras
FOR ALL TO authenticated 
USING (public.tem_acesso_financeiro())
WITH CHECK (public.tem_acesso_financeiro());

-- 7. CONTAS FINANCEIRAS (Acesso Total - CRUD)
CREATE POLICY "Tesouraria - Gestão de contas" ON public.contas_financeiras
FOR ALL TO authenticated 
USING (public.tem_acesso_financeiro())
WITH CHECK (public.tem_acesso_financeiro());

-- 8. CATEGORIAS FINANCEIRAS (Acesso Total - CRUD)
CREATE POLICY "Tesouraria - Gestão de categorias" ON public.categorias_financeiras
FOR ALL TO authenticated 
USING (public.tem_acesso_financeiro())
WITH CHECK (public.tem_acesso_financeiro());

-- 9. TABELAS DE APOIO (Apenas Leitura)
CREATE POLICY "Tesouraria - Ver zonas" ON public.zonas_moradia
FOR SELECT TO authenticated 
USING (public.tem_acesso_financeiro());

CREATE POLICY "Tesouraria - Ver atuações" ON public.atuacoes
FOR SELECT TO authenticated 
USING (public.tem_acesso_financeiro());

CREATE POLICY "Tesouraria - Ver cargos" ON public.cargos
FOR SELECT TO authenticated 
USING (public.tem_acesso_financeiro());