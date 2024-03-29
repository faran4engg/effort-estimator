import Link from 'next/link';
import { Container, Flex, Image, Text } from '@mantine/core';
import ThemeChanger from '@/components/ThemeChanger';
import classes from './AuthPageHeader.module.css';

function AuthPageHeader() {
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Flex align="center" gap="4">
            <Image alt="our logo" src="/icon.png" h={35} w={35} />
            <Text fw="bold">Effort Estimator</Text>
          </Flex>
        </Link>
        <ThemeChanger />
      </Container>
    </header>
  );
}
export default AuthPageHeader;
