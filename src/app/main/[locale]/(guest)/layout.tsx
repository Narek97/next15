'use client';

import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const locale = pathname?.split('/')[1] || 'en'; // Default to 'en' if no locale is found

  if (session) {
    redirect(`/${locale}/home`);
  }

  if (status === 'loading') {
    return 'Loading or not authenticated...';
  }

  return <>{children}</>;
}
