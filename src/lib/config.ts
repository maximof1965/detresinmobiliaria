/**
 * Configuracion de marca. Como aun no hay nombre/logo/colores definitivos,
 * todo lo editable de la identidad vive aqui y en globals.css (design tokens).
 * Cambiar la marca = editar este archivo + los tokens de color.
 */
export const siteConfig = {
  name: 'DeTres',
  fullName: 'DeTres Inmobiliaria',
  tagline: 'Construimos tu futuro con confianza',
  slogan: 'Más que propiedades, oportunidades.',
  description:
    'Firma inmobiliaria en Medellín y el Oriente Antioqueño. Integramos avalúos, análisis económico y acompañamiento para comprar, vender e invertir con seguridad.',
  // Numero de contacto (formato internacional sin + ni espacios para wa.me)
  whatsapp: '573007110095',
  phoneDisplay: '+57 300 711 0095',
  email: 'detresinmobiliaria@gmail.com',
  location: 'Medellín, Colombia',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
