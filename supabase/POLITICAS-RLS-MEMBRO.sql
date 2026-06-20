-- ------------------------------------------------------------
-- 1. CORREÇÃO DA TABELA relatorios_celula E presencas_relatorio
-- ------------------------------------------------------------
ALTER TABLE public.relatorios_celula ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "relatorios_celula_admin_full" ON public.relatorios_celula;
CREATE POLICY "relatorios_celula_admin_full" ON public.relatorios_celula FOR ALL TO authenticated USING (public.obter_perfil() = 'admin') WITH CHECK (public.obter_perfil() = 'admin');

DROP POLICY IF EXISTS "relatorios_celula_pastor_full" ON public.relatorios_celula;
CREATE POLICY "relatorios_celula_pastor_full" ON public.relatorios_celula FOR ALL TO authenticated USING (public.obter_perfil() = 'pastor') WITH CHECK (public.obter_perfil() = 'pastor');

DROP POLICY IF EXISTS "relatorios_celula_secretario_select" ON public.relatorios_celula;
CREATE POLICY "relatorios_celula_secretario_select" ON public.relatorios_celula FOR SELECT TO authenticated USING (public.obter_perfil() IN ('secretario', 'secretaria'));

DROP POLICY IF EXISTS "relatorios_celula_secretario_update" ON public.relatorios_celula;
CREATE POLICY "relatorios_celula_secretario_update" ON public.relatorios_celula FOR UPDATE TO authenticated USING (public.obter_perfil() IN ('secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('secretario', 'secretaria'));

DROP POLICY IF EXISTS "relatorios_celula_tesoureiro_select" ON public.relatorios_celula;
CREATE POLICY "relatorios_celula_tesoureiro_select" ON public.relatorios_celula FOR SELECT TO authenticated USING (public.obter_perfil() IN ('tesoureiro', 'tesoureira'));

DROP POLICY IF EXISTS "relatorios_celula_lider_all" ON public.relatorios_celula;
CREATE POLICY "relatorios_celula_lider_all" ON public.relatorios_celula FOR ALL TO authenticated USING (public.obter_perfil() = 'lider' AND celula_id = public.obter_celula_lider()) WITH CHECK (public.obter_perfil() = 'lider' AND celula_id = public.obter_celula_lider());

DROP POLICY IF EXISTS "relatorios_celula_membro_select" ON public.relatorios_celula;
CREATE POLICY "relatorios_celula_membro_select" ON public.relatorios_celula FOR SELECT TO authenticated USING (public.obter_perfil() = 'membro' AND celula_id = (SELECT celula_id FROM public.pessoas WHERE id = public.obter_id_pessoa()));

-- Tabela: presencas_relatorio
ALTER TABLE public.presencas_relatorio ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "presencas_relatorio_select" ON public.presencas_relatorio;
CREATE POLICY "presencas_relatorio_select" ON public.presencas_relatorio FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "presencas_relatorio_staff" ON public.presencas_relatorio;
CREATE POLICY "presencas_relatorio_staff" ON public.presencas_relatorio FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria'));

DROP POLICY IF EXISTS "presencas_relatorio_lider" ON public.presencas_relatorio;
CREATE POLICY "presencas_relatorio_lider" ON public.presencas_relatorio FOR ALL TO authenticated USING (public.obter_perfil() = 'lider' AND relatorio_id IN (SELECT id FROM public.relatorios_celula WHERE celula_id = public.obter_celula_lider())) WITH CHECK (public.obter_perfil() = 'lider' AND relatorio_id IN (SELECT id FROM public.relatorios_celula WHERE celula_id = public.obter_celula_lider()));


-- ------------------------------------------------------------
-- 2. TABELAS DE AGENDA (agenda_eventos, agenda_inscricoes)
-- ------------------------------------------------------------
ALTER TABLE public.agenda_eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agenda_inscricoes ENABLE ROW LEVEL SECURITY;

-- Eventos
DROP POLICY IF EXISTS "agenda_eventos_select_all" ON public.agenda_eventos;
CREATE POLICY "agenda_eventos_select_all" ON public.agenda_eventos FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "agenda_eventos_write_staff" ON public.agenda_eventos;
CREATE POLICY "agenda_eventos_write_staff" ON public.agenda_eventos FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria'));

-- Inscrições
DROP POLICY IF EXISTS "agenda_inscricoes_select_all" ON public.agenda_inscricoes;
CREATE POLICY "agenda_inscricoes_select_all" ON public.agenda_inscricoes FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "agenda_inscricoes_insert_all" ON public.agenda_inscricoes;
CREATE POLICY "agenda_inscricoes_insert_all" ON public.agenda_inscricoes FOR INSERT TO authenticated, anon WITH CHECK (true);

DROP POLICY IF EXISTS "agenda_inscricoes_write_staff" ON public.agenda_inscricoes;
CREATE POLICY "agenda_inscricoes_write_staff" ON public.agenda_inscricoes FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'tesoureiro', 'tesoureira')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'tesoureiro', 'tesoureira'));


