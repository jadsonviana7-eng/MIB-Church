# 🔧 Guia de Resolução de Problemas - MIB Church

## Problema: Localhost em Branco / Tela em Branco

Se você abrir `http://localhost:5173` (ou a porta configurada) e ver uma tela em branco, siga estes passos:

### 1️⃣ **Verificar o Console do Navegador**
- Pressione `F12` para abrir o DevTools
- Vá para a aba **Console**
- Se há erros em vermelho, anote-os e resolva conforme abaixo
- Se há warnings em amarelo, geralmente podem ser ignorados

### 2️⃣ **Limpar LocalStorage Corrompido**
Execute este comando no console do navegador (F12 → Console):
```javascript
localStorage.clear();
window.location.reload();
```

Isto remove qualquer sessão armazenada que possa estar causando erros.

### 3️⃣ **Verificar se o Servidor está Rodando**
Execute na pasta do projeto:
```bash
npm run dev
```

Você deve ver algo como:
```
  VITE v8.0.12  ready in XX ms

  ➜  Local:   http://localhost:5173/
```

### 4️⃣ **Verificar Variáveis de Ambiente**
Se ver mensagem "Supabase não configurado":
1. Copie `.env.example` para `.env.local`
2. Preencha com suas credenciais reais do Supabase
3. Reinicie o servidor (`Ctrl+C` e `npm run dev`)

### 5️⃣ **Limpar Cache e Reinstalar Dependências**
Se persistir o problema:

**Windows:**
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
npm run dev
```

**Mac/Linux:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 6️⃣ **Verificar Erros de Compilação**
No terminal onde `npm run dev` está rodando:
- Se ver erros em vermelho, anote-os
- Alguns erros comuns:
  - `Module not found` → Arquivo faltando
  - `Unexpected token` → Erro de sintaxe
  - `Cannot find module` → Dependência não instalada

### 7️⃣ **Erro: "Cannot read property 'celula_id' of undefined"**
Se ver este erro:
1. Limpe localStorage (passo 2)
2. Verifique se as tabelas Supabase existem
3. Veja `DATABASE_SCHEMA.md` para estrutura correta

## ✅ Tela de Login Deve Aparecer Quando:
- ✅ Nenhum usuário está logado
- ✅ localStorage foi limpo
- ✅ Servidor está rodando em `http://localhost:5173`

## 📋 Checklist Rápido

- [ ] `npm run dev` está rodando sem erros?
- [ ] `http://localhost:5173` abre sem erro 404?
- [ ] DevTools Console não mostra erros vermelhos?
- [ ] `.env.local` existe com credenciais Supabase?
- [ ] localStorage foi limpo (`localStorage.clear()`)?
- [ ] npm_modules e package-lock.json foram reinstalados?

Se mesmo assim não funcionar, abra uma issue com:
1. O erro exato do console (F12)
2. A saída do `npm run dev`
3. O resultado de `npm --version` e `node --version`
