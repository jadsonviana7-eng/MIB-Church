import React, { useState, useMemo, useEffect } from 'react';
import { PageHeader, Card } from './ui';

import { mascaraMoeda, desmascararMoeda, soNumeros } from './mascaras';
const VERSICULOS = [
  '"Honra ao Senhor com os teus bens e com as primícias de toda a tua renda." (Provérbios 3:9)',
  '"Cada um dê conforme determinou em seu coração, pois Deus ama quem dá com alegria." (2 Coríntios 9:7)',
  '"Buscai primeiro o Reino de Deus e a sua justiça, e as demais coisas vos serão acrescentadas." (Mateus 6:33)',
  '"Trazei todos os dízimos à casa do tesouro, para que haja mantimento na minha casa." (Malaquias 3:10)',
  '"O que semeia com fartura, com fartura também ceifará." (2 Coríntios 9:6)'
];

export default function CalculadoraTributos() {
  const [abaAtiva, setAbaAtiva] = useState('tributos'); // 'tributos' ou 'calculadora'
  const [valorInput, setValorInput] = useState('');
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [versiculo, setVersiculo] = useState(VERSICULOS[0]);

  useEffect(() => {
    const rand = Math.floor(Math.random() * VERSICULOS.length);
    setVersiculo(VERSICULOS[rand]);
  }, []);

  // Lógica de Tributos
  const resultados = useMemo(() => { // Desmascara o valor antes de calcular
    const v = desmascararMoeda(valorInput) || 0;
    if (v === 0) return null;

    const primicia = Math.ceil(v / 30);
    const dizimo = Math.ceil((v - primicia) * 0.10);
    const socorro = Math.ceil(v * 0.02);
    const gratidao = Math.ceil(v * 0.0010);
    const semeadura = Math.ceil(v * 0.0040);
    const israel = Math.ceil(v * 0.01);
    const total = primicia + dizimo + socorro + gratidao + semeadura + israel;

    return { primicia, dizimo, socorro, gratidao, semeadura, israel, total };
  }, [valorInput]);

  const formatBRL = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Lógica da Calculadora Comum
  const pressDigit = (val) => {
    setCalcDisplay(prev => (prev === '0' ? val : prev + val));
  };

  const calculateResult = () => {
    try {
      // Sanitização básica para eval
      const result = eval(calcDisplay.replace('%', '/100').replace('×', '*').replace('÷', '/'));
      setCalcDisplay(String(result));
    } catch {
      setCalcDisplay('Erro');
      setTimeout(() => setCalcDisplay('0'), 1500);
    }
  };

  return (
    <div className="max-w-full sm:max-w-md lg:max-w-4xl mx-auto space-y-6 px-2" style={{ fontFamily: "'Roboto', sans-serif" }}>
      <PageHeader titulo="Calculadora de Tributos" breadcrumb={['Utilitários', 'Calculadora']} />

      <div className="flex bg-slate-200 p-1.5 rounded-2xl gap-1 mb-2 lg:max-w-md lg:mx-auto">
        <button 
          onClick={() => setAbaAtiva('tributos')}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${abaAtiva === 'tributos' ? 'bg-[#1e3a8a] text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Tributos
        </button>
        <button 
          onClick={() => setAbaAtiva('calculadora')}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${abaAtiva === 'calculadora' ? 'bg-[#1e3a8a] text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Calculadora
        </button>
      </div>

      {abaAtiva === 'tributos' ? (
        <div className="p-8 !bg-slate-900 border border-slate-800 shadow-2xl rounded-[40px] text-white overflow-hidden">
          <div className="relative z-10 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Valor a Calcular</label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-500/40 font-black text-xl group-focus-within:text-rose-500 transition-colors">R$</span>
                  <input 
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="0,00"
                    value={mascaraMoeda(valorInput)}
                    onChange={(e) => setValorInput(soNumeros(e.target.value))}
                    className="w-full !bg-black/60 border-2 border-white/5 rounded-[30px] p-6 text-center lg:text-left lg:pl-16 leading-none font-black text-rose-500 outline-none focus:border-sky-500/30 transition-all"
                    style={{ fontSize: 'clamp(60px, 15vw, 150px)', height: 'auto', minHeight: '1.2em' }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-sky-600 to-blue-800 rounded-[35px] p-6 text-center shadow-xl shadow-blue-950/40 border border-white/10">
                <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-1">Investimento no Reino</p>
                <p className="text-4xl font-black text-white tracking-tighter">{formatBRL(resultados?.total || 0)}</p>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 space-y-4">
              <div className="grid grid-cols-1 gap-2">
                <ResultRow label="Primícia" value={resultados?.primicia || 0} />
                <ResultRow label="Dízimo" value={resultados?.dizimo || 0} />
                <ResultRow label="Socorro" value={resultados?.socorro || 0} />
                <ResultRow label="Gratidão" value={resultados?.gratidao || 0} />
                <ResultRow label="Semeadura" value={resultados?.semeadura || 0} />
                <ResultRow label="Israel" value={resultados?.israel || 0} />
              </div>

              <div className="pt-6 border-t border-white/10 text-center lg:text-right italic text-sky-400 text-[11px] lg:px-0 leading-relaxed font-medium">
                {versiculo}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 !bg-slate-900 border border-slate-800 shadow-2xl rounded-[40px] text-white lg:max-w-md lg:mx-auto">
          <div className="space-y-6 relative z-10">
            <div className="bg-black/40 rounded-[30px] p-6 border-2 border-white/5 text-right overflow-hidden shadow-inner">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Resultado</div>
              <div className="text-4xl font-black text-white truncate leading-none">{calcDisplay}</div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <CalcBtn label="C" color="bg-rose-500/20 text-rose-500" onClick={() => setCalcDisplay('0')} />
              <CalcBtn label="÷" color="bg-sky-500 text-slate-900" onClick={() => pressDigit('÷')} />
              <CalcBtn label="×" color="bg-sky-500 text-slate-900" onClick={() => pressDigit('×')} />
              <CalcBtn label="⌫" color="bg-slate-800 text-white" onClick={() => setCalcDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0')} />
              
              <CalcBtn label="7" onClick={() => pressDigit('7')} />
              <CalcBtn label="8" onClick={() => pressDigit('8')} />
              <CalcBtn label="9" onClick={() => pressDigit('9')} />
              <CalcBtn label="-" color="bg-sky-500 text-slate-900" onClick={() => pressDigit('-')} />

              <CalcBtn label="4" onClick={() => pressDigit('4')} />
              <CalcBtn label="5" onClick={() => pressDigit('5')} />
              <CalcBtn label="6" onClick={() => pressDigit('6')} />
              <CalcBtn label="+" color="bg-sky-500 text-slate-900" onClick={() => pressDigit('+')} />

              <CalcBtn label="1" onClick={() => pressDigit('1')} />
              <CalcBtn label="2" onClick={() => pressDigit('2')} />
              <CalcBtn label="3" onClick={() => pressDigit('3')} />
              <CalcBtn label="=" color="bg-emerald-500 text-slate-900" onClick={calculateResult} />

              <CalcBtn label="0" span="col-span-2" onClick={() => pressDigit('0')} />
              <CalcBtn label="." onClick={() => pressDigit('.')} />
              <CalcBtn label="%" color="bg-sky-500 text-slate-900" onClick={() => pressDigit('%')} />
            </div>
          </div>
        </div>
      )}

      <div className="text-center pb-10">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Desenvolvido por</p>
        <div className="flex items-center justify-center gap-2">
           <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-[10px] font-black text-slate-900 shadow-lg shadow-sky-500/20">$</div>
           <span className="text-sm font-black text-slate-700 tracking-widest uppercase">JADSON VIANA</span>
        </div>
      </div>
    </div>
  );
}

function ResultRow({ label, value }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/[0.03] hover:bg-white/[0.08] transition-all group">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-sky-400 transition-colors">{label}</span>
      <span className="text-lg font-black text-white">{value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
    </div>
  );
}

function CalcBtn({ label, color = 'bg-slate-800 text-slate-300', span = '', onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`${span} ${color} py-5 rounded-2xl text-xl font-black transition-all active:scale-95 hover:brightness-125 shadow-lg border border-white/5`}
    >
      {label}
    </button>
  );
}