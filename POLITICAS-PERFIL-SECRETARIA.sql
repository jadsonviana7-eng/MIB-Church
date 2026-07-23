-- =================================================================================
-- POLÍTICAS DE SEGURANÇA (RLS) PARA O PERFIL: SECRETARIA
-- Sistema: MIB Church (Supabase)
-- =================================================================================
-- Instruções:
-- 1. Acesse o Painel do Supabase -> SQL Editor.
-- 2. Cole este script completo.
-- 3. Clique em "Run" para aplicar as regras do perfil Secretaria.
--
-- Regras Definidas:
-- • Estratégia Permissiva por Padrão: Acesso de leitura/gerenciamento nos módulos
--   operacionais (Pessoas, Células, Ensino/Escolas, Agenda, Escalas, Utilitários).
-- • Restrição Financeiro: Ouve apenas suas próprias transações (`pessoa_id = obter_id_pessoa()`).
-- • Restrição Configurações: Bloqueio de alteração em configurações gerais do sistema.
-- =================================================================================

-- ---------------------------------------------------------------------------------
-- 1. POLÍTICA PARA A TABELA: transacoes_financeiras
--- ---------------------------------------------------------------------------------
ALTER TABLE public.transacoes_financeiras ENABLE ROW LEVEL SECURITY;

-- Remover políticas anteriores de secretaria na tabela transacoes_financeiras se existirem
DROP POLICY IF EXISTS "transacoes_secretaria_select_proprias" ON public.transacoes_financeiras;
DROP POLICY IF EXISTS "transacoes_secretario_select" ON public.transacoes_financeiras;

-- Secretaria pode visualizar APENAS suas próprias contribuições/transações
CREATE POLICY "transacoes_secretaria_select_proprias" ON public.transacoes_financeiras
FOR SELECT
TO authenticated
USING (
  (public.obter_perfil() IN ('secretaria', 'secretario'))
  AND pessoa_id = public.obter_id_pessoa()
);


-- ---------------------------------------------------------------------------------
-- 2. POLÍTICAS PERMISSIVAS PARA DEMAIS MÓDULOS OPERACIONAIS
-- ---------------------------------------------------------------------------------

-- A) PESSOAS (Cadastro e gestão de membros/visitantes)
ALTER TABLE public.pessoas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "secretaria_pessoas_all" ON public.pessoas;
CREATE POLICY "secretaria_pessoas_all" ON public.pessoas
FOR ALL
TO authenticated
USING (public.obter_perfil() IN ('secretaria', 'secretario'))
WITH CHECK (public.obter_perfil() IN ('secretaria', 'secretario'));

-- B) CÉLULAS E REUNIÕES DE CÉLULA
ALTER TABLE public.celulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reunioes_celula ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relatorios_celula ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "secretaria_celulas_all" ON public.celulas;
CREATE POLICY "secretaria_celulas_all" ON public.celulas
FOR ALL
TO authenticated
USING (public.obter_perfil() IN ('secretaria', 'secretario'))
WITH CHECK (public.obter_perfil() IN ('secretaria', 'secretario'));

DROP POLICY IF EXISTS "secretaria_reunioes_celula_all" ON public.reunioes_celula;
CREATE POLICY "secretaria_reunioes_celula_all" ON public.reunioes_celula
FOR ALL
TO authenticated
USING (public.obter_perfil() IN ('secretaria', 'secretario'))
WITH CHECK (public.obter_perfil() IN ('secretaria', 'secretario'));

-- TABELA: relatorios_celula (onde o relatório de reunião é de fato gravado)
ALTER TABLE public.relatorios_celula ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "secretaria_relatorios_celula_all" ON public.relatorios_celula;
CREATE POLICY "secretaria_relatorios_celula_all" ON public.relatorios_celula
FOR ALL
TO authenticated
USING (public.obter_perfil() IN ('secretaria', 'secretario'))
WITH CHECK (public.obter_perfil() IN ('secretaria', 'secretario'));

-- C) ENSINO / ESCOLAS / TURMAS / AULAS
ALTER TABLE public.escolas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disciplinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.turmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.avaliacoes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "secretaria_escolas_all" ON public.escolas;
CREATE POLICY "secretaria_escolas_all" ON public.escolas
FOR ALL TO authenticated
USING (public.obter_perfil() IN ('secretaria', 'secretario'))
WITH CHECK (public.obter_perfil() IN ('secretaria', 'secretario'));

DROP POLICY IF EXISTS "secretaria_turmas_all" ON public.turmas;
CREATE POLICY "secretaria_turmas_all" ON public.turmas
FOR ALL TO authenticated
USING (public.obter_perfil() IN ('secretaria', 'secretario'))
WITH CHECK (public.obter_perfil() IN ('secretaria', 'secretario'));

DROP POLICY IF EXISTS "secretaria_alunos_all" ON public.alunos;
CREATE POLICY "secretaria_alunos_all" ON public.alunos
FOR ALL TO authenticated
USING (public.obter_perfil() IN ('secretaria', 'secretario'))
WITH CHECK (public.obter_perfil() IN ('secretaria', 'secretario'));

DROP POLICY IF EXISTS "secretaria_aulas_all" ON public.aulas;
CREATE POLICY "secretaria_aulas_all" ON public.aulas
FOR ALL TO authenticated
USING (public.obter_perfil() IN ('secretaria', 'secretario'))
WITH CHECK (public.obter_perfil() IN ('secretaria', 'secretario'));

-- D) AGENDA / EVENTOS / MURAL DE AVISOS
ALTER TABLE public.agenda_eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agenda_inscricoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mural_avisos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "secretaria_agenda_eventos_all" ON public.agenda_eventos;
CREATE POLICY "secretaria_agenda_eventos_all" ON public.agenda_eventos
FOR ALL TO authenticated
USING (public.obter_perfil() IN ('secretaria', 'secretario'))
WITH CHECK (public.obter_perfil() IN ('secretaria', 'secretario'));

DROP POLICY IF EXISTS "secretaria_mural_avisos_all" ON public.mural_avisos;
CREATE POLICY "secretaria_mural_avisos_all" ON public.mural_avisos
FOR ALL TO authenticated
USING (public.obter_perfil() IN ('secretaria', 'secretario'))
WITH CHECK (public.obter_perfil() IN ('secretaria', 'secretario'));

-- E) MINISTÉRIOS / ESCALAS
ALTER TABLE public.ministerios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escalas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "secretaria_ministerios_all" ON public.ministerios;
CREATE POLICY "secretaria_ministerios_all" ON public.ministerios
FOR ALL TO authenticated
USING (public.obter_perfil() IN ('secretaria', 'secretario'))
WITH CHECK (public.obter_perfil() IN ('secretaria', 'secretario'));

DROP POLICY IF EXISTS "secretaria_escalas_all" ON public.escalas;
CREATE POLICY "secretaria_escalas_all" ON public.escalas
FOR ALL TO authenticated
USING (public.obter_perfil() IN ('secretaria', 'secretario'))
WITH CHECK (public.obter_perfil() IN ('secretaria', 'secretario'));

-- F) VISITANTES / FORMULÁRIOS PÚBLICOS
DROP POLICY IF EXISTS "secretaria_visitantes_all" ON public.visitantes;
CREATE POLICY "secretaria_visitantes_all" ON public.visitantes
FOR ALL TO authenticated
USING (public.obter_perfil() IN ('secretaria', 'secretario'))
WITH CHECK (public.obter_perfil() IN ('secretaria', 'secretario'));
