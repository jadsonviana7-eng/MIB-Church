import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from './supabaseClient';
import { X, Printer, RotateCw, ShieldCheck, CreditCard, Scale, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import QRCode from 'qrcode';
import { mascaraCPF, mascaraCNPJ, mascaraTelefone } from './mascaras';
import { getFonteInfo, gerarFontFacesPrintCss } from './certificadoLayoutConfig';
import {
  carregarConfigCarteirinha,
  estiloTextoCardPreview,
  estiloTextoCardPrint,
} from './carteirinhaLayoutConfig';

function formatarVersaleteCardHtml(texto, escFn) {
  return Array.from(String(texto || ''))
    .map((ch) => {
      const ehMinuscula = ch !== ch.toUpperCase() && ch === ch.toLowerCase();
      return ehMinuscula
        ? `<span style="font-size:0.78em;">${escFn(ch.toUpperCase())}</span>`
        : escFn(ch);
    })
    .join('');
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

function gerarNumeroRegistro(pessoa) {
  if (!pessoa) return '0001';
  if (pessoa.numero_registro) return String(pessoa.numero_registro).padStart(4, '0');
  if (pessoa.matricula) return String(pessoa.matricula).padStart(4, '0');
  const raw = String(pessoa.id || '');
  const digits = raw.replace(/\D/g, '');
  if (digits.length >= 4) return digits.slice(-4);
  let hash = 0;
  for (let i = 0; i < raw.length; i += 1) {
    hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0;
  }
  return String((Math.abs(hash) % 9999) + 1).padStart(4, '0');
}

function formatarDataCurta(val) {
  if (!val) return '—';
  const s = String(val).trim();
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(s)) return s;
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[3]}/${iso[2]}/${iso[1]}`;
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) return d.toLocaleDateString('pt-BR');
  return s;
}

function dividirNomeIgreja(nomeCompleto) {
  const limpo = String(nomeCompleto || 'MIB Church').trim();
  const partes = limpo.split(/\s+/);
  if (partes.length <= 1) return { linha1: 'Ministério Internacional', linha2: limpo.toUpperCase() };
  const ultima = partes[partes.length - 1];
  const inicio = partes.slice(0, -1).join(' ');
  return { linha1: inicio, linha2: ultima.toUpperCase() };
}

function flexionarCargoPorGenero(cargoTexto, genero) {
  const texto = String(cargoTexto || '').trim();
  if (!texto) return '';
  const ehFeminino = /^f(em)?/i.test(String(genero || '').trim());

  // Casos eclesiásticos específicos
  if (/^pastor\s*\(a\)$/i.test(texto) || /^pastor\/a$/i.test(texto)) {
    return ehFeminino ? 'Pastora' : 'Pastor';
  }
  if (/^di[áa]cono\s*\((a|isa)\)$/i.test(texto)) {
    return ehFeminino ? 'Diaconisa' : 'Diácono';
  }
  if (/^mission[áa]rio\s*\(a\)$/i.test(texto)) {
    return ehFeminino ? 'Missionária' : 'Missionário';
  }
  if (/^presb[íi]tero\s*\(a\)$/i.test(texto)) {
    return ehFeminino ? 'Presbítera' : 'Presbítero';
  }
  if (/^obreiro\s*\(a\)$/i.test(texto)) {
    return ehFeminino ? 'Obreira' : 'Obreiro';
  }
  if (/^membro\s*\(a\)$/i.test(texto)) {
    return 'Membro';
  }

  // Regra genérica para qualquer cargo com "(a)" ou "o(a)"
  return texto
    .replace(/o\s*\(a\)/gi, ehFeminino ? 'a' : 'o')
    .replace(/\s*\(a\)/gi, ehFeminino ? 'a' : '')
    .trim();
}

export default function CarteirinhaMembroModal({ pessoa, onFechar }) {
  const [dadosIgreja, setDadosIgreja] = useState(null);
  const [lado, setLado] = useState('frente'); // 'frente' | 'verso'
  const [configCustom, setConfigCustom] = useState(() => carregarConfigCarteirinha());
  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1024,
    h: typeof window !== 'undefined' ? window.innerHeight : 768,
  }));

  useEffect(() => {
    const recarregar = () => setConfigCustom(carregarConfigCarteirinha());
    window.addEventListener('mib-carteirinha-atualizada', recarregar);
    window.addEventListener('storage', recarregar);
    return () => {
      window.removeEventListener('mib-carteirinha-atualizada', recarregar);
      window.removeEventListener('storage', recarregar);
    };
  }, []);

  useEffect(() => {
    const atualizarViewport = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener('resize', atualizarViewport);
    window.addEventListener('orientationchange', atualizarViewport);
    return () => {
      window.removeEventListener('resize', atualizarViewport);
      window.removeEventListener('orientationchange', atualizarViewport);
    };
  }, []);

  const isMobilePortrait = viewport.w < 640 && viewport.h > viewport.w;

  useEffect(() => {
    if (!isMobilePortrait) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobilePortrait]);

  useEffect(() => {
    let ativo = true;
    supabase
      .from('dados_igreja')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data }) => {
        if (ativo && data) setDadosIgreja(data);
      })
      .catch(() => {});
    return () => { ativo = false; };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onFechar?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onFechar]);

  const info = useMemo(() => {
    const cargoRaw = String(pessoa?.cargo || '').trim();
    const cargoPrincipal = cargoRaw ? cargoRaw.split(',')[0].trim() : '';
    const permNorm = String(pessoa?.permissao || '').toLowerCase().trim();
    const generoNorm = String(pessoa?.genero || '').toLowerCase().trim();

    const ehPastor =
      permNorm === 'pastor' ||
      /pastor|bispo|ap[óo]stolo/i.test(cargoRaw);

    const ehAutoridade =
      ehPastor ||
      /presb[íi]tero|evangelista|mission[áa]ri|di[áa]con|l[íi]der/i.test(cargoRaw);

    const ehFeminino = /^f(em)?/i.test(generoNorm);
    const cargoFlexionado = flexionarCargoPorGenero(cargoPrincipal, pessoa?.genero);

    let cargoExibicao = cargoFlexionado || (ehPastor ? (ehFeminino ? 'Pastora' : 'Pastor') : 'Membro');
    if (ehPastor && !/pastor|bispo|ap[óo]stolo/i.test(cargoExibicao)) {
      cargoExibicao = ehFeminino ? 'Pastora' : 'Pastor';
    }

    const cidade = (pessoa?.cidade || dadosIgreja?.cidade || '').trim();
    const estado = (pessoa?.estado || dadosIgreja?.estado || '').trim().toUpperCase();
    const localidade = cidade && estado
      ? `${cidade.toUpperCase()} - ${estado} - Brasil`
      : cidade
        ? `${cidade.toUpperCase()} - Brasil`
        : 'Brasil';

    const cpfFmt = pessoa?.cpf ? mascaraCPF(String(pessoa.cpf)) : 'Não informado';
    const rgFmt = pessoa?.rg ? String(pessoa.rg).trim() : 'Não informado';
    const filiadoDesde = formatarDataCurta(pessoa?.data_batismo || pessoa?.data_ingresso || pessoa?.created_at);
    const numRegistro = gerarNumeroRegistro(pessoa);
    const nomeIgreja = dadosIgreja?.nome_igreja || 'MIB Church';
    const nomeIgrejaDiv = dividirNomeIgreja(nomeIgreja);

    const enderecoIgreja = [
      dadosIgreja?.endereco,
      dadosIgreja?.numero ? `nº ${dadosIgreja.numero}` : '',
      dadosIgreja?.bairro,
      dadosIgreja?.cidade && dadosIgreja?.estado ? `${dadosIgreja.cidade}/${dadosIgreja.estado}` : (dadosIgreja?.cidade || ''),
    ]
      .filter(Boolean)
      .join(' • ');

    return {
      ehPastor,
      ehAutoridade,
      tituloCredencial: ehAutoridade ? 'CREDENCIAL DE AUTORIDADE' : 'CREDENCIAL DE MEMBRO',
      cargoExibicao,
      cargoBanner: cargoExibicao.toUpperCase(),
      nomeUpper: String(pessoa?.nome || 'Membro').toUpperCase(),
      localidade,
      cpfFmt,
      rgFmt,
      filiadoDesde,
      numRegistro,
      nomeIgreja,
      nomeIgrejaDiv,
      logoUrl: dadosIgreja?.logo_url || '',
      cnpjIgreja: dadosIgreja?.cnpj ? mascaraCNPJ(dadosIgreja.cnpj) : '',
      telefoneIgreja: dadosIgreja?.telefone ? mascaraTelefone(dadosIgreja.telefone) : '',
      emailIgreja: dadosIgreja?.email_contato || '',
      pastorResponsavel: dadosIgreja?.pastor_responsavel || 'Pastor Presidente',
      enderecoIgreja,
      dataEmissao: new Date().toLocaleDateString('pt-BR'),
      urlValidacao:
        typeof window !== 'undefined' && pessoa?.id
          ? `${window.location.origin}/validar-credencial/${pessoa.id}`
          : '',
    };
  }, [pessoa, dadosIgreja]);

  const handleImprimirCarteirinha = async () => {
    const esc = (s) =>
      String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    let qrDataUrl = '';
    if (info.urlValidacao) {
      try {
        qrDataUrl = await QRCode.toDataURL(info.urlValidacao, {
          width: 220,
          margin: 1,
          color: { dark: '#071936', light: '#ffffff' },
        });
      } catch {
        qrDataUrl = '';
      }
    }

    const fotoHtml = pessoa?.foto_url
      ? `<img src="${esc(pessoa.foto_url)}" alt="${esc(info.nomeUpper)}" style="width:100%;height:100%;object-fit:cover;object-position:top center;" />`
      : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:28pt;font-weight:900;color:#0a52b8;background:linear-gradient(180deg,#e0f2fe,#bae6fd);">${esc(info.nomeUpper.charAt(0))}</div>`;

    const logoBetesdaUrl = `${window.location.origin}/betesda-geral.png`;
    const logoHtml = `<img src="${esc(logoBetesdaUrl)}" alt="${esc(info.nomeIgreja)}" style="max-height:12mm;max-width:56mm;width:auto;height:auto;object-fit:contain;display:block;" />`;

    const fmtPrintTxt = (txt, el) => (el?.versalete ? formatarVersaleteCardHtml(txt, esc) : esc(txt));

    // Se o layout personalizado da Carteirinha estiver ativo nas Configurações, gera o CR80 com o perfil correspondente (Pastor ou Membro)
    if (configCustom?.ativo) {
      const origin = window.location.origin;
      const fontFacesLocaisCss = gerarFontFacesPrintCss(origin);
      const perfilCfg = configCustom[info.ehPastor ? 'pastor' : 'membro'] || configCustom.membro;
      const cf = perfilCfg.frente;
      const cv = perfilCfg.verso;
      const lf = cf.layout;
      const lv = cv.layout;

      const textoLegalPuro = info.ehPastor
        ? `DIREITO NACIONAL DE CAPELANIA — Ao portador desta credencial (${info.cargoExibicao}), é assegurado o livre acesso para assistência religiosa em hospitais, presídios e entidades civis/militares em todo o território nacional (Art. 5º, VII CF/88 e Lei nº 9.982/2000).`
        : `DECLARAÇÃO DE MEMBRESIA — Esta credencial é pessoal e intransferível, atestando que o portador é membro em plena comunhão com a ${info.nomeIgreja}, válida em todo o território nacional enquanto mantiver vínculo ativo.`;

      const dadosIgrejaLinha = [
        info.cnpjIgreja ? `CNPJ: ${info.cnpjIgreja}` : '',
        info.telefoneIgreja ? `Tel: ${info.telefoneIgreja}` : '',
        info.enderecoIgreja || '',
      ].filter(Boolean).join(' • ');

      const renderExtrasHtml = (arr) =>
        (arr || [])
          .filter((i) => !i.hidden)
          .map(
            (i) =>
              `<img src="${i.src}" style="position:absolute;left:${i.x}%;top:${i.y}%;width:${i.w}%;height:${i.h}%;object-fit:contain;z-index:18;" alt="${esc(i.label)}" />`
          )
          .join('');

      const htmlCustom = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Carteirinha - ${esc(pessoa?.nome || 'Membro')}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=David+Libre:wght@400;500;700&family=Great+Vibes&family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;600;700;800&display=swap');
    ${fontFacesLocaisCss}
    @page { size: A4 portrait; margin: 15mm; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body { margin: 0; padding: 0; background: #ffffff; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; color: #0f172a; }
    .sheet-title { font-size: 11pt; font-weight: 800; color: #0f172a; margin-bottom: 2mm; }
    .sheet-sub { font-size: 8.5pt; color: #475569; margin-bottom: 8mm; }
    .cards-row { display: flex; flex-wrap: wrap; gap: 8mm; align-items: flex-start; }
    .card-wrap { display: flex; flex-direction: column; gap: 2mm; }
    .card-caption { font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; }
    .id-card { width: 85.6mm; height: 54mm; border-radius: 3.2mm; overflow: hidden; position: relative; border: 0.3mm solid #94a3b8; }
  </style>
</head>
<body>
  <div class="sheet-title">${esc(info.nomeIgreja)} — ${esc(info.tituloCredencial)}</div>
  <div class="sheet-sub">Formato padrão PVC CR80 (85,6 mm × 54 mm) • Layout Personalizado</div>
  <div class="cards-row">
    <div class="card-wrap">
      <span class="card-caption">Frente</span>
      <div class="id-card" style="background:${cf.fundoImg ? '#ffffff' : 'linear-gradient(135deg,#071936 0%,#0d2b5c 52%,#133c7c 100%)'};">
        ${cf.fundoImg
          ? `<img src="${cf.fundoImg}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;" alt="Fundo Frente" />`
          : `<div style="position:absolute;top:0;left:0;right:0;height:27%;background:linear-gradient(180deg,#ffffff 0%,#f1f7fd 100%);"></div><div style="position:absolute;top:27%;left:0;right:0;height:2.4%;background:linear-gradient(90deg,#991b1b,#dc2626,#991b1b);"></div><div style="position:absolute;top:29.4%;left:0;right:0;height:0.9%;background:${info.ehAutoridade ? '#f59e0b' : '#38bdf8'};"></div>`}
        ${lf.logo && !lf.logo.hidden ? `<img src="${esc(logoBetesdaUrl)}" style="position:absolute;left:${lf.logo.x}%;top:${lf.logo.y}%;width:${lf.logo.w}%;height:${lf.logo.h}%;object-fit:contain;object-position:left center;z-index:5;" alt="Logo" />` : ''}
        ${lf.foto && !lf.foto.hidden ? `<div style="position:absolute;left:${lf.foto.x}%;top:${lf.foto.y}%;width:${lf.foto.w}%;height:${lf.foto.h}%;border-radius:2mm;overflow:hidden;border:0.55mm solid rgba(255,255,255,0.95);background:#e0f2fe;z-index:5;">${fotoHtml}</div>` : ''}
        ${lf.titulo && !lf.titulo.hidden ? `<div style="${estiloTextoCardPrint(lf.titulo)}z-index:6;white-space:nowrap;">${fmtPrintTxt(info.tituloCredencial, lf.titulo)}</div>` : ''}
        ${lf.registro && !lf.registro.hidden ? `<div style="${estiloTextoCardPrint(lf.registro)}z-index:6;padding:0.6mm 1.2mm;border-radius:1.2mm;background:${cf.fundoImg ? 'transparent' : 'rgba(255,255,255,0.12)'};"><span style="display:block;font-size:4pt;color:#93c5fd;font-weight:700;line-height:1;">Nº REGISTRO</span><span>${fmtPrintTxt(info.numRegistro, lf.registro)}</span></div>` : ''}
        ${lf.cargoBanner && !lf.cargoBanner.hidden ? `<div style="${estiloTextoCardPrint(lf.cargoBanner)}z-index:6;padding:0.8mm 2mm;border-radius:1.2mm;background:${cf.fundoImg ? 'transparent' : info.ehAutoridade ? 'linear-gradient(90deg,#b45309,#d97706,#f59e0b)' : 'linear-gradient(90deg,#1d4ed8,#2563eb,#0284c7)'};">${fmtPrintTxt(info.cargoBanner, lf.cargoBanner)}</div>` : ''}
        ${lf.nome && !lf.nome.hidden ? `<div style="${estiloTextoCardPrint(lf.nome)}z-index:6;padding:0.6mm 1.6mm;border-radius:1.2mm;background:${cf.fundoImg ? 'transparent' : 'rgba(255,255,255,0.96)'};border-left:${cf.fundoImg ? 'none' : `0.8mm solid ${info.ehAutoridade ? '#d97706' : '#2563eb'}`};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><span style="display:block;font-size:4pt;color:#64748b;font-weight:700;line-height:1;">NOME</span><span>${fmtPrintTxt(pessoa?.nome || info.nomeUpper, lf.nome)}</span></div>` : ''}
        ${lf.localidade && !lf.localidade.hidden ? `<div style="${estiloTextoCardPrint(lf.localidade)}z-index:6;padding:0.6mm 1.6mm;border-radius:1.2mm;background:${cf.fundoImg ? 'transparent' : 'rgba(255,255,255,0.96)'};border-left:${cf.fundoImg ? 'none' : `0.8mm solid ${info.ehAutoridade ? '#d97706' : '#2563eb'}`};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><span style="display:block;font-size:4pt;color:#64748b;font-weight:700;line-height:1;">CIDADE/UF/PAÍS</span><span>${fmtPrintTxt(info.localidade, lf.localidade)}</span></div>` : ''}
        ${[
          { k: 'cpf', lbl: 'CPF', val: info.cpfFmt },
          { k: 'rg', lbl: 'RG', val: info.rgFmt },
          { k: 'cargo', lbl: 'CARGO', val: info.cargoExibicao },
          { k: 'filiado', lbl: 'BATIZADO EM', val: info.filiadoDesde },
        ].map((it) => lf[it.k] && !lf[it.k].hidden ? `<div style="${estiloTextoCardPrint(lf[it.k])}z-index:6;padding:0.6mm 1.2mm;border-radius:1.2mm;background:${cf.fundoImg ? 'transparent' : 'rgba(15,23,42,0.52)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><span style="display:block;font-size:3.8pt;color:#93c5fd;font-weight:700;line-height:1;">${it.lbl}</span><span>${fmtPrintTxt(it.val, lf[it.k])}</span></div>` : '').join('')}
        ${renderExtrasHtml(cf.imagensExtras)}
      </div>
    </div>
    <div class="card-wrap">
      <span class="card-caption">Verso</span>
      <div class="id-card" style="background:${cv.fundoImg ? '#ffffff' : 'linear-gradient(180deg,#f8fafc 0%,#e0f2fe 100%)'};">
        ${cv.fundoImg
          ? `<img src="${cv.fundoImg}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;" alt="Fundo Verso" />`
          : `<div style="position:absolute;top:0;left:0;right:0;height:16.5%;background:linear-gradient(90deg,#06357a 0%,#0b52b5 100%);"></div><div style="position:absolute;top:16.5%;left:0;right:0;height:2.2%;background:linear-gradient(90deg,#991b1b,#dc2626,#991b1b);"></div>`}
        ${lv.igrejaHeader && !lv.igrejaHeader.hidden ? `<div style="${estiloTextoCardPrint(lv.igrejaHeader)}z-index:6;">${fmtPrintTxt(info.nomeIgreja, lv.igrejaHeader)}</div>` : ''}
        ${lv.regVerso && !lv.regVerso.hidden ? `<div style="${estiloTextoCardPrint(lv.regVerso)}z-index:6;">${fmtPrintTxt(`REG. Nº ${info.numRegistro}`, lv.regVerso)}</div>` : ''}
        ${lv.textoLegal && !lv.textoLegal.hidden ? `<div style="${estiloTextoCardPrint(lv.textoLegal)}z-index:6;padding:1.4mm 1.8mm;border-radius:1.4mm;background:${cv.fundoImg ? 'transparent' : 'rgba(255,255,255,0.88)'};border-left:${cv.fundoImg ? 'none' : '1mm solid #1d4ed8'};">${esc(textoLegalPuro)}</div>` : ''}
        ${lv.dadosIgreja && !lv.dadosIgreja.hidden ? `<div style="${estiloTextoCardPrint(lv.dadosIgreja)}z-index:6;">${esc(dadosIgrejaLinha)}</div>` : ''}
        ${lv.assinatura && !lv.assinatura.hidden ? `<div style="${estiloTextoCardPrint(lv.assinatura)}z-index:6;border-top:0.25mm solid ${lv.assinatura.color || '#334155'};padding-top:0.6mm;">${fmtPrintTxt(`${info.pastorResponsavel} • Pastor Responsável`, lv.assinatura)}</div>` : ''}
        ${lv.emissao && !lv.emissao.hidden ? `<div style="${estiloTextoCardPrint(lv.emissao)}z-index:6;">${esc(`Emissão: ${info.dataEmissao} • ATIVO`)}</div>` : ''}
        ${lv.qrCode && !lv.qrCode.hidden && qrDataUrl ? `<div style="position:absolute;left:${lv.qrCode.x}%;top:${lv.qrCode.y}%;width:${lv.qrCode.w}%;height:${lv.qrCode.h}%;background:#ffffff;border:0.3mm solid #cbd5e1;border-radius:1.4mm;padding:0.9mm;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:6;"><img src="${qrDataUrl}" style="width:82%;height:auto;display:block;" alt="QR" /><span style="font-size:3.5pt;font-weight:800;color:#0d2b5c;margin-top:0.4mm;">AUTENTICAR</span></div>` : ''}
        ${renderExtrasHtml(cv.imagensExtras)}
      </div>
    </div>
  </div>
</body>
</html>`;

      const tituloAntigo = document.title;
      document.title = `Carteirinha - ${pessoa?.nome || 'Membro'}`;
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);
      const doc = iframe.contentWindow?.document;
      if (!doc) {
        document.body.removeChild(iframe);
        document.title = tituloAntigo;
        return;
      }
      doc.open();
      doc.write(htmlCustom);
      doc.close();
      const limpar = () => {
        document.title = tituloAntigo;
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      };
      setTimeout(() => {
        try {
          iframe.contentWindow.focus();
          iframe.contentWindow.onafterprint = limpar;
          iframe.contentWindow.print();
        } catch {
          limpar();
        }
        setTimeout(limpar, 2500);
      }, 280);
      return;
    }

    const textoVersoLegal = info.ehPastor
      ? `
        <div class="capelania-box">
          <div class="capelania-title">⚖️ DIREITO NACIONAL DE CAPELANIA — LEI FEDERAL</div>
          <p class="capelania-text">
            Ao portador desta credencial, na condição de Ministro do Evangelho (<strong>${esc(info.cargoExibicao)}</strong>), é assegurado o direito de livre acesso para prestação de assistência religiosa e capelania em entidades civis e militares de internação coletiva (hospitais, presídios, instituições militares e educacionais) em todo o território nacional, nos termos do <strong>Art. 5º, inciso VII da Constituição Federal</strong> e da <strong>Lei Federal nº 9.982/2000</strong>.
          </p>
        </div>
      `
      : `
        <div class="membro-box">
          <div class="membro-title">DECLARAÇÃO DE MEMBRESIA</div>
          <p class="membro-text">
            Esta credencial é de uso pessoal e intransferível, atestando que o portador é membro em plena comunhão e regularidade com a <strong>${esc(info.nomeIgreja)}</strong>, sendo válida em todo o território nacional enquanto mantiver vínculo ativo com a igreja.
          </p>
        </div>
      `;

    const htmlDoc = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Carteirinha - ${esc(pessoa?.nome || 'Membro')}</title>
  <style>
    @page { size: A4 portrait; margin: 15mm; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      font-family: 'Segoe UI', Inter, Arial, sans-serif;
      color: #0f172a;
    }
    .sheet-title {
      font-size: 11pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2mm;
    }
    .sheet-sub {
      font-size: 8.5pt;
      color: #475569;
      margin-bottom: 8mm;
    }
    .cards-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8mm;
      align-items: flex-start;
    }
    .card-wrap {
      display: flex;
      flex-direction: column;
      gap: 2mm;
    }
    .card-caption {
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
    }
    /* Dimensão física oficial CR80: 85.6mm x 54mm */
    .id-card {
      width: 85.6mm;
      height: 54mm;
      border-radius: 3.2mm;
      overflow: hidden;
      position: relative;
      border: 0.3mm solid #94a3b8;
      display: flex;
      flex-direction: column;
    }
    .front-header {
      height: 14.5mm;
      background: linear-gradient(180deg, #ffffff 0%, #f1f7fd 100%);
      padding: 1.5mm 3mm;
      display: flex;
      align-items: center;
      gap: 2.2mm;
    }
    .crimson-bar { height: 1.3mm; background: linear-gradient(90deg, #991b1b, #dc2626, #991b1b); }
    .white-bar { height: 0.45mm; background: ${info.ehAutoridade ? '#f59e0b' : '#38bdf8'}; }
    .front-body {
      flex: 1;
      background: linear-gradient(135deg, #071936 0%, #0d2b5c 52%, #133c7c 100%);
      padding: 1.8mm 2.8mm 2.2mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
    .cred-title {
      font-size: 6.2pt;
      font-weight: 800;
      letter-spacing: 0.14em;
      color: ${info.ehAutoridade ? '#fcd34d' : '#93c5fd'};
      text-align: left;
      width: 55mm;
    }
    .middle-area {
      width: 55mm;
      display: flex;
      flex-direction: column;
      gap: 1.3mm;
    }
    .row-reg {
      display: flex;
      gap: 1.5mm;
      align-items: stretch;
    }
    .reg-box {
      width: 15.5mm;
      background: rgba(255, 255, 255, 0.10);
      border: 0.25mm solid rgba(255, 255, 255, 0.22);
      border-radius: 1.4mm;
      padding: 0.7mm 1.5mm;
    }
    .role-banner {
      flex: 1;
      background: ${info.ehAutoridade ? 'linear-gradient(90deg, #b45309 0%, #d97706 55%, #f59e0b 100%)' : 'linear-gradient(90deg, #1d4ed8 0%, #2563eb 60%, #0284c7 100%)'};
      border-radius: 1.4mm;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 2.4mm;
      font-size: 8.2pt;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: 0.08em;
    }
    .field-pill {
      background: rgba(255, 255, 255, 0.96);
      border-left: 0.8mm solid ${info.ehAutoridade ? '#d97706' : '#2563eb'};
      border-radius: 1.4mm;
      padding: 0.7mm 1.8mm;
    }
    .lbl { font-size: 4.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; display: block; line-height: 1.05; }
    .val { font-size: 6.3pt; font-weight: 900; color: #0f172a; display: block; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .reg-box .lbl { color: #93c5fd; }
    .reg-box .val { color: #ffffff; font-size: 7.4pt; }
    .photo-box {
      position: absolute;
      right: 2.8mm;
      top: -6.5mm;
      width: 22.5mm;
      height: 27mm;
      border-radius: 2mm;
      overflow: hidden;
      background: linear-gradient(180deg, #f1f5f9 0%, #cbd5e1 100%);
      border: 0.55mm solid rgba(255,255,255,0.95);
    }
    .bottom-grid {
      display: grid;
      grid-template-columns: 1.12fr 1.02fr 0.95fr 0.91fr;
      gap: 1.3mm;
      margin-top: 1.2mm;
    }
    .mini-pill {
      background: rgba(15, 23, 42, 0.48);
      border: 0.25mm solid rgba(148, 163, 184, 0.28);
      border-radius: 1.3mm;
      padding: 0.7mm 1.3mm;
    }
    .mini-pill .lbl { font-size: 4.3pt; color: #93c5fd; }
    .mini-pill .val { font-size: 5.5pt; color: #f8fafc; }
    /* Verso */
    .back-header {
      height: 9mm;
      background: linear-gradient(90deg, #06357a 0%, #0b52b5 100%);
      padding: 1.5mm 3mm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #ffffff;
    }
    .back-header-title { font-size: 6.5pt; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }
    .back-header-reg { font-size: 6pt; font-weight: 700; color: #bae6fd; }
    .back-body {
      flex: 1;
      background: linear-gradient(180deg, #f8fafc 0%, #e0f2fe 100%);
      padding: 2.2mm 3mm 2mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .capelania-box {
      background: #eff6ff;
      border: 0.35mm solid #3b82f6;
      border-left: 1.2mm solid #1d4ed8;
      border-radius: 1.5mm;
      padding: 1.6mm 2mm;
    }
    .capelania-title { font-size: 5.5pt; font-weight: 900; color: #1e3a8a; letter-spacing: 0.04em; margin-bottom: 0.7mm; }
    .capelania-text { font-size: 5.1pt; line-height: 1.32; color: #1e293b; margin: 0; }
    .membro-box {
      background: #ffffff;
      border: 0.3mm solid #94a3b8;
      border-left: 1.2mm solid #0b52b5;
      border-radius: 1.5mm;
      padding: 1.8mm 2.2mm;
    }
    .membro-title { font-size: 5.6pt; font-weight: 900; color: #0b52b5; letter-spacing: 0.06em; margin-bottom: 0.8mm; }
    .membro-text { font-size: 5.4pt; line-height: 1.38; color: #334155; margin: 0; }
    .church-meta {
      font-size: 4.8pt;
      color: #475569;
      line-height: 1.3;
    }
    .sig-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 3mm;
    }
    .sig-line {
      flex: 1;
      border-top: 0.25mm solid #334155;
      padding-top: 0.6mm;
      text-align: center;
      font-size: 5pt;
      font-weight: 700;
      color: #0f172a;
    }
    .emissao {
      font-size: 4.7pt;
      color: #475569;
      text-align: right;
      white-space: nowrap;
    }
    .back-bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 2.5mm;
    }
    .back-bottom-left {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 1.6mm;
    }
    .qr-box {
      width: 15mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #ffffff;
      border: 0.3mm solid #cbd5e1;
      border-radius: 1.4mm;
      padding: 0.9mm;
      flex-shrink: 0;
    }
    .qr-box img {
      width: 13mm;
      height: 13mm;
      display: block;
    }
    .qr-caption {
      font-size: 3.6pt;
      font-weight: 800;
      color: #0d2b5c;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      margin-top: 0.4mm;
      text-align: center;
      line-height: 1;
    }
  </style>
</head>
<body>
  <div class="sheet-title">${esc(info.nomeIgreja)} — ${esc(info.tituloCredencial)}</div>
  <div class="sheet-sub">Formato padrão PVC CR80 (85,6 mm × 54 mm) • Recorte nas bordas para plastificação ou impressão em cartão.</div>

  <div class="cards-row">
    <div class="card-wrap">
      <span class="card-caption">Frente</span>
      <div class="id-card">
        <div class="front-header">
          ${logoHtml}
        </div>
        <div class="crimson-bar"></div>
        <div class="white-bar"></div>
        <div class="front-body">
          <div class="photo-box">${fotoHtml}</div>
          <div class="cred-title">${esc(info.tituloCredencial)}</div>
          <div class="middle-area">
            <div class="row-reg">
              <div class="reg-box">
                <span class="lbl">Nº Registro:</span>
                <span class="val">${esc(info.numRegistro)}</span>
              </div>
              <div class="role-banner">${esc(info.cargoBanner)}</div>
            </div>
            <div class="field-pill">
              <span class="lbl">Nome:</span>
              <span class="val">${esc(info.nomeUpper)}</span>
            </div>
            <div class="field-pill">
              <span class="lbl">Cidade/UF/País:</span>
              <span class="val">${esc(info.localidade)}</span>
            </div>
          </div>
          <div class="bottom-grid">
            <div class="mini-pill"><span class="lbl">CPF:</span><span class="val">${esc(info.cpfFmt)}</span></div>
            <div class="mini-pill"><span class="lbl">RG:</span><span class="val">${esc(info.rgFmt)}</span></div>
            <div class="mini-pill"><span class="lbl">Cargo Ministerial:</span><span class="val">${esc(info.cargoExibicao)}</span></div>
            <div class="mini-pill"><span class="lbl">Batizado em:</span><span class="val">${esc(info.filiadoDesde)}</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-wrap">
      <span class="card-caption">Verso</span>
      <div class="id-card">
        <div class="back-header">
          <span class="back-header-title">${esc(info.nomeIgreja)}</span>
          <span class="back-header-reg">REG. Nº ${esc(info.numRegistro)}</span>
        </div>
        <div class="crimson-bar"></div>
        <div class="back-body">
          ${textoVersoLegal}
          <div class="back-bottom">
            <div class="back-bottom-left">
              <div class="church-meta">
                ${info.cnpjIgreja ? `<strong>CNPJ:</strong> ${esc(info.cnpjIgreja)} ` : ''}
                ${info.telefoneIgreja ? `• <strong>Tel:</strong> ${esc(info.telefoneIgreja)} ` : ''}
                ${info.emailIgreja ? `• ${esc(info.emailIgreja)}` : ''}
                ${info.enderecoIgreja ? `<br/>${esc(info.enderecoIgreja)}` : ''}
              </div>
              <div class="sig-row">
                <div class="sig-line">${esc(info.pastorResponsavel)} • Pastor Responsável</div>
                <div class="emissao">Emissão: ${esc(info.dataEmissao)}<br/><strong>STATUS: ATIVO</strong></div>
              </div>
            </div>
            ${qrDataUrl ? `<div class="qr-box"><img src="${qrDataUrl}" alt="QR Code" /><span class="qr-caption">Autenticar</span></div>` : ''}
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

    const tituloAntigo = document.title;
    document.title = `Carteirinha - ${pessoa?.nome || 'Membro'}`;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      document.body.removeChild(iframe);
      document.title = tituloAntigo;
      return;
    }
    doc.open();
    doc.write(htmlDoc);
    doc.close();

    const limpar = () => {
      document.title = tituloAntigo;
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
    };

    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.onafterprint = limpar;
        iframe.contentWindow.print();
      } catch {
        limpar();
      }
      setTimeout(limpar, 2500);
    }, 250);
  };

  if (!pessoa) return null;

  const renderCartao = (fullLandscape = false) => {
    // Se o administrador ativou o Layout Personalizado em Configurações -> Carteirinha
    if (configCustom?.ativo) {
      const perfilCfg = configCustom[info.ehPastor ? 'pastor' : 'membro'] || configCustom.membro;
      const ladoCfg = perfilCfg?.[lado];
      const lay = ladoCfg?.layout || {};
      const renderTxt = (txt, el) => {
        const fonte = getFonteInfo(el?.font);
        return el?.versalete ? renderVersaleteCardJsx(txt, fonte.className) : txt;
      };
      const textoLegalCustom = info.ehPastor
        ? `DIREITO NACIONAL DE CAPELANIA — Ao portador desta credencial (${info.cargoExibicao}), é assegurado o livre acesso para assistência religiosa em hospitais, presídios e entidades civis/militares em todo o território nacional (Art. 5º, VII CF/88 e Lei nº 9.982/2000).`
        : `DECLARAÇÃO DE MEMBRESIA — Esta credencial é pessoal e intransferível, atestando que o portador é membro em plena comunhão com a ${info.nomeIgreja}, válida em todo o território nacional enquanto mantiver vínculo ativo.`;
      const dadosIgrejaCustom = [
        info.cnpjIgreja ? `CNPJ: ${info.cnpjIgreja}` : '',
        info.telefoneIgreja ? `Tel: ${info.telefoneIgreja}` : '',
        info.enderecoIgreja || '',
      ].filter(Boolean).join(' • ');

      return (
        <div
          className="relative w-full h-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(7,25,54,0.65)] border border-white/30 select-none"
          style={{
            containerType: 'inline-size',
            background: ladoCfg?.fundoImg
              ? '#ffffff'
              : lado === 'frente'
                ? 'linear-gradient(135deg, #071936 0%, #0d2b5c 52%, #133c7c 100%)'
                : 'linear-gradient(180deg, #f8fafc 0%, #e0f2fe 100%)',
          }}
        >
          {ladoCfg?.fundoImg ? (
            <img src={ladoCfg.fundoImg} alt="Fundo Carteirinha" className="absolute inset-0 w-full h-full object-cover" />
          ) : lado === 'frente' ? (
            <>
              <div className="absolute top-0 left-0 right-0 h-[27%]" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f1f7fd 100%)' }} />
              <div className="absolute top-[27%] left-0 right-0 h-[2.4%]" style={{ background: 'linear-gradient(90deg, #991b1b, #dc2626, #991b1b)' }} />
              <div className="absolute top-[29.4%] left-0 right-0 h-[0.9%]" style={{ backgroundColor: info.ehAutoridade ? '#f59e0b' : '#38bdf8' }} />
            </>
          ) : (
            <>
              <div className="absolute top-0 left-0 right-0 h-[16.5%]" style={{ background: 'linear-gradient(90deg, #06357a 0%, #0b52b5 100%)' }} />
              <div className="absolute top-[16.5%] left-0 right-0 h-[2.2%]" style={{ background: 'linear-gradient(90deg, #991b1b, #dc2626, #991b1b)' }} />
            </>
          )}

          {lado === 'frente' ? (
            <>
              {lay.logo && !lay.logo.hidden && (
                <img
                  src="/betesda-geral.png"
                  alt={info.nomeIgreja}
                  className="absolute object-contain object-left"
                  style={{ left: `${lay.logo.x}%`, top: `${lay.logo.y}%`, width: `${lay.logo.w}%`, height: `${lay.logo.h}%` }}
                />
              )}
              {lay.foto && !lay.foto.hidden && (
                <div
                  className="absolute rounded-xl overflow-hidden flex items-center justify-center shadow-md"
                  style={{
                    left: `${lay.foto.x}%`,
                    top: `${lay.foto.y}%`,
                    width: `${lay.foto.w}%`,
                    height: `${lay.foto.h}%`,
                    border: '2px solid rgba(255,255,255,0.95)',
                    background: 'linear-gradient(180deg, #e0f2fe, #bae6fd)',
                  }}
                >
                  {pessoa.foto_url ? (
                    <img src={pessoa.foto_url} alt={pessoa.nome} className="w-full h-full object-cover object-top" />
                  ) : (
                    <span style={{ fontSize: '9cqw', fontWeight: 900, color: '#0a52b8' }}>{info.nomeUpper.charAt(0)}</span>
                  )}
                </div>
              )}
              {lay.titulo && !lay.titulo.hidden && (
                <div className={`${getFonteInfo(lay.titulo.font).className} absolute whitespace-nowrap`} style={estiloTextoCardPreview(lay.titulo)}>
                  {renderTxt(info.tituloCredencial, lay.titulo)}
                </div>
              )}
              {lay.registro && !lay.registro.hidden && (
                <div
                  className={`${getFonteInfo(lay.registro.font).className} absolute px-1.5 py-0.5 rounded-md`}
                  style={{ ...estiloTextoCardPreview(lay.registro), backgroundColor: ladoCfg?.fundoImg ? 'transparent' : 'rgba(255,255,255,0.12)' }}
                >
                  <span className="block" style={{ fontSize: '1.7cqw', color: '#93c5fd', fontWeight: 700, lineHeight: 1 }}>Nº REGISTRO</span>
                  <span className="block">{renderTxt(info.numRegistro, lay.registro)}</span>
                </div>
              )}
              {lay.cargoBanner && !lay.cargoBanner.hidden && (
                <div
                  className={`${getFonteInfo(lay.cargoBanner.font).className} absolute px-2 py-1 rounded-md`}
                  style={{
                    ...estiloTextoCardPreview(lay.cargoBanner),
                    background: ladoCfg?.fundoImg
                      ? 'transparent'
                      : info.ehAutoridade
                        ? 'linear-gradient(90deg, #b45309, #d97706, #f59e0b)'
                        : 'linear-gradient(90deg, #1d4ed8, #2563eb, #0284c7)',
                  }}
                >
                  {renderTxt(info.cargoBanner, lay.cargoBanner)}
                </div>
              )}
              {lay.nome && !lay.nome.hidden && (
                <div
                  className={`${getFonteInfo(lay.nome.font).className} absolute px-2 py-0.5 rounded-md truncate`}
                  style={{
                    ...estiloTextoCardPreview(lay.nome),
                    backgroundColor: ladoCfg?.fundoImg ? 'transparent' : 'rgba(255,255,255,0.96)',
                    borderLeft: ladoCfg?.fundoImg ? 'none' : `3px solid ${info.ehAutoridade ? '#d97706' : '#2563eb'}`,
                  }}
                >
                  <span className="block" style={{ fontSize: '1.7cqw', color: '#64748b', fontWeight: 700, lineHeight: 1 }}>NOME</span>
                  <span className="block truncate">{renderTxt(pessoa.nome || info.nomeUpper, lay.nome)}</span>
                </div>
              )}
              {lay.localidade && !lay.localidade.hidden && (
                <div
                  className={`${getFonteInfo(lay.localidade.font).className} absolute px-2 py-0.5 rounded-md truncate`}
                  style={{
                    ...estiloTextoCardPreview(lay.localidade),
                    backgroundColor: ladoCfg?.fundoImg ? 'transparent' : 'rgba(255,255,255,0.96)',
                    borderLeft: ladoCfg?.fundoImg ? 'none' : `3px solid ${info.ehAutoridade ? '#d97706' : '#2563eb'}`,
                  }}
                >
                  <span className="block" style={{ fontSize: '1.7cqw', color: '#64748b', fontWeight: 700, lineHeight: 1 }}>CIDADE/UF/PAÍS</span>
                  <span className="block truncate">{renderTxt(info.localidade, lay.localidade)}</span>
                </div>
              )}
              {[
                { key: 'cpf', lbl: 'CPF', val: info.cpfFmt },
                { key: 'rg', lbl: 'RG', val: info.rgFmt },
                { key: 'cargo', lbl: 'CARGO', val: info.cargoExibicao },
                { key: 'filiado', lbl: 'BATIZADO EM', val: info.filiadoDesde },
              ].map((it) => {
                const el = lay[it.key];
                if (!el || el.hidden) return null;
                return (
                  <div
                    key={it.key}
                    className={`${getFonteInfo(el.font).className} absolute px-1.5 py-0.5 rounded-md truncate`}
                    style={{ ...estiloTextoCardPreview(el), backgroundColor: ladoCfg?.fundoImg ? 'transparent' : 'rgba(15,23,42,0.52)' }}
                  >
                    <span className="block" style={{ fontSize: '1.6cqw', color: '#93c5fd', fontWeight: 700, lineHeight: 1 }}>{it.lbl}</span>
                    <span className="block truncate">{renderTxt(it.val, el)}</span>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {lay.igrejaHeader && !lay.igrejaHeader.hidden && (
                <div className={`${getFonteInfo(lay.igrejaHeader.font).className} absolute truncate`} style={estiloTextoCardPreview(lay.igrejaHeader)}>
                  {renderTxt(info.nomeIgreja, lay.igrejaHeader)}
                </div>
              )}
              {lay.regVerso && !lay.regVerso.hidden && (
                <div className={`${getFonteInfo(lay.regVerso.font).className} absolute whitespace-nowrap`} style={estiloTextoCardPreview(lay.regVerso)}>
                  {renderTxt(`REG. Nº ${info.numRegistro}`, lay.regVerso)}
                </div>
              )}
              {lay.textoLegal && !lay.textoLegal.hidden && (
                <div
                  className={`${getFonteInfo(lay.textoLegal.font).className} absolute p-1.5 rounded-md`}
                  style={{
                    ...estiloTextoCardPreview(lay.textoLegal),
                    backgroundColor: ladoCfg?.fundoImg ? 'transparent' : 'rgba(255,255,255,0.88)',
                    borderLeft: ladoCfg?.fundoImg ? 'none' : '3px solid #1d4ed8',
                  }}
                >
                  {textoLegalCustom}
                </div>
              )}
              {lay.dadosIgreja && !lay.dadosIgreja.hidden && (
                <div className={`${getFonteInfo(lay.dadosIgreja.font).className} absolute`} style={estiloTextoCardPreview(lay.dadosIgreja)}>
                  {dadosIgrejaCustom}
                </div>
              )}
              {lay.assinatura && !lay.assinatura.hidden && (
                <div
                  className={`${getFonteInfo(lay.assinatura.font).className} absolute pt-0.5`}
                  style={{ ...estiloTextoCardPreview(lay.assinatura), borderTop: `1px solid ${lay.assinatura.color || '#334155'}` }}
                >
                  {renderTxt(`${info.pastorResponsavel} • Pastor Responsável`, lay.assinatura)}
                </div>
              )}
              {lay.emissao && !lay.emissao.hidden && (
                <div className={`${getFonteInfo(lay.emissao.font).className} absolute`} style={estiloTextoCardPreview(lay.emissao)}>
                  {`Emissão: ${info.dataEmissao} • ATIVO`}
                </div>
              )}
              {lay.qrCode && !lay.qrCode.hidden && info.urlValidacao && (
                <div
                  className="absolute rounded-lg p-1 flex flex-col items-center justify-center shadow-xs"
                  style={{
                    left: `${lay.qrCode.x}%`,
                    top: `${lay.qrCode.y}%`,
                    width: `${lay.qrCode.w}%`,
                    height: `${lay.qrCode.h}%`,
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                  }}
                >
                  <QRCodeSVG value={info.urlValidacao} size={64} bgColor="#ffffff" fgColor="#071936" style={{ width: '82%', height: 'auto' }} />
                  <span style={{ fontSize: '1.5cqw', fontWeight: 800, color: '#0d2b5c', marginTop: '2px' }}>AUTENTICAR</span>
                </div>
              )}
            </>
          )}

          {(ladoCfg?.imagensExtras || [])
            .filter((imgEl) => !imgEl.hidden)
            .map((imgEl) => (
              <img
                key={imgEl.id}
                src={imgEl.src}
                alt={imgEl.label}
                className="absolute object-contain"
                style={{ left: `${imgEl.x}%`, top: `${imgEl.y}%`, width: `${imgEl.w}%`, height: `${imgEl.h}%`, zIndex: 18 }}
              />
            ))}
        </div>
      );
    }

    if (lado === 'frente') {
      return (
        /* ── FRENTE DA CARTEIRINHA (Elegante & Moderna) ── */
        <div
          className="relative w-full h-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(7,25,54,0.65)] border border-white/30 flex flex-col select-none"
          style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
        >
          {/* Topo Claro Pérola + Logo Oficial Betesda */}
          <div
            className={`h-[27%] flex items-center ${fullLandscape ? 'px-5' : 'px-4 sm:px-5'}`}
            style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f1f7fd 100%)' }}
          >
            <img
              src="/betesda-geral.png"
              alt={info.nomeIgreja}
              className="h-[78%] max-w-[66%] w-auto object-contain object-left"
            />
          </div>

          {/* Faixa Rubi + Filete de Destaque */}
          <div className="h-[5px] sm:h-[6px] w-full shrink-0" style={{ background: 'linear-gradient(90deg, #991b1b, #dc2626, #991b1b)' }} />
          <div
            className="h-[2px] w-full shrink-0"
            style={{ background: info.ehAutoridade ? 'linear-gradient(90deg, #d97706, #fbbf24, #d97706)' : 'linear-gradient(90deg, #0284c7, #38bdf8, #0284c7)' }}
          />

          {/* Corpo Azul Marinho Executivo */}
          <div
            className={`relative flex-1 flex flex-col justify-between ${fullLandscape ? 'px-4 pt-2 pb-2.5' : 'px-3 sm:px-4 pt-1.5 sm:pt-2 pb-2 sm:pb-3'}`}
            style={{ background: 'linear-gradient(135deg, #071936 0%, #0d2b5c 52%, #133c7c 100%)' }}
          >
            {/* Foto 3x4 sobrepondo levemente a faixa divisória */}
            <div
              className={`absolute w-[26.5%] aspect-[0.83/1] rounded-xl overflow-hidden shadow-xl ${fullLandscape ? 'right-4 -top-7' : 'right-3 sm:right-4 -top-6 sm:-top-8'}`}
              style={{
                background: 'linear-gradient(180deg, #f1f5f9 0%, #cbd5e1 100%)',
                border: '2.5px solid rgba(255,255,255,0.95)',
              }}
            >
              {pessoa.foto_url ? (
                <img
                  src={pessoa.foto_url}
                  alt={pessoa.nome}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl font-black" style={{ color: '#0d2b5c' }}>
                  {info.nomeUpper.charAt(0)}
                </div>
              )}
            </div>

            {/* Título da Credencial */}
            <div className="w-[69%]">
              <span
                className={`${fullLandscape ? 'text-[10.5px]' : 'text-[8.5px] sm:text-[11px]'} font-extrabold tracking-[0.16em] uppercase`}
                style={{ color: info.ehAutoridade ? '#fcd34d' : '#93c5fd' }}
              >
                {info.tituloCredencial}
              </span>
            </div>

            {/* Coluna Esquerda de Campos */}
            <div className={`w-[69%] ${fullLandscape ? 'space-y-1.5' : 'space-y-1.5 sm:space-y-2'}`}>
              {/* Nº Registro + Tarja do Cargo */}
              <div className="flex items-stretch gap-2">
                <div
                  className="w-[29%] rounded-lg px-2 py-1"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.10)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                  }}
                >
                  <span className={`block ${fullLandscape ? 'text-[7.5px]' : 'text-[6.5px] sm:text-[8px]'} font-bold uppercase tracking-wider leading-none`} style={{ color: '#93c5fd' }}>
                    Registro
                  </span>
                  <span className={`block ${fullLandscape ? 'text-sm' : 'text-[11px] sm:text-sm'} font-black leading-tight mt-0.5 tabular-nums`} style={{ color: '#ffffff' }}>
                    {info.numRegistro}
                  </span>
                </div>
                <div
                  className="flex-1 rounded-lg px-3 flex items-center justify-end shadow-sm"
                  style={{
                    background: info.ehAutoridade
                      ? 'linear-gradient(90deg, #b45309 0%, #d97706 55%, #f59e0b 100%)'
                      : 'linear-gradient(90deg, #1d4ed8 0%, #2563eb 60%, #0284c7 100%)',
                  }}
                >
                  <span className={`${fullLandscape ? 'text-sm' : 'text-[10.5px] sm:text-[15px]'} font-black tracking-[0.08em] uppercase truncate`} style={{ color: '#ffffff' }}>
                    {info.cargoBanner}
                  </span>
                </div>
              </div>

              {/* Nome */}
              <div
                className="rounded-lg px-2.5 py-1 shadow-xs"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  borderLeft: `3.5px solid ${info.ehAutoridade ? '#d97706' : '#2563eb'}`,
                }}
              >
                <span className={`block ${fullLandscape ? 'text-[7.5px]' : 'text-[6.5px] sm:text-[8px]'} font-bold uppercase tracking-wider leading-none`} style={{ color: '#64748b' }}>
                  Nome
                </span>
                <span className={`block ${fullLandscape ? 'text-[12px]' : 'text-[9.5px] sm:text-[12.5px]'} font-black leading-tight mt-0.5 truncate`} style={{ color: '#0f172a' }}>
                  {info.nomeUpper}
                </span>
              </div>

              {/* Cidade/UF/País */}
              <div
                className="rounded-lg px-2.5 py-1 shadow-xs"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  borderLeft: `3.5px solid ${info.ehAutoridade ? '#d97706' : '#2563eb'}`,
                }}
              >
                <span className={`block ${fullLandscape ? 'text-[7.5px]' : 'text-[6.5px] sm:text-[8px]'} font-bold uppercase tracking-wider leading-none`} style={{ color: '#64748b' }}>
                  Cidade / UF / País
                </span>
                <span className={`block ${fullLandscape ? 'text-[11px]' : 'text-[9px] sm:text-[11.5px]'} font-extrabold leading-tight mt-0.5 truncate`} style={{ color: '#0f172a' }}>
                  {info.localidade}
                </span>
              </div>
            </div>

            {/* Faixa Inferior: 4 Campos em Vidro Escuro Fosco */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mt-1.5">
              {[
                { label: 'CPF', valor: info.cpfFmt },
                { label: 'RG', valor: info.rgFmt },
                { label: 'Cargo Ministerial', valor: info.cargoExibicao },
                { label: 'Batizado em', valor: info.filiadoDesde },
              ].map((campo) => (
                <div
                  key={campo.label}
                  className="rounded-lg px-2 py-1"
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.48)',
                    border: '1px solid rgba(148, 163, 184, 0.28)',
                  }}
                >
                  <span className={`block ${fullLandscape ? 'text-[7px]' : 'text-[6px] sm:text-[7.5px]'} font-bold uppercase tracking-wider leading-none truncate`} style={{ color: '#93c5fd' }}>
                    {campo.label}
                  </span>
                  <span className={`block ${fullLandscape ? 'text-[10px]' : 'text-[8px] sm:text-[10.5px]'} font-extrabold leading-tight mt-0.5 truncate`} style={{ color: '#f8fafc' }}>
                    {campo.valor}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      /* ── VERSO DA CARTEIRINHA (Capelania Federal + QR Code) ── */
      <div
        className="relative w-full h-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(6,53,122,0.55)] border border-white/40 flex flex-col select-none"
        style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
      >
        <div
          className="px-4 py-2 flex items-center justify-between text-white shrink-0"
          style={{ background: 'linear-gradient(90deg, #06357a 0%, #0b52b5 100%)' }}
        >
          <span className={`${fullLandscape ? 'text-xs' : 'text-[10px] sm:text-xs'} font-black uppercase tracking-wider truncate`}>
            {info.nomeIgreja}
          </span>
          <span className={`${fullLandscape ? 'text-[11px]' : 'text-[9px] sm:text-[11px]'} font-bold text-sky-200 shrink-0 tabular-nums`}>
            REG. Nº {info.numRegistro}
          </span>
        </div>
        <div className="h-[4px] w-full bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#991b1b] shrink-0" />

        <div
          className={`flex-1 flex flex-col justify-between gap-2 ${fullLandscape ? 'p-4' : 'p-3.5 sm:p-5'}`}
          style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #e0f2fe 100%)', color: '#0f172a' }}
        >
          {info.ehPastor ? (
            <div
              className={`${fullLandscape ? 'p-3' : 'p-2.5 sm:p-3.5'} rounded-xl space-y-1`}
              style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #93c5fd',
                borderLeft: '4px solid #1d4ed8',
              }}
            >
              <div
                className={`flex items-center gap-1.5 ${fullLandscape ? 'text-[10.5px]' : 'text-[9px] sm:text-[11px]'} font-black uppercase tracking-wide`}
                style={{ color: '#1e3a8a' }}
              >
                <Scale size={13} style={{ color: '#1d4ed8', flexShrink: 0 }} />
                <span style={{ color: '#1e3a8a' }}>Direito Nacional de Capelania — Lei Federal</span>
              </div>
              <p className={`${fullLandscape ? 'text-[10px]' : 'text-[8.5px] sm:text-[10.5px]'} leading-snug`} style={{ color: '#1e293b' }}>
                Ao portador desta credencial, na condição de Ministro do Evangelho (<strong style={{ color: '#0f172a' }}>{info.cargoExibicao}</strong>), é assegurado o direito de livre acesso para prestação de assistência religiosa e capelania em entidades civis e militares de internação coletiva (hospitais, presídios, instituições militares e educacionais) em todo o território nacional, conforme <strong style={{ color: '#0f172a' }}>Art. 5º, inciso VII da Constituição Federal</strong> e <strong style={{ color: '#0f172a' }}>Lei Federal nº 9.982/2000</strong>.
              </p>
            </div>
          ) : (
            <div
              className={`${fullLandscape ? 'p-3.5' : 'p-3 sm:p-4'} rounded-xl space-y-1.5`}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderLeft: '4px solid #0b52b5',
              }}
            >
              <div
                className={`flex items-center gap-1.5 ${fullLandscape ? 'text-xs' : 'text-[9.5px] sm:text-xs'} font-black uppercase tracking-wider`}
                style={{ color: '#0b52b5' }}
              >
                <ShieldCheck size={14} style={{ color: '#0b52b5', flexShrink: 0 }} />
                <span style={{ color: '#0b52b5' }}>Declaração de Membresia</span>
              </div>
              <p className={`${fullLandscape ? 'text-[10.5px]' : 'text-[9px] sm:text-[11px]'} leading-relaxed`} style={{ color: '#1e293b' }}>
                Esta credencial é de uso pessoal e intransferível, atestando que o portador é membro em plena comunhão e regularidade com a <strong style={{ color: '#0f172a' }}>{info.nomeIgreja}</strong>, sendo válida em todo o território nacional enquanto mantiver vínculo ativo com a igreja.
              </p>
            </div>
          )}

          <div className="flex items-end justify-between gap-3 pt-0.5">
            <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
              <div className={`${fullLandscape ? 'text-[9px]' : 'text-[8px] sm:text-[9.5px]'} leading-tight space-y-0.5`} style={{ color: '#334155' }}>
                {(info.cnpjIgreja || info.telefoneIgreja || info.emailIgreja) && (
                  <p className="truncate" style={{ color: '#334155' }}>
                    {info.cnpjIgreja ? `CNPJ: ${info.cnpjIgreja}` : ''}
                    {info.telefoneIgreja ? ` • Tel: ${info.telefoneIgreja}` : ''}
                    {info.emailIgreja ? ` • ${info.emailIgreja}` : ''}
                  </p>
                )}
                {info.enderecoIgreja && <p className="truncate" style={{ color: '#475569' }}>{info.enderecoIgreja}</p>}
              </div>

              <div className="flex items-end justify-between gap-3 pt-1">
                <div className="flex-1 pt-1 text-center" style={{ borderTop: '1px solid #334155' }}>
                  <span className={`block ${fullLandscape ? 'text-[9px]' : 'text-[8px] sm:text-[9.5px]'} font-bold truncate`} style={{ color: '#0f172a' }}>
                    {info.pastorResponsavel} • Pastor Responsável
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className={`block ${fullLandscape ? 'text-[8px]' : 'text-[7px] sm:text-[8.5px]'}`} style={{ color: '#475569' }}>Emissão: {info.dataEmissao}</span>
                  <span className={`block ${fullLandscape ? 'text-[8.5px]' : 'text-[7.5px] sm:text-[9px]'} font-black uppercase`} style={{ color: '#047857' }}>Status: Ativo</span>
                </div>
              </div>
            </div>

            {info.urlValidacao && (
              <div
                className="shrink-0 flex flex-col items-center p-1.5 rounded-xl shadow-xs"
                style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1' }}
                title="Escaneie para validar a autenticidade digital desta credencial"
              >
                <QRCodeSVG
                  value={info.urlValidacao}
                  size={58}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#071936"
                  className={fullLandscape ? 'w-[56px] h-[56px]' : 'w-12 h-12 sm:w-[58px] sm:h-[58px]'}
                />
                <span
                  className="text-[6.5px] font-black uppercase tracking-wider mt-0.5 leading-none"
                  style={{ color: '#0d2b5c' }}
                >
                  Autenticar
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ── MODO MOBILE RETRATO: TELA CHEIA ROTACIONADA EM HORIZONTAL (PAISAGEM) ── */
  if (isMobilePortrait) {
    const landscapeW = viewport.h;
    const landscapeH = viewport.w;
    const alturaDisponivel = Math.max(200, landscapeH - 64);
    const larguraDisponivel = Math.max(300, landscapeW - 28);
    const cardH = Math.min(alturaDisponivel, larguraDisponivel / 1.586);
    const cardW = cardH * 1.586;

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Carteirinha de Membro em Tela Cheia"
        className="fixed inset-0 z-[140] bg-[#060f1e] overflow-hidden select-none"
      >
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: `${landscapeW}px`,
            height: `${landscapeH}px`,
            transform: 'translate(-50%, -50%) rotate(90deg)',
            transformOrigin: 'center center',
          }}
          className="flex flex-col items-center justify-between px-4 py-2.5"
        >
          {/* Barra Superior Compacta em Paisagem */}
          <div className="w-full flex items-center justify-between gap-2 shrink-0">
            <div className="inline-flex p-0.5 rounded-xl bg-white/10 border border-white/15">
              <button
                type="button"
                onClick={() => setLado('frente')}
                className={`px-3 py-1 rounded-lg text-[11px] font-extrabold transition cursor-pointer ${
                  lado === 'frente' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300'
                }`}
              >
                Frente
              </button>
              <button
                type="button"
                onClick={() => setLado('verso')}
                className={`px-3 py-1 rounded-lg text-[11px] font-extrabold transition cursor-pointer ${
                  lado === 'verso' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300'
                }`}
              >
                Verso {info.ehPastor ? '• Capelania' : '• QR'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {info.urlValidacao && (
                <a
                  href={info.urlValidacao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-blue-200 text-[11px] font-bold"
                >
                  <ExternalLink size={12} />
                  <span>Validar</span>
                </a>
              )}
              <button
                type="button"
                onClick={handleImprimirCarteirinha}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-[11px] font-extrabold shadow-sm cursor-pointer active:scale-95"
              >
                <Printer size={13} />
                <span>PDF</span>
              </button>
              <button
                type="button"
                onClick={onFechar}
                aria-label="Fechar carteirinha"
                className="w-8 h-8 rounded-full bg-white/15 border border-white/20 text-white flex items-center justify-center cursor-pointer active:scale-95"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Cartão Maximizado em Paisagem */}
          <div className="flex-1 w-full flex items-center justify-center">
            <div style={{ width: `${cardW}px`, height: `${cardH}px` }}>
              {renderCartao(true)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Carteirinha de Membro"
      onClick={onFechar}
      className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#131d31] border border-slate-200/80 dark:border-[#2b3954] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-auto"
      >
        {/* Cabeçalho do Modal */}
        <div className="px-5 py-4 bg-slate-50 dark:bg-[#0f172a] border-b border-slate-200/80 dark:border-[#2b3954] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/15 dark:bg-blue-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <CreditCard size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 truncate">
                {info.tituloCredencial}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Preenchida automaticamente com os dados de <strong>{pessoa.nome}</strong>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar carteirinha"
            className="w-9 h-9 rounded-full bg-white dark:bg-[#1c2b4a] border border-slate-200 dark:border-[#2b3954] text-slate-500 dark:text-slate-300 hover:text-rose-500 flex items-center justify-center transition cursor-pointer shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Corpo com a Carteirinha Visual */}
        <div className="p-4 sm:p-6 space-y-5 bg-gradient-to-b from-slate-100/80 to-white dark:from-[#0b1329] dark:to-[#131d31]">
          {/* Alternador Frente / Verso */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="inline-flex p-1 rounded-xl bg-white dark:bg-[#17223b] border border-slate-200 dark:border-[#2b3954] shadow-2xs">
              <button
                type="button"
                onClick={() => setLado('frente')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                  lado === 'frente'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Frente
              </button>
              <button
                type="button"
                onClick={() => setLado('verso')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                  lado === 'verso'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Verso {info.ehPastor ? '• Capelania' : ''}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setLado((prev) => (prev === 'frente' ? 'verso' : 'frente'))}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              <RotateCw size={14} />
              Virar carteira
            </button>
          </div>

          {/* CARTÃO CR80 */}
          <div className="mx-auto w-full max-w-[540px]">
            {renderCartao(false)}
          </div>

          {/* Aviso de Destaque de Capelania Federal para Perfil Pastor */}
          {info.ehPastor && (
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Scale size={16} />
              </div>
              <div className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
                <strong className="font-black block">Credencial Pastoral com Direito Nacional de Capelania</strong>
                O verso desta credencial inclui automaticamente o amparo legal da <strong>Constituição Federal (Art. 5º, VII)</strong> e da <strong>Lei Federal nº 9.982/2000</strong> para atuação em hospitais, presídios e instituições civis ou militares.
              </div>
            </div>
          )}
        </div>

        {/* Rodapé de Ações */}
        <div className="px-5 py-4 bg-slate-50 dark:bg-[#0f172a] border-t border-slate-200/80 dark:border-[#2b3954] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span>
              Impressão oficial <strong>PVC CR80 (85,6 × 54 mm)</strong> — Frente e Verso.
            </span>
            {info.urlValidacao && (
              <a
                href={info.urlValidacao}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                <span>Testar validação</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onFechar}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#2b3954] bg-white dark:bg-[#1c2b4a] text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-[#24375c] transition cursor-pointer"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={handleImprimirCarteirinha}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm transition cursor-pointer active:scale-95"
            >
              <Printer size={15} />
              Imprimir / Salvar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
