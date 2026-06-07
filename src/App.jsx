import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { supabase } from './supabaseClient';
import TelaConfiguracoes from './TelaConfiguracoes';
import TelaLogin from './TelaLogin';
import Dashboard from './Dashboard';
import CelulasModulo from './CelulasModulo';
import PessoasModulo from './PessoasModulo';
import ModuloFinanceiro from './ModuloFinanceiro';
import ModuloUtilitarios from './ModuloUtilitarios';
import EscolasModulo from './EscolasModulo';
import AgendaModulo from './AgendaModulo';
import PublicEventRegistration from './PublicEventRegistration';
import DetalhesMembro from './DetalhesMembro';
import PublicRegistrationForm from './PublicRegistrationForm'; // Importar o novo componente
import { normalizarTexto, faixaDaIdade, meses, valorCampoRelatorio } from './churchUtils';

const filtrosIniciais = {
  busca: '', genero: '', estadoCivil: '', faixaEtaria: '', zona: '', cargo: '', 
  atuacao: '', batizado: '', relatorioCampo: '', relatorioValor: ''
};


/* ── Ícones SVG do menu ── */
const MenuIcons = {
  // Menu principal
  dashboard: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  pessoas: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  celulas: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><circle cx="12" cy="3" r="1.5"/><circle cx="21" cy="8" r="1.5"/>
      <circle cx="21" cy="16" r="1.5"/><circle cx="12" cy="21" r="1.5"/><circle cx="3" cy="16" r="1.5"/>
      <circle cx="3" cy="8" r="1.5"/><line x1="12" y1="9" x2="12" y2="4.5"/><line x1="14.6" y1="10.5" x2="19.5" y2="7.5"/>
      <line x1="14.6" y1="13.5" x2="19.5" y2="16.5"/><line x1="12" y1="15" x2="12" y2="19.5"/>
      <line x1="9.4" y1="13.5" x2="4.5" y2="16.5"/><line x1="9.4" y1="10.5" x2="4.5" y2="7.5"/>
    </svg>
  ),
  financeiro: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  escolas: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  agenda: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  utilitarios: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M2 12h2M20 12h2M19.07 19.07l-1.41-1.41M5.34 5.34l-1.41 1.41M12 2v2M12 20v2"/>
    </svg>
  ),
  configuracoes: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  // Submenus Pessoas
  'p-todos': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  'p-adicionar': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
      <line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/>
    </svg>
  ),
  'p-link_publico': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  'p-inativos': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
    </svg>
  ),
  'p-aniversariantes': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  'p-cargo': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  'p-zona': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  'p-atuacao': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  'p-relatorios': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  // Submenus Células
  'c-lista': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  'c-adicionar': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
  'c-reunioes': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  'c-relatorios': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  // Submenus Financeiro
  'f-resumo': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  'f-transacoes': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  ),
  'f-relatorios': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  'f-historico': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 0 .5-4.5"/>
      <polyline points="3 3 3.05 11 11 11"/>
    </svg>
  ),
  'f-categorias': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
    </svg>
  ),
  'f-contas': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  ),
  'f-importar': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  // Submenus Escolas
  'e-resumo': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  'e-cursos': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  'e-turmas': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  'e-disciplinas': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  'e-professores': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  'e-alunos': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
    </svg>
  ),
  'e-aulas': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="15" x2="16" y2="15"/>
    </svg>
  ),
  'e-avaliacoes': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  ),
  'e-ficha-aluno': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
      <path d="M12 11v4M10 13h4" />
    </svg>
  ),
  'e-inscricoes': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  // Submenus Utilitários
  'u-escalas': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
  'u-relatorio-semanal': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  'u-calculadora': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8.01" y2="10"/>
      <line x1="12" y1="10" x2="12.01" y2="10"/><line x1="16" y1="10" x2="16.01" y2="10"/>
      <line x1="8" y1="14" x2="8.01" y2="14"/><line x1="12" y1="14" x2="12.01" y2="14"/>
      <line x1="16" y1="14" x2="16.01" y2="14"/><line x1="8" y1="18" x2="12" y2="18"/>
      <line x1="16" y1="18" x2="16.01" y2="18"/>
    </svg>
  ),
  'u-quiz': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  'u-pedido-oracao': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v8"/><path d="M8 12h8"/>
    </svg>
  ),
  'u-mural-oracao': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h6"/>
    </svg>
  ),
  // Submenus Agenda
  'a-calendario': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  'a-eventos': (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
};

