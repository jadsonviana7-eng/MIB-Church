import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// Output path
const outputPath = 'd:/Workflow/MIB Church/Apostila_Completa_MIB_Church.pdf';

console.log('Iniciando geração da Apostila Completa e Detalhada do MIB Church...');

// Create PDF document
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 54, bottom: 54, left: 54, right: 54 },
  bufferPages: true,
  autoFirstPage: true
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Color Palette
const COLORS = {
  primary: '#1e3a8a',      // Blue 900
  secondary: '#2563eb',    // Blue 600
  accent: '#7c3aed',       // Purple 600
  emerald: '#059669',      // Emerald 600
  dark: '#0f172a',         // Slate 900
  body: '#334155',         // Slate 700
  lightBg: '#f8fafc',      // Slate 50
  cardBg: '#f1f5f9',       // Slate 100
  border: '#cbd5e1',       // Slate 300
  gold: '#d97706',         // Amber 600
  white: '#ffffff'
};

// --- CAPA (PAGE 1) ---
doc.rect(0, 0, 595.28, 841.89).fill('#0f172a');

// Outer Frame
doc.roundedRect(25, 25, 545.28, 791.89, 16)
   .lineWidth(1.5)
   .stroke('#334155');

// Top Accent Ribbon
doc.roundedRect(45, 55, 505.28, 8, 4).fill('#2563eb');

// Main Title
doc.fillColor('#ffffff')
   .font('Helvetica-Bold')
   .fontSize(34)
   .text('MIB CHURCH', 55, 95, { align: 'center', characterSpacing: 2 });

doc.fillColor('#93c5fd')
   .font('Helvetica-Bold')
   .fontSize(15)
   .text('APOSTILA COMPLETA DE TREINAMENTO E MANUAL DO USUÁRIO', 55, 140, { align: 'center', characterSpacing: 1 });

doc.moveTo(120, 168).lineTo(475, 168).lineWidth(1.5).stroke('#3b82f6');

doc.fillColor('#cbd5e1')
   .font('Helvetica')
   .fontSize(11)
   .text('Documentação Técnica, Operacional e Guia Prático de Todos os Módulos do Sistema', 55, 185, { align: 'center' });

// Center Box / Summary Card
doc.roundedRect(60, 235, 475.28, 360, 16)
   .fillAndStroke('#1e293b', '#2563eb');

doc.fillColor('#60a5fa')
   .font('Helvetica-Bold')
   .fontSize(13)
   .text('SUMÁRIO DOS MÓDULOS E CONTEÚDOS INCLUÍDOS', 75, 255, { align: 'center', characterSpacing: 1 });

const capaModules = [
  { icon: '❖', text: 'Módulo 1: Visão Geral e Dashboard Central de Indicadores' },
  { icon: '❖', text: 'Módulo 2: Pessoas, Membresia e Formulário Público de Autocadastro' },
  { icon: '❖', text: 'Módulo 3: Gestão de Células, Supervisão e Relatórios Semanais' },
  { icon: '❖', text: 'Módulo 4: Gestão Financeira, Dízimos, Ofertas e Carnês com QR Code' },
  { icon: '❖', text: 'Módulo 5: Escolas Teológicas, Turmas, Disciplinas e Indicação de Líderes' },
  { icon: '❖', text: 'Módulo 6: Gestor Ministerial (Ministérios, Equipes e Funções)' },
  { icon: '❖', text: 'Módulo 7: Escalas Ministeriais, Gerador Mensal e Cartão Gráfico PNG' },
  { icon: '❖', text: 'Módulo 8: Agenda, Eventos Públicos e Check-in por QR Code' },
  { icon: '❖', text: 'Módulo 9: Módulo Espiritual, Pedidos de Oração e Teste de Temperamentos' },
  { icon: '❖', text: 'Módulo 10: Matriz de Permissões RLS e Regra Especial de Escalar' },
  { icon: '❖', text: 'Módulo 11: Guia Prático de Solução de Problemas (Troubleshooting)' }
];

let cY = 288;
capaModules.forEach(m => {
  doc.fillColor('#38bdf8').font('Helvetica-Bold').fontSize(10).text(m.icon, 80, cY);
  doc.fillColor('#f8fafc').font('Helvetica').fontSize(10).text(m.text, 98, cY);
  cY += 26;
});

