import { useState } from 'react';
import { supabase } from './supabaseClient';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Line, 
  ComposedChart,
  Sector
} from 'recharts';

export const chartColors = ['#9f509d','#008261', '#ff7a49','#2e4b7f', '#fa5972','#655197', '#d44e90', '#ffa600'];

/** Mesmo bucket e padrão de nome das fotos de membros (raiz do bucket, sem subpasta). */
export async function uploadImagemCelula(arquivo, prefix = 'nova') {
  if (!arquivo) return null;
  const ext = (arquivo.name?.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const nomeArquivo = `${Date.now()}_${prefix}.${ext}`;
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
      className={`card-header flex flex-wrap items-center justify-between gap-3 border-b border-[#0095ff]/15 ${className}`.trim()}
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

export function DoughnutCard({ titulo, dados, startAngle = 0, endAngle = 360, hideLegend = false, hideHeaderOnMobile = false }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const entradas = Object.entries(dados).sort((a, b) => b[1] - a[1]);
  const total = entradas.reduce((sum, [, valor]) => sum + valor, 0); // Corrigido para somar corretamente
  const chartData = entradas.map(([name, value]) => ({ name, value }));

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 2} // Subtle expansion
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    );
  };

  return (
    <Card className="p-0">
      <CardHeader titulo={titulo} hideOnMobile={hideHeaderOnMobile} />
      <div className={`p-6 grid gap-10 lg:gap-16 items-center min-h-[340px] ${hideLegend ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-[280px_1fr]'}`}>
        <div className={`relative shrink-0 mx-auto ${hideLegend ? 'h-64 w-full max-w-[450px]' : 'w-full h-72 lg:w-84 lg:h-84 lg:mx-0'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={chartData}
                innerRadius="65%"
                outerRadius="100%"
                paddingAngle={1}
                dataKey="value"
                startAngle={startAngle}
                endAngle={endAngle}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
                style={{ cursor: 'pointer' }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className={`${hideLegend ? 'text-5xl' : 'text-4xl'} font-black text-[var(--text-heading)]`}>{total}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
          </div>
        </div>
        {!hideLegend && (
          <div className="space-y-1">
          {entradas.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">Sem dados cadastrados.</p>
          ) : (
            entradas.map(([label, valor], index) => (
              <div key={label} className="flex items-center justify-between gap-3 text-sm font-medium cursor-pointer group" onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(-1)}>
                <span className="flex items-center gap-1 text-[var(--text-primary)]">
                  <span className="h-3 w-3 rounded-full" style={{ background: chartColors[index % chartColors.length] }} />
                  <span className="group-hover:text-[#2563eb] transition-colors">{label}</span>
                </span>
                <span className="text-[var(--text-heading)] font-semibold text-lg">{valor}</span>
              </div>
            ))
          )}
        </div>
        )}
      </div>
    </Card>
  );
}

export function CombinationCard({ titulo, dados, periodo, setPeriodo, hideHeaderOnMobile = false }) {
  const entradas = Object.entries(dados);
  const chartData = entradas.map(([name, value]) => ({ name, value }));

  return (
    <Card className="p-0">
      <CardHeader
        titulo={titulo}
        hideOnMobile={hideHeaderOnMobile}
        children={(
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-primary)] bg-white cursor-pointer">
            <option value="semana">Semana</option>
            <option value="mes">Meses</option>
            <option value="ano">Ano</option>
          </select>
        )}
      />
      <div className="p-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{fontSize: 11}} axisLine={false} tickLine={false} />
            <YAxis tick={{fontSize: 11}} axisLine={false} tickLine={false} />
            <Tooltip cursor={{fill: '#f8fafc'}} />
            <Bar 
              dataKey="value" 
              fill={chartColors[0]} 
              radius={[6, 6, 0, 0]} 
              barSize={40} 
              activeBar={{ fillOpacity: 0.8, stroke: chartColors[0], strokeWidth: 2 }}
              animationDuration={500}
              style={{ cursor: 'pointer' }}
            />
            <Line type="monotone" dataKey="value" stroke={chartColors[2]} strokeWidth={3} dot={{ r: 4, fill: chartColors[2] }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function ColumnChart({ titulo, dados, hideHeaderOnMobile = false }) {
  const chartData = Object.entries(dados).map(([name, value]) => ({ name, value }));

  return (
    <Card className="p-0">
      <CardHeader titulo={titulo} hideOnMobile={hideHeaderOnMobile} />
      <div className="p-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
            <YAxis tick={{fontSize: 11}} axisLine={false} tickLine={false} />
            <Tooltip cursor={{fill: '#f8fafc'}} />
            <Bar 
              dataKey="value" 
              radius={[6, 6, 0, 0]}
              activeBar={{ fillOpacity: 0.8 }}
              style={{ cursor: 'pointer' }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
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
    <div className="mb-6 xl:mb-2 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between pt-0">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 pl-[30px] md:pl-0">
        <h2 className="mt-0 text-2xl sm:text-3xl xl:text-[18px] font-semibold text-[var(--text-heading)] tracking-tight">{titulo}</h2>
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
                    className={`transition-colors cursor-pointer ${isLast ? 'text-[#2563eb]' : 'hover:text-slate-600'}`}
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
    <img src={pessoa.foto_url} alt={pessoa.nome} className={`${tamanho} rounded-xl object-cover border border-slate-200 bg-slate-100 shrink-0`} />
  ) : (
    <div className={`${tamanho} rounded-xl bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-300 shrink-0`}>
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
    <img
      src="https://guznbiqposfhqalqjggw.supabase.co/storage/v1/object/public/fotos-membros/avatar%20celulas.png"
      alt={celula?.nome || 'Célula'}
      className={`${tamanho} rounded-xl object-cover border border-[var(--border)] bg-[var(--surface-muted)] shrink-0`}
    />
  );
}

export function SelectFiltro({ label, valor, onChange, opcoes }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{label}</label>
      <select value={valor} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-700 bg-white cursor-pointer">
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