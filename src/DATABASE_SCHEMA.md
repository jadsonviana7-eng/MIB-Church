# 📊 Schema do Banco de Dados Supabase

Para que a aplicação funcione corretamente, execute os blocos de código abaixo no **SQL Editor** do Supabase na ordem apresentada.

## 1️⃣ Tabelas Base (Sem Chaves Estrangeiras)

```sql
-- Zonas de Moradia
CREATE TABLE IF NOT EXISTS zonas_moradia (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Atuações
CREATE TABLE IF NOT EXISTS atuacoes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Cargos
CREATE TABLE IF NOT EXISTS cargos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Contas Financeiras
CREATE TABLE IF NOT EXISTS contas_financeiras (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Categorias Financeiras
CREATE TABLE IF NOT EXISTS categorias_financeiras (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  tipo TEXT NOT NULL, -- 'receita' ou 'despesa'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Dados da Igreja (Singleton)
CREATE TABLE IF NOT EXISTS dados_igreja (
  id INT PRIMARY KEY DEFAULT 1,
  nome_igreja TEXT,
  cnpj TEXT,
  endereco TEXT,
  telefone TEXT,
  email_contato TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT singleton_row CHECK (id = 1)
);

INSERT INTO dados_igreja (id, nome_igreja) VALUES (1, 'MIB Church') ON CONFLICT (id) DO NOTHING;
```

## 2️⃣ Tabelas Principais (Pessoas e Células)

Devido à dependência circular (Pessoas <> Células), criamos as tabelas e depois adicionamos as chaves estrangeiras.

```sql
-- Criar Pessoas primeiro
CREATE TABLE IF NOT EXISTS pessoas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  genero TEXT,
  data_nascimento DATE,
  estado_civil TEXT,
  cpf TEXT UNIQUE,
  rg TEXT,
  escolaridade TEXT,
  profissao TEXT,
  email TEXT,
  telefone TEXT,
  cep TEXT,
  endereco TEXT,
  numero TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  tipo_membro TEXT DEFAULT 'membro',
  zona_id uuid REFERENCES zonas_moradia(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'ativo',
  permissao TEXT DEFAULT 'membro',
  motivo_exclusao TEXT,
  data_conversao DATE,
  data_batismo DATE,
  batizado_aguas BOOLEAN DEFAULT false,
  atuacao TEXT,
  foto_url TEXT,
  auth_user_id uuid,
  acesso_ativo BOOLEAN DEFAULT false,
  permissoes_json JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar Células
CREATE TABLE IF NOT EXISTS celulas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  faixa_etaria TEXT,
  dia_semana TEXT,
  horario TEXT,
  local TEXT,
  lider_id uuid REFERENCES pessoas(id) ON DELETE SET NULL,
  zona_id uuid REFERENCES zonas_moradia(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Agora adicionar as chaves circulares
ALTER TABLE pessoas ADD COLUMN IF NOT EXISTS celula_id uuid REFERENCES celulas(id) ON DELETE SET NULL;
ALTER TABLE pessoas ADD COLUMN IF NOT EXISTS conjuge_id uuid REFERENCES pessoas(id) ON DELETE SET NULL;
```

## 3️⃣ Relatórios de Célula e Financeiro

```sql
-- Relatórios de Reunião (Célula)
CREATE TABLE IF NOT EXISTS relatorios_celula (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  celula_id uuid NOT NULL REFERENCES celulas(id) ON DELETE CASCADE,
  data_reuniao DATE NOT NULL,
  tema TEXT,
  valor_oferta DECIMAL(10, 2) DEFAULT 0,
  observacoes TEXT,
  visitantes TEXT,
  criado_por TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Transações Financeiras
CREATE TABLE IF NOT EXISTS transacoes_financeiras (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  data DATE NOT NULL,
  tipo TEXT NOT NULL, -- 'receita', 'despesa', 'transferencia'
  descricao TEXT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pago', -- 'pago', 'pendente', 'cancelado'
  pessoa_id uuid REFERENCES pessoas(id) ON DELETE SET NULL,
  categoria_id uuid REFERENCES categorias_financeiras(id) ON DELETE SET NULL,
  conta_id uuid REFERENCES contas_financeiras(id) ON DELETE SET NULL,
  anotacoes TEXT,
  competencia TEXT, -- Formato YYYY-MM
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## 4️⃣ Escolas e Educação

```sql
-- Escolas / Cursos
CREATE TABLE IF NOT EXISTS escolas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Disciplinas
CREATE TABLE IF NOT EXISTS disciplinas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    escola_id UUID REFERENCES escolas(id) ON DELETE CASCADE NOT NULL,
    nome TEXT NOT NULL,
    carga_horaria INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Professores
