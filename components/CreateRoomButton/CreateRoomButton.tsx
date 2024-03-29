'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@mantine/core';

const CreateRoomButton = () => {
  const router = useRouter();
  return (
    <Button size="lg" radius="md" onClick={() => router.push('/create-room')}>
      Create Room
    </Button>
  );
};

export default CreateRoomButton;
