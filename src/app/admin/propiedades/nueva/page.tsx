import Link from 'next/link';
import PropertyForm from '@/components/admin/PropertyForm';
import { createProperty } from '@/app/admin/actions';

export default function NuevaPropiedadPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]">
          ← Volver al inventario
        </Link>
        <h1 className="mt-2 font-display text-2xl font-semibold">Nueva propiedad</h1>
        <p className="text-sm text-[var(--color-muted)]">
          Completa los datos y guarda. Luego podras agregar las fotos.
        </p>
      </div>

      <PropertyForm action={createProperty} submitLabel="Crear y continuar" />
    </div>
  );
}