// Author Box
doc.roundedRect(60, 620, 475.28, 150, 14)
   .fillAndStroke('#0284c7', '#0369a1');

doc.fillColor('#e0f2fe')
   .font('Helvetica-Bold')
   .fontSize(10)
   .text('ATRIBUIÇÃO DE AUTORIA E RESPONSABILIDADE TÉCNICA', 70, 640, { align: 'center', characterSpacing: 1 });

doc.fillColor('#ffffff')
   .font('Helvetica-Bold')
   .fontSize(22)
   .text('Jadson da Silva Viana', 70, 662, { align: 'center' });

doc.fillColor('#f0f9ff')
   .font('Helvetica')
   .fontSize(11)
   .text('Desenvolvedor & Arquiteto da Plataforma MIB Church', 70, 692, { align: 'center' });

doc.fillColor('#bae6fd')
   .font('Helvetica')
   .fontSize(9.5)
   .text('Edição Oficial · Agosto de 2026 · Todos os Direitos Reservados', 70, 725, { align: 'center' });


// --- HELPER FUNCTIONS FOR CONTENT PAGES ---
function addPageHeader(doc, title = 'MIB CHURCH — MANUAL COMPLETO') {
  doc.addPage();
  
  // Top Banner Bar
  doc.rect(0, 0, 595.28, 42).fill(COLORS.primary);
  doc.fillColor(COLORS.white)
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text(title.toUpperCase(), 54, 15, { characterSpacing: 1 });
  
  doc.fillColor('#93c5fd')
     .font('Helvetica-Bold')
     .fontSize(8.5)
     .text('AUTOR: JADSON DA SILVA VIANA', 320, 16, { align: 'right' });
  
  doc.y = 56;
}

function addSectionHeader(doc, number, title) {
  if (doc.y > 660) {
    addPageHeader(doc);
  } else {
    doc.moveDown(1);
  }
  
  const curY = doc.y;
  doc.roundedRect(54, curY, 487.28, 30, 6).fill(COLORS.primary);
  doc.fillColor(COLORS.white)
     .font('Helvetica-Bold')
     .fontSize(11.5)
     .text(`MÓDULO ${number}: ${title.toUpperCase()}`, 66, curY + 8);
  
  doc.y = curY + 40;
}

function addSubSectionHeader(doc, title) {
  if (doc.y > 690) {
    addPageHeader(doc);
  } else {
    doc.moveDown(0.6);
  }
  
  doc.fillColor(COLORS.secondary)
     .font('Helvetica-Bold')
     .fontSize(11)
     .text(title);
  
  doc.moveTo(54, doc.y + 2).lineTo(541.28, doc.y + 2).lineWidth(1).stroke(COLORS.border);
  doc.moveDown(0.4);
}

function addParagraph(doc, text) {
  if (doc.y > 715) {
    addPageHeader(doc);
  }
  doc.fillColor(COLORS.body)
     .font('Helvetica')
     .fontSize(9.5)
     .text(text, { align: 'justify', lineGap: 3 });
  doc.moveDown(0.4);
}

function addBullet(doc, boldLabel, text) {
  if (doc.y > 715) {
    addPageHeader(doc);
  }
  doc.fillColor(COLORS.dark)
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text(`• ${boldLabel}: `, { continued: true });
  
  doc.fillColor(COLORS.body)
     .font('Helvetica')
     .text(text, { align: 'justify', lineGap: 2 });
  doc.moveDown(0.3);
}

function addNoticeBox(doc, title, text, style = 'info') {
  if (doc.y > 660) {
    addPageHeader(doc);
  }
  const isWarn = style === 'warning';
  const bg = isWarn ? '#fffbebf0' : '#eff6fff0';
  const border = isWarn ? '#f59e0b' : '#3b82f6';
  const tColor = isWarn ? '#92400e' : '#1e40af';
  
  const sY = doc.y;
  const height = 44 + (Math.ceil(text.length / 85) * 12);
  
  doc.roundedRect(54, sY, 487.28, height, 8)
     .fillAndStroke(bg, border);
  
  doc.fillColor(tColor)
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text(title, 68, sY + 9);
  
  doc.fillColor(COLORS.body)
     .font('Helvetica')
     .fontSize(9)
     .text(text, 68, sY + 24, { width: 459, align: 'justify', lineGap: 2 });
  
  doc.y = sY + height + 10;
}

