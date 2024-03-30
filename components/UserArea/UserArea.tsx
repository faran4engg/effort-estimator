'use client';

import React, { FC } from 'react';
import { Box, Card, Center, Grid, Text } from '@mantine/core';
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

      <Grid
        // below config was for `SimpleGrid`
        // columns={{ base: 1, sm: 2, md: 3, xl: 4, '2xl': 5, '3xl': 6 }}
        // verticalSpacing={{ base: 'md', sm: 'lg' }}
        justify="center"
      >
        {users.map((user, idx) => (
          <Grid.Col
            span={{
              base: 12,
              sm: 6,
              md: 4,
              xl: 3,
              '2xl': 2.8,
              '3xl': 2,
            }}
            key={user.userId}
          >
            <UserCard
              user={user}
              userAvatar={`/avatars/${idx % 20}.svg`}
              currentlyEstimatingStory={currentlyEstimatingStory}
            />
          </Grid.Col>
        ))}
      </Grid>

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
