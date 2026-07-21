import type { MetadataRoute } from 'next';
import { getAllPublishedSlugs } from '@/lib/queries';

const BASE = 'https://detresinmobiliaria.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = ['', '/propiedades', '/nosotros', '/contacto'].map(
    (route) => ({ url: `${BASE}${route}`, lastModified: new Date() })
  );

  try {
    const slugs = await getAllPublishedSlugs();
    const propertyRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
      url: `${BASE}/propiedades/${slug}`,
      lastModified: new Date(),
    }));
    return [...staticRoutes, ...propertyRoutes];
  } catch {
    return staticRoutes;
  }
}
