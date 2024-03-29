'use client';

import { ReactNode } from 'react';
import { AppShell, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import UnprotectedLayoutHeader from './_components/UnprotectedLayoutHeader/UnprotectedLayoutHeader';

const UnProtectedLayout = ({ children }: { children: ReactNode }) => {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned, offset: false }}
      padding="md"
    >
      <AppShell.Header>
        <UnprotectedLayoutHeader />
      </AppShell.Header>

      <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};
export default UnProtectedLayout;
