import React from 'react';
import { currentUser } from '@clerk/nextjs';
import { Container, Text } from '@mantine/core';
import CreateRoomForm from '@/components/CreateRoomForm/CreateRoomForm';

const CreateRoomPage = async () => {
  const user = await currentUser();

  return (
    <Container w={500}>
      <Text ta="center" fw="bold" style={{ fontSize: '2.4rem' }}>
        Create A Room
      </Text>
      <CreateRoomForm userName={user?.firstName || ''} />
    </Container>
  );
};

export default CreateRoomPage;