// --- PAGE 2: APRESENTAÇÃO E SUMÁRIO ---
addPageHeader(doc, 'MIB CHURCH — APRESENTAÇÃO E SUMÁRIO');

doc.fillColor(COLORS.primary)
   .font('Helvetica-Bold')
   .fontSize(15)
   .text('1. APRESENTAÇÃO INSTITUCIONAL E FICHA TÉCNICA');

doc.moveDown(0.3);

addParagraph(doc, 'O sistema MIB Church é uma solução completa de gestão eclesiástica desenvolvida para informatizar, padronizar e dinamizar a administração da igreja. Integrando tecnologias modernas como React 19, Supabase RLS, Vite e TailwindCSS, o sistema atende desde o acompanhamento pessoal do membro até a gestão financeira analítica e automação de escalas ministeriais.');

addNoticeBox(doc, '📌 DECLARAÇÃO DE AUTORIA E PROPRIEDADE INTELECTUAL',
  'Esta apostila e o desenvolvimento integral da plataforma MIB Church possuem autoria oficialmente atribuída a Jadson da Silva Viana. Todo o projeto de arquitetura de software, design de experiência (UI/UX), regras de negócio ministeriais e sistema de permissões RLS foram criados e consolidados sob sua autoria técnica.', 'info');

doc.moveDown(0.4);

doc.fillColor(COLORS.primary)
   .font('Helvetica-Bold')
   .fontSize(14)
   .text('2. SUMÁRIO COMPLETO DO MANUAL');

doc.moveTo(54, doc.y + 2).lineTo(541.28, doc.y + 2).lineWidth(1.2).stroke(COLORS.primary);
doc.moveDown(0.6);

const tocList = [
  { n: 'Módulo 1', t: 'Visão Geral da Plataforma e Dashboard Central' },
  { n: 'Módulo 2', t: 'Pessoas, Diretório de Membros e Autocadastro Público' },
  { n: 'Módulo 3', t: 'Gestão de Células, Supervisão e Relatórios Semanais' },
  { n: 'Módulo 4', t: 'Gestão Financeira, Dízimos, Contas e Carnês com QR Code' },
  { n: 'Módulo 5', t: 'Escolas Teológicas, Turmas, Provas e Indicação de Líderes' },
  { n: 'Módulo 6', t: 'Gestor Ministerial: Departamentos, Equipes e Funções' },
  { n: 'Módulo 7', t: 'Escalas Ministeriais, Gerador Mensal e Cartão PNG para Redes' },
  { n: 'Módulo 8', t: 'Agenda de Eventos, Inscrições e Check-in por QR Code' },
  { n: 'Módulo 9', t: 'Mural de Oração, Teste de Temperamento e Utilitários' },
  { n: 'Módulo 10', t: 'Matriz de Permissões, Perfis RLS e Regra Especial de Escalar' },
  { n: 'Módulo 11', t: 'Guia de Solução de Problemas e Boas Práticas (Troubleshooting)' }
];

tocList.forEach(item => {
  const cY = doc.y;
  doc.fillColor(COLORS.primary).font('Helvetica-Bold').fontSize(9.5).text(item.n, 60, cY);
  doc.fillColor(COLORS.dark).font('Helvetica').fontSize(9.5).text(item.t, 140, cY);
  doc.moveDown(0.45);
});


// --- MÓDULO 1 ---
addSectionHeader(doc, '1', 'Visão Geral da Plataforma e Dashboard Central');

addParagraph(doc, 'O Dashboard Central é a tela inicial do MIB Church após a autenticação do usuário. Ele condensa as informações estratégicas da igreja em indicadores visuais intuitivos e gráficos interativos.');

addSubSectionHeader(doc, '1.1 Indicadores Demográficos e Estatísticas');
addBullet(doc, 'Total de Membros Ativos', 'Exibe a quantidade consolidada de pessoas cadastradas com status ativo no banco de dados.');
addBullet(doc, 'Censo de Gênero', 'Distribuição percentual e absoluta de membros do sexo masculino e feminino, representada por cartões visuais.');
addBullet(doc, 'Aniversariantes do Mês', 'Lista em tempo real dos membros que fazem aniversário no mês atual, organizada cronologicamente para facilitar felicitações e homenagens.');
addBullet(doc, 'Painel Celular', 'Resumo gráfico contendo o total de células cadastradas, média de presença semanal e taxa de visitantes.');

