-- ==============================================================================
-- MIB CHURCH - TABELAS DE REPERTÓRIO DE LOUVOR, BIBLIOTECAS E MÚSICAS
-- Execute este script no SQL Editor do Supabase (Dashboard -> SQL Editor)
-- ==============================================================================

-- 1. Tabela: repertorio_bibliotecas (Pastas/Bibliotecas temáticas de repertório)
CREATE TABLE IF NOT EXISTS public.repertorio_bibliotecas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT,
    cor TEXT DEFAULT '#3b82f6',
    tipo TEXT DEFAULT 'Geral', -- 'Celebração', 'Adoração', 'Pós pregação', 'Geral'
    voz TEXT DEFAULT 'Misto', -- 'Feminino', 'Masculino', 'Misto'
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_repertorio_bibliotecas_nome ON public.repertorio_bibliotecas (nome);

-- 2. Tabela: repertorio_musicas (Biblioteca de Músicas do Louvor)
CREATE TABLE IF NOT EXISTS public.repertorio_musicas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    artista TEXT,
    tipo TEXT NOT NULL DEFAULT 'Adoração', -- 'Celebração', 'Adoração', 'Pós pregação'
    biblioteca TEXT DEFAULT 'Geral', -- Nome da biblioteca (ex: 'Celebração Feminina', 'Adoração Masculina')
    biblioteca_id UUID REFERENCES public.repertorio_bibliotecas(id) ON DELETE SET NULL,
    voz TEXT DEFAULT 'Misto', -- 'Feminino', 'Masculino', 'Misto'
    tom TEXT,
    bpm TEXT,
    link TEXT,
    observacoes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Caso a tabela repertorio_musicas já exista previamente, adiciona as novas colunas
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'repertorio_musicas' AND column_name = 'biblioteca') THEN
        ALTER TABLE public.repertorio_musicas ADD COLUMN biblioteca TEXT DEFAULT 'Geral';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'repertorio_musicas' AND column_name = 'biblioteca_id') THEN
        ALTER TABLE public.repertorio_musicas ADD COLUMN biblioteca_id UUID REFERENCES public.repertorio_bibliotecas(id) ON DELETE SET NULL;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'repertorio_musicas' AND column_name = 'voz') THEN
        ALTER TABLE public.repertorio_musicas ADD COLUMN voz TEXT DEFAULT 'Misto';
    END IF;
END $$;

-- Índices para busca rápida e ordenação
CREATE INDEX IF NOT EXISTS idx_repertorio_musicas_titulo ON public.repertorio_musicas (titulo);
CREATE INDEX IF NOT EXISTS idx_repertorio_musicas_tipo ON public.repertorio_musicas (tipo);
CREATE INDEX IF NOT EXISTS idx_repertorio_musicas_biblioteca ON public.repertorio_musicas (biblioteca);
CREATE INDEX IF NOT EXISTS idx_repertorio_musicas_voz ON public.repertorio_musicas (voz);

-- 3. Tabela: repertorio_cultos (Repertórios vinculados aos Cultos/Eventos)
CREATE TABLE IF NOT EXISTS public.repertorio_cultos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evento_id TEXT NOT NULL, -- ID do evento (suporta UUIDs e códigos de cultos)
    tema_culto TEXT,
    observacoes_gerais TEXT,
    musicas JSONB NOT NULL DEFAULT '[]'::jsonb, -- Lista estruturada das músicas do culto
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT uq_repertorio_cultos_evento UNIQUE (evento_id)
);

CREATE INDEX IF NOT EXISTS idx_repertorio_cultos_evento_id ON public.repertorio_cultos (evento_id);

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE public.repertorio_bibliotecas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repertorio_musicas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repertorio_cultos ENABLE ROW LEVEL SECURITY;

-- 5. Políticas de Acesso: repertorio_bibliotecas
DROP POLICY IF EXISTS "repertorio_bibliotecas_all" ON public.repertorio_bibliotecas;
CREATE POLICY "repertorio_bibliotecas_all" ON public.repertorio_bibliotecas 
    FOR ALL TO authenticated, anon USING (true) WITH CHECK (true);

-- 6. Políticas de Acesso: repertorio_musicas
DROP POLICY IF EXISTS "repertorio_musicas_all" ON public.repertorio_musicas;
CREATE POLICY "repertorio_musicas_all" ON public.repertorio_musicas 
    FOR ALL TO authenticated, anon USING (true) WITH CHECK (true);

-- 7. Políticas de Acesso: repertorio_cultos
DROP POLICY IF EXISTS "repertorio_cultos_all" ON public.repertorio_cultos;
CREATE POLICY "repertorio_cultos_all" ON public.repertorio_cultos 
    FOR ALL TO authenticated, anon USING (true) WITH CHECK (true);

