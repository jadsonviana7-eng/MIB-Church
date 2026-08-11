import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const outputPath = 'd:/Workflow/MIB Church/Apostila_Completa_MIB_Church.pdf';

console.log('Iniciando geração da Apostila Técnica Master do MIB Church...');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 45, bottom: 45, left: 45, right: 45 },
  bufferPages: true,
  autoFirstPage: true
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Theme Colors
const C = {
  primary: '#1e3a8a',      // Dark Blue
  secondary: '#2563eb',    // Bright Blue
  accent: '#7c3aed',       // Purple
  emerald: '#059669',      // Emerald Green
  dark: '#0f172a',         // Slate 900
  body: '#334155',         // Slate 700
  lightBg: '#f8fafc',      // Slate 50
  cardBg: '#f1f5f9',       // Slate 100
  border: '#cbd5e1',       // Slate 300
  codeBg: '#0f172a',       // Dark Code Slate
  codeText: '#38bdf8',     // Light Blue Code
  white: '#ffffff'
};

// --- CAPA TÉCNICA (PÁGINA 1) ---
doc.rect(0, 0, 595.28, 841.89).fill('#0f172a');

// Outer Frame
doc.roundedRect(18, 18, 559.28, 805.89, 16)
   .lineWidth(2)
   .stroke('#334155');

// Top Ribbon
doc.roundedRect(36, 42, 523.28, 8, 4).fill('#2563eb');

doc.fillColor('#ffffff')
   .font('Helvetica-Bold')
   .fontSize(32)
   .text('MIB CHURCH', 45, 80, { align: 'center', characterSpacing: 2 });

doc.fillColor('#60a5fa')
   .font('Helvetica-Bold')
   .fontSize(13.5)
   .text('MANUAL TÉCNICO ENCICLOPÉDICO DO DESENVOLVEDOR & GUIA DE CÓDIGO', 45, 125, { align: 'center', characterSpacing: 1 });

doc.moveTo(90, 152).lineTo(505, 152).lineWidth(1.5).stroke('#3b82f6');

doc.fillColor('#cbd5e1')
   .font('Helvetica')
   .fontSize(10)
   .text('Documentação Exaustiva: Arquitetura, Banco de Dados, Componentes JSX, Funções JS e Regras RLS', 45, 168, { align: 'center' });

// Center Box / Summary Card
doc.roundedRect(45, 210, 505.28, 405, 16)
   .fillAndStroke('#1e293b', '#2563eb');

doc.fillColor('#38bdf8')
   .font('Helvetica-Bold')
   .fontSize(11.5)
   .text('CONTEÚDO TÉCNICO EXAUSTIVO DO MANUAL', 60, 228, { align: 'center', characterSpacing: 1 });

const topics = [
  '1. Arquitetura da Aplicação e Stack Tecnológico (React 19, Supabase RLS, Vite, Tailwind)',
  '2. Dicionário de Dados e SQL DDL das 18 Tabelas PostgreSQL no Supabase',
  '3. Controlador Principal (App.jsx), Rotas, Sessão e Gerenciamento de Estado Global',
  '4. Engenharia do Módulo de Pessoas (PessoasModulo.jsx, DetalhesMembro.jsx, Crop & Autocadastro)',
  '5. Engenharia do Módulo de Células (CelulasModulo.jsx, Lançamento de Reuniões & Relatórios)',
  '6. Engenharia do Módulo Financeiro (ModuloFinanceiro.jsx, Transações & Carnês QR Code)',
  '7. Engenharia do Módulo de Escolas Teológicas e Algoritmo de Indicação de Líderes',
  '8. Engenharia do Gestor Ministerial (MinisteriosManager.jsx, MinistryDetails.jsx & Funções)',
  '9. Engenharia das Escalas Ministeriais (EscalasMinisteriais.jsx, Gerador Mensal & PNG Export)',
  '10. Engenharia de Agenda, Eventos Públicos e Check-in por QR Code na Portaria',
  '11. Engenharia do Módulo Espiritual (MuralOracao.jsx, QuizPersonalidade.jsx & Tributos)',
  '12. Matriz de Segurança, SQL Supabase RLS e Regra Especial de Escala Ministerial',
  '13. Guia de Operação, Deployment Otimizado (Vite Build) e Solução de Problemas (Troubleshooting)'
];

