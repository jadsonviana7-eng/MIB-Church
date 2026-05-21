-- Execute no Supabase: SQL Editor → New query → Run
-- Corrige RLS para imagem de células (Storage + tabela celulas)

-- 1) Coluna na tabela (se ainda não existir)
ALTER TABLE public.celulas ADD COLUMN IF NOT EXISTS imagem_url text;

-- 2) Storage: permitir envio/leitura no bucket fotos-membros (mesmo das fotos de membros)
-- Ajuste o bucket se o seu tiver outro nome.

DROP POLICY IF EXISTS "fotos_membros_insert_anon" ON storage.objects;
CREATE POLICY "fotos_membros_insert_anon"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'fotos-membros');

DROP POLICY IF EXISTS "fotos_membros_update_anon" ON storage.objects;
CREATE POLICY "fotos_membros_update_anon"
ON storage.objects FOR UPDATE TO anon, authenticated
USING (bucket_id = 'fotos-membros')
WITH CHECK (bucket_id = 'fotos-membros');

DROP POLICY IF EXISTS "fotos_membros_select_anon" ON storage.objects;
CREATE POLICY "fotos_membros_select_anon"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'fotos-membros');

-- 3) Tabela celulas: permitir gravar imagem_url (app usa chave anon como nas outras telas)
DROP POLICY IF EXISTS "celulas_update_imagem_anon" ON public.celulas;
CREATE POLICY "celulas_update_imagem_anon"
ON public.celulas FOR UPDATE TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Se UPDATE em celulas já existir com outro nome, pode manter só uma política de UPDATE.
-- Se ainda falhar, em Storage → fotos-membros → Policies, confira se RLS está ativo
-- e se o bucket é público para leitura (Public bucket) se quiser exibir imagens sem login.
