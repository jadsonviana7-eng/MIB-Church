// ── Motor de Análise Inteligente: Perfil Comportamental + Temperamentos + Atividade Cerebral ──

export const ATIVIDADE_CEREBRAL_INFO = {
  pensante: {
    chave: 'pensante',
    nome: 'Pensante',
    subtitulo: 'Quadrante Anterior (O + I)',
    emoji: '🧠',
    cor: '#3b82f6',
    corGrad: 'from-blue-600 via-indigo-600 to-blue-700',
    resumo: 'Foco em planejamento, visão estratégica, análise prévia e construção de ideias antes de agir.',
    descricaoCompleta:
      'O quadrante Pensante (Anterior = Lobo + Águia) representa a capacidade de planejar, conceituar, analisar cenários e estruturar estratégias antes da execução. Pessoas com alta pontuação nesse eixo gostam de compreender o propósito, organizar ideias e enxergar o caminho com clareza antes de dar o próximo passo.',
    caracteristicas: [
      'Visão estratégica e planejamento prévio',
      'Capacidade analítica e conceitual',
      'Gosta de entender o "porquê" e o "como"',
      'Facilidade para projetar cenários futuros',
      'Reflexão antes da tomada de decisão',
    ],
    aptidoes: [
      'Ensino & Escola de Discípulos',
      'Planejamento Ministerial & Estratégia',
      'Administração & Gestão de Projetos',
      'Criação de Conteúdo & Mídia',
    ],
    pontosFortes: [
      'Evita decisões precipitadas e retrabalho',
      'Excelente para estruturar metas, cursos e processos',
      'Enxerga oportunidades e riscos com antecedência',
    ],
    pontosAtencao: [
      'Risco de excesso de análise ("paralisia por planejamento")',
      'Pode demorar a iniciar a execução prática',
      'Beneficia-se de parcerias com perfis mais Atuantes',
    ],
  },
  razao: {
    chave: 'razao',
    nome: 'Razão',
    subtitulo: 'Hemisfério Esquerdo (A + O)',
    emoji: '⚖️',
    cor: '#10b981',
    corGrad: 'from-emerald-600 via-teal-600 to-green-700',
    resumo: 'Decisões guiadas por lógica, fatos, disciplina, metas objetivas e critérios claros.',
    descricaoCompleta:
      'O Hemisfério Esquerdo (Razão = Tubarão + Lobo) concentra o pensamento lógico, objetivo, sequencial e orientado a fatos e resultados. Pessoas com predominância racional valorizam clareza, eficiência, organização, pontualidade e tomada de decisão fundamentada em dados concretos.',
    caracteristicas: [
      'Pensamento lógico, objetivo e estruturado',
      'Foco em resultados, metas e eficiência',
      'Valoriza regras claras, ordem e pontualidade',
      'Comunicação direta e pragmática',
      'Alta confiabilidade em processos e finanças',
    ],
    aptidoes: [
      'Finanças & Tesouraria',
      'Secretaria & Organização Interna',
      'Logística & Coordenação de Eventos',
      'Som, Técnica & Operações',
    ],
    pontosFortes: [
      'Garante consistência, controle e entrega no prazo',
      'Mantém a calma e a clareza em situações críticas',
      'Excelente na gestão de recursos e processos da igreja',
    ],
    pontosAtencao: [
      'Pode parecer frio ou excessivamente direto em situações delicadas',
      'Precisa cultivar empatia e escuta ativa com perfis mais emocionais',
      'Cuidado para não colocar regras acima do cuidado pastoral',
    ],
  },
  emocao: {
    chave: 'emocao',
    nome: 'Emoção',
    subtitulo: 'Hemisfério Direito (I + C)',
    emoji: '❤️',
    cor: '#e11d48',
    corGrad: 'from-rose-600 via-pink-600 to-rose-700',
    resumo: 'Sensibilidade interpessoal, criatividade, empatia, intuição e conexão genuína com pessoas.',
    descricaoCompleta:
      'O Hemisfério Direito (Emoção = Águia + Gato) expressa sensibilidade, criatividade, intuição e foco profundo nas pessoas. Indivíduos com predominância emocional percebem o ambiente espiritual e relacional com facilidade, inspiram equipes, promovem acolhimento e trazem calor humano ao ministério.',
    caracteristicas: [
      'Alta empatia e sensibilidade relacional',
      'Criatividade, intuição e expressão artística',
      'Facilidade para acolher, inspirar e conectar pessoas',
      'Foco em propósito, atmosfera e comunhão',
      'Comunicação calorosa e envolvente',
    ],
    aptidoes: [
      'Recepção, Acolhimento & Consolidação',
      'Louvor, Artes & Criatividade',
      'Intercessão & Aconselhamento Pastoral',
      'Liderança de Células & Comunhão',
    ],
    pontosFortes: [
      'Cria ambientes saudáveis, acolhedores e inspiradores',
      'Percebe rapidamente necessidades emocionais e espirituais',
      'Engaja pessoas pela visão e pelo afeto',
    ],
    pontosAtencao: [
      'Pode tomar decisões baseadas apenas no impulso emocional',
      'Tende a evitar conversas difíceis para não magoar pessoas',
      'Beneficia-se de metas claras e rotinas organizadas',
    ],
  },
  atuante: {
    chave: 'atuante',
    nome: 'Atuante',
    subtitulo: 'Quadrante Posterior (C + A)',
    emoji: '💪',
    cor: '#f59e0b',
    corGrad: 'from-amber-500 via-orange-500 to-amber-600',
    resumo: 'Mão na massa, energia prática, dinamismo e prontidão para servir e fazer acontecer.',
    descricaoCompleta:
      'O quadrante Atuante (Posterior = Gato + Tubarão) representa a disposição prática para agir, servir, mobilizar pessoas e transformar planos em realidade no aqui e agora. Pessoas com alta pontuação nesse eixo são proativas, presentes no campo de batalha e impulsionam o movimento da equipe.',
    caracteristicas: [
      'Iniciativa, energia e prontidão para agir',
      'Aprende melhor fazendo na prática',
      'Foco no presente e na resolução imediata',
      'Mobiliza equipes e faz o culto/evento acontecer',
      'Alta disposição para servir em campo',
    ],
    aptidoes: [
      'Diaconato, Apoio & Logística de Culto',
      'Evangelismo, Missões & Ação Social',
      'Recepção & Integração de Visitantes',
      'Produção e Execução de Eventos',
    ],
    pontosFortes: [
      'Tira projetos do papel rapidamente',
      'Resolve imprevistos com agilidade',
      'Mantém a equipe ativa, animada e engajada',
    ],
    pontosAtencao: [
      'Pode agir sem planejar detalhes importantes antes',
      'Risco de sobrecarga por abraçar muitas tarefas ao mesmo tempo',
      'Beneficia-se de alinhar prioridades com a liderança',
    ],
  },
};

