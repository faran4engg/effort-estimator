import { ReactNode } from 'react';
import { Container } from '@mantine/core';
import AuthPageHeader from './_components/AuthPageHeader/AuthPageHeader';

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <main>
    <AuthPageHeader />
    <Container size="md">{children}</Container>
  </main>
);

export default AuthLayout;
