# 🔐 Políticas RLS Definitivas - 6 Perfis

## 📊 Matriz de Permissões Completa

### ADMIN ⭐
| Tabela | SELECT | INSERT | UPDATE | DELETE |
|--------|:------:|:------:|:------:|:------:|
| pessoas | ✅ | ✅ | ✅ | ✅ |
| celulas | ✅ | ✅ | ✅ | ✅ |
| reunioes_celula | ✅ | ✅ | ✅ | ✅ |
| relatorios_reuniao | ✅ | ✅ | ✅ | ✅ |
| transacoes_financeiras | ✅ | ✅ | ✅ | ✅ |
| contribuicoes | ✅ | ✅ | ✅ | ✅ |
| contas_financeiras | ✅ | ✅ | ✅ | ✅ |
| categorias_financeiras | ✅ | ✅ | ✅ | ✅ |
| zonas_moradia | ✅ | ✅ | ✅ | ✅ |
| atuacoes | ✅ | ✅ | ✅ | ✅ |
| cargos | ✅ | ✅ | ✅ | ✅ |

---

### PASTOR 🙏
| Tabela | SELECT | INSERT | UPDATE | DELETE |
|--------|:------:|:------:|:------:|:------:|
| pessoas | ✅ | ✅ | ✅ | ✅ |
| celulas | ✅ | ✅ | ✅ | ✅ |
| reunioes_celula | ✅ | ✅ | ✅ | ✅ |
| relatorios_reuniao | ✅ | ✅ | ✅ | ✅ |
| transacoes_financeiras | ✅ | ✅ | ✅ | ✅ |
| contribuicoes | ✅ | ✅ | ✅ | ✅ |
| contas_financeiras | ✅ | ✅ | ✅ | ✅ |
| categorias_financeiras | ✅ | ✅ | ✅ | ✅ |
| zonas_moradia | ✅ | - | - | - |
| atuacoes | ✅ | - | - | - |
| cargos | ✅ | - | - | - |

---

### SECRETÁRIO 📋
| Tabela | SELECT | INSERT | UPDATE | DELETE |
|--------|:------:|:------:|:------:|:------:|
| pessoas | ✅ | - | - | - |
| celulas | ✅ | - | - | - |
| reunioes_celula | ✅ | - | - | - |
| relatorios_reuniao | ✅ | - | ✅* | - |
| transacoes_financeiras | ✅ | - | - | - |
| contribuicoes | ✅ | - | - | - |
| contas_financeiras | ✅ | - | - | - |
| categorias_financeiras | ✅ | - | - | - |
| zonas_moradia | ✅ | - | - | - |
| atuacoes | ✅ | - | - | - |
| cargos | ✅ | - | - | - |

*Pode atualizar relatórios (supervisão)

---

### TESOUREIRO 💰
| Tabela | SELECT | INSERT | UPDATE | DELETE |
|--------|:------:|:------:|:------:|:------:|
| pessoas | ✅ | - | - | - |
| celulas | ✅ | - | - | - |
| reunioes_celula | ✅ | - | - | - |
| relatorios_reuniao | ✅ | - | - | - |
| transacoes_financeiras | ✅ | ✅ | ✅ | ✅ |
| contribuicoes | ✅ | ✅ | ✅ | ✅ |
| contas_financeiras | ✅ | ✅ | ✅ | ✅ |
| categorias_financeiras | ✅ | ✅ | ✅ | ✅ |
| zonas_moradia | ✅ | - | - | - |
| atuacoes | ✅ | - | - | - |
| cargos | ✅ | - | - | - |

---

### LÍDER DE CÉLULA 📱
| Tabela | SELECT | INSERT | UPDATE | DELETE | Restrição |
|--------|:------:|:------:|:------:|:------:|-----------|
| pessoas | ✅ | - | ✅ | - | Sua célula |
| celulas | ✅ | - | ✅ | - | Sua célula |
| reunioes_celula | ✅ | ✅ | ✅ | ✅ | Sua célula |
| relatorios_reuniao | ✅ | ✅ | ✅ | ✅ | Sua célula |
| transacoes_financeiras | ✅ | - | - | - | Leitura só |
| contribuicoes | ✅ | - | - | - | Sua célula |
| contas_financeiras | ❌ | - | - | - | Bloqueado |
| categorias_financeiras | ❌ | - | - | - | Bloqueado |
| zonas_moradia | ✅ | - | - | - | Leitura só |
| atuacoes | ✅ | - | - | - | Leitura só |
| cargos | ✅ | - | - | - | Leitura só |

---

