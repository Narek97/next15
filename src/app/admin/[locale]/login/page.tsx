'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';

const Page = () => {
  const t = useTranslations('HomePage');
  const { data: session, status } = useSession();
  console.log(session, 'session');
  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
};

export default Page;
