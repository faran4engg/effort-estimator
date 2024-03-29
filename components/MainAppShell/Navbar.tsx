import { FC } from 'react';
import { AppShellSection, ScrollArea, Text } from '@mantine/core';
import Stories from '@/components/Stories/Stories';

interface NavbarProps {
  opened: boolean;
  close: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Navbar: FC<NavbarProps> = ({ opened, close }) => (
  // we will re-use this later
  // const handleClose = () => {
  //   if (opened) {
  //     close();
  //   }
  // };

  <>
    <AppShellSection grow mb="md" component={ScrollArea}>
      <Stories />
    </AppShellSection>
    <AppShellSection>
      <hr />
      <Text tt="capitalize" ta="center" size="sm">
        Some Text / Logout Btn
      </Text>
    </AppShellSection>
  </>
);
export default Navbar;
