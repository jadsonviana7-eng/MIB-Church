-- =========================================================================
-- SUPORTE A SUBSTITUIÇÃO DE ESCALAS SEM REMOÇÃO DE RELATÓRIOS E RANKINGS
-- =========================================================================
-- Execute este script no SQL Editor do Supabase para adicionar o suporte
-- a substituição de voluntários que recusaram ou tiveram apontamento de falta.

-- 1. Colunas de substituição na tabela escalas
ALTER TABLE public.escalas ADD COLUMN IF NOT EXISTS substituido_por_pessoa_id UUID REFERENCES public.pessoas(id) ON DELETE SET NULL;
ALTER TABLE public.escalas ADD COLUMN IF NOT EXISTS substituindo_escala_id UUID REFERENCES public.escalas(id) ON DELETE SET NULL;
ALTER TABLE public.escalas ADD COLUMN IF NOT EXISTS substituindo_pessoa_id UUID REFERENCES public.pessoas(id) ON DELETE SET NULL;
ALTER TABLE public.escalas ADD COLUMN IF NOT EXISTS substituido_em TIMESTAMPTZ;
ALTER TABLE public.escalas ADD COLUMN IF NOT EXISTS pedido_substituicao BOOLEAN DEFAULT false;

-- 2. Índices para performance em consultas de substituição e notificações
CREATE INDEX IF NOT EXISTS idx_escalas_substituido_por ON public.escalas(substituido_por_pessoa_id);
CREATE INDEX IF NOT EXISTS idx_escalas_substituindo_escala ON public.escalas(substituindo_escala_id);
CREATE INDEX IF NOT EXISTS idx_escalas_substituindo_pessoa ON public.escalas(substituindo_pessoa_id);
CREATE INDEX IF NOT EXISTS idx_escalas_pedido_substituicao ON public.escalas(pedido_substituicao);

-- 3. Comentários explicativos das colunas
COMMENT ON COLUMN public.escalas.substituido_por_pessoa_id IS 'ID do voluntário que assumiu esta escala como substituto';
COMMENT ON COLUMN public.escalas.substituindo_escala_id IS 'ID da escala original que este registro está substituindo';
COMMENT ON COLUMN public.escalas.substituindo_pessoa_id IS 'ID da pessoa que estava originalmente escalada e foi substituída';
COMMENT ON COLUMN public.escalas.substituido_em IS 'Data e hora em que a substituição foi efetivada';
COMMENT ON COLUMN public.escalas.pedido_substituicao IS 'Indica se há um pedido de substituição em aberto aguardando atendimento pela liderança';
