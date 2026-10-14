import { MUSICAS_SEED_PADRAO } from './repertorioService.js';
import { normalizarTexto } from '../churchUtils.js';

// Cache em memória para buscas recentes (evita requisições repetidas)
const searchCache = new Map();

// Base complementar de louvores populares com Tom e BPM padrão conhecidos
const BASE_TOM_BPM_GOSPEL = [
  ...MUSICAS_SEED_PADRAO,
  { titulo: 'Me Atraiu', artista: 'Gabriela Rocha', tom: 'D', bpm: 72, tipo: 'Adoração' },
  { titulo: 'Rompendo em Fé', artista: 'Comunidade da Zona Sul', tom: 'G', bpm: 125, tipo: 'Celebração' },
  { titulo: 'Vim Para Adorar-te', artista: 'Quatro Por Um', tom: 'E', bpm: 76, tipo: 'Adoração' },
  { titulo: 'Aos Pés da Cruz', artista: 'Kleber Lucas', tom: 'G', bpm: 70, tipo: 'Adoração' },
  { titulo: 'Deus Cuida de Mim', artista: 'Kleber Lucas', tom: 'C', bpm: 68, tipo: 'Adoração' },
  { titulo: 'Sabor de Mel', artista: 'Damares', tom: 'F', bpm: 120, tipo: 'Celebração' },
  { titulo: 'Alívio', artista: 'Jessé Aguiar', tom: 'D', bpm: 65, tipo: 'Adoração' },
  { titulo: 'Deserto', artista: 'Maria Marçal', tom: 'Ab', bpm: 68, tipo: 'Adoração' },
  { titulo: 'Escudo', artista: 'Voz da Verdade', tom: 'Am', bpm: 72, tipo: 'Adoração' },
  { titulo: 'Sou Humano', artista: 'Bruna Karla', tom: 'C', bpm: 68, tipo: 'Adoração' },
  { titulo: 'Cicatrizes', artista: 'Bruna Karla', tom: 'G', bpm: 70, tipo: 'Adoração' },
  { titulo: 'Advogado Fiel', artista: 'Bruna Karla', tom: 'E', bpm: 66, tipo: 'Adoração' },
  { titulo: 'Faz um Milagre em Mim', artista: 'Regis Danese', tom: 'G', bpm: 74, tipo: 'Adoração' },
  { titulo: 'Tu És Bom', artista: 'Fred Arrais', tom: 'E', bpm: 130, tipo: 'Celebração' },
  { titulo: 'Galileu', artista: 'Fernandinho', tom: 'G', bpm: 128, tipo: 'Celebração' },
  { titulo: 'Caia Fogo', artista: 'Fernandinho', tom: 'Am', bpm: 126, tipo: 'Celebração' },
  { titulo: 'Uma Nova História', artista: 'Fernandinho', tom: 'D', bpm: 125, tipo: 'Celebração' },
  { titulo: 'Grandes Coisas', artista: 'Fernandinho', tom: 'B', bpm: 124, tipo: 'Celebração' },
  { titulo: 'Teus Sonhos', artista: 'Fernandinho', tom: 'A', bpm: 72, tipo: 'Adoração' },
  { titulo: 'Nada Além de Ti', artista: 'Gabriela Rocha', tom: 'C', bpm: 70, tipo: 'Adoração' },
  { titulo: 'Eu Navegarei', artista: 'Gabriela Rocha', tom: 'Em', bpm: 68, tipo: 'Adoração' },
  { titulo: 'Diz', artista: 'Gabriela Rocha', tom: 'F', bpm: 70, tipo: 'Adoração' },
  { titulo: 'Creio em Ti', artista: 'Gabriela Rocha', tom: 'C', bpm: 68, tipo: 'Adoração' },
  { titulo: 'Pai Nosso', artista: 'Pedras Vivas', tom: 'G', bpm: 72, tipo: 'Adoração' },
  { titulo: 'Que Amor É Esse', artista: 'Luma Elpidio', tom: 'E', bpm: 68, tipo: 'Adoração' },
  { titulo: 'Volte a Sonhar', artista: 'Elaine Martins', tom: 'F', bpm: 65, tipo: 'Adoração' },
  { titulo: 'Pintor do Mundo', artista: 'Pr. Lucas', tom: 'C', bpm: 72, tipo: 'Adoração' },
  { titulo: 'Caminho no Deserto (Way Maker)', artista: 'Soraya Moraes', tom: 'E', bpm: 68, tipo: 'Adoração' },
  { titulo: 'A Bênção (The Blessing)', artista: 'Gabriel Guedes', tom: 'B', bpm: 70, tipo: 'Adoração' },
  { titulo: 'Noites Traiçoeiras', artista: 'Padre Marcelo Rossi', tom: 'G', bpm: 66, tipo: 'Adoração' },
  { titulo: 'Porque Ele Vive', artista: 'Harpa Cristã', tom: 'Ab', bpm: 80, tipo: 'Celebração' },
  { titulo: 'Grandioso És Tu', artista: 'Harpa Cristã', tom: 'Bb', bpm: 84, tipo: 'Adoração' },
  { titulo: 'Sossegai', artista: 'Harpa Cristã', tom: 'C', bpm: 90, tipo: 'Adoração' },
  { titulo: 'Em Fervente Oração', artista: 'Harpa Cristã', tom: 'Eb', bpm: 88, tipo: 'Adoração' },
  { titulo: 'Alvo Mais Que a Neve', artista: 'Harpa Cristã', tom: 'G', bpm: 85, tipo: 'Celebração' }
];

