import React, { useState, useMemo } from 'react';
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
  colerico:   { title: "Colérico",   icon: IconFire,   color: "#dc2626", bg: "#fef2f2", border: "#fecaca", strengths: ["Liderança", "Determinação", "Coragem", "Iniciativa"], weaknesses: ["Impaciência", "Autoritarismo", "Dificuldade em ouvir"], ministry: ["Supervisor", "Líder de célula", "Coordenador", "Gestão ministerial"] },
  melancolico:{ title: "Melancólico",icon: IconDetail, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", strengths: ["Organização", "Planejamento", "Excelência", "Responsabilidade"], weaknesses: ["Perfeccionismo", "Autocrítica excessiva", "Rigidez"], ministry: ["Secretaria", "Ensino", "Intercessão", "Administração"] },
  sanguineo:  { title: "Sanguíneo",  icon: IconSun,    color: "#d97706", bg: "#fffbeb", border: "#fde68a", strengths: ["Comunicação", "Entusiasmo", "Relacionamento", "Motivação"], weaknesses: ["Distração", "Impulsividade", "Inconstância"], ministry: ["Evangelismo", "Recepção", "Eventos", "Consolidação"] },
  fleumatico: { title: "Fleumático", icon: IconWater,  color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", strengths: ["Paciência", "Equilíbrio", "Empatia", "Confiabilidade"], weaknesses: ["Passividade", "Indecisão", "Resistência a mudanças"], ministry: ["Acompanhamento", "Discipulado", "Cuidado pastoral", "Conselhamento"] },
};

const chartColors = {
  colerico: "#dc2626",
  melancolico: "#7c3aed",
  sanguineo: "#d97706",
  fleumatico: "#0891b2",
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
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '5px 12px',
        borderRadius: '999px',
        fontSize: '11px',
        fontWeight: selected ? '700' : '500',
        border: selected ? '1.5px solid #1e3a8a' : '1px solid #e2e8f0',
        background: selected ? '#1e3a8a' : '#f8fafc',
        color: selected ? '#fff' : '#64748b',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        border: selected ? '2px solid rgba(255,255,255,0.6)' : '1.5px solid #cbd5e1',
        background: selected ? '#fff' : 'transparent',
        flexShrink: 0,
        transition: 'all 0.15s',
      }} />
      {label}
    </button>
  );
}

