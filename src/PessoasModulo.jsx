import { useState, useMemo, useEffect } from 'react';
import { Card, CardHeader, Avatar, SelectFiltro, ColumnChart, DoughnutCard, PageHeader } from './ui';
import { supabase } from './supabaseClient';
import DetalhesMembro from './DetalhesMembro';
import FormularioCadastro from './FormularioCadastro';
import { meses, agrupamentoPor, valorCampoRelatorio, faixasEtarias } from './churchUtils';

export default function PessoasModulo(props) {
  const {
    submenu, pessoas, pessoasFiltradas, filtros, alterarFiltro, limparFiltros,
    zonas, carregando, membroSelecionadoId, setMembroSelecionadoId, obterDados,
    cargosDisponiveis, atuacoesDisponiveis, escolaridadesDisponiveis, abrirPessoasFiltradas, membroLogado
    , onNavigate,
    filtrosMobileAberto, setFiltrosMobileAberto
  } = props;

  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth());
  const [relatorioSelecionado, setRelatorioSelecionado] = useState('Cargos');
  const [abaPessoas, setAbaPessoas] = useState('membros'); // 'membros' | 'contribuintes'

  // Remove os cadastros rápidos (contribuinte) e os que aguardam aprovação (pendente) da listagem principal
  const pessoasFiltradasMembros = useMemo(
    () => pessoasFiltradas.filter((p) => p.status !== 'contribuinte' && p.status !== 'pendente'),
    [pessoasFiltradas]
  );

  if (membroSelecionadoId) {
    return (
      <DetalhesMembro
        pessoaId={membroSelecionadoId}
        onFechar={() => setMembroSelecionadoId(null)}
        listaPessoas={pessoas}
        onDadosAtualizados={obterDados}
        cargosLista={cargosDisponiveis}
        atuacoesLista={atuacoesDisponiveis}
        membroLogado={membroLogado}
      />
    );
  }

  if (submenu === 'adicionar') {
    return (
      <div className="space-y-6">
        <div className="hidden md:block">
          <PageHeader titulo="Novo Cadastro" breadcrumb={['Pessoas', 'Novo Cadastro']} onNavigate={() => onNavigate('todos')} />
        </div>
        <FormularioCadastro
          onPessoaCadastrada={obterDados}
          listaPessoasExistentes={pessoas}
          cargosLista={cargosDisponiveis}
          atuacoesLista={atuacoesDisponiveis}
        />
      </div>
    );
  }

  if (submenu === 'aniversariantes') {
    return <AniversariantesPessoas pessoas={pessoas} mesSelecionado={mesSelecionado} setMesSelecionado={setMesSelecionado} onNavigate={onNavigate} />;
  }

  if (submenu === 'cargo') {
    return <AgrupamentoPessoas titulo="Membros por Cargo" itens={cargosDisponiveis} campo="cargo" pessoas={pessoas} abrirPessoasFiltradas={abrirPessoasFiltradas} breadcrumb={['Pessoas', 'Cargos']} onNavigate={onNavigate} />;
  }

  if (submenu === 'zona') {
    return <AgrupamentoPessoas titulo="Membros por Zona" itens={zonas} campo="zona_id" pessoas={pessoas} abrirPessoasFiltradas={abrirPessoasFiltradas} breadcrumb={['Pessoas', 'Zonas']} onNavigate={onNavigate} />;
  }

  if (submenu === 'atuacao') {
    return <AgrupamentoPessoas titulo="Membros por Atuação" itens={atuacoesDisponiveis} campo="atuacao" pessoas={pessoas} abrirPessoasFiltradas={abrirPessoasFiltradas} breadcrumb={['Pessoas', 'Atuações']} onNavigate={onNavigate} />;
  }

  if (submenu === 'relatorios') {
    return <RelatoriosPessoas pessoas={pessoas} zonas={zonas} abrirPessoasFiltradas={abrirPessoasFiltradas} relatorioSelecionado={relatorioSelecionado} setRelatorioSelecionado={setRelatorioSelecionado} breadcrumb={['Pessoas', 'Relatórios']} onNavigate={onNavigate} />;
  }

  if (submenu === 'inativos') {
    return <InativosPessoas pessoas={pessoas} onNavigate={onNavigate} obterDados={obterDados} />;
  }

  if (submenu === 'link_publico') {
    return <LinkPublicoCadastro onNavigate={onNavigate} />;
  }

  return (
    <>
      <div className="hidden md:block">
        <PageHeader titulo="Membros"/>
      </div>
      {carregando && <div className="text-sm font-medium text-[#2563eb] mb-4">Sincronizando dados...</div>}

      {/* Navegação por abas: Membros / Contribuintes (dizimistas não-membros) */}
      <div className="grid grid-cols-2 gap-2 sm:inline-flex sm:gap-2 mb-5">
        <button
          type="button"
          onClick={() => setAbaPessoas('membros')}
          className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer ${abaPessoas === 'membros' ? 'bg-[#2563eb] text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
        >
          Membros
        </button>
        <button
          type="button"
          onClick={() => setAbaPessoas('contribuintes')}
          className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer ${abaPessoas === 'contribuintes' ? 'bg-[#2563eb] text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
        >
          Contribuintes
        </button>
      </div>

      {abaPessoas === 'contribuintes' ? (
        <AbaContribuintes pessoas={pessoas} obterDados={obterDados} />
      ) : (
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
        <Card className="p-0">
          <CardHeader 
            titulo={`${pessoasFiltradasMembros.length} Pessoas`} 
            children={
              <input 
                type="search" 
                value={filtros.busca} 
                onChange={(e) => alterarFiltro('busca', e.target.value)} 
                placeholder="Buscar por nome..." 
                className="rounded-x1 border border-slate-500 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008dc6]/20"
              />
            }
          />
          <TabelaPessoas pessoas={pessoasFiltradasMembros} onSelecionar={setMembroSelecionadoId} />
        </Card>

        {/* Drawer de Filtros para Mobile / Sidebar para Desktop */}
        <div className={`${filtrosMobileAberto ? 'fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm' : 'hidden xl:block'} transition-all`}>
          <div className={`${filtrosMobileAberto ? 'bg-white rounded-t-[32px] sm:rounded-3xl w-full max-w-md animate-in slide-in-from-bottom duration-300' : ''} overflow-hidden`}>
            {filtrosMobileAberto && (
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Filtrar Membros</h4>
                <button onClick={() => setFiltrosMobileAberto(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400">✕</button>
              </div>
            )}
            <FiltrosPessoas 
              filtros={filtros} 
              alterarFiltro={alterarFiltro} 
              limparFiltros={limparFiltros} 
              zonas={zonas} 
              cargosDisponiveis={cargosDisponiveis} 
              atuacoesDisponiveis={atuacoesDisponiveis} 
              escolaridadesDisponiveis={escolaridadesDisponiveis} 
            />
          </div>
        </div>
      </div>
      )}
    </>
  );
}

function TabelaPessoas({ pessoas, onSelecionar }) {
  if (!pessoas || pessoas.length === 0) {
    return <div className="p-10 text-center text-sm text-slate-400">Nenhuma pessoa corresponde aos filtros ativos.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table-mib">
        <thead className="hidden md:table-header-group">
          <tr><th>Nome</th><th className="hidden md:table-cell">Cargo / Função</th><th className="hidden md:table-cell">Contato</th><th className="hidden md:table-cell">Célula</th></tr>
        </thead>
        <tbody>
          {pessoas.map((p) => (
            <tr key={p.id} onClick={() => onSelecionar(p.id)} className="cursor-pointer">
              <td className="py-3 md:py-2">
                <div className="flex items-center gap-3">
                  <Avatar pessoa={p} tamanho="w-15  h-15" />
                  <div>
                    <p className="font-semibold text-slate-700">{p.nome}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">{p.email || 'Sem e-mail'}</p>
                  </div>
                </div>
              </td>
              <td className="hidden md:table-cell"><span className="text-xs px-2 py-0.5 rounded-lg bg-[var(--surface-muted)] border">{p.cargo || 'Membro'}</span></td>
              <td className="hidden md:table-cell text-xs text-[var(--text-muted)]">{p.telefone || '—'}</td>
              <td className="hidden md:table-cell"><span className="text-xs font-semibold text-[#2563eb]">{p.celulas?.nome || '😢 Sem Célula'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LinkPublicoCadastro({ onNavigate }) {
  const urlPublica = window.location.origin + '/cadastro-publico';
  
  const copiarLink = () => {
    navigator.clipboard.writeText(urlPublica);
    window.alert('✅ Link copiado! Agora você pode colar no WhatsApp ou redes sociais.');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        titulo="Link de Autocadastro" 
        breadcrumb={['Pessoas', 'Link Público']} 
        onNavigate={() => onNavigate('todos')}
        subtitulo="Compartilhe este link para que novos membros preencham seus próprios dados."
      />
      
      <Card className="p-8 text-center max-w-2xl mx-auto bg-gradient-to-br from-white to-blue-50/20">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm">
          🔗
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-2">Pronto para compartilhar!</h3>
        <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
          Copie o link abaixo e envie pelo WhatsApp para novos convertidos ou visitantes. 
          O formulário exibe automaticamente a logo e dados configurados em sua igreja.
        </p>
        
        <div className="flex flex-col sm:flex-row items-stretch gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <code className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50/50 px-4 py-3 rounded-xl flex-1 flex items-center break-all text-left">
            {urlPublica}
          </code>
          <button 
            onClick={copiarLink}
            className="px-6 py-3 bg-[#1e3a8a] hover:bg-[#1e40af] text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20 whitespace-nowrap"
          >
            📋 Copiar Link
          </button>
        </div>
        
        <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">🛡️</div>
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">Segurança Total</p>
              <p className="text-[10px] text-slate-400 mt-0.5">O link permite apenas a criação de novos cadastros. Ninguém poderá ver dados de outros membros por aqui.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">✨</div>
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">Identidade Visual</p>
              <p className="text-[10px] text-slate-400 mt-0.5">A logo e os contatos que aparecem no topo são os que você definiu na tela de "Configurações".</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function InativosPessoas({ pessoas, onNavigate, obterDados }) {
  const inativos = useMemo(() => {
    return pessoas.filter(p => p.status === 'inativo')
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }, [pessoas]);

  async function handleReativar(id, nome) {
    if (!(await window.confirmModal("Reativar Cadastro", `Deseja reativar o cadastro de ${nome}?`))) return;
    
    const { error } = await supabase
      .from('pessoas')
      .update({ status: 'ativo', motivo_exclusao: null })
      .eq('id', id);

    if (!error) {
      obterDados();
    } else {
      alert('Erro ao reativar: ' + error.message);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader titulo="Membros Inativos" breadcrumb={['Pessoas', 'Inativos']} onNavigate={() => onNavigate('todos')} subtitulo="Listagem de cadastros desativados do sistema." />
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="table-mib">
            <thead className="hidden md:table-header-group">
              <tr>
                <th>Nome</th>
                <th className="hidden md:table-cell">Motivo da Inativação</th>
                <th className="hidden md:table-cell">Data</th>
                <th className="text-right pr-6">Ações</th>
              </tr>
            </thead>
            <tbody>
              {inativos.length === 0 ? (
                <tr><td colSpan="4" className="p-10 text-center text-slate-400 italic">Nenhum membro inativo no momento.</td></tr>
              ) : (
                inativos.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="flex items-center gap-3 py-2 md:py-0">
                        <Avatar pessoa={p} tamanho="w-8 h-8" />
                        <div>
                          <span className="font-bold text-slate-700 block">{p.nome}</span>
                          <span className="md:hidden text-[10px] text-slate-400 font-medium uppercase tracking-tight">{p.motivo_exclusao || 'Não informado'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell text-sm text-slate-500">{p.motivo_exclusao || 'Não informado'}</td>
                    <td className="hidden md:table-cell text-xs text-slate-400">{new Date(p.updated_at).toLocaleDateString('pt-BR')}</td>
                    <td className="text-right pr-6">
                      <button 
                        onClick={() => handleReativar(p.id, p.nome)}
                        className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition shadow-sm"
                        title="Reativar Membro"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function FiltrosPessoas({ filtros, alterarFiltro, limparFiltros, zonas, cargosDisponiveis, escolaridadesDisponiveis, atuacoesDisponiveis }) {
  return (
    <Card className="p-5 space-y-4 h-fit">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <h3 className="font-semibold text-sm text-[var(--text-heading)] uppercase tracking-wider">Filtros</h3>
        <button type="button" onClick={limparFiltros} className="text-xs font-medium text-[#2563eb]">Limpar</button>
      </div>
      <SelectFiltro label="Gênero" valor={filtros.genero} onChange={(v) => alterarFiltro('genero', v)} opcoes={['Masculino', 'Feminino']} />
      <SelectFiltro label="Faixa etária" valor={filtros.faixaEtaria} onChange={(v) => alterarFiltro('faixaEtaria', v)} opcoes={faixasEtarias.map((f) => ({ valor: f.id, label: f.nome }))} />
      <SelectFiltro label="Zona" valor={filtros.zona} onChange={(v) => alterarFiltro('zona', v)} opcoes={zonas.map((z) => ({ valor: z.id, label: z.nome }))} />
      <SelectFiltro label="Cargo" valor={filtros.cargo} onChange={(v) => alterarFiltro('cargo', v)} opcoes={cargosDisponiveis.map(c => c.nome)} />
      <SelectFiltro label="Campo de Atuação" valor={filtros.atuacao} onChange={(v) => alterarFiltro('atuacao', v)} opcoes={atuacoesDisponiveis.map(a => a.nome)} />
      <SelectFiltro label="Escolaridade" valor={filtros.escolaridade} onChange={(v) => alterarFiltro('escolaridade', v)} opcoes={escolaridadesDisponiveis} />
    </Card>
  );
}

function AniversariantesPessoas({ pessoas, mesSelecionado, setMesSelecionado, onNavigate }) {
  const pessoasAtivas = useMemo(() => pessoas.filter(p => p.status !== 'inativo' && p.status !== 'contribuinte'), [pessoas]);
  const contagemMeses = meses.map((_, index) =>
    pessoasAtivas.filter((p) => p.data_nascimento && new Date(`${p.data_nascimento}T00:00:00`).getMonth() === index).length
  );
  const aniversariantes = useMemo(() => {
    return pessoasAtivas.filter((p) => p.data_nascimento && new Date(`${p.data_nascimento}T00:00:00`).getMonth() === mesSelecionado)
      .sort((a, b) => new Date(`${a.data_nascimento}T00:00:00`).getDate() - new Date(`${b.data_nascimento}T00:00:00`).getDate());
  }, [pessoasAtivas, mesSelecionado]);

  return (
    <div className="space-y-6">
      <PageHeader titulo="Aniversariantes" breadcrumb={['Pessoas', 'Aniversariantes']} onNavigate={() => onNavigate('todos')} />
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {meses.map((mes, index) => (
          <button key={mes} onClick={() => setMesSelecionado(index)} className={`rounded-2xl border p-4 text-left transition ${mesSelecionado === index ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'}`}>
            <span className="block text-xs font-semibold uppercase opacity-70">{mes}</span>
            <span className="block mt-2 text-2xl font-bold text-center">{contagemMeses[index]}</span>
          </button>
        ))}
      </div>
      <Card className="p-0">
        {aniversariantes.length === 0 ? <p className="p-10 text-center text-sm text-slate-400">Ninguém faz aniversário em {meses[mesSelecionado]}.</p> : (
          <div className="divide-y">
            {aniversariantes.map((p) => (
              <div key={p.id} className="p-4 flex items-center gap-3">
                <Avatar pessoa={p} />
                <div>
                  <p className="font-bold text-slate-900">{p.nome}</p>
                  <p className="text-xs text-slate-400">{new Date(`${p.data_nascimento}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function AgrupamentoPessoas({ titulo, itens, campo, pessoas, abrirPessoasFiltradas, breadcrumb = [], onNavigate }) {
  return (
    <div className="space-y-4">
      <PageHeader titulo={titulo} breadcrumb={breadcrumb} onNavigate={() => onNavigate('todos')} />
      <Card className="p-0">
        <table className="table-mib">
          <thead><tr><th>Nome</th><th>Vinculados</th><th className="text-right">Ação</th></tr></thead>
          <tbody>
            {itens.map((item) => {
              const pessoasAtivas = pessoas.filter(p => p.status !== 'inativo' && p.status !== 'contribuinte');
              // Cargos e Atuações no banco guardam o NOME, enquanto Zonas guardam o ID.
              const isIdField = campo.endsWith('_id');
              const val = isIdField ? (item.id || item) : (item.nome || item);
              
              const contagem = pessoasAtivas.filter((p) => String(p[campo] || '') === String(val)).length;
              return (
                <tr key={val}>
                  <td className="font-medium">{item.nome || item}</td>
                  <td>{contagem} pessoas</td>
                  <td className="text-right">
                    <button onClick={() => abrirPessoasFiltradas({ [campo === 'zona_id' ? 'zona' : campo]: val })} className="text-xs font-bold text-[#2563eb]">Ver lista</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function RelatoriosPessoas({ pessoas, zonas, abrirPessoasFiltradas, relatorioSelecionado, setRelatorioSelecionado, breadcrumb = [], onNavigate }) {
  const botoes = ['Cargos', 'Faixa etaria', 'Aniversarios', 'Sexo', 'Estado civil', 'Batismo', 'Zona de moradia', 'Campo de Atuação'];
  const pessoasAtivas = useMemo(() => pessoas.filter(p => p.status !== 'inativo' && p.status !== 'contribuinte'), [pessoas]);
  const dados = agrupamentoPor(pessoasAtivas, (p) => valorCampoRelatorio(p, relatorioSelecionado, zonas));

  return (
    <div className="space-y-6">
      {/* PageHeader visível apenas em telas maiores que md */}
      <div className="hidden md:block">
        <PageHeader titulo="Relatórios de Membresia" breadcrumb={breadcrumb} onNavigate={() => onNavigate('todos')} />
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6 items-start">
        {/* Painel Lateral de Opções */}
        <Card className="p-0 h-fit">
          <CardHeader titulo="Opções de Relatório" subtitulo="Selecione o indicador desejado." />
          {/* Select para mobile */}
          <div className="p-4 md:hidden">
            <select
              value={relatorioSelecionado}
              onChange={(e) => setRelatorioSelecionado(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white outline-none"
            >
              {botoes.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          {/* Botões para desktop */}
          <div className="p-4 space-y-2 hidden md:block">
            {botoes.map((b) => (
              <button key={b} onClick={() => setRelatorioSelecionado(b)} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${relatorioSelecionado === b ? 'bg-[#2563eb] text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                {b}
              </button>
            ))}
          </div>
        </Card>

        {/* Conteúdo Principal: Gráfico e Tabela */}
        <div className="space-y-6">
          {relatorioSelecionado === 'Faixa etaria' ? (
            <DoughnutCard 
              titulo={`Indicadores: ${relatorioSelecionado}`} 
              dados={dados} 
              startAngle={180} 
              endAngle={0} 
              hideLegend={true} 
            />
          ) : (
            <ColumnChart titulo={`Indicadores: ${relatorioSelecionado}`} dados={dados} hideLegend={true} />
          )}
          <Card className="p-0">
            <table className="table-mib">
              <thead>
                <tr>
                  <th className="pl-6">Classificação</th>
                  <th className="text-center">Membros</th>
                  <th className="text-center">%</th>
                  <th className="text-right pr-6">Ação</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(dados).map(([label, valor]) => (
                  <tr key={label}>
                    <td className="font-medium pl-6">{label}</td>
                    <td className="text-center">{valor}</td>
                    <td className="text-center text-slate-400 font-bold">
                      {((valor / (pessoasAtivas.length || 1)) * 100).toFixed(0)}%
                    </td>
                    <td className="text-right">
                      <button onClick={() => abrirPessoasFiltradas({ relatorioCampo: relatorioSelecionado, relatorioValor: label })} className="text-xs font-bold text-[#2563eb] cursor-pointer hover:underline">Ver lista</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Aplica máscara progressiva de telefone brasileiro: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
function formatarTelefoneInput(value) {
  const digitos = value.replace(/\D/g, '').slice(0, 11);
  if (digitos.length <= 2) return digitos;
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10) return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

// Aba "Contribuintes": cadastro rápido de dizimistas que ainda não são membros.
// O registro é salvo em "pessoas" com status = 'contribuinte', o que faz com que:
//  - NÃO apareça na lista de Membros, Aniversariantes, Agrupamentos ou Relatórios;
//  - apareça automaticamente no seletor "Membro" do modal "Nova Receita" do
//    Módulo Financeiro, pois esse select só exclui pessoas com status 'excluido'.
function AbaContribuintes({ pessoas, obterDados }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [contribuicoesAbertas, setContribuicoesAbertas] = useState(null);
  // Controla a exibição do formulário em telas menores que xl (pushdown)
  const [formAbertoMobile, setFormAbertoMobile] = useState(false);

  const contribuintes = useMemo(
    () => pessoas
      .filter((p) => p.status === 'contribuinte')
      .sort((a, b) => (a.nome || '').localeCompare(b.nome || '', 'pt-BR')),
    [pessoas]
  );

  function handleCancelar() {
    setEditandoId(null);
    setNome('');
    setTelefone('');
    setFormAbertoMobile(false);
  }

  function handleEditar(p) {
    setEditandoId(p.id);
    setNome(p.nome || '');
    setTelefone(p.telefone || '');
    setFormAbertoMobile(true);
  }

  async function handleSalvar(e) {
    e.preventDefault();
    if (!nome.trim()) return;

    setEnviando(true);
    try {
      if (editandoId) {
        const { error } = await supabase
          .from('pessoas')
          .update({ nome: nome.trim(), telefone: telefone.trim() || null })
          .eq('id', editandoId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('pessoas')
          .insert([{ nome: nome.trim(), telefone: telefone.trim() || null, status: 'contribuinte' }]);
        if (error) throw error;
      }
      handleCancelar();
      obterDados();
    } catch (err) {
      alert('Erro ao salvar contribuinte: ' + err.message);
    } finally {
      setEnviando(false);
    }
  }

  async function handleExcluir(p) {
    if (!(await window.confirmModal("Excluir Contribuinte", `Deseja excluir o contribuinte "${p.nome}"? O histórico de contribuições será mantido, mas ele deixará de aparecer nesta lista e no seletor de membros do módulo financeiro.`))) return;
    try {
      const { error } = await supabase.from('pessoas').update({ status: 'excluido' }).eq('id', p.id);
      if (error) throw error;
      if (editandoId === p.id) handleCancelar();
      obterDados();
    } catch (err) {
      alert('Erro ao excluir contribuinte: ' + err.message);
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-5">
      {/* Botão-gatilho exibido apenas em telas menores que xl, abre o formulário em pushdown */}
      {!formAbertoMobile && (
        <button
          type="button"
          onClick={() => setFormAbertoMobile(true)}
          className="xl:hidden w-full px-4 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition shadow-sm flex items-center justify-center gap-2"
        >
          <span className="text-base font-black">+</span> Incluir Contribuinte
        </button>
      )}

      {/* Painel lateral esquerdo: formulário de cadastro rápido (sempre visível em xl, pushdown em telas menores) */}
      <Card className={`p-5 h-fit ${formAbertoMobile ? 'block animate-in slide-in-from-top fade-in duration-300' : 'hidden'} xl:block xl:animate-none`}>
        <h3 className="font-semibold text-sm text-[var(--text-heading)] uppercase tracking-wider mb-4 border-b border-[var(--border)] pb-3">
          {editandoId ? 'Editar Contribuinte' : 'Novo Contribuinte'}
        </h3>
        <form onSubmit={handleSalvar} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5">Nome</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome completo"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008dc6]/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5">Telefone</label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(formatarTelefoneInput(e.target.value))}
              placeholder="(00) 00000-0000"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008dc6]/20"
            />
          </div>
          <div className="flex items-center gap-2 pt-1">
            {editandoId ? (
              <button
                type="button"
                onClick={handleCancelar}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-600 transition"
              >
                Cancelar
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setFormAbertoMobile(false)}
                className="xl:hidden px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-600 transition"
              >
                Fechar
              </button>
            )}
            <button
              type="submit"
              disabled={enviando}
              className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition shadow-sm disabled:opacity-50"
            >
              {enviando ? 'Salvando...' : editandoId ? 'Salvar Alterações' : 'Incluir Contribuinte'}
            </button>
          </div>
        </form>
        <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
          Ao incluir, o nome fica disponível no seletor "Membro" do modal Nova Receita, no Módulo Financeiro, sem aparecer na lista de membros da igreja.
        </p>
      </Card>

      {/* Lista de contribuintes cadastrados */}
      <Card className="p-0">
        <CardHeader
          titulo={`${contribuintes.length} Contribuintes`}
          subtitulo="Pessoas que dizimam mas ainda não são membros cadastrados."
        />
        {contribuintes.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">Nenhum contribuinte cadastrado ainda.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-mib">
              <thead className="hidden md:table-header-group">
                <tr>
                  <th>Nome</th>
                  <th className="hidden md:table-cell">Telefone</th>
                  <th className="text-right pr-6">Ações</th>
                </tr>
              </thead>
              <tbody>
                {contribuintes.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 md:py-2">
                      <p className="font-semibold text-slate-700">{p.nome}</p>
                      <p className="md:hidden text-[11px] text-[var(--text-muted)] mt-0.5">{p.telefone || 'Sem telefone'}</p>
                    </td>
                    <td className="hidden md:table-cell text-xs text-[var(--text-muted)]">{p.telefone || '—'}</td>
                    <td className="text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setContribuicoesAbertas(p)}
                          title="Ver Contribuições"
                          className="text-[#2563eb] hover:bg-blue-50 transition p-1.5 rounded-lg cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEditar(p)}
                          title="Editar Contribuinte"
                          className="text-[#202046] hover:text-[#2F2F80] transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleExcluir(p)}
                          title="Excluir Contribuinte"
                          className="text-rose-500 hover:text-rose-700 transition p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {contribuicoesAbertas && (
        <ModalContribuicoesContribuinte
          pessoa={contribuicoesAbertas}
          onFechar={() => setContribuicoesAbertas(null)}
        />
      )}
    </div>
  );
}

// Modal somente-leitura que lista todos os lançamentos financeiros vinculados ao pessoa_id do contribuinte
function ModalContribuicoesContribuinte({ pessoa, onFechar }) {
  const [contribuicoes, setContribuicoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;
    async function carregar() {
      setCarregando(true);
      const { data, error } = await supabase
        .from('transacoes_financeiras')
        .select('*, categorias_financeiras(nome), contas_financeiras(nome)')
        .eq('pessoa_id', pessoa.id)
        .order('data', { ascending: false });

      if (!ativo) return;
      if (error) {
        console.error('Erro ao carregar contribuições:', error);
        setContribuicoes([]);
      } else {
        setContribuicoes(data || []);
      }
      setCarregando(false);
    }
    carregar();
    return () => { ativo = false; };
  }, [pessoa.id]);

  const total = useMemo(
    () => contribuicoes.reduce((acc, t) => acc + (Number(t.valor) || 0), 0),
    [contribuicoes]
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white rounded-none sm:rounded-3xl border-none sm:border sm:border-slate-200 shadow-2xl w-full max-w-2xl h-full sm:h-auto sm:max-h-[85vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-emerald-50/30">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base uppercase tracking-tight">Contribuições de {pessoa.nome}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {contribuicoes.length} lançamento(s) • Total: R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <button type="button" onClick={onFechar} className="text-slate-400 hover:text-slate-600 font-bold p-2 text-xl">✕</button>
        </div>
        <div className="overflow-y-auto flex-1">
          {carregando ? (
            <div className="p-10 text-center text-sm text-slate-400">Carregando contribuições...</div>
          ) : contribuicoes.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-400">Nenhuma contribuição registrada para este contribuinte.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {contribuicoes.map((c) => (
                <div key={c.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{c.descricao}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {c.data ? new Date(c.data + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}
                      {' • '}{c.categorias_financeiras?.nome || 'Sem categoria'}
                      {' • '}{c.contas_financeiras?.nome || 'Sem conta'}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`block text-sm font-black ${c.tipo === 'despesa' ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {c.tipo === 'despesa' ? '- ' : ''}R$ {Number(c.valor).toFixed(2)}
                    </span>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${c.status === 'pago' ? 'bg-green-100 text-green-800' : c.status === 'pendente' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}