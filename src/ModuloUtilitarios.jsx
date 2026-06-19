import React from 'react';
import { PageHeader } from './ui';
import { MenuIcons } from './icons';
import EscalasMinisterial from './EscalasMinisterial';
import CarneGenerator from './CarneGenerator';
import LeitorQRCode from './LeitorQRCode';
import RelatorioSemanal from './RelatorioSemanal';
import CalculadoraTributos from './CalculadoraTributos';
import QuizPersonalidade from './QuizPersonalidade';
import PedidoOracao from './PedidoOracao';
import MuralOracao from './MuralOracao';

// Lista única de utilitários — usada tanto na grade da "Visão Geral"
// quanto no painel lateral fixo (telas grandes).
function getUtilitarios({ membroLogado, temVinculoEscala }) {
  return [
    {
      id: 'relatorio-semanal',
      label: 'Relatório Semanal',
      desc: 'Gere o gráfico de ofertas semanais para compartilhamento.',
      icon: MenuIcons['u-relatorio-semanal'],
      gradient: 'from-purple-500 to-fuchsia-500',
      show: ['admin', 'pastor', 'secretaria'].includes(membroLogado?.permissao),
    },
    {
      id: 'calculadora',
      label: 'Calculadora de Tributos',
      desc: 'Calcule dízimos, ofertas e primícias com base em versículos bíblicos.',
      icon: MenuIcons['u-calculadora'],
      gradient: 'from-indigo-500 to-blue-500',
      show: true,
    },
    {
      id: 'quiz',
      label: 'Teste de Temperamento',
      desc: 'Identifique seu perfil comportamental e descubra como servir melhor no Reino.',
      icon: MenuIcons['u-quiz'],
      gradient: 'from-emerald-500 to-teal-500',
      show: true,
    },
    {
      id: 'carne-generator',
      label: 'Gerador de Carnê',
      desc: 'Crie carnês de pagamento personalizados para eventos ou contribuições.',
      icon: MenuIcons['u-carne-generator'],
      gradient: 'from-orange-500 to-amber-500',
      show: ['admin', 'pastor'].includes(membroLogado?.permissao),
    },
    {
      id: 'leitor-carne',
      label: 'Leitor de Carnê',
      desc: 'Dê baixa automática em pagamentos escaneando o QR Code da parcela.',
      icon: MenuIcons['u-leitor-carne'],
      gradient: 'from-sky-500 to-cyan-500',
      show: ['admin', 'pastor', 'tesouraria', 'financeiro'].includes(membroLogado?.permissao),
    },
    {
      id: 'pedido-oracao',
      label: 'Pedido de Oração',
      desc: 'Abra seu coração. Seus pedidos serão enviados diretamente aos pastores.',
      icon: MenuIcons['u-pedido-oracao'],
      gradient: 'from-violet-500 to-purple-500',
      show: true,
    },
    {
      id: 'mural-oracao',
      label: 'Mural de Orações',
      desc: 'Visualize e interceda pelos pedidos de oração da sua célula ou igreja.',
      icon: MenuIcons['u-mural-oracao'],
      gradient: 'from-rose-500 to-pink-500',
      show: ['admin', 'pastor', 'lider-celula'].includes(membroLogado?.permissao),
    },
  ].filter((u) => u.show);
}

export default function ModuloUtilitarios(props) {
  const { submenu, onNavigate, usuarioLogado, membroLogado, temVinculoEscala } = props;
  const utilitarios = getUtilitarios({ membroLogado, temVinculoEscala });

  let conteudo = null;

  if (submenu === 'resumo' || !submenu) {
    conteudo = (
      <div className="space-y-6">
        <div className="hidden md:block">
          <PageHeader
            titulo="Utilitários"
            subtitulo="Ferramentas de apoio à gestão e operação da igreja."
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 px-1">
          {utilitarios.map((u) => (
            <CardBotton key={u.id} {...u} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    );
  } else if (submenu === 'escalas') {
    conteudo = <EscalasMinisterial {...props} />;
  } else if (submenu === 'relatorio-semanal') {
    conteudo = <RelatorioSemanal usuarioLogado={usuarioLogado} />;
  } else if (submenu === 'calculadora') {
    conteudo = <CalculadoraTributos />;
  } else if (submenu === 'carne-generator') {
    conteudo = <CarneGenerator />;
  } else if (submenu === 'leitor-carne') {
    conteudo = <LeitorQRCode onVoltar={() => onNavigate('resumo')} />;
  } else if (submenu === 'quiz') {
    conteudo = <QuizPersonalidade usuarioLogado={usuarioLogado} />;
  } else if (submenu === 'pedido-oracao') {
    conteudo = <PedidoOracao usuarioLogado={usuarioLogado} />;
  } else if (submenu === 'mural-oracao') {
    conteudo = <MuralOracao />;
  }

  if (!conteudo) return null;

  return (
    <div className="flex gap-6 items-start w-full">
      <div className="flex-1 min-w-0">{conteudo}</div>

      {/* Painel lateral fixo de atalhos — apenas em telas grandes */}
      <aside className={`${submenu === 'escalas' ? 'hidden' : 'hidden xl:block'} w-64 shrink-0 sticky top-6`}>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4">
          <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-2 mb-2">
            Utilitários
          </h3>
          <nav className="space-y-1">
            {utilitarios.map((u) => {
              const ativo = submenu === u.id || (!submenu && false);
              return (
                <button
                  key={u.id}
                  onClick={() => onNavigate(u.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all group cursor-pointer ${
                    ativo
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-base bg-gradient-to-br ${u.gradient} text-white shadow-sm transition-transform group-hover:scale-105`}
                  >
                    {u.icon}
                  </span>
                  <span className="text-sm font-bold leading-tight truncate">{u.label}</span>
                </button>
              );
            })}
          </nav>

          {submenu && submenu !== 'resumo' && (
            <button
              onClick={() => onNavigate('resumo')}
              className="w-full mt-3 px-3 py-2.5 rounded-2xl text-center text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              ← Voltar à Visão Geral
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

function CardBotton({ id, label, desc, icon, gradient, onNavigate }) {
  return (
    <button
      onClick={() => onNavigate(id)}
      className="relative p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group flex flex-col h-full cursor-pointer overflow-hidden"
    >
      {/* Glow decorativo de fundo */}
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}
      />

      <div
        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 shrink-0 bg-gradient-to-br ${gradient} text-white shadow-lg shadow-slate-200 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
      >
        {icon}
      </div>

      <div className="relative flex-1 min-w-0">
        <h3 className="font-bold text-slate-800 text-lg leading-tight truncate">{label}</h3>
        <p className="text-slate-500 text-sm mt-2 leading-relaxed line-clamp-3">{desc}</p>
      </div>

      <div className="relative mt-4 text-slate-400 group-hover:text-slate-700 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors">
        Acessar Ferramenta
        <span className="group-hover:translate-x-1.5 transition-transform text-base">→</span>
      </div>
    </button>
  );
}
