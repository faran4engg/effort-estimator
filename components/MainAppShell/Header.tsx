import { FC } from 'react';
import Link from 'next/link';
import { Burger, Flex, Group, Image, Text } from '@mantine/core';
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
    <ThemeChanger />
  </Group>
);

export default Header;
