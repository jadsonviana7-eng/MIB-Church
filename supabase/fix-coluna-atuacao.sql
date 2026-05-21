-- Correção rápida: erro "Could not find the 'atuacao' column"
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS atuacao text;