let tY = 256;
topics.forEach(t => {
  doc.fillColor('#e2e8f0').font('Helvetica').fontSize(8.5).text(`• ${t}`, 62, tY, { width: 470 });
  tY += 26;
});

// Author Box
doc.roundedRect(45, 630, 505.28, 155, 14)
   .fillAndStroke('#0284c7', '#0369a1');

doc.fillColor('#e0f2fe')
   .font('Helvetica-Bold')
   .fontSize(10)
   .text('ATRIBUIÇÃO FORMAL DE AUTORIA E RESPONSABILIDADE TÉCNICA', 55, 650, { align: 'center', characterSpacing: 1 });

doc.fillColor('#ffffff')
   .font('Helvetica-Bold')
   .fontSize(22)
   .text('Jadson da Silva Viana', 55, 672, { align: 'center' });

doc.fillColor('#f0f9ff')
   .font('Helvetica')
   .fontSize(11)
   .text('Desenvolvedor & Arquiteto Principal da Plataforma MIB Church', 55, 702, { align: 'center' });

doc.fillColor('#bae6fd')
   .font('Helvetica')
   .fontSize(9.5)
   .text('Edição Técnica Exaustiva · Agosto de 2026 · Versão Oficial 2.0', 55, 738, { align: 'center' });


// --- HELPER FUNCTIONS FOR CONTENT PAGES ---
function pageHeader(doc, subtitle = 'MANUAL TÉCNICO DO DESENVOLVEDOR') {
  doc.addPage();
  
  doc.rect(0, 0, 595.28, 38).fill(C.primary);
  doc.fillColor(C.white)
     .font('Helvetica-Bold')
     .fontSize(9)
     .text(`MIB CHURCH — ${subtitle.toUpperCase()}`, 45, 13, { characterSpacing: 1 });
  
  doc.fillColor('#93c5fd')
     .font('Helvetica-Bold')
     .fontSize(8.5)
     .text('AUTOR: JADSON DA SILVA VIANA', 320, 14, { align: 'right' });
  
  doc.y = 48;
}

function secHeader(doc, num, title) {
  if (doc.y > 670) {
    pageHeader(doc);
  } else {
    doc.moveDown(0.9);
  }
  
  const cY = doc.y;
  doc.roundedRect(45, cY, 505.28, 26, 6).fill(C.primary);
  doc.fillColor(C.white)
     .font('Helvetica-Bold')
     .fontSize(10.5)
     .text(`CAPÍTULO ${num}: ${title.toUpperCase()}`, 56, cY + 7);
  
  doc.y = cY + 34;
}

function subSecHeader(doc, title) {
  if (doc.y > 700) {
    pageHeader(doc);
  } else {
    doc.moveDown(0.5);
  }
  
  doc.fillColor(C.secondary)
     .font('Helvetica-Bold')
     .fontSize(10)
     .text(title);
  
  doc.moveTo(45, doc.y + 2).lineTo(550.28, doc.y + 2).lineWidth(1).stroke(C.border);
  doc.moveDown(0.35);
}

function p(doc, text) {
  if (doc.y > 720) {
    pageHeader(doc);
  }
  doc.fillColor(C.body)
     .font('Helvetica')
     .fontSize(8.5)
     .text(text, { align: 'justify', lineGap: 2 });
  doc.moveDown(0.3);
}

function bullet(doc, label, text) {
  if (doc.y > 720) {
    pageHeader(doc);
  }
  doc.fillColor(C.dark)
     .font('Helvetica-Bold')
     .fontSize(8.5)
     .text(`• ${label}: `, { continued: true });
  
  doc.fillColor(C.body)
     .font('Helvetica')
     .text(text, { align: 'justify', lineGap: 1.8 });
  doc.moveDown(0.25);
}

