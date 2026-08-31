import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-6xl font-semibold text-[var(--color-gold)]">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold">Página no encontrada</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        La propiedad o página que buscas no existe o fue retirada.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
