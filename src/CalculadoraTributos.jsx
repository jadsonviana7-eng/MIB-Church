import React, { useState, useMemo, useEffect } from 'react';
import { PageHeader } from './ui';
import { mascaraMoeda, desmascararMoeda, soNumeros } from './mascaras';
import { 
  Flame, Coins, Heart, Sprout, Sparkles, Globe, 
  Award, Quote
} from 'lucide-react';

const VERSICULOS = [
  '"Honra ao Senhor com os teus bens e com as primícias de toda a tua renda." (Provérbios 3:9)',
  '"Cada um deu conforme determinou em seu coração, pois Deus ama quem dá com alegria." (2 Coríntios 9:7)',
  '"Buscai primeiro o Reino de Deus e a sua justiça, e as demais coisas vos serão acrescentadas." (Mateus 6:33)',
  '"Trazei todos os dízimos à casa do tesouro, para que haja mantimento na minha casa." (Malaquias 3:10)',
  '"O que semeia com fartura, com fartura também ceifará." (2 Coríntios 9:6)'
];

export default function CalculadoraTributos() {
  const [valorInput, setValorInput] = useState('');
  const [versiculo, setVersiculo] = useState(VERSICULOS[0]);

  useEffect(() => {
    const rand = Math.floor(Math.random() * VERSICULOS.length);
    setVersiculo(VERSICULOS[rand]);
  }, []);

  // Lógica de Tributos
  const resultados = useMemo(() => {
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

  return (
    <div className="max-w-7xl mx-auto space-y-6 px-0 sm:px-6 pb-12 font-sans mx-[-3px] sm:mx-auto">
      <div className="mx-[3px] sm:mx-0">
        <PageHeader titulo="Calculadora de Tributos" breadcrumb={['Utilitários', 'Calculadora']} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna Esquerda: Entrada de Dados e Resumo Principal */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm flex flex-col items-center">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4 text-center">
              Digite o Valor de Sua Renda
            </label>
            
            <div className="relative w-full max-w-xs group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-black text-2xl group-focus-within:text-blue-600 transition-colors">
                R$
              </span>
              <input 
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="0,00"
                value={mascaraMoeda(valorInput)}
                onChange={(e) => setValorInput(soNumeros(e.target.value))}
                className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600/30 rounded-2xl p-5 pl-16 text-right font-black text-slate-800 outline-none transition-all text-3xl shadow-inner"
              />
            </div>
          </div>

          {/* Card Principal: Total Reino */}
          <div className="relative overflow-hidden rounded-[32px] p-8 bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 text-white shadow-lg border border-white/10 flex flex-col items-center text-center group">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />
            <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mb-4 border border-white/10 shadow-inner group-hover:scale-110 transition-transform">
              <Award size={24} className="text-amber-100" />
            </div>
            <p className="text-[10px] font-black text-amber-100/80 uppercase tracking-[0.25em] mb-1">
              Total Investimento no Reino
            </p>
            <h3 className="text-4xl font-extrabold tracking-tight">
              {formatBRL(resultados?.total || 0)}
            </h3>
            <p className="text-[10px] text-amber-100/70 mt-2 font-medium leading-relaxed max-w-xs">
              Soma total dos dízimos, primícias, socorro social, semeaduras e investimentos.
            </p>
          </div>
        </div>

        {/* Coluna Direita: Detalhamento de Tributos e Versículo */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                Divisão Detalhada dos Tributos
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Princípios bíblicos aplicados proporcionalmente aos seus ganhos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultItem 
                label="Primícia" 
                percentage="1 dia (3.3%)"
                desc="Consagração do primeiro dia útil do mês."
                value={resultados?.primicia || 0} 
                icon={<Flame className="text-orange-500" size={18} />} 
                bgColor="bg-orange-50 border-orange-100/50"
              />
              <ResultItem 
                label="Dízimo" 
                percentage="10%"
                desc="Dez por cento da renda líquida restante."
                value={resultados?.dizimo || 0} 
                icon={<Coins className="text-[#055f6d]" size={18} />} 
                bgColor="bg-teal-50 border-teal-100/50"
              />
              <ResultItem 
                label="Socorro" 
                percentage="2%"
                desc="Auxílio direto aos necessitados e viúvas."
                value={resultados?.socorro || 0} 
                icon={<Heart className="text-rose-500" size={18} />} 
                bgColor="bg-rose-50 border-rose-100/50"
              />
              <ResultItem 
                label="Israel" 
                percentage="1%"
                desc="Apoio e aliança com o povo da promessa."
                value={resultados?.israel || 0} 
                icon={<Globe className="text-blue-500" size={18} />} 
                bgColor="bg-blue-50 border-blue-100/50"
              />
              <ResultItem 
                label="Semeadura" 
                percentage="0.4%"
                desc="Oferta voluntária em solo fértil."
                value={resultados?.semeadura || 0} 
                icon={<Sprout className="text-emerald-500" size={18} />} 
                bgColor="bg-emerald-50 border-emerald-100/50"
              />
              <ResultItem 
                label="Gratidão" 
                percentage="0.1%"
                desc="Expressão contínua de louvor e graças."
                value={resultados?.gratidao || 0} 
                icon={<Sparkles className="text-amber-500" size={18} />} 
                bgColor="bg-amber-50 border-amber-100/50"
              />
            </div>
          </div>

          {/* Versículo Inspirador Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-[32px] p-6 border border-slate-800 shadow-lg relative overflow-hidden flex gap-4 items-start">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0 text-sky-400">
              <Quote size={20} />
            </div>
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {versiculo}
              </p>
              <span className="text-[10px] font-black uppercase text-sky-400 tracking-wider">
                Palavra de Deus
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Assinatura Premium do Criador */}
      <div className="text-center pt-8">
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Desenvolvido por</p>
        <div className="flex items-center justify-center gap-2 group cursor-default">
           <div className="w-6 h-6 bg-slate-900 border border-slate-200 text-slate-800 rounded-full flex items-center justify-center text-[10px] font-black shadow-xs transition-transform group-hover:rotate-12">
             $
           </div>
           <span className="text-xs font-black text-slate-600 tracking-widest uppercase transition-colors group-hover:text-slate-800">
             JADSON VIANA
           </span>
        </div>
      </div>
    </div>
  );
}

function ResultItem({ label, percentage, desc, value, icon, bgColor }) {
  return (
    <div className="flex gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-600/10 hover:shadow-xs transition-all duration-300 text-left items-start group">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${bgColor} group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
            {label}
          </span>
          <span className="inline-block bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded text-[8px]">
            {percentage}
          </span>
        </div>
        <p className="text-[9px] text-slate-400 mt-0.5 line-clamp-1 leading-snug">
          {desc}
        </p>
        <h4 className="text-base font-black text-slate-900 mt-2 tracking-tight">
          {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </h4>
      </div>
    </div>
  );
}