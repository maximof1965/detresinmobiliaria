export type Option = { value: string; label: string };

export const OPERACIONES: Option[] = [
  { value: 'venta', label: 'Venta' },
  { value: 'arriendo', label: 'Arriendo' },
  { value: 'permuta', label: 'Permuta' },
];

export const TIPOS: Option[] = [
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'apartaestudio', label: 'Apartaestudio' },
  { value: 'casa', label: 'Casa' },
  { value: 'casa_campestre', label: 'Casa campestre' },
  { value: 'duplex', label: 'Duplex' },
  { value: 'finca', label: 'Finca' },
  { value: 'lote', label: 'Lote / Terreno' },
  { value: 'oficina', label: 'Oficina' },
  { value: 'local', label: 'Local' },
  { value: 'bodega', label: 'Bodega' },
];

export const ESTADOS: Option[] = [
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'usado', label: 'Usado' },
  { value: 'proyecto', label: 'Proyecto' },
  { value: 'en_construccion', label: 'En construccion' },
];

export function labelFor(list: Option[], value: string | null | undefined): string {
  if (!value) return '';
  return list.find((o) => o.value === value)?.label ?? value;
}
