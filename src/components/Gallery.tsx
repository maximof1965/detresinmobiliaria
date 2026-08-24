'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { PropertyImage } from '@/lib/database.types';

export default function Gallery({
  images,
  title,
}: {
  images: PropertyImage[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const count = images?.length ?? 0;
  const prev = useCallback(() => setActive((a) => (a - 1 + count) % count), [count]);
  const next = useCallback(() => setActive((a) => (a + 1) % count), [count]);

  useEffect(() => {
    if (!fullscreen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setFullscreen(false);
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [fullscreen, prev, next]);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-[var(--radius-card)] bg-[var(--color-sand)] text-[var(--color-muted)]">
        Sin imagenes
      </div>
    );
  }

  const current = images[active];

  return (
    <div>
      <div className="group relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-sand)]">
        <button
          type="button"
          onClick={() => setFullscreen(true)}
          aria-label="Ver en pantalla completa"
          className="absolute inset-0 z-10 cursor-zoom-in"
        />
        <Image
          src={current.url}
          alt={current.alt ?? title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />

        <span className="pointer-events-none absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full bg-black/55 px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          ⛶ Ampliar
        </span>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg shadow hover:bg-white"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg shadow hover:bg-white"
            >
              ›
            </button>
            <div className="absolute bottom-3 right-3 z-20 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
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

      {fullscreen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          onClick={() => setFullscreen(false)}
        >
          <button
            type="button"
            onClick={() => setFullscreen(false)}
            aria-label="Cerrar"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
          >
            ✕
          </button>

          <div
            className="relative h-full w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.url}
              alt={current.alt ?? title}
              fill
              sizes="100vw"
              className="object-contain p-4 sm:p-10"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Anterior"
                  className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Siguiente"
                  className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
                >
                  ›
                </button>
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white">
                  {active + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
