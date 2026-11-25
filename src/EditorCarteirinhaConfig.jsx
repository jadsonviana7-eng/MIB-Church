import React, { useMemo, useRef, useState } from 'react';
import {
  CreditCard,
  Image as ImageIcon,
  RotateCcw,
  Plus,
  CheckCircle2,
  Sparkles,
  User,
  ShieldCheck,
  Save,
  SlidersHorizontal,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import PainelAjusteLayoutCertificado from './PainelAjusteLayoutCertificado';
import { getFonteInfo } from './certificadoLayoutConfig';
import {
  carregarConfigCarteirinha,
  salvarConfigCarteirinha,
  criarConfigCarteirinhaPadrao,
  getDefaultCarteirinhaLayout,
  estiloTextoCardPreview,
  PT_TO_CQW_CR80,
} from './carteirinhaLayoutConfig';

function lerImagemCarteirinha(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Falha ao ler imagem'));
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      if (dataUrl.length <= 1_200_000) {
        resolve(dataUrl);
        return;
      }
      const img = new Image();
      img.onload = () => {
        const maxW = 1600;
        const scale = img.width > maxW ? maxW / img.width : 1;
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const isPng = file.type === 'image/png';
        resolve(canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', 0.86));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

function renderVersaleteCardJsx(texto, fontClass) {
  return Array.from(String(texto || '')).map((ch, idx) => {
    const ehMinuscula = ch !== ch.toUpperCase() && ch === ch.toLowerCase();
    if (ehMinuscula) {
      return (
        <span key={idx} className={fontClass} style={{ fontSize: '0.78em' }}>
          {ch.toUpperCase()}
        </span>
      );
    }
    return <React.Fragment key={idx}>{ch}</React.Fragment>;
  });
}

export default function EditorCarteirinhaConfig({ dadosIgreja = null, membroLogado = null }) {
  const [config, setConfig] = useState(() => carregarConfigCarteirinha());
  const [lado, setLado] = useState('frente'); // 'frente' | 'verso'
  const [previewPerfil, setPreviewPerfil] = useState('pastor'); // 'pastor' | 'membro'
  const [modoEdicao, setModoEdicao] = useState(true);
  const [elementoSelecionadoId, setElementoSelecionadoId] = useState('nome');
  const [arrastando, setArrastando] = useState(false);
  const [temAlteracoesNaoSalvas, setTemAlteracoesNaoSalvas] = useState(false);
  const [avisoSalvo, setAvisoSalvo] = useState('');

  const sheetRef = useRef(null);
  const dragRef = useRef(null);

  const atualizarRascunho = (proximaConfig) => {
    setConfig(proximaConfig);
    setTemAlteracoesNaoSalvas(true);
  };

  const handleSalvarEdicao = () => {
    const finalConfig = { ...config, ativo: true };
    try {
      salvarConfigCarteirinha(finalConfig);
      setConfig(finalConfig);
      setTemAlteracoesNaoSalvas(false);
      window.dispatchEvent(new CustomEvent('mib-carteirinha-atualizada'));
      setAvisoSalvo('Edição salva! O novo layout já está ativo para todas as carteirinhas do sistema.');
      setTimeout(() => setAvisoSalvo(''), 4000);
    } catch {
      window.alert('A imagem excede o limite do armazenamento local. Tente um arquivo PNG/JPG mais leve.');
    }
  };

  const handleVoltarPadraoSistema = () => {
    const padrao = criarConfigCarteirinhaPadrao();
    try {
      salvarConfigCarteirinha(padrao);
      setConfig(padrao);
      setTemAlteracoesNaoSalvas(false);
      window.dispatchEvent(new CustomEvent('mib-carteirinha-atualizada'));
      setAvisoSalvo('Carteirinha restaurada para o modelo padrão do sistema.');
      setTimeout(() => setAvisoSalvo(''), 3500);
    } catch {
      // ignora
    }
  };

  const perfilConfig = config[previewPerfil] || config.pastor;
  const ladoConfig = perfilConfig[lado];

  const atualizarLadoAtual = (proximoLado) => {
    atualizarRascunho({
      ...config,
      [previewPerfil]: {
        ...perfilConfig,
        [lado]: proximoLado,
      },
    });
  };

  const layoutCompleto = useMemo(() => {
    const out = { ...(ladoConfig?.layout || {}) };
    for (const imgEl of ladoConfig?.imagensExtras || []) {
      out[imgEl.id] = imgEl;
    }
    return out;
  }, [ladoConfig]);

  const atualizarElemento = (elId, patch) => {
    const ehExtra = String(elId).startsWith('img-extra-');
    const proximoLado = ehExtra
      ? {
          ...ladoConfig,
          imagensExtras: (ladoConfig.imagensExtras || []).map((item) =>
            item.id === elId ? { ...item, ...patch } : item
          ),
        }
      : {
          ...ladoConfig,
          layout: {
            ...ladoConfig.layout,
            [elId]: { ...(ladoConfig.layout[elId] || {}), ...patch },
          },
        };
    atualizarLadoAtual(proximoLado);
  };

  const handleUploadFundo = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await lerImagemCarteirinha(file);
      atualizarLadoAtual({ ...ladoConfig, fundoImg: dataUrl });
    } catch {
      window.alert('Não foi possível carregar a imagem.');
    } finally {
      e.target.value = '';
    }
  };

  const handleRestaurarFundo = () => {
    atualizarLadoAtual({ ...ladoConfig, fundoImg: '' });
  };

  const handleAdicionarImagemExtra = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await lerImagemCarteirinha(file);
      const nomeLimpo = file.name.replace(/\.[^.]+$/, '').slice(0, 18) || 'Imagem';
      const novoEl = {
        id: `img-extra-${Date.now()}`,
        label: `Img: ${nomeLimpo}`,
        src: dataUrl,
        x: 38,
        y: 40,
        w: 22,
        h: 22,
        isImage: true,
        isExtraImage: true,
        hidden: false,
      };
      atualizarLadoAtual({
        ...ladoConfig,
        imagensExtras: [...(ladoConfig.imagensExtras || []), novoEl],
      });
      setModoEdicao(true);
      setElementoSelecionadoId(novoEl.id);
    } catch {
      window.alert('Não foi possível carregar a imagem.');
    } finally {
      e.target.value = '';
    }
  };

  const handleRemoverImagemExtra = (elId) => {
    atualizarLadoAtual({
      ...ladoConfig,
      imagensExtras: (ladoConfig.imagensExtras || []).filter((i) => i.id !== elId),
    });
    if (elementoSelecionadoId === elId) {
      setElementoSelecionadoId(lado === 'frente' ? 'nome' : 'textoLegal');
    }
  };

  const handleRestaurarLayoutLado = () => {
    atualizarLadoAtual({
      fundoImg: '',
      layout: getDefaultCarteirinhaLayout(lado, previewPerfil),
      imagensExtras: [],
    });
  };

  const iniciarArraste = (e, elId) => {
    e.stopPropagation();
    e.preventDefault();
    setElementoSelecionadoId(elId);
    const sheet = sheetRef.current;
    const el = layoutCompleto[elId];
    if (!sheet || !el) return;
    const rect = sheet.getBoundingClientRect();
    dragRef.current = {
      elId,
      startX: e.clientX,
      startY: e.clientY,
      origX: Number(el.x) || 0,
      origY: Number(el.y) || 0,
      rectW: rect.width || 1,
      rectH: rect.height || 1,
    };
    setArrastando(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignora
    }
  };

  const moverArraste = (e) => {
    const st = dragRef.current;
    if (!st) return;
    const dxPct = ((e.clientX - st.startX) / st.rectW) * 100;
    const dyPct = ((e.clientY - st.startY) / st.rectH) * 100;
    const nx = Number(Math.max(0, Math.min(95, st.origX + dxPct)).toFixed(1));
    const ny = Number(Math.max(0, Math.min(95, st.origY + dyPct)).toFixed(1));
    atualizarElemento(st.elId, { x: nx, y: ny });
  };

  const finalizarArraste = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setArrastando(false);
  };

  const getDragProps = (elId) => {
    if (!modoEdicao) return {};
    const selecionado = elementoSelecionadoId === elId;
    return {
      onPointerDown: (e) => iniciarArraste(e, elId),
      onPointerMove: moverArraste,
      onPointerUp: finalizarArraste,
      onPointerCancel: finalizarArraste,
      style: {
        cursor: 'move',
        touchAction: 'none',
        outline: selecionado ? '2px solid #38bdf8' : 'none',
        outlineOffset: '1.5px',
        borderRadius: '4px',
        zIndex: selecionado ? 30 : 20,
      },
    };
  };

  const renderTexto = (texto, el) => {
    const fonte = getFonteInfo(el?.font);
    if (el?.versalete) return renderVersaleteCardJsx(texto, fonte.className);
    return texto;
  };

  // Dados de exemplo para pré-visualização realista
  const ehPastor = previewPerfil === 'pastor';
  const nomeIgreja = dadosIgreja?.nome_igreja || 'Igreja Batista Internacional Betesda';
  const pastorResp = dadosIgreja?.pastor_responsavel || 'Pr. Jadson S. Viana';
  const cidadeUf =
    dadosIgreja?.cidade && dadosIgreja?.estado
      ? `${dadosIgreja.cidade.toUpperCase()} - ${dadosIgreja.estado.toUpperCase()} - Brasil`
      : 'SANTANA DO MUNDAÚ - AL - Brasil';

  const exemplo = {
    titulo: ehPastor ? 'CREDENCIAL DE AUTORIDADE' : 'CREDENCIAL DE MEMBRO',
    registro: '0042',
    cargoBanner: ehPastor ? 'PASTOR' : 'MEMBRO',
    nome: membroLogado?.nome || 'JADSON DA SILVA VIANA',
    fotoUrl: membroLogado?.foto_url || '',
    localidade: cidadeUf,
    cpf: '000.000.000-00',
    rg: '1234567 SSP/AL',
    cargo: ehPastor ? 'Pastor' : 'Membro',
    filiado: '12/03/2020',
    textoLegal: ehPastor
      ? `DIREITO NACIONAL DE CAPELANIA — Ao portador desta credencial (Pastor), é assegurado o livre acesso para assistência religiosa em hospitais, presídios e entidades civis/militares em todo o território nacional (Art. 5º, VII CF/88 e Lei nº 9.982/2000).`
      : `DECLARAÇÃO DE MEMBRESIA — Esta credencial é pessoal e intransferível, atestando que o portador é membro em plena comunhão com a ${nomeIgreja}, válida em todo o território nacional enquanto mantiver vínculo ativo.`,
    dadosIgrejaTxt: `CNPJ: ${dadosIgreja?.cnpj || '09.157.067/0001-09'} • Tel: ${dadosIgreja?.telefone || '(82) 98228-9108'}`,
    emissaoTxt: `Emissão: ${new Date().toLocaleDateString('pt-BR')} • ATIVO`,
  };

  const lay = ladoConfig.layout;

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Cabeçalho + Switch Ativar Layout Personalizado */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CreditCard size={19} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100">
                Editor Visual da Carteirinha de Membro
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Personalize fundo PNG/JPG, fontes, cores, posicionamento e imagens da Frente e Verso (CR80 • 85,6 × 54 mm).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setModoEdicao((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-extrabold cursor-pointer transition ${
                modoEdicao
                  ? 'bg-slate-800 dark:bg-[#1c2b4a] text-white border-slate-700 dark:border-blue-500/60'
                  : 'border-slate-200 dark:border-[#2b3954] bg-slate-50 dark:bg-[#131d31] text-slate-700 dark:text-slate-200'
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>{modoEdicao ? 'Prévia Limpa' : 'Editar Layout'}</span>
            </button>

            {config.ativo && (
              <button
                type="button"
                onClick={handleVoltarPadraoSistema}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2b3954] bg-white dark:bg-[#131d31] hover:bg-slate-50 dark:hover:bg-[#1c2b4a] text-slate-600 dark:text-slate-300 text-xs font-bold cursor-pointer transition"
                title="Voltar para o layout original da carteirinha"
              >
                <RotateCcw size={13} />
                <span>Padrão Original</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSalvarEdicao}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-extrabold shadow-sm cursor-pointer transition active:scale-95 ${
                temAlteracoesNaoSalvas
                  ? 'bg-emerald-600 hover:bg-emerald-700 ring-2 ring-emerald-500/30'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <Save size={14} />
              <span>{temAlteracoesNaoSalvas ? 'Salvar Edição *' : 'Salvar Edição'}</span>
            </button>
          </div>
        </div>

        {/* Controles: Frente/Verso, Perfil de Prévia, Upload de Fundo e Inserir Imagem */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100 dark:border-[#24334f]">
          <div className="flex flex-wrap items-center gap-2">
            {/* Alternador Frente / Verso */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-[#131d31] border border-slate-200 dark:border-[#2b3954]">
              <button
                type="button"
                onClick={() => {
                  setLado('frente');
                  setElementoSelecionadoId('nome');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition ${
                  lado === 'frente' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Frente
              </button>
              <button
                type="button"
                onClick={() => {
                  setLado('verso');
                  setElementoSelecionadoId('textoLegal');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition ${
                  lado === 'verso' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Verso
              </button>
            </div>

            {/* Alternador Prévia Pastor / Membro */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-[#131d31] border border-slate-200 dark:border-[#2b3954]">
              <button
                type="button"
                onClick={() => setPreviewPerfil('pastor')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition ${
                  ehPastor ? 'bg-amber-600 text-white' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <ShieldCheck size={12} />
                <span>Pastor</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewPerfil('membro')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition ${
                  !ehPastor ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <User size={12} />
                <span>Membro</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/35 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold cursor-pointer transition">
              <Plus size={14} />
              <span>Inserir Imagem</span>
              <input type="file" accept="image/png,image/jpeg,image/jpg" onChange={handleAdicionarImagemExtra} className="hidden" />
            </label>

            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#2b3954] bg-slate-50 dark:bg-[#131d31] hover:bg-slate-100 dark:hover:bg-[#1c2b4a] text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer transition">
              <ImageIcon size={14} className="text-blue-600 dark:text-blue-400" />
              <span>{ladoConfig.fundoImg ? 'Trocar Fundo' : 'Alterar Fundo (PNG/JPG)'}</span>
              <input type="file" accept="image/png,image/jpeg,image/jpg" onChange={handleUploadFundo} className="hidden" />
            </label>

            {ladoConfig.fundoImg && (
              <button
                type="button"
                onClick={handleRestaurarFundo}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/35 text-amber-700 dark:text-amber-300 text-xs font-bold cursor-pointer transition"
              >
                <RotateCcw size={12} />
                <span>Sem Fundo</span>
              </button>
            )}
          </div>
        </div>

        {avisoSalvo && (
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={14} />
            <span>{avisoSalvo}</span>
          </div>
        )}

        {/* PRÉ-VISUALIZAÇÃO INTERATIVA CR80 (85.6 × 54 mm) */}
        <div className="rounded-2xl bg-slate-200/80 dark:bg-[#0b1329] p-4 sm:p-6 border border-slate-300/70 dark:border-[#24334f] shadow-inner">
          <div className="flex items-center justify-between mb-2.5 px-1 max-w-xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles size={12} className="text-blue-500" />
              <span>
                Perfil: <strong className={ehPastor ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'}>{ehPastor ? 'Pastor' : 'Membro'}</strong> • {lado === 'frente' ? 'Frente' : 'Verso'}
              </span>
            </span>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">85,6 × 54 mm</span>
          </div>

          <div
            ref={sheetRef}
            className="relative w-full max-w-xl mx-auto aspect-[85.6/54] rounded-2xl shadow-2xl overflow-hidden select-none border border-slate-300/80"
            style={{
              containerType: 'inline-size',
              background: ladoConfig.fundoImg
                ? '#ffffff'
                : lado === 'frente'
                  ? 'linear-gradient(135deg, #071936 0%, #0d2b5c 52%, #133c7c 100%)'
                  : 'linear-gradient(180deg, #f8fafc 0%, #e0f2fe 100%)',
            }}
          >
            {/* Guias centrais ao arrastar */}
            {arrastando && (
              <>
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-blue-500/60 pointer-events-none z-40" />
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-blue-500/60 pointer-events-none z-40" />
              </>
            )}

            {/* Fundo padrão ou imagem PNG/JPG */}
            {ladoConfig.fundoImg ? (
              <img
                src={ladoConfig.fundoImg}
                alt="Fundo da Carteirinha"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            ) : lado === 'frente' ? (
              <>
                <div
                  className="absolute top-0 left-0 right-0 h-[27%] pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f1f7fd 100%)' }}
                />
                <div
                  className="absolute top-[27%] left-0 right-0 h-[2.4%] pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, #991b1b, #dc2626, #991b1b)' }}
                />
                <div
                  className="absolute top-[29.4%] left-0 right-0 h-[0.9%] pointer-events-none"
                  style={{ backgroundColor: ehPastor ? '#f59e0b' : '#38bdf8' }}
                />
              </>
            ) : (
              <>
                <div
                  className="absolute top-0 left-0 right-0 h-[16.5%] pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, #06357a 0%, #0b52b5 100%)' }}
                />
                <div
                  className="absolute top-[16.5%] left-0 right-0 h-[2.2%] pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, #991b1b, #dc2626, #991b1b)' }}
                />
              </>
            )}

            {/* ELEMENTOS DA FRENTE */}
            {lado === 'frente' && (
              <>
                {lay.logo && !lay.logo.hidden && (() => {
                  const drag = getDragProps('logo');
                  return (
                    <img
                      {...drag}
                      src="/betesda-geral.png"
                      alt="Betesda"
                      draggable={false}
                      className="absolute object-contain object-left"
                      style={{ left: `${lay.logo.x}%`, top: `${lay.logo.y}%`, width: `${lay.logo.w}%`, height: `${lay.logo.h}%`, ...(drag.style || {}) }}
                    />
                  );
                })()}

                {lay.foto && !lay.foto.hidden && (() => {
                  const drag = getDragProps('foto');
                  return (
                    <div
                      {...drag}
                      className="absolute rounded-xl overflow-hidden flex items-center justify-center shadow-md"
                      style={{
                        left: `${lay.foto.x}%`,
                        top: `${lay.foto.y}%`,
                        width: `${lay.foto.w}%`,
                        height: `${lay.foto.h}%`,
                        border: '2px solid rgba(255,255,255,0.95)',
                        background: 'linear-gradient(180deg, #e0f2fe, #bae6fd)',
                        ...(drag.style || {}),
                      }}
                    >
                      {exemplo.fotoUrl ? (
                        <img src={exemplo.fotoUrl} alt="Foto" draggable={false} className="w-full h-full object-cover object-top pointer-events-none" />
                      ) : (
                        <span style={{ fontSize: '9cqw', fontWeight: 900, color: '#0a52b8' }}>
                          {exemplo.nome.charAt(0)}
                        </span>
                      )}
                    </div>
                  );
                })()}

                {lay.titulo && !lay.titulo.hidden && (() => {
                  const drag = getDragProps('titulo');
                  const fonte = getFonteInfo(lay.titulo.font);
                  return (
                    <div {...drag} className={`${fonte.className} absolute whitespace-nowrap`} style={{ ...estiloTextoCardPreview(lay.titulo), ...(drag.style || {}) }}>
                      {renderTexto(exemplo.titulo, lay.titulo)}
                    </div>
                  );
                })()}

                {lay.registro && !lay.registro.hidden && (() => {
                  const drag = getDragProps('registro');
                  const fonte = getFonteInfo(lay.registro.font);
                  return (
                    <div
                      {...drag}
                      className={`${fonte.className} absolute px-1.5 py-0.5 rounded-md`}
                      style={{
                        ...estiloTextoCardPreview(lay.registro),
                        backgroundColor: ladoConfig.fundoImg ? 'transparent' : 'rgba(255,255,255,0.12)',
                        ...(drag.style || {}),
                      }}
                    >
                      <span className="block" style={{ fontSize: '1.7cqw', color: '#93c5fd', fontWeight: 700, lineHeight: 1 }}>Nº REGISTRO</span>
                      <span className="block">{renderTexto(exemplo.registro, lay.registro)}</span>
                    </div>
                  );
                })()}

                {lay.cargoBanner && !lay.cargoBanner.hidden && (() => {
                  const drag = getDragProps('cargoBanner');
                  const fonte = getFonteInfo(lay.cargoBanner.font);
                  return (
                    <div
                      {...drag}
                      className={`${fonte.className} absolute px-2 py-1 rounded-md`}
                      style={{
                        ...estiloTextoCardPreview(lay.cargoBanner),
                        background: ladoConfig.fundoImg
                          ? 'transparent'
                          : ehPastor
                            ? 'linear-gradient(90deg, #b45309, #d97706, #f59e0b)'
                            : 'linear-gradient(90deg, #1d4ed8, #2563eb, #0284c7)',
                        ...(drag.style || {}),
                      }}
                    >
                      {renderTexto(exemplo.cargoBanner, lay.cargoBanner)}
                    </div>
                  );
                })()}

                {lay.nome && !lay.nome.hidden && (() => {
                  const drag = getDragProps('nome');
                  const fonte = getFonteInfo(lay.nome.font);
                  return (
                    <div
                      {...drag}
                      className={`${fonte.className} absolute px-2 py-0.5 rounded-md truncate`}
                      style={{
                        ...estiloTextoCardPreview(lay.nome),
                        backgroundColor: ladoConfig.fundoImg ? 'transparent' : 'rgba(255,255,255,0.96)',
                        borderLeft: ladoConfig.fundoImg ? 'none' : `3px solid ${ehPastor ? '#d97706' : '#2563eb'}`,
                        ...(drag.style || {}),
                      }}
                    >
                      <span className="block" style={{ fontSize: '1.7cqw', color: '#64748b', fontWeight: 700, lineHeight: 1 }}>NOME</span>
                      <span className="block truncate">{renderTexto(exemplo.nome, lay.nome)}</span>
                    </div>
                  );
                })()}

                {lay.localidade && !lay.localidade.hidden && (() => {
                  const drag = getDragProps('localidade');
                  const fonte = getFonteInfo(lay.localidade.font);
                  return (
                    <div
                      {...drag}
                      className={`${fonte.className} absolute px-2 py-0.5 rounded-md truncate`}
                      style={{
                        ...estiloTextoCardPreview(lay.localidade),
                        backgroundColor: ladoConfig.fundoImg ? 'transparent' : 'rgba(255,255,255,0.96)',
                        borderLeft: ladoConfig.fundoImg ? 'none' : `3px solid ${ehPastor ? '#d97706' : '#2563eb'}`,
                        ...(drag.style || {}),
                      }}
                    >
                      <span className="block" style={{ fontSize: '1.7cqw', color: '#64748b', fontWeight: 700, lineHeight: 1 }}>CIDADE/UF/PAÍS</span>
                      <span className="block truncate">{renderTexto(exemplo.localidade, lay.localidade)}</span>
                    </div>
                  );
                })()}

                {[
                  { key: 'cpf', lbl: 'CPF', val: exemplo.cpf },
                  { key: 'rg', lbl: 'RG', val: exemplo.rg },
                  { key: 'cargo', lbl: 'CARGO', val: exemplo.cargo },
                  { key: 'filiado', lbl: 'BATIZADO EM', val: exemplo.filiado },
                ].map((item) => {
                  const el = lay[item.key];
                  if (!el || el.hidden) return null;
                  const drag = getDragProps(item.key);
                  const fonte = getFonteInfo(el.font);
                  return (
                    <div
                      key={item.key}
                      {...drag}
                      className={`${fonte.className} absolute px-1.5 py-0.5 rounded-md truncate`}
                      style={{
                        ...estiloTextoCardPreview(el),
                        backgroundColor: ladoConfig.fundoImg ? 'transparent' : 'rgba(15,23,42,0.52)',
                        ...(drag.style || {}),
                      }}
                    >
                      <span className="block" style={{ fontSize: '1.6cqw', color: '#93c5fd', fontWeight: 700, lineHeight: 1 }}>{item.lbl}</span>
                      <span className="block truncate">{renderTexto(item.val, el)}</span>
                    </div>
                  );
                })}
              </>
            )}

            {/* ELEMENTOS DO VERSO */}
            {lado === 'verso' && (
              <>
                {lay.igrejaHeader && !lay.igrejaHeader.hidden && (() => {
                  const drag = getDragProps('igrejaHeader');
                  const fonte = getFonteInfo(lay.igrejaHeader.font);
                  return (
                    <div {...drag} className={`${fonte.className} absolute truncate`} style={{ ...estiloTextoCardPreview(lay.igrejaHeader), ...(drag.style || {}) }}>
                      {renderTexto(nomeIgreja, lay.igrejaHeader)}
                    </div>
                  );
                })()}

                {lay.regVerso && !lay.regVerso.hidden && (() => {
                  const drag = getDragProps('regVerso');
                  const fonte = getFonteInfo(lay.regVerso.font);
                  return (
                    <div {...drag} className={`${fonte.className} absolute whitespace-nowrap`} style={{ ...estiloTextoCardPreview(lay.regVerso), ...(drag.style || {}) }}>
                      {renderTexto(`REG. Nº ${exemplo.registro}`, lay.regVerso)}
                    </div>
                  );
                })()}

                {lay.textoLegal && !lay.textoLegal.hidden && (() => {
                  const drag = getDragProps('textoLegal');
                  const fonte = getFonteInfo(lay.textoLegal.font);
                  return (
                    <div
                      {...drag}
                      className={`${fonte.className} absolute p-1.5 rounded-md`}
                      style={{
                        ...estiloTextoCardPreview(lay.textoLegal),
                        backgroundColor: ladoConfig.fundoImg ? 'transparent' : 'rgba(255,255,255,0.88)',
                        borderLeft: ladoConfig.fundoImg ? 'none' : '3px solid #1d4ed8',
                        ...(drag.style || {}),
                      }}
                    >
                      {exemplo.textoLegal}
                    </div>
                  );
                })()}

                {lay.dadosIgreja && !lay.dadosIgreja.hidden && (() => {
                  const drag = getDragProps('dadosIgreja');
                  const fonte = getFonteInfo(lay.dadosIgreja.font);
                  return (
                    <div {...drag} className={`${fonte.className} absolute`} style={{ ...estiloTextoCardPreview(lay.dadosIgreja), ...(drag.style || {}) }}>
                      {exemplo.dadosIgrejaTxt}
                    </div>
                  );
                })()}

                {lay.assinatura && !lay.assinatura.hidden && (() => {
                  const drag = getDragProps('assinatura');
                  const fonte = getFonteInfo(lay.assinatura.font);
                  return (
                    <div
                      {...drag}
                      className={`${fonte.className} absolute pt-0.5`}
                      style={{
                        ...estiloTextoCardPreview(lay.assinatura),
                        borderTop: `1px solid ${lay.assinatura.color || '#334155'}`,
                        ...(drag.style || {}),
                      }}
                    >
                      {renderTexto(`${pastorResp} • Pastor Responsável`, lay.assinatura)}
                    </div>
                  );
                })()}

                {lay.emissao && !lay.emissao.hidden && (() => {
                  const drag = getDragProps('emissao');
                  const fonte = getFonteInfo(lay.emissao.font);
                  return (
                    <div {...drag} className={`${fonte.className} absolute`} style={{ ...estiloTextoCardPreview(lay.emissao), ...(drag.style || {}) }}>
                      {exemplo.emissaoTxt}
                    </div>
                  );
                })()}

                {lay.qrCode && !lay.qrCode.hidden && (() => {
                  const drag = getDragProps('qrCode');
                  return (
                    <div
                      {...drag}
                      className="absolute rounded-lg p-1 flex flex-col items-center justify-center shadow-xs"
                      style={{
                        left: `${lay.qrCode.x}%`,
                        top: `${lay.qrCode.y}%`,
                        width: `${lay.qrCode.w}%`,
                        height: `${lay.qrCode.h}%`,
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        ...(drag.style || {}),
                      }}
                    >
                      <QRCodeSVG value="https://mibchurch.app/validar-credencial/exemplo" size={64} bgColor="#ffffff" fgColor="#071936" style={{ width: '82%', height: 'auto' }} />
                      <span style={{ fontSize: '1.5cqw', fontWeight: 800, color: '#0d2b5c', marginTop: '2px' }}>AUTENTICAR</span>
                    </div>
                  );
                })()}
              </>
            )}

            {/* IMAGENS EXTRAS INSERIDAS */}
            {(ladoConfig.imagensExtras || [])
              .filter((imgEl) => !imgEl.hidden)
              .map((imgEl) => {
                const drag = getDragProps(imgEl.id);
                return (
                  <img
                    key={imgEl.id}
                    {...drag}
                    src={imgEl.src}
                    alt={imgEl.label}
                    draggable={false}
                    className="absolute object-contain"
                    style={{
                      left: `${imgEl.x}%`,
                      top: `${imgEl.y}%`,
                      width: `${imgEl.w}%`,
                      height: `${imgEl.h}%`,
                      zIndex: 18,
                      ...(drag.style || {}),
                    }}
                  />
                );
              })}
          </div>
        </div>

        {/* PAINEL DE AJUSTE FINO REUTILIZADO DOS CERTIFICADOS */}
        {modoEdicao && (
          <PainelAjusteLayoutCertificado
            layout={layoutCompleto}
            elementoSelecionadoId={elementoSelecionadoId}
            onSelecionarElemento={setElementoSelecionadoId}
            onAtualizarElemento={atualizarElemento}
            onRestaurarLayout={handleRestaurarLayoutLado}
            possuiPersonalizacao={true}
            onAdicionarImagemExtra={handleAdicionarImagemExtra}
            onRemoverImagemExtra={handleRemoverImagemExtra}
          />
        )}
      </div>
    </div>
  );
}
