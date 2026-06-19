-- Tabela para armazenar bloqueios/impedimentos temporários de escalas de voluntários (ex: férias, viagens)
CREATE TABLE IF NOT EXISTS public.bloqueios_escala (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pessoa_id UUID REFERENCES public.pessoas(id) ON DELETE CASCADE NOT NULL,
    data_inicio TIMESTAMPTZ NOT NULL,
    data_fim TIMESTAMPTZ NOT NULL,
    justificativa TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE public.bloqueios_escala ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
DROP POLICY IF EXISTS "bloqueios_escala_select_all" ON public.bloqueios_escala;
DROP POLICY IF EXISTS "bloqueios_escala_manage_all" ON public.bloqueios_escala;

CREATE POLICY "bloqueios_escala_select_all" ON public.bloqueios_escala
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "bloqueios_escala_manage_all" ON public.bloqueios_escala
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
