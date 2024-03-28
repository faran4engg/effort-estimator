import { ReactNode } from 'react';
import { Container } from '@mantine/core';
import HomeHeader from './_components/AuthPageHeader/AuthPageHeader';

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <main>
    <HomeHeader />

    <Container size="md">{children}</Container>
  </main>
);

export default AuthLayout;
