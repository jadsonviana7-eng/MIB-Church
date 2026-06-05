# 🔧 Troubleshooting - RLS Não Está Funcionando

## ⚠️ Problema Identificado

Ao fazer login como admin, nenhum dados são retornados do banco. Todos os perfis (admin, pastor, líder, membro) retornam erro de permissão.

---

## 🔍 Causa Raiz

Existem **3 problemas principais** que podem estar acontecendo:

### Problema 1: Coluna `permissao` está vazia
```sql
-- Isto está acontecendo:
SELECT email, permissao FROM public.pessoas LIMIT 5;
-- Resultado: email | permissao
--            user@example.com | NULL
```

**As políticas RLS precisam que `permissao` esteja preenchida com:**
- `'admin'`
- `'pastor'`
- `'lider'`
- `'membro'`

### Problema 2: `auth_user_id` não está vinculado
A função `get_id_usuario()` tenta encontrar o usuário por `auth_user_id`, mas este campo está NULL.

### Problema 3: Função usa `auth.uid()` que retorna NULL
Se o usuário não está autenticado corretamente, `auth.uid()` retorna NULL e todas as políticas bloqueiam.

---

## ✅ Solução (Passo a Passo)

### **PASSO 1: Verifique o Estado Atual**

Vá ao **Supabase SQL Editor** e execute:

```sql
SELECT 
  id,
  nome, 
  email, 
  permissao,
  auth_user_id,
  acesso_ativo
FROM public.pessoas
WHERE email IS NOT NULL
LIMIT 10;
```

**Você vai ver algo como:**
```
id          | nome     | email              | permissao | auth_user_id | acesso_ativo
----------- | -------- | ------------------ | --------- | ------------ | -----------
uuid-123    | João     | joao@example.com   | NULL      | NULL         | false
uuid-456    | Maria    | maria@example.com  | NULL      | NULL         | false
```

Se `permissao` está vazio em todos, siga para o Passo 2.

---

### **PASSO 2: Preencher a Coluna `permissao`**

Agora você vai atribuir perfis aos usuários. Execute no SQL Editor:

```sql
-- Atribuir ADMIN (use seu e-mail!)
UPDATE public.pessoas 
SET permissao = 'admin'
WHERE email = 'seu-email@example.com';
-- ⚠️ SUBSTITUA 'seu-email@example.com' pelo seu e-mail REAL
```

**Depois, atribua outros perfis:**

```sql
-- Atribuir PASTOR
UPDATE public.pessoas 
SET permissao = 'pastor'
WHERE email = 'pastor@example.com';

-- Atribuir LÍDER
UPDATE public.pessoas 
SET permissao = 'lider'
WHERE email = 'lider@example.com';

-- Atribuir MEMBRO (padrão para todos os outros)
UPDATE public.pessoas 
SET permissao = 'membro'
WHERE permissao IS NULL;
```

---

### **PASSO 3: Sincronizar auth_user_id**

Execute para vincular os registros ao Supabase Auth:

```sql
-- Vincular auth_user_id automaticamente
UPDATE public.pessoas p
SET auth_user_id = u.id
FROM auth.users u
WHERE p.email = u.email AND p.auth_user_id IS NULL;
```

---

### **PASSO 4: Criar Trigger Automático** (Recomendado)

Para que novos usuários sejam vinculados automaticamente:

```sql
DROP TRIGGER IF EXISTS trg_sync_auth_user_id ON public.pessoas;
DROP FUNCTION IF EXISTS public.fn_sync_auth_user_id();

CREATE OR REPLACE FUNCTION public.fn_sync_auth_user_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IS NOT NULL THEN
    NEW.auth_user_id := (
      SELECT id FROM auth.users WHERE email = NEW.email LIMIT 1
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_auth_user_id
BEFORE INSERT OR UPDATE ON public.pessoas
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_auth_user_id();
```

---

### **PASSO 5: Testar a Autenticação**

