import { ReactNode } from 'react';
import { MainAppShell } from '@/components/MainAppShell';

const MainLayout = ({ children }: { children: ReactNode }) => (
  <MainAppShell>{children}</MainAppShell>
);

export default MainLayout;
