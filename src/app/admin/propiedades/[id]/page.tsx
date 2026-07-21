import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PropertyForm from '@/components/admin/PropertyForm';
import ImageManager from '@/components/admin/ImageManager';
import { updateProperty } from '@/app/admin/actions';

export const dynamic = 'force-dynamic';

export default async function EditPropiedadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: property } = await supabase.from('properties').select('*').eq('id', id).maybeSingle();
  if (!property) notFound();

  const { data: images } = await supabase
    .from('property_images')
    .select('*')
    .eq('property_id', id)
    .order('orden', { ascending: true });

  const action = updateProperty.bind(null, id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]">
            ← Volver al inventario
          </Link>
          <h1 className="mt-2 font-display text-2xl font-semibold">Editar propiedad</h1>
        </div>
        {property.publicado && (
          <Link
            href={`/propiedades/${property.slug}`}
            target="_blank"
            className="rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-sand)]"
          >
            Ver en el sitio
          </Link>
        )}
      </div>

      <ImageManager propertyId={id} images={images ?? []} />

      <PropertyForm action={action} initial={property} submitLabel="Guardar cambios" />
    </div>
  );
}
