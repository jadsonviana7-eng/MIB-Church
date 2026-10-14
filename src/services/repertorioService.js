import { supabase } from '../supabaseClient';
import { normalizarTexto } from '../churchUtils';

const STORAGE_KEY_MUSICAS = 'mib_repertorio_musicas';
const STORAGE_KEY_REPERTORIOS = 'mib_repertorio_cultos';
const STORAGE_KEY_BIBLIOTECAS = 'mib_repertorio_bibliotecas';

// Bibliotecas Padrão Recomendadas
export const BIBLIOTECAS_PADRAO = [
  { id: 'bib-1', nome: 'Celebração Feminina', descricao: 'Músicas animadas de celebração com tons adaptados para vocal feminino', cor: '#ec4899', tipo: 'Celebração', voz: 'Feminino' },
  { id: 'bib-2', nome: 'Celebração Masculina', descricao: 'Músicas animadas de celebração com tons adaptados para vocal masculino', cor: '#2563eb', tipo: 'Celebração', voz: 'Masculino' },
  { id: 'bib-3', nome: 'Celebração Mista', descricao: 'Músicas animadas de celebração para vocal misto ou duetos', cor: '#a855f7', tipo: 'Celebração', voz: 'Misto' },
  { id: 'bib-4', nome: 'Adoração Feminina', descricao: 'Músicas de adoração congregacional em tons femininos', cor: '#ec4899', tipo: 'Adoração', voz: 'Feminino' },
  { id: 'bib-5', nome: 'Adoração Masculina', descricao: 'Músicas de adoração congregacional em tons masculinos', cor: '#2563eb', tipo: 'Adoração', voz: 'Masculino' },
  { id: 'bib-6', nome: 'Adoração Mista', descricao: 'Músicas de adoração congregacional para vocal misto ou duetos', cor: '#a855f7', tipo: 'Adoração', voz: 'Misto' },
  { id: 'bib-7', nome: 'Pós Pregação', descricao: 'Músicas de resposta à palavra, ministração e apelo', cor: '#f59e0b', tipo: 'Pós pregação', voz: 'Misto' }
];

