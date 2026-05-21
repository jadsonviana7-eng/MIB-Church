import { useMemo, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const perfisAcesso = [
  {
    id: 'admin',
    nome: 'Admin',
    descricao: 'Acesso completo ao painel, cadastros, relatorios e configuracoes.',
    iniciais: 'AD',
  },
  {
    id: 'pastor',
    nome: 'Pastor',
    descricao: 'Visao pastoral da membresia, celulas, vinculos e indicadores.',
    iniciais: 'PR',
  },
  {
    id: 'lider-celula',
    nome: 'Lider de Celula',
    descricao: 'Gestao da propria celula, membros, reunioes e visitantes.',
    iniciais: 'LC',
  },
  {
    id: 'membro',
    nome: 'Membro',
    descricao: 'Acesso pessoal aos dados cadastrais e vinculos com a igreja.',
    iniciais: 'MB',
  },
  {
    id: 'secretaria',
    nome: 'Secretaria',
    descricao: 'Cadastro, atualizacao, filtros, listas e relatorios de pessoas.',
    iniciais: 'SC',
  },
  {
    id: 'tesouraria',
    nome: 'Tesouraria',
    descricao: 'Acesso reservado aos modulos financeiros quando habilitados.',
    iniciais: 'TS',
  },
];

function detectarPerfilPorEmail(email) {
  const texto = email.trim().toLowerCase();
  if (!texto) return 'admin';
  if (texto.includes('pastor')) return 'pastor';
  if (texto.includes('lider') || texto.includes('celula')) return 'lider-celula';
  if (texto.includes('secretaria')) return 'secretaria';
  if (texto.includes('tesouraria') || texto.includes('financeiro')) return 'tesouraria';
  if (texto.includes('membro')) return 'membro';
  if (texto.includes('admin')) return 'admin';
  return 'membro';
}

function TelaLogin({ onEntrar }) {
  const [perfilSelecionado, setPerfilSelecionado] = useState('admin');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrarAcesso, setLembrarAcesso] = useState(true);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [supabaseConfigurando] = useState(!import.meta.env.VITE_SUPABASE_URL);

  useEffect(() => {
    const verificarSessao = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const perfil = detectarPerfilPorEmail(session.user.email);
          const perfilAtualObj = perfisAcesso.find((p) => p.id === perfil);
          onEntrar({
            email: session.user.email,
            perfil: perfilAtualObj,
            lembrarAcesso: true,
          });
        }
      } catch (err) {
        console.warn('Não foi possível verificar sessão:', err);
      }
    };
    verificarSessao();
  }, [onEntrar]);

  const perfilAtual = useMemo(
    () => perfisAcesso.find((perfil) => perfil.id === perfilSelecionado),
    [perfilSelecionado]
  );

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !senha.trim()) {
      setErro('Informe e-mail e senha para acessar o painel.');
      return;
    }

    setCarregando(true);
    setErro('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: senha.trim(),
      });

      if (error) {
        setErro(error.message === 'Invalid login credentials' 
          ? 'E-mail ou senha incorretos.'
          : error.message);
        setCarregando(false);
        return;
      }

      if (data?.user) {
        onEntrar({
          email: data.user.email,
          perfil: perfilAtual,
          lembrarAcesso,
        });
      }
    } catch (err) {
      setErro('Erro ao conectar. Tente novamente.');
      console.error('Erro de autenticação:', err);
    } finally {
      setCarregando(false);
    }
  }

  function revelarPerfil() {
    setPerfilSelecionado(detectarPerfilPorEmail(email));
  }

  return (
    <main className="min-h-screen bg-[#f3f5f8] text-slate-100 flex items-center justify-center p-4 sm:p-6">
      <section className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_440px] bg-white text-slate-700 shadow-2xl overflow-hidden rounded-2xl">
        <div className="relative min-h-[360px] bg-[#111827] p-6 sm:p-10 flex flex-col justify-between">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0,transparent_28%),radial-gradient(circle_at_80%_0,#dc2626_0,transparent_22%),linear-gradient(135deg,#111827,#172033)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-4">
              <img src="/logo-mib-mundau.png" alt="MIB Church" className="h-16 w-36 object-contain rounded-xl bg-white p-2" />
              <div>
                <h1 className="text-white text-xl font-black tracking-tight">MIB Church</h1>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Gestao de Membresia</p>
              </div>
            </div>
          </div>

          <div className="relative max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200 mb-3">Painel seguro</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Acesse conforme sua funcao ministerial.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Ao informar o e-mail, o sistema ja identifica o perfil de acesso provavel.
            </p>
          </div>

          <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-3">
            {perfisAcesso.map((perfil) => (
              <button
                key={perfil.id}
                type="button"
                onClick={() => setPerfilSelecionado(perfil.id)}
                className={`text-left p-3 rounded-xl border transition ${
                  perfilSelecionado === perfil.id
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg'
                    : 'bg-white/8 border-white/10 text-slate-300 hover:bg-white/12'
                }`}
                aria-pressed={perfilSelecionado === perfil.id}
              >
                <span className="block text-[10px] font-black uppercase tracking-wider opacity-70">{perfil.iniciais}</span>
                <span className="block mt-1 text-xs font-bold">{perfil.nome}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 bg-white">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-wider text-blue-600">Acesso selecionado</p>
            <h3 className="mt-2 text-2xl font-black text-slate-900">{perfilAtual.nome}</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">{perfilAtual.descricao}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold text-slate-500 uppercase mb-1">
                E-mail
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={revelarPerfil}
                placeholder="nome@mibchurch.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              />
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Perfil identificado</p>
              <p className="mt-1 text-sm font-black text-slate-900">{perfilAtual.nome}</p>
            </div>

            <div>
              <label htmlFor="login-senha" className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Senha
              </label>
              <input
                id="login-senha"
                type="password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                placeholder="Digite sua senha"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              />
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <input
                type="checkbox"
                checked={lembrarAcesso}
                onChange={(event) => setLembrarAcesso(event.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600"
              />
              Manter este acesso neste dispositivo
            </label>

            {erro && (
              <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold">
                {erro}
              </div>
            )}

            {supabaseConfigurando && (
              <div className="px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                ⚠️ Supabase não configurado. Configure .env.local com suas credenciais.
              </div>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black py-3 rounded-xl text-sm transition shadow-sm"
            >
              {carregando ? 'Autenticando...' : 'Entrar no painel'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default TelaLogin;