function codeBlock(doc, title, code) {
  if (doc.y > 630) {
    pageHeader(doc);
  }
  
  const lines = code.split('\n');
  const height = 22 + (lines.length * 10);
  const sY = doc.y;
  
  doc.roundedRect(45, sY, 505.28, height, 6)
     .fillAndStroke(C.codeBg, '#334155');
  
  doc.fillColor('#f8fafc')
     .font('Helvetica-Bold')
     .fontSize(8)
     .text(`[CÓDIGO / ESTRUTURA]: ${title}`, 56, sY + 6);
  
  let lY = sY + 20;
  lines.forEach(l => {
    doc.fillColor(C.codeText)
       .font('Courier')
       .fontSize(7)
       .text(l, 56, lY);
    lY += 10;
  });
  
  doc.y = sY + height + 7;
}

function noteBox(doc, title, text, type = 'info') {
  if (doc.y > 670) {
    pageHeader(doc);
  }
  const isWarn = type === 'warning';
  const bg = isWarn ? '#fffbebf0' : '#eff6fff0';
  const border = isWarn ? '#f59e0b' : '#3b82f6';
  const tColor = isWarn ? '#92400e' : '#1e40af';
  
  const sY = doc.y;
  const height = 36 + (Math.ceil(text.length / 95) * 10);
  
  doc.roundedRect(45, sY, 505.28, height, 6)
     .fillAndStroke(bg, border);
  
  doc.fillColor(tColor)
     .font('Helvetica-Bold')
     .fontSize(8.5)
     .text(title, 58, sY + 7);
  
  doc.fillColor(C.body)
     .font('Helvetica')
     .fontSize(8)
     .text(text, 58, sY + 20, { width: 479, align: 'justify', lineGap: 1.8 });
  
  doc.y = sY + height + 7;
}


// --- PÁGINA 2: FICHA TÉCNICA E DECLARAÇÃO DE AUTORIA ---
pageHeader(doc, 'FICHA TÉCNICA E DECLARAÇÃO DE AUTORIA');

doc.fillColor(C.primary)
   .font('Helvetica-Bold')
   .fontSize(13.5)
   .text('DECLARAÇÃO FORMAL DE AUTORIA E PROPRIEDADE INTELECTUAL');

doc.moveDown(0.25);

p(doc, 'A presente apostila técnica consubstancia o manual definitivo de código fonte, arquitetura de software, estrutura de banco de dados e engenharia de requisitos da plataforma MIB Church.');

noteBox(doc, '📌 REGISTRO FORMAL DE AUTORIA',
  'Todos os módulos do código-fonte (componentes React JSX, scripts de utilitários JavaScript, estilização Tailwind CSS, consultas SQL Supabase, triggers e políticas de segurança RLS) possuem atribuição formal e soberana de autoria a Jadson da Silva Viana. Nenhuma parte deste sistema foi concebida sem sua direta intervenção arquitetural.', 'info');

doc.moveDown(0.25);

doc.fillColor(C.primary)
   .font('Helvetica-Bold')
   .fontSize(12.5)
   .text('SUMÁRIO EXECUTIVO DA DOCUMENTAÇÃO TÉCNICA');

doc.moveTo(45, doc.y + 2).lineTo(550.28, doc.y + 2).lineWidth(1.2).stroke(C.primary);
doc.moveDown(0.4);

const chapters = [
  { n: 'Capítulo 1', t: 'Arquitetura da Aplicação e Stack Tecnológico' },
  { n: 'Capítulo 2', t: 'Dicionário de Dados e SQL DDL das 18 Tabelas PostgreSQL no Supabase' },
  { n: 'Capítulo 3', t: 'Controlador Principal (App.jsx), Rotas e Estado Global' },
  { n: 'Capítulo 4', t: 'Engenharia do Módulo de Pessoas e Autocadastro Público' },
  { n: 'Capítulo 5', t: 'Engenharia do Módulo de Células e Relatórios Semanais' },
  { n: 'Capítulo 6', t: 'Engenharia do Módulo Financeiro e Carnês com QR Code' },
  { n: 'Capítulo 7', t: 'Engenharia do Módulo de Escolas e Indicação de Líderes' },
  { n: 'Capítulo 8', t: 'Engenharia do Gestor Ministerial (Estruturas e Funções)' },
  { n: 'Capítulo 9', t: 'Engenharia das Escalas Ministeriais (Gerador & Exportação PNG)' },
  { n: 'Capítulo 10', t: 'Agenda de Eventos e Leitor de QR Code na Portaria' },
  { n: 'Capítulo 11', t: 'Módulo Espiritual, Pedidos de Oração e Temperamentos' },
  { n: 'Capítulo 12', t: 'Matriz de Segurança, SQL Supabase RLS e Regra Especial de Escalar' },
  { n: 'Capítulo 13', t: 'Guia de Operação, Deployment e Solução de Problemas (Troubleshooting)' }
];

