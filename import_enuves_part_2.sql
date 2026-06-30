-- ==============================================================
-- IMPORTAÇÃO ENUVES - PARTE 2 de 5
-- ==============================================================

BEGIN;

-- IMPORTAÇÃO DE TRANSAÇÕES FINANCEIRAS (Lote 2)

INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-03',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-11',
  1575671
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-03',
  'receita',
  'EXTRA Pra. ANINHA.',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-11',
  1575640
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-03',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-11',
  1575683
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-03',
  'receita',
  'Oferta de Israel',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-11',
  1575686
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-03',
  'receita',
  'Oferta Designada / Semeadura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575681
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-03',
  'receita',
  'Oferta de Gratidão',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575679
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-03',
  'receita',
  'Oferta de Socorro (Povo)',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-11',
  1575685
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-03',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-11',
  1575670
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-03',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-11',
  1575675
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-11',
  1575706
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-11',
  1575714
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Oferta de Israel',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-11',
  1575716
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575713
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Oferta Designada / Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270030',
  '2022-11',
  1575700
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Oferta Designada / Semeadura',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273247',
  '2022-11',
  1575693
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Oferta de Gratidão',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575712
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Oferta de Gratidão',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269715',
  '2022-11',
  1575701
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Oferta de Socorro (Povo)',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-11',
  1575715
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Dízimos',
  79.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-11',
  1575702
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2022-11',
  1575697
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2022-11',
  1575694
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Dízimos',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2022-11',
  1575690
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Dízimos',
  228.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2022-11',
  1575689
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-06',
  'receita',
  'Primícias',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-11',
  1575705
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-08',
  'despesa',
  'Combustível Carro Pastoral',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1576014
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-10',
  'receita',
  'Transferência / Diversos',
  400.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 0),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Manutenção do carro pastoral. | Transferência original Enuves ID 1575937 (Origem: 8611, Destino: 8441)',
  '2022-11',
  1575938
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-10',
  'despesa',
  'Transferência / Diversos',
  400.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 0),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Manutenção do carro pastoral. | Transferência original Enuves ID 0 (Origem: 8611, Destino: 8441)',
  '2022-11',
  1575937
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (2/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2022-11',
  3418626
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-10',
  'despesa',
  'MANUTENÇÃO DO CARRO PASTORAL (2a. parcela)',
  400.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575930
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-10',
  'despesa',
  'ALUGUEL REF. AO MÊS DE NOVEMBRO.',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1666743
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-10',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-11',
  1575735
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-10',
  'receita',
  'Oferta de Gratidão',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575738
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-10',
  'receita',
  'OFERTA DO ATO PROFÉTICO',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575734
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-10',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2022-11',
  1575736
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-10',
  'receita',
  'Dízimos',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-11',
  1575722
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-10',
  'receita',
  'Primícias',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-11',
  1575723
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-11',
  'despesa',
  'ENERGIA DO TEMPLO REF. AO MÊS DE SETEMBRO.',
  87.83,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575971
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-11',
  'receita',
  'ESCOLA DE INGLÊS (ARIELLY0',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-11',
  1575628
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-13',
  'receita',
  'Oferta de Mantenedores',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-11',
  1575767
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-13',
  'receita',
  'Oferta de Israel',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-11',
  1575769
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-13',
  'receita',
  'Oferta Designada / Semeadura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575765
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-13',
  'receita',
  'Oferta de Gratidão',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575763
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-13',
  'receita',
  'Oferta de Socorro (Povo)',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-11',
  1575768
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-13',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2022-11',
  1575747
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-13',
  'receita',
  'Dízimos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-11',
  1575746
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-13',
  'receita',
  'Dízimos',
  720.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2022-11',
  1575744
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-13',
  'receita',
  'Dízimos',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2022-11',
  1575742
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-13',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2022-11',
  1575741
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-13',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2022-11',
  1575760
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-13',
  'receita',
  'Primícias',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-11',
  1575757
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-14',
  'despesa',
  'ENERGIA CASA PASTORAL REF. AO MÊS DE SETEMBRO.',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575999
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-15',
  'receita',
  'ESCOLA DE INGLÊS (DEIVINHO)',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-11',
  1575632
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-17',
  'despesa',
  'DESP. DE COMBUSTÍVEL PARA O CONGRESSO MIB.',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1576006
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-18',
  'despesa',
  'DESP. DE COMBUSTÍVEL PARA O CONGRESSO MIB.',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1576009
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-19',
  'despesa',
  'DESP. DE COMBUSTÍVEL PARA O CONGRESSO MIB.',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1576012
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-21',
  'despesa',
  'Desp. básicas família sacerdotal',
  838.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1754225
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-21',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-11',
  1575784
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-21',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-11',
  1575797
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-21',
  'receita',
  'Oferta de Israel',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-11',
  1575799
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-21',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575796
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-21',
  'receita',
  'Oferta de Gratidão',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575794
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-21',
  'receita',
  'Oferta de Socorro (Povo)',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-11',
  1575798
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-21',
  'receita',
  'Dízimos',
  545.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-11',
  1575792
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-21',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2022-11',
  1575790
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-21',
  'receita',
  'Dízimos',
  49.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-11',
  1575787
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-21',
  'receita',
  'SEMANA DO CONGRESSO',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-11',
  1575779
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-21',
  'receita',
  'Primícias',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-11',
  1575788
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-21',
  'receita',
  'Primícias',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-11',
  1575783
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-24',
  'receita',
  'Gratidão Diária',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575812
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-24',
  'receita',
  'Dízimos',
  77.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-11',
  1575809
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-24',
  'receita',
  'Primícias',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-11',
  1575807
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-27',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-11',
  1575824
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-27',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-11',
  1575820
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-27',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-11',
  1575825
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-27',
  'receita',
  'Oferta de Israel',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-11',
  1575828
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-27',
  'receita',
  'Oferta Designada / Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575915
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-27',
  'receita',
  'Oferta de Gratidão',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-11',
  1575823
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-27',
  'receita',
  'Oferta de Socorro (Povo)',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-11',
  1575827
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-27',
  'receita',
  'Dízimos',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-11',
  1575819
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-27',
  'receita',
  'Dízimos',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-11',
  1575817
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-27',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273247',
  '2022-11',
  1575815
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-27',
  'receita',
  'Primícias',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-11',
  1575818
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-11-27',
  'receita',
  'Primícias',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-11',
  1575816
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-01',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663254
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-01',
  'receita',
  'Oferta de Israel',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-12',
  1663259
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-01',
  'receita',
  'Oferta Designada / Semeadura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663256
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-01',
  'receita',
  'Oferta de Gratidão',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663255
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-01',
  'receita',
  'Oferta de Socorro (Povo)',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-12',
  1663258
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-01',
  'receita',
  'Dízimos',
  134.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2022-12',
  1663252
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-01',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2022-12',
  1663248
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-01',
  'receita',
  'Primícias',
  47.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2022-12',
  1663250
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Oferta de Mantenedores',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-12',
  1663298
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Oferta de Israel',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-12',
  1663304
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Oferta Designada / Semeadura',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663296
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Oferta de Gratidão',
  14.65,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663293
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Oferta de Socorro (Povo)',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-12',
  1663302
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Dízimos',
  77.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663286
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2022-12',
  1663285
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2022-12',
  1663281
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Dízimos',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2022-12',
  1663272
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Dízimos',
  425.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269731',
  '2022-12',
  1663268
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Dízimos',
  228.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2022-12',
  1663266
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-12',
  1663261
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Dízimos',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2022-12',
  1663260
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Primícias',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663288
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Primícias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2022-12',
  1663276
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-04',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2022-12',
  1663263
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-08',
  'receita',
  'Oferta de Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-12',
  1663336
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-08',
  'receita',
  'Oferta de Israel',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-12',
  1663345
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-08',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663330
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-08',
  'receita',
  'Oferta de Gratidão',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663320
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-08',
  'receita',
  'Oferta de Socorro (Povo)',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-12',
  1663342
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-08',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2022-12',
  1663314
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-08',
  'receita',
  'Dízimos',
  134.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-12',
  1663309
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-08',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2022-12',
  1663317
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (3/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2022-12',
  3418627
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-10',
  'despesa',
  'MANUTENÇÃO CARRO PASTORAL (3a. parcela)',
  415.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1575945
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-10',
  'despesa',
  'ALUGUEL REF. AO MÊS DE DEZEMBRO.',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1666750
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-11',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663377
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-11',
  'receita',
  'MENSALIDADE ESCOLA DE INGLÊS (DEIVINHO)',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-12',
  1607312
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-11',
  'receita',
  'Venda de Materiais (Apostilas/ELB)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-12',
  1607308
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-11',
  'receita',
  'Oferta Designada / Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663382
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-11',
  'receita',
  'Oferta de Gratidão',
  328.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663380
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-11',
  'receita',
  'GRATIDÃO PELO CASAMENTO',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_63244',
  '2022-12',
  1607306
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-11',
  'receita',
  'GRATIDÃO PELO CASAMENTO.',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269477',
  '2022-12',
  1607300
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-11',
  'receita',
  'Dízimos',
  112.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663361
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-11',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2022-12',
  1663359
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-11',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2022-12',
  1663355
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-11',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2022-12',
  1663350
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-11',
  'receita',
  'Primícias',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663374
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-12',
  'despesa',
  'ENERGIA CASA PASTORAL REF. AO MÊS DE OUTUBRO.',
  256.67,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1666734
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-12',
  'despesa',
  'ENERGIA DO TEMPLO REF. AO MÊS DE OUTUBRO.',
  49.83,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1666732
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-12',
  'receita',
  'NOITE DE GRATIDÃO',
  728.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663394
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-15',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663400
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-15',
  'receita',
  'Oferta de Israel',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-12',
  1663406
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-15',
  'receita',
  'Oferta Designada / Semeadura',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663487
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-15',
  'receita',
  'Oferta de Gratidão',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663482
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-15',
  'receita',
  'Oferta de Socorro (Povo)',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-12',
  1663426
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-15',
  'receita',
  'Dízimos',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-12',
  1663396
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-15',
  'receita',
  'Dízimos',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2022-12',
  1663395
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-15',
  'receita',
  'Primícias',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-12',
  1663397
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-18',
  'receita',
  'EXTRA ASHLEY.',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-12',
  1622883
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-18',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-12',
  1663468
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-18',
  'receita',
  'Oferta de Israel',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-12',
  1663472
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-18',
  'receita',
  'Oferta Designada / Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663465
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-18',
  'receita',
  'Oferta de Gratidão',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663462
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-18',
  'receita',
  'Oferta de Socorro (Povo)',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-12',
  1663470
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-18',
  'receita',
  'Dízimos',
  106.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663455
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-18',
  'receita',
  'Dízimos',
  49.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-12',
  1663450
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-18',
  'receita',
  'Dízimos',
  700.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2022-12',
  1663447
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-18',
  'receita',
  'Dízimos',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-12',
  1663443
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-18',
  'receita',
  'Primícias',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663458
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-18',
  'receita',
  'Primícias',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2022-12',
  1663453
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-19',
  'receita',
  'OFERTA (Pr. Luiz)',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2022-12',
  1623999
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  911.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1754226
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-22',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663506
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-22',
  'receita',
  'Oferta de Gratidão',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663510
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-24',
  'receita',
  'Oferta de Gratidão - Daniel e Jeane',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_271274',
  '2022-12',
  1643846
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-25',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-12',
  1663534
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-25',
  'receita',
  'Oferta de Israel',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-12',
  1663536
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-25',
  'receita',
  'Oferta Designada / Semeadura',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663531
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-25',
  'receita',
  'Oferta de Gratidão',
  261.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663530
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-25',
  'receita',
  'Oferta de Socorro (Povo)',
  56.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-12',
  1663535
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-25',
  'receita',
  'Dízimos',
  241.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2022-12',
  1663526
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-25',
  'receita',
  'Dízimos',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663517
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-25',
  'receita',
  'Primícias',
  84.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2022-12',
  1663528
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-25',
  'receita',
  'Primícias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663521
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-29',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663545
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-29',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663544
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-29',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-12',
  1663550
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-29',
  'receita',
  'Oferta de Israel',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-12',
  1663552
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-29',
  'receita',
  'Oferta Designada / Semeadura',
  102.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663549
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-29',
  'receita',
  'Oferta de Gratidão',
  65.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663548
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-29',
  'receita',
  'AGEILDA GONÇALO DA SILVA.',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663542
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-29',
  'receita',
  'Oferta de Socorro (Povo)',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-12',
  1663551
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-29',
  'receita',
  'Dízimos',
  49.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2022-12',
  1663546
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-29',
  'receita',
  'Primícias',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2022-12',
  1663547
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-31',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2022-12',
  1663565
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-31',
  'receita',
  'Oferta de Israel',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2022-12',
  1663569
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-31',
  'receita',
  'Oferta Designada / Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663563
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-31',
  'receita',
  'Oferta de Gratidão',
  201.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2022-12',
  1663560
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-31',
  'receita',
  'Oferta de Socorro (Povo)',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2022-12',
  1663566
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-31',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2022-12',
  1663559
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-31',
  'receita',
  'Dízimos',
  140.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2022-12',
  1663557
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-31',
  'receita',
  'Dízimos',
  38.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663554
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2022-12-31',
  'receita',
  'Primícias',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2022-12',
  1663555
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-05',
  'despesa',
  'PASSAGEM DO APÓSTOLO MOISÉS (1/6)',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1754314
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-05',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-01',
  1732541
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-05',
  'receita',
  'Oferta de Gratidão',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732558
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-05',
  'receita',
  'Propósito  da semente de uva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2023-01',
  1732537
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-05',
  'receita',
  'Dízimos',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-01',
  1732539
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-05',
  'receita',
  'Dízimos',
  425.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269731',
  '2023-01',
  1732531
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-05',
  'receita',
  'Dízimos',
  228.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2023-01',
  1732529
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-05',
  'receita',
  'Ageilda Gonçalo da Silva',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732555
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-06',
  'despesa',
  'Compra de jarros para ornamentação do Templo',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  2273686
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'despesa',
  'Fat. de energia ref. janeiro - templo',
  79.97,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  2273113
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Venda de Materiais (Apostilas/ELB)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_267868',
  '2023-01',
  1673272
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Oferta de Mantenedores',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-01',
  1732593
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Oferta de Israel',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-01',
  1732595
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Oferta Designada / Semeadura',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732592
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Oferta Designada / Semeadura',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269715',
  '2023-01',
  1732562
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Oferta de Gratidão',
  78.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732591
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Oferta de Socorro (Povo)',
  82.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-01',
  1732594
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Dízimos',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-01',
  1732590
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Dízimos',
  772.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2023-01',
  1732587
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2023-01',
  1732586
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Dízimos',
  154.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-01',
  1732571
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-01',
  1732567
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-01',
  1732561
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2023-01',
  1732585
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Primícias',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-01',
  1732570
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-08',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-01',
  1732564
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (4/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2023-01',
  3418628
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-10',
  'despesa',
  'Aluguel do Templo ref. janeiro',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  2273133
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-12',
  'despesa',
  'OFERTA BENEFICENTE MIN. ÁGAPE RIO DE JANEIRO',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1754279
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-12',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-01',
  1732597
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-12',
  'receita',
  'Oferta de Gratidão',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732603
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-12',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2023-01',
  1732602
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-12',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2023-01',
  1732599
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-13',
  'despesa',
  'Despesa de viagem com combustível ref. ao mês de janeiro',
  170.02,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  2273689
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-14',
  'despesa',
  'Fat. de energia ref. janeiro - casa Pastoral',
  130.79,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  2273116
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-15',
  'despesa',
  'Despesa de Combustível',
  30.01,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  3136492
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-15',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-01',
  1732627
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-15',
  'receita',
  'Oferta de Israel',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-01',
  1732633
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-15',
  'receita',
  'Oferta Designada / Semeadura',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732624
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-15',
  'receita',
  'Oferta Designada / Semeadura',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273247',
  '2023-01',
  1732609
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-15',
  'receita',
  'Oferta de Gratidão',
  56.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732623
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-15',
  'receita',
  'Oferta de Socorro (Povo)',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-01',
  1732628
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-15',
  'receita',
  'Dízimos',
  54.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2023-01',
  1732619
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-15',
  'receita',
  'Dízimos',
  194.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-01',
  1732614
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-15',
  'receita',
  'Primícias',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2023-01',
  1732617
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-15',
  'receita',
  'Primícias',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-01',
  1732611
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-16',
  'despesa',
  'Tributos VPB',
  84.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-01',
  2273126
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-16',
  'despesa',
  'Equipamentonde de Som',
  104.93,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46408),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  2273606
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-19',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-01',
  1732638
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-19',
  'receita',
  'OFERTA DE HONRA',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-01',
  1708965
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-19',
  'receita',
  'MENSALIDADE CURSO DE INGLÊS (DEIVINHO)',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-01',
  1708963
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-19',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-01',
  1732662
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-19',
  'receita',
  'Oferta de Israel',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-01',
  1732666
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-19',
  'receita',
  'Oferta Designada / Semeadura',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732659
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-19',
  'receita',
  'Oferta de Gratidão',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732656
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-19',
  'receita',
  'ALEXANDRO E MÉRCIA',
  500.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732645
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-19',
  'receita',
  'Oferta de Socorro (Povo)',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-01',
  1732664
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-19',
  'receita',
  'Dízimos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-01',
  1732654
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-19',
  'receita',
  'Dízimos',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2023-01',
  1732652
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-19',
  'receita',
  'Primícias',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2023-01',
  1732649
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  724.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1754235
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-22',
  'receita',
  'Oferta Designada / Semeadura',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269715',
  '2023-01',
  1732690
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-22',
  'receita',
  'Oferta de Gratidão',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732698
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-22',
  'receita',
  'OFERTA REF. AO CASAMENTO',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-01',
  1732694
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-22',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273247',
  '2023-01',
  1732688
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-22',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2023-01',
  1732671
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-26',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-01',
  1732707
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-26',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-01',
  1732713
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-26',
  'receita',
  'Oferta de Israel',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-01',
  1732716
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-26',
  'receita',
  'Oferta Designada / Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732710
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-26',
  'receita',
  'Oferta de Gratidão',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732709
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-26',
  'receita',
  'Oferta de Socorro (Povo)',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-01',
  1732714
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-26',
  'receita',
  'Dízimos',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-01',
  1732704
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-26',
  'receita',
  'Primícias',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-01',
  1732703
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-28',
  'despesa',
  'OFERTA DO PR. LUIZ (ENCONTRO DOS HOMENS)',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732880
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-28',
  'receita',
  'ENCONTRO DOS HOMENS',
  359.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732719
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-29',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-01',
  1732724
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-29',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-01',
  1732731
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-29',
  'receita',
  'Oferta de Israel',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-01',
  1732734
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-29',
  'receita',
  'Oferta Designada / Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732729
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-29',
  'receita',
  'Oferta de Gratidão',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-01',
  1732727
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-29',
  'receita',
  'Oferta de Socorro (Povo)',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-01',
  1732733
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-29',
  'receita',
  'Dízimos',
  168.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-01',
  1732723
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-01-29',
  'receita',
  'Primícias',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-01',
  1732721
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-01',
  'despesa',
  'Fat. de energia ref. dezembro - casa Pastoral',
  126.62,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  2273216
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-01',
  'despesa',
  'Fat. de energia ref. dezembro - Templo',
  86.81,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  2273202
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-01',
  'despesa',
  'Fat. de energia ref. janeiro - casa Pastoral',
  139.05,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  2273189
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-02',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-02',
  1818348
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-02',
  'receita',
  'Oferta de Gratidão',
  185.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818350
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-02',
  'receita',
  'Dízimos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-02',
  1818349
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'despesa',
  'PASSAGEM DO APÓSTOLO MOISÉS (2/6)',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1754315
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'receita',
  'EXTRA DE ASAPH',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-02',
  1752823
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'receita',
  'Oferta de Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-02',
  1818365
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'receita',
  'Oferta de Israel',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-02',
  1818367
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'receita',
  'Oferta Designada / Semeadura',
  110.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818364
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'receita',
  'Oferta de Gratidão',
  47.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818363
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'receita',
  'Oferta de Socorro (Povo)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-02',
  1818366
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273247',
  '2023-02',
  1818646
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2023-02',
  1818358
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'receita',
  'Dízimos',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-02',
  1818357
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-02',
  1818356
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'receita',
  'Dízimos',
  110.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-02',
  1818354
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'receita',
  'Dízimos',
  96.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-02',
  1818353
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-02',
  1818355
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-05',
  'receita',
  'Primícias',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-02',
  1818352
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-06',
  'despesa',
  'Oferta VPB',
  102.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47045),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-02',
  2273141
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-06',
  'despesa',
  'MANUNTENÇÃO DO EQUIPAMENTO DE SOM',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 0),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818585
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-09',
  'receita',
  'Mensalidade de Inglês - Arielle',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-02',
  1768341
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-09',
  'receita',
  'Oferta de Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-02',
  1818410
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-09',
  'receita',
  'Oferta de Israel',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-02',
  1818412
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-09',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818401
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-09',
  'receita',
  'Oferta de Gratidão',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818399
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-09',
  'receita',
  'Oferta de Socorro (Povo)',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-02',
  1818411
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-09',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2023-02',
  1818398
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-09',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2023-02',
  1818397
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (5/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2023-02',
  3418629
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-10',
  'despesa',
  'Aluguel Casa Pastoral (1/24)',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-02',
  4365141
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-10',
  'despesa',
  'Aluguel do templo ref. fevereiro',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  2273252
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-11',
  'receita',
  'Mensalidade de Inglês - Deivinho',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-02',
  1769858
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-12',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-02',
  1818424
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-12',
  'receita',
  'Oferta de Israel',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-02',
  1818427
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-12',
  'receita',
  'Oferta Designada / Semeadura',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818423
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-12',
  'receita',
  'Oferta de Gratidão',
  91.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818422
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-12',
  'receita',
  'Oferta de Socorro (Povo)',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-02',
  1818426
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-12',
  'receita',
  'Dízimos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-02',
  1818421
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-12',
  'receita',
  'Dízimos',
  215.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-02',
  1818415
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-12',
  'receita',
  'Primícias',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-02',
  1818414
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-16',
  'despesa',
  'Material de construção - Casa Sacerdotal',
  1500.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  2011658
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-16',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-02',
  1818429
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-16',
  'receita',
  'Oferta de Israel',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-02',
  1818449
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-16',
  'receita',
  'Oferta Designada / Semeadura',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818445
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-16',
  'receita',
  'Oferta de Gratidão',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818444
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-16',
  'receita',
  'Oferta de Socorro (Povo)',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-02',
  1818448
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-16',
  'receita',
  'LUIZ DOS SANTOS JUNIOR',
  95.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818439
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-16',
  'receita',
  'Dízimos',
  1280.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2023-02',
  1818436
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-16',
  'receita',
  'Dízimos',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-02',
  1818434
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-16',
  'receita',
  'Dízimos',
  425.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269731',
  '2023-02',
  1818432
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-16',
  'receita',
  'Dízimos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-02',
  1818431
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-16',
  'receita',
  'Primícias',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-02',
  1818433
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-19',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-02',
  1818467
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-19',
  'receita',
  'Oferta de Israel',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-02',
  1818471
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-19',
  'receita',
  'Oferta Designada / Semeadura',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818464
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-19',
  'receita',
  'Oferta de Gratidão',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818462
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-19',
  'receita',
  'Oferta de Socorro (Povo)',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-02',
  1818468
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-19',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2023-02',
  1818460
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-19',
  'receita',
  'Dízimos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-02',
  1818459
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-19',
  'receita',
  'Primícias',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-02',
  1818458
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-21',
  'despesa',
  'Desp. básicas família sacerdotal',
  732.87,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  2011634
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-22',
  'despesa',
  'Despesa de Viagem - seminário',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46409),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  2273166
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-23',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-02',
  1818482
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-23',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-02',
  1818476
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-23',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-02',
  1818485
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-23',
  'receita',
  'Oferta de Gratidão',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818556
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-24',
  'despesa',
  'Combustível Carro Pastoral',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818571
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-26',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-02',
  1818500
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-26',
  'receita',
  'Oferta de Israel',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-02',
  1818504
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-26',
  'receita',
  'Oferta Designada / Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818499
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-26',
  'receita',
  'Oferta de Gratidão',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818498
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-26',
  'receita',
  'Oferta de Gratidão',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2023-02',
  1818487
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-26',
  'receita',
  'Oferta de Socorro (Povo)',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-02',
  1818502
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-26',
  'receita',
  'LUIZ DOS SANTOS JUNIOR',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-02',
  1818495
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-26',
  'receita',
  'Dízimos',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2023-02',
  1818494
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-26',
  'receita',
  'Dízimos',
  153.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-02',
  1818492
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-26',
  'receita',
  'Dízimos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-02',
  1818489
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-02-26',
  'receita',
  'Primícias',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-02',
  1818490
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-02',
  'receita',
  'Oferta de Gratidão',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910167
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-02',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273247',
  '2023-03',
  1910166
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-02',
  'receita',
  'Dízimos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-03',
  1910165
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'despesa',
  'PASSAGEM DO APÓSTOLO MOISÉS (3/6)',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1754316
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-03',
  1910180
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Oferta de Israel',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-03',
  1910187
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Oferta Designada / Semeadura',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910183
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Oferta de Gratidão',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910181
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Oferta de Socorro (Povo)',
  57.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-03',
  1910285
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Oferta de Socorro (Povo)',
  57.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-03',
  1910185
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Dízimos',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2023-03',
  1910179
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-03',
  1910178
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Dízimos',
  331.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-03',
  1910177
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Dízimos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-03',
  1910176
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2023-03',
  1910175
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-03',
  1910174
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Dízimos',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-03',
  1910172
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2023-03',
  1910170
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-03',
  1910173
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Primícias',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-03',
  1910171
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-05',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2023-03',
  1910169
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-06',
  'despesa',
  'PASSAGEM DO APÓSTOLO MOISÉS - 2/6 (2/4)',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1754305
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-09',
  'despesa',
  'Fat. de energia ref. fevereiro - Templo',
  89.65,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  2273273
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-09',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-03',
  1910291
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-09',
  'receita',
  'Oferta de Gratidão',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910292
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (6/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2023-03',
  3418630
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-10',
  'despesa',
  'Aluguel Casa Pastoral (2/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-03',
  4365142
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  2273262
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-12',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-03',
  1910206
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-12',
  'receita',
  'Oferta de Israel',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-03',
  1910208
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-12',
  'receita',
  'Oferta Designada / Semeadura',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910204
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-12',
  'receita',
  'Oferta de Gratidão',
  56.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910203
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-12',
  'receita',
  'Oferta de Socorro (Povo)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-03',
  1910207
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-12',
  'receita',
  'Dízimos',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-03',
  1910202
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-12',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2023-03',
  1910200
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-12',
  'receita',
  'Dízimos',
  193.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-03',
  1910199
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-12',
  'receita',
  'Primícias',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-03',
  1910201
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-12',
  'receita',
  'Primícias',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-03',
  1910198
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-13',
  'receita',
  'REDE DAS MULHERES',
  526.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910211
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-16',
  'receita',
  'Oferta de Gratidão',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910196
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-16',
  'receita',
  'JUNIOR (UNIÃO)',
  72.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910195
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-16',
  'receita',
  'Dízimos',
  400.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2023-03',
  1910184
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-19',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-03',
  1910217
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-19',
  'receita',
  'Oferta de Mantenedores',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-03',
  1910228
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-19',
  'receita',
  'Oferta de Israel',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-03',
  1910231
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-19',
  'receita',
  'Oferta Designada / Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910226
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-19',
  'receita',
  'Oferta de Gratidão',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910224
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-19',
  'receita',
  'Oferta de Socorro (Povo)',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-03',
  1910229
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-19',
  'receita',
  'MAELE ALVES GOMES',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910222
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-19',
  'receita',
  'Dízimos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-03',
  1910219
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-19',
  'receita',
  'MAELE ALVES GOMES',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910221
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-19',
  'receita',
  'Primícias',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-03',
  1910218
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  1512.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  2011637
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-23',
  'receita',
  'Oferta de Gratidão',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910233
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-26',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-03',
  1910245
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-26',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-03',
  1910243
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-26',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-03',
  1910249
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-26',
  'receita',
  'Oferta de Israel',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-03',
  1910251
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-26',
  'receita',
  'Oferta Designada / Semeadura',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910248
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-26',
  'receita',
  'Oferta de Gratidão',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910247
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-26',
  'receita',
  'Oferta de Socorro (Povo)',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-03',
  1910250
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-26',
  'receita',
  'Dízimos',
  1000.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-03',
  1910244
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-26',
  'receita',
  'Dízimos',
  114.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-03',
  1910242
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-26',
  'receita',
  'Dízimos',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-03',
  1910236
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-26',
  'receita',
  'Primícias',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-03',
  1910241
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-26',
  'receita',
  'Primícias',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-03',
  1910235
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-29',
  'despesa',
  'Material de construção - Casa Sacerdotal',
  670.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  2011663
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-30',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-03',
  1910253
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-30',
  'receita',
  'Oferta de Gratidão',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-03',
  1910259
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-30',
  'receita',
  'Dízimos',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_278189',
  '2023-03',
  1910257
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-30',
  'receita',
  'Dízimos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2023-03',
  1910256
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-03-30',
  'receita',
  'Dízimos',
  130.25,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-03',
  1910255
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-02',
  'receita',
  'Oferta de Mantenedores',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-04',
  1970420
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-02',
  'receita',
  'Oferta de Israel',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-04',
  1970425
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-02',
  'receita',
  'Oferta Designada / Semeadura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970417
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-02',
  'receita',
  'Oferta de Gratidão',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970415
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-02',
  'receita',
  'Oferta de Socorro (Povo)',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-04',
  1970423
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-02',
  'receita',
  'Dízimos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-04',
  1970413
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-02',
  'receita',
  'Dízimos',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-04',
  1970411
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-02',
  'receita',
  'Maele Alves Gomes',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970406
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-02',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-04',
  1970398
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-02',
  'receita',
  'Primícias',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-04',
  1970408
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-02',
  'receita',
  'Maele Alves Gomes',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970403
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-02',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-04',
  1970396
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-04',
  'despesa',
  'Material de construção - Casa Sacerdotal',
  1900.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  2011654
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-04',
  'receita',
  'Manutenção impressora - Escola Monsenhor',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-04',
  1934346
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-05',
  'despesa',
  'PASSAGEM DO APÓSTOLO MOISÉS (4/6)',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1754317
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-06',
  'despesa',
  'PASSAGEM DO APÓSTOLO MOISÉS - 2/6 (3/4)',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1754306
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-06',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-04',
  1970446
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-06',
  'receita',
  'Oferta de Israel',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-04',
  1970450
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-06',
  'receita',
  'Oferta Designada / Semeadura',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970443
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-06',
  'receita',
  'Oferta de Gratidão',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970441
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-06',
  'receita',
  'Oferta de Socorro (Povo)',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-04',
  1970448
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-06',
  'receita',
  'Dízimos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2023-04',
  1970436
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-06',
  'receita',
  'Dízimos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-04',
  1970432
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-06',
  'receita',
  'Primícias',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2023-04',
  1970433
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-09',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-04',
  1970459
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-09',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-04',
  1970465
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-09',
  'receita',
  'Oferta de Israel',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-04',
  1970467
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-09',
  'receita',
  'Oferta Designada / Semeadura',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970464
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-09',
  'receita',
  'Oferta de Gratidão',
  117.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970463
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-09',
  'receita',
  'Oferta de Socorro (Povo)',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-04',
  1970466
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-09',
  'receita',
  'Dízimos',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-04',
  1970462
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-09',
  'receita',
  'Dízimos',
  282.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-04',
  1970460
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-09',
  'receita',
  'Dízimos',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-04',
  1970458
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-09',
  'receita',
  'Dízimos',
  610.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2023-04',
  1970455
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-09',
  'receita',
  'Primícias',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-04',
  1970457
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (7/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2023-04',
  3418631
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-10',
  'despesa',
  'Aluguel Casa Pastoral (3/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-04',
  4365143
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  2273286
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-10',
  'receita',
  'Manutenção impressoras - Secretaria Educação',
  300.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-04',
  1934349
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-11',
  'despesa',
  'Fat. de enrgia ref. janeiro - Templo',
  99.82,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  2273298
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-11',
  'despesa',
  'Fat. de energia ref. fevereiro - casa Pastoral',
  158.39,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  2273303
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-12',
  'receita',
  'Mensalidade Inglês - Deivinho',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-04',
  1934347
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-13',
  'receita',
  'Gratidão Diária',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970479
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-13',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-04',
  1970475
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-13',
  'receita',
  'Oferta de Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-04',
  1970481
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-13',
  'receita',
  'Oferta de Israel',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-04',
  1970483
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-13',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970480
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-13',
  'receita',
  'Oferta de Socorro (Povo)',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-04',
  1970482
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-13',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2023-04',
  1970478
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-13',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2023-04',
  1970470
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-13',
  'receita',
  'Primícias',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2023-04',
  1970473
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-13',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2023-04',
  1970472
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-16',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-04',
  1970490
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-16',
  'receita',
  'Oferta de Israel',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-04',
  1970493
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-16',
  'receita',
  'Oferta Designada / Semeadura',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970489
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-16',
  'receita',
  'Oferta de Gratidão',
  82.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970488
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-16',
  'receita',
  'Oferta de Socorro (Povo)',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-04',
  1970492
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-16',
  'receita',
  'Dízimos',
  69.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-04',
  1970486
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-16',
  'receita',
  'Primícias',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-04',
  1970485
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-17',
  'despesa',
  'Desp. básicas família sacerdotal',
  347.19,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  2011721
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  880.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  2011639
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-20',
  'receita',
  'Oferta de Gratidão',
  26.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970494
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-23',
  'despesa',
  'Despesa de Combustível',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  3136499
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-23',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-04',
  1970504
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-23',
  'receita',
  'Oferta de Israel',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-04',
  1970508
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-23',
  'receita',
  'Oferta Designada / Semeadura',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970503
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-23',
  'receita',
  'Oferta de Gratidão',
  56.25,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970502
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-23',
  'receita',
  'Oferta de Socorro (Povo)',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-04',
  1970505
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-23',
  'receita',
  'Dízimos',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-04',
  1970501
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-23',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-04',
  1970499
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-23',
  'receita',
  'Dízimos',
  77.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-04',
  1970496
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-23',
  'receita',
  'Primícias',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-04',
  1970500
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-23',
  'receita',
  'Primícias',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-04',
  1970498
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-23',
  'receita',
  'Primícias',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-04',
  1970495
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-24',
  'despesa',
  'Despesas gastas em Porto Seguro',
  1400.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  2011672
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-27',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-04',
  1970512
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-27',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-04',
  1970511
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-27',
  'receita',
  'Oferta de Gratidão',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970514
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-27',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2023-04',
  1970513
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-27',
  'receita',
  'Dízimos',
  132.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-04',
  1970510
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-27',
  'receita',
  'Dízimos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2023-04',
  1970509
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-30',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-04',
  1970521
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-30',
  'receita',
  'Oferta de Israel',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-04',
  1970523
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-30',
  'receita',
  'Oferta Designada / Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970520
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-30',
  'receita',
  'Oferta de Gratidão',
  56.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-04',
  1970519
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-30',
  'receita',
  'Oferta de Socorro (Povo)',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-04',
  1970522
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-30',
  'receita',
  'Dízimos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-04',
  1970518
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-30',
  'receita',
  'Dízimos',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-04',
  1970516
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-30',
  'receita',
  'Primícias',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-04',
  1970517
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-04-30',
  'receita',
  'Primícias',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-04',
  1970515
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-01',
  'despesa',
  'Dia de Treinamento p/ líderes',
  170.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  '150,00 - inscrição
20,00 - combustível',
  '2023-05',
  2011689
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-03',
  'receita',
  'Manutenção de impressora',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-05',
  2011779
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-04',
  'receita',
  'Oferta de Mantenedores',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-05',
  2045322
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-04',
  'receita',
  'Oferta de Israel',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-05',
  2045326
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-04',
  'receita',
  'Oferta Designada / Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2045321
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-04',
  'receita',
  'Oferta de Gratidão',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2045320
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-04',
  'receita',
  'Oferta de Socorro (Povo)',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-05',
  2045324
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-04',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-05',
  2045317
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-04',
  'receita',
  'Dízimos',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2023-05',
  2045305
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-04',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-05',
  2045314
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-04',
  'receita',
  'Primícias',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2023-05',
  2045304
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-05',
  'despesa',
  'PASSAGEM DO APÓSTOLO MOISÉS (5/6)',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  1754318
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-05',
  'receita',
  'Mensalidade de Inglês - Deivinho',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-05',
  2012079
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-06',
  'despesa',
  'PASSAGEM DO APÓSTOLO MOISÉS - 2/6 (4/4)',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  1754307
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'despesa',
  'Fat. de energia ref. março - Templo',
  92.65,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2273323
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-05',
  2045389
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Oferta de Mantenedores',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-05',
  2045394
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Oferta de Israel',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-05',
  2045396
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Oferta Designada / Semeadura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2045393
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Oferta de Gratidão',
  88.05,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2045391
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Oferta de Gratidão',
  1300.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_278189',
  '2023-05',
  2045351
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Oferta de Gratidão',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2023-05',
  2045348
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Oferta de Socorro (Povo)',
  48.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-05',
  2045395
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Dízimos',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2023-05',
  2045388
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Dízimos',
  740.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2023-05',
  2045353
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Dízimos',
  135.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-05',
  2045345
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Dízimos',
  280.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-05',
  2045342
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2023-05',
  2045341
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Primícias',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2023-05',
  2045357
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-07',
  'receita',
  'Primícias',
  47.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-05',
  2045344
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-08',
  'despesa',
  'Material de construção - Casa Sacerdotal',
  926.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2011693
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-08',
  'despesa',
  'Fat. de energia ref. março - casa Pastoral',
  151.19,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2273321
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (8/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2023-05',
  3418632
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-10',
  'despesa',
  'Aluguel Casa Pastoral (4/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-05',
  4365144
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2273305
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-11',
  'receita',
  'Oferta de Gratidão',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2045402
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-11',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2023-05',
  2045401
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-11',
  'receita',
  'Dízimos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-05',
  2045400
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-13',
  'receita',
  'REDE DE MULHERES',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2045408
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-14',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-05',
  2045418
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-14',
  'receita',
  'Oferta de Israel',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-05',
  2045420
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-14',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2045417
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-14',
  'receita',
  'Oferta de Gratidão',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2045416
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-14',
  'receita',
  'Oferta de Socorro (Povo)',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-05',
  2045419
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-14',
  'receita',
  'Dízimos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-05',
  2045415
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-14',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2023-05',
  2045410
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-14',
  'receita',
  'Primícias',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-05',
  2045413
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-18',
  'receita',
  'Gratidão Diária',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-05',
  2045422
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-18',
  'receita',
  'Oferta de Gratidão',
  54.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2045423
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-20',
  'despesa',
  'Desp. básicas família sacerdotal',
  1433.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47090),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2011643
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-20',
  'despesa',
  'Despesa de Combustível',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  3136496
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-21',
  'receita',
  'Oferta de Mantenedores',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-05',
  2045430
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-21',
  'receita',
  'Oferta de Israel',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-05',
  2045432
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-21',
  'receita',
  'Oferta Designada / Semeadura',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2045428
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-21',
  'receita',
  'Oferta de Gratidão',
  42.25,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2045426
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-21',
  'receita',
  'Oferta de Socorro (Povo)',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-05',
  2045431
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-21',
  'receita',
  'Dízimos',
  38.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-05',
  2045425
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-21',
  'receita',
  'Primícias',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-05',
  2045424
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-25',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-05',
  2045436
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-25',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-05',
  2045435
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-25',
  'receita',
  'Oferta de Gratidão',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2045439
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-28',
  'receita',
  'Oferta de Gratidão',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-05',
  2045335
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-28',
  'receita',
  'Dízimos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2023-05',
  2045331
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-05-28',
  'receita',
  'Dízimos',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-05',
  2045329
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-01',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-06',
  2127069
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-01',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-06',
  2127072
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-01',
  'receita',
  'Oferta de Israel',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-06',
  2127078
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-01',
  'receita',
  'Oferta Designada / Semeadura',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127071
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-01',
  'receita',
  'Oferta de Gratidão',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127070
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-01',
  'receita',
  'Oferta de Socorro (Povo)',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-06',
  2127077
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-01',
  'receita',
  'Dízimos',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-06',
  2127068
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-01',
  'receita',
  'Primícias',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-06',
  2127067
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-03',
  'receita',
  'CAPACITAÇÃO KIDS',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127081
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-04',
  'receita',
  'Oferta de Mantenedores',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-06',
  2127094
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-04',
  'receita',
  'Oferta de Israel',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-06',
  2127096
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-04',
  'receita',
  'Oferta Designada / Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127093
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-04',
  'receita',
  'Oferta de Gratidão',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127091
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-04',
  'receita',
  'Oferta de Socorro (Povo)',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-06',
  2127095
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-04',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-06',
  2127090
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-04',
  'receita',
  'Dízimos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_278189',
  '2023-06',
  2127088
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-04',
  'receita',
  'Dízimos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-06',
  2127087
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-04',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2023-06',
  2127085
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-04',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2023-06',
  2127084
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-04',
  'receita',
  'Dízimos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-06',
  2127083
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-04',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-06',
  2127089
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-04',
  'receita',
  'Primícias',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-06',
  2127082
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-05',
  'despesa',
  'PASSAGEM DO APÓSTOLO MOISÉS (6/6)',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  1754319
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-06',
  'despesa',
  'Despesa de Combustível',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  3136498
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-08',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-06',
  2127103
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-08',
  'receita',
  'Oferta de Israel',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-06',
  2127112
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-08',
  'receita',
  'Oferta Designada / Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127109
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-08',
  'receita',
  'Oferta de Gratidão',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127108
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-08',
  'receita',
  'Oferta de Socorro (Povo)',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-06',
  2127110
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-08',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-06',
  2127106
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-08',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2023-06',
  2127105
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-08',
  'receita',
  'Dízimos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-06',
  2127104
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-08',
  'receita',
  'RADAYANE CARDOSO',
  132.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2023-06',
  2127102
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-08',
  'receita',
  'Dízimos',
  113.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2023-06',
  2127101
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-08',
  'receita',
  'Primícias',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2023-06',
  2127100
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-08',
  'receita',
  'AGEILDA GONÇALO DA SILVA',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127099
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (9/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2023-06',
  3418633
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-10',
  'despesa',
  'Aluguel Casa Pastoral (5/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-06',
  4365145
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2273517
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-11',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-06',
  2127132
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-11',
  'receita',
  'Oferta de Israel',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-06',
  2127135
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-11',
  'receita',
  'Oferta Designada / Semeadura',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127130
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-11',
  'receita',
  'Oferta de Gratidão',
  95.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127128
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-11',
  'receita',
  'Oferta de Gratidão',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2023-06',
  2127119
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-11',
  'receita',
  'Oferta de Socorro (Povo)',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-06',
  2127134
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-11',
  'receita',
  'Dízimos',
  285.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2023-06',
  2127126
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-11',
  'receita',
  'Dízimos',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2023-06',
  2127124
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-11',
  'receita',
  'Dízimos',
  323.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-06',
  2127121
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-11',
  'receita',
  'Primícias',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2023-06',
  2127123
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-11',
  'receita',
  'Primícias',
  112.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-06',
  2127120
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-12',
  'despesa',
  'Fat. de energia ref. abril - Templo',
  81.28,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2273330
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-12',
  'despesa',
  'Fat. de energia ref. abril - casa Pastoral',
  149.52,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2273328
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-13',
  'receita',
  'Oferta de Gratidão',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-06',
  2084303
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-15',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-06',
  2127149
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-15',
  'receita',
  'Oferta de Gratidão',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127150
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-18',
  'receita',
  'Oferta de Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-06',
  2127164
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-18',
  'receita',
  'Oferta de Israel',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-06',
  2127167
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-18',
  'receita',
  'Oferta Designada / Semeadura',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127162
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-18',
  'receita',
  'Oferta de Gratidão',
  49.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127160
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-18',
  'receita',
  'Oferta de Socorro (Povo)',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-06',
  2127165
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-18',
  'receita',
  'Dízimos',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2023-06',
  2127158
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-18',
  'receita',
  'Dízimos',
  685.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2023-06',
  2127154
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-18',
  'receita',
  'Dízimos',
  172.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-06',
  2127153
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-18',
  'receita',
  'Primícias',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-06',
  2127152
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-22',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-06',
  2127171
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-22',
  'receita',
  'Oferta de Gratidão',
  58.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127178
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-22',
  'receita',
  'PROPÓSITO JEJUM',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-06',
  2127176
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-22',
  'receita',
  'PROPÓSITO JEJUM',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2023-06',
  2127173
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-25',
  'receita',
  'Oferta de Israel',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-06',
  2127197
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-25',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127194
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-25',
  'receita',
  'Oferta de Gratidão',
  6.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127193
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-25',
  'receita',
  'Oferta de Socorro (Povo)',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-06',
  2127196
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-25',
  'receita',
  'Dízimos',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-06',
  2127191
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-25',
  'receita',
  'Dízimos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-06',
  2127187
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-25',
  'receita',
  'Primícias',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-06',
  2127190
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-25',
  'receita',
  'Primícias',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-06',
  2127185
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-29',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-06',
  2127212
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-29',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-06',
  2127208
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-29',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-06',
  2127223
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-29',
  'receita',
  'Oferta de Israel',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-06',
  2127225
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-29',
  'receita',
  'Oferta Designada / Semeadura',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127222
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-29',
  'receita',
  'Oferta de Gratidão',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-06',
  2127221
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-29',
  'receita',
  'Oferta de Socorro (Povo)',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-06',
  2127224
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-29',
  'receita',
  'Dízimos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_278189',
  '2023-06',
  2127220
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-29',
  'receita',
  'Dízimos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-06',
  2127217
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-29',
  'receita',
  'Dízimos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-06',
  2127215
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-29',
  'receita',
  'Dízimos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-06',
  2127207
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-06-29',
  'receita',
  'Primícias',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-06',
  2127206
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-02',
  'despesa',
  'DESPESAS REF. A CEIA DO SENHOR',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 65331),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2132543
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-02',
  'receita',
  'Oferta de Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-07',
  2213680
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-02',
  'receita',
  'Oferta de Israel',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-07',
  2213685
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-02',
  'receita',
  'Oferta Designada / Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213678
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-02',
  'receita',
  'Oferta de Gratidão',
  88.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213676
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-02',
  'receita',
  'Oferta de Socorro (Povo)',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-07',
  2213682
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-02',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2023-07',
  2213674
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-02',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-07',
  2213666
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-02',
  'receita',
  'Dízimos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-07',
  2213663
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-02',
  'receita',
  'Primícias',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-07',
  2213670
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-02',
  'receita',
  'Primícias',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-07',
  2213664
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-02',
  'receita',
  'Primícias',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-07',
  2213661
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-06',
  'despesa',
  'Fat. de energia ref. maio - casa Pastoral',
  158.1,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2273345
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-06',
  'despesa',
  'Fat. de energia ref. maio - Templo',
  100.62,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2273339
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-06',
  'receita',
  'Oferta de Gratidão',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213698
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-06',
  'receita',
  'Radayane Gomes Cardoso Ferreira',
  132.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2023-07',
  2213694
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-06',
  'receita',
  'Ageilda Gonçalo da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213697
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-09',
  'receita',
  'Oferta de Israel',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-07',
  2213722
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-09',
  'receita',
  'Oferta Designada / Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213718
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-09',
  'receita',
  'Oferta de Gratidão',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213714
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-09',
  'receita',
  'Oferta de Gratidão',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2023-07',
  2213706
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-09',
  'receita',
  'Oferta de Socorro (Povo)',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-07',
  2213720
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-09',
  'receita',
  'Dízimos',
  275.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-07',
  2213713
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-09',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2023-07',
  2213712
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-09',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2023-07',
  2213710
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-09',
  'receita',
  'Dízimos',
  284.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2023-07',
  2213709
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-09',
  'receita',
  'Dízimos',
  111.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2023-07',
  2213704
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-09',
  'receita',
  'Primícias',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2023-07',
  2213703
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (10/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2023-07',
  3418634
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-10',
  'despesa',
  'Aluguel Casa Pastoral (6/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-07',
  4365146
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2273333
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-12',
  'despesa',
  'Pilhas recarregáveis 2 pares Elgin',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46408),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2201265
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-13',
  'receita',
  'Gratidão Diária',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-07',
  2213733
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-13',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-07',
  2213740
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-13',
  'receita',
  'Oferta de Israel',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-07',
  2213745
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-13',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213738
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-13',
  'receita',
  'Oferta de Gratidão',
  46.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213737
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-13',
  'receita',
  'Oferta de Socorro (Povo)',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-07',
  2213743
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-13',
  'receita',
  'Dízimos',
  660.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2023-07',
  2213736
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-13',
  'receita',
  'Dízimos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2023-07',
  2213735
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-13',
  'receita',
  'Dízimos',
  78.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-07',
  2213732
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-13',
  'receita',
  'Primícias',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-07',
  2213729
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-16',
  'receita',
  'Oferta de Gratidão',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213760
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-16',
  'receita',
  'Radayane/ Nicholas',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2023-07',
  2213755
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-16',
  'receita',
  'Dízimos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-07',
  2213752
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-19',
  'despesa',
  'Despesa de Combustível',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  3136487
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-19',
  'despesa',
  'Despesa de Combustível',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  3136479
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-19',
  'despesa',
  'Pilhas recarregaveis',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46408),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  3136483
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-19',
  'despesa',
  'Pilhas recarregáveis 2 pares Flex',
  42.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46408),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2201266
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-20',
  'despesa',
  'Compra de microfones s/ fio (1/3)',
  286.86,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46408),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2201259
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-20',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-07',
  2213777
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-20',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-07',
  2213787
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-20',
  'receita',
  'Oferta de Israel',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-07',
  2213789
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-20',
  'receita',
  'Oferta Designada / Semeadura',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213786
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-20',
  'receita',
  'Oferta de Gratidão',
  38.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213785
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-20',
  'receita',
  'Oferta de Socorro (Povo)',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-07',
  2213788
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-20',
  'receita',
  'Dízimos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2023-07',
  2213782
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-20',
  'receita',
  'Dízimos',
  148.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-07',
  2213780
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-20',
  'receita',
  'Dízimos',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-07',
  2213775
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-20',
  'receita',
  'Dízimos',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-07',
  2213770
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-20',
  'receita',
  'Primícias',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-07',
  2213779
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-20',
  'receita',
  'Primícias',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-07',
  2213774
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-20',
  'receita',
  'Primícias',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-07',
  2213769
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-23',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-07',
  2213796
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-23',
  'receita',
  'Oferta de Israel',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-07',
  2213798
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-23',
  'receita',
  'Oferta Designada / Semeadura',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213795
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-23',
  'receita',
  'Oferta de Gratidão',
  76.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213794
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-23',
  'receita',
  'Oferta de Socorro (Povo)',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-07',
  2213797
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-23',
  'receita',
  'Dízimos',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-07',
  2213792
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-23',
  'receita',
  'Primícias',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-07',
  2213791
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-27',
  'receita',
  'Oferta de Gratidão',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213809
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-27',
  'receita',
  'Dízimos',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_278189',
  '2023-07',
  2213808
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-27',
  'receita',
  'Dízimos',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-07',
  2213806
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-27',
  'receita',
  'Primícias',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-07',
  2213804
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-30',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-07',
  2213813
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-30',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-07',
  2213812
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-07-30',
  'receita',
  'Oferta de Gratidão',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-07',
  2213816
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-01',
  'receita',
  'Manutenção de impressora',
  110.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-08',
  2212639
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-03',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-08',
  2260210
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-03',
  'receita',
  'Oferta de Mantenedores',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-08',
  2260228
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-03',
  'receita',
  'Oferta de Israel',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-08',
  2260234
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-03',
  'receita',
  'Oferta Designada / Semeadura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260226
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-03',
  'receita',
  'Oferta de Gratidão',
  38.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260220
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-03',
  'receita',
  'Oferta de Socorro (Povo)',
  47.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-08',
  2260231
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-03',
  'receita',
  'Dízimos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-08',
  2260214
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-03',
  'receita',
  'Dízimos',
  83.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2023-08',
  2260208
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-03',
  'receita',
  'Dízimos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-08',
  2260205
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-03',
  'receita',
  'Primícias',
  79.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260218
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-04',
  'receita',
  'Mensalidade Inglês - Deivinho',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-08',
  2269895
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'despesa',
  'Compra de microfones s/ fio (2/3)',
  286.86,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46408),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2201260
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-08',
  2260273
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'Oferta de Israel',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-08',
  2260276
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'Oferta Designada / Semeadura',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260272
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'Oferta de Gratidão',
  291.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260270
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'Oferta de Socorro (Povo)',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-08',
  2260275
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'Dízimos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 0),
  'Membro/Contato: DISC_267878',
  '2023-08',
  2300175
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2023-08',
  2260265
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'Dízimos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-08',
  2260261
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'RADAYANE GOMES CARDOSO FERREIRA',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2023-08',
  2260260
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'Dízimos',
  271.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-08',
  2260259
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'Dízimos',
  370.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-08',
  2260257
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2023-08',
  2260254
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'Dízimos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2023-08',
  2260251
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'AGEILDA',
  110.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260240
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'JOEDE S. VIANA',
  770.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260237
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-06',
  'receita',
  'Primícias',
  132.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260268
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-07',
  'despesa',
  'Fat. de energia ref. junho - Templo',
  91.73,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2273374
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (11/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2023-08',
  3418635
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-10',
  'despesa',
  'Aluguel Casa Pastoral (7/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-08',
  4365147
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2273353
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-10',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-08',
  2260290
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-10',
  'receita',
  'Oferta de Gratidão',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260297
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-10',
  'receita',
  'Dízimos',
  170.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2023-08',
  2260293
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-12',
  'despesa',
  'Pilhas para o relógio',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2273493
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-13',
  'receita',
  'Oferta de Mantenedores',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-08',
  2260313
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-13',
  'receita',
  'Oferta de Israel',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-08',
  2260320
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-13',
  'receita',
  'Oferta Designada / Semeadura',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260309
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-13',
  'receita',
  'Oferta de Gratidão',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260306
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-13',
  'receita',
  'Oferta de Socorro (Povo)',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-08',
  2260316
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-13',
  'receita',
  'Dízimos',
  85.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-08',
  2260300
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-13',
  'receita',
  'Primícias',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260303
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-17',
  'receita',
  'Gratidão Diária',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-08',
  2260334
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-17',
  'receita',
  'Oferta de Mantenedores',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-08',
  2260346
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-17',
  'receita',
  'Oferta de Israel',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-08',
  2260349
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-17',
  'receita',
  'Oferta Designada / Semeadura',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260345
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-17',
  'receita',
  'Oferta de Gratidão',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260342
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-17',
  'receita',
  'Oferta de Socorro (Povo)',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-08',
  2260348
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-17',
  'receita',
  'Dízimos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-08',
  2260336
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-17',
  'receita',
  'Primícias',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260339
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-19',
  'receita',
  'REDE DE MULHERES',
  33.25,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260354
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-20',
  'receita',
  'Oferta de Gratidão',
  57.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2260800
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-24',
  'receita',
  'Oferta de Gratidão',
  294.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2300215
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-24',
  'receita',
  'Dízimo dona Jandira',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2023-08',
  2269897
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-24',
  'receita',
  'Dízimos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2023-08',
  2269886
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-26',
  'despesa',
  'Fat. de energia ref. junho - casa Pastoral',
  155.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2273363
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-27',
  'receita',
  'Contribuição Especial / Klebson',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-08',
  2292016
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-27',
  'receita',
  'Oferta de Gratidão',
  17.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2292018
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-31',
  'despesa',
  'ENERGIA DO TEMPLO REF. AO MÊS DE JULHO',
  86.35,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2300090
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-31',
  'receita',
  'Gratidão Diária',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-08',
  2292256
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-31',
  'receita',
  'Oferta de Mantenedores',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2023-08',
  2292634
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-31',
  'receita',
  'Oferta de Israel',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  NULL,
  '2023-08',
  2292641
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-31',
  'receita',
  'Oferta Designada / Semeadura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2292633
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-31',
  'receita',
  'Oferta de Gratidão',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2292631
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-31',
  'receita',
  'Oferta de Socorro (Povo)',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  NULL,
  '2023-08',
  2292638
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-31',
  'receita',
  'Dízimos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-08',
  2292253
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-31',
  'receita',
  'Dízimos',
  132.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-08',
  2292250
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-31',
  'receita',
  'Dízimos',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-08',
  2292248
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-31',
  'receita',
  'Dízimos',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-08',
  2292244
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-08-31',
  'receita',
  'Primícias',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-08',
  2300135
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-03',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2023-09',
  2390097
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-03',
  'receita',
  'Ailton de Morais Araújo',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2023-09',
  2390095
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-03',
  'receita',
  'Ailton de Morais Araújo',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-09',
  2390091
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-03',
  'receita',
  'Oferta de Gratidão',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-09',
  2390143
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-03',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-09',
  2390089
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-03',
  'receita',
  'Ailton de Morais Araújo',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2023-09',
  2390087
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-03',
  'receita',
  'Ailton de Morais Araújo',
  141.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-09',
  2390084
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-03',
  'receita',
  'Lucas Vinício Barboza da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2023-09',
  2390077
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-03',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-09',
  2390074
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-03',
  'receita',
  'Ailton de Morais Araújo',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-09',
  2390080
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-06',
  'despesa',
  'Fat. de energia ref. julho - Casa Pastoral',
  165.62,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-09',
  3136535
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-07',
  'receita',
  'Barbara Cristina da Silva Alves',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_568529',
  '2023-09',
  2390133
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-07',
  'receita',
  'Barbara Cristina da Silva Alves',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2023-09',
  2390129
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-07',
  'receita',
  'Oferta de Gratidão',
  68.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-09',
  2390140
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-07',
  'receita',
  'Barbara Cristina da Silva Alves',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2023-09',
  2390128
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-07',
  'receita',
  'Anderson Davi Ferreira da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2023-09',
  2390118
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-07',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-09',
  2390114
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-07',
  'receita',
  'Shirley Lopes Ferreira',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-09',
  2390108
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-07',
  'receita',
  'Barbara Cristina da Silva Alves',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_568529',
  '2023-09',
  2390125
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-07',
  'receita',
  'Barbara Cristina da Silva Alves',
  142.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2023-09',
  2390123
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-07',
  'receita',
  'Joede da Silva Viana',
  700.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2023-09',
  2390117
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-07',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2023-09',
  2390111
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-07',
  'receita',
  'Shirley Lopes Ferreira',
  275.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-09',
  2390103
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-07',
  'receita',
  'Barbara Cristina da Silva Alves',
  49.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2023-09',
  2390121
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (12/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2023-09',
  3418636
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-10',
  'despesa',
  'Aluguel Casa Pastoral (8/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-09',
  4365148
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-09',
  3136289
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-10',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2023-09',
  2390169
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-10',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2023-09',
  2390163
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-10',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-09',
  2390162
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-10',
  'receita',
  'Oferta de Gratidão',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-09',
  2390171
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-10',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-09',
  2390159
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-10',
  'receita',
  'Klebson Alves da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2023-09',
  2390157
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-10',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2023-09',
  2390173
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-10',
  'receita',
  'Klebson Alves da Silva',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-09',
  2390154
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-10',
  'receita',
  'Sueli Lourenço da Silva',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-09',
  2390147
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-10',
  'receita',
  'Klebson Alves da Silva',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-09',
  2390150
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-14',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-09',
  2390181
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-14',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-09',
  2390185
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-14',
  'receita',
  'Ageilda Gonçalo da Silva',
  84.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2023-09',
  2390178
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-17',
  'receita',
  'Oferta de Gratidão',
  65.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-09',
  2390193
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-20',
  'despesa',
  'Fat. de energia ref. agosto - Templo',
  62.13,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-09',
  3136538
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Naftali da Silva Gomes',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267751',
  '2023-09',
  2390235
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Maele Alves Gomes',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_543270',
  '2023-09',
  2390211
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Naftali da Silva Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-09',
  2390233
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Ailton de Morais Araújo',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-09',
  2390204
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Oferta de Gratidão',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-09',
  2390254
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-09',
  2390239
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Naftali da Silva Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-09',
  2390232
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Ailton de Morais Araújo',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-09',
  2390202
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Naftali da Silva Gomes',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267751',
  '2023-09',
  2390229
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Maele Alves Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_543270',
  '2023-09',
  2390198
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Maria Cicere Morais',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2023-09',
  2390248
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  170.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2023-09',
  2390242
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Naftali da Silva Gomes',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-09',
  2390226
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Maele Alves Gomes',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-09',
  2390197
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Naftali da Silva Gomes',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-09',
  2390215
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-21',
  'receita',
  'Maele Alves Gomes',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-09',
  2390195
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-24',
  'receita',
  'Maria Cícera Simão da Silva',
  54.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_273247',
  '2023-09',
  2390259
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-24',
  'receita',
  'Oferta de Gratidão',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-09',
  2390261
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-28',
  'receita',
  'Klebson Alves da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-09',
  2390274
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-28',
  'receita',
  'Maria Mércia Barboza da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270051',
  '2023-09',
  2390293
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-28',
  'receita',
  'Maria Mércia Barboza da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270051',
  '2023-09',
  2390291
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-28',
  'receita',
  'Maria Mércia Barboza da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2023-09',
  2390287
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-28',
  'receita',
  'Oferta de Gratidão',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-09',
  2390294
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-28',
  'receita',
  'Maria Mércia Barboza da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2023-09',
  2390285
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-28',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-09',
  2390271
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-28',
  'receita',
  'Maria Mércia Barboza da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270051',
  '2023-09',
  2390283
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-28',
  'receita',
  'Maria Mércia Barboza da Silva',
  49.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2023-09',
  2390280
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-28',
  'receita',
  'Jose Cicero Ferreira',
  132.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-09',
  2390270
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-28',
  'receita',
  'Joel da Silva Cano',
  3691.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_129323',
  '2023-09',
  2390268
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-28',
  'receita',
  'Maria Albuquerque Brandão Cano',
  105.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_129322',
  '2023-09',
  2390266
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-28',
  'receita',
  'Joseja Zacarias',
  220.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2023-09',
  2390265
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-28',
  'receita',
  'Maria Mércia Barboaza da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2023-09',
  2390277
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-29',
  'despesa',
  'Fat. de energia ref. outubro - Casa pastoral',
  120.07,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-09',
  3136541
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-09-30',
  'despesa',
  'Despesa de Combustível',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-09',
  3136494
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-01',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2023-10',
  2455748
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-01',
  'receita',
  'Ailton de Morais Araújo',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2023-10',
  2455746
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-01',
  'receita',
  'Ailton de Morais Araújo',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-10',
  2455742
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-01',
  'receita',
  'Oferta de Gratidão',
  60.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-10',
  2455765
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-01',
  'receita',
  'Daiane da Silva Costa Laurentino',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_278189',
  '2023-10',
  2455752
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-01',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-10',
  2455741
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-01',
  'receita',
  'Ailton de Morais Araújo',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2023-10',
  2455738
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-01',
  'receita',
  'Maria Albuquerque Brandão Cano',
  155.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_129322',
  '2023-10',
  2455759
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-01',
  'receita',
  'Alexsandra Ferreira da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2023-10',
  2455757
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-01',
  'receita',
  'Joel da Silva Cano',
  487.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_129323',
  '2023-10',
  2455754
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-01',
  'receita',
  'Ailton de Morais Araújo',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-10',
  2455736
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-01',
  'receita',
  'Ailton de Morais Araújo',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-10',
  2455734
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-05',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-10',
  2455780
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-05',
  'receita',
  'Oferta de Gratidão',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-10',
  2455782
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-05',
  'receita',
  'Shirley Lopes Ferreira',
  275.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-10',
  2455777
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-05',
  'receita',
  'Sueli lourenço da Silva',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-10',
  2455773
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-05',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2023-10',
  2455771
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-06',
  'receita',
  'Mensalidade Inglês (Deivinho)',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-10',
  2383486
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-06',
  'receita',
  'Manutenção de impressora (Escola Denilma)',
  350.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-10',
  2383484
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-07',
  'despesa',
  'Parafusos com ruelas',
  3.36,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-10',
  2384817
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-07',
  'receita',
  'Manutenção de Impressora - Alessandra',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-10',
  2384751
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-08',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2023-10',
  2455802
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-08',
  'receita',
  'Klebson Alves da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2023-10',
  2455801
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-08',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-10',
  2455796
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-08',
  'receita',
  'Oferta de Gratidão',
  74.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-10',
  2455821
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-08',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-10',
  2455794
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-08',
  'receita',
  'Klebson Alves da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2023-10',
  2455790
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-08',
  'receita',
  'Radayane Gomes Cardoso Ferreira',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2023-10',
  2455817
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-08',
  'receita',
  'Lucas Vinício Barboza da Silva',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2023-10',
  2455812
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-08',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  170.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2023-10',
  2455809
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-08',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2023-10',
  2455807
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-08',
  'receita',
  'Klebson Alves da Silva',
  46.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-10',
  2455789
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-08',
  'receita',
  'Klebson Alves da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-10',
  2455788
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (13/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2023-10',
  3418637
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-10',
  'despesa',
  'Fat. de energia ref. setembro - Casa Pastoral',
  180.47,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-10',
  3136360
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-10',
  'despesa',
  'Aluguel Casa Pastoral (9/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-10',
  4365149
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-10',
  3136273
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-12',
  'receita',
  'Oferta de Gratidão',
  41.25,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2023-10',
  2455837
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-12',
  'receita',
  'Anderson Davi Ferreira da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2023-10',
  2455831
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-12',
  'receita',
  'Maria Albuquerque Brandão Cano',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_129322',
  '2023-10',
  2455828
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-12',
  'receita',
  'Joede da Silva Viana',
  630.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2023-10',
  2455824
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-15',
  'receita',
  'Oferta de Gratidão',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-10',
  2455846
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-15',
  'receita',
  'Ailton de Morais Araujo',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-10',
  2455843
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-15',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2023-10',
  2455841
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-15',
  'receita',
  'Maria Cicera de Morais Araujo',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2023-10',
  2455840
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-19',
  'receita',
  'Oferta de Gratidão',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-10',
  2455848
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-21',
  'despesa',
  'M C DE ALMEIDA ALIMENTOS',
  8.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46947),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-10',
  3136438
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-22',
  'receita',
  'Klebson Alves da Silva',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-10',
  2455853
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-22',
  'receita',
  'Maele Alves Gomes',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_543270',
  '2023-10',
  2455876
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-22',
  'receita',
  'Naftali da Silva Gomes',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267751',
  '2023-10',
  2455866
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-22',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-10',
  2455873
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-22',
  'receita',
  'Naftali da Silva Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-10',
  2455864
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-22',
  'receita',
  'Oferta de Gratidão',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-10',
  2455882
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-22',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-10',
  2455872
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-22',
  'receita',
  'Naftali da Silva Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-10',
  2455861
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-22',
  'receita',
  'Maele Alves Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_543270',
  '2023-10',
  2455871
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-22',
  'receita',
  'Naftali da Silva Gomes',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267751',
  '2023-10',
  2455859
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-22',
  'receita',
  'Maele Alves Gomes',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-10',
  2455870
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-22',
  'receita',
  'Naftali da Silva Gomes',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-10',
  2455857
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-22',
  'receita',
  'Maele Alves Gomes',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-10',
  2455869
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-22',
  'receita',
  'Naftali da Silva Gomes',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-10',
  2455855
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-26',
  'receita',
  'Klebson ALves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-10',
  2455889
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-26',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_568371',
  '2023-10',
  2455903
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-26',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568371',
  '2023-10',
  2455901
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-26',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2023-10',
  2455986
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-26',
  'receita',
  'Oferta de Gratidão',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-10',
  2455921
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-26',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_568371',
  '2023-10',
  2455899
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-26',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568371',
  '2023-10',
  2455896
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-26',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568371',
  '2023-10',
  2455895
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-29',
  'receita',
  'Klebson Alves da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-10',
  2455929
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-29',
  'receita',
  'Oferta de Gratidão',
  83.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-10',
  2455933
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-29',
  'receita',
  'Alexsandra Ferreira da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2023-10',
  2455907
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-10-30',
  'despesa',
  'Fat. de energia ref. setembro - Templo',
  123.61,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-10',
  3136362
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-02',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2023-11',
  2565913
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-02',
  'receita',
  'Klebson Alves da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2023-11',
  2565912
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-02',
  'receita',
  'Oferta vigília dança',
  47.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-11',
  2565918
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-02',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-11',
  2565911
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-02',
  'receita',
  'Josenildo Zacarias da Silva',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_567732',
  '2023-11',
  2565921
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-02',
  'receita',
  'Anderson Davi Ferreira da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2023-11',
  2565915
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-02',
  'receita',
  'Klebson Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-11',
  2565910
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-02',
  'receita',
  'Klebson Alves da Silva',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2023-11',
  2565908
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-02',
  'receita',
  'Shirley Lopes Ferreira',
  275.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-11',
  2565916
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-02',
  'receita',
  'Klebson Alves da Silva',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-11',
  2565884
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-02',
  'receita',
  'Klebson Alves da Silva',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-11',
  2565882
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'despesa',
  'Despesa Santa Ceia',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 65331),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-11',
  2565867
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2023-11',
  2565955
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'receita',
  'Ailton de Morais Araújo',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2023-11',
  2565952
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'receita',
  'Ailton de Morais Araújo',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-11',
  2565948
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'receita',
  'Ofertas de Gratidão',
  99.75,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-11',
  2565985
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-11',
  2565945
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'receita',
  'Ailton de Morais Araújo',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2023-11',
  2565942
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'receita',
  'Sueli Lourenço da Silva',
  190.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-11',
  2565978
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'receita',
  'Maria Albuquerque Brandão Cano',
  148.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_129322',
  '2023-11',
  2565974
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'receita',
  'Joel da Silva Cano',
  240.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_129323',
  '2023-11',
  2565966
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-11',
  2565961
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'receita',
  'Ailton de Morais Araújo',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-11',
  2565939
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'receita',
  'José Cicero Ferreira do Nascimento',
  132.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-11',
  2565932
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2023-11',
  2565929
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-05',
  'receita',
  'Ailton de Morais Araújo',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-11',
  2565936
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-08',
  'receita',
  'OFERTA DESTINADA AO Pr. JADSON',
  1200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-11',
  2556034
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-09',
  'receita',
  'Ofertas de Gratidão',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-11',
  2565996
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-09',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-11',
  2565992
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-09',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2023-11',
  2565990
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-09',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  170.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2023-11',
  2565988
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (14/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2023-11',
  3418638
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-10',
  'despesa',
  'Aluguel Casa Pastoral (10/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-11',
  4365150
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-11',
  3136292
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-12',
  'despesa',
  'Fat. de energia ref. outubro - Casa Pastoral',
  166.34,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-11',
  3136363
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-12',
  'receita',
  'Ofertas de Gratidão',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-11',
  2566009
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-14',
  'despesa',
  'Fat. de energia ref. outubro - Templo',
  101.54,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-11',
  3136371
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-16',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2023-11',
  2570904
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-17',
  'despesa',
  'Congresso 2023',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-11',
  3136385
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-22',
  'receita',
  'Manutenção impressora (Dagoberto)',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2023-11',
  2509603
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-23',
  'receita',
  'Ofertas de Gratidão',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2023-11',
  2566016
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-23',
  'receita',
  'Maria Cicera de Morais',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2023-11',
  2566015
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-26',
  'receita',
  'Ofertas de Gratidão',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-11',
  2566025
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-26',
  'receita',
  'Klebson Alves da Silva',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-11',
  2566018
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Klebson Alves da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-11',
  2566056
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Maele Alves Gomes',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_543270',
  '2023-11',
  2566049
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Naftali da Silva Gomes',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267751',
  '2023-11',
  2566039
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-11',
  2566048
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Naftali da Silva Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-11',
  2566037
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Ofertas de Gratidão',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-11',
  2566060
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Vanúsia Marculino',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_137387',
  '2023-11',
  2566057
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-11',
  2566055
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-11',
  2566047
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Naftali da Silva Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-11',
  2566036
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Maele Alves Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_543270',
  '2023-11',
  2566046
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Naftali da Silva Gomes',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267751',
  '2023-11',
  2566034
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'José Cicero Ferreira do Nascimento',
  132.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-11',
  2566053
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Maele Alves Gomes',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-11',
  2566045
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2023-11',
  2566042
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Naftali da Silva Gomes',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-11',
  2566031
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Maele Alves Gomes',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-11',
  2566043
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-11-30',
  'receita',
  'Naftali da Silva Gomes',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-11',
  2566027
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Maria Cícera Simão da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_273247',
  '2023-12',
  2633055
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2023-12',
  2632977
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Josielma Zacarias de Morais',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270272',
  '2023-12',
  2633047
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Klebson Alves da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2023-12',
  2632973
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Josielma Zacarias de Morais',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-12',
  2633026
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-12',
  2632968
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Anderson davi Ferreira da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2023-12',
  2633342
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Ofertas de Gratidão',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-12',
  2633079
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Josielma Zacarias de Morais',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-12',
  2633016
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-12',
  2632966
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Josielma Zacarias de Morais',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270272',
  '2023-12',
  2633009
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Klebson Alves da Silva',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2023-12',
  2632959
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Shirley Lopes Ferreira',
  275.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-12',
  2633068
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Josielma Zacarias de Morais',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-12',
  2632996
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Klebson Alves da Silva',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-12',
  2632946
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Josielma Zacarias de Morais',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-12',
  2632989
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-03',
  'receita',
  'Klebson Alves da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-12',
  2632945
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-07',
  'receita',
  'Ofertas de Gratidão',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-12',
  2633147
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-07',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-12',
  2633142
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-07',
  'receita',
  'Joel da Silva Cano',
  500.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_129323',
  '2023-12',
  2633137
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-07',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2023-12',
  2633126
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-07',
  'receita',
  'Radayane Gomes Cardoso Ferreira',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2023-12',
  2633123
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-07',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  170.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2023-12',
  2633114
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-09',
  'receita',
  'Radayane Gomes Cardoso Ferreira',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2023-12',
  2633156
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-09',
  'receita',
  'Rede de Mulheres',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-12',
  2633152
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (15/26)',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2023-12',
  3418639
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-10',
  'despesa',
  'Aluguel Casa Pastoral (11/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2023-12',
  4365151
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-12',
  3136301
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-10',
  'receita',
  'Sueli Lourenço da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2023-12',
  2633177
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-10',
  'receita',
  'Sueli Lourenço da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-12',
  2633173
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-10',
  'receita',
  'Ofertas de Gratidão',
  27.25,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-12',
  2633212
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-10',
  'receita',
  'Oferta de Gratidão',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_141623',
  '2023-12',
  2633204
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-10',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-12',
  2633185
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-10',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-12',
  2633167
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-10',
  'receita',
  'Sueli Lourenço da Silva',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2023-12',
  2633164
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-10',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  365.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2023-12',
  2633183
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-10',
  'receita',
  'Sueli Lourenço da Silva',
  128.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-12',
  2633163
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-10',
  'receita',
  'Sueli Lourenço da Silva',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-12',
  2633161
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-14',
  'despesa',
  'Adriano de Araujo Lima',
  6.99,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-12',
  3136435
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-14',
  'despesa',
  'União fest',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-12',
  3136428
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-14',
  'despesa',
  'Antônio da Silva - União',
  15.7,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-12',
  3136416
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-14',
  'receita',
  'Ofertas de Gratidão',
  95.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-12',
  2633231
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-14',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2023-12',
  2633227
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'despesa',
  'Fat. de energia ref. novembro - Casa Pastoral',
  187.93,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-12',
  3136376
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Naftali da Silva Gomes',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267751',
  '2023-12',
  2633292
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Maele Alves Gomes',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_543270',
  '2023-12',
  2633264
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Naftali da Silva Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-12',
  2633289
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-12',
  2633261
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Ofertas de Gratidão',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-12',
  2633324
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Naftali da Silva Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-12',
  2633285
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-12',
  2633255
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-12',
  2633239
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Naftali da Silva Gomes',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267751',
  '2023-12',
  2633281
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Maele Alves Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_543270',
  '2023-12',
  2633253
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2023-12',
  2633309
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Joel da Silva Cano',
  472.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_129323',
  '2023-12',
  2633302
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Joede da Silva Viana',
  410.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2023-12',
  2633296
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Naftali da Silva Gomes',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-12',
  2633278
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Maele Alves Gomes',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-12',
  2633249
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Naftali da Silva Gomes',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2023-12',
  2633271
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-17',
  'receita',
  'Maele Alves Gomes',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2023-12',
  2633246
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-20',
  'despesa',
  'Fat. de energia ref. novembro - Templo',
  0.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-12',
  3136338
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-21',
  'receita',
  'Anderson Davi Ferreira da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2023-12',
  2633645
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-21',
  'receita',
  'Ofertas de Gratidão',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-12',
  2633379
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-21',
  'receita',
  'klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-12',
  2633337
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-21',
  'receita',
  'Shirley Lopes Ferreira',
  268.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2023-12',
  2633360
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-21',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2023-12',
  2633352
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-24',
  'receita',
  'Sueli Lourenço da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2023-12',
  2633406
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-24',
  'receita',
  'Sueli Lourenço da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-12',
  2633400
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-24',
  'receita',
  'Ofertdas de Gratidão',
  54.25,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-12',
  2633414
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-24',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-12',
  2633399
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-24',
  'receita',
  'Sueli Lourenço da Silva',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2023-12',
  2633396
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-24',
  'receita',
  'Sueli Lourenço da Silva',
  128.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-12',
  2633394
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-24',
  'receita',
  'Sueli Lourenço da Silva',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2023-12',
  2633391
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-28',
  'receita',
  'Ofertas de Gratidão',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-12',
  2633441
) ON CONFLICT (enuves_id) DO NOTHING;

COMMIT;
