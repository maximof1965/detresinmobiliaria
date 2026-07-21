'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ContactForm({
  propertyId,
  propertyTitle,
}: {
  propertyId?: string;
  propertyTitle?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = new FormData(form);

    const supabase = createClient();
    const { error } = await supabase.from('leads').insert({
      property_id: propertyId ?? null,
      nombre: String(data.get('nombre') ?? ''),
      telefono: String(data.get('telefono') ?? ''),
      email: String(data.get('email') ?? ''),
      mensaje: String(data.get('mensaje') ?? ''),
    });

    if (error) {
      setStatus('error');
      return;
    }
    form.reset();
    setStatus('ok');
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      {propertyTitle && (
        <p className="text-sm text-[var(--color-muted)]">
          Consulta sobre: <span className="font-medium text-[var(--color-ink)]">{propertyTitle}</span>
        </p>
      )}
      <input name="nombre" required placeholder="Nombre completo" className={inputCls} />
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="telefono" placeholder="Telefono" className={inputCls} />
        <input name="email" type="email" placeholder="Correo electronico" className={inputCls} />
      </div>
      <textarea
        name="mensaje"
        rows={4}
        placeholder="Mensaje"
        defaultValue={propertyTitle ? `Hola, me interesa la propiedad "${propertyTitle}".` : ''}
        className={`${inputCls} h-auto py-3`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="h-12 w-full rounded-lg bg-[var(--color-ink)] px-6 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar solicitud'}
      </button>

      {status === 'ok' && (
        <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          Gracias, hemos recibido tu solicitud. Te contactaremos muy pronto.
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Ocurrio un error al enviar. Intenta de nuevo o escribenos por WhatsApp.
        </p>
      )}
    </form>
  );
}

const inputCls =
  'h-12 w-full rounded-lg border border-[var(--color-line)] bg-white px-4 text-sm outline-none focus:border-[var(--color-gold)]';
