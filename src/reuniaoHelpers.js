export const MARCADOR_METADADOS_REUNIAO = '---MIB_METADADOS---';

export function montarObservacoesComMetadados(observacao, tema, nomesVisitantes) {
  const blocoMetadados = [
    MARCADOR_METADADOS_REUNIAO,
    `tema: ${tema || ''}`,
    `visitantes: ${(nomesVisitantes || []).join('|')}`,
  ].join('\n');
  const texto = (observacao || '').trim();
  return texto ? `${texto}\n\n${blocoMetadados}` : blocoMetadados;
}

export function valorOfertaRelatorio(relatorio) {
  return Number(relatorio?.oferta ?? relatorio?.valor_oferta ?? 0);
}
