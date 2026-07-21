'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TIPOS } from '@/lib/labels';

export default function SearchBar() {
  const router = useRouter();
  const [tipo, setTipo] = useState('');
  const [q, setQ] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (tipo) params.set('tipo', tipo);
    if (q) params.set('q', q);
    router.push(`/propiedades?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className="grid w-full gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/95 p-4 shadow-xl backdrop-blur sm:grid-cols-2 lg:grid-cols-[1fr_2fr_auto]"
    >
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="h-12 rounded-lg border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-gold)]"
      >
        <option value="">Tipo de inmueble</option>
        {TIPOS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ciudad, barrio o palabra clave"
        className="h-12 rounded-lg border border-[var(--color-line)] bg-white px-4 text-sm outline-none focus:border-[var(--color-gold)]"
      />

      <button
        type="submit"
        className="h-12 rounded-lg bg-[var(--color-ink)] px-8 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Buscar
      </button>
    </form>
  );
}
