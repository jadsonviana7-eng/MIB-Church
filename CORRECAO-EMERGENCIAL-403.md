# 🚨 CORREÇÃO EMERGENCIAL - Erro 403 (Acesso Negado)

## 🔴 Problema
- ✅ Usuário loga corretamente
- ✅ Coluna `permissao` preenchida (admin, pastor, lider, membro)
- ❌ **Erro 403 em TODAS as requisições de dados**
- ❌ Nenhum perfil consegue acessar dados

## 🔍 Diagnóstico
As políticas RLS que foram criadas **estão bloqueando TUDO**, mesmo admins.

## ⚡ Solução Rápida (3 minutos)

### 1️⃣ Abra SQL Editor do Supabase

https://app.supabase.com → Seu Projeto → **SQL Editor**

### 2️⃣ Execute este SQL
Arquivo: `supabase/RLS-CORRECAO-EMERGENCIAL.sql`

Copie **TODO** o conteúdo e execute.

**Este SQL:**
- ✅ Remove TODAS as políticas antigas problemáticas
- ✅ Desabilita RLS temporariamente
- ✅ Reabilita RLS com políticas simples que funcionam
- ✅ Libera acesso para todos os usuários autenticados

### 3️⃣ Teste no Frontend

1. **Logout** completo
2. **Feche o navegador**
3. **Abra novamente**
4. **Faça login**
5. **Os dados devem aparecer!** ✅

---

## ✅ Se Funcionar Agora

**Parabéns!** Os dados estão aparecendo.

Mas saiba que agora está em **modo permissivo** (DESENVOLVIMENTO apenas):
- Todos os usuários autenticados podem acessar TUDO
- Não há controle de perfil
- **NÃO USE EM PRODUÇÃO ASSIM**

### Para reativar segurança depois:
Consulte: `RLS_GUIDE.md`

---

## ❌ Se Ainda Não Funcionar

Se depois dessa correção ainda recebe 403:

### Problema 2: Autenticação quebrada
- Verifique `.env.local` tem credenciais corretas
- Compare com `.env.example`

### Problema 3: Erro no frontend
- Abra console (F12)
- Procure por erros de import em `supabaseClient.js`
- Verifique: `src/App.jsx` linhas 249-288

### Problema 4: Tabela não existe
- Erro: "Tabela 'relatorios_celula' não encontrada"
- Solução: Execute `supabase/politicas-rls-perfis.sql` SEÇÃO 0

---

## 📊 Estrutura da Correção

```
┌─ RLS-CORRECAO-EMERGENCIAL.sql
├─ PASSO 1: Desabilitar RLS (debug)
├─ PASSO 2: Remover todas as antigas políticas
├─ PASSO 3: Reabilitar RLS
├─ PASSO 4: Criar políticas simples (todos liberados)
└─ PASSO 5: Próxima etapa (segurança)
```

---

## 🎯 Sequência de Execução

```
1. Copia supabase/RLS-CORRECAO-EMERGENCIAL.sql
2. Cola no SQL Editor
3. Executa
4. Testa: Logout + Login
5. Verifica se dados aparecem
```

---

## 📋 Checklist

- [ ] Abri SQL Editor do Supabase
- [ ] Copiei e executei RLS-CORRECAO-EMERGENCIAL.sql
- [ ] Fiz logout completo
- [ ] Fiz login novamente
- [ ] **Os dados aparecerem!** ✅

---

## ⚠️ IMPORTANTE

**Depois que funcionar:**

1. **Não use em produção** desta forma
2. Isto é apenas para desenvolvimento
3. Quando quiser ativar segurança: leia `RLS_GUIDE.md`
4. Vamos criar políticas que funcionam E são seguras

---

## 🆘 Ainda com problema?

1. Verifique erro exato no console (F12)
2. Procure por "403" nos erros
3. Se vir algo diferente, me avise!

---

**Próximo passo:** Logout + Login + Teste

