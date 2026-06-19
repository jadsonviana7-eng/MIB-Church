import { useEffect, useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

import { ministeriosService } from './services/ministeriosService';

const PRESET_COLORS = [
  { name: 'Azul', value: '#2563eb' },
  { name: 'Roxo', value: '#7c3aed' },
  { name: 'Rosa', value: '#db2777' },
  { name: 'Vermelho', value: '#dc2626' },
  { name: 'Laranja', value: '#ea580c' },
  { name: 'Amarelo', value: '#d97706' },
  { name: 'Verde', value: '#059669' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Cinza', value: '#4b5563' }
];

export default function FuncoesMinisteriais({ ministerioId }) {
  const [funcoes, setFuncoes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    nome: '',
    cor: '#2563eb',
    ordem: 0
  });

  useEffect(() => {
    if (ministerioId) {
      carregar();
    }
  }, [ministerioId]);

  async function carregar() {
    try {
      const dados = await ministeriosService.listarFuncoes(ministerioId);
      setFuncoes(dados || []);
    } catch (error) {
      console.error('Erro ao carregar funções:', error);
    }
  }

  function abrirNovo() {
    setEditing(null);
    setForm({
      nome: '',
      cor: '#2563eb',
      ordem: funcoes.length + 1
    });
    setModalOpen(true);
  }

  function editar(funcao) {
    setEditing(funcao);
    setForm({
      nome: funcao.nome,
      cor: funcao.cor || '#2563eb',
      ordem: funcao.ordem
    });
    setModalOpen(true);
  }

  async function salvar() {
    if (!form.nome.trim()) {
      alert('Informe o nome');
      return;
    }

    const payload = {
      ministerio_id: ministerioId,
      nome: form.nome,
      cor: form.cor,
      ordem: Number(form.ordem)
    };

    try {
      if (editing) {
        await ministeriosService.atualizarFuncao(editing.id, payload);
      } else {
        await ministeriosService.criarFuncao(payload);
      }
      setModalOpen(false);
      carregar();
    } catch (error) {
      console.error('Erro ao salvar função:', error);
      if (error.message?.includes("cor' column") || error.message?.includes("column \"cor\"")) {
        alert(
          '⚠️ Erro de Banco de Dados: A coluna "cor" está faltando na tabela "ministerio_funcoes".\n\n' +
          'Por favor, execute o script SQL de correção localizado em "supabase/fix-coluna-cor-funcoes.sql" no SQL Editor do Supabase para corrigir este problema.'
        );
      } else {
        alert('Erro ao salvar: ' + error.message);
      }
    }
  }

  async function excluir(id) {
    const confirmar = await window.confirmModal('Excluir Função', 'Tem certeza que deseja excluir esta função?');
    if (!confirmar) return;

    try {
      await ministeriosService.excluirFuncao(id);
      carregar();
    } catch (error) {
      console.error('Erro ao excluir função:', error);
      alert('Erro ao excluir: ' + error.message);
    }
  }

  async function moverOrdem(funcao, direcao) {
    const index = funcoes.findIndex(f => f.id === funcao.id);
    if (index === -1) return;

    const vizinhoIndex = direcao === 'cima' ? index - 1 : index + 1;
    if (vizinhoIndex < 0 || vizinhoIndex >= funcoes.length) return;

    const vizinho = funcoes[vizinhoIndex];
    const ordemOriginal = funcao.ordem;
    const ordemVizinho = vizinho.ordem;

    try {
      await ministeriosService.atualizarFuncao(funcao.id, { ordem: ordemVizinho });
      await ministeriosService.atualizarFuncao(vizinho.id, { ordem: ordemOriginal });
      await carregar();
    } catch (error) {
      console.error('Erro ao reordenar funções:', error);
      alert('Erro ao reordenar: ' + error.message);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider">
            Funções
          </h2>
          <p className="text-xs text-slate-400">Configure as funções de apoio e serviço deste ministério.</p>
        </div>

        <button
          onClick={abrirNovo}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-200 transition active:scale-95 cursor-pointer"
        >
          <Plus size={14} strokeWidth={3} />
          Nova Função
        </button>
      </div>

      <div className="space-y-2">
        {funcoes.map((funcao, index) => (
          <div
            key={funcao.id}
            className="bg-white rounded-2xl border border-slate-100/80 p-4 flex justify-between items-center hover:shadow-sm transition"
          >
            <div className="flex items-center gap-3">
              {/* Setas de Reordenação */}
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-xl p-0.5 mr-2">
                <button
                  type="button"
                  onClick={() => moverOrdem(funcao, 'cima')}
                  disabled={index === 0}
                  className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400 transition cursor-pointer"
                  title="Mover para cima"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => moverOrdem(funcao, 'baixo')}
                  disabled={index === funcoes.length - 1}
                  className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400 transition cursor-pointer"
                  title="Mover para baixo"
                >
                  <ArrowDown size={14} />
                </button>
              </div>

              {/* Badge da Função */}
              <span 
                className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider"
                style={{ 
                  backgroundColor: (funcao.cor || '#2563eb') + '15', 
                  color: funcao.cor || '#2563eb' 
                }}
              >
                {funcao.nome}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editar(funcao)}
                className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-700 transition cursor-pointer"
                title="Editar"
              >
                <Pencil size={15} />
              </button>

              <button
                onClick={() => excluir(funcao.id)}
                className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer"
                title="Excluir"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}

        {funcoes.length === 0 && (
          <p className="text-xs text-slate-400 italic text-center py-6 border border-dashed border-slate-200 rounded-xl">
            Nenhuma função configurada para este ministério.
          </p>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                {editing ? 'Editar Função' : 'Nova Função'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Nome da Função</label>
                <input
                  type="text"
                  placeholder="Ex: Teclado, Vocal, Recepcionista..."
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition bg-slate-50/30"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cor de Destaque</label>
                <div className="flex flex-wrap items-center gap-2">
                  {PRESET_COLORS.map((preset) => {
                    const isSelected = form.cor === preset.value;
                    return (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => setForm({ ...form, cor: preset.value })}
                        className="w-6 h-6 rounded-full transition-all active:scale-90 cursor-pointer flex items-center justify-center border border-slate-200"
                        style={{ backgroundColor: preset.value }}
                        title={preset.name}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                        )}
                      </button>
                    );
                  })}
                  
                  <div className="relative flex items-center gap-1.5 ml-auto">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Custom:</span>
                    <input
                      type="color"
                      value={form.cor}
                      onChange={(e) => setForm({ ...form, cor: e.target.value })}
                      className="w-7 h-7 border border-slate-200 rounded-lg p-0.5 cursor-pointer outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span 
                  className="px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm"
                  style={{ 
                    backgroundColor: (form.cor || '#2563eb') + '15', 
                    color: form.cor || '#2563eb' 
                  }}
                >
                  {form.nome || 'Nome da Função'}
                </span>
                <p className="text-[10px] text-slate-400 font-medium">Pré-visualização do crachá</p>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={salvar}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 transition active:scale-95 cursor-pointer"
              >
                {editing ? 'Salvar Alterações' : 'Criar Função'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}