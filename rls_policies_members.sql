-- =================================================================================
-- PLANO DE POLÍTICAS DE SEGURANÇA RLS PARA MEMBROS (MIB CHURCH)
-- Execute este script na aba "SQL Editor" do seu painel do Supabase.
-- =================================================================================

-- 1. Função de utilidade para checagem de privilégios sem causar recursão infinita (SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.tem_privilegio_elevado()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.pessoas 
    WHERE auth_user_id = auth.uid() 
    AND permissao IN ('admin', 'pastor', 'secretaria', 'tesouraria', 'financeiro', 'lider-celula', 'supervisor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 2. Políticas para a tabela `pessoas` (Ficha do Membro)
ALTER TABLE public.pessoas ENABLE ROW LEVEL SECURITY;

-- Política de Leitura (SELECT)
-- O usuário pode ler o registro se for dono dele, se o registro for de um aniversariante do mês atual, ou se o usuário tiver privilégio elevado.
DROP POLICY IF EXISTS "membros_read_policy" ON public.pessoas;
CREATE POLICY "membros_read_policy" ON public.pessoas
FOR SELECT
TO authenticated
USING (
  auth_user_id = auth.uid()
  OR
  (
    data_nascimento IS NOT NULL 
    AND LENGTH(data_nascimento) = 10
    AND data_nascimento LIKE '__/__/____'
    AND SUBSTRING(data_nascimento FROM 4 FOR 2) = TO_CHAR(CURRENT_DATE, 'MM')
  )
  OR public.tem_privilegio_elevado()
);

-- Política de Atualização (UPDATE)
-- O usuário pode atualizar o próprio perfil ou se tiver privilégio elevado.
DROP POLICY IF EXISTS "membros_update_policy" ON public.pessoas;
CREATE POLICY "membros_update_policy" ON public.pessoas
FOR UPDATE
TO authenticated
USING (
  auth_user_id = auth.uid()
  OR public.tem_privilegio_elevado()
)
WITH CHECK (
  auth_user_id = auth.uid()
  OR public.tem_privilegio_elevado()
);

-- Política de Exclusão (DELETE)
-- Apenas usuários com privilégio elevado podem deletar membros.
DROP POLICY IF EXISTS "membros_delete_policy" ON public.pessoas;
CREATE POLICY "membros_delete_policy" ON public.pessoas
FOR DELETE
TO authenticated
USING (
  public.tem_privilegio_elevado()
);

-- Política de Inserção (INSERT)
-- Liberada para autocadastro, ou administradores
DROP POLICY IF EXISTS "membros_insert_policy" ON public.pessoas;
CREATE POLICY "membros_insert_policy" ON public.pessoas
FOR INSERT
TO authenticated
WITH CHECK (true);


-- 3. Políticas para a tabela `transacoes_financeiras`
ALTER TABLE public.transacoes_financeiras ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "transacoes_read_policy" ON public.transacoes_financeiras;
CREATE POLICY "transacoes_read_policy" ON public.transacoes_financeiras
FOR SELECT
TO authenticated
USING (
  -- O membro só vê as próprias transações
  pessoa_id IN (SELECT id FROM public.pessoas WHERE auth_user_id = auth.uid())
  OR 
  -- Equipe do financeiro ou admin vê tudo
  public.tem_privilegio_elevado()
);

-- Operações CRUD no financeiro bloqueadas para membros padrão
DROP POLICY IF EXISTS "transacoes_all_elevated" ON public.transacoes_financeiras;
CREATE POLICY "transacoes_all_elevated" ON public.transacoes_financeiras
FOR ALL
TO authenticated
USING (
  public.tem_privilegio_elevado()
)
WITH CHECK (
  public.tem_privilegio_elevado()
);


-- 4. Políticas para a tabela `escala_confirmacoes` (Gestão Ministerial)
ALTER TABLE public.escala_confirmacoes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "escala_confirmacoes_read" ON public.escala_confirmacoes;
CREATE POLICY "escala_confirmacoes_read" ON public.escala_confirmacoes
FOR SELECT
TO authenticated
USING (true); -- Leitura livre para ver as escalas

DROP POLICY IF EXISTS "escala_confirmacoes_update" ON public.escala_confirmacoes;
CREATE POLICY "escala_confirmacoes_update" ON public.escala_confirmacoes
FOR UPDATE
TO authenticated
USING (
  pessoa_id IN (SELECT id FROM public.pessoas WHERE auth_user_id = auth.uid())
  OR public.tem_privilegio_elevado()
)
WITH CHECK (
  pessoa_id IN (SELECT id FROM public.pessoas WHERE auth_user_id = auth.uid())
  OR public.tem_privilegio_elevado()
);
