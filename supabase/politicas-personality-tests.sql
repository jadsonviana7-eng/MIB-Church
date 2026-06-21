-- ============================================================
-- CRIAR PERMISSÕES PARA O MEMBRO SALVAR TESTE DE TEMPERAMENTOS
-- ============================================================
-- Objetivo:
-- Permitir que membros autenticados (comuns) possam inserir e ler
-- seus próprios testes de temperamento no banco de dados, enquanto
-- o staff (pastores/administradores) mantém acesso total para visualização.
--
-- Como usar:
-- 1. Copie todo o conteúdo deste arquivo.
-- 2. Cole no SQL Editor do Supabase (https://app.supabase.com -> Seu Projeto -> SQL Editor).
-- 3. Clique em "Run" (Executar).
-- ============================================================

-- Garante que RLS está ativo na tabela de testes de temperamento
ALTER TABLE public.personality_tests ENABLE ROW LEVEL SECURITY;

-- Remove políticas antigas se existirem
DROP POLICY IF EXISTS "rls_staff_manage_all" ON public.personality_tests;
DROP POLICY IF EXISTS "Permitir membros lerem seus próprios testes" ON public.personality_tests;
DROP POLICY IF EXISTS "Permitir membros inserirem seus próprios testes" ON public.personality_tests;
DROP POLICY IF EXISTS "Permitir staff gerenciar todos os testes" ON public.personality_tests;

-- 1. Política para leitura (SELECT)
-- O membro pode ler seus próprios testes, e o staff pode ler todos
CREATE POLICY "Permitir membros lerem seus próprios testes"
ON public.personality_tests
FOR SELECT
TO authenticated
USING (
  member_id = public.obter_id_pessoa()
  OR member_id = auth.uid()
  -- Permite se o perfil for do staff
  OR public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'tesoureiro', 'tesoureira', 'lider')
);

-- 2. Política para inserção (INSERT)
-- O membro pode inserir seus próprios testes, e o staff pode inserir
CREATE POLICY "Permitir membros inserirem seus próprios testes"
ON public.personality_tests
FOR INSERT
TO authenticated
WITH CHECK (
  member_id = public.obter_id_pessoa()
  OR member_id = auth.uid()
  OR public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'tesoureiro', 'tesoureira', 'lider')
);

-- 3. Política para gerenciamento completo por Staff (pastores, admin, etc.)
CREATE POLICY "Permitir staff gerenciar todos os testes"
ON public.personality_tests
FOR ALL
TO authenticated
USING (
  public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'tesoureiro', 'tesoureira', 'lider')
)
WITH CHECK (
  public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'tesoureiro', 'tesoureira', 'lider')
);
