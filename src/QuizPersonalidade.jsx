import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// ── SVG Icons ──────────────────────────────────────────────────────────────
const IconBrain = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2a2.5 2.5 0 0 1 5 0v.5a2.5 2.5 0 0 1-5 0V2z"/>
    <path d="M14.5 3.5A5.5 5.5 0 0 1 20 9c0 1.7-.8 3.2-2 4.2V20a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-6.8A5.5 5.5 0 0 1 4 9a5.5 5.5 0 0 1 5.5-5.5"/>
    <path d="M12 10v4M10 12h4"/>
  </svg>
);

const IconFire = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c0 0-4 4-4 8a4 4 0 0 0 8 0c0-1.5-.5-3-1.5-4.5C14 7 13.5 9 12 9c-1 0-2-1-2-2.5C10 5 11 3.5 12 2z"/>
    <path d="M8.5 14.5A4 4 0 0 0 12 18a4 4 0 0 0 3.5-3.5"/>
    <path d="M12 18v3"/>
  </svg>
);

const IconDetail = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <line x1="9" y1="12" x2="15" y2="12"/>
    <line x1="9" y1="16" x2="13" y2="16"/>
  </svg>
);

const IconSun = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="4"/>
    <line x1="12" y1="20" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="2" y1="12" x2="4" y2="12"/>
    <line x1="20" y1="12" x2="22" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const IconWater = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-5.33 8-6 11-6 13a6 6 0 0 0 12 0c0-2-0.67-5-6-13z"/>
    <line x1="9" y1="16" x2="9" y2="16.01"/>
    <path d="M9 13a3 3 0 0 1 3 3"/>
  </svg>
);

const IconChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="4" height="9" rx="1"/>
    <rect x="10" y="7" width="4" height="14" rx="1"/>
    <rect x="17" y="3" width="4" height="18" rx="1"/>
  </svg>
);

const IconStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconCross = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
  </svg>
);

const IconRefresh = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────
export const questions = [
  { id: 1, text: "Gosto de liderar quando surge uma tarefa importante.", temperament: "colerico" },
  { id: 2, text: "Costumo tomar decisões rapidamente.", temperament: "colerico" },
  { id: 3, text: "Sinto-me motivado por desafios difíceis.", temperament: "colerico" },
  { id: 4, text: "Prefiro agir do que esperar.", temperament: "colerico" },
  { id: 5, text: "Sou competitivo e gosto de alcançar resultados.", temperament: "colerico" },
  { id: 6, text: "Tenho facilidade para assumir responsabilidades.", temperament: "colerico" },
  { id: 7, text: "Costumo ser direto ao expressar minhas opiniões.", temperament: "colerico" },
  { id: 8, text: "Analiso cuidadosamente as consequências antes de decidir.", temperament: "melancolico" },
  { id: 9, text: "Sou atento aos detalhes.", temperament: "melancolico" },
  { id: 10, text: "Gosto de planejamento e organização.", temperament: "melancolico" },
  { id: 11, text: "Tenho padrões elevados para meu trabalho.", temperament: "melancolico" },
  { id: 12, text: "Costumo refletir profundamente sobre as situações.", temperament: "melancolico" },
  { id: 13, text: "Prefiro qualidade em vez de rapidez.", temperament: "melancolico" },
  { id: 14, text: "Tenho facilidade para perceber erros ou melhorias.", temperament: "melancolico" },
  { id: 15, text: "Faço amizades com facilidade.", temperament: "sanguineo" },
  { id: 16, text: "Gosto de conhecer pessoas novas.", temperament: "sanguineo" },
  { id: 17, text: "Costumo animar ambientes e grupos.", temperament: "sanguineo" },
  { id: 18, text: "Sou espontâneo e comunicativo.", temperament: "sanguineo" },
  { id: 19, text: "Gosto de compartilhar experiências com outras pessoas.", temperament: "sanguineo" },
  { id: 20, text: "Falo com facilidade em público.", temperament: "sanguineo" },
  { id: 21, text: "Tenho entusiasmo para iniciar novos projetos.", temperament: "sanguineo" },
  { id: 22, text: "Mantenho a calma mesmo sob pressão.", temperament: "fleumatico" },
  { id: 23, text: "Evito conflitos desnecessários.", temperament: "fleumatico" },
  { id: 24, text: "Tenho facilidade para ouvir as pessoas.", temperament: "fleumatico" },
  { id: 25, text: "Sou paciente com o ritmo dos outros.", temperament: "fleumatico" },
  { id: 26, text: "Prefiro ambientes harmoniosos.", temperament: "fleumatico" },
  { id: 27, text: "Costumo agir com equilíbrio emocional.", temperament: "fleumatico" },
  { id: 28, text: "As pessoas me consideram alguém confiável e estável.", temperament: "fleumatico" },
];

