import { useState, useCallback } from 'react';
import { ministeriosService } from '../services/ministeriosService';

export function useMinisterios() {
  const [ministerios, setMinisterios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const fetchMinisterios = useCallback(async () => {
    setCarregando(true);
    try {
      const data = await ministeriosService.listarMinisterios();
      console.log("useMinisterios: Fetched data from service:", data);
      setMinisterios(data);
    } catch (err) {
      console.error("useMinisterios: Error fetching ministries:", err); // Loga o objeto de erro completo
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  const addMembro = async (ministerioId, pessoaId, funcaoId) => {
    try {
      await ministeriosService.adicionarMembro(ministerioId, pessoaId, funcaoId);
      await fetchMinisterios(); // Atualiza contagem no card
      return true;
    } catch (err) {
      console.error("useMinisterios: Error adding member:", err); // Loga o objeto de erro completo
      alert(err.message);
      return false;
    }
  };

  const removeMembro = async (ministerioId, pessoaId) => {
    if (!(await window.confirmModal("Remover Membro", "Remover membro deste ministério?"))) return;
    try {
      await ministeriosService.removerMembro(ministerioId, pessoaId);
      await fetchMinisterios();
      return true;
    } catch (err) {
      console.error("useMinisterios: Error removing member:", err); // Loga o objeto de erro completo
      alert(err.message);
      return false;
    }
  };

  return {
    ministerios,
    carregando,
    erro,
    fetchMinisterios,
    addMembro,
    removeMembro
  };
}