chapters.forEach(ch => {
  const cY = doc.y;
  doc.fillColor(C.primary).font('Helvetica-Bold').fontSize(8.5).text(ch.n, 50, cY);
  doc.fillColor(C.dark).font('Helvetica').fontSize(8.5).text(ch.t, 130, cY);
  doc.moveDown(0.35);
});


// --- CAPÍTULO 1 ---
secHeader(doc, '1', 'Arquitetura da Aplicação e Stack Tecnológico');

p(doc, 'O MIB Church é uma Single Page Application (SPA) desenvolvida com a biblioteca React 19 em conjunto com o bundler Vite 8. O armazenamento de dados e autenticação são providos pelo Supabase PostgreSQL com segurança via Row Level Security (RLS).');

subSecHeader(doc, '1.1 Dependências e Bibliotecas (package.json)');
bullet(doc, 'React 19 & React-DOM 19', 'Framework reativo responsável pelo renderizador virtual DOM e gerenciamento de estado.');
bullet(doc, '@supabase/supabase-js v2', 'Cliente oficial para requisições PostgreSQL REST e canais em tempo real.');
bullet(doc, '@tailwindcss/vite v4', 'Engine de estilização utilitária baseada em CSS de alta performance.');
bullet(doc, 'lucide-react', 'Biblioteca de ícones vetoriais responsivos.');
bullet(doc, 'html2canvas / html-to-image', 'Renderizador de elementos DOM para conversão de cartões em imagens PNG.');
bullet(doc, 'jspdf v4', 'Geração dinâmica de relatórios e carnês em PDF no cliente.');
bullet(doc, 'html5-qrcode & qrcode.react', 'Leitor de câmera em tempo real para leitura de ingressos e gerador de códigos QR.');
bullet(doc, 'recharts', 'Biblioteca de gráficos vetoriais SVG para exibição de métricas financeiras e demográficas.');

codeBlock(doc, 'Estrutura Completa do Código-Fonte (src/)',
`src/
├── App.jsx                 # Controlador Geral (Roteamento, Autenticação e Tema)
├── main.jsx                # Ponto de Entrada da Aplicação
├── supabaseClient.js       # Conexão com Supabase SDK
├── PessoasModulo.jsx       # Diretório de Membros e Filtros
├── DetalhesMembro.jsx      # Ficha Cadastral e Cortador de Foto
├── FormularioCadastro.jsx  # Formulário de Cadastro Interno
├── PublicRegistrationForm.jsx # Formulário Público de Autocadastro
├── CelulasModulo.jsx       # Gestão de Células
├── ModalLancarReuniao.jsx  # Chamada Semanal e Presença de Células
├── RelatorioSemanal.jsx    # Relatório Consolidado para Supervisores
├── ModuloFinanceiro.jsx    # Dashboard Financeiro e Dízimos
├── TransacoesFinanceiras.jsx # Tabela de Lançamentos de Caixa
├── CarneGenerator.jsx      # Emissão e Baixa de Carnês com QR Code
├── CategoriasFinanceiras.jsx # Plano de Contas
├── EscolasModulo.jsx       # Cursos Teológicos e Indicação de Líderes
├── AgendaModulo.jsx        # Calendário de Eventos da Igreja
├── LeitorQRCodeEvento.jsx  # Validador de Ingressos por Câmera
├── ModuloUtilitarios.jsx   # Utilitários Diversos
├── MuralOracao.jsx         # Mural de Pedidos de Oração
├── QuizPersonalidade.jsx   # Teste de Temperamentos Humano
└── ministerial/            # Módulo Ministerial
    ├── EscalasMinisteriais.jsx # Escalas, Gerador Mensal & PNG Export
    ├── MinisteriosManager.jsx  # Gestão de Ministérios e Cores
    └── MinistryDetails.jsx     # Atribuição de Voluntários e Líderes`);


// --- CAPÍTULO 2 ---
secHeader(doc, '2', 'Dicionário de Dados e SQL DDL das Tabelas Supabase PostgreSQL');

