/**
 * Marca DeTres — lockup horizontal (icono llave-casa + palabra).
 * Version vectorial nitida para header/footer. El PNG original se usa como
 * favicon, imagen social y en el showcase de marca (public/logo.png).
 */
export default function Logo({
  variant = 'dark',
  withKicker = true,
  className = '',
}: {
  variant?: 'dark' | 'light';
  withKicker?: boolean;
  className?: string;
}) {
  const textColor = variant === 'light' ? 'text-white' : 'text-[var(--color-ink)]';
  const kickerColor =
    variant === 'light' ? 'text-[var(--color-sand)]/70' : 'text-[var(--color-gold-deep)]';

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <BrandMark />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-semibold tracking-tight ${textColor}`}>
          DeTres
        </span>
        {withKicker && (
          <span className={`mt-1 text-[9px] font-medium uppercase tracking-[0.4em] ${kickerColor}`}>
            Inmobiliaria
          </span>
        )}
      </span>
    </span>
  );
}

function BrandMark() {
  return (
    <svg
      width="26"
      height="34"
      viewBox="0 0 28 36"
      fill="none"
      className="shrink-0 text-[var(--color-gold)]"
      aria-hidden="true"
    >
      <circle cx="14" cy="9.5" r="7.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.7 12 L14 6.7 L19.3 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 17.1 V32" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14 26.5 H18.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14 30.5 H17.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
