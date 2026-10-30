import { useState, useMemo } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, Avatar, PageHeader } from './ui';
import {
  Users,
  Search,
  Plus,
  X,
  Award,
  AlertCircle,
  Trash2,
  ArrowLeft,
  TrendingUp,
  Check,
  ExternalLink
} from 'lucide-react';

export default function PainelAtuacoes({
  pessoas,
  atuacoesDisponiveis,
  obterDados,
  abrirPessoasFiltradas,
  onNavigate
}) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [buscaAdicionar, setBuscaAdicionar] = useState('');
  const [salvando, setSalvando] = useState(false);

  // Filtra pessoas ativas (ignora inativos e contribuintes)
  const activePessoas = useMemo(() => {
    return pessoas.filter(p => p.status !== 'inativo' && p.status !== 'contribuinte');
  }, [pessoas]);

  // Total de pessoas engajadas em pelo menos uma atuação
  const pessoasEngajadas = useMemo(() => {
    return activePessoas.filter(p => {
      const roles = p.atuacao ? p.atuacao.split(',').map(s => s.trim()) : [];
      return roles.length > 0;
    });
  }, [activePessoas]);

  // Pessoas sem nenhuma atuação vinculada (a mobilizar)
  const pessoasAMobilizar = useMemo(() => {
    return activePessoas.filter(p => {
      const roles = p.atuacao ? p.atuacao.split(',').map(s => s.trim()) : [];
      return roles.length === 0;
    });
  }, [activePessoas]);

  // Ranking das pessoas que atuam em mais áreas (Top 5)
  const rankingEngajamento = useMemo(() => {
    return [...activePessoas]
      .map(p => {
        const roles = p.atuacao ? p.atuacao.split(',').map(s => s.trim()) : [];
        return { pessoa: p, count: roles.length, roles };
      })
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [activePessoas]);

  // Atuações com necessidade crítica (menos de 3 pessoas)
  const necessidadesCriticas = useMemo(() => {
    return atuacoesDisponiveis.filter(act => {
      const count = activePessoas.filter(p => {
        const roles = p.atuacao ? p.atuacao.split(',').map(s => s.trim().toLowerCase()) : [];
        return roles.includes(act.nome.toLowerCase());
      }).length;
      return count < 3;
    });
  }, [atuacoesDisponiveis, activePessoas]);

  // Mapeamento das pessoas vinculadas a cada atuação
  const membrosPorAtuacao = useMemo(() => {
    const map = {};
    atuacoesDisponiveis.forEach(act => {
      map[act.nome] = activePessoas.filter(p => {
        const roles = p.atuacao ? p.atuacao.split(',').map(s => s.trim().toLowerCase()) : [];
        return roles.includes(act.nome.toLowerCase());
      });
    });
    return map;
  }, [atuacoesDisponiveis, activePessoas]);

  // Maior número de pessoas em uma única atuação (para escala do gráfico de progresso)
  const maxMembrosEmAtuacao = useMemo(() => {
    const counts = Object.values(membrosPorAtuacao).map(arr => arr.length);
    return Math.max(...counts, 1);
  }, [membrosPorAtuacao]);

  // Membros da atuação selecionada no painel lateral
  const currentRoleMembers = useMemo(() => {
    if (!selectedRole) return [];
    return membrosPorAtuacao[selectedRole.nome] || [];
  }, [selectedRole, membrosPorAtuacao]);

  // Candidatos para adicionar à atuação selecionada (ativos, não inseridos ainda, filtrados por busca)
  const candidatosAdicionar = useMemo(() => {
    if (!selectedRole) return [];
    const buscaNorm = buscaAdicionar.trim().toLowerCase();
    return activePessoas.filter(p => {
      const roles = p.atuacao ? p.atuacao.split(',').map(s => s.trim().toLowerCase()) : [];
      if (roles.includes(selectedRole.nome.toLowerCase())) return false;
      if (buscaNorm && !p.nome.toLowerCase().includes(buscaNorm)) return false;
      return true;
    });
  }, [selectedRole, activePessoas, buscaAdicionar]);

  // Ações de banco de dados
  const handleAddPessoa = async (pessoa) => {
    setSalvando(true);
    try {
      const currentAtuacoes = pessoa.atuacao ? pessoa.atuacao.split(',').map(s => s.trim()) : [];
      if (!currentAtuacoes.some(r => r.toLowerCase() === selectedRole.nome.toLowerCase())) {
        const newAtuacoes = [...currentAtuacoes, selectedRole.nome];
        const newAtuacaoStr = newAtuacoes.join(', ');

        const { error } = await supabase
          .from('pessoas')
          .update({ atuacao: newAtuacaoStr })
          .eq('id', pessoa.id);

        if (error) throw error;
        await obterDados();
        setBuscaAdicionar('');
      }
    } catch (err) {
      alert('Erro ao adicionar pessoa à atuação: ' + err.message);
    } finally {
      setSalvando(false);
    }
  };

  const handleRemovePessoa = async (pessoa) => {
    if (!window.confirm(`Deseja remover ${pessoa.nome} da atuação "${selectedRole.nome}"?`)) return;
    setSalvando(true);
    try {
      const currentAtuacoes = pessoa.atuacao ? pessoa.atuacao.split(',').map(s => s.trim()) : [];
      const newAtuacoes = currentAtuacoes.filter(r => r.toLowerCase() !== selectedRole.nome.toLowerCase());
      const newAtuacaoStr = newAtuacoes.length > 0 ? newAtuacoes.join(', ') : null;

      const { error } = await supabase
        .from('pessoas')
        .update({ atuacao: newAtuacaoStr })
        .eq('id', Math.max(pessoa.id, 0) ? pessoa.id : pessoa.id); // Safe check

      if (error) throw error;
      await obterDados();
    } catch (err) {
      alert('Erro ao remover pessoa da atuação: ' + err.message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        titulo="Painel de Atuações"
        breadcrumb={['Pessoas', 'Atuações']}
        onNavigate={() => onNavigate('todos')}
      />

      {/* 📊 INDICADORES DE ENGAJAMENTO E MOBILIZAÇÃO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="group relative overflow-hidden bg-gradient-to-br from-[#ecfdf5] to-white dark:from-[#102324] dark:to-[#17223b] border border-emerald-100/80 dark:border-[#24334f] rounded-2xl sm:rounded-[28px] p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5 sm:space-y-1 min-w-0">
              <span className="text-[10px] font-black uppercase text-emerald-600/80 dark:text-emerald-400 tracking-wider block truncate">Membros Mobilizados</span>
              <h3 className="text-3xl font-black text-emerald-950 dark:text-emerald-100 mt-1">{pessoasEngajadas.length}</h3>
            </div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/25 border border-emerald-400/30 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-emerald-600/35">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <p className="text-[10px] mt-3 sm:mt-4 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            {Math.round((pessoasEngajadas.length / Math.max(activePessoas.length, 1)) * 100)}% da igreja ativa está servindo.
          </p>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-[#fffbeb] to-white dark:from-[#261f18] dark:to-[#17223b] border border-amber-100/80 dark:border-[#24334f] rounded-2xl sm:rounded-[28px] p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5 sm:space-y-1 min-w-0">
              <span className="text-[10px] font-black uppercase text-amber-600/80 dark:text-amber-400 tracking-wider block truncate">A Mobilizar (Sem Função)</span>
              <h3 className="text-3xl font-black text-amber-950 dark:text-amber-100 mt-1">{pessoasAMobilizar.length}</h3>
            </div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/25 border border-amber-300/40 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-amber-500/35">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <Users className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('secao-mobilizar');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[10px] mt-3 sm:mt-4 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-bold uppercase tracking-wide underline block text-left cursor-pointer transition"
          >
            Ver lista para integração →
          </button>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-[#fff5f5] to-white dark:from-[#261521] dark:to-[#17223b] border border-rose-100/80 dark:border-[#24334f] rounded-2xl sm:rounded-[28px] p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5 sm:space-y-1 min-w-0">
              <span className="text-[10px] font-black uppercase text-rose-500/80 dark:text-rose-400 tracking-wider block truncate">Necessidades Críticas</span>
              <h3 className="text-3xl font-black text-rose-600 dark:text-rose-400 mt-1">{necessidadesCriticas.length}</h3>
            </div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/25 border border-rose-400/30 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-rose-600/35">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <AlertCircle className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <p className="text-[10px] mt-3 sm:mt-4 text-rose-500 dark:text-rose-400 font-bold uppercase tracking-wide truncate">
            {necessidadesCriticas.length > 0
              ? `Papéis com < 3 membros: ${necessidadesCriticas.map(n => n.nome).join(', ')}`
              : 'Todas as atuações contam com equipe mínima.'}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6">

        {/* 📋 LISTA DE ATUAÇÕES (ESQUERDA) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Atuações Cadastradas</h3>
            <button
              onClick={() => onNavigate('config')}
              className="text-xs font-bold text-[#055F6D] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Adicionar/Excluir Atuações em Configurações <ExternalLink size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {atuacoesDisponiveis.map((act) => {
              const membros = membrosPorAtuacao[act.nome] || [];
              const totalMembros = membros.length;
              // Percentual em relação ao papel mais populoso
              const pct = Math.round((totalMembros / maxMembrosEmAtuacao) * 100);

              return (
                <Card
                  key={act.id}
                  className="p-5 flex flex-col justify-between bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954] hover:shadow-md hover:border-slate-300 dark:hover:border-blue-500/50 transition-all duration-300"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <div className="max-w-[70%]">
                        <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">{act.nome}</h4>
                        <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5 line-clamp-2 min-h-[32px]">{act.descricao || 'Sem descrição cadastrada.'}</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 font-black rounded-full bg-[#055F6D]/10 dark:bg-blue-500/15 text-[#055F6D] dark:text-blue-300 border border-transparent dark:border-blue-500/30 shrink-0">
                        {totalMembros} {totalMembros === 1 ? 'membro' : 'membros'}
                      </span>
                    </div>

                    {/* Avatares dos Membros */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex -space-x-2.5 overflow-hidden">
                        {membros.slice(0, 5).map(m => (
                          <Avatar key={m.id} pessoa={m} tamanho="w-8 h-8 border-2 border-white dark:border-[#17223b] rounded-full shadow-sm" />
                        ))}
                        {totalMembros > 5 && (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white dark:border-[#17223b] bg-slate-100 dark:bg-[#1c2b4a] text-[10px] font-black text-slate-500 dark:text-slate-300 shadow-sm shrink-0">
                            +{totalMembros - 5}
                          </div>
                        )}
                      </div>
                      {totalMembros === 0 && (
                        <span className="text-[10px] italic text-rose-500 dark:text-rose-400 font-bold flex items-center gap-1">
                          ⚠️ Sem pessoas alocadas
                        </span>
                      )}
                    </div>

                    {/* Barra de Progresso Visual */}
                    <div className="mt-4">
                      <div className="w-full bg-slate-100 dark:bg-[#0b1329] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#055F6D] to-[#008dc6] dark:from-blue-600 dark:to-cyan-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(pct, 5)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Ações Rápidas */}
                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#2b3954] flex justify-between gap-3">
                    <button
                      onClick={() => abrirPessoasFiltradas({ atuacao: act.nome })}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 dark:border-[#24334f] bg-white dark:bg-[#131d31] text-xs font-bold text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1c2b4a] dark:hover:border-blue-500/40 transition active:scale-95 cursor-pointer"
                    >
                      <Search size={13} />
                      Ver Lista
                    </button>
                    <button
                      onClick={() => setSelectedRole(act)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#055F6D] hover:bg-[#044c57] dark:bg-gradient-to-r dark:from-blue-600 dark:via-indigo-600 dark:to-blue-700 dark:hover:from-blue-500 dark:hover:via-indigo-500 dark:hover:to-blue-600 text-white text-xs font-bold transition shadow-sm dark:shadow-blue-600/25 border border-transparent dark:border-blue-400/30 active:scale-95 cursor-pointer"
                    >
                      <Plus size={13} />
                      Gerenciar
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 🏆 QUADRO DE ENGAJAMENTO / RANKING (DIREITA) */}
        <div className="space-y-6">
          <Card className="p-0 bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954]">
            <CardHeader
              titulo="Ranking de Engajamento"
              subtitulo="Membros que servem em mais atuações na igreja."
            />
            <div className="p-5">
              {rankingEngajamento.length === 0 ? (
                <p className="text-xs italic text-slate-400 text-center py-4">Nenhum membro ativo engajado.</p>
              ) : (
                <div className="space-y-3.5">
                  {rankingEngajamento.map((item, index) => {
                    const medals = ['🥇', '🥈', '🥉'];
                    return (
                      <div key={item.pessoa.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-[#24334f] bg-slate-50/50 dark:bg-[#131d31] hover:bg-slate-50 dark:hover:bg-[#1c2b4a] transition duration-300">
                        <div className="flex items-center gap-3">
                          <span className="text-base shrink-0 w-5 text-center">
                            {medals[index] || `${index + 1}º`}
                          </span>
                          <Avatar pessoa={item.pessoa} tamanho="w-9 h-9" />
                          <div>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-100">{item.pessoa.nome}</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-400 truncate max-w-[150px]">
                              {item.roles.join(', ')}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center px-3 py-1 font-black rounded-xl bg-[#055F6D]/10 dark:bg-blue-500/15 text-[#055F6D] dark:text-blue-300 border border-transparent dark:border-blue-500/30 shrink-0 min-w-[52px]">
                          <span className="text-sm font-black leading-none">{item.count}</span>
                          <span className="text-[8px] font-bold uppercase tracking-wider leading-none mt-1">{item.count === 1 ? 'área' : 'áreas'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Card>

          {/* 🏡 COMPONENTE ADICIONAL: MEMBROS DISPONÍVEIS PARA CONVITE */}
          <div id="secao-mobilizar">
            <Card className="p-0 bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954]">
              <CardHeader
                titulo="Integrar à Equipe"
                subtitulo={`${pessoasAMobilizar.length} membros prontos para serem convidados.`}
              />
              <div className="p-5">
                <div className="max-h-[300px] overflow-y-auto pr-1 space-y-2.5 divide-y divide-slate-50 dark:divide-[#2b3954]">
                  {pessoasAMobilizar.length === 0 ? (
                    <p className="text-xs italic text-slate-400 text-center py-4">100% dos membros estão integrados!</p>
                  ) : (
                    pessoasAMobilizar.map(p => (
                      <div key={p.id} className="flex items-center justify-between pt-2.5 first:pt-0">
                        <div className="flex items-center gap-3">
                          <Avatar p={p} pessoa={p} tamanho="w-8 h-8" />
                          <div>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-100">{p.nome}</p>
                            <p className="text-[9px] text-slate-400 dark:text-slate-400">{p.celulas?.nome || 'Sem Célula'}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            // Ao clicar, escolhe a atuação para adicionar
                            const at = window.prompt(
                              `Para qual atuação deseja convidar ${p.nome}?\nOpções disponíveis: ${atuacoesDisponiveis.map(a => a.nome).join(', ')}`
                            );
                            if (!at) return;
                            const match = atuacoesDisponiveis.find(a => a.nome.toLowerCase() === at.trim().toLowerCase());
                            if (match) {
                              setSelectedRole(match);
                              handleAddPessoa(p);
                            } else {
                              alert('Atuação inválida.');
                            }
                          }}
                          className="text-[10px] font-bold text-[#055F6D] dark:text-blue-300 bg-transparent dark:bg-[#131d31] hover:bg-[#055F6D]/5 dark:hover:bg-blue-600/20 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-[#24334f] hover:border-[#055F6D]/20 dark:hover:border-blue-500/40 transition shrink-0 cursor-pointer"
                        >
                          Convidar
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* ⚙️ PAINEL LATERAL DE GERENCIAMENTO (DRAWER GAVETA) */}
      {selectedRole && (
        <>
          {/* Backdrop de Fundo Escurecido */}
          <div
            className="fixed inset-0 bg-slate-950/60 dark:bg-slate-950/75 backdrop-blur-xs z-50 transition-opacity animate-in fade-in duration-200"
            onClick={() => setSelectedRole(null)}
          />

          {/* Corpo da Gaveta Lateral */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white dark:bg-[#17223b] border-l border-transparent dark:border-[#2b3954] shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            {/* Cabeçalho */}
            <div className="p-5 border-b border-slate-100 dark:border-[#2b3954] flex items-center justify-between bg-slate-50/50 dark:bg-[#1c2b4a]">
              <div>
                <h3 className="font-extrabold text-slate-800 dark:text-white text-sm uppercase tracking-wider">{selectedRole.nome}</h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-400 font-medium max-w-[320px] truncate">{selectedRole.descricao || 'Gerenciamento de membros da atuação'}</p>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-[#131d31] border border-slate-200 dark:border-[#2b3954] text-slate-400 dark:text-slate-300 hover:text-slate-600 dark:hover:text-white transition shadow-xs cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Conteúdo com scroll */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">

              {/* Adicionar Pessoa */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">Adicionar Membros</h4>
                <div className="relative">
                  <input
                    type="text"
                    value={buscaAdicionar}
                    onChange={(e) => setBuscaAdicionar(e.target.value)}
                    placeholder="Buscar pessoa ativa..."
                    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#0b1329] text-slate-800 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#055F6D]/20 dark:focus:ring-blue-500/30 transition"
                  />
                  <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                </div>

                {/* Resultados da busca rápida para adicionar */}
                {buscaAdicionar.trim() && (
                  <div className="border border-slate-100 dark:border-[#2b3954] rounded-xl bg-white dark:bg-[#131d31] shadow-lg overflow-hidden max-h-[180px] overflow-y-auto divide-y divide-slate-50 dark:divide-[#24334f] z-10 relative">
                    {candidatosAdicionar.length === 0 ? (
                      <p className="p-3 text-[11px] text-slate-400 italic text-center">Nenhum membro ativo encontrado.</p>
                    ) : (
                      candidatosAdicionar.map(p => (
                        <button
                          key={p.id}
                          onClick={() => handleAddPessoa(p)}
                          disabled={salvando}
                          className="w-full text-left p-2.5 hover:bg-slate-50 dark:hover:bg-[#1c2b4a] flex items-center justify-between text-xs transition cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar pessoa={p} tamanho="w-7 h-7" />
                            <div>
                              <p className="font-bold text-slate-700 dark:text-slate-100">{p.nome}</p>
                              {p.atuacao && <p className="text-[9px] text-slate-400 dark:text-slate-400">{p.atuacao}</p>}
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-[#055F6D] dark:text-blue-300 bg-transparent dark:bg-blue-500/15 hover:bg-[#055F6D]/10 dark:hover:bg-blue-500/25 px-2 py-1 rounded-md border border-slate-100 dark:border-blue-500/30">
                            + Alocar
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Membros Alocados na Atuação */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                  Integrantes Atuais ({currentRoleMembers.length})
                </h4>

                {currentRoleMembers.length === 0 ? (
                  <div className="p-6 text-center border-2 border-dashed border-slate-100 dark:border-[#2b3954] bg-transparent dark:bg-[#131d31]/50 rounded-2xl">
                    <p className="text-xs text-slate-400 italic">Nenhum membro alocado nesta atuação.</p>
                    <p className="text-[10px] text-slate-400 mt-1">Busque um nome acima para adicioná-lo.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentRoleMembers.map(p => {
                      const outrasRoles = p.atuacao
                        ? p.atuacao.split(',').map(s => s.trim()).filter(r => r.toLowerCase() !== selectedRole.nome.toLowerCase())
                        : [];

                      return (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 dark:border-[#24334f] bg-white dark:bg-[#131d31] shadow-xs hover:border-slate-200 dark:hover:border-blue-500/40 transition"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar pessoa={p} tamanho="w-9 h-9" />
                            <div>
                              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{p.nome}</p>
                              {outrasRoles.length > 0 ? (
                                <p className="text-[9px] text-slate-400 dark:text-slate-400 truncate max-w-[200px]">
                                  Também em: {outrasRoles.join(', ')}
                                </p>
                              ) : (
                                <p className="text-[9px] text-slate-400 dark:text-slate-400 italic">Exclusivo nesta atuação</p>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => handleRemovePessoa(p)}
                            disabled={salvando}
                            title="Remover da atuação"
                            className="p-2 rounded-xl text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-transparent hover:border-rose-100 dark:hover:border-rose-800/50 transition active:scale-95 cursor-pointer shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Rodapé da Gaveta */}
            <div className="p-4 border-t border-slate-100 dark:border-[#2b3954] bg-slate-50/50 dark:bg-[#1c2b4a] flex justify-end">
              <button
                onClick={() => setSelectedRole(null)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer"
              >
                Concluído
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