p(doc, 'O banco de dados do MIB Church é composto por 18 tabelas relacionais com chaves primárias UUID, restrições UNIQUE e políticas RLS ativas.');

subSecHeader(doc, '2.1 Estrutura SQL DDL das Principais Tabelas');

codeBlock(doc, 'Tabela 1: pessoas (Membros, Visitantes e Liderança)',
`CREATE TABLE pessoas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  telefone VARCHAR(50),
  cpf VARCHAR(20) UNIQUE,
  rg VARCHAR(20),
  data_nascimento DATE,
  genero VARCHAR(20), -- 'masculino', 'feminino'
  estado_civil VARCHAR(30),
  endereco TEXT,
  bairro VARCHAR(100),
  cargo VARCHAR(50) DEFAULT 'membro', -- 'membro', 'lider-celula', 'lider', 'supervisor', 'diacono', 'presbitero', 'pastor', 'admin'
  permissao VARCHAR(50) DEFAULT 'membro',
  foto_url TEXT,
  data_batismo DATE,
  batizado_espirito BOOLEAN DEFAULT false,
  celula_id UUID REFERENCES celulas(id),
  status VARCHAR(20) DEFAULT 'ativo',
  created_at TIMESTAMPTZ DEFAULT now()
);`);

codeBlock(doc, 'Tabela 2: celulas (Grupos Pequenos)',
`CREATE TABLE celulas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  dia_semana INTEGER, -- 0 (Dom) a 6 (Sáb)
  horario VARCHAR(10),
  endereco TEXT,
  lider_id UUID REFERENCES pessoas(id),
  colider_id UUID REFERENCES pessoas(id),
  supervisor_id UUID REFERENCES pessoas(id),
  status VARCHAR(20) DEFAULT 'ativa'
);`);

codeBlock(doc, 'Tabela 3: reunioes_celula (Registros Semanais de Reunião)',
`CREATE TABLE reunioes_celula (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  celula_id UUID REFERENCES celulas(id) ON DELETE CASCADE,
  data_reuniao DATE NOT NULL,
  presentes_ids UUID[] DEFAULT '{}',
  qtd_visitantes INTEGER DEFAULT 0,
  valor_oferta NUMERIC(10,2) DEFAULT 0.00,
  estudo_tema VARCHAR(255),
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);`);

codeBlock(doc, 'Tabela 4: financeiro_transacoes (Receitas e Despesas)',
`CREATE TABLE financeiro_transacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo VARCHAR(20) NOT NULL, -- 'receita', 'despesa'
  categoria_id UUID REFERENCES financeiro_categorias(id),
  descricao VARCHAR(255) NOT NULL,
  valor NUMERIC(12,2) NOT NULL,
  data_transacao DATE NOT NULL,
  membro_id UUID REFERENCES pessoas(id),
  forma_pagamento VARCHAR(50), -- 'pix', 'dinheiro', 'cartao', 'boleto'
  status VARCHAR(20) DEFAULT 'confirmado'
);`);

codeBlock(doc, 'Tabela 5: ministerio_membros (Equipes Ministeriais e Flag de Líder)',
`CREATE TABLE ministerio_membros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ministerio_id UUID REFERENCES ministerios(id) ON DELETE CASCADE,
  pessoa_id UUID REFERENCES pessoas(id) ON DELETE CASCADE,
  funcao_id UUID REFERENCES funcoes_ministeriais(id),
  lider BOOLEAN DEFAULT false, -- Flag essencial que libera permissão no Gestor Ministerial
  UNIQUE(ministerio_id, pessoa_id)
);`);

codeBlock(doc, 'Tabela 6: eventos_escala (Cultos e Programações de Escala)',
`CREATE TABLE eventos_escala (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo VARCHAR(255) NOT NULL,
  data_evento DATE NOT NULL,
  hora_inicio VARCHAR(10),
  hora_termino VARCHAR(10),
  local VARCHAR(255),
  fardamentos JSONB, -- Armazena a farda do dia por ministério
  created_at TIMESTAMPTZ DEFAULT now()
);`);


// --- CAPÍTULO 3 ---
secHeader(doc, '3', 'Controlador Principal (App.jsx) e Gerenciamento de Estado Global');

