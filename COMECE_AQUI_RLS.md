# 🎯 COMECE AQUI - RLS Setup

## ⚠️ Você está vendo "Permissão Negada" ou nenhum dado após login?

### 👇 Siga esta sequência de 3 passos

---

## **PASSO 1️⃣: Abra o SQL Editor do Supabase**

1. Vá para: https://app.supabase.com
2. Selecione seu projeto **MIB Church**
3. Clique em **SQL Editor** (no menu esquerdo)
4. Clique em **+ New Query**

---

## **PASSO 2️⃣: Copie e Cole o Script**

Abra o arquivo: **`supabase/RLS-QUICK-FIX.sql`**

Copie **TODO** o conteúdo e cole no SQL Editor do Supabase.

---

## **PASSO 3️⃣: Execute as Seções em Ordem**

### Seção 1: VERIFICAR ESTADO ATUAL ✅
```sql
SELECT 
  COUNT(*) as total_pessoas,
  SUM(CASE WHEN permissao IS NULL THEN 1 ELSE 0 END) as sem_permissao,
  SUM(CASE WHEN auth_user_id IS NULL THEN 1 ELSE 0 END) as sem_auth_user_id,
  SUM(CASE WHEN email IS NULL THEN 1 ELSE 0 END) as sem_email
FROM public.pessoas;
```

**Execute e veja o resultado.**

---

### Seção 2: PREENCHER PERMISSAO ⚠️ IMPORTANTE!

```sql
-- ⬇️ EDITE ISTO: Substitua 'seu-email-admin@example.com' pelo seu e-mail REAL

UPDATE public.pessoas 
SET permissao = 'admin'
WHERE email = 'seu-email-admin@example.com' AND permissao IS NULL;

-- Depois preencha o resto:
UPDATE public.pessoas 
SET permissao = 'membro'
WHERE permissao IS NULL;
```

**Execute e verifique:**
```sql
SELECT email, permissao FROM public.pessoas LIMIT 5;
```

---

### Seção 3: SINCRONIZAR AUTH_USER_ID 🔗

```sql
UPDATE public.pessoas p
SET auth_user_id = u.id
FROM auth.users u
WHERE p.email = u.email AND p.auth_user_id IS NULL;
```

**Execute e verifique:**
```sql
SELECT email, auth_user_id FROM public.pessoas WHERE email IS NOT NULL LIMIT 5;
```

---

### Seção 4: CRIAR TRIGGER AUTOMÁTICO 🤖

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

**Execute.**

---

### Seção 5: VERSÃO ALTERNATIVA (se precisar)

Se as seções anteriores não funcionarem, execute esta seção também.

---

### Seção 6: TESTE RÁPIDO ✅

```sql
SELECT 
  current_user,
  (SELECT email FROM auth.users WHERE id = auth.uid()) as seu_email,
  public.get_perfil_por_email() as seu_perfil;
```

**Resultado esperado:**
```
current_user                  seu_email                      seu_perfil
seu-email-admin@example.com   seu-email-admin@example.com    admin
```

---

## **PASSO 4️⃣: Teste na Aplicação**

1. **Feche o navegador completamente** (Ctrl+Q ou ⌘+Q)
2. **Abra novamente**
3. **Vá para Login**
4. **Digite seu e-mail e senha**
5. **Você deveria ver os dados agora!** 🎉

---

## ❌ Se Ainda Não Funcionar

### Problema 1: "Erro de Permissão"
- Verifique se o e-mail está correto
- Execute: `SELECT email, permissao FROM public.pessoas LIMIT 5;`
- Deve mostrar seu e-mail com `permissao = 'admin'`

### Problema 2: "Erro ao conectar ao banco"
- Verifique `.env.local` com suas credenciais Supabase
- Copie do `.env.example` se necessário

### Problema 3: Ainda sem acesso
- Veja: **`TROUBLESHOOTING_RLS.md`** (guia completo)
- Ou: **`SETUP_RLS_RESUMO.md`** (resumo com diagrama)

---

## 📁 Documentação Completa

| Arquivo | Descrição |
|---------|-----------|
| `COMECE_AQUI_RLS.md` | ← **Você está aqui** |
| `SETUP_RLS_RESUMO.md` | Resumo e diagrama visual |
| `RLS_GUIDE.md` | Documentação técnica completa |
| `TROUBLESHOOTING_RLS.md` | Passo a passo para cada erro |
| `supabase/RLS-QUICK-FIX.sql` | Script SQL de correção |
| `supabase/politicas-rls-perfis.sql` | Implementação original de RLS |

---

## ✅ Checklist Final

- [ ] Abri o SQL Editor do Supabase
- [ ] Executei as 6 seções de RLS-QUICK-FIX.sql em ordem
- [ ] Preenchi a coluna `permissao` com meu e-mail como 'admin'
- [ ] Sincronizei `auth_user_id`
- [ ] Fiz logout completo do navegador
- [ ] Fiz login novamente
- [ ] **Consegui ver os dados!** 🎉

---

## 🆘 Precisa de Ajuda?

1. Verifique as **seções de erro** acima
2. Leia **`TROUBLESHOOTING_RLS.md`** para solução detalhada
3. Execute **`CORRECAO-RLS-DIAGNOSTICO.sql`** para diagnóstico técnico

---

**Feito com ❤️ para MIB Church**  
Última atualização: Junho 2026

