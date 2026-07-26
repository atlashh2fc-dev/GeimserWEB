import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import AdminToaster from '@/components/AdminToaster';

export const metadata: Metadata = { title: 'Super Admin', robots: { index: false, follow: false } };

export default function SuperAdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminToaster />
      {children}
    </>
  );
}
