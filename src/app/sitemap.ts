import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap { return ['/', '/servicios', '/nosotros', '/experiencia'].map((path) => ({ url: `https://www.geimser.cl${path}`, lastModified: new Date(), changeFrequency: path === '/' ? 'weekly' : 'monthly', priority: path === '/' ? 1 : 0.8 })); }
