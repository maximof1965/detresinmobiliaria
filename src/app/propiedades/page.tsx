import type { Metadata } from 'next';
import Filters from '@/components/Filters';
import PropertyCard from '@/components/PropertyCard';
import { getProperties, type PropertyFilters } from '@/lib/queries';

export const revalidate = 120;

export const metadata: Metadata = {
  title: 'Propiedades',
  description: 'Explora casas, apartamentos, fincas y lotes en venta y arriendo.',
};

function num(v: string | undefined): number | undefined {
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const one = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };

  const filters: PropertyFilters = {
    operacion: one('operacion'),
    tipo: one('tipo'),
    ciudad: one('ciudad'),
    q: one('q'),
    precioMin: num(one('precioMin')),
    precioMax: num(one('precioMax')),
    alcobas: num(one('alcobas')),
    banos: num(one('banos')),
  };

  const properties = await getProperties(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Propiedades</h1>
        <p className="mt-1 text-[var(--color-muted)]">
          {properties.length} {properties.length === 1 ? 'resultado' : 'resultados'}
        </p>
      </header>

      <div className="mb-8">
        <Filters />
      </div>

      {properties.length === 0 ? (
        <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-line)] bg-[var(--color-surface)] py-20 text-center">
          <p className="font-display text-xl">No encontramos propiedades con esos criterios.</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Prueba ajustando o limpiando los filtros.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
