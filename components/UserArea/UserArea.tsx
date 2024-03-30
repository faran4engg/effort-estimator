'use client';

import React, { FC } from 'react';
import { Box, Card, Center, SimpleGrid, Text } from '@mantine/core';
import PageConfetti from '@/components/PageConfetti';
import UserCard from '@/components/UserCard/UserCard';
import { StoryProps } from '@/core/types';
import { useAppContext } from '@/lib/context/AppContext';

interface Props {
  currentlyEstimatingStory?: StoryProps;
}
const UserArea: FC<Props> = ({ currentlyEstimatingStory }) => {
  const context = useAppContext();

  if (!context?.roomInfo?.users?.length) return <p>Loading...</p>;

  const { users } = context.roomInfo;
  return (
    <>
      {context?.revealResults && (
        <Center h={0}>
          <Box pos="absolute" bg="red">
            <PageConfetti />
          </Box>
        </Center>
      )}
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, xl: 4 }}
        verticalSpacing={{ base: 'md', sm: 'lg' }}
      >
        {users.map((user) => (
          <UserCard
            key={user.userId}
            user={user}
            currentlyEstimatingStory={currentlyEstimatingStory}
          />
        ))}
      </SimpleGrid>

      {currentlyEstimatingStory?.storyName && (
        <Card
          w={{ base: '20rem' }}
          mx="auto"
          mt="xl"
          radius="md"
          shadow="md"
          mb={{ base: 100, sm: 360, md: 280 }}
        >
          <Text ta="center">
            Estimating:&nbsp;
            {currentlyEstimatingStory?.storyName.toUpperCase()}
          </Text>
        </Card>
      )}
    </>
  );
};

export default UserArea;
