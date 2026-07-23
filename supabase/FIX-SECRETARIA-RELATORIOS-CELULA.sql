-- =================================================================================
-- FIX URGENTE: Permissão de INSERT para Secretaria em relatorios_celula
-- Execute este script no SQL Editor do Supabase.
-- Causa do erro: políticas anteriores só cobriam SELECT e UPDATE, não INSERT.
-- =================================================================================

-- 1. Remover TODAS as políticas existentes de secretaria/secretario na tabela
DROP POLICY IF EXISTS "relatorios_celula_secretario_select"  ON public.relatorios_celula;
DROP POLICY IF EXISTS "relatorios_celula_secretario_update"  ON public.relatorios_celula;
DROP POLICY IF EXISTS "secretaria_relatorios_celula_all"     ON public.relatorios_celula;

-- 2. Criar uma única política ALL cobrindo SELECT + INSERT + UPDATE + DELETE
CREATE POLICY "relatorios_celula_secretaria_all" ON public.relatorios_celula
  FOR ALL
  TO authenticated
  USING  (public.obter_perfil() IN ('secretaria', 'secretario'))
  WITH CHECK (public.obter_perfil() IN ('secretaria', 'secretario'));

-- 3. (Opcional) Confirme as políticas ativas na tabela
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'relatorios_celula';