CREATE TABLE IF NOT EXISTS professores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pessoa_id UUID REFERENCES pessoas(id) ON DELETE CASCADE UNIQUE NOT NULL,
    biografia TEXT,
    especialidade TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Turmas
CREATE TABLE IF NOT EXISTS turmas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    escola_id UUID REFERENCES escolas(id) ON DELETE CASCADE NOT NULL,
    nome TEXT NOT NULL,
    ano_letivo INTEGER NOT NULL,
    semestre INTEGER DEFAULT 1,
    ativa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Turmas x Disciplinas
CREATE TABLE IF NOT EXISTS turmas_disciplinas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    turma_id UUID REFERENCES turmas(id) ON DELETE CASCADE NOT NULL,
    disciplina_id UUID REFERENCES disciplinas(id) ON DELETE CASCADE NOT NULL,
    professor_id UUID REFERENCES professores(id) ON DELETE SET NULL,
    UNIQUE(turma_id, disciplina_id)
);

-- Alunos
CREATE TABLE IF NOT EXISTS alunos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pessoa_id UUID REFERENCES pessoas(id) ON DELETE CASCADE UNIQUE NOT NULL,
    matricula TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Alunos x Turmas
CREATE TABLE IF NOT EXISTS alunos_turmas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    aluno_id UUID REFERENCES alunos(id) ON DELETE CASCADE NOT NULL,
    turma_id UUID REFERENCES turmas(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'ativo',
    data_inscricao DATE DEFAULT CURRENT_DATE,
    UNIQUE(aluno_id, turma_id)
);

-- Aulas
CREATE TABLE IF NOT EXISTS aulas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    turma_disciplina_id UUID REFERENCES turmas_disciplinas(id) ON DELETE CASCADE NOT NULL,
    data_aula DATE NOT NULL,
    conteudo_proposto TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Avaliações
CREATE TABLE IF NOT EXISTS avaliacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    turma_disciplina_id UUID REFERENCES turmas_disciplinas(id) ON DELETE CASCADE NOT NULL,
    aluno_id UUID REFERENCES alunos(id) ON DELETE CASCADE NOT NULL,
    nota NUMERIC(4,2) CHECK (nota >= 0 AND nota <= 10),
    observacao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(turma_disciplina_id, aluno_id)
);

```

## 🔒 Segurança e Políticas de Acesso (RLS)

Para ativar o RLS em todas as tabelas e garantir acesso total para administradores, execute os blocos abaixo no SQL Editor do Supabase.

### 1. Função de Permissão (Resolve Recursão)
Esta função identifica o nível de acesso do usuário logado de forma segura, prevenindo loops de recursão infinita no RLS.

```sql
CREATE OR REPLACE FUNCTION public.get_user_permission() 
RETURNS text AS $$
DECLARE
  _perfil text;
BEGIN
  SELECT permissao INTO _perfil FROM public.pessoas 
  WHERE auth_user_id = auth.uid() 
     OR LOWER(email) = LOWER(auth.jwt()->>'email') 
  LIMIT 1;
  RETURN COALESCE(_perfil, 'membro');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.get_my_pessoa_id() 
RETURNS uuid AS $$
DECLARE
  _id uuid;
BEGIN
  SELECT id INTO _id FROM public.pessoas 
  WHERE auth_user_id = auth.uid() 
     OR LOWER(email) = LOWER(auth.jwt()->>'email') 
  LIMIT 1;
  RETURN _id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.get_my_celula_id() 
