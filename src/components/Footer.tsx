'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import { siteConfig, whatsappUrl } from '@/lib/config';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-ink)] text-[var(--color-sand)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo variant="light" />
          <p className="mt-4 max-w-sm font-display text-lg italic text-[var(--color-sand)]/90">
            {siteConfig.slogan}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Explorar</h4>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-sand)]/70">
            <li>
              <Link href="/propiedades" className="hover:text-white">
                Todas las propiedades
              </Link>
            </li>
            <li>
              <Link href="/nosotros" className="hover:text-white">
                Nosotros
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-white">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Contacto</h4>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-sand)]/70">
            <li>{siteConfig.location}</li>
            <li>
              <a href={`tel:${siteConfig.whatsapp}`} className="hover:text-white">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="hover:text-white">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-[var(--color-sand)]/50 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.fullName}. Todos los derechos reservados.
          </p>
          <Link href="/admin" className="hover:text-white">
            Panel de administración
          </Link>
        </div>
      </div>
    </footer>
  );
}
