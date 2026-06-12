# 📊 Schema do Banco de Dados Supabase

## Tabelas Necessárias

Para que a aplicação funcione corretamente, você precisa criar as seguintes tabelas no Supabase:

### 1. **pessoas**
```sql
CREATE TABLE pessoas (
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
  celula_id uuid REFERENCES celulas(id),
  zona_id uuid REFERENCES zonas_moradia(id),
  status TEXT DEFAULT 'ativo',
  data_conversao DATE,
  data_batismo DATE,
  batizado_aguas BOOLEAN,
  atuacao TEXT,
  conjuge_id uuid REFERENCES pessoas(id),
  foto_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 2. **celulas**
```sql
CREATE TABLE celulas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  faixa_etaria TEXT,
  dia_semana TEXT,
  horario TEXT,
  local TEXT,
  lider_id uuid REFERENCES pessoas(id),
  zona_id uuid REFERENCES zonas_moradia(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 3. **zonas_moradia**
```sql
CREATE TABLE zonas_moradia (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  permite_parcelamento BOOLEAN DEFAULT false,
  max_parcelas INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 4. **atuacoes**
```sql
CREATE TABLE atuacoes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 5. **cargos** (se necessário)
```sql
CREATE TABLE cargos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 6. **reunioes_celula** (para rastreamento de reuniões)
```sql
CREATE TABLE reunioes_celula (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  celula_id uuid NOT NULL REFERENCES celulas(id) ON DELETE CASCADE,
  data_reuniao DATE NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 7. **relatorios_reuniao**
```sql
CREATE TABLE relatorios_reuniao (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  celula_id uuid NOT NULL REFERENCES celulas(id) ON DELETE CASCADE,
  data_reuniao DATE NOT NULL,
  tema TEXT,
  valor_oferta DECIMAL(10, 2),
  observacoes TEXT,
  visitantes TEXT,
  criado_por TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 8. **contas_financeiras**
```sql
CREATE TABLE contas_financeiras (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP DEFAULT now()
);
```

### 9. **categorias_financeiras**
```sql
CREATE TABLE categorias_financeiras (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  tipo TEXT NOT NULL, -- 'receita' ou 'despesa'
  created_at TIMESTAMP DEFAULT now()
);
```

### 10. **transacoes_financeiras**
```sql
CREATE TABLE transacoes_financeiras (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  data DATE NOT NULL,
  tipo TEXT NOT NULL, -- 'receita', 'despesa', 'transferencia'
  descricao TEXT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pendente', -- 'pago', 'pendente', 'cancelado'
  pessoa_id uuid REFERENCES pessoas(id),
  categoria_id uuid REFERENCES categorias_financeiras(id),
  conta_id uuid REFERENCES contas_financeiras(id),
  anotacoes TEXT,
  competencia TEXT, -- Formato YYYY-MM
  created_at TIMESTAMP DEFAULT now()
);
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

---

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
CREATE POLICY "Permitir leitura para usuários autenticados" ON escolas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Permitir leitura para usuários autenticados" ON disciplinas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Permitir leitura para usuários autenticados" ON turmas FOR SELECT TO authenticated USING (true);
