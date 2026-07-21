import Image from 'next/image';
import Link from 'next/link';
import type { PropertyWithImages } from '@/lib/database.types';
import { formatPrice, formatArea } from '@/lib/format';
import { labelFor, TIPOS } from '@/lib/labels';

export default function PropertyCard({ property }: { property: PropertyWithImages }) {
  const img = property.property_images?.[0]?.url;
  const area = formatArea(property.area_m2);

  return (
    <Link
      href={`/propiedades/${property.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-sand)]">
        {img ? (
          <Image
            src={img}
            alt={property.titulo}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[var(--color-muted)]">
            Sin imagen
          </div>
        )}
        {property.destacado && (
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-[var(--color-gold)] px-3 py-1 text-xs font-medium text-white">
              Destacado
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-gold-deep)]">
          {labelFor(TIPOS, property.tipo)}
          {property.ciudad ? ` · ${property.ciudad}` : ''}
        </p>
        <h3 className="mt-1 line-clamp-2 font-display text-lg font-semibold leading-snug">
          {property.titulo}
        </h3>
        {property.barrio && (
          <p className="mt-1 text-sm text-[var(--color-muted)]">{property.barrio}</p>
        )}

        <p className="mt-3 text-xl font-semibold text-[var(--color-ink)]">
          {formatPrice(property.precio, property.moneda)}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-[var(--color-line)] pt-3 text-sm text-[var(--color-ink-soft)]">
          {property.alcobas > 0 && <span>{property.alcobas} alcobas</span>}
          {property.banos > 0 && <span>{property.banos} banos</span>}
          {area && <span>{area}</span>}
        </div>
      </div>
    </Link>
  );
}
