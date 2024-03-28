'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  Image,
  Menu,
  ScrollArea,
  Stack,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ThemeChanger from '@/components/ThemeChanger';
import classes from './UnprotectedLayoutHeader.module.css';

const UnprotectedLayoutHeader = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

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
            <Button>Log in</Button>

            <ThemeChanger />

            <Menu
              width={140}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              // onClose={() => setUserMenuOpened(false)}
              // onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton>
                  <Group gap={7}>
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      user name
                    </Text>

                    <ChevronDown style={{ width: rem(12), height: rem(12) }} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => {
                    router.push('/dashboard');
                  }}
                >
                  Dashboard
                </Menu.Item>
                <Menu.Item onClick={() => {}}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
            size="sm"
          />
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
              <Link href="/login">
                <Button variant="default">Log in</Button>
              </Link>
              <Button>Sign up</Button>
            </Stack>

            <Stack p="md" gap="lg" w="100%" justify="center" align="center">
              <Text>Dashboard</Text>
              <Text>Logout</Text>
              <Group gap={7}>
                <Text fw={500} size="sm" lh={1} mr={3}>
                  user name
                </Text>
              </Group>
            </Stack>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default UnprotectedLayoutHeader;
