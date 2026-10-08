import React from 'react';
import { AlertTriangle, UserCheck, ShieldAlert, ArrowRight, X, Phone, Mail, FileText, User } from 'lucide-react';
import { mascaraCPF, mascaraTelefone } from './mascaras';

/**
 * Modal para informar duplicidade de cadastro ao tentar salvar dados já existentes no banco de dados.
 * Interface moderna, polida e totalmente em português.
 * 
 * @param {Object} props
 * @param {boolean} props.aberto - Controle de visibilidade
 * @param {string} [props.titulo] - Título personalizado do modal
 * @param {string} [props.mensagem] - Mensagem descritiva do conflito
 * @param {string} [props.campo] - Nome do campo com conflito (ex: 'cpf', 'email', 'nome')
 * @param {string} [props.valorConflito] - Valor que gerou o conflito
 * @param {Object} [props.pessoaExistente] - Objeto da pessoa que já possui o cadastro
 * @param {Function} props.onFechar - Callback disparado ao fechar o modal
 * @param {Function} [props.onVisualizarExistente] - Callback opcional para abrir/visualizar a ficha da pessoa existente
 */
export default function ModalDuplicidadeCadastro({
  aberto = true,
  titulo = 'Cadastro Já Existente',
  subtitulo = 'Identificamos que as informações informadas já constam no banco de dados da igreja.',
  mensagem = 'Não foi possível salvar este registro pois já existe um cadastro com estas informações.',
  campo = '',
  valorConflito = '',
  pessoaExistente = null,
  onFechar,
  onVisualizarExistente,
}) {
  if (!aberto) return null;

  const nomeExistente = pessoaExistente?.nome || '';
  const fotoExistente = pessoaExistente?.foto_url || '';
  const cargoExistente = pessoaExistente?.cargo || 'Membro';
  const celulaExistente = pessoaExistente?.celulas?.nome || pessoaExistente?.celula_nome || '';
  const statusExistente = pessoaExistente?.status || 'ativo';
  const emailExistente = pessoaExistente?.email || '';
  const telefoneExistente = pessoaExistente?.telefone ? mascaraTelefone(pessoaExistente.telefone) : '';
  const cpfExistente = pessoaExistente?.cpf ? mascaraCPF(pessoaExistente.cpf) : '';

  const getStatusBadge = (st) => {
    const s = String(st || '').toLowerCase();
    if (s === 'ativo') return { label: 'Ativo', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    if (s === 'inativo') return { label: 'Inativo', bg: 'bg-rose-100 text-rose-800 border-rose-200' };
    if (s === 'pendente') return { label: 'Pendente', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
    if (s === 'contribuinte') return { label: 'Contribuinte', bg: 'bg-blue-100 text-blue-800 border-blue-200' };
    return { label: st || 'Registrado', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
  };

  const statusBadge = getStatusBadge(statusExistente);

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-duplicidade-titulo"
    >
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Cabeçalho de Destaque com Aviso */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-transparent border-b border-amber-100/80 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/20 text-amber-600 flex items-center justify-center text-2xl shrink-0 shadow-xs">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                  Duplicidade de Registro
                </span>
              </div>
              <h2 id="modal-duplicidade-titulo" className="text-lg sm:text-xl font-black text-slate-800 mt-1 tracking-tight">
                {titulo}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                {subtitulo}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onFechar}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition cursor-pointer shrink-0"
            title="Fechar"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conteúdo Principal */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Mensagem Principal explicativa */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-2xl text-xs text-amber-900 leading-relaxed">
            <p className="font-semibold">{mensagem}</p>
            {valorConflito && (
              <p className="mt-1 text-[11px] text-amber-800 font-mono bg-amber-100/60 p-1.5 rounded-lg inline-block border border-amber-200/50">
                Valor duplicado: <strong>{valorConflito}</strong>
              </p>
            )}
          </div>

          {/* Card com Detalhes da Pessoa Existente Encontrada */}
          {pessoaExistente ? (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-slate-500" /> Cadastro Correspondente no Sistema
                </span>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusBadge.bg}`}>
                  {statusBadge.label}
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                {fotoExistente ? (
                  <img
                    src={fotoExistente}
                    alt={nomeExistente}
                    className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-xs shrink-0"
                  />
                ) : (
                  <div className="w-13 h-13 rounded-2xl bg-slate-200 text-slate-600 flex items-center justify-center text-lg font-black shrink-0 border border-slate-300">
                    {nomeExistente ? nomeExistente.charAt(0).toUpperCase() : <User className="w-6 h-6 text-slate-400" />}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-black text-slate-800 truncate">
                    {nomeExistente || 'Pessoa já cadastrada'}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    {cargoExistente && (
                      <span className="text-xs font-semibold text-slate-600">
                        {cargoExistente}
                      </span>
                    )}
                    {celulaExistente && (
                      <span className="text-[11px] text-slate-400">
                        • Célula: {celulaExistente}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Informações adicionais do cadastro existente */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] text-slate-600">
                {cpfExistente && (
                  <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-100 truncate">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">CPF: <strong className="text-slate-700">{cpfExistente}</strong></span>
                  </div>
                )}
                {telefoneExistente && (
                  <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-100 truncate">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{telefoneExistente}</span>
                  </div>
                )}
                {emailExistente && (
                  <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-100 col-span-1 sm:col-span-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{emailExistente}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700">Prevenção de Duplicidades</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  O banco de dados possui restrições de unicidade para evitar múltiplos registros da mesma pessoa com mesmo CPF, E-mail ou dados principais.
                </p>
              </div>
            </div>
          )}

          {/* Dicas de Ação Orientativas */}
          <div className="p-3.5 bg-slate-50/60 border border-slate-100 rounded-2xl space-y-1.5">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              💡 O que você pode fazer agora:
            </h4>
            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
              <li>
                <strong>Verifique os dados digitados:</strong> se houver erro de digitação no CPF ou e-mail, corrija-o e tente salvar novamente.
              </li>
              <li>
                <strong>Atualize o cadastro já existente:</strong> caso a pessoa já faça parte da igreja, atualize sua ficha ao invés de cadastrá-la novamente.
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé com Ações */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5 sm:justify-end shrink-0">
          <button
            type="button"
            onClick={onFechar}
            className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer active:scale-95 text-center shadow-xs"
          >
            Entendido, vou revisar
          </button>
          
          {pessoaExistente && onVisualizarExistente && (
            <button
              type="button"
              onClick={() => {
                onFechar();
                onVisualizarExistente(pessoaExistente.id || pessoaExistente);
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-200 transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 text-center"
            >
              <span>Ver Cadastro Existente</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
