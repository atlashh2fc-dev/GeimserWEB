import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '/' }, sitemap: 'https://www.geimser.cl/sitemap.xml', host: 'https://www.geimser.cl' }; }
