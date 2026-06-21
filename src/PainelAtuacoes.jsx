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
        <div className="rounded-[var(--radius-control)] bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-5 shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">Membros Mobilizados</p>
              <h3 className="text-3xl font-black mt-1">{pessoasEngajadas.length}</h3>
              <p className="text-[10px] mt-2 opacity-90 font-medium">
                {Math.round((pessoasEngajadas.length / Math.max(activePessoas.length, 1)) * 100)}% da igreja ativa está servindo.
              </p>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl">
              <TrendingUp size={22} className="text-white" />
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius-control)] bg-gradient-to-br from-amber-500 to-orange-600 text-white p-5 shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">A Mobilizar (Sem Função)</p>
              <h3 className="text-3xl font-black mt-1">{pessoasAMobilizar.length}</h3>
              <button
                onClick={() => {
                  const el = document.getElementById('secao-mobilizar');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[10px] mt-2 opacity-90 font-bold underline hover:opacity-100 block text-left cursor-pointer"
              >
                Ver lista para integração →
              </button>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl">
              <Users size={22} className="text-white" />
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius-control)] bg-gradient-to-br from-rose-500 to-red-600 text-white p-5 shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">Necessidades Críticas</p>
              <h3 className="text-3xl font-black mt-1">{necessidadesCriticas.length}</h3>
              <p className="text-[10px] mt-2 opacity-90 font-medium truncate">
                {necessidadesCriticas.length > 0
                  ? `Papéis com < 3 membros: ${necessidadesCriticas.map(n => n.nome).join(', ')}`
                  : 'Todas as atuações contam com equipe mínima.'}
              </p>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl">
              <AlertCircle size={22} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6">

        {/* 📋 LISTA DE ATUAÇÕES (ESQUERDA) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Atuações Cadastradas</h3>
            <button
              onClick={() => onNavigate('config')}
              className="text-xs font-bold text-[#055F6D] hover:underline flex items-center gap-1"
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
                  className="p-5 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 bg-white"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="max-w-[70%]">
                        <h4 className="font-bold text-slate-800 text-sm truncate">{act.nome}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 min-h-[32px]">{act.descricao || 'Sem descrição cadastrada.'}</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 font-black rounded-full bg-[#055F6D]/10 text-[#055F6D]">
                        {totalMembros} {totalMembros === 1 ? 'membro' : 'membros'}
                      </span>
                    </div>

                    {/* Avatares dos Membros */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex -space-x-2.5 overflow-hidden">
                        {membros.slice(0, 5).map(m => (
                          <Avatar key={m.id} pessoa={m} tamanho="w-8 h-8 border-2 border-white rounded-full shadow-sm" />
                        ))}
                        {totalMembros > 5 && (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-slate-100 text-[10px] font-black text-slate-500 shadow-sm shrink-0">
                            +{totalMembros - 5}
                          </div>
                        )}
                      </div>
                      {totalMembros === 0 && (
                        <span className="text-[10px] italic text-rose-500 font-bold flex items-center gap-1">
                          ⚠️ Sem pessoas alocadas
                        </span>
                      )}
                    </div>

                    {/* Barra de Progresso Visual */}
                    <div className="mt-4">
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#055F6D] to-[#008dc6] h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(pct, 5)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Ações Rápidas */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex justify-between gap-3">
                    <button
                      onClick={() => abrirPessoasFiltradas({ atuacao: act.nome })}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition active:scale-95 cursor-pointer"
                    >
                      <Search size={13} />
                      Ver Lista
                    </button>
                    <button
                      onClick={() => setSelectedRole(act)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#055F6D] text-white text-xs font-bold hover:bg-[#044c57] transition shadow-sm active:scale-95 cursor-pointer"
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
          <Card className="p-0 bg-white">
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
                      <div key={item.pessoa.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition duration-300">
                        <div className="flex items-center gap-3">
                          <span className="text-base shrink-0 w-5 text-center">
                            {medals[index] || `${index + 1}º`}
                          </span>
                          <Avatar pessoa={item.pessoa} tamanho="w-9 h-9" />
                          <div>
                            <p className="text-xs font-bold text-slate-700">{item.pessoa.nome}</p>
                            <p className="text-[10px] text-slate-400 truncate max-w-[150px]">
                              {item.roles.join(', ')}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center px-3 py-1 font-black rounded-xl bg-[#055F6D]/10 text-[#055F6D] shrink-0 min-w-[52px]">
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
            <Card className="p-0 bg-white">
              <CardHeader
                titulo="Integrar à Equipe"
                subtitulo={`${pessoasAMobilizar.length} membros prontos para serem convidados.`}
              />
              <div className="p-5">
                <div className="max-h-[300px] overflow-y-auto pr-1 space-y-2.5 divide-y divide-slate-50">
                  {pessoasAMobilizar.length === 0 ? (
                    <p className="text-xs italic text-slate-400 text-center py-4">100% dos membros estão integrados!</p>
                  ) : (
                    pessoasAMobilizar.map(p => (
                      <div key={p.id} className="flex items-center justify-between pt-2.5 first:pt-0">
                        <div className="flex items-center gap-3">
                          <Avatar p={p} pessoa={p} tamanho="w-8 h-8" />
                          <div>
                            <p className="text-xs font-bold text-slate-700">{p.nome}</p>
                            <p className="text-[9px] text-slate-400">{p.celulas?.nome || 'Sem Célula'}</p>
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
                          className="text-[10px] font-bold text-[#055F6D] hover:bg-[#055F6D]/5 px-2.5 py-1.5 rounded-lg border border-slate-100 hover:border-[#055F6D]/20 transition shrink-0"
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
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 transition-opacity animate-in fade-in duration-200"
            onClick={() => setSelectedRole(null)}
          />

          {/* Corpo da Gaveta Lateral */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            {/* Cabeçalho */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">{selectedRole.nome}</h3>
                <p className="text-[10px] text-slate-400 font-medium max-w-[320px] truncate">{selectedRole.descricao || 'Gerenciamento de membros da atuação'}</p>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-600 transition shadow-xs"
              >
                <X size={16} />
              </button>
            </div>

            {/* Conteúdo com scroll */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">

              {/* Adicionar Pessoa */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Adicionar Membros</h4>
                <div className="relative">
                  <input
                    type="text"
                    value={buscaAdicionar}
                    onChange={(e) => setBuscaAdicionar(e.target.value)}
                    placeholder="Buscar pessoa ativa..."
                    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#055F6D]/20 transition"
                  />
                  <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                </div>

                {/* Resultados da busca rápida para adicionar */}
                {buscaAdicionar.trim() && (
                  <div className="border border-slate-100 rounded-xl bg-white shadow-lg overflow-hidden max-h-[180px] overflow-y-auto divide-y divide-slate-50 z-10 relative">
                    {candidatosAdicionar.length === 0 ? (
                      <p className="p-3 text-[11px] text-slate-400 italic text-center">Nenhum membro ativo encontrado.</p>
                    ) : (
                      candidatosAdicionar.map(p => (
                        <button
                          key={p.id}
                          onClick={() => handleAddPessoa(p)}
                          disabled={salvando}
                          className="w-full text-left p-2.5 hover:bg-slate-50 flex items-center justify-between text-xs transition cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar pessoa={p} tamanho="w-7 h-7" />
                            <div>
                              <p className="font-bold text-slate-700">{p.nome}</p>
                              {p.atuacao && <p className="text-[9px] text-slate-400">{p.atuacao}</p>}
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-[#055F6D] hover:bg-[#055F6D]/10 px-2 py-1 rounded-md border border-slate-100">
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
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Integrantes Atuais ({currentRoleMembers.length})
                </h4>

                {currentRoleMembers.length === 0 ? (
                  <div className="p-6 text-center border-2 border-dashed border-slate-100 rounded-2xl">
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
                          className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-white shadow-xs hover:border-slate-200 transition"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar pessoa={p} tamanho="w-9 h-9" />
                            <div>
                              <p className="text-xs font-bold text-slate-800">{p.nome}</p>
                              {outrasRoles.length > 0 ? (
                                <p className="text-[9px] text-slate-400 truncate max-w-[200px]">
                                  Também em: {outrasRoles.join(', ')}
                                </p>
                              ) : (
                                <p className="text-[9px] text-slate-400 italic">Exclusivo nesta atuação</p>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => handleRemovePessoa(p)}
                            disabled={salvando}
                            title="Remover da atuação"
                            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition active:scale-95 cursor-pointer shrink-0"
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
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button
                onClick={() => setSelectedRole(null)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer"
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
