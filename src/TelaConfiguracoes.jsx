import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader } from './ui'; // Importar PageHeader
import { 
  mascaraTelefone, 
  mascaraCNPJ, 
  desmascararTelefone, 
  desmascararCNPJ 
} from './mascaras';

export default function TelaConfiguracoes({ onFechar }) {
  const [zonas, setZonas] = useState([]);
  const [atuacoes, setAtuacoes] = useState([]);
  const [novaZona, setNovaZona] = useState('');
  const [novaAtuacao, setNovaAtuacao] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [formasPagamentoDisponiveis, setFormasPagamentoDisponiveis] = useState([]);
  const [novaFormaPagamento, setNovaFormaPagamento] = useState('');

  const [nomeIgreja, setNomeIgreja] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [telefone, setTelefone] = useState('');
  const [emailContato, setEmailContato] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [carneInstrucoes, setCarneInstrucoes] = useState('');
  const [carneLocalPagamento, setCarneLocalPagamento] = useState('');
  const [salvandoIgreja, setSalvandoIgreja] = useState(false);

  async function carregarDadosConfiguracao() {
    setCarregando(true);
    try {
      const { data: listZonas, error: erroZonas } = await supabase.from('zonas_moradia').select('*').order('nome');
      if (erroZonas) console.warn('Tabela "zonas_moradia" não encontrada. Veja DATABASE_SCHEMA.md');
      if (listZonas) setZonas(listZonas);

      const { data: listAtuacoes, error: erroAtuacoes } = await supabase.from('atuacoes').select('*').order('nome');
      if (erroAtuacoes) console.warn('Tabela "atuacoes" não encontrada. Veja DATABASE_SCHEMA.md');
      if (listAtuacoes) setAtuacoes(listAtuacoes);

      const { data: igr, error: erroIgreja } = await supabase.from('dados_igreja').select('*').eq('id', 1).single();
      if (erroIgreja) console.warn('Tabela "dados_igreja" não encontrada. Veja DATABASE_SCHEMA.md');
      if (igr) {
        setNomeIgreja(igr.nome_igreja || '');
          setCnpj(mascaraCNPJ(igr.cnpj || ''));
        setEndereco(igr.endereco || '');
        setNumero(igr.numero || '');
        setBairro(igr.bairro || '');
        setCidade(igr.cidade || '');
        setEstado(igr.estado || '');
        setCep(igr.cep || '');
          setTelefone(mascaraTelefone(igr.telefone || ''));
        setEmailContato(igr.email_contato || '');
        setLogoUrl(igr.logo_url || '');
        setCarneInstrucoes(igr.carne_instrucoes || '');
        setCarneLocalPagamento(igr.carne_local_pagamento || '');
      }
      const { data: listFormasPagamento, error: erroFormasPagamento } = await supabase.from('formas_pagamento_disponiveis').select('*').order('nome');
      if (erroFormasPagamento) console.warn('Tabela "formas_pagamento_disponiveis" não encontrada. Veja DATABASE_SCHEMA.md');
      if (listFormasPagamento) {
        setFormasPagamentoDisponiveis(listFormasPagamento);
      }
    } catch (err) {
      console.error('Erro ao carregar configurações:', err);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDadosConfiguracao();
  }, []);

  async function handleSalvarDadosIgreja(e) {
    e.preventDefault();
    setSalvandoIgreja(true);
    try {
      const { error } = await supabase.from('dados_igreja').update({
        nome_igreja: nomeIgreja.trim(),
        cnpj: desmascararCNPJ(cnpj),
        endereco: endereco.trim(),
        numero: numero.trim(),
        bairro: bairro.trim(),
        cidade: cidade.trim(),
        estado: estado.trim(),
        cep: cep.trim(),
        telefone: desmascararTelefone(telefone),
        email_contato: emailContato.trim(),
        logo_url: logoUrl.trim(),
        carne_instrucoes: carneInstrucoes.trim(),
        carne_local_pagamento: carneLocalPagamento.trim(),
      }).eq('id', 1);
      if (error) throw error;
      window.alert('Dados da igreja atualizados.');
    } catch (err) {
      window.alert('Erro: ' + err.message);
    } finally {
      setSalvandoIgreja(false);
    }
  }

  async function handleAdicionarZona(e) {
    e.preventDefault();
    if (!novaZona.trim()) return;
    setCarregando(true);
    const { error } = await supabase.from('zonas_moradia').insert([{ nome: novaZona.trim() }]);
    if (!error) {
      setNovaZona('');
      await carregarDadosConfiguracao();
    } else {
      window.alert('Erro: ' + error.message);
    }
    setCarregando(false);
  }

  async function handleAdicionarAtuacao(e) {
    e.preventDefault();
    if (!novaAtuacao.trim()) return;
    setCarregando(true);
    const { error } = await supabase.from('atuacoes').insert([{ nome: novaAtuacao.trim() }]);
    if (!error) {
      setNovaAtuacao('');
      await carregarDadosConfiguracao();
    } else {
      window.alert('Erro: ' + error.message);
    }
    setCarregando(false);
  }

  async function handleExcluirZona(id) {
    if (!(await window.confirmModal('Excluir Zona', 'Excluir esta zona?'))) return;
    await supabase.from('zonas_moradia').delete().eq('id', id);
    await carregarDadosConfiguracao();
  }

  async function handleExcluirAtuacao(id) {
    if (!(await window.confirmModal('Excluir Atuação', 'Excluir esta atuação?'))) return;
    await supabase.from('atuacoes').delete().eq('id', id);
    await carregarDadosConfiguracao();
  }

  async function handleAdicionarFormaPagamento(e) {
    e.preventDefault();
    if (!novaFormaPagamento.trim()) return;
    setCarregando(true);
    const { error } = await supabase.from('formas_pagamento_disponiveis').insert([{ nome: novaFormaPagamento.trim() }]);
    if (!error) {
      setNovaFormaPagamento('');
      await carregarDadosConfiguracao();
    } else {
      window.alert('Erro: ' + error.message);
    }
    setCarregando(false);
  }

  async function handleExcluirFormaPagamento(id) {
    if (!(await window.confirmModal('Excluir Forma de Pagamento', 'Excluir esta forma de pagamento?'))) return;
    await supabase.from('formas_pagamento_disponiveis').delete().eq('id', id);
    await carregarDadosConfiguracao();
  }

  return (
    <div className="w-full max-w-full sm:max-w-3xl space-y-4 px-2">
      <PageHeader titulo="Configurações" subtitulo="Dados institucionais, zonas geográficas e campos de atuação.">
        <button type="button" onClick={onFechar} className="px-4 py-2 rounded-xl border border-[var(--border)] text-xs font-medium">Fechar</button>
      </PageHeader>

      <Card className="p-0">
        <CardHeader titulo="Cadastro institucional da igreja" />
        <form onSubmit={handleSalvarDadosIgreja} className="card-body-full space-y-3">
          <input type="text" required placeholder="Nome da igreja" value={nomeIgreja} onChange={(e) => setNomeIgreja(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="text" 
              placeholder="CNPJ" 
              value={cnpj} 
              onChange={(e) => setCnpj(mascaraCNPJ(e.target.value))} 
              className="w-full px-3 py-2 border rounded-xl text-sm" 
            />
            <input 
              type="text" 
              placeholder="Telefone" 
              value={telefone} 
              onChange={(e) => setTelefone(mascaraTelefone(e.target.value))} 
              className="w-full px-3 py-2 border rounded-xl text-sm" 
            />
          </div>
          <input type="email" placeholder="E-mail de contato" value={emailContato} onChange={(e) => setEmailContato(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
          <input type="url" placeholder="URL da logo (opcional)" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <input type="text" placeholder="Endereço / Logradouro" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="sm:col-span-9 px-3 py-2 border rounded-xl text-sm" />
            <input type="text" placeholder="Nº" value={numero} onChange={(e) => setNumero(e.target.value)} className="sm:col-span-3 px-3 py-2 border rounded-xl text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} className="px-3 py-2 border rounded-xl text-sm" />
            <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} className="px-3 py-2 border rounded-xl text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Estado (UF)" maxLength={2} value={estado} onChange={(e) => setEstado(e.target.value.toUpperCase())} className="px-3 py-2 border rounded-xl text-sm" />
            <input type="text" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} className="px-3 py-2 border rounded-xl text-sm" />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Configurações do Carnê</h4>
            <textarea placeholder="Instruções padrão (Ex: Pagamento via PIX, regras de multa...)" value={carneInstrucoes} onChange={(e) => setCarneInstrucoes(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm mb-3 resize-none" rows="3" />
            <input type="text" placeholder="Local de pagamento padrão" value={carneLocalPagamento} onChange={(e) => setCarneLocalPagamento(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
          </div>

          <button type="submit" disabled={salvandoIgreja} className="btn-primary text-xs font-semibold px-4 py-2 rounded-xl ml-auto block">
            {salvandoIgreja ? 'Salvando...' : '💾 Salvar Configurações (Igreja e Carnê)'}
          </button>
        </form>
      </Card>

      <Card className="p-0">
        <CardHeader titulo="Zonas geográficas" subtitulo="Usadas em pessoas e células." />
        <form onSubmit={handleAdicionarZona} className="card-body-full border-b border-[var(--border)] flex gap-2">
          <input type="text" placeholder="Ex: Zona Norte..." value={novaZona} onChange={(e) => setNovaZona(e.target.value)} className="flex-1 px-3 py-2 border rounded-xl text-sm" disabled={carregando} />
          <button type="submit" disabled={carregando || !novaZona.trim()} className="btn-primary text-xs font-semibold px-4 py-2 rounded-xl shrink-0">+ Inserir zona</button>
        </form>
        <div className="divide-y divide-[var(--border)] max-h-48 overflow-y-auto">
          {zonas.length === 0 ? <p className="p-4 text-xs text-[var(--text-muted)]">Nenhuma zona.</p> : zonas.map((z) => (
            <div key={z.id} className="px-4 py-2.5 flex justify-between items-center text-sm">
              <span>{z.nome}</span>
              <button type="button" onClick={() => handleExcluirZona(z.id)} className="text-xs text-rose-600">Excluir</button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-0">
        <CardHeader titulo="Campos de atuação" subtitulo="Lista usada na aba Informações Adicionais da ficha do membro." />
        <form onSubmit={handleAdicionarAtuacao} className="card-body-full border-b border-[var(--border)] flex gap-2">
          <input type="text" placeholder="Ex: Louvor, Infantil, Diaconia..." value={novaAtuacao} onChange={(e) => setNovaAtuacao(e.target.value)} className="flex-1 px-3 py-2 border rounded-xl text-sm" disabled={carregando} />
          <button type="submit" disabled={carregando || !novaAtuacao.trim()} className="btn-primary text-xs font-semibold px-4 py-2 rounded-xl shrink-0">+ Inserir atuação</button>
        </form>
        <div className="divide-y divide-[var(--border)] max-h-48 overflow-y-auto">
          {atuacoes.length === 0 ? <p className="p-4 text-xs text-[var(--text-muted)]">Nenhuma atuação cadastrada.</p> : atuacoes.map((a) => (
            <div key={a.id} className="px-4 py-2.5 flex justify-between items-center text-sm">
              <span>{a.nome}</span>
              <button type="button" onClick={() => handleExcluirAtuacao(a.id)} className="text-xs text-rose-600">Excluir</button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-0">
        <CardHeader titulo="Formas de pagamento" subtitulo="Opções disponíveis para eventos pagos." />
        <form onSubmit={handleAdicionarFormaPagamento} className="card-body-full border-b border-[var(--border)] flex gap-2">
          <input type="text" placeholder="Ex: Boleto, Transferência Bancária..." value={novaFormaPagamento} onChange={(e) => setNovaFormaPagamento(e.target.value)} className="flex-1 px-3 py-2 border rounded-xl text-sm" disabled={carregando} />
          <button type="submit" disabled={carregando || !novaFormaPagamento.trim()} className="btn-primary text-xs font-semibold px-4 py-2 rounded-xl shrink-0">+ Inserir forma</button>
        </form>
        <div className="divide-y divide-[var(--border)] max-h-48 overflow-y-auto">
          {formasPagamentoDisponiveis.length === 0 ? <p className="p-4 text-xs text-[var(--text-muted)]">Nenhuma forma de pagamento cadastrada.</p> : formasPagamentoDisponiveis.map((f) => (
            <div key={f.id} className="px-4 py-2.5 flex justify-between items-center text-sm">
              <span>{f.nome}</span>
              <button type="button" onClick={() => handleExcluirFormaPagamento(f.id)} className="text-xs text-rose-600">Excluir</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