RETURNS uuid AS $$
DECLARE
  _celula_id uuid;
BEGIN
  SELECT celula_id INTO _celula_id FROM public.pessoas 
  WHERE auth_user_id = auth.uid() 
     OR LOWER(email) = LOWER(auth.jwt()->>'email') 
  LIMIT 1;
  RETURN _celula_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.get_my_spouse_id() 
RETURNS uuid AS $$
BEGIN
  RETURN (SELECT conjuge_id FROM public.pessoas WHERE id = public.get_my_pessoa_id());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
```

CREATE OR REPLACE FUNCTION public.get_my_spouse_id() 
RETURNS uuid LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT conjuge_id FROM public.pessoas WHERE id = public.get_my_pessoa_id();
$$;

### 2. Habilitar RLS e Criar Política de Admin
Este bloco configura políticas limpas, removendo duplicatas e conflitos.

```sql
-- 1. Habilitar RLS em tabelas principais
ALTER TABLE public.pessoas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.celulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relatorios_celula ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contas_financeiras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias_financeiras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transacoes_financeiras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relacoes_familiares ENABLE ROW LEVEL SECURITY;

-- 2. Políticas de ADMIN (Acesso Total Soberano)
DROP POLICY IF EXISTS "Admin_Full_Access" ON public.pessoas;
CREATE POLICY "Admin_Full_Access" ON public.pessoas 
FOR ALL TO authenticated 
USING (public.get_user_permission() = 'admin') 
WITH CHECK (public.get_user_permission() = 'admin');

DROP POLICY IF EXISTS "Admin_Full_Celulas" ON public.celulas;
CREATE POLICY "Admin_Full_Celulas" ON public.celulas 
FOR ALL TO authenticated USING (public.get_user_permission() = 'admin') WITH CHECK (public.get_user_permission() = 'admin');

-- 2. Políticas Financeiras Explícitas (Evita erros de LOOP)

-- Tabela: transacoes_financeiras
DROP POLICY IF EXISTS "Admin_Full_Transacoes" ON public.transacoes_financeiras;
CREATE POLICY "Admin_Full_Transacoes" ON public.transacoes_financeiras FOR ALL TO authenticated 
USING (public.get_user_permission() = 'admin') WITH CHECK (public.get_user_permission() = 'admin');

DROP POLICY IF EXISTS "Pastor_Tesouraria_Full_Transacoes" ON public.transacoes_financeiras;
CREATE POLICY "Pastor_Tesouraria_Full_Transacoes" ON public.transacoes_financeiras FOR ALL TO authenticated 
USING (public.get_user_permission() IN ('pastor', 'tesouraria')) WITH CHECK (public.get_user_permission() IN ('pastor', 'tesouraria'));

-- Tabela: contas_financeiras
DROP POLICY IF EXISTS "Admin_Full_Contas" ON public.contas_financeiras;
CREATE POLICY "Admin_Full_Contas" ON public.contas_financeiras FOR ALL TO authenticated 
USING (public.get_user_permission() = 'admin') WITH CHECK (public.get_user_permission() = 'admin');

-- Tabela: categorias_financeiras
DROP POLICY IF EXISTS "Admin_Full_Categorias" ON public.categorias_financeiras;
CREATE POLICY "Admin_Full_Categorias" ON public.categorias_financeiras FOR ALL TO authenticated 
USING (public.get_user_permission() = 'admin') WITH CHECK (public.get_user_permission() = 'admin');

-- Política de leitura informativa para Líder de Célula (Apenas transações)
DROP POLICY IF EXISTS "Lider_Read_Transacoes" ON public.transacoes_financeiras;
CREATE POLICY "Lider_Read_Transacoes" ON public.transacoes_financeiras 
FOR SELECT TO authenticated 
USING (public.get_user_permission() = 'lider-celula');

