-- ==============================================================
-- IMPORTAÇÃO ENUVES - PARTE 1 de 5
-- ==============================================================

-- ==============================================================
-- SCRIPT DE IMPORTAÇÃO DE DADOS FINANCEIROS ENUVES
-- ==============================================================

BEGIN;

-- 1. PREPARAÇÃO DO BANCO (Adicionando colunas de rastreamento se não existirem)
ALTER TABLE public.contas_financeiras ADD COLUMN IF NOT EXISTS enuves_id BIGINT UNIQUE;
ALTER TABLE public.categorias_financeiras ADD COLUMN IF NOT EXISTS enuves_id BIGINT UNIQUE;
ALTER TABLE public.transacoes_financeiras ADD COLUMN IF NOT EXISTS enuves_id BIGINT UNIQUE;

-- 2. IMPORTAÇÃO DE CONTAS FINANCEIRAS
UPDATE public.contas_financeiras SET enuves_id = 8505 WHERE nome = 'Conta Enuves 8505' AND enuves_id IS NULL;
INSERT INTO public.contas_financeiras (nome, descricao, enuves_id) 
VALUES ('Conta Enuves 8505', 'Importada do Enuves', 8505) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome;
UPDATE public.contas_financeiras SET enuves_id = 8441 WHERE nome = 'Conta Enuves 8441' AND enuves_id IS NULL;
INSERT INTO public.contas_financeiras (nome, descricao, enuves_id) 
VALUES ('Conta Enuves 8441', 'Importada do Enuves', 8441) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome;
UPDATE public.contas_financeiras SET enuves_id = 8611 WHERE nome = 'Conta Enuves 8611' AND enuves_id IS NULL;
INSERT INTO public.contas_financeiras (nome, descricao, enuves_id) 
VALUES ('Conta Enuves 8611', 'Importada do Enuves', 8611) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome;
UPDATE public.contas_financeiras SET enuves_id = 8507 WHERE nome = 'Conta Enuves 8507' AND enuves_id IS NULL;
INSERT INTO public.contas_financeiras (nome, descricao, enuves_id) 
VALUES ('Conta Enuves 8507', 'Importada do Enuves', 8507) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome;
UPDATE public.contas_financeiras SET enuves_id = 8506 WHERE nome = 'Conta Enuves 8506' AND enuves_id IS NULL;
INSERT INTO public.contas_financeiras (nome, descricao, enuves_id) 
VALUES ('Conta Enuves 8506', 'Importada do Enuves', 8506) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome;
UPDATE public.contas_financeiras SET enuves_id = 0 WHERE nome = 'Conta Geral / Caixa' AND enuves_id IS NULL;
INSERT INTO public.contas_financeiras (nome, descricao, enuves_id) 
VALUES ('Conta Geral / Caixa', 'Importada do Enuves', 0) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome;

-- 3. IMPORTAÇÃO DE CATEGORIAS FINANCEIRAS
UPDATE public.categorias_financeiras SET enuves_id = 47045 WHERE nome = 'VPB (Verba Pastoral Básica)' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('VPB (Verba Pastoral Básica)', 'despesa', 'Importada do Enuves', 47045) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 47127 WHERE nome = 'Combustível Transporte Pessoal' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Combustível Transporte Pessoal', 'despesa', 'Importada do Enuves', 47127) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46849 WHERE nome = 'Tributos / Dízimo do Apóstolo' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Tributos / Dízimo do Apóstolo', 'despesa', 'Importada do Enuves', 46849) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46405 WHERE nome = 'Aluguel do Templo' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Aluguel do Templo', 'despesa', 'Importada do Enuves', 46405) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 47049 WHERE nome = 'Energia / Utilidades Templo e Pastoral' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Energia / Utilidades Templo e Pastoral', 'despesa', 'Importada do Enuves', 47049) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46387 WHERE nome = 'Oferta Designada / Semeadura' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Oferta Designada / Semeadura', 'receita', 'Importada do Enuves', 46387) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46410 WHERE nome = 'Combustível Carro Pastoral' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Combustível Carro Pastoral', 'despesa', 'Importada do Enuves', 46410) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46513 WHERE nome = 'Gratidão Diária' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Gratidão Diária', 'receita', 'Importada do Enuves', 46513) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46386 WHERE nome = 'Oferta de Gratidão' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Oferta de Gratidão', 'receita', 'Importada do Enuves', 46386) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46402 WHERE nome = 'Venda de Materiais (Apostilas/ELB)' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Venda de Materiais (Apostilas/ELB)', 'receita', 'Importada do Enuves', 46402) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 47560 WHERE nome = 'Primícias do Apóstolo' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Primícias do Apóstolo', 'receita', 'Importada do Enuves', 47560) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46667 WHERE nome = 'Oferta Beneficente / Diego' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Oferta Beneficente / Diego', 'receita', 'Importada do Enuves', 46667) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46389 WHERE nome = 'Oferta de Mantenedores' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Oferta de Mantenedores', 'receita', 'Importada do Enuves', 46389) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46388 WHERE nome = 'Oferta de Israel' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Oferta de Israel', 'receita', 'Importada do Enuves', 46388) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46385 WHERE nome = 'Oferta de Socorro (Povo)' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Oferta de Socorro (Povo)', 'receita', 'Importada do Enuves', 46385) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46384 WHERE nome = 'Dízimos' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Dízimos', 'receita', 'Importada do Enuves', 46384) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46383 WHERE nome = 'Primícias' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Primícias', 'receita', 'Importada do Enuves', 46383) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46947 WHERE nome = 'Alimentação / Consumo Geral' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Alimentação / Consumo Geral', 'despesa', 'Importada do Enuves', 46947) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 0 WHERE nome = 'Transferência / Diversos' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Transferência / Diversos', 'despesa', 'Importada do Enuves', 0) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46403 WHERE nome = 'Material de Limpeza' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Material de Limpeza', 'despesa', 'Importada do Enuves', 46403) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 47090 WHERE nome = 'Despesa Família Sacerdotal' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Despesa Família Sacerdotal', 'despesa', 'Importada do Enuves', 47090) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 56922 WHERE nome = 'Manutenção Carro Pastor / Reforma Púlpito' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Manutenção Carro Pastor / Reforma Púlpito', 'despesa', 'Importada do Enuves', 56922) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 49850 WHERE nome = 'Contribuição Especial / Klebson' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Contribuição Especial / Klebson', 'receita', 'Importada do Enuves', 49850) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 55699 WHERE nome = 'Categoria Geral' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Categoria Geral', 'despesa', 'Importada do Enuves', 55699) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46409 WHERE nome = 'Despesas de Viagem' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Despesas de Viagem', 'despesa', 'Importada do Enuves', 46409) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 65331 WHERE nome = 'Santa Ceia' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Santa Ceia', 'despesa', 'Importada do Enuves', 65331) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46408 WHERE nome = 'Equipamentos de Som / Multimídia' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Equipamentos de Som / Multimídia', 'despesa', 'Importada do Enuves', 46408) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46406 WHERE nome = 'Aluguel / Despesas Casa Pastoral' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Aluguel / Despesas Casa Pastoral', 'despesa', 'Importada do Enuves', 46406) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46404 WHERE nome = 'Material de Escritório' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Material de Escritório', 'despesa', 'Importada do Enuves', 46404) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;
UPDATE public.categorias_financeiras SET enuves_id = 46407 WHERE nome = 'Material de Construção / Manutenção Templo' AND enuves_id IS NULL;
INSERT INTO public.categorias_financeiras (nome, tipo, descricao, enuves_id) 
VALUES ('Material de Construção / Manutenção Templo', 'despesa', 'Importada do Enuves', 46407) 
ON CONFLICT (enuves_id) DO UPDATE SET nome = EXCLUDED.nome, tipo = EXCLUDED.tipo;

