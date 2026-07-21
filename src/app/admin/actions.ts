'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { PropertyInsert } from '@/lib/database.types';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
}

function numOrNull(v: FormDataEntryValue | null): number | null {
  if (v == null || String(v).trim() === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function numOr(v: FormDataEntryValue | null, fallback: number): number {
  const n = numOrNull(v);
  return n == null ? fallback : n;
}

function parseAmenidades(v: FormDataEntryValue | null): string[] {
  if (!v) return [];
  return String(v)
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  return supabase;
}

function buildPayload(formData: FormData): PropertyInsert {
  const titulo = String(formData.get('titulo') ?? '').trim();
  const slugInput = String(formData.get('slug') ?? '').trim();
  const slug = slugInput ? slugify(slugInput) : `${slugify(titulo)}-${Math.random().toString(36).slice(2, 6)}`;

  return {
    titulo,
    slug,
    operacion: String(formData.get('operacion') ?? 'venta'),
    tipo: String(formData.get('tipo') ?? 'casa'),
    estado: String(formData.get('estado') ?? 'usado'),
    precio: numOrNull(formData.get('precio')),
    moneda: String(formData.get('moneda') ?? 'COP'),
    area_m2: numOrNull(formData.get('area_m2')),
    alcobas: numOr(formData.get('alcobas'), 0),
    banos: numOr(formData.get('banos'), 0),
    parqueaderos: numOr(formData.get('parqueaderos'), 0),
    ciudad: String(formData.get('ciudad') ?? '').trim() || null,
    barrio: String(formData.get('barrio') ?? '').trim() || null,
    direccion: String(formData.get('direccion') ?? '').trim() || null,
    lat: numOrNull(formData.get('lat')),
    lng: numOrNull(formData.get('lng')),
    descripcion: String(formData.get('descripcion') ?? '').trim() || null,
    amenidades: parseAmenidades(formData.get('amenidades')),
    destacado: formData.get('destacado') === 'on',
    publicado: formData.get('publicado') === 'on',
  };
}

export async function createProperty(formData: FormData) {
  const supabase = await requireUser();
  const payload = buildPayload(formData);
  const { data, error } = await supabase.from('properties').insert(payload).select('id').single();
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/propiedades');
  redirect(`/admin/propiedades/${data.id}`);
}

export async function updateProperty(id: string, formData: FormData) {
  const supabase = await requireUser();
  const payload = buildPayload(formData);
  const { error } = await supabase.from('properties').update(payload).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/propiedades');
  revalidatePath(`/propiedades/${payload.slug}`);
  redirect('/admin');
}

export async function deleteProperty(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get('id') ?? '');
  const { error } = await supabase.from('properties').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/propiedades');
}

export async function togglePublish(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get('id') ?? '');
  const publicado = formData.get('publicado') === 'true';
  const { error } = await supabase.from('properties').update({ publicado: !publicado }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/propiedades');
}
