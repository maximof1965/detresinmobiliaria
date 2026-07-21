import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { togglePublish } from './actions';
import DeleteButton from '@/components/admin/DeleteButton';
import { formatPrice } from '@/lib/format';
import { labelFor, OPERACIONES, TIPOS } from '@/lib/labels';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ data: properties }, { data: leads }] = await Promise.all([
    supabase.from('properties').select('*').order('created_at', { ascending: false }),
    supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(20),
  ]);

  const list = properties ?? [];
  const publicadas = list.filter((p) => p.publicado).length;

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Propiedades totales" value={list.length} />
        <Stat label="Publicadas" value={publicadas} />
        <Stat label="Solicitudes (leads)" value={leads?.length ?? 0} />
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-display text-2xl font-semibold">Inventario</h1>
          <Link
            href="/admin/propiedades/nueva"
            className="rounded-lg bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            + Nueva propiedad
          </Link>
        </div>

        <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="border-b border-[var(--color-line)] bg-[var(--color-sand)]/30 text-left text-xs uppercase text-[var(--color-muted)]">
                <tr>
                  <th className="px-4 py-3">Titulo</th>
                  <th className="px-4 py-3">Tipo / Operacion</th>
                  <th className="px-4 py-3">Precio</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {list.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-[var(--color-muted)]">
                      Aun no hay propiedades. Crea la primera.
                    </td>
                  </tr>
                )}
                {list.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--color-line)] last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium">{p.titulo}</p>
                      <p className="text-xs text-[var(--color-muted)]">{[p.barrio, p.ciudad].filter(Boolean).join(', ')}</p>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-ink-soft)]">
                      {labelFor(TIPOS, p.tipo)}
                      <br />
                      <span className="text-xs text-[var(--color-muted)]">{labelFor(OPERACIONES, p.operacion)}</span>
                    </td>
                    <td className="px-4 py-3">{formatPrice(p.precio, p.moneda)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          p.publicado ? 'bg-green-100 text-green-700' : 'bg-[var(--color-sand)] text-[var(--color-muted)]'
                        }`}
                      >
                        {p.publicado ? 'Publicada' : 'Oculta'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <form action={togglePublish}>
                          <input type="hidden" name="id" value={p.id} />
                          <input type="hidden" name="publicado" value={String(p.publicado)} />
                          <button className="rounded-lg border border-[var(--color-line)] px-3 py-1.5 text-xs font-medium hover:bg-[var(--color-sand)]">
                            {p.publicado ? 'Ocultar' : 'Publicar'}
                          </button>
                        </form>
                        <Link
                          href={`/admin/propiedades/${p.id}`}
                          className="rounded-lg border border-[var(--color-line)] px-3 py-1.5 text-xs font-medium hover:bg-[var(--color-sand)]"
                        >
                          Editar
                        </Link>
                        <DeleteButton id={p.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl font-semibold">Ultimas solicitudes</h2>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)]">
          {(!leads || leads.length === 0) && (
            <p className="px-4 py-8 text-center text-sm text-[var(--color-muted)]">Aun no hay solicitudes.</p>
          )}
          {leads && leads.length > 0 && (
            <ul className="divide-y divide-[var(--color-line)]">
              {leads.map((l) => (
                <li key={l.id} className="px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{l.nombre}</p>
                    <p className="text-xs text-[var(--color-muted)]">
                      {new Date(l.created_at).toLocaleString('es-CO')}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {[l.telefono, l.email].filter(Boolean).join(' · ')}
                  </p>
                  {l.mensaje && <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{l.mensaje}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
      <p className="text-sm text-[var(--color-muted)]">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold">{value}</p>
    </div>
  );
}