-- 8. Inserção Inicial de Bibliotecas Recomendadas
INSERT INTO public.repertorio_bibliotecas (nome, descricao, cor, tipo, voz)
VALUES
    ('Celebração Feminina', 'Músicas animadas de celebração com tons adaptados para vocal feminino', '#ec4899', 'Celebração', 'Feminino'),
    ('Celebração Masculina', 'Músicas animadas de celebração com tons adaptados para vocal masculino', '#2563eb', 'Celebração', 'Masculino'),
    ('Adoração Feminina', 'Músicas de adoração e quebrantamento congregacional em tons femininos', '#a855f7', 'Adoração', 'Feminino'),
    ('Adoração Masculina', 'Músicas de adoração e quebrantamento congregacional em tons masculinos', '#1d4ed8', 'Adoração', 'Masculino'),
    ('Pós Pregação', 'Músicas de resposta à palavra, ministração e apelo', '#f59e0b', 'Pós pregação', 'Misto')
ON CONFLICT (nome) DO NOTHING;

-- 9. Inserção Inicial de Músicas com Bibliotecas e Classificação Vocal
INSERT INTO public.repertorio_musicas (titulo, artista, tipo, biblioteca, voz, tom, bpm)
VALUES
    ('É Tudo Sobre Você', 'Morada', 'Celebração', 'Celebração Masculina', 'Masculino', 'D', '128'),
    ('Para Ti Eu Vou', 'Central 3', 'Celebração', 'Celebração Masculina', 'Masculino', 'G', '130'),
    ('Pra Sempre (Forever)', 'Fernandinho', 'Celebração', 'Celebração Masculina', 'Masculino', 'A', '124'),
    ('A Ele a Glória', 'Gabriela Rocha', 'Celebração', 'Celebração Feminina', 'Feminino', 'C', '120'),
    ('O Hino (The Anthem)', 'Fernandinho', 'Celebração', 'Celebração Masculina', 'Masculino', 'E', '126'),
    ('Grande é o Senhor', 'Adhemar de Campos', 'Celebração', 'Celebração Masculina', 'Masculino', 'A', '118'),
    ('Toda Terra', 'Central 3', 'Celebração', 'Celebração Masculina', 'Masculino', 'D', '132'),
    ('Yeshua', 'Fernandinho', 'Celebração', 'Celebração Masculina', 'Masculino', 'Bm', '125'),
    
    ('Lugar Secreto', 'Gabriela Rocha', 'Adoração', 'Adoração Feminina', 'Feminino', 'C', '68'),
    ('A Casa É Sua', 'Casa Worship', 'Adoração', 'Adoração Masculina', 'Masculino', 'G', '72'),
    ('Quero Conhecer Jesus', 'Alessandro Vilas Boas', 'Adoração', 'Adoração Masculina', 'Masculino', 'Em', '70'),
    ('Bondade de Deus', 'Isaías Saad', 'Adoração', 'Adoração Masculina', 'Masculino', 'Ab', '70'),
    ('Me Atraiu', 'Gabriela Rocha', 'Adoração', 'Adoração Feminina', 'Feminino', 'D', '72'),
    ('Vitorioso És', 'Gabriel Guedes', 'Adoração', 'Adoração Masculina', 'Masculino', 'B', '74'),
    ('Só Tu És Santo', 'Morada', 'Adoração', 'Adoração Masculina', 'Masculino', 'F', '66'),
    ('Santo Espírito', 'Laura Souguellis', 'Adoração', 'Adoração Feminina', 'Feminino', 'D', '72'),
    ('Digno de Tudo', 'David Quinlan', 'Adoração', 'Adoração Masculina', 'Masculino', 'D', '68'),
    ('Rei dos Reis (King of Kings)', 'Hillsong / Gabriela Rocha', 'Adoração', 'Adoração Feminina', 'Feminino', 'D', '68'),
    
    ('Ruja o Leão', 'Talita Catanzaro', 'Pós pregação', 'Pós Pregação', 'Feminino', 'A', '70'),
    ('Em Teus Braços', 'Laura Souguellis', 'Pós pregação', 'Pós Pregação', 'Feminino', 'G', '65'),
    ('Teu Amor Não Falha', 'Nívea Soares', 'Pós pregação', 'Pós Pregação', 'Feminino', 'C', '74'),
    ('Ousado Amor', 'Isaías Saad', 'Pós pregação', 'Pós Pregação', 'Masculino', 'Gb', '72'),
    ('Deus de Promessas', 'Davi Sacer', 'Pós pregação', 'Pós Pregação', 'Masculino', 'F#m', '68'),
    ('Todavia Me Alegrarei', 'Samuel Messias', 'Pós pregação', 'Pós Pregação', 'Masculino', 'E', '64'),
    ('Ele Continua Sendo Bom', 'Paulo César Baruk', 'Pós pregação', 'Pós Pregação', 'Masculino', 'G', '68')
ON CONFLICT DO NOTHING;