// 25 Músicas Populares Cristãs para Seed Inicial da Biblioteca
export const MUSICAS_SEED_PADRAO = [
  { id: 'seed-1', titulo: 'É Tudo Sobre Você', artista: 'Morada', tipo: 'Celebração', biblioteca: 'Celebração Masculina', voz: 'Masculino', tom: 'D', bpm: 128 },
  { id: 'seed-2', titulo: 'Para Ti Eu Vou', artista: 'Central 3', tipo: 'Celebração', biblioteca: 'Celebração Masculina', voz: 'Masculino', tom: 'G', bpm: 130 },
  { id: 'seed-3', titulo: 'Pra Sempre (Forever)', artista: 'Fernandinho', tipo: 'Celebração', biblioteca: 'Celebração Masculina', voz: 'Masculino', tom: 'A', bpm: 124 },
  { id: 'seed-4', titulo: 'A Ele a Glória', artista: 'Gabriela Rocha', tipo: 'Celebração', biblioteca: 'Celebração Feminina', voz: 'Feminino', tom: 'C', bpm: 120 },
  { id: 'seed-5', titulo: 'O Hino (The Anthem)', artista: 'Fernandinho', tipo: 'Celebração', biblioteca: 'Celebração Masculina', voz: 'Masculino', tom: 'E', bpm: 126 },
  { id: 'seed-6', titulo: 'Grande é o Senhor', artista: 'Adhemar de Campos', tipo: 'Celebração', biblioteca: 'Celebração Masculina', voz: 'Masculino', tom: 'A', bpm: 118 },
  { id: 'seed-7', titulo: 'Toda Terra', artista: 'Central 3', tipo: 'Celebração', biblioteca: 'Celebração Masculina', voz: 'Masculino', tom: 'D', bpm: 132 },
  { id: 'seed-8', titulo: 'Yeshua', artista: 'Fernandinho', tipo: 'Celebração', biblioteca: 'Celebração Masculina', voz: 'Masculino', tom: 'Bm', bpm: 125 },
  
  { id: 'seed-9', titulo: 'Lugar Secreto', artista: 'Gabriela Rocha', tipo: 'Adoração', biblioteca: 'Adoração Feminina', voz: 'Feminino', tom: 'C', bpm: 68 },
  { id: 'seed-10', titulo: 'A Casa É Sua', artista: 'Casa Worship', tipo: 'Adoração', biblioteca: 'Adoração Masculina', voz: 'Masculino', tom: 'G', bpm: 72 },
  { id: 'seed-11', titulo: 'Quero Conhecer Jesus', artista: 'Alessandro Vilas Boas', tipo: 'Adoração', biblioteca: 'Adoração Masculina', voz: 'Masculino', tom: 'Em', bpm: 70 },
  { id: 'seed-12', titulo: 'Bondade de Deus', artista: 'Isaías Saad', tipo: 'Adoração', biblioteca: 'Adoração Masculina', voz: 'Masculino', tom: 'Ab', bpm: 70 },
  { id: 'seed-13', titulo: 'Me Atraiu', artista: 'Gabriela Rocha', tipo: 'Adoração', biblioteca: 'Adoração Feminina', voz: 'Feminino', tom: 'D', bpm: 72 },
  { id: 'seed-14', titulo: 'Vitorioso És', artista: 'Gabriel Guedes', tipo: 'Adoração', biblioteca: 'Adoração Masculina', voz: 'Masculino', tom: 'B', bpm: 74 },
  { id: 'seed-15', titulo: 'Só Tu És Santo', artista: 'Morada', tipo: 'Adoração', biblioteca: 'Adoração Masculina', voz: 'Masculino', tom: 'F', bpm: 66 },
  { id: 'seed-16', titulo: 'Santo Espírito', artista: 'Laura Souguellis', tipo: 'Adoração', biblioteca: 'Adoração Feminina', voz: 'Feminino', tom: 'D', bpm: 72 },
  { id: 'seed-17', titulo: 'Digno de Tudo', artista: 'David Quinlan', tipo: 'Adoração', biblioteca: 'Adoração Masculina', voz: 'Masculino', tom: 'D', bpm: 68 },
  { id: 'seed-18', titulo: 'Rei dos Reis (King of Kings)', artista: 'Hillsong / Gabriela Rocha', tipo: 'Adoração', biblioteca: 'Adoração Feminina', voz: 'Feminino', tom: 'D', bpm: 68 },

  { id: 'seed-19', titulo: 'Ruja o Leão', artista: 'Talita Catanzaro', tipo: 'Pós pregação', biblioteca: 'Pós Pregação', voz: 'Feminino', tom: 'A', bpm: 70 },
  { id: 'seed-20', titulo: 'Em Teus Braços', artista: 'Laura Souguellis', tipo: 'Pós pregação', biblioteca: 'Pós Pregação', voz: 'Feminino', tom: 'G', bpm: 65 },
  { id: 'seed-21', titulo: 'Teu Amor Não Falha', artista: 'Nívea Soares', tipo: 'Pós pregação', biblioteca: 'Pós Pregação', voz: 'Feminino', tom: 'C', bpm: 74 },
  { id: 'seed-22', titulo: 'Ousado Amor', artista: 'Isaías Saad', tipo: 'Pós pregação', biblioteca: 'Pós Pregação', voz: 'Masculino', tom: 'Gb', bpm: 72 },
  { id: 'seed-23', titulo: 'Deus de Promessas', artista: 'Davi Sacer', tipo: 'Pós pregação', biblioteca: 'Pós Pregação', voz: 'Masculino', tom: 'F#m', bpm: 68 },
  { id: 'seed-24', titulo: 'Todavia Me Alegrarei', artista: 'Samuel Messias', tipo: 'Pós pregação', biblioteca: 'Pós Pregação', voz: 'Masculino', tom: 'E', bpm: 64 },
  { id: 'seed-25', titulo: 'Ele Continua Sendo Bom', artista: 'Paulo César Baruk', tipo: 'Pós pregação', biblioteca: 'Pós Pregação', voz: 'Masculino', tom: 'G', bpm: 68 }
];

function getLocalBibliotecas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BIBLIOTECAS);
    if (!raw) return BIBLIOTECAS_PADRAO;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : BIBLIOTECAS_PADRAO;
  } catch (e) {
    return BIBLIOTECAS_PADRAO;
  }
}

function setLocalBibliotecas(bibs) {
  try {
    localStorage.setItem(STORAGE_KEY_BIBLIOTECAS, JSON.stringify(bibs));
  } catch (e) {
    console.warn('Erro ao salvar bibliotecas no localStorage:', e);
  }
}