p(doc, 'O arquivo `App.jsx` controla o ciclo de vida global da aplicação React, gerenciando a autenticação, carregamento do membro logado e controle de acesso via função `temPermissao`.');

subSecHeader(doc, '3.1 Mapeamento de Estados e Hooks em App.jsx');
bullet(doc, 'session & user', 'Estado que armazena a sessão ativa de autenticação com Supabase Auth.');
bullet(doc, 'membroLogado', 'Estado que guarda os dados cadastrais da tabela `pessoas` vinculada ao e-mail autenticado.');
bullet(doc, 'isLiderMinisterio', 'Estado booleano que indica se a pessoa logada é líder em qualquer ministério na tabela `ministerio_membros`.');
bullet(doc, 'moduloAtual', 'Estado string determinando qual tela/módulo está visível (`overview`, `pessoas`, `celulas`, `financeiro`, `escolas`, `ministerial`, `agenda`, `utilitarios`, `configuracoes`).');

codeBlock(doc, 'Algoritmo de Verificação de Permissão (App.jsx)',
`const temPermissao = (mod) => {
  if (!membroLogado) return false;
  const p = (membroLogado.permissao || membroLogado.cargo || '').toLowerCase();
  
  if (p === 'admin' || p === 'pastor') return true;
  if (mod === 'overview') return true;
  if (mod === 'pessoas') return ['secretaria', 'lider', 'supervisor'].includes(p);
  if (mod === 'celulas') return ['secretaria', 'lider-celula', 'lider', 'supervisor'].includes(p);
  if (mod === 'financeiro') return ['tesouraria', 'tesoureiro'].includes(p);
  if (mod === 'ministerial') return true; // Qualquer membro acessa visualmente; ações são filtradas internamente
  return false;
};`);


// --- CAPÍTULO 4 ---
secHeader(doc, '4', 'Engenharia do Módulo de Pessoas e Autocadastro Público');

p(doc, 'Compreende `PessoasModulo.jsx`, `DetalhesMembro.jsx`, `FormularioCadastro.jsx` e `PublicRegistrationForm.jsx`.');

subSecHeader(doc, '4.1 Recursos e Funções da Gestão de Membros');
bullet(doc, 'calcularPermissoesPorCargo(cargo)', 'Retorna o resumo textual formatado das atribuições de cada cargo.');
bullet(doc, 'uploadFotoStorage(file, membroId)', 'Executa o upload da imagem cortada em Canvas para o bucket `fotos-membros` no Supabase Storage.');
bullet(doc, 'tratarSubmitVisitante(e)', 'Processa o formulário de novos visitantes vinculando-os à célula mais próxima.');

codeBlock(doc, 'Recorte de Imagem em Canvas (DetalhesMembro.jsx)',
`const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  
  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.95);
  });
};`);


// --- CAPÍTULO 5 ---
secHeader(doc, '5', 'Engenharia do Módulo de Células e Relatórios Semanais');

p(doc, 'Compreende `CelulasModulo.jsx`, `ModalLancarReuniao.jsx` e `RelatorioSemanal.jsx`.');

subSecHeader(doc, '5.1 Lançamento de Reuniões Semanais');
bullet(doc, 'lancarReuniaoSemanal()', 'Insere o registro na tabela `reunioes_celula` incluindo array de presença, visitantes e oferta.');
bullet(doc, 'calcularPresencaPorcento()', 'Determina a taxa de assiduidade comparando os membros da célula com a lista de presentes marcados.');


// --- CAPÍTULO 6 ---
secHeader(doc, '6', 'Engenharia do Módulo Financeiro e Carnês com QR Code');

p(doc, 'Compreende `ModuloFinanceiro.jsx`, `TransacoesFinanceiras.jsx` e `CarneGenerator.jsx`.');

subSecHeader(doc, '6.1 Geração de Carnês e Baixa por QR Code');
codeBlock(doc, 'Impressão e Baixa de Parcela com QR Code (CarneGenerator.jsx)',
`const processarBaixaCarneQRCode = async (tokenQRCode) => {
  const { data, error } = await supabase
    .from('carnes_contribuicao')
    .update({ status: 'pago', data_pagamento: new Date() })
    .eq('qr_code_token', tokenQRCode)
    .select('*, pessoas(nome)');
    
  if (data && data.length > 0) {
    alert(\`Baixa efetuada com sucesso: \${data[0].pessoas.nome}\`);
  }
};`);


