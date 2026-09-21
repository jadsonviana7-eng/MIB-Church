-- Adiciona colunas de quantidade e valor unitário para despesas detalhadas (ex: limpeza e consumo)
ALTER TABLE public.transacoes_financeiras 
ADD COLUMN IF NOT EXISTS quantidade DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS valor_unitario DECIMAL(10, 2);
