import { useEffect, useState } from 'react';
import { Users, Building2, Shield, Briefcase, CheckCircle, AlertCircle, XCircle, Award, Target, Star } from 'lucide-react';
import { ministeriosService } from './services/ministeriosService';

function Card({ titulo, valor, Icon, corSub, desc }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition duration-300 flex justify-between items-center relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: corSub }} />
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{titulo}</p>
        <h2 className="text-3xl font-black mt-1.5 text-slate-800 tracking-tight">{valor}</h2>
        {desc && <p className="text-[10px] text-slate-400 mt-1">{desc}</p>}
      </div>
      <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center transition duration-300 group-hover:scale-110"
        style={{ backgroundColor: corSub + '15', color: corSub }}
      >
        <Icon size={20} />
      </div>
    </div>
  );
}

export default function DashboardMinisterialV2() {
  const [dados, setDados] = useState({
    totalMinisterios: 0,
    totalMembros: 0,
    totalFuncoes: 0,
    totalLideres: 0,
    escalasStats: { confirmadas: 0, pendentes: 0, recusadas: 0, total: 0 },
    rankingVoluntarios: [],
    rankingMinisterios: [],
    rankingLideres: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setLoading(true);
    try {
      const resumo = await ministeriosService.obterDashboard();
      setDados(resumo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 italic">
        Carregando indicadores inteligentes...
      </div>
    );
  }

  const { escalasStats } = dados;
  const porcentagemConfirmada = escalasStats.total > 0 ? Math.round((escalasStats.confirmadas / escalasStats.total) * 100) : 0;
  const porcentagemPendente = escalasStats.total > 0 ? Math.round((escalasStats.pendentes / escalasStats.total) * 100) : 0;
  const porcentagemRecusada = escalasStats.total > 0 ? Math.round((escalasStats.recusadas / escalasStats.total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          Painel de Indicadores
        </h1>
        <p className="text-xs text-slate-500">Métricas consolidadas de participação, voluntários e engajamento ministerial.</p>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card
          titulo="Voluntários Ativos"
          valor={dados.totalMembros}
          Icon={Users}
          corSub="#3b82f6"
          desc="Voluntários cadastrados"
        />

        <Card
          titulo="Ministérios"
          valor={dados.totalMinisterios}
          Icon={Building2}
          corSub="#8b5cf6"
          desc="Equipes ativas"
        />

        <Card
          titulo="Líderes"
          valor={dados.totalLideres}
          Icon={Shield}
          corSub="#10b981"
          desc="Coordenadores de equipe"
        />

        <Card
          titulo="Funções Ativas"
          valor={dados.totalFuncoes}
          Icon={Briefcase}
          corSub="#f59e0b"
          desc="Cargos mapeados"
        />
      </div>

      {/* Seção Central: Status das Escalas & Eficiência */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-5">
              Eficiência das Escalas
            </h3>
            <div className="space-y-4">
              {/* Confirmadas */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
                  <span className="flex items-center gap-1.5"><CheckCircle className="text-emerald-500" size={14} /> Confirmadas</span>
                  <span>{escalasStats.confirmadas} ({porcentagemConfirmada}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${porcentagemConfirmada}%` }} />
                </div>
              </div>

              {/* Pendentes */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
                  <span className="flex items-center gap-1.5"><AlertCircle className="text-amber-400" size={14} /> Pendentes</span>
                  <span>{escalasStats.pendentes} ({porcentagemPendente}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${porcentagemPendente}%` }} />
                </div>
              </div>

              {/* Recusadas */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
                  <span className="flex items-center gap-1.5"><XCircle className="text-red-500" size={14} /> Recusadas</span>
                  <span>{escalasStats.recusadas} ({porcentagemRecusada}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${porcentagemRecusada}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-slate-50 flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total de Escalados</span>
            <strong className="text-lg font-black text-slate-700">{escalasStats.total}</strong>
          </div>
        </div>

        {/* Card Informativo / KPI de Crescimento */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-6 shadow-md text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/10 inline-block mb-3">
              Engajamento Inteligente
            </span>
            <h3 className="text-xl font-black tracking-tight leading-tight mt-1">
              "Reduzindo tarefas manuais da liderança e conectando a igreja através do serviço."
            </h3>
            <p className="text-xs text-slate-300/80 mt-2 max-w-md">
              A autoescala inteligente distribui as tarefas ponderando a disponibilidade declarada por cada voluntário e rotacionando as equipes de forma justa.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-white/10">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Novos Membros</span>
              <strong className="text-xl font-black text-white mt-1 block">+12</strong>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Participações</span>
              <strong className="text-xl font-black text-white mt-1 block">{escalasStats.confirmadas}</strong>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Taxa Confirmação</span>
              <strong className="text-xl font-black text-white mt-1 block">{porcentagemConfirmada}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Rankings (Top 10) */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Ranking de Voluntários */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-50 text-slate-800">
            <Award className="text-blue-500" size={18} />
            <h3 className="font-black text-xs uppercase tracking-wider">Top Voluntários</h3>
          </div>
          <div className="space-y-3">
            {dados.rankingVoluntarios.map((item, index) => (
              <div key={item.nome} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-600 font-bold">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-black">{index + 1}</span>
                  {item.nome}
                </span>
                <span className="font-black text-slate-800">{item.total} participações</span>
              </div>
            ))}
            {dados.rankingVoluntarios.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-6">Nenhum dado de escala disponível.</p>
            )}
          </div>
        </div>

        {/* Ranking de Ministérios */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-50 text-slate-800">
            <Target className="text-purple-500" size={18} />
            <h3 className="font-black text-xs uppercase tracking-wider">Top Ministérios</h3>
          </div>
          <div className="space-y-3">
            {dados.rankingMinisterios.map((item, index) => (
              <div key={item.nome} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-600 font-bold">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-black">{index + 1}</span>
                  {item.nome}
                </span>
                <span className="font-black text-slate-800">{item.total} membros</span>
              </div>
            ))}
            {dados.rankingMinisterios.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-6">Nenhum ministério vinculado.</p>
            )}
          </div>
        </div>

        {/* Ranking de Líderes */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-50 text-slate-800">
            <Star className="text-emerald-500" size={18} />
            <h3 className="font-black text-xs uppercase tracking-wider">Top Coordenadores</h3>
          </div>
          <div className="space-y-3">
            {dados.rankingLideres.map((item, index) => (
              <div key={item.nome} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-600 font-bold">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-black">{index + 1}</span>
                  {item.nome}
                </span>
                <span className="font-black text-slate-800">{item.total} equipes</span>
              </div>
            ))}
            {dados.rankingLideres.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-6">Nenhum líder registrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}