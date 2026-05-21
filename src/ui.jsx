import { supabase } from './supabaseClient';

export const chartColors = ['#055F6D', '#0d9488', '#38bdf8', '#f59e0b', '#8b5cf6', '#f472b6', '#64748b', '#14b8a6'];

/** Mesmo bucket e padrão de nome das fotos de membros (raiz do bucket, sem subpasta). */
export async function uploadImagemCelula(arquivo, celulaId = 'nova') {
  if (!arquivo) return null;
  const ext = (arquivo.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
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

export function Card({ children, className = '' }) {
  return <section className={`card ${className}`.trim()}>{children}</section>;
}

export function CardHeader({ titulo, subtitulo, children }) {
  return (
    <div className="card-header flex flex-wrap items-center justify-between gap-3">
      <div>
        {titulo && <div className="text-sm font-semibold text-[var(--text-heading)] tracking-tight">{titulo}</div>}
        {subtitulo && <p className="text-xs text-[var(--text-muted)] mt-0.5">{subtitulo}</p>}
      </div>
      {children}
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
      className={`${tamanho} rounded-xl bg-[var(--brand-light)] text-[var(--brand)] flex items-center justify-center text-lg font-semibold shrink-0`}
    >
      ⛺
    </div>
  );
}
