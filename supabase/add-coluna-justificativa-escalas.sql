-- Adiciona a coluna justificativa e observacao na tabela escalas para registro de apontamentos de presença/falta
ALTER TABLE public.escalas ADD COLUMN IF NOT EXISTS justificativa TEXT;
ALTER TABLE public.escalas ADD COLUMN IF NOT EXISTS apontado_por UUID REFERENCES public.pessoas(id) ON DELETE SET NULL;
ALTER TABLE public.escalas ADD COLUMN IF NOT EXISTS apontado_em TIMESTAMPTZ;

-- Comentário explicativo da coluna
COMMENT ON COLUMN public.escalas.status IS 'Status da escala: pendente, confirmado, recusado, falta_justificada, falta (injustificada/negativacao)';
COMMENT ON COLUMN public.escalas.justificativa IS 'Motivo ou justificativa apresentada em caso de falta justificada ou observação de negativação';