function getLocalMusicas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MUSICAS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Erro ao carregar músicas do localStorage:', e);
    return [];
  }
}

function setLocalMusicas(musicas) {
  try {
    localStorage.setItem(STORAGE_KEY_MUSICAS, JSON.stringify(musicas));
  } catch (e) {
    console.warn('Erro ao salvar músicas no localStorage:', e);
  }
}

function getLocalRepertorios() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REPERTORIOS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Erro ao carregar repertórios do localStorage:', e);
    return {};
  }
}

function setLocalRepertorios(reps) {
  try {
    localStorage.setItem(STORAGE_KEY_REPERTORIOS, JSON.stringify(reps));
  } catch (e) {
    console.warn('Erro ao salvar repertórios no localStorage:', e);
  }
}

export const repertorioService = {
  // ── 0. GERENCIAMENTO DE BIBLIOTECAS (PASTAS) ──
  async listarBibliotecas() {
    try {
      if (supabase && typeof supabase.from === 'function') {
        const { data, error } = await supabase
          .from('repertorio_bibliotecas')
          .select('*')
          .order('nome', { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
          setLocalBibliotecas(data);
          return data;
        }
      }
    } catch (e) {
      console.warn('Fallback para bibliotecas locais:', e);
    }
    return getLocalBibliotecas();
  },

  async salvarBiblioteca(biblioteca) {
    const payload = {
      nome: (biblioteca.nome || '').trim(),
      descricao: (biblioteca.descricao || '').trim(),
      cor: biblioteca.cor || '#3b82f6',
      tipo: biblioteca.tipo || 'Geral',
      voz: biblioteca.voz || 'Misto',
      updated_at: new Date().toISOString()
    };

    let salvoSupabase = false;
    let novoItem = null;

    try {
      if (supabase && typeof supabase.from === 'function') {
        const isUuid = biblioteca.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(biblioteca.id));
        if (isUuid) {
          const { id, ...semId } = payload;
          const { data, error } = await supabase
            .from('repertorio_bibliotecas')
            .update(semId)
            .eq('id', biblioteca.id)
            .select()
            .single();
          if (!error && data) {
            novoItem = data;
            salvoSupabase = true;
          }
        } else {
          const { id, ...semId } = payload;
          const { data, error } = await supabase
            .from('repertorio_bibliotecas')
            .insert([{ ...semId, created_at: new Date().toISOString() }])
            .select()
            .single();
          if (!error && data) {
            novoItem = data;
            salvoSupabase = true;
          }
        }
      }
    } catch (e) {
      console.warn('Erro ao salvar biblioteca no Supabase:', e);
    }

    const locais = getLocalBibliotecas();
    const idFinal = novoItem?.id || biblioteca.id || `bib-${Date.now()}`;
    const itemFinal = salvoSupabase && novoItem ? novoItem : { ...payload, id: idFinal };

    const idx = locais.findIndex(b => b.id === idFinal || b.nome.toLowerCase() === itemFinal.nome.toLowerCase());
    if (idx >= 0) locais[idx] = itemFinal;
    else locais.push(itemFinal);

    setLocalBibliotecas(locais);
    return itemFinal;
  },

  async excluirBiblioteca(id, nome) {
    try {
      if (supabase && typeof supabase.from === 'function' && id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(id))) {
        await supabase.from('repertorio_bibliotecas').delete().eq('id', id);
      }
    } catch (e) {
      console.warn('Erro ao excluir biblioteca no Supabase:', e);
    }
    const locais = getLocalBibliotecas().filter(b => b.id !== id && b.nome !== nome);
    setLocalBibliotecas(locais);
    return true;
  },

  // ── 1. BIBLIOTECA DE MÚSICAS ──
  async listarMusicas() {
    try {
      if (supabase && typeof supabase.from === 'function') {
        const { data, error } = await supabase
          .from('repertorio_musicas')
          .select('*')
          .order('titulo', { ascending: true });

        if (!error && Array.isArray(data)) {
          // Sincroniza cache local
          setLocalMusicas(data);
          return data;
        }
      }
    } catch (e) {
      console.warn('Fallback para cache local de músicas:', e);
    }

    return getLocalMusicas();
  },

  async verificarConexaoBanco() {
    try {
      if (!supabase || typeof supabase.from !== 'function') {
        return { conectado: false, motivo: 'Cliente Supabase não configurado no projeto.' };
      }
      const { error: errMus } = await supabase.from('repertorio_musicas').select('id').limit(1);
      if (errMus) {
        return { conectado: false, motivo: `Tabela repertorio_musicas: ${errMus.message || 'não encontrada'}` };
      }
      const { error: errCult } = await supabase.from('repertorio_cultos').select('id').limit(1);
      if (errCult) {
        return { conectado: false, motivo: `Tabela repertorio_cultos: ${errCult.message || 'não encontrada'}` };
      }
      return { conectado: true };
    } catch (e) {
      return { conectado: false, motivo: e.message };
    }
  },

  async salvarMusica(musica) {
    const payload = {
      titulo: (musica.titulo || '').trim(),
      artista: (musica.artista || '').trim(),
      tipo: musica.tipo || 'Adoração',
      biblioteca: (musica.biblioteca || 'Geral').trim(),
      biblioteca_id: musica.biblioteca_id || null,
      voz: musica.voz || 'Misto',
      tom: (musica.tom || '').trim(),
      bpm: musica.bpm ? String(musica.bpm).trim() : '',
      link: (musica.link || '').trim(),
      observacoes: (musica.observacoes || '').trim(),
      updated_at: new Date().toISOString()
    };

    // Tenta Supabase
    let salvoSupabase = false;
    let novoItem = null;
    let erroSupabase = null;

    try {
      if (supabase && typeof supabase.from === 'function') {
        const isUuid = musica.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(musica.id));

        if (isUuid) {
          const { id, ...semId } = payload;
          const { data, error } = await supabase
            .from('repertorio_musicas')
            .update(semId)
            .eq('id', musica.id)
            .select()
            .single();
          if (!error && data) {
            novoItem = data;
            salvoSupabase = true;
          } else if (error) {
            erroSupabase = error.message;
          }
        } else {
          const { id, ...semId } = payload;
          const { data, error } = await supabase
            .from('repertorio_musicas')
            .insert([{ ...semId, created_at: new Date().toISOString() }])
            .select()
            .single();
          if (!error && data) {
            novoItem = data;
            salvoSupabase = true;
          } else if (error) {
            erroSupabase = error.message;
          }
        }
      }
    } catch (e) {
      erroSupabase = e.message;
      console.warn('Supabase offline ou tabela inexistente, usando fallback local:', e);
    }

    // Atualiza LocalStorage
    const locais = getLocalMusicas();
    if (salvoSupabase && novoItem) {
      const idx = locais.findIndex(m => m.id === novoItem.id);
      if (idx >= 0) locais[idx] = novoItem;
      else locais.push(novoItem);
      setLocalMusicas(locais);
      return { ...novoItem, _salvoNoBanco: true };
    }

    // Modo Local
    const idFinal = musica.id || `local-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const itemFinal = { ...payload, id: idFinal, created_at: musica.created_at || new Date().toISOString() };
    const idx = locais.findIndex(m => m.id === idFinal);
    if (idx >= 0) locais[idx] = itemFinal;
    else locais.push(itemFinal);
    setLocalMusicas(locais);
    return { ...itemFinal, _salvoNoBanco: false, _erroBanco: erroSupabase };
  },

  async excluirMusica(id) {
    try {
      if (supabase && typeof supabase.from === 'function' && !String(id).startsWith('local-') && !String(id).startsWith('seed-')) {
        await supabase.from('repertorio_musicas').delete().eq('id', id);
      }
    } catch (e) {
      console.warn('Erro ao excluir no Supabase:', e);
    }

    const locais = getLocalMusicas().filter(m => m.id !== id);
    setLocalMusicas(locais);
    return true;
  },

  async excluirMusicasEmLote(ids) {
    if (!Array.isArray(ids) || ids.length === 0) return true;
    try {
      const idsValidosDb = ids.filter(
        id => !String(id).startsWith('local-') && !String(id).startsWith('seed-')
      );
      if (supabase && typeof supabase.from === 'function' && idsValidosDb.length > 0) {
        await supabase.from('repertorio_musicas').delete().in('id', idsValidosDb);
      }
    } catch (e) {
      console.warn('Erro ao excluir lote de músicas no Supabase:', e);
    }

    const idsSet = new Set(ids.map(String));
    const locais = getLocalMusicas().filter(m => !idsSet.has(String(m.id)));
    setLocalMusicas(locais);
    return true;
  },

  async transferirMusicasEmLote(ids, novaBibliotecaNome, atualizarVoz = true) {
    if (!Array.isArray(ids) || ids.length === 0 || !novaBibliotecaNome) return [];

    const todasBibs = await this.listarBibliotecas();
    const bibDestino = todasBibs.find(b => normalizarTexto(b.nome) === normalizarTexto(novaBibliotecaNome));

    const camposUpdate = {
      biblioteca: novaBibliotecaNome,
      updated_at: new Date().toISOString()
    };
    if (bibDestino?.id) {
      camposUpdate.biblioteca_id = bibDestino.id;
    }
    if (atualizarVoz && bibDestino?.voz && bibDestino.voz !== 'Geral') {
      camposUpdate.voz = bibDestino.voz;
    }

    try {
      const idsValidosDb = ids.filter(
        id => !String(id).startsWith('local-') && !String(id).startsWith('seed-')
      );
      if (supabase && typeof supabase.from === 'function' && idsValidosDb.length > 0) {
        await supabase
          .from('repertorio_musicas')
          .update(camposUpdate)
          .in('id', idsValidosDb);
      }
    } catch (e) {
      console.warn('Erro ao transferir lote de músicas no Supabase:', e);
    }

    const idsSet = new Set(ids.map(String));
    const locais = getLocalMusicas().map(m => {
      if (idsSet.has(String(m.id))) {
        return {
          ...m,
          ...camposUpdate
        };
      }
      return m;
    });
    setLocalMusicas(locais);
    return locais;
  },

  async carregarSeedPadrao() {
    const existentes = await this.listarMusicas();
    const mapaTitulos = new Set(existentes.map(m => normalizarTexto(m.titulo)));

    const paraAdicionar = MUSICAS_SEED_PADRAO.filter(
      seed => !mapaTitulos.has(normalizarTexto(seed.titulo))
    );

    if (paraAdicionar.length === 0) {
      return existentes;
    }

    const todos = [...existentes, ...paraAdicionar];
    setLocalMusicas(todos);

    // Tenta salvar em lote no Supabase silenciosamente
    try {
      if (supabase && typeof supabase.from === 'function') {
        const payloadSemId = paraAdicionar.map(({ id, ...rest }) => ({
          ...rest,
          created_at: new Date().toISOString()
        }));
        await supabase.from('repertorio_musicas').insert(payloadSemId);
      }
    } catch (e) {
      // Ignora erro se a tabela do Supabase ainda não existir
    }

    return todos;
  },

  async importarMusicasEmLote(listaNovas) {
    if (!Array.isArray(listaNovas) || listaNovas.length === 0) return [];

    const existentes = await this.listarMusicas();
    const mapaTitulos = new Set(existentes.map(m => normalizarTexto(m.titulo)));

    const formatadas = [];
    for (const item of listaNovas) {
      const titulo = (item.titulo || item.musica || item.nome || '').trim();
      if (!titulo) continue;

      // Normaliza tipo
      let tipo = 'Adoração';
      const tipoRaw = normalizarTexto(item.tipo || item.categoria || '');
      if (tipoRaw.includes('celeb') || tipoRaw.includes('animad') || tipoRaw.includes('rapida')) {
        tipo = 'Celebração';
      } else if (tipoRaw.includes('pos') || tipoRaw.includes('apelo') || tipoRaw.includes('preg')) {
        tipo = 'Pós pregação';
      } else if (tipoRaw.includes('ador') || tipoRaw.includes('lent') || tipoRaw.includes('comunh')) {
        tipo = 'Adoração';
      }

      // Normaliza voz
      let voz = (item.voz || item.vocal || item.genero || '').trim();
      const vozRaw = normalizarTexto(voz);
      if (vozRaw.includes('fem') || vozRaw.includes('mulher')) {
        voz = 'Feminino';
      } else if (vozRaw.includes('masc') || vozRaw.includes('homem')) {
        voz = 'Masculino';
      } else {
        voz = 'Misto';
      }

      // Normaliza biblioteca
      let biblioteca = (item.biblioteca || item.pasta || item.colecao || '').trim();
      if (!biblioteca) {
        if (tipo === 'Celebração') {
          biblioteca = voz === 'Feminino' ? 'Celebração Feminina' : 'Celebração Masculina';
        } else if (tipo === 'Adoração') {
          biblioteca = voz === 'Feminino' ? 'Adoração Feminina' : 'Adoração Masculina';
        } else {
          biblioteca = 'Pós Pregação';
        }
      }

      const musicaObj = {
        id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        titulo,
        artista: (item.artista || item.cantor || item.banda || item.ministerio || '').trim(),
        tipo,
        biblioteca,
        voz,
        tom: (item.tom || item.tom_padrao || item.key || '').trim(),
        bpm: item.bpm ? String(item.bpm).trim() : '',
        link: (item.link || item.cifra || item.youtube || '').trim(),
        observacoes: (item.observacoes || item.notas || '').trim(),
        created_at: new Date().toISOString()
      };

      // Evita duplicados exatos pelo título normalizado
      if (!mapaTitulos.has(normalizarTexto(titulo))) {
        mapaTitulos.add(normalizarTexto(titulo));
        formatadas.push(musicaObj);
      }
    }

    if (formatadas.length === 0) return existentes;

    // Tenta inserir no Supabase
    try {
      if (supabase && typeof supabase.from === 'function') {
        const payloadSemId = formatadas.map(({ id, ...rest }) => rest);
        const { data, error } = await supabase
          .from('repertorio_musicas')
          .insert(payloadSemId)
          .select();
        if (!error && data) {
          const combinados = [...existentes, ...data];
          setLocalMusicas(combinados);
          return combinados;
        }
      }
    } catch (e) {
      console.warn('Erro ao importar em lote no Supabase, salvando local:', e);
    }

    const combinados = [...existentes, ...formatadas];
    setLocalMusicas(combinados);
    return combinados;
  },

  // ── 2. EVENTOS & REPERTÓRIO DO CULTO ──
  async listarEventosMinisteriais() {
    try {
      if (supabase && typeof supabase.from === 'function') {
        const { data, error } = await supabase
          .from('eventos_ministeriais')
          .select('*')
          .order('data_evento', { ascending: true });

        if (!error && Array.isArray(data)) {
          return data;
        }
      }
    } catch (e) {
      console.warn('Erro ao buscar eventos_ministeriais no Supabase:', e);
    }
    return [];
  },

  async listarTodosRepertorios() {
    const locais = getLocalRepertorios();
    try {
      if (supabase && typeof supabase.from === 'function') {
        const { data, error } = await supabase
          .from('repertorio_cultos')
          .select('*');
        if (!error && Array.isArray(data)) {
          const map = { ...locais };
          data.forEach(r => {
            if (r.evento_id) {
              const strId = String(r.evento_id);
              const localExistente = locais[strId] || {};
              map[strId] = {
                ...localExistente,
                ...r,
                _salvoNoBanco: true
              };
            }
          });
          setLocalRepertorios(map);
          return map;
        }
      }
    } catch (e) {
      console.warn('Fallback local para repertório dos cultos:', e);
    }
    return locais;
  },

  async obterRepertorioPorEvento(eventoId) {
    if (!eventoId) return null;
    const strId = String(eventoId);

    try {
      if (supabase && typeof supabase.from === 'function') {
        const { data, error } = await supabase
          .from('repertorio_cultos')
          .select('*')
          .eq('evento_id', strId)
          .maybeSingle();

        if (!error && data) {
          const locais = getLocalRepertorios();
          const localExistente = locais[strId] || {};
          const item = {
            ...localExistente,
            ...data,
            _salvoNoBanco: true
          };
          locais[strId] = item;
          setLocalRepertorios(locais);
          return item;
        }
      }
    } catch (e) {
      console.warn('Erro ao buscar repertório por evento no Supabase:', e);
    }

    const locais = getLocalRepertorios();
    return locais[strId] || null;
  },

  async salvarRepertorioCulto(eventoId, repertorioPayload) {
    if (!eventoId) throw new Error('ID do evento é obrigatório.');
    const strId = String(eventoId);

    // Sanitiza estritamente as colunas existentes na tabela repertorio_cultos
    const payloadDb = {
      evento_id: strId,
      tema_culto: (repertorioPayload.tema_culto || '').trim(),
      observacoes_gerais: (repertorioPayload.observacoes_gerais || '').trim(),
      musicas: Array.isArray(repertorioPayload.musicas) ? repertorioPayload.musicas : [],
      updated_at: new Date().toISOString()
    };

    // Tenta Supabase
    let salvoSupabase = false;
    let dadoFinal = null;
    let erroSupabase = null;

    try {
      if (supabase && typeof supabase.from === 'function') {
        // Tenta upsert pelo evento_id (uq_repertorio_cultos_evento)
        const { data, error } = await supabase
          .from('repertorio_cultos')
          .upsert(payloadDb, { onConflict: 'evento_id' })
          .select()
          .single();

        if (!error && data) {
          dadoFinal = data;
          salvoSupabase = true;
        } else {
          if (error) {
            console.warn('Upsert direto em repertorio_cultos falhou, tentando fallback select/update/insert:', error.message);
          }
          // Fallback caso a constraint no Supabase tenha nome diferente
          const { data: existente } = await supabase
            .from('repertorio_cultos')
            .select('id')
            .eq('evento_id', strId)
            .maybeSingle();

          if (existente?.id) {
            const { data: upData, error: upErr } = await supabase
              .from('repertorio_cultos')
              .update(payloadDb)
              .eq('id', existente.id)
              .select()
              .single();
            if (!upErr && upData) {
              dadoFinal = upData;
              salvoSupabase = true;
            } else if (upErr) {
              erroSupabase = upErr.message;
              console.error('Erro ao atualizar repertório no Supabase:', upErr);
            }
          } else {
            const { data: inData, error: inErr } = await supabase
              .from('repertorio_cultos')
              .insert([{ ...payloadDb, created_at: new Date().toISOString() }])
              .select()
              .single();
            if (!inErr && inData) {
              dadoFinal = inData;
              salvoSupabase = true;
            } else if (inErr) {
              erroSupabase = inErr.message;
              console.error('Erro ao inserir repertório no Supabase:', inErr);
            }
          }
        }
      }
    } catch (e) {
      erroSupabase = e.message;
      console.error('Exceção ao salvar repertório no Supabase:', e);
    }

    // Salva LocalStorage preservando metadados contextuais (evento_titulo, evento_data)
    const locais = getLocalRepertorios();
    const itemFinal = {
      ...(dadoFinal || payloadDb),
      evento_titulo: repertorioPayload.evento_titulo || '',
      evento_data: repertorioPayload.evento_data || '',
      id: dadoFinal?.id || repertorioPayload.id || `rep-${strId}`,
      created_at: dadoFinal?.created_at || repertorioPayload.created_at || new Date().toISOString(),
      updated_at: dadoFinal?.updated_at || payloadDb.updated_at,
      _salvoNoBanco: salvoSupabase,
      _erroBanco: erroSupabase
    };
    locais[strId] = itemFinal;
    setLocalRepertorios(locais);

    return itemFinal;
  },

  async excluirRepertorioCulto(eventoId) {
    if (!eventoId) return false;
    const strId = String(eventoId);

    try {
      if (supabase && typeof supabase.from === 'function') {
        await supabase
          .from('repertorio_cultos')
          .delete()
          .eq('evento_id', strId);
      }
    } catch (e) {
      console.warn('Erro ao excluir repertório no Supabase:', e);
    }

    const locais = getLocalRepertorios();
    delete locais[strId];
    setLocalRepertorios(locais);
    return true;
  },

  // ── 3. ESTATÍSTICAS E SUGESTÃO INTELIGENTE ──
  async calcularEstatisticasMusicas() {
    const [musicas, mapaRepertorios] = await Promise.all([
      this.listarMusicas(),
      this.listarTodosRepertorios()
    ]);

    // Mapeia histórico de execuções
    const contagemExecucoes = new Map(); // musicaId -> { total: number, ultimaData: Date | null }

    Object.values(mapaRepertorios || {}).forEach(rep => {
      const dataCulto = rep.evento_data ? new Date(rep.evento_data) : (rep.created_at ? new Date(rep.created_at) : null);
      const musicasLista = Array.isArray(rep.musicas) ? rep.musicas : [];

      musicasLista.forEach(item => {
        // Procura por musica_id ou por título equivalente
        const idOuTitulo = item.musica_id || normalizarTexto(item.titulo);
        const atual = contagemExecucoes.get(idOuTitulo) || { total: 0, ultimaData: null };
        atual.total += 1;
        if (dataCulto && (!atual.ultimaData || dataCulto > atual.ultimaData)) {
          atual.ultimaData = dataCulto;
        }
        contagemExecucoes.set(idOuTitulo, atual);
      });
    });

    const musicasComMetricas = musicas.map(m => {
      const statsPorId = contagemExecucoes.get(m.id);
      const statsPorTitulo = contagemExecucoes.get(normalizarTexto(m.titulo));
      const totalExecucoes = (statsPorId?.total || 0) + (statsPorTitulo?.total || 0);

      let ultimaData = statsPorId?.ultimaData || statsPorTitulo?.ultimaData || null;
      if (statsPorId?.ultimaData && statsPorTitulo?.ultimaData) {
        ultimaData = statsPorId.ultimaData > statsPorTitulo.ultimaData ? statsPorId.ultimaData : statsPorTitulo.ultimaData;
      }

      return {
        ...m,
        vezesTocada: totalExecucoes,
        ultimaData
      };
    });

    // Músicas Mais Tocadas (ordenadas descrescente de execuções > 0)
    const maisTocadas = [...musicasComMetricas]
      .filter(m => m.vezesTocada > 0)
      .sort((a, b) => b.vezesTocada - a.vezesTocada);

    // Músicas Menos Tocadas / Nunca Tocadas
    const menosTocadas = [...musicasComMetricas]
      .sort((a, b) => a.vezesTocada - b.vezesTocada);

    // Músicas Tocadas há mais tempo (ou nunca tocadas)
    const agora = new Date();
    const semTocarRecentemente = [...musicasComMetricas]
      .filter(m => {
        if (!m.ultimaData) return true;
        const diffDias = Math.floor((agora - m.ultimaData) / (1000 * 60 * 60 * 24));
        return diffDias >= 21; // Não tocadas nos últimos 21 dias
      })
      .sort((a, b) => {
        if (!a.ultimaData && !b.ultimaData) return 0;
        if (!a.ultimaData) return -1;
        if (!b.ultimaData) return 1;
        return a.ultimaData - b.ultimaData;
      });

    return {
      totalMusicas: musicas.length,
      totalRepertoriosSalvos: Object.keys(mapaRepertorios || {}).length,
      musicasComMetricas,
      maisTocadas,
      menosTocadas,
      semTocarRecentemente
    };
  },

  // Sugere um repertório equilibrado automaticamente para um culto
  async gerarSugestaoRepertorioAutomatico({ qtdCelebracao = 2, qtdAdoracao = 2, qtdPosPregacao = 1 }) {
    const { musicasComMetricas } = await this.calcularEstatisticasMusicas();

    // Filtra por categoria
    const celebracao = musicasComMetricas.filter(m => m.tipo === 'Celebração');
    const adoracao = musicasComMetricas.filter(m => m.tipo === 'Adoração');
    const posPregacao = musicasComMetricas.filter(m => m.tipo === 'Pós pregação');

    // Algoritmo ponderado: prefere músicas com bom equilíbrio (não tocadas nos últimos 14 dias)
    const sortEquilibrado = (lista) => {
      const agora = new Date();
      return [...lista].sort((a, b) => {
        const diasA = a.ultimaData ? (agora - a.ultimaData) / (1000 * 60 * 60 * 24) : 999;
        const diasB = b.ultimaData ? (agora - b.ultimaData) / (1000 * 60 * 60 * 24) : 999;
        // Prioriza maior intervalo sem tocar, mesclado com aleatoriedade sutil
        return (diasB + Math.random() * 15) - (diasA + Math.random() * 15);
      });
    };

    const selCeleb = sortEquilibrado(celebracao).slice(0, qtdCelebracao);
    const selAdor = sortEquilibrado(adoracao).slice(0, qtdAdoracao);
    const selPos = sortEquilibrado(posPregacao).slice(0, qtdPosPregacao);

    const repertorioFinal = [];
    let ordem = 1;

    selCeleb.forEach(m => {
      repertorioFinal.push({
        musica_id: m.id,
        titulo: m.titulo,
        artista: m.artista,
        tipo: 'Celebração',
        tom: m.tom || '',
        ordem: ordem++,
        observacao: ''
      });
    });

    selAdor.forEach(m => {
      repertorioFinal.push({
        musica_id: m.id,
        titulo: m.titulo,
        artista: m.artista,
        tipo: 'Adoração',
        tom: m.tom || '',
        ordem: ordem++,
        observacao: ''
      });
    });

    selPos.forEach(m => {
      repertorioFinal.push({
        musica_id: m.id,
        titulo: m.titulo,
        artista: m.artista,
        tipo: 'Pós pregação',
        tom: m.tom || '',
        ordem: ordem++,
        observacao: ''
      });
    });

    return repertorioFinal;
  }
};
