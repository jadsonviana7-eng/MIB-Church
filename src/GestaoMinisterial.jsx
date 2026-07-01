import React from 'react';
import DashboardMinisterialV2 from './ministerial/DashboardMinisterialV2';
import EscalasMinisteriais from './ministerial/EscalasMinisteriais';
import MinisteriosManager from './ministerial/MinisteriosManager';
import HistoricoMinisterial from './ministerial/HistoricoMinisterial';
import RelatoriosMinisterial from './ministerial/RelatoriosMinisterial';
import { LayoutDashboard, Calendar, Clock, BarChart3, Settings } from 'lucide-react';

export default function GestaoMinisterial(props) {
  const { submenu, onNavigate } = props;
  const aba = submenu || 'dashboard';

  const abas = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { id: 'config', label: 'Ministérios', icon: <Settings size={16} /> },
    { id: 'escalas', label: 'Escalas', icon: <Calendar size={16} /> },
    { id: 'relatorios', label: 'Relatórios', icon: <BarChart3 size={16} /> },
    { id: 'historico', label: 'Histórico', icon: <Clock size={16} /> },
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
        {aba === 'escalas' && <EscalasMinisteriais {...props} />}
        {aba === 'historico' && <HistoricoMinisterial {...props} />}
        {aba === 'relatorios' && <RelatoriosMinisterial {...props} />}
        {aba === 'config' && <MinisteriosManager {...props} />}
      </div>
    </div>
  );
}