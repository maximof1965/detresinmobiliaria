'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { PropertyImage } from '@/lib/database.types';

const BUCKET = 'property-images';

export default function ImageManager({
  propertyId,
  images,
}: {
  propertyId: string;
  images: PropertyImage[];
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp'];

  async function uploadFiles(files: FileList) {
    const supabase = createClient();
    setBusy(true);
    setError('');
    try {
      let orden = images.length;
      for (const file of Array.from(files)) {
        if (!ACCEPTED.includes(file.type)) {
          throw new Error(`Formato no permitido: ${file.name}. Usa PNG, JPG o WEBP.`);
        }
        const ext = file.name.split('.').pop() ?? 'jpg';
        const path = `${propertyId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file);
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
        const { error: insErr } = await supabase
          .from('property_images')
          .insert({ property_id: propertyId, url: pub.publicUrl, orden: orden++ });
        if (insErr) throw insErr;
      }
      if (fileRef.current) fileRef.current.value = '';
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al subir imagenes');
    } finally {
      setBusy(false);
    }
  }

  async function remove(img: PropertyImage) {
    if (!confirm('Eliminar esta imagen?')) return;
    const supabase = createClient();
    setBusy(true);
    try {
      await supabase.from('property_images').delete().eq('id', img.id);
      const marker = `/${BUCKET}/`;
      const idx = img.url.indexOf(marker);
      if (idx !== -1) {
        const path = img.url.slice(idx + marker.length);
        await supabase.storage.from(BUCKET).remove([path]);
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
      <h2 className="font-display text-lg font-semibold">Imagenes</h2>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        Sube fotos desde tu equipo (PNG, JPG o WEBP). La primera imagen sera la principal.
      </p>

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        disabled={busy}
        onChange={(e) => e.target.files && uploadFiles(e.target.files)}
        className="hidden"
      />

      <div className="mt-4">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[var(--color-line)] px-6 py-8 text-center transition-colors hover:border-[var(--color-gold)] hover:bg-[var(--color-sand)] disabled:opacity-60"
        >
          <span className="text-3xl">📷</span>
          <span className="text-sm font-medium">Subir fotos</span>
          <span className="text-xs text-[var(--color-muted)]">
            Haz clic para elegir una o varias fotos (PNG, JPG, WEBP)
          </span>
        </button>
      </div>

      {busy && <p className="mt-3 text-sm text-[var(--color-muted)]">Procesando...</p>}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <div key={img.id} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--color-line)]">
              <Image src={img.url} alt={img.alt ?? ''} fill sizes="200px" className="object-cover" />
              {i === 0 && (
                <span className="absolute left-1 top-1 rounded bg-[var(--color-gold)] px-2 py-0.5 text-[10px] font-medium text-white">
                  Principal
                </span>
              )}
              <button
                type="button"
                onClick={() => remove(img)}
                className="absolute right-1 top-1 rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
