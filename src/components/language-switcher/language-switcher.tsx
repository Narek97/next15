'use client'; // Important for client-side navigation

import { useRouter } from 'next/navigation';

const LanguageSwitcher = () => {
  const router = useRouter();

  const switchLocale = newLocale => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\/(en|de)/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div>
      <button onClick={() => switchLocale('en')}>English</button>
      <button onClick={() => switchLocale('de')}>Deutsch</button>
    </div>
  );
};

export default LanguageSwitcher;