export const TEMPERAMENTOS_INFO = {
  colerico: {
    chave: 'colerico',
    nome: 'Colérico',
    emoji: '🔥',
    cor: '#dc2626',
    corGrad: 'from-red-600 via-rose-600 to-orange-600',
    resumo: 'Líder nato, decidido, proativo, visionário na ação e focado em metas concretas.',
    descricaoCompleta:
      'O temperamento Colérico é marcado por forte determinação, coragem, independência e liderança natural. Pessoas coléricas enxergam desafios como oportunidades, tomam decisões rápidas e mobilizam recursos para alcançar resultados.',
    pontosFortes: ['Liderança e iniciativa', 'Coragem diante de desafios', 'Foco em resultados e produtividade'],
    pontosMelhoria: ['Impaciência com ritmos mais lentos', 'Tendência ao perfeccionismo autoritário', 'Precisa cultivar mansidão e escuta'],
    aptidoes: ['Liderança de Equipes e Ministérios', 'Coordenação de Eventos', 'Evangelismo e Abertura de Células'],
  },
  melancolico: {
    chave: 'melancolico',
    nome: 'Melancólico',
    emoji: '📋',
    cor: '#9333ea',
    corGrad: 'from-purple-600 via-violet-600 to-indigo-700',
    resumo: 'Profundo, analítico, fiel, sensível aos detalhes e comprometido com a excelência.',
    descricaoCompleta:
      'O temperamento Melancólico destaca-se pela profundidade, lealdade, senso estético e rigor com a qualidade. Pessoas melancólicas refletem antes de falar, organizam processos com maestria e levam seus compromissos muito a sério.',
    pontosFortes: ['Excelência, organização e profundidade', 'Fidelidade e compromisso', 'Sensibilidade espiritual e analítica'],
    pontosMelhoria: ['Autocrítica excessiva', 'Sensibilidade a críticas ou imprevistos', 'Tendência ao pessimismo sob pressão'],
    aptidoes: ['Ensino Bíblico e Discipulado', 'Finanças, Secretaria e Administração', 'Louvor, Artes e Intercessão'],
  },
  sanguineo: {
    chave: 'sanguineo',
    nome: 'Sanguíneo',
    emoji: '☀️',
    cor: '#d97706',
    corGrad: 'from-amber-500 via-yellow-500 to-orange-500',
    resumo: 'Comunicativo, entusiasta, acolhedor, criativo e capaz de contagiar ambientes com alegria.',
    descricaoCompleta:
      'O temperamento Sanguíneo traz leveza, carisma, espontaneidade e grande facilidade para criar vínculos. Pessoas sanguíneas amam estar com gente, comunicam-se com entusiasmo e tornam o ambiente da igreja vivo e acolhedor.',
    pontosFortes: ['Carisma, alegria e comunicação', 'Facilidade para acolher visitantes', 'Criatividade e entusiasmo contagioso'],
    pontosMelhoria: ['Disciplina com prazos e rotinas', 'Manter foco até concluir tarefas longas', 'Cuidar para não se comprometer além da conta'],
    aptidoes: ['Recepção e Acolhimento', 'Anfitrião de Células e Integração', 'Comunicação, Jovens e Evangelismo'],
  },
  fleumatico: {
    chave: 'fleumatico',
    nome: 'Fleumático',
    emoji: '💧',
    cor: '#0891b2',
    corGrad: 'from-cyan-600 via-sky-600 to-teal-600',
    resumo: 'Sereno, diplomático, confiável, pacificador e constante mesmo em momentos de pressão.',
    descricaoCompleta:
      'O temperamento Fleumático é caracterizado pela paz, equilíbrio emocional, paciência e espírito conciliador. Pessoas fleumáticas são excelentes ouvintes, trazem estabilidade aos grupos e trabalham com constância e humildade.',
    pontosFortes: ['Paz, equilíbrio e diplomacia', 'Escuta acolhedora e constância', 'Excelente trabalho em equipe sem conflitos'],
    pontosMelhoria: ['Evitar procrastinação ou comodismo', 'Expressar opiniões com mais firmeza', 'Tomar iniciativa sem esperar ser chamado'],
    aptidoes: ['Aconselhamento e Consolidação', 'Intercessão e Cuidado Pastoral', 'Apoio Ministerial, Secretaria e Ensino'],
  },
};

