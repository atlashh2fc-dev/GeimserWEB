import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios y soluciones para empresas',
  description: 'Conoce las soluciones de Geimser en tecnología, automatización, experiencia de cliente, BPO, seguridad, datos y eficiencia energética.',
  alternates: { canonical: '/servicios' },
  openGraph: { url: '/servicios' },
};

export default function ServiciosLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
