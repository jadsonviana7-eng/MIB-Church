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
} from 'lucide-react';

// ── 25 Questões Oficiais (Avaliação de Perfil Comportamental — IBC / Ned Herrmann) ──
const QUESTOES = [
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
];

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
  const [questaoIdx, setQuestaoIdx] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [pessoaAlvoId, setPessoaAlvoId] = useState(() => membroLogado?.id || '');
  const [buscaMembro, setBuscaMembro] = useState('');
  const [resultadoAtual, setResultadoAtual] = useState(null);
  const [abaPerfilDetalhe, setAbaPerfilDetalhe] = useState('I');
  const [salvando, setSalvando] = useState(false);
  const [statusSalvamento, setStatusSalvamento] = useState(null); // { tipo: 'sucesso' | 'erro', msg }

  useEffect(() => {
    if (!pessoaAlvoId && membroLogado?.id) {
      setPessoaAlvoId(membroLogado.id);
    }
  }, [membroLogado?.id, pessoaAlvoId]);

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
  const progressoPct = Math.round((totalRespondidas / QUESTOES.length) * 100);
  const questaoAtual = QUESTOES[questaoIdx];

  const salvarNoPerfilDoMembro = async (res, targetId = pessoaAlvo?.id) => {
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

      setStatusSalvamento({
        tipo: 'sucesso',
        msg: `Resultado salvo na ficha de ${pessoaAlvo?.nome || 'membro'} (Informações Adicionais → Perfil Comportamental e Atividade Cerebral).`,
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
    setRespostas({});
    setQuestaoIdx(0);
    setResultadoAtual(null);
    setStatusSalvamento(null);
    setEtapa('teste');
  };

  const selecionarOpcao = (questaoId, tipo) => {
    const novasRespostas = { ...respostas, [questaoId]: tipo };
    setRespostas(novasRespostas);

    // Avança automaticamente se ainda houver próxima questão
    if (questaoIdx < QUESTOES.length - 1) {
      setTimeout(() => {
        setQuestaoIdx((prev) => Math.min(prev + 1, QUESTOES.length - 1));
      }, 180);
    }
  };

  const finalizarTeste = async () => {
    if (totalRespondidas < QUESTOES.length) {
      const primeiraSemResposta = QUESTOES.findIndex((q) => !respostas[q.id]);
      if (primeiraSemResposta !== -1) setQuestaoIdx(primeiraSemResposta);
      return;
    }
    const res = calcularResultadoPorRespostas(respostas);
    setResultadoAtual(res);
    setAbaPerfilDetalhe(res.dominante.codigo);
    setEtapa('resultado');
    if (pessoaAlvo?.id) {
      await salvarNoPerfilDoMembro(res, pessoaAlvo.id);
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
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>📋 25 questões</span>
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
        </div>
      )}

      {/* ── ETAPA 2: QUESTIONÁRIO INTERATIVO (25 QUESTÕES) ── */}
      {etapa === 'teste' && questaoAtual && (
        <div className="space-y-5">
          {/* Barra de Progresso */}
          <Card className="p-4 sm:p-5 bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] space-y-3">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
                Questão {questaoAtual.id} de {QUESTOES.length}
              </span>
              <span className="font-extrabold text-blue-600 dark:text-blue-400">
                {totalRespondidas}/{QUESTOES.length} respondidas ({progressoPct}%)
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-300"
                style={{ width: `${progressoPct}%` }}
              />
            </div>

            {/* Navegação rápida entre as 25 questões */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {QUESTOES.map((q, idx) => {
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
                    title={`Ir para questão ${q.id}`}
                  >
                    {q.id}
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
                {questaoAtual.id}. {questaoAtual.pergunta}
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

              {questaoIdx < QUESTOES.length - 1 ? (
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
                  disabled={totalRespondidas < QUESTOES.length}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                    totalRespondidas === QUESTOES.length
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/25'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 size={16} />
                  {totalRespondidas === QUESTOES.length
                    ? 'Finalizar e Salvar Resultado'
                    : `Faltam ${QUESTOES.length - totalRespondidas} questões`}
                </button>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* ── ETAPA 3: RELATÓRIO COMPLETO DE RESULTADOS ── */}
      {etapa === 'resultado' && resultadoAtual && (
        <div className="space-y-6">
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
          <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${resultadoAtual.dominante.corGrad} p-6 sm:p-8 text-white shadow-xl`}>
            <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-white/15 blur-3xl pointer-events-none" />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-5xl shadow-lg shrink-0">
                  {resultadoAtual.dominante.emoji}
                </div>
                <div>
                  <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] bg-black/20 px-3 py-1 rounded-full mb-2">
                    Perfil Dominante • {resultadoAtual.dominante.lema}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-none">
                    {resultadoAtual.dominante.nome} ({resultadoAtual.dominante.percentual}%)
                  </h2>
                  <p className="text-xs sm:text-sm text-white/90 font-semibold mt-1.5">
                    Perfil Secundário: {resultadoAtual.secundario.emoji} <strong>{resultadoAtual.secundario.nome}</strong> ({resultadoAtual.secundario.percentual}%)
                    {pessoaAlvo?.nome ? ` • ${pessoaAlvo.nome}` : ''}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 print:hidden">
                <button
                  type="button"
                  onClick={() => window.print()}
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {resultadoAtual.ranking.map((item, idx) => (
              <Card
                key={item.codigo}
                onClick={() => setAbaPerfilDetalhe(item.codigo)}
                className={`p-4 bg-white dark:bg-[#17223b] border transition-all cursor-pointer ${
                  idx === 0
                    ? 'border-blue-400/70 dark:border-blue-500/60 ring-2 ring-blue-500/15'
                    : 'border-slate-200/80 dark:border-[#2b3954] hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {idx + 1}º lugar
                  </span>
                </div>
                <p className="text-sm font-black text-slate-800 dark:text-slate-100 mt-2">{item.nome}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.eixo}</p>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-2xl font-black" style={{ color: item.cor }}>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Barras / Radar */}
            <Card className="p-5 bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                  Gráfico de Perfil Comportamental
                </h3>
                <p className="text-xs text-slate-400">Distribuição percentual entre os 4 arquétipos (soma = 100%)</p>
              </div>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={dadosRadar}>
                    <PolarGrid stroke="#64748b44" />
                    <PolarAngleAxis dataKey="perfil" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                    <Radar name="Perfil (%)" dataKey="valor" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.35} strokeWidth={2.5} />
                    <Tooltip formatter={(val) => [`${val}%`, 'Percentual']} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-36 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosGraficoBarras} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="nome" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(val) => [`${val}%`, 'Percentual']} />
                    <Bar dataKey="valor" radius={[8, 8, 0, 0]} maxBarSize={44}>
                      {dadosGraficoBarras.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.cor} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Mapa de Atividade Cerebral (Ned Herrmann — PDF pág. 11) */}
            <Card className="p-5 bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] flex flex-col justify-between space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Brain size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                    Atividade / Dominância Cerebral
                  </h3>
                  <p className="text-xs text-slate-400">
                    Quadrantes salvos em <strong>Detalhes do Membro → Atividade Cerebral</strong>
                  </p>
                </div>
              </div>

              {/* Cruz de Dominância Cerebral */}
              <div className="flex flex-col items-center justify-center gap-3 py-2">
                {/* Topo: Pensante (Anterior = O + I) */}
                <div className="w-full max-w-[220px] p-3.5 rounded-2xl border border-blue-200 dark:border-blue-800/60 bg-blue-50/70 dark:bg-blue-950/40 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 dark:text-blue-300 block">
                    🧠 Pensante (Anterior • O+I)
                  </span>
                  <span className="text-2xl font-black text-blue-700 dark:text-blue-300 mt-1 block">
                    {resultadoAtual.pensante}%
                  </span>
                </div>

                {/* Meio: Razão (Esquerdo = A + O) e Emoção (Direito = I + C) */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/40 text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-300 block">
                      ⚖️ Razão (Esq. • A+O)
                    </span>
                    <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1 block">
                      {resultadoAtual.razao}%
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/70 dark:bg-rose-950/40 text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-rose-700 dark:text-rose-300 block">
                      ❤️ Emoção (Dir. • I+C)
                    </span>
                    <span className="text-2xl font-black text-rose-700 dark:text-rose-300 mt-1 block">
                      {resultadoAtual.emocao}%
                    </span>
                  </div>
                </div>

                {/* Base: Atuante (Posterior = C + A) */}
                <div className="w-full max-w-[220px] p-3.5 rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/40 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-300 block">
                    💪 Atuante (Posterior • C+A)
                  </span>
                  <span className="text-2xl font-black text-amber-700 dark:text-amber-300 mt-1 block">
                    {resultadoAtual.atuante}%
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Síntese da Dominância:</strong> Predominância{' '}
                <strong className="text-blue-600 dark:text-blue-400">
                  {resultadoAtual.emocao >= resultadoAtual.razao ? 'Emocional (Hemisfério Direito)' : 'Racional (Hemisfério Esquerdo)'}
                </strong>{' '}
                e perfil{' '}
                <strong className="text-indigo-600 dark:text-indigo-400">
                  {resultadoAtual.pensante >= resultadoAtual.atuante ? 'Pensante (Anterior)' : 'Atuante (Posterior)'}
                </strong>.
              </div>
            </Card>
          </div>

          {/* Detalhamento Completo dos Perfis (Conteúdo completo do PDF) */}
          <Card className="p-5 sm:p-6 bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-[#2b3954] pb-4">
              <div>
                <h3 className="text-base font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">
                  Entenda seu Perfil Comportamental
                </h3>
                <p className="text-xs text-slate-400">Selecione um arquétipo abaixo para ver comportamentos, pontos fortes, melhorias, motivações e valores.</p>
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

            <div className="space-y-5">
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

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {detalhePerfilSelecionado.descricaoCompleta}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
                  <h5 className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-400">
                    Comportamentos
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 list-disc pl-4">
                    {detalhePerfilSelecionado.comportamentos.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50 space-y-2">
                  <h5 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Pontos Fortes
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-200 list-disc pl-4">
                    {detalhePerfilSelecionado.pontosFortes.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/50 space-y-2">
                  <h5 className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Pontos de Melhoria
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-200 list-disc pl-4">
                    {detalhePerfilSelecionado.pontosMelhoria.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/50 space-y-2">
                  <h5 className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                    Motivações
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-200 list-disc pl-4">
                    {detalhePerfilSelecionado.motivacoes.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1e3a8a]/10 to-indigo-500/10 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200/60 dark:border-blue-800/50">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 dark:text-blue-300 block">
                  Valores Principais
                </span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">
                  {detalhePerfilSelecionado.valores}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
