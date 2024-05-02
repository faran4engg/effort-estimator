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

  const points = currentlyEstimatingStory?.points.map((point) => point.point);

  const isBingo = points?.every((point) => point === points[0]);
  const sortedPoints = points
    ?.sort()
    .filter((item, pos, arr) => !pos || item !== arr[pos - 1]);
  const almostThere = !isBingo && sortedPoints?.length === 2;
  const isSequence =
    !isBingo &&
    !almostThere &&
    sortedPoints?.every(
      (point, index) =>
        index === sortedPoints.length - 1 ||
        +point + 1 === +sortedPoints[index + 1],
    );

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

      <Center>
        {context?.revealResults && !!isBingo && (
          <Text fz={"4rem"} fw={600} c="green">
            !!! BINGO !!!
          </Text>
        )}
        {context?.revealResults && !!isSequence && (
          <Text fz={"4rem"} fw={600} c="orange">
            Sequence...
          </Text>
        )}
        {context?.revealResults && !!almostThere && (
          <Text fz={"4rem"} fw={600} c="grape">
            Almost there.
          </Text>
        )}
        {context?.revealResults && !almostThere && !isSequence && !isBingo && (
          <Text fz={"4rem"} fw={600} c="cyan">
            Intresting, Lets Discuss!
          </Text>
        )}
      </Center>

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
              md: 6,
              lg: 4,
              xl: 3.6,
              '2xl': 3,
              '3xl': 2.4,
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