DROP POLICY IF EXISTS "Membro_Read_Own_Transactions" ON public.transacoes_financeiras;
CREATE POLICY "Membro_Read_Own_Transactions" ON public.transacoes_financeiras 
FOR SELECT TO authenticated 
USING (pessoa_id = public.get_my_pessoa_id());

-- Tabela: categorias_financeiras (Ajuste para leitura geral)
DROP POLICY IF EXISTS "Select_Categorias_Auth" ON public.categorias_financeiras;
CREATE POLICY "Select_Categorias_Auth" ON public.categorias_financeiras 
FOR SELECT TO authenticated USING (true);

-- 3. Políticas Granulares de Leitura (Evita Recursão)
DROP POLICY IF EXISTS "Perfil_Restrito_Select" ON public.pessoas;

CREATE POLICY "Pessoas_Read_Self" ON public.pessoas 
FOR SELECT TO authenticated USING (id = public.get_my_pessoa_id());

CREATE POLICY "Pessoas_Read_Spouse" ON public.pessoas 
FOR SELECT TO authenticated USING (id = public.get_my_spouse_id() OR conjuge_id = public.get_my_pessoa_id());

CREATE POLICY "Pessoas_Read_Family" ON public.pessoas 
FOR SELECT TO authenticated USING (
    id IN (SELECT id_filho FROM public.relacoes_familiares WHERE id_pai_mae = public.get_my_pessoa_id()) OR
    id IN (SELECT id_pai_mae FROM public.relacoes_familiares WHERE id_filho = public.get_my_pessoa_id())
);

CREATE POLICY "Pessoas_Read_Leader" ON public.pessoas 
FOR SELECT TO authenticated USING (
    public.get_user_permission() = 'lider-celula' AND celula_id = public.get_my_celula_id()
);

CREATE POLICY "Pessoas_Read_Staff" ON public.pessoas 
FOR SELECT TO authenticated USING (
    public.get_user_permission() IN ('pastor', 'secretaria', 'admin', 'tesouraria')
);

-- Tabela: relacoes_familiares
DROP POLICY IF EXISTS "Membros_Read_Own_Relations" ON public.relacoes_familiares;
CREATE POLICY "Membros_Read_Own_Relations" ON public.relacoes_familiares
FOR SELECT TO authenticated
USING (
    id_pai_mae = public.get_my_pessoa_id() OR 
    id_filho = public.get_my_pessoa_id() OR
    public.get_user_permission() IN ('pastor', 'secretaria', 'admin')
);
```
```

### 3. Políticas para o Formulário Público (Autocadastro)
Permite que visitantes (anon) realizem o cadastro inicial e vejam os dados da igreja.

```sql
-- Tabela pessoas: permitir inserção anônima
DROP POLICY IF EXISTS "Allow anon insert for public registration" ON pessoas;
CREATE POLICY "Allow anon insert for public registration" ON pessoas FOR INSERT TO anon WITH CHECK (true);

-- Tabela dados_igreja: permitir leitura anônima para o cabeçalho
DROP POLICY IF EXISTS "Allow anon select for church details" ON dados_igreja;
CREATE POLICY "Allow anon select for church details" ON dados_igreja FOR SELECT TO anon USING (true);
```

### 4. Políticas para Storage (Fotos)
Configuração para que administradores gerenciem fotos e o público possa vê-las.

```sql
-- Política para Admin gerenciar tudo no bucket fotos-membros
DROP POLICY IF EXISTS "Admin full access on storage" ON storage.objects;
CREATE POLICY "Admin full access on storage" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'fotos-membros' AND public.get_user_permission() = 'admin')
  WITH CHECK (bucket_id = 'fotos-membros' AND public.get_user_permission() = 'admin');

-- Política para Anon/Authenticated ver fotos
DROP POLICY IF EXISTS "Public access to profile pictures" ON storage.objects;
CREATE POLICY "Public access to profile pictures" ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'fotos-membros');
```
```sql
CREATE TABLE dados_igreja (
  id INT PRIMARY KEY DEFAULT 1,
  nome_igreja TEXT,
  cnpj TEXT,
  endereco TEXT,
  telefone TEXT,
  email_contato TEXT,
  logo_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Inserir um registro inicial para os dados da igreja, se não existir
INSERT INTO dados_igreja (id, nome_igreja) VALUES (1, 'MIB Church') ON CONFLICT (id) DO NOTHING;
```

