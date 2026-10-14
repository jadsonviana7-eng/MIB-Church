import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Share2, 
  X, 
  MessageCircle, 
  QrCode, 
  Sparkles, 
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

/**
 * Modal elegante e polido para confirmar a cópia do link de autocadastro público.
 * Oferece atalhos práticos para compartilhamento direto no WhatsApp, visualização em nova aba
 * e exibição de QR Code para escaneamento presencial em cultos e recepção.
 * 
 * @param {Object} props
 * @param {boolean} props.aberto - Controle de abertura do modal
 * @param {Function} props.onFechar - Callback para fechamento
 * @param {string} [props.url] - URL pública do link de cadastro
 * @param {string} [props.titulo] - Título personalizado
 * @param {string} [props.subtitulo] - Subtítulo personalizado
 */
export default function ModalLinkCopiado({
  aberto = true,
  onFechar,
  url,
  titulo = 'Link Copiado com Sucesso!',
  subtitulo = 'O link do formulário de autocadastro já está na sua área de transferência.'
}) {
  const [copiadoNovamente, setCopiadoNovamente] = useState(false);
  const [mostrarQrCode, setMostrarQrCode] = useState(false);

  const urlFinal = url || (typeof window !== 'undefined' ? `${window.location.origin}/cadastro-publico` : '');

  // Fecha o modal ao pressionar a tecla ESC
  useEffect(() => {
    if (!aberto) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onFechar?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [aberto, onFechar]);

  if (!aberto) return null;

  const copiarNovamente = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(urlFinal);
        setCopiadoNovamente(true);
        setTimeout(() => setCopiadoNovamente(false), 2200);
      }
    } catch (err) {
      console.warn('Falha ao copiar novamente:', err);
    }
  };

  const abrirWhatsApp = () => {
    const textoMensagem = encodeURIComponent(
      `Olá! Seja muito bem-vindo(a) à MIB Church! ✨\n\n` +
      `Para realizar o seu cadastro em nossa comunidade e acompanhar nossos ministérios e atividades, acesse o link de autocadastro abaixo:\n\n` +
      `${urlFinal}\n\n` +
      `Ficamos muito felizes em ter você conosco! Deus abençoe! 🙏`
    );
    window.open(`https://api.whatsapp.com/send?text=${textoMensagem}`, '_blank', 'noopener,noreferrer');
  };

  const abrirEmNovaAba = () => {
    window.open(urlFinal, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onFechar}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-link-copiado-titulo"
    >
      <div
        className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Faixa Superior com Gradiente & Glow */}
        <div className="relative p-6 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent border-b border-emerald-100/80 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Ícone Animado com Halo */}
            <div className="relative">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-2xl shrink-0 shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-50">
                <CheckCircle2 className="w-7 h-7 text-white stroke-[2.4]" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-black tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  <Sparkles size={11} className="text-emerald-600" />
                  Pronto para Enviar
                </span>
              </div>
              <h2 id="modal-link-copiado-titulo" className="text-lg sm:text-xl font-black text-slate-850 mt-1 tracking-tight">
                {titulo}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                {subtitulo}
              </p>
            </div>
          </div>

          {/* Botão Fechar (X) */}
          <button
            type="button"
            onClick={onFechar}
            className="w-8 h-8 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-all cursor-pointer shrink-0"
            title="Fechar"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Caixa de Visualização da URL com Copiar Rápido */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1">
              Link de Autocadastro
            </label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/90 rounded-2xl p-2.5 hover:border-slate-300 transition-colors">
              <code className="text-xs font-mono font-semibold text-blue-700 px-2 py-1 flex-1 truncate select-all">
                {urlFinal}
              </code>
              <button
                type="button"
                onClick={copiarNovamente}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer shadow-xs ${
                  copiadoNovamente
                    ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
                title="Copiar novamente"
              >
                {copiadoNovamente ? (
                  <>
                    <Check size={14} className="stroke-[2.5]" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Ações de Compartilhamento Imediato */}
          <div className="space-y-2 pt-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1">
              Ações Rápidas
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Botão WhatsApp */}
              <button
                type="button"
                onClick={abrirWhatsApp}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl text-xs font-black shadow-md shadow-emerald-700/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <MessageCircle size={16} className="fill-white/20 stroke-[2.2]" />
                <span>Enviar no WhatsApp</span>
              </button>

              {/* Botão Testar / Abrir Formulário */}
              <button
                type="button"
                onClick={abrirEmNovaAba}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50/80 hover:bg-blue-100 text-blue-700 border border-blue-200/70 rounded-2xl text-xs font-bold active:scale-[0.98] transition-all cursor-pointer"
              >
                <ExternalLink size={15} />
                <span>Testar Formulário</span>
              </button>
            </div>
          </div>

          {/* QR Code Expansível para Apresentação em Culto / Recepção */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setMostrarQrCode(prev => !prev)}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 hover:bg-slate-100/70 border border-slate-200/70 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5 text-slate-700">
                <QrCode size={18} className="text-slate-500" />
                <span className="text-xs font-extrabold">Exibir QR Code na Tela</span>
              </div>
              <div className="text-slate-400">
                {mostrarQrCode ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            {mostrarQrCode && (
              <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200/60 mt-2 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200">
                  <QRCodeSVG
                    value={urlFinal}
                    size={160}
                    level="M"
                    includeMargin={false}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2.5 font-medium">
                  Aponte a câmera do celular para abrir o formulário
                </p>
              </div>
            )}
          </div>

          {/* Dica de Segurança e Identidade */}
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-blue-50/50 border border-blue-100/80 text-[11px] text-slate-600 leading-snug">
            <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
            <span>
              Este link é <strong>100% seguro</strong>: permite apenas a criação de novos cadastros sem expor dados de membros existentes.
            </span>
          </div>

        </div>

        {/* Rodapé com Botão Concluir */}
        <div className="p-4 sm:p-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onFechar}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
}
