'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { reorderProperties, togglePublish } from '@/app/admin/actions';
import DeleteButton from '@/components/admin/DeleteButton';
import { formatPrice } from '@/lib/format';
import { labelFor, TIPOS } from '@/lib/labels';

export type InventoryItem = {
  id: string;
  titulo: string;
  barrio: string | null;
  ciudad: string | null;
  tipo: string;
  precio: number | null;
  moneda: string;
  publicado: boolean;
};

export default function InventoryList({ properties }: { properties: InventoryItem[] }) {
  const [items, setItems] = useState<InventoryItem[]>(properties);
  const [saving, setSaving] = useState(false);
  const dragIndex = useRef<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);

  const idsKey = properties.map((p) => p.id).join(',');
  useEffect(() => {
    setItems(properties);
    // Resync only when the set of properties changes (crear/eliminar),
    // no cuando solo cambia el orden.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  function onDragStart(i: number) {
    dragIndex.current = i;
    setDragging(i);
  }

  function onDragEnter(i: number) {
    const from = dragIndex.current;
    if (from === null || from === i) return;
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(i, 0, moved);
      return next;
    });
    dragIndex.current = i;
    setDragging(i);
  }

  async function onDragEnd() {
    dragIndex.current = null;
    setDragging(null);
    setSaving(true);
    try {
      await reorderProperties(items.map((p) => p.id));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] bg-[var(--color-sand)]/30 px-4 py-2 text-xs text-[var(--color-muted)]">
        <span>Arrastra desde el icono ⠿ para cambiar el orden. Ese orden se refleja en la pagina publica.</span>
        {saving && <span className="text-[var(--color-gold-deep)]">Guardando orden...</span>}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="border-b border-[var(--color-line)] text-left text-xs uppercase text-[var(--color-muted)]">
            <tr>
              <th className="w-10 px-2 py-3"></th>
              <th className="px-4 py-3">Titulo</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-[var(--color-muted)]">
                  Aun no hay propiedades. Crea la primera.
                </td>
              </tr>
            )}
            {items.map((p, i) => (
              <tr
                key={p.id}
                onDragEnter={() => onDragEnter(i)}
                onDragOver={(e) => e.preventDefault()}
                className={`border-b border-[var(--color-line)] last:border-0 ${
                  dragging === i ? 'bg-[var(--color-sand)]/60' : ''
                }`}
              >
                <td
                  draggable
                  onDragStart={() => onDragStart(i)}
                  onDragEnd={onDragEnd}
                  className="cursor-move select-none px-2 py-3 text-center text-lg text-[var(--color-muted)]"
                  title="Arrastra para reordenar"
                >
                  ⠿
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">{p.titulo}</p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {[p.barrio, p.ciudad].filter(Boolean).join(', ')}
                  </p>
                </td>
                <td className="px-4 py-3 text-[var(--color-ink-soft)]">{labelFor(TIPOS, p.tipo)}</td>
                <td className="px-4 py-3">{formatPrice(p.precio, p.moneda)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      p.publicado
                        ? 'bg-green-100 text-green-700'
                        : 'bg-[var(--color-sand)] text-[var(--color-muted)]'
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
  );
}
