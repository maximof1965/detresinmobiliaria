import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: `Conoce a ${siteConfig.fullName}, tu aliado en propiedades exclusivas.`,
};

export default function NosotrosPage() {
  return (
    <>
      <section className="relative flex min-h-[45vh] items-center">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="max-w-2xl font-display text-4xl font-semibold text-white sm:text-5xl">
            Transformamos la manera de encontrar hogar
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-gold-deep)]">
          Nuestra historia
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold">Mas que inmuebles, estilos de vida</h2>
        <div className="mt-6 space-y-4 leading-relaxed text-[var(--color-ink-soft)]">
          <p>
            En {siteConfig.fullName} entendemos que comprar una propiedad es una de las decisiones
            mas importantes de la vida. Por eso trabajamos con dedicacion, criterio y una atencion
            cercana en cada paso del proceso.
          </p>
          <p>
            Seleccionamos propiedades excepcionales en las mejores zonas de Medellin y el Oriente
            Antioqueno, y las presentamos con la transparencia y el detalle que nuestros clientes
            merecen.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-sand)]/40">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
          <Image
            src="/logo.png"
            alt={siteConfig.fullName}
            width={260}
            height={260}
            className="h-auto w-52 rounded-[var(--radius-card)]"
          />
          <p className="mt-6 max-w-md font-display text-2xl italic text-[var(--color-ink-soft)]">
            {siteConfig.slogan}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold">Hablemos de tu proximo hogar</h2>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-muted)]">
          Nuestro equipo esta listo para asesorarte sin compromiso.
        </p>
        <Link
          href="/contacto"
          className="mt-6 inline-block rounded-full bg-[var(--color-ink)] px-8 py-3 text-sm font-medium text-white hover:opacity-90"
        >
          Contactar
        </Link>
      </section>
    </>
  );
}
