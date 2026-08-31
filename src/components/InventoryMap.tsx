'use client';

import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap, Marker } from 'leaflet';
import { brandCircleIcon, DEFAULT_MAP_CENTER, escapeHtml } from '@/lib/map-marker';
import { formatPrice } from '@/lib/format';
import { labelFor, TIPOS } from '@/lib/labels';
import type { MappedProperty } from '@/lib/map-types';

export default function InventoryMap({ properties }: { properties: MappedProperty[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [selected, setSelected] = useState<MappedProperty | null>(null);

  useEffect(() => {
    let cancelled = false;
    const markers: Marker[] = [];

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, { scrollWheelZoom: true }).setView(DEFAULT_MAP_CENTER, 11);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      const icon = brandCircleIcon(L);
      const bounds = L.latLngBounds([]);

      for (const p of properties) {
        const marker = L.marker([p.lat, p.lng], { icon }).addTo(map);
        bounds.extend([p.lat, p.lng]);

        const loc = [p.barrio, p.ciudad].filter(Boolean).join(', ');
        marker.bindPopup(
          `<div class="detres-popup">
            <strong>${escapeHtml(p.titulo)}</strong>
            <span>${escapeHtml(formatPrice(p.precio, p.moneda))}</span>
            ${loc ? `<em>${escapeHtml(loc)}</em>` : ''}
          </div>`,
          { closeButton: false, className: 'detres-popup-wrap' }
        );
        marker.on('click', () => setSelected(p));
        markers.push(marker);
      }

      if (properties.length === 1) {
        map.setView([properties[0].lat, properties[0].lng], 15);
      } else if (properties.length > 1 && bounds.isValid()) {
        map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
      }

      setTimeout(() => map.invalidateSize(), 120);
    })();

    return () => {
      cancelled = true;
      markers.forEach((m) => m.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [properties]);

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)]">
      <div
        ref={containerRef}
        className="h-[420px] w-full sm:h-[520px]"
        style={{ background: '#ece4d6' }}
      />

      {selected && (
        <div className="flex flex-col gap-4 border-t border-[var(--color-line)] p-4 sm:flex-row sm:items-center">
          {selected.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={selected.image}
              alt={selected.titulo}
              className="h-28 w-full rounded-lg object-cover sm:h-24 sm:w-36"
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-gold-deep)]">
              {labelFor(TIPOS, selected.tipo)}
              {selected.ciudad ? ` · ${selected.ciudad}` : ''}
            </p>
            <h3 className="mt-0.5 font-display text-lg font-semibold leading-snug">{selected.titulo}</h3>
            {selected.barrio && (
              <p className="text-sm text-[var(--color-muted)]">{selected.barrio}</p>
            )}
            <p className="mt-1 font-semibold">{formatPrice(selected.precio, selected.moneda)}</p>
          </div>
          <Link
            href={`/propiedades/${selected.slug}`}
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-[var(--color-ink)] px-5 text-sm font-medium text-white hover:opacity-90"
          >
            Ver propiedad
          </Link>
        </div>
      )}

      {!selected && properties.length > 0 && (
        <p className="border-t border-[var(--color-line)] px-4 py-3 text-sm text-[var(--color-muted)]">
          Haz clic en un círculo para ver la propiedad y entrar a su ficha.
        </p>
      )}
    </div>
  );
}
