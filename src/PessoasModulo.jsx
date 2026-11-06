import { useState, useMemo, useEffect } from 'react';
import { Card, CardHeader, Avatar, SelectFiltro, ColumnChart, DoughnutCard, PageHeader, ModalLinkCopiado } from './ui';
import { supabase } from './supabaseClient';
import DetalhesMembro from './DetalhesMembro';
import FormularioCadastro from './FormularioCadastro';
import { meses, agrupamentoPor, valorCampoRelatorio, faixasEtarias } from './churchUtils';
import PainelAtuacoes from './PainelAtuacoes';
import { verificarDuplicidadeLocal, interpretarErroDuplicidadeBanco } from './duplicateUtils';

export default function PessoasModulo(props) {
  const {
    submenu, pessoas, pessoasFiltradas, filtros, alterarFiltro, limparFiltros,
    zonas, carregando, membroSelecionadoId, setMembroSelecionadoId, obterDados,
    cargosDisponiveis, atuacoesDisponiveis, escolaridadesDisponiveis, abrirPessoasFiltradas, membroLogado,
    onNavigate,
    filtrosMobileAberto, setFiltrosMobileAberto,
    hasAccess
  } = props;

  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth());
  const [relatorioSelecionado, setRelatorioSelecionado] = useState('Cargos');
  const [abaPessoas, setAbaPessoas] = useState('membros'); // 'membros' | 'contribuintes'

  // Remove os cadastros rápidos (contribuinte) e os que aguardam aprovação (pendente) da listagem principal
  const pessoasFiltradasMembros = useMemo(
    () => pessoasFiltradas.filter((p) => p.status !== 'contribuinte' && p.status !== 'pendente'),
    [pessoasFiltradas]
  );

  const temFiltroVinculo = !!(
    filtros.cargo || filtros.zona || filtros.atuacao || filtros.relatorioCampo ||
    filtros.genero || filtros.faixaEtaria || filtros.batizado || 
    filtros.mesAniversario || filtros.mesConversao || filtros.anoConversao || filtros.novoConvertido ||
    filtros.celula || filtros.celulaNome || filtros.celulaFaixaEtaria || filtros.temCelula || filtros.estadoCivil
  );

  useEffect(() => {
    if (temFiltroVinculo) {
      setAbaPessoas('membros');
    }
  }, [temFiltroVinculo]);

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
        hasAccess={hasAccess}
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
          onSelecionarPessoa={setMembroSelecionadoId}
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
    return (
      <PainelAtuacoes 
        pessoas={pessoas} 
        atuacoesDisponiveis={atuacoesDisponiveis} 
        obterDados={obterDados} 
        abrirPessoasFiltradas={abrirPessoasFiltradas} 
        onNavigate={onNavigate} 
      />
    );
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

      {/* Banner Dinâmico de Filtros Ativos (originados de Gráficos do Dashboard ou Filtros manuais) */}
      {temFiltroVinculo && (
        <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 to-indigo-50/90 dark:from-[#131d31] dark:to-[#17223b] border border-blue-200/60 dark:border-[#24334f] shadow-xs flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Filtro ativo ({pessoasFiltradas.length} {pessoasFiltradas.length === 1 ? 'membro' : 'membros'}):
            </span>

            {filtros.relatorioCampo && filtros.relatorioValor && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                {filtros.relatorioCampo}: {filtros.relatorioValor}
                <button
                  type="button"
                  onClick={() => {
                    alterarFiltro('relatorioCampo', '');
                    alterarFiltro('relatorioValor', '');
                  }}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}

            {filtros.mesAniversario && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                Aniversário em: {filtros.mesAniversario}
                <button
                  type="button"
                  onClick={() => alterarFiltro('mesAniversario', '')}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}

            {filtros.mesConversao && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                Conversão em: {filtros.mesConversao}
                <button
                  type="button"
                  onClick={() => alterarFiltro('mesConversao', '')}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}

            {filtros.anoConversao && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                Ano de conversão: {filtros.anoConversao}
                <button
                  type="button"
                  onClick={() => alterarFiltro('anoConversao', '')}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}

            {filtros.novoConvertido && !filtros.mesConversao && !filtros.anoConversao && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                Novos Convertidos
                <button
                  type="button"
                  onClick={() => alterarFiltro('novoConvertido', false)}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}

            {filtros.zona && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                Zona: {zonas.find(z => String(z.id) === String(filtros.zona))?.nome || filtros.zona}
                <button
                  type="button"
                  onClick={() => alterarFiltro('zona', '')}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}

            {filtros.faixaEtaria && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                Faixa: {faixasEtarias.find(f => f.id === filtros.faixaEtaria)?.nome || filtros.faixaEtaria}
                <button
                  type="button"
                  onClick={() => alterarFiltro('faixaEtaria', '')}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}

            {filtros.genero && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                Gênero: {filtros.genero}
                <button
                  type="button"
                  onClick={() => alterarFiltro('genero', '')}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}

            {filtros.batizado && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                {filtros.batizado === 'sim' || filtros.batizado === 'batizado' ? 'Batizados nas Águas' : 'Não Batizados'}
                <button
                  type="button"
                  onClick={() => alterarFiltro('batizado', '')}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}

            {filtros.cargo && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                Cargo: {filtros.cargo}
                <button
                  type="button"
                  onClick={() => alterarFiltro('cargo', '')}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}

            {filtros.atuacao && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                Atuação: {filtros.atuacao}
                <button
                  type="button"
                  onClick={() => alterarFiltro('atuacao', '')}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}

            {(filtros.celula || filtros.celulaNome) && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                Célula: {filtros.celulaNome || filtros.celula}
                <button
                  type="button"
                  onClick={() => {
                    alterarFiltro('celula', '');
                    alterarFiltro('celulaNome', '');
                  }}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}

            {filtros.celulaFaixaEtaria && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                Célula (Faixa): {filtros.celulaFaixaEtaria}
                <button
                  type="button"
                  onClick={() => alterarFiltro('celulaFaixaEtaria', '')}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}

            {filtros.temCelula && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                {filtros.temCelula === 'sim' ? 'Em Célula' : 'Sem Célula'}
                <button
                  type="button"
                  onClick={() => alterarFiltro('temCelula', '')}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}

            {filtros.estadoCivil && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white dark:bg-[#0b1329] border border-blue-200 dark:border-[#2b3954] text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-xl shadow-2xs">
                Estado Civil: {filtros.estadoCivil}
                <button
                  type="button"
                  onClick={() => alterarFiltro('estadoCivil', '')}
                  className="hover:text-red-500 ml-1 font-black cursor-pointer"
                  title="Remover filtro"
                >
                  ✕
                </button>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={limparFiltros}
              className="text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 bg-red-50 dark:bg-red-950/40 border border-red-200/60 dark:border-red-900/40 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              Limpar Filtros
            </button>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="text-xs font-bold text-slate-600 dark:text-slate-200 hover:text-slate-800 dark:hover:text-white bg-[#ffffff] dark:bg-[#131d31] hover:bg-slate-50 dark:hover:bg-[#1c2b4a] border border-slate-200 dark:border-[#24334f] px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              ← Painel Geral
            </button>
          </div>
        </div>
      )}

      {/* Navegação por abas: Membros / Contribuintes (dizimistas não-membros) */}
      {!temFiltroVinculo && (
        <div className="inline-flex p-1 bg-slate-100/90 dark:bg-[#131d31] rounded-2xl border border-slate-200/50 dark:border-[#24334f] mb-6 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setAbaPessoas('membros')}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all duration-200 cursor-pointer ${
              abaPessoas === 'membros'
                ? 'bg-[#ffffff] dark:bg-gradient-to-r dark:from-blue-600 dark:via-indigo-600 dark:to-blue-700 text-[#055F6D] dark:text-white shadow-sm dark:shadow-blue-600/25'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/40 dark:hover:bg-[#1c2b4a]'
            }`}
          >
            Membros
          </button>
          <button
            type="button"
            onClick={() => setAbaPessoas('contribuintes')}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all duration-200 cursor-pointer ${
              abaPessoas === 'contribuintes'
                ? 'bg-[#ffffff] dark:bg-gradient-to-r dark:from-blue-600 dark:via-indigo-600 dark:to-blue-700 text-[#055F6D] dark:text-white shadow-sm dark:shadow-blue-600/25'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/40 dark:hover:bg-[#1c2b4a]'
            }`}
          >
            Contribuintes
          </button>
        </div>
      )}

      {abaPessoas === 'contribuintes' ? (
        <AbaContribuintes pessoas={pessoas} obterDados={obterDados} />
      ) : (
        <>
          {!hasAccess('Pessoas', 'Ver todos') ? (
            <div className="p-8 text-center bg-white dark:bg-[#17223b] rounded-3xl border border-slate-200 dark:border-[#2b3954] shadow-sm">
              <span className="text-3xl block mb-3">🔒</span>
              <h3 className="text-slate-700 dark:text-slate-100 font-bold">Acesso Restrito</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sua conta não possui permissão para visualizar o diretório completo de membros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
              <Card className="p-0 bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954]">
                <TabelaPessoas pessoas={pessoasFiltradasMembros} onSelecionar={setMembroSelecionadoId} />
              </Card>

        {/* Drawer de Filtros para Mobile / Sidebar para Desktop */}
        <div className={`${filtrosMobileAberto ? 'fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-0 sm:p-4 bg-slate-950/60 dark:bg-slate-950/75 backdrop-blur-sm' : 'hidden xl:block'} transition-all`}>
          <div className={`${filtrosMobileAberto ? 'bg-white dark:bg-[#17223b] border border-transparent dark:border-[#2b3954] rounded-t-[32px] sm:rounded-3xl w-full max-w-md animate-in slide-in-from-bottom duration-300' : ''} overflow-hidden`}>
            {filtrosMobileAberto && (
              <div className="p-5 border-b border-slate-100 dark:border-[#2b3954] flex items-center justify-between bg-slate-50/50 dark:bg-[#1c2b4a]">
                <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Filtrar Membros</h4>
                <button onClick={() => setFiltrosMobileAberto(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#ffffff] dark:bg-[#131d31] border border-slate-200 dark:border-[#2b3954] text-slate-400 dark:text-slate-300 hover:text-slate-600 dark:hover:text-white cursor-pointer">✕</button>
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
      )}
    </>
  );
}

function TabelaPessoas({ pessoas, onSelecionar }) {
  if (!pessoas || pessoas.length === 0) {
    return <div className="p-10 text-center text-sm text-slate-400 dark:text-slate-400">Nenhuma pessoa corresponde aos filtros ativos.</div>;
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
                    <p className="font-semibold text-slate-700 dark:text-slate-100">{p.nome}</p>
                    <p className="text-[11px] text-[var(--text-muted)] dark:text-slate-400">{p.email || 'Sem e-mail'}</p>
                  </div>
                </div>
              </td>
              <td className="hidden md:table-cell">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-[var(--surface-muted)] dark:bg-[#131d31] border border-slate-200 dark:border-[#24334f] text-slate-700 dark:text-slate-200 font-medium">
                  {p.cargo || 'Membro'}
                </span>
              </td>
              <td className="hidden md:table-cell text-xs text-[var(--text-muted)] dark:text-slate-300">{p.telefone || '—'}</td>
              <td className="hidden md:table-cell"><span className="text-xs font-semibold text-[#2563eb] dark:text-blue-400">{p.celulas?.nome || '😢 Sem Célula'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LinkPublicoCadastro({ onNavigate }) {
  const urlPublica = typeof window !== 'undefined' ? `${window.location.origin}/cadastro-publico` : '';
  const [modalAberto, setModalAberto] = useState(false);
  
  const copiarLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(urlPublica);
      }
    } catch (err) {
      console.warn('Erro ao copiar link:', err);
    }
    setModalAberto(true);
  };

  const abrirWhatsApp = () => {
    const textoMensagem = encodeURIComponent(
      `Olá! Seja muito bem-vindo(a) à MIB Church!\n\n` +
      `Para realizar o seu cadastro em nossa comunidade e acompanhar nossos ministérios e atividades, acesse o link de autocadastro abaixo:\n\n` +
      `${urlPublica}\n\n` +
      `Ficamos muito felizes em ter você conosco! Deus abençoe!`
    );
    window.open(`https://api.whatsapp.com/send?text=${textoMensagem}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        titulo="Link de Autocadastro" 
        breadcrumb={['Pessoas', 'Link Público']} 
        onNavigate={() => onNavigate('todos')}
        subtitulo="Compartilhe este link para que novos membros preencham seus próprios dados."
      />
      
      <Card className="p-6 sm:p-8 text-center max-w-2xl mx-auto bg-gradient-to-br from-white to-blue-50/25 dark:from-[#131d31] dark:to-[#17223b] border-slate-200/80 dark:border-[#2b3954] shadow-md">
        <div className="w-18 h-18 bg-blue-100/90 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-sm ring-4 ring-blue-50 dark:ring-blue-500/10">
          🔗
        </div>
        
        <h3 className="text-xl font-black text-slate-850 dark:text-white mb-2 tracking-tight">Pronto para compartilhar!</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
          Copie o link abaixo e envie pelo WhatsApp para novos convertidos ou visitantes. 
          O formulário exibe automaticamente a logo e dados configurados em sua igreja.
        </p>
        
        <div className="flex flex-col sm:flex-row items-stretch gap-3 bg-white dark:bg-[#0b1329] p-3.5 rounded-2xl border border-slate-200 dark:border-[#24334f] shadow-xs mb-4">
          <code className="text-[11px] font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50/60 dark:bg-[#131d31] border border-transparent dark:border-[#24334f] px-4 py-3 rounded-xl flex-1 flex items-center break-all text-left select-all">
            {urlPublica}
          </code>
          <button 
            type="button"
            onClick={copiarLink}
            className="px-6 py-3 bg-[#1e3a8a] hover:bg-[#1e40af] dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-md shadow-blue-900/20 whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5"
          >
            📋 Copiar Link
          </button>
        </div>

        {/* Botões Rápidos de Ação */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-md mx-auto mb-8">
          <button
            type="button"
            onClick={abrirWhatsApp}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200/70 dark:border-emerald-800/50 transition-all cursor-pointer active:scale-95"
          >
            💬 Enviar pelo WhatsApp
          </button>
          <button
            type="button"
            onClick={() => window.open(urlPublica, '_blank', 'noopener,noreferrer')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1c2b4a] hover:bg-slate-200/80 dark:hover:bg-[#263860] text-slate-700 dark:text-slate-200 border border-transparent dark:border-[#2b3954] text-xs font-bold transition-all cursor-pointer active:scale-95"
          >
            ↗️ Visualizar Formulário
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-[#2b3954] grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
          <div className="flex gap-3.5">
            <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-transparent dark:border-emerald-800/40 rounded-xl flex items-center justify-center shrink-0">🛡️</div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">Segurança Total</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">O link permite apenas a criação de novos cadastros. Ninguém poderá ver dados de outros membros por aqui.</p>
            </div>
          </div>
          <div className="flex gap-3.5">
            <div className="w-10 h-10 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-transparent dark:border-amber-800/40 rounded-xl flex items-center justify-center shrink-0">✨</div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">Identidade Visual</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">A logo e os contatos que aparecem no topo são os que você definiu na tela de "Configurações".</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Modal Elegante de Confirmação e Compartilhamento */}
      <ModalLinkCopiado
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        url={urlPublica}
      />
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
      <Card className="p-0 bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954]">
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
                          <span className="font-bold text-slate-700 dark:text-slate-100 block">{p.nome}</span>
                          <span className="md:hidden text-[10px] text-slate-400 font-medium uppercase tracking-tight">{p.motivo_exclusao || 'Não informado'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell text-sm text-slate-500 dark:text-slate-300">{p.motivo_exclusao || 'Não informado'}</td>
                    <td className="hidden md:table-cell text-xs text-slate-400">{new Date(p.updated_at).toLocaleDateString('pt-BR')}</td>
                    <td className="text-right pr-6">
                      <button 
                        onClick={() => handleReativar(p.id, p.nome)}
                        className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-transparent dark:border-emerald-800/50 hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white transition shadow-sm cursor-pointer"
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
    <Card className="p-5 space-y-4 h-fit bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954]">
      <div className="flex items-center justify-between border-b border-[var(--border)] dark:border-[#2b3954] pb-3">
        <h3 className="font-semibold text-sm text-[var(--text-heading)] dark:text-white uppercase tracking-wider">Filtros</h3>
        <button type="button" onClick={limparFiltros} className="text-xs font-bold text-[#2563eb] dark:text-blue-400 hover:underline cursor-pointer">Limpar</button>
      </div>
      <SelectFiltro label="Gênero" valor={filtros.genero} onChange={(v) => alterarFiltro('genero', v)} opcoes={['Masculino', 'Feminino']} />
      <SelectFiltro label="Faixa etária" valor={filtros.faixaEtaria} onChange={(v) => alterarFiltro('faixaEtaria', v)} opcoes={faixasEtarias.map((f) => ({ valor: f.id, label: f.nome }))} />
      <SelectFiltro label="Zona" valor={filtros.zona} onChange={(v) => alterarFiltro('zona', v)} opcoes={zonas.map((z) => ({ valor: z.id, label: z.nome }))} />
      <SelectFiltro 
        label="Batismo" 
        valor={filtros.batizado} 
        onChange={(v) => alterarFiltro('batizado', v)} 
        opcoes={[
          { valor: 'sim', label: 'Batizado nas Águas' },
          { valor: 'nao', label: 'Não Batizado' }
        ]} 
      />
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
          <button
            key={mes}
            onClick={() => setMesSelecionado(index)}
            className={`rounded-2xl border p-4 text-left transition cursor-pointer ${
              mesSelecionado === index
                ? 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-400/50 text-white shadow-md shadow-blue-600/25'
                : 'bg-[#ffffff] dark:bg-[#17223b] border-slate-200/80 dark:border-[#2b3954] text-slate-700 dark:text-slate-200 hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-blue-50/30 dark:hover:bg-[#1c2b4a]'
            }`}
          >
            <span className="block text-xs font-semibold uppercase opacity-70">{mes}</span>
            <span className="block mt-2 text-2xl font-bold text-center">{contagemMeses[index]}</span>
          </button>
        ))}
      </div>
      <Card className="p-0 bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954]">
        {aniversariantes.length === 0 ? <p className="p-10 text-center text-sm text-slate-400">Ninguém faz aniversário em {meses[mesSelecionado]}.</p> : (
          <div className="divide-y divide-slate-100 dark:divide-[#2b3954]">
            {aniversariantes.map((p) => (
              <div key={p.id} className="p-4 flex items-center gap-3 hover:bg-slate-50/60 dark:hover:bg-[#1c2b4a]/60 transition-colors">
                <Avatar pessoa={p} />
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{p.nome}</p>
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
  const getIconForField = (fieldName, itemName) => {
    const item = String(itemName || '').toLowerCase();
    
    if (fieldName === 'cargo') {
      if (item.includes('pastor') || item.includes('bispo') || item.includes('apostolo') || item.includes('apóstolo')) {
        return {
          icon: (
            <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          ),
          colorClass: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/15 border border-transparent dark:border-blue-500/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/25"
        };
      }
      if (item.includes('líder') || item.includes('lider')) {
        return {
          icon: (
            <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          ),
          colorClass: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 border border-transparent dark:border-emerald-500/30 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/25"
        };
      }
      if (item.includes('secret') || item.includes('admin') || item.includes('diret')) {
        return {
          icon: (
            <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
            </svg>
          ),
          colorClass: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/15 border border-transparent dark:border-amber-500/30 group-hover:bg-amber-100 dark:group-hover:bg-amber-500/25"
        };
      }
      if (item.includes('membro') || item.includes('ovelha') || item.includes('fiel')) {
        return {
          icon: (
            <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          ),
          colorClass: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/15 border border-transparent dark:border-teal-500/30 group-hover:bg-teal-100 dark:group-hover:bg-teal-500/25"
        };
      }
      return {
        icon: (
          <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>
          </svg>
        ),
        colorClass: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/15 border border-transparent dark:border-indigo-500/30 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/25"
      };
    }
    
    if (fieldName === 'zona_id') {
      return {
        icon: (
          <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
        ),
        colorClass: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/15 border border-transparent dark:border-rose-500/30 group-hover:bg-rose-100 dark:group-hover:bg-rose-500/25"
      };
    }
    
    return {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      colorClass: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/15 border border-transparent dark:border-violet-500/30 group-hover:bg-violet-100 dark:group-hover:bg-violet-500/25"
    };
  };

  return (
    <div className="space-y-4">
      <PageHeader titulo={titulo} breadcrumb={breadcrumb} onNavigate={() => onNavigate('todos')} />
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {itens.map((item) => {
          const nomeItem = item.nome || item;
          const val = campo.endsWith('_id') ? (item.id || item) : nomeItem;
          const contagem = pessoas.filter(p => {
            if (p.status === 'inativo' || p.status === 'contribuinte') return false;
            if (campo === 'atuacao') {
              const roles = p.atuacao ? p.atuacao.split(',').map(s => s.trim().toLowerCase()) : [];
              return roles.includes(String(val).toLowerCase());
            }
            if (campo === 'cargo') {
              const roles = p.cargo ? p.cargo.split(',').map(s => s.trim().toLowerCase()) : [];
              return roles.includes(String(val).toLowerCase()) || String(p.cargo || '').toLowerCase() === String(val).toLowerCase();
            }
            return String(p[campo] || '') === String(val);
          }).length;
          const iconInfo = getIconForField(campo, nomeItem);
          
          return (
            <button
              key={val}
              type="button"
              onClick={() => abrirPessoasFiltradas({ [campo === 'zona_id' ? 'zona' : campo]: val })}
              className="flex flex-col items-center justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-[#2b3954] bg-[#ffffff] dark:bg-[#17223b] hover:bg-slate-50/50 dark:hover:bg-[#1c2b4a] hover:border-slate-300 dark:hover:border-blue-500/50 hover:shadow-lg hover:scale-[1.03] active:scale-97 transition-all duration-300 text-center w-full aspect-square group cursor-pointer relative"
            >
              {/* Icon Container */}
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 transition-colors ${iconInfo.colorClass}`}>
                {iconInfo.icon}
              </div>

              {/* Title and Highlighed Count */}
              <div className="flex-1 flex flex-col justify-center my-3 w-full">
                <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 truncate">{nomeItem}</h4>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-white group-hover:text-[#055F6D] dark:group-hover:text-blue-400 transition-colors">{contagem}</span>
                  <span className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">{contagem === 1 ? 'membro' : 'membros'}</span>
                </div>
              </div>

              {/* Hover link action indicator */}
              <span className="text-[9px] sm:text-[10px] font-bold text-[#055F6D] dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider">
                Ver membros →
              </span>
            </button>
          );
        })}
      </div>
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
        <Card className="p-0 h-fit !rounded-t-none bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954]">
          <CardHeader titulo="Opções de Relatório" />
          {/* Select para mobile */}
          <div className="p-4 md:hidden">
            <select
              value={relatorioSelecionado}
              onChange={(e) => setRelatorioSelecionado(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-[#334155] rounded-xl text-sm bg-white dark:bg-[#0b1329] text-slate-800 dark:text-slate-100 outline-none"
            >
              {botoes.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          {/* Botões para desktop */}
          <div className="p-4 space-y-2 hidden md:block">
            {botoes.map((b) => (
              <button
                key={b}
                onClick={() => setRelatorioSelecionado(b)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  relatorioSelecionado === b
                    ? 'bg-[#2563eb] text-white shadow-md shadow-blue-600/25'
                    : 'bg-slate-50 dark:bg-[#131d31] text-slate-600 dark:text-slate-300 border border-transparent dark:border-[#24334f] hover:bg-slate-100 dark:hover:bg-[#1c2b4a] dark:hover:text-white'
                }`}
              >
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
              className="!rounded-t-none"
              onSliceClick={(slice) => {
                if (!slice || !slice.nome) return;
                abrirPessoasFiltradas({ relatorioCampo: relatorioSelecionado, relatorioValor: slice.nome });
              }}
            />
          ) : (
            <ColumnChart 
              titulo={`Indicadores: ${relatorioSelecionado}`} 
              dados={dados} 
              hideLegend={true} 
              className="!rounded-t-none" 
              onBarClick={(entry) => {
                if (!entry || !entry.name) return;
                abrirPessoasFiltradas({ relatorioCampo: relatorioSelecionado, relatorioValor: entry.name });
              }}
            />
          )}
          <Card className="p-0 !rounded-t-none bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954]">
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
                    <td className="font-medium pl-6 text-slate-800 dark:text-slate-100">{label}</td>
                    <td className="text-center text-slate-700 dark:text-slate-200">{valor}</td>
                    <td className="text-center text-slate-400 font-bold">
                      {((valor / (pessoasAtivas.length || 1)) * 100).toFixed(0)}%
                    </td>
                    <td className="text-right pr-6">
                      <button
                        type="button"
                        onClick={() => abrirPessoasFiltradas({ relatorioCampo: relatorioSelecionado, relatorioValor: label })}
                        className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/15 text-[#2563eb] dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all cursor-pointer inline-flex items-center justify-center"
                        title="Ver lista de pessoas"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="8" y1="6" x2="21" y2="6" />
                          <line x1="8" y1="12" x2="21" y2="12" />
                          <line x1="8" y1="18" x2="21" y2="18" />
                          <line x1="3" y1="6" x2="3.01" y2="6" />
                          <line x1="3" y1="12" x2="3.01" y2="12" />
                          <line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                      </button>
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
      if (!editandoId) {
        const duplicado = verificarDuplicidadeLocal({ nome, telefone }, pessoas);
        if (duplicado && window.modalDuplicidade) {
          await window.modalDuplicidade({
            titulo: 'Contribuinte Já Cadastrado',
            subtitulo: 'Identificamos que já existe um registro correspondente no sistema.',
            mensagem: duplicado.motivo,
            campo: duplicado.campo,
            valorConflito: duplicado.valorConflito,
            pessoaExistente: duplicado.pessoaExistente,
          });
          setEnviando(false);
          return;
        }
      }

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
      const erroDup = interpretarErroDuplicidadeBanco(err, { nome, telefone }, pessoas);
      if (erroDup && window.modalDuplicidade) {
        await window.modalDuplicidade(erroDup);
      } else {
        alert('Erro ao salvar contribuinte: ' + err.message);
      }
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
      <Card className={`p-5 h-fit bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954] ${formAbertoMobile ? 'block animate-in slide-in-from-top fade-in duration-300' : 'hidden'} xl:block xl:animate-none`}>
        <h3 className="font-semibold text-sm text-[var(--text-heading)] dark:text-slate-100 uppercase tracking-wider mb-4 border-b border-[var(--border)] dark:border-[#2b3954] pb-3">
          {editandoId ? 'Editar Contribuinte' : 'Novo Contribuinte'}
        </h3>
        <form onSubmit={handleSalvar} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-300 mb-1.5">Nome</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome completo"
              className="w-full px-3 py-2 border border-slate-200 dark:border-[#334155] rounded-xl text-sm bg-white dark:bg-[#0b1329] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#008dc6]/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-300 mb-1.5">Telefone</label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(formatarTelefoneInput(e.target.value))}
              placeholder="(00) 00000-0000"
              className="w-full px-3 py-2 border border-slate-200 dark:border-[#334155] rounded-xl text-sm bg-white dark:bg-[#0b1329] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#008dc6]/20"
            />
          </div>
          <div className="flex items-center gap-2 pt-1">
            {editandoId ? (
              <button
                type="button"
                onClick={handleCancelar}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              >
                Cancelar
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setFormAbertoMobile(false)}
                className="xl:hidden px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
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
      <Card className="p-0 bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954]">
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
                      <p className="font-semibold text-slate-700 dark:text-slate-100">{p.nome}</p>
                      <p className="md:hidden text-[11px] text-[var(--text-muted)] mt-0.5">{p.telefone || 'Sem telefone'}</p>
                    </td>
                    <td className="hidden md:table-cell text-xs text-[var(--text-muted)]">{p.telefone || '—'}</td>
                    <td className="text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setContribuicoesAbertas(p)}
                          title="Ver Contribuições"
                          className="text-[#2563eb] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/15 transition p-1.5 rounded-lg cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEditar(p)}
                          title="Editar Contribuinte"
                          className="text-[#202046] dark:text-slate-300 hover:text-[#2F2F80] dark:hover:text-white transition p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1c2b4a] cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleExcluir(p)}
                          title="Excluir Contribuinte"
                          className="text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 cursor-pointer"
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
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 dark:bg-slate-950/75 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white dark:bg-[#17223b] rounded-none sm:rounded-3xl border-none sm:border sm:border-slate-200 dark:sm:border-[#2b3954] shadow-2xl w-full max-w-2xl h-full sm:h-auto sm:max-h-[85vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-[#2b3954] flex items-center justify-between bg-emerald-50/30 dark:bg-[#1c2b4a]">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base uppercase tracking-tight">Contribuições de {pessoa.nome}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {contribuicoes.length} lançamento(s) • Total: R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <button type="button" onClick={onFechar} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-2 text-xl">✕</button>
        </div>
        <div className="overflow-y-auto flex-1">
          {carregando ? (
            <div className="p-10 text-center text-sm text-slate-400">Carregando contribuições...</div>
          ) : contribuicoes.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-400">Nenhuma contribuição registrada para este contribuinte.</div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-[#2b3954]">
              {contribuicoes.map((c) => (
                <div key={c.id} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-[#1c2b4a]/50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{c.descricao}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {c.data ? new Date(c.data + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}
                      {' • '}{c.categorias_financeiras?.nome || 'Sem categoria'}
                      {' • '}{c.contas_financeiras?.nome || 'Sem conta'}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`block text-sm font-black ${c.tipo === 'despesa' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {c.tipo === 'despesa' ? '- ' : ''}R$ {Number(c.valor).toFixed(2)}
                    </span>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      c.status === 'pago'
                        ? 'bg-green-100 text-green-800 dark:bg-emerald-500/20 dark:text-emerald-300'
                        : c.status === 'pendente'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300'
                        : 'bg-red-100 text-red-800 dark:bg-rose-500/20 dark:text-rose-300'
                    }`}>
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