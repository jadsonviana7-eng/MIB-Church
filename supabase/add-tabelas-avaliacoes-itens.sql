-- ==============================================================================
-- CRIAÇÃO DAS TABELAS DE AVALIAÇÕES DETALHADAS (MÓDULO ESCOLAS / ENSINO)
-- ==============================================================================

-- 1. Tabela de Itens de Avaliação (Provas, Atividades, Trabalhos, etc.)
CREATE TABLE IF NOT EXISTS public.avaliacoes_itens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    turma_disciplina_id UUID NOT NULL REFERENCES public.turmas_disciplinas(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    peso NUMERIC(4,2) DEFAULT 1.0,
    ordem INTEGER DEFAULT 1,
    data_avaliacao DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Tabela de Notas dos Alunos por Item de Avaliação
CREATE TABLE IF NOT EXISTS public.alunos_avaliacoes_notas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    avaliacao_item_id UUID NOT NULL REFERENCES public.avaliacoes_itens(id) ON DELETE CASCADE,
    aluno_id UUID NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
    nota NUMERIC(4,2) CHECK (nota >= 0 AND nota <= 10),
    observacao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_avaliacao_item_aluno UNIQUE (avaliacao_item_id, aluno_id)
);

-- 3. Índices para otimização de consultas
CREATE INDEX IF NOT EXISTS idx_avaliacoes_itens_turma_disciplina ON public.avaliacoes_itens(turma_disciplina_id);
CREATE INDEX IF NOT EXISTS idx_alunos_avaliacoes_notas_item ON public.alunos_avaliacoes_notas(avaliacao_item_id);
CREATE INDEX IF NOT EXISTS idx_alunos_avaliacoes_notas_aluno ON public.alunos_avaliacoes_notas(aluno_id);

-- 4. Habilitação de Segurança por Linha (RLS)
ALTER TABLE public.avaliacoes_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alunos_avaliacoes_notas ENABLE ROW LEVEL SECURITY;

-- 5. Políticas de Acesso para avaliacoes_itens
DROP POLICY IF EXISTS "avaliacoes_itens_select" ON public.avaliacoes_itens;
CREATE POLICY "avaliacoes_itens_select" ON public.avaliacoes_itens 
    FOR SELECT TO authenticated 
    USING (true);

DROP POLICY IF EXISTS "avaliacoes_itens_write" ON public.avaliacoes_itens;
CREATE POLICY "avaliacoes_itens_write" ON public.avaliacoes_itens 
    FOR ALL TO authenticated 
    USING (
      CASE 
        WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'obter_perfil') THEN 
          public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider', 'obreiro')
        ELSE true
      END
    )
    WITH CHECK (
      CASE 
        WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'obter_perfil') THEN 
          public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider', 'obreiro')
        ELSE true
      END
    );

-- 6. Políticas de Acesso para alunos_avaliacoes_notas
DROP POLICY IF EXISTS "alunos_avaliacoes_notas_select" ON public.alunos_avaliacoes_notas;
CREATE POLICY "alunos_avaliacoes_notas_select" ON public.alunos_avaliacoes_notas 
    FOR SELECT TO authenticated 
    USING (true);

DROP POLICY IF EXISTS "alunos_avaliacoes_notas_write" ON public.alunos_avaliacoes_notas;
CREATE POLICY "alunos_avaliacoes_notas_write" ON public.alunos_avaliacoes_notas 
    FOR ALL TO authenticated 
    USING (
      CASE 
        WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'obter_perfil') THEN 
          public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider', 'obreiro')
        ELSE true
      END
    )
    WITH CHECK (
      CASE 
        WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'obter_perfil') THEN 
          public.obter_perfil() IN ('admin', 'pastor', 'secretario', 'secretaria', 'lider', 'obreiro')
        ELSE true
      END
    );
