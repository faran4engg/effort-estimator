'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from '@clerk/nextjs';
import ThemeChanger from '@/components/ThemeChanger';
import classes from './UnprotectedLayoutHeader.module.css';

const UnprotectedLayoutHeader = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { user } = useUser();

  const router = useRouter();

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Flex align="center" gap="4">
              <Image
                alt="our logo"
                src="/gauge.svg"
                h={60}
                w={60}
                radius="md"
                mr={4}
              />
              <Text visibleFrom="xs" fw="bold">
                Effort Estimator
              </Text>
            </Flex>
          </Link>

          <Group visibleFrom="sm">
            {!user && (
              <Button
                radius="md"
                onClick={() => router.push('/sign-in')}
                tt="capitalize"
                size="md"
                bg="var(--mantine-primary-color-5)"
              >
                Signin
              </Button>
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
              <Loader size="sm" />
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
          <Text ta="center" fz="h1" mt="sm">
            Welcome
          </Text>
          <Group>
            <Stack p="md" gap="lg" w="100%" justify="center" align="center">
              {!user ? (
                <Button
                  radius="md"
                  onClick={() => router.push('/sign-in')}
                  tt="capitalize"
                  size="md"
                  fullWidth
                  bg="var(--mantine-primary-color-5)"
                >
                  Signin
                </Button>
              ) : (
                <Text ta="center" fz="h1" mt="sm">
                  Please{' '}
                  <Link
                    href="/get-started"
                    style={{
                      textDecoration: 'none',
                      color: 'var(--mantine-primary-color-5)',
                    }}
                  >
                    join room{' '}
                  </Link>
                  to participate
                </Text>
              )}
            </Stack>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default UnprotectedLayoutHeader;