function QuestionCard({ question, answer, onChange }) {
  return (
    <div style={{
      background: '#fff',
      border: answer ? '1.5px solid #c7d2fe' : '1px solid #f1f5f9',
      borderRadius: 14,
      padding: '16px 18px',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxShadow: answer ? '0 2px 8px rgba(30,58,138,0.06)' : 'none',
    }}>
      <p style={{
        fontSize: 13,
        fontWeight: 600,
        color: '#334155',
        margin: '0 0 12px 0',
        lineHeight: 1.55,
        display: 'flex',
        gap: 8,
      }}>
        <span style={{ color: '#94a3b8', fontWeight: 400, flexShrink: 0 }}>#{question.id}</span>
        {question.text}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
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

function ResultProfileCard({ item, rank }) {
  const profile = profiles[item.key];
  const Icon = profile.icon;
  const isPrimary = rank === 0;

  return (
    <div style={{
      background: isPrimary ? profile.bg : '#f8fafc',
      border: `${isPrimary ? 2 : 1}px solid ${isPrimary ? profile.border : '#e2e8f0'}`,
      borderRadius: 16,
      padding: '18px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {isPrimary && (
        <span style={{
          position: 'absolute', top: 12, right: 14,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
          color: profile.color, background: '#fff',
          border: `1px solid ${profile.border}`,
          borderRadius: 999, padding: '3px 10px',
        }}>DOMINANTE</span>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9,
          background: '#fff',
          border: `1.5px solid ${profile.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: profile.color,
        }}>
          <Icon />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{profile.title}</p>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: profile.color }}>{item.valor}%</p>
        </div>
      </div>

      {/* progress bar */}
      <div style={{ height: 5, background: '#e2e8f0', borderRadius: 99, marginBottom: 14, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${item.valor}%`,
          background: profile.color,
          borderRadius: 99,
          transition: 'width 0.8s ease',
        }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 9, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
            <IconStar /> Pontos fortes
          </p>
          <p style={{ margin: 0, fontSize: 11, color: '#475569', lineHeight: 1.6 }}>
            {profile.strengths.join(' · ')}
          </p>
        </div>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 9, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
            <IconCross /> Ministérios
          </p>
          <p style={{ margin: 0, fontSize: 11, color: '#475569', fontWeight: 600, lineHeight: 1.6 }}>
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
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
          borderRadius: 20,
          padding: '28px 28px 24px',
          marginBottom: 20,
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -20, top: -20, opacity: 0.06 }}>
            <IconBrain />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ color: '#93c5fd' }}><IconBrain /></div>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#93c5fd', textTransform: 'uppercase' }}>
              Resultado do Perfil
            </p>
          </div>
          <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 800, color: '#fff' }}>
            Seu Temperamento Dominante
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: '#bfdbfe', fontWeight: 500 }}>
            {profiles[resultSummary.dominant].title} · Secundário: {profiles[resultSummary.secondary].title}
          </p>

          {saveSuccess && (
            <div style={{ marginTop: 14, background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '8px 14px', fontSize: 12, color: '#d1fae5', display: 'flex', alignItems: 'center', gap: 6 }}>
              ✓ Resultado salvo com sucesso no seu perfil
            </div>
          )}
          {saveError && (
            <div style={{ marginTop: 14, background: 'rgba(239,68,68,0.2)', borderRadius: 10, padding: '8px 14px', fontSize: 12, color: '#fecaca' }}>
              ⚠ {saveError}
            </div>
          )}
          {salvando && (
            <div style={{ marginTop: 14, fontSize: 12, color: '#93c5fd' }}>
              Processando...
            </div>
          )}
        </div>

        {/* Botão de Salvar no Supabase (Solicitado) */}
        {!saveSuccess && (
          <button
            onClick={handleSalvarResultado}
            disabled={salvando}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #055F6D, #0891b2)',
              border: 'none',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 16,
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(5, 95, 109, 0.3)'
            }}
          >
            {salvando ? 'Salvando...' : '💾 Salvar Resultado no meu Perfil'}
          </button>
        )}

        {/* Chart */}
        <div style={{
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: 16,
          padding: '20px 20px 8px',
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ color: '#1e3a8a' }}><IconChart /></div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Distribuição dos Temperamentos</p>
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <XAxis dataKey="nome" tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                  contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: 12 }}
                  formatter={(value) => [`${value}%`, 'Pontuação']}
                />
                <Bar dataKey="valor" radius={[8, 8, 0, 0]} barSize={44}>
                  {chartData.map((entry) => (
                    <Cell key={entry.key} fill={chartColors[entry.key]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profile Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          {sortedChart.map((item, idx) => (
            <ResultProfileCard key={item.key} item={item} rank={idx} />
          ))}
        </div>

        {/* Refazer */}
        <button
          onClick={handleRefazer}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 14,
            background: '#f8fafc',
            border: '1.5px solid #e2e8f0',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 700,
            color: '#475569',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'all 0.15s',
          }}
        >
          <IconRefresh />
          Refazer o Teste
        </button>
      </div>
    );
  }

  // ── QUIZ VIEW ──────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      {/* Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
        borderRadius: 20,
        padding: '28px 28px 22px',
        marginBottom: 24,
        color: '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff',
          }}>
            <IconBrain />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#fff' }}>Teste de Temperamento</h1>
            <p style={{ margin: 0, fontSize: 12, color: '#bfdbfe' }}>Descubra seu perfil comportamental</p>
          </div>
        </div>

        <p style={{ margin: '12px 0 16px', fontSize: 13, color: '#bfdbfe', lineHeight: 1.6 }}>
          Responda sendo o mais sincero possível sobre quem você <em>realmente</em> é.
        </p>

        {/* Progress */}
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 99, height: 6, overflow: 'hidden', marginBottom: 6 }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: '#34d399',
            borderRadius: 99,
            transition: 'width 0.3s ease',
          }} />
        </div>
        <p style={{ margin: 0, fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textAlign: 'right', letterSpacing: '0.05em' }}>
          {Object.keys(answers).length}/{questions.length} · {progress}% concluído
        </p>
      </div>

      {/* Lista de Perguntas Unificada */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
        {questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            answer={answers[q.id]}
            onChange={handleAnswer}
          />
        ))}
      </div>

      {/* Submit */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: '20px',
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}>
        {!isComplete && (
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#ef4444', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Responda todas as {questions.length} perguntas para continuar
          </p>
        )}
        <button
          disabled={!isComplete || salvando}
          onClick={handleFinalizarTeste}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: 14,
            border: 'none',
            background: isComplete ? 'linear-gradient(135deg, #1e3a8a, #1d4ed8)' : '#e2e8f0',
            color: isComplete ? '#fff' : '#94a3b8',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: isComplete ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'all 0.2s',
          }}
        >
          <IconChart />
          {salvando ? 'Salvando perfil…' : 'Ver meu perfil comportamental'}
        </button>
      </div>
    </div>
  );
}
