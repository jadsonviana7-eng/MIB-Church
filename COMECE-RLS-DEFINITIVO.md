# 🎯 IMPLEMENTAR RLS DEFINITIVO - Passo a Passo

## ✅ Tudo em 10 minutos

### PASSO 1️⃣: Abra SQL Editor do Supabase
```
https://app.supabase.com
→ Seu Projeto
→ SQL Editor
```

---

### PASSO 2️⃣: Cole e Execute Este SQL
```
Arquivo: supabase/POLITICAS-RLS-DEFINITIVAS.sql
```

**Todo o arquivo.** Uma única execução.

Aguarde aparecer: ✅ "Success"

---

### PASSO 3️⃣: Atribua os Perfis

Execute isto no mesmo SQL Editor:

```sql
-- Admin (edite o e-mail!)
UPDATE public.pessoas 
SET permissao = 'admin'
WHERE email = 'seu-email-admin@gmail.com';

-- Pastor
UPDATE public.pessoas 
SET permissao = 'pastor'
WHERE email = 'pastor-email@gmail.com';

-- Secretário
UPDATE public.pessoas 
SET permissao = 'secretario'
WHERE email = 'secretario@gmail.com';

-- Tesoureiro
UPDATE public.pessoas 
SET permissao = 'tesoureiro'
WHERE email = 'tesoureiro@gmail.com';

-- Resto são membros (padrão)
UPDATE public.pessoas 
SET permissao = 'membro'
WHERE permissao IS NULL;
```

✏️ **EDITE OS E-MAILS ACIMA COM OS REAIS!**

---

### PASSO 4️⃣: Vincular Líderes a Células

```sql
-- Se já sabe quem é líder de qual célula:
UPDATE public.celulas
SET lider_id = (SELECT id FROM public.pessoas WHERE email = 'lider1@gmail.com')
WHERE nome = 'Célula Centro';

UPDATE public.celulas
SET lider_id = (SELECT id FROM public.pessoas WHERE email = 'lider2@gmail.com')
WHERE nome = 'Célula Juventude';
```

---

### PASSO 5️⃣: Membros em Células

```sql
-- Vincule membros a suas células
UPDATE public.pessoas
SET celula_id = (SELECT id FROM public.celulas WHERE nome = 'Célula Centro')
WHERE email = 'membro1@gmail.com';

UPDATE public.pessoas
SET celula_id = (SELECT id FROM public.celulas WHERE nome = 'Célula Juventude')
WHERE email = 'membro2@gmail.com';
```

---

### PASSO 6️⃣: Teste Agora

1. **Logout** (do navegador: Ctrl+Shift+Delete)
2. **Feche a aba do navegador**
3. **Abra novamente**
4. **Login com ADMIN** → Deve ver TUDO
5. **Logout e login com MEMBRO** → Deve ver pouco

---

## ✅ Resultado Esperado

| Perfil | Vê | Faz |
|--------|-----|-----|
| Admin | Tudo | Tudo |
| Pastor | Tudo | Tudo |
| Secretário | Tudo | Lê + atualiza relatórios |
| Tesoureiro | Tudo (financeiro principalmente) | Gerencia financeiro |
| Líder | Sua célula | Gerencia sua célula |
| Membro | Seu perfil + sua célula | Edita seu perfil |

---

## 🎉 Pronto!

RLS definitivo está ativo. Cada perfil tem permissões certas.

---

## 🆘 Se Não Funcionar

1. Verifique os e-mails (estão corretos no UPDATE?)
2. Verifique se a coluna `permissao` foi preenchida:
   ```sql
   SELECT email, permissao FROM public.pessoas LIMIT 5;
   ```
3. Se algum mostrar `NULL`, execute o UPDATE do Passo 3 novamente

---

## 📖 Para Saber Mais

- `POLITICAS-RLS-DEFINITIVAS-GUIA.md` - Matriz completa
- `supabase/POLITICAS-RLS-DEFINITIVAS.sql` - Código SQL completo
