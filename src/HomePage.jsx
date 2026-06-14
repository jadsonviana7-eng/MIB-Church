import React, { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader } from './ui';
import { MenuIcons } from './icons'; // Import MenuIcons from the new icons.jsx
import { ModalWrapper } from './ui'; // Importar ModalWrapper

export default function HomePage({ onNavigate, hasAccess, membroLogado }) {
  const [avisos, setAvisos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const scrollRef = useRef(null);

  // Função para rolar o carrossel manualmente via botões
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function carregarAvisos() {
      const hoje = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('mural_avisos')
        .select('*')
        .eq('ativo', true)
        .or(`data_expiracao.is.null,data_expiracao.gte.${hoje}`)
        .order('prioridade', { ascending: false });
      if (isMounted) {
        setAvisos(data || []);
        setCarregando(false);
      }
    }
    carregarAvisos();

    return () => { isMounted = false; }; // Cleanup para evitar atualização de estado em componente desmontado
  }, []);

  const [dadosIgreja, setDadosIgreja] = useState(null);
  useEffect(() => {
    async function fetchDadosIgreja() {
      const { data, error } = await supabase.from('dados_igreja').select('*').eq('id', 1).single();
      if (error) console.error('Erro ao carregar dados da igreja:', error);
      else setDadosIgreja(data);
    }
    fetchDadosIgreja();
  }, []);

  const [modalAvisoAberto, setModalAvisoAberto] = useState(false);
  const [avisoSelecionado, setAvisoSelecionado] = useState(null);

  const abrirModalAviso = useCallback((aviso) => {
    setAvisoSelecionado(aviso);
    setModalAvisoAberto(true);
  }, []);

  const fecharModalAviso = useCallback(() => {
    setModalAvisoAberto(false);
    setAvisoSelecionado(null);
  }, []);

  const handleActionAviso = useCallback((av) => {
    if (av.link_externo) {
      // Se tiver link externo, abre em nova aba
      window.open(av.link_externo, '_blank', 'noopener,noreferrer');
    } else {
      // Se não tiver link, mas tiver conteúdo rico, abre o modal
      abrirModalAviso(av);
    }
  }, [abrirModalAviso]);

  const modules = [
    { id: 'dashboard', label: 'Visão Geral', icon: MenuIcons.dashboard, submenu: null }, // Link para o OverviewDashboard
    { id: 'pessoas', label: 'Pessoas', icon: MenuIcons.pessoas, submenu: 'todos' },
    { id: 'celulas', label: 'Células', icon: MenuIcons.celulas, submenu: 'lista' },
    { id: 'financeiro', label: 'Financeiro', icon: MenuIcons.financeiro, submenu: 'resumo' },
    { id: 'escolas', label: 'Escolas', icon: MenuIcons.escolas, submenu: 'resumo' },
    { id: 'agenda', label: 'Agenda', icon: MenuIcons.agenda, submenu: 'calendario' },
    { id: 'utilitarios', label: 'Utilitários', icon: MenuIcons.utilitarios, submenu: 'escalas' },
    { id: 'configuracoes', label: 'Configurações', icon: MenuIcons.configuracoes, submenu: null },
  ];

  return (
    <div className="space-y-6">
      {/* Logo Grande */}
      <div className="text-center py-8">
        <img src={dadosIgreja?.logo_url || '/logo-betesda.png'} alt="Logo da Igreja" className="mx-auto h-40 object-contain" />
      </div>

      {/* Mural de Avisos Dinâmico */}
      <div className="space-y-4">
        {carregando ? (
          <div className="h-40 bg-white rounded-3xl animate-pulse flex items-center justify-center text-slate-300">Carregando comunicados...</div>
        ) : avisos.length === 0 ? (
          <Card className="p-0">
            <CardHeader titulo="Mural de Avisos" subtitulo="Fique por dentro das últimas notícias e comunicados." />
            <div className="p-6 text-center text-slate-500 italic">
              <p>Nenhum aviso recente.</p>
            </div>
          </Card>
        ) : (
          <div className="relative group/mural">
            {/* Botões de navegação - visíveis apenas se houver mais de 4 avisos e em telas maiores */}
            {avisos.length > 4 && (
              <>
                <button 
                  onClick={() => scroll('left')}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-100 rounded-full shadow-xl items-center justify-center text-slate-400 hover:text-blue-600 transition-all opacity-0 group-hover/mural:opacity-100 hidden md:flex cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-100 rounded-full shadow-xl items-center justify-center text-slate-400 hover:text-blue-600 transition-all opacity-0 group-hover/mural:opacity-100 hidden md:flex cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}

            {/* Container do Carrossel / Grid */}
            <div 
              ref={scrollRef}
              className={`${avisos.length > 4 ? 'flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-4' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}`}
            >
              {avisos.map(av => (
                <Card 
                  key={av.id} 
                  className={`p-0 overflow-hidden group hover:shadow-xl transition-all border-none shadow-sm cursor-pointer shrink-0 ${avisos.length > 4 ? 'w-[85%] md:w-[calc(50%-12px)] snap-start' : ''}`} 
                  onClick={() => handleActionAviso(av)}
                >
                  <div className="flex flex-col sm:flex-row h-full">
                    {av.imagem_url && (
                      <div className={`shrink-0 overflow-hidden ${
                        av.formato === 'paisagem' ? 'w-full h-48 sm:h-auto sm:w-2/5' : 'sm:w-1/3 h-48 sm:h-auto'
                      }`}>
                        <img src={av.imagem_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-xl font-black text-slate-800 leading-tight mb-2">{av.titulo}</h3>
                        <p className="text-sm text-slate-500 font-medium line-clamp-3">{av.subtitulo}</p>
                      </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Postado em {new Date(av.created_at).toLocaleDateString('pt-BR')}</span>
                      {(av.link_externo || av.conteudo_html) && (
                          <button
                          onClick={(e) => { e.stopPropagation(); handleActionAviso(av); }}
                            className="text-[#1e3a8a] text-xs font-black uppercase tracking-wider hover:underline"
                          >
                          {av.link_externo ? 'Acessar Link' : 'Ler mais'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Botões para Módulos */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {modules.map(mod => {
          if (!hasAccess(mod.label)) return null;

          return (
            <button
              key={mod.id}
              onClick={() => onNavigate(mod.id, mod.submenu)}
              className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {mod.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{mod.label}</h3>
              <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                Acesse o módulo de {mod.label.toLowerCase()} para gerenciar suas tarefas.
              </p>
              <div className="mt-4 text-blue-600 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                Abrir Módulo
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Botões Simples para Módulos - Visível apenas em Telas Pequenas */}
      <div className="sm:hidden grid grid-cols-2 gap-3">
        {modules.map(mod => {
          if (!hasAccess(mod.label)) return null;

          return (
            <button
              key={mod.id}
              onClick={() => onNavigate(mod.id, mod.submenu)}
              className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center group"
            >
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">
                {mod.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-sm">{mod.label}</h3>
            </button>
          );
        })}
      </div>

      {/* Modal de Detalhes do Aviso */}
      {modalAvisoAberto && avisoSelecionado && (
        <ModalWrapper titulo={avisoSelecionado.titulo} onFechar={fecharModalAviso}>
          <div className="p-6 space-y-4">
            {avisoSelecionado.imagem_url && (
              <img src={avisoSelecionado.imagem_url} alt={avisoSelecionado.titulo} className="w-full rounded-xl object-cover" />
            )}
            {avisoSelecionado.subtitulo && (
              <p className="text-sm text-slate-600 font-medium">{avisoSelecionado.subtitulo}</p>
            )}
            {avisoSelecionado.conteudo_html ? (
              <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: avisoSelecionado.conteudo_html }} />
            ) : (
              <p className="text-sm text-slate-400 italic">Nenhum conteúdo detalhado.</p>
            )}
            <p className="text-[10px] text-slate-400 text-right">Publicado em: {new Date(avisoSelecionado.created_at).toLocaleDateString('pt-BR')}</p>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}