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

  const [nomeIgreja, setNomeIgreja] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [emailContato, setEmailContato] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
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
          setTelefone(mascaraTelefone(igr.telefone || ''));
        setEmailContato(igr.email_contato || '');
        setLogoUrl(igr.logo_url || '');
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
        telefone: desmascararTelefone(telefone),
        email_contato: emailContato.trim(),
        logo_url: logoUrl.trim(),
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
    if (!window.confirm('Excluir esta zona?')) return;
    await supabase.from('zonas_moradia').delete().eq('id', id);
    await carregarDadosConfiguracao();
  }

  async function handleExcluirAtuacao(id) {
    if (!window.confirm('Excluir esta atuação?')) return;
    await supabase.from('atuacoes').delete().eq('id', id);
    await carregarDadosConfiguracao();
  }

  return (
    <div className="w-full max-w-3xl space-y-4">
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
          <input type="text" placeholder="Endereço sede" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
          <button type="submit" disabled={salvandoIgreja} className="btn-primary text-xs font-semibold px-4 py-2 rounded-xl ml-auto block">
            {salvandoIgreja ? 'Salvando...' : 'Salvar igreja'}
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
    </div>
  );
}
