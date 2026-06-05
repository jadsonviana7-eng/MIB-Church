export function soNumeros(valor) {
  return String(valor ?? '').replace(/\D/g, '');
}

export function mascaraCPF(valor) {
  const n = soNumeros(valor).slice(0, 11);
  return n
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function mascaraCNPJ(valor) {
  const n = soNumeros(valor).slice(0, 14);
  return n
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/(\d{3})(\d{4})/, '$1/$2')
    .replace(/(\d{4})(\d{2})/, '$1-$2');
}

export function mascaraTelefone(valor) {
  const n = soNumeros(valor).slice(0, 11);
  if (n.length <= 10) {
    return n
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return n
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

export function mascaraCEP(valor) {
  const n = soNumeros(valor).slice(0, 8);
  return n.replace(/(\d{5})(\d)/, '$1-$2');
}

export function mascaraMoeda(valor) {
  const n = soNumeros(valor);
  if (!n) return '';
  const numero = Number(n) / 100;
  return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function desmascararMoeda(valor) {
  const n = soNumeros(valor);
  if (!n) return null;
  return Number(n) / 100;
}

export function mascaraDataBR(valor) {
  const n = soNumeros(valor).slice(0, 8);
  return n
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2');
}

export function dataISOparaBR(iso) {
  if (!iso) return '';
  const parte = String(iso).split('T')[0];
  const [ano, mes, dia] = parte.split('-');
  if (!ano || !mes || !dia) return '';
  return `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${ano}`;
}

export function dataBRparaISO(br) {
  if (!br) return null;
  const n = soNumeros(br);
  if (n.length !== 8) return null;
  const dia = n.slice(0, 2);
  const mes = n.slice(2, 4);
  const ano = n.slice(4, 8);
  return `${ano}-${mes}-${dia}`;
}

export function desmascararCPF(valor) {
  const n = soNumeros(valor);
  return n || null;
}

export function desmascararCNPJ(valor) {
  const n = soNumeros(valor);
  return n || null;
}

export function desmascararTelefone(valor) {
  const n = soNumeros(valor);
  return n || null;
}

export function desmascararCEP(valor) {
  const n = soNumeros(valor);
  return n || null;
}
