-- Correção rápida: Adiciona a coluna 'cor' na tabela 'ministerio_funcoes'
-- Execute este script no SQL Editor do seu painel do Supabase.

ALTER TABLE public.ministerio_funcoes ADD COLUMN IF NOT EXISTS cor text DEFAULT '#2563eb';

-- Após executar, vá em Settings -> API -> "Reload schema cache" no Supabase 
-- ou aguarde cerca de 1 minuto para que as mudanças surtam efeito.
