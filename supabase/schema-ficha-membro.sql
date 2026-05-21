-- Execute no Supabase SQL Editor (pode rodar mais de uma vez com segurança)

-- Colunas usadas pelo cadastro e pela ficha do membro
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS atuacao text;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS cidade text;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS status text DEFAULT 'ativo';
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS data_conversao date;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS batizado_aguas boolean DEFAULT false;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS conjuge_id uuid REFERENCES public.pessoas(id);
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS permissao text;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS avaliacao_escola_discipulos text;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS perfil_comportamental text;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS atividade_cerebral text;

-- Após executar: no Supabase vá em Settings → API → "Reload schema cache" (ou aguarde ~1 min)

-- Contribuições / receitas (módulo financeiro)
CREATE TABLE IF NOT EXISTS public.contribuicoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id uuid REFERENCES public.pessoas(id) ON DELETE CASCADE,
  data_contribuicao date NOT NULL DEFAULT CURRENT_DATE,
  categoria text NOT NULL DEFAULT 'Oferta',
  valor numeric(12, 2) NOT NULL DEFAULT 0,
  observacoes text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contribuicoes_pessoa ON public.contribuicoes(pessoa_id);

ALTER TABLE public.contribuicoes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contribuicoes_select_anon" ON public.contribuicoes;
CREATE POLICY "contribuicoes_select_anon" ON public.contribuicoes
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "contribuicoes_insert_anon" ON public.contribuicoes;
CREATE POLICY "contribuicoes_insert_anon" ON public.contribuicoes
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "contribuicoes_update_anon" ON public.contribuicoes;
CREATE POLICY "contribuicoes_update_anon" ON public.contribuicoes
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
