-- Visitantes cadastrados por célula
CREATE TABLE IF NOT EXISTS public.visitantes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  celula_id UUID NOT NULL REFERENCES public.celulas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  telefone TEXT,
  endereco TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_visitantes_celula_id ON public.visitantes(celula_id);

ALTER TABLE public.visitantes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "visitantes_admin_full" ON public.visitantes;
CREATE POLICY "visitantes_admin_full" ON public.visitantes
  FOR ALL TO authenticated
  USING (public.obter_perfil() = 'admin')
  WITH CHECK (public.obter_perfil() = 'admin');

DROP POLICY IF EXISTS "visitantes_pastor_full" ON public.visitantes;
CREATE POLICY "visitantes_pastor_full" ON public.visitantes
  FOR ALL TO authenticated
  USING (public.obter_perfil() = 'pastor')
  WITH CHECK (public.obter_perfil() = 'pastor');

DROP POLICY IF EXISTS "visitantes_secretario_select" ON public.visitantes;
CREATE POLICY "visitantes_secretario_select" ON public.visitantes
  FOR SELECT TO authenticated
  USING (public.obter_perfil() IN ('secretario', 'secretaria'));

DROP POLICY IF EXISTS "visitantes_secretario_write" ON public.visitantes;
CREATE POLICY "visitantes_secretario_write" ON public.visitantes
  FOR ALL TO authenticated
  USING (public.obter_perfil() IN ('secretario', 'secretaria'))
  WITH CHECK (public.obter_perfil() IN ('secretario', 'secretaria'));

DROP POLICY IF EXISTS "visitantes_lider_all" ON public.visitantes;
CREATE POLICY "visitantes_lider_all" ON public.visitantes
  FOR ALL TO authenticated
  USING (public.obter_perfil() = 'lider' AND celula_id = public.obter_celula_lider())
  WITH CHECK (public.obter_perfil() = 'lider' AND celula_id = public.obter_celula_lider());

DROP POLICY IF EXISTS "visitantes_membro_select" ON public.visitantes;
CREATE POLICY "visitantes_membro_select" ON public.visitantes
  FOR SELECT TO authenticated
  USING (
    public.obter_perfil() = 'membro'
    AND celula_id = (SELECT celula_id FROM public.pessoas WHERE id = public.obter_id_pessoa())
  );

DROP POLICY IF EXISTS "visitantes_staff_select" ON public.visitantes;
CREATE POLICY "visitantes_staff_select" ON public.visitantes
  FOR SELECT TO authenticated
  USING (public.obter_perfil() IN ('tesoureiro', 'tesoureira', 'financeiro', 'supervisor', 'lider-celula'));
