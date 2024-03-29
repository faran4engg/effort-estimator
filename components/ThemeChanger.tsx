'use client';

import { Moon, Sun } from 'lucide-react';
import { Group, useMantineColorScheme } from '@mantine/core';
import useIsMounted from '@/hooks/useIsMounted';

const ThemeChanger = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const isMounted = useIsMounted();

  if (!isMounted) return <span style={{ marginRight: '40px' }}></span>;

  return (
    <Group>
      {colorScheme === 'light' ? (
        <Moon name="moon" onClick={() => setColorScheme('dark')} />
      ) : (
        <Sun name="sun" onClick={() => setColorScheme('light')} />
      )}
    </Group>
  );
};

export default ThemeChanger;
