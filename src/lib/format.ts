export function formatPrice(precio: number | null, moneda: string = 'COP'): string {
  if (precio == null) return 'Precio a consultar';
  try {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: moneda,
      maximumFractionDigits: 0,
    }).format(precio);
  } catch {
    return `$${precio.toLocaleString('es-CO')} ${moneda}`;
  }
}

export function formatArea(area: number | null): string | null {
  if (area == null) return null;
  return `${new Intl.NumberFormat('es-CO').format(area)} m²`;
}
