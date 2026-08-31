import { createClient } from '@/lib/supabase/server';
import type { City, PropertyWithImages } from '@/lib/database.types';
import type { MappedProperty } from '@/lib/map-types';

export type { MappedProperty };

export type PropertyFilters = {
  operacion?: string;
  tipo?: string;
  ciudad?: string;
  q?: string;
  precioMin?: number;
  precioMax?: number;
  alcobas?: number;
  banos?: number;
};

const PROPERTY_SELECT =
  '*, property_images(id, url, alt, orden), agents(id, nombre, cargo, foto_url, telefono, whatsapp, email)';

function sortImages(p: PropertyWithImages): PropertyWithImages {
  return {
    ...p,
    property_images: [...(p.property_images ?? [])].sort((a, b) => a.orden - b.orden),
  };
}

export async function getCities(): Promise<City[]> {
  const supabase = await createClient();
  const { data } = await supabase.from('cities').select('*').order('orden', { ascending: true });
  return data ?? [];
}

export async function getFeaturedProperties(limit = 6): Promise<PropertyWithImages[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('properties')
    .select(PROPERTY_SELECT)
    .eq('publicado', true)
    .eq('destacado', true)
    .order('posicion', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(limit);
  return ((data as unknown as PropertyWithImages[]) ?? []).map(sortImages);
}

export async function getLatestProperties(limit = 8): Promise<PropertyWithImages[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('properties')
    .select(PROPERTY_SELECT)
    .eq('publicado', true)
    .order('posicion', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(limit);
  return ((data as unknown as PropertyWithImages[]) ?? []).map(sortImages);
}

export async function getProperties(filters: PropertyFilters): Promise<PropertyWithImages[]> {
  const supabase = await createClient();
  let query = supabase.from('properties').select(PROPERTY_SELECT).eq('publicado', true);

  if (filters.operacion) query = query.eq('operacion', filters.operacion);
  if (filters.tipo) query = query.eq('tipo', filters.tipo);
  if (filters.ciudad) query = query.ilike('ciudad', `%${filters.ciudad}%`);
  if (filters.q) query = query.or(`titulo.ilike.%${filters.q}%,barrio.ilike.%${filters.q}%,ciudad.ilike.%${filters.q}%`);
  if (filters.precioMin != null) query = query.gte('precio', filters.precioMin);
  if (filters.precioMax != null) query = query.lte('precio', filters.precioMax);
  if (filters.alcobas != null) query = query.gte('alcobas', filters.alcobas);
  if (filters.banos != null) query = query.gte('banos', filters.banos);

  const { data } = await query
    .order('posicion', { ascending: true })
    .order('destacado', { ascending: false })
    .order('created_at', { ascending: false });
  return ((data as unknown as PropertyWithImages[]) ?? []).map(sortImages);
}

export async function getPropertyBySlug(slug: string): Promise<PropertyWithImages | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('properties')
    .select(PROPERTY_SELECT)
    .eq('slug', slug)
    .eq('publicado', true)
    .maybeSingle();
  return data ? sortImages(data as unknown as PropertyWithImages) : null;
}

export async function getMappedProperties(): Promise<MappedProperty[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('properties')
    .select('id, slug, titulo, precio, moneda, ciudad, barrio, lat, lng, tipo, property_images(url, orden)')
    .eq('publicado', true)
    .not('lat', 'is', null)
    .not('lng', 'is', null)
    .order('posicion', { ascending: true });

  return ((data as unknown as Array<{
    id: string;
    slug: string;
    titulo: string;
    precio: number | null;
    moneda: string;
    ciudad: string | null;
    barrio: string | null;
    lat: number | null;
    lng: number | null;
    tipo: string;
    property_images: { url: string; orden: number }[] | null;
  }>) ?? [])
    .filter((p) => p.lat != null && p.lng != null)
    .map((p) => {
      const imgs = [...(p.property_images ?? [])].sort((a, b) => a.orden - b.orden);
      return {
        id: p.id,
        slug: p.slug,
        titulo: p.titulo,
        precio: p.precio,
        moneda: p.moneda,
        ciudad: p.ciudad,
        barrio: p.barrio,
        lat: p.lat as number,
        lng: p.lng as number,
        tipo: p.tipo,
        image: imgs[0]?.url ?? null,
      };
    });
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase.from('properties').select('slug').eq('publicado', true);
  return (data ?? []).map((r) => r.slug);
}
