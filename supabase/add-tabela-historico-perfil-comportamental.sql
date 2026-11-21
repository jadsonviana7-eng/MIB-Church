-- ============================================================
-- TABELA DE HISTÓRICO DO TESTE DE PERFIL COMPORTAMENTAL
-- ============================================================
-- Objetivo:
-- Armazenar todas as avaliações de Perfil Comportamental (IBC / Ned Herrmann)
-- realizadas por cada membro ao longo do tempo, permitindo acompanhar sua
-- evolução comportamental e cerebral na ficha do membro e evitar repetição
-- de questões em retestes mesmo entre dispositivos diferentes.
--
-- Como usar:
-- 1. Copie todo o conteúdo deste arquivo.
-- 2. Cole no SQL Editor do Supabase (https://app.supabase.com -> Seu Projeto -> SQL Editor).
-- 3. Clique em "Run" (Executar).
-- ============================================================

CREATE TABLE IF NOT EXISTS public.historico_perfil_comportamental (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id uuid NOT NULL REFERENCES public.pessoas(id) ON DELETE CASCADE,
  perfil_aguia integer NOT NULL DEFAULT 0,
  perfil_gato integer NOT NULL DEFAULT 0,
  perfil_lobo integer NOT NULL DEFAULT 0,
  perfil_tubarao integer NOT NULL DEFAULT 0,
  perfil_pensante integer NOT NULL DEFAULT 0,
  perfil_razao integer NOT NULL DEFAULT 0,
  perfil_emocao integer NOT NULL DEFAULT 0,
  perfil_atuante integer NOT NULL DEFAULT 0,
  dominante text,
  secundario text,
  questoes_ids integer[] DEFAULT '{}',
  aplicado_por uuid REFERENCES public.pessoas(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_hist_perfil_pessoa_data
  ON public.historico_perfil_comportamental (pessoa_id, created_at DESC);

ALTER TABLE public.historico_perfil_comportamental ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir membros lerem proprio historico perfil" ON public.historico_perfil_comportamental;
DROP POLICY IF EXISTS "Permitir membros inserirem proprio historico perfil" ON public.historico_perfil_comportamental;
DROP POLICY IF EXISTS "Permitir staff gerenciar historico perfil" ON public.historico_perfil_comportamental;

-- 1. Leitura (SELECT): próprio membro ou liderança/staff
CREATE POLICY "Permitir membros lerem proprio historico perfil"
ON public.historico_perfil_comportamental
FOR SELECT
TO authenticated
USING (
  pessoa_id = public.obter_id_pessoa()
  OR public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'tesoureiro', 'tesoureira', 'lider', 'lider-celula', 'supervisor')
);

-- 2. Inserção (INSERT): próprio membro ou liderança/staff
CREATE POLICY "Permitir membros inserirem proprio historico perfil"
ON public.historico_perfil_comportamental
FOR INSERT
TO authenticated
WITH CHECK (
  pessoa_id = public.obter_id_pessoa()
  OR public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'tesoureiro', 'tesoureira', 'lider', 'lider-celula', 'supervisor')
);

-- 3. Gerenciamento completo (UPDATE/DELETE) para administração/pastorado
CREATE POLICY "Permitir staff gerenciar historico perfil"
ON public.historico_perfil_comportamental
FOR ALL
TO authenticated
USING (
  public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')
)
WITH CHECK (
  public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')
);
