'use client';

import { useRouter } from 'next/navigation';
import { Button, Flex } from '@mantine/core';

const GetStartedButton = () => {
  const router = useRouter();
  return (
    <Flex justify="center" mt="xl">
      <Button size="xl" radius="md" onClick={() => router.push('/get-started')}>
        Get Started
      </Button>
    </Flex>
  );
};

export default GetStartedButton;