### MEMBRO 👤
| Tabela | SELECT | INSERT | UPDATE | DELETE | Restrição |
|--------|:------:|:------:|:------:|:------:|-----------|
| pessoas | ✅ | - | ✅ | - | Seu próprio |
| celulas | ✅ | - | - | - | Sua célula |
| reunioes_celula | ✅ | - | - | - | Sua célula |
| relatorios_reuniao | ✅ | - | - | - | Sua célula |
| transacoes_financeiras | ❌ | - | - | - | Bloqueado |
| contribuicoes | ✅ | - | - | - | Seu próprio |
| contas_financeiras | ❌ | - | - | - | Bloqueado |
| categorias_financeiras | ❌ | - | - | - | Bloqueado |
| zonas_moradia | ✅ | - | - | - | Leitura só |
| atuacoes | ✅ | - | - | - | Leitura só |
| cargos | ✅ | - | - | - | Leitura só |

---

## 🚀 Como Implementar

### Passo 1: Execute o SQL
```sql
-- Arquivo: supabase/POLITICAS-RLS-DEFINITIVAS.sql
-- Copie e cole no SQL Editor do Supabase
```

### Passo 2: Atribua os Perfis

```sql
-- ADMIN
UPDATE public.pessoas 
SET permissao = 'admin'
WHERE email = 'seu-email-admin@example.com';

-- PASTOR
UPDATE public.pessoas 
SET permissao = 'pastor'
WHERE email = 'pastor@example.com';

-- SECRETÁRIO
UPDATE public.pessoas 
SET permissao = 'secretario'
WHERE email = 'secretario@example.com';

-- TESOUREIRO
UPDATE public.pessoas 
SET permissao = 'tesoureiro'
WHERE email = 'tesoureiro@example.com';

-- LÍDERES
UPDATE public.pessoas 
SET permissao = 'lider'
WHERE email IN ('lider1@example.com', 'lider2@example.com');

-- MEMBROS (padrão)
UPDATE public.pessoas 
SET permissao = 'membro'
WHERE permissao IS NULL;
```

### Passo 3: Vincule Líderes a Células

```sql
UPDATE public.celulas
SET lider_id = (SELECT id FROM public.pessoas WHERE email = 'lider@example.com')
WHERE nome = 'Célula Centro';
```

### Passo 4: Vincule Membros a Células

```sql
UPDATE public.pessoas
SET celula_id = (SELECT id FROM public.celulas WHERE nome = 'Célula Centro')
WHERE email = 'membro@example.com' AND tipo_membro = 'membro';
```

### Passo 5: Teste

1. Logout completo
2. Login com cada perfil
3. Verifique o que cada um consegue ver/fazer

---

## 📋 Checklist de Implementação

- [ ] Execute `POLITICAS-RLS-DEFINITIVAS.sql`
- [ ] Atribua todos os perfis
- [ ] Vincule líderes a suas células
- [ ] Vincule membros a suas células
- [ ] Teste com cada perfil
- [ ] Verifique permissões corretas

---

## 🔍 Testar Permissões

Para verificar se um perfil tem acesso correto:

```sql
-- Como um usuário específico (após login)
SELECT 
  (SELECT email FROM auth.users WHERE id = auth.uid()) as usuario,
  public.obter_perfil() as perfil,
  COUNT(*) as pessoas_visíveis
FROM public.pessoas;
```

**Resultados esperados:**

```
Admin:
  pessoas_visíveis = Total de pessoas

Pastor:
  pessoas_visíveis = Total de pessoas

Secretário:
  pessoas_visíveis = Total de pessoas

Líder:
  pessoas_visíveis = Apenas sua célula

Membro:
  pessoas_visíveis = Apenas seu registro
```

---

## 🆘 Troubleshooting

### Erro: "permission denied for schema public"
- Verifique se a coluna `permissao` está preenchida
- Execute: `SELECT email, permissao FROM public.pessoas LIMIT 5;`

### Erro: "Posso ver tudo quando deveria ser restrito"
- Verifique se `celula_id` está preenchido
- Execute: `SELECT id, nome, celula_id FROM public.pessoas LIMIT 5;`

### Erro: "Não consigo fazer UPDATE em meu perfil"
- Verifique se a política de UPDATE está criada
- Execute: `SELECT policyname FROM pg_policies WHERE tablename = 'pessoas';`

---

## 📞 Referência Rápida

| Perfil | Melhor Para |
|--------|------------|
| Admin | Gerenciador de sistema |
| Pastor | Liderança geral |
| Secretário | Administrativo |
| Tesoureiro | Gerenciamento financeiro |
| Líder | Coordenação de célula |
| Membro | Usuário comum |

---

**Documentação Completa** - Versão 1.0
