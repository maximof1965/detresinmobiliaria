import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Gallery from '@/components/Gallery';
import ContactForm from '@/components/ContactForm';
import { getPropertyBySlug } from '@/lib/queries';
import { formatPrice, formatArea } from '@/lib/format';
import { labelFor, TIPOS, ESTADOS } from '@/lib/labels';
import { siteConfig, whatsappUrl } from '@/lib/config';

export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: 'Propiedad no encontrada' };
  return {
    title: property.titulo,
    description: property.descripcion ?? undefined,
    openGraph: {
      title: property.titulo,
      images: property.property_images?.[0]?.url ? [property.property_images[0].url] : [],
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const area = formatArea(property.area_m2);
  const priceLabel = formatPrice(property.precio, property.moneda);
  const waMessage = `Hola ${siteConfig.name}, me interesa la propiedad "${property.titulo}" (${priceLabel}).`;

  const specs = [
    property.alcobas > 0 ? { label: 'Alcobas', value: property.alcobas } : null,
    property.banos > 0 ? { label: 'Banos', value: property.banos } : null,
    property.parqueaderos > 0 ? { label: 'Parqueaderos', value: property.parqueaderos } : null,
    area ? { label: 'Area', value: area } : null,
  ].filter(Boolean) as { label: string; value: string | number }[];

  const mapSrc = property.lat && property.lng
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${property.lng - 0.01}%2C${property.lat - 0.01}%2C${property.lng + 0.01}%2C${property.lat + 0.01}&layer=mapnik&marker=${property.lat}%2C${property.lng}`
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-4 text-sm text-[var(--color-muted)]">
        <Link href="/propiedades" className="hover:text-[var(--color-ink)]">
          Propiedades
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-ink)]">{property.titulo}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Gallery images={property.property_images ?? []} title={property.titulo} />

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[var(--color-ink)] px-3 py-1 text-xs font-medium text-white">
              {labelFor(TIPOS, property.tipo)}
            </span>
            <span className="rounded-full bg-[var(--color-sand)] px-3 py-1 text-xs font-medium">
              {labelFor(ESTADOS, property.estado)}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{property.titulo}</h1>
          <p className="mt-1 text-[var(--color-muted)]">
            {[property.barrio, property.ciudad].filter(Boolean).join(', ')}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 sm:grid-cols-4">
            {specs.map((s) => (
              <div key={s.label}>
                <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">{s.label}</p>
                <p className="mt-1 text-lg font-semibold">{s.value}</p>
              </div>
            ))}
          </div>

          {property.descripcion && (
            <div className="mt-8">
              <h2 className="font-display text-2xl font-semibold">Descripcion</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-[var(--color-ink-soft)]">
                {property.descripcion}
              </p>
            </div>
          )}

          {property.amenidades && property.amenidades.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl font-semibold">Amenidades</h2>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {property.amenidades.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {mapSrc && (
            <div className="mt-8">
              <h2 className="font-display text-2xl font-semibold">Ubicacion</h2>
              <div className="mt-3 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)]">
                <iframe
                  src={mapSrc}
                  className="h-80 w-full"
                  loading="lazy"
                  title={`Mapa de ${property.titulo}`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
              <p className="text-sm text-[var(--color-muted)]">Precio</p>
              <p className="font-display text-3xl font-semibold">{priceLabel}</p>

              <a
                href={whatsappUrl(waMessage)}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] font-medium text-white hover:opacity-90"
              >
                Consultar por WhatsApp
              </a>
              <a
                href={`tel:${siteConfig.whatsapp}`}
                className="mt-3 flex h-12 w-full items-center justify-center rounded-lg border border-[var(--color-line)] font-medium hover:bg-[var(--color-sand)]"
              >
                Llamar ahora
              </a>
            </div>

            <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
              <h3 className="font-display text-xl font-semibold">Solicita mas informacion</h3>
              <div className="mt-4">
                <ContactForm propertyId={property.id} propertyTitle={property.titulo} />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Barra de contacto pegada abajo en movil */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-[var(--color-line)] bg-[var(--color-surface)] p-3 lg:hidden">
        <div className="flex-1">
          <p className="text-xs text-[var(--color-muted)]">En venta</p>
          <p className="font-semibold">{priceLabel}</p>
        </div>
        <a
          href={whatsappUrl(waMessage)}
          target="_blank"
          rel="noreferrer"
          className="flex h-11 items-center justify-center rounded-lg bg-[#25D366] px-6 font-medium text-white"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
