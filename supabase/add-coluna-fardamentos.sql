-- ====================================================================
-- MIGRATION: ADICIONAR COLUNAS DE FARDAMENTO
-- COPIE E EXECUTE NO EDITOR SQL DO SUPABASE
-- ====================================================================

-- 1. Adiciona coluna fardamentos na tabela ministerios se não existir
ALTER TABLE public.ministerios ADD COLUMN IF NOT EXISTS fardamentos JSONB DEFAULT '[]'::jsonb;

-- 2. Adiciona coluna fardamentos na tabela eventos_ministeriais se não existir
ALTER TABLE public.eventos_ministeriais ADD COLUMN IF NOT EXISTS fardamentos JSONB DEFAULT '{}'::jsonb;
