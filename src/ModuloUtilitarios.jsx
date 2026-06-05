import React from 'react';
import { PageHeader } from './ui';
import EscalasMinisterial from './EscalasMinisterial';
import RelatorioSemanal from './RelatorioSemanal';
import CalculadoraTributos from './CalculadoraTributos';
import QuizPersonalidade from './QuizPersonalidade';
import PedidoOracao from './PedidoOracao';
import MuralOracao from './MuralOracao';

export default function ModuloUtilitarios(props) {
  const { submenu, onNavigate, usuarioLogado, membroLogado, temVinculoEscala } = props;

  // Roteamento interno do módulo utilitários
  if (submenu === 'escalas') {
    return <EscalasMinisterial {...props} />;
  }

  if (submenu === 'relatorio-semanal') {
    return <RelatorioSemanal usuarioLogado={usuarioLogado} />;
  }

  if (submenu === 'calculadora') {
    return <CalculadoraTributos />;
  }

  if (submenu === 'quiz') {
    return <QuizPersonalidade usuarioLogado={usuarioLogado} />;
  }

  if (submenu === 'pedido-oracao') {
    return <PedidoOracao usuarioLogado={usuarioLogado} />;
  }

  if (submenu === 'mural-oracao') {
    return <MuralOracao />;
  }

  // Tela inicial de Utilitários (Dashboard de Ferramentas)
  return (
    <div className="space-y-6">
      <PageHeader 
        titulo="Utilitários" 
        subtitulo="Ferramentas de apoio à gestão e operação da igreja." 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Escalas: Mostrar se for líder/admin OU se o membro tiver vínculo */}
        {(membroLogado?.permissao !== 'membro' || temVinculoEscala) && (
          <button 
            onClick={() => onNavigate('escalas')}
            className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🗓️
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Escalas Ministeriais</h3>
            <p className="text-slate-500 text-sm mt-1 leading-relaxed">
              Visualize sua escala de serviço e horários dos ministérios.
            </p>
            <div className="mt-4 text-[#2563eb] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              Acessar Ferramenta 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>
        )}

        <button 
          onClick={() => onNavigate('quiz')}
          className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
        >
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            🧠
          </div>
          <h3 className="font-bold text-slate-800 text-lg">Teste de Temperamento</h3>
          <p className="text-slate-500 text-sm mt-1 leading-relaxed">
            Identifique seu perfil comportamental e descubra como servir melhor no Reino.
          </p>
          <div className="mt-4 text-emerald-600 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            Iniciar Teste 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </button>

        <button 
          onClick={() => onNavigate('pedido-oracao')}
          className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
        >
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            🙏
          </div>
          <h3 className="font-bold text-slate-800 text-lg">Pedido de Oração</h3>
          <p className="text-slate-500 text-sm mt-1 leading-relaxed">
            Abra seu coração. Seus pedidos serão enviados diretamente aos pastores e ao seu líder.
          </p>
          <div className="mt-4 text-purple-600 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            Pedir Oração 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </button>

        {['admin', 'pastor', 'lider-celula'].includes(membroLogado?.permissao) && (
          <button 
            onClick={() => onNavigate('mural-oracao')}
            className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              📋
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Mural de Orações</h3>
            <p className="text-slate-500 text-sm mt-1 leading-relaxed">
              Visualize e interceda pelos pedidos de oração da sua célula ou igreja.
            </p>
            <div className="mt-4 text-rose-600 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              Ver Mural 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>
        )}

        {/* Novos utilitários podem ser adicionados aqui seguindo o mesmo padrão */}
      </div>
    </div>
  );
}