addSubSectionHeader(doc, '1.2 Personalização por Perfil de Acesso');
addParagraph(doc, 'O Dashboard se molda automaticamente de acordo com o perfil da conta logada. Pastores visualizam dados gerais; Tesoureiros visualizam resumos financeiros; Líderes de Célula acompanham suas reuniões; e Membros visualizam suas escalas e avisos.');


// --- MÓDULO 2 ---
addSectionHeader(doc, '2', 'Pessoas, Diretório de Membros e Autocadastro Público');

addParagraph(doc, 'O Módulo de Pessoas gerencia todo o ciclo de vida dos membros, congregados e visitantes da igreja, garantindo a integridade dos dados e o histórico individual de cada pessoa.');

addSubSectionHeader(doc, '2.1 Ficha do Membro e Cadastro Detalhado');
addBullet(doc, 'Dados Pessoais', 'Nome completo, CPF, RG, data de nascimento, estado civil, gênero, telefone/WhatsApp, e-mail e endereço.');
addBullet(doc, 'Recorte de Foto de Perfil', 'Ferramenta visual de corte em tempo real (React Easy Crop) que ajusta as fotos no formato circular ideal para a ficha.');
addBullet(doc, 'Vínculo Espiritual e Eclesiástico', 'Cargo (Membro, Líder, Diácono, Presbítero, Pastor), data de batismo, batismo no Espírito Santo e célula pertencente.');
addBullet(doc, 'Histórico de Atuações', 'Registro de todos os cargos, ministérios e funções em que a pessoa atua ou já atuou na igreja.');

addSubSectionHeader(doc, '2.2 Formulário Público de Autocadastro');
addParagraph(doc, 'A plataforma dispõe de uma página pública responsiva (`/cadastro-publico`) acessível via QR Code ou link direto. Novos membros e visitantes podem preencher seus próprios dados pelo celular. Após o envio, o cadastro fica disponível para validação da Secretaria.');


// --- MÓDULO 3 ---
addSectionHeader(doc, '3', 'Gestão de Células, Supervisão e Relatórios Semanais');

addParagraph(doc, 'O Módulo de Células estrutura o acompanhamento dos grupos pequenos da igreja, descentralizando o cuidado pastoral e viabilizando relatórios precisos.');

addSubSectionHeader(doc, '3.1 Estrutura Celular');
addBullet(doc, 'Dados da Célula', 'Nome da célula, dia da semana, horário, endereço da reunião e zona de moradia.');
addBullet(doc, 'Liderança e Membros', 'Definição do Líder Principal, Co-líder e vinculação dos participantes da célula.');

addSubSectionHeader(doc, '3.2 Lançamento de Reuniões Semanais');
addBullet(doc, 'Chamada e Presença', 'O líder realiza a chamada marcando presença dos membros cadastrados e indicando o número de visitantes.');
addBullet(doc, 'Oferta e Estudo', 'Registro do valor da oferta arrecadada na célula e o tema do estudo ministrado.');
addBullet(doc, 'Relatório Semanal de Célula', 'Painel analítico para supervisores e pastores acompanharem o crescimento e a assiduidade semanal.');


// --- MÓDULO 4 ---
addSectionHeader(doc, '4', 'Gestão Financeira, Dízimos, Contas e Carnês com QR Code');

addParagraph(doc, 'O Módulo Financeiro assegura transparência, rigor orçamentário e automação dos registros de receitas e despesas da igreja.');

addSubSectionHeader(doc, '4.1 Lançamentos e Controle Orçamentário');
addBullet(doc, 'Receitas', 'Lançamento de Dízimos, Ofertas, Contribuições de Eventos e Ofertas de Célula vinculadas a membros ou anônimas.');
addBullet(doc, 'Despesas', 'Registro de contas a pagar, compras, manutenção, fornecedores e ajuda de custo.');
addBullet(doc, 'Categorias e Contas/Caixas', 'Classificação detalhada em plano de contas (Ex: Manutenção, Missões, Aluguel) e vinculação às contas bancárias ou caixas físicos.');

addSubSectionHeader(doc, '4.2 Gerador de Carnês com QR Code e Leitor Digital');
addParagraph(doc, 'O sistema permite gerar e imprimir carnês anuais de contribuição com QR Code individual para cada parcela. Na secretaria ou tesouraria, o leitor de QR Code integrado utiliza a câmera do dispositivo para dar baixa instantânea nos pagamentos efetuados.');


