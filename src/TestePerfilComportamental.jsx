import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { PageHeader, Card, Avatar } from './ui';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Save,
  Sparkles,
  Brain,
  Printer,
  Search,
  UserCheck,
  Award,
  AlertCircle,
  History,
} from 'lucide-react';

// ── Banco Completo: 50 Questões (25 Oficiais IBC/Ned Herrmann + 25 para Reteste) ──
const QUESTOES_POR_TESTE = 25;

const BANCO_QUESTOES = [
  {
    id: 1,
    pergunta: 'Eu sou...',
    opcoes: [
      { tipo: 'I', texto: 'Idealista, criativo e visionário' },
      { tipo: 'C', texto: 'Divertido, espiritual e benéfico' },
      { tipo: 'O', texto: 'Confiável, meticuloso e previsível' },
      { tipo: 'A', texto: 'Focado, determinado e persistente' },
    ],
  },
  {
    id: 2,
    pergunta: 'Eu gosto de...',
    opcoes: [
      { tipo: 'A', texto: 'Ser piloto' },
      { tipo: 'C', texto: 'Conversar com os passageiros' },
      { tipo: 'O', texto: 'Planejar a viagem' },
      { tipo: 'I', texto: 'Explorar novas rotas' },
    ],
  },
  {
    id: 3,
    pergunta: 'Se você quiser se dar bem comigo...',
    opcoes: [
      { tipo: 'I', texto: 'Me dê liberdade' },
      { tipo: 'O', texto: 'Me deixe saber sua expectativa' },
      { tipo: 'A', texto: 'Lidere, siga ou saia do caminho' },
      { tipo: 'C', texto: 'Seja amigável, carinhoso e compreensivo' },
    ],
  },
  {
    id: 4,
    pergunta: 'Para conseguir obter bons resultados é preciso...',
    opcoes: [
      { tipo: 'I', texto: 'Ter incertezas' },
      { tipo: 'O', texto: 'Controlar o essencial' },
      { tipo: 'C', texto: 'Diversão e celebração' },
      { tipo: 'A', texto: 'Planejar e obter recursos' },
    ],
  },
  {
    id: 5,
    pergunta: 'Eu me divirto quando...',
    opcoes: [
      { tipo: 'A', texto: 'Estou me exercitando' },
      { tipo: 'I', texto: 'Tenho novidades' },
      { tipo: 'C', texto: 'Estou com os outros' },
      { tipo: 'O', texto: 'Determino as regras' },
    ],
  },
  {
    id: 6,
    pergunta: 'Eu penso que...',
    opcoes: [
      { tipo: 'C', texto: 'Unidos venceremos, divididos perderemos' },
      { tipo: 'A', texto: 'O ataque é melhor que a defesa' },
      { tipo: 'I', texto: 'É bom ser manso, mas andar com um porrete' },
      { tipo: 'O', texto: 'Um homem prevenido vale por dois' },
    ],
  },
  {
    id: 7,
    pergunta: 'Minha preocupação é...',
    opcoes: [
      { tipo: 'I', texto: 'Gerar a ideia global' },
      { tipo: 'C', texto: 'Fazer com que as pessoas gostem' },
      { tipo: 'O', texto: 'Fazer com que funcione' },
      { tipo: 'A', texto: 'Fazer com que aconteça' },
    ],
  },
  {
    id: 8,
    pergunta: 'Eu prefiro...',
    opcoes: [
      { tipo: 'I', texto: 'Perguntas a respostas' },
      { tipo: 'O', texto: 'Ter todos os detalhes' },
      { tipo: 'A', texto: 'Vantagens a meu favor' },
      { tipo: 'C', texto: 'Que todos tenham a chance de serem ouvidos' },
    ],
  },
  {
    id: 9,
    pergunta: 'Eu gosto de...',
    opcoes: [
      { tipo: 'A', texto: 'Fazer progresso' },
      { tipo: 'I', texto: 'Construir memórias' },
      { tipo: 'O', texto: 'Fazer sentido' },
      { tipo: 'C', texto: 'Tornar as pessoas confortáveis' },
    ],
  },
  {
    id: 10,
    pergunta: 'Eu gosto de chegar...',
    opcoes: [
      { tipo: 'A', texto: 'Na frente' },
      { tipo: 'C', texto: 'Junto' },
      { tipo: 'O', texto: 'Na hora' },
      { tipo: 'I', texto: 'Em outro lugar' },
    ],
  },
  {
    id: 11,
    pergunta: 'Um ótimo dia para mim é quando...',
    opcoes: [
      { tipo: 'A', texto: 'Consigo fazer muitas coisas' },
      { tipo: 'C', texto: 'Me divirto com meus amigos' },
      { tipo: 'O', texto: 'Tudo segue conforme planejado' },
      { tipo: 'I', texto: 'Desfruto de coisas novas e estimulantes' },
    ],
  },
  {
    id: 12,
    pergunta: 'Eu vejo a morte como...',
    opcoes: [
      { tipo: 'I', texto: 'Uma grande aventura misteriosa' },
      { tipo: 'C', texto: 'Oportunidade para rever os falecidos' },
      { tipo: 'O', texto: 'Um modo de receber recompensas' },
      { tipo: 'A', texto: 'Algo que sempre chega muito cedo' },
    ],
  },
  {
    id: 13,
    pergunta: 'Minha filosofia de vida é...',
    opcoes: [
      { tipo: 'A', texto: 'Há ganhadores e perdedores, e eu acredito ser um ganhador' },
      { tipo: 'C', texto: 'Para eu ganhar, ninguém precisa perder' },
      { tipo: 'O', texto: 'Para ganhar, é preciso seguir as regras' },
      { tipo: 'I', texto: 'Para ganhar, é necessário inventar novas regras' },
    ],
  },
  {
    id: 14,
    pergunta: 'Eu sempre gostei de...',
    opcoes: [
      { tipo: 'I', texto: 'Explorar' },
      { tipo: 'O', texto: 'Evitar surpresas' },
      { tipo: 'A', texto: 'Focalizar a meta' },
      { tipo: 'C', texto: 'Realizar uma abordagem natural' },
    ],
  },
  {
    id: 15,
    pergunta: 'Eu gosto de mudanças se...',
    opcoes: [
      { tipo: 'A', texto: 'Me der uma vantagem competitiva' },
      { tipo: 'C', texto: 'For divertido e puder ser compartilhado' },
      { tipo: 'I', texto: 'Me der mais liberdade e variedade' },
      { tipo: 'O', texto: 'Melhorar ou me der mais controle' },
    ],
  },
  {
    id: 16,
    pergunta: 'Não existe nada de errado em...',
    opcoes: [
      { tipo: 'A', texto: 'Se colocar na frente' },
      { tipo: 'C', texto: 'Colocar os outros na frente' },
      { tipo: 'I', texto: 'Mudar de ideia' },
      { tipo: 'O', texto: 'Ser consistente' },
    ],
  },
  {
    id: 17,
    pergunta: 'Eu gosto de buscar conselhos de...',
    opcoes: [
      { tipo: 'A', texto: 'Pessoas bem-sucedidas' },
      { tipo: 'C', texto: 'Anciões e conselheiros' },
      { tipo: 'O', texto: 'Autoridades no assunto' },
      { tipo: 'I', texto: 'Lugares, os mais estranhos' },
    ],
  },
  {
    id: 18,
    pergunta: 'Meu lema é...',
    opcoes: [
      { tipo: 'I', texto: 'Fazer o que precisa ser feito' },
      { tipo: 'O', texto: 'Fazer bem feito' },
      { tipo: 'C', texto: 'Fazer junto com o grupo' },
      { tipo: 'A', texto: 'Simplesmente fazer' },
    ],
  },
  {
    id: 19,
    pergunta: 'Eu gosto de...',
    opcoes: [
      { tipo: 'I', texto: 'Complexidade, mesmo se confuso' },
      { tipo: 'O', texto: 'Ordem e sistematização' },
      { tipo: 'C', texto: 'Calor humano e animação' },
      { tipo: 'A', texto: 'Coisas claras e simples' },
    ],
  },
  {
    id: 20,
    pergunta: 'Tempo para mim é...',
    opcoes: [
      { tipo: 'A', texto: 'Algo que detesto desperdiçar' },
      { tipo: 'C', texto: 'Um grande ciclo' },
      { tipo: 'O', texto: 'Uma flecha que leva ao inevitável' },
      { tipo: 'I', texto: 'Irrelevante' },
    ],
  },
  {
    id: 21,
    pergunta: 'Se eu fosse bilionário...',
    opcoes: [
      { tipo: 'C', texto: 'Faria doações para muitas entidades' },
      { tipo: 'O', texto: 'Criaria uma poupança avantajada' },
      { tipo: 'I', texto: 'Faria o que desse na cabeça' },
      { tipo: 'A', texto: 'Me exibiria bastante para algumas pessoas' },
    ],
  },
  {
    id: 22,
    pergunta: 'Eu acredito que...',
    opcoes: [
      { tipo: 'A', texto: 'O destino é mais importante que a jornada' },
      { tipo: 'C', texto: 'A jornada é mais importante que o destino' },
      { tipo: 'O', texto: 'Um centavo economizado é um centavo ganho' },
      { tipo: 'I', texto: 'Bastam um navio e uma estrela para navegar' },
    ],
  },
  {
    id: 23,
    pergunta: 'Eu acredito também que...',
    opcoes: [
      { tipo: 'A', texto: 'Aquele que hesita está perdido' },
      { tipo: 'O', texto: 'De grão em grão a galinha enche o papo' },
      { tipo: 'C', texto: 'O que vai, volta' },
      { tipo: 'I', texto: 'Um sorriso ou uma careta é o mesmo para quem é cego' },
    ],
  },
  {
    id: 24,
    pergunta: 'Eu acredito ainda que...',
    opcoes: [
      { tipo: 'O', texto: 'É melhor prudência do que arrependimento' },
      { tipo: 'I', texto: 'A autoridade deve ser desafiada' },
      { tipo: 'A', texto: 'Ganhar é fundamental' },
      { tipo: 'C', texto: 'O coletivo é mais importante do que o individual' },
    ],
  },
  {
    id: 25,
    pergunta: 'Eu penso que...',
    opcoes: [
      { tipo: 'I', texto: 'Não é fácil ficar encurralado' },
      { tipo: 'O', texto: 'É preferível olhar, antes de pular' },
      { tipo: 'C', texto: 'Duas cabeças pensam melhor do que uma' },
      { tipo: 'A', texto: 'Se você não tem condições de competir, não compita' },
    ],
  },
  // ── 25 Questões Adicionais para Embaralhamento e Reteste ──
  {
    id: 26,
    pergunta: 'Ao iniciar um projeto completamente novo, qual é o seu primeiro impulso?',
    opcoes: [
      { tipo: 'I', texto: 'Imaginar todas as possibilidades criativas e pensar em como fazer algo inovador.' },
      { tipo: 'C', texto: 'Conversar com as pessoas envolvidas para alinhar expectativas e engajar o time.' },
      { tipo: 'O', texto: 'Criar um cronograma detalhado com etapas claras, prazos e responsáveis.' },
      { tipo: 'A', texto: 'Partir logo para a execução das tarefas mais urgentes para ver progresso rápido.' },
    ],
  },
  {
    id: 27,
    pergunta: 'Quando você precisa tomar uma decisão importante sob pressão, você confia mais em:',
    opcoes: [
      { tipo: 'I', texto: 'Sua intuição e na visão do impacto que aquilo terá no longo prazo.' },
      { tipo: 'C', texto: 'No consenso do grupo e em como a escolha vai afetar o bem-estar das pessoas.' },
      { tipo: 'O', texto: 'Em dados históricos, normas estabelecidas e na análise cuidadosa dos riscos.' },
      { tipo: 'A', texto: 'No senso prático para resolver o problema imediatamente e atingir a meta.' },
    ],
  },
  {
    id: 28,
    pergunta: 'O que mais tira você do sério no dia a dia de trabalho?',
    opcoes: [
      { tipo: 'I', texto: 'Rotinas engessadas, excesso de burocracia e falta de liberdade para criar.' },
      { tipo: 'C', texto: 'Clima hostil, conflitos constantes e falta de cooperação entre os colegas.' },
      { tipo: 'O', texto: 'Desorganização, improviso de última hora e descumprimento de regras combinadas.' },
      { tipo: 'A', texto: 'Lentidão para agir, reuniões intermináveis e falta de foco em resultados.' },
    ],
  },
  {
    id: 29,
    pergunta: 'Em uma viagem em grupo que você está ajudando a organizar, qual papel você assume?',
    opcoes: [
      { tipo: 'I', texto: 'Sugiro roteiros inusitados, passeios diferentes e deixo espaço para surpresas.' },
      { tipo: 'C', texto: 'Me preocupo em garantir que todos estejam se divertindo e se sentindo incluídos.' },
      { tipo: 'O', texto: 'Faço a planilha de custos, reservo horários e confiro todos os documentos com antecedência.' },
      { tipo: 'A', texto: 'Decido rapidamente onde vamos comer ou qual caminho pegar para não perder tempo.' },
    ],
  },
  {
    id: 30,
    pergunta: 'Como você costuma lidar com um erro grave cometido por um colega de equipe?',
    opcoes: [
      { tipo: 'I', texto: 'Tento enxergar o que podemos aprender de novo com a situação para evoluir o processo.' },
      { tipo: 'C', texto: 'Acolho a pessoa para que ela não se sinta mal e ajudo a contornar o clima.' },
      { tipo: 'O', texto: 'Mapeio exatamente onde a falha ocorreu para criar um procedimento que evite repetição.' },
      { tipo: 'A', texto: 'Foco em corrigir o problema na hora para não atrasar a entrega final.' },
    ],
  },
  {
    id: 31,
    pergunta: 'Qual elogio profissional deixa você mais satisfeito?',
    opcoes: [
      { tipo: 'I', texto: '"Você teve uma ideia brilhante que ninguém mais tinha pensado!"' },
      { tipo: 'C', texto: '"Você é a pessoa que mantém nossa equipe unida e motivada!"' },
      { tipo: 'O', texto: '"Seu trabalho é impecável, extremamente organizado e confiável!"' },
      { tipo: 'A', texto: '"Você faz acontecer e entrega resultados acima da média em tempo recorde!"' },
    ],
  },
  {
    id: 32,
    pergunta: 'Diante de uma regra da empresa que parece ultrapassada, você tende a:',
    opcoes: [
      { tipo: 'I', texto: 'Questionar o modelo e propor uma alternativa totalmente fora da caixa.' },
      { tipo: 'C', texto: 'Verificar como os colegas se sentem sobre isso antes de tomar qualquer atitude.' },
      { tipo: 'O', texto: 'Seguir a norma vigente até que ela seja oficialmente alterada pela liderança.' },
      { tipo: 'A', texto: 'Ignorar o entrave se ele estiver atrapalhando a entrega do resultado imediato.' },
    ],
  },
  {
    id: 33,
    pergunta: 'Ao aprender uma habilidade ou ferramenta nova, você prefere:',
    opcoes: [
      { tipo: 'I', texto: 'Explorar livremente por conta própria, testando recursos por curiosidade.' },
      { tipo: 'C', texto: 'Aprender em grupo, trocando dicas e experiências com outras pessoas.' },
      { tipo: 'O', texto: 'Ler o manual, assistir a tutoriais passo a passo e dominar a teoria antes de aplicar.' },
      { tipo: 'A', texto: 'Aprender apenas o essencial na prática para começar a usar logo.' },
    ],
  },
  {
    id: 34,
    pergunta: 'Qual frase melhor resume a sua filosofia de produtividade?',
    opcoes: [
      { tipo: 'I', texto: '"O importante é ter visão de futuro e inovar sempre."' },
      { tipo: 'C', texto: '"Sozinhos vamos mais rápido, mas juntos vamos mais longe."' },
      { tipo: 'O', texto: '"A excelência está nos detalhes e no planejamento bem feito."' },
      { tipo: 'A', texto: '"Feito é melhor que perfeito; o que importa é o resultado."' },
    ],
  },
  {
    id: 35,
    pergunta: 'Quando você recebe uma tarefa sem instruções claras, qual é sua reação?',
    opcoes: [
      { tipo: 'I', texto: 'Gosto da liberdade para inventar meu próprio jeito de fazer.' },
      { tipo: 'C', texto: 'Pergunto aos colegas como costumam fazer para manter o alinhamento.' },
      { tipo: 'O', texto: 'Peço mais detalhes e critérios objetivos antes de começar para não errar.' },
      { tipo: 'A', texto: 'Assumo o controle, defino o que precisa ser feito e executo rapidamente.' },
    ],
  },
  {
    id: 36,
    pergunta: 'Durante uma reunião de brainstorming (tempestade de ideias), qual costuma ser a sua maior contribuição?',
    opcoes: [
      { tipo: 'I', texto: 'Trazer conceitos disruptivos e conectar ideias que parecem não ter relação.' },
      { tipo: 'C', texto: 'Incentivar os colegas mais tímidos a falarem e valorizar as ideias de todos.' },
      { tipo: 'O', texto: 'Anotar os pontos principais e verificar a viabilidade técnica de cada sugestão.' },
      { tipo: 'A', texto: 'Filtrar o que dá para executar já e definir quem vai fazer o quê.' },
    ],
  },
  {
    id: 37,
    pergunta: 'Quando você precisa convencer alguém a aceitar uma proposta sua, qual argumento você usa primeiro?',
    opcoes: [
      { tipo: 'I', texto: 'Mostro o potencial inovador e como aquela ideia vai transformar o futuro.' },
      { tipo: 'C', texto: 'Mostro como a proposta vai beneficiar o grupo e melhorar o clima entre todos.' },
      { tipo: 'O', texto: 'Apresento dados concretos, comparações lógicas e garantias de segurança.' },
      { tipo: 'A', texto: 'Mostro o retorno rápido, o ganho prático e a economia de tempo.' },
    ],
  },
  {
    id: 38,
    pergunta: 'Como você se comporta quando recebe uma crítica sobre o seu trabalho?',
    opcoes: [
      { tipo: 'I', texto: 'Analiso se faz sentido para minha visão criativa, mas não me prendo a detalhes técnicos.' },
      { tipo: 'C', texto: 'Fico chateado se a crítica soar ríspida, pois valorizo muito a aprovação e o bom relacionamento.' },
      { tipo: 'O', texto: 'Reviso todo o processo para entender onde falhei e garantir que o erro não se repita.' },
      { tipo: 'A', texto: 'Aceito se for objetiva e me ajudar a melhorar o desempenho imediato; caso contrário, sigo em frente.' },
    ],
  },
  {
    id: 39,
    pergunta: 'Em um ambiente de trabalho ideal para você, o que não pode faltar?',
    opcoes: [
      { tipo: 'I', texto: 'Autonomia, flexibilidade de horários e espaço para experimentar novidades.' },
      { tipo: 'C', texto: 'Espírito de equipe, amizade entre os colegas e reconhecimento humano.' },
      { tipo: 'O', texto: 'Regras claras, processos bem definidos e estabilidade.' },
      { tipo: 'A', texto: 'Desafios constantes, metas ousadas e recompensa por meritocracia.' },
    ],
  },
  {
    id: 40,
    pergunta: 'Diante de um imprevisto que muda todos os planos do dia, você:',
    opcoes: [
      { tipo: 'I', texto: 'Enxerga como uma oportunidade para improvisar e testar algo diferente.' },
      { tipo: 'C', texto: 'Consulta as pessoas afetadas para reorganizar tudo em conjunto, sem gerar estresse.' },
      { tipo: 'O', texto: 'Sente certo desconforto inicial, mas logo reorganiza a agenda de forma metódica.' },
      { tipo: 'A', texto: 'Toma decisões rápidas para contornar o obstáculo e não perder o ritmo.' },
    ],
  },
  {
    id: 41,
    pergunta: 'Quando você lê um contrato, manual ou regulamento extenso, sua tendência é:',
    opcoes: [
      { tipo: 'I', texto: 'Passar os olhos rapidamente apenas para pegar a ideia geral.' },
      { tipo: 'C', texto: 'Pedir a opinião de alguém de confiança ou discutir os pontos principais em grupo.' },
      { tipo: 'O', texto: 'Ler cada cláusula com atenção para não deixar passar nenhum detalhe importante.' },
      { tipo: 'A', texto: 'Ir direto ao resumo ou às condições práticas que impactam o fechamento.' },
    ],
  },
  {
    id: 42,
    pergunta: 'Qual dessas atividades de lazer mais combina com o seu estilo?',
    opcoes: [
      { tipo: 'I', texto: 'Conhecer lugares exóticos, visitar exposições de arte ou explorar novos hobbies.' },
      { tipo: 'C', texto: 'Reunir amigos e familiares para conversar, celebrar ou fazer atividades em grupo.' },
      { tipo: 'O', texto: 'Organizar coleções, resolver quebra-cabeças, ler ou planejar algo com calma.' },
      { tipo: 'A', texto: 'Praticar esportes competitivos, atividades radicais ou jogos de estratégia rápida.' },
    ],
  },
  {
    id: 43,
    pergunta: 'Ao delegar uma tarefa para outra pessoa, você geralmente:',
    opcoes: [
      { tipo: 'I', texto: 'Explica o objetivo final e deixa a pessoa totalmente livre para criar o caminho.' },
      { tipo: 'C', texto: 'Conversa com carinho, oferece apoio e acompanha para que ela se sinta segura.' },
      { tipo: 'O', texto: 'Entrega um roteiro detalhado explicando exatamente como a tarefa deve ser feita.' },
      { tipo: 'A', texto: 'Prefere fazer você mesmo se achar que a outra pessoa vai demorar demais.' },
    ],
  },
  {
    id: 44,
    pergunta: 'O que mais gera insegurança ou desconforto em você?',
    opcoes: [
      { tipo: 'I', texto: 'Sentir que está preso a uma rotina repetitiva e sem perspectiva de evolução.' },
      { tipo: 'C', texto: 'Sentir que está sendo rejeitado, excluído ou em conflito com pessoas próximas.' },
      { tipo: 'O', texto: 'Ter que agir sem planejamento, sem dados suficientes ou sob risco de cometer erros.' },
      { tipo: 'A', texto: 'Perder o controle da situação ou sentir que está estagnado sem resultados.' },
    ],
  },
  {
    id: 45,
    pergunta: 'Em uma negociação difícil, qual é a sua postura predominante?',
    opcoes: [
      { tipo: 'I', texto: 'Busco soluções criativas do tipo "ganha-ganha" que ninguém havia cogitado.' },
      { tipo: 'C', texto: 'Cedo em alguns pontos para preservar o bom relacionamento com a outra parte.' },
      { tipo: 'O', texto: 'Baseio-me estritamente nos fatos, números e limites previamente estipulados.' },
      { tipo: 'A', texto: 'Sou firme, direto ao ponto e pressiono para fechar o acordo o quanto antes.' },
    ],
  },
  {
    id: 46,
    pergunta: 'Como você organiza sua mesa de trabalho ou seus arquivos digitais?',
    opcoes: [
      { tipo: 'I', texto: 'De um jeito próprio que só eu entendo, cheio de referências visuais e anotações soltas.' },
      { tipo: 'C', texto: 'Com fotos, lembranças de pessoas queridas e itens que tornam o espaço acolhedor.' },
      { tipo: 'O', texto: 'Tudo separado em pastas, categorias, etiquetas e ordem cronológica ou alfabética.' },
      { tipo: 'A', texto: 'Apenas o essencial à mão para acessar rápido e eliminar qualquer distração.' },
    ],
  },
  {
    id: 47,
    pergunta: 'Quando um conflito explode dentro da sua equipe, sua reação imediata é:',
    opcoes: [
      { tipo: 'I', texto: 'Propor uma mudança de abordagem para tirar o foco do problema atual.' },
      { tipo: 'C', texto: 'Tentar apaziguar os ânimos e fazer com que todos se entendam e façam as pazes.' },
      { tipo: 'O', texto: 'Investigar as causas reais do problema com imparcialidade para aplicar a regra correta.' },
      { tipo: 'A', texto: 'Cortar a discussão pela raiz e exigir foco na solução para não atrasar o trabalho.' },
    ],
  },
  {
    id: 48,
    pergunta: 'Qual característica pessoal as pessoas mais costumam admirar em você?',
    opcoes: [
      { tipo: 'I', texto: 'Criatividade, entusiasmo e visão à frente do seu tempo.' },
      { tipo: 'C', texto: 'Empatia, simpatia e capacidade de ouvir e acolher os outros.' },
      { tipo: 'O', texto: 'Confiabilidade, disciplina e senso de responsabilidade.' },
      { tipo: 'A', texto: 'Coragem, determinação e capacidade de resolver problemas difíceis.' },
    ],
  },
  {
    id: 49,
    pergunta: 'Ao definir metas pessoais para o próximo ano, você prefere:',
    opcoes: [
      { tipo: 'I', texto: 'Sonhar grande e listar experiências transformadoras que gostaria de viver.' },
      { tipo: 'C', texto: 'Incluir objetivos que envolvam estar mais perto da família, amigos e ajudar pessoas.' },
      { tipo: 'O', texto: 'Estabelecer metas realistas, mensuráveis e divididas em planos de ação mensais.' },
      { tipo: 'A', texto: 'Definir desafios ambiciosos de curto prazo para conquistar o máximo possível.' },
    ],
  },
  {
    id: 50,
    pergunta: 'Se você fosse liderar uma empresa hoje, qual seria sua principal prioridade?',
    opcoes: [
      { tipo: 'I', texto: 'Inovação constante para tornar a empresa referência no futuro.' },
      { tipo: 'C', texto: 'Cultura organizacional forte, clima saudável e colaboradores felizes.' },
      { tipo: 'O', texto: 'Processos eficientes, qualidade máxima e estabilidade financeira.' },
      { tipo: 'A', texto: 'Crescimento acelerado, liderança de mercado e superação de metas.' },
    ],
  },
];

