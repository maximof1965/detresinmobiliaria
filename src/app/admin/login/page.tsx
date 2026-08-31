'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const data = new FormData(e.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(data.get('email') ?? ''),
      password: String(data.get('password') ?? ''),
    });
    if (error) {
      setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
      setLoading(false);
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[var(--color-sand)]/60 via-[var(--color-bg)] to-[var(--color-sand)]/40 px-4">
      <div className="w-full max-w-sm rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 shadow-xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="DeTres Inmobiliaria"
            width={120}
            height={120}
            priority
            className="h-24 w-24 rounded-[var(--radius-card)] object-contain"
          />
          <h1 className="mt-4 font-display text-2xl font-semibold">Panel de administración</h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Ingresa con tu cuenta de administrador.
          </p>
        </div>

        <form onSubmit={submit} className="mt-2 space-y-3">
          <input name="email" type="email" required placeholder="Correo" className={inputCls} />
          <input name="password" type="password" required placeholder="Contraseña" className={inputCls} />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-lg bg-[var(--color-ink)] font-medium text-white hover:opacity-90 disabled:opacity-60"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputCls =
  'h-12 w-full rounded-lg border border-[var(--color-line)] bg-white px-4 text-sm outline-none focus:border-[var(--color-gold)]';
