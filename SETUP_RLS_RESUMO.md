# 🚀 RLS Setup - Resumo Executivo

## 📁 Arquivos Criados

| Arquivo | Descrição | Quando Usar |
|---------|-----------|------------|
| `politicas-rls-perfis.sql` | Implementação completa de RLS | ✅ Primeira vez / Setup completo |
| `RLS-QUICK-FIX.sql` | Script rápido para corrigir problemas | ✅ **Comece por AQUI se está com problema** |
| `CORRECAO-RLS-DIAGNOSTICO.sql` | Diagnóstico detalhado + múltiplas soluções | ✅ Se Quick Fix não funcionar |
| `RLS_GUIDE.md` | Documentação completa de RLS | 📖 Referência |
| `TROUBLESHOOTING_RLS.md` | Guia de troubleshooting passo a passo | 🔧 Se algo não funcionar |

---

## ⚡ Solução Rápida (5 minutos)

Se você está com o problema agora:

### 1. Abra SQL Editor do Supabase
- Vá para: `https://app.supabase.com` → Seu Projeto → **SQL Editor**

### 2. Execute o arquivo: `RLS-QUICK-FIX.sql`
- Copie todo o conteúdo do arquivo
- Cole no SQL Editor
- Execute seção por seção (há comentários explicando)

### 3. Siga a sequência:
```
SEÇÃO 1: VERIFICAR ESTADO ATUAL
    ↓
SEÇÃO 2: PREENCHER permissao
    ↓ (⚠️ Edite seu e-mail aqui!)
SEÇÃO 3: SINCRONIZAR auth_user_id
    ↓
SEÇÃO 4: CRIAR TRIGGER
    ↓
SEÇÃO 5: VERSÃO ALTERNATIVA (se precisar)
    ↓
SEÇÃO 6: TESTE RÁPIDO
    ↓
✅ Logout + Login novamente
```

---

## 🔍 O que deu errado?

Análise do problema:

```
┌─────────────────────────────────────────┐
│   Você fez Login como ADMIN             │
│   Mas não recebeu dados do banco        │
└────────────┬────────────────────────────┘
             │
             ├─ Problema 1: permissao = NULL ❌
             │  └─ Solução: UPDATE com 'admin'
             │
             ├─ Problema 2: auth_user_id = NULL ❌
             │  └─ Solução: Sincronizar com auth.users
             │
             └─ Problema 3: Funções RLS usam auth_user_id ❌
                └─ Solução: Usar email em vez de ID
```

---

## 📊 Estrutura de Permissões

```
         ┌──────────────────────────────────┐
         │       ADMIN (Full Access)        │
         │  • Todas as tabelas             │
         │  • Criar, ler, atualizar, delete│
         └──────────────────────────────────┘
                        ↑
         ┌──────────────┴──────────────┐
         │                              │
    ┌────▼────────────┐    ┌──────────▼──────┐
    │ PASTOR          │    │ LÍDER CÉLULA    │
    │ • Pessoas: R/W  │    │ • Sua célula    │
    │ • Células: R/W  │    │ • Seus membros  │
    │ • Financeiro:Full│    │ • Relatórios    │
    └────────────────┘    └─────────────────┘
                            ↓
                    ┌───────────────────┐
                    │ MEMBRO            │
                    │ • Seu perfil      │
                    │ • Sua célula      │
                    └───────────────────┘
```

---

## ✅ Checklist de Implementação

### Setup Inicial
- [ ] Criar tabelas faltantes (`politicas-rls-perfis.sql` SEÇÃO 0)
- [ ] Habilitar RLS em todas as tabelas
- [ ] Criar funções de segurança

### Sincronizar Dados
- [ ] Preencher coluna `permissao` com valores válidos
- [ ] Sincronizar `auth_user_id` com `auth.users`
- [ ] Criar TRIGGER automático

### Testar
- [ ] Fazer logout completo
- [ ] Fazer login novamente
- [ ] Verificar se consegue ver dados
- [ ] Testar cada perfil (admin, pastor, lider, membro)

---

## 🆘 Se Não Funcionar

### Passo 1: Diagnóstico
Execute esta query:
```sql
SELECT 
  email, 
  permissao, 
  auth_user_id
FROM public.pessoas 
WHERE email = 'seu-email@example.com';
```

**Se `permissao` = NULL:** Vá para Passo 2  
**Se `auth_user_id` = NULL:** Vá para Passo 3  

### Passo 2: Preencher permissao
```sql
UPDATE public.pessoas 
SET permissao = 'admin'
WHERE email = 'seu-email@example.com';
```

### Passo 3: Sincronizar auth_user_id
```sql
UPDATE public.pessoas p
SET auth_user_id = u.id
FROM auth.users u
WHERE p.email = u.email;
```

### Passo 4: Desabilitar RLS (DEBUG)
```sql
ALTER TABLE public.pessoas DISABLE ROW LEVEL SECURITY;
```

Se agora funciona, o problema está nas **funções RLS**.  
Se ainda não funciona, o problema está na **autenticação**.

---

## 📞 Documentação Completa

Veja os arquivos para mais detalhes:

- **RLS_GUIDE.md** - Como usar RLS, permissões, exemplos
- **TROUBLESHOOTING_RLS.md** - Passo a passo para cada erro comum
- **CORRECAO-RLS-DIAGNOSTICO.sql** - Diagnóstico técnico aprofundado

---

## 🎯 Próximos Passos

1. ✅ Execute `RLS-QUICK-FIX.sql`
2. ✅ Teste logout + login
3. ✅ Se funcionar, parabéns! 🎉
4. ❌ Se não funcionar, consulte `TROUBLESHOOTING_RLS.md`

---

**Última atualização:** Junho 2026
**Status:** Ready for Production
**Suporte:** Veja arquivos de documentação