// --- MÓDULO 5 ---
addSectionHeader(doc, '5', 'Escolas Teológicas, Turmas, Provas e Indicação de Líderes');

addParagraph(doc, 'O Módulo de Escolas administra todo o ecossistema educacional da igreja (Escola de Líderes, Maturidade Cristã, Batismo, Teologia, etc.).');

addSubSectionHeader(doc, '5.1 Gestão de Cursos e Turmas');
addBullet(doc, 'Cursos e Disciplinas', 'Cadastro de matérias, grade curricular, carga horária e corpo docente.');
addBullet(doc, 'Diário de Classe e Faltas', 'Controle de frequência aula a aula com alertas automáticos para alunos com excesso de faltas.');
addBullet(doc, 'Avaliações e Notas', 'Lançamento de trabalhos, provas e boletim com cálculo automático da média final.');

addSubSectionHeader(doc, '5.2 Indicação Inteligente de Novos Líderes');
addParagraph(doc, 'Através do cruzamento de dados de frequência 100%, médias elevadas (ex: > 9.5) e dedicação acadêmica, o MIB Church sugere ao pastor os nomes de alunos com perfil de alto potencial para assumirem novas células e ministérios.');


// --- MÓDULO 6 ---
addSectionHeader(doc, '6', 'Gestor Ministerial: Departamentos, Equipes e Funções');

addParagraph(doc, 'O Gestor Ministerial organiza a estrutura departamental da igreja (Louvor, Mídia, Kids, Recepção, Acolhimento, Intercessão, etc.).');

addSubSectionHeader(doc, '6.1 Estruturação Departamental');
addBullet(doc, 'Ministérios', 'Criação de ministérios ativos com personalização de cor temática e ícone identificador.');
addBullet(doc, 'Funções Ministeriais', 'Definição de cargos técnicos dentro do ministério (Ex: Vocalista, Baterista, Operador de Mesa, Câmera, Monitor Kids).');
addBullet(doc, 'Líderes de Ministério', 'Designação dos voluntários responsáveis pelo comando de cada departamento.');


// --- MÓDULO 7 ---
addSectionHeader(doc, '7', 'Escalas Ministeriais, Gerador Mensal e Cartão PNG para Redes');

addParagraph(doc, 'O módulo de Escalas Ministeriais automatiza a alocação de equipes para os cultos e programações da igreja.');

addSubSectionHeader(doc, '7.1 Gerador Mensal Automático');
addParagraph(doc, 'O coordenador configura os cultos semanais padrão (Ex: Domingo Noite, Quarta Doutrina) e o sistema gera automaticamente todas as datas do mês selecionado, permitindo adicionar programações especiais (Redes, Vigílias, Congressos).');

addSubSectionHeader(doc, '7.2 Confirmação, WhatsApp e Exportação em PNG');
addBullet(doc, 'Painel do Voluntário', 'Cada membro visualiza suas próximas escalas no seu painel e confirma ou recusa sua participação.');
addBullet(doc, 'Cópia para WhatsApp', 'Geração de texto formatado com lista de voluntários pronto para envio nos grupos de WhatsApp.');
addBullet(doc, 'Exportação em Cartão PNG', 'Geração de arte gráfica elegante em imagem PNG pronta para publicação nas redes sociais ou impressão.');

addNoticeBox(doc, '📱 OTIMIZAÇÃO MOBILE DOS BOTÕES E MODAIS',
  'Na aba de Escalas, os botões "Gerador Mensal" (Índigo), "Novo Evento" (Azul) e "Exportar Mensal" (Verde Esmeralda) possuem visualização em grade no mobile com ícones em destaque. Todos os modais possuem rolagem interna e rodapé flexível sem cortes.', 'info');


// --- MÓDULO 8 ---
addSectionHeader(doc, '8', 'Agenda de Eventos, Inscrições e Check-in por QR Code');

addParagraph(doc, 'O Módulo de Agenda unifica o calendário eclesiástico, inscrições públicas e recepção nos congressos.');

addSubSectionHeader(doc, '8.1 Inscrições e Recepção com QR Code');
addBullet(doc, 'Página Pública de Inscrição', 'Formulário online para inscrição em congressos e acampamentos.');
addBullet(doc, 'Ingresso com QR Code', 'Emissão automática de voucher com código QR exclusivo.');
addBullet(doc, 'Portaria e Check-in', 'Leitor de QR Code na recepção para validação rápida da entrada via câmera do smartphone.');


