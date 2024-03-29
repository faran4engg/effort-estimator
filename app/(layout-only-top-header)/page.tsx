import React from 'react';
import Image from 'next/image';
import { Box, Center, Container } from '@mantine/core';
import GetStartedButton from '@/components/GetStartedButton';

const HomePage = () => (
  <Container>
    <Center>
      <Box
        pos="relative"
        w={{ base: '300px', lg: '500px', xl: '650px' }}
        h={{ base: '300px', lg: '500px', xl: '650px' }}
      >
        <Image src="/hero.svg" fill alt="Hero" />
      </Box>
    </Center>
    <GetStartedButton />
  </Container>
);

export default HomePage;
