'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap, Marker, LeafletMouseEvent } from 'leaflet';

// Centro por defecto: Medellin
const DEFAULT_CENTER: [number, number] = [6.2442, -75.5812];

export default function LocationPicker({
  initialLat,
  initialLng,
}: {
  initialLat?: number | null;
  initialLng?: number | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const [lat, setLat] = useState<number | null>(initialLat ?? null);
  const [lng, setLng] = useState<number | null>(initialLng ?? null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const start: [number, number] =
        initialLat != null && initialLng != null ? [initialLat, initialLng] : DEFAULT_CENTER;

      const map = L.map(containerRef.current).setView(start, initialLat != null ? 15 : 12);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      const pin = L.divIcon({
        className: '',
        html: '<div style="font-size:28px;line-height:1">📍</div>',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      if (initialLat != null && initialLng != null) {
        markerRef.current = L.marker([initialLat, initialLng], { icon: pin }).addTo(map);
      }

      map.on('click', (e: LeafletMouseEvent) => {
        const { lat: la, lng: ln } = e.latlng;
        setLat(la);
        setLng(ln);
        if (markerRef.current) {
          markerRef.current.setLatLng([la, ln]);
        } else {
          markerRef.current = L.marker([la, ln], { icon: pin }).addTo(map);
        }
      });

      setTimeout(() => map.invalidateSize(), 100);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clear() {
    setLat(null);
    setLng(null);
    if (markerRef.current && mapRef.current) {
      mapRef.current.removeLayer(markerRef.current);
      markerRef.current = null;
    }
  }

  return (
    <div>
      <input type="hidden" name="lat" value={lat ?? ''} />
      <input type="hidden" name="lng" value={lng ?? ''} />

      <div
        ref={containerRef}
        className="h-72 w-full overflow-hidden rounded-lg border border-[var(--color-line)]"
        style={{ background: '#e5e7eb' }}
      />

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--color-muted)]">
        <span>
          {lat != null && lng != null
            ? `Ubicacion fijada: ${lat.toFixed(6)}, ${lng.toFixed(6)}`
            : 'Haz clic en el mapa para fijar la ubicacion de la propiedad.'}
        </span>
        {lat != null && lng != null && (
          <button
            type="button"
            onClick={clear}
            className="rounded-lg border border-[var(--color-line)] px-3 py-1 font-medium hover:bg-[var(--color-sand)]"
          >
            Quitar ubicacion
          </button>
        )}
      </div>
    </div>
  );
}
