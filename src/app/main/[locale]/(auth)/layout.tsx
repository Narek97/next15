'use client';

import { signOut, useSession } from 'next-auth/react';
import LanguageSwitcher from '@/components/language-switcher/language-switcher';
import { usePathname, redirect } from 'next/navigation';
import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const locale = pathname?.split('/')[1] || 'en'; // Default to 'en' if no locale is found

  if (status === 'loading') {
    return 'Loading or not authenticated...';
  }
  console.log(session, 'session');
  if (status !== 'authenticated' || !session) {
    redirect(`/${locale}/login`);
  }

  return (
    <>
      <LanguageSwitcher />
      <button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => signOut()}>
        Sign out
      </button>
      {children}
    </>
  );
}
