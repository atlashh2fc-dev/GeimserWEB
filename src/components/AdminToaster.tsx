'use client';

import { Toaster } from 'sileo';

export default function AdminToaster() {
  return (
    <Toaster
      position="top-right"
      offset={{ top: 18, right: 18 }}
      options={{
        roundness: 18,
        duration: 6500,
      }}
    />
  );
}