// --- MÓDULO 9 ---
addSectionHeader(doc, '9', 'Mural de Oração, Teste de Temperamento e Utilitários');

addParagraph(doc, 'Ferramentas de pastoreio, acolhimento espiritual e testes comportamentais.');

addSubSectionHeader(doc, '9.1 Cuidado Espiritual e Temperamentos');
addBullet(doc, 'Pedidos de Oração', 'Envio de motivos de oração com níveis de privacidade (Pastores, Líderes de Célula).');
addBullet(doc, 'Teste de Temperamentos', 'Questionário que mapeia os perfis Sanguíneo, Colérico, Melancólico e Fleumático, orientando a liderança no melhor encaixe ministerial do membro.');
addBullet(doc, 'Calculadora de Tributos', 'Calculadora utilitária para auxílio no planejamento financeiro.');


// --- MÓDULO 10 ---
addSectionHeader(doc, '10', 'Matriz de Permissões, Perfis RLS e Regra Especial de Escalar');

addParagraph(doc, 'A segurança da plataforma é respaldada pelas políticas de Row Level Security (RLS) do Supabase, divididas em perfis claros:');

addSubSectionHeader(doc, '10.1 Matriz de Perfis');
addBullet(doc, 'Admin', 'Acesso total soberano.');
addBullet(doc, 'Pastor', 'Gerenciamento completo da membresia, finanças e ministérios.');
addBullet(doc, 'Secretaria', 'Acesso a membros, células, escolas e eventos.');
addBullet(doc, 'Tesouraria', 'Acesso exclusivo ao módulo financeiro.');
addBullet(doc, 'Líder de Célula', 'Acesso à sua célula, membros da célula e reuniões.');
addBullet(doc, 'Membro', 'Acesso pessoal ao seu perfil, escalas e orações.');

addNoticeBox(doc, '📌 REGRA ESPECIAL DAS POLITICAS DE ESCALAS (GESTOR MINISTERIAL)',
  'Se o Membro ou o Líder de Célula for cadastrado como Líder de algum Ministério no Gestor Ministerial, a função "Escalar" no módulo será automaticamente habilitada para ele, permitindo que ele gerencie e escale a sua equipe nas programações da igreja.', 'warning');


// --- MÓDULO 11 ---
addSectionHeader(doc, '11', 'Guia de Solução de Problemas e Boas Práticas (Troubleshooting)');

addParagraph(doc, 'Orientações para manutenção e suporte do MIB Church:');
addBullet(doc, 'Erro 403 (Acesso Negado)', 'Verifique se o valor da coluna permissao na tabela pessoas confere exatamente com o perfil do usuário e execute as políticas RLS no Supabase.');
addBullet(doc, 'Fotos de Membros', 'Garantir que o bucket fotos-membros do Supabase Storage esteja configurado com permissão pública de leitura.');
addBullet(doc, 'Navegação Mobile', 'Utilize navegadores modernos (Chrome, Safari, Edge) em dispositivos móveis para melhor desempenho das câmeras de QR Code.');


// --- FOOTERS AND PAGE NUMBERS ---
const totalPages = doc.bufferedPageRange().count;

for (let i = 1; i < totalPages; i++) {
  doc.switchToPage(i);
  
  // Footer divider line
  doc.moveTo(54, 785).lineTo(541.28, 785).lineWidth(0.5).stroke('#cbd5e1');
  
  // Footer text left
  doc.fillColor('#64748b')
     .font('Helvetica')
     .fontSize(8)
     .text('MIB Church · Manual Oficial de Operação e Apostila Completa', 54, 794, { align: 'left' });
  
  // Footer text right
  doc.fillColor('#1e3a8a')
     .font('Helvetica-Bold')
     .fontSize(8.5)
     .text(`Autoria: Jadson da Silva Viana  |  Página ${i + 1} de ${totalPages}`, 300, 794, { align: 'right' });
}

// Finalize PDF
doc.end();

writeStream.on('finish', () => {
  console.log(`✅ Apostila MIB Church gerada com sucesso! (${totalPages} páginas)`);
  console.log(`📁 Local do arquivo: ${outputPath}`);
});
