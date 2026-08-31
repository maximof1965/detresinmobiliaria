import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import InventoryMap from '@/components/InventoryMap';
import { getFeaturedProperties, getLatestProperties, getMappedProperties } from '@/lib/queries';
import { siteConfig } from '@/lib/config';
import { TIPOS } from '@/lib/labels';

export const revalidate = 300;

const HERO_IMG =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=80';

const valores = [
  {
    title: 'Avalúos profesionales',
    text: 'Valoración de inmuebles realizada por un experto, para decidir con información real.',
  },
  {
    title: 'Análisis de inversión',
    text: 'Lectura financiera y económica para comprar, vender o invertir con criterio.',
  },
  {
    title: 'Acompañamiento integral',
    text: 'Desde la primera decisión hasta el cierre, con atención personalizada y transparente.',
  },
];

export default async function HomePage() {
  const [featured, mapped, latest] = await Promise.all([
    getFeaturedProperties(6),
    getMappedProperties(),
    getLatestProperties(8),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[88vh] items-center">
        <Image src={HERO_IMG} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-in-up">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-sand)]">
              {siteConfig.location}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-4 font-display text-xl italic text-[var(--color-gold)]">
              {siteConfig.slogan}
            </p>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Integramos conocimiento, confianza y estrategia para maximizar el valor de cada
              inversión.
            </p>
          </div>
          <div className="mt-10 max-w-4xl">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {valores.map((v) => (
            <div key={v.title} className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] p-7">
              <div className="mb-4 h-1 w-10 rounded-full bg-[var(--color-gold)]" />
              <h3 className="font-display text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {TIPOS.map((t) => (
            <Link
              key={t.value}
              href={`/propiedades?tipo=${t.value}`}
              className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-2 text-sm font-medium transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold-deep)]"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </section>

      {/* DESTACADOS */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-gold-deep)]">
                Selección
              </p>
              <h2 className="mt-1 font-display text-3xl font-semibold">Propiedades destacadas</h2>
            </div>
            <Link href="/propiedades" className="hidden text-sm font-medium hover:text-[var(--color-gold-deep)] sm:block">
              Ver todas →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      {/* MAPA DE INVENTARIO */}
      <section className="bg-[var(--color-sand)]/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl font-semibold">Explora por ubicación</h2>
              <p className="mt-1 text-[var(--color-muted)]">
                Todas las propiedades publicadas, en un mapa que puedes mover, ampliar y consultar.
              </p>
            </div>
            <p className="text-sm text-[var(--color-muted)]">
              {mapped.length} {mapped.length === 1 ? 'propiedad' : 'propiedades'} en el mapa
            </p>
          </div>
          {mapped.length > 0 ? (
            <InventoryMap properties={mapped} />
          ) : (
            <p className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-10 text-center text-[var(--color-muted)]">
              Aún no hay propiedades con ubicación en el mapa. Cuando el equipo fije un punto al
              publicar, aparecerán aquí.
            </p>
          )}
        </div>
      </section>

      {/* ULTIMAS */}
      {latest.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl font-semibold">Últimas propiedades</h2>
            <Link href="/propiedades" className="hidden text-sm font-medium hover:text-[var(--color-gold-deep)] sm:block">
              Ver todas →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[var(--color-ink)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">
            ¿Tienes una propiedad para vender?
          </h2>
          <p className="max-w-xl text-white/70">
            Te acompañamos desde la valoración hasta el cierre, con estrategia y presencia digital.
          </p>
          <Link
            href="/contacto"
            className="rounded-full bg-[var(--color-gold)] px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Publica con nosotros
          </Link>
        </div>
      </section>
    </>
  );
}
