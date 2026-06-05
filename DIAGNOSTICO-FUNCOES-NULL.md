# 🔴 DIAGNÓSTICO: Funções RLS Retornando NULL

## ⚠️ Problema
A query retornou apenas `celulas_visiveis: 6` e nada mais.

Isto significa: **As funções `obter_email()` e `obter_perfil()` estão retornando NULL ou erro.**

---

## 🔧 Solução Imediata

### Execute isto no SQL Editor:

```sql
Arquivo: supabase/DIAGNOSTICO-FUNCOES-RLS.sql
```

Este script vai:
1. ✅ Testar cada função individualmente
2. ✅ Mostrar o que está NULL
3. ✅ Indicar o problema exato

---

## 🎯 Resultado Esperado

**Se for ADMIN, você verá:**
```
Teste 1: email_resultado = seu-email@gmail.com
Teste 2: perfil_resultado = admin
Teste 3: id_resultado = uuid-123
Teste 7: seu_email = seu-email@gmail.com
         permissao_no_banco = admin
         funcao_retorna = admin
```

**Se ver NULL em algum, é este o problema:**

### 1️⃣ Teste 1 retorna NULL (email)
```
PROBLEMA: Você não está autenticado
SOLUÇÃO: Faça logout + login novamente
```

### 2️⃣ Teste 2 retorna NULL (perfil)
```
PROBLEMA: Coluna 'permissao' está vazia
SOLUÇÃO: Execute:
  UPDATE public.pessoas 
  SET permissao = 'admin'
  WHERE email = 'seu-email@gmail.com';
```

### 3️⃣ Teste 3 retorna NULL (id)
```
PROBLEMA: Email não bate entre auth.users e pessoas
SOLUÇÃO: Verifique:
  SELECT email FROM auth.users WHERE id = auth.uid();
  SELECT email FROM public.pessoas LIMIT 5;
```

---

## 📋 Próximos Passos

1. Execute: `DIAGNOSTICO-FUNCOES-RLS.sql`
2. Compare com o resultado esperado acima
3. Se algum teste falhar, aplique a solução correspondente
4. Execute novamente
5. Me avise o resultado!

---

**Aguardando seu feedback do diagnóstico! 👇**
