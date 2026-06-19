import { useEffect, useState } from 'react';
import { 
  Plus, Pencil, Trash2, X, ChevronRight, Eye,
  Music, Heart, Sparkles, Shield, Home, Flame, BookOpen, Users, 
  Compass, Clapperboard, Award, Mic, MessageSquare, Calendar, 
  HelpingHand, Scroll, Smile, Globe, Video, Tv
} from 'lucide-react';
import { ministeriosService } from './services/ministeriosService';
import MinistryDetails from './MinistryDetails';
import { MinistryIcon } from '../ui';

const DISPONIVEIS_ICONES = [
  { id: 'Music', label: 'Música/Louvor', icon: Music },
  { id: 'Mic', label: 'Voz/Pregação', icon: Mic },
  { id: 'Heart', label: 'Amor/Acolhimento', icon: Heart },
  { id: 'Smile', label: 'Comunhão', icon: Smile },
  { id: 'HelpingHand', label: 'Apoio/Social', icon: HelpingHand },
  { id: 'Sparkles', label: 'Kids/Especial', icon: Sparkles },
  { id: 'Flame', label: 'Jovens/Avivamento', icon: Flame },
  { id: 'BookOpen', label: 'Ensino/Discipulado', icon: BookOpen },
  { id: 'Users', label: 'Células/Grupos', icon: Users },
  { id: 'Compass', label: 'Missões/Envio', icon: Compass },
  { id: 'Globe', label: 'Evangelismo', icon: Globe },
  { id: 'Clapperboard', label: 'Mídia/Artes', icon: Clapperboard },
  { id: 'Video', label: 'Transmissão', icon: Video },
  { id: 'Calendar', label: 'Eventos/Agenda', icon: Calendar },
  { id: 'Shield', label: 'Segurança', icon: Shield },
  { id: 'Scroll', label: 'Administração', icon: Scroll }
];

const PRESET_COLORS = [
  { name: 'Azul Real', value: '#2563eb' },
  { name: 'Roxo Nobre', value: '#7c3aed' },
  { name: 'Rosa Magenta', value: '#db2777' },
  { name: 'Rubi Vibrante', value: '#dc2626' },
  { name: 'Coral Laranja', value: '#ea580c' },
  { name: 'Amber Sol', value: '#d97706' },
  { name: 'Verde Esmeralda', value: '#059669' },
  { name: 'Verde Menta', value: '#0d9488' },
  { name: 'Cinza Executivo', value: '#4b5563' }
];

