'use client';

import React, { FC } from 'react';
import { Card, SimpleGrid, Text } from '@mantine/core';
import { StoryProps } from '@/core/types';
import { useAppContext } from '@/lib/context/AppContext';
import UserCard from '../UserCard/UserCard';

interface Props {
  currentlyEstimatingStory?: StoryProps;
}
const UserArea: FC<Props> = ({ currentlyEstimatingStory }) => {
  const context = useAppContext();

  if (!context?.roomInfo?.users?.length) return <p>Loading...</p>;

  const { users } = context.roomInfo;
  return (
    <>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, xl: 4 }}
        verticalSpacing={{ base: 'md', sm: 'lg' }}
      >
        {users.map((user) => (
          <UserCard key={user.userId} user={user} />
        ))}
      </SimpleGrid>

      {currentlyEstimatingStory?.storyName && (
        <Card
          w={{ base: '20rem' }}
          mx="auto"
          mt="md"
          radius="md"
          shadow="md"
          mb={{ base: 100, sm: 360, md: 180 }}
        >
          <Text ta="center">
            Estimate:
            {currentlyEstimatingStory?.storyName.toUpperCase()}
          </Text>
        </Card>
      )}
    </>
  );
};

export default UserArea;
