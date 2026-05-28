-- Vinculo seguro entre membros cadastrados e Supabase Auth.
-- Execute este arquivo no SQL Editor antes de usar "Criar usuario e senha".

ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS auth_user_id uuid UNIQUE;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS acesso_ativo boolean DEFAULT false;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS ultimo_login timestamptz;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS permissao text;

CREATE INDEX IF NOT EXISTS pessoas_auth_user_id_idx ON public.pessoas(auth_user_id);
CREATE INDEX IF NOT EXISTS pessoas_email_idx ON public.pessoas(email);
