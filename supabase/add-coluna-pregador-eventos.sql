-- Adiciona coluna pregador na tabela eventos_ministeriais se não existir
ALTER TABLE public.eventos_ministeriais ADD COLUMN IF NOT EXISTS pregador TEXT;
