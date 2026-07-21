/**
 * Configuracion de marca. Como aun no hay nombre/logo/colores definitivos,
 * todo lo editable de la identidad vive aqui y en globals.css (design tokens).
 * Cambiar la marca = editar este archivo + los tokens de color.
 */
export const siteConfig = {
  name: 'Detres',
  fullName: 'Detres Inmobiliaria',
  tagline: 'Encuentra el lugar que transforma tu forma de vivir',
  description:
    'Inmobiliaria de propiedades exclusivas en Medellin y el Oriente Antioqueno. Venta y arriendo de casas, apartamentos, fincas y lotes.',
  // TODO: reemplazar con el numero real (formato internacional sin + ni espacios)
  whatsapp: '573001234567',
  phoneDisplay: '+57 300 123 4567',
  email: 'contacto@detresinmobiliaria.com',
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
