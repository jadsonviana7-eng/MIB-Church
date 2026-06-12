import { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';

/* ── perfis (usados apenas internamente) ── */
const perfisAcesso = [
  { id: 'admin',       nome: 'Admin',          iniciais: 'AD' },
  { id: 'pastor',      nome: 'Pastor',          iniciais: 'PR' },
  { id: 'lider-celula',nome: 'Líder de Célula', iniciais: 'LC' },
  { id: 'membro',      nome: 'Membro',          iniciais: 'MB' },
  { id: 'secretaria',  nome: 'Secretaria',      iniciais: 'SC' },
  { id: 'tesouraria',  nome: 'Tesouraria',      iniciais: 'TS' },
];

/* ── modos da tela ── */
const MODO = { LOGIN: 'login', ESQUECEU: 'esqueceu', NOVA_SENHA: 'nova_senha' };

/* ──────────────────────────────────────────────── */

export default function TelaLogin({ onEntrar }) {
  const [modo, setModo] = useState(MODO.LOGIN);
  const [email, setEmail]       = useState('');
  const [senha, setSenha]       = useState('');
  const [novaSenha, setNovaSenha]         = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [lembrar, setLembrar]   = useState(true);
  const [erro, setErro]         = useState('');
  const [info, setInfo]         = useState('');
  const [loading, setLoading]   = useState(false);
  const [perfilIdentificado, setPerfilIdentificado] = useState(null);
  const canvasRef = useRef(null);

  /* verificar sessão existente */
  useEffect(() => {
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
          // Busca o perfil real no banco para a sessão ativa
          const { data: pData } = await supabase.from('pessoas')
            .select('permissao')
            .eq('email', session.user.email)
            .maybeSingle();
          const pId = pData?.permissao?.toLowerCase() || 'membro';
          const perfil = perfisAcesso.find(p => p.id === pId) || perfisAcesso.find(p => p.id === 'membro');
          onEntrar({ id: session.user.id, email: session.user.email, perfil, lembrarAcesso: true });
        }
      } catch {
        // Mantem a tela de login disponível quando a sessão não puder ser verificada.
      }
    })();
  }, [onEntrar]);

  /* canvas partículas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const N = 38;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      a: 0.15 + Math.random() * 0.45,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${p.a})`;
        ctx.fill();
      });
      /* linhas */
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(147,197,253,${0.08 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  /* ── buscar perfil real no banco ── */
  async function buscarPerfilNoBanco(emailDigitado) {
    const e = emailDigitado.trim().toLowerCase();
    // Regex simples para validar se o e-mail parece concluído
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!regexEmail.test(e)) {
      setPerfilIdentificado(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('pessoas')
        .select('permissao')
        .eq('email', e)
        .maybeSingle();

      if (data && data.permissao) {
        const pId = data.permissao.toLowerCase();
        const perfil = perfisAcesso.find(x => x.id === pId) || perfisAcesso.find(x => x.id === 'membro');
        setPerfilIdentificado(perfil);
      } else {
        setPerfilIdentificado(null);
      }
    } catch {
      setPerfilIdentificado(null);
    }
  }

  /* ── handlers ── */
  async function handleLogin(e) {
    e.preventDefault();
    if (!email.trim() || !senha.trim()) { setErro('Informe e-mail e senha.'); return; }
    setLoading(true); setErro('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: senha.trim() });
      if (error) { setErro(error.message === 'Invalid login credentials' ? 'E-mail ou senha incorretos.' : error.message); return; }
      if (data?.user) {
        // Ao logar, busca a permissão oficial da tabela pessoas
        const { data: pData } = await supabase.from('pessoas').select('permissao').eq('email', data.user.email).maybeSingle();
        const pId = pData?.permissao?.toLowerCase() || 'membro';
        const perfil = perfisAcesso.find(p => p.id === pId) || perfisAcesso.find(p => p.id === 'membro');
        
        onEntrar({ id: data.user.id, email: data.user.email, perfil, lembrarAcesso: lembrar });
      }
    } catch { setErro('Erro ao conectar. Tente novamente.'); }
    finally { setLoading(false); }
  }

  async function handleEsqueceu(e) {
    e.preventDefault();
    if (!email.trim()) { setErro('Informe seu e-mail.'); return; }
    setLoading(true); setErro(''); setInfo('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin + '/?reset=1',
      });
      if (error) { setErro(error.message); return; }
      setInfo('Enviamos um link de redefinição para o seu e-mail. Verifique também a caixa de spam.');
    } catch { setErro('Erro ao enviar. Tente novamente.'); }
    finally { setLoading(false); }
  }

  async function handleNovaSenha(e) {
    e.preventDefault();
    if (novaSenha.length < 6) { setErro('A senha deve ter ao menos 6 caracteres.'); return; }
    if (novaSenha !== confirmarSenha) { setErro('As senhas não coincidem.'); return; }
    setLoading(true); setErro(''); setInfo('');
    try {
      const { error } = await supabase.auth.updateUser({ password: novaSenha });
      if (error) { setErro(error.message); return; }
      setInfo('Senha atualizada com sucesso! Faça login.');
      setModo(MODO.LOGIN);
    } catch { setErro('Erro ao atualizar. Tente novamente.'); }
    finally { setLoading(false); }
  }

  const mudarModo = (m) => { setModo(m); setErro(''); setInfo(''); };

  /* ── render ── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Nunito:wght@400;600;700;800;900&family=Roboto:wght@400;500;700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .tl-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050d1a;
          font-family: 'Nunito', sans-serif;
          padding: 1rem;
        }
 
        /* ── card principal ── */
        .tl-card {
          width: 100%;
          max-width: 960px;
          display: grid;
          grid-template-columns: 1fr 420px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.06);
          position: relative;
        }
 
        /* ── painel esquerdo ── */
        .tl-left {
          position: relative;
          background: linear-gradient(140deg, #03152e 0%, #061e40 50%, #0a2a5e 100%);
          padding: 2rem 2.5rem; /* Ajuste o primeiro valor (3rem) para aumentar/diminuir o respiro vertical */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          min-height: 400px; /* Altere este valor para definir a altura total do card */
        }
 
        .tl-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
 
        /* ilustração central */
        .tl-illustration {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .tl-illustration svg {
          width: 68%;
          opacity: 0.10;
        }
 
        /* linha de luz horizontal */
        .tl-glow-line {
          position: absolute;
          left: 0; right: 0;
          top: 55%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(96,165,250,.5), transparent);
        }
 
        .tl-badge {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 999px;
          padding: .35rem .9rem;
          font-size: .65rem;
          font-weight: 800;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #93c5fd;
        }
        .tl-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #60a5fa;
          box-shadow: 0 0 6px #60a5fa;
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
 
        .tl-headline {
          position: relative;
          margin-top: auto;
        }
        .tl-headline h1 {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
          letter-spacing: .03em;
        }
        .tl-headline h1 span { color: #60a5fa; }
        .tl-headline p {
          margin-top: .85rem;
          font-size: .82rem;
          color: #94a3b8;
          line-height: 1.7;
          max-width: 340px;
        }
 
        /* versículo */
        .tl-verse {
          position: relative;
          margin-top: 2rem;
          padding: 1rem 1.25rem;
          border-left: 3px solid #2563eb;
          background: rgba(37,99,235,.1);
          border-radius: 0 12px 12px 0;
        }
        .tl-verse q {
          font-size: .78rem;
          font-style: italic;
          color: #bfdbfe;
          line-height: 1.65;
          quotes: none;
        }
        .tl-verse cite {
          display: block;
          margin-top: .5rem;
          font-size: .68rem;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #60a5fa;
        }

        /* logo no topo */
        .tl-logo-wrap {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .tl-logo-img {
          height: 100px;
          object-fit: contain;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,.5));
          position: relative;
          top: -25px;  /* Ajuste para cima: use valores negativos para subir */
          left: 90px; /* Ajuste lateral: negativo para esquerda, positivo para direita */
        }

        /* ── painel direito ── */
        .tl-right {
          background: #ffffff;
          padding: 2.8rem 2.5rem; /* Ajuste o primeiro valor (2.8rem) para alinhar com o lado esquerdo */
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-family: 'Roboto', sans-serif;
        }

        .tl-right-title {
          font-family: 'Roboto', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: .3rem;
        }
        .tl-right-sub {
          font-size: .8rem;
          color: #64748b;
          margin-bottom: 1.8rem;
          line-height: 1.5;
        }

        /* campos */
        .tl-field { margin-bottom: 1rem; }
        .tl-label {
          display: block;
          font-size: .68rem;
          font-weight: 800;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: .4rem;
        }
        .tl-input {
          width: 100%;
          padding: .78rem 1rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: .875rem;
          font-family: 'Roboto', sans-serif;
          color: #334155;
          background: #f8fafc;
          transition: border-color .2s, box-shadow .2s, background .2s;
          outline: none;
        }
        .tl-input:focus {
          border-color: #3b82f6;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(59,130,246,.15);
        }

        /* chip perfil */
        .tl-perfil-chip {
          display: flex;
          align-items: center;
          gap: .6rem;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 10px;
          padding: .6rem .9rem;
          margin-bottom: 1rem;
        }
        .tl-perfil-icon {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: #2563eb;
          color: #fff;
          font-size: .62rem;
          font-weight: 900;
          display: flex; align-items: center; justify-content: center;
          letter-spacing: .04em;
          flex-shrink: 0;
        }
        .tl-perfil-info p:first-child {
          font-size: .65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .1em;
          color: #3b82f6;
        }
        .tl-perfil-info p:last-child {
          font-size: .8rem;
          font-weight: 700;
          color: #1e3a5f;
        }

        /* checkbox */
        .tl-check-row {
          display: flex; align-items: center; gap: .5rem;
          margin-bottom: 1.2rem;
          font-size: .78rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          user-select: none;
        }
        .tl-check-row input { accent-color: #2563eb; width: 15px; height: 15px; cursor: pointer; }

        /* botão principal */
        .tl-btn {
          width: 100%;
          padding: .85rem;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-family: 'Roboto', sans-serif;
          font-size: .875rem;
          font-weight: 900;
          letter-spacing: .04em;
          transition: all .2s;
        }
        .tl-btn-primary {
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          color: #fff;
          box-shadow: 0 4px 16px rgba(37,99,235,.35);
        }
        .tl-btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #1e40af, #1d4ed8);
          box-shadow: 0 6px 20px rgba(37,99,235,.45);
          transform: translateY(-1px);
        }
        .tl-btn-primary:disabled { opacity: .6; cursor: not-allowed; transform: none; }

        /* link */
        .tl-link {
          background: none; border: none; padding: 0;
          font-family: 'Roboto', sans-serif;
          font-size: .78rem;
          font-weight: 700;
          color: #2563eb;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .tl-link:hover { color: #1d4ed8; }

        .tl-actions-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.2rem;
        }

        /* alertas */
        .tl-alert {
          padding: .75rem 1rem;
          border-radius: 10px;
          font-size: .78rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .tl-alert-err  { background: #fff1f2; border: 1px solid #fecdd3; color: #be123c; }
        .tl-alert-info { background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; }

        /* divider */
        .tl-divider {
          text-align: center;
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #94a3b8;
          margin: 1.4rem 0;
          position: relative;
        }
        .tl-divider::before, .tl-divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 38%;
          height: 1px;
          background: #e2e8f0;
        }
        .tl-divider::before { left: 0; }
        .tl-divider::after  { right: 0; }

        /* voltar link */
        .tl-back {
          display: flex; align-items: center; gap: .35rem;
          font-size: .75rem; font-weight: 700; color: #64748b;
          background: none; border: none; cursor: pointer;
          font-family: 'Roboto', sans-serif;
          margin-bottom: 1.4rem;
          padding: 0;
        }
        .tl-back:hover { color: #2563eb; }

        /* responsive */
        @media (max-width: 700px) {
          .tl-root { align-items: flex-start; padding-top: 1rem; }
          .tl-card { grid-template-columns: 1fr; max-width: 450px; }
          .tl-left { min-height: 220px; padding: 3rem 1.5rem; align-items: center; text-align: center; }
          .tl-logo-wrap { justify-content: center; width: 100%; }
          .tl-logo-img { position: static; height: 90px; }
          .tl-headline p { margin: 0.85rem auto 0; }
          .tl-verse { border-left: none; border-top: 3px solid #2563eb; border-radius: 0 0 12px 12px; }
          .tl-right { padding: 3rem 1.5rem; }
          .tl-headline h1 { font-size: 1.3rem; }
          .tl-right-title, .tl-right-sub { text-align: center; }
          .tl-actions-row { flex-direction: column; gap: 0.8rem; align-items: center; }
        }
      `}</style>

      <div className="tl-root">
        <div className="tl-card">

          {/* ── ESQUERDA ── */}
          <div className="tl-left">
            <canvas ref={canvasRef} className="tl-canvas" />

            {/* ilustração SVG comunidade */}
            <div className="tl-illustration">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* pessoas em círculo */}
                {[0,60,120,180,240,300].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180;
                  const cx = 100 + 62 * Math.cos(rad);
                  const cy = 100 + 62 * Math.sin(rad);
                  return (
                    <g key={i}>
                      <circle cx={cx} cy={cy - 6} r="9" fill="white" />
                      <ellipse cx={cx} cy={cy + 9} rx="11" ry="7" fill="white" />
                    </g>
                  );
                })}
                {/* conexões */}
                {[0,60,120,180,240,300].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180;
                  const cx = 100 + 62 * Math.cos(rad);
                  const cy = 100 + 62 * Math.sin(rad);
                  return <line key={i} x1={cx} y1={cy} x2="100" y2="100" stroke="white" strokeWidth="1.5" />;
                })}
                {/* chama central */}
                <circle cx="100" cy="100" r="16" fill="white" />
                <path d="M100 88 C96 92 93 96 94 101 C95 106 100 109 100 109 C100 109 105 106 106 101 C107 96 104 92 100 88Z" fill="#1d4ed8" />
                <path d="M100 95 C98 97 97 100 98 102 C99 104 100 105 100 105 C100 105 101 104 102 102 C103 100 102 97 100 95Z" fill="#60a5fa" />
              </svg>
            </div>

            <div className="tl-glow-line" />

            {/* logo */}
            <div className="tl-logo-wrap">
              <img
                src="/logo-betesda-mundau.png"
                alt="MIB Church"
                className="tl-logo-img"
                onError={e => { e.target.style.display='none'; }}
              />
            </div>

            {/* texto */}
            <div className="tl-headline">
              <div className="tl-badge">
                <span className="tl-badge-dot" />
                Sistema de Gestão
              </div>
              <h1 style={{ marginTop: '.8rem' }}>
                Vivemos como<br />
                <span>família</span>, crescendo<br />
                na Palavra.
              </h1>
              <p>Plataforma integrada de gestão de membros, células e vida ministerial.</p>
            </div>

            <div className="tl-verse">
              <q>E perseveravam na doutrina dos apóstolos, e na comunhão, e no partir do pão, e nas orações.</q>
              <cite>Atos 2:42</cite>
            </div>
          </div>

          {/* ── DIREITA ── */}
          <div className="tl-right">

            {/* ──── MODO: LOGIN ──── */}
            {modo === MODO.LOGIN && (
              <form onSubmit={handleLogin} noValidate>
                <p className="tl-right-title">Bem vindo ao MIB Church</p>
                <p className="tl-right-sub">Acesse o painel com seu e-mail e senha ministerial.</p>

                <div className="tl-field">
                  <label className="tl-label" htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    className="tl-input"
                    placeholder="nome@betesda.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => buscarPerfilNoBanco(email)}
                    autoComplete="email"
                  />
                </div>

                {/* chip de perfil identificado */}
                {perfilIdentificado && (
                  <div className="tl-perfil-chip">
                    <div className="tl-perfil-icon">{perfilIdentificado.iniciais}</div>
                    <div className="tl-perfil-info">
                      <p>Perfil identificado</p>
                      <p>{perfilIdentificado.nome}</p>
                    </div>
                  </div>
                )}

                <div className="tl-field">
                  <label className="tl-label" htmlFor="senha">Senha</label>
                  <input
                    id="senha"
                    type="password"
                    className="tl-input"
                    placeholder="••••••••"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>

                <div className="tl-actions-row">
                  <label className="tl-check-row" style={{ margin: 0 }}>
                    <input type="checkbox" checked={lembrar} onChange={e => setLembrar(e.target.checked)} />
                    Manter acesso
                  </label>
                  <button type="button" className="tl-link" onClick={() => mudarModo(MODO.ESQUECEU)}>
                    Esqueceu a senha?
                  </button>
                </div>

                {erro && <div className="tl-alert tl-alert-err">{erro}</div>}

                <button type="submit" className="tl-btn tl-btn-primary" disabled={loading}>
                  {loading ? 'Autenticando…' : 'Entrar no painel →'}
                </button>
              </form>
            )}

            {/* ──── MODO: ESQUECEU ──── */}
            {modo === MODO.ESQUECEU && (
              <form onSubmit={handleEsqueceu} noValidate>
                <button type="button" className="tl-back" onClick={() => mudarModo(MODO.LOGIN)}>
                  ← Voltar ao login
                </button>

                <p className="tl-right-title">Redefinir senha</p>
                <p className="tl-right-sub">
                  Informe o e-mail cadastrado e enviaremos um link para criar uma nova senha.
                </p>

                <div className="tl-field">
                  <label className="tl-label" htmlFor="email-reset">E-mail</label>
                  <input
                    id="email-reset"
                    type="email"
                    className="tl-input"
                    placeholder="nome@betesda.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>

                {erro  && <div className="tl-alert tl-alert-err">{erro}</div>}
                {info  && <div className="tl-alert tl-alert-info">{info}</div>}

                <button type="submit" className="tl-btn tl-btn-primary" disabled={loading}>
                  {loading ? 'Enviando…' : 'Enviar link de redefinição →'}
                </button>
              </form>
            )}

            {/* ──── MODO: NOVA SENHA ──── */}
            {modo === MODO.NOVA_SENHA && (
              <form onSubmit={handleNovaSenha} noValidate>
                <button type="button" className="tl-back" onClick={() => mudarModo(MODO.LOGIN)}>
                  ← Voltar ao login
                </button>

                <p className="tl-right-title">Criar nova senha</p>
                <p className="tl-right-sub">Escolha uma senha segura para proteger seu acesso.</p>

                <div className="tl-field">
                  <label className="tl-label" htmlFor="nova">Nova senha</label>
                  <input
                    id="nova"
                    type="password"
                    className="tl-input"
                    placeholder="Mínimo 6 caracteres"
                    value={novaSenha}
                    onChange={e => setNovaSenha(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>

                <div className="tl-field">
                  <label className="tl-label" htmlFor="confirmar">Confirmar nova senha</label>
                  <input
                    id="confirmar"
                    type="password"
                    className="tl-input"
                    placeholder="Repita a senha"
                    value={confirmarSenha}
                    onChange={e => setConfirmarSenha(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>

                {erro  && <div className="tl-alert tl-alert-err">{erro}</div>}
                {info  && <div className="tl-alert tl-alert-info">{info}</div>}

                <button type="submit" className="tl-btn tl-btn-primary" disabled={loading}>
                  {loading ? 'Salvando…' : 'Salvar nova senha →'}
                </button>
              </form>
            )}

          </div>{/* /tl-right */}
        </div>
      </div>
    </>
  );
}
