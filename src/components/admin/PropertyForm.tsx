'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { Property } from '@/lib/database.types';
import { TIPOS, ESTADOS } from '@/lib/labels';
import AmenitiesInput from '@/components/admin/AmenitiesInput';

const LocationPicker = dynamic(() => import('@/components/admin/LocationPicker'), {
  ssr: false,
  loading: () => (
    <div className="h-72 w-full animate-pulse rounded-lg border border-[var(--color-line)] bg-[var(--color-sand)]/40" />
  ),
});

export default function PropertyForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  initial?: Property | null;
  submitLabel: string;
}) {
  const [ciudad, setCiudad] = useState(initial?.ciudad ?? '');
  const [barrio, setBarrio] = useState(initial?.barrio ?? '');
  const [direccion, setDireccion] = useState(initial?.direccion ?? '');

  return (
    <form action={action} className="space-y-8">
      <Section title="Informacion principal">
        {/* Por ahora la inmobiliaria solo maneja ventas */}
        <input type="hidden" name="operacion" value="venta" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Titulo" className="sm:col-span-2">
            <input name="titulo" required defaultValue={initial?.titulo ?? ''} className={inputCls} />
          </Field>
          <Field label="Tipo">
            <select name="tipo" defaultValue={initial?.tipo ?? 'casa'} className={inputCls}>
              {TIPOS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Estado">
            <select name="estado" defaultValue={initial?.estado ?? 'usado'} className={inputCls}>
              {ESTADOS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Precio (COP)">
            <input name="precio" type="number" defaultValue={initial?.precio ?? ''} className={inputCls} />
          </Field>
        </div>
      </Section>

      <Section title="Caracteristicas">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Area (m2)">
            <input name="area_m2" type="number" defaultValue={initial?.area_m2 ?? ''} className={inputCls} />
          </Field>
          <Field label="Alcobas">
            <input name="alcobas" type="number" defaultValue={initial?.alcobas ?? 0} className={inputCls} />
          </Field>
          <Field label="Banos">
            <input name="banos" type="number" step="0.5" defaultValue={initial?.banos ?? 0} className={inputCls} />
          </Field>
          <Field label="Parqueaderos">
            <input name="parqueaderos" type="number" defaultValue={initial?.parqueaderos ?? 0} className={inputCls} />
          </Field>
        </div>
      </Section>

      <Section title="Ubicacion">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ciudad">
            <input
              name="ciudad"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Barrio / sector">
            <input
              name="barrio"
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Direccion" className="sm:col-span-2">
            <input
              name="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
        <div className="mt-4">
          <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
            Ubicacion en el mapa (haz clic para fijar el punto y autocompletar la direccion)
          </span>
          <LocationPicker
            initialLat={initial?.lat ?? null}
            initialLng={initial?.lng ?? null}
            onPick={(info) => {
              if (info.direccion) setDireccion(info.direccion);
              setCiudad((prev) => prev || info.ciudad);
              setBarrio((prev) => prev || info.barrio);
            }}
          />
        </div>
      </Section>

      <Section title="Detalle">
        <Field label="Descripcion">
          <textarea name="descripcion" rows={6} defaultValue={initial?.descripcion ?? ''} className={`${inputCls} h-auto py-3`} />
        </Field>
        <div className="mt-4">
          <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">Amenidades</span>
          <AmenitiesInput initial={initial?.amenidades ?? []} />
        </div>
        <Field label="Slug (URL, opcional; se genera automatico)" className="mt-4">
          <input name="slug" defaultValue={initial?.slug ?? ''} className={inputCls} />
        </Field>
      </Section>

      <Section title="Publicacion">
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="publicado" defaultChecked={initial?.publicado ?? false} className="h-4 w-4" />
            Publicada (visible en el sitio)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="destacado" defaultChecked={initial?.destacado ?? false} className="h-4 w-4" />
            Destacada (aparece en portada)
          </label>
        </div>
      </Section>

      <div className="flex gap-3">
        <button
          type="submit"
          className="h-12 rounded-lg bg-[var(--color-ink)] px-8 text-sm font-medium text-white hover:opacity-90"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  'h-11 w-full rounded-lg border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-gold)]';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
      <h2 className="mb-4 font-display text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">{label}</span>
      {children}
    </label>
  );
}