function normalizarTempChave(nome) {
  const n = String(nome || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
  if (n.includes('coler')) return 'colerico';
  if (n.includes('melanc')) return 'melancolico';
  if (n.includes('sanguin')) return 'sanguineo';
  if (n.includes('fleum')) return 'fleumatico';
  return null;
}

// Mapa ponderado de aptidões ministeriais cruzando os 3 instrumentos
const APTIDOES_MATRIZ = [
  {
    nome: 'Liderança de Célula & Discipulado',
    icone: '🏠',
    pesos: { gato: 2.2, aguia: 1.5, tubarao: 1.4, sanguineo: 2.0, colerico: 1.8, fleumatico: 1.5, emocao: 1.6, atuante: 1.4 },
    motivo: 'Combina cuidado relacional, visão espiritual e capacidade de conduzir pessoas em comunidade.',
  },
  {
    nome: 'Ensino Bíblico & Escola de Discípulos',
    icone: '📖',
    pesos: { lobo: 2.3, aguia: 1.7, melancolico: 2.3, fleumatico: 1.5, pensante: 2.2, razao: 1.6 },
    motivo: 'Une profundidade analítica, clareza didática e preparo estruturado para ensinar a Palavra.',
  },
  {
    nome: 'Recepção, Acolhimento & Consolidação',
    icone: '🤝',
    pesos: { gato: 2.5, sanguineo: 2.4, fleumatico: 1.8, emocao: 2.0, atuante: 1.6 },
    motivo: 'Destaque em empatia, simpatia natural e habilidade para fazer visitantes se sentirem em casa.',
  },
  {
    nome: 'Louvor, Artes & Mídia Criativa',
    icone: '🎵',
    pesos: { aguia: 2.4, gato: 1.7, sanguineo: 1.8, melancolico: 1.8, emocao: 2.2, pensante: 1.3 },
    motivo: 'Alinha sensibilidade artística, criatividade visionária e expressão comunicativa.',
  },
  {
    nome: 'Administração, Finanças & Secretaria',
    icone: '📊',
    pesos: { lobo: 2.6, tubarao: 1.2, melancolico: 2.4, fleumatico: 1.5, razao: 2.4, pensante: 1.9 },
    motivo: 'Perfil confiável, metódico e criterioso para zelar por processos, registros e recursos.',
  },
  {
    nome: 'Coordenação de Eventos & Logística',
    icone: '⚡',
    pesos: { tubarao: 2.5, lobo: 1.7, colerico: 2.4, atuante: 2.3, razao: 1.6 },
    motivo: 'Alta capacidade de execução, senso de urgência e organização prática para fazer acontecer.',
  },
  {
    nome: 'Intercessão & Aconselhamento Pastoral',
    icone: '🙏',
    pesos: { gato: 2.1, lobo: 1.3, fleumatico: 2.3, melancolico: 2.0, emocao: 2.1, pensante: 1.4 },
    motivo: 'Combina escuta serena, sensibilidade espiritual e discrição para cuidar de vidas.',
  },
  {
    nome: 'Evangelismo, Missões & Ação Social',
    icone: '🌍',
    pesos: { aguia: 2.0, tubarao: 2.0, gato: 1.6, sanguineo: 2.0, colerico: 2.0, atuante: 2.2, emocao: 1.4 },
    motivo: 'Coragem, dinamismo e paixão por alcançar novas pessoas e expandir o Reino.',
  },
];

export function gerarAnaliseInteligente({
  nome = '',
  perfilAguia,
  perfilGato,
  perfilLobo,
  perfilTubarao,
  perfilPensante,
  perfilRazao,
  perfilEmocao,
  perfilAtuante,
  testePersonalidade,
}) {
  const aguia = Number(perfilAguia) || 0;
  const gato = Number(perfilGato) || 0;
  const lobo = Number(perfilLobo) || 0;
  const tubarao = Number(perfilTubarao) || 0;
  const temComportamental = aguia + gato + lobo + tubarao > 0;

  const pensante = Number(perfilPensante) || (temComportamental ? lobo + aguia : 0);
  const razao = Number(perfilRazao) || (temComportamental ? tubarao + lobo : 0);
  const emocao = Number(perfilEmocao) || (temComportamental ? aguia + gato : 0);
  const atuante = Number(perfilAtuante) || (temComportamental ? gato + tubarao : 0);
  const temCerebral = pensante + razao + emocao + atuante > 0;

  const temTemperamento = Boolean(
    testePersonalidade &&
      ((Number(testePersonalidade.colerico) || 0) +
        (Number(testePersonalidade.melancolico) || 0) +
        (Number(testePersonalidade.sanguineo) || 0) +
        (Number(testePersonalidade.fleumatico) || 0) >
        0)
  );

  if (!temComportamental && !temCerebral && !temTemperamento) {
    return null;
  }

  // 1. Perfil comportamental dominante / secundário
  const compRanking = temComportamental
    ? [
        { chave: 'aguia', codigo: 'I', nome: 'Águia', emoji: '🦅', val: aguia },
        { chave: 'gato', codigo: 'C', nome: 'Gato', emoji: '🐈', val: gato },
        { chave: 'lobo', codigo: 'O', nome: 'Lobo', emoji: '🐺', val: lobo },
        { chave: 'tubarao', codigo: 'A', nome: 'Tubarão', emoji: '🦈', val: tubarao },
      ].sort((a, b) => b.val - a.val)
    : [];

  // 2. Temperamento dominante / secundário (escala 7–35 normalizada para 0–100)
  const tempRanking = temTemperamento
    ? [
        { chave: 'colerico', nome: 'Colérico', emoji: '🔥', val: Number(testePersonalidade.colerico) || 0 },
        { chave: 'melancolico', nome: 'Melancólico', emoji: '📋', val: Number(testePersonalidade.melancolico) || 0 },
        { chave: 'sanguineo', nome: 'Sanguíneo', emoji: '☀️', val: Number(testePersonalidade.sanguineo) || 0 },
        { chave: 'fleumatico', nome: 'Fleumático', emoji: '💧', val: Number(testePersonalidade.fleumatico) || 0 },
      ].sort((a, b) => b.val - a.val)
    : [];

  // 3. Dominância cerebral
  const difHemisferio = Math.abs(emocao - razao);
  const hemisferioDominante = !temCerebral
    ? null
    : difHemisferio <= 8
      ? { tipo: 'equilibrado', titulo: 'Equilíbrio Razão & Emoção', emoji: '⚖️❤️', desc: `Alterna com naturalidade entre decisões lógicas (${razao}%) e sensibilidade interpessoal (${emocao}%).` }
      : emocao > razao
        ? { tipo: 'emocao', titulo: `Hemisfério Direito • Emocional (${emocao}%)`, emoji: '❤️', desc: `Tendência natural a priorizar pessoas, empatia, intuição e criatividade sobre a rigidez de processos (Razão: ${razao}%).` }
        : { tipo: 'razao', titulo: `Hemisfério Esquerdo • Racional (${razao}%)`, emoji: '⚖️', desc: `Tendência natural a decidir com base em lógica, fatos, clareza e critérios objetivos (Emoção: ${emocao}%).` };

  const difEixo = Math.abs(pensante - atuante);
  const eixoAcaoDominante = !temCerebral
    ? null
    : difEixo <= 8
      ? { tipo: 'equilibrado', titulo: 'Equilíbrio Pensante & Atuante', emoji: '🧠💪', desc: `Consegue tanto planejar bem (${pensante}%) quanto colocar a mão na massa (${atuante}%).` }
      : pensante > atuante
        ? { tipo: 'pensante', titulo: `Quadrante Anterior • Pensante (${pensante}%)`, emoji: '🧠', desc: `Prefere refletir, estruturar ideias e planejar o passo a passo antes de agir (Atuante: ${atuante}%).` }
        : { tipo: 'atuante', titulo: `Quadrante Posterior • Atuante (${atuante}%)`, emoji: '💪', desc: `Alta energia prática e prontidão para servir, mobilizar e fazer acontecer no presente (Pensante: ${pensante}%).` };

  // 4. Pontuação combinada de Aptidões Ministeriais (0–100)
  const sinais = {
    aguia: temComportamental ? aguia : 0,
    gato: temComportamental ? gato : 0,
    lobo: temComportamental ? lobo : 0,
    tubarao: temComportamental ? tubarao : 0,
    colerico: temTemperamento ? Math.round(((Number(testePersonalidade.colerico) || 0) / 35) * 100) : 0,
    melancolico: temTemperamento ? Math.round(((Number(testePersonalidade.melancolico) || 0) / 35) * 100) : 0,
    sanguineo: temTemperamento ? Math.round(((Number(testePersonalidade.sanguineo) || 0) / 35) * 100) : 0,
    fleumatico: temTemperamento ? Math.round(((Number(testePersonalidade.fleumatico) || 0) / 35) * 100) : 0,
    pensante: temCerebral ? pensante : 0,
    razao: temCerebral ? razao : 0,
    emocao: temCerebral ? emocao : 0,
    atuante: temCerebral ? atuante : 0,
  };

  const aptidoesRanqueadas = APTIDOES_MATRIZ.map((ap) => {
    let soma = 0;
    let pesoTotal = 0;
    Object.entries(ap.pesos).forEach(([chave, peso]) => {
      if (sinais[chave] > 0) {
        soma += sinais[chave] * peso;
        pesoTotal += peso;
      }
    });
    const afinidade = pesoTotal > 0 ? Math.min(99, Math.round(soma / pesoTotal)) : 0;
    return { ...ap, afinidade };
  })
    .filter((a) => a.afinidade > 0)
    .sort((a, b) => b.afinidade - a.afinidade)
    .slice(0, 4);

  // 5. Título & Síntese Pastoral Integrada
  const primeiroNome = String(nome || '').trim().split(/\s+/)[0] || 'Este membro';
  const compDom = compRanking[0];
  const compSec = compRanking[1];
  const tempDom = tempRanking[0] || (testePersonalidade?.dominant ? { chave: normalizarTempChave(testePersonalidade.dominant), nome: testePersonalidade.dominant } : null);

  let tituloSintese = 'Perfil Ministerial em Formação';
  if (compDom && tempDom) {
    tituloSintese = `${compDom.emoji} ${compDom.nome} + ${tempDom.emoji || '✨'} ${tempDom.nome}`;
  } else if (compDom) {
    tituloSintese = `${compDom.emoji} Perfil ${compDom.nome}${compSec && compSec.val > 0 ? ` com traços de ${compSec.nome}` : ''}`;
  } else if (tempDom) {
    tituloSintese = `${tempDom.emoji || '✨'} Temperamento ${tempDom.nome}`;
  } else if (hemisferioDominante) {
    tituloSintese = hemisferioDominante.titulo;
  }

  const paragrafosSintese = [];
  if (compDom && tempDom) {
    paragrafosSintese.push(
      `Cruzando o Perfil Comportamental (${compDom.nome} ${compDom.val}%) com o Temperamento (${tempDom.nome}), ${primeiroNome} demonstra forte vocação para atuar onde possa unir ${
        compDom.chave === 'aguia'
          ? 'criatividade e visão de futuro'
          : compDom.chave === 'gato'
            ? 'relacionamentos saudáveis e acolhimento'
            : compDom.chave === 'lobo'
              ? 'organização, excelência e confiabilidade'
              : 'ação rápida, coragem e foco em resultados'
      } com a essência ${
        tempDom.chave === 'colerico'
          ? 'decidida e mobilizadora do Colérico'
          : tempDom.chave === 'melancolico'
            ? 'profunda e detalhista do Melancólico'
            : tempDom.chave === 'sanguineo'
              ? 'comunicativa e entusiasta do Sanguíneo'
              : 'serena e pacificadora do Fleumático'
      }.`
    );
  } else if (compDom) {
    paragrafosSintese.push(
      `Com predominância em ${compDom.nome} (${compDom.val}%)${compSec && compSec.val > 0 ? ` e apoio em ${compSec.nome} (${compSec.val}%)` : ''}, ${primeiroNome} tende a se destacar em ministérios que valorizem ${
        compDom.chave === 'aguia'
          ? 'inovação, visão e liberdade criativa'
          : compDom.chave === 'gato'
            ? 'trabalho em equipe, harmonia e cuidado com pessoas'
            : compDom.chave === 'lobo'
              ? 'processos claros, constância e qualidade'
              : 'praticidade, metas objetivas e execução ágil'
      }.`
    );
  } else if (tempDom) {
    paragrafosSintese.push(
      `Com base no temperamento dominante ${tempDom.nome}, ${primeiroNome} possui aptidão natural para servir com ${
        tempDom.chave === 'colerico'
          ? 'iniciativa, liderança e foco em entregas'
          : tempDom.chave === 'melancolico'
            ? 'excelência, profundidade e compromisso'
            : tempDom.chave === 'sanguineo'
              ? 'carisma, alegria e conexão interpessoal'
              : 'estabilidade, escuta acolhedora e conciliação'
      }.`
    );
  }

  // 6. Recomendações de Liderança & Pontos de Equilíbrio
  const recomendacoesLideranca = [];
  const pontosEquilibrio = [];

  if (compDom?.chave === 'aguia' || eixoAcaoDominante?.tipo === 'pensante') {
    recomendacoesLideranca.push('Conceda espaço para sugerir novas ideias e explique a visão maior antes de detalhar rotinas.');
    pontosEquilibrio.push('Acompanhar prazos e etapas finais para transformar boas ideias em entregas concluídas.');
  }
  if (compDom?.chave === 'gato' || hemisferioDominante?.tipo === 'emocao') {
    recomendacoesLideranca.push('Valorize o relacionamento, dê feedbacks encorajadores e inclua em projetos de equipe.');
    pontosEquilibrio.push('Encorajar posicionamento firme em situações de conflito sem perder a mansidão.');
  }
  if (compDom?.chave === 'lobo' || hemisferioDominante?.tipo === 'razao') {
    recomendacoesLideranca.push('Forneça instruções claras, expectativas bem definidas e reconhecimento pela qualidade entregue.');
    pontosEquilibrio.push('Estimular flexibilidade diante de mudanças de última hora e priorizar pessoas acima da rigidez.');
  }
  if (compDom?.chave === 'tubarao' || eixoAcaoDominante?.tipo === 'atuante') {
    recomendacoesLideranca.push('Confie missões práticas com metas objetivas e autonomia para resolver desafios.');
    pontosEquilibrio.push('Incentivar a delegação de tarefas, trabalho colaborativo e planejamento antes de agir.');
  }

  if (tempDom?.chave === 'colerico' && !pontosEquilibrio.some((p) => p.includes('delegação'))) {
    pontosEquilibrio.push('Cultivar paciência com ritmos diferentes na equipe e ouvir antes de decidir.');
  }
  if (tempDom?.chave === 'melancolico') {
    recomendacoesLideranca.push('Dê tempo para preparo prévio e reconheça sua dedicação aos detalhes e à excelência.');
  }
  if (tempDom?.chave === 'sanguineo') {
    pontosEquilibrio.push('Apoiar com checklists simples e metas curtas para manter constância nos compromissos.');
  }
  if (tempDom?.chave === 'fleumatico') {
    recomendacoesLideranca.push('Convide diretamente para assumir responsabilidades — costuma servir com grande fidelidade quando desafiado com carinho.');
  }

  return {
    fontesAtivas: [
      temComportamental && 'Perfil Comportamental',
      temTemperamento && 'Personalidade (Temperamentos)',
      temCerebral && 'Atividade Cerebral',
    ].filter(Boolean),
    tituloSintese,
    paragrafosSintese,
    hemisferioDominante,
    eixoAcaoDominante,
    aptidoesRanqueadas,
    recomendacoesLideranca: recomendacoesLideranca.slice(0, 3),
    pontosEquilibrio: pontosEquilibrio.slice(0, 3),
  };
}
