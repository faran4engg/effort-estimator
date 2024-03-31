'use client';

import { ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AppContextProvider from '@/lib/context/AppContextProvider';
import Header from './Header';
import Navbar from './Navbar';
import classes from './index.module.css';

export function MainAppShell({ children }: { children: ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure();
  const params = useParams<{ roomId: string }>();

  return (
    <AppContextProvider roomId={params.roomId}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header withBorder={false} className={classes.headerArea}>
          <Header opened={opened} toggle={toggle} />
        </AppShell.Header>
        <AppShell.Navbar
          p="md"
          withBorder={false}
          className={classes.navbarArea}
        >
          <Navbar opened={opened} close={close} />
        </AppShell.Navbar>
        <AppShell.Main className={classes.mainArea}>{children}</AppShell.Main>
      </AppShell>
    </AppContextProvider>
  );
}