## 🔒 Row Level Security (RLS)

Para produção, ative RLS em todas as tabelas e configure políticas de acesso apropriadas.

**Políticas de RLS para o Formulário Público:**

Para permitir que usuários não autenticados (anon) possam inserir dados na tabela `pessoas` e ler dados da tabela `dados_igreja` (para o cabeçalho do formulário), você precisará criar as seguintes políticas no Supabase:

**1. Tabela `pessoas`:**
```sql
CREATE POLICY "Allow anon insert for public registration"
ON public.pessoas FOR INSERT TO anon
WITH CHECK (true);
```

**2. Tabela `dados_igreja`:**
```sql
CREATE POLICY "Allow anon select for church details"
ON public.dados_igreja FOR SELECT TO anon
USING (true);
```

**3. Bucket de Storage `fotos-membros`:**

No painel do Supabase, vá em `Storage` -> `fotos-membros` -> `Policies` e adicione as seguintes políticas:

*   **Policy Name:** `Allow anon upload for profile pictures`
    *   **Allowed Operations:** `INSERT`
    *   **Target Roles:** `anon`
    *   **USING expression:** `(bucket_id = 'fotos-membros')`
    *   **WITH CHECK expression:** `(bucket_id = 'fotos-membros')`

*   **Policy Name:** `Allow anon select for profile pictures`
    *   **Allowed Operations:** `SELECT`
    *   **Target Roles:** `anon`
    *   **USING expression:** `(bucket_id = 'fotos-membros')`



## ✅ Verificação

Após criar as tabelas:
1. Abra o navegador (F12)
2. Verifique que não há mais erros 404 no console
3. Teste o cadastro de um membro
4. Teste a criação de uma célula
5. Teste a adição de uma atuação em Configurações

## 🚀 Dados Iniciais (Opcional)

Você pode inserir dados iniciais para testes:

