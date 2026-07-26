import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce a Geimser, equipo multidisciplinario que integra tecnología, operación y experiencia de cliente para empresas en Chile.',
  alternates: { canonical: '/nosotros' },
  openGraph: { url: '/nosotros' },
};

export default function NosotrosLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
