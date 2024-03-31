import React from 'react';
import Image from 'next/image';
import { Box, Center, Container, Text } from '@mantine/core';
import GetStartedButton from '@/components/GetStartedButton';

const HomePage = () => (
  <Container>
    <Text ta="center" fw="bold" style={{ fontSize: '2rem' }}>
      Welcome to Effort Estimator 👋
    </Text>
    <Text ta="center" c="dimmed">
      ❣️ The only app you need for perfect story planning ❣️
    </Text>
    <GetStartedButton />
    <Center>
      <Box
        pos="relative"
        w={{ base: '300px', md: '400px', lg: '500px', xl: '520px' }}
        h={{ base: '300px', md: '400px', lg: '500px', xl: '520px' }}
      >
        <Image src="/hero.svg" fill alt="Hero" />
      </Box>
    </Center>
  </Container>
);

export default HomePage;
