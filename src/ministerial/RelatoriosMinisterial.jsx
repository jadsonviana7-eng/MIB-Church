import { useState, useEffect, useMemo } from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Award, 
  Target, 
  Star, 
  TrendingUp, 
  Calendar, 
  AlertTriangle, 
  ShieldCheck, 
  Briefcase 
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { ministeriosService } from './services/ministeriosService';
import { jsPDF } from 'jspdf';

export default function RelatoriosMinisterial() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'exportar'
  const [toastMsg, setToastMsg] = useState('');
  const [rawDados, setRawDados] = useState(null);
  
  // State da Central de Respostas Estratégicas
  const [activeQuestao, setActiveQuestao] = useState('crescimento'); // 'crescimento' | 'sem_escalar' | 'sobrecarga' | 'lider_equipe'

  // Período de Escala Mensal
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());

  const anosDisponiveis = useMemo(() => {
    const anoAtual = new Date().getFullYear();
    return [anoAtual - 1, anoAtual, anoAtual, anoAtual + 1, anoAtual + 2];
  }, []);

  function showToast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setLoading(true);
    try {
      const res = await ministeriosService.obterRelatoriosConsolidados();
      setRawDados(res);
    } catch (e) {
      console.error('Erro ao carregar dados consolidados para relatórios:', e);
    } finally {
      setLoading(false);
    }
  }

  // Converter array de objetos para CSV e disparar download
  function downloadCSV(headers, rows, filename) {
    const csvContent = [
      headers.join(';'),
      ...rows.map(row => row.map(val => `"${String(val || '').replace(/"/g, '""')}"`).join(';'))
    ].join('\n');

    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function exportarVoluntarios() {
    setLoading(true);
    try {
      const { data: membros, error } = await supabase
        .from('ministerio_membros')
        .select(`
          id,
          funcao,
          lider,
          ativo,
          pessoas (
            nome,
            email,
            telefone,
            cargo
          ),
          ministerios (
            nome
          )
        `);

      if (error) throw error;

      const headers = ['Nome Voluntário', 'Cargo Igreja', 'E-mail', 'Telefone', 'Ministério', 'Função Ministerial', 'Líder', 'Vínculo Ativo'];
      const rows = (membros || []).map(m => [
        m.pessoas?.nome || '',
        m.pessoas?.cargo || '',
        m.pessoas?.email || '',
        m.pessoas?.telefone || '',
        m.ministerios?.nome || '',
        m.funcao || '',
        m.lider ? 'Sim' : 'Não',
        m.ativo ? 'Sim' : 'Não'
      ]);

      downloadCSV(headers, rows, `Voluntarios_MIB_Church_${new Date().getFullYear()}.csv`);
      showToast('✓ Relatório de voluntários baixado!');
    } catch (e) {
      console.error(e);
      alert('Erro ao exportar: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function exportarEscalas() {
    setLoading(true);
    try {
      const parseDatabaseDate = (str) => {
        if (!str) return null;
        if (!str.includes('Z') && !str.match(/[+-]\d{2}(:?\d{2})?$/)) {
          const clean = str.trim().replace(' ', 'T');
          return new Date(clean + 'Z');
        }
        return new Date(str);
      };

      const formatarDataFuso = (isoString) => {
        if (!isoString) return '';
        try {
          const date = parseDatabaseDate(isoString);
          const bDate = new Date(date.getTime() - 3 * 3600 * 1000);
          const YYYY = bDate.getUTCFullYear();
          const MM = String(bDate.getUTCMonth() + 1).padStart(2, '0');
          const DD = String(bDate.getUTCDate()).padStart(2, '0');
          const hh = String(bDate.getUTCHours()).padStart(2, '0');
          const mm = String(bDate.getUTCMinutes()).padStart(2, '0');
          return `${DD}/${MM}/${YYYY} ${hh}:${mm}`;
        } catch (e) {
          return new Date(isoString).toLocaleString('pt-BR');
        }
      };

      const { data: escalas, error } = await supabase
        .from('escalas')
        .select(`
          status,
          created_at,
          eventos_ministeriais (
            titulo,
            data_evento,
            local
          ),
          pessoas (
            nome
          ),
          ministerios (
            nome
          ),
          ministerio_funcoes (
            nome
          )
        `);

      if (error) throw error;

      const headers = ['Evento', 'Data Evento', 'Local', 'Ministério', 'Função', 'Voluntário', 'Status de Confirmação', 'Data Escalação'];
      const rows = (escalas || []).map(e => [
        e.eventos_ministeriais?.titulo || '',
        e.eventos_ministeriais ? formatarDataFuso(e.eventos_ministeriais.data_evento) : '',
        e.eventos_ministeriais?.local || '',
        e.ministerios?.nome || '',
        e.ministerio_funcoes?.nome || 'Geral',
        e.pessoas?.nome || '',
        e.status || '',
        new Date(e.created_at).toLocaleDateString('pt-BR')
      ]);

      downloadCSV(headers, rows, `Relatorio_Escalas_Ministeriais.csv`);
      showToast('✓ Relatório de escalas baixado!');
    } catch (e) {
      console.error(e);
      alert('Erro ao exportar: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function exportarVoluntariosExcel() {
    setLoading(true);
    try {
      const { data: membros, error } = await supabase
        .from('ministerio_membros')
        .select(`
          id,
          funcao,
          lider,
          ativo,
          pessoas (
            nome,
            email,
            telefone,
            cargo
          ),
          ministerios (
            nome
          )
        `);

      if (error) throw error;

      const agrupados = {};
      (membros || []).forEach(m => {
        const minNome = m.ministerios?.nome || 'Sem Ministério';
        if (!agrupados[minNome]) agrupados[minNome] = [];
        agrupados[minNome].push(m);
      });

      let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8"/>
<style>
  body { font-family: Arial, sans-serif; }
  table { border-collapse: collapse; margin-bottom: 20px; width: 100%; }
  th { background-color: #1e3a8a; color: white; border: 1px solid #cbd5e1; font-size: 11px; padding: 6px; text-align: left; }
  td { border: 1px solid #e2e8f0; font-size: 11px; padding: 6px; }
  .title { font-size: 16px; font-weight: bold; color: #1e3a8a; margin-bottom: 5px; }
  .meta { font-size: 10px; color: #64748b; margin-bottom: 15px; }
  .category-header { background-color: #f1f5f9; font-weight: bold; font-size: 12px; color: #1e293b; padding: 8px; border: 1px solid #cbd5e1; }
</style>
</head>
<body>
  <div class="title">Relatório Geral de Voluntários por Ministério</div>
  <div class="meta">Gerado em: ${new Date().toLocaleString('pt-BR')}</div>`;

      Object.entries(agrupados).forEach(([minNome, lista]) => {
        html += `<table>
          <thead>
            <tr>
              <th colspan="7" class="category-header">Ministério: ${minNome}</th>
            </tr>
            <tr>
              <th>Nome Voluntário</th>
              <th>Cargo Igreja</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Função Ministerial</th>
              <th>Líder</th>
              <th>Vínculo Ativo</th>
            </tr>
          </thead>
          <tbody>`;

        lista.forEach(m => {
          html += `<tr>
            <td>${m.pessoas?.nome || ''}</td>
            <td>${m.pessoas?.cargo || ''}</td>
            <td>${m.pessoas?.email || ''}</td>
            <td>${m.pessoas?.telefone || ''}</td>
            <td>${m.funcao || ''}</td>
            <td>${m.lider ? 'Sim' : 'Não'}</td>
            <td>${m.ativo ? 'Sim' : 'Não'}</td>
          </tr>`;
        });

        html += `</tbody></table><br/>`;
      });

      html += `</body></html>`;

      const blob = new Blob([`\uFEFF${html}`], { type: 'application/vnd.ms-excel;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Voluntarios_por_Ministerio_${new Date().getFullYear()}.xls`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('✓ Relatório Excel de voluntários baixado!');
    } catch (e) {
      console.error(e);
      alert('Erro ao exportar Excel: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function exportarVoluntariosPDF() {
    setLoading(true);
    try {
      const { data: membros, error } = await supabase
        .from('ministerio_membros')
        .select(`
          id,
          funcao,
          lider,
          ativo,
          pessoas (
            nome,
            email,
            telefone,
            cargo
          ),
          ministerios (
            nome
          )
        `);

      if (error) throw error;

      const agrupados = {};
      (membros || []).forEach(m => {
        const minNome = m.ministerios?.nome || 'Sem Ministério';
        if (!agrupados[minNome]) agrupados[minNome] = [];
        agrupados[minNome].push(m);
      });

      const doc = new jsPDF();
      let y = 20;
      const margin = 15;
      const pageWidth = 210;
      const pageHeight = 297;

      const trunc = (str, len) => (str && str.length > len) ? str.substring(0, len) + '...' : (str || '');

      const drawHeader = (title) => {
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(30, 58, 138);
        doc.text(title, margin, y);
        y += 6;
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, margin, y);
        y += 12;
      };

      drawHeader('Relatório Geral de Voluntários por Ministério');

      Object.entries(agrupados).forEach(([minNome, lista]) => {
        if (y > pageHeight - 35) {
          doc.addPage();
          y = 20;
          drawHeader('Relatório Geral de Voluntários por Ministério');
        }

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59);
        doc.text(`Ministério: ${minNome}`, margin, y);
        y += 6;

        doc.setFillColor(30, 58, 138);
        doc.rect(margin, y, pageWidth - 2 * margin, 8, 'F');
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);
        doc.text('Nome Voluntário', margin + 2, y + 5.5);
        doc.text('Cargo', margin + 52, y + 5.5);
        doc.text('Função', margin + 82, y + 5.5);
        doc.text('Líder', margin + 117, y + 5.5);
        doc.text('Telefone', margin + 129, y + 5.5);
        doc.text('Ativo', margin + 154, y + 5.5);
        doc.text('E-mail', margin + 164, y + 5.5);
        y += 8;

        lista.forEach(m => {
          if (y > pageHeight - 15) {
            doc.addPage();
            y = 20;
            drawHeader('Relatório Geral de Voluntários por Ministério');
            
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(30, 41, 59);
            doc.text(`Ministério: ${minNome} (continuação)`, margin, y);
            y += 6;

            doc.setFillColor(30, 58, 138);
            doc.rect(margin, y, pageWidth - 2 * margin, 8, 'F');
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(255, 255, 255);
            doc.text('Nome Voluntário', margin + 2, y + 5.5);
            doc.text('Cargo', margin + 52, y + 5.5);
            doc.text('Função', margin + 82, y + 5.5);
            doc.text('Líder', margin + 117, y + 5.5);
            doc.text('Telefone', margin + 129, y + 5.5);
            doc.text('Ativo', margin + 154, y + 5.5);
            doc.text('E-mail', margin + 164, y + 5.5);
            y += 8;
          }

          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(51, 65, 85);

          const nome = trunc(m.pessoas?.nome || '', 28);
          const cargo = trunc(m.pessoas?.cargo || '', 16);
          const funcao = trunc(m.funcao || '', 20);
          const lider = m.lider ? 'Sim' : 'Não';
          const tel = trunc(m.pessoas?.telefone || '', 14);
          const ativo = m.ativo ? 'Sim' : 'Não';
          const email = trunc(m.pessoas?.email || '', 20);

          doc.text(nome, margin + 2, y + 5);
          doc.text(cargo, margin + 52, y + 5);
          doc.text(funcao, margin + 82, y + 5);
          doc.text(lider, margin + 117, y + 5);
          doc.text(tel, margin + 129, y + 5);
          doc.text(ativo, margin + 154, y + 5);
          doc.text(email, margin + 164, y + 5);

          doc.setDrawColor(241, 245, 249);
          doc.line(margin, y + 7, pageWidth - margin, y + 7);
          y += 7;
        });

        y += 8;
      });

      doc.save(`Voluntarios_MIB_Church_${new Date().getFullYear()}.pdf`);
      showToast('✓ Relatório PDF de voluntários baixado!');
    } catch (e) {
      console.error(e);
      alert('Erro ao exportar PDF: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function exportarEscalasExcel() {
    setLoading(true);
    try {
      const parseDatabaseDate = (str) => {
        if (!str) return null;
        if (!str.includes('Z') && !str.match(/[+-]\d{2}(:?\d{2})?$/)) {
          const clean = str.trim().replace(' ', 'T');
          return new Date(clean + 'Z');
        }
        return new Date(str);
      };

      const formatarDataFuso = (isoString) => {
        if (!isoString) return '';
        try {
          const date = parseDatabaseDate(isoString);
          const bDate = new Date(date.getTime() - 3 * 3600 * 1000);
          const YYYY = bDate.getUTCFullYear();
          const MM = String(bDate.getUTCMonth() + 1).padStart(2, '0');
          const DD = String(bDate.getUTCDate()).padStart(2, '0');
          const hh = String(bDate.getUTCHours()).padStart(2, '0');
          const mm = String(bDate.getUTCMinutes()).padStart(2, '0');
          return `${DD}/${MM}/${YYYY} ${hh}:${mm}`;
        } catch (e) {
          return new Date(isoString).toLocaleString('pt-BR');
        }
      };

      const { data: escalas, error } = await supabase
        .from('escalas')
        .select(`
          status,
          created_at,
          eventos_ministeriais (
            titulo,
            data_evento,
            local
          ),
          pessoas (
            nome
          ),
          ministerios (
            nome
          ),
          ministerio_funcoes (
            nome
          )
        `);

      if (error) throw error;

      const agrupados = {};
      (escalas || []).forEach(e => {
        const minNome = e.ministerios?.nome || 'Sem Ministério';
        if (!agrupados[minNome]) agrupados[minNome] = [];
        agrupados[minNome].push(e);
      });

      let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8"/>
<style>
  body { font-family: Arial, sans-serif; }
  table { border-collapse: collapse; margin-bottom: 20px; width: 100%; }
  th { background-color: #7c3aed; color: white; border: 1px solid #cbd5e1; font-size: 11px; padding: 6px; text-align: left; }
  td { border: 1px solid #e2e8f0; font-size: 11px; padding: 6px; }
  .title { font-size: 16px; font-weight: bold; color: #7c3aed; margin-bottom: 5px; }
  .meta { font-size: 10px; color: #64748b; margin-bottom: 15px; }
  .category-header { background-color: #f5f3ff; font-weight: bold; font-size: 12px; color: #4c1d95; padding: 8px; border: 1px solid #ddd6fe; }
</style>
</head>
<body>
  <div class="title">Relatório de Escalas por Ministério</div>
  <div class="meta">Gerado em: ${new Date().toLocaleString('pt-BR')}</div>`;

      Object.entries(agrupados).forEach(([minNome, lista]) => {
        html += `<table>
          <thead>
            <tr>
              <th colspan="7" class="category-header">Ministério: ${minNome}</th>
            </tr>
            <tr>
              <th>Evento</th>
              <th>Data/Hora</th>
              <th>Local</th>
              <th>Função Escalada</th>
              <th>Voluntário</th>
              <th>Confirmação</th>
              <th>Data Escalação</th>
            </tr>
          </thead>
          <tbody>`;

        lista.forEach(e => {
          html += `<tr>
            <td>${e.eventos_ministeriais?.titulo || ''}</td>
            <td>${e.eventos_ministeriais ? formatarDataFuso(e.eventos_ministeriais.data_evento) : ''}</td>
            <td>${e.eventos_ministeriais?.local || ''}</td>
            <td>${e.ministerio_funcoes?.nome || 'Geral'}</td>
            <td>${e.pessoas?.nome || ''}</td>
            <td>${e.status || 'pendente'}</td>
            <td>${new Date(e.created_at).toLocaleDateString('pt-BR')}</td>
          </tr>`;
        });

        html += `</tbody></table><br/>`;
      });

      html += `</body></html>`;

      const blob = new Blob([`\uFEFF${html}`], { type: 'application/vnd.ms-excel;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Escalas_por_Ministerio_${new Date().getFullYear()}.xls`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('✓ Relatório Excel de escalas baixado!');
    } catch (e) {
      console.error(e);
      alert('Erro ao exportar Excel: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function exportarEscalasPDF() {
    setLoading(true);
    try {
      const parseDatabaseDate = (str) => {
        if (!str) return null;
        if (!str.includes('Z') && !str.match(/[+-]\d{2}(:?\d{2})?$/)) {
          const clean = str.trim().replace(' ', 'T');
          return new Date(clean + 'Z');
        }
        return new Date(str);
      };

      const formatarDataFuso = (isoString) => {
        if (!isoString) return '';
        try {
          const date = parseDatabaseDate(isoString);
          const bDate = new Date(date.getTime() - 3 * 3600 * 1000);
          const YYYY = bDate.getUTCFullYear();
          const MM = String(bDate.getUTCMonth() + 1).padStart(2, '0');
          const DD = String(bDate.getUTCDate()).padStart(2, '0');
          const hh = String(bDate.getUTCHours()).padStart(2, '0');
          const mm = String(bDate.getUTCMinutes()).padStart(2, '0');
          return `${DD}/${MM}/${YYYY} ${hh}:${mm}`;
        } catch (e) {
          return new Date(isoString).toLocaleString('pt-BR');
        }
      };

      const { data: escalas, error } = await supabase
        .from('escalas')
        .select(`
          status,
          created_at,
          eventos_ministeriais (
            titulo,
            data_evento,
            local
          ),
          pessoas (
            nome
          ),
          ministerios (
            nome
          ),
          ministerio_funcoes (
            nome
          )
        `);

      if (error) throw error;

      const agrupados = {};
      (escalas || []).forEach(e => {
        const minNome = e.ministerios?.nome || 'Sem Ministério';
        if (!agrupados[minNome]) agrupados[minNome] = [];
        agrupados[minNome].push(e);
      });

      const doc = new jsPDF();
      let y = 20;
      const margin = 15;
      const pageWidth = 210;
      const pageHeight = 297;

      const trunc = (str, len) => (str && str.length > len) ? str.substring(0, len) + '...' : (str || '');

      const drawHeader = (title) => {
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(124, 58, 237);
        doc.text(title, margin, y);
        y += 6;
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, margin, y);
        y += 12;
      };

      drawHeader('Relatório de Escalas por Ministério');

      Object.entries(agrupados).forEach(([minNome, lista]) => {
        if (y > pageHeight - 35) {
          doc.addPage();
          y = 20;
          drawHeader('Relatório de Escalas por Ministério');
        }

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59);
        doc.text(`Ministério: ${minNome}`, margin, y);
        y += 6;

        doc.setFillColor(124, 58, 237);
        doc.rect(margin, y, pageWidth - 2 * margin, 8, 'F');
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);
        doc.text('Evento', margin + 2, y + 5.5);
        doc.text('Data/Hora', margin + 50, y + 5.5);
        doc.text('Local', margin + 82, y + 5.5);
        doc.text('Função', margin + 112, y + 5.5);
        doc.text('Voluntário', margin + 138, y + 5.5);
        doc.text('Confirmação', margin + 168, y + 5.5);
        y += 8;

        lista.forEach(e => {
          if (y > pageHeight - 15) {
            doc.addPage();
            y = 20;
            drawHeader('Relatório de Escalas por Ministério');

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(30, 41, 59);
            doc.text(`Ministério: ${minNome} (continuação)`, margin, y);
            y += 6;

            doc.setFillColor(124, 58, 237);
            doc.rect(margin, y, pageWidth - 2 * margin, 8, 'F');
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(255, 255, 255);
            doc.text('Evento', margin + 2, y + 5.5);
            doc.text('Data/Hora', margin + 50, y + 5.5);
            doc.text('Local', margin + 82, y + 5.5);
            doc.text('Função', margin + 112, y + 5.5);
            doc.text('Voluntário', margin + 138, y + 5.5);
            doc.text('Confirmação', margin + 168, y + 5.5);
            y += 8;
          }

          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(51, 65, 85);

          const evento = trunc(e.eventos_ministeriais?.titulo || '', 26);
          const dataHora = formatarDataFuso(e.eventos_ministeriais?.data_evento);
          const local = trunc(e.eventos_ministeriais?.local || '', 16);
          const funcao = trunc(e.ministerio_funcoes?.nome || 'Geral', 14);
          const voluntario = trunc(e.pessoas?.nome || '', 18);
          const status = e.status || 'pendente';

          doc.text(evento, margin + 2, y + 5);
          doc.text(dataHora, margin + 50, y + 5);
          doc.text(local, margin + 82, y + 5);
          doc.text(funcao, margin + 112, y + 5);
          doc.text(voluntario, margin + 138, y + 5);
          doc.text(status, margin + 168, y + 5);

          doc.setDrawColor(241, 245, 249);
          doc.line(margin, y + 7, pageWidth - margin, y + 7);
          y += 7;
        });

        y += 8;
      });

      doc.save(`Escalas_MIB_Church_${new Date().getFullYear()}.pdf`);
      showToast('✓ Relatório PDF de escalas baixado!');
    } catch (e) {
      console.error(e);
      alert('Erro ao exportar PDF: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function exportarProgramacaoMensalPDF(mes, ano) {
    setLoading(true);
    try {
      const { data: escalas, error } = await supabase
        .from('escalas')
        .select(`
          status,
          created_at,
          eventos_ministeriais (
            id,
            titulo,
            data_evento,
            local,
            fardamentos
          ),
          pessoas (
            nome
          ),
          ministerios (
            id,
            nome
          ),
          ministerio_funcoes (
            nome
          )
        `);

      if (error) throw error;

      const parseDatabaseDate = (str) => {
        if (!str) return null;
        if (!str.includes('Z') && !str.match(/[+-]\d{2}(:?\d{2})?$/)) {
          const clean = str.trim().replace(' ', 'T');
          return new Date(clean + 'Z');
        }
        return new Date(str);
      };

      const escalasFiltradas = (escalas || []).filter(e => {
        if (!e.eventos_ministeriais?.data_evento) return false;
        const date = parseDatabaseDate(e.eventos_ministeriais.data_evento);
        const bDate = new Date(date.getTime() - 3 * 3600 * 1000);
        return bDate.getUTCFullYear() === ano && bDate.getUTCMonth() === mes;
      });

      if (escalasFiltradas.length === 0) {
        alert('Nenhuma escala encontrada para o período selecionado.');
        setLoading(false);
        return;
      }

      const escalasPorEvento = {};
      escalasFiltradas.forEach(e => {
        const evId = e.eventos_ministeriais.id;
        if (!escalasPorEvento[evId]) {
          escalasPorEvento[evId] = {
            evento: e.eventos_ministeriais,
            itens: []
          };
        }
        escalasPorEvento[evId].itens.push(e);
      });

      const eventosOrdenados = Object.values(escalasPorEvento).sort((a, b) => {
        return new Date(a.evento.data_evento) - new Date(b.evento.data_evento);
      });

      const doc = new jsPDF();
      let y = 20;
      const margin = 15;
      const pageWidth = 210;
      const pageHeight = 297;
      const contentWidth = pageWidth - 2 * margin;

      const formatarDataFuso = (isoString) => {
        if (!isoString) return '';
        const diasSemana = ['DOMINGO', 'SEGUNDA-FEIRA', 'TERÇA-FEIRA', 'QUARTA-FEIRA', 'QUINTA-FEIRA', 'SEXTA-FEIRA', 'SÁBADO'];
        try {
          const date = parseDatabaseDate(isoString);
          const bDate = new Date(date.getTime() - 3 * 3600 * 1000);
          const YYYY = bDate.getUTCFullYear();
          const MM = String(bDate.getUTCMonth() + 1).padStart(2, '0');
          const DD = String(bDate.getUTCDate()).padStart(2, '0');
          const hh = String(bDate.getUTCHours()).padStart(2, '0');
          const mm = String(bDate.getUTCMinutes()).padStart(2, '0');
          const diaSemana = diasSemana[bDate.getUTCDay()];
          return `${diaSemana}, ${DD}/${MM}/${YYYY} às ${hh}:${mm}h`;
        } catch (e) {
          return new Date(isoString).toLocaleString('pt-BR');
        }
      };

      const nomesMeses = [
        'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
        'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
      ];

      const drawHeader = () => {
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(30, 58, 138);
        doc.text(`PROGRAMAÇÃO MENSAL DE ESCALAS - ${nomesMeses[mes]} / ${ano}`, margin, y);
        y += 6;
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`MIB CHURCH · QUADRO DE PROGRAMAÇÃO OFICIAL`, margin, y);
        doc.setDrawColor(226, 232, 240);
        doc.line(margin, y + 4, pageWidth - margin, y + 4);
        y += 12;
      };

      drawHeader();

      eventosOrdenados.forEach(({ evento, itens }) => {
        if (y > pageHeight - 45) {
          doc.addPage();
          y = 20;
          drawHeader();
        }

        doc.setFillColor(241, 245, 249);
        doc.rect(margin, y, contentWidth, 8, 'F');
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        const dataFormatada = formatarDataFuso(evento.data_evento);
        doc.text(`${dataFormatada} · ${evento.titulo.toUpperCase()}`, margin + 3, y + 5.5);
        y += 8;

        doc.setFillColor(30, 58, 138);
        doc.rect(margin, y, contentWidth, 7, 'F');
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);
        doc.text('MINISTÉRIO', margin + 3, y + 4.8);
        doc.text('FUNÇÃO', margin + 50, y + 4.8);
        doc.text('VOLUNTÁRIO ESCALADO', margin + 95, y + 4.8);
        doc.text('FARDA / DETALHE', margin + 145, y + 4.8);
        y += 7;

        const itensAgrupados = {};
        itens.forEach(item => {
          const minId = item.ministerios.id;
          const minNome = item.ministerios.nome;
          if (!itensAgrupados[minId]) {
            itensAgrupados[minId] = {
              nome: minNome,
              fardamento: evento.fardamentos?.[minId] || 'Nenhuma',
              escalados: []
            };
          }
          itensAgrupados[minId].escalados.push(item);
        });

        Object.values(itensAgrupados).forEach(({ nome, fardamento, escalados }) => {
          escalados.forEach((item, index) => {
            if (y > pageHeight - 15) {
              doc.addPage();
              y = 20;
              drawHeader();
              
              doc.setFillColor(241, 245, 249);
              doc.rect(margin, y, contentWidth, 8, 'F');
              doc.setFont('Helvetica', 'bold');
              doc.setFontSize(9);
              doc.setTextColor(30, 41, 59);
              doc.text(`${dataFormatada} · ${evento.titulo.toUpperCase()} (continuação)`, margin + 3, y + 5.5);
              y += 8;

              doc.setFillColor(30, 58, 138);
              doc.rect(margin, y, contentWidth, 7, 'F');
              doc.setFont('Helvetica', 'bold');
              doc.setFontSize(8);
              doc.setTextColor(255, 255, 255);
              doc.text('MINISTÉRIO', margin + 3, y + 4.8);
              doc.text('FUNÇÃO', margin + 50, y + 4.8);
              doc.text('VOLUNTÁRIO ESCALADO', margin + 95, y + 4.8);
              doc.text('FARDA / DETALHE', margin + 145, y + 4.8);
              y += 7;
            }

            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(71, 85, 105);

            const trunc = (str, len) => (str && str.length > len) ? str.substring(0, len) + '...' : (str || '');

            const ministerioStr = index === 0 ? trunc(nome, 22) : '';
            const funcaoStr = trunc(item.ministerio_funcoes?.nome || 'Geral', 22);
            const voluntarioStr = trunc(item.pessoas?.nome || '', 26);
            const fardaStr = index === 0 ? trunc(fardamento, 36) : '';

            if (index === 0 && escalados.length > 1) {
              doc.setDrawColor(241, 245, 249);
              doc.line(margin, y, pageWidth - margin, y);
            }

            doc.text(ministerioStr, margin + 3, y + 5);
            doc.text(funcaoStr, margin + 50, y + 5);
            
            if (item.status === 'confirmado') {
              doc.setFont('Helvetica', 'bold');
              doc.setTextColor(15, 23, 42);
            }
            doc.text(voluntarioStr, margin + 95, y + 5);
            doc.setFont('Helvetica', 'normal');
            doc.setTextColor(71, 85, 105);

            doc.text(fardaStr, margin + 145, y + 5);

            doc.setDrawColor(248, 250, 252);
            doc.line(margin, y + 7, pageWidth - margin, y + 7);
            y += 7;
          });
        });

        y += 8;
      });

      doc.save(`Programacao_Escalas_Mensal_${nomesMeses[mes]}_${ano}.pdf`);
      showToast('✓ Programação mensal PDF baixada!');
    } catch (e) {
      console.error(e);
      alert('Erro ao gerar relatório: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  // Processamento e Consolidação dos Indicadores (Dashboard V3)
  const stats = useMemo(() => {
    if (!rawDados) return null;
    const { ministerios, membros, escalas, historicos } = rawDados;

    // 1. Métricas Globais
    // Voluntários Ativos (indivíduos únicos servindo)
    const totalVoluntarios = new Set(membros.map(m => m.pessoa_id)).size;

    // Participações do Mês Corrente (escalas confirmadas)
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    const mesAtual = agora.getMonth(); // 0-indexed

    const parseDatabaseDate = (str) => {
      if (!str) return null;
      if (!str.includes('Z') && !str.match(/[+-]\d{2}(:?\d{2})?$/)) {
        const clean = str.trim().replace(' ', 'T');
        return new Date(clean + 'Z');
      }
      return new Date(str);
    };

    const escalasMesAtual = escalas.filter(e => {
      if (!e.eventos_ministeriais?.data_evento) return false;
      const date = parseDatabaseDate(e.eventos_ministeriais.data_evento);
      return date && date.getFullYear() === anoAtual && date.getMonth() === mesAtual;
    });

    const participacoesMes = escalasMesAtual.filter(e => e.status === 'confirmado').length;
    const escalasPendentes = escalas.filter(e => e.status === 'pendente' || !e.status).length;
    const escalasRecusadas = escalas.filter(e => e.status === 'recusado').length;

    // 2. Gráfico 1: Membros por Ministério
    const membrosPorMin = {};
    membros.forEach(m => {
      membrosPorMin[m.ministerio_id] = (membrosPorMin[m.ministerio_id] || 0) + 1;
    });
    const graficoMembrosPorMin = ministerios.map(min => ({
      id: min.id,
      nome: min.nome,
      cor: min.cor_principal || '#3b82f6',
      total: membrosPorMin[min.id] || 0
    })).sort((a, b) => b.total - a.total);

    // 3. Gráfico 2: Participações por Ministério
    const participacoesPorMin = {};
    escalas.forEach(e => {
      if (e.status === 'confirmado') {
        participacoesPorMin[e.ministerio_id] = (participacoesPorMin[e.ministerio_id] || 0) + 1;
      }
    });
    const graficoParticipacoesPorMin = ministerios.map(min => ({
      id: min.id,
      nome: min.nome,
      cor: min.cor_principal || '#8b5cf6',
      total: participacoesPorMin[min.id] || 0
    })).sort((a, b) => b.total - a.total);

    // 4. Gráfico 3: Top 10 Voluntários (confirmados)
    const voluntarioCounts = {};
    escalas.forEach(e => {
      if (e.status === 'confirmado' && e.pessoas?.nome) {
        voluntarioCounts[e.pessoas.nome] = (voluntarioCounts[e.pessoas.nome] || 0) + 1;
      }
    });
    const graficoTopVoluntarios = Object.entries(voluntarioCounts)
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    // 5. Gráfico 4: Top 10 Líderes por tamanho do time
    const lideresMembros = membros.filter(m => m.lider === true && m.pessoas?.nome);
    const liderStats = {};
    const liderNamesMap = {}; // pessoa_id -> nome
    lideresMembros.forEach(l => {
      liderNamesMap[l.pessoa_id] = l.pessoas.nome;
    });

    Object.keys(liderNamesMap).forEach(lPessoaId => {
      const leaderName = liderNamesMap[lPessoaId];
      // Quais ministérios ele coordena?
      const ledMinistryIds = membros
        .filter(m => m.pessoa_id === Number(lPessoaId) && m.lider === true)
        .map(m => m.ministerio_id);

      // Quantos membros únicos servem nesses ministérios?
      const uniqueVolunteers = new Set(
        membros
          .filter(m => ledMinistryIds.includes(m.ministerio_id))
          .map(m => m.pessoa_id)
      );
      liderStats[leaderName] = uniqueVolunteers.size;
    });

    const graficoTopLideres = Object.entries(liderStats)
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    // --- INDICADORES ANALÍTICOS (PERGUNTAS DO LÍDER) ---

    // P1: Qual ministério está crescendo? (Entradas nos últimos 60 dias)
    const crescimentoPorMin = {};
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - 60);

    historicos.forEach(h => {
      if (h.criado_em) {
        const date = new Date(h.criado_em);
        if (date >= dataLimite) {
          crescimentoPorMin[h.ministerio_id] = (crescimentoPorMin[h.ministerio_id] || 0) + 1;
        }
      }
    });

    const rankingCrescimento = ministerios.map(min => ({
      nome: min.nome,
      cor: min.cor_principal || '#10b981',
      novosMembros: crescimentoPorMin[min.id] || 0,
      totalMembros: membros.filter(m => m.ministerio_id === min.id).length
    })).sort((a, b) => b.novosMembros - a.novosMembros);

    // P2: Quem está sem escalar há meses? (Sem confirmado/pendente há mais de 30 dias ou nunca)
    const ultimaEscalaPorVoluntario = {};
    escalas.forEach(e => {
      if (!e.eventos_ministeriais?.data_evento) return;
      const date = parseDatabaseDate(e.eventos_ministeriais.data_evento);
      if (date) {
        const currentLatest = ultimaEscalaPorVoluntario[e.pessoa_id];
        if (!currentLatest || date > currentLatest) {
          ultimaEscalaPorVoluntario[e.pessoa_id] = date;
        }
      }
    });

    const voluntarioSemEscala = [];
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

    const pessoasUnicasMap = {};
    membros.forEach(m => {
      if (m.pessoas) {
        pessoasUnicasMap[m.pessoa_id] = m.pessoas;
      }
    });

    Object.entries(pessoasUnicasMap).forEach(([pessoaId, pessoa]) => {
      const ultimaData = ultimaEscalaPorVoluntario[pessoaId];
      if (!ultimaData) {
        voluntarioSemEscala.push({
          nome: pessoa.nome,
          foto_url: pessoa.foto_url,
          detalhe: 'Nunca foi escalado',
          diasInativo: 9999
        });
      } else if (ultimaData < trintaDiasAtras) {
        const diffTime = Math.abs(new Date() - ultimaData);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const YYYY = ultimaData.getFullYear();
        const MM = String(ultimaData.getMonth() + 1).padStart(2, '0');
        const DD = String(ultimaData.getDate()).padStart(2, '0');
        const dataFormatada = `${DD}/${MM}/${YYYY}`;
        
        voluntarioSemEscala.push({
          nome: pessoa.nome,
          foto_url: pessoa.foto_url,
          detalhe: `Sem escalas há ${diffDays} dias (${dataFormatada})`,
          diasInativo: diffDays
        });
      }
    });
    voluntarioSemEscala.sort((a, b) => b.diasInativo - a.diasInativo);

    // P3: Qual ministério está sobrecarregado? (Média de escalas confirmadas por membro ativo no mês)
    const rankingSobrecarga = ministerios.map(min => {
      const membrosCount = membros.filter(m => m.ministerio_id === min.id).length;
      const participacoesMin = escalasMesAtual.filter(e => e.ministerio_id === min.id && e.status === 'confirmado').length;
      
      const razao = membrosCount > 0 ? (participacoesMin / membrosCount) : 0;
      let statusSobrecarga = 'Normal ✅';
      let statusCor = 'text-emerald-600 bg-emerald-50 border-emerald-100';
      if (razao >= 3.0) {
        statusSobrecarga = 'Crítico 🔥';
        statusCor = 'text-red-600 bg-red-50 border-red-100';
      } else if (razao >= 1.5) {
        statusSobrecarga = 'Moderado ⚠️';
        statusCor = 'text-amber-600 bg-amber-50 border-amber-100';
      }

      return {
        nome: min.nome,
        cor: min.cor_principal || '#3b82f6',
        membrosCount,
        participacoesMin,
        razao: razao.toFixed(1),
        statusSobrecarga,
        statusCor
      };
    }).sort((a, b) => b.razao - a.razao);

    return {
      totalVoluntarios,
      participacoesMes,
      escalasPendentes,
      escalasRecusadas,
      graficoMembrosPorMin,
      graficoParticipacoesPorMin,
      graficoTopVoluntarios,
      graficoTopLideres,
      rankingCrescimento,
      voluntarioSemEscala,
      rankingSobrecarga
    };
  }, [rawDados]);

  // Valores máximos para proporção das barras nos gráficos
  const maxMembros = stats ? Math.max(...stats.graficoMembrosPorMin.map(i => i.total), 1) : 1;
  const maxParticipacoes = stats ? Math.max(...stats.graficoParticipacoesPorMin.map(i => i.total), 1) : 1;

  if (loading && !rawDados) {
    return (
      <div className="py-20 text-center text-slate-400 italic font-medium">
        Carregando painel analítico ministerial...
      </div>
    );
  }

  return (
    <div className="space-y-6 relative pb-10">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-xl animate-in slide-in-from-bottom-2 duration-300">
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* HEADER E TABS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Indicadores e Relatórios</h2>
          <p className="text-xs text-slate-500">Gestão analítica, auditoria de escalas e dados de participação.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1 self-stretch sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Dashboard V3
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('exportar')}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'exportar' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Exportar Planilhas
          </button>
        </div>
      </div>

      {activeTab === 'dashboard' && stats && (
        <div className="space-y-6">
          {/* CARDS INDICADORES */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Voluntários Ativos</p>
                  <h2 className="text-2xl sm:text-3xl font-black mt-1 text-slate-800 tracking-tight">{stats.totalVoluntarios}</h2>
                  <p className="text-[9px] text-slate-400 mt-1">Integrados em ministérios</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Users size={18} />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Serviços do Mês</p>
                  <h2 className="text-2xl sm:text-3xl font-black mt-1 text-slate-800 tracking-tight">{stats.participacoesMes}</h2>
                  <p className="text-[9px] text-slate-400 mt-1">Escalas confirmadas</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <CheckCircle size={18} />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Escalas Pendentes</p>
                  <h2 className="text-2xl sm:text-3xl font-black mt-1 text-slate-800 tracking-tight">{stats.escalasPendentes}</h2>
                  <p className="text-[9px] text-slate-400 mt-1">Aguardando resposta</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <AlertCircle size={18} />
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recusas Gerais</p>
                  <h2 className="text-2xl sm:text-3xl font-black mt-1 text-slate-800 tracking-tight">{stats.escalasRecusadas}</h2>
                  <p className="text-[9px] text-slate-400 mt-1">Ausências notificadas</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                  <XCircle size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* GRID DE GRÁFICOS */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Coluna 1: Dados por Ministério */}
            <div className="space-y-6">
              {/* Gráfico 1: Membros por Ministério */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-50 text-slate-800">
                  <Users className="text-blue-500" size={18} />
                  <h3 className="font-black text-xs uppercase tracking-wider">Membros por Ministério</h3>
                </div>
                <div className="space-y-3.5">
                  {stats.graficoMembrosPorMin.map((item) => (
                    <div key={item.id} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-600">
                        <span>{item.nome}</span>
                        <span className="font-black text-slate-800">{item.total} voluntários</span>
                      </div>
                      <div className="w-full bg-slate-50 border border-slate-100 h-3 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500" 
                          style={{ 
                            width: `${(item.total / maxMembros) * 100}%`,
                            backgroundColor: item.cor 
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                  {stats.graficoMembrosPorMin.length === 0 && (
                    <p className="text-xs text-slate-400 italic py-4 text-center">Nenhum ministério vinculado.</p>
                  )}
                </div>
              </div>

              {/* Gráfico 2: Participações por Ministério */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-50 text-slate-800">
                  <Target className="text-purple-500" size={18} />
                  <h3 className="font-black text-xs uppercase tracking-wider">Participações por Ministério (Mês)</h3>
                </div>
                <div className="space-y-3.5">
                  {stats.graficoParticipacoesPorMin.map((item) => (
                    <div key={item.id} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-600">
                        <span>{item.nome}</span>
                        <span className="font-black text-slate-800">{item.total} escalas confirmadas</span>
                      </div>
                      <div className="w-full bg-slate-50 border border-slate-100 h-3 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500 shadow-sm" 
                          style={{ 
                            width: `${(item.total / maxParticipacoes) * 100}%`,
                            backgroundColor: item.cor 
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                  {stats.graficoParticipacoesPorMin.length === 0 && (
                    <p className="text-xs text-slate-400 italic py-4 text-center">Nenhuma escala confirmada registrada.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Coluna 2: Rankings Individuais */}
            <div className="space-y-6">
              {/* Gráfico 3: Top 10 Voluntários */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-50 text-slate-800">
                  <Award className="text-amber-500" size={18} />
                  <h3 className="font-black text-xs uppercase tracking-wider">Top 10 Voluntários (Mês)</h3>
                </div>
                <div className="divide-y divide-slate-50">
                  {stats.graficoTopVoluntarios.map((item, index) => (
                    <div key={item.nome} className="flex items-center justify-between text-xs py-2.5 first:pt-0 last:pb-0">
                      <span className="flex items-center gap-2.5 text-slate-600 font-bold">
                        <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-[10px] font-black">{index + 1}</span>
                        {item.nome}
                      </span>
                      <span className="font-black text-slate-800">{item.total} participações</span>
                    </div>
                  ))}
                  {stats.graficoTopVoluntarios.length === 0 && (
                    <p className="text-xs text-slate-400 italic py-6 text-center">Nenhum dado de escala disponível.</p>
                  )}
                </div>
              </div>

              {/* Gráfico 4: Top 10 Líderes */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-50 text-slate-800">
                  <Star className="text-blue-500" size={18} />
                  <h3 className="font-black text-xs uppercase tracking-wider">Top 10 Líderes por tamanho do time</h3>
                </div>
                <div className="divide-y divide-slate-50">
                  {stats.graficoTopLideres.map((item, index) => (
                    <div key={item.nome} className="flex items-center justify-between text-xs py-2.5 first:pt-0 last:pb-0">
                      <span className="flex items-center gap-2.5 text-slate-600 font-bold">
                        <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-black">{index + 1}</span>
                        {item.nome}
                      </span>
                      <span className="font-black text-slate-800">{item.total} voluntários</span>
                    </div>
                  ))}
                  {stats.graficoTopLideres.length === 0 && (
                    <p className="text-xs text-slate-400 italic py-6 text-center">Nenhum coordenador de equipe registrado.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CENTRAL DE RESPOSTAS DA LIDERANÇA */}
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-slate-800">
            <div className="absolute top-[-30%] right-[-10%] w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-500/15">
                <TrendingUp size={18} />
              </div>
              <div>
                <h3 className="text-base font-black uppercase tracking-wider">Central de Perguntas Estratégicas</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Visão analítica gerencial para tomada de decisão pastoral e coordenação.</p>
              </div>
            </div>

            {/* BOTÕES DE PERGUNTAS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
              <button
                type="button"
                onClick={() => setActiveQuestao('crescimento')}
                className={`py-3 px-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-wider border transition-all text-center cursor-pointer ${
                  activeQuestao === 'crescimento'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/10'
                    : 'bg-slate-800/50 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                📈 Ministério Crescendo?
              </button>
              <button
                type="button"
                onClick={() => setActiveQuestao('sem_escalar')}
                className={`py-3 px-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-wider border transition-all text-center cursor-pointer ${
                  activeQuestao === 'sem_escalar'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/10'
                    : 'bg-slate-800/50 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                ⏳ Sem Escalar há Meses?
              </button>
              <button
                type="button"
                onClick={() => setActiveQuestao('sobrecarga')}
                className={`py-3 px-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-wider border transition-all text-center cursor-pointer ${
                  activeQuestao === 'sobrecarga'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/10'
                    : 'bg-slate-800/50 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                🔥 Ministério Sobrecarregado?
              </button>
              <button
                type="button"
                onClick={() => setActiveQuestao('lider_equipe')}
                className={`py-3 px-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-wider border transition-all text-center cursor-pointer ${
                  activeQuestao === 'lider_equipe'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/10'
                    : 'bg-slate-800/50 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                👑 Líder com mais pessoas?
              </button>
            </div>

            {/* PAINEL DE CONTEÚDO DA RESPOSTA SELECIONADA */}
            <div className="mt-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 md:p-6 min-h-[180px]">
              
              {activeQuestao === 'crescimento' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-black text-white">Ministérios com Maior Expansão</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Ranqueados pelo total de novos membros adicionados nos últimos 60 dias.</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {stats.rankingCrescimento.slice(0, 4).map((min) => (
                      <div key={min.nome} className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white">{min.nome}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Total de membros: {min.totalMembros}</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${
                            min.novosMembros > 0 
                              ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/20' 
                              : 'bg-slate-800 text-slate-405 border-slate-700'
                          }`}>
                            {min.novosMembros > 0 ? `+${min.novosMembros} novos` : 'Estável'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeQuestao === 'sem_escalar' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-black text-white">Voluntários sem Participações Recentes</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Voluntários ativos integrados em equipes sem escalas há mais de 30 dias (ou nunca escalados).</p>
                  </div>
                  <div className="max-h-[220px] overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                    {stats.voluntarioSemEscala.map((vol) => (
                      <div key={vol.nome} className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
                        <img
                          src={vol.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(vol.nome)}`}
                          className="w-8 h-8 rounded-full object-cover"
                          alt=""
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{vol.nome}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{vol.detalhe}</p>
                        </div>
                        <div className="text-slate-400 flex items-center">
                          <AlertTriangle className="text-amber-500" size={14} />
                        </div>
                      </div>
                    ))}
                    {stats.voluntarioSemEscala.length === 0 && (
                      <p className="text-xs text-slate-400 italic py-6 text-center">Todos os voluntários foram escalados nos últimos 30 dias!</p>
                    )}
                  </div>
                </div>
              )}

              {activeQuestao === 'sobrecarga' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-black text-white">Sobrecarga de Voluntários no Mês</h4>
                    <p className="text-[10px] text-slate-450 mt-0.5">
                      Fator calculado dividindo o total de escalas confirmadas pela quantidade de membros ativos. Fatores altos indicam que poucos voluntários estão trabalhando excessivamente.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {stats.rankingSobrecarga.slice(0, 4).map((min) => (
                      <div key={min.nome} className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between gap-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs font-bold text-white">{min.nome}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {min.participacoesMin} participações · {min.membrosCount} membros
                            </p>
                          </div>
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${min.statusCor}`}>
                            {min.statusSobrecarga}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-800 pt-2">
                          <span>Média escalas / voluntário:</span>
                          <strong className="text-white text-xs font-black">{min.razao}x</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeQuestao === 'lider_equipe' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-black text-white">Líderes com Maiores Equipes</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Total de membros individuais diferentes coordenados sob o comando de cada líder.</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {stats.graficoTopLideres.slice(0, 6).map((item, index) => (
                      <div key={item.nome} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center flex flex-col justify-center items-center relative">
                        <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-black flex items-center justify-center">
                          #{index + 1}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2.5 mt-1 border border-blue-500/15">
                          <ShieldCheck size={20} />
                        </div>
                        <p className="text-xs font-bold text-white">{item.nome}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider text-blue-450">{item.total} pessoas</p>
                      </div>
                    ))}
                    {stats.graficoTopLideres.length === 0 && (
                      <p className="col-span-3 text-xs text-slate-400 italic py-6 text-center">Nenhum coordenador cadastrado.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'exportar' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {/* Card Exportar Voluntários */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between group hover:border-slate-200 transition">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Users size={20} />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Relatório Geral de Voluntários</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Exporta uma lista completa estruturada de voluntários contendo nome, e-mail, telefone, cargo, ministérios e funções específicas correspondentes, agrupados por Ministério.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={exportarVoluntariosPDF}
                disabled={loading}
                className="py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-[10px] font-black uppercase tracking-wider transition active:scale-98 disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer border border-red-100"
              >
                <Download size={12} />
                PDF
              </button>
              <button
                type="button"
                onClick={exportarVoluntariosExcel}
                disabled={loading}
                className="py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-wider transition active:scale-98 disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer border border-emerald-100"
              >
                <FileSpreadsheet size={12} />
                Excel
              </button>
              <button
                type="button"
                onClick={exportarVoluntarios}
                disabled={loading}
                className="py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider transition active:scale-98 disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer border border-slate-200"
              >
                <Download size={12} />
                CSV
              </button>
            </div>
          </div>

          {/* Card Exportar Histórico de Escalas */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between group hover:border-slate-200 transition">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Calendar size={20} />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Histórico Consolidado de Escalas</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Tabela detalhada de todas as escalas cadastradas no sistema, incluindo o título do evento, data/hora, local, função escalada, voluntário atribuído e status de confirmação, agrupados por Ministério.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={exportarEscalasPDF}
                disabled={loading}
                className="py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-[10px] font-black uppercase tracking-wider transition active:scale-98 disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer border border-red-100"
              >
                <Download size={12} />
                PDF
              </button>
              <button
                type="button"
                onClick={exportarEscalasExcel}
                disabled={loading}
                className="py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-wider transition active:scale-98 disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer border border-emerald-100"
              >
                <FileSpreadsheet size={12} />
                Excel
              </button>
              <button
                type="button"
                onClick={exportarEscalas}
                disabled={loading}
                className="py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider transition active:scale-98 disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer border border-slate-200"
              >
                <Download size={12} />
                CSV
              </button>
            </div>
          </div>

          {/* Card Programação Mensal para Quadro de Avisos */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between group hover:border-slate-200 transition">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-100">
                <Calendar size={20} />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Programação Mensal (Quadro Mural)</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Gera um PDF diagramado e otimizado para impressão física e fixação no quadro de avisos ou mural de programação da igreja.
              </p>

              {/* Seletores de Período */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Mês</label>
                  <select
                    value={mesSelecionado}
                    onChange={(e) => setMesSelecionado(parseInt(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-700 mt-1 cursor-pointer focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value={0}>Janeiro</option>
                    <option value={1}>Fevereiro</option>
                    <option value={2}>Março</option>
                    <option value={3}>Abril</option>
                    <option value={4}>Maio</option>
                    <option value={5}>Junho</option>
                    <option value={6}>Julho</option>
                    <option value={7}>Agosto</option>
                    <option value={8}>Setembro</option>
                    <option value={9}>Outubro</option>
                    <option value={10}>Novembro</option>
                    <option value={11}>Dezembro</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Ano</label>
                  <select
                    value={anoSelecionado}
                    onChange={(e) => setAnoSelecionado(parseInt(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-700 mt-1 cursor-pointer focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {anosDisponiveis.map(ano => (
                      <option key={ano} value={ano}>{ano}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => exportarProgramacaoMensalPDF(mesSelecionado, anoSelecionado)}
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition active:scale-98 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-200"
              >
                <Download size={12} strokeWidth={3} />
                Gerar PDF de Programação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
