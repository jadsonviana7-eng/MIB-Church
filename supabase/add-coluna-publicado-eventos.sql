-- Adicionar coluna publicado para controlar visibilidade pública dos eventos da agenda
ALTER TABLE public.agenda_eventos ADD COLUMN IF NOT EXISTS publicado BOOLEAN DEFAULT TRUE;