```sql
-- Inserir zonas de moradia
INSERT INTO zonas_moradia (nome, descricao) VALUES
  ('Zona Norte', 'Região norte da cidade'),
  ('Zona Sul', 'Região sul da cidade'),
  ('Zona Leste', 'Região leste da cidade'),
  ('Zona Oeste', 'Região oeste da cidade');

-- Inserir atuações
INSERT INTO atuacoes (nome, descricao) VALUES
  ('Pastor', 'Liderança pastoral'),
  ('Diácono', 'Ministério diaconal'),
  ('Presbítero', 'Ministério presbiteral'),
  ('Evangelista', 'Evangelização');

-- Inserir células
INSERT INTO celulas (nome, faixa_etaria, dia_semana, horario) VALUES
  ('Célula Central', 'Adultos', 'Terça', '19:30'),
  ('Célula Jovens', 'Jovens', 'Quinta', '19:30'),
  ('Célula Crianças', 'Crianças', 'Sábado', '15:00');

-- 1. TABELA DE ESCOLAS / CURSOS
CREATE TABLE IF NOT EXISTS escolas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. TABELA DE DISCIPLINAS / MATÉRIAS
CREATE TABLE IF NOT EXISTS disciplinas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    escola_id UUID REFERENCES escolas(id) ON DELETE CASCADE NOT NULL,
    nome TEXT NOT NULL,
    carga_horaria INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. TABELA DE PROFESSORES
-- (Estende a tabela 'pessoas' que você já possui)
CREATE TABLE IF NOT EXISTS professores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pessoa_id UUID REFERENCES pessoas(id) ON DELETE CASCADE UNIQUE NOT NULL,
    biografia TEXT,
    especialidade TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. TABELA DE TURMAS
CREATE TABLE IF NOT EXISTS turmas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    escola_id UUID REFERENCES escolas(id) ON DELETE CASCADE NOT NULL,
    nome TEXT NOT NULL, -- Ex: "Teologia Módulo 1 - Noite"
    ano_letivo INTEGER NOT NULL,
    semestre INTEGER DEFAULT 1,
    ativa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. RELACIONAMENTO: TURMAS & DISCIPLINAS & PROFESSORES
-- Define qual matéria será dada em qual turma e por qual professor
CREATE TABLE IF NOT EXISTS turmas_disciplinas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    turma_id UUID REFERENCES turmas(id) ON DELETE CASCADE NOT NULL,
    disciplina_id UUID REFERENCES disciplinas(id) ON DELETE CASCADE NOT NULL,
    professor_id UUID REFERENCES professores(id) ON DELETE SET NULL,
    UNIQUE(turma_id, disciplina_id)
);

-- 6. TABELA DE ALUNOS
-- (Também estende a tabela 'pessoas')
CREATE TABLE IF NOT EXISTS alunos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pessoa_id UUID REFERENCES pessoas(id) ON DELETE CASCADE UNIQUE NOT NULL,
    matricula TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. RELACIONAMENTO: ALUNOS & TURMAS (Inscrições)
CREATE TABLE IF NOT EXISTS alunos_turmas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    aluno_id UUID REFERENCES alunos(id) ON DELETE CASCADE NOT NULL,
    turma_id UUID REFERENCES turmas(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'ativo', -- ativo, trancado, concluido
    data_inscricao DATE DEFAULT CURRENT_DATE,
    UNIQUE(aluno_id, turma_id)
);

-- 8. TABELA DE AULAS (Para controle de presença/diário de classe)
CREATE TABLE IF NOT EXISTS aulas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    turma_disciplina_id UUID REFERENCES turmas_disciplinas(id) ON DELETE CASCADE NOT NULL,
    data_aula TIMESTAMP WITH TIME ZONE NOT NULL,
    conteudo_proposto TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. TABELA DE AVALIAÇÕES / NOTAS
CREATE TABLE IF NOT EXISTS avaliacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    turma_disciplina_id UUID REFERENCES turmas_disciplinas(id) ON DELETE CASCADE NOT NULL,
    aluno_id UUID REFERENCES alunos(id) ON DELETE CASCADE NOT NULL,
    nota NUMERIC(4,2) CHECK (nota >= 0 AND nota <= 10),
    observacao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(turma_disciplina_id, aluno_id)
);

-- 10. TABELA DE INSCRIÇÕES PÚBLICAS (Para novos alunos se cadastrarem externamente)
CREATE TABLE IF NOT EXISTS inscricoes_publicas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    turma_id UUID REFERENCES turmas(id) ON DELETE CASCADE NOT NULL,
    nome_candidato TEXT NOT NULL,
    email_candidato TEXT NOT NULL,
    telefone_candidato TEXT,
    status_analise TEXT DEFAULT 'pendente', -- pendente, aprovado, rejeitado
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);


-- HABILITAR SEGURANÇA DE LINHA (RLS) PARA AS NOVAS TABELAS
ALTER TABLE escolas ENABLE ROW LEVEL SECURITY;
ALTER TABLE disciplinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE professores ENABLE ROW LEVEL SECURITY;
ALTER TABLE turmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE turmas_disciplinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE alunos_turmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE aulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE avaliacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE inscricoes_publicas ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS BÁSICAS (Exemplo: Permitir leitura para usuários autenticados)
DROP POLICY IF EXISTS "Permitir leitura para usuários autenticados" ON escolas;
CREATE POLICY "Permitir leitura para usuários autenticados" ON escolas FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir leitura para usuários autenticados" ON disciplinas;
CREATE POLICY "Permitir leitura para usuários autenticados" ON disciplinas FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir leitura para usuários autenticados" ON turmas;
CREATE POLICY "Permitir leitura para usuários autenticados" ON turmas FOR SELECT TO authenticated USING (true);
```

## 🔒 Row Level Security (RLS)

Para produção, ative RLS em todas as tabelas e configure políticas de acesso apropriadas.

