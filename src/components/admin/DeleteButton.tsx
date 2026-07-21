'use client';

import { deleteProperty } from '@/app/admin/actions';

export default function DeleteButton({ id }: { id: string }) {
  return (
    <form
      action={deleteProperty}
      onSubmit={(e) => {
        if (!confirm('Eliminar esta propiedad? Esta accion no se puede deshacer.')) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
        Eliminar
      </button>
    </form>
  );
}
