'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { PropertyImage } from '@/lib/database.types';

export default function Gallery({
  images,
  title,
}: {
  images: PropertyImage[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-[var(--radius-card)] bg-[var(--color-sand)] text-[var(--color-muted)]">
        Sin imagenes
      </div>
    );
  }

  const current = images[active];
  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);
  const next = () => setActive((a) => (a + 1) % images.length);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-sand)]">
        <Image
          src={current.url}
          alt={current.alt ?? title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg shadow hover:bg-white"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg shadow hover:bg-white"
            >
              ›
            </button>
            <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
              {active + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-20 w-28 flex-none overflow-hidden rounded-lg border-2 transition-colors ${
                i === active ? 'border-[var(--color-gold)]' : 'border-transparent'
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt ?? `${title} ${i + 1}`}
                fill
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