-- 4. IMPORTAÇÃO DE TRANSAÇÕES FINANCEIRAS
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-07-05',
  'despesa',
  'VPB',
  149.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-07',
  1289845
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-05',
  'despesa',
  'Desp. combustível transp. de pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  927489
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-06',
  'despesa',
  'Desp. combustível Pr. Jadson (célula Klebson)',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  927499
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-06',
  'despesa',
  'VPB (Verba Pastoral Básica)',
  156.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-09',
  1287655
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-09',
  'despesa',
  'Desp. combustível transp. de pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  927481
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-10',
  'despesa',
  'TRIBUTOS PARA APÓSTOLO',
  432.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  1287657
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-10',
  'despesa',
  'Aluguel do templo ref. setembro/2021',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  927518
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-12',
  'despesa',
  'Desp. combustível transp. de pessoal',
  20.02,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  927508
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-16',
  'despesa',
  'Desp. combustível transp. de pessoal',
  20.06,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  927505
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-19',
  'despesa',
  'Desp. combustível transp. de pessoal',
  20.02,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  927509
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-20',
  'despesa',
  'Desp. combustível Pr. Jadson',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  927503
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-20',
  'despesa',
  'Energia casa pastoral ref. agosto/2021',
  152.31,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  927515
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-20',
  'despesa',
  'Energia templo ref. julho/2021',
  81.03,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  927512
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-21',
  'despesa',
  'Desp. combustível Pr. Jadson',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  927494
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-23',
  'receita',
  'Oferta designada',
  300.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_270056',
  '2021-09',
  886985
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-26',
  'despesa',
  'Desp. combustível transp. de pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  927504
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-26',
  'despesa',
  'Combustível para transportar pessoal para o culto.',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  864537
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-30',
  'receita',
  'Gratidão  diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: Klebson Alves da Silva',
  '2021-09',
  865631
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-09-30',
  'receita',
  'Oferta de Gratidão',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-09',
  865629
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-01',
  'despesa',
  'Desp. combustível Pr. Jadson',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  934124
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-01',
  'receita',
  'Auxílio Emergencial',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2021-10',
  882014
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'despesa',
  'Primícias do Apóstolo',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47560),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  874875
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'despesa',
  'Israel',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  874927
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'despesa',
  'Semeadura',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  874911
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'despesa',
  'Gratidão',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  874909
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'despesa',
  'Oferta de Socorro',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  874905
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'despesa',
  'Dízimo do Apóstolo',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  874898
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'despesa',
  'Diego',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46667),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269466',
  '2021-10',
  870611
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'receita',
  'Apostilas da ELB',
  220.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2021-10',
  882019
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'receita',
  'Oferta de Mantenedores',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-10',
  869479
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'receita',
  'Oferta de Israel',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-10',
  869485
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'receita',
  'Semeadura',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  869478
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'receita',
  'Oferta de Gratidão',
  110.25,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  869477
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'receita',
  'Socorro do Povo',
  38.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-10',
  869483
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'receita',
  'Ailton de Morais Araujo',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2021-10',
  869465
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'receita',
  'Edilania Simão da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269715',
  '2021-10',
  869460
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'receita',
  'Klebson Alves da Silva',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-10',
  869458
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'receita',
  'Alexsandro Ferreira',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2021-10',
  869451
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-10',
  874812
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-03',
  'receita',
  'Ailton de Morais Araújo',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2021-10',
  874809
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-04',
  'despesa',
  'Energia do templo ref. agosto/2021',
  46.34,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  882633
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'despesa',
  'Primícia do Apóstolo',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47560),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  877510
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'despesa',
  'Desp. combustível transp. de pessoal',
  30.09,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  927536
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'despesa',
  'Combustível Transporte Pessoal',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  882636
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'despesa',
  'Israel',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  877516
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'despesa',
  'semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  877515
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'despesa',
  'gratidão',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  877513
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'despesa',
  'oferta de socorro.',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  877512
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'despesa',
  'Copo descartável',
  4.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46947),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  927534
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'despesa',
  'copo descartável',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46947),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  877527
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'despesa',
  'Dízimo do Apóstolo',
  101.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  877511
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'despesa',
  'Oferta Beneficente / Diego',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46667),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269466',
  '2021-10',
  877524
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-10',
  877479
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'receita',
  'Oferta de Mantenedores',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-10',
  877500
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'receita',
  'Oferta de Israel',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-10',
  877502
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'receita',
  'Oferta Designada / Semeadura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  877499
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'receita',
  'Oferta de Gratidão',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  877498
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'receita',
  'socorro do povo',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-10',
  877501
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'receita',
  'Arielly Airys da Silva Fideles',
  500.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Valor referente a férias. | Membro/Contato: DISC_269731',
  '2021-10',
  877497
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'receita',
  'Antônio Pereira Fidelis',
  125.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: Antônio Pereira Fidelis',
  '2021-10',
  877496
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'receita',
  'Dízimos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_268021',
  '2021-10',
  877495
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'receita',
  'Dízimos',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2021-10',
  877493
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'receita',
  'Maria José Ferreira de Araújo Silva',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: Maria José Ferreira de Araújo Silva',
  '2021-10',
  877491
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'receita',
  'Primícias',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2021-10',
  877481
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-07',
  'receita',
  'Maria José Ferreira de Araújo Silva',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: Maria José Ferreira de Araújo Silva',
  '2021-10',
  877478
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-09',
  'despesa',
  'Desp. combustível Pr. Jadson',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  927530
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-09',
  'despesa',
  'Gasolina',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: Auto Posto Emanuelly',
  '2021-10',
  882634
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-10',
  'despesa',
  'Primícias do Apóstolo',
  48.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47560),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  882024
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-10',
  'despesa',
  'Desp. combustível transp. de pessoal',
  20.48,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  927523
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-10',
  'despesa',
  'Israel',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  882035
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-10',
  'despesa',
  'semeadura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  882033
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-10',
  'despesa',
  'gratidão',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  882031
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-10',
  'despesa',
  'oferta de socorro',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  882028
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-10',
  'despesa',
  'Dízimo do Apóstolo',
  138.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  882026
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-10',
  'receita',
  'Oferta de Mantenedores',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269715',
  '2021-10',
  882008
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-10',
  'receita',
  'Gratidão',
  123.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  882000
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-10',
  'receita',
  'Dízimos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2021-10',
  882004
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-10',
  'receita',
  'Janio da Silva Viana',
  155.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  882002
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-10',
  'receita',
  'Joede da Silva Viana',
  642.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2021-10',
  881998
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-11',
  'despesa',
  'Socorro do povo',
  65.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 0),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-10',
  880194
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-12',
  'despesa',
  'Aluguel do Templo - out/2021',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  882059
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-14',
  'despesa',
  'Desp. combustível transp. de pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  927525
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-14',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-10',
  886241
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-14',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-10',
  886245
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-14',
  'receita',
  'Oferta de Israel',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-10',
  886248
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-14',
  'receita',
  'Oferta Designada / Semeadura',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  886244
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-14',
  'receita',
  'Oferta de Gratidão',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  886242
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-14',
  'receita',
  'Oferta de Socorro (Povo)',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-10',
  886246
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-14',
  'receita',
  'Dízimos',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-10',
  886240
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-14',
  'receita',
  'Primícias',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-10',
  886239
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-17',
  'despesa',
  'Desp. combustível transp. de pessoal',
  20.02,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  927524
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-17',
  'receita',
  '2 apostilas da ELB',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2021-10',
  886981
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-17',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-10',
  888800
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-17',
  'receita',
  'Oferta de Israel',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-10',
  888804
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-17',
  'receita',
  'Oferta Designada / Semeadura',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  888795
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-17',
  'receita',
  'Oferta de Gratidão',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  888793
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-17',
  'receita',
  'Oferta de Socorro (Povo)',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-10',
  888802
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-17',
  'receita',
  'Dízimos',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-10',
  888791
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-17',
  'receita',
  'Primícias',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-10',
  888790
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-18',
  'despesa',
  'Desp. combustível Pr. Jadson (Maceió)',
  113.81,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  927522
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-18',
  'despesa',
  'VPB (Verba Pastoral Básica)',
  49.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: Profeta',
  '2021-10',
  888805
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-18',
  'despesa',
  'Material de Limpeza',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  1287658
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-21',
  'despesa',
  'Primícias do Apóstolo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47560),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  892836
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-21',
  'despesa',
  'Desp. combustível Pr. Jadson',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  927521
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-21',
  'despesa',
  'Desp. combustível transp. de pessoal',
  30.01,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  927520
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-21',
  'despesa',
  'Oferta de Israel',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  892842
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-21',
  'despesa',
  'semeadura',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  892841
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-21',
  'despesa',
  'gratidão',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  892840
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-21',
  'despesa',
  'oferta de socorro',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  892839
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-21',
  'despesa',
  'Tributos / Dízimo do Apóstolo',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  892837
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-21',
  'despesa',
  'Oferta Beneficente / Diego',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46667),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  892843
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-21',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-10',
  892835
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-21',
  'receita',
  'Oferta de Gratidão',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  892834
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-22',
  'despesa',
  '5ª Parcela da Divisória do Templo',
  132.84,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  897165
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-22',
  'despesa',
  'Despesa Família Sacerdotal',
  690.16,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  882057
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'despesa',
  'Primícias do Apóstolo',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47560),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  896720
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'despesa',
  'Desp. combustível transp. de pessoal',
  20.04,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  927519
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'despesa',
  'socorro do Povo',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-10',
  896729
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'despesa',
  'Oferta de Israel',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  896728
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'despesa',
  'Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  896727
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'despesa',
  'Oferta de Gratidão',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  896724
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'despesa',
  'Oferta de Socorro',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  896722
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'despesa',
  'Dízimo do Apóstolo',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  896721
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-10',
  896715
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'receita',
  'Oferta de Israel',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-10',
  896718
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'receita',
  'Oferta Designada / Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  896714
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'receita',
  'Oferta de Gratidão',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  896713
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'receita',
  'Oferta de Socorro (Povo)',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-10',
  896716
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'receita',
  'Dízimos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2021-10',
  896712
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'receita',
  'Dízimos',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-10',
  896711
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'receita',
  'Maria Cícera de Morais Araujo',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: Maria Cícera de Morais Araujo',
  '2021-10',
  896707
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-24',
  'receita',
  'Primícias',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-10',
  896709
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-28',
  'despesa',
  'Primícias',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47560),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  899464
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-28',
  'despesa',
  'Desp. combustível transp. de pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  934123
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-28',
  'despesa',
  'Israel',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-10',
  899472
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-28',
  'despesa',
  'semeadura',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  899471
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-28',
  'despesa',
  'gratidão',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  899469
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-28',
  'despesa',
  'oferta de socorro',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 0),
  NULL,
  '2021-10',
  899467
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-28',
  'despesa',
  'Tributos / Dízimo do Apóstolo',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  899465
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-28',
  'despesa',
  'Oferta Beneficente / Diego',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46667),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  899473
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-28',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-10',
  899462
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-28',
  'receita',
  'Oferta de Gratidão',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  899463
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-28',
  'receita',
  'Equipe Conectados',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  899461
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-31',
  'despesa',
  '2 Inscrições para o Congresso 2021',
  110.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  1082133
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-10-31',
  'despesa',
  'Desp. combustível transp. de pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-10',
  927527
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-01',
  'receita',
  'Aux. Emergencial',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2021-11',
  921207
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-04',
  'despesa',
  'Desp. combustível transp. de pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  927537
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-04',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-11',
  928795
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-04',
  'receita',
  'Oferta de Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-11',
  928801
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-04',
  'receita',
  'Oferta de Israel',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-11',
  928804
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-04',
  'receita',
  'Oferta de Gratidão',
  57.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  928800
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-04',
  'receita',
  'Oferta de Socorro (Povo)',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-11',
  928803
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-04',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2021-11',
  928798
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-04',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269715',
  '2021-11',
  928794
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-04',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2021-11',
  928796
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-05',
  'despesa',
  'Desp. combustível Pr. Jadson',
  20.02,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  927538
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-06',
  'receita',
  'Manutenção de impressora',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2021-11',
  921213
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-07',
  'receita',
  'Oferta de Mantenedores',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-11',
  928857
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-07',
  'receita',
  'Oferta de Israel',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-11',
  928859
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-07',
  'receita',
  'Oferta de Gratidão',
  168.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  928856
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-07',
  'receita',
  'Oferta de Socorro (Povo)',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-11',
  928858
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-07',
  'receita',
  'Dízimos',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-11',
  928815
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-07',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2021-11',
  928811
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-07',
  'receita',
  'Dízimos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_268021',
  '2021-11',
  928808
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-07',
  'receita',
  'Dízimos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2021-11',
  928806
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-07',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2021-11',
  928805
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-07',
  'receita',
  'Primícias',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-11',
  928813
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-07',
  'receita',
  'Maria José Ferreira de Araújo Silva',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2021-11',
  928809
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-08',
  'despesa',
  'Energia set/2021 - casa pastoral',
  172.93,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  882075
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-10',
  'despesa',
  'Aluguel do templo nov/2021',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  914787
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-10',
  'despesa',
  'Produtos de limpeza',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  '2 vassouras;
