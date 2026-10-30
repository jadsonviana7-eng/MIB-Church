import { useEffect, useState } from 'react';
import { 
  Plus, Pencil, Trash2, X, ChevronRight, Eye, Info, Pin, Lightbulb,
  Music, Heart, Sparkles, Shield, Home, Flame, BookOpen, Users, 
  Compass, Clapperboard, Award, Mic, MessageSquare, Calendar, 
  HelpingHand, Scroll, Smile, Globe, Video, Tv, Wrench, Hammer
} from 'lucide-react';
import { ministeriosService, clarearCorParaModoEscuro } from './services/ministeriosService';
import { useIsDarkMode } from './hooks/useIsDarkMode';
import MinistryDetails from './MinistryDetails';
import { MinistryIcon } from '../ui';

const DISPONIVEIS_ICONES = [
  { id: 'Music', label: 'Música/Louvor', icon: Music },
  { id: 'Mic', label: 'Voz/Pregação', icon: Mic },
  { id: 'Heart', label: 'Amor/Acolhimento', icon: Heart },
  { id: 'Smile', label: 'Comunhão', icon: Smile },
  { id: 'HelpingHand', label: 'Apoio/Social', icon: HelpingHand },
  { id: 'Wrench', label: 'Manutenção/Obras', icon: Wrench },
  { id: 'Hammer', label: 'Construção/Reparos', icon: Hammer },
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

export default function MinisteriosManager({ 
  initialSelectedMinistryId = null, 
  hideHeader = false, 
  onNavegarTab,
  onMinisterioAtivoChange
}) {
  const isDark = useIsDarkMode();
  const [ministerios, setMinisterios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedMinistryId, setSelectedMinistryId] = useState(initialSelectedMinistryId);

  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    icone: 'HelpingHand',
    cor_principal: '#2563eb',
    ativo: true
  });

  useEffect(() => {
    setSelectedMinistryId(initialSelectedMinistryId);
  }, [initialSelectedMinistryId]);

  useEffect(() => {
    if (!selectedMinistryId) {
      onMinisterioAtivoChange?.(null);
    } else if (ministerios.length > 0) {
      const min = ministerios.find(m => m.id === selectedMinistryId);
      if (min) {
        onMinisterioAtivoChange?.(min);
      }
    }
  }, [selectedMinistryId, ministerios]);

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
      icone: 'HelpingHand',
      cor_principal: '#2563eb',
      ativo: true
    });
  }

  function editar(ministerio) {
    setEditing(ministerio);
    setForm({
      nome: ministerio.nome,
      descricao: ministerio.descricao || '',
      icone: ministerio.icone || 'HelpingHand',
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
      <MinistryDetails
        ministerioId={selectedMinistryId}
        onVoltar={() => {
          setSelectedMinistryId(null);
          onMinisterioAtivoChange?.(null);
        }}
        onNavegarTab={onNavegarTab}
        onMinisterioCarregado={(min) => {
          onMinisterioAtivoChange?.(min);
        }}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {!hideHeader ? (
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
              Ministérios
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cadastre os ministérios ativos da igreja e configure suas equipes.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-700 dark:text-slate-200 flex items-center gap-2 bg-white dark:bg-[#17223b] border border-slate-200/90 dark:border-[#2b3954] px-3.5 py-2 rounded-xl shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px] tracking-wider">Total:</span>
              <span className="font-black text-blue-600 dark:text-blue-400">{ministerios.length}</span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">ministérios</span>
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={() => setInfoModalOpen(true)}
            className="w-10 h-10 rounded-xl bg-white dark:bg-[#17223b] hover:bg-blue-50 dark:hover:bg-[#1e2f52] text-blue-600 dark:text-blue-400 border border-slate-200/90 dark:border-[#2b3954] hover:border-blue-300 dark:hover:border-blue-500/50 flex items-center justify-center transition-all shadow-2xs active:scale-95 cursor-pointer"
            title="Observação sobre Políticas de Acesso & Escalas"
            aria-label="Observação sobre Políticas de Acesso & Escalas"
          >
            <Info size={18} strokeWidth={2.4} />
          </button>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="group relative overflow-hidden flex items-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/40 border border-blue-400/30 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
              <Plus className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </div>
            <span>Novo Ministério</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
        {ministerios.map((m) => {
          const corClara = clarearCorParaModoEscuro(m.cor_principal || '#2563eb');
          return (
            <div
              key={m.id}
              onClick={() => {
                setSelectedMinistryId(m.id);
                onMinisterioAtivoChange?.(m);
              }}
              className="bg-white dark:bg-[#17223b] rounded-2xl shadow-sm border border-slate-100/80 dark:border-[#2b3954] border-t-[4px] p-4 sm:p-5 cursor-pointer hover:shadow-md hover:border-slate-200 dark:hover:border-slate-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              style={{ borderTopColor: isDark ? corClara : (m.cor_principal || '#2563eb') }}
            >
              <div>
                <div className="flex justify-between items-start">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm shrink-0"
                    style={{
                      backgroundColor: isDark ? `${corClara}25` : (m.cor_principal || '#2563eb') + '15',
                      color: isDark ? corClara : (m.cor_principal || '#2563eb'),
                      border: isDark ? `1px solid ${corClara}40` : undefined
                    }}
                  >
                    <MinistryIcon icone={m.icone} nome={m.nome} size={18} />
                  </div>

                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        editar(m);
                      }}
                      className="p-1 sm:p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
                      title="Editar"
                    >
                      <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        excluir(m.id);
                      }}
                      className="p-1 sm:p-1.5 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                <h3
                  className="font-black mt-3 sm:mt-4 text-xs sm:text-sm flex items-center gap-1.5 truncate nome-ministerio-contraste"
                  style={{ color: isDark ? corClara : '#1e293b' }}
                >
                  {m.nome}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {m.descricao || 'Nenhuma descrição informada.'}
                </p>
              </div>

              <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-50 dark:border-[#2b3954] flex items-center justify-between text-slate-400 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider flex items-center gap-1 truncate">
                  <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Ver Equipe & Funções
                </span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </div>
          );
        })}

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
                  <MinistryIcon icone={form.icone} nome={form.nome} size={22} />
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
                className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/40 border border-blue-400/30 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                {editing ? 'Salvar Alterações' : 'Criar Ministério'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Políticas de Acesso & Escalas */}
      {infoModalOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={() => setInfoModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-blue-50/70 via-slate-50 to-indigo-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/25 border border-blue-400/30">
                  <Info size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-sm tracking-tight">
                    Políticas de Acesso & Escalas
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Regras para liderança e permissões
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInfoModalOpen(false)}
                className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-5 space-y-4 text-xs">
              <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-2xl space-y-2">
                <h4 className="font-bold text-blue-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Pin size={13} className="text-blue-600 shrink-0" />
                  Observação sobre Políticas de Acesso & Escalas
                </h4>
                <p className="text-slate-700 leading-relaxed font-medium">
                  Se o <strong>Membro</strong> ou o <strong>Líder de Célula</strong> for cadastrado como <strong>Líder de algum ministério</strong>, a função{' '}
                  <span className="inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md text-[10px] font-bold bg-blue-600 text-white shadow-2xs">
                    Escalar
                  </span>{' '}
                  no módulo <em>Gestor Ministerial</em> será automaticamente habilitada para que ele possa escalar e gerenciar a sua equipe.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100/80 text-slate-600 text-[11px] leading-relaxed flex items-start gap-2">
                <Lightbulb size={14} className="text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Dica:</strong> Para conceder permissão de escala a um membro, basta adicioná-lo na liderança do respectivo ministério dentro dos detalhes do ministério.
                </span>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button
                type="button"
                onClick={() => setInfoModalOpen(false)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-100 transition active:scale-95 cursor-pointer"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}