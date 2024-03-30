import { FC } from 'react';
import { Box, Center, Indicator, Text } from '@mantine/core';
import { RoomUser } from '@/core/types';

const InfoMsgBox: FC<{ msg1: string; msg2: string; adminUser?: RoomUser }> = ({
  msg1,
  msg2,
  adminUser,
}) => (
  <Center className="animate-wiggle">
    <Indicator inline color="var(--mantine-color-red-9)" size={12}>
      <Box
        bg="var(--mantine-primary-color-6)"
        p="xs"
        style={{ borderRadius: '8px' }}
      >
        <Text ta="center" c="#fff">
          {msg1.trim()}{' '}
          <span
            style={{
              textTransform: 'capitalize',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            {adminUser?.userName || ''}
          </span>{' '}
          {msg2.trim()}
        </Text>
      </Box>
    </Indicator>
  </Center>
);

export default InfoMsgBox;