// --- CAPÍTULO 7 ---
secHeader(doc, '7', 'Engenharia do Módulo de Escolas Teológicas e Indicação de Líderes');

p(doc, 'Compreende `EscolasModulo.jsx`. Administra a formação acadêmica e ministerial.');

subSecHeader(doc, '7.1 Algoritmo de Indicação Inteligente de Novos Líderes');
codeBlock(doc, 'Seleção de Alunos de Destaque (EscolasModulo.jsx)',
`const indicarNovosLideres = (alunos, frequencia, notas) => {
  return alunos.filter(aluno => {
    const pctFrequencia = calcularFrequenciaAluno(aluno.id, frequencia);
    const mediaNota = calcularMediaNotasAluno(aluno.id, notas);
    return pctFrequencia === 100 && mediaNota >= 9.0 && !aluno.is_lider;
  });
};`);


// --- CAPÍTULO 8 ---
secHeader(doc, '8', 'Engenharia do Gestor Ministerial (Estruturas e Funções)');

p(doc, 'Compreende `MinisteriosManager.jsx` e `MinistryDetails.jsx`.');

subSecHeader(doc, '8.1 Gestão de Equipes e Atribuição de Líderes');
bullet(doc, 'vincularVoluntario()', 'Conecta um membro a um ministério e função na tabela `ministerio_membros`.');
bullet(doc, 'toggleLiderMinisterio()', 'Atualiza a coluna `lider = true`, liberando a função de escalação para aquele usuário.');


// --- CAPÍTULO 9 ---
secHeader(doc, '9', 'Engenharia das Escalas Ministeriais (Gerador & Exportação PNG)');

p(doc, 'Compreende `EscalasMinisteriais.jsx`. Responsável pelo agendamento e gerador em lote.');

subSecHeader(doc, '9.1 Algoritmo de Geração Mensal em Lote');
codeBlock(doc, 'Gerador de Eventos para o Mês Selecionado (EscalasMinisteriais.jsx)',
`const calcularPreviaEventos = () => {
  const eventosGerados = [];
  const diasNoMes = new Date(anoGeracao, mesGeracao + 1, 0).getDate();
  
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const dataObj = new Date(anoGeracao, mesGeracao, dia);
    const diaSemana = dataObj.getDay(); // 0 (Dom) a 6 (Sáb)
    
    // Filtra cultos padrão configurados para este dia
    const cultosDoDia = cultosPadrao.filter(c => c.dayOfWeek === diaSemana);
    cultosDoDia.forEach(c => {
      eventosGerados.push({
        titulo: c.titulo,
        data_evento: dataObj.toISOString().split('T')[0],
        hora_inicio: c.time,
        hora_termino: c.timeEnd,
        local: localPadrao
      });
    });
  }
  setPreviaEventos(eventosGerados);
};`);

subSecHeader(doc, '9.2 Exportação para Imagem PNG (html2canvas)');
codeBlock(doc, 'Exportação Gráfica em PNG (EscalasMinisteriais.jsx)',
`const handleExportarMensalPNG = async (download = true) => {
  const elem = document.querySelector('.mensal-export-page');
  if (!elem) return;
  
  const canvas = await html2canvas(elem, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL('image/png');
  
  if (download) {
    const link = document.createElement('a');
    link.download = \`Escala_\${filtroMes + 1}_\${filtroAno}.png\`;
    link.href = imgData;
    link.click();
  }
};`);


// --- CAPÍTULO 10 ---
secHeader(doc, '10', 'Agenda de Eventos e Leitor de QR Code na Portaria');

p(doc, 'Compreende `AgendaModulo.jsx`, `PublicEventRegistration.jsx` e `LeitorQRCodeEvento.jsx`.');

