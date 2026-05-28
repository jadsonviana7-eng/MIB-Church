export const MARCADOR_METADADOS_REUNIAO = '---MIB_METADADOS---';

export function extrairMetadadosReuniao(observacoesBrutas) {
  if (!observacoesBrutas) return { observacao: '', tema: '', nomesVisitantes: [] };

  const partes = observacoesBrutas.split(MARCADOR_METADADOS_REUNIAO);
  const observacao = partes[0] || '';

  if (partes.length < 2) return { observacao, tema: '', nomesVisitantes: [] };

  const metadadosStr = partes[1] || '';
  const linhas = metadadosStr.split('\n').map(l => l.trim()).filter(Boolean);

  let tema = '';
  let nomesVisitantes = [];

  linhas.forEach(linha => {
    if (linha.startsWith('Tema:')) {
      tema = linha.slice(5).trim();
    } else if (linha.startsWith('Visitantes:')) {
      const lista = linha.slice(11).trim();
      nomesVisitantes = lista ? lista.split('|').map(n => n.trim()).filter(Boolean) : [];
    }
  });

  return { observacao, tema, nomesVisitantes };
}

export function montarObservacoesComMetadados(observacao, tema, nomesVisitantes) {
  let metadados = '';
  if (tema) metadados += `Tema: ${tema}\n`;
  if (nomesVisitantes.length > 0) metadados += `Visitantes: ${nomesVisitantes.join('|')}\n`;

  return observacao + (metadados ? `\n\n${MARCADOR_METADADOS_REUNIAO}\n${metadados}` : '');
}