import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { siteConfig, whatsappUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Escribenos y te ayudamos a encontrar o publicar tu propiedad.',
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-gold-deep)]">
            Contacto
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold">Estamos para ayudarte</h1>
          <p className="mt-4 max-w-md text-[var(--color-muted)]">
            Cuentanos que buscas o que propiedad quieres vender. Te responderemos lo antes
            posible.
          </p>

          <div className="mt-8 space-y-4 text-sm">
            <div>
              <p className="font-medium">Ubicacion</p>
              <p className="text-[var(--color-muted)]">{siteConfig.location}</p>
            </div>
            <div>
              <p className="font-medium">Telefono</p>
              <a href={`tel:${siteConfig.whatsapp}`} className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">
                {siteConfig.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="font-medium">Correo</p>
              <a href={`mailto:${siteConfig.email}`} className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">
                {siteConfig.email}
              </a>
            </div>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex h-12 items-center justify-center rounded-lg bg-[#25D366] px-6 font-medium text-white hover:opacity-90"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold">Envianos un mensaje</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
