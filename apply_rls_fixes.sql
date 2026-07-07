-- Políticas de segurança para tabelas do dashboard de membros

-- 1. mural_avisos
ALTER TABLE public.mural_avisos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Todos_leem_avisos" ON public.mural_avisos;
CREATE POLICY "Todos_leem_avisos" ON public.mural_avisos
FOR SELECT USING (ativo = true);

-- 2. eventos_ministeriais
ALTER TABLE public.eventos_ministeriais ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Todos_leem_eventos" ON public.eventos_ministeriais;
CREATE POLICY "Todos_leem_eventos" ON public.eventos_ministeriais
FOR SELECT USING (true);

-- 3. escala_confirmacoes
ALTER TABLE public.escala_confirmacoes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Membros_leem_proprias_escalas" ON public.escala_confirmacoes;
CREATE POLICY "Membros_leem_proprias_escalas" ON public.escala_confirmacoes
FOR SELECT TO authenticated USING (pessoa_id IN (SELECT id FROM public.pessoas WHERE auth_user_id = auth.uid()));

-- Permitir admin ver tudo (só por precaução)
DROP POLICY IF EXISTS "Admin_le_escalas" ON public.escala_confirmacoes;
CREATE POLICY "Admin_le_escalas" ON public.escala_confirmacoes
FOR ALL TO authenticated USING (public.tem_privilegio_elevado()) WITH CHECK (public.tem_privilegio_elevado());
