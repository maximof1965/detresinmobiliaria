'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-sand)]"
    >
      Cerrar sesion
    </button>
  );
}