const options = [
  { value: 1, label: "Discordo totalmente" },
  { value: 2, label: "Discordo" },
  { value: 3, label: "Neutro" },
  { value: 4, label: "Concordo" },
  { value: 5, label: "Concordo totalmente" },
];

export const profiles = {
  colerico: {
    title: "Colérico",
    icon: IconFire,
    color: "#dc2626",
    colorDark: "#f87171",
    bgLight: "#fef2f2",
    bgDark: "rgba(220, 38, 38, 0.12)",
    borderLight: "#fecaca",
    borderDark: "rgba(220, 38, 38, 0.35)",
    strengths: ["Liderança", "Determinação", "Coragem", "Iniciativa"],
    weaknesses: ["Impaciência", "Autoritarismo", "Dificuldade em ouvir"],
    ministry: ["Supervisor", "Líder de célula", "Coordenador", "Gestão ministerial"]
  },
  melancolico: {
    title: "Melancólico",
    icon: IconDetail,
    color: "#7c3aed",
    colorDark: "#c084fc",
    bgLight: "#f5f3ff",
    bgDark: "rgba(124, 58, 237, 0.12)",
    borderLight: "#ddd6fe",
    borderDark: "rgba(124, 58, 237, 0.35)",
    strengths: ["Organização", "Planejamento", "Excelência", "Responsabilidade"],
    weaknesses: ["Perfeccionismo", "Autocrítica excessiva", "Rigidez"],
    ministry: ["Secretaria", "Ensino", "Intercessão", "Administração"]
  },
  sanguineo: {
    title: "Sanguíneo",
    icon: IconSun,
    color: "#d97706",
    colorDark: "#fbbf24",
    bgLight: "#fffbeb",
    bgDark: "rgba(217, 119, 6, 0.12)",
    borderLight: "#fde68a",
    borderDark: "rgba(217, 119, 6, 0.35)",
    strengths: ["Comunicação", "Entusiasmo", "Relacionamento", "Motivação"],
    weaknesses: ["Distração", "Impulsividade", "Inconstância"],
    ministry: ["Evangelismo", "Recepção", "Eventos", "Consolidação"]
  },
  fleumatico: {
    title: "Fleumático",
    icon: IconWater,
    color: "#0891b2",
    colorDark: "#22d3ee",
    bgLight: "#ecfeff",
    bgDark: "rgba(8, 145, 178, 0.12)",
    borderLight: "#a5f3fc",
    borderDark: "rgba(8, 145, 178, 0.35)",
    strengths: ["Paciência", "Equilíbrio", "Empatia", "Confiabilidade"],
    weaknesses: ["Passividade", "Indecisão", "Resistência a mudanças"],
    ministry: ["Acompanhamento", "Discipulado", "Cuidado pastoral", "Conselhamento"]
  },
};

const chartColors = {
  colerico: "#dc2626",
  melancolico: "#7c3aed",
  sanguineo: "#d97706",
  fleumatico: "#0891b2",
};

const chartColorsDark = {
  colerico: "#f87171",
  melancolico: "#c084fc",
  sanguineo: "#fbbf24",
  fleumatico: "#22d3ee",
};

const temperamentLabels = {
  colerico: "Colérico",
  melancolico: "Melancólico",
  sanguineo: "Sanguíneo",
  fleumatico: "Fleumático",
};

