import type { DivIcon } from 'leaflet';

/** Círculo pequeño en color DeTres: ubica sin el “pin” que sugiere un punto aproximado. */
export function brandCircleIcon(L: typeof import('leaflet')): DivIcon {
  return L.divIcon({
    className: 'detres-dot',
    html: '<span class="detres-dot-inner"></span>',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10],
  });
}

export const DEFAULT_MAP_CENTER: [number, number] = [6.2442, -75.5812];

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return map[c] ?? c;
  });
}
