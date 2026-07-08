import { useState, useMemo, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { Card, PageHeader } from './ui';
import { registrarLogFinanceiro } from './financeiroUtils';
import { toPng } from 'html-to-image';

const exportStylesRelatorio = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  * { box-sizing: border-box; }
  .exp-wrapper { width: 1080px; height: 1920px; background: #2d1457; display: flex; flex-direction: column; align-items: center; font-family: 'Roboto', sans-serif; box-sizing: border-box; }
  .exp-banner { width: 960px; margin-top: 60px; background: linear-gradient(135deg, #2d1457 0%, #5a2d9c 60%, #7c3fc0 100%); padding: 60px; display: flex; align-items: center; gap: 40px; position: relative; shrink: 0; border-radius: 50px 50px 0 0}
  .exp-banner-icon { width: 230px; height: 230px; background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); border-radius: 30px; display: flex; align-items: center; justify-content: center; }
  .exp-banner-text { display: flex; flex-direction: column; align-items: center; text-align: center; }
  .exp-banner-text .label { font-size: 28px; font-weight: 300; letter-spacing: 0.2em; color: #c9a8f0; text-transform: uppercase; }
  .exp-banner-text .title { font-size: 72px; font-weight: 900; color: #ffffff; line-height: 1; margin-top: -10px;}
  .exp-banner-text .sub { font-size: 24px; color: rgba(255,255,255,0.7); margin-top: 10px; font-style: italic; }
  .exp-data-badge { display: inline-block; margin-top: 30px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); border-radius: 50px; padding: 10px 50px; font-size: 28px; font-weight: 700; color: #fff; }
  .exp-data-badge span { display: inline-block; transform: translateY(-12px); }
  .exp-panel { width: 960px; background: linear-gradient(160deg, #f5eeff 0%, #ede0ff 100%); border-radius: 0 0 60px 60px; padding: 50px 60px; box-shadow: 0 40px 100px rgba(0,0,0,0.4); flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .exp-field { margin-bottom: 32px; display: flex; flex-direction: column; align-items: center; }
  .exp-field-label { font-size: 22px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #4a2080; margin-bottom: 12px; }
  .exp-pill { width: 100%; height: 110px; background: linear-gradient(180deg, #d0c4e8 0%, #a898c8 40%, #c0b4dc 100%); border-radius: 100px; border: 2px solid rgba(255,255,255,0.4); box-shadow: 0 15px 30px rgba(90,45,156,0.2); display: flex; align-items: center; justify-content: center; padding-bottom: 12px; }
  .exp-pill-val { font-size: 50px; font-weight: 900; color: #2a1050; line-height: 1; transform: translateY(-15px); }
  .exp-total-row { margin-top: 30px; padding-top: 30px; border-top: 2px solid rgba(90,45,156,0.1); text-align: center; }
  .exp-total-label { font-size: 28px; font-weight: 700; color: #5a2d9c; text-transform: uppercase; letter-spacing: 0.1em; }
  .exp-total-val { font-size: 80px; font-weight: 900; color: #2d1457; margin-top: 5px; }
  .exp-footer { width: 100%; background: #2d1457; padding: 40px; display: flex; align-items: center; justify-content: center; gap: 30px; shrink: 0; }
  .exp-footer-logo { height: 150px; object-fit: contain; }
  .exp-footer-text { font-family: 'Cinzel', serif; font-size: 45px; font-weight: 700; color: #fff; }
`;

export default function RelatorioSemanal({ usuarioLogado }) {
  const [valores, setValores] = useState({
    socorroPovo: 0,
    socorro: 0,
    gratidao: 0,
    semeadura: 0,
    israel: 0
  });
  const [carregando, setCarregando] = useState(false);
  const [mostrarPreview, setMostrarPreview] = useState(false);
  const [dataRelatorio, setDataRelatorio] = useState(() => new Date().toISOString().split('T')[0]);
  const [calendarioAberto, setCalendarioAberto] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());

  const formatarParaISO = (date) => {
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const formatarExibicao = (iso) => {
    if (!iso) return '__/__/____';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  };

  const diasCalendario = useMemo(() => {
    const ano = viewDate.getFullYear();
    const mes = viewDate.getMonth();
    const primeiroDiaMes = new Date(ano, mes, 1).getDay();
    const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();
    const dias = [];
    for (let i = 0; i < (primeiroDiaMes === 0 ? 6 : primeiroDiaMes - 1); i++) dias.push(null);
    for (let d = 1; d <= ultimoDiaMes; d++) dias.push(new Date(ano, mes, d));
    return dias;
  }, [viewDate]);

  const handleSelecionarDia = (dia) => {
    setDataRelatorio(formatarParaISO(dia));
    setCalendarioAberto(false);
  };

  const total = useMemo(() => {
    return Object.values(valores).reduce((acc, val) => acc + (Number(val) || 0), 0);
  }, [valores]);

  const formatBRL = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleInputChange = (field, value) => {
    setValores(prev => ({ ...prev, [field]: value }));
  };

  const CalendarPopup = () => (
    <div className="absolute top-full right-0 mt-2 z-[100] bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 w-72 text-slate-800">
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400">‹</button>
        <span className="text-sm font-bold text-slate-700">{viewDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</span>
        <button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-300 mb-2">
        {['S','T','Q','Q','S','S','D'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {diasCalendario.map((dia, i) => {
          if (!dia) return <div key={i} />;
          const dStr = formatarParaISO(dia);
          const ativo = dStr === dataRelatorio;
          return (
            <button
              key={i} type="button" onClick={() => handleSelecionarDia(dia)}
              className={`h-8 w-8 text-xs rounded-lg transition-colors ${ativo ? 'bg-[#2d1457] text-white font-bold' : 'hover:bg-slate-50 text-slate-600'}`}
            >
              {dia.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );

  const handleExportarPNG = async () => {
    setCarregando(true);
    const container = document.createElement('div');
    try {
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '1080px';
      container.style.height = '1920px';
      container.style.overflow = 'hidden';

      const styleTag = document.createElement('style');
      styleTag.innerHTML = exportStylesRelatorio;
      container.appendChild(styleTag);

      const content = document.createElement('div');
      content.className = 'exp-wrapper';
      const dataStr = formatarExibicao(dataRelatorio);

      content.innerHTML = `
        <div class="exp-banner">
          <div class="exp-banner-icon">
            <svg width="230" height="230" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="28" width="6" height="14" rx="2" fill="#d4a843" />
              <rect x="16" y="20" width="6" height="22" rx="2" fill="#9b59d8" />
              <rect x="26" y="14" width="6" height="28" rx="2" fill="#c9a8f0" />
              <rect x="36" y="8"  width="6" height="34" rx="2" fill="#d4a843" />
              <polyline points="9,26 19,17 29,11 39,6" stroke="white" stroke-width="2" fill="none" />
            </svg>
          </div>
          <div class="exp-banner-text">
            <div class="label">Relatório</div>
            <div class="title">Semanal</div>
            <div class="sub">Pr. Jadson e Pra. Auriana</div>
            <div class="exp-data-badge"><span>${dataStr}</span></div>
          </div>
        </div>
        <div class="exp-panel">
          <div class="exp-field">
            <div class="exp-field-label">Oferta de Socorro (Povo)</div>
            <div class="exp-pill"><span class="exp-pill-val">${formatBRL(valores.socorroPovo)}</span></div>
          </div>
          <div class="exp-field">
            <div class="exp-field-label">Oferta de Socorro</div>
            <div class="exp-pill"><span class="exp-pill-val">${formatBRL(valores.socorro)}</span></div>
          </div>
          <div class="exp-field">
            <div class="exp-field-label">Oferta de Gratidão</div>
            <div class="exp-pill"><span class="exp-pill-val">${formatBRL(valores.gratidao)}</span></div>
          </div>
          <div class="exp-field">
            <div class="exp-field-label">Semeadura</div>
            <div class="exp-pill"><span class="exp-pill-val">${formatBRL(valores.semeadura)}</span></div>
          </div>
          <div class="exp-field">
            <div class="exp-field-label">Oferta de Israel</div>
            <div class="exp-pill"><span class="exp-pill-val">${formatBRL(valores.israel)}</span></div>
          </div>
          <div class="exp-total-row">
            <div class="exp-total-label">Total da Semana</div>
            <div class="exp-total-val">${formatBRL(total)}</div>
          </div>
        </div>
        <div class="exp-footer">
          <img src="https://guznbiqposfhqalqjggw.supabase.co/storage/v1/object/public/fotos-membros/logo_betesda_branca.png" class="exp-footer-logo" />
        </div>
      `;

      container.appendChild(content);
      document.body.appendChild(container);

      const imgData = await toPng(content, {
        width: 1080,
        height: 1920,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: '1080px',
          height: '1920px'
        },
        useCORS: true,
        cacheBust: true,
        backgroundColor: '#2d1457',
      });
      const link = document.createElement('a');
      const fileName = `Relatorio_Semanal_${dataStr.replace(/\//g, '-')}.png`;
      link.download = fileName;
      link.href = imgData;

      if (navigator.share) {
        const blob = await (await fetch(imgData)).blob();
        const file = new File([blob], fileName, { type: 'image/png' });
        await navigator.share({ 
          files: [file], 
          title: 'Relatório Semanal',
          text: 'Este é o nosso relatório da semana.' 
        }).catch(() => link.click());
      } else {
        link.click();
      }

      await registrarLogFinanceiro(usuarioLogado?.email, 'Relatório Semanal Exportado', `Total: ${formatBRL(total)}`);
    } catch (err) {
      console.error(err);
    } finally {
      if (document.body.contains(container)) document.body.removeChild(container);
      setCarregando(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-0 px-0 pb-12 sm:px-6 space-y-6 mx-[-3px] sm:mx-auto">
      <div className="mx-[3px] sm:mx-0">
        <PageHeader titulo="Relatório Semanal" breadcrumb={['Utilitários', 'Relatório Semanal']} />
      </div>
      
      <Card className="p-0 overflow-hidden border-none shadow-2xl rounded-3xl">
        {/* Cabeçalho Visual (Adaptado do seu HTML) */}
        <div className="p-6 bg-gradient-to-br from-[#2d1457] to-[#5a2d9c] text-white flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
             <span className="text-2xl">📊</span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-200">Relatório</p>
            <h2 className="text-3xl font-bold tracking-tight">Semanal</h2>
            <p className="text-[10px] opacity-70 italic">Pr. Jadson e Pra. Auriana</p>
          </div>
          <div className="ml-auto relative">
            <button 
              onClick={() => setCalendarioAberto(!calendarioAberto)}
              className="bg-white/10 px-3 py-1.5 rounded-full text-xs font-bold border border-white/10 hover:bg-white/20 transition-all flex items-center gap-2 cursor-pointer outline-none"
            >
              <span>📅 {formatarExibicao(dataRelatorio)}</span>
            </button>
            {calendarioAberto && <CalendarPopup />}
          </div>
        </div>

        {/* Formulário Interativo em Grid Responsivo */}
        <div className="p-6 sm:p-8 bg-[#f5eeff]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Bloco de Inputs (Esquerda no desktop, vertical no mobile) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputPill 
                label="Oferta de Socorro (Povo)" 
                value={valores.socorroPovo} 
                onChange={(v) => handleInputChange('socorroPovo', v)} 
              />
              <InputPill 
                label="Oferta de Socorro" 
                value={valores.socorro} 
                onChange={(v) => handleInputChange('socorro', v)} 
              />
              <InputPill 
                label="Oferta de Gratidão" 
                value={valores.gratidao} 
                onChange={(v) => handleInputChange('gratidao', v)} 
              />
              <InputPill 
                label="Semeadura" 
                value={valores.semeadura} 
                onChange={(v) => handleInputChange('semeadura', v)} 
              />
              <div className="sm:col-span-2 max-w-xs mx-auto w-full">
                <InputPill 
                  label="Oferta de Israel" 
                  value={valores.israel} 
                  onChange={(v) => handleInputChange('israel', v)} 
                />
              </div>
            </div>

            {/* Bloco de Ações e Resumo (Direita no desktop, inferior no mobile) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white/40 border border-purple-200/50 rounded-[28px] p-6 shadow-xs">
              <div className="text-center py-4 flex-1 flex flex-col justify-center">
                <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">Total da Semana</p>
                <p className="text-4xl font-black text-[#2d1457] mt-2 tracking-tight">{formatBRL(total)}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-purple-200/40">
                <button
                  onClick={handleExportarPNG}
                  disabled={carregando}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#2d1457] to-[#5a2d9c] text-white font-bold uppercase tracking-widest text-xs shadow-md hover:scale-[1.01] active:scale-98 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {carregando ? 'Gerando Imagem...' : '📲 Exportar para WhatsApp'}
                </button>

                <div className="flex items-center justify-between pt-2 px-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visualizar Layout</span>
                  <button 
                    type="button"
                    onClick={() => setMostrarPreview(!mostrarPreview)} 
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${mostrarPreview ? 'bg-[#2d1457]' : 'bg-slate-200'}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${mostrarPreview ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {mostrarPreview && (
        <div className="mt-10 p-6 md:p-10 bg-slate-900 rounded-[40px] border border-slate-800 flex flex-col items-center shadow-2xl overflow-hidden">
          <style>{exportStylesRelatorio}</style>
          <div className="mb-8 text-center">
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm">Visualização de Design</h3>
            <p className="text-slate-500 text-[10px] font-bold uppercase">Proporção Real 1080x1920 (Escala Reduzida)</p>
          </div>
          
          <div className="relative shadow-[0_0_100px_rgba(0,0,0,0.5)] border-[12px] border-slate-800 rounded-[60px] overflow-hidden origin-top scale-[0.3] sm:scale-[0.4] md:scale-[0.5]" style={{ width: '1080px', height: '1920px' }}>
            <div className="exp-wrapper" style={{ height: '100%', width: '100%' }}>
              <div className="exp-banner">
                <div className="exp-banner-icon">
                  <svg width="230" height="230" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="28" width="6" height="14" rx="2" fill="#d4a843" />
                    <rect x="16" y="20" width="6" height="22" rx="2" fill="#9b59d8" />
                    <rect x="26" y="14" width="6" height="28" rx="2" fill="#c9a8f0" />
                    <rect x="36" y="8"  width="6" height="34" rx="2" fill="#d4a843" />
                    <polyline points="9,26 19,17 29,11 39,6" stroke="white" stroke-width="2" fill="none" />
                  </svg>
                </div>
                <div className="exp-banner-text">
                  <div className="label">Relatório</div>
                  <div className="title">Semanal</div>
                  <div className="sub">Pr. Jadson e Pra. Auriana</div>
                  <div className="exp-data-badge"><span>{formatarExibicao(dataRelatorio)}</span></div>
                </div>
              </div>
              <div className="exp-panel">
                <div className="exp-field">
                  <div className="exp-field-label">Oferta de Socorro (Povo)</div>
                  <div className="exp-pill"><span className="exp-pill-val">{formatBRL(valores.socorroPovo)}</span></div>
                </div>
                <div className="exp-field">
                  <div className="exp-field-label">Oferta de Socorro</div>
                  <div className="exp-pill"><span className="exp-pill-val">{formatBRL(valores.socorro)}</span></div>
                </div>
                <div className="exp-field">
                  <div className="exp-field-label">Oferta de Gratidão</div>
                  <div className="exp-pill"><span className="exp-pill-val">{formatBRL(valores.gratidao)}</span></div>
                </div>
                <div className="exp-field">
                  <div className="exp-field-label">Semeadura</div>
                  <div className="exp-pill"><span className="exp-pill-val">{formatBRL(valores.semeadura)}</span></div>
                </div>
                <div className="exp-field">
                  <div className="exp-field-label">Oferta de Israel</div>
                  <div className="exp-pill"><span className="exp-pill-val">{formatBRL(valores.israel)}</span></div>
                </div>
                <div className="exp-total-row">
                  <div className="exp-total-label">Total da Semana</div>
                  <div className="exp-total-val">{formatBRL(total)}</div>
                </div>
              </div>
              <div className="exp-footer">
                <img src="https://guznbiqposfhqalqjggw.supabase.co/storage/v1/object/public/fotos-membros/logo_betesda_branca.png" className="exp-footer-logo" />
                </div>
            </div>
          </div>
          <p className="text-slate-600 text-[10px] mt-[-400px] md:mt-[-450px] font-bold uppercase">Fim da visualização</p>
        </div>
      )}
    </div>
  );
}

function InputPill({ label, value, onChange }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="text-[10px] font-bold uppercase tracking-widest text-[#4a2080]">{label}</label>
      <div className="relative w-full group">
        <div className={`
          w-full py-3 px-6 rounded-full text-center transition-all border-2
          ${isEditing ? 'bg-white border-purple-400 shadow-inner' : 'bg-gradient-to-b from-[#d0c4e8] to-[#a898c8] border-white/40 shadow-md'}
        `}>
          {!isEditing && (
            <div className="flex items-center justify-center gap-3">
               <span className="text-xl font-black text-[#2a1050]">
                 {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
               </span>
               <span className="text-purple-700/30">✏️</span>
            </div>
          )}
          <input
            type="number"
            step="0.01"
            value={value || ''}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className={`
              absolute inset-0 w-full h-full text-center bg-transparent outline-none text-xl font-black text-[#2a1050]
              ${isEditing ? 'opacity-100' : 'opacity-0'}
            `}
          />
        </div>
      </div>
    </div>
  );
}