// Mapa de submenus → chave de ícone
const submenuIconKey = {
  pessoas: { todos: 'p-todos', adicionar: 'p-adicionar', link_publico: 'p-link_publico', inativos: 'p-inativos', aniversariantes: 'p-aniversariantes', cargo: 'p-cargo', zona: 'p-zona', atuacao: 'p-atuacao', relatorios: 'p-relatorios' },
  celulas:  { lista: 'c-lista', adicionar: 'c-adicionar', reunioes: 'c-reunioes', relatorios: 'c-relatorios' },
  financeiro: { resumo: 'f-resumo', transacoes: 'f-transacoes', relatorios: 'f-relatorios', historico: 'f-historico', categorias: 'f-categorias', contas: 'f-contas', importar: 'f-importar' },
  escolas: { resumo: 'e-resumo', cursos: 'e-cursos', turmas: 'e-turmas', disciplinas: 'e-disciplinas', professores: 'e-professores', alunos: 'e-alunos', aulas: 'e-aulas', avaliacoes: 'e-avaliacoes', 'ficha-aluno': 'e-ficha-aluno', inscricoes: 'e-inscricoes' },
  agenda: { calendario: 'a-calendario', eventos: 'a-eventos' },
  utilitarios: { 
    escalas: 'u-escalas', 'relatorio-semanal': 'u-relatorio-semanal', calculadora: 'u-calculadora',
    quiz: 'u-quiz', 'pedido-oracao': 'u-pedido-oracao', 'mural-oracao': 'u-mural-oracao'
  },
};

