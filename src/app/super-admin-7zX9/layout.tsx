import type { ReactNode } from 'react';
import AdminToaster from '@/components/AdminToaster';

export default function SuperAdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminToaster />
      {children}
    </>
  );
}

