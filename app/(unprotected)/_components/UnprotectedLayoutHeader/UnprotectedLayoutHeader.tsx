'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from '@clerk/nextjs';
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  Image,
  Loader,
  ScrollArea,
  Stack,
  Text,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ThemeChanger from '@/components/ThemeChanger';
import classes from './UnprotectedLayoutHeader.module.css';

const UnprotectedLayoutHeader = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { user } = useUser();

  console.log(111, user);

  const router = useRouter();

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Flex align="center" gap="4">
              <Image alt="our logo" src="/icon.png" h={35} w={35} />
              <Text fw="bold">Effort Estimator</Text>
            </Flex>
          </Link>

          <Group visibleFrom="sm">
            {!user && (
              <Button onClick={() => router.push('/sign-in')}>Signin</Button>
            )}

            <ThemeChanger />

            {user && (
              <>
                <ClerkLoading>
                  <Loader size="sm" />
                </ClerkLoading>
                <ClerkLoaded>
                  <UserButton afterSignOutUrl="/" />
                </ClerkLoaded>
              </>
            )}
          </Group>
          <Group hiddenFrom="sm">
            <ClerkLoading>
              <Loader />
            </ClerkLoading>
            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
            <ThemeChanger />
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Effort Estimator"
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider />

          <Group>
            <Stack p="md" gap="lg" w="100%" justify="center" align="center">
              {!user ? (
                <Button onClick={() => router.push('/sign-in')}>Signin</Button>
              ) : (
                <p>Join Room</p>
              )}
            </Stack>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default UnprotectedLayoutHeader;
