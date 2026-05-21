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
```
