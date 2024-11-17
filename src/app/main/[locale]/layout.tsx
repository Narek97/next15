import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params;
}>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
    </>
  );
}
