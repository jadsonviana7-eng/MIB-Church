-- Adiciona as colunas via_pix e forma_pagamento na tabela transacoes_financeiras
ALTER TABLE public.transacoes_financeiras 
ADD COLUMN IF NOT EXISTS via_pix BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS forma_pagamento TEXT;

-- Índice para acelerar consultas e relatórios por transações via PIX
CREATE INDEX IF NOT EXISTS idx_transacoes_financeiras_via_pix 
ON public.transacoes_financeiras(via_pix) 
WHERE via_pix = true;

