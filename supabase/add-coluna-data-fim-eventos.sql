-- Adicionar coluna data_fim para armazenar o término dos eventos ministeriais
ALTER TABLE public.eventos_ministeriais ADD COLUMN IF NOT EXISTS data_fim TIMESTAMPTZ;
