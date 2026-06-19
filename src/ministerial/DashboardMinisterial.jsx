import React, { useState, useEffect } from 'react';
import { Card, StatCard } from '../ui';
import { ministeriosService } from './services/ministeriosService';

export default function DashboardMinisterial() {
  const [stats, setStats] = useState({ totalMembros: 0, totalMinisterios: 0 });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await ministeriosService.listarMinisterios();
        const total = data.reduce((acc, m) => acc + (m.membros?.[0]?.count || 0), 0);
        setStats({ totalMembros: total, totalMinisterios: data.length });
      } catch (err) {
        console.error(err);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 text-center border-none shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Voluntários</p>
          <p className="text-3xl font-black text-slate-800">{carregando ? '...' : stats.totalMembros}</p>
        </Card>
        <Card className="p-6 text-center border-none shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ministérios</p>
          <p className="text-3xl font-black text-slate-800">{carregando ? '...' : stats.totalMinisterios}</p>
        </Card>
        <Card className="p-6 text-center border-none shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vagas Abertas</p>
          <p className="text-3xl font-black text-rose-500">0</p>
        </Card>
      </div>
      
      <Card className="p-20 text-center border-none shadow-sm bg-white rounded-[32px]">
        <div className="max-w-xs mx-auto space-y-3">
          <div className="text-4xl">📊</div>
          <h3 className="font-bold text-slate-800 uppercase tracking-tight">Painel Estratégico</h3>
          <p className="text-xs text-slate-500 leading-relaxed italic">
            Em breve: Gráficos de crescimento das equipes e gestão de escalas automáticas.
          </p>
        </div>
      </Card>
    </div>
  );
}