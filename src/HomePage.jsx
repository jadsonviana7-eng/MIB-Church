import React from 'react';
import { Card, CardHeader } from './ui';
import { MenuIcons } from './icons'; // Import MenuIcons from the new icons.jsx

export default function HomePage({ onNavigate, hasAccess, membroLogado }) {
  const modules = [
    { id: 'dashboard', label: 'Visão Geral', icon: MenuIcons.dashboard, submenu: null }, // Link para o OverviewDashboard
    { id: 'pessoas', label: 'Pessoas', icon: MenuIcons.pessoas, submenu: 'todos' },
    { id: 'celulas', label: 'Células', icon: MenuIcons.celulas, submenu: 'lista' },
    { id: 'financeiro', label: 'Financeiro', icon: MenuIcons.financeiro, submenu: 'resumo' },
    { id: 'escolas', label: 'Escolas', icon: MenuIcons.escolas, submenu: 'resumo' },
    { id: 'agenda', label: 'Agenda', icon: MenuIcons.agenda, submenu: 'calendario' },
    { id: 'utilitarios', label: 'Utilitários', icon: MenuIcons.utilitarios, submenu: 'escalas' },
    { id: 'configuracoes', label: 'Configurações', icon: MenuIcons.configuracoes, submenu: null },
  ];

  return (
    <div className="space-y-6">
      {/* Logo Grande */}
      <div className="text-center py-8">
        <img src="/logo-betesda.png" alt="Logo Betesda" className="mx-auto h-40 object-contain" />
      </div>

      {/* Mural de Avisos */}
      <Card className="p-0">
        <CardHeader titulo="Mural de Avisos" subtitulo="Fique por dentro das últimas notícias e comunicados." />
        <div className="p-6 text-center text-slate-500 italic">
          <p>Nenhum aviso recente.</p>
          <p className="text-xs mt-2">Em breve, comunicados importantes aparecerão aqui.</p>
        </div>
      </Card>

      {/* Botões para Módulos */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {modules.map(mod => {
          if (!hasAccess(mod.label)) return null;

          return (
            <button
              key={mod.id}
              onClick={() => onNavigate(mod.id, mod.submenu)}
              className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {mod.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{mod.label}</h3>
              <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                Acesse o módulo de {mod.label.toLowerCase()} para gerenciar suas tarefas.
              </p>
              <div className="mt-4 text-blue-600 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                Abrir Módulo
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Botões Simples para Módulos - Visível apenas em Telas Pequenas */}
      <div className="sm:hidden grid grid-cols-2 gap-3">
        {modules.map(mod => {
          if (!hasAccess(mod.label)) return null;

          return (
            <button
              key={mod.id}
              onClick={() => onNavigate(mod.id, mod.submenu)}
              className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center group"
            >
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">
                {mod.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-sm">{mod.label}</h3>
            </button>
          );
        })}
      </div>
    </div>
  );
}