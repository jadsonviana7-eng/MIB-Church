-- 1. CRIAÇÃO DAS TABELAS DE LOGS E SESSÕES
CREATE TABLE IF NOT EXISTS public.logs_sistema (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES public.pessoas(id) ON DELETE SET NULL,
    usuario_email TEXT,
    usuario_nome TEXT,
    acao TEXT NOT NULL,          -- 'INSERT', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT'
    tabela TEXT,                -- Nome da tabela afetada
    registro_id TEXT,           -- ID do registro afetado
    detalhes JSONB,             -- Objeto com dados alterados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.sessoes_sistema (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES public.pessoas(id) ON DELETE SET NULL,
    usuario_email TEXT,
    usuario_nome TEXT,
    login_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    ultimo_heartbeat TIMESTAMP WITH TIME ZONE DEFAULT now(),
    duracao_segundos INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. GATILHO DE AUDITORIA AUTOMÁTICO
CREATE OR REPLACE FUNCTION public.processar_audit_log()
RETURNS TRIGGER AS $$
DECLARE
    v_usuario_id UUID;
    v_usuario_email TEXT;
    v_usuario_nome TEXT;
    v_detalhes JSONB;
    v_reg_id TEXT;
BEGIN
    -- Obtém o email das claims do JWT do Supabase
    BEGIN
        v_usuario_email := current_setting('request.jwt.claims', true)::jsonb->>'email';
    EXCEPTION WHEN OTHERS THEN
        v_usuario_email := 'sistema';
    END;

    if v_usuario_email is not null and v_usuario_email <> 'sistema' then
        select id, nome into v_usuario_id, v_usuario_nome 
        from public.pessoas 
        where email = v_usuario_email 
        limit 1;
    else
        v_usuario_email := 'sistema';
        v_usuario_nome := 'Sistema/Gatilho';
    end if;

    -- Constrói os detalhes da alteração e ID do registro
    if (TG_OP = 'DELETE') then
        v_reg_id := TG_TABLE_NAME || '_' || OLD.id::text;
        v_detalhes := jsonb_build_object('valores_antigos', to_jsonb(OLD));
    elsif (TG_OP = 'UPDATE') then
        v_reg_id := TG_TABLE_NAME || '_' || NEW.id::text;
        v_detalhes := jsonb_build_object(
            'valores_antigos', to_jsonb(OLD),
            'valores_novos', to_jsonb(NEW)
        );
    else -- INSERT
        v_reg_id := TG_TABLE_NAME || '_' || NEW.id::text;
        v_detalhes := jsonb_build_object('valores_novos', to_jsonb(NEW));
    end if;

    -- Insere o log na tabela
    insert into public.logs_sistema (
        usuario_id,
        usuario_email,
        usuario_nome,
        acao,
        tabela,
        registro_id,
        detalhes
    ) values (
        v_usuario_id,
        v_usuario_email,
        v_usuario_nome,
        TG_OP,
        TG_TABLE_NAME,
        v_reg_id,
        v_detalhes
    );

    if (TG_OP = 'DELETE') then
        return OLD;
    else
        return NEW;
    end if;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. VINCULAR GATILHOS NAS TABELAS PRINCIPAIS
DROP TRIGGER IF EXISTS trg_audit_pessoas ON public.pessoas;
CREATE TRIGGER trg_audit_pessoas
AFTER INSERT OR UPDATE OR DELETE ON public.pessoas
FOR EACH ROW EXECUTE FUNCTION public.processar_audit_log();

DROP TRIGGER IF EXISTS trg_audit_celulas ON public.celulas;
CREATE TRIGGER trg_audit_celulas
AFTER INSERT OR UPDATE OR DELETE ON public.celulas
FOR EACH ROW EXECUTE FUNCTION public.processar_audit_log();

DROP TRIGGER IF EXISTS trg_audit_relatorios_celula ON public.relatorios_celula;
CREATE TRIGGER trg_audit_relatorios_celula
AFTER INSERT OR UPDATE OR DELETE ON public.relatorios_celula
FOR EACH ROW EXECUTE FUNCTION public.processar_audit_log();

DROP TRIGGER IF EXISTS trg_audit_transacoes_financeiras ON public.transacoes_financeiras;
CREATE TRIGGER trg_audit_transacoes_financeiras
AFTER INSERT OR UPDATE OR DELETE ON public.transacoes_financeiras
FOR EACH ROW EXECUTE FUNCTION public.processar_audit_log();

DROP TRIGGER IF EXISTS trg_audit_escalas ON public.escalas;
CREATE TRIGGER trg_audit_escalas
AFTER INSERT OR UPDATE OR DELETE ON public.escalas
FOR EACH ROW EXECUTE FUNCTION public.processar_audit_log();

-- 4. POLÍTICAS DE SEGURANÇA RLS
ALTER TABLE public.logs_sistema ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessoes_sistema ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Leitura de logs restrita" ON public.logs_sistema;
CREATE POLICY "Leitura de logs restrita" ON public.logs_sistema
    FOR SELECT TO authenticated
    USING (public.obter_perfil() IN ('admin', 'pastor'));

DROP POLICY IF EXISTS "Escrita de logs livre para autenticados" ON public.logs_sistema;
CREATE POLICY "Escrita de logs livre para autenticados" ON public.logs_sistema
    FOR INSERT TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Leitura de sessoes restrita" ON public.sessoes_sistema;
CREATE POLICY "Leitura de sessoes restrita" ON public.sessoes_sistema
    FOR SELECT TO authenticated
    USING (public.obter_perfil() IN ('admin', 'pastor'));

DROP POLICY IF EXISTS "Insercao de sessoes livre para autenticados" ON public.sessoes_sistema;
CREATE POLICY "Insercao de sessoes livre para autenticados" ON public.sessoes_sistema
    FOR INSERT TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Atualizacao de sessoes pelo próprio usuario" ON public.sessoes_sistema;
CREATE POLICY "Atualizacao de sessoes pelo próprio usuario" ON public.sessoes_sistema
    FOR UPDATE TO authenticated
    USING (usuario_id = public.obter_id_pessoa() OR public.obter_perfil() IN ('admin', 'pastor'))
    WITH CHECK (usuario_id = public.obter_id_pessoa() OR public.obter_perfil() IN ('admin', 'pastor'));

-- 5. FUNÇÃO PARA INCREMENTAR DURAÇÃO DE SESSÃO
CREATE OR REPLACE FUNCTION public.incrementar_duracao_sessao(sessao_uuid UUID, incrementosegundos INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE public.sessoes_sistema
    SET ultimo_heartbeat = now(),
        duracao_segundos = duracao_segundos + incrementosegundos
    WHERE id = sessao_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

