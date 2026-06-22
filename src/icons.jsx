import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Network, 
  DollarSign, 
  BookOpen, 
  Calendar, 
  Compass, 
  Settings, 
  ShieldAlert,
  PlusCircle,
  Link,
  UserMinus,
  Gift,
  Award,
  MapPin,
  Activity,
  BarChart3,
  ClipboardList,
  CalendarDays,
  Receipt,
  Clock,
  Layers,
  Landmark,
  Import,
  GraduationCap,
  FileText,
  UserCheck,
  ClipboardPlus,
  FileSpreadsheet,
  QrCode,
  Calculator,
  Brain,
  Heart,
  MessageSquare
} from 'lucide-react';

export const MenuIcons = {
  // Menu principal
  dashboard: <LayoutDashboard className="w-4 h-4 shrink-0" strokeWidth={1.8} />,
  pessoas: <Users className="w-4 h-4 shrink-0" strokeWidth={1.8} />,
  celulas: <Network className="w-4 h-4 shrink-0" strokeWidth={1.8} />,
  financeiro: <DollarSign className="w-4 h-4 shrink-0" strokeWidth={1.8} />,
  escolas: <BookOpen className="w-4 h-4 shrink-0" strokeWidth={1.8} />,
  agenda: <Calendar className="w-4 h-4 shrink-0" strokeWidth={1.8} />,
  utilitarios: <Compass className="w-4 h-4 shrink-0" strokeWidth={1.8} />,
  configuracoes: <Settings className="w-4 h-4 shrink-0" strokeWidth={1.8} />,
  gestaoMinisterial: <ShieldAlert className="w-4 h-4 shrink-0" strokeWidth={1.8} />,

  // Submenus Pessoas
  'p-todos': <Users className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'p-adicionar': <PlusCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'p-link_publico': <Link className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'p-inativos': <UserMinus className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'p-aniversariantes': <Gift className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'p-cargo': <Award className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'p-zona': <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'p-atuacao': <Activity className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'p-relatorios': <BarChart3 className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,

  // Submenus Células
  'c-lista': <ClipboardList className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'c-adicionar': <PlusCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'c-reunioes': <CalendarDays className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'c-relatorios': <BarChart3 className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,

  // Submenus Financeiro
  'f-resumo': <LayoutDashboard className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'f-transacoes': <Receipt className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'f-relatorios': <BarChart3 className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'f-historico': <Clock className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'f-categorias': <Layers className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'f-contas': <Landmark className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'f-importar': <Import className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,

  // Submenus Escolas
  'e-resumo': <LayoutDashboard className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'e-cursos': <GraduationCap className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'e-turmas': <Users className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'e-disciplinas': <FileText className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'e-professores': <UserCheck className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'e-alunos': <Users className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'e-aulas': <CalendarDays className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'e-avaliacoes': <ClipboardPlus className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'e-ficha-aluno': <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'e-inscricoes': <ClipboardList className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,

  // Submenus Utilitários
  'u-leitor-carne': <QrCode className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'u-calculadora': <Calculator className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'u-resumo': <LayoutDashboard className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'u-escalas': <CalendarDays className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'u-relatorio-semanal': <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'u-carne-generator': <Receipt className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'u-quiz': <Brain className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'u-pedido-oracao': <Heart className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'u-mural-oracao': <MessageSquare className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,

  // Submenus Agenda
  'a-calendario': <Calendar className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'a-eventos': <CalendarDays className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
  'a-mural': <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />,
};

// Mapa de submenus → chave de ícone
export const submenuIconKey = {
  pessoas: { todos: 'p-todos', adicionar: 'p-adicionar', link_publico: 'p-link_publico', inativos: 'p-inativos', aniversariantes: 'p-aniversariantes', cargo: 'p-cargo', zona: 'p-zona', atuacao: 'p-atuacao', relatorios: 'p-relatorios' },
  celulas:  { lista: 'c-lista', adicionar: 'c-adicionar', reunioes: 'c-reunioes', relatorios: 'c-relatorios' },
  financeiro: { resumo: 'f-resumo', transacoes: 'f-transacoes', relatorios: 'f-relatorios', historico: 'f-historico', categorias: 'f-categorias', contas: 'f-contas', importar: 'f-importar' },
  escolas: { resumo: 'e-resumo', cursos: 'e-cursos', turmas: 'e-turmas', disciplinas: 'e-disciplinas', professores: 'e-professores', alunos: 'e-alunos', aulas: 'e-aulas', avaliacoes: 'e-avaliacoes', 'ficha-aluno': 'e-ficha-aluno', inscricoes: 'e-inscricoes' },
  gestao: { dashboard: 'e-resumo', equipes: 'p-todos', escalas: 'a-calendario', historico: 'f-historico', relatorios: 'e-avaliacoes', config: 'configuracoes' },
  agenda: { calendario: 'a-calendario', eventos: 'a-eventos', mural: 'a-mural' },
  utilitarios: { 
    resumo: 'u-resumo', escalas: 'u-escalas', 'relatorio-semanal': 'u-relatorio-semanal', calculadora: 'u-calculadora',
    quiz: 'u-quiz', 'pedido-oracao': 'u-pedido-oracao', 'mural-oracao': 'u-mural-oracao'
    , 'carne-generator': 'u-carne-generator', 'leitor-carne': 'u-leitor-carne'
  },
};