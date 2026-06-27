-- Criar tabela de visitantes de culto (recepção)
CREATE TABLE IF NOT EXISTS public.visitantes_culto (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  telefone TEXT,
  zona_id BIGINT REFERENCES public.zonas_moradia(id) ON DELETE SET NULL,
  quantas_vezes TEXT NOT NULL, -- Ex: '1ª vez', '2ª vez', '3ª vez ou mais'
  esta_de_passagem BOOLEAN DEFAULT false,
  observacoes TEXT,
  data DATE DEFAULT CURRENT_DATE,
  culto TEXT NOT NULL, -- Ex: 'Domingo', 'Quinta-feira'
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.visitantes_culto ENABLE ROW LEVEL SECURITY;

-- Criar política de acesso para usuários autenticados (todas as ações)
DROP POLICY IF EXISTS "visitantes_culto_auth_all" ON public.visitantes_culto;
CREATE POLICY "visitantes_culto_auth_all" ON public.visitantes_culto
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);