2 desinfetantes',
  '2021-11',
  934121
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-11',
  'despesa',
  'Desp. combustível transp. de pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  927539
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-11',
  'receita',
  'Oferta de Gratidão',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  921387
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-12',
  'receita',
  'Manutenção notebook',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2021-11',
  921216
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-14',
  'despesa',
  'Oferta beneficente',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46667),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269466',
  '2021-11',
  927542
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-14',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-11',
  928869
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-14',
  'receita',
  'Oferta de Israel',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-11',
  928871
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-14',
  'receita',
  'Oferta Designada / Semeadura',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  928868
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-14',
  'receita',
  'Oferta de Gratidão',
  155.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  928866
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-14',
  'receita',
  'Oferta de Socorro (Povo)',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-11',
  928870
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-14',
  'receita',
  'Dízimos',
  650.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2021-11',
  928865
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-14',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2021-11',
  928864
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-14',
  'receita',
  'Dízimos',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2021-11',
  928863
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-14',
  'receita',
  'Dízimos',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-11',
  928861
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-14',
  'receita',
  'Primícias',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2021-11',
  928862
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-14',
  'receita',
  'Primícias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-11',
  928860
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-16',
  'despesa',
  'Energia ref.ao mês de setembro (TEMPLO)',
  74.9,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  939960
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-17',
  'despesa',
  'Desp. combustível Pr. Jadson',
  30.01,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  927829
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-18',
  'despesa',
  'Desp. Combustível p/ congresso MIB',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  929917
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-19',
  'despesa',
  'Desp. Combustível p/ congresso MIB',
  50.05,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  930313
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-19',
  'despesa',
  'Desp. Combustível p/ congresso MIB',
  30.04,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  929916
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-20',
  'despesa',
  'despesas de combustível para congresso',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  930501
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  485.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  1082115
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'despesa',
  'Primícias do Apóstolo',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47560),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  931802
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'despesa',
  'Desp. combustível p/ congresso MIB',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  934119
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'despesa',
  'Despesas família sacerdotal',
  425.71,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  914783
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'despesa',
  'Produtos de limpeza e consumo para o templo',
  33.84,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  914774
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'despesa',
  '6° parcela da divisória do templo',
  132.84,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  914749
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'despesa',
  'Israel',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  931821
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'despesa',
  'semeadura',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  931820
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'despesa',
  'gratidão',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  931815
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'despesa',
  'socorro',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  931812
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'despesa',
  'Tributos / Dízimo do Apóstolo',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  931803
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-11',
  931791
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-11',
  931799
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'receita',
  'Oferta de Israel',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-11',
  931797
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'receita',
  'Oferta Designada / Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  931795
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'receita',
  'Oferta de Gratidão',
  48.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  931794
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'receita',
  'Oferta de Socorro (Povo)',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-11',
  931788
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'receita',
  'Dízimos',
  43.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-11',
  931787
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-21',
  'receita',
  'Primícias',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-11',
  931786
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-24',
  'despesa',
  'Desp. combustível Pr. Jadson',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  935650
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-25',
  'despesa',
  'Desp. combustível Pr. Jadson (mudança residência)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  935877
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-25',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-11',
  937312
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-27',
  'receita',
  'Oferta de Gratidão',
  94.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  937311
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-28',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-11',
  940232
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-28',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-11',
  940260
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-28',
  'receita',
  'Oferta de Israel',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-11',
  940263
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-28',
  'receita',
  'Oferta Designada / Semeadura',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  940257
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-28',
  'receita',
  'Oferta de Gratidão',
  177.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  940224
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-28',
  'receita',
  'Oferta de Socorro (Povo)',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-11',
  940262
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-28',
  'receita',
  'Dízimos',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-11',
  940213
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-28',
  'receita',
  'Dízimos',
  43.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269010',
  '2021-11',
  940211
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-28',
  'receita',
  'Primícias',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-11',
  940209
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-28',
  'receita',
  'Primícias',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269010',
  '2021-11',
  940206
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-29',
  'despesa',
  'Desp. Combustível p/ mudança Pr. Jadson',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  948639
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-30',
  'despesa',
  'combustível carro pastoral.',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  951932
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-30',
  'despesa',
  'Energia do templo - out/2021',
  80.03,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  886604
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-11-30',
  'despesa',
  'Energia - casa pastoral - out/2021',
  164.62,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-11',
  884576
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-02',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-12',
  951788
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-02',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-12',
  951791
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-02',
  'receita',
  'Oferta de Gratidão',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  951796
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-02',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269715',
  '2021-12',
  951789
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'despesa',
  'Primícia apóstolo',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47560),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  952336
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'despesa',
  'VPB (Verba Pastoral Básica)',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-12',
  952338
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'despesa',
  'Apóstolo',
  86.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  952337
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'receita',
  'Oferta de Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-12',
  952330
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'receita',
  'Oferta de Israel',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-12',
  952331
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'receita',
  'Oferta Designada / Semeadura',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  952328
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'receita',
  'Oferta de Gratidão',
  126.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  952327
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'receita',
  'Gratidão pela vida de Noemi',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2021-12',
  952296
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'receita',
  'Dízimos',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-12',
  952312
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2021-12',
  952310
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'receita',
  'Dízimos',
  87.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2021-12',
  952308
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'receita',
  'Dízimos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2021-12',
  952305
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'receita',
  'Primícias',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-12',
  952324
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2021-12',
  952323
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-05',
  'receita',
  'Primícias',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2021-12',
  952319
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'despesa',
  'Primícia para Ap. Moisés',
  42.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47560),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972048
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'despesa',
  'Socorro Povo',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-12',
  972072
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'despesa',
  'Oferta para Israel',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972068
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'despesa',
  'Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972063
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'despesa',
  'Oferta de Gratidão',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972061
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'despesa',
  'Oferta de Socorro',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972056
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'despesa',
  'Dízimo p/ Ap. Moisés',
  121.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972054
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-12',
  964999
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'receita',
  'Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-12',
  965041
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'receita',
  'Oferta de Israel',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-12',
  965047
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'receita',
  'Semeadura',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  965028
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'receita',
  'Oferta de Gratidão',
  140.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  965026
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'receita',
  'Oferta de Socorro (povo)',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-12',
  965045
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'receita',
  'Dízimo',
  108.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269010',
  '2021-12',
  965018
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'receita',
  'Dízimo',
  56.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269010',
  '2021-12',
  965015
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'receita',
  'Dízimo',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2021-12',
  965009
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'receita',
  'Dízimo',
  730.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2021-12',
  965001
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'receita',
  'Primícias',
  38.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269010',
  '2021-12',
  965016
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'receita',
  'Primícias',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269010',
  '2021-12',
  965013
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-09',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2021-12',
  965008
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-10',
  'despesa',
  'Combustível Transporte Pessoal',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1287577
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-10',
  'despesa',
  'Desp. Combustível p/ mudança Pr. Jadson',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  961141
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'despesa',
  'Primícia p/ Apóstolo  Moisés.',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47560),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972075
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'despesa',
  'Combustível Transporte Pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1287583
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'despesa',
  'Socorro Povo',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-12',
  972086
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'despesa',
  'Oferta para Israel',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972085
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'despesa',
  'Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972084
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'despesa',
  'Gratidão',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972082
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'despesa',
  'Oferta de Socorro',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972080
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'despesa',
  'Dízimo p/ Apóstolo Moisés.',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972078
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1287574
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'receita',
  'Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-12',
  964965
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'receita',
  'Oferta de Israel',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-12',
  964969
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'receita',
  'Semeadura',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  964963
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'receita',
  'Oferta de Gratidão',
  137.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  964961
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'receita',
  'Oferta de Socorro (povo)',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-12',
  964967
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'receita',
  'Dízimo',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2021-12',
  964957
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'receita',
  'Dízimo',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_268021',
  '2021-12',
  964955
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'receita',
  'Dízimo',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2021-12',
  964947
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'receita',
  'Dízimo',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-12',
  964945
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'receita',
  'Primícias',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2021-12',
  964946
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-12',
  'receita',
  'Primicias',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-12',
  964944
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'despesa',
  'Prímicia p/ Ap. Moisés',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47560),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972090
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'despesa',
  'Combustível Transporte Pessoal',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1287584
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'despesa',
  'Combustível Transporte Pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1287581
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'despesa',
  'Socorro Povo',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-12',
  972111
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'despesa',
  'Oferta p/ Israel',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972109
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'despesa',
  'Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972106
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'despesa',
  'Gratidão',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972105
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'despesa',
  'Oferta de Socorro',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972102
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'despesa',
  'Dízimo p/ Ap. Moisés',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972100
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'despesa',
  'Oferta Beneficente / Diego',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46667),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1287578
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-12',
  972029
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'receita',
  'Manutenção de impressora',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2021-12',
  1000172
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2021-12',
  972035
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'receita',
  'Oferta de Israel',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-12',
  972038
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'receita',
  'Oferta Designada / Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972034
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'receita',
  'Oferta de Gratidão',
  179.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972031
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'receita',
  'Oferta de Socorro (Povo)',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-12',
  972036
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'receita',
  'Dízimos',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269283',
  '2021-12',
  972028
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'receita',
  'Dízimos',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-12',
  972025
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'receita',
  'Primícias',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269283',
  '2021-12',
  972026
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-16',
  'receita',
  'Primícias',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2021-12',
  972024
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-17',
  'despesa',
  'Combustível Transporte Pessoal',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1287587
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-17',
  'despesa',
  'Combustível Transporte Pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1287585
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-19',
  'despesa',
  'Primícia Apóstolo',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47560),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1000169
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-19',
  'despesa',
  'Israel Povo',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-12',
  1000183
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-19',
  'despesa',
  'Socorro do Povo',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-12',
  1000179
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-19',
  'despesa',
  'Israel',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1000177
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-19',
  'despesa',
  'Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1000176
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-19',
  'despesa',
  'Gratidão',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1000174
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-19',
  'despesa',
  'Socorro',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1000173
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-19',
  'despesa',
  'Dízimo para Apóstolo',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1000171
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-19',
  'receita',
  'Oferta de Israel',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2021-12',
  972274
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-19',
  'receita',
  'Oferta Designada / Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972268
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-19',
  'receita',
  'Oferta de Gratidão',
  106.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  972266
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-19',
  'receita',
  'Oferta de Socorro (Povo)',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2021-12',
  972272
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-19',
  'receita',
  'Dízimos',
  165.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2021-12',
  972265
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-19',
  'receita',
  'Primícias',
  57.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2021-12',
  972262
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  611.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1082110
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-26',
  'despesa',
  'Combustível Transporte Pessoal',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1287580
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-30',
  'despesa',
  'Combustível Transporte Pessoal',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1287588
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2021-12-31',
  'despesa',
  'TRIBUTOS PARA APÓSTOLO MOISÉS.',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2021-12',
  1287572
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-03',
  'despesa',
  'Combustível Transporte Pessoal',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287568
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-03',
  'despesa',
  'DESP. DE VIAJEM',
  152.7,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287562
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-03',
  'despesa',
  'Combustível Transporte Pessoal',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287561
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-03',
  'despesa',
  'VPB',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287563
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-04',
  'despesa',
  'Combustível Transporte Pessoal',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287560
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-05',
  'despesa',
  'ENERGIA DO TEMPLO REF. DEZEMBRO.',
  86.63,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287557
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-06',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-01',
  1078653
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-06',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-01',
  1078659
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-06',
  'receita',
  'Oferta de Israel',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-01',
  1078662
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-06',
  'receita',
  'Oferta de Gratidão',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1078658
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-06',
  'receita',
  'Oferta de Socorro (Povo)',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-01',
  1078661
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-06',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-01',
  1078655
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-06',
  'receita',
  'Dízimos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2022-01',
  1078654
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-06',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-01',
  1078657
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-08',
  'despesa',
  'TRIBUTOS Ap. MOISÉS',
  701.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1289839
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-09',
  'despesa',
  'OFERTA PARA DIEGO',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46667),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1289862
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-09',
  'receita',
  'Oferta de Mantenedores',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-01',
  1078910
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-09',
  'receita',
  'Oferta de Israel',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-01',
  1078913
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-09',
  'receita',
  'Oferta Designada / Semeadura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1078909
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-09',
  'receita',
  'Oferta de Gratidão',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1078908
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-09',
  'receita',
  'Oferta de Socorro (Povo)',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-01',
  1078911
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-09',
  'receita',
  'Dízimos',
  43.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-01',
  1078907
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-09',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2022-01',
  1078900
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-09',
  'receita',
  'Maria Cicera Morais',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2022-01',
  1078891
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-09',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2022-01',
  1078885
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-09',
  'receita',
  'Primícias',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-01',
  1078906
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-09',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2022-01',
  1078663
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-10',
  'despesa',
  'VPB',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-01',
  1379593
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-10',
  'despesa',
  'VPB',
  110.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287545
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-10',
  'despesa',
  'ALUGUEL DO TEMPLO',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287558
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-13',
  'receita',
  'Oferta de Gratidão',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1015020
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-13',
  'receita',
  'Dízimos',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269725',
  '2022-01',
  1015017
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-13',
  'receita',
  'Joede da Silva Viana',
  900.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2022-01',
  1015014
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-16',
  'despesa',
  'Combustível Transporte Pessoal',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287559
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-16',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-01',
  1078931
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-16',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-01',
  1078934
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-16',
  'receita',
  'Oferta de Israel',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-01',
  1078937
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-16',
  'receita',
  'Oferta de Gratidão',
  83.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1078933
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-16',
  'receita',
  'Oferta de Socorro (Povo)',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-01',
  1078936
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-16',
  'receita',
  'Dízimos',
  86.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-01',
  1078929
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-16',
  'receita',
  'Dízimos',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-01',
  1078925
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-16',
  'receita',
  'Dízimos',
  420.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-01',
  1078919
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-16',
  'receita',
  'Dízimos',
  110.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_62171',
  '2022-01',
  1078916
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-16',
  'receita',
  'Primícias',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-01',
  1078927
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-16',
  'receita',
  'Primícias',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-01',
  1078922
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-17',
  'despesa',
  'ENERGIA TEMPLO',
  78.12,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287551
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-17',
  'despesa',
  'ENERGIA  CASA PASTORAL',
  42.13,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287549
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-17',
  'despesa',
  'VPB',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-01',
  1379596
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-18',
  'despesa',
  'VPB',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287565
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-20',
  'despesa',
  'Combustível Transporte Pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287567
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  650.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1080824
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-20',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-01',
  1078941
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-20',
  'receita',
  'Oferta de Israel',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-01',
  1078950
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-20',
  'receita',
  'Oferta de Gratidão',
  121.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1078942
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-20',
  'receita',
  'Dízimos',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269283',
  '2022-01',
  1078940
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-20',
  'receita',
  'Primícias',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269283',
  '2022-01',
  1078938
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-23',
  'despesa',
  'Combustível Transporte Pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287569
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-23',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-01',
  1079070
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-23',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1078945
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-23',
  'receita',
  'Oferta de Israel',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-01',
  1079349
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-23',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1079073
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-23',
  'receita',
  'Oferta de Gratidão',
  54.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1079077
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-23',
  'receita',
  'Oferta de Socorro (Povo)',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-01',
  1078947
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-23',
  'receita',
  'Dízimos',
  91.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-01',
  1079068
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-23',
  'receita',
  'Primícias',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: Klebson',
  '2022-01',
  1079066
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-24',
  'despesa',
  'VPB',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-01',
  1379597
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-26',
  'despesa',
  'TRIBUTOS PARA VPB',
  64.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287544
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-27',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-01',
  1079352
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-27',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-01',
  1079359
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-27',
  'receita',
  'Oferta de Israel',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-01',
  1079361
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-27',
  'receita',
  'Oferta Designada / Semeadura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1079358
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-27',
  'receita',
  'Oferta de Gratidão',
  26.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1079357
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-27',
  'receita',
  'Oferta de Socorro (Povo)',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-01',
  1079360
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-27',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-01',
  1079356
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-27',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-01',
  1079353
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-27',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-01',
  1079355
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-29',
  'despesa',
  'Combustível Transporte Pessoal',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287554
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-30',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-01',
  1079370
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-30',
  'receita',
  'Oferta de Israel',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-01',
  1079372
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-30',
  'receita',
  'Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1079369
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-30',
  'receita',
  'Oferta de Gratidão',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1079368
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-30',
  'receita',
  'Oferta de Socorro',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-01',
  1079371
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-30',
  'receita',
  'Klebson  Alves da Silva',
  42.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-01',
  1079367
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-30',
  'receita',
  'Jose Cicero  Ferreira',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2022-01',
  1079364
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-30',
  'receita',
  'Klebson  Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-01',
  1079366
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-31',
  'despesa',
  'VPB',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-01',
  1379600
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-01-31',
  'despesa',
  'Tributos / Dízimo do Apóstolo',
  552.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-01',
  1287552
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-03',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-02',
  1125412
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-03',
  'receita',
  'Oferta de Israel',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-02',
  1125427
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-03',
  'receita',
  'Oferta de Israel',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-02',
  1125424
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-03',
  'receita',
  'Oferta Designada / Semeadura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1125423
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-03',
  'receita',
  'Oferta de Gratidão',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1125421
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-03',
  'receita',
  'Oferta de Socorro (Povo)',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-02',
  1125425
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-03',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2022-02',
  1125418
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-03',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-02',
  1125417
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-03',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_62171',
  '2022-02',
  1125414
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-03',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-02',
  1125415
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'despesa',
  'Combustível Transporte Pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1287606
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-02',
  1125403
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Oferta de Israel',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-02',
  1125406
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Oferta Designada / Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1125401
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Oferta de Gratidão',
  162.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1125398
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Oferta de Socorro (Povo)',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-02',
  1125404
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Dízimos',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2022-02',
  1098483
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Dízimos',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269715',
  '2022-02',
  1098481
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Dízimos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_268021',
  '2022-02',
  1098477
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Dízimos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2022-02',
  1098476
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2022-02',
  1098472
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Dízimos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-02',
  1098470
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Dízimos',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-02',
  1098468
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Dízimos',
  116.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-02',
  1098465
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Primícias',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-02',
  1098469
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Primícias',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-02',
  1098466
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-06',
  'receita',
  'Primícias',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-02',
  1098464
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-08',
  'despesa',
  'Combustível Transporte Pessoal',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1287608
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-10',
  'despesa',
  '1° parcela - Reforma do Púlpito',
  300.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1117713
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-10',
  'despesa',
  'Combustível Transporte Pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1287605
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-10',
  'despesa',
  'OFERTA PRA DIEGO',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46667),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1289864
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1287617
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-10',
  'receita',
  'Categoria Geral',
  153.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 55699),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Resíduo de tributos do Apóstolo Moisés.',
  '2022-02',
  1062043
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-10',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-02',
  1125439
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-10',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2022-02',
  1125434
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-10',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2022-02',
  1125433
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-12',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1287590
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-14',
  'despesa',
  'DO TEMPLO REF. JANEIRO',
  106.72,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1287589
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-14',
  'despesa',
  'VPB',
  71.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-02',
  1287613
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-17',
  'despesa',
  'ENERGIA DA IGREJA',
  92.36,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1287673
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-17',
  'despesa',
  'ENERGIA CASA PASTORAL REF. JANEIRO',
  59.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1287600
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-19',
  'despesa',
  'Combustível Transporte Pessoal',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1287603
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-19',
  'despesa',
  'Combustível Transporte Pessoal',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1287601
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-20',
  'despesa',
  'Interface de Áudio - 1ª parcela',
  66.89,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1080803
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-20',
  'despesa',
  'Pedal sustain p/ teclado - 1ª parcela',
  61.09,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1080795
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  650.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1080789
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-21',
  'despesa',
  'VPB',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-02',
  1287591
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-23',
  'receita',
  'Escola de Inglês',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-02',
  1081992
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-24',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-02',
  1084870
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-24',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1084874
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-24',
  'receita',
  'Oferta de Israel',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-02',
  1084871
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-24',
  'receita',
  'Oferta de Gratidão',
  74.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1084872
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-26',
  'despesa',
  'Combustível Transporte Pessoal',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1287593
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-28',
  'despesa',
  'Combustível Transporte Pessoal',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1287598
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-02-28',
  'despesa',
  'Combustível Transporte Pessoal',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-02',
  1287595
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-02',
  'despesa',
  'Combustível Carro Pastoral',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1287685
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-03',
  'despesa',
  'VPB (Verba Pastoral Básica)',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1414726
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-03',
  'despesa',
  'VPB',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-03',
  1287714
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-03',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-03',
  1125309
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-03',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-03',
  1125316
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-03',
  'receita',
  'Oferta de Israel',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-03',
  1125318
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-03',
  'receita',
  'Oferta Designada / Semeadura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1125315
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-03',
  'receita',
  'Oferta de Gratidão',
  117.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1125313
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-03',
  'receita',
  'Oferta de Socorro (Povo)',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-03',
  1125317
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-03',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-03',
  1125311
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-03',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-03',
  1125310
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-04',
  'despesa',
  'TRIB. Ap. MOISÉS',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1287684
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Apostila módulo 2',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_270051',
  '2022-03',
  1113350
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Apostila módulo 2',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_270053',
  '2022-03',
  1113349
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Apostila módulo 2',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_269579',
  '2022-03',
  1113347
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Oferta de Mantenedores',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-03',
  1125352
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Oferta de Israel',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-03',
  1125356
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Oferta Designada / Semeadura',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1125348
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Oferta de Gratidão',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1125346
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Oferta de Socorro (Povo)',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-03',
  1125353
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_62171',
  '2022-03',
  1125344
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Dízimos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_268021',
  '2022-03',
  1125341
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269715',
  '2022-03',
  1125337
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2022-03',
  1125335
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'JANIO DA SILVA VIANA',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1125334
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Dízimos',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-03',
  1125330
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Dízimos',
  86.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-03',
  1125325
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Dízimos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2022-03',
  1125321
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Primícias',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-03',
  1125329
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Primícias',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-03',
  1125323
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-06',
  'receita',
  'Primícias',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2022-03',
  1125320
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-08',
  'despesa',
  'Combustível Transporte Pessoal',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1287699
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'despesa',
  'OFERTA PARA DIEGO',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46667),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1289865
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1287698
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'despesa',
  'Aluguel do templo ref. março/2022',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1119458
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-03',
  1125268
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-03',
  1125451
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'receita',
  'Oferta de Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-03',
  1125278
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'receita',
  'Oferta de Israel',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-03',
  1125454
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'receita',
  'Oferta de Israel',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-03',
  1125284
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1125449
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1125286
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'receita',
  'Oferta de Gratidão',
  9.7,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1125448
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'receita',
  'Oferta de Gratidão',
  38.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1125277
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'receita',
  'Oferta de Jeane e Daniel',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1125267
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'receita',
  'Oferta de Socorro (Povo)',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-03',
  1125452
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'receita',
  'Oferta de Socorro (Povo)',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-03',
  1125279
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2022-03',
  1125273
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-10',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2022-03',
  1125272
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-12',
  'despesa',
  'CONSERTO CARRO PASTORAL.',
  458.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1287697
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'despesa',
  'Combustível Transporte Pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1287701
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'receita',
  'Apostila módulo 2',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_268021',
  '2022-03',
  1113352
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-03',
  1125304
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'receita',
  'Oferta de Israel',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-03',
  1125308
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'receita',
  'Oferta Designada / Semeadura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1125301
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'receita',
  'Oferta de Gratidão',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1125303
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'receita',
  'Oferta de Socorro (Povo)',
  26.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-03',
  1125305
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'receita',
  'Dízimos',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-03',
  1125299
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-03',
  1125297
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2022-03',
  1125294
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2022-03',
  1125293
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'receita',
  'Joede S. Viana',
  480.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1125292
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'receita',
  'Dízimo (TRIBUTANTE DESCONHECIDO)',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1125290
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'receita',
  'Primícias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-03',
  1125298
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-13',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-03',
  1125296
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-14',
  'despesa',
  'VPB',
  205.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-03',
  1289848
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-14',
  'receita',
  'Manutenção de notebook',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-03',
  1117703
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-15',
  'despesa',
  '2° parcela - Reforma do Púlpito',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1117714
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-15',
  'despesa',
  'Interface de Áudio - 2ª parcela',
  66.89,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1117720
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-15',
  'despesa',
  'Desp. básicas família sacerdotal',
  550.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1117719
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-15',
  'despesa',
  'Pedal sustain p/ teclado - 2ª parcela',
  61.09,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1080800
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-16',
  'despesa',
  'Manutenção do carro do pastor',
  416.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  '2 kits dos amortecedores dianteiros;
