import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { consultarNFCe, parseNFeXML, formatarCNPJ } from './nfceUtils';
import { QrCode, Link as LinkIcon, FileText, Camera, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function ModalImportarNFCe({ onFechar, onImportar }) {
  const [abaAtiva, setAbaAtiva] = useState('link'); // 'link', 'camera', 'xml'
  const [urlLink, setUrlLink] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [notaProcessada, setNotaProcessada] = useState(null);
  const [cameraIniciada, setCameraIniciada] = useState(false);

  const html5QrCodeRef = useRef(null);
  const isStartingRef = useRef(false);
  const isStoppingRef = useRef(false);

  // Parar scanner de forma segura
  const pararScanner = async () => {
    if (isStoppingRef.current) return;
    isStoppingRef.current = true;
    try {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        await html5QrCodeRef.current.stop();
      }
    } catch {
      // Ignora erro de transição concorrente
    } finally {
      isStoppingRef.current = false;
      setCameraIniciada(false);
    }
  };

  // Iniciar scanner de forma segura
  const iniciarScanner = async () => {
    if (isStartingRef.current || isStoppingRef.current) return;
    isStartingRef.current = true;
    setErro('');
    try {
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode('qr-reader-container');
      }

      const qrCodeSuccessCallback = async (decodedText) => {
        await pararScanner();
        await processarConsulta(decodedText);
      };

      const config = { fps: 10, qrbox: { width: 250, height: 250 } };
      await html5QrCodeRef.current.start(
        { facingMode: 'environment' },
        config,
        qrCodeSuccessCallback
      );
      setCameraIniciada(true);
    } catch (err) {
      console.warn('Erro ao iniciar câmera:', err);
      if (!String(err).includes('transition')) {
        setErro('Não foi possível acessar a câmera do dispositivo. Verifique as permissões ou utilize a aba "Colar Link".');
      }
    } finally {
      isStartingRef.current = false;
    }
  };

  useEffect(() => {
    if (abaAtiva === 'camera' && !notaProcessada) {
      const timer = setTimeout(() => {
        iniciarScanner();
      }, 200);
      return () => {
        clearTimeout(timer);
        pararScanner();
      };
    } else {
      pararScanner();
    }
  }, [abaAtiva, notaProcessada]);

  // Processa a URL ou Chave
  async function processarConsulta(urlOuChave) {
    if (!urlOuChave || !urlOuChave.trim()) {
      setErro('Informe o link ou a chave de acesso da nota.');
      return;
    }

    setCarregando(true);
    setErro('');
    try {
      const dados = await consultarNFCe(urlOuChave);
      setNotaProcessada(dados);
    } catch (err) {
      const msg = err?.message || 'Erro ao consultar nota fiscal na SEFAZ.';
      if (!msg.includes('transition')) {
        setErro(msg);
      }
    } finally {
      setCarregando(false);
    }
  }

  // Processa arquivo XML local
  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setCarregando(true);
    setErro('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const xmlText = event.target.result;
        const dados = parseNFeXML(xmlText);
        setNotaProcessada(dados);
      } catch (err) {
        setErro(err.message || 'Erro ao processar arquivo XML.');
      } finally {
        setCarregando(false);
      }
    };
    reader.onerror = () => {
      setErro('Erro ao ler o arquivo.');
      setCarregando(false);
    };
    reader.readAsText(file);
  }

  function handleConfirmarImportacao() {
    if (!notaProcessada) return;
    onImportar(notaProcessada);
    onFechar();
  }

  const mudarAba = async (novaAba) => {
    setErro('');
    if (abaAtiva === 'camera' && novaAba !== 'camera') {
      await pararScanner();
    }
    setAbaAtiva(novaAba);
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600/30 text-blue-400 rounded-xl border border-blue-500/30">
              <QrCode size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">Importar Nota Fiscal (NFC-e / NF-e)</h3>
              <p className="text-xs text-slate-400">Preencha o lançamento automaticamente escaneando o QR Code ou colando o link.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={async () => {
              await pararScanner();
              onFechar();
            }}
            className="text-slate-400 hover:text-white p-2 text-xl font-bold transition"
          >
            ✕
          </button>
        </div>

        {/* Abas */}
        {!notaProcessada && (
          <div className="flex border-b border-slate-100 bg-slate-50/70 px-4 pt-3 gap-2">
            <button
              type="button"
              onClick={() => mudarAba('link')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition border-b-2 ${
                abaAtiva === 'link'
                  ? 'bg-white border-blue-600 text-blue-700 shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <LinkIcon size={16} /> Colar Link / Chave
            </button>
            <button
              type="button"
              onClick={() => mudarAba('camera')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition border-b-2 ${
                abaAtiva === 'camera'
                  ? 'bg-white border-blue-600 text-blue-700 shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Camera size={16} /> Escanear QR Code
            </button>
            <button
              type="button"
              onClick={() => mudarAba('xml')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition border-b-2 ${
                abaAtiva === 'xml'
                  ? 'bg-white border-blue-600 text-blue-700 shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText size={16} /> Arquivo XML
            </button>
          </div>
        )}

        {/* Conteúdo Principal */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {erro && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{erro}</span>
            </div>
          )}

          {/* PREVIEW DA NOTA PROCESSADA */}
          {notaProcessada ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    {notaProcessada.modoParcial
                      ? 'Chave de Acesso Identificada!'
                      : 'Nota Fiscal Identificada com Sucesso!'}
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100/90 px-2.5 py-1 rounded-full">
                    {notaProcessada.modoParcial ? 'Chave 44 Dígitos' : `${notaProcessada.itens.length} itens`}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                  <div>
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Documento / Fornecedor</span>
                    <strong className="text-slate-900 text-sm block">{notaProcessada.descricaoSugerida}</strong>
                    {notaProcessada.fornecedor.cnpj && (
                      <span className="text-slate-500 block text-[11px]">CNPJ: {formatarCNPJ(notaProcessada.fornecedor.cnpj)}</span>
                    )}
                  </div>
                  <div className="sm:text-right">
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Valor Total</span>
                    {notaProcessada.valorTotal > 0 ? (
                      <strong className="text-xl font-black text-emerald-600">
                        {notaProcessada.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </strong>
                    ) : (
                      <span className="text-xs text-amber-700 font-bold bg-amber-100/80 px-2 py-0.5 rounded">
                        Informar valor no lançamento
                      </span>
                    )}
                    <span className="text-slate-500 block text-[11px] mt-0.5">
                      Data: {new Date(notaProcessada.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lista de Itens (se houver) */}
              {notaProcessada.itens?.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">
                    Itens da Nota ({notaProcessada.itens.length})
                  </h4>
                  <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white shadow-xs">
                    {notaProcessada.itens.map((item, i) => (
                      <div key={i} className="p-2.5 flex items-center justify-between text-xs hover:bg-slate-50 transition">
                        <div className="flex-1 pr-2">
                          <span className="font-bold text-slate-800">{item.descricao}</span>
                          <div className="text-[11px] text-slate-400">
                            {item.quantidade} {item.unidade} × {item.valorUnitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <strong className="font-bold text-slate-800">
                            {item.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
                  <p className="font-bold text-slate-700">Chave de acesso vinculada:</p>
                  <p className="font-mono text-[11px] break-all text-slate-500">{notaProcessada.chaveAcesso}</p>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNotaProcessada(null)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  ← Ler Outra Nota
                </button>
                <button
                  type="button"
                  onClick={handleConfirmarImportacao}
                  className="flex-[2] py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                >
                  <span>Preencher no Lançamento</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* ABA: LINK / CHAVE */}
              {abaAtiva === 'link' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Link da SEFAZ ou Chave de Acesso (44 dígitos)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ex: https://nfce.sefaz.pe.gov.br/nfce/consulta?p=262609... ou cole a chave de 44 dígitos"
                      value={urlLink}
                      onChange={e => setUrlLink(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={carregando || !urlLink.trim()}
                    onClick={() => processarConsulta(urlLink)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200 cursor-pointer"
                  >
                    {carregando ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Consultando SEFAZ...</span>
                      </>
                    ) : (
                      <>
                        <span>Consultar e Importar Nota</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* ABA: CÂMERA (QR CODE) */}
              {abaAtiva === 'camera' && (
                <div className="space-y-3 text-center">
                  <div className="relative mx-auto w-full max-w-sm rounded-2xl overflow-hidden border-2 border-dashed border-blue-300 bg-slate-900 p-2 min-h-[260px] flex items-center justify-center">
                    <div id="qr-reader-container" className="w-full"></div>
                    {!cameraIniciada && !carregando && (
                      <div className="text-slate-400 text-xs flex flex-col items-center gap-2">
                        <Camera size={28} className="text-blue-400 animate-bounce" />
                        <span>Iniciando câmera...</span>
                      </div>
                    )}
                    {carregando && (
                      <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center text-white gap-2">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                        <span className="text-xs font-bold">Consultando nota na SEFAZ...</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    Aponte a câmera do seu celular ou computador para o <strong>QR Code</strong> impresso no cupom fiscal.
                  </p>
                </div>
              )}

              {/* ABA: ARQUIVO XML */}
              {abaAtiva === 'xml' && (
                <div className="space-y-4">
                  <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition">
                    <input
                      type="file"
                      accept=".xml,text/xml"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                      <FileText size={24} />
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-bold text-slate-800 block">Clique para selecionar o arquivo .XML</span>
                      <span className="text-[11px] text-slate-400">Suporta NF-e e NFC-e formato padrão nacional</span>
                    </div>
                  </label>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
