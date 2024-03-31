import { FC } from 'react';
import Link from 'next/link';
import { Burger, Flex, Group, Image, Loader, Text } from '@mantine/core';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import ThemeChanger from '@/components/ThemeChanger';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}
const Header: FC<HeaderProps> = ({ opened, toggle }) => (
  <Group h="100%" px="lg" justify="space-between" align="center">
    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

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
    <Group>
      <ThemeChanger />
      <>
        <>
          <ClerkLoading>
            <Loader size="sm" />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
        </>
      </>
    </Group>
  </Group>
);

export default Header;
