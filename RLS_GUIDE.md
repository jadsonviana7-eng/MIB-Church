# 🔒 Row-Level Security (RLS) - Guia de Configuração

## 📋 Perfis de Usuários

A aplicação MIB Church suporta 4 perfis principais com diferentes níveis de acesso:

### 1. **ADMIN** 👨‍💼
- Acesso total a todas as tabelas
- Pode criar, ler, atualizar e deletar qualquer registro
- Gerencia configurações do sistema
- Pode atribuir papéis a outros usuários

### 2. **PASTOR** 🙏
- Gerenciamento de células e membros
- Leitura completa de dados
- Pode validar e atualizar relatórios
- Gerencia finanças (contas, categorias, transações)
- Não pode deletar usuários

### 3. **LÍDER DE CÉLULA** (lider-celula) 📱
- Gerencia sua própria célula
- CRUD de membros da sua célula
- Relatórios de reuniões da sua célula
- Leitura de transações (informativo)
- Sem acesso a finanças

### 4. **MEMBRO** 👤
- Acesso apenas ao seu próprio perfil
- Leitura de dados da sua célula
- Sem acesso a finanças ou configurações

---

## 🗂️ Permissões por Tabela

| Tabela | Admin | Pastor | Líder | Membro |
|--------|:-----:|:------:|:-----:|:------:|
| **pessoas** | ✅ Full | ✅ Read/Write (lim.) | ✅ Célula (RW) | ✅ Self (RW) |
| **celulas** | ✅ Full | ✅ Read/Write | ✅ Self (RW) | ✅ Read |
| **relatorios_celula** | ✅ Full | ✅ Read/Write | ✅ Célula (Full) | ✅ Read |
| **transacoes_financeiras** | ✅ Full | ✅ Full | ✅ Read | ❌ None |
| **contas_financeiras** | ✅ Full | ✅ Full | ❌ None | ❌ None |
| **categorias_financeiras** | ✅ Full | ✅ Full | ❌ None | ❌ None |
| **zonas_moradia** | ✅ Full | ✅ Read | ✅ Read | ✅ Read |
| **atuacoes** | ✅ Full | ✅ Read | ✅ Read | ✅ Read |
| **cargos** | ✅ Full | ✅ Read | ✅ Read | ✅ Read |

**Legenda:**
- ✅ Full = Acesso total (Create, Read, Update, Delete)
- ✅ RW = Read & Write (sem Delete)
- ✅ Read = Apenas leitura
- ✅ Self = Apenas seu próprio registro
- ❌ None = Sem acesso

---

## 🚀 Como Implementar

### Passo 1: Executar o SQL
```sql
-- No Supabase SQL Editor, execute:
-- Arquivo: supabase/politicas-rls-perfis.sql
```

### Passo 2: Estruturar a Coluna de Permissão

A tabela `pessoas` deve ter:
```sql
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS auth_user_id uuid;
ALTER TABLE public.pessoas ADD COLUMN IF NOT EXISTS permissao text;

-- Valores válidos: 'admin', 'pastor', 'lider-celula', 'membro', 'secretaria'
```

### Passo 3: Atribuir Perfis aos Usuários

```sql
-- Atribuir ADMIN
UPDATE public.pessoas 
SET permissao = 'admin'
WHERE email = 'admin@igrejamib.com.br';

-- Atribuir PASTOR
UPDATE public.pessoas 
SET permissao = 'pastor'
WHERE email = 'pastor@igrejamib.com.br';

-- Atribuir LÍDER
UPDATE public.pessoas 
SET permissao = 'lider-celula'
WHERE email = 'lider@igrejamib.com.br';

-- Atribuir MEMBRO (padrão)
UPDATE public.pessoas 
SET permissao = 'membro'
WHERE permissao IS NULL;
```

### Passo 4: Vincular Líderes a Células

```sql
-- Fazer um líder responsável por uma célula
UPDATE public.celulas 
SET lider_id = (SELECT id FROM public.pessoas WHERE email = 'lider@igrejamib.com.br')
WHERE nome = 'Célula Centro';

-- Vincular membros a uma célula
UPDATE public.pessoas 
SET celula_id = (SELECT id FROM public.celulas WHERE nome = 'Célula Centro')
WHERE tipo_membro = 'membro' AND status = 'ativo';
```

---

## 🔐 Segurança

### Funções de Segurança Incluídas

#### `get_perfil_usuario()`
Retorna o perfil do usuário autenticado.
```sql
SELECT public.get_user_permission(); -- Retorna: 'admin', 'pastor', 'lider-celula', 'membro'
```

#### `get_id_usuario()`
Retorna o ID de pessoa do usuário autenticado.
```sql
SELECT public.get_id_usuario(); -- Retorna: uuid do usuário
```

#### `get_celula_lider()`
Retorna a célula que o líder coordena (para líderes).
```sql
SELECT public.get_celula_lider(); -- Retorna: uuid da célula
```

---

## 📋 Exemplos de Uso

### Exemplo 1: Pastor consultando todos os membros
```javascript
// No frontend (Supabase JS Client)
const { data } = await supabase
  .from('pessoas')
  .select('*')
  .eq('status', 'ativo');
// Retorna: Todos os membros (porque seu perfil é 'pastor')
```

### Exemplo 2: Líder consultando sua célula
```javascript
const { data } = await supabase
  .from('pessoas')
  .select('*')
  .eq('status', 'ativo');
// Retorna: Apenas membros da sua célula
```

### Exemplo 3: Membro consultando seu perfil
```javascript
const { data } = await supabase
  .from('pessoas')
  .select('*')
  .eq('id', user_id);
// Retorna: Apenas seu próprio registro
```

---

## ⚠️ Troubleshooting

### "Erro: Permissão negada"
- Verifique se o `auth_user_id` está vinculado corretamente
- Verifique se a coluna `permissao` está preenchida
- Teste a função: `SELECT public.get_perfil_usuario();`

### "Líder não consegue ver membros de sua célula"
- Verifique se o `lider_id` está configurado na tabela `celulas`
- Verifique se os membros têm `celula_id` preenchido

### "Admin com acesso negado"
- Verifique se `permissao = 'admin'` está salvo
- Teste: `SELECT public.get_perfil_usuario();`

---

## 🔄 Atualizar Perfil de um Usuário

```sql
-- De membro para líder
UPDATE public.pessoas 
SET permissao = 'lider'
WHERE email = 'novo-lider@igrejamib.com.br';

-- De qualquer perfil para admin
UPDATE public.pessoas 
SET permissao = 'admin'
WHERE email = 'novo-admin@igrejamib.com.br';
```

---

## 📝 Checklist de Implementação

- [ ] Executar `politicas-rls-perfis.sql` no Supabase
- [ ] Preencher a coluna `permissao` para todos os usuários
- [ ] Vincular `lider_id` nas células
- [ ] Vincular `celula_id` nos membros
- [ ] Testar acesso por cada perfil
- [ ] Documentar papéis dos usuários
- [ ] Fazer backup do banco antes de ativar RLS em produção

---

## 🆘 Suporte

Qualquer dúvida sobre configuração, consulte o arquivo SQL comentado ou o Supabase Docs: https://supabase.com/docs/guides/auth/row-level-security
