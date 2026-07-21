'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { siteConfig } from '@/lib/config';

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
      setError('Credenciales incorrectas. Verifica tu correo y contrasena.');
      setLoading(false);
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-sand)]/40 px-4">
      <div className="w-full max-w-sm rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 shadow-lg">
        <div className="mb-6 flex items-center gap-2">
          <span className="inline-block h-6 w-6 rounded-sm bg-[var(--color-gold)]" />
          <span className="font-display text-xl font-semibold">{siteConfig.name}</span>
        </div>
        <h1 className="font-display text-2xl font-semibold">Panel de administracion</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">Ingresa con tu cuenta de administrador.</p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <input name="email" type="email" required placeholder="Correo" className={inputCls} />
          <input name="password" type="password" required placeholder="Contrasena" className={inputCls} />
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
