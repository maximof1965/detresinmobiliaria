/**
 * Configuracion de marca. Como aun no hay nombre/logo/colores definitivos,
 * todo lo editable de la identidad vive aqui y en globals.css (design tokens).
 * Cambiar la marca = editar este archivo + los tokens de color.
 */
export const siteConfig = {
  name: 'DeTres',
  fullName: 'DeTres Inmobiliaria',
  tagline: 'Encuentra el lugar que transforma tu forma de vivir',
  slogan: 'Mas que propiedades, oportunidades.',
  description:
    'Inmobiliaria de propiedades exclusivas en venta en Medellin y el Oriente Antioqueno. Casas, apartamentos, fincas y lotes.',
  // Numero de contacto (formato internacional sin + ni espacios para wa.me)
  whatsapp: '573007110095',
  phoneDisplay: '+57 300 711 0095',
  email: 'detresinmobiliaria@gmail.com',
  location: 'Medellin, Colombia',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
