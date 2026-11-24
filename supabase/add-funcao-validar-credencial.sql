-- ============================================================
-- FUNÇÃO PÚBLICA DE AUTENTICAÇÃO DIGITAL DA CARTEIRINHA (QR CODE)
-- ============================================================
-- Objetivo:
-- Permitir a validação em tempo real da autenticidade de uma credencial
-- de membro ou pastor via QR Code (/validar-credencial/<id>), retornando
-- APENAS dados públicos seguros (LGPD) — sem expor CPF, RG, telefone,
-- e-mail ou endereço residencial do portador.
--
-- Como usar:
-- 1. Copie todo o conteúdo deste arquivo.
-- 2. Cole no SQL Editor do Supabase (https://app.supabase.com -> Seu Projeto -> SQL Editor).
-- 3. Clique em "Run" (Executar).
-- ============================================================

CREATE OR REPLACE FUNCTION public.validar_credencial_membro(p_pessoa_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_pessoa RECORD;
  v_igreja RECORD;
  v_ativa boolean;
BEGIN
  SELECT
    id,
    nome,
    cargo,
    genero,
    permissao,
    status,
    foto_url,
    cidade,
    estado,
    data_batismo,
    created_at
  INTO v_pessoa
  FROM public.pessoas
  WHERE id = p_pessoa_id
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('encontrado', false);
  END IF;

  SELECT
    nome_igreja,
    cnpj,
    telefone,
    email_contato,
    pastor_responsavel,
    endereco,
    numero,
    bairro,
    cidade,
    estado
  INTO v_igreja
  FROM public.dados_igreja
  WHERE id = 1
  LIMIT 1;

  v_ativa := COALESCE(lower(v_pessoa.status), 'ativo') NOT IN ('inativo', 'pendente', 'excluido');

  RETURN jsonb_build_object(
    'encontrado', true,
    'ativa', v_ativa,
    'status', COALESCE(v_pessoa.status, 'ativo'),
    'pessoa', jsonb_build_object(
      'id', v_pessoa.id,
      'nome', v_pessoa.nome,
      'cargo', v_pessoa.cargo,
      'genero', v_pessoa.genero,
      'permissao', v_pessoa.permissao,
      'foto_url', v_pessoa.foto_url,
      'cidade', v_pessoa.cidade,
      'estado', v_pessoa.estado,
      'data_batismo', v_pessoa.data_batismo,
      'created_at', v_pessoa.created_at
    ),
    'igreja', CASE
      WHEN v_igreja IS NULL THEN '{}'::jsonb
      ELSE jsonb_build_object(
        'nome_igreja', v_igreja.nome_igreja,
        'cnpj', v_igreja.cnpj,
        'telefone', v_igreja.telefone,
        'email_contato', v_igreja.email_contato,
        'pastor_responsavel', v_igreja.pastor_responsavel,
        'endereco', v_igreja.endereco,
        'numero', v_igreja.numero,
        'bairro', v_igreja.bairro,
        'cidade', v_igreja.cidade,
        'estado', v_igreja.estado
      )
    END
  );
END;
$$;

REVOKE ALL ON FUNCTION public.validar_credencial_membro(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.validar_credencial_membro(uuid) TO anon, authenticated;
