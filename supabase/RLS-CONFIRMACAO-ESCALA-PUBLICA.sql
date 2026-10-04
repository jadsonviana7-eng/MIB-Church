-- =========================================================================
-- HABILITAR CONFIRMAÇÃO PÚBLICA DE ESCALAS (ACESSO ANÔNIMO VIA WHATSAPP)
-- =========================================================================
-- Execute este script no SQL Editor do seu Supabase Dashboard para liberar
-- a leitura e confirmação da escala pelo celular dos voluntários sem login.

-- 1. Permitir leitura anônima de escalas para carregar os dados pelo link
DROP POLICY IF EXISTS "escalas_anon_select" ON public.escalas;
CREATE POLICY "escalas_anon_select" 
ON public.escalas 
FOR SELECT 
TO anon 
USING (true);

-- 2. Permitir que o voluntário anônimo atualize o status da escala (confirmar / recusar com justificativa)
DROP POLICY IF EXISTS "escalas_anon_update" ON public.escalas;
CREATE POLICY "escalas_anon_update" 
ON public.escalas 
FOR UPDATE 
TO anon 
USING (true)
WITH CHECK (true);

-- 3. Permitir leitura pública dos eventos ministeriais (título, data, local, fardamentos)
DROP POLICY IF EXISTS "eventos_ministeriais_anon_select" ON public.eventos_ministeriais;
CREATE POLICY "eventos_ministeriais_anon_select" 
ON public.eventos_ministeriais 
FOR SELECT 
TO anon 
USING (true);

-- 4. Permitir leitura pública dos ministérios (nome, ícone, cor)
DROP POLICY IF EXISTS "ministerios_anon_select" ON public.ministerios;
CREATE POLICY "ministerios_anon_select" 
ON public.ministerios 
FOR SELECT 
TO anon 
USING (true);

-- 5. Permitir leitura pública das funções ministeriais (nome da função)
DROP POLICY IF EXISTS "ministerio_funcoes_anon_select" ON public.ministerio_funcoes;
CREATE POLICY "ministerio_funcoes_anon_select" 
ON public.ministerio_funcoes 
FOR SELECT 
TO anon 
USING (true);

-- 6. Permitir leitura básica de pessoas (nome e foto)
DROP POLICY IF EXISTS "pessoas_anon_select" ON public.pessoas;
CREATE POLICY "pessoas_anon_select" 
ON public.pessoas 
FOR SELECT 
TO anon 
USING (true);

-- 7. Permitir leitura dos dados da igreja (nome e logo)
DROP POLICY IF EXISTS "dados_igreja_anon_select" ON public.dados_igreja;
CREATE POLICY "dados_igreja_anon_select" 
ON public.dados_igreja 
FOR SELECT 
TO anon 
USING (true);