export default function MinisteriosManager() {
  const [ministerios, setMinisterios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedMinistryId, setSelectedMinistryId] = useState(null);

  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    icone: '🙏',
    cor_principal: '#2563eb',
    ativo: true
  });

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const dados = await ministeriosService.listarMinisterios();
      setMinisterios(dados || []);
    } catch (error) {
      console.error('Erro ao carregar ministérios:', error);
    }
  }

  async function salvar() {
    if (!form.nome.trim()) {
      alert('Informe o nome');
      return;
    }

    try {
      if (editing) {
        await ministeriosService.atualizarMinisterio(editing.id, form);
      } else {
        await ministeriosService.criarMinisterio(form);
      }
      fecharModal();
      carregar();
    } catch (error) {
      console.error('Erro ao salvar ministério:', error);
      alert('Erro ao salvar: ' + error.message);
    }
  }

  function fecharModal() {
    setModalOpen(false);
    setEditing(null);
    setForm({
      nome: '',
      descricao: '',
      icone: '🙏',
      cor_principal: '#2563eb',
      ativo: true
    });
  }

  function editar(ministerio) {
    setEditing(ministerio);
    setForm({
      nome: ministerio.nome,
      descricao: ministerio.descricao || '',
      icone: ministerio.icone || '🙏',
      cor_principal: ministerio.cor_principal || '#2563eb',
      ativo: ministerio.ativo
    });
    setModalOpen(true);
  }

  async function excluir(id) {
    if (!(await window.confirmModal('Excluir Ministério', 'Deseja excluir este ministério? Todas as funções e vínculos serão afetados.'))) {
      return;
    }

    try {
      await ministeriosService.excluirMinisterio(id);
      carregar();
    } catch (error) {
      console.error('Erro ao excluir ministério:', error);
      alert('Erro ao excluir: ' + error.message);
    }
  }

  if (selectedMinistryId) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedMinistryId(null)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition cursor-pointer"
        >
          ← Voltar para Ministérios
        </button>
        <MinistryDetails ministerioId={selectedMinistryId} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Ministérios
          </h2>
          <p className="text-xs text-slate-500">
            Cadastre os ministérios ativos da igreja e configure suas equipes.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-200 transition active:scale-95 cursor-pointer"
        >
          <Plus size={14} strokeWidth={3} />
          Novo Ministério
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {ministerios.map((m) => (
          <div
            key={m.id}
            onClick={() => setSelectedMinistryId(m.id)}
            className="bg-white rounded-2xl shadow-sm border border-slate-100/80 border-t-[4px] p-5 cursor-pointer hover:shadow-md hover:border-slate-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            style={{ borderTopColor: m.cor_principal || '#2563eb' }}
          >
            <div>
              <div className="flex justify-between items-start">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: (m.cor_principal || '#2563eb') + '15', color: m.cor_principal || '#2563eb' }}
                >
                  <MinistryIcon icone={m.icone} size={20} />
                </div>

                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      editar(m);
                    }}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition"
                    title="Editar"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      excluir(m.id);
                    }}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition"
                    title="Excluir"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-slate-800 mt-4 flex items-center gap-1.5">
                {m.nome}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {m.descricao || 'Nenhuma descrição informada.'}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between text-slate-400 group-hover:text-blue-600 transition-colors">
              <span className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <Eye size={12} />
                Ver Equipe & Funções
              </span>
              <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}

        {ministerios.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl border-2 border-dashed border-slate-200/80 p-12 text-center text-slate-400 italic">
            Nenhum ministério cadastrado. Clique no botão acima para adicionar o primeiro!
          </div>
        )}
      </div>

      {/* Modal de Cadastro/Edição */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                {editing ? 'Editar Ministério' : 'Novo Ministério'}
              </h3>
              <button onClick={fecharModal} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Nome do Ministério</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={e => setForm({ ...form, nome: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition bg-slate-50/30"
                  placeholder="Ex: Louvor, Mídia, Kids..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Ícone do Ministério</label>
                <div className="grid grid-cols-8 gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl max-h-[120px] overflow-y-auto">
                  {DISPONIVEIS_ICONES.map((item) => {
                    const IconComponent = item.icon;
                    const isSelected = form.icone === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setForm({ ...form, icone: item.id })}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-100 scale-105' 
                            : 'bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-700 border border-slate-150'
                        }`}
                        title={item.label}
                      >
                        <IconComponent size={16} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cor de Destaque</label>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {PRESET_COLORS.map((preset) => {
                      const isSelected = form.cor_principal === preset.value;
                      return (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => setForm({ ...form, cor_principal: preset.value })}
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
                        value={form.cor_principal}
                        onChange={e => setForm({ ...form, cor_principal: e.target.value })}
                        className="w-7 h-7 border border-slate-200 rounded-lg p-0.5 cursor-pointer outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md shadow-slate-100"
                  style={{ backgroundColor: form.cor_principal || '#2563eb' }}
                >
                  <MinistryIcon icone={form.icone} size={22} />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800">{form.nome || 'Nome do Ministério'}</span>
                  <p className="text-[10px] text-slate-400 font-medium">Pré-visualização do ícone</p>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Descrição</label>
                <textarea
                  value={form.descricao}
                  onChange={e => setForm({ ...form, descricao: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition resize-none bg-slate-50/30"
                  rows="3"
                  placeholder="Finalidade deste ministério..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
              <button
                type="button"
                onClick={fecharModal}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={salvar}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition cursor-pointer"
              >
                {editing ? 'Salvar Alterações' : 'Criar Ministério'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}