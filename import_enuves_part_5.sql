-- ==============================================================
-- IMPORTAÇÃO ENUVES - PARTE 5 de 5
-- ==============================================================

BEGIN;

-- IMPORTAÇÃO DE TRANSAÇÕES FINANCEIRAS (Lote 5)

INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Ailton de Morais Araújo',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2025-10',
  5032057
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Ailton de Morais Araújo',
  194.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-10',
  5032055
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Jaudijane Martins Viana',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2025-10',
  5032049
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'José Bezerra dos Santos',
  86.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-10',
  5032042
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2025-10',
  5032040
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Josinaldo Bernardo da Silva',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-10',
  5032037
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Sueli Lourenço da Silva',
  260.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-10',
  5032030
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Lucas Vinício Barboza da Silva',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2025-10',
  5032027
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Jucineide Terto da Silva',
  185.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-10',
  5032024
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2025-10',
  5032020
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Ailton de Morais Araújo',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-10',
  5032053
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-05',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2025-10',
  5032018
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-07',
  'despesa',
  'Material de construção',
  37.7,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46407),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5838399
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-09',
  'receita',
  'Ofertas de Gratidão',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5032100
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-09',
  'receita',
  'Damiana Lourenço da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1010673',
  '2025-10',
  5032096
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-10',
  'despesa',
  'Multitracks Elite - Mensalidade (11/12)',
  50.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  4049384
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-10',
  'despesa',
  'Aluguel do Templo (10/12)',
  800.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  4049407
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-11',
  'despesa',
  'Tinta',
  44.9,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46407),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5838398
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-12',
  'despesa',
  'Tributos para o apóstolo.',
  782.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5951817
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-12',
  'despesa',
  'Ofertas para o profeta José Rubens',
  239.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5951808
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-12',
  'receita',
  'Ofertas de Gratidão',
  203.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5032146
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-12',
  'receita',
  'Samuel da Silva Bezerra',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: CNTT_260105',
  '2025-10',
  5032129
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-12',
  'receita',
  'Joede da Silva Viana',
  600.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2025-10',
  5032134
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-12',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-10',
  5032127
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-12',
  'receita',
  'José Bezerra dos Santos',
  104.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-10',
  5032107
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-12',
  'receita',
  'Josinaldo Bernado da Silva',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-10',
  5032104
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-13',
  'despesa',
  'Fatura de energia da casa pastoral',
  189.96,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5838390
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-13',
  'despesa',
  'Fatura de energia do templo',
  102.1,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5838167
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-16',
  'receita',
  'Jose Cicero Ferreira',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2025-10',
  5032170
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-16',
  'receita',
  'Edvânio Alves',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5097321
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-16',
  'receita',
  'Sandriele Fideles',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1024192',
  '2025-10',
  5097320
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-16',
  'receita',
  'Ofertas de Gratidão',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5032179
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-16',
  'receita',
  'Maria Mércia Barboza da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270051',
  '2025-10',
  5032165
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-16',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-10',
  5032157
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-16',
  'receita',
  'Anônimo 2',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5032183
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-16',
  'receita',
  'Anônimo 1',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5032181
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-19',
  'receita',
  'Lucas Vinício Barboza da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2025-10',
  5110849
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-19',
  'receita',
  'Ofertas de Gratidão',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5032263
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-19',
  'receita',
  'Josinaldo Bernardo da Silva',
  46.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-10',
  5032193
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-19',
  'receita',
  'José Bezerra dos Santos',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-10',
  5032186
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-23',
  'receita',
  'Oswaldo',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5097323
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-23',
  'receita',
  'Immanuel',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5097322
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-23',
  'receita',
  'Ofertas de Gratidão',
  65.3,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5032215
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-23',
  'receita',
  'Jaudijane Martins Viana',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2025-10',
  5032204
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-23',
  'receita',
  'Anônimo 3',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5032208
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-23',
  'receita',
  'Ageilda Gonçalo da Silva',
  160.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-10',
  5032198
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-26',
  'receita',
  'Anônimo 4',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2025-10',
  5032229
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-26',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2025-10',
  5097326
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-26',
  'receita',
  'Larisse',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5032256
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-26',
  'receita',
  'Ofertas de Gratidão',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5032240
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-26',
  'receita',
  'Raquel Camilo',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5032234
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-26',
  'receita',
  'José Bezerra dos Santos',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-10',
  5032228
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-26',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-10',
  5032226
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-26',
  'receita',
  'Josinaldo Bernardo da Silva',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-10',
  5032223
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-26',
  'receita',
  'Jucineide Terto da Silva',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-10',
  5032219
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-30',
  'receita',
  'Ofertas de Gratidão',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-10',
  5032253
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-30',
  'receita',
  'Daiane da Silva Costa Laurentino',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_278189',
  '2025-10',
  5032248
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-30',
  'receita',
  'Luiz dos Santos',
  449.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-10',
  5097271
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-30',
  'receita',
  'Jose Cicero Ferreira',
  151.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2025-10',
  5032251
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-30',
  'receita',
  'Alicia Regina da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-10',
  5032246
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-10-30',
  'receita',
  'Josefa Zacarias',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-10',
  5032243
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'despesa',
  'Pagamento  do sistema enuves.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 0),
  NULL,
  '2025-11',
  5952130
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'receita',
  'Ailton de Morais Araújo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2025-11',
  5199246
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'receita',
  'Ailton de Morais Araújo',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2025-11',
  5199243
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'receita',
  'Ailton de Morais Araújo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-11',
  5199238
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'receita',
  'Jessica Lourenço',
  12.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2025-11',
  5201418
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'receita',
  'Naftali da Silva Gomes',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267751',
  '2025-11',
  5201415
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'receita',
  'Ofertas de Gratidão',
  167.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5199298
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'receita',
  'Ailton de Morais Araújo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-11',
  5199235
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'receita',
  'Ailton de Morais Araújo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2025-11',
  5199232
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'receita',
  'José Bezerra dos Santos',
  115.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-11',
  5199284
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'receita',
  'Alexsandra Ferreira da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2025-11',
  5199282
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2025-11',
  5199279
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'receita',
  'Josinaldo Bernardo da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-11',
  5199276
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'receita',
  'Ailton de Morais Araújo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-11',
  5199226
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-02',
  'receita',
  'Ailton de Morais Araújo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-11',
  5199223
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Sueli Lourenço da Silva',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2025-11',
  5199526
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Janderson Ferreira Barros',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2025-11',
  5199763
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Sueli Lourenço da Silva',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-11',
  5199520
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Jakciel Laurentino',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2025-11',
  5201441
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Ofertas de Gratidão',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5199792
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Anônimo 1',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5199710
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Anderson Davi Ferreira',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-11',
  5199695
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Larisse',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5199678
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Anônimo 1',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_186076',
  '2025-11',
  5199599
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Raquel Camilo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_186076',
  '2025-11',
  5199594
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Sueli Lourenço da Silva',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-11',
  5199512
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2025-11',
  5199405
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Sueli Lourenço da Silva',
  42.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2025-11',
  5199505
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Shirley Lopes Ferreira',
  345.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-11',
  5199774
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-11',
  5199745
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Sueli Lourenço da Silva',
  201.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-11',
  5199499
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Taunny da Silva Bezerra',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_703186',
  '2025-11',
  5199479
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Anderson Davi Ferreira da Silva',
  415.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-11',
  5199467
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Ageilda Gonçalo da Silva',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-11',
  5199731
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'Sueli Lourenço da Silva',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-11',
  5199494
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-06',
  'receita',
  'José Bezerra dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-11',
  5199435
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-09',
  'despesa',
  'Ofertas para o profeta José Rubens',
  229.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5951806
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-09',
  'despesa',
  'Tributos para o apóstolo',
  698.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5951798
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-09',
  'receita',
  'Jessica Lourenço',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2025-11',
  5201459
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-09',
  'receita',
  'Alicia Regina da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-11',
  5201446
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-09',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-11',
  5199856
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-09',
  'receita',
  'Anônimo 3',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5199814
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-09',
  'receita',
  'Ofertas de Gratidão',
  103.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5199867
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-09',
  'receita',
  'Janderson Ferreira Barros',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2025-11',
  5199860
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-09',
  'receita',
  'Jaudijane Martins Viana',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2025-11',
  5199859
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-09',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2025-11',
  5199854
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-09',
  'receita',
  'Jucineide Terto da Silva',
  196.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-11',
  5199825
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-09',
  'receita',
  'Josinaldo Bernardo da Silva',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-11',
  5199822
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-09',
  'receita',
  'José Bezerra dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-11',
  5199816
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-10',
  'despesa',
  'Multitracks Elite - Mensalidade (12/12)',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  4049385
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-10',
  'despesa',
  'Aluguel do Templo (11/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  4049408
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-17',
  'despesa',
  'Fatura de energia do templo',
  112.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5838164
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-17',
  'despesa',
  'Fatura de energia da casa pastoral',
  191.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5838162
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-20',
  'receita',
  'Anônimo 4',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2025-11',
  5199967
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-20',
  'receita',
  'Anônimo 6',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5200053
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-20',
  'receita',
  'Josefa Zacarias',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-11',
  5200046
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-20',
  'receita',
  'Anônimo 5',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5200039
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-20',
  'receita',
  'Tauanny da Silva Bezerra',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_703186',
  '2025-11',
  5200030
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-20',
  'receita',
  'Quiteria Alves',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_703622',
  '2025-11',
  5200023
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-20',
  'receita',
  'Ofertas de Gratidão',
  57.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5200067
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-20',
  'receita',
  'José Bezerra dos Santos',
  1.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-11',
  5200012
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-20',
  'receita',
  'Caio Henrique Santos',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_563708',
  '2025-11',
  5199997
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-20',
  'receita',
  'José Bezerra dos Santos',
  118.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-11',
  5200009
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-20',
  'receita',
  'Damiana Lourenço da Silva',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_230831',
  '2025-11',
  5199983
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-20',
  'receita',
  'Jaudijane Martins Viana',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2025-11',
  5199978
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-23',
  'receita',
  'Ofertas de Gratodão',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5199955
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-23',
  'receita',
  'Anônimo 4',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5199942
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-23',
  'receita',
  'Jadson de Lima Moura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_169659',
  '2025-11',
  5199897
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-23',
  'receita',
  'Jucineide Terto da Silva',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-11',
  5199921
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-23',
  'receita',
  'Josinaldo Bernardo da Silva',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-11',
  5199918
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-23',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-11',
  5199909
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-27',
  'receita',
  'Jessica Lourenço',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2025-11',
  5201467
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-27',
  'receita',
  'Ofertas de Gratidão',
  34.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5200181
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-27',
  'receita',
  'Edivanio',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5200126
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-27',
  'receita',
  'Anônimo 7',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5200118
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-27',
  'receita',
  'Alexsandra Ferreira da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_559379',
  '2025-11',
  5200087
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-27',
  'receita',
  'Josefa Zacarias',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-11',
  5200107
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-27',
  'receita',
  'Alicia Regina da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-11',
  5200098
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-27',
  'receita',
  'José Bezerra dos Santos',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-11',
  5200094
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-28',
  'receita',
  'Luiz dos Santos',
  604.4,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-11',
  5201378
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-30',
  'receita',
  'Ofertas de Gratidão',
  94.3,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5200359
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-30',
  'receita',
  'Kyara Yasmin',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-11',
  5200266
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-30',
  'receita',
  'Maria Barbosa de Souza Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2025-11',
  5200252
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-30',
  'receita',
  'José Bezerra dos Santos',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-11',
  5200317
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-30',
  'receita',
  'Janderson Ferreira Barros',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2025-11',
  5200239
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-30',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-11',
  5200231
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-11-30',
  'receita',
  'Josinaldo Bernardo da Silva',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-11',
  5200217
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-04',
  'receita',
  'Sueli Lourenço da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2025-12',
  5318240
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-04',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-12',
  5318238
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-04',
  'receita',
  'Ofertas de Gratidão',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318268
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-04',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-12',
  5318236
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-04',
  'receita',
  'Sueli Lourenço da Silva',
  32.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2025-12',
  5318234
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-04',
  'receita',
  'Shirley Lopes Ferreira',
  346.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-12',
  5318260
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-04',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-12',
  5318252
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-04',
  'receita',
  'Jose Cicero Ferreira',
  151.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2025-12',
  5318245
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-04',
  'receita',
  'Sueli Lourenço da Silva',
  151.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-12',
  5318205
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-04',
  'receita',
  'Sueli Lourenço da Silva',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-12',
  5318199
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-05',
  'receita',
  'Luiz dos Santos',
  1032.1,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2025-12',
  5319276
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-06',
  'receita',
  'Rosangela',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5319326
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-06',
  'receita',
  'Cicero Antonio',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5319322
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-06',
  'receita',
  'Conferência de Obreiros',
  295.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318317
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-06',
  'receita',
  'Josielma Zacarias de Morais',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2025-12',
  5319383
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-06',
  'receita',
  'Nicolle Pereira',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5319361
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'despesa',
  'Pagamento  do sistema enuves.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 0),
  NULL,
  '2025-12',
  5952134
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'despesa',
  'Ofertas para o profeta José Rubens',
  394.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5951790
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Ailton de Morais Araujo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2025-12',
  5318400
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Ailton de Morais Araujo',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2025-12',
  5318397
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Ailton de Morais Araujo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-12',
  5318395
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Ofertas de Gratidão',
  94.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318426
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Anônimo 2',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318409
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Ailton de Morais Araujo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-12',
  5318393
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Jaudijane Martins Viana',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2025-12',
  5318331
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Anônimo 1',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318326
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Ailton de Morais Araujo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2025-12',
  5318391
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'José Bezerra dos Santos',
  195.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-12',
  5318403
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Ailton de Morais Araujo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-12',
  5318388
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Ailton de Morais Araujo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2025-12',
  5318386
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Josinaldo Bernardo da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-12',
  5318379
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-12',
  5318340
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Jucineide Terto da Silva',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-12',
  5318336
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-07',
  'receita',
  'Anderson Davi Ferreira da Silva',
  314.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-12',
  5318322
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-10',
  'despesa',
  'Aluguel do Templo (12/12)',
  800.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  4049409
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-11',
  'receita',
  'Jandersson Ferreira Barros',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2025-12',
  5318456
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-11',
  'receita',
  'Jessica',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5319518
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-11',
  'receita',
  'Ofertas de Gratidão',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318471
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-11',
  'receita',
  'Anônimo 3',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2025-12',
  5318465
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-11',
  'receita',
  'Maria José Ferreira de Araújo Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2025-12',
  5318450
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-11',
  'receita',
  'José Bezerra dos Santos',
  247.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-12',
  5319533
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-11',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  158.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2025-12',
  5319528
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-11',
  'receita',
  'Joede da Silva Viana',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2025-12',
  5318460
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-11',
  'receita',
  'Maria José Ferreira de Araújo Silva',
  212.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2025-12',
  5318445
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-11',
  'receita',
  'José Bezerra dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-12',
  5318437
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-14',
  'receita',
  'Jessica',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5319543
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-14',
  'receita',
  'Jose Adão',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5319540
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-14',
  'receita',
  'Ofertas de Gratidão',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318509
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-14',
  'receita',
  'Jaudijane Martins Viana',
  80.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2025-12',
  5318505
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-14',
  'receita',
  'Jandersson Ferreira Barros',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2025-12',
  5318500
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-14',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2025-12',
  5318497
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-14',
  'receita',
  'José Bezerra dos Santos',
  2.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-12',
  5318491
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-15',
  'despesa',
  'Fatura de energia da casa pastoral',
  177.17,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5837925
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-15',
  'despesa',
  'Fatura de energia do templo',
  107.38,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5837923
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-17',
  'receita',
  'Anderson Davi Ferreira da Silva',
  156.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2025-12',
  5319570
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-18',
  'receita',
  'Sueli Lourenço da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2025-12',
  5318525
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-18',
  'receita',
  'Ageilda Gonçalo da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2025-12',
  5318530
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-18',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-12',
  5318524
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-18',
  'receita',
  'Jessica',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5319574
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-18',
  'receita',
  'Ofertas de Gratidão',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318561
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-18',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-12',
  5318519
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-18',
  'receita',
  'Sueli Lourenço da Silva',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2025-12',
  5318518
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-18',
  'receita',
  'Sueli Lourenço da Silva',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-12',
  5318517
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-18',
  'receita',
  'José Bezerra dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-12',
  5318556
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-18',
  'receita',
  'Sueli Lourenço da Silva',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2025-12',
  5318515
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-20',
  'receita',
  'Rosangela',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5319616
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-20',
  'receita',
  'Sandriele Fideles',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1024192',
  '2025-12',
  5319611
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-20',
  'receita',
  'Ofertas de Gratidão',
  386.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318649
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-20',
  'receita',
  'Anônimo 5',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318634
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-20',
  'receita',
  'Alicia Regina da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-12',
  5318621
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-20',
  'receita',
  'Anônimo 4',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318617
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-20',
  'receita',
  'Damiana Lourenço da Silva',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_230831',
  '2025-12',
  5318610
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-20',
  'receita',
  'Josinaldo Bernardo da Silva',
  118.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-12',
  5318606
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-20',
  'receita',
  'José Bezerra dos Santos',
  110.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-12',
  5318599
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-20',
  'receita',
  'Jucineide Terto da Silva',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-12',
  5318584
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-20',
  'receita',
  'Edivanio',
  22.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318578
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-22',
  'receita',
  'Jandersson Ferreira Barros',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2025-12',
  5319770
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-25',
  'receita',
  'Jaudijane Martins Viana',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2025-12',
  5319637
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-25',
  'receita',
  'Ofertas de Gratidão',
  46.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318669
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-25',
  'receita',
  'Jucineide Terto da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2025-12',
  5318667
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-25',
  'receita',
  'Jandersson Ferreira Barros',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2025-12',
  5318663
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-25',
  'receita',
  'Shirley Lopes Ferreira',
  307.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2025-12',
  5318655
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-25',
  'receita',
  'José Bezerra dos Santos',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-12',
  5318658
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-28',
  'receita',
  'Jessica',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5319649
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-28',
  'receita',
  'Ofertas de Gratidão',
  69.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318708
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-28',
  'receita',
  'Jandersson Ferreira Barros',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2025-12',
  5318676
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-28',
  'receita',
  'Anônimo 5',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318673
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-28',
  'receita',
  'José Bezerra dos Santos',
  156.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2025-12',
  5318703
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-28',
  'receita',
  'Josinaldo Bernardo da Silva',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2025-12',
  5318696
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-28',
  'receita',
  'Alicia Regina da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2025-12',
  5318691
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-28',
  'receita',
  'Josefa Zacarias Martins',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2025-12',
  5318687
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-31',
  'despesa',
  'Tributos para o apóstolo.',
  1086.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5805355
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-31',
  'despesa',
  'Despesas Gerais.',
  388.55,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5805350
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-31',
  'despesa',
  'Despesas Médicas.',
  1664.54,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5805349
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-31',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  177.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2025-12',
  5319654
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-31',
  'receita',
  'Ofertas de Gratidão',
  175.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318717
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-31',
  'receita',
  'Anônimo 6',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2025-12',
  5318716
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2025-12-31',
  'receita',
  'Jandersson Ferreira Barros',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2025-12',
  5318713
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'despesa',
  'Manutenção Carro Pastor / Reforma Púlpito',
  0.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5951749
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'despesa',
  'Ofertas para o profeta José Rubens',
  279.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5951748
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Maria Hadyklei Lúcio da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270166',
  '2026-01',
  5498735
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Ailton de Morais',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2026-01',
  5496636
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Ailton de Morais',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2026-01',
  5496634
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Sueli Lourenço da Silva',
  16.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2026-01',
  5496577
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Ailton de Morais',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-01',
  5496631
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-01',
  5496574
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Josefa Zacarias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2026-01',
  5499737
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Luciene',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2026-01',
  5498729
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Ofertas de Gratidão',
  122.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5496677
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Tauanny da Silva Bezerra',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_703186',
  '2026-01',
  5496668
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Larisse',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5496663
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Raquel Camilo',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_186076',
  '2026-01',
  5496659
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Ailton de Morais',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-01',
  5496627
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Sueli Lourenço da Silva',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-01',
  5496572
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Ailton de Morais',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2026-01',
  5496626
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Sueli Lourenço da Silva',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2026-01',
  5496570
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Jucieneide Terto da Silva',
  57.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2026-01',
  5498738
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Anderson Davi Ferreira',
  313.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2026-01',
  5496653
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2026-01',
  5496649
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Jaudijane Martins Viana',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2026-01',
  5496644
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Ailton de Morais',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-01',
  5496624
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Janderson Ferreira Barros',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2026-01',
  5496586
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'José Bezerra dos Santos',
  144.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-01',
  5496579
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Sueli Lourenço da Silva',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-01',
  5496568
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Jose Cicero Ferreira',
  152.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2026-01',
  5496560
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Ailton de Morais',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-01',
  5496590
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-04',
  'receita',
  'Sueli Lourenço da Silva',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-01',
  5496567
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-08',
  'receita',
  'Jakciel Laurentino',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2026-01',
  5499746
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-08',
  'receita',
  'Damiana Lourenço da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1010673',
  '2026-01',
  5499741
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-08',
  'receita',
  'Maria Hadyklei Lúcio da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2026-01',
  5498747
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-08',
  'receita',
  'Ofertas de Gratidão',
  46.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5496721
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-08',
  'receita',
  'Janderson Ferreira Barros',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2026-01',
  5496698
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-08',
  'receita',
  'Ageilda Gonçalo da Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2026-01',
  5496715
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-08',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2026-01',
  5496709
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-08',
  'receita',
  'Jucineide Terto da Silva',
  186.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2026-01',
  5496706
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-08',
  'receita',
  'Shirley Lopes Ferreira',
  373.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2026-01',
  5496703
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-08',
  'receita',
  'Josinaldo Bernardo da Silva',
  57.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2026-01',
  5496694
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-08',
  'receita',
  'Ageilda Gonçalo da Silva',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2026-01',
  5496712
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-08',
  'receita',
  'José Bezerra dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-01',
  5496701
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-10',
  'despesa',
  'Aluguel do Templo (1/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5353716
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-11',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2026-01',
  5498761
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-11',
  'receita',
  'Jessica Lourenço',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2026-01',
  5498759
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-11',
  'receita',
  'Jose Cicero Ferreira',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2026-01',
  5498757
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-11',
  'receita',
  'Quiteria Alves',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_703622',
  '2026-01',
  5498755
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-11',
  'receita',
  'Ofertas de Gratidão',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5496749
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-11',
  'receita',
  'Jakciel Laurentino',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2026-01',
  5496745
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-11',
  'receita',
  'Tauanny da Silva Bezerra',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_703186',
  '2026-01',
  5496734
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-11',
  'receita',
  'Janderson Ferreira Barros',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2026-01',
  5496742
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-11',
  'receita',
  'José Bezerra dos Santos',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-01',
  5496740
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-11',
  'receita',
  'Luana Raysa',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_998908',
  '2026-01',
  5496738
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-11',
  'receita',
  'Josinaldo Bernardo da Silva',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2026-01',
  5496735
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-15',
  'receita',
  'Ofertas de Gratidão',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5496774
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-15',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2026-01',
  5496770
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-15',
  'receita',
  'Janderson Ferreira Barros',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2026-01',
  5496754
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-15',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  234.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2026-01',
  5496767
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-15',
  'receita',
  'Edivanio',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-01',
  5496762
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-15',
  'receita',
  'José Bezerra dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-01',
  5496757
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-16',
  'despesa',
  'Produtos de limpeza e consumo',
  218.83,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5837916
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-18',
  'receita',
  'Jandersson Ferreira Barros',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2026-01',
  5496797
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-18',
  'receita',
  'Jakciel Laurentino',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2026-01',
  5499877
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-18',
  'receita',
  'Ofertas de Gratidão',
  79.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5496799
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-18',
  'receita',
  'Marina',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5496790
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-18',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2026-01',
  5496794
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-18',
  'receita',
  'José Bezerra dos Santos',
  103.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-01',
  5496788
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-18',
  'receita',
  'Joede da Silva Viana',
  900.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2026-01',
  5496782
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-18',
  'receita',
  'Edivanio',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5496784
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-20',
  'despesa',
  'Fatura de energia do templo',
  111.05,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5837805
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-20',
  'despesa',
  'Fatura de energia da casa pastoral',
  171.15,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5837920
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-22',
  'receita',
  'João Paulo',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5498771
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-22',
  'receita',
  'Willian Cordeiro',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5498767
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-22',
  'receita',
  'Ofertas de Gratidão',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5496806
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-22',
  'receita',
  'Jandersson Ferreira Barros',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2026-01',
  5496804
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-22',
  'receita',
  'Josinaldo Bernardo da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2026-01',
  5496805
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-22',
  'receita',
  'Shirley Lopes Ferreira',
  303.6,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2026-01',
  5496803
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-22',
  'receita',
  'Jucineide Terto da Silva',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2026-01',
  5496802
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-25',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270166',
  '2026-01',
  5499771
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-25',
  'receita',
  'Ofertas de Gratidão',
  71.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5498635
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-25',
  'receita',
  'Lucas Vinício Barboza da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_273276',
  '2026-01',
  5498634
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-25',
  'receita',
  'Ofertas de Gratidão',
  86.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5498620
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-25',
  'receita',
  'Quiteria Alves',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_703622',
  '2026-01',
  5498601
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-25',
  'receita',
  'Damiana Lourenço da Silva',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1010673',
  '2026-01',
  5498615
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-25',
  'receita',
  'Jandersson Ferreira Barros',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2026-01',
  5498611
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-25',
  'receita',
  'Josinaldo Bernardo da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2026-01',
  5498610
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-25',
  'receita',
  'Jaudijane Martins Viana',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2026-01',
  5498604
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-25',
  'receita',
  'José Bezerra dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-01',
  5496809
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-28',
  'receita',
  'Luiz dos Santos',
  172.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2026-01',
  5498721
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-29',
  'receita',
  'Ofertas de Gratidão',
  71.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5498648
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-29',
  'receita',
  'Jandersson Ferreira Barros',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2026-01',
  5498647
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-29',
  'receita',
  'Jakciel Laurentino',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2026-01',
  5498639
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-29',
  'receita',
  'Jadson de Lima Moura',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_169659',
  '2026-01',
  5498636
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-29',
  'receita',
  'Josefa Zacarias',
  150.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2026-01',
  5498644
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-29',
  'receita',
  'Alicia Regina da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2026-01',
  5498642
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-29',
  'receita',
  'José Bezerra dos Santos',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-01',
  5498646
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-30',
  'despesa',
  '5 Galões de Água Mineral',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46947),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5494003
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-30',
  'receita',
  'Manutenção de impressora',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2026-01',
  5493245
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-30',
  'receita',
  'Jadson de Lima Moura',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_169659',
  '2026-01',
  5498660
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-30',
  'receita',
  'Jandersson Ferreira Barros',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2026-01',
  5498659
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-30',
  'receita',
  'Tauanny da Silva Bezerra',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_703186',
  '2026-01',
  5498657
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-30',
  'receita',
  'Damiana Lourenço da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_230831',
  '2026-01',
  5498654
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-30',
  'receita',
  'José Bezerra dos Santos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-01',
  5498652
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-30',
  'receita',
  'Jakciel Laurentino',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270053',
  '2026-01',
  5499790
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-30',
  'receita',
  'Raquel Camilo',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_186076',
  '2026-01',
  5499788
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-30',
  'receita',
  'Damiana Lourenço da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1010673',
  '2026-01',
  5499784
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-30',
  'receita',
  'Quiteria Alves',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_703622',
  '2026-01',
  5499783
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-30',
  'receita',
  'Semeadura',
  126.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5498674
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-31',
  'despesa',
  'Mensalidade do sistema.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5805327
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-31',
  'despesa',
  'Despesas Gerais',
  306.2,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5805315
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-31',
  'despesa',
  'Despesas Médicas.',
  1529.91,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5805312
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-01-31',
  'despesa',
  'Tributos para o apóstolo.',
  837.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-01',
  5805322
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-01',
  'receita',
  'José Bezerra dos Santos',
  300.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-02',
  5665224
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-01',
  'receita',
  'Ofertas de Gratidão',
  108.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5665099
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-01',
  'receita',
  'Kyara',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5665064
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-01',
  'receita',
  'Josinaldo Bernardo da Silva',
  645.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2026-02',
  5665085
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-01',
  'receita',
  'José Bezerra dos Santos',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-02',
  5665080
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-01',
  'receita',
  'Damiana Lourenço da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1010673',
  '2026-02',
  5665077
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-01',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2026-02',
  5665072
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-05',
  'receita',
  'Jessica Lourenço',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2026-02',
  5665292
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-05',
  'receita',
  'Josefa Zacarias',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2026-02',
  5664967
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-05',
  'receita',
  'Ofertas de Gratidão',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5663340
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-05',
  'receita',
  'José Cicero Ferreira',
  162.1,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2026-02',
  5663327
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-05',
  'receita',
  'Jaudijane Martins Viana',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2026-02',
  5663323
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-05',
  'receita',
  'Shirley Lopes Ferreira',
  400.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2026-02',
  5663317
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-05',
  'receita',
  'Anderson Davi Ferreira da Silva',
  330.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2026-02',
  5663313
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-05',
  'receita',
  'Ageilda Gonçalo da Silva',
  280.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2026-02',
  5663299
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-06',
  'receita',
  'Manutenção de impressora',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46402),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8611),
  NULL,
  '2026-02',
  5493228
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-06',
  'receita',
  'Isabel Cristina',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5665296
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-06',
  'receita',
  'Nikole Giovanna Gonçalo Pereira',
  177.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_133288',
  '2026-02',
  5665312
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-08',
  'despesa',
  'Ofertas para o profeta José Rubens',
  325.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5951745
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-08',
  'receita',
  'Ofertas de Gratidão',
  9.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5663451
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-08',
  'receita',
  'Maria José Ferreira de Araújo Silva',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2026-02',
  5663381
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-08',
  'receita',
  'Jessica Lourenço',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2026-02',
  5663359
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-08',
  'receita',
  'Josefa Zacarias',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2026-02',
  5663294
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-08',
  'receita',
  'Josinaldo Bernardo da Silva',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2026-02',
  5663397
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-08',
  'receita',
  'Jucieneide Terto da Silva',
  194.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2026-02',
  5663389
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-08',
  'receita',
  'Maria José Ferreira de Araújo Silva',
  244.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2026-02',
  5663379
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-08',
  'receita',
  'Janderson Ferreira Barros',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2026-02',
  5663373
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-08',
  'receita',
  'José Bezerra dos Santos',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-02',
  5663366
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-08',
  'receita',
  'Fabio Sena Viana',
  58.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5665345
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-08',
  'receita',
  'Luana Raysa',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_998908',
  '2026-02',
  5665341
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-10',
  'despesa',
  'Aluguel do Templo (2/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5353717
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-12',
  'receita',
  'Sueli Lourenço da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2026-02',
  5663486
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-12',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-02',
  5663478
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-12',
  'receita',
  'Ofertas de Gratidão',
  31.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5663520
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-12',
  'receita',
  'Maria José Ferreira de Araújo',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54688',
  '2026-02',
  5663515
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-12',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-02',
  5663473
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-12',
  'receita',
  'Sueli Lourenço da Silva',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2026-02',
  5663468
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-12',
  'receita',
  'Marina',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5663493
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-12',
  'receita',
  'Sueli Lourenço da Silva',
  155.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-02',
  5663463
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-12',
  'receita',
  'Ageilda Gonçalo da Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2026-02',
  5663508
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-12',
  'receita',
  'Sueli Lourenço da Silva',
  54.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-02',
  5663460
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-15',
  'receita',
  'Ailton de Morais Araujo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2026-02',
  5663542
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-15',
  'receita',
  'Ailton de Morais Araujo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-02',
  5663540
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-15',
  'receita',
  'Jessica Lourenço',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2026-02',
  5665357
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-15',
  'receita',
  'Ofertas de Gratidão',
  28.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5664853
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-15',
  'receita',
  'Josielma Zacarias de Morais',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270272',
  '2026-02',
  5663560
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-15',
  'receita',
  'Ailton de Morais Araujo',
  21.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-02',
  5663537
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-15',
  'receita',
  'Ailton de Morais Araujo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2026-02',
  5663533
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-15',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2026-02',
  5663552
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-15',
  'receita',
  'Jucineide Terto da Silva',
  68.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2026-02',
  5663547
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-15',
  'receita',
  'Ailton de Morais Araujo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-02',
  5663530
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-15',
  'receita',
  'José Bezerra dos Santos',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-02',
  5663523
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-15',
  'receita',
  'Ailton de Morais Araujo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-02',
  5663527
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-19',
  'receita',
  'Ofertas de Gratidão',
  52.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5663644
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-19',
  'receita',
  'Joede da Silva Viana',
  1200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_54693',
  '2026-02',
  5663622
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-19',
  'receita',
  'José Bezerra dos Santos',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-02',
  5663631
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-22',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  44.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2026-02',
  5665406
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-22',
  'receita',
  'Ofertas de Gratidão',
  61.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5663737
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-22',
  'receita',
  'Jaudijane Martins Viana',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2026-02',
  5663733
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-22',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2026-02',
  5663698
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-22',
  'receita',
  'Damiana Lourenço da Silva',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1010673',
  '2026-02',
  5663692
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-22',
  'receita',
  'José Bezerra dos Santos',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-02',
  5663688
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-22',
  'receita',
  'Josinaldo Bernardo da Silva',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2026-02',
  5663681
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-24',
  'despesa',
  'Energia (Casa pastoral)',
  180.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5990068
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-25',
  'receita',
  'Luiz dos Santos',
  461.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2026-02',
  5665185
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-26',
  'receita',
  'Jessica Lourenço',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2026-02',
  5665439
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-26',
  'receita',
  'Ofertas de Gratidão',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5663751
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-26',
  'receita',
  'Alicia Regina da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2026-02',
  5665454
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-26',
  'receita',
  'Jessica Lourenço',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2026-02',
  5663745
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-26',
  'receita',
  'Josefa Zacarias',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2026-02',
  5663741
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-26',
  'receita',
  'José Bezerra dos Santos',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-02',
  5663743
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-28',
  'despesa',
  'Mensalidade do sistema.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5805345
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-28',
  'despesa',
  'Tributos para o apóstolo.',
  938.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5805342
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-28',
  'despesa',
  'Despesas Gerais.',
  325.95,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5805333
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-02-28',
  'despesa',
  'Despesas Médicas.',
  495.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-02',
  5805330
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-01',
  'receita',
  'Ailton de Morais Araujo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2026-03',
  5805412
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-01',
  'receita',
  'Ailton de Morais Araujo',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2026-03',
  5805411
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-01',
  'receita',
  'Ailton de Morais Araujo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-03',
  5805409
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-01',
  'receita',
  'Jessica Lourenço',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2026-03',
  5806523
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-01',
  'receita',
  'Jessica Lourenço',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2026-03',
  5806519
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-01',
  'receita',
  'Ailton de Morais Araujo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-03',
  5805408
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-01',
  'receita',
  'Ofertas de Gratidão',
  73.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805380
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-01',
  'receita',
  'Ailton de Morais Araujo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2026-03',
  5805406
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-01',
  'receita',
  'Jandersson Ferreira Barros',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2026-03',
  5805379
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-01',
  'receita',
  'Ailton de Morais Araujo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-03',
  5805376
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-01',
  'receita',
  'Alicia Regina da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2026-03',
  5805372
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-01',
  'receita',
  'José Bezerra dos Santos',
  220.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-03',
  5805368
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-01',
  'receita',
  'Ailton de Morais Araujo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-03',
  5805403
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-05',
  'receita',
  'Sueli Lourenço da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2026-03',
  5805397
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-05',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-03',
  5805396
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-05',
  'receita',
  'Ofertas de Gratidão',
  53.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805399
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-05',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-03',
  5805395
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-05',
  'receita',
  'Sueli Lourenço da Silva',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2026-03',
  5805393
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-05',
  'receita',
  'Sueli Lourenço da Silva',
  155.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-03',
  5805392
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-05',
  'receita',
  'Jose Cicero Ferreira',
  162.1,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2026-03',
  5805385
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-05',
  'receita',
  'Anderson Davi Ferreira da Silva',
  327.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2026-03',
  5805384
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-05',
  'receita',
  'Jaudijane Martins Viana',
  120.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2026-03',
  5805383
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-05',
  'receita',
  'Sueli Lourenço da Silva',
  54.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-03',
  5805391
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-05',
  'receita',
  'José Bezerra dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-03',
  5805387
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-07',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2026-03',
  5806548
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-07',
  'receita',
  'Maria Elisabete Ferreira da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5806542
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-07',
  'receita',
  'Maria Gabriela',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5806539
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-07',
  'receita',
  'Jessica Lourenço',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2026-03',
  5806536
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-07',
  'receita',
  'Rede de Mulheres',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805435
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-08',
  'despesa',
  'LED',
  5.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5838542
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-08',
  'receita',
  'Ofertas de Gratidão',
  61.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805431
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-08',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2026-03',
  5805427
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-08',
  'receita',
  'Maria José de Araujo Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2026-03',
  5805422
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-08',
  'receita',
  'Jucineide Terto da Silva',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2026-03',
  5805430
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-08',
  'receita',
  'Maria Barbosa de Souza Silva',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2026-03',
  5805429
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-08',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2026-03',
  5805426
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-08',
  'receita',
  'Maria José de Araujo Silva',
  239.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2026-03',
  5805419
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-08',
  'receita',
  'José Bezerra dos Santos',
  145.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-03',
  5805414
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-10',
  'despesa',
  'Aluguel do Templo (3/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5353718
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-12',
  'receita',
  'Josefa Zacarias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2026-03',
  5806557
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-12',
  'receita',
  'Ofertas de Gratidão',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805448
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-12',
  'receita',
  'Shirley Lopes Ferreira',
  416.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2026-03',
  5805445
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-12',
  'receita',
  'Marina',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805444
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-12',
  'receita',
  'José Bezerra dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-03',
  5805441
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-15',
  'despesa',
  'Ofertas para o profeta José Rubens',
  214.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5951731
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-15',
  'receita',
  'Anônimo 1',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  NULL,
  '2026-03',
  5805454
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-15',
  'receita',
  'Ofertas de Gratidão',
  104.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805453
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-15',
  'receita',
  'José Bezerra dos Santos',
  85.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-03',
  5805450
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-19',
  'receita',
  'Policlinica',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5806568
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-19',
  'receita',
  'Ofertas de Gratidão',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805461
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-19',
  'receita',
  'José Bezerra dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-03',
  5805459
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-22',
  'receita',
  'Jadson de Lima Moura',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_169659',
  '2026-03',
  5806591
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-22',
  'receita',
  'Ofertas de Gratidão',
  28.05,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805485
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-22',
  'receita',
  'Daiana da Silva Costa Laurentino',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_278189',
  '2026-03',
  5805462
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-22',
  'receita',
  'Josinaldo Bernardo da Silva',
  153.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2026-03',
  5805483
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-22',
  'receita',
  'Jandersson Ferreira Barros',
  36.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_225414',
  '2026-03',
  5805482
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-22',
  'receita',
  'José Bezerra dos Santos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-03',
  5805477
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-22',
  'receita',
  'Jucineide Terto da Silva',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236572',
  '2026-03',
  5805474
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-22',
  'receita',
  'Ageilda Gonçalo da Silva',
  280.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2026-03',
  5805473
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-22',
  'receita',
  'Jaudijane Martins Viana',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2026-03',
  5805467
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-22',
  'receita',
  'Ageilda Gonçalo da Silva',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2026-03',
  5805472
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-22',
  'receita',
  'Jaciel',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805465
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-26',
  'receita',
  'Ofertas de Gratidão',
  65.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805494
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-26',
  'receita',
  'Jessica Fernanda',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805489
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-26',
  'receita',
  'Damiana Lourenço da Silva',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_230831',
  '2026-03',
  5805487
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-26',
  'receita',
  'José Bezerra dos Santos',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-03',
  5805491
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-27',
  'receita',
  'Luiz dos Santos',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2026-03',
  5805526
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-29',
  'receita',
  'Lucinaldo',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5806605
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-29',
  'receita',
  'Ofertas de Gratidão',
  69.35,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805504
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-29',
  'receita',
  'Alicia Regina da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2026-03',
  5805501
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-29',
  'receita',
  'José Bezerra dos Santos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-03',
  5805497
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-31',
  'despesa',
  'Despesas Gerais',
  41.84,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805523
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-31',
  'despesa',
  'Despesas Médicas.',
  723.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805522
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-31',
  'despesa',
  'Mensalidade do sistema.',
  55.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5805360
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-03-31',
  'despesa',
  'Tributos para o apóstolo',
  735.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46849),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-03',
  5837583
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-02',
  'receita',
  'Jose Wesley',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5962591
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-02',
  'receita',
  'Jessica Lourenço',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2026-04',
  5962590
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-02',
  'receita',
  'Ofertas de Gratidão',
  56.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5950280
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-02',
  'receita',
  'Tauanny da Silva Bezerra',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_703186',
  '2026-04',
  5950278
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-02',
  'receita',
  'Jose Cicero Ferreira',
  162.1,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2026-04',
  5950273
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-02',
  'receita',
  'Anderson Ferreira da Silva',
  364.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2026-04',
  5950271
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-02',
  'receita',
  'Shirley Lopes Ferreira',
  384.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2026-04',
  5950269
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-02',
  'receita',
  'Josinaldo Bernardo da Silva',
  45.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2026-04',
  5950267
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Ailton de Morais Araujo',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46389),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8507),
  'Membro/Contato: DISC_270671',
  '2026-04',
  5950312
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Ailton de Morais Araujo',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2026-04',
  5950311
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Sueli Lourenço da Silva',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2026-04',
  5950301
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Ailton de Morais Araujo',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-04',
  5950309
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Sueli Lourenço da Silva',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-04',
  5950298
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Maria Clara Zacarias',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270276',
  '2026-04',
  5962599
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Ailton de Morais Araujo',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-04',
  5962598
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Josenildo Zacarias',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_567732',
  '2026-04',
  5950846
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Ofertas de Gratidão',
  141.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5950345
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Ailton de Morais Araujo',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-04',
  5950308
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Sueli Lourenço da Silva',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-04',
  5950296
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Ailton de Morais Araujo',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2026-04',
  5950306
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Sueli Lourenço da Silva',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2026-04',
  5950294
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Ailton de Morais Araujo',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-04',
  5950304
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Sueli Lourenço da Silva',
  155.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-04',
  5950292
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'José Bezerra dos Santos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-04',
  5950288
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2026-04',
  5950286
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Jucineide Terto da Silva',
  193.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164547',
  '2026-04',
  5950284
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Jaudijane Martins Viana',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5950282
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Samuel da Silva Bezerra',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1123722',
  '2026-04',
  5950341
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Ailton de Morais Araujo',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-04',
  5950302
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-05',
  'receita',
  'Sueli Lourenço da Silva',
  54.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-04',
  5950290
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-09',
  'receita',
  'Ageilda Gonçalo da Silva',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2026-04',
  5950358
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-09',
  'receita',
  'Ofertas de Gratidão',
  41.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5950391
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-09',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2026-04',
  5950373
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-09',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2026-04',
  5950365
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-09',
  'receita',
  'Ageilda Gonçalo da Silva',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2026-04',
  5950356
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-09',
  'receita',
  'Maria José Ferreira de Araujo Silva',
  250.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2026-04',
  5950363
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-09',
  'receita',
  'Ageilda Gonçalo da Silva',
  280.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2026-04',
  5950354
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-09',
  'receita',
  'Primícias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5950371
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-09',
  'receita',
  'José Bezerra dos Santos',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164597',
  '2026-04',
  5950369
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-09',
  'receita',
  'Ageilda Gonçalo da Silva',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2026-04',
  5950353
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-10',
  'despesa',
  'Aluguel do Templo (4/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5353719
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-12',
  'despesa',
  'Ofertas para o projeta José Rubens',
  75.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5951700
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-12',
  'despesa',
  'Despesas',
  306.23,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5951681
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-12',
  'despesa',
  'Ofertas diárias',
  180.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5951518
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-12',
  'despesa',
  'Despesas Médicas',
  426.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5951515
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-12',
  'despesa',
  'Pagamento do enuves',
  59.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 56922),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5951514
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-12',
  'receita',
  'Semeadura',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5950450
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-12',
  'receita',
  'Josefa Zacarias',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2026-04',
  5962606
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-12',
  'receita',
  'Jessica Lourenço',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2026-04',
  5962604
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-12',
  'receita',
  'Jessica Lourenço',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2026-04',
  5962603
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-12',
  'receita',
  'Ofertas de Gratidão',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5950454
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-12',
  'receita',
  'Marina Paula',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164604',
  '2026-04',
  5950449
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-12',
  'receita',
  'Alexsandro Ferreira de Albuquerque',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2026-04',
  5950447
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-12',
  'receita',
  'Josinaldo Bernardo da Silva',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2026-04',
  5950445
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-12',
  'receita',
  'José Bezerra dos Santos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164597',
  '2026-04',
  5950443
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-16',
  'receita',
  'Ofertas de Gratidão',
  38.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5950609
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-16',
  'receita',
  'Isabelly Daiane Cardoso Barreto',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568544',
  '2026-04',
  5950605
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-19',
  'receita',
  'Ofertas de Gratidão',
  43.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5950600
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-19',
  'receita',
  'Ofertas de Gratidão',
  95.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5950599
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-19',
  'receita',
  'Edivanio Alves Herculano da Silva',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164549',
  '2026-04',
  5950582
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-19',
  'receita',
  'Larisse da Conceicão',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164554',
  '2026-04',
  5950577
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-19',
  'receita',
  'Jadson de Lima Moura',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_169659',
  '2026-04',
  5950556
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-19',
  'receita',
  'Raquel Fideles',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164558',
  '2026-04',
  5950461
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-19',
  'receita',
  'José Bezerra dos Santos',
  200.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-04',
  5950586
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-19',
  'receita',
  'Jandersson Ferreira Barros',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164552',
  '2026-04',
  5950458
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-19',
  'receita',
  'José Bezerra dos Santos',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-04',
  5950585
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-23',
  'receita',
  'Ofertas de Gratidão',
  20.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5950624
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-23',
  'receita',
  'José Bezerra dos Santos',
  500.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-04',
  5950619
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-23',
  'receita',
  'Jaudijane Martins Viana',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2026-04',
  5950617
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-23',
  'receita',
  'José Bezerra dos Santos',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-04',
  5950621
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-24',
  'despesa',
  'Energia',
  133.15,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5988993
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-24',
  'despesa',
  'Energia (Casa pastoral)',
  180.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5988991
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-26',
  'receita',
  'Maria Hadykleid Lúcio da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270166',
  '2026-04',
  5962621
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-26',
  'receita',
  'Ofertas de Gratidão',
  132.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5950638
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-26',
  'receita',
  'Jessica Lourenço',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2026-04',
  5950633
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-26',
  'receita',
  'Edivanio Alves Herculano da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_1164549',
  '2026-04',
  5950628
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-26',
  'receita',
  'José Bezerra dos Santos',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-04',
  5950634
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-27',
  'despesa',
  'Energia (do templo)',
  103.54,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5988986
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-27',
  'despesa',
  'Energia (Casa pastoral)',
  170.69,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5988977
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-28',
  'despesa',
  'Energia (do templo)',
  115.7,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5988997
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-28',
  'despesa',
  'Energia (Casa pastoral)',
  115.7,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5988989
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-28',
  'receita',
  'Josefa Zacarias',
  500.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269485',
  '2026-04',
  5962628
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-30',
  'receita',
  'Jose Cicero Ferreira',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2026-04',
  5962630
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-30',
  'receita',
  'Ofertas de Gratidão',
  13.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-04',
  5950658
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-30',
  'receita',
  'Caio Henrique Santos',
  300.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_563708',
  '2026-04',
  5950645
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-30',
  'receita',
  'Luiz dos Santos',
  90.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_170432',
  '2026-04',
  5962632
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-30',
  'receita',
  'Josinaldo Bernardo da Silva',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2026-04',
  5950654
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-30',
  'receita',
  'Alicia Regina da Silva',
  63.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2026-04',
  5950649
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-04-30',
  'receita',
  'Edivanio Alves Herculano da Silva',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164549',
  '2026-04',
  5950641
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-03',
  'receita',
  'Ofertas de Gratidão',
  109.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  6049326
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-03',
  'receita',
  'Oferta de gratidão',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164549',
  '2026-05',
  6049322
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-03',
  'receita',
  'Ofeta de gratidão',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164558',
  '2026-05',
  6049318
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-03',
  'receita',
  'Dízimo',
  60.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-05',
  6049291
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-03',
  'receita',
  'Dízimo',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_269579',
  '2026-05',
  6049287
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-03',
  'receita',
  'Primícias',
  15.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568544',
  '2026-05',
  6049316
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-06',
  'receita',
  'Dízimo',
  270.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_342812',
  '2026-05',
  5988875
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-06',
  'receita',
  'Dízimo via pix',
  130.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2026-05',
  5988736
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-07',
  'receita',
  'Oferta para Israel',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2026-05',
  5988894
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-07',
  'receita',
  'Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2026-05',
  5988892
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-07',
  'receita',
  'Oferta de gratidão',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164549',
  '2026-05',
  5988898
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-07',
  'receita',
  'Dízimo',
  67.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2026-05',
  5988928
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-07',
  'receita',
  'Dízimo',
  115.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-05',
  5988888
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-07',
  'receita',
  'Dízimo',
  162.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2026-05',
  5988865
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-07',
  'receita',
  'Dízimo via pix',
  371.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2026-05',
  5988863
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-07',
  'receita',
  'Dízimo via pix',
  384.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459979',
  '2026-05',
  5988743
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-07',
  'receita',
  'Dízimo',
  280.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568420',
  '2026-05',
  5988734
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-07',
  'receita',
  'Primícias',
  54.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-05',
  5988878
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-10',
  'despesa',
  'Aluguel do Templo (5/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  5353720
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-10',
  'receita',
  'Oferta de gratidão',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46513),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164549',
  '2026-05',
  5988918
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-10',
  'receita',
  'Ofertas para Israel',
  19.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_270671',
  '2026-05',
  5988962
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-10',
  'receita',
  'Semeadura',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2026-05',
  5988957
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-10',
  'receita',
  'Oferta de gartidão',
  3.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  5988964
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-10',
  'receita',
  'Dízimo',
  23.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164552',
  '2026-05',
  5988965
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-10',
  'receita',
  'Dízimo via pix',
  179.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-05',
  5988951
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-10',
  'receita',
  'Primícias',
  62.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270671',
  '2026-05',
  5988942
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-14',
  'despesa',
  'Energia (do templo)',
  110.36,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  5988984
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-14',
  'despesa',
  'Energia (Casa pastoral)',
  184.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 47049),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  5988981
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-14',
  'receita',
  'Ofertas de gratidão',
  47.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  5988733
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-14',
  'receita',
  'Dízimo',
  30.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_703186',
  '2026-05',
  5988722
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-16',
  'despesa',
  '3 cabos e 3 vassouras',
  48.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46403),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  5990054
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-17',
  'receita',
  'Ofertas de gratidão',
  85.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  5988975
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-17',
  'receita',
  'Oferta de gratidão',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164549',
  '2026-05',
  5988968
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-17',
  'receita',
  'Dízimo',
  215.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164597',
  '2026-05',
  5988971
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-21',
  'receita',
  'Oferta de gratidão',
  27.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  6027360
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-21',
  'receita',
  'Oferta de gratidão',
  5.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164549',
  '2026-05',
  6027330
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-21',
  'receita',
  'Oferta de gratidão',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_960063',
  '2026-05',
  6027281
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-21',
  'receita',
  'Oferta de gratidão',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_568544',
  '2026-05',
  6027319
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-21',
  'receita',
  'Dízimo Via pix',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_256173',
  '2026-05',
  6027295
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-22',
  'receita',
  'Ofertas de gratidão',
  148.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  5988938
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-22',
  'receita',
  'Ofertas de gratidão',
  65.5,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  5988905
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-22',
  'receita',
  'Oferta de socorro',
  37.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_270671',
  '2026-05',
  5988952
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-22',
  'receita',
  'Oferta de socorro',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2026-05',
  5988891
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-22',
  'receita',
  'Dízimo via pix',
  286.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164547',
  '2026-05',
  5988937
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-22',
  'receita',
  'Dízimo',
  35.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164552',
  '2026-05',
  5988922
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-24',
  'receita',
  'Oferta de Israel',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2026-05',
  6027679
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-24',
  'receita',
  'Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-05',
  6027661
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-24',
  'receita',
  'Oferta de gratidão',
  257.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  6027690
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-24',
  'receita',
  'Oferta de gratidão',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164597',
  '2026-05',
  6027558
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-24',
  'receita',
  'Oferta de gratidão',
  4.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164549',
  '2026-05',
  6027419
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-24',
  'receita',
  'Oferta de gratidão',
  8.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164558',
  '2026-05',
  6027388
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-24',
  'receita',
  'Oferta de socorro',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2026-05',
  6027651
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-24',
  'receita',
  'Dízimo',
  155.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-05',
  6027639
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-24',
  'receita',
  'Dízimo',
  50.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164597',
  '2026-05',
  6027625
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-24',
  'receita',
  'Dízimo',
  155.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_236571',
  '2026-05',
  6027501
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-24',
  'receita',
  'Dízimo',
  95.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164552',
  '2026-05',
  6027480
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-24',
  'receita',
  'Dízimo',
  140.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1010673',
  '2026-05',
  6027437
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-24',
  'receita',
  'Dízimo',
  65.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164547',
  '2026-05',
  6027408
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-24',
  'receita',
  'Primícias',
  54.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-05',
  6027531
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-28',
  'receita',
  'Oferta de gratidão',
  27.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  6027000
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-28',
  'receita',
  'Oferta de gratidão',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_278189',
  '2026-05',
  6026992
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-28',
  'receita',
  'Oferta de gratidão',
  10.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  6026980
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-31',
  'receita',
  'Oferta de gratidão',
  64.8,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-05',
  6027261
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-31',
  'receita',
  'Dízimo',
  70.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164597',
  '2026-05',
  6027576
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-31',
  'receita',
  'Dízimo Via pix',
  87.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_397053',
  '2026-05',
  6027241
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-05-31',
  'receita',
  'Dízimo',
  40.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164552',
  '2026-05',
  6027206
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-06-04',
  'receita',
  'Oferta para Israel',
  17.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46388),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8506),
  'Membro/Contato: DISC_312140',
  '2026-06',
  6052079
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-06-04',
  'receita',
  'Semeadura',
  7.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46387),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2026-06',
  6052076
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-06-04',
  'receita',
  'Oferta de gratidão',
  56.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-06',
  6052102
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-06-04',
  'receita',
  'Oferta de gratidão',
  2.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_1164549',
  '2026-06',
  6052087
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-06-04',
  'receita',
  'Oferta de socorro',
  33.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46385),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8505),
  'Membro/Contato: DISC_312140',
  '2026-06',
  6052073
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-06-04',
  'receita',
  'Dízimo',
  100.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_270056',
  '2026-06',
  6052083
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-06-04',
  'receita',
  'Dízimo',
  155.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-06',
  6052071
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-06-04',
  'receita',
  'Dízimo via pix',
  325.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_459988',
  '2026-06',
  6052060
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-06-04',
  'receita',
  'Dízimo via pix',
  162.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46384),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_267878',
  '2026-06',
  6052050
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-06-04',
  'receita',
  'Primícias',
  54.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46383),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: DISC_312140',
  '2026-06',
  6052069
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-06-05',
  'receita',
  'Oferta de gratidão',
  6.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46386),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  'Membro/Contato: CNTT_218789',
  '2026-06',
  6052092
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-06-10',
  'despesa',
  'Aluguel do Templo (6/12)',
  800.0,
  'pago',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-06',
  5353722
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-07-10',
  'despesa',
  'Aluguel do Templo (7/12)',
  800.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-07',
  5353723
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-08-10',
  'despesa',
  'Aluguel do Templo (8/12)',
  800.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-08',
  5353724
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-09-10',
  'despesa',
  'Aluguel do Templo (9/12)',
  800.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-09',
  5353725
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-10-10',
  'despesa',
  'Aluguel do Templo (10/12)',
  800.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-10',
  5353726
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-11-10',
  'despesa',
  'Aluguel do Templo (11/12)',
  800.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-11',
  5353727
) ON CONFLICT (enuves_id) DO NOTHING;
INSERT INTO public.transacoes_financeiras (data, tipo, descricao, valor, status, categoria_id, conta_id, anotacoes, competencia, enuves_id) 
VALUES (
  '2026-12-10',
  'despesa',
  'Aluguel do Templo (12/12)',
  800.0,
  'pendente',
  (SELECT id FROM public.categorias_financeiras WHERE enuves_id = 46405),
  (SELECT id FROM public.contas_financeiras WHERE enuves_id = 8441),
  NULL,
  '2026-12',
  5353728
) ON CONFLICT (enuves_id) DO NOTHING;


COMMIT;