revisão dos freios;
1 buzina nova;
1 lâmpada de luz de ré.',
  '2022-03',
  1119449
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-17',
  'despesa',
  'Energia casa pastoral ref. fevereiro/2022',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1287693
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-17',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-03',
  1125359
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-17',
  'receita',
  'Oferta de Gratidão',
  26.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1134754
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-17',
  'receita',
  'Dízimos',
  380.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269731',
  '2022-03',
  1125363
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-18',
  'despesa',
  'Inscrição  Fruto Fiel 1',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1140876
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-18',
  'despesa',
  'Combustível Transporte Pessoal',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1287706
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-18',
  'despesa',
  'Desp. combustível para Fruto Fiel 1',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 0),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 0),
  NULL,
  '2022-03',
  1140877
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-20',
  'despesa',
  'Combustível Transporte Pessoal',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1287708
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-20',
  'despesa',
  'Combustível Transporte Pessoal',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1287704
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-20',
  'receita',
  'Oferta de Mantenedores',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-03',
  1134774
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-20',
  'receita',
  'Oferta de Israel',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-03',
  1134780
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-20',
  'receita',
  'Oferta Designada / Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1134773
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-20',
  'receita',
  'Oferta de Gratidão',
  63.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1134767
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-20',
  'receita',
  'Oferta de Socorro (Povo)',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-03',
  1134775
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-20',
  'receita',
  'Dízimos',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-03',
  1134765
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-20',
  'receita',
  'Dízimos',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-03',
  1134763
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-20',
  'receita',
  'Dízimos',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-03',
  1134758
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-20',
  'receita',
  'Primícias',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-03',
  1134764
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-20',
  'receita',
  'Primícias',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-03',
  1134762
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-20',
  'receita',
  'Primícias',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-03',
  1134757
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-22',
  'despesa',
  'VPB',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-03',
  1287689
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-24',
  'despesa',
  'Combustível Transporte Pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1287712
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-24',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-03',
  1134784
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-24',
  'receita',
  'Oferta de Gratidão',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1134788
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-24',
  'receita',
  'Dízimos',
  91.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_329904',
  '2022-03',
  1134787
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-27',
  'despesa',
  'Combustível (Carro Pastoral).',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1134792
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-27',
  'receita',
  'Apostila módulo 2',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_270276',
  '2022-03',
  1135618
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-27',
  'receita',
  'Apostila módulo 2',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_269292',
  '2022-03',
  1135617
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-27',
  'receita',
  'Oferta de Mantenedores',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-03',
  1141970
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-27',
  'receita',
  'Oferta de Israel',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-03',
  1141972
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-27',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1141969
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-27',
  'receita',
  'Oferta de Gratidão',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1141968
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-27',
  'receita',
  'Oferta de Socorro (Povo)',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-03',
  1141971
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-27',
  'receita',
  'Dízimos',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-03',
  1141967
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-27',
  'receita',
  'Dízimos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-03',
  1141965
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-27',
  'receita',
  'Primícias',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-03',
  1141966
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-27',
  'receita',
  'Primícias',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-03',
  1141964
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-28',
  'despesa',
  'VPB (Verba Pastoral Básica)',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-03',
  1526004
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-03-31',
  'despesa',
  'Combustível Carro Pastoral',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-03',
  1287687
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-01',
  'despesa',
  'Inscrição p/ Encontro com Deus - Pra. Aninha',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1379505
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-01',
  'despesa',
  'ENCONTRO COM DEUS',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1287683
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-02',
  'despesa',
  'ENCONTRO COM DEUS',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1287682
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-02',
  'receita',
  'Dízimos',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2022-04',
  1194044
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-03',
  'receita',
  'Oferta de Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-04',
  1168217
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-03',
  'receita',
  'Oferta de Israel',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-04',
  1168219
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-03',
  'receita',
  'Oferta Designada / Semeadura',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1168215
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-03',
  'receita',
  'Oferta de Gratidão',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1168214
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-03',
  'receita',
  'Oferta de Socorro (Povo)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-04',
  1168218
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-03',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-04',
  1168212
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-03',
  'receita',
  'Dízimos',
  48.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-04',
  1168210
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-03',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-04',
  1168211
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-03',
  'receita',
  'Primícias',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-04',
  1168208
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-04',
  'despesa',
  'FERM. BIOL',
  13.52,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1287672
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-04',
  'despesa',
  'Combustível Transporte Pessoal',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1287669
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-06',
  'despesa',
  'Combustível Transporte Pessoal',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1287668
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-06',
  'receita',
  'Oferta de Gratidão (apresentação Isaque)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269010',
  '2022-04',
  1194077
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-07',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-04',
  1168223
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-07',
  'receita',
  'Oferta de Gratidão',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1168229
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-07',
  'receita',
  'Dízimos',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2022-04',
  1168227
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-07',
  'receita',
  'Dízimos',
  153.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2022-04',
  1168225
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-07',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2022-04',
  1168222
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'despesa',
  'Combustível Transporte Pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1287666
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'despesa',
  'Combustível Transporte Pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1287665
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1287662
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'receita',
  'Oferta de Mantenedores',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-04',
  1168249
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'receita',
  'Oferta de Israel',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-04',
  1168253
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'receita',
  'Oferta Designada / Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1168247
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'receita',
  'Oferta de Gratidão',
  135.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1168246
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'receita',
  'Oferta de Socorro (Povo)',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-04',
  1168251
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-04',
  1168244
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'receita',
  'DESCONHECIDO',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1168241
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'receita',
  'DESCONHECIDO',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1168239
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2022-04',
  1168237
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'receita',
  'Dízimos',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-04',
  1168235
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'receita',
  'Dízimos',
  141.4,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_62171',
  '2022-04',
  1168233
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'receita',
  'Dízimos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_268021',
  '2022-04',
  1168231
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-10',
  'receita',
  'Primícias',
  42.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-04',
  1168242
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-11',
  'despesa',
  'Combustível Transporte Pessoal',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1287664
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-11',
  'receita',
  'Dízimos',
  550.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2022-04',
  1194027
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-14',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-04',
  1194068
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-14',
  'receita',
  'Oferta de Gratidão',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1194084
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-14',
  'receita',
  'Oferta de Gratidão',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2022-04',
  1194064
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-17',
  'receita',
  'Aula de Inglês',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-04',
  1206769
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-17',
  'receita',
  'Oferta de Mantenedores',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-04',
  1194088
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-17',
  'receita',
  'Oferta de Israel',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-04',
  1194091
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-17',
  'receita',
  'Oferta Designada / Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1194076
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-17',
  'receita',
  'Oferta de Gratidão',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1194075
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-17',
  'receita',
  'Oferta de Socorro (Povo)',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-04',
  1194089
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-17',
  'receita',
  'Dízimos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_329904',
  '2022-04',
  1194074
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-17',
  'receita',
  'Dízimos',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-04',
  1194073
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-17',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2022-04',
  1194071
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-17',
  'receita',
  'Primícias',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-04',
  1194072
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-17',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2022-04',
  1194070
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-18',
  'despesa',
  'VPB',
  48.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-04',
  1289847
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-18',
  'despesa',
  'VPB (Verba Pastoral Básica)',
  149.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-04',
  1289846
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-19',
  'despesa',
  'Inscrição Porto Seguro',
  577.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1194081
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-19',
  'despesa',
  'ENER. CASA PASTORAL.',
  113.48,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1287680
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-19',
  'despesa',
  'ENER. DO TEMPLO',
  83.39,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1287678
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-19',
  'despesa',
  'Hotel Porto Seguro',
  450.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46409),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1194086
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-20',
  'despesa',
  '3° parcela - Reforma do Púlpito - Final',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1379447
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-20',
  'despesa',
  'Interface de áudio - 3ª parcela',
  66.89,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1379419
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  550.82,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1379413
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-21',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-04',
  1194139
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-21',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-04',
  1194135
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-21',
  'receita',
  'Oferta de Gratidão',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1194141
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-24',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-04',
  1194158
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-24',
  'receita',
  'Oferta de Israel',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-04',
  1194164
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-24',
  'receita',
  'Oferta Designada / Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1194154
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-24',
  'receita',
  'Oferta de Gratidão',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-04',
  1194152
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-24',
  'receita',
  'Oferta de Socorro (Povo)',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-04',
  1194162
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-24',
  'receita',
  'Dízimos',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-04',
  1194148
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-24',
  'receita',
  'Primícias',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-04',
  1194145
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-25',
  'despesa',
  'VPB',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-04',
  1287677
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-04-30',
  'despesa',
  'DESP. DE SANTA CEIA',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-04',
  1287661
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-02',
  'despesa',
  'VPB',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-05',
  1289855
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-02',
  'despesa',
  'TRIBUTOS Ap. MOISÉS',
  435.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1289854
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-02',
  'despesa',
  'TRIBUTOS Ap. MOISÉS',
  435.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1289841
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-04',
  'receita',
  'Aula de Inglês (Arielly)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-05',
  1206774
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-07',
  'despesa',
  'Oferta de Honra para Apóstolo.',
  500.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: Apóstolo Moisés',
  '2022-05',
  1224930
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-08',
  'receita',
  'Oferta de Semeadura',
  300.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1207280
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-08',
  'receita',
  'Oferta do Trigo',
  412.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1207272
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-09',
  'despesa',
  'Inscrição Fruto Fiel 2 - Pr. Jadson',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1379484
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-09',
  'despesa',
  'Inscrição para o Fruto Fiel 2 - Pr. Jadson',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1218204
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-10',
  'despesa',
  'ALUGUEL DO TEMPLO',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1289853
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-11',
  'despesa',
  'ENERGIA DO TEMPLO REF. MÊS DE MARÇO.',
  107.97,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1289860
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-11',
  'despesa',
  'ENERGIA CASA PASTORAL REF. MÊS MARÇO',
  84.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-05',
  1289859
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-11',
  'receita',
  'Mensalidade de Inglês - João e Arthur',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-05',
  1218195
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-12',
  'despesa',
  'Inscrição Fruto Fiel 2 - Naftali',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1379477
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-12',
  'despesa',
  'OFERTA PARA O DIEGO.',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46667),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1289866
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-12',
  'receita',
  'Oferta do Trigo',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1216903
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-13',
  'despesa',
  'Inscrição para o Fruto Fiel 2 - Naftali',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1218211
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-13',
  'receita',
  'Leandro',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1218201
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-15',
  'receita',
  'OFERTA DE HONRA',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1220742
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-16',
  'despesa',
  'VPB',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-05',
  1289844
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-19',
  'receita',
  'Oferta de Honra Mercia e Alexsandro',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1227376
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  530.22,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1379453
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-20',
  'despesa',
  'Interface de áudio - 4ª parcela',
  66.89,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1379430
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-24',
  'despesa',
  'Combustível Transporte Pessoal',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1289858
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-24',
  'despesa',
  'VPB',
  180.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-05',
  1289857
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-24',
  'despesa',
  'VPB',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-05',
  1289856
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-30',
  'despesa',
  'Oferta designada à Pra. Aninha - Tributada',
  834.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-05',
  1379522
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-30',
  'receita',
  'Oferta Igreja Apostólica Shalom (Pra. Aninha)',
  1000.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-05',
  1244753
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-05-30',
  'receita',
  'Oferta Igreja Apostólica Shalom (Pr. Jadson)',
  1000.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-05',
  1244751
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-02',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-06',
  1255209
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-02',
  'receita',
  'Oferta de Gratidão',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1255210
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-02',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2022-06',
  1255220
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-02',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2022-06',
  1255218
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-02',
  'receita',
  'Dízimos',
  220.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2022-06',
  1255216
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-02',
  'receita',
  'Dízimos',
  77.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-06',
  1255214
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-02',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-06',
  1255212
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-02',
  'receita',
  'Dízimos',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2022-06',
  1255208
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-02',
  'receita',
  'Dízimos',
  107.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-06',
  1255205
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-02',
  'receita',
  'Primícias',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-06',
  1255213
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-02',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-06',
  1255211
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-02',
  'receita',
  'Primícias',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-06',
  1255204
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'despesa',
  'GASTOS COM A CEIA DO SENHOR.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-06',
  1255138
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Oferta de Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-06',
  1289884
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Oferta de Mantenedores',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269715',
  '2022-06',
  1289872
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Oferta de Mantenedores',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-06',
  1255227
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Oferta de Israel',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-06',
  1289886
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Oferta de Israel',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-06',
  1255233
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Oferta Designada / Semeadura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1289882
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Oferta Designada / Semeadura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1255225
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Oferta de Gratidão',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1289883
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Oferta de Gratidão',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1255224
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Oferta de Socorro (Povo)',
  46.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-06',
  1289885
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Oferta de Socorro (Povo)',
  46.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-06',
  1255229
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'DESCONHECIDO',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1289880
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2022-06',
  1289879
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2022-06',
  1289878
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Dízimos',
  220.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2022-06',
  1289877
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Dízimos',
  77.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-06',
  1289876
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-06',
  1289874
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Primícias',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-06',
  1289875
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-05',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-06',
  1289873
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-06',
  'despesa',
  'Módulo de injeção eletrônica (carro pastoral)',
  1300.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1379466
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-06',
  'receita',
  'Oferta de gratidão - Adão e Sandriele',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_268021',
  '2022-06',
  1266152
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-09',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-06',
  1289898
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-09',
  'receita',
  'Oferta de Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-06',
  1289903
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-09',
  'receita',
  'Oferta de Israel',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-06',
  1289905
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-09',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1289902
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-09',
  'receita',
  'Oferta de Gratidão',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1289899
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-09',
  'receita',
  'Oferta de Socorro (Povo)',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-06',
  1289904
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-09',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2022-06',
  1289896
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-09',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2022-06',
  1289892
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-09',
  'receita',
  'Dízimos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_268021',
  '2022-06',
  1289888
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-09',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2022-06',
  1289891
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1289852
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-10',
  'receita',
  'Mensalidade Inglês - Deivinho',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-06',
  1266149
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-10',
  'receita',
  'Mensalidade Inglês - Ariele',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-06',
  1266145
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-12',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-06',
  1289912
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-12',
  'receita',
  'Oferta de Israel',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-06',
  1289914
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-12',
  'receita',
  'Oferta Designada / Semeadura',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1289911
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-12',
  'receita',
  'Oferta de Gratidão',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1289910
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-12',
  'receita',
  'Oferta de Socorro (Povo)',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-06',
  1289913
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-12',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2022-06',
  1289909
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-12',
  'receita',
  'JOEDE S. VIANA',
  730.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1289908
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-12',
  'receita',
  'Dízimos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-06',
  1289906
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-12',
  'receita',
  'Primícias',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-06',
  1289901
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-15',
  'receita',
  'Manutenção em impressora',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-06',
  1284752
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-16',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-06',
  1289917
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-16',
  'receita',
  'Oferta de Gratidão',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1289916
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-17',
  'despesa',
  'MANUTENÇÃO CASA PASTORAL.',
  107.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-06',
  1289868
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-19',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-06',
  1289943
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-19',
  'receita',
  'Oferta de Israel',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-06',
  1289945
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-19',
  'receita',
  'Oferta Designada / Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1289942
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-19',
  'receita',
  'Oferta de Gratidão',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1289938
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-19',
  'receita',
  'Oferta de Socorro (Povo)',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-06',
  1289944
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-19',
  'receita',
  'Dízimos',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-06',
  1289937
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-19',
  'receita',
  'Dízimos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269780',
  '2022-06',
  1289923
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-19',
  'receita',
  'Primícias',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-06',
  1289925
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  530.22,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1379456
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-20',
  'despesa',
  'Interface de áudio - 5ª parcela',
  66.89,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1379434
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-20',
  'despesa',
  'VPB',
  89.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-06',
  1289849
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-23',
  'receita',
  'Oferta de Gratidão',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1287807
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-23',
  'receita',
  'GRATIDÃO POR MAIS UM ANO DE VIDA.',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2022-06',
  1287806
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-26',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-06',
  1291629
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-26',
  'receita',
  'Oferta de Israel',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-06',
  1291637
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-26',
  'receita',
  'Oferta Designada / Semeadura',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1291626
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-26',
  'receita',
  'Oferta de Gratidão',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1291624
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-26',
  'receita',
  'Oferta de Socorro (Povo)',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-06',
  1291631
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-26',
  'receita',
  'Dízimos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-06',
  1291622
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-26',
  'receita',
  'Primícias',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-06',
  1291620
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-30',
  'receita',
  'Gratidão Diária',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-06',
  1298517
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-30',
  'receita',
  'Oferta Designada / Semeadura',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1298515
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-30',
  'receita',
  'Oferta de Gratidão',
  9.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-06',
  1298518
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-06-30',
  'receita',
  'Dízimos',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2022-06',
  1298514
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-07',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-07',
  1362493
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-07',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-07',
  1362501
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-07',
  'receita',
  'Oferta de Israel',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-07',
  1362503
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-07',
  'receita',
  'Oferta Designada / Semeadura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362500
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-07',
  'receita',
  'Oferta de Gratidão',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362499
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-07',
  'receita',
  'Oferta de Socorro (Povo)',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-07',
  1362502
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-07',
  'receita',
  'Dízimos',
  228.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2022-07',
  1362497
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-07',
  'receita',
  'JOEDE VIANA DA SILVA',
  680.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362496
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-07',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-07',
  1362489
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-07',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362485
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'despesa',
  'Energia casa pastoral ref. ao mês de maio',
  112.66,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362688
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'despesa',
  'Energia do templo ref. ao mês de maio',
  84.09,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362682
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362677
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'receita',
  'Oferta de Mantenedores',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-07',
  1362532
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'receita',
  'Oferta de Israel',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-07',
  1362534
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'receita',
  'Oferta Designada / Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362528
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'receita',
  'Oferta de Gratidão',
  57.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362526
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'receita',
  'Oferta de Socorro (Povo)',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-07',
  1362533
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2022-07',
  1362521
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2022-07',
  1362519
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'receita',
  'Dízimos',
  170.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2022-07',
  1362518
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'receita',
  'ADÃO',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362517
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2022-07',
  1362512
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'receita',
  'Dízimos',
  280.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-07',
  1362510
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'receita',
  'Dízimos',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-07',
  1362509
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-10',
  'receita',
  'Primícias',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362522
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-11',
  'despesa',
  'VPB',
  143.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-07',
  1362694
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-14',
  'receita',
  'Oferta de Israel',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-07',
  1362551
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-14',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362547
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-14',
  'receita',
  'Oferta de Gratidão',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362546
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-14',
  'receita',
  'Oferta de Socorro (Povo)',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-07',
  1362548
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-14',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2022-07',
  1362543
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-14',
  'receita',
  'Dízimos',
  78.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2022-07',
  1362539
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-14',
  'receita',
  'Primícias',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362544
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-17',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-07',
  1362568
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-17',
  'receita',
  'Oferta de Israel',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-07',
  1362572
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-17',
  'receita',
  'Oferta Designada / Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362567
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-17',
  'receita',
  'Oferta de Gratidão',
  99.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362565
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-17',
  'receita',
  'Oferta de Socorro (Povo)',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-07',
  1362570
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-17',
  'receita',
  'Dízimos',
  26.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-07',
  1362562
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-17',
  'receita',
  'Dízimos',
  110.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-07',
  1362561
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-17',
  'receita',
  'Primícias',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362564
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-19',
  'despesa',
  'VPB',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-07',
  1362701
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  730.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1754156
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-20',
  'despesa',
  'Interface de áudio - 6ª parcela',
  66.89,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1379438
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-21',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-07',
  1362574
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-21',
  'receita',
  'Pagamento efetuado por Anderson ref. ao curso de inglês',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-07',
  1362755
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-21',
  'receita',
  'Referente ao curso de inglês',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_269731',
  '2022-07',
  1362752
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-21',
  'receita',
  'Apostila da escola de líderes de Mércia',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_270051',
  '2022-07',
  1362749
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-21',
  'receita',
  'Apostila da escola de líderes do Alexsandro',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_269579',
  '2022-07',
  1362745
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-21',
  'receita',
  'Apostila da escola de líderes de Clara',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_270276',
  '2022-07',
  1362742
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-21',
  'receita',
  'Apostila da escola de líderes de Kaique',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_269292',
  '2022-07',
  1362739
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-21',
  'receita',
  'Apostila da escola de líderes de Agnnys',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_269780',
  '2022-07',
  1362734
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-21',
  'receita',
  'Apostila da escola de líderes de Jakciel',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_270053',
  '2022-07',
  1362730
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-21',
  'receita',
  'EXTRA ASHLEY',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-07',
  1362723
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-21',
  'receita',
  'Oferta de Gratidão',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362579
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-24',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-07',
  1362601
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-24',
  'receita',
  'Oferta de Israel',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-07',
  1362604
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-24',
  'receita',
  'Oferta Designada / Semeadura',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362597
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-24',
  'receita',
  'Oferta de Gratidão',
  42.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362596
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-24',
  'receita',
  'Oferta de Socorro (Povo)',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-07',
  1362602
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-24',
  'receita',
  'Dízimos',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-07',
  1362589
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-24',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_329904',
  '2022-07',
  1362585
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-24',
  'receita',
  'Dízimos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269780',
  '2022-07',
  1362583
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-24',
  'receita',
  'Dízimos',
  110.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-07',
  1362580
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-24',
  'receita',
  'Primícias',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362593
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-25',
  'despesa',
  'VPB',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-07',
  1362697
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-28',
  'receita',
  'Oferta de Gratidão',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362613
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-28',
  'receita',
  'Oferta de Gratidão',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-07',
  1362611
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-31',
  'receita',
  'Oferta de Mantenedores',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-07',
  1362638
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-31',
  'receita',
  'Oferta de Israel',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-07',
  1362657
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-31',
  'receita',
  'Oferta Designada / Semeadura',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362636
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-31',
  'receita',
  'Oferta Designada / Semeadura',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-07',
  1362634
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-31',
  'receita',
  'Oferta de Gratidão',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362630
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-31',
  'receita',
  'Oferta de Socorro (Povo)',
  65.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-07',
  1362652
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-31',
  'receita',
  'Dízimos',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-07',
  1362624
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-31',
  'receita',
  'Dízimos',
  104.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2022-07',
  1362622
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-31',
  'receita',
  'Dízimos',
  63.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-07',
  1362618
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-31',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-07',
  1362616
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-07-31',
  'receita',
  'Primícias',
  108.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-07',
  1362628
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-04',
  'receita',
  'Gratidão Diária',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-08',
  1365046
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-04',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-08',
  1365045
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-04',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2022-08',
  1365043
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-04',
  'receita',
  'Dízimos',
  352.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2022-08',
  1365041
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-04',
  'receita',
  'Dízimos',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2022-08',
  1365039
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-04',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2022-08',
  1365031
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-04',
  'receita',
  'Dízimos',
  54.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_329904',
  '2022-08',
  1365030
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-05',
  'despesa',
  'Inscrição Fruto Fiel 3 - Pra. Aninha',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1379493
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-05',
  'despesa',
  'Inscrição Fruto Fiel 3 - Pr. Jadson',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1379492
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-05',
  'despesa',
  'Despesa viagem p/ o Fruto Fiel 3',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1379499
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-05',
  'receita',
  'Mensalidade de Inglês - Deivinho',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-08',
  1379339
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-07',
  'receita',
  'Oferta de Mantenedores',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-08',
  1378014
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-07',
  'receita',
  'Oferta de Israel',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-08',
  1378021
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-07',
  'receita',
  'Oferta Designada / Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1378007
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-07',
  'receita',
  'Oferta de Gratidão',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1378006
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-07',
  'receita',
  'Oferta de Socorro (Povo)',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-08',
  1378018
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-07',
  'receita',
  'Dízimos',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-08',
  1378003
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-07',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2022-08',
  1378000
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-07',
  'receita',
  'Dízimos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2022-08',
  1377993
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-07',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2022-08',
  1377990
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-07',
  'receita',
  'Dízimos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-08',
  1377986
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-07',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2022-08',
  1377984
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-07',
  'receita',
  'Primícias',
  42.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1378005
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-08',
  'despesa',
  'VPB',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-08',
  1391406
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-08',
  'despesa',
  'VPB',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1383746
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-10',
  'despesa',
  'Energia casa pastoral ref. ao mês de junho.',
  109.99,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1414168
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-10',
  'despesa',
  'Energia do templo ref. ao mês de junho.',
  55.19,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1414165
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-10',
  'despesa',
  'COMBUSTÍVEL DO CARRO PASTORAL.',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1414157
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1414153
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-11',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-08',
  1389499
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-11',
  'receita',
  'Oferta de Israel',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-08',
  1389517
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-11',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1389509
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-11',
  'receita',
  'Oferta de Gratidão',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1389508
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-11',
  'receita',
  'Oferta de Socorro (Povo)',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-08',
  1389515
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-11',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2022-08',
  1389474
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-11',
  'receita',
  'Dízimos',
  78.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2022-08',
  1389469
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-11',
  'receita',
  'Dízimos',
  425.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269731',
  '2022-08',
  1389441
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-11',
  'receita',
  'Primícias',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1389504
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-14',
  'receita',
  'Oferta de Mantenedores',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-08',
  1389576
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-14',
  'receita',
  'Oferta de Israel',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-08',
  1389579
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-14',
  'receita',
  'Oferta Designada / Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1389575
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-14',
  'receita',
  'Oferta de Gratidão',
  38.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1389574
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-14',
  'receita',
  'Oferta de Socorro (Povo)',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-08',
  1389578
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-14',
  'receita',
  'Dízimos',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273247',
  '2022-08',
  1389570
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-14',
  'receita',
  'Dízimos',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2022-08',
  1389542
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-14',
  'receita',
  'Dízimos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-08',
  1389537
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-14',
  'receita',
  'Dízimos',
  115.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-08',
  1389534
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-14',
  'receita',
  'Dízimos',
  105.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2022-08',
  1389532
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-14',
  'receita',
  'Primícias',
  48.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1389573
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-16',
  'despesa',
  'VPB',
  78.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1391401
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-16',
  'despesa',
  'VPB',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-08',
  1391392
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-18',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-08',
  1399773
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-18',
  'receita',
  'Oferta Designada / Semeadura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269715',
  '2022-08',
  1399774
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-18',
  'receita',
  'Oferta de Gratidão',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1399775
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  782.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1754152
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-21',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-08',
  1399791
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-21',
  'receita',
  'Oferta de Israel',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-08',
  1399793
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-21',
  'receita',
  'Oferta Designada / Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1399790
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-21',
  'receita',
  'Oferta de Gratidão',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1399789
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-21',
  'receita',
  'Oferta de Socorro (Povo)',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-08',
  1399792
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-21',
  'receita',
  'Dízimos',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-08',
  1399778
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-21',
  'receita',
  'Dízimos',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-08',
  1399777
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-21',
  'receita',
  'Desconhecido',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1399776
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-21',
  'receita',
  'Primícias',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1399787
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-25',
  'receita',
  'Manutenção da impressora',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-08',
  1400730
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-28',
  'receita',
  'Oferta de Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-08',
  1413476
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-28',
  'receita',
  'Oferta de Israel',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-08',
  1413479
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-28',
  'receita',
  'Oferta Designada / Semeadura',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1413475
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-28',
  'receita',
  'Oferta de Gratidão',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1413474
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-28',
  'receita',
  'Oferta de Socorro (Povo)',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-08',
  1413477
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-28',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-08',
  1413473
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-28',
  'receita',
  'Dízimos',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-08',
  1413469
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-28',
  'receita',
  'TAYNARA VANESSA VENTURA ROCHA',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-08',
  1413465
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-28',
  'receita',
  'Dízimos',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-08',
  1413461
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-28',
  'receita',
  'Dízimos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_268021',
  '2022-08',
  1413459
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-28',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-08',
  1413472
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-08-28',
  'receita',
  'Primícias',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-08',
  1413470
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-01',
  'despesa',
  'ENERGIA CASA PASTORAL REF. AO MÊS DE JULHO.',
  122.29,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1526001
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-01',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-09',
  1415268
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-01',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-09',
  1415267
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-02',
  'despesa',
  'TRIBUTOS P/ O APÓSTOLO.',
  526.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1414137
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-02',
  'receita',
  'Categoria Geral',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 55699),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1414140
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-04',
  'despesa',
  'Combustível Transporte Pessoal',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1526003
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-05',
  'despesa',
  'Combustível Transporte Pessoal',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1526002
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-05',
  'despesa',
  'ENERGIA DO TEMPLO REF. AO MÊS DE JULHO.',
  77.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1526000
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-05',
  'receita',
  'Mensalidade Inglês - Deivinho',
  110.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1431528
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-07',
  'receita',
  'SEMINÁRIO DE HONRA E PROSPERIDADE.',
  246.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1424442
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-08',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-09',
  1437512
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-08',
  'receita',
  'Oferta de Mantenedores',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-09',
  1437528
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-08',
  'receita',
  'Oferta de Israel',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-09',
  1437532
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-08',
  'receita',
  'Oferta Designada / Semeadura',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1437522
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-08',
  'receita',
  'Oferta de Gratidão',
  54.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1437525
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-08',
  'receita',
  'Oferta de Socorro (Povo)',
  43.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-09',
  1437531
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-08',
  'receita',
  'Dízimos',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2022-09',
  1437540
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-08',
  'receita',
  'Dízimos',
  87.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269292',
  '2022-09',
  1437519
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-08',
  'receita',
  'Dízimos',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2022-09',
  1437518
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-08',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2022-09',
  1437516
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-08',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_329904',
  '2022-09',
  1437515
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-08',
  'receita',
  'Dízimos',
  350.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_73265',
  '2022-09',
  1437514
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-08',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2022-09',
  1437513
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-08',
  'receita',
  'Primícias',
  71.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1437521
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-10',
  'despesa',
  'INSCRIÇÃO CONGRESSO MIB - 1/3',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1754222
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1525989
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-11',
  'receita',
  'Oferta de Mantenedores',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-09',
  1437565
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-11',
  'receita',
  'Oferta de Israel',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-09',
  1437569
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-11',
  'receita',
  'Oferta Designada / Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1437563
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-11',
  'receita',
  'SEMENTE (seminário de honra)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-09',
  1437557
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-11',
  'receita',
  'Oferta de Gratidão',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1437561
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-11',
  'receita',
  'Oferta de Socorro (Povo)',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-09',
  1437566
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-11',
  'receita',
  'Dízimos',
  65.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-09',
  1437553
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-11',
  'receita',
  'Dízimos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269780',
  '2022-09',
  1437551
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-11',
  'receita',
  'Dízimos',
  78.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2022-09',
  1437549
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-11',
  'receita',
  'Dízimos',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-09',
  1437547
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-11',
  'receita',
  'Primícias',
  56.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1437560
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-13',
  'despesa',
  'Combustível Transporte Pessoal',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1525992
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-15',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-09',
  1455889
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-15',
  'receita',
  'Oferta de Gratidão',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1455891
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-15',
  'receita',
  'Dízimos',
  690.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2022-09',
  1455888
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-15',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2022-09',
  1455887
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-18',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-09',
  1455903
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-18',
  'receita',
  'Oferta de Israel',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-09',
  1455905
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-18',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1455902
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-18',
  'receita',
  'Oferta de Gratidão',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 0),
  NULL,
  '2022-09',
  1455901
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-18',
  'receita',
  'Oferta de Socorro (Povo)',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-09',
  1455904
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-18',
  'receita',
  'Dízimos',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-09',
  1455899
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-18',
  'receita',
  'Dízimos',
  49.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-09',
  1455898
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-18',
  'receita',
  'Primícias',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 0),
  NULL,
  '2022-09',
  1455900
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  946.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1754164
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-22',
  'despesa',
  'DESP. COM PRELEITOR Pr. ELIELSON',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1452121
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-22',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-09',
  1455909
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-22',
  'receita',
  'EXTRA DE ASAPH',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-09',
  1452125
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-22',
  'receita',
  'Oferta de Mantenedores',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269715',
  '2022-09',
  1455910
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-22',
  'receita',
  'Oferta de Israel',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-09',
  1455924
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-22',
  'receita',
  'Oferta Designada / Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1455914
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-22',
  'receita',
  'Oferta de Gratidão',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1455913
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-22',
  'receita',
  'Oferta de Socorro (Povo)',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-09',
  1455921
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-22',
  'receita',
  'Dízimos',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2022-09',
  1455908
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-22',
  'receita',
  'Dízimos',
  105.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2022-09',
  1455907
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-22',
  'receita',
  'Primícias',
  64.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1455912
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-25',
  'receita',
  'MENSALIDADE DE INGLÊS - ARIELLY.',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-09',
  1454827
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-25',
  'receita',
  'EXTRA Pra. ANINHA.',
  300.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-09',
  1454795
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-25',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-09',
  1455944
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-25',
  'receita',
  'Oferta de Israel',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-09',
  1455951
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-25',
  'receita',
  'Oferta Designada / Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1455943
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-25',
  'receita',
  'Oferta de Gratidão',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1455941
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-25',
  'receita',
  'Oferta de Socorro (Povo)',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-09',
  1455946
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-25',
  'receita',
  'Dízimos',
  61.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273247',
  '2022-09',
  1455938
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-25',
  'receita',
  'Dízimos',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-09',
  1455937
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-25',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-09',
  1455936
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-25',
  'receita',
  'Dízimos',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-09',
  1455934
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-25',
  'receita',
  'Primícias',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1455940
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-29',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-09',
  1481752
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-29',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-09',
  1481748
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-29',
  'receita',
  'Oferta de Gratidão',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-09',
  1481753
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-09-29',
  'receita',
  'Dízimos',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2022-09',
  1481747
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-02',
  'despesa',
  'DESP. DE FRUTAS,PÃES E INGREDIENTES.',
  65.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 65331),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1526013
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-02',
  'despesa',
  'Combustível Transporte Pessoal',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1525981
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-02',
  'receita',
  'Oferta Designada / Semeadura',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544087
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-02',
  'receita',
  'Oferta Designada / Semeadura',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273247',
  '2022-10',
  1544083
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-02',
  'receita',
  'Oferta de Gratidão',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544090
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-02',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-10',
  1544080
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-02',
  'receita',
  'Dízimos',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-10',
  1544078
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-02',
  'receita',
  'Dízimos',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2022-10',
  1544075
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-02',
  'receita',
  'Dízimos',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-10',
  1544071
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-02',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-10',
  1544079
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-02',
  'receita',
  'Primícias',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-10',
  1544076
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-02',
  'receita',
  'Primícias',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2022-10',
  1544074
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-04',
  'despesa',
  'Combustível Transporte Pessoal',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1525980
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-06',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-10',
  1544091
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-06',
  'receita',
  'Oferta de Gratidão',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544113
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-06',
  'receita',
  'Dízimos',
  118.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269715',
  '2022-10',
  1544097
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-06',
  'receita',
  'Dízimos',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2022-10',
  1544095
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-06',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2022-10',
  1544094
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-06',
  'receita',
  'Ageilda Gonçalo da Silva',
  83.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544093
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-06',
  'receita',
  'Primícias',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269715',
  '2022-10',
  1544096
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-07',
  'despesa',
  'Combustível Transporte Pessoal',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1525972
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-09',
  'despesa',
  'Combustível Transporte Pessoal',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1525974
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-09',
  'receita',
  'Oferta Designada / Semeadura',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544111
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-09',
  'receita',
  'Oferta de Gratidão',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544112
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-09',
  'receita',
  'Dízimos',
  550.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269731',
  '2022-10',
  1544110
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-09',
  'receita',
  'Joede Viana',
  730.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544108
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-09',
  'receita',
  'Dízimos',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-10',
  1544107
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-09',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2022-10',
  1544106
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-09',
  'receita',
  'Dízimos',
  365.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-10',
  1544103
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-09',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2022-10',
  1544099
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-09',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2022-10',
  1544104
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-09',
  'receita',
  'Primícias',
  126.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-10',
  1544102
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (1/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2022-10',
  3418625
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-10',
  'despesa',
  'INSCRIÇÃO CONGRESSO MIB - 3/3',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1754224
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-10',
  'despesa',
  'INSCRIÇÃO CONGRESSO MIB - 2/3',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1754223
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-10',
  'despesa',
  'Combustível Transporte Pessoal',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1525986
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-10',
  'despesa',
  'PAGOS AO APÓSTOLO MOISÉS.',
  549.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1526027
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-10',
  'despesa',
  'VPB (Verba Pastoral Básica)',
  165.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1526023
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-10',
  'despesa',
  'VPB',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-10',
  1526022
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-10',
  'despesa',
  'ALUGUEL REF. AO MÊS DE OUTUBRO.',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1525985
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-11',
  'despesa',
  'Combustível Transporte Pessoal',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1525976
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-12',
  'despesa',
  'ENERGIA DO TEMPLO REF. AO MÊS DE AGOSTO.',
  75.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1526061
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-13',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-10',
  1544118
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-13',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544126
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-13',
  'receita',
  'Oferta de Gratidão',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544124
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-13',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2022-10',
  1544121
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-13',
  'receita',
  'Dízimos',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2022-10',
  1544119
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-13',
  'receita',
  'Dízimos',
  78.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2022-10',
  1544116
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-13',
  'receita',
  'Primícias',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2022-10',
  1544115
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-16',
  'receita',
  'Oferta Designada / Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544136
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-16',
  'receita',
  'Oferta de Gratidão',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544134
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-16',
  'receita',
  'Dízimos',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273247',
  '2022-10',
  1544132
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-16',
  'receita',
  'Dízimos',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-10',
  1544131
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-16',
  'receita',
  'Dízimos',
  107.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-10',
  1544128
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-16',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273247',
  '2022-10',
  1544133
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-16',
  'receita',
  'Primícias',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-10',
  1544129
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-16',
  'receita',
  'Primícias',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-10',
  1544127
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-17',
  'despesa',
  'ENERGIA CASA PASTORAL REF AO MÊS DE AGOSTO.',
  126.61,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1526058
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-17',
  'despesa',
  'VPB',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1526080
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-17',
  'despesa',
  'VPB',
  46.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-10',
  1526079
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  953.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1754192
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-20',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-10',
  1544155
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-20',
  'receita',
  'Oferta Designada / Semeadura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544158
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-20',
  'receita',
  'Oferta de Gratidão',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544157
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-20',
  'receita',
  'Dízimos',
  129.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2022-10',
  1544152
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-20',
  'receita',
  'Primícias',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2022-10',
  1544151
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-23',
  'receita',
  'Oferta Designada / Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544168
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-23',
  'receita',
  'Oferta de Gratidão',
  38.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544167
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-23',
  'receita',
  'Dízimos',
  47.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-10',
  1544165
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-23',
  'receita',
  'Dízimos',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-10',
  1544162
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-23',
  'receita',
  'Primícias',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-10',
  1544164
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-23',
  'receita',
  'Primícias',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-10',
  1544160
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-25',
  'despesa',
  'VPB',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1526082
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-25',
  'despesa',
  'VPB',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-10',
  1526081
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-26',
  'despesa',
  'Combustível Transporte Pessoal',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1575952
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-27',
  'receita',
  'Oferta de Gratidão',
  54.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544169
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-30',
  'receita',
  'Transferência / Diversos',
  390.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 0),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Manutenção do carro pastoral. | Transferência original Enuves ID 1575933 (Origem: 8611, Destino: 8441)',
  '2022-10',
  1575934
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-30',
  'despesa',
  'Transferência / Diversos',
  390.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 0),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Manutenção do carro pastoral. | Transferência original Enuves ID 0 (Origem: 8611, Destino: 8441)',
  '2022-10',
  1575933
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-30',
  'despesa',
  'CONCERTO DO CARRO PASTORAL.',
  390.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1575927
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-30',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-10',
  1544175
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-30',
  'receita',
  'Oferta Designada / Semeadura',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544183
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-30',
  'receita',
  'Oferta de Gratidão',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1544182
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-30',
  'receita',
  'Dízimos',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2022-10',
  1544181
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-30',
  'receita',
  'Dízimos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-10',
  1544173
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-30',
  'receita',
  'Dízimos',
  180.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-10',
  1544170
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-30',
  'receita',
  'Primícias',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2022-10',
  1544178
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-30',
  'receita',
  'Primícias',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-10',
  1544172
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-31',
  'despesa',
  'VPB',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-10',
  1526078
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-10-31',
  'despesa',
  'VPB',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-10',
  1526077
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-01',
  'despesa',
  'PASSAGEM PARA JUSSARA (NAFTALI).',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1525952
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-01',
  'despesa',
  'TRIBUTOS PARA AP. MOISÉS.',
  674.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1525941
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-01',
  'receita',
  'Categoria Geral',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 55699),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1525954
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-02',
  'despesa',
  'Combustível Carro Pastoral',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1576015
) ON CONFLICT (enuves_id) DO NOTHING;

COMMIT;
