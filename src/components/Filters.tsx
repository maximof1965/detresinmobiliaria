'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { OPERACIONES, TIPOS, ESTADOS } from '@/lib/labels';

export default function Filters() {
  const router = useRouter();
  const sp = useSearchParams();
  const [open, setOpen] = useState(false);

  const get = (k: string) => sp.get(k) ?? '';

  function apply(formData: FormData) {
    const params = new URLSearchParams();
    for (const key of ['operacion', 'tipo', 'ciudad', 'q', 'precioMin', 'precioMax', 'alcobas', 'banos']) {
      const value = String(formData.get(key) ?? '').trim();
      if (value) params.set(key, value);
    }
    router.push(`/propiedades?${params.toString()}`);
    setOpen(false);
  }

  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left font-medium lg:hidden"
      >
        Filtros
        <span className="text-[var(--color-gold-deep)]">{open ? 'Ocultar' : 'Mostrar'}</span>
      </button>

      <form
        action={apply}
        className={`${open ? 'block' : 'hidden'} gap-4 p-5 lg:grid lg:grid-cols-4 lg:gap-4`}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-4">
          <Field label="Operacion">
            <select name="operacion" defaultValue={get('operacion')} className={inputCls}>
              <option value="">Todas</option>
              {OPERACIONES.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Tipo">
            <select name="tipo" defaultValue={get('tipo')} className={inputCls}>
              <option value="">Todos</option>
              {TIPOS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Ciudad">
            <input name="ciudad" defaultValue={get('ciudad')} placeholder="Ej: Medellin" className={inputCls} />
          </Field>

          <Field label="Palabra clave">
            <input name="q" defaultValue={get('q')} placeholder="Barrio, titulo..." className={inputCls} />
          </Field>

          <Field label="Precio desde">
            <input name="precioMin" defaultValue={get('precioMin')} type="number" placeholder="0" className={inputCls} />
          </Field>

          <Field label="Precio hasta">
            <input name="precioMax" defaultValue={get('precioMax')} type="number" placeholder="Sin limite" className={inputCls} />
          </Field>

          <Field label="Alcobas (min)">
            <select name="alcobas" defaultValue={get('alcobas')} className={inputCls}>
              <option value="">Todas</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </Field>

          <Field label="Banos (min)">
            <select name="banos" defaultValue={get('banos')} className={inputCls}>
              <option value="">Todos</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-4 flex gap-3 lg:col-span-4 lg:mt-0">
          <button
            type="submit"
            className="h-11 flex-1 rounded-lg bg-[var(--color-ink)] px-6 text-sm font-medium text-white hover:opacity-90"
          >
            Aplicar filtros
          </button>
          <button
            type="button"
            onClick={() => router.push('/propiedades')}
            className="h-11 rounded-lg border border-[var(--color-line)] px-6 text-sm font-medium hover:bg-[var(--color-sand)]"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  'h-11 w-full rounded-lg border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-gold)]';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">{label}</span>
      {children}
    </label>
  );
}
