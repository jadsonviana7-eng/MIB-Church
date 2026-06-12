import { useMemo } from 'react';
import { Avatar, DoughnutCard, CombinationCard, ColumnChart, Recentes, PageHeader, StatCard } from './ui';
import { meses, faixasEtarias, faixaDaIdade, agrupamentoPor, nomeZona } from './churchUtils';

export default function OverviewDashboard({ pessoas, celulas, zonas, relatoriosCelula, indicadores, carregando, periodoConvertidos, setPeriodoConvertidos }) {
  const pessoasAtivas = useMemo(() => pessoas.filter(p => p.status !== 'inativo'), [pessoas]);

  const zonasDados = useMemo(() => agrupamentoPor(pessoasAtivas, (p) => nomeZona(zonas, p.zona_id)), [pessoasAtivas, zonas]);
  const faixasDados = useMemo(() => agrupamentoPor(pessoasAtivas, (p) => faixasEtarias.find((f) => f.id === faixaDaIdade(p.data_nascimento))?.curto || 'Não informada'), [pessoasAtivas]);
  const faixasCelulas = useMemo(() => agrupamentoPor(celulas, (c) => c.faixa_etaria || 'Não informada'), [celulas]);
  
  const aniversariantesMes = useMemo(() => pessoasAtivas.filter((p) => {
    if (!p.data_nascimento) return false;
    return new Date(`${p.data_nascimento}T00:00:00`).getMonth() === new Date().getMonth();
  }), [pessoasAtivas]);
  
  const novosConvertidos = useMemo(() => {
    const dados = agrupamentoPor(pessoas.filter(p => p.data_conversao), (p) => {
      const data = new Date(`${p.data_conversao}T00:00:00`);
      return periodoConvertidos === 'mes' ? meses[data.getMonth()] : String(data.getFullYear());
    });
    // Garante ordenação cronológica se for por mês
    if (periodoConvertidos === 'mes') {
      return Object.fromEntries(meses.filter(m => dados[m]).map(m => [m, dados[m]]));
    }
    return dados;
  }, [pessoas, periodoConvertidos]);

  const aniversariosDados = useMemo(() => {
    const dados = agrupamentoPor(pessoas.filter(p => p.data_nascimento), (p) => {
      const data = new Date(`${p.data_nascimento}T00:00:00`);
      return meses[data.getMonth()];
    });
    // Garante ordenação cronológica Jan -> Dez
    return Object.fromEntries(meses.filter(m => dados[m]).map(m => [m, dados[m]]));
  }, [pessoas]);

  return (
    <div className="space-y-6">
      <div className="hidden md:block">
        <PageHeader titulo="Visão Geral" />
      </div>
      {carregando && <div className="text-sm font-medium text-[#055F6D]">Sincronizando dados...</div>}
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total de Pessoas" 
          valor={indicadores.totalPessoas} 
          detalhe="Cadastradas" 
          icone={<img src="https://raw.githubusercontent.com/jadsonviana7-eng/Icones/refs/heads/main/People.svg" alt="Membros" className="w-10 h-10" />}
        />
        <StatCard 
          label="Homens" 
          valor={indicadores.homens} 
          detalhe={`${indicadores.percentualHomens}%`} 
          icone={<img src="https://raw.githubusercontent.com/jadsonviana7-eng/Icones/refs/heads/main/boy.svg" alt="Homens" className="w-10 h-10" />}
        />
        <StatCard 
          label="Mulheres" 
          valor={indicadores.mulheres} 
          detalhe={`${indicadores.percentualMulheres}%`} 
          icone={<img src="https://raw.githubusercontent.com/jadsonviana7-eng/Icones/refs/heads/main/Girl.svg" alt="Mulheres" className="w-10 h-10" />}
        />
        <StatCard 
          label="Células" 
          valor={indicadores.totalCelulas} 
          detalhe="Ativas" 
          icone={<img src="https://raw.githubusercontent.com/jadsonviana7-eng/Icones/refs/heads/main/celula.svg" alt="Células" className="w-10 h-10" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoughnutCard titulo="Distribuição por Zona" dados={zonasDados} />
        <DoughnutCard titulo="Faixa Etária (Membros)" dados={faixasDados} />
        <CombinationCard titulo="Novos convertidos" dados={novosConvertidos} periodo={periodoConvertidos} setPeriodo={setPeriodoConvertidos} />
        <DoughnutCard titulo="Faixa etária das células" dados={faixasCelulas} />
        <ColumnChart titulo="Aniversariantes por mês" dados={aniversariosDados} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Recentes titulo="Reuniões recentes das células" itens={relatoriosCelula.slice(0, 6)} render={(relatorio) => (
          <>
            <span className="font-bold text-slate-900">{relatorio.celulas?.nome || 'Célula'}</span>
            <span className="text-slate-400">{relatorio.data_reuniao ? new Date(`${relatorio.data_reuniao}T00:00:00`).toLocaleDateString('pt-BR') : 'Sem data'}</span>
            <span className="text-emerald-700 font-bold">{Number(relatorio.visitantes_presentes || 0)} visitantes</span>
          </>
        )} />
        <Recentes titulo="Aniversariantes do mês" itens={aniversariantesMes.slice(0, 8)} render={(pessoa) => (
          <>
            <Avatar pessoa={pessoa} />
            <span className="font-bold text-slate-900">{pessoa.nome}</span>
            <span className="text-slate-400">{new Date(`${pessoa.data_nascimento}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>
          </>
        )} />
      </div>
    </div>
  );
}