export default function App() {
  // Filtros para Células
  const filtrosCelulaIniciais = {
    busca: '', faixaEtaria: '', genero: '', diaSemana: '', horario: '',
  };

  const [filtrosCelula, setFiltrosCelula] = useState(filtrosCelulaIniciais);
  const [celulaSelecionadaId, setCelulaSelecionadaId] = useState(null);
  const escolaridadesDisponiveis = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior', 'Pós-graduação', 'Mestrado/Doutorado'];

  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    try {
      const sessaoSalva = localStorage.getItem('mibChurchSessao');
      const usuario = sessaoSalva ? JSON.parse(sessaoSalva) : null;
      console.log('Sessão carregada do localStorage:', usuario);
      return usuario;
    } catch (err) {
      console.error('Erro ao carregar sessão:', err);
      localStorage.removeItem('mibChurchSessao');
      return null;
    }
  });

  const [moduloAtual, setModuloAtual] = useState('dashboard');
  const [menuAberto, setMenuAberto] = useState(false);
  const [pessoasSubmenu, setPessoasSubmenu] = useState('todos');
  const [celulasSubmenu, setCelulasSubmenu] = useState('lista');
  const [financeiroSubmenu, setFinanceiroSubmenu] = useState('resumo');
  const [escolasSubmenu, setEscolasSubmenu] = useState('resumo'); // Novo estado para o submenu de Escolas
  const [agendaSubmenu, setAgendaSubmenu] = useState('calendario');
  const [utilitariosSubmenu, setUtilitariosSubmenu] = useState('escalas');
  const [pessoas, setPessoas] = useState([]);
  const [celulas, setCelulas] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [cargosDisponiveis, setCargosDisponiveis] = useState([]);
  const [atuacoesDisponiveis, setAtuacoesDisponiveis] = useState([]);
  const [relatoriosCelula, setRelatoriosCelula] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Estados de navegação e filtros restaurados
  const [membroSelecionadoId, setMembroSelecionadoId] = useState(null);
  const [alunoSelecionadoParaCadernetaId, setAlunoSelecionadoParaCadernetaId] = useState(null);
  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [periodoConvertidos, setPeriodoConvertidos] = useState('mes');

  const membroLogado = useMemo(() => {
    if (!usuarioLogado?.email || pessoas.length === 0) return null;
    return pessoas.find(p => p.email?.toLowerCase() === usuarioLogado.email.toLowerCase());
  }, [usuarioLogado, pessoas]);

  /**
   * Verifica se o membro logado tem acesso a um módulo ou bloco específico.
   */
  const hasAccess = useCallback((modulo, bloco = null) => {
    if (!membroLogado) return false;
    if (membroLogado.permissao === 'admin') return true;

    // 1. Prioridade: Permissões Manuais (JSON do banco)
    const json = membroLogado.permissoes_json || {};
    if (bloco) {
      const key = `${modulo}|${bloco}`;
      if (json[key] === true || json[`${key}|ver`] === true) return true;
    } else {
      const hasAnyBlock = Object.keys(json).some(k => k.startsWith(`${modulo}|`) && json[k] === true);
      if (hasAnyBlock) return true;
    }

    // 2. Permissões Padrão por Perfil
    const p = membroLogado.permissao?.toLowerCase() || '';

    if (p === 'membro') {
      if (modulo === 'Agenda') return true;
      if (modulo === 'Utilitários') {
        if (!bloco) return true;
        return !['Relatório Semanal', 'Mural de Orações'].includes(bloco);
      }
      if (modulo === 'Pessoas') {
        if (!bloco) return true;
        // Membros podem ver a listagem e aniversariantes (o RLS do banco filtrará os dados)
        return ['Ver todos', 'Aniversariantes'].includes(bloco);
      }
      if (modulo === 'Células') {
        if (!bloco) return true;
        return ['Lista de células'].includes(bloco);
      }
      return false; 
    }

    if (p === 'pastor') {
      return true; // Pastor visualiza todos os módulos e submenus
    }
    
    if (p === 'secretaria' && ['Pessoas', 'Células', 'Utilitários', 'Agenda'].includes(modulo)) return true;
    if ((p === 'tesouraria' || p === 'financeiro') && ['Financeiro', 'Pessoas', 'Utilitários', 'Agenda'].includes(modulo)) return true;
    if (p === 'lider-celula' || p === 'supervisor') {
      if (modulo === 'Agenda') return true;
      if (modulo === 'Pessoas') {
        return !bloco || ['Ver todos', 'Aniversariantes'].includes(bloco);
      }
      if (modulo === 'Células') {
        return !bloco || ['Lista de células', 'Reuniões'].includes(bloco);
      }
      if (modulo === 'Utilitários') {
        return !bloco || bloco !== 'Relatório Semanal';
      }
      return false;
    }

    return false;
  }, [membroLogado]);

  const indicadores = useMemo(() => {
    const ativas = pessoas.filter(p => normalizarTexto(p.status) !== 'inativo');
    const total = ativas.length || 1;
    const homens = ativas.filter((p) => normalizarTexto(p.genero) === 'masculino').length;
    const mulheres = ativas.filter((p) => normalizarTexto(p.genero) === 'feminino').length;
    return {
      totalPessoas: ativas.length,
      homens, mulheres,
      percentualHomens: Math.round((homens / total) * 100),
      percentualMulheres: Math.round((mulheres / total) * 100),
      totalCelulas: celulas.length,
    };
  }, [pessoas, celulas]);

  const pessoasFiltradas = useMemo(() => {
    return pessoas.filter((p) => {
      if (normalizarTexto(p.status) === 'inativo') return false;

      // Aplica o filtro específico vindo dos relatórios (botão Ver Lista)
      if (filtros.relatorioCampo && filtros.relatorioValor) {
        if (valorCampoRelatorio(p, filtros.relatorioCampo, zonas) !== filtros.relatorioValor) return false;
      }

      const busca = normalizarTexto(filtros.busca);
      if (busca && !normalizarTexto(p.nome).includes(busca)) return false;
      if (filtros.genero && p.genero !== filtros.genero) return false;
      if (filtros.faixaEtaria && faixaDaIdade(p.data_nascimento) !== filtros.faixaEtaria) return false;
      if (filtros.zona && String(p.zona_id) !== String(filtros.zona)) return false;
      if (filtros.cargo && p.cargo !== filtros.cargo) return false;
      if (filtros.atuacao && p.atuacao !== filtros.atuacao) return false;
      return true;
    });
  }, [pessoas, filtros]);

  const celulasFiltradas = useMemo(() => {
    return celulas.filter((c) => {
      const busca = normalizarTexto(filtrosCelula.busca);
      if (busca && !normalizarTexto(c.nome).includes(busca)) return false;
      if (filtrosCelula.faixaEtaria && c.faixa_etaria !== filtrosCelula.faixaEtaria) return false;
      if (filtrosCelula.genero && c.genero !== filtrosCelula.genero) return false;
      if (filtrosCelula.diaSemana && c.dia_semana !== filtrosCelula.diaSemana) return false;
      if (filtrosCelula.horario && c.horario !== filtrosCelula.horario) return false;
      return true;
    });
  }, [celulas, filtrosCelula]);

  const alterarFiltroCelula = (campo, valor) => setFiltrosCelula(prev => ({ ...prev, [campo]: valor }));

  const alterarFiltro = (campo, valor) => setFiltros(prev => ({ ...prev, [campo]: valor }));

  const submenusPessoas = useMemo(() => [
    ['todos', 'Ver todos'], 
    ['adicionar', 'Adicionar pessoa'],
    ['link_publico', 'Link de Autocadastro'],
    ['inativos', 'Membros Inativos'],
    ['aniversariantes', 'Aniversariantes'],
    ['cargo', 'Cargos'],
    ['zona', 'Zonas'],
    ['atuacao', 'Atuações'],
    ['relatorios', 'Relatórios']
  ].filter(([id, label]) => hasAccess('Pessoas', label)), [hasAccess]);

  const submenusCelulas = useMemo(() => [
    ['lista', 'Lista de células'], 
    ['adicionar', 'Nova célula'], 
    ['reunioes', 'Reuniões'], 
    ['relatorios', 'Relatórios']
  ].filter(([id, label]) => hasAccess('Células', label)), [hasAccess]);

  const submenusFinanceiro = useMemo(() => [
    ['resumo', 'Resumo'], 
    ['transacoes', 'Transações'], 
    ['relatorios', 'Relatórios financeiros'], 
    ['historico', 'Histórico'], 
    ['categorias', 'Categorias'], 
    ['contas', 'Contas/Caixas'],
    ['importar', 'Importar']
  ].filter(([id, label]) => hasAccess('Financeiro', label)), [hasAccess]);

  const submenusEscolas = useMemo(() => [
    ['resumo', 'Visão Geral'],
    ['cursos', 'Cursos'],
    ['turmas', 'Turmas'],
    ['disciplinas', 'Disciplinas'],
    ['professores', 'Professores'],
    ['alunos', 'Alunos'],
    ['aulas', 'Aulas'],
    ['avaliacoes', 'Avaliações'],
    ['ficha-aluno', 'Ficha do Aluno'], // Novo submenu para caderneta
    ['inscricoes', 'Inscrições Públicas'],
  ].filter(([id, label]) => hasAccess('Escolas', label)), [hasAccess]);

  const submenusAgenda = useMemo(() => [
    ['calendario', 'Calendário'],
    ['eventos', 'Eventos'],
  ].filter(([id, label]) => hasAccess('Agenda', label)), [hasAccess]);

  const submenusUtilitarios = useMemo(() => [
    ['escalas', 'Escalas Ministerial'], 
    ['relatorio-semanal', 'Relatório Semanal'],
    ['calculadora', 'Calculadora de Tributos'],
    ['quiz', 'Teste de Temperamento'],
    ['pedido-oracao', 'Pedido de Oração'],
    ['mural-oracao', 'Mural de Orações']
  ].filter(([id, label]) => hasAccess('Utilitários', label)), [hasAccess]);

  const obterDados = useCallback(async () => {
    setCarregando(true);
    try {
      const { data: dadosPessoas, error: erroPessoas } = await supabase
        .from('pessoas')
        .select('*, celulas(nome)')
        .order('nome', { ascending: true });
      if (erroPessoas) console.warn('Erro ao carregar pessoas:', erroPessoas);
      if (dadosPessoas) {
        setPessoas(dadosPessoas.filter((p) => normalizarTexto(p.status) !== 'excluido'));
      }

      const { data: dadosCargos, error: erroCargos } = await supabase.from('cargos').select('*').order('nome');
      if (erroCargos) console.warn('Erro ao carregar cargos:', erroCargos);
      if (dadosCargos) setCargosDisponiveis(dadosCargos);

      const { data: dadosAtuacoes, error: erroAtuacoes } = await supabase.from('atuacoes').select('*').order('nome');
      if (erroAtuacoes) console.warn('Tabela "atuacoes" não encontrada. Veja DATABASE_SCHEMA.md');
      if (dadosAtuacoes) setAtuacoesDisponiveis(dadosAtuacoes);

      const { data: dadosCelulas, error: erroCelulas } = await supabase.from('celulas').select('*').order('nome');
      if (erroCelulas) console.warn('Erro ao carregar células:', erroCelulas);
      if (dadosCelulas) setCelulas(dadosCelulas);

      const { data: dadosZonas, error: erroZonas } = await supabase.from('zonas_moradia').select('*').order('nome');
      if (erroZonas) console.warn('Tabela "zonas_moradia" não encontrada. Veja DATABASE_SCHEMA.md');
      if (dadosZonas) setZonas(dadosZonas);

      const { data: dadosRelatorios, error: erroRelatorios } = await supabase
        .from('relatorios_celula')
        .select('*, celulas(nome), presencas_relatorio(count)')
        .order('data_reuniao', { ascending: false });
      if (erroRelatorios) console.warn('Tabela "relatorios_celula" não encontrada. Veja DATABASE_SCHEMA.md');
      if (dadosRelatorios) setRelatoriosCelula(dadosRelatorios);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    if (!usuarioLogado) return undefined;
    const carregamentoInicial = window.setTimeout(() => obterDados(), 0);
    return () => window.clearTimeout(carregamentoInicial);
  }, [usuarioLogado, obterDados]);

  async function handleSair() {
    try { await supabase.auth.signOut(); } catch { /* ignora erro de rede */ }
    localStorage.removeItem('mibChurchSessao');
    setUsuarioLogado(null);
    setModuloAtual('dashboard');
  }

  function navegar(modulo, submenu = null) {
    setModuloAtual(modulo);
    setMenuAberto(false);
    // Limpa estados de seleção ao navegar para garantir que submenus abram corretamente
    // Isso evita que a ficha de um membro impeça a abertura de outra tela do mesmo módulo
    setMembroSelecionadoId(null);
    setCelulaSelecionadaId(null);
    
    if (submenu !== 'ficha-aluno') {
      setAlunoSelecionadoParaCadernetaId(null);
    }

    if (submenu) {
      if (modulo === 'pessoas') setPessoasSubmenu(submenu);
      if (modulo === 'celulas') setCelulasSubmenu(submenu);
      if (modulo === 'financeiro') setFinanceiroSubmenu(submenu);
      if (modulo === 'escolas') setEscolasSubmenu(submenu);
      if (modulo === 'agenda') setAgendaSubmenu(submenu);
      if (modulo === 'utilitarios') setUtilitariosSubmenu(submenu);
    }
  }

  function abrirPessoasFiltradas(novosFiltros) {
    setFiltros({ ...filtrosIniciais, ...novosFiltros });
    navegar('pessoas', 'todos');
  }

  function handleEntrar(usuario) {
    localStorage.setItem('mibChurchSessao', JSON.stringify(usuario));
    setUsuarioLogado(usuario);
  }

  // Verifica se a URL é para o formulário público e renderiza sem autenticação
  if (window.location.pathname === '/cadastro-publico') {
    return <PublicRegistrationForm />;
  }

  if (window.location.pathname.startsWith('/inscricao-evento/')) {
    return <PublicEventRegistration />;
  }

  // Se não há usuário logado, exibe tela de login
  if (!usuarioLogado) {
    console.log('Renderizando TelaLogin - nenhum usuário logado');
    return <TelaLogin onEntrar={handleEntrar} />;
  }
  console.log('Renderizando Dashboard - usuário logado:', usuarioLogado.email);
  return (
    <div className="min-h-screen bg-[var(--surface-muted)] font-sans text-[var(--text-primary)] antialiased">
      {/* ── TOPBAR FIXA — visível apenas em desktop (md+) ── */}
      <header className="hidden md:flex print:hidden fixed top-0 inset-x-0 z-50 h-14 bg-[#1e3a8a] border-b border-white/10 items-center px-4 gap-1 shadow-md">
        {/* Logo */}
        <button type="button" onClick={() => navegar('dashboard')} className="flex items-center gap-2.5 mr-4 shrink-0">
          <img src="/logo-mib-mundau.png" alt="Logo" className="h-8 w-14 object-contain bg-white rounded-md p-0.5" />
          <span className="font-bold text-white text-sm tracking-tight hidden lg:block">MIB Church</span>
        </button>

        {/* Nav items */}
        <nav className="flex items-center gap-1 flex-1">
          {/* Dashboard */}
          {hasAccess('Visão Geral') && (
          <TopNavBtn ativo={moduloAtual === 'dashboard'} onClick={() => navegar('dashboard')} icon={MenuIcons.dashboard}>
            Visão Geral
            <span className="ml-1.5 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{indicadores.totalPessoas}</span>
          </TopNavBtn>
          )}

          {/* Pessoas com dropdown (Ajuste as cores dos itens internos se necessário) */}
          {hasAccess('Pessoas') && (
          <TopNavDropdown
            icon={MenuIcons.pessoas}
            label={<>Pessoas <span className="ml-1 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{pessoas.length}</span></>}
            ativo={moduloAtual === 'pessoas'}
          >
            {submenusPessoas.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'pessoas' && pessoasSubmenu === id} onClick={() => navegar('pessoas', id)} icon={MenuIcons[submenuIconKey.pessoas[id]]}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>
          )}

          {/* Células com dropdown */}
          {hasAccess('Células') && (
          <TopNavDropdown
            icon={MenuIcons.celulas}
            label={<>Células <span className="ml-1 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{celulas.length}</span></>}
            ativo={moduloAtual === 'celulas'}
          >
            {submenusCelulas.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'celulas' && celulasSubmenu === id} onClick={() => navegar('celulas', id)} icon={MenuIcons[submenuIconKey.celulas[id]]}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>
          )}

          {/* Financeiro com dropdown */}
          {hasAccess('Financeiro') && (
          <TopNavDropdown
            icon={MenuIcons.financeiro}
            label="Financeiro"
            ativo={moduloAtual === 'financeiro'}
          >
            {submenusFinanceiro.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'financeiro' && financeiroSubmenu === id} onClick={() => navegar('financeiro', id)} icon={MenuIcons[submenuIconKey.financeiro[id]]}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>
          )}

          {/* Escolas com dropdown */}
          {hasAccess('Escolas') && (
          <TopNavDropdown
            icon={MenuIcons.escolas}
            label="Escolas"
            ativo={moduloAtual === 'escolas'}
          >
            {submenusEscolas.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'escolas' && escolasSubmenu === id} onClick={() => navegar('escolas', id)} icon={MenuIcons[submenuIconKey.escolas[id]]}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>
          )}

          {/* Agenda com dropdown */}
          {hasAccess('Agenda') && (
          <TopNavDropdown
            icon={MenuIcons.agenda}
            label="Agenda"
            ativo={moduloAtual === 'agenda'}
          >
            {submenusAgenda.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'agenda' && agendaSubmenu === id} onClick={() => navegar('agenda', id)} icon={MenuIcons[submenuIconKey.agenda[id]]}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>
          )}

          {/* Utilitários com dropdown */}
          {hasAccess('Utilitários') && (
          <TopNavDropdown
            icon={MenuIcons.utilitarios}
            label="Utilitários"
            ativo={moduloAtual === 'utilitarios'}
          >
            {submenusUtilitarios.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'utilitarios' && utilitariosSubmenu === id} onClick={() => navegar('utilitarios', id)} icon={MenuIcons[submenuIconKey.utilitarios[id]]}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>
          )}

          {hasAccess('Configurações') && (
          <TopNavBtn ativo={moduloAtual === 'configuracoes'} onClick={() => navegar('configuracoes')} icon={MenuIcons.configuracoes}>
            Configurações
          </TopNavBtn>
          )}
        </nav>

        {/* Avatar do usuário com dropdown */}
        <div className="shrink-0 ml-auto border-l border-slate-700/60 pl-4">
          <UserAvatarDropdown usuarioLogado={usuarioLogado} membroLogado={membroLogado} onSair={handleSair} />
        </div>
      </header>

      {/* ── SIDEBAR LATERAL — visível apenas no mobile ── */}
      <button
        type="button"
        onClick={() => setMenuAberto(true)}
        className="fixed left-4 top-3 z-40 md:hidden print:hidden rounded-xl bg-[#1e293b] px-3 py-2 text-sm font-bold text-white shadow-lg"
      >
        ☰
      </button>
      {menuAberto && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setMenuAberto(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 md:hidden print:hidden"
        />
      )}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-[#1e3a8a] to-[#1e40af] text-white flex flex-col border-r border-white/5 transition-transform duration-200 md:hidden print:hidden ${menuAberto ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-white/5 flex items-center gap-3">
          <img src="/logo-mib-mundau.png" alt="Logo" className="h-12 w-20 object-contain bg-white rounded-lg p-1" />
          <div>
            <h1 className="font-bold text-white text-base tracking-tight">MIB Church</h1>
            <p className="text-[10px] font-medium text-teal-200/70 uppercase tracking-wider">Gestão da Igreja</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-5 overflow-y-auto">
          {hasAccess('Visão Geral') && (
          <MenuButton ativo={moduloAtual === 'dashboard'} onClick={() => navegar('dashboard')} contador={indicadores.totalPessoas} icon={MenuIcons.dashboard}>
            Visão Geral
          </MenuButton>
          )}
          
          {hasAccess('Pessoas') && (
          <div>
            <MenuButton ativo={moduloAtual === 'pessoas'} onClick={() => navegar('pessoas', 'todos')} contador={pessoas.length} icon={MenuIcons.pessoas}>
              Pessoas
            </MenuButton>
            {moduloAtual === 'pessoas' && (
              <div className="mt-2 ml-2 pl-3 border-l border-white/20 space-y-1">
                {submenusPessoas.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navegar('pessoas', id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${pessoasSubmenu === id ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          )}

          {hasAccess('Células') && (
          <div>
            <MenuButton ativo={moduloAtual === 'celulas'} onClick={() => navegar('celulas', 'lista')} contador={celulas.length} icon={MenuIcons.celulas}>
              Células
            </MenuButton>
            {moduloAtual === 'celulas' && (
              <div className="mt-2 ml-2 pl-3 border-l border-white/20 space-y-1">
                {submenusCelulas.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navegar('celulas', id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${celulasSubmenu === id ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          )}

          {hasAccess('Financeiro') && (
          <div>
            <MenuButton ativo={moduloAtual === 'financeiro'} onClick={() => navegar('financeiro', 'resumo')} icon={MenuIcons.financeiro}>
              Financeiro
            </MenuButton>
            {moduloAtual === 'financeiro' && (
              <div className="mt-2 ml-2 pl-3 border-l border-white/20 space-y-1">
                {submenusFinanceiro.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navegar('financeiro', id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${financeiroSubmenu === id ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          )}

          {hasAccess('Escolas') && (
          <div>
            <MenuButton ativo={moduloAtual === 'escolas'} onClick={() => navegar('escolas', 'resumo')} icon={MenuIcons.escolas}>
              Escolas
            </MenuButton>
            {moduloAtual === 'escolas' && (
              <div className="mt-2 ml-2 pl-3 border-l border-white/20 space-y-1">
                {submenusEscolas.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navegar('escolas', id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${escolasSubmenu === id ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          )}

          {hasAccess('Agenda') && (
          <div>
            <MenuButton ativo={moduloAtual === 'agenda'} onClick={() => navegar('agenda', 'calendario')} icon={MenuIcons.agenda}>
              Agenda
            </MenuButton>
            {moduloAtual === 'agenda' && (
              <div className="mt-2 ml-2 pl-3 border-l border-white/20 space-y-1">
                {submenusAgenda.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navegar('agenda', id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${agendaSubmenu === id ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          )}

          {hasAccess('Utilitários') && (
          <div>
            <MenuButton ativo={moduloAtual === 'utilitarios'} onClick={() => navegar('utilitarios', 'escalas')} icon={MenuIcons.utilitarios}>
              Utilitários
            </MenuButton>
            {moduloAtual === 'utilitarios' && (
              <div className="mt-2 ml-2 pl-3 border-l border-white/20 space-y-1">
                {submenusUtilitarios.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navegar('utilitarios', id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${utilitariosSubmenu === id ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          )}

          {hasAccess('Configurações') && (
          <MenuButton ativo={moduloAtual === 'configuracoes'} onClick={() => navegar('configuracoes')} icon={MenuIcons.configuracoes}>Configurações</MenuButton>
          )}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <UserAvatarImg usuarioLogado={usuarioLogado} membroLogado={membroLogado} tamanho="w-9 h-9" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{membroLogado?.nome || usuarioLogado?.nome || usuarioLogado?.user_metadata?.nome || usuarioLogado?.email?.split('@')[0] || 'Usuário'}</p>
              <p className="text-[10px] text-slate-400 truncate">{usuarioLogado?.email || 'Sem e-mail'}</p>
            </div>
          </div>
          <button type="button" onClick={handleSair} className="w-full px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition">
            Sair
          </button>
        </div>
      </aside>

      {/* ── CONTEÚDO PRINCIPAL — offset do topbar no desktop ── */}
      <main className="min-w-0 p-4 sm:p-6 lg:px-10 lg:py-16 pt-20">
        {moduloAtual === 'dashboard' && (
          <Dashboard
            pessoas={pessoas}
            celulas={celulas}
            zonas={zonas}
            relatoriosCelula={relatoriosCelula}
            indicadores={indicadores}
            carregando={carregando}
            periodoConvertidos={periodoConvertidos}
            setPeriodoConvertidos={setPeriodoConvertidos}
          />
        )}

        {moduloAtual === 'pessoas' && (
          <PessoasModulo
            submenu={pessoasSubmenu}
            pessoas={pessoas}
            pessoasFiltradas={pessoasFiltradas}
            filtros={filtros}
            alterarFiltro={alterarFiltro}
            limparFiltros={() => setFiltros(filtrosIniciais)}
            zonas={zonas}
            cargosDisponiveis={cargosDisponiveis}
            atuacoesDisponiveis={atuacoesDisponiveis}
            escolaridadesDisponiveis={escolaridadesDisponiveis}
            carregando={carregando}
            membroSelecionadoId={membroSelecionadoId}
            setMembroSelecionadoId={setMembroSelecionadoId}
            setSubmenu={setPessoasSubmenu}
            obterDados={obterDados}
            onNavigate={(sub) => navegar('pessoas', sub)}
            abrirPessoasFiltradas={abrirPessoasFiltradas}
            membroLogado={membroLogado}
          />
        )}

        {moduloAtual === 'celulas' && (
          <CelulasModulo
            submenu={celulasSubmenu}
            celulas={celulas}
            celulasFiltradas={celulasFiltradas}
            filtrosCelula={filtrosCelula} // Passa o estado de filtros
            alterarFiltroCelula={alterarFiltroCelula} // Passa a função para alterar filtros
            limparFiltros={() => setFiltrosCelula(filtrosCelulaIniciais)} // Passa a função para limpar filtros
            pessoas={pessoas}
            zonas={zonas}
            relatoriosCelula={relatoriosCelula}
            celulaSelecionadaId={celulaSelecionadaId} // Passa o ID da célula selecionada
            setCelulaSelecionadaId={setCelulaSelecionadaId} // Passa a função para definir a célula selecionada
            obterDados={obterDados} // Passa a função para recarregar dados
            onNavigate={(sub) => navegar('celulas', sub)}
            membroLogado={membroLogado}
          />
        )}

        {moduloAtual === 'financeiro' && <ModuloFinanceiro meses={meses} submenu={financeiroSubmenu} usuarioLogado={usuarioLogado} />}

        {moduloAtual === 'escolas' && escolasSubmenu !== 'ficha-aluno' && (
          <EscolasModulo 
            submenu={escolasSubmenu} 
            onNavigate={(sub) => navegar('escolas', sub)} 
            pessoas={pessoas} 
            alunoSelecionadoParaCadernetaId={alunoSelecionadoParaCadernetaId} // Passa o ID do aluno
            setAlunoSelecionadoParaCadernetaId={setAlunoSelecionadoParaCadernetaId} // Passa o setter
            membroLogado={membroLogado}
          />
        )}

        {moduloAtual === 'escolas' && escolasSubmenu === 'ficha-aluno' && alunoSelecionadoParaCadernetaId && (
          <div className="escolas-root">
            <style>{`
              .escolas-root, .escolas-root * { 
                font-family: 'Segoe UI', system-ui, -apple-system, sans-serif !important; 
                -webkit-font-smoothing: antialiased;
              }
              /* Ajusta o peso das abas da ficha para Segoe Black */
              .escolas-root .tab-btn { font-weight: 900 !important; }
            `}</style>
          <DetalhesMembro
            pessoaId={alunoSelecionadoParaCadernetaId}
            onFechar={() => navegar('escolas', 'turmas')} // Volta para a lista de turmas ou alunos
            listaPessoas={pessoas}
            onDadosAtualizados={obterDados}
            isStudentCadernetaView={true} // Indica que é a visão de caderneta do aluno
            membroLogado={membroLogado}
          />
          </div>
        )}

        {moduloAtual === 'agenda' && (
          <AgendaModulo
            submenu={agendaSubmenu}
            onNavigate={(sub) => navegar('agenda', sub)}
            membroLogado={membroLogado}
            pessoas={pessoas}
          />
        )}

        {moduloAtual === 'utilitarios' && (
          <ModuloUtilitarios 
            submenu={utilitariosSubmenu} 
            onNavigate={(sub) => navegar('utilitarios', sub)}
            usuarioLogado={usuarioLogado}
            membroLogado={membroLogado}
          />
        )}

        {moduloAtual === 'configuracoes' && <TelaConfiguracoes onFechar={() => navegar('dashboard')} />}
      </main>
    </div>
  );
}

/* ── Avatar e Dropdown do usuário logado ── */

function UserAvatarImg({ usuarioLogado, membroLogado, tamanho = 'w-8 h-8' }) {
  const email = usuarioLogado?.email || '';
  const meta = usuarioLogado?.user_metadata || {};
  // Tenta obter o nome de várias fontes, caindo no prefixo do email antes de um fallback genérico
  const nome = membroLogado?.nome || usuarioLogado?.nome || meta.nome || meta.full_name || email.split('@')[0] || '?';
  const inicial = nome.charAt(0).toUpperCase();
  // Busca a URL da foto em campos comuns do metadado do Supabase
  const fotoUrl = membroLogado?.foto_url || usuarioLogado?.foto_url || meta.foto_url || meta.avatar_url || null;

  if (fotoUrl) {
    return (
      <img
        src={fotoUrl}
        alt={nome}
        className={`${tamanho} rounded-full object-cover ring-2 ring-white/20 shrink-0`}
      />
    );
  }

  // Gera cor determinística baseada no email
  const hash = email.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const cores = [
    ['bg-[#055F6D]', 'text-white'],
    ['bg-violet-600', 'text-white'],
    ['bg-amber-500', 'text-white'],
    ['bg-rose-500', 'text-white'],
    ['bg-emerald-600', 'text-white'],
    ['bg-sky-600', 'text-white'],
  ];
  const [bg, fg] = cores[hash % cores.length];

  return (
    <div className={`${tamanho} ${bg} rounded-full flex items-center justify-center shrink-0 ring-2 ring-white/20`}>
      <span className={`text-xs font-bold ${fg}`}>{inicial}</span>
    </div>
  );
}

function UserAvatarDropdown({ usuarioLogado, membroLogado, onSair }) {
  const [aberto, setAberto] = useState(false);
  const meta = usuarioLogado?.user_metadata || {};

  const email = usuarioLogado?.email || '';
  // Prioriza o nome real para exibição principal
  const nome = membroLogado?.nome || usuarioLogado?.nome || meta.nome || meta.full_name || email.split('@')[0] || 'Usuário';
  const perfilNome = meta.permissao || usuarioLogado?.perfil?.nome || 'Membro';
  const perfilDescricao = usuarioLogado?.perfil?.descricao || '';

  return (
    <div className="relative" onMouseEnter={() => setAberto(true)} onMouseLeave={() => setAberto(false)}>
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className="flex items-center gap-2 rounded-xl p-1 hover:bg-white/10 transition duration-150 group"
        aria-label="Menu do usuário"
      >
        <UserAvatarImg usuarioLogado={usuarioLogado} membroLogado={membroLogado} tamanho="w-8 h-8" />
        <svg
          className={`w-3 h-3 text-slate-400 group-hover:text-slate-200 transition-transform duration-200 ${aberto ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {aberto && (
        <div className="absolute right-0 top-full w-72 bg-[#1e3a8a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
          {/* Cabeçalho do dropdown */}
          <div className="p-4 border-b border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <div className="flex items-center gap-3">
              <UserAvatarImg usuarioLogado={usuarioLogado} membroLogado={membroLogado} tamanho="w-12 h-12" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight truncate">{nome}</p>
                <p className="text-[11px] text-slate-300 truncate mt-0.5">{email}</p>
                <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-white/10 border border-white/20 text-[10px] font-semibold text-blue-200 uppercase tracking-wider">
                  {perfilNome}
                </span>
              </div>
            </div>
            {perfilDescricao && (
              <p className="mt-3 text-[10px] text-slate-500 leading-relaxed border-t border-slate-700/40 pt-2.5">
                {perfilDescricao}
              </p>
            )}
          </div>

          {/* Ação de sair */}
          <div className="p-2">
            <button
              type="button"
              onClick={() => { setAberto(false); onSair(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 text-xs font-semibold transition duration-150 group"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sair da conta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Componentes da topbar ── */
function TopNavBtn({ ativo, onClick, icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
        ativo ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
      }`}
    >
      {icon && <span className="opacity-80">{icon}</span>}
      {children}
    </button>
  );
}

function TopNavDropdown({ label, ativo, icon, children }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setAberto(true)} onMouseLeave={() => setAberto(false)}>
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
          ativo ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
        }`}
      >
        {icon && <span className="opacity-80">{icon}</span>}{label}
      </button>
      {aberto && (
        <div className="absolute left-0 top-full w-52 bg-[#1e3a8a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 py-1" onClick={() => setAberto(false)}>
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ ativo, onClick, icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-3 py-2 text-xs font-semibold transition cursor-pointer flex items-center gap-2.5 ${
        ativo ? 'bg-[#2563eb] text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
      }`}
    >
      {icon && <span className={`shrink-0 ${ativo ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'}`}>{icon}</span>}
      {children}
    </button>
  );
}

function MenuButton({ ativo, onClick, contador, icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
        ativo ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
      }`}
    >
      <span className="flex items-center gap-2.5">
        {icon && <span className={`shrink-0 ${ativo ? 'opacity-90' : 'opacity-60'}`}>{icon}</span>}
        {children}
      </span>
      {contador !== undefined && (
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${ativo ? 'bg-slate-200 text-slate-700' : 'bg-slate-900 text-slate-500'}`}>
          {contador}
        </span>
      )}
    </button>
  );
}