// Embaralhamento Fisher-Yates (uniforme e sem viés)
function embaralharArray(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Sorteia 25 questões priorizando perguntas inéditas em caso de reteste e embaralha as 4 alternativas
function sortearQuestoesSessao(idsAnteriores = []) {
  const usados = new Set(idsAnteriores || []);
  const ineditas = embaralharArray(BANCO_QUESTOES.filter((q) => !usados.has(q.id)));
  const repetidas = embaralharArray(BANCO_QUESTOES.filter((q) => usados.has(q.id)));
  const selecionadas = [...ineditas, ...repetidas].slice(0, QUESTOES_POR_TESTE);

  return selecionadas.map((q, idx) => ({
    ...q,
    numero: idx + 1,
    opcoes: embaralharArray(q.opcoes),
  }));
}

function obterHistoricoQuestoes(pessoaId) {
  try {
    const raw = localStorage.getItem(`mib_perfil_questoes_${pessoaId || 'anon'}`);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function salvarHistoricoQuestoes(pessoaId, ids) {
  try {
    localStorage.setItem(`mib_perfil_questoes_${pessoaId || 'anon'}`, JSON.stringify(ids));
  } catch {
    // ignora falha de storage
  }
}

// ── Detalhamento Completo dos 4 Perfis Comportamentais (PDF págs. 13–19) ──
export const PERFIS_INFO = {
  I: {
    chave: 'aguia',
    nome: 'Águia',
    emoji: '🦅',
    eixo: 'Idealização',
    lema: 'FAZER DIFERENTE',
    cor: '#10b981',
    corGrad: 'from-emerald-600 via-teal-600 to-green-600',
    corBadge: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    resumo: 'Visionário, criativo e intuitivo. Gosta de voar alto, enxergar o todo e antecipar o futuro, promovendo inovação e mudanças por caminhos alternativos.',
    descricaoCompleta:
      'Na metáfora dos perfis comportamentais, a águia gosta de voar alto e tem a inovação como marca determinante. Pessoas desse perfil enxergam bem adiante, pensam no futuro e possuem forte sensibilidade criativa e intuitiva. São inquietas diante da rotina e frequentemente atuam como promotoras de mudança. Por terem visão macro, precisam cuidar para não perder o foco no presente, nos detalhes e na conclusão dos projetos iniciados.',
    comportamentos: ['Criativo', 'Intuitivo', 'Foco no futuro', 'Distraído', 'Curioso', 'Informal / casual', 'Flexível'],
    pontosFortes: ['Provoca mudanças radicais', 'Antecipa o futuro', 'Criatividade'],
    pontosMelhoria: ['Falta de atenção para o aqui e agora', 'Impaciência e rebeldia', 'Defender o novo pelo novo'],
    motivacoes: [
      'Liberdade de expressão',
      'Ausência de controles rígidos',
      'Ambiente de trabalho descentralizado',
      'Liberdade para fazer exceções',
      'Oportunidade para delegar tarefas e detalhes',
    ],
    valores: 'Criatividade e liberdade (inspira ideias).',
  },
  C: {
    chave: 'gato',
    nome: 'Gato',
    emoji: '🐈',
    eixo: 'Comunicação',
    lema: 'FAZER JUNTO',
    cor: '#f59e0b',
    corGrad: 'from-amber-500 via-orange-500 to-amber-600',
    corBadge: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    resumo: 'Comunicador, sensível e voltado para relacionamentos. Valoriza o trabalho em equipe, a harmonia, a aceitação social e o bem-estar coletivo.',
    descricaoCompleta:
      'Pessoas com o perfil do gato gostam de atuar em conjunto e possuem excelente habilidade de relacionamento interpessoal e comunicação. São harmônicas por natureza, vestem a camisa da equipe e constroem pontes com facilidade. Seu foco são as pessoas, buscando felicidade e igualdade compartilhadas. Como ponto de atenção, tendem a evitar conflitos necessários e buscam constantemente reconhecimento e aceitação social.',
    comportamentos: ['Sensível', 'Relacionamentos', 'Time', 'Tradicionalista', 'Contribuição', 'Busca harmonia', 'Delega autoridade'],
    pontosFortes: ['Manter comunicação harmoniosa', 'Desenvolver e manter a cultura da equipe', 'Comunicação aberta'],
    pontosMelhoria: ['Esconder conflitos', 'Felicidade acima dos resultados', 'Manipulação através dos sentimentos'],
    motivacoes: [
      'Segurança',
      'Aceitação social',
      'Construir o consenso',
      'Reconhecimento da equipe',
      'Supervisão compreensiva',
      'Ambiente harmônico',
      'Trabalho em grupo',
    ],
    valores: 'Felicidade e igualdade (cultura da equipe, pensa nos outros).',
  },
  O: {
    chave: 'lobo',
    nome: 'Lobo',
    emoji: '🐺',
    eixo: 'Organização',
    lema: 'FAZER CERTO',
    cor: '#3b82f6',
    corGrad: 'from-blue-600 via-indigo-600 to-blue-700',
    corBadge: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
    resumo: 'Estrategista, detalhista, metódico e leal. Valoriza organização, planejamento, consistência, qualidade e segurança nos processos.',
    descricaoCompleta:
      'Os lobos são estrategistas natos, agem com ponderação e acreditam que fazer direito significa fazer melhor. Equilibrados, corretos, pontuais e constantes, despertam alta confiança e lealdade na equipe. Sistemas, processos, controles e organização são seu ponto forte. Seu principal ponto de melhoria é a dificuldade de se adaptar rapidamente a mudanças inesperadas ou ambientes pouco estruturados.',
    comportamentos: ['Detalhista', 'Organizado', 'Estrategista', 'Busca do conhecimento', 'Pontual', 'Conservador', 'Previsível'],
    pontosFortes: ['Passado, presente e futuro', 'Consistência, conformidade e qualidade', 'Lealdade e segurança', 'Regras e responsabilidades'],
    pontosMelhoria: ['Dificuldades de se adaptar às mudanças', 'Pode impedir o progresso', 'Detalhista, estruturado e demasiado sistematizado'],
    motivacoes: [
      'Certeza e compreensão exata de quais são as regras',
      'Conhecimento específico do trabalho',
      'Ausência de riscos e erros',
      'Ver o produto acabado — começo, meio e fim',
    ],
    valores: 'Ordem e controle.',
  },
  A: {
    chave: 'tubarao',
    nome: 'Tubarão',
    emoji: '🦈',
    eixo: 'Ação',
    lema: 'FAZER RÁPIDO',
    cor: '#ef4444',
    corGrad: 'from-rose-600 via-red-600 to-rose-700',
    corBadge: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
    resumo: 'Executor, prático, determinado e movido por resultados. Possui forte senso de urgência, iniciativa e coragem para vencer desafios.',
    descricaoCompleta:
      'Pessoas com perfil tubarão são excelentes executoras e transformam decisões em realidade prática com rapidez e dinamismo. Têm senso de urgência, foco em metas e pouca paciência para burocracia excessiva. São autossuficientes e adoram desafios competitivos. Como ponto de melhoria, precisam cultivar mais paciência, escuta nos relacionamentos e disposição para delegar tarefas.',
    comportamentos: ['Senso de urgência', 'Ação e iniciativa', 'Impulsivo e prático', 'Vencer desafios', 'Aqui e agora', 'Autossuficiente', 'Não gosta de delegar poder'],
    pontosFortes: ['Fazer acontecer', 'Parar com a burocracia', 'Motivação'],
    pontosMelhoria: ['Relacionamento interpessoal / socialmente', 'Faz do modo mais fácil', 'Relacionamento complicado'],
    motivacoes: [
      'Liberdade para agir individualmente',
      'Controle das próprias atividades',
      'Resolver os problemas do seu jeito',
      'Competição individual',
      'Variedade de atividades',
      'Não ter que repetir tarefas',
    ],
    valores: 'Resultados.',
  },
};

function calcularResultadoPorRespostas(respostas) {
  const contagem = { I: 0, C: 0, O: 0, A: 0 };
  Object.values(respostas).forEach((tipo) => {
    if (contagem[tipo] !== undefined) contagem[tipo] += 1;
  });

  const aguia = contagem.I * 4;
  const gato = contagem.C * 4;
  const lobo = contagem.O * 4;
  const tubarao = contagem.A * 4;

  // Dominância Cerebral (PDF pág. 11)
  const pensante = lobo + aguia; // ANTERIOR (O + I)
  const atuante = gato + tubarao; // POSTERIOR (C + A)
  const razao = tubarao + lobo; // ESQUERDO (A + O)
  const emocao = aguia + gato; // DIREITO (I + C)

  const ranking = [
    { codigo: 'I', ...PERFIS_INFO.I, pontos: contagem.I, percentual: aguia },
    { codigo: 'C', ...PERFIS_INFO.C, pontos: contagem.C, percentual: gato },
    { codigo: 'O', ...PERFIS_INFO.O, pontos: contagem.O, percentual: lobo },
    { codigo: 'A', ...PERFIS_INFO.A, pontos: contagem.A, percentual: tubarao },
  ].sort((a, b) => b.percentual - a.percentual);

  return {
    aguia,
    gato,
    lobo,
    tubarao,
    pensante,
    atuante,
    razao,
    emocao,
    ranking,
    dominante: ranking[0],
    secundario: ranking[1],
  };
}

function montarResultadoSalvo(pessoa) {
  if (!pessoa) return null;
  const aguia = Number(pessoa.perfil_aguia) || 0;
  const gato = Number(pessoa.perfil_gato) || 0;
  const lobo = Number(pessoa.perfil_lobo) || 0;
  const tubarao = Number(pessoa.perfil_tubarao) || 0;
  if (aguia + gato + lobo + tubarao === 0) return null;

  const pensante = pessoa.perfil_pensante !== null && pessoa.perfil_pensante !== undefined && pessoa.perfil_pensante !== ''
    ? Number(pessoa.perfil_pensante)
    : lobo + aguia;
  const atuante = pessoa.perfil_atuante !== null && pessoa.perfil_atuante !== undefined && pessoa.perfil_atuante !== ''
    ? Number(pessoa.perfil_atuante)
    : gato + tubarao;
  const razao = pessoa.perfil_razao !== null && pessoa.perfil_razao !== undefined && pessoa.perfil_razao !== ''
    ? Number(pessoa.perfil_razao)
    : tubarao + lobo;
  const emocao = pessoa.perfil_emocao !== null && pessoa.perfil_emocao !== undefined && pessoa.perfil_emocao !== ''
    ? Number(pessoa.perfil_emocao)
    : aguia + gato;

  const ranking = [
    { codigo: 'I', ...PERFIS_INFO.I, pontos: Math.round(aguia / 4), percentual: aguia },
    { codigo: 'C', ...PERFIS_INFO.C, pontos: Math.round(gato / 4), percentual: gato },
    { codigo: 'O', ...PERFIS_INFO.O, pontos: Math.round(lobo / 4), percentual: lobo },
    { codigo: 'A', ...PERFIS_INFO.A, pontos: Math.round(tubarao / 4), percentual: tubarao },
  ].sort((a, b) => b.percentual - a.percentual);

  return {
    aguia,
    gato,
    lobo,
    tubarao,
    pensante,
    atuante,
    razao,
    emocao,
    ranking,
    dominante: ranking[0],
    secundario: ranking[1],
    origemSalva: true,
  };
}

export default function TestePerfilComportamental({
  membroLogado = null,
  pessoas = [],
  onDadosAtualizados = null,
  onVoltar = null,
}) {
  const permissaoNorm = String(membroLogado?.permissao || '')
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const podeEscolherOutroMembro = ['admin', 'pastor', 'secretaria', 'secretario', 'lider-celula', 'lider', 'supervisor'].includes(permissaoNorm);

  const [etapa, setEtapa] = useState('intro'); // 'intro' | 'teste' | 'resultado'
  const [questoesSessao, setQuestoesSessao] = useState(() => sortearQuestoesSessao([]));
  const [questaoIdx, setQuestaoIdx] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [pessoaAlvoId, setPessoaAlvoId] = useState(() => membroLogado?.id || '');
  const [buscaMembro, setBuscaMembro] = useState('');
  const [resultadoAtual, setResultadoAtual] = useState(null);
  const [abaPerfilDetalhe, setAbaPerfilDetalhe] = useState('I');
  const [salvando, setSalvando] = useState(false);
  const [statusSalvamento, setStatusSalvamento] = useState(null); // { tipo: 'sucesso' | 'erro', msg }
  const [historicoTestes, setHistoricoTestes] = useState([]);

  useEffect(() => {
    if (!pessoaAlvoId && membroLogado?.id) {
      setPessoaAlvoId(membroLogado.id);
    }
  }, [membroLogado?.id, pessoaAlvoId]);

  // Carrega histórico de avaliações do membro (para evolução e reteste cross-device)
  useEffect(() => {
    let ativo = true;
    const alvoId = pessoaAlvoId || membroLogado?.id;
    if (!alvoId) {
      setHistoricoTestes([]);
      return undefined;
    }
    supabase
      .from('historico_perfil_comportamental')
      .select('*')
      .eq('pessoa_id', alvoId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!ativo) return;
        if (!error && Array.isArray(data)) {
          setHistoricoTestes(data);
        } else {
          setHistoricoTestes([]);
        }
      })
      .catch(() => {
        if (ativo) setHistoricoTestes([]);
      });
    return () => { ativo = false; };
  }, [pessoaAlvoId, membroLogado?.id]);

  const pessoasAtivas = useMemo(
    () => (pessoas || []).filter((p) => p.status !== 'inativo' && p.status !== 'contribuinte'),
    [pessoas]
  );

  const pessoasFiltradasBusca = useMemo(() => {
    const q = buscaMembro.trim().toLowerCase();
    if (!q) return pessoasAtivas.slice(0, 8);
    return pessoasAtivas.filter((p) => (p.nome || '').toLowerCase().includes(q)).slice(0, 12);
  }, [pessoasAtivas, buscaMembro]);

  const pessoaAlvo = useMemo(() => {
    if (!pessoaAlvoId) return membroLogado || null;
    return (
      pessoasAtivas.find((p) => String(p.id) === String(pessoaAlvoId)) ||
      (String(membroLogado?.id) === String(pessoaAlvoId) ? membroLogado : null)
    );
  }, [pessoaAlvoId, pessoasAtivas, membroLogado]);

  const resultadoJaSalvo = useMemo(() => montarResultadoSalvo(pessoaAlvo), [pessoaAlvo]);

  const totalRespondidas = Object.keys(respostas).length;
  const totalQuestoesSessao = questoesSessao.length || QUESTOES_POR_TESTE;
  const progressoPct = Math.round((totalRespondidas / totalQuestoesSessao) * 100);
  const questaoAtual = questoesSessao[questaoIdx];

  const salvarNoPerfilDoMembro = async (res, targetId = pessoaAlvo?.id, questoesIdsUsadas = []) => {
    if (!targetId || !res) {
      setStatusSalvamento({
        tipo: 'erro',
        msg: 'Selecione um membro para gravar o resultado na ficha.',
      });
      return;
    }

    setSalvando(true);
    setStatusSalvamento(null);
    try {
      const hemisferio = res.emocao >= res.razao ? `Emocional (${res.emocao}%)` : `Racional (${res.razao}%)`;
      const eixoAcao = res.pensante >= res.atuante ? `Pensante (${res.pensante}%)` : `Atuante (${res.atuante}%)`;
      const resumoPerfil = `${res.dominante.nome} (${res.dominante.percentual}%) / ${res.secundario.nome} (${res.secundario.percentual}%)`;
      const resumoCerebral = `Dominância: ${hemisferio} e ${eixoAcao} | Pensante: ${res.pensante}% • Atuante: ${res.atuante}% • Razão: ${res.razao}% • Emoção: ${res.emocao}%`;

      const payload = {
        perfil_aguia: res.aguia,
        perfil_gato: res.gato,
        perfil_lobo: res.lobo,
        perfil_tubarao: res.tubarao,
        perfil_pensante: res.pensante,
        perfil_razao: res.razao,
        perfil_emocao: res.emocao,
        perfil_atuante: res.atuante,
        perfil_comportamental: resumoPerfil,
        atividade_cerebral: resumoCerebral,
      };

      const { error } = await supabase
        .from('pessoas')
        .update(payload)
        .eq('id', targetId);

      if (error) throw error;

      // Grava também no histórico de avaliações (não bloqueia caso a tabela ainda não exista)
      try {
        const { data: histNovo, error: histErr } = await supabase
          .from('historico_perfil_comportamental')
          .insert([{
            pessoa_id: targetId,
            perfil_aguia: res.aguia,
            perfil_gato: res.gato,
            perfil_lobo: res.lobo,
            perfil_tubarao: res.tubarao,
            perfil_pensante: res.pensante,
            perfil_razao: res.razao,
            perfil_emocao: res.emocao,
            perfil_atuante: res.atuante,
            dominante: res.dominante.nome,
            secundario: res.secundario.nome,
            questoes_ids: Array.isArray(questoesIdsUsadas) ? questoesIdsUsadas : [],
            aplicado_por: membroLogado?.id || null,
          }])
          .select('*')
          .single();

        if (!histErr && histNovo) {
          setHistoricoTestes((prev) => [histNovo, ...prev]);
        } else if (histErr) {
          console.warn('Histórico comportamental não gravado:', histErr.message);
        }
      } catch (histEx) {
        console.warn('Falha ao registrar histórico comportamental:', histEx);
      }

      setStatusSalvamento({
        tipo: 'sucesso',
        msg: `Resultado salvo na ficha e no histórico de ${pessoaAlvo?.nome || 'membro'} (Informações Adicionais → Perfil Comportamental).`,
      });
      if (onDadosAtualizados) {
        onDadosAtualizados();
      }
    } catch (err) {
      console.error('Erro ao salvar perfil comportamental:', err);
      setStatusSalvamento({
        tipo: 'erro',
        msg: `Não foi possível salvar automaticamente: ${err.message || 'erro de permissão no banco.'}`,
      });
    } finally {
      setSalvando(false);
    }
  };

  const iniciarTeste = () => {
    const alvoId = pessoaAlvo?.id || 'anon';
    const historicoBanco = Array.isArray(historicoTestes[0]?.questoes_ids) ? historicoTestes[0].questoes_ids : [];
    const historicoLocal = obterHistoricoQuestoes(alvoId);
    const historicoAnterior = historicoBanco.length > 0 ? historicoBanco : historicoLocal;

    // Se estiver refazendo imediatamente a partir de uma sessão já sorteada, evita repetir as mesmas questões
    const idsEvitar = (etapa === 'resultado' || totalRespondidas > 0) && questoesSessao.length > 0
      ? questoesSessao.map((q) => q.id)
      : historicoAnterior;

    const novasQuestoes = sortearQuestoesSessao(idsEvitar);
    setQuestoesSessao(novasQuestoes);
    setRespostas({});
    setQuestaoIdx(0);
    setResultadoAtual(null);
    setStatusSalvamento(null);
    setEtapa('teste');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selecionarOpcao = (questaoId, tipo) => {
    const novasRespostas = { ...respostas, [questaoId]: tipo };
    setRespostas(novasRespostas);

    // Avança automaticamente se ainda houver próxima questão
    if (questaoIdx < totalQuestoesSessao - 1) {
      setTimeout(() => {
        setQuestaoIdx((prev) => Math.min(prev + 1, totalQuestoesSessao - 1));
      }, 180);
    }
  };

  const finalizarTeste = async () => {
    if (totalRespondidas < totalQuestoesSessao) {
      const primeiraSemResposta = questoesSessao.findIndex((q) => !respostas[q.id]);
      if (primeiraSemResposta !== -1) setQuestaoIdx(primeiraSemResposta);
      return;
    }
    const idsUsados = questoesSessao.map((q) => q.id);
    salvarHistoricoQuestoes(pessoaAlvo?.id || 'anon', idsUsados);
    const res = calcularResultadoPorRespostas(respostas);
    setResultadoAtual(res);
    setAbaPerfilDetalhe(res.dominante.codigo);
    setEtapa('resultado');
    if (pessoaAlvo?.id) {
      await salvarNoPerfilDoMembro(res, pessoaAlvo.id, idsUsados);
    }
  };

  const abrirResultadoSalvo = () => {
    if (!resultadoJaSalvo) return;
    setResultadoAtual(resultadoJaSalvo);
    setAbaPerfilDetalhe(resultadoJaSalvo.dominante.codigo);
    setStatusSalvamento({
      tipo: 'sucesso',
      msg: `Exibindo resultado salvo na ficha de ${pessoaAlvo?.nome || 'membro'}.`,
    });
    setEtapa('resultado');
  };

  const abrirHistoricoItem = (registro) => {
    const res = montarResultadoSalvo(registro);
    if (!res) return;
    const dataFmt = registro.created_at
      ? new Date(registro.created_at).toLocaleDateString('pt-BR')
      : '';
    setResultadoAtual({ ...res, dataAvaliacao: registro.created_at });
    setAbaPerfilDetalhe(res.dominante.codigo);
    setStatusSalvamento({
      tipo: 'sucesso',
      msg: `Exibindo avaliação histórica de ${pessoaAlvo?.nome || 'membro'}${dataFmt ? ` realizada em ${dataFmt}` : ''}.`,
    });
    setEtapa('resultado');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const dadosGraficoBarras = useMemo(() => {
    if (!resultadoAtual) return [];
    return [
      { nome: '🦅 Águia', valor: resultadoAtual.aguia, cor: PERFIS_INFO.I.cor },
      { nome: '🐈 Gato', valor: resultadoAtual.gato, cor: PERFIS_INFO.C.cor },
      { nome: '🐺 Lobo', valor: resultadoAtual.lobo, cor: PERFIS_INFO.O.cor },
      { nome: '🦈 Tubarão', valor: resultadoAtual.tubarao, cor: PERFIS_INFO.A.cor },
    ];
  }, [resultadoAtual]);

  const dadosRadar = useMemo(() => {
    if (!resultadoAtual) return [];
    return [
      { perfil: 'Águia (I)', valor: resultadoAtual.aguia, fullMark: 100 },
      { perfil: 'Gato (C)', valor: resultadoAtual.gato, fullMark: 100 },
      { perfil: 'Tubarão (A)', valor: resultadoAtual.tubarao, fullMark: 100 },
      { perfil: 'Lobo (O)', valor: resultadoAtual.lobo, fullMark: 100 },
    ];
  }, [resultadoAtual]);

  const detalhePerfilSelecionado = PERFIS_INFO[abaPerfilDetalhe] || PERFIS_INFO.I;

  const handleImprimirPdf = () => {
    if (!resultadoAtual) return;

    const esc = (str) =>
      String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    const nomeMembro = pessoaAlvo?.nome || 'Avaliado';
    const dataEmissao = resultadoAtual.dataAvaliacao
      ? new Date(resultadoAtual.dataAvaliacao).toLocaleDateString('pt-BR')
      : new Date().toLocaleDateString('pt-BR');

    // SVG Radar (4 eixos: Topo=Águia, Direita=Gato, Base=Tubarão, Esquerda=Lobo)
    const cx = 135;
    const cy = 98;
    const rMax = 68;
    const maxEscala = Math.max(50, Math.ceil(Math.max(resultadoAtual.aguia, resultadoAtual.gato, resultadoAtual.lobo, resultadoAtual.tubarao, 25) / 25) * 25);
    const pt = (val, dir) => {
      const r = (Math.min(maxEscala, Number(val) || 0) / maxEscala) * rMax;
      if (dir === 'top') return `${cx},${(cy - r).toFixed(1)}`;
      if (dir === 'right') return `${(cx + r).toFixed(1)},${cy}`;
      if (dir === 'bottom') return `${cx},${(cy + r).toFixed(1)}`;
      return `${(cx - r).toFixed(1)},${cy}`;
    };
    const gridPolys = [0.25, 0.5, 0.75, 1]
      .map((f) => {
        const r = rMax * f;
        return `<polygon points="${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}" fill="none" stroke="#cbd5e1" stroke-width="1" />`;
      })
      .join('');
    const dataPoly = `${pt(resultadoAtual.aguia, 'top')} ${pt(resultadoAtual.gato, 'right')} ${pt(resultadoAtual.tubarao, 'bottom')} ${pt(resultadoAtual.lobo, 'left')}`;

    const svgRadar = `
      <svg viewBox="0 0 270 196" width="100%" height="182" xmlns="http://www.w3.org/2000/svg">
        ${gridPolys}
        <line x1="${cx}" y1="${cy - rMax}" x2="${cx}" y2="${cy + rMax}" stroke="#cbd5e1" stroke-width="1" />
        <line x1="${cx - rMax}" y1="${cy}" x2="${cx + rMax}" y2="${cy}" stroke="#cbd5e1" stroke-width="1" />
        <polygon points="${dataPoly}" fill="#3b82f6" fill-opacity="0.28" stroke="#2563eb" stroke-width="2.2" />
        <circle cx="${pt(resultadoAtual.aguia, 'top').split(',')[0]}" cy="${pt(resultadoAtual.aguia, 'top').split(',')[1]}" r="3.5" fill="#10b981" />
        <circle cx="${pt(resultadoAtual.gato, 'right').split(',')[0]}" cy="${pt(resultadoAtual.gato, 'right').split(',')[1]}" r="3.5" fill="#f59e0b" />
        <circle cx="${pt(resultadoAtual.tubarao, 'bottom').split(',')[0]}" cy="${pt(resultadoAtual.tubarao, 'bottom').split(',')[1]}" r="3.5" fill="#ef4444" />
        <circle cx="${pt(resultadoAtual.lobo, 'left').split(',')[0]}" cy="${pt(resultadoAtual.lobo, 'left').split(',')[1]}" r="3.5" fill="#3b82f6" />
        <text x="${cx}" y="18" text-anchor="middle" font-size="10.5" font-weight="700" fill="#0f172a">Águia (${resultadoAtual.aguia}%)</text>
        <text x="${cx + rMax + 8}" y="${cy + 4}" text-anchor="start" font-size="10.5" font-weight="700" fill="#0f172a">Gato (${resultadoAtual.gato}%)</text>
        <text x="${cx}" y="${cy + rMax + 18}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#0f172a">Tubarão (${resultadoAtual.tubarao}%)</text>
        <text x="${cx - rMax - 8}" y="${cy + 4}" text-anchor="end" font-size="10.5" font-weight="700" fill="#0f172a">Lobo (${resultadoAtual.lobo}%)</text>
      </svg>
    `;

    // SVG Barras (todos os 4 arquétipos sempre visíveis com % no topo)
    const barrasData = [
      { nome: 'Águia', emoji: '🦅', val: resultadoAtual.aguia, cor: '#10b981' },
      { nome: 'Gato', emoji: '🐈', val: resultadoAtual.gato, cor: '#f59e0b' },
      { nome: 'Lobo', emoji: '🐺', val: resultadoAtual.lobo, cor: '#3b82f6' },
      { nome: 'Tubarão', emoji: '🦈', val: resultadoAtual.tubarao, cor: '#ef4444' },
    ];
    const svgBarras = `
      <svg viewBox="0 0 280 118" width="100%" height="110" xmlns="http://www.w3.org/2000/svg">
        <line x1="16" y1="88" x2="264" y2="88" stroke="#cbd5e1" stroke-width="1" />
        ${barrasData
          .map((b, i) => {
            const x = 28 + i * 62;
            const h = Math.max(4, Math.round((b.val / 100) * 68));
            const y = 88 - h;
            return `
              <text x="${x + 19}" y="${y - 5}" text-anchor="middle" font-size="10.5" font-weight="800" fill="${b.cor}">${b.val}%</text>
              <rect x="${x}" y="${y}" width="38" height="${h}" rx="6" fill="${b.cor}" />
              <text x="${x + 19}" y="105" text-anchor="middle" font-size="10" font-weight="700" fill="#334155">${b.nome}</text>
            `;
          })
          .join('')}
      </svg>
    `;

    const cardsRankingHtml = resultadoAtual.ranking
      .map(
        (item, idx) => `
        <div class="rank-card" style="border-top: 3px solid ${item.cor};">
          <div class="rank-top">
            <span class="rank-emoji">${item.emoji}</span>
            <span class="rank-pos">${idx + 1}º LUGAR</span>
          </div>
          <div class="rank-name">${esc(item.nome)}</div>
          <div class="rank-eixo">${esc(item.eixo)}</div>
          <div class="rank-val-row">
            <span class="rank-pct" style="color:${item.cor};">${item.percentual}%</span>
            <span class="rank-pts">${item.pontos} × 4</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${item.percentual}%; background:${item.cor};"></div>
          </div>
        </div>
      `
      )
      .join('');

    const listaHtml = (arr) =>
      arr.map((t) => `<li>${esc(t)}</li>`).join('');

    const hemisferioTxt =
      resultadoAtual.emocao >= resultadoAtual.razao
        ? 'Emocional (Hemisfério Direito)'
        : 'Racional (Hemisfério Esquerdo)';
    const eixoTxt =
      resultadoAtual.pensante >= resultadoAtual.atuante
        ? 'Pensante (Anterior)'
        : 'Atuante (Posterior)';

    const htmlDoc = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Perfil Comportamental - ${esc(nomeMembro)}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 13mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #0f172a;
      font-family: 'Segoe UI', Inter, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif;
      font-size: 12px;
      line-height: 1.45;
    }
    .page {
      width: 100%;
    }
    .page-break {
      page-break-before: always;
      break-before: page;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 8px;
      margin-bottom: 14px;
    }
    .header-kicker {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #475569;
    }
    .header-title {
      font-size: 16px;
      font-weight: 900;
      color: #0f172a;
      margin: 2px 0 0;
    }
    .header-right {
      text-align: right;
    }
    .header-name {
      font-size: 12.5px;
      font-weight: 800;
      color: #0f172a;
    }
    .header-date {
      font-size: 10px;
      color: #475569;
      margin-top: 2px;
    }
    .hero {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 16px;
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-left: 6px solid ${resultadoAtual.dominante.cor};
      border-radius: 12px;
      margin-bottom: 14px;
    }
    .hero-emoji {
      width: 54px;
      height: 54px;
      border-radius: 12px;
      background: #ffffff;
      border: 1.5px solid #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      flex-shrink: 0;
    }
    .hero-badge {
      display: inline-block;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      background: #e2e8f0;
      color: #1e293b;
      padding: 3px 9px;
      border-radius: 999px;
      margin-bottom: 5px;
    }
    .hero-title {
      font-size: 21px;
      font-weight: 900;
      color: #0f172a;
      margin: 0;
      line-height: 1.15;
    }
    .hero-sub {
      font-size: 11.5px;
      color: #334155;
      margin: 4px 0 0;
    }
    .rank-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 14px;
    }
    .rank-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 10px 11px;
    }
    .rank-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .rank-emoji { font-size: 20px; }
    .rank-pos {
      font-size: 8.5px;
      font-weight: 800;
      color: #64748b;
      letter-spacing: 0.06em;
    }
    .rank-name {
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 4px;
    }
    .rank-eixo {
      font-size: 8.5px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748b;
      letter-spacing: 0.06em;
    }
    .rank-val-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-top: 7px;
    }
    .rank-pct {
      font-size: 19px;
      font-weight: 900;
    }
    .rank-pts {
      font-size: 9.5px;
      color: #64748b;
      font-weight: 600;
    }
    .bar-track {
      height: 6px;
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
      margin-top: 6px;
    }
    .bar-fill {
      height: 100%;
      border-radius: 999px;
    }
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      align-items: stretch;
    }
    .panel {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 13px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .panel-title {
      font-size: 11px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: #0f172a;
      margin: 0;
    }
    .panel-sub {
      font-size: 10px;
      color: #64748b;
      margin: 2px 0 8px;
    }
    .brain-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 9px;
      margin: 8px 0 12px;
    }
    .brain-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 9px;
      width: 100%;
    }
    .brain-box {
      width: 100%;
      max-width: 195px;
      padding: 9px 10px;
      border-radius: 10px;
      text-align: center;
      border: 1.5px solid #cbd5e1;
    }
    .brain-row .brain-box { max-width: none; }
    .brain-label {
      font-size: 8.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      display: block;
    }
    .brain-val {
      font-size: 20px;
      font-weight: 900;
      display: block;
      margin-top: 2px;
    }
    .b-blue { background: #eff6ff; border-color: #93c5fd; color: #1e40af; }
    .b-green { background: #ecfdf5; border-color: #6ee7b7; color: #047857; }
    .b-rose { background: #fff1f2; border-color: #fda4af; color: #be123c; }
    .b-amber { background: #fffbeb; border-color: #fcd34d; color: #b45309; }
    .sintese {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 9px 11px;
      font-size: 10.5px;
      color: #334155;
      line-height: 1.45;
    }
    .sintese strong.hl-blue { color: #1d4ed8; }
    .sintese strong.hl-indigo { color: #4338ca; }
    /* Página 2 */
    .detail-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 16px 18px;
    }
    .detail-head {
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 10px;
      margin-bottom: 12px;
    }
    .detail-profile-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    .detail-profile-emoji { font-size: 28px; }
    .detail-profile-title {
      font-size: 16px;
      font-weight: 900;
      color: #0f172a;
      margin: 0;
    }
    .eixo-pill {
      display: inline-block;
      margin-top: 3px;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 2px 9px;
      border-radius: 999px;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      color: #334155;
    }
    .desc {
      font-size: 11.5px;
      color: #334155;
      line-height: 1.55;
      margin: 0 0 14px;
    }
    .quad-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 11px;
      margin-bottom: 13px;
    }
    .info-box {
      border-radius: 10px;
      padding: 11px 13px;
      border: 1.2px solid #cbd5e1;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .info-box h4 {
      font-size: 10px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin: 0 0 6px;
    }
    .info-box ul {
      margin: 0;
      padding-left: 16px;
      color: #1e293b;
      font-size: 11px;
      line-height: 1.5;
    }
    .info-box li { margin-bottom: 2px; }
    .ib-slate { background: #f8fafc; border-color: #cbd5e1; }
    .ib-slate h4 { color: #1d4ed8; }
    .ib-green { background: #ecfdf5; border-color: #6ee7b7; }
    .ib-green h4 { color: #047857; }
    .ib-amber { background: #fffbeb; border-color: #fcd34d; }
    .ib-amber h4 { color: #b45309; }
    .ib-indigo { background: #eef2ff; border-color: #a5b4fc; }
    .ib-indigo h4 { color: #3730a3; }
    .valores-box {
      background: #eff6ff;
      border: 1.2px solid #93c5fd;
      border-radius: 10px;
      padding: 11px 14px;
    }
    .valores-kicker {
      font-size: 9px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #1d4ed8;
      display: block;
    }
    .valores-text {
      font-size: 12.5px;
      font-weight: 800;
      color: #0f172a;
      margin: 3px 0 0;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #cbd5e1;
      padding-top: 7px;
      margin-top: 14px;
      font-size: 9.5px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <!-- PÁGINA 1: RESUMO, PERCENTUAIS, GRÁFICOS E DOMINÂNCIA CEREBRAL -->
  <div class="page">
    <div class="header">
      <div>
        <div class="header-kicker">MIB Church • Avaliação Comportamental</div>
        <h1 class="header-title">Relatório de Perfil Comportamental e Dominância Cerebral</h1>
      </div>
      <div class="header-right">
        <div class="header-name">${esc(nomeMembro)}</div>
        <div class="header-date">Emitido em ${esc(dataEmissao)}</div>
      </div>
    </div>

    <div class="hero">
      <div class="hero-emoji">${resultadoAtual.dominante.emoji}</div>
      <div>
        <span class="hero-badge">Perfil Dominante • ${esc(resultadoAtual.dominante.lema)}</span>
        <h2 class="hero-title">${esc(resultadoAtual.dominante.nome)} (${resultadoAtual.dominante.percentual}%)</h2>
        <p class="hero-sub">
          Perfil Secundário: ${resultadoAtual.secundario.emoji} <strong>${esc(resultadoAtual.secundario.nome)}</strong> (${resultadoAtual.secundario.percentual}%) • ${esc(nomeMembro)}
        </p>
      </div>
    </div>

    <div class="rank-grid">${cardsRankingHtml}</div>

    <div class="two-col">
      <div class="panel">
        <div>
          <h3 class="panel-title">Gráfico de Perfil Comportamental</h3>
          <p class="panel-sub">Distribuição percentual entre os 4 arquétipos (soma = 100%)</p>
        </div>
        ${svgRadar}
        ${svgBarras}
      </div>

      <div class="panel">
        <div>
          <h3 class="panel-title">Atividade / Dominância Cerebral</h3>
          <p class="panel-sub">Quadrantes Ned Herrmann (Anterior, Posterior, Esquerdo e Direito)</p>
        </div>

        <div class="brain-wrap">
          <div class="brain-box b-blue">
            <span class="brain-label">🧠 Pensante (Anterior • O+I)</span>
            <span class="brain-val">${resultadoAtual.pensante}%</span>
          </div>
          <div class="brain-row">
            <div class="brain-box b-green">
              <span class="brain-label">⚖️ Razão (Esq. • A+O)</span>
              <span class="brain-val">${resultadoAtual.razao}%</span>
            </div>
            <div class="brain-box b-rose">
              <span class="brain-label">❤️ Emoção (Dir. • I+C)</span>
              <span class="brain-val">${resultadoAtual.emocao}%</span>
            </div>
          </div>
          <div class="brain-box b-amber">
            <span class="brain-label">💪 Atuante (Posterior • C+A)</span>
            <span class="brain-val">${resultadoAtual.atuante}%</span>
          </div>
        </div>

        <div class="sintese">
          <strong>Síntese da Dominância:</strong> Predominância <strong class="hl-blue">${esc(hemisferioTxt)}</strong> e perfil <strong class="hl-indigo">${esc(eixoTxt)}</strong>.
        </div>
      </div>
    </div>

    <div class="footer">
      <span>MIB Church • Sistema de Gestão de Membros</span>
      <span>Página 1 de 2 • Avaliação Comportamental (IBC / Ned Herrmann)</span>
    </div>
  </div>

  <!-- PÁGINA 2: ANÁLISE DETALHADA DO PERFIL -->
  <div class="page page-break">
    <div class="header">
      <div>
        <div class="header-kicker">MIB Church • Avaliação Comportamental</div>
        <h1 class="header-title">Entenda seu Perfil Comportamental</h1>
      </div>
      <div class="header-right">
        <div class="header-name">${esc(nomeMembro)}</div>
        <div class="header-date">Perfil ${esc(detalhePerfilSelecionado.nome)} • ${esc(dataEmissao)}</div>
      </div>
    </div>

    <div class="detail-card">
      <div class="detail-head">
        <div class="detail-profile-row">
          <span class="detail-profile-emoji">${detalhePerfilSelecionado.emoji}</span>
          <div>
            <h2 class="detail-profile-title">Perfil ${esc(detalhePerfilSelecionado.nome)} — "${esc(detalhePerfilSelecionado.lema)}"</h2>
            <span class="eixo-pill" style="border-color:${detalhePerfilSelecionado.cor}; color:${detalhePerfilSelecionado.cor};">
              Eixo Central: ${esc(detalhePerfilSelecionado.eixo)}
            </span>
          </div>
        </div>
        <p class="desc">${esc(detalhePerfilSelecionado.descricaoCompleta)}</p>
      </div>

      <div class="quad-grid">
        <div class="info-box ib-slate">
          <h4>Comportamentos</h4>
          <ul>${listaHtml(detalhePerfilSelecionado.comportamentos)}</ul>
        </div>
        <div class="info-box ib-green">
          <h4>Pontos Fortes</h4>
          <ul>${listaHtml(detalhePerfilSelecionado.pontosFortes)}</ul>
        </div>
        <div class="info-box ib-amber">
          <h4>Pontos de Melhoria</h4>
          <ul>${listaHtml(detalhePerfilSelecionado.pontosMelhoria)}</ul>
        </div>
        <div class="info-box ib-indigo">
          <h4>Motivações</h4>
          <ul>${listaHtml(detalhePerfilSelecionado.motivacoes)}</ul>
        </div>
      </div>

      <div class="valores-box">
        <span class="valores-kicker">Valores Principais</span>
        <p class="valores-text">${esc(detalhePerfilSelecionado.valores)}</p>
      </div>
    </div>

    <div class="footer">
      <span>MIB Church • Sistema de Gestão de Membros</span>
      <span>Página 2 de 2 • Avaliação Comportamental (IBC / Ned Herrmann)</span>
    </div>
  </div>
</body>
</html>`;

    const tituloAnterior = document.title;
    document.title = `Perfil Comportamental - ${nomeMembro}`;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      document.body.removeChild(iframe);
      document.title = tituloAnterior;
      window.print();
      return;
    }

    doc.open();
    doc.write(htmlDoc);
    doc.close();

    const limpar = () => {
      document.title = tituloAnterior;
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };

    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.onafterprint = limpar;
        iframe.contentWindow.print();
      } catch {
        window.print();
      }
      setTimeout(limpar, 2000);
    }, 200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="print:hidden">
        <PageHeader
          titulo="Perfil Comportamental"
          breadcrumb={['Utilitários', 'Perfil Comportamental']}
          onNavigate={() => onVoltar && onVoltar()}
        />
      </div>

      {/* ── ETAPA 1: INTRODUÇÃO & SELEÇÃO DO MEMBRO ── */}
      {etapa === 'intro' && (
        <div className="space-y-6">
          {/* Banner Hero */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e3a8a] via-indigo-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-white/10">
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-400/15 blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 -bottom-20 w-56 h-56 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] bg-white/15 text-blue-100 px-3 py-1 rounded-full border border-white/15">
                  <Sparkles size={12} />
                  Avaliação Comportamental • Ned Herrmann
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Descubra seu Perfil Comportamental e Dominância Cerebral
                </h2>
                <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                  Responda às <strong>25 questões</strong> escolhendo a alternativa que mais combina com você. Ao final, descubra seus percentuais nos 4 arquétipos (<strong>Águia, Gato, Lobo e Tubarão</strong>) e o mapa de <strong>Atividade Cerebral</strong> — salvos automaticamente na sua ficha em <em>Informações Adicionais</em>.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 shrink-0">
                {['I', 'C', 'O', 'A'].map((cod) => {
                  const p = PERFIS_INFO[cod];
                  return (
                    <div
                      key={cod}
                      className="px-3.5 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2.5"
                    >
                      <span className="text-xl">{p.emoji}</span>
                      <div>
                        <p className="text-xs font-black text-white leading-tight">{p.nome}</p>
                        <p className="text-[10px] text-blue-200/90 font-semibold">{p.eixo}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card de Seleção de Membro + Botão Iniciar */}
          <Card className="p-5 sm:p-6 bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-[#2b3954] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <UserCheck size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                    Membro Avaliado
                  </h3>
                  <p className="text-xs text-slate-400">
                    Os resultados serão gravados automaticamente em <strong>Detalhes do Membro → Informações Adicionais</strong>.
                  </p>
                </div>
              </div>
            </div>

            {pessoaAlvo && (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar pessoa={pessoaAlvo} tamanho="w-11 h-11" />
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100 truncate">
                      {pessoaAlvo.nome}
                    </p>
                    <p className="text-[11px] text-slate-400 font-semibold">
                      {pessoaAlvo.celulas?.nome ? `Célula ${pessoaAlvo.celulas.nome}` : 'Membro MIB Church'}
                    </p>
                  </div>
                </div>
                {resultadoJaSalvo && (
                  <button
                    type="button"
                    onClick={abrirResultadoSalvo}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 hover:bg-blue-100 dark:hover:bg-blue-900/70 transition cursor-pointer"
                  >
                    <Award size={14} />
                    Ver último resultado salvo ({resultadoJaSalvo.dominante.emoji} {resultadoJaSalvo.dominante.nome})
                  </button>
                )}
              </div>
            )}

            {podeEscolherOutroMembro && pessoasAtivas.length > 0 && (
              <div className="space-y-2.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Aplicar teste para outro membro (opcional)
                </label>
                <div className="relative">
                  <Search size={15} className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={buscaMembro}
                    onChange={(e) => setBuscaMembro(e.target.value)}
                    placeholder="Pesquisar membro por nome..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
                {buscaMembro.trim() && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto p-1">
                    {pessoasFiltradasBusca.map((p) => {
                      const selecionado = String(p.id) === String(pessoaAlvo?.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setPessoaAlvoId(p.id);
                            setBuscaMembro('');
                          }}
                          className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition cursor-pointer ${
                            selecionado
                              ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-400 text-blue-900 dark:text-blue-200'
                              : 'bg-white dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600'
                          }`}
                        >
                          <Avatar pessoa={p} tamanho="w-8 h-8" />
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{p.nome}</span>
                        </button>
                      );
                    })}
                    {pessoasFiltradasBusca.length === 0 && (
                      <p className="col-span-full text-xs text-slate-400 italic py-2 text-center">Nenhum membro encontrado.</p>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>📋 {QUESTOES_POR_TESTE} questões sorteadas (banco de {BANCO_QUESTOES.length})</span>
                <span>⏱️ ~5 minutos</span>
                <span>💾 Salvamento automático</span>
              </div>
              <button
                type="button"
                onClick={iniciarTeste}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#1e3a8a] via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-600/25 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                <span>Iniciar Avaliação</span>
              </button>
            </div>
          </Card>

          {/* Histórico de Avaliações Anteriores (quando existir no banco) */}
          {historicoTestes.length > 0 && (
            <Card className="p-5 sm:p-6 bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] space-y-4">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-[#2b3954] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <History size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                      Histórico de Avaliações ({historicoTestes.length})
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Acompanhe a evolução comportamental de {pessoaAlvo?.nome || 'membro'} ao longo do tempo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {historicoTestes.map((reg, idx) => {
                  const dataFmt = reg.created_at
                    ? new Date(reg.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
                    : '—';
                  return (
                    <div
                      key={reg.id}
                      className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                            {reg.dominante || 'Perfil'} {reg.secundario ? `/ ${reg.secundario}` : ''}
                          </span>
                          {idx === 0 && (
                            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              Mais recente
                            </span>
                          )}
                          <span className="text-[11px] font-semibold text-slate-400">• {dataFmt}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
                          <span className="text-emerald-600 dark:text-emerald-400">🦅 {reg.perfil_aguia}%</span>
                          <span className="text-amber-600 dark:text-amber-400">🐈 {reg.perfil_gato}%</span>
                          <span className="text-blue-600 dark:text-blue-400">🐺 {reg.perfil_lobo}%</span>
                          <span className="text-rose-600 dark:text-rose-400">🦈 {reg.perfil_tubarao}%</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => abrirHistoricoItem(reg)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition cursor-pointer shrink-0"
                      >
                        Ver relatório
                      </button>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* ── ETAPA 2: QUESTIONÁRIO INTERATIVO (25 QUESTÕES) ── */}
      {etapa === 'teste' && questaoAtual && (
        <div className="space-y-5">
          {/* Barra de Progresso */}
          <Card className="p-4 sm:p-5 bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] space-y-3">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
                Questão {questaoAtual.numero} de {totalQuestoesSessao}
              </span>
              <span className="font-extrabold text-blue-600 dark:text-blue-400">
                {totalRespondidas}/{totalQuestoesSessao} respondidas ({progressoPct}%)
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-300"
                style={{ width: `${progressoPct}%` }}
              />
            </div>

            {/* Navegação rápida entre as 25 questões sorteadas */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {questoesSessao.map((q, idx) => {
                const respondida = Boolean(respostas[q.id]);
                const atual = idx === questaoIdx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setQuestaoIdx(idx)}
                    className={`w-7 h-7 rounded-lg text-[11px] font-black transition cursor-pointer ${
                      atual
                        ? 'bg-blue-600 text-white ring-2 ring-blue-300 dark:ring-blue-500/50 shadow-sm'
                        : respondida
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/70 dark:border-emerald-700/60'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                    title={`Ir para questão ${q.numero}`}
                  >
                    {q.numero}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Card da Questão Atual */}
          <Card className="p-6 sm:p-8 bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] shadow-md space-y-6">
            <div className="space-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Escolha a alternativa que mais combina com você
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                {questaoAtual.numero}. {questaoAtual.pergunta}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {questaoAtual.opcoes.map((op, i) => {
                const selecionada = respostas[questaoAtual.id] === op.tipo;
                const letraExibicao = ['A', 'B', 'C', 'D'][i];
                return (
                  <button
                    key={op.tipo}
                    type="button"
                    onClick={() => selecionarOpcao(questaoAtual.id, op.tipo)}
                    className={`group w-full p-4 rounded-2xl border text-left transition-all duration-150 flex items-center gap-4 cursor-pointer active:scale-[0.99] ${
                      selecionada
                        ? 'bg-gradient-to-r from-[#1e3a8a] to-blue-600 border-blue-400 text-white shadow-md shadow-blue-600/25'
                        : 'bg-slate-50/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-[#1c2b4a]'
                    }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                        selecionada
                          ? 'bg-white/20 text-white'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 group-hover:border-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                      }`}
                    >
                      {selecionada ? <CheckCircle2 size={18} /> : letraExibicao}
                    </span>
                    <span className="text-sm sm:text-base font-bold leading-snug">{op.texto}</span>
                  </button>
                );
              })}
            </div>

            {/* Navegação Inferior */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-[#2b3954]">
              <button
                type="button"
                onClick={() => (questaoIdx === 0 ? setEtapa('intro') : setQuestaoIdx((prev) => prev - 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <ChevronLeft size={16} />
                {questaoIdx === 0 ? 'Voltar ao início' : 'Anterior'}
              </button>

              {questaoIdx < totalQuestoesSessao - 1 ? (
                <button
                  type="button"
                  onClick={() => setQuestaoIdx((prev) => prev + 1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs font-bold transition cursor-pointer"
                >
                  Próxima
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={finalizarTeste}
                  disabled={totalRespondidas < totalQuestoesSessao}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                    totalRespondidas === totalQuestoesSessao
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/25'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 size={16} />
                  {totalRespondidas === totalQuestoesSessao
                    ? 'Finalizar e Salvar Resultado'
                    : `Faltam ${totalQuestoesSessao - totalRespondidas} questões`}
                </button>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* ── ETAPA 3: RELATÓRIO COMPLETO DE RESULTADOS ── */}
      {etapa === 'resultado' && resultadoAtual && (
        <div className="perfil-print-root space-y-6 print:space-y-4">
          {/* Cabeçalho Institucional (Apenas na Impressão / PDF) */}
          <div className="hidden print:flex items-center justify-between border-b-2 border-slate-800 pb-2.5 mb-1">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                MIB Church • Avaliação Comportamental
              </p>
              <h1 className="text-lg font-black text-slate-900 leading-tight">
                Relatório de Perfil Comportamental e Dominância Cerebral
              </h1>
            </div>
            <div className="text-right">
              {pessoaAlvo?.nome && (
                <p className="text-xs font-black text-slate-900">{pessoaAlvo.nome}</p>
              )}
              <p className="text-[10px] font-semibold text-slate-600">
                Emitido em {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Status do Salvamento */}
          {statusSalvamento && (
            <div
              className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs font-bold print:hidden ${
                statusSalvamento.tipo === 'sucesso'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-300'
              }`}
            >
              <span className="flex items-center gap-2">
                {statusSalvamento.tipo === 'sucesso' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {statusSalvamento.msg}
              </span>
              {statusSalvamento.tipo === 'erro' && pessoaAlvo?.id && (
                <button
                  type="button"
                  onClick={() => salvarNoPerfilDoMembro(resultadoAtual, pessoaAlvo.id)}
                  disabled={salvando}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition cursor-pointer inline-flex items-center gap-1"
                >
                  <Save size={13} />
                  Tentar salvar novamente
                </button>
              )}
            </div>
          )}

          {/* Hero do Perfil Dominante */}
          <div
            className={`perfil-print-hero perfil-print-avoid-break relative overflow-hidden rounded-3xl bg-gradient-to-br ${resultadoAtual.dominante.corGrad} p-6 sm:p-8 text-white shadow-xl`}
            style={{ borderLeftColor: resultadoAtual.dominante.cor }}
          >
            <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-white/15 blur-3xl pointer-events-none print:hidden" />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 print:gap-4">
              <div className="flex items-center gap-5 print:gap-4">
                <div className="perfil-print-emoji-box w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-5xl shadow-lg shrink-0">
                  {resultadoAtual.dominante.emoji}
                </div>
                <div>
                  <span className="perfil-print-badge inline-block text-[10px] font-black uppercase tracking-[0.2em] bg-black/20 px-3 py-1 rounded-full mb-2 print:mb-1">
                    Perfil Dominante • {resultadoAtual.dominante.lema}
                  </span>
                  <h2 className="text-2xl sm:text-3xl print:text-xl font-black tracking-tight leading-none">
                    {resultadoAtual.dominante.nome} ({resultadoAtual.dominante.percentual}%)
                  </h2>
                  <p className="text-xs sm:text-sm print:text-xs text-white/90 font-semibold mt-1.5">
                    Perfil Secundário: {resultadoAtual.secundario.emoji} <strong>{resultadoAtual.secundario.nome}</strong> ({resultadoAtual.secundario.percentual}%)
                    {pessoaAlvo?.nome ? ` • ${pessoaAlvo.nome}` : ''}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 print:hidden">
                <button
                  type="button"
                  onClick={handleImprimirPdf}
                  className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-bold transition cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Printer size={15} />
                  Imprimir / PDF
                </button>
                <button
                  type="button"
                  onClick={iniciarTeste}
                  className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-black transition cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                >
                  <RotateCcw size={15} />
                  Refazer Teste
                </button>
              </div>
            </div>
          </div>

          {/* 4 Cards de Percentual dos Perfis */}
          <div className="grid grid-cols-2 lg:grid-cols-4 print:grid-cols-4 gap-3 sm:gap-4 print:gap-2.5 perfil-print-avoid-break">
            {resultadoAtual.ranking.map((item, idx) => (
              <Card
                key={item.codigo}
                onClick={() => setAbaPerfilDetalhe(item.codigo)}
                className={`p-4 print:p-3 bg-white dark:bg-[#17223b] border transition-all cursor-pointer ${
                  idx === 0
                    ? 'border-blue-400/70 dark:border-blue-500/60 ring-2 ring-blue-500/15 print:ring-0'
                    : 'border-slate-200/80 dark:border-[#2b3954] hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl print:text-xl">{item.emoji}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {idx + 1}º lugar
                  </span>
                </div>
                <p className="text-sm font-black text-slate-800 dark:text-slate-100 mt-2 print:mt-1">{item.nome}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.eixo}</p>
                <div className="mt-3 print:mt-2 flex items-baseline justify-between">
                  <span className="text-2xl print:text-xl font-black" style={{ color: item.cor }}>
                    {item.percentual}%
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {item.pontos} × 4
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentual}%`, backgroundColor: item.cor }}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Gráficos: Distribuição Comportamental + Mapa de Atividade Cerebral */}
          <div className="grid grid-cols-1 lg:grid-cols-2 print:grid-cols-2 gap-6 print:gap-3 perfil-print-avoid-break">
            {/* Gráfico de Barras / Radar */}
            <Card className="p-5 print:p-3.5 bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] space-y-4 print:space-y-2">
              <div>
                <h3 className="text-sm print:text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                  Gráfico de Perfil Comportamental
                </h3>
                <p className="text-xs print:text-[10px] text-slate-400">Distribuição percentual entre os 4 arquétipos (soma = 100%)</p>
              </div>
              <div className="h-60 print:h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={dadosRadar}>
                    <PolarGrid stroke="#64748b44" />
                    <PolarAngleAxis dataKey="perfil" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                    <Radar name="Perfil (%)" dataKey="valor" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2.5} isAnimationActive={false} />
                    <Tooltip formatter={(val) => [`${val}%`, 'Percentual']} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-36 print:h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosGraficoBarras} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="nome" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(val) => [`${val}%`, 'Percentual']} />
                    <Bar dataKey="valor" radius={[8, 8, 0, 0]} maxBarSize={40} isAnimationActive={false}>
                      {dadosGraficoBarras.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.cor} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Mapa de Atividade Cerebral (Ned Herrmann — PDF pág. 11) */}
            <Card className="p-5 print:p-3.5 bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] flex flex-col justify-between space-y-5 print:space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 print:w-8 print:h-8 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Brain size={20} />
                </div>
                <div>
                  <h3 className="text-sm print:text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                    Atividade / Dominância Cerebral
                  </h3>
                  <p className="text-xs print:text-[10px] text-slate-400">
                    Quadrantes salvos em <strong>Detalhes do Membro → Atividade Cerebral</strong>
                  </p>
                </div>
              </div>

              {/* Cruz de Dominância Cerebral */}
              <div className="flex flex-col items-center justify-center gap-3 print:gap-2 py-2 print:py-1">
                {/* Topo: Pensante (Anterior = O + I) */}
                <div className="perfil-box-blue w-full max-w-[220px] p-3.5 print:p-2.5 rounded-2xl border border-blue-200 dark:border-blue-800/60 bg-blue-50/70 dark:bg-blue-950/40 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 dark:text-blue-300 block">
                    🧠 Pensante (Anterior • O+I)
                  </span>
                  <span className="text-2xl print:text-xl font-black text-blue-700 dark:text-blue-300 mt-1 block">
                    {resultadoAtual.pensante}%
                  </span>
                </div>

                {/* Meio: Razão (Esquerdo = A + O) e Emoção (Direito = I + C) */}
                <div className="grid grid-cols-2 gap-3 print:gap-2 w-full">
                  <div className="perfil-box-emerald p-3.5 print:p-2.5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/40 text-center">
                    <span className="perfil-box-accent text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-300 block">
                      ⚖️ Razão (Esq. • A+O)
                    </span>
                    <span className="perfil-box-accent text-2xl print:text-xl font-black text-emerald-700 dark:text-emerald-300 mt-1 block">
                      {resultadoAtual.razao}%
                    </span>
                  </div>
                  <div className="perfil-box-rose p-3.5 print:p-2.5 rounded-2xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/70 dark:bg-rose-950/40 text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-rose-700 dark:text-rose-300 block">
                      ❤️ Emoção (Dir. • I+C)
                    </span>
                    <span className="text-2xl print:text-xl font-black text-rose-700 dark:text-rose-300 mt-1 block">
                      {resultadoAtual.emocao}%
                    </span>
                  </div>
                </div>

                {/* Base: Atuante (Posterior = C + A) */}
                <div className="perfil-box-amber w-full max-w-[220px] p-3.5 print:p-2.5 rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/40 text-center">
                  <span className="perfil-box-accent text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-300 block">
                    💪 Atuante (Posterior • C+A)
                  </span>
                  <span className="perfil-box-accent text-2xl print:text-xl font-black text-amber-700 dark:text-amber-300 mt-1 block">
                    {resultadoAtual.atuante}%
                  </span>
                </div>
              </div>

              <div className="p-3.5 print:p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 text-xs print:text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Síntese da Dominância:</strong> Predominância{' '}
                <strong className="text-blue-700 dark:text-blue-400">
                  {resultadoAtual.emocao >= resultadoAtual.razao ? 'Emocional (Hemisfério Direito)' : 'Racional (Hemisfério Esquerdo)'}
                </strong>{' '}
                e perfil{' '}
                <strong className="text-indigo-700 dark:text-indigo-400">
                  {resultadoAtual.pensante >= resultadoAtual.atuante ? 'Pensante (Anterior)' : 'Atuante (Posterior)'}
                </strong>.
              </div>
            </Card>
          </div>

          {/* Detalhamento Completo dos Perfis (Inicia limpo na Página 2 ao imprimir) */}
          <Card className="perfil-print-page-break p-5 sm:p-6 print:p-5 bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] space-y-5 print:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-[#2b3954] pb-4 print:pb-3">
              <div>
                <h3 className="text-base font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">
                  Entenda seu Perfil Comportamental
                </h3>
                <p className="text-xs text-slate-400 print:hidden">Selecione um arquétipo abaixo para ver comportamentos, pontos fortes, melhorias, motivações e valores.</p>
                <p className="hidden print:block text-xs text-slate-600">Análise detalhada do perfil selecionado: comportamentos, pontos fortes, melhorias, motivações e valores.</p>
              </div>
              <div className="flex flex-wrap gap-1.5 print:hidden">
                {['I', 'C', 'O', 'A'].map((cod) => {
                  const p = PERFIS_INFO[cod];
                  const ativo = abaPerfilDetalhe === cod;
                  return (
                    <button
                      key={cod}
                      type="button"
                      onClick={() => setAbaPerfilDetalhe(cod)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer inline-flex items-center gap-1.5 border ${
                        ativo
                          ? 'bg-[#1e3a8a] dark:bg-blue-600 text-white border-transparent shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300'
                      }`}
                    >
                      <span>{p.emoji}</span>
                      <span>{p.nome}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-5 print:space-y-3.5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-3xl">{detalhePerfilSelecionado.emoji}</span>
                <div>
                  <h4 className="text-lg font-black text-slate-800 dark:text-slate-100">
                    Perfil {detalhePerfilSelecionado.nome} — "{detalhePerfilSelecionado.lema}"
                  </h4>
                  <span className={`inline-block mt-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${detalhePerfilSelecionado.corBadge}`}>
                    Eixo Central: {detalhePerfilSelecionado.eixo}
                  </span>
                </div>
              </div>

              <p className="text-sm print:text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {detalhePerfilSelecionado.descricaoCompleta}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-4 print:gap-3">
                <div className="perfil-print-avoid-break p-4 print:p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
                  <h5 className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-400">
                    Comportamentos
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 list-disc pl-4">
                    {detalhePerfilSelecionado.comportamentos.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>

                <div className="perfil-box-emerald perfil-print-avoid-break p-4 print:p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50 space-y-2">
                  <h5 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Pontos Fortes
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-200 list-disc pl-4">
                    {detalhePerfilSelecionado.pontosFortes.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>

                <div className="perfil-box-amber perfil-print-avoid-break p-4 print:p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/50 space-y-2">
                  <h5 className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Pontos de Melhoria
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-200 list-disc pl-4">
                    {detalhePerfilSelecionado.pontosMelhoria.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>

                <div className="perfil-box-indigo perfil-print-avoid-break p-4 print:p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/50 space-y-2">
                  <h5 className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                    Motivações
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-200 list-disc pl-4">
                    {detalhePerfilSelecionado.motivacoes.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              </div>

              <div className="perfil-box-valores perfil-print-avoid-break p-4 print:p-3.5 rounded-2xl bg-gradient-to-r from-[#1e3a8a]/10 to-indigo-500/10 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200/60 dark:border-blue-800/50">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 dark:text-blue-300 block">
                  Valores Principais
                </span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">
                  {detalhePerfilSelecionado.valores}
                </p>
              </div>
            </div>
          </Card>

          {/* Rodapé Institucional (Apenas na Impressão / PDF) */}
          <div className="hidden print:flex items-center justify-between pt-2 border-t border-slate-300 text-[10px] text-slate-500">
            <span>MIB Church • Sistema de Gestão de Membros</span>
            <span>Avaliação Comportamental (Metodologia IBC / Ned Herrmann)</span>
          </div>
        </div>
      )}
    </div>
  );
}