-- ------------------------------------------------------------
-- 3. TABELAS DE ESCALAS E MINISTÉRIOS
-- ------------------------------------------------------------
ALTER TABLE public.eventos_ministeriais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministerios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministerio_funcoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escalas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escalas_atribuicoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bloqueios_escala ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipes_escala ENABLE ROW LEVEL SECURITY;

-- Lookup / Cadastros
DROP POLICY IF EXISTS "eventos_ministeriais_select" ON public.eventos_ministeriais;
CREATE POLICY "eventos_ministeriais_select" ON public.eventos_ministeriais FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "eventos_ministeriais_write" ON public.eventos_ministeriais;
CREATE POLICY "eventos_ministeriais_write" ON public.eventos_ministeriais FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider'));

DROP POLICY IF EXISTS "ministerios_select" ON public.ministerios;
CREATE POLICY "ministerios_select" ON public.ministerios FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "ministerios_write" ON public.ministerios;
CREATE POLICY "ministerios_write" ON public.ministerios FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria'));

DROP POLICY IF EXISTS "ministerio_funcoes_select" ON public.ministerio_funcoes;
CREATE POLICY "ministerio_funcoes_select" ON public.ministerio_funcoes FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "ministerio_funcoes_write" ON public.ministerio_funcoes;
CREATE POLICY "ministerio_funcoes_write" ON public.ministerio_funcoes FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria'));

-- Escalas
DROP POLICY IF EXISTS "escalas_select" ON public.escalas;
CREATE POLICY "escalas_select" ON public.escalas FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "escalas_write_staff" ON public.escalas;

DROP POLICY IF EXISTS "escalas_insert_staff" ON public.escalas;
CREATE POLICY "escalas_insert_staff" ON public.escalas FOR INSERT TO authenticated WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider'));

DROP POLICY IF EXISTS "escalas_delete_staff" ON public.escalas;
CREATE POLICY "escalas_delete_staff" ON public.escalas FOR DELETE TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider'));

DROP POLICY IF EXISTS "escalas_update_proprio" ON public.escalas;
CREATE POLICY "escalas_update_proprio" ON public.escalas FOR UPDATE TO authenticated USING (pessoa_id = public.obter_id_pessoa() OR public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider')) WITH CHECK (pessoa_id = public.obter_id_pessoa() OR public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider'));

-- Atribuições de Escalas
DROP POLICY IF EXISTS "escalas_atribuicoes_select" ON public.escalas_atribuicoes;
CREATE POLICY "escalas_atribuicoes_select" ON public.escalas_atribuicoes FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "escalas_atribuicoes_write_staff" ON public.escalas_atribuicoes;
CREATE POLICY "escalas_atribuicoes_write_staff" ON public.escalas_atribuicoes FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider'));

-- Bloqueios de Escalas
DROP POLICY IF EXISTS "bloqueios_escala_select_all" ON public.bloqueios_escala;
CREATE POLICY "bloqueios_escala_select_all" ON public.bloqueios_escala FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "bloqueios_escala_manage" ON public.bloqueios_escala;
CREATE POLICY "bloqueios_escala_manage" ON public.bloqueios_escala FOR ALL TO authenticated USING (pessoa_id = public.obter_id_pessoa() OR public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider')) WITH CHECK (pessoa_id = public.obter_id_pessoa() OR public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider'));

