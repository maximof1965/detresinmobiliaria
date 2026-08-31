import type { Metadata } from 'next';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: `${siteConfig.fullName}: ${siteConfig.tagline}. ${siteConfig.slogan}`,
};

const diferencias = [
  'Avalúos profesionales realizados por un experto.',
  'Análisis financiero y económico para tomar mejores decisiones de inversión.',
  'Posibilidad de financiación directa con recursos propios en casos específicos.',
  'Acompañamiento integral desde la valoración hasta el cierre de la negociación.',
  'Atención personalizada y transparente en cada operación.',
];

export default function NosotrosPage() {
  return (
    <>
      <section className="relative flex min-h-[52vh] items-center">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-[var(--color-sand)]">
            {siteConfig.fullName}
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-4 font-display text-xl italic text-[var(--color-gold)]">
            {siteConfig.slogan}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-gold-deep)]">
          Presentación
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold">{siteConfig.slogan}</h2>
        <div className="mt-6 space-y-4 leading-relaxed text-[var(--color-ink-soft)]">
          <p>
            Somos una firma inmobiliaria que integra conocimiento, confianza y estrategia para
            maximizar el valor de cada inversión.
          </p>
          <p>
            Acompañamos a nuestros clientes desde la primera decisión hasta el cierre exitoso de
            cada negocio.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-sand)]/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-gold-deep)]">
            Diferenciales
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold">¿Qué nos hace diferentes?</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {diferencias.map((item) => (
              <li
                key={item}
                className="flex gap-4 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-gold)]" />
                <p className="text-[var(--color-ink-soft)]">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-gold-deep)]">
            Propuesta de valor
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold">Soluciones inmobiliarias completas</h2>
          <p className="mt-5 leading-relaxed text-[var(--color-ink-soft)]">
            Más que vender propiedades, ofrecemos soluciones inmobiliarias completas. Combinamos
            experiencia en valoración de inmuebles, administración, análisis económico y opciones
            de financiación privada para que nuestros clientes compren, vendan e inviertan con
            confianza, seguridad y el mejor acompañamiento.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-gold-deep)]">
            Propósito superior
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold">El patrimonio transforma vidas</h2>
          <p className="mt-5 leading-relaxed text-[var(--color-ink-soft)]">
            En DeTres Inmobiliaria creemos que el patrimonio transforma vidas. Nuestro propósito es
            acompañar a personas, familias e inversionistas a tomar decisiones inmobiliarias
            inteligentes que generen seguridad, crecimiento económico y bienestar. Trabajamos con
            transparencia, conocimiento y compromiso porque entendemos que cada propiedad
            representa mucho más que un activo: representa un sueño, una oportunidad y un legado.
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
            className="h-auto w-44 rounded-[var(--radius-card)]"
          />
          <p className="mt-6 max-w-lg font-display text-2xl italic text-[var(--color-ink-soft)]">
            {siteConfig.slogan}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-gold-deep)]">
              Contáctanos
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold">Asesoría personalizada</h2>
            <p className="mt-5 max-w-md leading-relaxed text-[var(--color-ink-soft)]">
              Déjanos tus datos y recibe una asesoría personalizada para la venta de propiedades,
              avalúos profesionales o soluciones hipotecarias, con el respaldo de un equipo
              comprometido con tu patrimonio.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold">Envíanos un mensaje</h3>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