subSecHeader(doc, '10.1 Leitor de Ingressos por Câmera');
codeBlock(doc, 'Validação de Portaria por QR Code (LeitorQRCodeEvento.jsx)',
`const validarQRCodePortaria = async (tokenQRCode) => {
  const { data, error } = await supabase
    .from('inscritos_eventos')
    .update({ status_presenca: 'confirmado', data_checkin: new Date() })
    .eq('qr_code_token', tokenQRCode)
    .select('*, pessoas(nome)');
    
  if (data && data.length > 0) {
    setMensagemSucesso(\`Check-in efetuado: \${data[0].pessoas.nome}\`);
  } else {
    setMensagemErro('Ingresso inválido.');
  }
};`);


// --- CAPÍTULO 11 ---
secHeader(doc, '11', 'Módulo Espiritual, Pedidos de Oração e Temperamentos');

p(doc, 'Compreende `MuralOracao.jsx`, `QuizPersonalidade.jsx` e `CalculadoraTributos.jsx`.');

subSecHeader(doc, '11.1 Teste de Temperamentos (QuizPersonalidade.jsx)');
codeBlock(doc, 'Cálculo de Perfil Comportamental (QuizPersonalidade.jsx)',
`const calcularPontuacaoTemperamento = (respostas) => {
  const pontos = { Sanguineo: 0, Colerio: 0, Melancolico: 0, Fleumatico: 0 };
  respostas.forEach(r => { pontos[r.tipo] += r.peso; });
  
  const dominante = Object.keys(pontos).reduce((a, b) => pontos[a] > pontos[b] ? a : b);
  return { pontos, dominante };
};`);


// --- CAPÍTULO 12 ---
secHeader(doc, '12', 'Matriz de Segurança, SQL Supabase RLS e Regra Especial de Escalar');

p(doc, 'A segurança dos dados é imposta pelas diretivas Row Level Security (RLS) no PostgreSQL.');

noteBox(doc, '⭐ REGRA ESPECIAL DE ESCALA MINISTERIAL (GESTOR MINISTERIAL)',
  'Se um Membro ou Líder de Célula for cadastrado como Líder de algum Ministério na tabela ministerio_membros com lider = true, a variável isLiderMinisterio assume o valor true e a função "Escalar" no módulo de Escalas é automaticamente habilitada para ele.', 'warning');

codeBlock(doc, 'Lógica da Liberação da Função Escalar (EscalasMinisteriais.jsx)',
`const permissaoLower = (membroLogado?.permissao || membroLogado?.cargo || '').toLowerCase();
const isPerfilRestrito = ['membro', 'lider-celula', 'lider', 'supervisor'].includes(permissaoLower);

// Se o perfil for restrito MAS o usuário for líder de ministério, habilita a função "Escalar"
const isMembroNormal = isPerfilRestrito && !isLiderMinisterio;`);


// --- CAPÍTULO 13 ---
secHeader(doc, '13', 'Guia de Operação, Deployment e Solução de Problemas (Troubleshooting)');

p(doc, 'Instruções para compilação, execução e tratamento de exceções:');

bullet(doc, 'Modo de Desenvolvimento', 'Executar `npm run dev -- --host` para iniciar o servidor local Vite.');
bullet(doc, 'Build de Produção', 'Executar `npm run build` para gerar o pacote estático otimizado em `/dist`.');
bullet(doc, 'Resolução de Erro 403', 'Se o usuário encontrar permissão negada, execute as políticas RLS no console SQL do Supabase.');


// --- FOOTERS AND PAGE NUMBERS ---
const pageCount = doc.bufferedPageRange().count;

for (let i = 1; i < pageCount; i++) {
  doc.switchToPage(i);
  
  doc.moveTo(45, 785).lineTo(550.28, 785).lineWidth(0.5).stroke('#cbd5e1');
  
  doc.fillColor('#64748b')
     .font('Helvetica')
     .fontSize(8)
     .text('MIB Church · Manual Técnico do Desenvolvedor e Guia de Código', 45, 794, { align: 'left' });
  
  doc.fillColor('#1e3a8a')
     .font('Helvetica-Bold')
     .fontSize(8.5)
     .text(`Autoria: Jadson da Silva Viana  |  Página ${i + 1} de ${pageCount}`, 300, 794, { align: 'right' });
}

doc.end();

writeStream.on('finish', () => {
  console.log(`✅ Apostila Técnica Master do MIB Church gerada com sucesso! (${pageCount} páginas)`);
  console.log(`📁 Salvo em: ${outputPath}`);
});
