const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    let url = String(body?.url || '').trim();
    const chave = String(body?.chave || '').trim();

    if (!url && chave) {
      url = `https://nfce.sefaz.pe.gov.br/nfce/consulta?p=${chave}|3|1`;
    }

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL ou chave da nota não informada.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Decodifica %7C se presente
    try {
      url = decodeURIComponent(url);
    } catch {
      // ignore
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/xml, text/xml, text/html, */*'
      }
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `SEFAZ respondeu com status ${response.status}: ${response.statusText}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const xml = await response.text();

    return new Response(
      JSON.stringify({ xml }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Erro ao conectar à SEFAZ.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
