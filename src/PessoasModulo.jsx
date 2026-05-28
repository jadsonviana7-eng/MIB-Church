import { useState, useMemo } from 'react';
import { Card, CardHeader, Avatar, SelectFiltro, ColumnChart, PageHeader } from './ui';
import DetalhesMembro from './DetalhesMembro';
import FormularioCadastro from './FormularioCadastro';
import { meses, agrupamentoPor, valorCampoRelatorio, faixasEtarias } from './churchUtils';

export default function PessoasModulo(props) {
  const {
    submenu, pessoas, pessoasFiltradas, filtros, alterarFiltro, limparFiltros,
    zonas, carregando, membroSelecionadoId, setMembroSelecionadoId, obterDados,
    cargosDisponiveis, atuacoesDisponiveis, escolaridadesDisponiveis, abrirPessoasFiltradas
    , onNavigate
  } = props;

  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth());
  const [relatorioSelecionado, setRelatorioSelecionado] = useState('Cargos');

  if (membroSelecionadoId) {
    return (
      <DetalhesMembro
        pessoaId={membroSelecionadoId}
        onFechar={() => setMembroSelecionadoId(null)}
        listaPessoas={pessoas}
        onDadosAtualizados={obterDados}
        cargosLista={cargosDisponiveis}
        atuacoesLista={atuacoesDisponiveis}
      />
    );
  }

  if (submenu === 'adicionar') {
    return (
      <div className="space-y-6">
        <PageHeader titulo="Novo Cadastro" breadcrumb={['Pessoas', 'Novo Cadastro']} onNavigate={() => onNavigate('todos')} />
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

  return (
    <>
      <PageHeader titulo="Membros" subtitulo="Gestão centralizada de membros, obreiros e frequentadores." />
      {carregando && <div className="text-sm font-medium text-[#2563eb] mb-4">Sincronizando dados...</div>}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
        <Card className="p-0">
          <CardHeader 
            titulo={`${pessoasFiltradas.length} pessoas encontradas`} 
            children={
              <input 
                type="search" 
                value={filtros.busca} 
                onChange={(e) => alterarFiltro('busca', e.target.value)} 
                placeholder="Buscar por nome..." 
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
              />
            }
          />
          <TabelaPessoas pessoas={pessoasFiltradas} onSelecionar={setMembroSelecionadoId} />
        </Card>
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
        <thead>
          <tr><th>Nome</th><th>Cargo / Função</th><th>Contato</th><th>Célula</th></tr>
        </thead>
        <tbody>
          {pessoas.map((p) => (
            <tr key={p.id} onClick={() => onSelecionar(p.id)} className="cursor-pointer">
              <td>
                <div className="flex items-center gap-3">
                  <Avatar pessoa={p} tamanho="w-9 h-9" />
                  <div>
                    <p className="font-semibold text-slate-700">{p.nome}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">{p.email || 'Sem e-mail'}</p>
                  </div>
                </div>
              </td>
              <td><span className="text-xs px-2 py-0.5 rounded-lg bg-[var(--surface-muted)] border">{p.cargo || 'Membro'}</span></td>
              <td className="text-xs text-[var(--text-muted)]">{p.telefone || '—'}</td>
              <td><span className="text-xs font-semibold text-[#2563eb]">{p.celulas?.nome || '⛺ Sem Célula'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
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
  const contagemMeses = meses.map((_, index) =>
    pessoas.filter((p) => p.data_nascimento && new Date(`${p.data_nascimento}T00:00:00`).getMonth() === index).length
  );
  const aniversariantes = useMemo(() => {
    return pessoas.filter((p) => p.data_nascimento && new Date(`${p.data_nascimento}T00:00:00`).getMonth() === mesSelecionado)
      .sort((a, b) => new Date(`${a.data_nascimento}T00:00:00`).getDate() - new Date(`${b.data_nascimento}T00:00:00`).getDate());
  }, [pessoas, mesSelecionado]);

  return (
    <div className="space-y-6">
      <PageHeader titulo="Aniversariantes" breadcrumb={['Pessoas', 'Aniversariantes']} onNavigate={() => onNavigate('todos')} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {meses.map((mes, index) => (
          <button key={mes} onClick={() => setMesSelecionado(index)} className={`rounded-2xl border p-4 text-left transition ${mesSelecionado === index ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'}`}>
            <span className="block text-xs font-semibold uppercase opacity-70">{mes}</span>
            <span className="block mt-2 text-2xl font-bold">{contagemMeses[index]}</span>
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
              // Cargos e Atuações no banco guardam o NOME, enquanto Zonas guardam o ID.
              const isIdField = campo.endsWith('_id');
              const val = isIdField ? (item.id || item) : (item.nome || item);
              
              const contagem = pessoas.filter((p) => String(p[campo] || '') === String(val)).length;
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
  const botoes = ['Cargos', 'Faixa etaria', 'Aniversarios', 'Sexo', 'Estado civil', 'Batismo', 'Zona de moradia'];
  const dados = agrupamentoPor(pessoas, (p) => valorCampoRelatorio(p, relatorioSelecionado, zonas));
  return (
    <div className="space-y-6">
      <PageHeader titulo="Relatórios de Membresia" breadcrumb={breadcrumb} onNavigate={() => onNavigate('todos')} />
      <div className="flex flex-wrap gap-2">
        {botoes.map((b) => (
          <button key={b} onClick={() => setRelatorioSelecionado(b)} className={`px-4 py-2 rounded-xl text-xs font-bold transition ${relatorioSelecionado === b ? 'bg-[#2563eb] text-white' : 'bg-white border shadow-sm'}`}>{b}</button>
        ))}
      </div>
      <ColumnChart titulo={`Indicadores: ${relatorioSelecionado}`} dados={dados} />
      <Card className="p-0">
        <table className="table-mib">
          <thead><tr><th>Classificação</th><th>Cadastrados</th><th className="text-right">Ação</th></tr></thead>
          <tbody>
            {Object.entries(dados).map(([label, valor]) => (
              <tr key={label}>
                <td className="font-medium">{label}</td>
                <td>{valor} pessoas</td>
                <td className="text-right">
                  <button onClick={() => abrirPessoasFiltradas({ relatorioCampo: relatorioSelecionado, relatorioValor: label })} className="text-xs font-bold text-[#2563eb]">Ver lista</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}