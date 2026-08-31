/** Normaliza amenidades: tildes frecuentes y mayúscula inicial. */

const SMALL = new Set(['de', 'del', 'la', 'las', 'el', 'los', 'y', 'e', 'o', 'u', 'con', 'en', 'a', 'para', 'por', 'un', 'una']);

const ACCENTS: Record<string, string> = {
  bano: 'baño',
  banos: 'baños',
  jardin: 'jardín',
  jardines: 'jardines',
  balcon: 'balcón',
  balcones: 'balcones',
  salon: 'salón',
  salones: 'salones',
  deposito: 'depósito',
  depositos: 'depósitos',
  lavanderia: 'lavandería',
  porteria: 'portería',
  citofono: 'citófono',
  iluminacion: 'iluminación',
  calefaccion: 'calefacción',
  energia: 'energía',
  panoramica: 'panorámica',
  marmol: 'mármol',
  atico: 'ático',
  sotano: 'sótano',
  transito: 'tránsito',
  construccion: 'construcción',
  administracion: 'administración',
  informacion: 'información',
  ubicacion: 'ubicación',
  atencion: 'atención',
  negociacion: 'negociación',
  financiacion: 'financiación',
  inversion: 'inversión',
  avaluo: 'avalúo',
  avaluos: 'avalúos',
  medellin: 'Medellín',
  antioquia: 'Antioquia',
  llanogrande: 'Llanogrande',
  bbq: 'BBQ',
  wifi: 'WiFi',
  tv: 'TV',
};

function strip(s: string) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function fixToken(raw: string): string {
  const key = strip(raw.replace(/[.,;:!?()]/g, ''));
  if (ACCENTS[key]) {
    const punct = raw.match(/[.,;:!?()]+$/)?.[0] ?? '';
    return ACCENTS[key] + punct;
  }
  return raw;
}

function titleCaseEs(text: string): string {
  return text
    .split(/\s+/)
    .map((word, i) => {
      if (/^\d/.test(word) || (word === word.toUpperCase() && word.length <= 5)) return word;
      const lower = word.toLowerCase();
      if (i > 0 && SMALL.has(strip(lower))) return lower;
      return lower.charAt(0).toLocaleUpperCase('es') + lower.slice(1);
    })
    .join(' ');
}

export function formatAmenity(raw: string): string {
  const cleaned = raw.trim().replace(/\s+/g, ' ');
  if (!cleaned) return '';
  const withAccents = cleaned.split(' ').map(fixToken).join(' ');
  return titleCaseEs(withAccents);
}

export function formatAmenities(list: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of list) {
    const formatted = formatAmenity(item);
    const key = strip(formatted);
    if (!formatted || seen.has(key)) continue;
    seen.add(key);
    out.push(formatted);
  }
  return out;
}
