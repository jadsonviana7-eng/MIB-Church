-- ==============================================================
-- IMPORTAÇÃO ENUVES - PARTE 4 de 5
-- ==============================================================

BEGIN;

-- IMPORTAÇÃO DE TRANSAÇÕES FINANCEIRAS (Lote 4)

INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-28',
  'receita',
  'Klebson Alves da Silva',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3707121
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-28',
  'receita',
  'Klebson Alves da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3707120
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-28',
  'receita',
  'Ofertas de Gratidão',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  3707126
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-28',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3707118
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-28',
  'receita',
  'Klebson Alves da Silva',
  26.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3707117
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-28',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707410
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-28',
  'receita',
  'Luiz dos Santos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707406
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-28',
  'receita',
  'Klebson Alves da Silva',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3707115
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-28',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-11',
  3707112
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-28',
  'receita',
  'Josefa Zacarias Martins',
  282.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2024-11',
  3707110
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-28',
  'receita',
  'Maria Mércia Barboza da Silva',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2024-11',
  3707107
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-28',
  'receita',
  'Klebson Alves da Silva',
  43.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3707114
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-29',
  'receita',
  'Luiz dos Santos',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707416
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-29',
  'receita',
  'Luiz dos Santos',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707415
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-30',
  'despesa',
  'Tributos do apóstolo Moises',
  708.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  4261005
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-01',
  'receita',
  'Ailton de Morais Araujo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3819580
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-01',
  'receita',
  'Ailton de Morais Araujo',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3819576
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-01',
  'receita',
  'Ailton de Morais Araujo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3819573
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-01',
  'receita',
  'Ofertas de Gratidão',
  71.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3819597
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-01',
  'receita',
  'Ailton de Morais Araujo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3819570
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-01',
  'receita',
  'Ailton de Morais Araujo',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3819564
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-01',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-12',
  3819590
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-01',
  'receita',
  'Ailton de Morais Araujo',
  194.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3819557
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-01',
  'receita',
  'Ailton de Morais Araujo',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3819554
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-02',
  'receita',
  'Arielly Airys da Silva Fideles',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269731',
  '2024-12',
  3825099
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-02',
  'receita',
  'Jadson de Lima Moura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_169659',
  '2024-12',
  3825090
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-02',
  'receita',
  'Jose Cicero Ferreira',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-12',
  3825088
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-02',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-12',
  3825085
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-02',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2024-12',
  3825076
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-02',
  'receita',
  'Ailton de Morais Araujo',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3825033
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-02',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824601
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-02',
  'receita',
  'Luiz dos Santos',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824598
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-02',
  'receita',
  'Luiz dos Santos',
  43.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824590
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-02',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824573
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-03',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824619
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-03',
  'receita',
  'Luiz dos Santos',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824614
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-03',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824605
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-04',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824624
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-05',
  'receita',
  'Sueli Lourenço da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2024-12',
  3822976
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-05',
  'receita',
  'Sueli Lourenço da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-12',
  3822973
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-05',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-12',
  3822970
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-05',
  'receita',
  'Ofertas de Gratidão',
  152.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3819845
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-05',
  'receita',
  'Shirley Lopes Ferreira',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-12',
  3819733
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-05',
  'receita',
  'Sueli Lourenço da Silva',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2024-12',
  3819612
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-05',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-12',
  3819800
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-05',
  'receita',
  'Anderson Davi Ferreira da Silva',
  287.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-12',
  3819794
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-05',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2024-12',
  3819763
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-05',
  'receita',
  'Shirley Lopes Ferreira',
  410.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-12',
  3819732
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-05',
  'receita',
  'Sueli Lourenço da Silva',
  140.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-12',
  3819609
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-05',
  'receita',
  'José Cicero Ferreira',
  142.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-12',
  3819605
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-05',
  'receita',
  'Sueli Lourenço da Silva',
  49.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-12',
  3819608
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-06',
  'despesa',
  'Compra de Cadeiras para Igreja (4/10)',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3523220
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-07',
  'receita',
  'Ofertas de Gratidão',
  478.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3822588
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-07',
  'receita',
  'Fernanda',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3822586
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-08',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822519
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-08',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822516
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-08',
  'receita',
  'Klebson Alves da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822515
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-08',
  'receita',
  'Ofertas de Gratidão',
  106.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3822561
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-08',
  'receita',
  'Anderson Davi Ferreira da SIlva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-12',
  3822558
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-08',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  1.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-12',
  3822542
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-08',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822511
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-08',
  'receita',
  'Klebson Alves da Silva',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822504
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-08',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  178.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-12',
  3822541
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-08',
  'receita',
  'Klebson Alves da Silva',
  128.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822502
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-08',
  'receita',
  'Joede da Silva Viana',
  1050.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2024-12',
  3822386
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-08',
  'receita',
  'Klebson Alves da Silva',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822393
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-09',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824798
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-09',
  'receita',
  'Luiz dos Santos',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824792
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-09',
  'receita',
  'Luiz dos Santos',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824681
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-09',
  'receita',
  'Luiz dos Santos',
  12.7,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824675
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-09',
  'receita',
  'Luiz dos Santos',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824672
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-10',
  'despesa',
  'Multitracks Elite - Mensalidade (1/12)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  4049374
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-10',
  'despesa',
  'Aluguel Casa Pastoral (23/24)',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2024-12',
  4365163
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-10',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824806
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-11',
  'despesa',
  'Frutas para a ceia do Senhor',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 65331),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  5838632
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-11',
  'despesa',
  'DIESEL',
  100.07,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  5838629
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-11',
  'despesa',
  'Fatura de energia do templo',
  154.45,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  5838621
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-11',
  'despesa',
  'Fatura de energia da casa pastoral',
  201.95,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  5838616
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-11',
  'despesa',
  'Fat. de energia ref. novembro - Casa Pastoral',
  201.95,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3774405
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-11',
  'despesa',
  'Fat. de energia ref. novembro - Templo',
  154.45,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3774374
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-11',
  'receita',
  'Luiz dos Santos',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824820
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-11',
  'receita',
  'Luiz dos Santos',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824812
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-12',
  'receita',
  'Extra',
  10000.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3828007
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-12',
  'receita',
  'Ofertas de Gratidão',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3822571
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-12',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824855
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-12',
  'receita',
  'Luiz dos Santos',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824852
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-12',
  'receita',
  'Luiz dos Santos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824826
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-12',
  'receita',
  'Alicia Regina da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2024-12',
  3822567
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-13',
  'despesa',
  'Fatura de enrgia da casa pastoral',
  128.71,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  5838584
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-13',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824932
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-13',
  'receita',
  'Luiz dos Santos',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824861
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-14',
  'despesa',
  'DIESEL',
  60.07,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  5838598
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-14',
  'receita',
  'Rede de homens',
  182.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3822578
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-15',
  'despesa',
  'DIESEL',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  5838601
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-15',
  'despesa',
  'Material de construção',
  21.9,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46407),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  5838605
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-15',
  'despesa',
  'Material de escritório',
  27.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46404),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  5838603
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-15',
  'receita',
  'Ofertas de Gratidão',
  99.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3822581
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-16',
  'receita',
  'Luiz dos Santos',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824951
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-16',
  'receita',
  'Luiz dos Santos',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824944
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-16',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824936
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-17',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824968
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-17',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824965
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-18',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824977
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-18',
  'receita',
  'Luiz dos Santos',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824974
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-19',
  'receita',
  'Barbara Cristina da Silva Alves',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_568529',
  '2024-12',
  3822634
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-19',
  'receita',
  'Barbara Cristina da Silva Alves',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2024-12',
  3822618
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-19',
  'receita',
  'Ofertas de Gratidão',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3822666
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-19',
  'receita',
  'Barbara Cristina da Silva Alves',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2024-12',
  3822614
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-19',
  'receita',
  'Barbara Cristina da Silva Alves',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_568529',
  '2024-12',
  3822601
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-19',
  'receita',
  'Luiz dos Santos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824984
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-19',
  'receita',
  'Luiz dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824981
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-19',
  'receita',
  'Alexsandra Ferreira da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2024-12',
  3822649
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-19',
  'receita',
  'Barbara Cristina da Silva Alves',
  128.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2024-12',
  3822597
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-19',
  'receita',
  'Barbara Cristina da Silva Alves',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2024-12',
  3822594
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-20',
  'receita',
  'Nikole Giovanna Gonçalo Pererira',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-12',
  3825107
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-20',
  'receita',
  'Luiz dos Santos',
  10.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824989
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-21',
  'despesa',
  'Material de limpeza',
  26.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  5838593
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'despesa',
  'Compra de água.',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46947),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3785404
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'despesa',
  'Compras de rolo de tinta.',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46407),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3785405
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Klebson Alves da SIlva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822747
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Sueli Lourenço da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2024-12',
  3822798
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Klebson Alves da SIlva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822746
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Sueli Lourenço da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-12',
  3822796
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Klebson Alves da SIlva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822728
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Ofertas de Gratidão',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3822806
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-12',
  3822794
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Klebson Alves da SIlva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822723
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Sueli Lourenço da Silva',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2024-12',
  3822780
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Klebson Alves da SIlva',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822719
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Anderson Davi Ferreira da SIlva',
  139.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-12',
  3822803
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Sueli Lourenço da Silva',
  140.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-12',
  3822778
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Klebson Alves da SIlva',
  132.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822717
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Sueli Lourenço da Silva',
  49.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-12',
  3822764
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-22',
  'receita',
  'Klebson Alves da SIlva',
  46.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822715
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-23',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3825006
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-23',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3825003
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-23',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824998
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-23',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3824994
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-24',
  'receita',
  'Damiana Lourenço',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2024-12',
  3825148
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-24',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3825014
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-24',
  'receita',
  'Luiz dos Santos',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3825012
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-24',
  'receita',
  'Luiz dos Santos',
  8.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3825009
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3803557
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Klebson Alves da Silva',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3803555
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Klebson Alves da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3803607
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Jones da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3825136
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Kaique Zacarias de Morais',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269292',
  '2024-12',
  3825129
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Luciene da Conceição',
  1.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3825123
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Ageilda Gonçalo da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2024-12',
  3825121
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Thatiane',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3825117
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Hadiclenes',
  26.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3825114
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822821
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Ofertas de Gratidão',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3803605
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Klebson Alves da Silva',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3803552
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Luiz dos Santos',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3825017
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Shirley Lopes Ferreira',
  286.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-12',
  3803596
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Klebson Alves da Silva',
  109.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3803549
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Primícias',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3822934
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-26',
  'receita',
  'Klebson Alves da Silva',
  38.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3803547
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-27',
  'receita',
  'Luiz dos Santos',
  130.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3825020
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-27',
  'receita',
  'Luiz dos Santos',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3825019
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-29',
  'despesa',
  'compra de azeite para a confecção dos pães.',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 65331),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3803591
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-29',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3803659
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-29',
  'receita',
  'Klebson Alves da Silva',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3803656
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-29',
  'receita',
  'Klebson Alves da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3803654
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-29',
  'receita',
  'Klebson Alves da SIlva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3822858
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-29',
  'receita',
  'Luana Raysa',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3822842
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-29',
  'receita',
  'Ofertas de Gratidão',
  87.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3803661
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-29',
  'receita',
  'Klebson Alves da Silva',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3803649
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-29',
  'receita',
  'Klebson Alves da Silva',
  83.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3803645
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-29',
  'receita',
  'Luana Raysa',
  125.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_199060',
  '2024-12',
  3803639
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-29',
  'receita',
  'Klebson Alves da Silva',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-12',
  3803642
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-30',
  'receita',
  'Marciano Laurentino',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3825155
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-30',
  'receita',
  'Jackciel Laurentino',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2024-12',
  3825141
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-30',
  'receita',
  'Ailton de Morais',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3825139
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'despesa',
  'Tributos do apóstolo Moises',
  2447.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  4261004
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Ailton de Morais Araujo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3827299
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Ailton de Morais Araujo',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3827297
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Ailton de Morais Araujo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3827295
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Ofertas de Gratidão',
  95.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3827305
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Ailton de Morais Araujo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3827294
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Sandriele Aires',
  16.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3825161
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Marciano Laurentino',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-12',
  3825156
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Quiteria Alves',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_703622',
  '2024-12',
  3825152
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Ailton de Morais Araujo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3827292
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Shirley Lopes Ferreira',
  424.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-12',
  3827303
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Anderson Davi Ferreira da Silva',
  257.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-12',
  3827300
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Ailton de Morais Araujo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3827291
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'José Cicero Ferreira',
  141.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-12',
  3827287
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Lucas Vinício Barboza da Silva',
  170.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2024-12',
  3827286
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-12',
  3825227
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-12-31',
  'receita',
  'Ailton de Morais Araujo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-12',
  3827290
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-01',
  'despesa',
  'Compra de Cadeiras para Igreja (5/10)',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  3523221
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-02',
  'receita',
  'Ofertas de Gratidão',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  3835286
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-02',
  'receita',
  'Luiz dos Santos',
  29.9,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956687
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-02',
  'receita',
  'Luiz dos Santos',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956686
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-02',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  69.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568371',
  '2025-01',
  3835274
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-02',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-01',
  3835278
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-02',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568371',
  '2025-01',
  3835269
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-03',
  'receita',
  'Luiz dos Santos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956689
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'despesa',
  'Pagamento do enuves.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  5952087
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'despesa',
  'Ofertas para o profeta José Rubens',
  275.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  5952019
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'despesa',
  'Tributos para o apóstolo.',
  592.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  5952016
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2025-01',
  3950802
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Klebson Alves da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2025-01',
  3950798
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Sueli Lourenço da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2025-01',
  3950765
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-01',
  3950794
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Sueli Lourenço da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-01',
  3950763
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Ofertas de Gratidão',
  105.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  3950815
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-01',
  3950791
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-01',
  3950762
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Klebson Alves da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2025-01',
  3950787
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Sueli Lourenço da Silva',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2025-01',
  3950761
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Klebson Alves da Silva',
  47.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-01',
  3950781
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-01',
  3950777
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Alicia Regina da Silva',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-01',
  3950772
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Sueli Lourenço da Silva',
  140.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-01',
  3950759
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Klebson Alves da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-01',
  3950780
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-05',
  'receita',
  'Sueli Lourenço da Silva',
  49.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-01',
  3950756
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-06',
  'receita',
  'Daiane da Silva Costa Laurentino',
  10.11,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_278189',
  '2025-01',
  3961157
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-06',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-01',
  3961152
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-06',
  'receita',
  'Ageilda Gonçalo da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-01',
  3961145
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-06',
  'receita',
  'Jadson de Lima Moura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_169659',
  '2025-01',
  3961136
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-06',
  'receita',
  'Maria Clara de Zacarias Morais',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270276',
  '2025-01',
  3961132
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-06',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2025-01',
  3961125
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-06',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956701
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-06',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956697
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-06',
  'receita',
  'Luiz dos Santos',
  4.7,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956695
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-06',
  'receita',
  'Luiz dos Santos',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956692
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-06',
  'receita',
  'Luiz dos Santos',
  27.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956691
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-07',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956708
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-07',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956702
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-08',
  'despesa',
  'Fatura de energia da casa pastoral',
  179.1,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  5838586
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-08',
  'receita',
  'Barbara Cristina da Silva Alves',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_568529',
  '2025-01',
  3913444
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-08',
  'receita',
  'Barbara Cristina da Silva Alves',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2025-01',
  3913443
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-08',
  'receita',
  'Barbara Cristina da Silva Alves',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2025-01',
  3950149
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-08',
  'receita',
  'Ofertas de Gratidão',
  42.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  3913450
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-08',
  'receita',
  'Barbara Cristina da Silva Alves',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_568529',
  '2025-01',
  3913442
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-08',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956729
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-08',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956711
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-08',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956710
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-08',
  'receita',
  'Barbara Cristina da Silva Alves',
  128.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2025-01',
  3913441
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-08',
  'receita',
  'Joede S. Viana',
  950.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2025-01',
  3913439
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-08',
  'receita',
  'Barbara Cristina da Silva Alves',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2025-01',
  3913440
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-10',
  'despesa',
  'Multitracks Elite - Mensalidade (2/12)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  4049375
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-10',
  'despesa',
  'Aluguel Casa Pastoral (24/24)',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2025-01',
  4365164
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-10',
  'despesa',
  'Aluguel do Templo (1/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  4049398
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-12',
  'receita',
  'Ofertas de Gratidão',
  57.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  3950178
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-12',
  'receita',
  'Maria José Ferreira de Araújo Silva',
  6.7,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2025-01',
  3913449
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-12',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  193.3,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-01',
  3913448
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-13',
  'receita',
  'Luiz dos Santos',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956732
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-15',
  'receita',
  'Luiz dos Santos',
  61.39,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956739
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-16',
  'despesa',
  'Copos descartáveis',
  8.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46947),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  5838581
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-16',
  'receita',
  'Ofertas de Gratidão',
  74.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  3913454
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-16',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956741
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Naftali da Silva Gomes',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267751',
  '2025-01',
  3913470
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Maele Alves Gomes',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_543270',
  '2025-01',
  3913464
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-01',
  3913475
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Naftali da Silva Gomes',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-01',
  3913469
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Maele Alves Gomes',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-01',
  3913463
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Ofertas de Gratidão',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  3950216
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Naftali da Silva Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-01',
  3950203
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-01',
  3950193
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Naftali da Silva Gomes',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267751',
  '2025-01',
  3913468
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Maele Alves Gomes',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_543270',
  '2025-01',
  3913462
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Josefa Zacarias',
  282.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-01',
  3913480
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-01',
  3913477
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Anderson Davi Ferreira da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-01',
  3913474
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Naftali da Silva Gomes',
  87.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-01',
  3913467
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Maele Alves Gomes',
  42.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-01',
  3913461
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Naftali da Silva Gomes',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-01',
  3913465
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-19',
  'receita',
  'Maele Alves Gomes',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-01',
  3913457
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-20',
  'despesa',
  'José Rubens Bento',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  5838591
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-22',
  'despesa',
  'Material de construção',
  8.15,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46407),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  5838578
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-22',
  'despesa',
  'Material de limpeza',
  303.85,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  5838575
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-22',
  'receita',
  'Josefa Zacarias',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-01',
  3961165
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-23',
  'receita',
  'Maele Alves Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_543270',
  '2025-01',
  3913499
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-23',
  'receita',
  'Naftali da Silva Gomes',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267751',
  '2025-01',
  3913490
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-23',
  'receita',
  'Maele Alves Gomes',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-01',
  3913497
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-23',
  'receita',
  'Naftali da Silva Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-01',
  3913488
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-23',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-01',
  3950382
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-23',
  'receita',
  'Naftali da Silva Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-01',
  3950230
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-23',
  'receita',
  'Ofertas de Gratidão',
  82.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  3913500
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-23',
  'receita',
  'Maele Alves Gomes',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_543270',
  '2025-01',
  3913494
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-23',
  'receita',
  'Naftali da Silva Gomes',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267751',
  '2025-01',
  3913487
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-23',
  'receita',
  'Maele Alves Gomes',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-01',
  3913493
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-23',
  'receita',
  'Nafatli da Silva Gomes',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-01',
  3913485
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-23',
  'receita',
  'Maele Alves Gomes',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-01',
  3913492
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-23',
  'receita',
  'Naftali da Silva Gomes',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-01',
  3913484
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-24',
  'receita',
  'Luiz dos Santos',
  43.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956744
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-26',
  'receita',
  'Ofertas de Gratidão',
  49.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  3950256
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-27',
  'receita',
  'Luiz dos Santos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956751
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-27',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956749
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-27',
  'receita',
  'Luiz dos Santos',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956746
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-28',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956755
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-28',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956753
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-29',
  'receita',
  'Luiz dos Santos',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956764
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-29',
  'receita',
  'Luiz dos Santos',
  105.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956760
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-29',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956757
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-30',
  'receita',
  'Ofertas de Gratidão',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  3950268
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-30',
  'receita',
  'Daiane da Silva Costa Laurentino',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_278189',
  '2025-01',
  3950264
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-31',
  'despesa',
  'Tributos do apóstolo Moises',
  592.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  4261003
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-31',
  'receita',
  'Raquel Camilo',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_186076',
  '2025-01',
  3961188
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-31',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2025-01',
  3961182
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-31',
  'receita',
  'Paulo César',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  3961173
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-31',
  'receita',
  'Ofertas de Gratidão',
  494.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  3950352
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-31',
  'receita',
  'Elaynne Gomes da Silva',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-01',
  3950294
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-31',
  'receita',
  'Anderson Davi Ferreira da Silva',
  26.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-01',
  3950291
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-31',
  'receita',
  'Alicia Regina da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-01',
  3950274
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-01-31',
  'receita',
  'Luiz dos Santos',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-01',
  3956769
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'despesa',
  'Pagamento do enuves.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  5952089
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'despesa',
  'Ofertas para o profeta José Rubens',
  367.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  5952004
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'despesa',
  'Tributos para o apóstolo.',
  687.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  5951995
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2025-02',
  4074013
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2025-02',
  4073944
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Klebson Alves da Silva',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2025-02',
  4074007
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Ailton de Morais Araújo',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2025-02',
  4073943
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Klebson Alves da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-02',
  4074002
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-02',
  4073916
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Ofertas de Gratidão',
  136.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4074040
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Klebson Alves da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-02',
  4073999
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-02',
  4073910
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Klebson Alves da Silva',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2025-02',
  4073995
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Ailton de Morais Araújo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2025-02',
  4073908
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Luiz dos Santos',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4084975
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Klebson Alves da Silva',
  384.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-02',
  4073983
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Alexsandra Ferreira',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2025-02',
  4073974
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-02',
  4073973
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'José Cícero Ferreira',
  151.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2025-02',
  4073966
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Luana Raysa',
  126.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_199060',
  '2025-02',
  4073952
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Ailton de Morais Araújo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-02',
  4073906
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Klebson Alves da Silva',
  133.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-02',
  4073978
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-02',
  'receita',
  'Ailton de Morais Araújo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-02',
  4073898
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-04',
  'receita',
  'Luiz dos Santos',
  16.9,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4084981
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-05',
  'receita',
  'Luiz dos Santos',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4084990
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-05',
  'receita',
  'Luiz dos Santos',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4084985
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-06',
  'despesa',
  'Compra de Cadeiras para Igreja (6/10)',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  3523222
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-06',
  'receita',
  'Maria José Ferreira de Araújo Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-02',
  4074129
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-06',
  'receita',
  'Ofertas de Gratidão',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  3984791
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-06',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4084996
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-06',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4084994
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-06',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  205.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-02',
  4074056
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-06',
  'receita',
  'Anderson Davi Ferreira da Silva',
  284.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-02',
  3984783
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-06',
  'receita',
  'Shirley Lopes Ferreira',
  727.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-02',
  3984773
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-06',
  'receita',
  'Josefa Zacarias Martins',
  255.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-02',
  3984761
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-07',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085003
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2025-02',
  4074340
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'klebson Alves da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2025-02',
  4074325
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'Sueli Lourenço da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2025-02',
  4074247
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-02',
  4074316
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-02',
  4074243
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'Ofertas de Gratidão',
  117.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4074365
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-02',
  4074312
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-02',
  4074164
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'klebson Alves da Silva',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2025-02',
  4074308
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'Sueli Lourenço da Silva',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2025-02',
  4074156
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'klebson Alves da Silva',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-02',
  4074299
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'Sueli Lourenço da Silva',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-02',
  4074154
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'Klebson Alves da Silva',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-02',
  4074289
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'Ageilda Gonçalo da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-02',
  4074278
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-09',
  'receita',
  'Sueli Lourenço da Silva',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-02',
  4074151
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-10',
  'despesa',
  'Multitracks Elite - Mensalidade (3/12)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4049376
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-10',
  'despesa',
  'Aluguel do Templo (2/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4049399
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-10',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085024
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-10',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085020
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-10',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085015
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-13',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-02',
  4074388
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-13',
  'receita',
  'Ofertas de Gratidão',
  66.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4074422
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-13',
  'receita',
  'Larissa da Conceição',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4085387
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-13',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085032
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-13',
  'receita',
  'Luiz dos Santos',
  17.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085029
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-13',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-02',
  4074415
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-14',
  'despesa',
  'Fatura de energia do templo',
  129.55,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  5838564
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-14',
  'despesa',
  'Fatura de energia da casa pastoral',
  165.9,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  5838561
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-14',
  'receita',
  'Luiz dos Santos',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085036
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-15',
  'receita',
  'Luiz dos Santos',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085041
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-16',
  'despesa',
  'DIESEL',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  5838553
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-16',
  'receita',
  'Ofertas de Gratidão',
  109.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4074455
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-16',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-02',
  4074446
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-16',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2025-02',
  4074434
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-17',
  'receita',
  'Luiz dos Santos',
  35.3,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085050
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-19',
  'receita',
  'Luiz dos Santos',
  6.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085058
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-19',
  'receita',
  'Luiz dos Santos',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085055
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Naftali da Silva Gomes',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267751',
  '2025-02',
  4074565
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Maele Alves Gomes',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_543270',
  '2025-02',
  4074515
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Naftali da Silva Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-02',
  4074559
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-02',
  4074503
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Josefa Zacarias',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-02',
  4085423
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Ofertas de Gratidão',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4074583
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Naftali da Silva Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-02',
  4074553
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-02',
  4074495
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Naftali da Silva Gomes',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267751',
  '2025-02',
  4074548
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Maele Alves Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_543270',
  '2025-02',
  4074485
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Naftali da Silva Gomes',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-02',
  4074532
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Maele Alves Gomes',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-02',
  4074477
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Sueli Lourenço da Silva',
  180.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-02',
  4074569
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Naftali da Silva Gomes',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-02',
  4074525
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-20',
  'receita',
  'Maele Alves Gomes',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-02',
  4074467
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-21',
  'receita',
  'Jones',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4085734
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-21',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2025-02',
  4085730
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-21',
  'receita',
  'Ranielle Lima Zacarias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_567724',
  '2025-02',
  4085708
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-21',
  'receita',
  'Nikole Giovanna Gonçalo',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2025-02',
  4074708
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-21',
  'receita',
  'Lucinaldo',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4074700
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-23',
  'receita',
  'Maycon Douglas Lucio de França',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2025-02',
  4085811
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-23',
  'receita',
  'Ranielle Lima Zacarias',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_567724',
  '2025-02',
  4085806
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-23',
  'receita',
  'Ofertas de Gratidão',
  64.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4074604
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-23',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-02',
  4074599
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-25',
  'receita',
  'Luiz dos Santos',
  65.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085069
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-26',
  'receita',
  'Jose Orlean',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4085816
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-26',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085078
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-26',
  'receita',
  'Luiz dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085076
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-27',
  'receita',
  'Vitoria',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4085829
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-27',
  'receita',
  'Ofertas de Gratidão',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4074625
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-27',
  'receita',
  'Luiz dos Santos',
  147.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085083
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-27',
  'receita',
  'Alexsandra Ferreira da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2025-02',
  4074617
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-27',
  'receita',
  'Dayane',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4074612
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-28',
  'despesa',
  'Tributos do apóstolo Moises',
  687.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-02',
  4260979
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-02-28',
  'receita',
  'Luiz dos Santos',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-02',
  4085087
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-01',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215588
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-01',
  'receita',
  'Luiz dos Santos',
  22.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215587
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-01',
  'receita',
  'Luiz dos Santos',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215585
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'despesa',
  'Pagamento do enuves.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  5952090
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'despesa',
  'Ofertas para o profeta José Rubens',
  291.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  5951983
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Thiago Will',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4215792
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2025-03',
  4203090
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Klebson Alves da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2025-03',
  4203023
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Ailton de Morais Araújo',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2025-03',
  4203088
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Sueli Lourenço da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2025-03',
  4203041
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Maria Barbosa de Souza Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270056',
  '2025-03',
  4203030
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Klebson Alves da Silva',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2025-03',
  4203021
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Shiely Lopes Ferreira',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-03',
  4203101
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-03',
  4203083
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-03',
  4203040
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Klebson Alves da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-03',
  4203019
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Isabelly Dayane Cardoso Barreto',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568544',
  '2025-03',
  4232044
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Ofertas de Gratidão',
  116.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4203114
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Shiely Lopes Ferreira',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-03',
  4203097
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-03',
  4203078
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-03',
  4203038
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-03',
  4203016
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Ailton de Morais Araújo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2025-03',
  4203076
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Sueli Lourenço da Silva',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2025-03',
  4203036
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Klebson Alves da Silva',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2025-03',
  4203012
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Shirley Lopes Ferreira',
  410.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-03',
  4203094
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Ailton de Morais Araújo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-03',
  4203075
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2025-03',
  4203065
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Jose Cicero Ferreira',
  151.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2025-03',
  4203058
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Anderson Davi Ferreira da Silva',
  284.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-03',
  4203051
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Sueli Lourenço da Silva',
  151.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-03',
  4203035
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Klebson Alves da Silva',
  119.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-03',
  4203009
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Ailton de Morais Araújo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-03',
  4203069
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Sueli Lourenço da Silva',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-03',
  4203034
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-02',
  'receita',
  'Klebson Alves da Silva',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-03',
  4203004
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-04',
  'receita',
  'Luiz dos Santos',
  20.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215624
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-04',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215592
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-05',
  'receita',
  'Luiz dos Santos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215629
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-06',
  'despesa',
  'Compra de Cadeiras para Igreja (7/10)',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  3523223
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-06',
  'receita',
  'Vitória',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4232052
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-06',
  'receita',
  'Jackciel Laurentino',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170924',
  '2025-03',
  4232049
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-06',
  'receita',
  'Ofertas de Gratidão',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-03',
  4203147
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-06',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-03',
  4203145
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-06',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215634
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-06',
  'receita',
  'Luiz dos Santos',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215633
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-06',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  205.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-03',
  4203144
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-06',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-03',
  4203140
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-06',
  'receita',
  'Ageilda Gonçalo da Silva',
  43.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-03',
  4203139
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-08',
  'despesa',
  'Material de construção',
  69.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46407),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  5838571
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-08',
  'receita',
  'Jose Orleandso',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4215801
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-08',
  'receita',
  'Luiz dos Santos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215638
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-09',
  'receita',
  'Vitória',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4232061
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-09',
  'receita',
  'Larisse da Conceição',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4232060
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-09',
  'receita',
  'Jones da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4232057
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-09',
  'receita',
  'Maria Clara Zacarias de Morais',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270276',
  '2025-03',
  4232055
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-09',
  'receita',
  'Josecleide',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4232054
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-09',
  'receita',
  'Ofertas de Gratidão',
  162.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4203212
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-09',
  'receita',
  'Anderson Davi Ferreira',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-03',
  4203154
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-09',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-03',
  4203208
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-09',
  'receita',
  'Alicia Regina da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-03',
  4203204
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-09',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2025-03',
  4203202
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-09',
  'receita',
  'José Bezerra dos Santos',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-03',
  4203199
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-10',
  'despesa',
  'Multitracks Elite - Mensalidade (4/12)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4049377
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-10',
  'despesa',
  'Fatura de energia do templo',
  129.59,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  5838531
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-10',
  'despesa',
  'Aluguel do Templo (3/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4049400
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-10',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215636
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-11',
  'receita',
  'Tais da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4232064
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-11',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2025-03',
  4215819
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-11',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215643
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-11',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215641
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-12',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215683
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-12',
  'receita',
  'Luiz dos Santos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215680
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-12',
  'receita',
  'Luiz dos Santos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215678
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-12',
  'receita',
  'Luiz dos Santos',
  6.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215669
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-13',
  'despesa',
  'Fatura de energia da casa pastoral',
  180.42,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  5838525
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-13',
  'despesa',
  'Fatura de energia da casa pastoral',
  176.16,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  5838498
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-13',
  'receita',
  'Ofertas de Gratidão',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4203245
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-13',
  'receita',
  'Josefa Zacarias',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-03',
  4203240
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-13',
  'receita',
  'Lucas Vinício Barboza da Silva',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2025-03',
  4203219
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-14',
  'receita',
  'Luiz dos Santos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215690
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-14',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215685
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-15',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215699
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-15',
  'receita',
  'Luiz dos Santos',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215697
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-16',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-03',
  4203251
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-16',
  'receita',
  'Vitória',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4232075
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-16',
  'receita',
  'Ofertas de Gratidão',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4203255
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-19',
  'receita',
  'Luiz dos Santos',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215703
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-20',
  'receita',
  'Ofertas de Gratidão',
  24.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4203265
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-20',
  'receita',
  'José Bezerra dos Santos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-03',
  4203260
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-21',
  'despesa',
  'GAUSS TELECOMUNICACOES LTDA',
  1499.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  5838518
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'Maele Alves Gomes',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_543270',
  '2025-03',
  4203301
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'Naftali da Silva Gomes',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267751',
  '2025-03',
  4203286
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-03',
  4203298
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'Naftali da Silva Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-03',
  4203284
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-03',
  4203273
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'Ofertas de Gratidão',
  176.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4203324
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-03',
  4203295
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'Naftali da Silva Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-03',
  4203281
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'Maele Alves Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_543270',
  '2025-03',
  4203293
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'Naftali da Silva Gomes',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267751',
  '2025-03',
  4203279
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'José Bezerra dos Santos',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-03',
  4203310
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'Maele Alves Gomes',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-03',
  4203291
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'Naftali da Silva Gomes',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-03',
  4203276
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'Maele Alves Gomes',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2025-03',
  4203290
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-23',
  'receita',
  'Naftali da Silva Gomes',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-03',
  4203274
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-24',
  'receita',
  'Jucineide',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4232079
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-24',
  'receita',
  'Luiz dos Santos',
  11.3,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215711
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-24',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215710
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-24',
  'receita',
  'Luiz dos Santos',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215707
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-27',
  'receita',
  'Ofertas de Gratidão',
  63.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4203333
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-27',
  'receita',
  'Luiz dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215714
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-28',
  'receita',
  'Luiz dos Santos',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215720
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-28',
  'receita',
  'Luiz dos Santos',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215717
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-29',
  'receita',
  'Jones da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4232098
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-29',
  'receita',
  'José Henrique',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4232096
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-29',
  'receita',
  'Josenildo Zacarias da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_567732',
  '2025-03',
  4232094
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-29',
  'receita',
  'Ricardo',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4232086
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-29',
  'receita',
  'Artur Romano',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4232083
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-29',
  'receita',
  'Rede de homens',
  138.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4203340
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-29',
  'receita',
  'Alexsandra Ferreira da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2025-03',
  4232091
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-29',
  'receita',
  'Luiz dos Santos',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-03',
  4215725
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-30',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-03',
  4203362
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-30',
  'receita',
  'Josefa Zacarias',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-03',
  4232100
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-30',
  'receita',
  'Ofertas de Gratidão',
  78.3,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4203366
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-30',
  'receita',
  'José Bezerra dos Santos',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-03',
  4203358
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-03-31',
  'despesa',
  'Tributos do apóstolo Moises',
  656.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-03',
  4260960
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-02',
  'receita',
  'Luiz dos Santos',
  47.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-04',
  4348761
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2025-04',
  4339852
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Jose Cicero Ferreira',
  0.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267878',
  '2025-04',
  4339861
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2025-04',
  4339849
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Sueli Lourenço da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2025-04',
  4339813
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Klebson Alves da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-04',
  4339845
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-04',
  4339798
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Debora Caetano',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348855
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Larisse da Conceição',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348852
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Ofertas de Gratidão',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4339905
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Shirley Lopes Ferreira',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-04',
  4339870
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-04',
  4339843
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-04',
  4339796
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Klebson Alves da Silva',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2025-04',
  4339840
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'José Bezerra dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: CNTT_218789',
  '2025-04',
  4339823
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Sueli Lourenço da Silva',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2025-04',
  4339793
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Luiz dos Santos',
  68.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-04',
  4348763
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Shirley Lopes Ferreira',
  426.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-04',
  4339868
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Jose Cicero Ferreira',
  151.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2025-04',
  4339858
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Klebson Alves da Silva',
  133.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-04',
  4339835
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Sueli Lourenço da Silva',
  151.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-04',
  4339790
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Klebson Alves da Silva',
  46.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2025-04',
  4339831
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-03',
  'receita',
  'Sueli Lourenço da Silva',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-04',
  4339788
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-04',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-04',
  4348767
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-04',
  'receita',
  'Luiz dos Santos',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-04',
  4348765
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-04',
  'receita',
  'Luiz dos Santos',
  2.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-04',
  4348764
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-05',
  'receita',
  'Luiz dos Santos',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-04',
  4348769
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'despesa',
  'Pagamento do enuves.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  5952092
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'despesa',
  'Ofertas para o profeta José Rubens',
  282.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  5951949
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'despesa',
  'Pagamento  do sistema enuves.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4205082
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'despesa',
  'Desp. referente ao pagamento das cadeiras.',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4205075
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'despesa',
  'Compra de Cadeiras para Igreja (8/10)',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  3523224
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'despesa',
  'Alimentação / Consumo Geral',
  23.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46947),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4205088
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'despesa',
  'Tributos para o apóstolo.',
  660.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  5951944
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2025-04',
  4339740
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Ailton de Morais Araújo',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2025-04',
  4339737
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Ailton de Morais Araújo',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-04',
  4339733
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-04',
  4339689
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Josecleide',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348889
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Larisse da Conceição',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348888
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Maria Clara Zacarias de Morais',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270276',
  '2025-04',
  4348886
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Vitoria',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348885
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Jadson Moura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_707722',
  '2025-04',
  4348864
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Ofertas de Gratidão',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348770
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Ofertas de Gratidão',
  219.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4339784
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-04',
  4339729
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Ailton de Morais Araújo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2025-04',
  4339725
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Alicia Regina da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-04',
  4348878
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Ailton de Morais Araújo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-04',
  4339722
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'José Bezerra dos Santos',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-04',
  4339711
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Lucas Vinício Barboza da Silva',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2025-04',
  4339704
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-04',
  4339687
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Maria Barboza de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2025-04',
  4339658
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  202.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-04',
  4339651
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2025-04',
  4339646
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Anderson Davi Ferreira da Silva',
  284.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-04',
  4339640
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-06',
  'receita',
  'Ailton de Morais Araújo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-04',
  4339719
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-09',
  'receita',
  'Vania Maria',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348775
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-10',
  'despesa',
  'Multitracks Elite - Mensalidade (5/12)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4049378
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-10',
  'despesa',
  'Aluguel do Templo (4/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4049401
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-10',
  'receita',
  'Larisse da Conceição',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348892
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-10',
  'receita',
  'Ofertas de Gratidão',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4339914
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-10',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-04',
  4348779
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-10',
  'receita',
  'Josefa Zacarias',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-04',
  4339912
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-11',
  'receita',
  'Ofertas de Gratidão',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348782
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-12',
  'receita',
  'Ofertas de Gratidão',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348788
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-12',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-04',
  4348785
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-13',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-04',
  4348897
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-13',
  'receita',
  'Ofertas de Gratidão',
  99.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4339933
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-13',
  'receita',
  'José Bezerra dos Santos',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-04',
  4348899
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-13',
  'receita',
  'José Bezerra dos Santos',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-04',
  4339921
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-14',
  'despesa',
  'Fatura de energia do templo',
  100.52,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  5838490
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-16',
  'receita',
  'Ofertas de Gratidão',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348792
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-17',
  'receita',
  'Larisse da Conceição',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4349421
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-17',
  'receita',
  'Vania Maria',
  38.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348798
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-17',
  'receita',
  'Ofertas de Gratidão',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4339947
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-17',
  'receita',
  'Joede da Silva Viana',
  600.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2025-04',
  4339943
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-17',
  'receita',
  'José Bezerra dos Santos',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-04',
  4339937
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-20',
  'receita',
  'Jakciel Laurentino',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2025-04',
  4348921
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-20',
  'receita',
  'Vitoria',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348917
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-20',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2025-04',
  4348915
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-20',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-04',
  4348910
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-20',
  'receita',
  'Ofertas de Gratidão',
  111.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4339989
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-20',
  'receita',
  'Jandersson Ferreira Barros',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2025-04',
  4339984
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-20',
  'receita',
  'José Bezerra dos Santos',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-04',
  4339964
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-22',
  'receita',
  'Jaudijane Zacarias',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348923
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-24',
  'receita',
  'Jakciel Laurentino',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2025-04',
  4348985
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-24',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2025-04',
  4348930
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-24',
  'receita',
  'Raquel Camilo',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348926
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-24',
  'receita',
  'Sandra Maria',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348924
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-24',
  'receita',
  'Ofertas de Gratidão',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4340018
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-24',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-04',
  4340006
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-24',
  'receita',
  'Ageilda Gonçalo da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-04',
  4340003
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-25',
  'receita',
  'Raquel Camilo',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348933
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-26',
  'receita',
  'Vania Maria',
  106.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348807
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-27',
  'receita',
  'Josefa Zacarias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-04',
  4348939
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-27',
  'receita',
  'Ofertas de Gratidão',
  88.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4340025
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-28',
  'receita',
  'Vania Maria',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348812
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-04-29',
  'receita',
  'Vania Maria',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-04',
  4348816
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-01',
  'receita',
  'Jadson de Lima Moura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: CNTT_169659',
  '2025-05',
  4449443
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-01',
  'receita',
  'Vania Maria',
  110.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4450008
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-01',
  'receita',
  'Ofertas de Gratidão',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4449446
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-01',
  'receita',
  'Damiana Lourenço da Silva',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_230831',
  '2025-05',
  4449445
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-03',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450026
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-03',
  'receita',
  'Luiz dos Santos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450017
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-03',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450012
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'despesa',
  'Pagamento do enuves.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  5952093
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'despesa',
  'Ofertas para o profeta José Rubens',
  268.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  5951935
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'despesa',
  'Tributos para o apóstolo.',
  736.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  5951927
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2025-05',
  4449634
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Sueli Lourenço da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2025-05',
  4449662
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Ailton de Morais Araújo',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2025-05',
  4449631
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-05',
  4449660
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-05',
  4449628
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Ofertas de Gratidão',
  144.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4449670
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-05',
  4449658
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-05',
  4449625
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Sueli Lourenço da Silva',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2025-05',
  4449654
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Ailton de Morais Araújo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2025-05',
  4449624
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Sueli Lourenço da Silva',
  146.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-05',
  4449647
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Ailton de Morais Araújo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-05',
  4449622
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Lucas Vinício Barboza da Silva',
  140.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2025-05',
  4449607
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'José Bezerra dos Santos',
  136.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-05',
  4449598
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Shirley Lopes Ferreira',
  445.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-05',
  4449595
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-05',
  4449581
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-05',
  4449575
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Anderson Davi Ferreira da Silva',
  284.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-05',
  4449567
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Jose Cicero Ferreira',
  151.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2025-05',
  4449559
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Sueli Lourenço da Silva',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-05',
  4449639
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-04',
  'receita',
  'Ailton de Morais Araújo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-05',
  4449619
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-05',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450020
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-06',
  'despesa',
  'Compra de Cadeiras para Igreja (9/10)',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  3523225
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-06',
  'receita',
  'Josimar Muniz',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4450189
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-06',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450031
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-07',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450039
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-07',
  'receita',
  'Luiz dos Santos',
  20.4,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450035
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-08',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-05',
  4450150
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-08',
  'receita',
  'Josefa Zacarias',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-05',
  4450157
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-08',
  'receita',
  'Ofertas de Gratidão',
  38.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-05',
  4449492
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-08',
  'receita',
  'Maria José Ferrreira de Araujo Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-05',
  4449475
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-08',
  'receita',
  'José Bezerra dos Santos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-05',
  4449468
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-08',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2025-05',
  4449461
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-08',
  'receita',
  'Maria José Ferrreira de Araujo Silva',
  564.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-05',
  4449474
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-10',
  'despesa',
  'Multitracks Elite - Mensalidade (6/12)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4049379
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-10',
  'despesa',
  'Aluguel do Templo (5/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4049402
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-10',
  'receita',
  'Luiz dos Santos',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450054
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-11',
  'receita',
  'Ofertas de Gratidão',
  69.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4449504
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-11',
  'receita',
  'Damiana Lourenço da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_230831',
  '2025-05',
  4449500
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-11',
  'receita',
  'Josefa Zacarias',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-05',
  4449497
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-15',
  'receita',
  'Ofertas de Gratidão',
  37.75,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4449517
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-15',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2025-05',
  4449512
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-18',
  'receita',
  'Anderson Davi Ferreira da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-05',
  4450195
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-18',
  'receita',
  'Ofertas de Gratidão',
  107.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4449543
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-18',
  'receita',
  'Joede da Silva Viana',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2025-05',
  4449537
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-19',
  'despesa',
  'Fatura de energia da casa pastoral',
  175.75,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  5838501
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-19',
  'despesa',
  'Fatura de energia do templo',
  124.35,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  5838495
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-19',
  'receita',
  'Janaina Batista',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4450161
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-21',
  'receita',
  'Luiz dos Santos',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450059
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-22',
  'receita',
  'Ofertas de Gratidão',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4449528
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-22',
  'receita',
  'Jakciel Laurentino',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2025-05',
  4450172
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-22',
  'receita',
  'Jaudijane',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4450165
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-22',
  'receita',
  'Luiz dos Santos',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450068
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-23',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450076
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-25',
  'despesa',
  'Material de limpeza',
  165.29,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  5838511
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-25',
  'receita',
  'Ofertas de Gratidão',
  112.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4449757
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-25',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-05',
  4449743
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-28',
  'receita',
  'Luiz dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450078
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-29',
  'receita',
  'Ofertas de Gratidão',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4449725
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-29',
  'receita',
  'Luiz dos Santos',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450081
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-29',
  'receita',
  'Alicia Regina da Silva',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-05',
  4449706
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-30',
  'receita',
  'Ofertas de Gratidão',
  26.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4449691
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-30',
  'receita',
  'Alicia Regina da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-05',
  4449683
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-30',
  'receita',
  'Jadosn de Lima Moura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_169659',
  '2025-05',
  4449678
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-30',
  'receita',
  'Luiz dos Santos',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450093
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-30',
  'receita',
  'Luiz dos Santos',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450090
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-30',
  'receita',
  'Luiz dos Santos',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-05',
  4450085
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-05-30',
  'receita',
  'Elaynne',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-05',
  4449674
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'despesa',
  'Pagamento do enuves.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  5952094
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2025-06',
  4545835
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Sueli Lourenço da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2025-06',
  4545844
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Ailton de Morais Araújo',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2025-06',
  4545834
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-06',
  4545842
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-06',
  4545832
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Sandriele Aires',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4566007
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Ofertas de Gratidão',
  156.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2025-06',
  4545851
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-06',
  4545841
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-06',
  4545831
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Sueli Lourenço da Silva',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2025-06',
  4545840
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Ailton de Morais Araújo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2025-06',
  4545828
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565915
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Luiz dos Santos',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565900
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Alexsandra Ferreira da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2025-06',
  4545846
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Sueli Lourenço da Silva',
  147.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-06',
  4545839
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Ailton de Morais Araújo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-06',
  4545827
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Damiana Lourenço da Silva',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_230831',
  '2025-06',
  4545824
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Alexasandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-06',
  4545822
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Sueli Lourenço da Silva',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-06',
  4545837
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-01',
  'receita',
  'Ailton de Morais Araújo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-06',
  4545826
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-02',
  'receita',
  'Isabelly Dayane Cardoso Barreto',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568544',
  '2025-06',
  4565994
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-02',
  'receita',
  'Luiz dos Santos',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565905
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-03',
  'receita',
  'Luiz dos Santos',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565918
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-05',
  'receita',
  'Sueli Lourenço da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2025-06',
  4545870
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-05',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-06',
  4545868
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-05',
  'receita',
  'Ofertas de Gratidão',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4545881
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-05',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-06',
  4545866
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-05',
  'receita',
  'Sueli Lourenço da Silva',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2025-06',
  4545863
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-05',
  'receita',
  'José Cicero Ferreira',
  151.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2025-06',
  4545879
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-05',
  'receita',
  'Shirley Lopes Ferreira',
  446.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-06',
  4545876
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-05',
  'receita',
  'Anderson Davi Ferreira da Silva',
  315.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-06',
  4545872
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-05',
  'receita',
  'Sueli Lourenço da Silva',
  147.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-06',
  4545859
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-05',
  'receita',
  'Sueli Lourenço da Silva',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-06',
  4545857
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-06',
  'despesa',
  'Compra de Cadeiras para Igreja (10/10)',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  3523226
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-07',
  'receita',
  'Luiz dos Santos',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565924
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-07',
  'receita',
  'Luiz dos Santos',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565920
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-08',
  'despesa',
  'Ofertas para o profeta José Rubens',
  305.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  5951920
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-08',
  'despesa',
  'Tributos para o apóstolo.',
  758.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  5951913
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-08',
  'receita',
  'Jakciel Laurentino',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2025-06',
  4566009
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-08',
  'receita',
  'Ofertas de Gratidão',
  108.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4545896
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-08',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2025-06',
  4545893
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-08',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-06',
  4545892
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-08',
  'receita',
  'Luiz dos Santos',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565925
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-08',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  330.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-06',
  4545890
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-08',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-06',
  4545887
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-08',
  'receita',
  'José Bezerra dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-06',
  4545886
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-08',
  'receita',
  'Josefa Zacarias',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-06',
  4545884
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-09',
  'receita',
  'Luiz dos Santos',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565927
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-09',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565921
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-10',
  'despesa',
  'Multitracks Elite - Mensalidade (7/12)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4049380
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-10',
  'despesa',
  'Fatura de energia da casa pastoral',
  198.28,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  5838486
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-10',
  'despesa',
  'Aluguel do Templo (6/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4049403
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-11',
  'receita',
  'Luiz dos Santos',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565930
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-11',
  'receita',
  'Luiz dos Santos',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565929
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-12',
  'receita',
  'Ofertas de Gratidão',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4545907
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-12',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-06',
  4545902
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-12',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2025-06',
  4545898
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-12',
  'receita',
  'Ageilda Gonçalo da Silva',
  38.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-06',
  4545901
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-13',
  'receita',
  'Vania Maria',
  43.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565952
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-13',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565943
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-13',
  'receita',
  'Luiz dos Santos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565939
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-13',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565936
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-15',
  'receita',
  'Noemy Ferreira da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565203',
  '2025-06',
  4545914
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-15',
  'receita',
  'Josefa Zacarias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-06',
  4566078
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-15',
  'receita',
  'Ailton de Morais Araújo',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-06',
  4566042
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-15',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-06',
  4566030
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-15',
  'receita',
  'Ofertas de Gratidão',
  146.3,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4545926
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-15',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-06',
  4545912
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-15',
  'receita',
  'Joede da Silva Viana',
  620.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2025-06',
  4545910
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-17',
  'receita',
  'Vania Maria',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565961
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-17',
  'receita',
  'Vania Maria',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565956
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-19',
  'receita',
  'Ofertas de Gratidão',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4545940
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-19',
  'receita',
  'Larisse',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4545936
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-19',
  'receita',
  'Laisa',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4545934
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-19',
  'receita',
  'Anderson Davi Ferreira da Silva',
  152.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-06',
  4545931
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-19',
  'receita',
  'Shirley Lopes Ferreira',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-06',
  4545929
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-20',
  'receita',
  'Vania Maria',
  0.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565967
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-20',
  'receita',
  'Vania Maria',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565965
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-20',
  'receita',
  'Vania Maria',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565964
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-22',
  'receita',
  'Ofertas de Gratidão',
  123.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4545969
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-22',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-06',
  4545950
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-22',
  'receita',
  'Raquel',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4545946
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-22',
  'receita',
  'Larisse',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4545942
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-22',
  'receita',
  'Jucineide Terto da Silva',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-06',
  4545965
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-22',
  'receita',
  'Josinaldo Bernardo da Silva',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-06',
  4545963
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-22',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-06',
  4545956
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-22',
  'receita',
  'Primícias',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4545988
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-23',
  'receita',
  'Vania Maria',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565968
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-26',
  'receita',
  'Ofertas de Gratidão',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4557501
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-26',
  'receita',
  'Vania Maria',
  141.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565979
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-26',
  'receita',
  'Vania Maria',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565977
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-26',
  'receita',
  'Vania Maria',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565975
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-26',
  'receita',
  'Vania Maria',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565973
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-26',
  'receita',
  'Damiana Lourenço da Silva',
  87.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_230831',
  '2025-06',
  4557497
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-27',
  'receita',
  'Vania Maria',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565983
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-27',
  'receita',
  'Vania Maria',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565980
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-28',
  'receita',
  'Vania Maria',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565985
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-29',
  'receita',
  'Ofertas de Gratidão',
  92.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4557529
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-29',
  'receita',
  'Lucas Vinício Barboza da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2025-06',
  4557524
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-29',
  'receita',
  'Ofertas de Gratidão',
  81.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-06',
  4557504
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-29',
  'receita',
  'Alicia Regina da Silva',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-06',
  4557519
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-29',
  'receita',
  'Alexsandra Ferreira da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2025-06',
  4557511
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-29',
  'receita',
  'Josinaldo Bernardo da Silva',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-06',
  4557506
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-06-30',
  'receita',
  'Vania Maria',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-06',
  4565987
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-02',
  'receita',
  'José Thaylan',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684941
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-03',
  'despesa',
  'Parafusos',
  5.9,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46407),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  5838483
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-03',
  'receita',
  'Sueli Lourenço da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-07',
  4684391
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-03',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-07',
  4684388
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-03',
  'receita',
  'Ofertas de Gratidão',
  84.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684394
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-03',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-07',
  4684387
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-03',
  'receita',
  'Sueli Lourenço da Silva',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-07',
  4684386
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-03',
  'receita',
  'Luiz dos Santos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4684943
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-03',
  'receita',
  'Sueli Lourenço da Silva',
  147.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-07',
  4684385
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-03',
  'receita',
  'Shirley Lopes Ferreira',
  441.4,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-07',
  4684380
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-03',
  'receita',
  'Sueli Lourenço da Silva',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-07',
  4684381
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-05',
  'receita',
  'Luiz dos Santos',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4684946
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'despesa',
  'Pagamento do enuves.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  5952095
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'despesa',
  'Ofertas para o profeta José Rubens',
  278.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  5951899
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'despesa',
  'Tributos para o apóstolo.',
  888.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  5951893
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2025-07',
  4684420
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Ailton de Morais Araújo',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2025-07',
  4684416
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Tauanny da Silva Bezerra',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_703186',
  '2025-07',
  4684455
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-07',
  4684413
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2025-07',
  4685145
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Willian Cordeiro',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4685142
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Ofertas de Gratidão',
  103.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684497
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Jucineide Terto da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-07',
  4684475
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Damiana Lourenço da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_230831',
  '2025-07',
  4684459
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-07',
  4684442
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-07',
  4684411
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Ailton de Morais Araújo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2025-07',
  4684409
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Jucineide Terto da Silva',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-07',
  4684470
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Josinaldo Bernardo da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-07',
  4684445
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  203.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-07',
  4684440
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Jose Cicero Ferreira',
  151.18,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2025-07',
  4684429
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-07',
  4684427
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Anderson Davi Ferreira da Silva',
  360.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-07',
  4684425
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Ailton de Morais Araújo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-07',
  4684406
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-06',
  'receita',
  'Ailton de Morais Araújo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-07',
  4684405
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-09',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4684955
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-09',
  'receita',
  'Luiz dos Santos',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4684951
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-10',
  'despesa',
  'Multitracks Elite - Mensalidade (8/12)',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4049381
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-10',
  'despesa',
  'Aluguel do Templo (7/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4049404
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-10',
  'receita',
  'Arielly Airs da Silva Fideles',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269731',
  '2025-07',
  4685151
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-10',
  'receita',
  'Luiz dos Santos',
  5.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4684956
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-10',
  'receita',
  'Ofertas de Gratidão',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684581
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-10',
  'receita',
  'Joede da Silva Viana',
  750.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2025-07',
  4684572
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-10',
  'receita',
  'Lindinalva da Silva Viana',
  1410.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684560
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-10',
  'receita',
  'Josefa Zacarias',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-07',
  4684548
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-13',
  'receita',
  'Ofertas de Gratidão',
  110.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684660
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-13',
  'receita',
  'Tauanny da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_703186',
  '2025-07',
  4684654
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-13',
  'receita',
  'Damiana Lourenço da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_230831',
  '2025-07',
  4684641
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-13',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-07',
  4684648
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-17',
  'despesa',
  'Fatura de energia da casa pastoral',
  107.77,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  5838478
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-17',
  'despesa',
  'Fatura de energia da casa pastoral',
  170.58,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  5838471
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-17',
  'receita',
  'Ofertas de Gratidão',
  49.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684673
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-17',
  'receita',
  'Juniceide Terto da Silva',
  182.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-07',
  4684665
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-18',
  'receita',
  'Luiz dos Santos',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4685039
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-19',
  'receita',
  'Luiz dos Santos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4685060
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-19',
  'receita',
  'Luiz dos Santos',
  23.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4685052
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-20',
  'receita',
  'Ofertas de Gratidão',
  83.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684800
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-20',
  'receita',
  'Maria Barbosa de Souza Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2025-07',
  4684695
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-20',
  'receita',
  'Jucineide Terto da Silva',
  62.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-07',
  4684701
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-20',
  'receita',
  'Josinaldo Bernardo da Silva',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-07',
  4684699
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-20',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2025-07',
  4684688
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-20',
  'receita',
  'José Bezerra dos Santos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-07',
  4684682
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-21',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4685072
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-22',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4685074
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-23',
  'receita',
  'Luiz dos Santos',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4685078
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-24',
  'receita',
  'Ofertas de Gratidão',
  74.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684709
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-24',
  'receita',
  'Anônimo',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684706
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-26',
  'receita',
  'Anônimo',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684713
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-26',
  'receita',
  'João Paulo',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4685159
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-26',
  'receita',
  'Antônio Alves',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4685156
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-26',
  'receita',
  'Ofertas de Gratidão',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684716
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-26',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4685085
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-27',
  'receita',
  'Josefa Zacarias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-07',
  4685168
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-27',
  'receita',
  'Lucas Vinício Barboza da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2025-07',
  4685163
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-27',
  'receita',
  'Ofertas de Gratidão',
  62.65,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684725
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-27',
  'receita',
  'Anônimo',
  135.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684722
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-27',
  'receita',
  'Anônimo',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684720
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-29',
  'receita',
  'Luiz dos Santos',
  64.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4685100
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-29',
  'receita',
  'Luiz dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4685094
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-31',
  'receita',
  'Auriana Viana de Oliveira',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267717',
  '2025-07',
  4691978
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-31',
  'receita',
  'Josefa Zacarias',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-07',
  4685236
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-31',
  'receita',
  'Ofertas de Gratidão',
  99.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-07',
  4684770
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-31',
  'receita',
  'Luiz dos Santos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4685113
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-31',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4685107
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-31',
  'receita',
  'Luiz dos Santos',
  146.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-07',
  4685105
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-07-31',
  'receita',
  'Alicicia Regina da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-07',
  4684762
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-01',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812130
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-01',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812128
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-02',
  'receita',
  'Luiz dos Santos',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812133
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'despesa',
  'Pagamento do enuves.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  5952096
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Sueli Lourenço da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2025-08',
  4811951
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-08',
  4811946
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Josefa Zacarias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-08',
  4812265
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Jakciel Laurentino',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2025-08',
  4812263
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Shirley Lopes Ferreira',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-08',
  4812247
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Josefa Zacarias',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-08',
  4812242
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-08',
  4812239
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Ofertas de Gratidão',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4811956
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-08',
  4811941
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Luiz dos Santos',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4811927
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Sueli Lourenço da Silva',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2025-08',
  4811938
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Luiz dos Santos',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4813946
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'José Bezerra dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-08',
  4812104
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Sueli Lourenço da Silva',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-08',
  4811936
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Josinaldo Bernardo da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-08',
  4811930
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Shirley Lopes Ferreira',
  420.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-08',
  4811922
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Ailton de Morais Araújo',
  310.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-08',
  4811919
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Anderson Davi Ferreira da Silva',
  313.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-08',
  4811904
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Alexsandra Ferreira da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2025-08',
  4811902
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-03',
  'receita',
  'Sueli Lourenço da Silva',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-08',
  4811934
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-04',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812140
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-04',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812137
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-07',
  'receita',
  'Josefa Zacarias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-08',
  4812273
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-07',
  'receita',
  'Ofertas de Gratidão',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4811967
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-07',
  'receita',
  'Luiz dos Santos',
  6.7,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812164
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-07',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812161
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-07',
  'receita',
  'Primícias',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4811963
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-09',
  'receita',
  'Luiz dos Santos',
  13.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812170
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-09',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812166
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-10',
  'despesa',
  'Ofertas para o profeta José Rubens',
  227.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  5951877
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-10',
  'despesa',
  'Multitracks Elite - Mensalidade (9/12)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4049382
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-10',
  'despesa',
  'Tributos para o apóstolo',
  719.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  5951868
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-10',
  'despesa',
  'Aluguel do Templo (8/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4049405
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-10',
  'receita',
  'Ofertas de Gratidão',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4811989
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-10',
  'receita',
  'Noemy Ferreira da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565203',
  '2025-08',
  4811981
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-10',
  'receita',
  'Jucineide Terto da Silva',
  185.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-08',
  4811983
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-10',
  'receita',
  'José Bezerra dos Santos',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-08',
  4811975
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-10',
  'receita',
  'Jaudijane Martins Viana',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4811973
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-11',
  'receita',
  'Luiz dos Santos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812180
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-12',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812182
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-14',
  'despesa',
  'Fatura de energia da casa pastoral',
  197.74,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  5838468
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-14',
  'despesa',
  'Fatura de energia do templo',
  122.82,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  5838463
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-14',
  'receita',
  'Ofertas de Gratidão',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4811997
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-14',
  'receita',
  'Luiz dos Santos',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812185
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-14',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-08',
  4811994
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-14',
  'receita',
  'Ageilda Gonçalo da Silva',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-08',
  4811992
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-17',
  'receita',
  'Lucas Vinício Barboza da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2025-08',
  4812277
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-17',
  'receita',
  'Ofertas de Gratidão',
  213.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-08',
  4812016
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-17',
  'receita',
  'Jaudijane Martins Viana',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4812281
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-17',
  'receita',
  'josé Bezerra dos Santos',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-08',
  4812012
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-17',
  'receita',
  'Josinaldo Bernardo da Silva',
  72.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-08',
  4812007
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-21',
  'receita',
  'Ofertas de Gratidão',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4812041
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-21',
  'receita',
  'Jose cicero Ferreira',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2025-08',
  4812022
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-21',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-08',
  4812031
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-21',
  'receita',
  'José Bezerra dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-08',
  4812034
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-22',
  'receita',
  'Luiz dos Santos',
  7.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812200
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-22',
  'receita',
  'Luiz dos Santos',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812192
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-23',
  'receita',
  'Luiz dos Santos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812208
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-23',
  'receita',
  'Luiz dos Santos',
  51.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812205
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-24',
  'receita',
  'Jucineide Terto da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-08',
  4812285
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-24',
  'receita',
  'Ofertas de Gratidão',
  104.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4812068
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-24',
  'receita',
  'Raquel Camilo',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_186076',
  '2025-08',
  4812065
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-24',
  'receita',
  'Jaudijane Martins Viana',
  230.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4812067
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-24',
  'receita',
  'José Bezerra dos Santos',
  174.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-08',
  4812063
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-24',
  'receita',
  'Jessica Fernanda Lourenço da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4812060
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-25',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812215
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-25',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812212
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-26',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812221
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-26',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812219
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-26',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812217
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-27',
  'receita',
  'Luiz dos Santos',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812224
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-27',
  'receita',
  'Luiz dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812223
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-28',
  'receita',
  'Ofertas de Gratidão',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4812074
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-28',
  'receita',
  'Luiz dos Santos',
  147.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812229
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-28',
  'receita',
  'Joede da Silva Viana',
  650.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2025-08',
  4812072
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-28',
  'receita',
  'Josefa Zacarias',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-08',
  4812070
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-29',
  'receita',
  'Nicolas Lúcio',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4812295
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-29',
  'receita',
  'Lucas Vinício Barboza da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2025-08',
  4812289
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-29',
  'receita',
  'Rede de Jovens',
  86.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4812078
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-29',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812235
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-29',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-08',
  4812233
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-31',
  'receita',
  'Ofertas de Gratidão',
  82.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-08',
  4812089
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-08-31',
  'receita',
  'Alicia Regina da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-08',
  4812084
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-01',
  'receita',
  'Josenildo Zacarias da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_567732',
  '2025-09',
  4946013
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-01',
  'receita',
  'Maria Clara Zacarias de Morais',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270276',
  '2025-09',
  4946005
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-01',
  'receita',
  'Alicia Regina da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-09',
  4945988
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-04',
  'receita',
  'Sueli Lourenço da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2025-09',
  4945228
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-04',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-09',
  4945226
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-04',
  'receita',
  'Kyara Yasmim',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4946035
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-04',
  'receita',
  'Ofertas de Gratidão',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4945249
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-04',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-09',
  4945225
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-04',
  'receita',
  'Sueli Lourenço da Silva',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2025-09',
  4945221
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-04',
  'receita',
  'Jose Cicero Ferreira',
  152.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2025-09',
  4945242
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-04',
  'receita',
  'Anderson Ferreira da Silva',
  314.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-09',
  4945238
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-04',
  'receita',
  'Ageilda Gonçalo da Silva',
  280.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-09',
  4945235
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-04',
  'receita',
  'Sueli Lourenço da Silva',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-09',
  4945219
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-04',
  'receita',
  'Lucas Vinício Barboza da Silva',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2025-09',
  4945210
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-04',
  'receita',
  'Jucineide Terto da Silva',
  245.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-09',
  4945196
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-04',
  'receita',
  'Ageilda Gonçalo da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-09',
  4945233
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-04',
  'receita',
  'Sueli Lourenço da Silva',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-09',
  4945215
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'despesa',
  'Pagamento  do sistema enuves.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 0),
  NULL,
  '2025-09',
  5952123
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'despesa',
  'Tributos para o apóstolo',
  772.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  5951824
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2025-09',
  4945303
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Ailton de Morais Araújo',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2025-09',
  4945301
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-09',
  4945290
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Sandriele Fideles',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1024192',
  '2025-09',
  4946190
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Ofertas de Gratidão',
  132.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4945337
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-09',
  4945289
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Maria José Ferreira de Arujo Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-09',
  4945266
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Ailton de Morais Araújo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2025-09',
  4945285
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'José Bezerra dos Santos',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-09',
  4945330
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Damiana Lourenço da Silva',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_230831',
  '2025-09',
  4945326
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Jaudijane Martins Viana',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2025-09',
  4945320
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Shirley Lopes Ferreira',
  356.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-09',
  4945307
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Ailton de Morais Araújo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-09',
  4945281
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Maria Barbosa de Sousa Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2025-09',
  4945273
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Maria José Ferreira de Arujo Silva',
  202.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-09',
  4945265
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Josinaldo Bernardo da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-09',
  4945258
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-07',
  'receita',
  'Ailton de Morais Araújo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-09',
  4945278
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-10',
  'despesa',
  'Multitracks Elite - Mensalidade (10/12)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4049383
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-10',
  'despesa',
  'Aluguel do Templo (9/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4049406
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-10',
  'despesa',
  'Material de limpeza',
  172.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  5838436
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-10',
  'receita',
  'Jose Cicero Ferreira',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_267878',
  '2025-09',
  4946192
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-10',
  'receita',
  'Shirley Lopes Ferreira',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-09',
  4946061
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-10',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-09',
  4946049
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-11',
  'despesa',
  'Fatura de energia da casa pastoral',
  168.65,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  5838453
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-11',
  'despesa',
  'Fatura de energia do templo',
  86.91,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  5838447
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-11',
  'receita',
  'Ofertas de Gratidão',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4945378
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-11',
  'receita',
  'Joede da Silva Viana',
  650.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2025-09',
  4945356
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-11',
  'receita',
  'Marina',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4945366
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-11',
  'receita',
  'José Bezerra dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-09',
  4945363
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-13',
  'despesa',
  'Material de limpeza',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  5838430
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-14',
  'despesa',
  'Ofertas para o profeta José Rubens',
  279.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  5951843
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-14',
  'receita',
  'Jackciel Laurentino',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170924',
  '2025-09',
  4946199
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-14',
  'receita',
  'Ofertas de Gratidão',
  102.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4945403
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-14',
  'receita',
  'Larisse',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4945391
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-14',
  'receita',
  'Raquel Camilo',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_186076',
  '2025-09',
  4945386
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-14',
  'receita',
  'José Bezerra dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-09',
  4945396
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-18',
  'receita',
  'Jakciel Laurentino',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2025-09',
  4946810
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-18',
  'receita',
  'Lucas Vinício Barboza da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2025-09',
  4946801
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-18',
  'receita',
  'Ofertas de Gratidão',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4945426
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-18',
  'receita',
  'José Bezerra dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-09',
  4945436
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-19',
  'despesa',
  'Despesa de viagem',
  808.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46409),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  5838426
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-19',
  'despesa',
  'Material de limpeza',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  5838406
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-20',
  'receita',
  'Rosângela',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4946229
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-20',
  'receita',
  'Sandriele Fideles',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1024192',
  '2025-09',
  4946226
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-20',
  'receita',
  'Luana Raysa',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_998908',
  '2025-09',
  4946223
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-20',
  'receita',
  'Ofertas de Gratidão',
  222.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4945413
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-21',
  'receita',
  'Jakciel Laurentino',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2025-09',
  4947456
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-21',
  'receita',
  'Ofertas de Gratidão',
  92.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4945611
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-21',
  'receita',
  'Josinaldo Bernardo da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-09',
  4945603
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-21',
  'receita',
  'Samuel da Silva Bezerra',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-09',
  4945597
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-21',
  'receita',
  'Jucineide Terto da Silva',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-09',
  4945588
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-21',
  'receita',
  'Jaudijane Martins Viana',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2025-09',
  4945580
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-21',
  'receita',
  'José Bezerra dos Santos',
  105.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-09',
  4945576
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-25',
  'receita',
  'Lucas Vinício Barboza da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2025-09',
  4946817
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-25',
  'receita',
  'Ofertas de Gratidão',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4945439
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-25',
  'receita',
  'José Bezerra dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-09',
  4945423
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-28',
  'receita',
  'Semeadura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4945487
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-28',
  'receita',
  'Ageilda Gonçalo da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-09',
  4945478
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-28',
  'receita',
  'Ofertas de Gratidão',
  85.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-09',
  4945493
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-28',
  'receita',
  'Samuel da Silva Bezerra',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2025-09',
  4945450
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-28',
  'receita',
  'Josefa Zacarias',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-09',
  4945470
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-28',
  'receita',
  'Jose Cicero Ferreira',
  151.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2025-09',
  4945463
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-28',
  'receita',
  'José Bezerra dos Santos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-09',
  4945457
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-09-30',
  'receita',
  'Luiz dos Santos',
  680.4,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-09',
  4945951
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-02',
  'receita',
  'Isabelly Dayane Cardoso Barreto',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568544',
  '2025-10',
  5097276
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-02',
  'receita',
  'Ofertas de Gratidão',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5031944
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-02',
  'receita',
  'Jadson Moura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_707722',
  '2025-10',
  5031936
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-02',
  'receita',
  'Shirley Lopes Ferreira',
  346.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-10',
  5031932
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-02',
  'receita',
  'Anderson Davi Ferreira da Silva',
  288.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-10',
  5031921
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-02',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-10',
  5031918
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-02',
  'receita',
  'Alicia Regina da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-10',
  5031910
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-02',
  'receita',
  'José Bezerra dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-10',
  5031926
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-02',
  'receita',
  'Ageilda Gonçalo da Silva',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-10',
  5031915
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'despesa',
  'Pagamento  do sistema enuves.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 0),
  NULL,
  '2025-10',
  5952125
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2025-10',
  5032065
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Ailton de Morais Araújo',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2025-10',
  5032063
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-10',
  5032062
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Marilene',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5097299
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Maria Clara Zacarias de Morais',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270276',
  '2025-10',
  5097297
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Ofertas de Gratidão',
  151.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5032074
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-10',
  5032060
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2025-10',
  5031951
) ON CONFLICT (enuves_id) DO NOTHING;

COMMIT;
