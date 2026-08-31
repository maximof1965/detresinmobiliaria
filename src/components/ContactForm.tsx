'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { siteConfig, whatsappUrl } from '@/lib/config';

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

    const nombre = String(data.get('nombre') ?? '').trim();
    const telefono = String(data.get('telefono') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const mensaje = String(data.get('mensaje') ?? '').trim();

    // Guardamos el lead (para el registro interno), sin bloquear el envio a WhatsApp.
    try {
      const supabase = createClient();
      await supabase.from('leads').insert({
        property_id: propertyId ?? null,
        nombre,
        telefono,
        email,
        mensaje,
      });
    } catch {
      // Si falla el guardado igual continuamos a WhatsApp.
    }

    const lineas = [
      `Hola ${siteConfig.name}, quiero más información${
        propertyTitle ? ` sobre "${propertyTitle}"` : ''
      }.`,
      nombre ? `Nombre: ${nombre}` : '',
      telefono ? `Teléfono: ${telefono}` : '',
      email ? `Correo: ${email}` : '',
      mensaje ? `Mensaje: ${mensaje}` : '',
    ].filter(Boolean);

    window.location.href = whatsappUrl(lineas.join('\n'));
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
        <input name="telefono" placeholder="Teléfono" className={inputCls} />
        <input name="email" type="email" placeholder="Correo electrónico" className={inputCls} />
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
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
      >
        {status === 'loading' ? 'Abriendo WhatsApp...' : 'Enviar por WhatsApp'}
      </button>
      <p className="text-center text-xs text-[var(--color-muted)]">
        Al enviar, se abrirá WhatsApp con tu mensaje listo para enviarnos.
      </p>

      {status === 'error' && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Ocurrió un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.
        </p>
      )}
    </form>
  );
}

const inputCls =
  'h-12 w-full rounded-lg border border-[var(--color-line)] bg-white px-4 text-sm outline-none focus:border-[var(--color-gold)]';
