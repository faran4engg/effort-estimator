'use client';

import { useRouter } from 'next/navigation';
import { Button, Flex } from '@mantine/core';

const GetStartedButton = () => {
  const router = useRouter();
  return (
    <Flex justify="center" my="xl">
      <Button
        bg="var(--mantine-primary-color-5)"
        size="xl"
        radius="md"
        onClick={() => router.push('/get-started')}
      >
        Get Started
      </Button>
    </Flex>
  );
};

export default GetStartedButton;
