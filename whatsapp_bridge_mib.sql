-- Tabela da Ponte em Nuvem e Backup de Sessão do Servidor WhatsApp (MIB Church)
-- Execute este script uma única vez no SQL Editor do Supabase.

CREATE TABLE IF NOT EXISTS public.whatsapp_bridge_mib (
  id INTEGER PRIMARY KEY DEFAULT 1,
  bridge_status JSONB DEFAULT '{}'::jsonb,
  pending_cmd JSONB DEFAULT NULL,
  auth_backup JSONB DEFAULT NULL,
  config JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.whatsapp_bridge_mib (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.whatsapp_bridge_mib ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "whatsapp_bridge_mib_all" ON public.whatsapp_bridge_mib;
CREATE POLICY "whatsapp_bridge_mib_all"
  ON public.whatsapp_bridge_mib
  FOR ALL
  USING (true)
  WITH CHECK (true);
