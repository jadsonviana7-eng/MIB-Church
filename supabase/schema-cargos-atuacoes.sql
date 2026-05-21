-- Cargos e atuações (Configurações + fichas de pessoas)
CREATE TABLE IF NOT EXISTS public.cargos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.atuacoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.cargos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.atuacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cargos_all_anon" ON public.cargos FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "atuacoes_all_anon" ON public.atuacoes FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS motivo_exclusao text;
