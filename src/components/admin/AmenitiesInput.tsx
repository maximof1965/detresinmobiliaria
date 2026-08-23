'use client';

import { useState } from 'react';

export default function AmenitiesInput({ initial }: { initial?: string[] }) {
  const [items, setItems] = useState<string[]>(initial ?? []);
  const [value, setValue] = useState('');

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
        <ul className="mt-3 flex flex-wrap gap-2">
          {items.map((it, i) => (
            <li
              key={`${it}-${i}`}
              className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-sand)]/40 py-1 pl-3 pr-1 text-sm"
            >
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
      )}
    </div>
  );
}
