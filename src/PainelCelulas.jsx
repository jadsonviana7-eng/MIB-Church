import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from './supabaseClient';
import { Card, PageHeader, Avatar } from './ui';
import {
  Network, Users, AlertTriangle, TrendingUp, DollarSign,
  MapPin, GitBranch, MessageCircle, ChevronRight, Trophy, Sparkles
} from 'lucide-react';

export default function PainelCelulas({
  celulas,
  pessoas,
  zonas,
  relatoriosCelula,
  setCelulaSelecionadaId,
  onNavigate
}) {
  const [presencas, setPresencas] = useState([]);
  const [carregandoPresencas, setCarregandoPresencas] = useState(true);

  // Busca o histórico de presenças para calcular membros ausentes
  useEffect(() => {
    async function carregarPresencas() {
      try {
        const { data, error } = await supabase
          .from('presencas_relatorio')
          .select('relatorio_id, pessoa_id');
        if (!error && data) {
          setPresencas(data);
        }
      } catch (err) {
        console.error('Erro ao buscar presenças para o painel:', err);
      } finally {
        setCarregandoPresencas(false);
      }
    }
    carregarPresencas();
  }, []);

  // ── Métricas Gerais ──────────────────────────────────────────────────────────
  const totalCelulasAtivas = useMemo(() => {
    return celulas.filter(c => c.status === 'ativa' && c.excluida !== 'sim').length;
  }, [celulas]);

  const totalMembrosEmCelulas = useMemo(() => {
    return pessoas.filter(p => p.celula_id && p.status !== 'inativo').length;
  }, [pessoas]);

  const totalOfertasAcumulado = useMemo(() => {
    return relatoriosCelula.reduce((acc, r) => acc + Number(r.oferta || r.valor_oferta || 0), 0);
  }, [relatoriosCelula]);

  // ── Célula que Mais Ganha (Ofertas) ──────────────────────────────────────────
  const rankingOfertas = useMemo(() => {
    const ofertas = {};
    relatoriosCelula.forEach(r => {
      const valor = Number(r.oferta || r.valor_oferta || 0);
      ofertas[r.celula_id] = (ofertas[r.celula_id] || 0) + valor;
    });

    return celulas
      .filter(c => c.status === 'ativa' && c.excluida !== 'sim')
      .map(c => ({
        ...c,
        totalOfertas: ofertas[c.id] || 0
      }))
      .sort((a, b) => b.totalOfertas - a.totalOfertas)
      .slice(0, 3);
  }, [celulas, relatoriosCelula]);

  // ── Célula que Mais Ganha (Visitantes / Crescimento) ─────────────────────────
  const rankingVisitantes = useMemo(() => {
    const visitantes = {};
    relatoriosCelula.forEach(r => {
      const qtd = Number(r.visitantes_presentes || 0);
      visitantes[r.celula_id] = (visitantes[r.celula_id] || 0) + qtd;
    });

    return celulas
      .filter(c => c.status === 'ativa' && c.excluida !== 'sim')
      .map(c => ({
        ...c,
        totalVisitantes: visitantes[c.id] || 0
      }))
      .sort((a, b) => b.totalVisitantes - a.totalVisitantes)
      .slice(0, 3);
  }, [celulas, relatoriosCelula]);

  // ── Células por Zona ─────────────────────────────────────────────────────────
  const celulasPorZona = useMemo(() => {
    const contagem = {};
    celulas.forEach(c => {
      if (c.status === 'ativa' && c.excluida !== 'sim') {
        const zId = c.zona_id || 'sem_zona';
        contagem[zId] = (contagem[zId] || 0) + 1;
      }
    });

    return zonas
      .map(z => {
        const qtd = contagem[z.id] || 0;
        const pct = totalCelulasAtivas > 0 ? (qtd / totalCelulasAtivas) * 100 : 0;
        return { nome: z.nome, qtd, pct };
      })
      .sort((a, b) => b.qtd - a.qtd);
  }, [celulas, zonas, totalCelulasAtivas]);

  // ── Células por Geração (Hierarquia de Multiplicação) ────────────────────────
  const calcularGeracao = (celula, lista) => {
    let nivel = 1;
    let atual = celula;
    while (atual.celula_mae_id && nivel < 10) {
      const mae = lista.find(c => c.id === atual.celula_mae_id);
      if (mae && mae.id !== atual.id) {
        atual = mae;
        nivel++;
      } else {
        break;
      }
    }
    return nivel;
  };

  const celulasPorGeracao = useMemo(() => {
    const geracoes = {};
    celulas.filter(c => c.status === 'ativa' && c.excluida !== 'sim').forEach(c => {
      const gen = calcularGeracao(c, celulas);
      if (!geracoes[gen]) geracoes[gen] = [];
      geracoes[gen].push(c);
    });

    return Object.entries(geracoes)
      .map(([ger, lista]) => ({
        geracao: Number(ger),
        celulas: lista
      }))
      .sort((a, b) => a.geracao - b.geracao);
  }, [celulas]);

  // ── Pessoas Ausentes (Últimos 30 dias) ───────────────────────────────────────
  const membrosAusentes = useMemo(() => {
    if (carregandoPresencas) return [];

    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - 30);

    // Reuniões dos últimos 30 dias
    const reunioesRecentes = relatoriosCelula.filter(r => new Date(r.data_reuniao) >= dataLimite);
    const idsReunioesRecentes = reunioesRecentes.map(r => r.id);

    // Conjunto de IDs de quem esteve presente em alguma reunião recente
    const idsPresentesRecentes = new Set(
      presencas
        .filter(p => idsReunioesRecentes.includes(p.relatorio_id))
        .map(p => p.pessoa_id)
    );

    // Membros ativos vinculados a alguma célula que NÃO registraram presença no período
    return pessoas
      .filter(p => p.celula_id && p.status !== 'inativo')
      .filter(p => !idsPresentesRecentes.has(p.id))
      .map(p => {
        // Encontra o último relatório da célula do membro que ele compareceu
        const presencasMembro = presencas.filter(pr => pr.pessoa_id === p.id);
        const relsComparecidos = relatoriosCelula.filter(r =>
          presencasMembro.some(pr => pr.relatorio_id === r.id)
        );

        let ultimaPresencaFormatada = 'Nunca compareceu';
        let diasAusente = 999;

        if (relsComparecidos.length > 0) {
          const ultimoRel = relsComparecidos.sort((a, b) => new Date(b.data_reuniao) - new Date(a.data_reuniao))[0];
          const dataUltimo = new Date(ultimoRel.data_reuniao + 'T00:00:00');
          ultimaPresencaFormatada = dataUltimo.toLocaleDateString('pt-BR');
          diasAusente = Math.floor((new Date() - dataUltimo) / (1000 * 60 * 60 * 24));
        }

        return {
          ...p,
          ultimaPresencaFormatada,
          diasAusente,
          celulaNome: celulas.find(c => c.id === p.celula_id)?.nome || 'Célula'
        };
      })
      .sort((a, b) => b.diasAusente - a.diasAusente)
      .slice(0, 5); // Exibe os 5 mais críticos
  }, [pessoas, celulas, relatoriosCelula, presencas, carregandoPresencas]);

  // Função para abrir conversa no WhatsApp com mensagem de carinho/falta
  const enviarMensagemWhatsApp = (membro) => {
    const tel = membro.telefone ? membro.telefone.replace(/\D/g, '') : '';
    if (!tel) {
      alert('Telefone do membro não cadastrado!');
      return;
    }
    const msg = `Olá ${membro.nome}! Sentimos sua falta nos encontros da célula ${membro.celulaNome} ultimamente. Está tudo bem com você? Esperamos te ver no próximo encontro! Abraços.`;
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-6">


      {/* Grid de KPIs principais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card 
          onClick={() => onNavigate('lista')}
          className="group relative overflow-hidden bg-gradient-to-br from-[#eff6ff] to-white dark:from-[#131d31] dark:to-[#17223b] border border-blue-100/80 dark:border-[#24334f] rounded-2xl sm:rounded-[28px] p-4 sm:p-6 shadow-sm hover:shadow-md hover:scale-[1.01] hover:border-blue-300 dark:hover:border-blue-500/60 transition duration-200 cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-0.5 sm:space-y-1 min-w-0">
              <span className="text-[9px] sm:text-[10px] font-black uppercase text-blue-600/80 dark:text-blue-400 tracking-wider block truncate">Células Ativas</span>
              <h2 className="text-2xl sm:text-3xl font-black text-blue-950 dark:text-blue-100 mt-1">{totalCelulasAtivas}</h2>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/25 border border-blue-400/30 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-600/35">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <Network className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-center text-[8px] sm:text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wide gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Operação Normal
          </div>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-[#ecfdf5] to-white dark:from-[#102324] dark:to-[#17223b] border border-emerald-100/80 dark:border-[#24334f] rounded-2xl sm:rounded-[28px] p-4 sm:p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5 sm:space-y-1 min-w-0">
              <span className="text-[9px] sm:text-[10px] font-black uppercase text-emerald-600/80 dark:text-emerald-400 tracking-wider block truncate">Pessoas</span>
              <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-100 mt-1">{totalMembrosEmCelulas}</h2>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/25 border border-emerald-400/30 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-emerald-600/35">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 text-[8px] sm:text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-wide block truncate">
            Membros ativos
          </div>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-[#fff5f5] to-white dark:from-[#261521] dark:to-[#17223b] border border-rose-100/80 dark:border-[#24334f] rounded-2xl sm:rounded-[28px] p-4 sm:p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5 sm:space-y-1 min-w-0">
              <span className="text-[9px] sm:text-[10px] font-black uppercase text-rose-500/80 dark:text-rose-400 tracking-wider block truncate">Ausentes</span>
              <h2 className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 mt-1">
                {carregandoPresencas ? '...' : membrosAusentes.length}
              </h2>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/25 border border-rose-400/30 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-rose-600/35">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 text-[8px] sm:text-[10px] font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wide flex items-center gap-1 block truncate">
            ⚠️ Sem presença 30d
          </div>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-[#fffbeb] to-white dark:from-[#261f18] dark:to-[#17223b] border border-amber-100/80 dark:border-[#24334f] rounded-2xl sm:rounded-[28px] p-4 sm:p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5 sm:space-y-1 min-w-0">
              <span className="text-[9px] sm:text-[10px] font-black uppercase text-amber-600/80 dark:text-amber-400 tracking-wider block truncate">Ofertas</span>
              <h2 className="text-sm sm:text-2xl font-black text-amber-950 dark:text-amber-100 mt-1.5 truncate">
                R$ {totalOfertasAcumulado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/25 border border-amber-300/40 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-amber-500/35">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 text-[8px] sm:text-[10px] font-bold text-amber-500 dark:text-amber-400 uppercase tracking-wide block truncate">
            Recursos declarados
          </div>
        </Card>
      </div>

      {/* Row 2: Leaderboard (Células que mais ganham) & Zonas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Leaderboard */}
        <Card className="lg:col-span-7 bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954] rounded-[28px] p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-[#2b3954] pb-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/25 border border-amber-300/40">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                <Trophy size={15} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider">Destaques e Crescimento</h3>
              <p className="text-[10px] text-slate-400 font-medium">As células que mais prosperam no módulo</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mais ofertas */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <DollarSign size={12} className="text-emerald-500" /> Célula que mais arrecada (Ofertas)
              </h4>
              <div className="space-y-2">
                {rankingOfertas.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Sem dados registrados.</p>
                ) : (
                  rankingOfertas.map((c, i) => (
                    <div
                      key={c.id}
                      onClick={() => setCelulaSelecionadaId(c.id)}
                      className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 dark:border-[#24334f] hover:border-slate-200 dark:hover:border-blue-500/40 bg-slate-50/50 dark:bg-[#131d31] hover:bg-slate-100/70 dark:hover:bg-[#1c2b4a] transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] ${i === 0 ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}>
                          {i + 1}
                        </span>
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-xs">{c.nome}</span>
                      </div>
                      <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs">
                        R$ {c.totalOfertas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Mais visitantes */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={12} className="text-blue-500" /> Célula com mais Visitantes (Vidas)
              </h4>
              <div className="space-y-2">
                {rankingVisitantes.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Sem dados registrados.</p>
                ) : (
                  rankingVisitantes.map((c, i) => (
                    <div
                      key={c.id}
                      onClick={() => setCelulaSelecionadaId(c.id)}
                      className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 dark:border-[#24334f] hover:border-slate-200 dark:hover:border-blue-500/40 bg-slate-50/50 dark:bg-[#131d31] hover:bg-slate-100/70 dark:hover:bg-[#1c2b4a] transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] ${i === 0 ? 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}>
                          {i + 1}
                        </span>
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-xs">{c.nome}</span>
                      </div>
                      <span className="font-black text-blue-600 dark:text-blue-400 text-xs">
                        {c.totalVisitantes} {c.totalVisitantes === 1 ? 'visitante' : 'visitantes'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Zonas */}
        <Card className="lg:col-span-5 bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954] rounded-[28px] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-[#2b3954] pb-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/25 border border-blue-400/30">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                <MapPin size={15} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider">Distribuição por Zonas</h3>
              <p className="text-[10px] text-slate-400 font-medium">Localização geográfica das células</p>
            </div>
          </div>

          <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
            {celulasPorZona.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Sem zonas cadastradas.</p>
            ) : (
              celulasPorZona.map((z, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-200">{z.nome}</span>
                    <span className="text-slate-500 dark:text-slate-400">{z.qtd} ({z.pct.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${z.pct}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Row 3: Gerações (Hierarquia de células) & Ausentes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Gerações */}
        <Card className="lg:col-span-6 bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954] rounded-[28px] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-[#2b3954] pb-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-600/25 border border-purple-400/30">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                <GitBranch size={15} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider">Células por Gerações</h3>
              <p className="text-[10px] text-slate-400 font-medium">Árvore de multiplicação e discipulado</p>
            </div>
          </div>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {celulasPorGeracao.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Nenhuma geração mapeada.</p>
            ) : (
              celulasPorGeracao.map((g) => (
                <div key={g.geracao} className="space-y-2 border-l-2 border-slate-100 dark:border-[#24334f] pl-4 relative">
                  {/* Ponto indicador de geração */}
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-violet-500" />

                  <h4 className="text-[10px] font-black text-violet-700 dark:text-violet-400 uppercase tracking-wider">
                    {g.geracao}ª Geração {g.geracao === 1 ? '(Raiz / Matriz)' : `(Filhas)`}
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {g.celulas.map((c) => (
                      <span
                        key={c.id}
                        onClick={() => setCelulaSelecionadaId(c.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-[#131d31] hover:bg-slate-100 dark:hover:bg-[#1c2b4a] border border-slate-200/60 dark:border-[#24334f] rounded-xl text-[11px] font-bold text-slate-700 dark:text-slate-200 cursor-pointer transition"
                      >
                        {c.nome}
                        <ChevronRight size={10} className="text-slate-400" />
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Ausentes */}
        <Card className="lg:col-span-6 bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954] rounded-[28px] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-[#2b3954] pb-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/25 border border-rose-400/30">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                <AlertTriangle size={15} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider">Ausências Recentes (Membros)</h3>
              <p className="text-[10px] text-slate-400 font-medium">Pessoas que necessitam de contato e apoio pastoral</p>
            </div>
          </div>

          <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
            {carregandoPresencas ? (
              <p className="text-xs text-slate-400 italic">Carregando dados de chamada...</p>
            ) : membrosAusentes.length === 0 ? (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 rounded-xl p-3 text-center">
                🎉 Nenhum membro com ausência crítica nos últimos 30 dias!
              </p>
            ) : (
              membrosAusentes.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 dark:border-[#24334f] bg-slate-50/50 dark:bg-[#131d31] hover:bg-slate-100/70 dark:hover:bg-[#1c2b4a] transition"
                >
                  <div className="flex items-center gap-3">
                    <Avatar pessoa={m} tamanho="w-9 h-9" />
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs">{m.nome}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                        {m.celulaNome} · Última vez em: <span className="text-rose-500 dark:text-rose-400">{m.ultimaPresencaFormatada}</span>
                      </p>
                    </div>
                  </div>

                  {m.telefone && (
                    <button
                      type="button"
                      onClick={() => enviarMensagemWhatsApp(m)}
                      title="Enviar mensagem amigável no WhatsApp"
                      className="group relative overflow-hidden px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl shadow-xs shadow-emerald-700/20 hover:shadow-md hover:shadow-emerald-700/30 border border-emerald-400/30 transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider"
                    >
                      <MessageCircle size={14} className="group-hover:scale-110 transition-transform" />
                      <span>Cuidar</span>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
