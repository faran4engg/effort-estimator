import { FC } from 'react';
import { Heart } from 'lucide-react';
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
        Made with
        <Heart
          size={20}
          color="red"
          style={{ paddingTop: '8px', margin: '0 2px' }}
          fill="red"
        />
        By&nbsp;
        <a
          href="https://faran-cv.vercel.app/"
          target="_blank"
          style={{
            textDecoration: 'none',
            borderBottom: '1px solid #1971c2',
            color: 'inherit',
          }}
          rel="noreferrer"
        >
          Faran Shaikh
        </a>
      </Text>
    </AppShellSection>
  </>
);
export default Navbar;