/**
 * Busca sugestões de músicas em tempo real.
 * Combina músicas da biblioteca da igreja + catálogo oficial online (iTunes Brasil).
 * @param {string} termo - Nome digitado pelo usuário
 * @param {Array} musicasBiblioteca - Músicas já cadastradas na igreja
 * @returns {Promise<Array>} Lista de sugestões
 */
export async function buscarSugestoesMusica(termo, musicasBiblioteca = []) {
  if (!termo || termo.trim().length < 2) {
    return [];
  }

  const termoNormalizado = normalizarTexto(termo.trim());
  const cacheKey = termoNormalizado.toLowerCase();

  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey);
  }

  // 1. Procurar nas músicas locais da igreja e na base gospel conhecida
  const matchesLocais = [];
  const todasLocais = [...(musicasBiblioteca || []), ...BASE_TOM_BPM_GOSPEL];
  const titulosJaAdicionados = new Set();

  for (const item of todasLocais) {
    if (!item.titulo) continue;
    const titNorm = normalizarTexto(item.titulo);
    const artNorm = normalizarTexto(item.artista || '');
    const combinado = `${titNorm} ${artNorm}`;

    if (titNorm.includes(termoNormalizado) || combinado.includes(termoNormalizado)) {
      const chaveUnica = `${titNorm}__${artNorm}`.toLowerCase();
      if (!titulosJaAdicionados.has(chaveUnica)) {
        titulosJaAdicionados.add(chaveUnica);
        matchesLocais.push({
          id: `local-${item.id || titNorm}`,
          titulo: item.titulo,
          artista: item.artista || 'Gospel',
          tom: item.tom || 'G',
          bpm: item.bpm ? String(item.bpm) : '',
          tipo: item.tipo || 'Adoração',
          voz: item.voz || 'Misto',
          origem: item.id && !item.id.toString().startsWith('seed-') ? 'Biblioteca MIB' : 'Acervo MIB',
          capa: null,
          previewAudio: null,
          linkCifra: item.link || `https://www.cifraclub.com.br/?q=${encodeURIComponent(`${item.titulo} ${item.artista || ''}`.trim())}`,
          linkYoutube: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${item.titulo} ${item.artista || ''}`.trim())}`
        });
      }
    }
  }

  // 2. Buscar na API do iTunes Store Brasil (online)
  let resultadosOnline = [];
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(termo.trim())}&country=BR&entity=song&limit=12`;
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      if (Array.isArray(data?.results)) {
        resultadosOnline = data.results.map(r => {
          const trackTitle = r.trackName || '';
          const artist = r.artistName || '';
          const genero = r.primaryGenreName || '';

          // Verificar se temos Tom/BPM conhecidos no nosso acervo para esse louvor
          const matchConhecido = todasLocais.find(loc => {
            const tLoc = normalizarTexto(loc.titulo || '');
            const tTrack = normalizarTexto(trackTitle);
            return tTrack.includes(tLoc) || tLoc.includes(tTrack);
          });

          return {
            id: `itunes-${r.trackId}`,
            titulo: trackTitle,
            artista: artist,
            album: r.collectionName || '',
            ano: r.releaseDate ? r.releaseDate.substring(0, 4) : '',
            genero: genero,
            capa: r.artworkUrl100 || r.artworkUrl60 || '',
            previewAudio: r.previewUrl || '',
            origem: 'Catálogo Online',
            tom: matchConhecido?.tom || '',
            bpm: matchConhecido?.bpm ? String(matchConhecido.bpm) : '',
            tipo: matchConhecido?.tipo || (genero.toLowerCase().includes('relig') ? 'Adoração' : 'Celebração'),
            linkCifra: `https://www.cifraclub.com.br/?q=${encodeURIComponent(`${trackTitle} ${artist}`.trim())}`,
            linkYoutube: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${trackTitle} ${artist}`.trim())}`,
            linkApple: r.trackViewUrl || ''
          };
        });

        // Priorizar músicas religiosas / gospel no topo
        resultadosOnline.sort((a, b) => {
          const aGospel = a.genero.toLowerCase().includes('relig') || a.genero.toLowerCase().includes('crist') || a.genero.toLowerCase().includes('gospel');
          const bGospel = b.genero.toLowerCase().includes('relig') || b.genero.toLowerCase().includes('crist') || b.genero.toLowerCase().includes('gospel');
          if (aGospel && !bGospel) return -1;
          if (!aGospel && bGospel) return 1;
          return 0;
        });
      }
    }
  } catch (err) {
    console.warn('[musicaBuscaService] Erro ao buscar catálogo online:', err);
  }

  // 3. Mesclar resultados (locais com tom conhecido + online com capa e links)
  const listaFinal = [...matchesLocais];
  for (const onl of resultadosOnline) {
    const chaveUnica = `${normalizarTexto(onl.titulo)}__${normalizarTexto(onl.artista)}`.toLowerCase();
    if (!titulosJaAdicionados.has(chaveUnica)) {
      titulosJaAdicionados.add(chaveUnica);
      listaFinal.push(onl);
    }
  }

  const limitados = listaFinal.slice(0, 8);
  searchCache.set(cacheKey, limitados);
  return limitados;
}