// ── Subcomponents ──────────────────────────────────────────────────────────
function OptionPill({ value, label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
        selected
          ? 'font-bold bg-blue-700 dark:bg-blue-600 text-white border border-blue-700 dark:border-blue-500 shadow-sm'
          : 'font-medium bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full shrink-0 transition-all ${
          selected
            ? 'bg-white border-2 border-white/60'
            : 'bg-transparent border border-slate-400 dark:border-slate-500'
        }`}
      />
      {label}
    </button>
  );
}

function QuestionCard({ question, answer, onChange }) {
  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 transition-all duration-200 border ${
        answer
          ? 'bg-white dark:bg-slate-900 border-blue-200 dark:border-blue-900/60 shadow-xs ring-1 ring-blue-500/10 dark:ring-blue-500/20'
          : 'bg-white dark:bg-slate-900/70 border-slate-150 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700'
      }`}
    >
      <p className="text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-200 mb-3 leading-relaxed flex items-start gap-2">
        <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px] shrink-0 mt-0.5">#{question.id}</span>
        <span className="flex-1">{question.text}</span>
      </p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {options.map(opt => (
          <OptionPill
            key={opt.value}
            value={opt.value}
            label={opt.label}
            selected={answer === opt.value}
            onClick={() => onChange(question.id, opt.value)}
          />
        ))}
      </div>
    </div>
  );
}

