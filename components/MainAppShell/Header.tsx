import { FC } from 'react';
import Link from 'next/link';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { Burger, Flex, Group, Image, Loader, Text } from '@mantine/core';
import ThemeChanger from '@/components/ThemeChanger';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}
const Header: FC<HeaderProps> = ({ opened, toggle }) => (
  <Group h="100%" px="lg" justify="space-between" align="center">
    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
    {/* <MantineLogo size={30} /> */}
    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Flex align="center" gap="4">
        <Image alt="our logo" src="/icon.png" h={35} w={35} />
        <Text fw="bold">Effort Estimator</Text>
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