## 📝 Como Criar as Tabelas

### Opção 1: Via SQL Editor do Supabase
1. Abra seu projeto Supabase
2. Vá para SQL Editor
3. Crie uma nova query
4. Cole o SQL acima
5. Execute

### Opção 2: Via CLI Supabase
```bash
supabase db push
```

## ✅ Verificação

Após criar as tabelas:
1. Abra o navegador (F12)
2. Verifique que não há mais erros 404 no console
3. Teste o cadastro de um membro
4. Teste a criação de uma célula
5. Teste a adição de uma atuação em Configurações

## 🚀 Dados Iniciais (Opcional)

Você pode inserir dados iniciais para testes:

```sql
-- Inserir zonas de moradia
INSERT INTO zonas_moradia (nome, descricao) VALUES
  ('Zona Norte', 'Região norte da cidade'),
  ('Zona Sul', 'Região sul da cidade'),
  ('Zona Leste', 'Região leste da cidade'),
  ('Zona Oeste', 'Região oeste da cidade');

-- Inserir atuações
INSERT INTO atuacoes (nome, descricao) VALUES
  ('Pastor', 'Liderança pastoral'),
  ('Diácono', 'Ministério diaconal'),
  ('Presbítero', 'Ministério presbiteral'),
  ('Evangelista', 'Evangelização');

-- Inserir células
INSERT INTO celulas (nome, faixa_etaria, dia_semana, horario) VALUES
  ('Célula Central', 'Adultos', 'Terça', '19:30'),
  ('Célula Jovens', 'Jovens', 'Quinta', '19:30'),
  ('Célula Crianças', 'Crianças', 'Sábado', '15:00');

-- 1. TABELA DE ESCOLAS / CURSOS
CREATE TABLE IF NOT EXISTS escolas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 2. TABELA DE DISCIPLINAS / MATÉRIAS
CREATE TABLE IF NOT EXISTS disciplinas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    escola_id UUID REFERENCES escolas(id) ON DELETE CASCADE NOT NULL,
    nome TEXT NOT NULL,
    carga_horaria INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 3. TABELA DE PROFESSORES
-- (Estende a tabela 'pessoas' que você já possui)
CREATE TABLE IF NOT EXISTS professores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pessoa_id UUID REFERENCES pessoas(id) ON DELETE CASCADE UNIQUE NOT NULL,
    biografia TEXT,
    especialidade TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 4. TABELA DE TURMAS
CREATE TABLE IF NOT EXISTS turmas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    escola_id UUID REFERENCES escolas(id) ON DELETE CASCADE NOT NULL,
    nome TEXT NOT NULL, -- Ex: "Teologia Módulo 1 - Noite"
    ano_letivo INTEGER NOT NULL,
    semestre INTEGER DEFAULT 1,
    ativa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 5. RELACIONAMENTO: TURMAS & DISCIPLINAS & PROFESSORES
-- Define qual matéria será dada em qual turma e por qual professor
CREATE TABLE IF NOT EXISTS turmas_disciplinas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    turma_id UUID REFERENCES turmas(id) ON DELETE CASCADE NOT NULL,
    disciplina_id UUID REFERENCES disciplinas(id) ON DELETE CASCADE NOT NULL,
    professor_id UUID REFERENCES professores(id) ON DELETE SET NULL,
    UNIQUE(turma_id, disciplina_id)
);

-- 6. TABELA DE ALUNOS
-- (Também estende a tabela 'pessoas')
CREATE TABLE IF NOT EXISTS alunos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pessoa_id UUID REFERENCES pessoas(id) ON DELETE CASCADE UNIQUE NOT NULL,
    matricula TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 7. RELACIONAMENTO: ALUNOS & TURMAS (Inscrições)
CREATE TABLE IF NOT EXISTS alunos_turmas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    aluno_id UUID REFERENCES alunos(id) ON DELETE CASCADE NOT NULL,
    turma_id UUID REFERENCES turmas(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'ativo', -- ativo, trancado, concluido
    data_inscricao DATE DEFAULT CURRENT_DATE,
    UNIQUE(aluno_id, turma_id)
);

-- 8. TABELA DE AULAS (Para controle de presença/diário de classe)
CREATE TABLE IF NOT EXISTS aulas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    turma_disciplina_id UUID REFERENCES turmas_disciplinas(id) ON DELETE CASCADE NOT NULL,
    data_aula TIMESTAMP WITH TIME ZONE NOT NULL,
    conteudo_proposto TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 9. TABELA DE AVALIAÇÕES / NOTAS
CREATE TABLE IF NOT EXISTS avaliacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    turma_disciplina_id UUID REFERENCES turmas_disciplinas(id) ON DELETE CASCADE NOT NULL,
    aluno_id UUID REFERENCES alunos(id) ON DELETE CASCADE NOT NULL,
    nota NUMERIC(4,2) CHECK (nota >= 0 AND nota <= 10),
    observacao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE(turma_disciplina_id, aluno_id)
);

-- 10. TABELA DE INSCRIÇÕES PÚBLICAS (Para novos alunos se cadastrarem externamente)
CREATE TABLE IF NOT EXISTS inscricoes_publicas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    turma_id UUID REFERENCES turmas(id) ON DELETE CASCADE NOT NULL,
    nome_candidato TEXT NOT NULL,
    email_candidato TEXT NOT NULL,
    telefone_candidato TEXT,
    status_analise TEXT DEFAULT 'pendente', -- pendente, aprovado, rejeitado
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 11. TABELA DE PEDIDOS DE ORAÇÃO
-- 11. TABELA DE PEDIDOS DE ORAÇÃO
CREATE TABLE IF NOT EXISTS pedidos_oracao (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pessoa_id UUID REFERENCES pessoas(id) ON DELETE CASCADE NOT NULL,
    pedido TEXT NOT NULL,
    urgente BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'pendente', -- pendente, em_oracao, respondido
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE pedidos_oracao ENABLE ROW LEVEL SECURITY;

-- 1. Qualquer autenticado pode inserir seu próprio pedido
DROP POLICY IF EXISTS "Membros criam seus proprios pedidos" ON pedidos_oracao;
CREATE POLICY "Membros criam seus proprios pedidos" ON pedidos_oracao 
FOR INSERT TO authenticated 
WITH CHECK (pessoa_id = public.get_my_pessoa_id());

-- 2. Membros veem apenas seus próprios pedidos
DROP POLICY IF EXISTS "Membros veem seus proprios pedidos" ON pedidos_oracao;
CREATE POLICY "Membros veem seus proprios pedidos" ON pedidos_oracao 
FOR SELECT TO authenticated 
USING (pessoa_id = public.get_my_pessoa_id());

-- 3. Pastores e Admins veem tudo
DROP POLICY IF EXISTS "Pastores veem todos os pedidos" ON pedidos_oracao;
CREATE POLICY "Pastores veem todos os pedidos" ON pedidos_oracao 
FOR SELECT TO authenticated 
USING (public.get_user_permission() IN ('admin', 'pastor'));

-- 4. Líderes veem apenas pedidos dos membros de sua própria célula
DROP POLICY IF EXISTS "Lideres veem pedidos de sua celula" ON pedidos_oracao;
CREATE POLICY "Lideres veem pedidos de sua celula" ON pedidos_oracao 
FOR SELECT TO authenticated 
USING (
    public.get_user_permission() = 'lider-celula' AND 
    EXISTS (
        SELECT 1 FROM public.pessoas p 
        WHERE p.id = pedidos_oracao.pessoa_id AND p.celula_id = public.get_my_celula_id()
    )
);

-- 5. Permitir que Líderes e Pastores atualizem o status do pedido
DROP POLICY IF EXISTS "Lideres e Pastores atualizam status" ON pedidos_oracao;
CREATE POLICY "Lideres e Pastores atualizam status" ON pedidos_oracao 
FOR UPDATE TO authenticated 
USING (public.get_user_permission() IN ('admin', 'pastor', 'lider-celula'));
