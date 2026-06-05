-- ==============================================================
-- CORREÇÃO EMERGENCIAL - RLS 403 BLOQUEADO
-- ==============================================================
-- Se está recebendo 403 em TODAS as requisições, execute isto
-- ==============================================================

-- ============================================
-- PASSO 1: DESABILITAR RLS TEMPORARIAMENTE
-- ============================================
-- Isto vai liberar os dados imediatamente para diagnóstico

ALTER TABLE public.pessoas DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.celulas DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.zonas_moradia DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.atuacoes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cargos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reunioes_celula DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.relatorios_reuniao DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contas_financeiras DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias_financeiras DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.transacoes_financeiras DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contribuicoes DISABLE ROW LEVEL SECURITY;

-- Teste agora no frontend: logout + login
-- Se os dados aparecerem, o problema está definitivamente nas POLÍTICAS RLS
-- Se ainda não aparecerem, o problema é na autenticação

-- ============================================
-- PASSO 2: REMOVER TODAS AS POLÍTICAS ANTIGAS
-- ============================================
-- Execute isto para limpar tudo

DROP POLICY IF EXISTS "pessoas_admin_all" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_admin_all_v2" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_admin_all_email" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_select_v2" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_select_email" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_update_v2" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_pastor_update_email" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_lider_celula_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_lider_celula_select_email" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_lider_celula_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_lider_celula_update_email" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_select" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_select_v2" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_select_email" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_self_email" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_update" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_update_v2" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_update_email" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_membro_update_self_email" ON public.pessoas;
DROP POLICY IF EXISTS "pessoas_delete_admin" ON public.pessoas;

DROP POLICY IF EXISTS "celulas_admin_all" ON public.celulas;
DROP POLICY IF EXISTS "celulas_admin_all_email" ON public.celulas;
DROP POLICY IF EXISTS "celulas_pastor_select" ON public.celulas;
DROP POLICY IF EXISTS "celulas_pastor_select_email" ON public.celulas;
DROP POLICY IF EXISTS "celulas_pastor_update" ON public.celulas;
DROP POLICY IF EXISTS "celulas_pastor_update_email" ON public.celulas;
DROP POLICY IF EXISTS "celulas_lider_own" ON public.celulas;
DROP POLICY IF EXISTS "celulas_lider_own_email" ON public.celulas;
DROP POLICY IF EXISTS "celulas_lider_update_own" ON public.celulas;
DROP POLICY IF EXISTS "celulas_lider_update_own_email" ON public.celulas;
DROP POLICY IF EXISTS "celulas_membro_select" ON public.celulas;
DROP POLICY IF EXISTS "celulas_membro_select_email" ON public.celulas;

DROP POLICY IF EXISTS "reunioes_celula_admin_all" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_admin_all_email" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_pastor_select" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_pastor_select_email" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_lider" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_lider_all" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_lider_all_email" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_membro_select" ON public.reunioes_celula;
DROP POLICY IF EXISTS "reunioes_celula_membro_select_email" ON public.reunioes_celula;

DROP POLICY IF EXISTS "relatorios_reuniao_admin_all" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_admin_all_email" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_pastor_select" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_pastor_select_email" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_pastor_update" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_pastor_update_email" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_lider" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_lider_all" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_lider_all_email" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_membro_select" ON public.relatorios_reuniao;
DROP POLICY IF EXISTS "relatorios_reuniao_membro_select_email" ON public.relatorios_reuniao;

DROP POLICY IF EXISTS "transacoes_admin_all" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_admin_all_email" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_pastor_all" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_pastor_all_email" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_lider_read" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_lider_read_email" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_membro_deny" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_membro_none" ON public.transacoes_financeiras;

DROP POLICY IF EXISTS "zonas_moradia_select" ON public.zonas_moradia;
DROP POLICY IF EXISTS "zonas_moradia_admin" ON public.zonas_moradia;

DROP POLICY IF EXISTS "atuacoes_select" ON public.atuacoes;
DROP POLICY IF EXISTS "atuacoes_admin" ON public.atuacoes;

DROP POLICY IF EXISTS "cargos_select" ON public.cargos;
DROP POLICY IF EXISTS "cargos_admin" ON public.cargos;

DROP POLICY IF EXISTS "contas_financeiras_admin_pastor" ON public.contas_financeiras;
DROP POLICY IF EXISTS "contas_financeiras_deny_lider_membro" ON public.contas_financeiras;

DROP POLICY IF EXISTS "categorias_financeiras_admin_pastor" ON public.categorias_financeiras;
DROP POLICY IF EXISTS "categorias_financeiras_deny_lider_membro" ON public.categorias_financeiras;

-- ============================================
-- PASSO 3: REABILITAR RLS COM POLÍTICAS SIMPLES
-- ============================================

ALTER TABLE public.pessoas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.celulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zonas_moradia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.atuacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cargos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reunioes_celula ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relatorios_reuniao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contas_financeiras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias_financeiras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transacoes_financeiras ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PASSO 4: CRIAR POLÍTICAS SUPER SIMPLES
-- ============================================
-- Estas políticas são simples e DEFINITIVAMENTE vão funcionar

-- ─ pessoas
CREATE POLICY "pessoas_public" ON public.pessoas FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ─ celulas
CREATE POLICY "celulas_public" ON public.celulas FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ─ zonas_moradia
CREATE POLICY "zonas_moradia_public" ON public.zonas_moradia FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ─ atuacoes
CREATE POLICY "atuacoes_public" ON public.atuacoes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ─ cargos
CREATE POLICY "cargos_public" ON public.cargos FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ─ reunioes_celula
CREATE POLICY "reunioes_celula_public" ON public.reunioes_celula FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ─ relatorios_reuniao
CREATE POLICY "relatorios_reuniao_public" ON public.relatorios_reuniao FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ─ contas_financeiras
CREATE POLICY "contas_financeiras_public" ON public.contas_financeiras FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ─ categorias_financeiras
CREATE POLICY "categorias_financeiras_public" ON public.categorias_financeiras FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ─ transacoes_financeiras
CREATE POLICY "transacoes_financeiras_public" ON public.transacoes_financeiras FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================
-- ✅ PRONTO! TUDO LIBERADO
-- ============================================
-- Agora todos os usuários autenticados podem acessar TUDO
-- 
-- PRÓXIMO PASSO:
-- 1. Faça logout no app
-- 2. Faça login novamente
-- 3. Os dados devem aparecer agora!
-- 
-- Se ainda não aparecerem, o problema é:
--   • Autenticação quebrada
--   • Erro no supabaseClient.js
--   • Ou erro nos imports do frontend

-- ============================================
-- PASSO 5: DEPOIS QUE FUNCIONAR (SEGURANÇA)
-- ============================================
-- Quando os dados aparecerem, podemos reativar as políticas reais
-- 
-- Para agora, isto está em MODO PERMISSIVO (desenvolvimento)
-- 
-- Não use em PRODUÇÃO assim!
-- Quando estiver pronto, consulte: RLS_GUIDE.md
