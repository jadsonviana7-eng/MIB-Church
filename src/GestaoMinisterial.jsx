import React from 'react';
import DashboardMinisterialV2 from './ministerial/DashboardMinisterialV2';
import EquipesMinisterial from './ministerial/EquipesMinisterial';
import EscalasMinisteriais from './ministerial/EscalasMinisteriais';
import MinisteriosManager from './ministerial/MinisteriosManager';
import HistoricoMinisterial from './ministerial/HistoricoMinisterial';
import RelatoriosMinisterial from './ministerial/RelatoriosMinisterial';
import { MenuIcons } from './icons';

export default function GestaoMinisterial(props) {
  const { submenu, onNavigate } = props;
  const aba = submenu || 'dashboard';

  const abas = [
    { id: 'dashboard', label: 'Dashboard', icon: MenuIcons.dashboard },
    { id: 'equipes', label: 'Membros', icon: MenuIcons.pessoas },
    { id: 'escalas', label: 'Escalas', icon: MenuIcons.agenda },
    { id: 'historico', label: 'Histórico', icon: MenuIcons['f-historico'] },
    { id: 'relatorios', label: 'Relatórios', icon: MenuIcons['p-relatorios'] },
    { id: 'config', label: 'Ministérios', icon: MenuIcons.configuracoes },
  ];

  return (
    <div className="space-y-6">

      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto scrollbar-hide gap-1">
        {abas.map((a) => (
          <button
            key={a.id}
            onClick={() => onNavigate(a.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              aba === a.id 
                ? 'bg-[#1e3a8a] text-white shadow-lg shadow-blue-100' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            {a.icon}
            <span className="hidden sm:inline">{a.label}</span>
          </button>
        ))}
      </div>

      <div className="animate-in fade-in duration-300">
        {aba === 'dashboard' && <DashboardMinisterialV2 {...props} />}
        {aba === 'equipes' && <EquipesMinisterial {...props} />}
        {aba === 'escalas' && <EscalasMinisteriais {...props} />}
        {aba === 'historico' && <HistoricoMinisterial {...props} />}
        {aba === 'relatorios' && <RelatoriosMinisterial {...props} />}
        {aba === 'config' && <MinisteriosManager {...props} />}
      </div>
    </div>
  );
}