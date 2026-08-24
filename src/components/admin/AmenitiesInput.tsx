'use client';

import { useRef, useState } from 'react';

export default function AmenitiesInput({ initial }: { initial?: string[] }) {
  const [items, setItems] = useState<string[]>(initial ?? []);
  const [value, setValue] = useState('');
  const dragIndex = useRef<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);

  function add() {
    const v = value.trim();
    if (!v) return;
    if (!items.some((it) => it.toLowerCase() === v.toLowerCase())) {
      setItems((prev) => [...prev, v]);
    }
    setValue('');
  }

  function removeAt(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

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

  function onDragEnd() {
    dragIndex.current = null;
    setDragging(null);
  }

  return (
    <div>
      {/* El servidor separa por salto de linea o coma */}
      <input type="hidden" name="amenidades" value={items.join('\n')} />

      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Escribe una amenidad y presiona Enter"
          className="h-11 w-full rounded-lg border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-gold)]"
        />
        <button
          type="button"
          onClick={add}
          className="h-11 shrink-0 rounded-lg border border-[var(--color-line)] px-5 text-sm font-medium hover:bg-[var(--color-sand)]"
        >
          Agregar
        </button>
      </div>

      {items.length > 0 && (
        <>
          <ul className="mt-3 flex flex-wrap gap-2">
            {items.map((it, i) => (
              <li
                key={`${it}-${i}`}
                draggable
                onDragStart={() => onDragStart(i)}
                onDragEnter={() => onDragEnter(i)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={onDragEnd}
                className={`flex cursor-move select-none items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-sand)]/40 py-1 pl-2 pr-1 text-sm transition-opacity ${
                  dragging === i ? 'opacity-50 ring-2 ring-[var(--color-gold)]' : ''
                }`}
              >
                <span className="text-[var(--color-muted)]">⠿</span>
                <span>{it}</span>
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  aria-label={`Quitar ${it}`}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-black/10 text-xs hover:bg-black/20"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-[var(--color-muted)]">
            Arrastra las amenidades para cambiar su orden.
          </p>
        </>
      )}
    </div>
  );
}
