import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experiencia Geimser',
  description: 'Explora las plataformas y soluciones digitales del ecosistema Geimser.',
  alternates: { canonical: '/experiencia' },
  openGraph: { url: '/experiencia' },
};

export default function ExperienciaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
