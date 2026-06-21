import { useState } from 'react';
import { supabase } from './supabaseClient';
import { 
  Music, Heart, Sparkles, Shield, Home, Flame, BookOpen, Users, 
  Compass, Clapperboard, Award, Mic, MessageSquare, Calendar, 
  HelpingHand, Scroll, Smile, Globe, Video, Tv
} from 'lucide-react';
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
      style={{ fontFamily: "var(--font-body)", ...style }}
    >
      {children}
    </section>
  );
}

export function CardHeader({ titulo, subtitulo, children, className = '' }) {
  return (
    <div
      className={`card-header flex flex-wrap items-center justify-between gap-3 border-b border-[#0095ff]/15 ${className}`.trim()}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div>
        {titulo && (
          <h3 
            className="text-base font-bold text-[var(--text-heading)] tracking-tight" 
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {titulo}
          </h3>
        )}
        {subtitulo && (
          <p 
            className="text-xs text-[var(--text-muted)] mt-0.5"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            {subtitulo}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

export function DoughnutCard({ titulo, dados, startAngle = 0, endAngle = 360, hideLegend = false, hideHeaderOnMobile = false, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const entradas = Object.entries(dados).sort((a, b) => b[1] - a[1]);
  const total = entradas.reduce((sum, [, valor]) => sum + valor, 0); // Corrigido para somar corretamente
  const chartData = entradas.map(([name, value]) => ({ name, value }));
  const isHalfCircle = Math.abs(endAngle - startAngle) <= 180;

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
    <Card className={`p-0 ${className}`.trim()}>
      <CardHeader titulo={titulo} hideOnMobile={hideHeaderOnMobile} />
      <div className={`p-6 flex flex-col items-center gap-6 ${isHalfCircle ? (hideLegend ? 'min-h-[260px]' : 'min-h-[360px]') : 'min-h-[420px]'}`}>
        <div className={`relative w-full max-w-md ${isHalfCircle ? 'h-56' : 'h-72'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={isHalfCircle ? { top: 0, right: 10, bottom: 0, left: 10 } : { top: 20, right: 20, bottom: 20, left: 20 }} style={{ outline: 'none' }}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={chartData}
                innerRadius={isHalfCircle ? "60%" : "50%"}
                outerRadius={isHalfCircle ? "120%" : "100%"}
                cy={isHalfCircle ? "85%" : "50%"}
                cx="50%"
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
          <div 
            className="absolute inset-x-0 flex flex-col items-center pointer-events-none"
            style={isHalfCircle ? { top: '78%', transform: 'translateY(-50%)' } : { top: '50%', transform: 'translateY(-50%)' }}
          >
            <span className={`${hideLegend ? 'text-5xl' : 'text-4xl'} font-black text-[var(--text-heading)]`}>{total}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
          </div>
        </div>
        {!hideLegend && (
          <div className="w-full max-w-md mt-4 border-t border-slate-100 pt-4">
            {entradas.length === 0 ? (
              <p className="text-center text-xs text-slate-400 italic">Sem dados para exibir.</p>
            ) : (
              <table className="w-full text-[11px]">
                <tbody>
                  {entradas.map(([label, valor], index) => {
                    const isHover = activeIndex === index;
                    const pct = total > 0 ? ((valor / total) * 100).toFixed(0) : 0;
                    return (
                      <tr 
                        key={label} 
                        className={`transition-all border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer ${isHover ? 'bg-slate-50' : ''}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(-1)}
                      >
                        <td className="py-2 pl-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
                            <span className="font-bold text-slate-600">{label}</span>
                          </div>
                        </td>
                        <td className="py-2 text-right font-black text-slate-700">{valor}</td>
                        <td className="py-2 text-right pr-2 text-slate-400 font-bold w-12">{pct}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
          <ComposedChart data={chartData} style={{ outline: 'none' }}>
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

export function ColumnChart({ titulo, dados, hideHeaderOnMobile = false, hideLegend = false, className = '' }) {
  const chartData = Object.entries(dados).map(([name, value]) => ({ name, value }));

  return (
    <Card className={`p-0 ${className}`.trim()}>
      <CardHeader titulo={titulo} hideOnMobile={hideHeaderOnMobile} />
      <div className="p-6 flex flex-col items-center gap-6 min-h-[420px]">
        <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} style={{ outline: 'none' }}>
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
        {!hideLegend && (
          <div className="w-full max-w-md mt-4 border-t border-slate-100 pt-4">
            {chartData.length === 0 ? (
              <p className="text-center text-xs text-slate-400 italic">Sem dados para exibir.</p>
            ) : (
              <table className="w-full text-[11px]">
                <tbody>
                  {chartData.map((item, index) => (
                    <tr 
                      key={item.name} 
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-2 pl-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
                          <span className="font-bold text-slate-600">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-2 text-right pr-2 font-black text-slate-700">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
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
    <div className="mb-6 xl:mb-2 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between pt-0 w-full">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 pl-0 md:pl-0 w-full md:w-auto">
        <div className="md:contents flex flex-col w-full bg-white border border-t-0 border-slate-100 md:bg-transparent md:border-0 rounded-t-none rounded-b-2xl p-4 md:p-0 shadow-sm md:shadow-none text-center md:text-left items-center md:items-start">
          <h2 className="mt-0 text-base sm:text-3xl xl:text-[18px] font-bold text-slate-800 tracking-tight">{titulo}</h2>
          {subtitulo && <p className="mt-1 md:mt-2 text-[11px] md:text-sm text-[var(--text-muted)] max-w-3xl">{subtitulo}</p>}
        </div>
        {breadcrumb.length > 0 && (
          <nav className="hidden md:flex items-center gap-2 text-[11px] font-bold tracking-tight text-slate-400" aria-label="Breadcrumb">
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

export function StatCard({ label, valor, detalhe, icone, className = "" }) {
  const iconOnTop = className.includes('flex-col');

  if (iconOnTop) {
    return (
      <Card className={`p-4 flex flex-col justify-between gap-4 ${className}`.trim()}>
        <div className="flex items-center gap-3 w-full">
          {icone && <div className="shrink-0">{icone}</div>}
          <div className="flex flex-col min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate text-left leading-snug">{label}</p>
            {detalhe && (
              <span className="text-[11px] text-slate-500 font-semibold mt-0.5 text-left leading-none truncate">
                {detalhe}
              </span>
            )}
          </div>
        </div>
        <div className="text-left w-full">
          <span className="text-2xl sm:text-3xl font-black text-slate-800 leading-none block">
            {valor}
          </span>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-4 flex items-center justify-between gap-4 ${className}`.trim()}>
      <div className="flex items-center gap-3.5 min-w-0">
        {icone && <div className="shrink-0">{icone}</div>}
        <div className="min-w-0 flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate leading-snug">{label}</p>
          {detalhe && (
            <span className="text-[11px] text-slate-500 font-semibold mt-0.5 truncate leading-none">
              {detalhe}
            </span>
          )}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <span className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-none">
          {valor}
        </span>
      </div>
    </Card>
  );
}

export function ModalWrapper({ titulo, children, onFechar }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh] self-end sm:self-center">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">{titulo}</h3>
          <button onClick={onFechar} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border text-slate-400 hover:text-rose-500 transition cursor-pointer">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ConfirmModal({ titulo, mensagem, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-rose-50 bg-rose-50/30 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-lg shrink-0">
            ⚠️
          </div>
          <div className="flex-1">
            <h3 className="font-black text-slate-800 text-base">{titulo || 'Confirmar Ação'}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{mensagem || 'Deseja realmente prosseguir?'}</p>
          </div>
        </div>
        <div className="p-6 bg-slate-50/50 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-100 transition active:scale-95 cursor-pointer"
          >
            🗑️ Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

const ICON_MAP = {
  Music,
  Heart,
  Sparkles,
  Shield,
  Home,
  Flame,
  BookOpen,
  Users,
  Compass,
  Clapperboard,
  Award,
  Mic,
  MessageSquare,
  Calendar,
  HelpingHand,
  Scroll,
  Smile,
  Globe,
  Video,
  Tv
};

export function MinistryIcon({ icone, className = '', size = 20, style = {} }) {
  const IconComponent = ICON_MAP[icone];
  if (IconComponent) {
    return <IconComponent className={className} size={size} style={style} />;
  }
  // Fallback to emoji
  return (
    <span 
      className={className} 
      style={{ 
        fontSize: `${size}px`, 
        lineHeight: 1, 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        ...style 
      }}
    >
      {icone || '🙏'}
    </span>
  );
}