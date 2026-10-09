import React, { useState } from 'react';
import DashboardMinisterialV2 from './ministerial/DashboardMinisterialV2';
import EscalasMinisteriais from './ministerial/EscalasMinisteriais';
import MinisteriosManager from './ministerial/MinisteriosManager';
import HistoricoMinisterial from './ministerial/HistoricoMinisterial';
import RelatoriosMinisterial from './ministerial/RelatoriosMinisterial';
import { LayoutDashboard, Calendar, Clock, BarChart3, Settings } from 'lucide-react';

export default function GestaoMinisterial(props) {
  const { submenu, onNavigate } = props;
  const aba = submenu || 'dashboard';

  const [filtroMinisterioId, setFiltroMinisterioId] = useState(null);
  const [filtroStatusEscala, setFiltroStatusEscala] = useState(null);
  const [filtroMesEscala, setFiltroMesEscala] = useState(null);
  const [filtroAnoEscala, setFiltroAnoEscala] = useState(null);

  const handleNavegarTab = (novaAba, filtros = {}) => {
    if (filtros.ministerioId !== undefined) setFiltroMinisterioId(filtros.ministerioId);
    if (filtros.status !== undefined) setFiltroStatusEscala(filtros.status);
    if (filtros.mes !== undefined) setFiltroMesEscala(filtros.mes);
    if (filtros.ano !== undefined) setFiltroAnoEscala(filtros.ano);

    onNavigate(novaAba);
  };

  const abas = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { id: 'config', label: 'Ministérios', icon: <Settings size={16} /> },
    { id: 'escalas', label: 'Escalas', icon: <Calendar size={16} /> },
    { id: 'relatorios', label: 'Relatórios', icon: <BarChart3 size={16} /> },
    { id: 'historico', label: 'Histórico', icon: <Clock size={16} /> },
  ];

  return (
    <div className="space-y-6">

      <div className="flex bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xs border border-slate-200/80 overflow-x-auto scrollbar-hide gap-1.5">
        {abas.map((a) => (
          <button
            key={a.id}
            onClick={() => handleNavegarTab(a.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-95 ${
              aba === a.id 
                ? 'bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white shadow-lg shadow-blue-700/25 border border-blue-400/30 ring-1 ring-blue-400/20' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80'
            }`}
          >
            {a.icon}
            <span className="hidden sm:inline">{a.label}</span>
          </button>
        ))}
      </div>

      <div className="animate-in fade-in duration-300">
        {aba === 'dashboard' && <DashboardMinisterialV2 {...props} onNavegarTab={handleNavegarTab} />}
        {aba === 'escalas' && (
          <EscalasMinisteriais 
            {...props} 
            initialFiltroMinisterioId={filtroMinisterioId}
            initialStatus={filtroStatusEscala}
            initialFiltroMes={filtroMesEscala}
            initialFiltroAno={filtroAnoEscala}
          />
        )}
        {aba === 'historico' && <HistoricoMinisterial {...props} initialStatus={filtroStatusEscala} />}
        {aba === 'relatorios' && <RelatoriosMinisterial {...props} onNavegarTab={handleNavegarTab} />}
        {aba === 'config' && (
          <MinisteriosManager 
            {...props} 
            initialSelectedMinistryId={filtroMinisterioId}
          />
        )}
      </div>
    </div>
  );
}