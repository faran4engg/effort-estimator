'use client';

import { FC, useState } from 'react';
import { Card, Center, Flex, Text, UnstyledButton } from '@mantine/core';
import { useUser } from '@clerk/nextjs';
import { useAppContext } from '@/lib/context/AppContext';
import classes from './points-area.module.css';
import { cardPoints } from './points-data';

interface Props {}

const PointsArea: FC<Props> = ({}) => {
  const { user } = useUser();
  const context = useAppContext();
  const { points } = context.currentlyEstimatingStory;

  const userSelectedPoint = points?.find((p) => p.userId === user?.id);
  const [selectedPoint, setSelectedPoint] = useState(
    userSelectedPoint ? userSelectedPoint.point : '',
  );

  if (!context?.currentlyEstimatingStory) {
    return <p>No story us being estimated</p>;
  }

  // const selectPoint = async (point: string) => {
  //   if (!user?.userId) return;
  //   const { points, storyId } = currentlyEstimatingStory;
  //   setSelectedPoint(point);

  //   const allStories = roomInfo.stories;
  //   const storyToUpdateIndex = allStories.findIndex(
  //     (story) => story.storyId === storyId,
  //   );

  //   const pointsForCurrentUserIndex = points.findIndex(
  //     (point) => point.userId === user.userId,
  //   );

  //   await axios.put(
  //     `${NEXT_DB_HOST}/rooms/${roomId}/stories/${storyToUpdateIndex}/points/${pointsForCurrentUserIndex}.json`,
  //     { point, userId: user.userId },
  //   );

  //   await axios.post('/api/user-gave-points', { roomId });
  // };

  return (
    <Center>
      <Card radius="md" withBorder className={classes.card}>
        <Flex gap="md" wrap="wrap" justify="center" align="center">
          {cardPoints.map((item) => (
            <UnstyledButton
              key={item.point}
              className={classes.item}
              p={4}
              c={item.color}
              // onClick={() => selectPoint(item.point)}
              style={{
                border:
                  selectedPoint === item.point ? '2px solid #1971c2' : 'none',
                transform:
                  selectedPoint === item.point ? 'scale(1.2)' : 'scale(1)',
              }}
            >
              <Text tt="capitalize" size="xl" fw="bold">
                {item.point}
              </Text>
            </UnstyledButton>
          ))}
        </Flex>
      </Card>
    </Center>
  );
};

export default PointsArea;
