-- ==============================================================
-- IMPORTAÇÃO ENUVES - PARTE 3 de 5
-- ==============================================================

BEGIN;

-- IMPORTAÇÃO DE TRANSAÇÕES FINANCEIRAS (Lote 3)

INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-28',
  'receita',
  'José Cicero Ferreira',
  132.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-12',
  2633437
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-28',
  'receita',
  'Joel da Silva Cano',
  295.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_129323',
  '2023-12',
  2633433
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-28',
  'receita',
  'Maria Albuquerque Brandão Cano',
  74.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_129322',
  '2023-12',
  2633426
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-28',
  'receita',
  'Joel da Silva Cano',
  210.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_129323',
  '2023-12',
  2633419
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-31',
  'receita',
  'Klebson Alves da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-12',
  2633484
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-31',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2023-12',
  2633474
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-31',
  'receita',
  'Ailton de Morais Araújo',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2023-12',
  2633473
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-31',
  'receita',
  'Ailton de Morais Araújo',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-12',
  2633468
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-31',
  'receita',
  'Ofertas de Gratidão',
  99.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2023-12',
  2633494
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-31',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2023-12',
  2633479
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-31',
  'receita',
  'Ailton de Morais Araújo',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-12',
  2633465
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-31',
  'receita',
  'Ailton de Morais Araújo',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2023-12',
  2633462
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-31',
  'receita',
  'José Cicero Ferreira',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2023-12',
  2633487
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-31',
  'receita',
  'Ailton de Morais Araújo',
  141.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-12',
  2633459
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2023-12-31',
  'receita',
  'Ailton de Morais Araújo',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2023-12',
  2633453
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-01',
  'despesa',
  'Papel contato',
  13.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46404),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  3136450
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-04',
  'receita',
  'Shirley Lopes Ferreira',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-01',
  2737432
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-04',
  'receita',
  'Shirley Lopes Ferreira',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-01',
  2737425
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-04',
  'receita',
  'Ofertas de Gratidão',
  62.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  2737495
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-04',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-01',
  2737442
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-04',
  'receita',
  'Shirley Lopes Ferreira',
  265.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-01',
  2737423
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-04',
  'receita',
  'Radayane Gomes Cardoso Ferreira',
  122.1,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2024-01',
  2737411
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-06',
  'despesa',
  'Pão solvado',
  10.67,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46947),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  3136461
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-07',
  'receita',
  'Sueli Lourenço da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2024-01',
  2667784
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-07',
  'receita',
  'Sueli Lourenço da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-01',
  2667783
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-07',
  'receita',
  'Ofertas de Gratidão',
  96.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  2667803
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-07',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2667788
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-07',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-01',
  2667782
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-07',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  279.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-01',
  2667769
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-07',
  'receita',
  'Anderson Davi Ferreira da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-01',
  2667765
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-07',
  'receita',
  'Sueli Lourenço da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2024-01',
  2667781
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-07',
  'receita',
  'Sueli Lourenço da Silva',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-01',
  2667773
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-07',
  'receita',
  'Josielma Zacarias de Morais',
  248.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2024-01',
  2667763
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-07',
  'receita',
  'Janio Silva Viana',
  234.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_143243',
  '2024-01',
  2667760
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-07',
  'receita',
  'Joede da Silva Viana',
  705.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2024-01',
  2667758
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-07',
  'receita',
  'Shirley Lopes Ferreira',
  176.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-01',
  2667757
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-07',
  'receita',
  'Sueli Lourenço da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-01',
  2667771
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (16/26)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2024-01',
  3418640
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-10',
  'despesa',
  'Pilhas para o relógio',
  3.3,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  3136434
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-10',
  'despesa',
  'Aluguel Casa Pastoral (12/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2024-01',
  4365152
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  3136280
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-11',
  'despesa',
  'Fat. de energia ref. dezembro - Templo',
  135.75,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  3136370
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-11',
  'despesa',
  'Papel paraná',
  16.4,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46404),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  3136454
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-11',
  'receita',
  'Ofertas de Gratidão',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  2667825
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-11',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2667821
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-11',
  'receita',
  'Jardele Delmiro',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559798',
  '2024-01',
  2667819
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-11',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2024-01',
  2667809
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-12',
  'despesa',
  'Fat. de energia ref. dezembro - Casa Pastoral',
  175.68,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  3136373
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-14',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2671515
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-14',
  'receita',
  'Klebson Alves da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2671511
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-14',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2671478
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-14',
  'receita',
  'Ofertas de Gratidão',
  66.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  2671521
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-14',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2671469
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-14',
  'receita',
  'Klebson Alves da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2671465
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-14',
  'receita',
  'Klebson Alves da Silva',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2671456
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-14',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2024-01',
  2671439
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-14',
  'receita',
  'Maria Albuquerque Brandão Cano',
  72.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_129322',
  '2024-01',
  2671433
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-14',
  'receita',
  'Shirley Lopes Ferreira',
  88.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-01',
  2671424
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-14',
  'receita',
  'Klebson Alves da Silva',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2671453
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-16',
  'despesa',
  'Despesa de Combustível',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  3136443
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-18',
  'receita',
  'Ofertas de Gratidão',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  2737642
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-18',
  'receita',
  'Shirley Lopes Ferreira',
  142.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-01',
  2737637
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-18',
  'receita',
  'Radayane Gomes Cardoso  Ferreira',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2024-01',
  2737633
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-21',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737691
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-21',
  'receita',
  'Klebson Alves da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737688
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-21',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737685
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-21',
  'receita',
  'Ofertas de Gratidão',
  108.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  2737700
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-21',
  'receita',
  'Klebson Alves da Silva',
  0.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737682
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-21',
  'receita',
  'Klebson Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737678
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-21',
  'receita',
  'Klebson Alves da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737675
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-21',
  'receita',
  'Klebson Alves da Silva',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737652
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-21',
  'receita',
  'Klebson Alves da Silva',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737650
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-23',
  'despesa',
  'Despesa de Combustível',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  3136394
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-25',
  'receita',
  'Ofertas de Gratidão',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  2737709
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-25',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737703
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Maria Mércia Barboza da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270051',
  '2024-01',
  2737801
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737740
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Maria Mércia Barboza da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270051',
  '2024-01',
  2737798
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Klebson Alves da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737739
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Klebson Alves da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737734
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Maria Mércia Barboza da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2024-01',
  2737795
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Klebson Alves da Silva',
  103.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737732
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Ofertas de Gratidão',
  61.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-01',
  2737812
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Maria Mércia Barboza da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2024-01',
  2737794
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737727
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Maria Mércia Barboza da Silva',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270051',
  '2024-01',
  2737792
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Klebson Alves da Silva',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737724
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Maria Mércia Barboza da Silva',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2024-01',
  2737770
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Klebson Alves da Silva',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737720
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-01',
  2737717
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Maria Mércia Barboza da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2024-01',
  2737744
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-01-28',
  'receita',
  'Klebson Alves da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-01',
  2737719
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-02-01',
  'receita',
  'Oferta de Gratidão (Campanha de Janeiro)',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-02',
  2736224
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-02-04',
  'receita',
  'Manutenção de computador',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2024-02',
  2736219
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-02-04',
  'receita',
  'Ofertas feitas pelo pix',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-02',
  2736218
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-02-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (17/26)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2024-02',
  3418641
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-02-10',
  'despesa',
  'Aluguel Casa Pastoral (13/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2024-02',
  4365153
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-02-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-02',
  3136299
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-02-12',
  'despesa',
  'Fat. de energia ref. janeiro - Casa Pastoral',
  161.92,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-02',
  3136378
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-02-13',
  'despesa',
  'Fat. de energia ref. janeiro - Templo',
  139.15,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-02',
  3136326
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2935719
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Ailton Morais de Araujo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2024-03',
  2935697
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Klebson Alves da Silva',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2935718
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Ailton Morais de Araujo',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2024-03',
  2935694
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Maycon Douglas Lucio de França',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2935639
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2935716
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Ailton Morais de Araujo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-03',
  2935690
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Maycon Douglas Lucio de França',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2935638
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-03',
  2940287
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Ofertas de Gratidão',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-03',
  2935734
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2935715
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-03',
  2935703
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Anderson Davi Ferreira da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-03',
  2935655
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Maycon Douglas Lucio de França',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2935624
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Klebson Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2935714
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Ailton Morais de Araujo',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2024-03',
  2935675
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Maycon Douglas Lucio de França',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2935605
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Josefa Zacarias',
  240.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2024-03',
  2935725
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Jose Cicero Ferreira',
  141.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-03',
  2935723
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Lucas Vinício Barboza da Silva',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2024-03',
  2935721
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Klebson Alves da Silva',
  72.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2935712
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-03',
  2935702
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Maria Cicera Morais',
  82.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2024-03',
  2935698
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Ailton Morais de Araujo',
  194.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-03',
  2935674
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Shirley Lopes Ferreira',
  400.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-03',
  2935658
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Maycon Douglas Lucio de França',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2935603
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Klebson Alves da Silva',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2935710
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Ailton Morais de Araujo',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-03',
  2935672
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-03',
  'receita',
  'Maycon Douglas Lucio de França',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2935601
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-07',
  'receita',
  'Sueli Lourenço da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2024-03',
  2935760
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-07',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-03',
  2935756
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-07',
  'receita',
  'Ofertas de Gratidão',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-03',
  2935800
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-07',
  'receita',
  'Josenildo Zacarias da Silva',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_567732',
  '2024-03',
  2935780
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-07',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2935775
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-07',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-03',
  2935769
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-07',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-03',
  2935753
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-07',
  'receita',
  'Sueli Lourenço da Silva',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2024-03',
  2935751
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-07',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-03',
  2935782
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-07',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  166.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-03',
  2935768
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-07',
  'receita',
  'Sueli Lourenço da Silva',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-03',
  2935749
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-07',
  'receita',
  'Sueli Lourenço da Silva',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-03',
  2935746
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-09',
  'despesa',
  'Fat. de energia ref. fevereiro - Casa Pastoral',
  179.59,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-03',
  3136353
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-09',
  'receita',
  'Rede de mulheres',
  181.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-03',
  2937722
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (18/26)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2024-03',
  3418642
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-10',
  'despesa',
  'Aluguel Casa Pastoral (14/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2024-03',
  4365154
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-03',
  3136287
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-10',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937602
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-10',
  'receita',
  'Klebson Alves da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937601
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-10',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937600
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-10',
  'receita',
  'Ofertas de Gratidão',
  64.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-03',
  2937603
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-10',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937599
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-10',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937598
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-10',
  'receita',
  'Klebson Alves da Silva',
  64.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937597
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-10',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2024-03',
  2937594
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-10',
  'receita',
  'Klebson Alves da Silva',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937596
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-11',
  'despesa',
  'Fat. de energia ref. fevereiro - Templo',
  128.49,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-03',
  3136356
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-14',
  'receita',
  'Ofertas de Gratidão',
  115.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-03',
  2937608
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-14',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937605
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-14',
  'receita',
  'Joede da Silva Viana',
  615.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2024-03',
  2937604
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937617
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Maycon Douglas Lucio de França',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2937624
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Klebson Alves da Silva',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937616
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Maycon Douglas Lucio de França',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2937623
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Klebson Alves da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937615
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Josefa Zacarias',
  1000.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2024-03',
  2937609
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Ofertas de Gratidão',
  102.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-03',
  2937625
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Maycon Douglas Lucio de França',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2937622
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937614
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Maycon Douglas Lucio de França',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2937620
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Klebson Alves da Silva',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937613
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Maycon Douglas Lucio de França',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2937619
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Klebson Alves da Silva',
  111.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937612
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Maycon Douglas Lucio de França',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2937618
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-17',
  'receita',
  'Klebson Alves da Silva',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937610
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-21',
  'receita',
  'Ofertas de Gratidão',
  81.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-03',
  2937628
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-21',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2024-03',
  2937627
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-24',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937641
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-24',
  'receita',
  'Klebson Alves da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937640
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-24',
  'receita',
  'Klebson Alves da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937639
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-24',
  'receita',
  'Ofertas de Gratidão',
  113.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-03',
  2937642
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-24',
  'receita',
  'Klebson Alves da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937638
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-24',
  'receita',
  'Klebson Alves da Silva',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937637
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-24',
  'receita',
  'Klebson Alves da Silva',
  158.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937633
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-24',
  'receita',
  'Klebson Alves da Silva',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937631
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-28',
  'receita',
  'Klebson Alves da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937678
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-28',
  'receita',
  'Ofertas de Gratidão',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-03',
  2937679
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-28',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937676
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-28',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-03',
  2937667
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-28',
  'receita',
  'Alexsandra Ferreira da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2024-03',
  2937670
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-28',
  'receita',
  'Josefa Zacaria Martins',
  240.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2024-03',
  2937668
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-28',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  172.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-03',
  2937666
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-29',
  'receita',
  'Capacitação de introdutores',
  79.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-03',
  2937724
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-31',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937707
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-31',
  'receita',
  'Maycon Douglas Lucio de França',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2937719
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-31',
  'receita',
  'Klebson Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937705
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-31',
  'receita',
  'Maycon Douglas Lucio de França',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2937716
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-31',
  'receita',
  'Klebson Alves da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937704
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-31',
  'receita',
  'Ofertas de Gratidão',
  69.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-03',
  2937721
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-31',
  'receita',
  'Maycon Douglas Lucio de França',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2937715
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-31',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937691
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-31',
  'receita',
  'Maycon Douglas Lucio de França',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2937713
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-31',
  'receita',
  'Klebson Alves da Silva',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937689
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-31',
  'receita',
  'Maycon Douglas Lucio de França',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2937710
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-31',
  'receita',
  'Klebson Alves da Silva',
  137.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937683
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-31',
  'receita',
  'Maycon Douglas Lucio de França',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-03',
  2937708
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-03-31',
  'receita',
  'Klebson Alves da Silva',
  48.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-03',
  2937682
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-03',
  'despesa',
  'Tinta corante',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46407),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-04',
  3136465
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Radayane Gomes Cardoso Ferreira',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_565790',
  '2024-04',
  3033904
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Radayane Gomes Cardoso Ferreira',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2024-04',
  3033903
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Shirley Lopes Ferreira',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-04',
  3033895
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Ofertas de Gratidão',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-04',
  3033913
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Radayane Gomes Cardoso Ferreira',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2024-04',
  3033910
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Anderson Davi Ferreira da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-04',
  3033908
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Lucas Vinício Barboza da Silva',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2024-04',
  3033907
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Radayane Gomes Cardoso Ferreira',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2024-04',
  3033902
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3033892
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Radayane Gomes Cardoso Ferreira',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_565790',
  '2024-04',
  3033901
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Lucas Vinício Barboza da Silva',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2024-04',
  3033905
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Radayane Gomes Cardoso Ferreira',
  127.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2024-04',
  3033900
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-04',
  3033897
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Jose Cicero Ferreira',
  142.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-04',
  3033896
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Shirley Lopes Ferreira',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-04',
  3033894
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Radayane Gomes Cardoso Ferreira',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2024-04',
  3033898
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-04',
  'receita',
  'Shirley Lopes Ferreira',
  93.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-04',
  3033893
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-06',
  'receita',
  'Oferta do profeta',
  1000.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-04',
  3034515
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-06',
  'receita',
  'Joel da Silva Cano',
  4420.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_129323',
  '2024-04',
  3033890
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Klebson Alve da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3033963
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2024-04',
  3033931
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Klebson Alve da Silva',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3033962
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Sueli Lourenço da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2024-04',
  3033942
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Ailton de Morais Araújo',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2024-04',
  3033930
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Klebson Alve da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3033960
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-04',
  3033939
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-04',
  3033928
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Ofertas de Gratidão',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-04',
  3033979
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Klebson Alve da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3033958
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-04',
  3033938
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-04',
  3033925
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Sueli Lourenço da Silva',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2024-04',
  3034195
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Klebson Alve da Silva',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3033955
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Ailton de Morais Araújo',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2024-04',
  3033923
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Klebson Alve da Silva',
  116.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3033953
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2024-04',
  3033948
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  210.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-04',
  3033945
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Sueli Lourenço da Silva',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-04',
  3033937
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Ailton de Morais Araújo',
  194.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-04',
  3033921
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Klebson Alve da Silva',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3033952
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Sueli Lourenço da Silva',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-04',
  3033935
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Ailton de Morais Araújo',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-04',
  3033920
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-07',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2024-04',
  3033917
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-09',
  'despesa',
  'Despesa de Combustível',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-04',
  3136441
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (19/26)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2024-04',
  3418643
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-10',
  'despesa',
  'Aluguel Casa Pastoral (15/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2024-04',
  4365155
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-04',
  3136275
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-11',
  'despesa',
  'Fat. de energia ref. março - Casa Pastoral',
  191.04,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-04',
  3136345
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-11',
  'despesa',
  'Fat. de energia ref. março - Templo',
  116.02,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-04',
  3136342
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-11',
  'receita',
  'Ofertas de Gratidão',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-04',
  3033985
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-11',
  'receita',
  'Radayane Gomes Cardoso Ferreira',
  15.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2024-04',
  3033983
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-13',
  'receita',
  'Rede de Jovens',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-04',
  3034040
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-14',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3034032
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-14',
  'receita',
  'Klebson Alves da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3034028
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-14',
  'receita',
  'Klebson Alves da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3034026
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-14',
  'receita',
  'Ofertas de Gratidão',
  60.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-04',
  3034036
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-14',
  'receita',
  'Klebson Alves da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3034022
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-14',
  'receita',
  'Klebson Alves da Silva',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269579',
  '2024-04',
  3034020
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-14',
  'receita',
  'Alexsandro Ferreira dde Albuquerque',
  1156.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-04',
  3034014
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-14',
  'receita',
  'Klebson Alves da Silva',
  147.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-04',
  3034018
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-14',
  'receita',
  'Klebson Alves da Silva',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-04',
  3034015
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-18',
  'receita',
  'Ofertas de Gratidão',
  72.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-04',
  3034050
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-18',
  'receita',
  'Joede da Silva Viana',
  652.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2024-04',
  3034045
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-21',
  'receita',
  'Maycon Douglas Lucio de França',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269296',
  '2024-04',
  3034067
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-21',
  'receita',
  'Maycon Douglas Lucio de França',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-04',
  3034066
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-21',
  'receita',
  'Ofertas de Gratidão',
  115.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-04',
  3034069
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-21',
  'receita',
  'Maycon Douglas Lucio de França',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-04',
  3034065
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-21',
  'receita',
  'Maycon Douglas Lucio de França',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269296',
  '2024-04',
  3034063
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-21',
  'receita',
  'Maycon Douglas Lucio de França',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-04',
  3034062
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-21',
  'receita',
  'Maycon Douglas Lucio de França',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-04',
  3034061
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Klebson Alves da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3034079
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3034082
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Maycon Douglas Lucio de França',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269296',
  '2024-04',
  3034090
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Klebson Alves da Silva',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3034081
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Maycon Douglas Lucio de França',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-04',
  3034088
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Klebson Alves da Silva',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3034080
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Ofertas de Gratidão',
  99.75,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-04',
  3034094
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Maycon Douglas Lucio de França',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-04',
  3034087
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Klebson Alves da Silva',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3034078
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Maycon Douglas Lucio de França',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269296',
  '2024-04',
  3034086
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Klebson Alves da Silva',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3034077
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Maycon Douglas Lucio de França',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-04',
  3034085
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Klebson Alves da Silva',
  217.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3034076
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Josefa Zacarias',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2024-04',
  3034071
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Maycon Douglas Lucio de França',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-04',
  3034084
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-04-28',
  'receita',
  'Klebson Alves da Silva',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-04',
  3034073
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-02',
  'despesa',
  'Resma A4',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3136470
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-02',
  'despesa',
  'Despesa de Combustível',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3136425
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-02',
  'despesa',
  'Lâmina para estilete',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46404),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3136473
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-02',
  'receita',
  'Ofertas de Gratidão',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-05',
  3165294
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-02',
  'receita',
  'Anderson Davi Ferreira da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-05',
  3165285
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-02',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3165280
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-02',
  'receita',
  'José Cicero Ferreira',
  142.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-05',
  3165290
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3123996
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2024-05',
  3123964
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Asaph Oliveira Viana',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_267869',
  '2024-05',
  3123943
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Klebson Alves da Silva',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3123995
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ailton de Morais Araújo',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2024-05',
  3123962
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Asaph Oliveira Viana',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267869',
  '2024-05',
  3123941
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ashley Oliveira Viana',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267868',
  '2024-05',
  3123921
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Klebson Alves da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3123992
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-05',
  3123958
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Asaph Oliveira Viana',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267869',
  '2024-05',
  3123938
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ashley Oliveira Viana',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267868',
  '2024-05',
  3123920
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ofertas de Gratidão',
  101.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3124002
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3123988
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Anderson Davi Ferreira da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-05',
  3123969
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-05',
  3123955
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Asaph Oliveira Viana',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267869',
  '2024-05',
  3123935
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ashley Oliveira Viana',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267868',
  '2024-05',
  3123918
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Klebson Alves da Silva',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3123986
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ailton de Morais Araújo',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2024-05',
  3123952
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Asaph Oliveira Viana',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267869',
  '2024-05',
  3123933
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ashley Oliveira Viana',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267868',
  '2024-05',
  3123914
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Klebson Alves da Silva',
  85.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3123984
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Daiane da Silva Costa Laurentino',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_278189',
  '2024-05',
  3123977
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2024-05',
  3123976
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2024-05',
  3123975
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Shirley Lopes Ferreira',
  256.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-05',
  3123974
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ailton de Morais Araújo',
  194.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-05',
  3123950
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Asaph Oliveira Viana',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267869',
  '2024-05',
  3123929
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ashley Oliveira Viana',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267868',
  '2024-05',
  3123911
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Klebson Alves da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3123980
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Shirley Lopes Ferreira',
  89.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-05',
  3123973
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ailton de Morais Araújo',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-05',
  3123948
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Asaph Oliveira Viana',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267869',
  '2024-05',
  3123928
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-05',
  'receita',
  'Ashley Oliveira Viana',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267868',
  '2024-05',
  3123909
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-09',
  'despesa',
  'Fat. d energia ref. abril - Casa Pastoral',
  187.79,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3136333
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-09',
  'despesa',
  'Fat. de energia ref. abril - Templo',
  118.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3136330
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-09',
  'receita',
  'Ofertas de Gratidão',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3122218
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-09',
  'receita',
  'Maria José Ferreira de Araújo Silva',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2024-05',
  3122212
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-09',
  'receita',
  'Maria José ferreira de Araújo Silva',
  292.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2024-05',
  3122206
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-09',
  'receita',
  'Joede da Silva Viana',
  700.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2024-05',
  3122201
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (20/26)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2024-05',
  3418644
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-10',
  'despesa',
  'Aluguel Casa Pastoral (16/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2024-05',
  4365156
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3136296
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3122292
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Klebson Alves da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3122290
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Sueli Lourenço da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2024-05',
  3122257
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3122289
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-05',
  3122254
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3122234
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Ofertas de Gratidão',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3122295
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Klebson Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3122287
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Anderson Davi Ferreira',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-05',
  3122281
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-05',
  3122247
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Klebson Alves da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3122286
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Sueli Lourenço da Silva',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2024-05',
  3122242
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Klebson Alves da Silva',
  48.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3122284
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Sueli Lourenço da Silva',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-05',
  3122240
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Klebson Alves da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3122283
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-12',
  'receita',
  'Sueli Lourenço da Silva',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-05',
  3122237
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-16',
  'receita',
  'Ofertas de Gratidão',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3124247
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-19',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124264
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-19',
  'receita',
  'Klebson Alves da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124262
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-19',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124260
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-19',
  'receita',
  'Ofertas de Gratidão',
  68.7,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3124272
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-19',
  'receita',
  'Caio Henrique Santos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_563708',
  '2024-05',
  3124268
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-19',
  'receita',
  'Klebson Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124256
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-19',
  'receita',
  'Klebson Alves da Silva',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124255
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-19',
  'receita',
  'Klebson Alves da Silva',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124253
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-19',
  'receita',
  'Klebson Alves da Silva',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124249
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Naftali da Silva Gomes',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267751',
  '2024-05',
  3124342
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Maele Alves Gomes',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_543270',
  '2024-05',
  3124330
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Maele Alves Gomes',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_543270',
  '2024-05',
  3124314
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Naftali da Silva Gomes',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267751',
  '2024-05',
  3124289
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Naftali da Silva Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-05',
  3124338
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-05',
  3124329
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-05',
  3124313
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Naftali da Silva Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-05',
  3124288
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Ofertas de Gratidão',
  377.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3124348
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Naftali da Silva Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-05',
  3124337
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-05',
  3124328
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-05',
  3124312
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Naftali da Silva Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-05',
  3124286
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Naftali da Silva Gomes',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267751',
  '2024-05',
  3124336
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Maele Alves Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_543270',
  '2024-05',
  3124319
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Maele Alves Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_543270',
  '2024-05',
  3124298
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Naftali da Silva Gomes',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267751',
  '2024-05',
  3124284
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Naftali da Silva Gomes',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-05',
  3124333
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Maele Alves Gomes',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-05',
  3124318
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Maele Alves Gomes',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-05',
  3124297
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Naftali da Silva Gomes',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-05',
  3124281
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Naftali da Silva Gomes',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-05',
  3124331
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Maele Alves Gomes',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-05',
  3124317
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Maele Alves Gomes',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-05',
  3124292
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-23',
  'receita',
  'Naftali da Silva Gomes',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-05',
  3124279
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124372
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Sueli Lourenço da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2024-05',
  3124387
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124370
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Maycon Douglas Lucio de França',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269296',
  '2024-05',
  3124361
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Sueli Lourenço da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-05',
  3124385
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124369
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Maycon Douglas Lucio de França',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-05',
  3124360
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Ofertas de Gratidão',
  87.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3124396
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-05',
  3124384
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Ofertas de Gratidão',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3124374
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Klebson Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124367
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Maycon Douglas Lucio de França',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-05',
  3124359
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Sueli Lourenço da Silva',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2024-05',
  3124383
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Klebson Alves da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124366
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Maycon Douglas Lucio de França',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269296',
  '2024-05',
  3124358
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2024-05',
  3124388
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Sueli Lourenço da Silva',
  137.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-05',
  3124382
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Radayane Gomes Cardoso Ferreira',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_565790',
  '2024-05',
  3124378
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Klebson Alves da Silva',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124364
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Maycon Douglas Lucio de França',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-05',
  3124357
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Sueli Lourenço da Silva',
  47.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-05',
  3124381
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Klebson Alves da Silva',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124362
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-26',
  'receita',
  'Maycon Douglas Lucio de França',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-05',
  3124356
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-27',
  'despesa',
  'Gasolina',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47127),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  5838641
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-30',
  'despesa',
  'Material de consumo',
  35.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46947),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  5838637
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-30',
  'despesa',
  'Despesa de Viagem',
  35.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46409),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3774660
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-30',
  'receita',
  'Klebson Alves da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124417
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-30',
  'receita',
  'Ofertas de Gratidão',
  58.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-05',
  3124450
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-30',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-05',
  3124414
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-30',
  'receita',
  'José Cicero Ferreira',
  142.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-05',
  3124438
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-30',
  'receita',
  'Alexsandra Ferreira Ferreira da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2024-05',
  3124435
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-30',
  'receita',
  'Josefa Zacarias Martins',
  380.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2024-05',
  3124430
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-05-30',
  'receita',
  'Daiane da Silva Costa Laurentino',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_278189',
  '2024-05',
  3124425
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2024-06',
  3198662
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198651
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Ailton de Morais Araújo',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2024-06',
  3198660
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Klebson Alves da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198650
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-06',
  3198658
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198649
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Ofertas de Gratidão',
  236.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  3198667
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-06',
  3198656
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198648
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Ailton de Morais Araújo',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2024-06',
  3198654
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Klebson Alves da Silva',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198646
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Ailton de Morais Araújo',
  194.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-06',
  3198653
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Klebson Alves da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198644
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Primícia',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  3198666
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Ailton de Morais Araújo',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-06',
  3198652
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-02',
  'receita',
  'Klebson Alves da Silva',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198642
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-03',
  'receita',
  'Anderson Davi Ferreira da Silva',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_459988',
  '2024-06',
  3224204
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-04',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224210
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-04',
  'receita',
  'Josenildo Zacarias da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_567732',
  '2024-06',
  3224209
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-05',
  'receita',
  'Luiz dos Santos',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224211
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-06',
  'receita',
  'Ofertas de Gratidão',
  57.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  3198746
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-06',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198733
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-06',
  'receita',
  'Anderson Davi Ferreira  da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-06',
  3198732
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-06',
  'receita',
  'Lucas Vinício Barboza da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2024-06',
  3198729
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-06',
  'receita',
  'Lucas Vinício Barboza da Silva',
  170.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2024-06',
  3198728
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-06',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2024-06',
  3198727
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-06',
  'receita',
  'Shirley Lopes Ferreira',
  285.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-06',
  3198726
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-06',
  'receita',
  'Shirley Lopes Ferreira',
  98.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-06',
  3198725
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-07',
  'receita',
  'Luiz dos Santos',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224212
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198851
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Sueli Lourenço da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2024-06',
  3198868
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Klebson Alves da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198849
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Maycon Douglas Lucio de França',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269296',
  '2024-06',
  3198837
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-06',
  3198867
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198848
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Maycon Douglas Lucio de França',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-06',
  3198835
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Ofertas de Gratidão',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  3198871
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Maele Alves Gomes',
  500.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-06',
  3198870
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-06',
  3198865
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198847
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Maycon Douglas Lucio de França',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-06',
  3198833
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Sueli Lourenço da Silva',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2024-06',
  3198863
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Klebson Alves da Silva',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198846
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Maycon Douglas Lucio de França',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269296',
  '2024-06',
  3198832
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Sueli Lourenço da Silva',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-06',
  3198862
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  290.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-06',
  3198859
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2024-06',
  3198855
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Klebson Alves da Silva',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198844
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Maycon Douglas Lucio de França',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-06',
  3198830
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-06',
  3198827
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Sueli Lourenço da Silva',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-06',
  3198860
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198839
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-09',
  'receita',
  'Maycon Douglas Lucio de França',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-06',
  3198829
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (21/26)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2024-06',
  3418645
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-10',
  'despesa',
  'Aluguel Casa Pastoral (17/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2024-06',
  4365157
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  3774497
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-10',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224213
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-13',
  'receita',
  'Luiz dos Santos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224216
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-13',
  'receita',
  'Jackciel Laurentino',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170924',
  '2024-06',
  3224215
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-13',
  'receita',
  'Luiz dos Santos',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224214
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-13',
  'receita',
  'Ofertas de Gratidão',
  57.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  3198750
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-13',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-06',
  3198747
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-14',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224217
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-16',
  'receita',
  'Ofertas de Gratidão',
  85.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  3198756
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-16',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198754
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-16',
  'receita',
  'Maria Cicera Morais',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2024-06',
  3198753
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-16',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2024-06',
  3198755
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-17',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224222
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-17',
  'receita',
  'Jadson de Lima Moura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_169659',
  '2024-06',
  3224221
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-17',
  'receita',
  'Maria Clara Zacarias de Morais',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270276',
  '2024-06',
  3224220
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-18',
  'receita',
  'Quitéria Alves',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_703622',
  '2024-06',
  3224230
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-18',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224224
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-18',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224223
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-20',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224233
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-20',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224232
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-20',
  'receita',
  'Ofertas de Gratidão',
  43.3,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  3198778
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-20',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3198771
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-20',
  'receita',
  'Anderson Davi Ferreira da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-06',
  3198768
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-20',
  'receita',
  'Joede da Silva Viana',
  675.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2024-06',
  3198774
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-23',
  'receita',
  'Ofertas de Gratidão',
  108.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  3198786
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-23',
  'receita',
  'Jadson de Lima Moura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_169659',
  '2024-06',
  3198780
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-24',
  'receita',
  'Josenildo Zacarias da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_567732',
  '2024-06',
  3224237
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-24',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224235
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-26',
  'receita',
  'Luiz dos Santos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224240
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-26',
  'receita',
  'Luiz dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224239
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-27',
  'receita',
  'Aline Leia',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170441',
  '2024-06',
  3224242
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-27',
  'receita',
  'Ofertas de Gratidão',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  3198806
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-27',
  'receita',
  'Alexsandra Ferreira da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2024-06',
  3198798
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-27',
  'receita',
  'Josefa Zacarias Martins',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2024-06',
  3198797
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-27',
  'receita',
  'Jadson de Lima Moura',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_169659',
  '2024-06',
  3198802
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-27',
  'receita',
  'Daiane da Silva Costa Laurentino',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_278189',
  '2024-06',
  3198793
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-29',
  'despesa',
  'Despesa de viagem',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46409),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  3774567
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-29',
  'despesa',
  'Material de limpeza',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  5838645
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-29',
  'despesa',
  '2 desinfetantes (2 L)',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  3774559
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-29',
  'despesa',
  '1 cloro',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  3774550
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-30',
  'despesa',
  'Tributos do apóstolo Moises',
  780.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  4261043
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-30',
  'receita',
  'Klebson Alves da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3214379
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-30',
  'receita',
  'Luiz dos Santos',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224244
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-30',
  'receita',
  'Ofertas de Gratidão',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-06',
  3214400
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-30',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-06',
  3214375
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-30',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-06',
  3224245
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-30',
  'receita',
  'José Cicero Ferreira',
  141.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-06',
  3214392
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-06-30',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-06',
  3214388
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-01',
  'receita',
  'Ailton de Morais Araujo',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-07',
  3319641
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-01',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319441
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-01',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319436
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-02',
  'receita',
  'Luiz dos Santos',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319444
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-03',
  'receita',
  'Luiz dos Santos',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319447
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3317471
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2024-07',
  3317455
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Klebson Alves da Silva',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3317469
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Ailton de Morais Araújo',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2024-07',
  3317453
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3317468
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-07',
  3317452
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Luiz dos Santos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319448
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Ofertas de Gratidão',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3317477
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Klebson Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3317465
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-07',
  3317449
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Shirley Lopes Ferreira',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-07',
  3317434
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Anderson Davi Ferreira da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-07',
  3317429
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Klebson Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3317463
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Ailton de Morais Araújo',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2024-07',
  3317448
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Klebson Alves da Silva',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3317461
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Ailton de Morais Araújo',
  194.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-07',
  3317446
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Lucas Vinício Barboza da Silva',
  170.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2024-07',
  3317440
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2024-07',
  3317438
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Shirley Lopes Ferreira',
  285.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-07',
  3317432
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Klebson Alves da Silva',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3317458
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Ailton de Morais Araújo',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-07',
  3317443
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-04',
  'receita',
  'Shirley Lopes Ferreira',
  98.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-07',
  3317430
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-06',
  'receita',
  'Rede de mulheres',
  98.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3317656
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Sueli Lourenço da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2024-07',
  3317809
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Maycon Douglas Lucio de França',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269296',
  '2024-07',
  3317794
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-07',
  3317806
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Maycon Douglas Lucio de França',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-07',
  3317791
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Ofertas de Gratidão',
  89.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3317817
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-07',
  3317805
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Maria José Ferreira de Araujo',
  2.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-07',
  3317800
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Maycon Douglas Lucio de França',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-07',
  3317788
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Sueli Lourenço da Silva',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2024-07',
  3317804
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Maycon Douglas Lucio de França',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269296',
  '2024-07',
  3317787
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2024-07',
  3317813
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Sueli Lourenço da Silva',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-07',
  3317803
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Maria José Ferreira de Araujo',
  167.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-07',
  3317798
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Maycon Douglas Lucio de França',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-07',
  3317785
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Sueli Lourenço da Silva',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-07',
  3317802
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-07',
  'receita',
  'Maycon Douglas Lucio de França',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269296',
  '2024-07',
  3317778
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-08',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319453
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-08',
  'receita',
  'Luiz dos Santos',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319452
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-08',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319449
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-09',
  'despesa',
  'Fatura de energia da casa pastoral',
  182.89,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  5838613
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-09',
  'despesa',
  'Fatura de energia do templo',
  97.36,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  5838612
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-09',
  'despesa',
  'Fat. de energia ref. junho - Templo',
  97.36,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3774419
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-09',
  'despesa',
  'Fat. de energia ref. junho - Casa Pastoral',
  182.89,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3774416
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-09',
  'despesa',
  'Equipamento de som',
  49.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46408),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  5838595
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-09',
  'despesa',
  'PLUG XLR CANNON FEMEA FEMEA DE METAL PROF',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46408),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3774615
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-09',
  'despesa',
  'PLUG XLR CANNON MACHO FEMEA DE METAL PROF',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46408),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3774608
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-09',
  'despesa',
  'CABO EM ROLO DE MICROFONE 0,20MM MOD',
  9.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46408),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3774598
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-09',
  'receita',
  'Luiz dos Santos',
  5.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319454
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (22/26)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2024-07',
  3418646
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-10',
  'despesa',
  'PESCOCO - COTOVELO SUPORTE Ventisol 50cm',
  24.55,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46407),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3774522
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-10',
  'despesa',
  'Aluguel Casa Pastoral (18/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2024-07',
  4365158
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3774499
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-10',
  'receita',
  'Luiz dos Santos',
  5.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319457
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-11',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319459
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-11',
  'receita',
  'Ofertas de Gratidão',
  23.75,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3318098
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-11',
  'receita',
  'Alicia Regina da Silva',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2024-07',
  3318090
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-11',
  'receita',
  'Joede da Silva Viana',
  760.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2024-07',
  3318096
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-14',
  'receita',
  'Ofertas de Gratidão',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3318112
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-14',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3318100
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-14',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  51.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-07',
  3318111
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-14',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-07',
  3318106
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-15',
  'receita',
  'Luiz dos Santos',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319463
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-15',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319460
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-16',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319470
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-16',
  'receita',
  'Luiz dos Santos',
  43.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319466
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-17',
  'receita',
  'Luiz dos Santos',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319476
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-17',
  'receita',
  'Luiz dos Santos',
  9.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319472
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-18',
  'receita',
  'Luiz dos Santos',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319477
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-21',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3318120
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-21',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3318119
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-21',
  'receita',
  'Semeadura',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3318124
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-21',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3318118
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-21',
  'receita',
  'Ofertas de Gratidão',
  148.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3318129
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-21',
  'receita',
  'Klebson Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3318117
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-21',
  'receita',
  'Klebson Alves da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3318116
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-21',
  'receita',
  'Alexsandro Ferreira da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2024-07',
  3318122
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-21',
  'receita',
  'Klebson Alves da Silva',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3318115
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-21',
  'receita',
  'Klebson Alves da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3318114
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-22',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319478
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-23',
  'receita',
  'Luiz dos Santos',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319479
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-25',
  'receita',
  'Ofertas de Gratidão',
  42.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3318146
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-25',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  180.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-07',
  3318145
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-26',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319485
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-26',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319483
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-26',
  'receita',
  'Luiz dos Santos',
  130.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319481
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-28',
  'receita',
  'Klebson Alves da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3318152
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-28',
  'receita',
  'Ofertas de Gratidão',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  3318155
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-28',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-07',
  3318149
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-29',
  'receita',
  'Isabelly Dayane Cardoso Barreto',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568544',
  '2024-07',
  3319513
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-29',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-07',
  3319509
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-29',
  'receita',
  'Josefa Zacarias',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2024-07',
  3319506
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-29',
  'receita',
  'Luiz dos Santos',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319492
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-29',
  'receita',
  'Luiz dos Santos',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319489
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-29',
  'receita',
  'Luiz dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319488
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-31',
  'despesa',
  'Tributos do apóstolo Moises',
  545.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-07',
  4261036
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-31',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319500
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-31',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319497
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-07-31',
  'receita',
  'Luiz dos Santos',
  7.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-07',
  3319494
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Maele Alves Gomes',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_543270',
  '2024-08',
  3421526
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Naftali da Silva Gomes',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267751',
  '2024-08',
  3421519
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-08',
  3421525
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Naftali da Silva Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-08',
  3421518
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-08',
  3422029
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Karla Thais',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3422023
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Ofertas de Gratidão',
  56.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3421531
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-08',
  3421524
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Naftali da Silva Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-08',
  3421517
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Maele Alves Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_543270',
  '2024-08',
  3421522
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Naftali da Silva Gomes',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267751',
  '2024-08',
  3421516
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Josefa Zacarias',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2024-08',
  3421530
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Jose Cicero Ferreira',
  142.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-08',
  3421527
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Maele Alves Gomes',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-08',
  3421521
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Naftali da Silva Gomes',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-08',
  3420138
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Maele Alves Gomes',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-08',
  3421520
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-01',
  'receita',
  'Naftali da Silva Gomes',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-08',
  3420134
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-02',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 0),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 0),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421863
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-04',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421540
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-04',
  'receita',
  'Klebson Alves da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421539
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-04',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421538
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-04',
  'receita',
  'Ofertas de Gratidão',
  105.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3421554
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-04',
  'receita',
  'Klebson Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421537
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-04',
  'receita',
  'Klebson Alves da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421536
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-04',
  'receita',
  'Shirley Lopes Ferreira',
  260.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-08',
  3421549
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-04',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-08',
  3421543
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-04',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2024-08',
  3421542
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-04',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-08',
  3421541
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-04',
  'receita',
  'Klebson Alves da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421535
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-04',
  'receita',
  'Shirley Lopes Ferreira',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-08',
  3421546
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-04',
  'receita',
  'Klebson Alves da Silva',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421534
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-05',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-08',
  3422042
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-05',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421873
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-05',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421868
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-05',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421866
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-06',
  'receita',
  'Luiz dos Santos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421877
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-07',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421908
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-07',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421907
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-07',
  'receita',
  'Luiz dos Santos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421881
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-08',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2024-08',
  3421575
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-08',
  'receita',
  'Ailton de Morais Araújo',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2024-08',
  3421573
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-08',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-08',
  3421572
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-08',
  'receita',
  'Ofertas de Gratidão',
  76.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3421579
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-08',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-08',
  3421571
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-08',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-08',
  3421563
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-08',
  'receita',
  'Ailton de Morais Araújo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2024-08',
  3421570
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-08',
  'receita',
  'Ailton de Morais Araújo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-08',
  3421569
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-08',
  'receita',
  'Maria Cicera Morais',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54692',
  '2024-08',
  3421566
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-08',
  'receita',
  'Joede da Silva Viana',
  690.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2024-08',
  3421564
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-08',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  168.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-08',
  3421562
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-08',
  'receita',
  'Ailton de Morais Araújo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-08',
  3421567
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-09',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421912
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (23/26)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2024-08',
  3418647
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-10',
  'despesa',
  'Aluguel Casa Pastoral (19/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2024-08',
  4365159
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3774486
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-10',
  'receita',
  'Rede de homens',
  91.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3421647
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421611
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421609
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Sueli Lourenço da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2024-08',
  3421600
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421608
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-08',
  3421599
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Ofertas de Gratidão',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3421613
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Klebson Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421607
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-08',
  3421597
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-08',
  3421588
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Klebson Alves da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421606
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Sueli Lourenço da Silva',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2024-08',
  3421596
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Sueli Lourenço da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421603
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Sueli Lourenço da Silva',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-08',
  3421594
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Lucas Vinício Barboza da Silva',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2024-08',
  3421592
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  330.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-08',
  3421585
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Klebson Alves da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421601
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-11',
  'receita',
  'Sueli Lourenço da Silva',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-08',
  3421593
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-12',
  'despesa',
  'Fatura de energia da casa pastoral',
  181.85,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  5838650
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-12',
  'despesa',
  'Fatura de energia do templo',
  72.87,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  5838610
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-12',
  'despesa',
  'Fat. de energia ref. julho - Casa Pastoral',
  181.85,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3774480
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-12',
  'despesa',
  'Fat. de energia ref. julho - Templo',
  72.87,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3774425
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-12',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421915
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-12',
  'receita',
  'Luiz dos Santos',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421914
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-13',
  'despesa',
  'Material de limpeza',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  5838647
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-13',
  'despesa',
  '3 desinfetantes',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3774544
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-13',
  'despesa',
  '2 panos de chão',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3774542
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-13',
  'despesa',
  '1 Cloro',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3774540
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-15',
  'despesa',
  'Material de limpeza',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  5838646
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-15',
  'despesa',
  '3 vassouras',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3774546
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-15',
  'receita',
  'Oferta de Mantenedores',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2024-08',
  3421616
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-15',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421920
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-15',
  'receita',
  'Ofertas de Gratidão',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3421622
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-15',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-08',
  3421620
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-15',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-08',
  3421614
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-15',
  'receita',
  'Luiz dos Santos',
  141.3,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421922
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-15',
  'receita',
  'Jose Cicero Ferreira',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-08',
  3421617
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-16',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421925
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-18',
  'receita',
  'Ofertas de Gratidão',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3421625
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-19',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-08',
  3422048
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-19',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421936
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-19',
  'receita',
  'Luiz dos Santos',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421931
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-19',
  'receita',
  'Luiz dos Santos',
  2.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421928
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-21',
  'receita',
  'Luiz dos Santos',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421947
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-21',
  'receita',
  'Luiz dos Santos',
  47.3,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421942
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-22',
  'receita',
  'Ofertas de Gratidão',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3421651
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-22',
  'receita',
  'Luiz dos Santos',
  19.9,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421953
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-23',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421958
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-25',
  'receita',
  'Ofertas de Gratidão',
  37.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3421690
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-25',
  'receita',
  'Maria Cícera Simão da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273247',
  '2024-08',
  3421686
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-25',
  'receita',
  'Marciano',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3421674
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-26',
  'receita',
  'Luiz dos Santos',
  12.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421969
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-26',
  'receita',
  'Luiz dos Santos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421965
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-27',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421981
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-27',
  'receita',
  'Luiz dos Santos',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421979
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-27',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421975
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-28',
  'receita',
  'Luiz dos Santos',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421985
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-28',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421982
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-28',
  'receita',
  'Luiz dos Santos',
  195.4,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421990
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-28',
  'receita',
  'Luiz dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421988
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-29',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421710
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-29',
  'receita',
  'Klebson Alves da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421708
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-29',
  'receita',
  'Klebson Alves da Silva',
  102.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421707
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-29',
  'receita',
  'Ofertas de Gratidão',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-08',
  3421729
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-29',
  'receita',
  'Klebson Alves da Silva',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421705
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-29',
  'receita',
  'Klebson Alves da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421703
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-29',
  'receita',
  'Luiz dos Santos',
  7.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3421993
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-29',
  'receita',
  'Jose Cicero Ferreira',
  142.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-08',
  3421726
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-29',
  'receita',
  'Klebson Alves da Silva',
  48.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421701
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-29',
  'receita',
  'Josefa Zacarias Martins',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2024-08',
  3421693
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-29',
  'receita',
  'Ageilda Gonçalo da Silva',
  155.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2024-08',
  3421713
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-29',
  'receita',
  'Klebson Alves da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-08',
  3421700
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-30',
  'receita',
  'Luiz dos Santos',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-08',
  3422000
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-31',
  'despesa',
  'Ceia do Senhor',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 65331),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3774672
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-31',
  'despesa',
  'Fat. de energia ref. fevereiro - Templo',
  232.91,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3774708
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-31',
  'despesa',
  'TELA 10 PROF',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46947),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3774754
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-31',
  'despesa',
  'Tributos do apóstolo Moises',
  763.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  4261020
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-31',
  'despesa',
  'Despesa de Combustível',
  100.07,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46410),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3774686
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-31',
  'despesa',
  'CONECTOR DLK',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46408),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-08',
  3774732
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-08-31',
  'receita',
  'Manutenção de notebook',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2024-08',
  3418697
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-01',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2024-09',
  3439844
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-01',
  'receita',
  'Ailton de Morais Araújo',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2024-09',
  3439835
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-01',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-09',
  3439814
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-01',
  'receita',
  'Ofertas de Gratidão',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: Ofertas de Gratidão',
  '2024-09',
  3439862
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-01',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-09',
  3439804
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-01',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-09',
  3439759
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-01',
  'receita',
  'Ailton de Morais Araújo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2024-09',
  3439796
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-01',
  'receita',
  'Maria José da Silva',
  180.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_185742',
  '2024-09',
  3518955
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-01',
  'receita',
  'Ailton de Morais Araújo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-09',
  3439787
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-01',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  320.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-09',
  3439772
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-01',
  'receita',
  'Ailton de Morais Araujo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-09',
  3439778
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-02',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525036
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-02',
  'receita',
  'Luiz dos Santos',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525029
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-02',
  'receita',
  'Nikole Giovanna Gonçalo Pererira',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-09',
  3525019
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-02',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3524990
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-02',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3524988
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-02',
  'receita',
  'Luiz dos Santos',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525032
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-02',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  76.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-09',
  3525013
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-03',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525045
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-05',
  'receita',
  'Ofertas de Gratidão',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: Ofertas de Gratidão',
  '2024-09',
  3439598
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-05',
  'receita',
  'Oferta de oração',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  3439560
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-05',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2024-09',
  3439543
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-05',
  'receita',
  'Edmundo Ferreira de Araujo',
  102.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_181483',
  '2024-09',
  3439528
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-06',
  'despesa',
  'Compra de Cadeiras para Igreja (1/10)',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  3523217
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-06',
  'receita',
  'Luiz dos Santos',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525050
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-08',
  'receita',
  'Sueli Lourenço da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2024-09',
  3439717
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-08',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-09',
  3439715
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-08',
  'receita',
  'Ofertas de Gratidão',
  42.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: Ofertas de Gratidão',
  '2024-09',
  3439732
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-08',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-09',
  3439710
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-08',
  'receita',
  'Jadson de Lima Moura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_707722',
  '2024-09',
  3439690
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-08',
  'receita',
  'Klebson Alves da Silva',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3439683
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-08',
  'receita',
  'Anderson Davi Ferreira da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-09',
  3439614
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-08',
  'receita',
  'Sueli Lourenço da Silva',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2024-09',
  3439703
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-08',
  'receita',
  'Alexandro Ferreira de Albuquerque',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-09',
  3439723
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-08',
  'receita',
  'Sueli Lourenço da Silva',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-09',
  3439698
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-08',
  'receita',
  'Joede da Silva Viana',
  760.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2024-09',
  3439658
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-08',
  'receita',
  'Shirley Lopes Ferreira',
  383.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-09',
  3439649
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-08',
  'receita',
  'Sueli Lourenço da Silva',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-09',
  3439694
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-08',
  'receita',
  'Shirley Lopes Ferreira',
  132.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-09',
  3439621
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-09',
  'receita',
  'Shirley Lopes Ferreira',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-09',
  3525710
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-09',
  'receita',
  'Isabelly Dayane Cardoso Barreto',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568544',
  '2024-09',
  3525708
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-09',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-09',
  3525703
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-09',
  'receita',
  'Luiz dos Santos',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525060
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-09',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525052
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (24/26)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2024-09',
  3418648
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-10',
  'despesa',
  'Fatura de energia da casa pastoral',
  101.01,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  5838655
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-10',
  'despesa',
  'Fatura de energia da casa pastoral',
  194.48,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  5838653
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-10',
  'despesa',
  'Fat. de energia ref. agosto - Casa Pastoral',
  194.48,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  3774456
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-10',
  'despesa',
  'Fat. de energia ref. agosto -',
  101.01,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  3774442
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-10',
  'despesa',
  'Aluguel Casa Pastoral (20/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2024-09',
  4365160
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  3774494
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-10',
  'receita',
  'Luiz dos Santos',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525066
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-10',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525063
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-11',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525071
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-11',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525068
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-12',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3518676
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-12',
  'receita',
  'Klebson Alves da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3518674
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-12',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3518673
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-12',
  'receita',
  'Luiz dos Santos',
  0.4,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525073
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-12',
  'receita',
  'Ofertas de Gratidão',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  3518679
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-12',
  'receita',
  'Klebson Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3518672
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-12',
  'receita',
  'Klebson Alves da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3518670
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-12',
  'receita',
  'Klebson Alves da Silva',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3518656
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-12',
  'receita',
  'Klebson Alves da Silva',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3518653
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-13',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525087
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-13',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525085
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-15',
  'receita',
  'Ofertas de Gratidão',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  3518685
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-15',
  'receita',
  'Lucas Vinício Barboza da Silva',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2024-09',
  3518684
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-15',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  170.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-09',
  3518683
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-16',
  'receita',
  'Luiz dos Santos',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525129
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-16',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525125
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-16',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525116
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-16',
  'receita',
  'Luiz dos Santos',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525095
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-16',
  'receita',
  'Luiz dos Santos',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525091
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-18',
  'receita',
  'Luiz dos Santos',
  7.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525137
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-18',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525133
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-19',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-09',
  3525714
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-19',
  'receita',
  'Karla Thais',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_186071',
  '2024-09',
  3525712
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-19',
  'receita',
  'Ofertas de Gratidão',
  42.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  3518688
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-20',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525141
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-20',
  'receita',
  'Luiz dos Santos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525139
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-22',
  'receita',
  'Naftali da Silva Gomes',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267751',
  '2024-09',
  3518703
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-22',
  'receita',
  'Maele Alves Gomes',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_543270',
  '2024-09',
  3518695
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-22',
  'receita',
  'Naftali da Silva Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-09',
  3518701
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-22',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-09',
  3518694
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-22',
  'receita',
  'Ofertas de Gratidão',
  64.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  3518705
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-22',
  'receita',
  'Naftali da Silva Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-09',
  3518700
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-22',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-09',
  3518693
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-22',
  'receita',
  'Maele Alves Gomes',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-09',
  3518690
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-22',
  'receita',
  'Naftali da Silva Gomes',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267751',
  '2024-09',
  3518699
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-22',
  'receita',
  'Maele Alves Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_543270',
  '2024-09',
  3518692
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-22',
  'receita',
  'Naftali da Silva Gomes',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-09',
  3518698
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-22',
  'receita',
  'Maele Alves Gomes',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-09',
  3518691
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-22',
  'receita',
  'Naftali da Silva Gomes',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-09',
  3518697
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-23',
  'receita',
  'Elisama',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_186078',
  '2024-09',
  3525778
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-23',
  'receita',
  'Raquel Camilo',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_186076',
  '2024-09',
  3525761
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-23',
  'receita',
  'Queithi',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_186074',
  '2024-09',
  3525747
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-23',
  'receita',
  'Luiz dos Santos',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525144
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-23',
  'receita',
  'Quiteria Alves',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_703622',
  '2024-09',
  3525766
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-23',
  'receita',
  'Izabel Mada',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_186075',
  '2024-09',
  3525754
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-26',
  'receita',
  'Klebson Alves da Silva',
  102.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 49850),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3518714
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-26',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3518718
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-26',
  'receita',
  'Klebson Alves da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3518716
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-26',
  'receita',
  'Ofertas de Gratidão',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  3518721
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-26',
  'receita',
  'Klebson Alves da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3518713
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-26',
  'receita',
  'Klebson Alves da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3518712
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-26',
  'receita',
  'Luiz dos Santos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525167
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-26',
  'receita',
  'Luiz dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525158
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-26',
  'receita',
  'Luiz dos Santos',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525152
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-26',
  'receita',
  'Klebson Alves da Silva',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3518711
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-26',
  'receita',
  'Alexsandra Ferreira da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2024-09',
  3518708
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-26',
  'receita',
  'Klebson Alves da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-09',
  3518710
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-27',
  'receita',
  'Luiz dos Santos',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525183
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-27',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525180
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-27',
  'receita',
  'Luiz dos Santos',
  130.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525174
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-29',
  'receita',
  'Ofertas de Gratidão',
  167.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  3518740
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-29',
  'receita',
  'Anderson Davi Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-09',
  3518739
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-29',
  'receita',
  'Maria José da Silva',
  180.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_185742',
  '2024-09',
  3518735
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-29',
  'receita',
  'Josefa Zacarias',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2024-09',
  3518731
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-30',
  'despesa',
  'Tributos do apóstolo Moises',
  717.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  4261016
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-30',
  'despesa',
  'Equipamento de som',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46408),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-09',
  5838617
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-30',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-09',
  3525187
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-09-30',
  'receita',
  'Isabelly Dayane Cardoso Barreto',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568544',
  '2024-09',
  3525770
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-02',
  'receita',
  'Alicia Regina da Silva',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2024-10',
  3623570
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-02',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623564
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-03',
  'receita',
  'Luiz dos Santos',
  4.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623576
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-03',
  'receita',
  'Ofertas de Gratidão',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3611827
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-03',
  'receita',
  'Anderson Davi Ferreira da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-10',
  3611818
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-03',
  'receita',
  'José Cicero Ferreira',
  141.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-10',
  3611825
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-04',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623585
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-04',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623581
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-05',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-10',
  3623779
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-05',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-10',
  3623778
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-05',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623588
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'despesa',
  'Compra de Cadeiras para Igreja (2/10)',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3523218
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Barbara Cristina da Silva Alves',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568529',
  '2024-10',
  3623795
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Maria Alexsandra',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_190374',
  '2024-10',
  3623791
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2024-10',
  3611834
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Ailton de Morais Araújo',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2024-10',
  3611833
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-10',
  3611832
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Ofertas de Gratidão',
  77.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3611850
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Shirley Lopes Ferreira',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-10',
  3611840
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-10',
  3611831
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Ailton de Morais Araújo',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2024-10',
  3611830
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Anderson Davi Ferreira da SIlva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-10',
  3611849
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Joede Silva Viana',
  710.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2024-10',
  3611844
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2024-10',
  3611843
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Maria Barboza de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2024-10',
  3611842
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Shirley Lopes Ferreira',
  382.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-10',
  3611839
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Ailton de Morais Araújo',
  194.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-10',
  3611829
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Shirley Lopes Ferreira',
  132.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-10',
  3611836
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-06',
  'receita',
  'Ailton de Morais Araújo',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-10',
  3611828
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-07',
  'receita',
  'Luiz dos Santos',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623599
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-07',
  'receita',
  'Luiz dos Santos',
  24.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623596
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-07',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623594
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-08',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623605
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (25/26)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2024-10',
  3418649
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-10',
  'despesa',
  'Aluguel Casa Pastoral (21/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2024-10',
  4365161
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3774490
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-10',
  'receita',
  'Ofertas de Gratidão',
  47.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3611816
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-10',
  'receita',
  'Sueli Lourenço da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2024-10',
  3611815
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-10',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-10',
  3611813
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-10',
  'receita',
  'Luiz dos Santos',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623611
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-10',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-10',
  3611812
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-10',
  'receita',
  'Sueli Lourenço da Silva',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2024-10',
  3611810
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-10',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623613
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-10',
  'receita',
  'Luiz dos Santos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623609
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-10',
  'receita',
  'Sueli Lourenço da Silva',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-10',
  3611808
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-10',
  'receita',
  'Sueli Lourenço da Silva',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-10',
  3611806
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-11',
  'despesa',
  'Fatura de energia do templo',
  92.45,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  5838608
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-11',
  'despesa',
  'Fatura de energia da casa pastoral',
  184.24,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  5838607
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-11',
  'despesa',
  'Fat. de energia ref. setembro - Casa Pastoral',
  184.24,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3774434
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-11',
  'despesa',
  'Fat. de energia ref. setembro - Templo',
  92.45,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3774431
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-11',
  'receita',
  'Luiz dos Santos',
  26.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623620
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-12',
  'receita',
  'Naftali da Silva Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-10',
  3623799
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-12',
  'receita',
  'Haniel Silvestre',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_190375',
  '2024-10',
  3623797
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-12',
  'receita',
  'Rede de Jovens',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3611804
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-12',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623622
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-13',
  'receita',
  'Luiz dos Santos',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623755
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-13',
  'receita',
  'Ofertas de Gratidão',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3611802
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-13',
  'receita',
  'Anderson Davi Ferreira da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-10',
  3611800
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-13',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-10',
  3611798
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-14',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623711
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-14',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623631
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-14',
  'receita',
  'Rede de mulheres',
  119.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3609139
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-15',
  'receita',
  'Luiz dos Santos',
  3.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623627
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-16',
  'receita',
  'Luiz dos Santos',
  0.38,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623647
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-17',
  'receita',
  'Oferats de Gratidão',
  14.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3609143
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-18',
  'receita',
  'Luiz dos Santos',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623651
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-19',
  'receita',
  'Seminário para obreiros',
  469.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3609168
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-19',
  'receita',
  'Luiz dos Santos',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623655
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-20',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-10',
  3609160
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-20',
  'receita',
  'Klebson Alves da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-10',
  3609157
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-20',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-10',
  3609155
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-20',
  'receita',
  'Ofertas de Gratidão',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3609166
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-20',
  'receita',
  'Klebson Alves da Silva',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-10',
  3609152
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-20',
  'receita',
  'Klebson Alves da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-10',
  3609148
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-20',
  'receita',
  'Luiz dos Santos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623657
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-20',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-10',
  3609163
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-20',
  'receita',
  'Klebson Alves da Silva',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-10',
  3609146
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-20',
  'receita',
  'Klebson Alves da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-10',
  3609145
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-21',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623663
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-22',
  'receita',
  'Luiz dos Santos',
  7.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623670
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-24',
  'receita',
  'Ofertas de Gratidão',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3609167
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-25',
  'receita',
  'Luiz dos Santos',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623679
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-25',
  'receita',
  'Luiz dos Santos',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623674
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-26',
  'receita',
  'Rede Kids',
  27.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3611889
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-26',
  'receita',
  'Luiz dos Santos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623685
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Naftali da Silva Gomes',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-10',
  3611880
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-10',
  3611864
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Naftali da Silva Gomes',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_267751',
  '2024-10',
  3611885
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Maele Alves Gomes',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_543270',
  '2024-10',
  3611877
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Klebson Alves da Silva',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-10',
  3611863
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Naftali da Silva Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-10',
  3611884
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-10',
  3611876
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Klebson Alves da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-10',
  3611862
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-10',
  3623803
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Haniel Silvestre',
  2.17,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_190375',
  '2024-10',
  3623802
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Ofertas de Gratidão',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  3611886
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Naftali da Silva Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-10',
  3611883
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Maele Alves Gomes',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-10',
  3611875
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Klebson Alves da Silva',
  29.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-10',
  3611861
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Naftali da Silva Gomes',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_267751',
  '2024-10',
  3611882
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Maele Alves Gomes',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_543270',
  '2024-10',
  3611874
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Klebson Alves da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-10',
  3611855
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Luiz dos Santos',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623689
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Naftali da Silva Gomes',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-10',
  3611881
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Maele Alves Gomes',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-10',
  3611873
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Maria José da Silva',
  180.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_185742',
  '2024-10',
  3611870
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Klebson Alves da Silva',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-10',
  3611853
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Maele Alves Gomes',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_543270',
  '2024-10',
  3611871
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-27',
  'receita',
  'Klebson Alves da Silva',
  26.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-10',
  3611852
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-28',
  'receita',
  'Luiz dos Santos',
  7.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623694
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-29',
  'receita',
  'Luiz dos Santos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623700
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-29',
  'receita',
  'Luiz dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623698
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-30',
  'receita',
  'Luiz dos Santos',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-10',
  3623703
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-10-31',
  'despesa',
  'Tributos do apóstolo Moises',
  654.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-10',
  4261007
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2024-11',
  3704582
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3704567
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Ailton de Morais Araújo',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2024-11',
  3704579
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Klebson Alves da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3704566
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-11',
  3704578
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Klebson Alves da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3704562
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Jose Cicero Ferreira',
  8.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-11',
  3704543
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Ofertas de Gratidão',
  149.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  3704588
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-11',
  3704575
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3704560
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Ailton de Morais Araújo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2024-11',
  3704574
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Klebson Alves da Silva',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3704559
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Ailton de Morais Araújo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-11',
  3704572
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Klebson Alves da Silva',
  92.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3704557
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-11',
  3704554
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Maria Mércia Barboza da Silva',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2024-11',
  3704551
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2024-11',
  3704546
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Alexsandra Ferreira da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2024-11',
  3704545
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Shirley Lopes Ferreira',
  408.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2024-11',
  3704544
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Jose Cicero Ferreira',
  141.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2024-11',
  3704541
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Ailton de Morais Araújo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2024-11',
  3704571
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Klebson Alves da Silva',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3704556
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-03',
  'receita',
  'Ageilda Gonçalo da Silva',
  85.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2024-11',
  3704547
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-04',
  'receita',
  'Naftali da Silva Gomes',
  140.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2024-11',
  3707436
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-04',
  'receita',
  'Luiz dos Santos',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707228
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-05',
  'receita',
  'Shirley Lopes Ferreira',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  'Membro/Contato: DISC_459979',
  '2024-11',
  3707440
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-05',
  'receita',
  'Luiz dos Santos',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707256
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-05',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707230
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-06',
  'despesa',
  'Compra de Cadeiras para Igreja (3/10)',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  3523219
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-06',
  'receita',
  'Luiz dos Santos',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707260
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-07',
  'receita',
  'Ofertas de Gratidão',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  3704627
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-07',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707261
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-07',
  'receita',
  'Josefa Zacarias',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2024-11',
  3704626
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-07',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2024-11',
  3704625
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-07',
  'receita',
  'Anderson Davi Ferreira da Silva',
  314.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2024-11',
  3704624
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-07',
  'receita',
  'Alicia Regina da Silva',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2024-11',
  3704623
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-07',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2024-11',
  3704617
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'despesa',
  'Multitracks Elite  - Mensalidade (26/26)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Referente ao Ministério de Louvor da igreja local.',
  '2024-11',
  3418650
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'despesa',
  'Aluguel Casa Pastoral (22/24)',
  250.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46406),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2024-11',
  4365162
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'despesa',
  'Aluguel do Templo',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  3774489
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3704649
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Klebson Alves da Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3704648
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Sueli Lourenço da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2024-11',
  3704634
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Klebson Alves da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3704647
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Sueli Lourenço da Silva',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-11',
  3704633
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Ofertas de Gratidão',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  3704650
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Klebson Alves da Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3704645
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-11',
  3704632
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Klebson Alves da Silva',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3704644
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Sueli Lourenço da Silva',
  39.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2024-11',
  3704631
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Klebson Alves da Silva',
  57.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3704643
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-11',
  3704638
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Sueli Lourenço da Silva',
  187.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-11',
  3704630
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Joede da Silva Viana',
  700.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2024-11',
  3704628
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Klebson Alves da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3704641
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-10',
  'receita',
  'Sueli Lourenço da Silva',
  65.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2024-11',
  3704629
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-11',
  'despesa',
  'Fatural de energia do templo',
  104.42,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  5838557
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-11',
  'receita',
  'Luiz dos Santos',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707295
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-11',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707293
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-11',
  'receita',
  'Luiz dos Santos',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707291
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-14',
  'despesa',
  'Fatura de energia da casa pastoral',
  187.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  5838652
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-14',
  'despesa',
  'Fat. de energia ref. outubro - Casa Pastoral',
  187.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  3774471
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-14',
  'receita',
  'Luiz dos Santos',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707323
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-14',
  'receita',
  'Luiz dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707296
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-17',
  'despesa',
  'Ref. ao congresso internacional Betesda',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46409),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  3659891
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-18',
  'receita',
  'Luiz dos Santos',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707326
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-18',
  'receita',
  'Luiz dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707325
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-21',
  'receita',
  'Ofetas de Gratidão',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  3704661
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-21',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-11',
  3704659
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-21',
  'receita',
  'Jadson Moura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_707722',
  '2024-11',
  3704653
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-21',
  'receita',
  'Luiz dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707359
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-21',
  'receita',
  'Luiz dos Santos',
  11.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707355
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-21',
  'receita',
  'Luiz dos Santos',
  18.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707328
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-21',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  180.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2024-11',
  3704656
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-22',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707373
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-22',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707368
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-22',
  'receita',
  'Luiz dos Santos',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707363
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-23',
  'receita',
  'Ofertas de Gratidão',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  3704663
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-24',
  'receita',
  'Ofertas de Gratidão',
  97.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  3704668
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-24',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2024-11',
  3704667
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-25',
  'receita',
  'Josefa Zacarias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2024-11',
  3721599
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-25',
  'receita',
  'Georgevan Alfa',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  3721591
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-25',
  'receita',
  'Maria Graci',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2024-11',
  3721587
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-25',
  'receita',
  'Islany Lopes',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_194468',
  '2024-11',
  3707494
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-25',
  'receita',
  'Luiz dos Santos',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707390
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-25',
  'receita',
  'Luiz dos Santos',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707387
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-25',
  'receita',
  'Luiz dos Santos',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707383
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-25',
  'receita',
  'Luiz dos Santos',
  2.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707379
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-26',
  'receita',
  'Luiz dos Santos',
  25.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707395
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-27',
  'receita',
  'Luiz dos Santos',
  130.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707403
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-27',
  'receita',
  'Luiz dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2024-11',
  3707400
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2024-11-28',
  'receita',
  'Klebson Alves da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_269464',
  '2024-11',
  3707123
) ON CONFLICT (enuves_id) DO NOTHING;

COMMIT;
