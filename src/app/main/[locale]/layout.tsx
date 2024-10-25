import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import LanguageSwitcher from '@/components/language-switcher/language-switcher';

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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <LanguageSwitcher />
        {children}
      </NextIntlClientProvider>
    </>
  );
}