function ResultProfileCard({ item, rank, isDark }) {
  const profile = profiles[item.key];
  const Icon = profile.icon;
  const isPrimary = rank === 0;

  const activeColor = isDark ? profile.colorDark : profile.color;
  const cardBg = isPrimary 
    ? (isDark ? profile.bgDark : profile.bgLight)
    : (isDark ? '#0b1329' : '#f8fafc');
  const cardBorder = isPrimary
    ? (isDark ? profile.borderDark : profile.borderLight)
    : (isDark ? '#1e293b' : '#e2e8f0');

  return (
    <div
      className="rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-all duration-200"
      style={{
        background: cardBg,
        border: `${isPrimary ? 2 : 1}px solid ${cardBorder}`,
      }}
    >
      {isPrimary && (
        <span
          className="absolute top-3 right-3 text-[10px] font-black tracking-wider uppercase rounded-full px-2.5 py-0.5 shadow-xs"
          style={{
            color: activeColor,
            background: isDark ? '#17223b' : '#ffffff',
            border: `1px solid ${cardBorder}`,
          }}
        >
          DOMINANTE
        </span>
      )}

      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
          style={{
            background: isDark ? '#17223b' : '#ffffff',
            border: `1.5px solid ${cardBorder}`,
            color: activeColor,
          }}
        >
          <Icon />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100 m-0 leading-tight">
            {profile.title}
          </p>
          <p className="text-xl font-extrabold m-0 leading-tight" style={{ color: activeColor }}>
            {item.valor}%
          </p>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mb-3.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${item.valor}%`,
            background: activeColor,
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <div className="bg-white/60 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-150/60 dark:border-slate-800/60">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1 flex items-center gap-1.5">
            <IconStar /> <span>Pontos fortes</span>
          </p>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium m-0">
            {profile.strengths.join(' · ')}
          </p>
        </div>

        <div className="bg-white/60 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-150/60 dark:border-slate-800/60">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1 flex items-center gap-1.5">
            <IconCross /> <span>Ministérios</span>
          </p>
          <p className="text-[11px] text-slate-700 dark:text-slate-200 font-bold leading-relaxed m-0">
            {profile.ministry.join(' · ')}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function QuizPersonalidade({ usuarioLogado }) {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Monitoramento do tema escuro
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const checkTheme = () => {
      if (typeof document !== 'undefined') {
        setIsDark(document.documentElement.classList.contains('dark'));
      }
    };
    checkTheme();
    window.addEventListener('mib-theme-changed', checkTheme);
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener('mib-theme-changed', checkTheme);
      observer.disconnect();
    };
  }, []);

  const handleAnswer = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const resultSummary = useMemo(() => {
    const scores = { colerico: 0, melancolico: 0, sanguineo: 0, fleumatico: 0 };
    Object.keys(answers).forEach(qId => {
      const q = questions.find(item => item.id === parseInt(qId));
      if (q) scores[q.temperament] += answers[qId];
    });
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return {
      scores,
      dominant: sorted[0][0],
      secondary: sorted[1][0],
      percentages: {
        colerico:    Math.round((scores.colerico    / 35) * 100),
        melancolico: Math.round((scores.melancolico / 35) * 100),
        sanguineo:   Math.round((scores.sanguineo   / 35) * 100),
        fleumatico:  Math.round((scores.fleumatico  / 35) * 100),
      }
    };
  }, [answers]);

  const isComplete = Object.keys(answers).length === questions.length;
  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);

  async function handleSalvarResultado() {
    setSaveError(null);
    setSaveSuccess(false);

    let userId = usuarioLogado?.id;

    // Fallback: se o id não veio por prop, tenta pegar direto do Supabase
    if (!userId) {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id;
    }

    if (!userId) {
      setSaveError("Erro: ID do usuário não localizado. Tente sair e entrar novamente.");
      return;
    }

    setSalvando(true);
    try {
      const { error } = await supabase.from('personality_tests').insert([{
        member_id:    userId,
        colerico:     resultSummary.scores.colerico,
        melancolico:  resultSummary.scores.melancolico,
        sanguineo:    resultSummary.scores.sanguineo,
        fleumatico:   resultSummary.scores.fleumatico,
        dominant:     resultSummary.dominant,
        secondary:    resultSummary.secondary
      }]);
      if (error) throw error;
      setSaveSuccess(true);
    } catch (err) {
      console.error('Erro ao salvar resultado:', err.message);
      setSaveError('Não foi possível salvar o resultado no banco.');
    } finally {
      setSalvando(false);
    }
  }

  function handleFinalizarTeste() {
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRefazer() {
    setAnswers({});
    setShowResult(false);
    setSaveError(null);
    setSaveSuccess(false);
  }

  const chartData = Object.entries(resultSummary.percentages).map(([key, valor]) => ({
    nome: temperamentLabels[key], valor, key
  }));
  const sortedChart = [...chartData].sort((a, b) => b.valor - a.valor);

  // ── RESULT VIEW ────────────────────────────────────────────────────────
  if (showResult) {
    return (
      <div className="quiz-temperamento-container mx-[-3px] sm:mx-auto px-0 w-full max-w-[760px] animate-in fade-in duration-300">
        {/* Header */}
        <div className="mx-[3px] sm:mx-0 p-6 sm:p-7 rounded-[22px] mb-5 text-white relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 border border-blue-700/40 dark:border-blue-900/50 shadow-md">
          <div className="absolute -right-5 -top-5 opacity-10 pointer-events-none">
            <IconBrain />
          </div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="text-blue-300 dark:text-blue-400"><IconBrain /></div>
            <p className="m-0 text-[11px] font-black uppercase tracking-wider text-blue-200 dark:text-blue-400">
              Resultado do Perfil
            </p>
          </div>
          <h1 className="m-0 mb-1 text-xl sm:text-2xl font-black text-white tracking-tight">
            Seu Temperamento Dominante
          </h1>
          <p className="m-0 text-xs sm:text-sm text-blue-100 dark:text-blue-200 font-medium">
            {profiles[resultSummary.dominant].title} · Secundário: {profiles[resultSummary.secondary].title}
          </p>

          {saveSuccess && (
            <div className="mt-3.5 bg-emerald-500/20 dark:bg-emerald-950/60 border border-emerald-400/40 dark:border-emerald-800/80 rounded-xl p-2.5 px-3.5 text-xs text-emerald-200 flex items-center gap-2">
              <span>✓</span> <span>Resultado salvo com sucesso no seu perfil!</span>
            </div>
          )}
          {saveError && (
            <div className="mt-3.5 bg-red-500/20 dark:bg-red-950/60 border border-red-400/40 dark:border-red-800/80 rounded-xl p-2.5 px-3.5 text-xs text-red-200">
              ⚠ {saveError}
            </div>
          )}
          {salvando && (
            <div className="mt-3.5 text-xs text-blue-200 animate-pulse">
              Processando...
            </div>
          )}
        </div>

        {/* Botão de Salvar no Supabase */}
        {!saveSuccess && (
          <button
            onClick={handleSalvarResultado}
            disabled={salvando}
            className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 dark:from-teal-700 dark:to-cyan-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-4 cursor-pointer shadow-lg shadow-teal-500/20 active:scale-98 transition"
          >
            {salvando ? 'Salvando...' : '💾 Salvar Resultado no meu Perfil'}
          </button>
        )}

        {/* Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 mb-4 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-blue-600 dark:text-blue-400"><IconChart /></div>
            <p className="m-0 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
              Distribuição dos Temperamentos
            </p>
          </div>
          <div className="h-52 min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={150}>
              <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <XAxis dataKey="nome" tick={{ fontSize: 11, fontWeight: 600, fill: isDark ? '#94a3b8' : '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  cursor={{ fill: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}
                  contentStyle={{
                    borderRadius: 12,
                    border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                    background: isDark ? '#0f172a' : '#ffffff',
                    color: isDark ? '#f8fafc' : '#1e293b',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                    fontSize: 12
                  }}
                  formatter={(value) => [`${value}%`, 'Pontuação']}
                />
                <Bar dataKey="valor" radius={[8, 8, 0, 0]} barSize={44}>
                  {chartData.map((entry) => (
                    <Cell key={entry.key} fill={isDark ? chartColorsDark[entry.key] : chartColors[entry.key]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profile Cards */}
        <div className="flex flex-col gap-3 mb-5">
          {sortedChart.map((item, idx) => (
            <ResultProfileCard key={item.key} item={item} rank={idx} isDark={isDark} />
          ))}
        </div>

        {/* Refazer */}
        <button
          onClick={handleRefazer}
          className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer active:scale-98 shadow-xs"
        >
          <IconRefresh />
          <span>Refazer o Teste</span>
        </button>
      </div>
    );
  }

  // ── QUIZ VIEW ──────────────────────────────────────────────────────────
  return (
    <div className="quiz-temperamento-container mx-[-3px] sm:mx-auto px-0 w-full max-w-[680px] animate-in fade-in duration-300">
      {/* Header Card */}
      <div className="mx-[3px] sm:mx-0 p-6 sm:p-7 rounded-[22px] mb-6 text-white bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 border border-blue-700/40 dark:border-blue-900/50 shadow-md">
        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-11 h-11 rounded-xl bg-white/15 dark:bg-blue-600/30 text-white dark:text-blue-300 border border-white/20 dark:border-blue-500/30 flex items-center justify-center shrink-0">
            <IconBrain />
          </div>
          <div>
            <h1 className="m-0 text-lg sm:text-xl font-black text-white tracking-tight">Teste de Temperamento</h1>
            <p className="m-0 text-xs text-blue-200 dark:text-blue-300">Descubra seu perfil comportamental</p>
          </div>
        </div>

        <p className="my-3 text-xs sm:text-[13px] text-blue-100 dark:text-slate-300 leading-relaxed font-medium">
          Responda sendo o mais sincero possível sobre quem você <em>realmente</em> é.
        </p>

        {/* Progress Bar */}
        <div className="bg-white/20 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden mb-1.5">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="m-0 text-[10px] text-white/70 dark:text-slate-400 font-semibold text-right tracking-wider">
          {Object.keys(answers).length}/{questions.length} · {progress}% concluído
        </p>
      </div>

      {/* Lista de Perguntas */}
      <div className="flex flex-col gap-3 mb-6">
        {questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            answer={answers[q.id]}
            onChange={handleAnswer}
          />
        ))}
      </div>

      {/* Submit Card */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 mt-2 flex flex-col items-center gap-3 text-center shadow-xs">
        {!isComplete && (
          <p className="m-0 text-[11px] font-bold text-red-500 dark:text-red-400 tracking-wider uppercase">
            Responda todas as {questions.length} perguntas para continuar
          </p>
        )}
        <button
          disabled={!isComplete || salvando}
          onClick={handleFinalizarTeste}
          className={`w-full py-3.5 px-5 rounded-2xl font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition active:scale-98 ${
            isComplete
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 cursor-pointer'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-300/50 dark:border-slate-700/50'
          }`}
        >
          <IconChart />
          <span>{salvando ? 'Salvando perfil…' : 'Ver meu perfil comportamental'}</span>
        </button>
      </div>
    </div>
  );
}
