# 🎯 INSTRUÇÕES DIRETAS - Erro 403

## O que fazer AGORA:

### 1️⃣ Abra Supabase SQL Editor
```
https://app.supabase.com 
→ Seu Projeto 
→ SQL Editor
```

### 2️⃣ Cole e execute ESTE arquivo:
```
supabase/RLS-CORRECAO-EMERGENCIAL.sql
```

**TODO o arquivo.** Copy/paste completo.

### 3️⃣ Volte para aplicação
- Logout (Ctrl+Shift+Del do navegador)
- Logout da app
- Feche aba do navegador
- Abra novamente
- Login

### 4️⃣ Verificar
- Se dados aparecem → ✅ Funcionando!
- Se erro 403 ainda aparece → Execute: `DEBUG-POLITICAS-RLS.sql`

---

## Se DEBUG mostrar:

**RLS Ativado + 0 políticas:**
→ Execute RLS-CORRECAO-EMERGENCIAL.sql (já fez acima)

**RLS Ativado + Muitas políticas:**
→ Políticas estão erradas
→ A correção emergencial vai remover e criar simples

**RLS Desativado:**
→ Dados vão passar
→ Teste se funciona
→ Se funciona, problema = nas políticas
→ Se não funciona, problema = na autenticação

---

## Fim 🎉

Faça o teste acima e me avisa o resultado!