-- Equipes de Escala
DROP POLICY IF EXISTS "equipes_escala_select" ON public.equipes_escala;
CREATE POLICY "equipes_escala_select" ON public.equipes_escala FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "equipes_escala_write" ON public.equipes_escala;
CREATE POLICY "equipes_escala_write" ON public.equipes_escala FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider'));


-- ------------------------------------------------------------
-- 4. TABELAS DE ESCOLAS / ENSINO (escolas, turmas, alunos, aulas, avaliacoes)
-- ------------------------------------------------------------
ALTER TABLE public.escolas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disciplinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.turmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.turmas_disciplinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alunos_turmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.avaliacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscricoes_publicas ENABLE ROW LEVEL SECURITY;

-- Leitura Geral de Cursos/Turmas para Alunos / Membros
DROP POLICY IF EXISTS "escolas_select" ON public.escolas;
CREATE POLICY "escolas_select" ON public.escolas FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "disciplinas_select" ON public.disciplinas;
CREATE POLICY "disciplinas_select" ON public.disciplinas FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "professores_select" ON public.professores;
CREATE POLICY "professores_select" ON public.professores FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "turmas_select" ON public.turmas;
CREATE POLICY "turmas_select" ON public.turmas FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "turmas_disciplinas_select" ON public.turmas_disciplinas;
CREATE POLICY "turmas_disciplinas_select" ON public.turmas_disciplinas FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "alunos_select" ON public.alunos;
CREATE POLICY "alunos_select" ON public.alunos FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "alunos_turmas_select" ON public.alunos_turmas;
CREATE POLICY "alunos_turmas_select" ON public.alunos_turmas FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "aulas_select" ON public.aulas;
CREATE POLICY "aulas_select" ON public.aulas FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "avaliacoes_select" ON public.avaliacoes;
CREATE POLICY "avaliacoes_select" ON public.avaliacoes FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "inscricoes_publicas_select" ON public.inscricoes_publicas;
CREATE POLICY "inscricoes_publicas_select" ON public.inscricoes_publicas FOR SELECT TO authenticated USING (true);

-- Escrita de Cursos/Turmas restrita a Staff (admin, secretario, secretaria, pastores)
DROP POLICY IF EXISTS "escolas_write" ON public.escolas;
CREATE POLICY "escolas_write" ON public.escolas FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria'));

DROP POLICY IF EXISTS "disciplinas_write" ON public.disciplinas;
CREATE POLICY "disciplinas_write" ON public.disciplinas FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria'));

DROP POLICY IF EXISTS "professores_write" ON public.professores;
CREATE POLICY "professores_write" ON public.professores FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria'));

DROP POLICY IF EXISTS "turmas_write" ON public.turmas;
CREATE POLICY "turmas_write" ON public.turmas FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria'));

DROP POLICY IF EXISTS "turmas_disciplinas_write" ON public.turmas_disciplinas;
CREATE POLICY "turmas_disciplinas_write" ON public.turmas_disciplinas FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria'));

DROP POLICY IF EXISTS "alunos_write" ON public.alunos;
CREATE POLICY "alunos_write" ON public.alunos FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria'));

DROP POLICY IF EXISTS "alunos_turmas_write" ON public.alunos_turmas;
CREATE POLICY "alunos_turmas_write" ON public.alunos_turmas FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria'));

DROP POLICY IF EXISTS "aulas_write" ON public.aulas;
CREATE POLICY "aulas_write" ON public.aulas FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria'));

DROP POLICY IF EXISTS "avaliacoes_write" ON public.avaliacoes;
CREATE POLICY "avaliacoes_write" ON public.avaliacoes FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria'));

-- Candidaturas externas a Turmas (Inscrições Públicas)
DROP POLICY IF EXISTS "inscricoes_publicas_insert" ON public.inscricoes_publicas;
CREATE POLICY "inscricoes_publicas_insert" ON public.inscricoes_publicas FOR INSERT TO authenticated, anon WITH CHECK (true);

DROP POLICY IF EXISTS "inscricoes_publicas_write" ON public.inscricoes_publicas;
CREATE POLICY "inscricoes_publicas_write" ON public.inscricoes_publicas FOR ALL TO authenticated USING (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria')) WITH CHECK (public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria'));
