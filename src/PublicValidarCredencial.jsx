import { useEffect, useMemo, useState } from 'react';
import { supabase } from './supabaseClient';
import { CheckCircle2, XCircle, AlertTriangle, Scale, ShieldCheck, Building2, Calendar, MapPin, Award } from 'lucide-react';
import { mascaraCNPJ, mascaraTelefone } from './mascaras';

function gerarNumeroRegistro(id) {
  const raw = String(id || '');
  const digits = raw.replace(/\D/g, '');
  if (digits.length >= 4) return digits.slice(-4);
  let hash = 0;
  for (let i = 0; i < raw.length; i += 1) {
    hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0;
  }
  return String((Math.abs(hash) % 9999) + 1).padStart(4, '0');
}

function formatarDataBR(val) {
  if (!val) return '—';
  const s = String(val).trim();
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(s)) return s;
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[3]}/${iso[2]}/${iso[1]}`;
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) return d.toLocaleDateString('pt-BR');
  return s;
}

function flexionarCargo(cargoTexto, genero) {
  const texto = String(cargoTexto || '').trim();
  if (!texto) return '';
  const ehFeminino = /^f(em)?/i.test(String(genero || '').trim());
  if (/^pastor\s*\(a\)$/i.test(texto) || /^pastor\/a$/i.test(texto)) return ehFeminino ? 'Pastora' : 'Pastor';
  if (/^di[áa]cono\s*\((a|isa)\)$/i.test(texto)) return ehFeminino ? 'Diaconisa' : 'Diácono';
  if (/^mission[áa]rio\s*\(a\)$/i.test(texto)) return ehFeminino ? 'Missionária' : 'Missionário';
  if (/^presb[íi]tero\s*\(a\)$/i.test(texto)) return ehFeminino ? 'Presbítera' : 'Presbítero';
  if (/^obreiro\s*\(a\)$/i.test(texto)) return ehFeminino ? 'Obreira' : 'Obreiro';
  if (/^membro\s*\(a\)$/i.test(texto)) return 'Membro';
  return texto
    .replace(/o\s*\(a\)/gi, ehFeminino ? 'a' : 'o')
    .replace(/\s*\(a\)/gi, ehFeminino ? 'a' : '')
    .trim();
}

export default function PublicValidarCredencial() {
  const [carregando, setCarregando] = useState(true);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const pessoaId = useMemo(() => {
    const path = window.location.pathname || '';
    const match = path.match(/\/validar-credencial\/([^/?#]+)/i);
    if (match?.[1]) return decodeURIComponent(match[1]).trim();
    const params = new URLSearchParams(window.location.search);
    return (params.get('id') || '').trim();
  }, []);

  useEffect(() => {
    let ativo = true;
    async function validar() {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!pessoaId || !uuidRegex.test(pessoaId)) {
        setResultado({ encontrado: false });
        setCarregando(false);
        return;
      }

      setCarregando(true);
      setErro('');
      try {
        const { data, error } = await supabase.rpc('validar_credencial_membro', {
          p_pessoa_id: pessoaId,
        });
        if (!ativo) return;
        if (error) {
          setErro('Serviço de validação digital ainda não ativado no banco de dados.');
          setResultado(null);
        } else {
          setResultado(data || { encontrado: false });
        }
      } catch {
        if (ativo) setErro('Não foi possível consultar a autenticidade da credencial no momento.');
      } finally {
        if (ativo) setCarregando(false);
      }
    }
    validar();
    return () => { ativo = false; };
  }, [pessoaId]);

  const dados = useMemo(() => {
    if (!resultado?.encontrado || !resultado?.pessoa) return null;
    const p = resultado.pessoa;
    const ig = resultado.igreja || {};
    const cargoRaw = String(p.cargo || '').trim();
    const cargoPrincipal = cargoRaw ? cargoRaw.split(',')[0].trim() : '';
    const permNorm = String(p.permissao || '').toLowerCase().trim();
    const ehFeminino = /^f(em)?/i.test(String(p.genero || '').trim());
    const ehPastor = permNorm === 'pastor' || /pastor|bispo|ap[óo]stolo/i.test(cargoRaw);

    let cargoExibicao = flexionarCargo(cargoPrincipal, p.genero) || (ehPastor ? (ehFeminino ? 'Pastora' : 'Pastor') : 'Membro');
    if (ehPastor && !/pastor|bispo|ap[óo]stolo/i.test(cargoExibicao)) {
      cargoExibicao = ehFeminino ? 'Pastora' : 'Pastor';
    }

    const cidade = (p.cidade || ig.cidade || '').trim();
    const estado = (p.estado || ig.estado || '').trim().toUpperCase();
    const localidade = cidade && estado ? `${cidade} - ${estado}` : (cidade || 'Brasil');

    return {
      ativa: Boolean(resultado.ativa),
      status: resultado.status || 'ativo',
      nome: p.nome || 'Membro',
      fotoUrl: p.foto_url || '',
      cargoExibicao,
      ehPastor,
      numRegistro: gerarNumeroRegistro(p.id),
      filiadoDesde: formatarDataBR(p.data_batismo || p.created_at),
      localidade,
      nomeIgreja: ig.nome_igreja || 'MIB Church',
      cnpjIgreja: ig.cnpj ? mascaraCNPJ(ig.cnpj) : '',
      telefoneIgreja: ig.telefone ? mascaraTelefone(ig.telefone) : '',
      pastorResponsavel: ig.pastor_responsavel || '',
      consultadoEm: new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  }, [resultado]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071936] via-[#0d2b5c] to-[#0f172a] flex flex-col items-center justify-center p-4 sm:p-6 text-slate-900">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-white/20 overflow-hidden">
        {/* Cabeçalho Oficial com Logo */}
        <div className="px-6 py-5 bg-gradient-to-b from-white to-[#f1f7fd] border-b border-slate-200 flex flex-col items-center text-center gap-2">
          <img
            src="/betesda-geral.png"
            alt="MIB Church"
            className="h-14 max-w-[230px] w-auto object-contain"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Autenticação Digital de Credencial
          </span>
        </div>

        {/* Corpo da Validação */}
        <div className="p-6 space-y-5">
          {carregando ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500">
              <div className="w-9 h-9 rounded-full border-3 border-slate-200 border-t-blue-600 animate-spin" />
              <p className="text-xs font-bold uppercase tracking-wider">Verificando autenticidade...</p>
            </div>
          ) : erro ? (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2">
              <AlertTriangle size={36} className="mx-auto text-amber-600" />
              <h2 className="text-base font-black text-amber-900">Validação indisponível</h2>
              <p className="text-xs text-amber-800 leading-relaxed">{erro}</p>
            </div>
          ) : !dados ? (
            <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-2.5">
              <XCircle size={44} className="mx-auto text-rose-600" />
              <h2 className="text-lg font-black text-rose-900">Credencial Não Encontrada</h2>
              <p className="text-xs text-rose-700 leading-relaxed">
                O código informado não corresponde a nenhuma credencial registrada no sistema oficial da igreja.
              </p>
            </div>
          ) : (
            <>
              {/* Banner de Status */}
              {dados.ativa ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                  <CheckCircle2 size={32} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-sm font-black text-emerald-900 uppercase tracking-wide leading-tight">
                      Credencial Autêntica e Ativa
                    </p>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                      Verificada em tempo real • {dados.consultadoEm}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3">
                  <XCircle size={32} className="text-rose-600 shrink-0" />
                  <div>
                    <p className="text-sm font-black text-rose-900 uppercase tracking-wide leading-tight">
                      Credencial Inativa / Revogada
                    </p>
                    <p className="text-[11px] text-rose-700 font-semibold mt-0.5">
                      Este vínculo não está mais ativo na igreja.
                    </p>
                  </div>
                </div>
              )}

              {/* Identificação do Portador */}
              <div className="flex flex-col items-center text-center gap-3 pt-1">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-slate-100">
                  {dados.fotoUrl ? (
                    <img src={dados.fotoUrl} alt={dados.nome} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-black text-blue-900 bg-blue-50">
                      {dados.nome.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-lg font-black text-slate-900 leading-tight">{dados.nome}</h1>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-xs"
                    style={{
                      background: dados.ehPastor
                        ? 'linear-gradient(90deg, #b45309, #d97706)'
                        : 'linear-gradient(90deg, #1d4ed8, #0284c7)',
                    }}
                  >
                    <Award size={13} />
                    <span>{dados.cargoExibicao}</span>
                  </div>
                </div>
              </div>

              {/* Dados Públicos Seguros */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Nº Registro</span>
                  <span className="text-sm font-black text-slate-800 tabular-nums">{dados.numRegistro}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Calendar size={10} /> Filiado desde
                  </span>
                  <span className="text-sm font-black text-slate-800">{dados.filiadoDesde}</span>
                </div>
                <div className="col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <MapPin size={10} /> Localidade
                  </span>
                  <span className="text-xs font-extrabold text-slate-800">{dados.localidade}</span>
                </div>
              </div>

              {/* Amparo Legal de Capelania (apenas para Pastor/Pastora ativo) */}
              {dados.ehPastor && dados.ativa && (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 border-l-4 border-l-blue-700 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-blue-900 uppercase tracking-wide">
                    <Scale size={14} className="text-blue-700 shrink-0" />
                    <span>Direito Nacional de Capelania</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    Portador(a) habilitado(a) como <strong>{dados.cargoExibicao}</strong>, com direito federal à prestação de assistência religiosa e capelania em entidades civis e militares de internação coletiva (<strong>Art. 5º, VII CF/88</strong> e <strong>Lei Federal nº 9.982/2000</strong>).
                  </p>
                </div>
              )}

              {/* Rodapé Institucional */}
              <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                <p className="font-extrabold text-slate-700 flex items-center gap-1.5">
                  <Building2 size={13} className="text-blue-700 shrink-0" />
                  <span>{dados.nomeIgreja}</span>
                </p>
                {dados.cnpjIgreja && <p>CNPJ: {dados.cnpjIgreja}</p>}
                {dados.pastorResponsavel && <p>Pastor Responsável: {dados.pastorResponsavel}</p>}
                {dados.telefoneIgreja && <p>Contato da Secretaria: {dados.telefoneIgreja}</p>}
              </div>
            </>
          )}
        </div>

        {/* Selo Rodapé */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-400">
          <ShieldCheck size={13} className="text-blue-600" />
          <span>Sistema Oficial MIB Church • Validação Digital</span>
        </div>
      </div>
    </div>
  );
}
