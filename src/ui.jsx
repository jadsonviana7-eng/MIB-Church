import { supabase } from './supabaseClient';

export const chartColors = ['#2563eb', '#1e40af', '#3b82f6', '#f59e0b', '#8b5cf6', '#f472b6', '#64748b', '#14b8a6'];

/** Mesmo bucket e padrão de nome das fotos de membros (raiz do bucket, sem subpasta). */
export async function uploadImagemCelula(arquivo, celulaId = 'nova') {
  if (!arquivo) return null;
  const ext = (arquivo.name?.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const nomeArquivo = `${Date.now()}_celula_${celulaId}.${ext}`;
  const { error } = await supabase.storage
    .from('fotos-membros')
    .upload(nomeArquivo, arquivo, {
      contentType: arquivo.type || 'image/jpeg',
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    const detalhe = new Error(
      error.message?.includes('row-level security')
        ? `${error.message} — confira o arquivo supabase/politicas-imagem-celula.sql no projeto e execute no SQL Editor do Supabase.`
        : error.message
    );
    detalhe.cause = error;
    throw detalhe;
  }

  const { data } = supabase.storage.from('fotos-membros').getPublicUrl(nomeArquivo);
  return data.publicUrl;
}

export function Card({ children, className = '', style = {} }) {
  return (
    <section 
      className={`card border-b-2 border-[#60a5fa]/20 ${className}`.trim()} 
      style={{ fontFamily: "'Roboto', sans-serif", ...style }}
    >
      {children}
    </section>
  );
}

export function CardHeader({ titulo, subtitulo, children, className = '' }) {
  return (
    <div 
      className={`card-header flex flex-wrap items-center justify-between gap-3 border-b border-[#60a5fa]/15 ${className}`.trim()}
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <div>
        {titulo && (
          <h3 
            className="text-base font-bold text-[var(--text-heading)] tracking-tight" 
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            {titulo}
          </h3>
        )}
        {subtitulo && (
          <p 
            className="text-xs text-[var(--text-muted)] mt-0.5"
            style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400 }}
          >
            {subtitulo}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

export function DoughnutCard({ titulo, dados }) {
  const entradas = Object.entries(dados).sort((a, b) => b[1] - a[1]);
  const total = entradas.reduce((sum, [, valor]) => sum + valor, 0);
  let acumulado = 0;
  const gradient = total
    ? entradas
        .map(([, valor], index) => {
          const inicio = (acumulado / total) * 100;
          acumulado += valor;
          const fim = (acumulado / total) * 100;
          return `${chartColors[index % chartColors.length]} ${inicio}% ${fim}%`;
        })
        .join(', ')
    : '#e5e7eb 0% 100%';

  return (
    <Card className="p-0">
      <CardHeader titulo={titulo} />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 items-center min-h-[340px]">
        <div className="relative h-52 w-52 mx-auto lg:mx-0 rounded-full shrink-0" style={{ background: `conic-gradient(${gradient})` }}>
          <div className="absolute inset-10 rounded-full bg-white flex items-center justify-center text-4xl font-semibold text-[var(--text-heading)]">{total}</div>
        </div>
        <div className="space-y-3">
          {entradas.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">Sem dados cadastrados.</p>
          ) : (
            entradas.map(([label, valor], index) => (
              <div key={label} className="flex items-center justify-between gap-3 text-sm font-medium">
                <span className="flex items-center gap-2.5 text-[var(--text-primary)]">
                  <span className="h-3 w-3 rounded-full" style={{ background: chartColors[index % chartColors.length] }} />
                  {label}
                </span>
                <span className="text-[var(--text-heading)] font-semibold text-lg">{valor}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}

export function CombinationCard({ titulo, dados, periodo, setPeriodo }) {
  const entradas = Object.entries(dados);
  const maximo = Math.max(...entradas.map(([, valor]) => valor), 1);
  const largura = Math.max(entradas.length * 96, 480);
  const alturaGrafico = 320;
  const baseY = alturaGrafico - 48;
  const pontos = entradas.map(([, valor], index) => {
    const x = 48 + index * 84;
    const y = baseY - (valor / maximo) * 220;
    return `${x},${y}`;
  }).join(' ');

  return (
    <Card className="p-0">
      <CardHeader
        titulo={titulo}
        children={(
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-primary)] bg-white">
            <option value="semana">Semana</option>
            <option value="mes">Meses</option>
            <option value="ano">Ano</option>
          </select>
        )}
      />
      <div className="p-4 overflow-x-auto">
        <svg width={largura} height={alturaGrafico} role="img" aria-label={titulo} className="min-w-full">
          <line x1="36" y1={baseY} x2={largura - 24} y2={baseY} stroke="#dde4ec" strokeWidth="2" />
          {entradas.map(([label, valor], index) => {
            const x = 48 + index * 84;
            const altura = (valor / maximo) * 220;
            return (
              <g key={label}>
                <rect x={x - 20} y={baseY - altura} width="40" height={altura} rx="8" fill={chartColors[0]} opacity="0.8" />
                <text x={x} y={baseY + 28} textAnchor="middle" fontSize="11" fill="#7b8da3">{label}</text>
                <text x={x} y={baseY - altura - 10} textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">{valor}</text>
              </g>
            );
          })}
          {pontos && <polyline points={pontos} fill="none" stroke={chartColors[2]} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
        </svg>
      </div>
    </Card>
  );
}

export function ColumnChart({ titulo, dados }) {
  const entradas = Object.entries(dados);
  const maximo = Math.max(...entradas.map(([, valor]) => valor), 1);
  return (
    <Card className="p-0">
      <CardHeader titulo={titulo} />
      <div className="p-6 flex h-80 items-end gap-3 overflow-x-auto">
        {entradas.map(([label, valor], index) => (
          <div key={label} className="min-w-[4.5rem] flex-1 flex flex-col items-center gap-2">
            <span className="text-sm font-semibold text-[var(--text-heading)]">{valor}</span>
            <div className="w-full rounded-t-xl min-h-[12px]" style={{ height: `${Math.max((valor / maximo) * 260, 12)}px`, background: chartColors[index % chartColors.length] }} />
            <span className="text-[11px] font-medium text-[var(--text-muted)]">{label.slice(0, 3)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function Recentes({ titulo, itens, render }) {
  return (
    <Card className="p-0">
      <CardHeader titulo={titulo} />
      {itens.length === 0 ? (
        <p className="py-6 px-5 text-sm text-[var(--text-muted)]">Nenhum registro encontrado.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-mib">
            <tbody>
              {itens.map((item, index) => (
                <tr key={item.id || index}>
                  <td className="flex items-center gap-3 flex-wrap">{render(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export function PageHeader({ titulo, subtitulo, breadcrumb = [], onNavigate, children }) {
  return (
    <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
        <h2 className="mt-1 text-2xl sm:text-3xl font-semibold text-[var(--text-heading)] tracking-tight">{titulo}</h2>
        {breadcrumb.length > 0 && (
          <nav className="flex items-center gap-2 text-[11px] font-bold tracking-tight text-slate-400" aria-label="Breadcrumb">
            {breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1;
              // Formata para "Somente a primeira maiúscula"
              const label = item.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
              return (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-slate-300">/</span>
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => onNavigate && onNavigate(item)}
                    className={`transition-colors ${isLast ? 'text-[#2563eb]' : 'hover:text-slate-600'}`}
                  >
                    {label}
                  </button>
                </div>
              );
            })}
          </nav>
        )}
        {subtitulo && <p className="mt-2 text-sm text-[var(--text-muted)] max-w-3xl">{subtitulo}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function Avatar({ pessoa, tamanho = 'w-10 h-10' }) {
  if (!pessoa) return null;
  return pessoa.foto_url ? (
    <img src={pessoa.foto_url} alt={pessoa.nome} className={`${tamanho} rounded-full object-cover border border-slate-200 bg-slate-100 shrink-0`} />
  ) : (
    <div className={`${tamanho} rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-300 shrink-0`}>
      {pessoa.nome ? pessoa.nome.charAt(0).toUpperCase() : '?'}
    </div>
  );
}

export function AvatarCelula({ celula, tamanho = 'w-12 h-12' }) {
  if (celula?.imagem_url) {
    return (
      <img
        src={celula.imagem_url}
        alt={celula.nome || 'Célula'}
        className={`${tamanho} rounded-xl object-cover border border-[var(--border)] bg-[var(--surface-muted)] shrink-0`}
      />
    );
  }
  return (
    <div
      className={`${tamanho} rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center text-lg font-bold shrink-0`}
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      ⛺
    </div>
  );
}

export function SelectFiltro({ label, valor, onChange, opcoes }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{label}</label>
      <select value={valor} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-700 bg-white">
        <option value="">Todos</option>
        {opcoes.map((o) => {
          const itemValor = typeof o === 'object' ? o.valor : o;
          const itemLabel = typeof o === 'object' ? o.label : o;
          return <option key={itemValor} value={itemValor}>{itemLabel}</option>;
        })}
      </select>
    </div>
  );
}

export function CampoLinha({ label, valor }) {
  return (
    <div className="rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] px-3 py-2.5">
      <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-[var(--text-heading)]">{valor || '—'}</p>
    </div>
  );
}

export function CampoInput({ label, value, onChange, disabled, mask, type = 'text' }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">{label}</label>
      <input
        type={type}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(mask ? mask(e.target.value) : e.target.value)}
        className="w-full px-3 py-1.5 text-xs font-medium border border-[var(--border)] rounded-xl disabled:bg-[var(--surface-muted)] text-[var(--text-heading)] bg-white"
      />
    </div>
  );
}

export function StatCard({ label, valor, detalhe, icone }) {
  return (
    <Card className="p-4 flex items-center gap-4">
      {icone && <div className="shrink-0">{icone}</div>}
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">{label}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-800">{valor}</span>
          <span className="text-xs text-slate-500 whitespace-nowrap">{detalhe}</span>
        </div>
      </div>
    </Card>
  );
}