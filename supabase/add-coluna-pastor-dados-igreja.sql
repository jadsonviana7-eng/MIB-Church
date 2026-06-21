-- Adicionar coluna pastor_responsavel na tabela dados_igreja
ALTER TABLE public.dados_igreja ADD COLUMN IF NOT EXISTS pastor_responsavel TEXT;
