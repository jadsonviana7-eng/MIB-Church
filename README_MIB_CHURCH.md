# 🏆 MIB Church - Gestão de Membresia

Aplicação web completa para gestão de membresia de igrejas, desenvolvida com React, Vite e Supabase.

## 🚀 Quick Start

### 1. Instalação
```bash
npm install
```

### 2. Configuração do Supabase
1. Copie `.env.example` para `.env.local`
2. Configure suas credenciais Supabase:
   ```
   VITE_SUPABASE_URL=seu-url-aqui
   VITE_SUPABASE_ANON_KEY=sua-chave-aqui
   ```
3. Crie o schema do banco de dados:
   - Veja `DATABASE_SCHEMA.md` para as tabelas necessárias
   - Execute o SQL em seu projeto Supabase

### 3. Desenvolvimento
```bash
npm run dev
```

### 4. Build para Produção
```bash
npm run build
npm run preview
```

## 📋 Recursos

- ✅ Gerenciamento completo de membros
- ✅ Organização em células
- ✅ Rastreamento de reuniões
- ✅ Relatórios e indicadores
- ✅ Controle de perfis de acesso (Admin, Pastor, Lider, etc)
- ✅ Gestão de zonas de moradia
- ✅ Upload de fotos com recorte
- ✅ Sistema de autenticação via Supabase

## 🔐 Segurança

- Credenciais armazenadas em variáveis de ambiente
- Autenticação real com Supabase Auth
- Error Boundary para tratamento gracioso de erros
- **Row Level Security (RLS) implementado** com 4 perfis de usuário:
  - ✅ **Admin** - Acesso total
  - ✅ **Pastor** - Gerenciamento completo
  - ✅ **Líder de Célula** - Gerenciamento de sua célula
  - ✅ **Membro** - Acesso restrito ao seu perfil

## 🔧 Configurar RLS

Se estiver com problema de permissões após login:

### 🚨 **Se está recebendo Erro 403 (Acesso Negado):**
```
→ Leia: INSTRUCOES-RAPIDAS-403.md
→ Execute: supabase/RLS-CORRECAO-EMERGENCIAL.sql
```

### 📚 Referência Completa:

1. **Instruções rápidas (1 min):**
   ```
   → INSTRUCOES-RAPIDAS-403.md
   ```

2. **Diagnóstico de erro 403:**
   ```
   → CORRECAO-EMERGENCIAL-403.md
   ```

3. **Início rápido (5 min):**
   ```
   → SETUP_RLS_RESUMO.md
   ```

4. **Passo a passo detalhado:**
   ```
   → TROUBLESHOOTING_RLS.md
   ```

5. **Implementação técnica:**
   ```
   → supabase/RLS-QUICK-FIX.sql
   ```

### Arquivos Importantes
- `supabase/politicas-rls-perfis.sql` - Políticas RLS
- `supabase/RLS-QUICK-FIX.sql` - Solução rápida para problemas
- `RLS_GUIDE.md` - Documentação completa
- `TROUBLESHOOTING_RLS.md` - Guia de troubleshooting

Veja `SECURITY_FIXES.md` para mais detalhes.

## 📊 Banco de Dados

Veja `DATABASE_SCHEMA.md` para instruções completas sobre:
- Criação das tabelas
- Schema do banco de dados
- Dados iniciais de exemplo

## 🐛 Troubleshooting

### Erro 404 em requisições Supabase
- Verifique se as tabelas foram criadas (ver `DATABASE_SCHEMA.md`)
- Confirme as variáveis de ambiente em `.env.local`
- Abra o console (F12) para ver mensagens de erro

### Erro de autenticação
- Verifique se `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão corretos
- Teste suas credenciais no Supabase dashboard

## 🛠️ Tecnologias

- **React 19** - UI components
- **Vite 8** - Build tool
- **Supabase** - Backend & Auth
- **Tailwind CSS** - Styling
- **React Easy Crop** - Image cropping

## 📄 Licença

[Adicione sua licença aqui]