1. **Logout** da aplicação
2. **Feche o navegador completamente**
3. **Abra novamente** e vá para login
4. **Digite seu e-mail e senha**
5. **Deveria funcionar agora!**

Se não funcionar, continue para o Passo 6.

---

### **PASSO 6: Debug Avançado**

Se ainda não funciona, use a **política de teste temporária**:

```sql
-- Desabilitar RLS
ALTER TABLE public.pessoas DISABLE ROW LEVEL SECURITY;

-- Criar política super permissiva
CREATE POLICY "debug_test" ON public.pessoas
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
```

Agora teste:
- ✅ Se **funciona com esta política**, o problema está nas **funções RLS** → Vá para Passo 7
- ❌ Se **não funciona mesmo assim**, o problema está na **autenticação** → Vá para Passo 8

---

### **PASSO 7: Se o Problema é nas Funções RLS**

A função `get_perfil_usuario()` está usando `auth_user_id`, mas talvez você não consiga vincular isso automaticamente.

**Solução: Use uma versão que funciona com EMAIL em vez de ID:**

Copie e execute o arquivo: `supabase/CORRECAO-RLS-DIAGNOSTICO.sql` (seção 4)

Este arquivo cria:
1. ✅ Nova função `get_email_usuario()` - retorna o email do usuário
2. ✅ Nova função `get_perfil_usuario_v2()` - busca permissão pelo email
3. ✅ Novas políticas que usam essas funções

---

### **PASSO 8: Se o Problema é na Autenticação**

Se o usuário não consegue logar, verifique:

```sql
-- Verificar se o e-mail existe em auth.users
SELECT email FROM auth.users WHERE email = 'seu-email@example.com';
```

Se retornar vazio, o usuário não foi criado em Supabase Auth.

**Como criar usuário:**

1. Vá ao Supabase → **Authentication** → **Users**
2. Clique em **+ Add User**
3. Informe email e senha
4. Clique **Generate Password** ou **Send Invite**

Depois execute o Passo 3 novamente.

---

## 📋 Checklist Final

- [ ] Executei a query de VERIFICAÇÃO e vi o estado atual
- [ ] Preenchi a coluna `permissao` com 'admin', 'pastor', 'lider', 'membro'
- [ ] Sincronizei `auth_user_id` com `UPDATE ... FROM auth.users`
- [ ] Criei o TRIGGER automático
- [ ] Fiz logout e login novamente
- [ ] Agora consigo ver dados!

---

## 🚨 Erros Comuns

### Erro: "ERROR: permission denied for schema public"
**Causa:** Você está tentando fazer query sem estar logado
**Solução:** Faça login corretamente no frontend

### Erro: "relation 'auth.users' does not exist"
**Causa:** Você está em um schema errado
**Solução:** Certifique-se de estar no SQL Editor do Supabase (não num PostgreSQL local)

### Erro: "role 'authenticated' does not exist"
**Causa:** Usuário não está autenticado
**Solução:** Faça logout e login novamente

### Visibilidade limitada ao seu próprio registro
**Causa:** Perfil está configurado como 'membro'
**Solução:** Mude para 'admin' ou 'pastor' se necessário

---

## 🎯 Se Nada Funcionar

Como **último recurso**, use a política super permissiva PERMANENTEMENTE (apenas para desenvolvimento):

```sql
-- Desabilitar RLS completamente
ALTER TABLE public.pessoas DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.celulas DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reunioes_celula DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.relatorios_reuniao DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.transacoes_financeiras DISABLE ROW LEVEL SECURITY;
-- ... etc para todas as tabelas
```

⚠️ **NÃO FAÇA ISSO EM PRODUÇÃO!**

Depois que conseguir funcionar, reabilite RLS e implemente as políticas corretamente.

---

## 📞 Precisa de ajuda?

Verifique os arquivos:
- `supabase/politicas-rls-perfis.sql` - Implementação original
- `supabase/CORRECAO-RLS-DIAGNOSTICO.sql` - Diagnóstico e correção
- `RLS_GUIDE.md` - Documentação completa

