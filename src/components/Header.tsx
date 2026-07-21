'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { siteConfig } from '@/lib/config';

const nav = [
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/propiedades?operacion=venta', label: 'Comprar' },
  { href: '/propiedades?operacion=arriendo', label: 'Arrendar' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="inline-block h-6 w-6 rounded-sm bg-[var(--color-gold)]" />
          <span className="font-display text-xl font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-gold-deep)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contacto"
            className="rounded-full bg-[var(--color-ink)] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Asesoria gratuita
          </Link>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-opacity ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--color-line)] bg-[var(--color-bg)] md:hidden">
          <div className="space-y-1 px-4 py-4">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-[var(--color-ink-soft)] hover:bg-[var(--color-sand)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-[var(--color-ink)] px-5 py-3 text-center text-base font-medium text-white"
            >
              Asesoria gratuita
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
