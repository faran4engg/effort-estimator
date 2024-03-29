import React from 'react';
import { notFound } from 'next/navigation';
import { Container, Text } from '@mantine/core';
import { currentUser } from '@clerk/nextjs';
import CreateRoomForm from '@/components/CreateRoomForm/CreateRoomForm';

const CreateRoomPage = async () => {
  const user = await currentUser();

  if (!user) return notFound();

  return (
    <Container w={500}>
      <Text ta="center" fw="bold" style={{ fontSize: '2.4rem' }}>
        Create A Room
      </Text>
      <CreateRoomForm
        userFirstName={user.firstName || ''}
        userImg={user.imageUrl || '/mascot.svg'}
        userId={user.id}
      />
    </Container>
  );
};

export default CreateRoomPage;
